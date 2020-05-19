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


import {AbstractState} from "../../lattices/Lattice";
import {ConcreteElement} from "../domains/ConcreteElements";
import {Property} from "../../syntax/Property";
import {App} from "../../syntax/app/App";
import {Set as ImmSet} from "immutable";
import {ProgramAnalysis} from "../analyses/ProgramAnalysis";
import {AnalysisAlgorithm} from "./Algorithm";
import {Preconditions} from "../../utils/Preconditions";
import {FrontierSet, ReachedSet} from "./StateSet";
import {AnalysisStatistics} from "../analyses/AnalysisStatistics";
import {BastetConfiguration} from "../../utils/BastetConfiguration";
import {
    Budget,
    BudgetExhaustedException,
    InfiniteBudget,
    popActiveBudget,
    pushActiveBudget,
    WallTimeDurationBudget
} from "../../utils/Budgets";

export type ResultCallback = (violated: ImmSet<Property>, satisfied: ImmSet<Property>, unknown: ImmSet<Property>, stats: AnalysisStatistics) => void;

export const STAT_KEY_MPA_ITERATIONS = "iterations";

export class MultiPropertyAlgorithmConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ['MultiPropertyAlgorithm']);
    }

    get shouldTerminateAfterViolation(): boolean {
        return this.getBoolProperty('should-terminate-after-violation', true);
    }

    get totalWallTimeLimitSecs(): number {
       return this.getNumberProperty("budget-total-walltime-secs", -1);
    }

}

export class MultiPropertyAlgorithm<C extends ConcreteElement, E extends AbstractState> implements AnalysisAlgorithm<C, E>{

    private readonly _task: App;

    private readonly _properties: ImmSet<Property>;

    private readonly _wrappedAlgorithm: AnalysisAlgorithm<C, E>;

    private readonly _analysis: ProgramAnalysis<C, E, E>;

    private readonly _resultCallback: ResultCallback;

    private readonly _statistics: AnalysisStatistics;

    private readonly _config: MultiPropertyAlgorithmConfig;

    private readonly _algorithmBudget: Budget;

    constructor(config: {}, task: App, algorithm: AnalysisAlgorithm<C, E>, analysis: ProgramAnalysis<C, E, E>, stats: AnalysisStatistics, resultCallback: ResultCallback) {
        this._config = new MultiPropertyAlgorithmConfig(config);
        this._task = Preconditions.checkNotUndefined(task);
        this._wrappedAlgorithm = Preconditions.checkNotUndefined(algorithm);
        this._analysis = Preconditions.checkNotUndefined(analysis);
        this._resultCallback = Preconditions.checkNotUndefined(resultCallback);
        this._statistics = Preconditions.checkNotUndefined(stats).withContext(this.constructor.name);
        this._properties = this._task.getProperties();

        if (this._config.totalWallTimeLimitSecs > 0) {
            this._algorithmBudget = new WallTimeDurationBudget(this._config.totalWallTimeLimitSecs * 1000);
        } else {
            this._algorithmBudget = new InfiniteBudget();
        }
    }

    run(frontier: FrontierSet<E>, reached: ReachedSet<E>): [FrontierSet<E>, ReachedSet<E>] {
        let violated: ImmSet<Property> = ImmSet();
        let satisfied: ImmSet<Property> = ImmSet();
        let unknown: ImmSet<Property> = this._properties;
        Preconditions.checkArgument(unknown.size > 0, "There must be at least one property to check.");

        this._algorithmBudget.beginBudget();
        pushActiveBudget(this._algorithmBudget);
        this._statistics.contextTimer.start();
        try {
            try {
                do {
                    this._statistics.increment(STAT_KEY_MPA_ITERATIONS);
                    [frontier, reached] = this._wrappedAlgorithm.run(frontier, reached);

                    // Handle property violations
                    if (reached.getAddedLast().length > 0) {
                        Preconditions.checkState(reached.getAddedLast().length > 0);
                        // Determine the target state and the violated properties
                        const targetState = reached.getAddedLast()[0];
                        const targetProperties = ImmSet<Property>(this._analysis.target(targetState));

                        // Call the witness handler
                        this._analysis.handleViolatingState(reached, targetState);

                        // Adjust the property sets
                        violated = violated.union(targetProperties);
                        unknown = unknown.subtract(violated);

                        if (this._config.shouldTerminateAfterViolation) {
                            if (targetProperties.size > 0) {
                                return [frontier, reached];
                            }
                        }
                    }
                } while (!frontier.isEmpty());

                // Termination without resource exhaustion (reached a fixed point)
                satisfied = unknown.subtract(violated);
                unknown = unknown.subtract(satisfied);

            } catch (e) {
                if (e instanceof BudgetExhaustedException) {
                    // Do not stop the flow of the analysis in case the budget was exhausted
                    console.log("The analysis terminated because of budget exhaustion!");
                } else {
                    throw e;
                }
            }

        } finally {
            this._statistics.contextTimer.stop();
            popActiveBudget(this._algorithmBudget);
            this._resultCallback(violated, satisfied, unknown, this._statistics);
        }

        return [frontier, reached];
    }

}
