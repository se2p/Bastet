/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of Passau (uni-passau.de)
 *
 *   See the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Please make sure to CITE this work in your publications if you
 *   build on this work. Some of our maintainers or contributors might
 *   be interested in actively CONTRIBUTING to your research project.
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

import {AnalysisProcedure, MultiPropertyAnalysisResult} from "./AnalysisProcedure";
import {App} from "../syntax/app/App";
import {GraphAnalysis} from "./analyses/graph/GraphAnalysis";
import {ControlAnalysis} from "./analyses/control/ControlAnalysis";
import {GraphAbstractState} from "./analyses/graph/GraphAbstractDomain";
import {ReachabilityAlgorithm} from "./algorithms/ReachabilityAlgorithm";
import {SMTFactory} from "../utils/smt/z3/Z3SMT";
import {BDDLibraryFactory} from "../utils/bdd/BDD";
import {Z3Theories} from "../utils/smt/z3/Z3Theories";
import {SSAAnalysis} from "./analyses/ssa/SSAAnalysis";
import {FeasibilityAlgorithm} from "./algorithms/FeasibilityAlgorithm";
import {MultiPropertyAlgorithm} from "./algorithms/MultiPropertyAlgorithm";
import {Property} from "../syntax/Property";
import {Set as ImmSet} from "immutable";
import {AnalysisStatistics} from "./analyses/AnalysisStatistics";
import {StatsAnalysis} from "./analyses/stats/StatsAnalysis";
import {TimeAnalysis} from "./analyses/time/TimeAnalysis";
import {StaticTimeProfile} from "../utils/TimeProfile";
import {ConcreteElement} from "./domains/ConcreteElements";
import {BastetConfiguration} from "../utils/BastetConfiguration";
import {StructureStatistics} from "../syntax/app/StructureStatistics";
import {LabelAnalysis} from "./analyses/label/LabelAnalysis";
import {IllegalArgumentException} from "../core/exceptions/IllegalArgumentException";
import {AbstractionAnalysis} from "./analyses/abstraction/AbstractionAnalysis";
import {DataAnalysis} from "./analyses/data/DataAnalysis";
import {CEGARAlgorithm} from "./algorithms/CEGARAlgorithm";

export class MainAnalysisConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ['MainAnalysis']);
    }

    get printStatistics(): boolean {
        return this.getBoolProperty('print-statistics', true);
    }

    get exportArtifacts(): boolean {
        return this.getBoolProperty('export-artifacts', true);
    }

    get analysisType(): string {
        return this.getStringProperty('analysis', "bmc");
    }

}

export class AnalysisProcedureFactory {

    public static async createAnalysisProcedure(config: {}): Promise<AnalysisProcedure> {
        const mainConfig = new MainAnalysisConfig(config);

        return new class implements AnalysisProcedure {

            private _statistics: AnalysisStatistics;

            private _result: MultiPropertyAnalysisResult;

            async run(task: App): Promise<MultiPropertyAnalysisResult> {
                if (mainConfig.analysisType == "bmc") {
                    return this.runBMC(task);
                } else if (mainConfig.analysisType == "predicate") {
                    return this.runPredicate(task);
                } else {
                    throw new IllegalArgumentException("Illegal analysis configuration chosen.");
                }
            }

            async runPredicate(task: App): Promise<MultiPropertyAnalysisResult> {
                const smt = await SMTFactory.createZ3();
                const bddlib = await BDDLibraryFactory.createBDDLib();

                this._statistics = new AnalysisStatistics("BASTET", {});
                this._result = new MultiPropertyAnalysisResult(ImmSet<Property>(), ImmSet<Property>(), task.getProperties(), this._statistics);

                const struStats = new StructureStatistics();
                struStats.computeStatisitcs(task, this._statistics.withContext("Task"));

                // TODO: Delete the context after the analysis is no more in use
                const defaultContect = smt.createContext();
                const theories = new Z3Theories(defaultContect);
                const prover = smt.createProver(defaultContect);
                const firstOrderLattice = smt.createLattice(prover, theories.boolTheory);

                const dataAnalysis = new DataAnalysis(config, firstOrderLattice, bddlib.lattice, theories, this._statistics);
                const labelAnalysis = new LabelAnalysis(task, dataAnalysis, this._statistics);
                const ssaAnalysis = new SSAAnalysis(config, task, labelAnalysis, this._statistics);
                const abstractionAnalysis = new AbstractionAnalysis(config, task, firstOrderLattice, dataAnalysis.theories, ssaAnalysis, this._statistics);
                const timeAnalysis = new TimeAnalysis(task, abstractionAnalysis, this._statistics, new StaticTimeProfile());
                const controlAnalysis = new ControlAnalysis(config, task, timeAnalysis, this._statistics);
                const graphAnalysis = new GraphAnalysis(config, task, controlAnalysis, this._statistics);
                const outerAnalysis = new StatsAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>(graphAnalysis, this._statistics);

                const [frontier, reached] = outerAnalysis.createStateSets();

                const reachabilityAlgorithm = new ReachabilityAlgorithm(config, outerAnalysis, this._statistics);
                const bmcAlgorithm = new CEGARAlgorithm(reachabilityAlgorithm, outerAnalysis.refiner, outerAnalysis, this._statistics);
                const multiPropertyAlgorithm = new MultiPropertyAlgorithm(config, task, bmcAlgorithm, outerAnalysis, this._statistics,
                    (v, s, u, stats) => {
                        outerAnalysis.finalizeResults(frontier, reached);
                        this.onAnalysisResult(v, s, u, stats);
                    });

                const initialStates: GraphAbstractState[] = outerAnalysis.initialStatesFor(task);
                frontier.addAll(initialStates);
                reached.addRootSates(initialStates);

                const [frontierPrime, reachedPrime] = multiPropertyAlgorithm.run(frontier, reached);
                if (mainConfig.exportArtifacts) {
                    graphAnalysis.exportAnalysisResult(reachedPrime, frontierPrime);
                }

                return this._result;
            }

            async runBMC(task: App): Promise<MultiPropertyAnalysisResult> {
                const smt = await SMTFactory.createZ3();
                const bddlib = await BDDLibraryFactory.createBDDLib();

                this._statistics = new AnalysisStatistics("BASTET", {});
                this._result = new MultiPropertyAnalysisResult(ImmSet<Property>(), ImmSet<Property>(), task.getProperties(), this._statistics);

                const struStats = new StructureStatistics();
                struStats.computeStatisitcs(task, this._statistics.withContext("Task"));

                // TODO: Delete the context after the analysis is no more in use
                const defaultContect = smt.createContext();
                const theories = new Z3Theories(defaultContect);
                const prover = smt.createProver(defaultContect);
                const firstOrderLattice = smt.createLattice(prover, theories.boolTheory);

                const dataAnalysis = new DataAnalysis(config, firstOrderLattice, bddlib.lattice, theories, this._statistics);
                const labelAnalysis = new LabelAnalysis(task, dataAnalysis, this._statistics);
                const ssaAnalysis = new SSAAnalysis(config, task, labelAnalysis, this._statistics);
                const timeAnalysis = new TimeAnalysis(task, ssaAnalysis, this._statistics, new StaticTimeProfile());
                const controlAnalysis = new ControlAnalysis(config, task, timeAnalysis, this._statistics);
                const graphAnalysis = new GraphAnalysis(config, task, controlAnalysis, this._statistics);
                const outerAnalysis = new StatsAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>(graphAnalysis, this._statistics);

                const [frontier, reached] = outerAnalysis.createStateSets();

                const reachabilityAlgorithm = new ReachabilityAlgorithm(config, outerAnalysis, this._statistics);
                const bmcAlgorithm = new FeasibilityAlgorithm(reachabilityAlgorithm, outerAnalysis.refiner, outerAnalysis, this._statistics);
                const multiPropertyAlgorithm = new MultiPropertyAlgorithm(config, task, bmcAlgorithm, outerAnalysis, this._statistics,
                    (v, s, u, stats) => {
                    outerAnalysis.finalizeResults(frontier, reached);
                    this.onAnalysisResult(v, s, u, stats);
                });

                const initialStates: GraphAbstractState[] = outerAnalysis.initialStatesFor(task);
                frontier.addAll(initialStates);
                reached.addRootSates(initialStates);

                const [frontierPrime, reachedPrime] = multiPropertyAlgorithm.run(frontier, reached);
                if (mainConfig.exportArtifacts) {
                    graphAnalysis.exportAnalysisResult(reachedPrime, frontierPrime);
                }

                return this._result;
            }

            private onAnalysisResult(violated: ImmSet<Property>, satisifed: ImmSet<Property>, unknowns: ImmSet<Property>,
                                     mpaStatistics: AnalysisStatistics) {

                const analysisDurtionMSec = mpaStatistics.contextTimer.totalDuration.toFixed(3);

                mpaStatistics.put("num_violated", violated.size);
                mpaStatistics.put("num_unknown", unknowns.size);
                mpaStatistics.put("num_satisfied", satisifed.size);

                if (mainConfig.printStatistics) {
                    console.log("\n## Statistics #################################################\n");
                    console.log(this._statistics.stringifyToJSON());
                }

                const printPropertySetAs = function(role: string, set: ImmSet<Property>) {
                    if (!set.isEmpty()) {
                        console.log(`Following properties are ${role}:\n`);
                        let index = 1;
                        for (const p of set) {
                            console.log(`\t(${index}) ${p.text}`);
                            index++;
                        }
                        console.log("");
                    }
                };

                console.log("\n## Summary ####################################################");
                console.log(`\nAnalysis finished after ${analysisDurtionMSec} msec.\n`);

                if (violated.isEmpty() && satisifed.isEmpty() && unknowns.isEmpty()) {
                    console.log('The analysis terminated with neither proofs nor counterexamples. Incomplete?')
                } else {
                    printPropertySetAs("VIOLATED", violated);
                    printPropertySetAs("SATISFIED", satisifed);
                    printPropertySetAs("UNKNOWN", unknowns);
                }

                console.log("Bye.");

                // Store the new result
                this._result = new MultiPropertyAnalysisResult(satisifed, violated, unknowns, this._statistics);
            }
        }
    }

}
