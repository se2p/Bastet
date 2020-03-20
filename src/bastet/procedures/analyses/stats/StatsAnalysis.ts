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

import {ProgramAnalysis, WrappingProgramAnalysis} from "../ProgramAnalysis";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {ConcreteElement} from "../../domains/ConcreteElements";
import {Property} from "../../../syntax/Property";
import {StateSet} from "../../algorithms/StateSet";
import {App} from "../../../syntax/app/App";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {Refiner, Unwrapper} from "../Refiner";
import {GraphAbstractState} from "../graph/GraphAbstractDomain";

export class StatsAnalysis<C extends ConcreteElement, E extends AbstractState, F extends AbstractState>
    implements WrappingProgramAnalysis<C, E, F>, Unwrapper<E, E> {

    private readonly _wrappedAnalysis: ProgramAnalysis<any, any, F>;

    private readonly _statistics: AnalysisStatistics;
    private readonly _succStats: AnalysisStatistics;
    private readonly _widenStats: AnalysisStatistics;
    private readonly _stopStats: AnalysisStatistics;
    private readonly _mergeStats: AnalysisStatistics;
    private readonly _mergeIntoStats: AnalysisStatistics;
    private readonly _targetStats: AnalysisStatistics;
    private readonly _otherStats: AnalysisStatistics;
    private readonly _joinStats: AnalysisStatistics;

    constructor(wrappedAnalysis: ProgramAnalysis<any, any, F>, statistics: AnalysisStatistics) {
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(wrappedAnalysis.constructor.name);
        this._succStats = this._statistics.withContext("abstractSucc");
        this._widenStats = this._statistics.withContext("widening");
        this._stopStats = this._statistics.withContext("stop");
        this._mergeStats = this._statistics.withContext("merge");
        this._mergeIntoStats = this._statistics.withContext("mergeInto");
        this._joinStats = this._statistics.withContext("join");
        this._targetStats = this._statistics.withContext("target");
        this._otherStats = this._statistics.withContext("other");

        this._wrappedAnalysis = Preconditions.checkNotUndefined(wrappedAnalysis);
    }

    abstractSucc(fromState: E): Iterable<E> {
        return this._succStats.runWithTimer(() => {
            return this._wrappedAnalysis.abstractSucc(fromState);
        });
    }

    initialStatesFor(task: App): E[] {
        return this._otherStats.runWithTimer(() => {
            return this._wrappedAnalysis.initialStatesFor(task);
        });
    }

    join(state1: E, state2: E): E {
        return this._joinStats.runWithTimer(() => {
            return this._wrappedAnalysis.join(state1, state2);
        });
    }

    merge(state1: E, state2: E): E {
        return this._mergeStats.runWithTimer(() => {
            return this._wrappedAnalysis.merge(state1, state2);
        });
    }

    shouldMerge(state1: E, state2: E): boolean {
        return this._mergeStats.runWithTimer(() => {
            return this._wrappedAnalysis.shouldMerge(state1, state2);
        });
    }

    stop(state: E, reached: Iterable<F>, unwrapper: (F) => E): boolean {
        return this._stopStats.runWithTimer(() => {
            return this._wrappedAnalysis.stop(state, reached, (e) => this.unwrap(unwrapper(e)));
        });
    }

    mergeInto(state: E, frontier: StateSet<F>, reached: StateSet<F>, unwrapper: (F) => E, wrapper: (E) => F): [StateSet<F>, StateSet<F>] {
        return this._mergeIntoStats.runWithTimer(() => {
            return this._wrappedAnalysis.mergeInto(state, frontier, reached, (e) => this.unwrap(unwrapper(e)), (e) => e);
        });
    }

    target(state: E): Property[] {
        return this._targetStats.runWithTimer(() => {
            return this._wrappedAnalysis.target(state);
        });
    }

    widen(state: E): E {
        return this._widenStats.runWithTimer(() => {
            return this._wrappedAnalysis.widen(state);
        });
    }

    createStateSets(): [StateSet<F>, StateSet<F>] {
        return this._wrappedAnalysis.createStateSets();
    }

    get abstractDomain(): AbstractDomain<C, E> {
        return this._wrappedAnalysis.abstractDomain;
    }

    get refiner(): Refiner<E> {
        return this._wrappedAnalysis.refiner;
    }

    get wrappedAnalysis(): ProgramAnalysis<any, any, F> {
        return this._wrappedAnalysis;
    }

    get statistics(): AnalysisStatistics {
        return this._statistics;
    }

    get succStats(): AnalysisStatistics {
        return this._succStats;
    }

    get widenStats(): AnalysisStatistics {
        return this._widenStats;
    }

    get stopStats(): AnalysisStatistics {
        return this._stopStats;
    }

    get mergeStats(): AnalysisStatistics {
        return this._mergeStats;
    }

    get targetStats(): AnalysisStatistics {
        return this._targetStats;
    }

    get otherStats(): AnalysisStatistics {
        return this._otherStats;
    }

    get joinStats(): AnalysisStatistics {
        return this._joinStats;
    }

    get mergeIntoStats(): AnalysisStatistics {
        return this._mergeIntoStats;
    }

    unwrap(e: E): E {
        return e;
    }

    partitionOf(ofState: E, reached: StateSet<F>): Iterable<F> {
        return this.wrappedAnalysis.partitionOf(ofState, reached);
    }

}

