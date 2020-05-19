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


import {ConcreteElement} from "../domains/ConcreteElements";
import {AbstractState} from "../../lattices/Lattice";
import {FrontierSet, ReachedSet} from "./StateSet";
import {AnalysisAlgorithm} from "./Algorithm";
import {Refiner} from "../analyses/Refiner";
import {Preconditions} from "../../utils/Preconditions";
import {ProgramAnalysis} from "../analyses/ProgramAnalysis";
import {AnalysisStatistics} from "../analyses/AnalysisStatistics";
import {getActiveBudget} from "../../utils/Budgets";

export const STAT_KEY_BMC_ITERATIONS = "iterations";

export class FeasibilityAlgorithm<C extends ConcreteElement, E extends AbstractState>
    implements AnalysisAlgorithm<C, E> {

    private readonly _analysis: ProgramAnalysis<C, E, E>;

    private readonly _wrappedAlgorithm: AnalysisAlgorithm<C, E>;

    private readonly _refiner: Refiner<E>;

    private readonly _statistics: AnalysisStatistics;
    private readonly _feasibilityCheckStats: AnalysisStatistics;

    constructor(wrappedAlgorithm: AnalysisAlgorithm<C, E>, refiner: Refiner<E>, analysis: ProgramAnalysis<C, E, E>, statistics: AnalysisStatistics) {
        this._wrappedAlgorithm = Preconditions.checkNotUndefined(wrappedAlgorithm);
        this._refiner = Preconditions.checkNotUndefined(refiner);
        this._analysis = Preconditions.checkNotUndefined(analysis);

        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(this.constructor.name);
        this._feasibilityCheckStats = this._statistics.withContext("FeasibilityCheck");
    }

    public run(frontier: FrontierSet<E>, reached: ReachedSet<E>): [FrontierSet<E>, ReachedSet<E>] {
        do {
            this._statistics.increment(STAT_KEY_BMC_ITERATIONS);
            getActiveBudget().raiseIfExhausted();
            [frontier, reached] = this._wrappedAlgorithm.run(frontier, reached);
            if (!frontier.isEmpty()) {
                // Target state was found
                Preconditions.checkState(reached.getAddedLast().length > 0);
                const targetState = reached.getAddedLast()[0];
                Preconditions.checkState(this._analysis.target(targetState as E).length > 0);

                const properties = this._analysis.target(targetState);

                // Check the feasibility with the refiner
                let isFeasible: boolean;
                this._feasibilityCheckStats.startTimer();
                try {
                    isFeasible = this._refiner.checkIsFeasible(targetState as E, `BMC target state feasibility for ${properties.toString()}`);
                    if (isFeasible) {
                        return [frontier, reached];
                    } else {
                        reached.remove(targetState);
                    }
                } finally {
                    this._feasibilityCheckStats.stopTimer();
                }
            }
        } while (!frontier.isEmpty());

        return [frontier, reached];
    }
}
