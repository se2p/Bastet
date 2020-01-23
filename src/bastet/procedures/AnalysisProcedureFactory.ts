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
import {ProgramAnalysis} from "./analyses/ProgramAnalysis";
import {ScheduleAnalysis} from "./analyses/schedule/ScheduleAnalysis";
import {ScheduleAbstractState} from "./analyses/schedule/ScheduleAbstractDomain";
import {MemAbstractState} from "./analyses/mem/MemAbstractDomain";
import {MemAnalysis} from "./analyses/mem/MemAnalysis";
import {GraphAbstractState} from "./analyses/graph/GraphAbstractDomain";
import {ReachabilityAlgorithm} from "./algorithms/Reachability";
import {ChooseOpConfig, StateSet, StateSetFactory} from "./algorithms/StateSet";

export class AnalysisProcedureConfig {

    static createFromCmdLineArgs(programArguments: any) {
        return new AnalysisProcedureConfig();
    }

}

export class AnalysisProcedureFactory {

    public static createAnalysisProcedure(config: AnalysisProcedureConfig): AnalysisProcedure {
        return new class implements AnalysisProcedure {
            run(task: App): {} {
                const memAnalysis: ProgramAnalysis<MemAbstractState> = new MemAnalysis();
                const schedAnalysis: ProgramAnalysis<ScheduleAbstractState> = new ScheduleAnalysis(memAnalysis);
                const graphAnalysis: ProgramAnalysis<GraphAbstractState> = new GraphAnalysis(schedAnalysis);

                const frontier: StateSet<GraphAbstractState> = StateSetFactory.createStateSet<GraphAbstractState>();
                const reached: StateSet<GraphAbstractState> = StateSetFactory.createStateSet<GraphAbstractState>();

                const chooseOpConfig = new ChooseOpConfig();
                const chooseOp = frontier.createChooseOp(chooseOpConfig);
                const reachabilityAlgorithm = new ReachabilityAlgorithm(graphAnalysis, chooseOp);

                const initialStates: GraphAbstractState[] = graphAnalysis.initialStatesFor(task);
                frontier.addAll(initialStates);
                reached.addAll(initialStates);

                reachabilityAlgorithm.run(frontier, reached);

                return {};
            }
        }
    }

}