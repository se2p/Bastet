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
import {GraphAbstractState} from "./analyses/graph/GraphAbstractDomain";
import {ReachabilityAlgorithm} from "./algorithms/Reachability";
import {ChooseOpConfig, StateSet, StateSetFactory} from "./algorithms/StateSet";
import {SMTFactory} from "../utils/z3wrapper/Z3Wrapper";
import {SyMemAnalysis} from "./analyses/symem/SyMemAnalysis";
import {BDDLibraryFactory} from "../utils/bdd/BDD";
import {Z3MemoryTheoryInContext} from "../utils/z3wrapper/Z3MemoryTheory";
import {SSAAnalysis} from "./analyses/ssa/SSAAnalysis";
import {BMCAlgorithm} from "./algorithms/BMC";

export class AnalysisProcedureConfig {

    static createFromCmdLineArgs(programArguments: any) {
        return new AnalysisProcedureConfig();
    }

}

export class AnalysisProcedureFactory {

    public static async createAnalysisProcedure(config: AnalysisProcedureConfig): Promise<AnalysisProcedure> {
        return new class implements AnalysisProcedure {
            async run(task: App): Promise<{}> {
                const smt = await SMTFactory.createZ3();
                const bddlib = await BDDLibraryFactory.createBDDLib();

                // TODO: Delete the context after the analysis is no more in use
                const defaultContect = smt.createContext();
                const theories = new Z3MemoryTheoryInContext(defaultContect);
                const prover = smt.createProver(defaultContect);
                const firstOrderLattice = smt.createLattice(prover, theories.boolTheory);

                const memAnalysis = new SyMemAnalysis(firstOrderLattice, bddlib.lattice, theories);
                const ssaAnalysis = new SSAAnalysis(task, memAnalysis);
                const schedAnalysis = new ScheduleAnalysis({}, task, ssaAnalysis);
                const graphAnalysis = new GraphAnalysis(task, schedAnalysis);

                const frontier: StateSet<GraphAbstractState> = StateSetFactory.createStateSet<GraphAbstractState>();
                const reached: StateSet<GraphAbstractState> = StateSetFactory.createStateSet<GraphAbstractState>();

                const chooseOpConfig = new ChooseOpConfig();
                const chooseOp = frontier.createChooseOp(chooseOpConfig);
                const reachabilityAlgorithm = new ReachabilityAlgorithm(graphAnalysis, chooseOp);
                const bmcAlgorithm = new BMCAlgorithm(reachabilityAlgorithm, graphAnalysis.refiner);

                const initialStates: GraphAbstractState[] = graphAnalysis.initialStatesFor(task);
                frontier.addAll(initialStates);
                reached.addRootSates(initialStates);

                const [reachedPrime, frontierPrime] = bmcAlgorithm.run(frontier, reached);

                graphAnalysis.exportAnalysisResult(reachedPrime, frontierPrime);

                return {};
            }
        }
    }

}
