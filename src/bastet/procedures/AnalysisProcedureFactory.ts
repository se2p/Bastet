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
import {ScheduleAnalysis} from "./analyses/schedule/ScheduleAnalysis";
import {GraphConcreteState, GraphAbstractStateAttribs, GraphAbstractState} from "./analyses/graph/GraphAbstractDomain";
import {ReachabilityAlgorithm} from "./algorithms/Reachability";
import {ChooseOpConfig, StateSet, StateSetFactory} from "./algorithms/StateSet";
import {SolverFactory} from "../utils/z3wrapper/Z3Wrapper";
import {SyMemAnalysis} from "./analyses/symem/SyMemAnalysis";
import {AbstractMemoryTheory} from "./domains/MemoryTransformer";
import {
    BooleanFormula,
    FirstOrderFormula,
    ListFormula,
    NumberFormula,
    StringFormula
} from "../utils/ConjunctiveNormalForm";
import {BDDLibrary, BDDLibraryFactory} from "../utils/bdd/BDD";
import {Z3MemoryTheoryInContext} from "../utils/z3wrapper/Z3MemoryTheory";

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
                const bddlib = await BDDLibraryFactory.createBDDLib();

                const defaultContect = solver.createContext();
                // TODO: Delete the context after the analysis is no more in use

                const theories: AbstractMemoryTheory<FirstOrderFormula, BooleanFormula, NumberFormula, StringFormula, ListFormula>
                    = new Z3MemoryTheoryInContext(defaultContect);

                const memAnalysis = new SyMemAnalysis(solver.lattice, bddlib.lattice, theories);
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
