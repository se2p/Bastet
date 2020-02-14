/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net)
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

import {AnalysisProcedure} from "./AnalysisProcedure";
import {App} from "../syntax/app/App";
import {GraphAnalysis} from "./analyses/graph/GraphAnalysis";
import {ProgramAnalysis, ProgramAnalysisWithLabels} from "./analyses/ProgramAnalysis";
import {ScheduleAnalysis} from "./analyses/schedule/ScheduleAnalysis";
import {
    ScheduleAbstractState,
    ScheduleAbstractStateAttributes,
    ScheduleConcreteState
} from "./analyses/schedule/ScheduleAbstractDomain";
import {AbstractMemory, MemAbstractState} from "./analyses/mem/MemAbstractDomain";
import {MemAnalysis} from "./analyses/mem/MemAnalysis";
import {GraphConcreteState, GraphAbstractStateAttribs, GraphAbstractState} from "./analyses/graph/GraphAbstractDomain";
import {ReachabilityAlgorithm} from "./algorithms/Reachability";
import {ChooseOpConfig, StateSet, StateSetFactory} from "./algorithms/StateSet";
import {ConcreteMemory} from "./domains/ConcreteElements";
import {SolverFactory} from "../utils/z3wrapper/Z3Wrapper";

export class AnalysisProcedureConfig {

    static createFromCmdLineArgs(programArguments: any) {
        return new AnalysisProcedureConfig();
    }

}

export class AnalysisProcedureFactory {

    public static async createAnalysisProcedure(config: AnalysisProcedureConfig): Promise<AnalysisProcedure> {
        return new class implements AnalysisProcedure {
            async run(task: App): Promise<{}> {
                const solver = await SolverFactory.createZ3();

                const memAnalysis = new MemAnalysis();
                const schedAnalysis = new ScheduleAnalysis({}, task, memAnalysis);
                const graphAnalysis = new GraphAnalysis(task, schedAnalysis);

                const frontier: StateSet<GraphAbstractState> = StateSetFactory.createStateSet<GraphAbstractState>();
                const reached: StateSet<GraphAbstractState> = StateSetFactory.createStateSet<GraphAbstractState>();

                const chooseOpConfig = new ChooseOpConfig();
                const chooseOp = frontier.createChooseOp(chooseOpConfig);
                const reachabilityAlgorithm = new ReachabilityAlgorithm(graphAnalysis, chooseOp);

                const initialStates: GraphAbstractState[] = graphAnalysis.initialStatesFor(task);
                frontier.addAll(initialStates);
                reached.addRootSates(initialStates);

                const [reachedPrime, frontierPrime] = reachabilityAlgorithm.run(frontier, reached);

                graphAnalysis.exportAnalysisResult(reachedPrime, frontierPrime);

                return {};
            }
        }
    }

}
