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
import {ScheduleAnalysis} from "./analyses/control/ScheduleAnalysis";
import {GraphAbstractState, GraphConcreteState} from "./analyses/graph/GraphAbstractDomain";
import {ReachabilityAlgorithm} from "./algorithms/ReachabilityAlgorithm";
import {ChooseOpConfig, StateSet, StateSetFactory} from "./algorithms/StateSet";
import {SMTFactory} from "../utils/z3wrapper/Z3Wrapper";
import {SyMemAnalysis} from "./analyses/data/SyMemAnalysis";
import {BDDLibraryFactory} from "../utils/bdd/BDD";
import {Z3MemoryTheoryInContext} from "../utils/z3wrapper/Z3MemoryTheory";
import {SSAAnalysis} from "./analyses/ssa/SSAAnalysis";
import {BMCAlgorithm} from "./algorithms/BMCAlgorithm";
import {MultiPropertyAlgorithm} from "./algorithms/MultiPropertyAlgorithm";
import {Property} from "../syntax/Property";
import {Set as ImmSet} from "immutable";
import {AnalysisStatistics} from "./analyses/AnalysisStatistics";
import {StatsAnalysis} from "./analyses/stats/StatsAnalysis";

export class AnalysisProcedureConfig {

    static createFromCmdLineArgs(programArguments: any) {
        return new AnalysisProcedureConfig();
    }

}

export class AnalysisProcedureFactory {

    public static async createAnalysisProcedure(config: AnalysisProcedureConfig): Promise<AnalysisProcedure> {
        return new class implements AnalysisProcedure {

            private _statistics: AnalysisStatistics;

            async run(task: App): Promise<{}> {
                const smt = await SMTFactory.createZ3();
                const bddlib = await BDDLibraryFactory.createBDDLib();

                this._statistics = new AnalysisStatistics("BASTET", {});

                // TODO: Delete the context after the analysis is no more in use
                const defaultContect = smt.createContext();
                const theories = new Z3MemoryTheoryInContext(defaultContect);
                const prover = smt.createProver(defaultContect);
                const firstOrderLattice = smt.createLattice(prover, theories.boolTheory);

                const memAnalysis = new SyMemAnalysis(firstOrderLattice, bddlib.lattice, theories, this._statistics);
                const ssaAnalysis = new SSAAnalysis(task, memAnalysis, this._statistics);
                const schedAnalysis = new ScheduleAnalysis({}, task, ssaAnalysis, this._statistics);
                const graphAnalysis = new GraphAnalysis(task, schedAnalysis, this._statistics);
                const outerAnalysis = new StatsAnalysis<GraphConcreteState, GraphAbstractState>(graphAnalysis, this._statistics);

                const frontier: StateSet<GraphAbstractState> = StateSetFactory.createStateSet<GraphAbstractState>();
                const reached: StateSet<GraphAbstractState> = StateSetFactory.createStateSet<GraphAbstractState>();

                const chooseOpConfig = new ChooseOpConfig();
                const chooseOp = frontier.createChooseOp(chooseOpConfig);
                const reachabilityAlgorithm = new ReachabilityAlgorithm(outerAnalysis, chooseOp, this._statistics);
                const bmcAlgorithm = new BMCAlgorithm(reachabilityAlgorithm, outerAnalysis.refiner, outerAnalysis, this._statistics);
                const multiPropertyAlgorithm = new MultiPropertyAlgorithm(task, bmcAlgorithm, outerAnalysis, this._statistics,
                    (v, s, u, stats) => this.onAnalysisResult(v, s, u, stats));

                const initialStates: GraphAbstractState[] = outerAnalysis.initialStatesFor(task);
                frontier.addAll(initialStates);
                reached.addRootSates(initialStates);

                const [frontierPrime, reachedPrime] = multiPropertyAlgorithm.run(frontier, reached);
                graphAnalysis.exportAnalysisResult(reachedPrime, frontierPrime);

                return {};
            }

            private onAnalysisResult(violated: ImmSet<Property>, satisifed: ImmSet<Property>, unknowns: ImmSet<Property>, mpaStatistics: AnalysisStatistics) {
                const analysisDurtionMSec = mpaStatistics.contextTimer.duration.toFixed(3);

                console.log("\n## Statistics #################################################\n");
                console.log(this._statistics.stringifyToJSON());

                const printPropertySetAs = function(role: string, set: ImmSet<Property>) {
                    if (!set.isEmpty()) {
                        console.log(`Following properties are ${role}:`);
                        let index = 1;
                        for (const p of set) {
                            console.log(`\t(${index}) ${p.text}`);
                            index++;
                        }
                    }
                };

                console.log("\n## Summary ####################################################");
                console.log(`\nAnalysis finished after ${analysisDurtionMSec} msec.\n`);

                mpaStatistics.put("num_violated", violated.size);
                mpaStatistics.put("num_unknown", unknowns.size);
                mpaStatistics.put("num_satisfied", satisifed.size);

                if (violated.isEmpty() && satisifed.isEmpty() && unknowns.isEmpty()) {
                    console.log('No violations found. Full specification SATISFIED.')
                } else {
                    printPropertySetAs("VIOLATED", violated);
                    printPropertySetAs("SATISFIED", satisifed);
                    printPropertySetAs("UNKNOWN", unknowns);
                }

                console.log("\nBye.");
            }
        }
    }

}
