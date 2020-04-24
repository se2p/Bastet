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

import {ProgramAnalysis, ProgramAnalysisWithLabels, WrappingProgramAnalysis} from "../ProgramAnalysis";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {ConcreteElement} from "../../domains/ConcreteElements";
import {Property} from "../../../syntax/Property";
import {FrontierSet, PartitionKey, ReachedSet} from "../../algorithms/StateSet";
import {App} from "../../../syntax/app/App";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {Refiner, Unwrapper} from "../Refiner";
import {ProgramTimeProfile} from "../../../utils/TimeProfile";
import {TimeTransferRelation} from "./TimeTransferRelation";
import {LabeledTransferRelation, LabeledTransferRelationImpl} from "../TransferRelation";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Concern} from "../../../syntax/Concern";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {Set as ImmSet} from "immutable";


export class TimeAnalysis<C extends ConcreteElement, E extends AbstractElement, F extends AbstractState>
    implements WrappingProgramAnalysis<C, E, F>,
        Unwrapper<E, E>,
        LabeledTransferRelation<E>{

    private readonly _wrappedAnalysis: ProgramAnalysis<any, any, F>;

    private readonly _statistics: AnalysisStatistics;

    private readonly _timeProfile: ProgramTimeProfile;

    private readonly _transfer: TimeTransferRelation<any>;

    private readonly _task: App;

    constructor(task: App, wrappedAnalysis: ProgramAnalysisWithLabels<any, any, F>, statistics: AnalysisStatistics,
                timeProfile: ProgramTimeProfile) {
        this._task = Preconditions.checkNotUndefined(task);
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(wrappedAnalysis.constructor.name);
        this._wrappedAnalysis = Preconditions.checkNotUndefined(wrappedAnalysis);
        this._timeProfile = Preconditions.checkNotUndefined(timeProfile);
        this._transfer = new TimeTransferRelation(task, timeProfile,
            new LabeledTransferRelationImpl(null,
            (from, op, co) => wrappedAnalysis.abstractSuccFor(from, op, co)));
    }

    abstractSucc(fromState: E): Iterable<E> {
        return this._transfer.abstractSucc(fromState);
    }

    abstractSuccFor(fromState: E, op: ProgramOperation, co: Concern): Iterable<E> {
        return this._transfer.abstractSuccFor(fromState, op, co);
    }

    initialStatesFor(task: App): E[] {
        return this._wrappedAnalysis.initialStatesFor(task);
    }

    join(state1: E, state2: E): E {
        return this._wrappedAnalysis.join(state1, state2);
    }

    merge(state1: E, state2: E): E {
        return this._wrappedAnalysis.merge(state1, state2);
    }

    shouldMerge(state1: E, state2: E): boolean {
        return this._wrappedAnalysis.shouldMerge(state1, state2);
    }

    stop(state: E, reached: Iterable<F>, unwrapper: (e: F) => E): boolean {
        return this._wrappedAnalysis.stop(state, reached, unwrapper);
    }

    target(state: E): Property[] {
        return this._wrappedAnalysis.target(state);
    }

    widen(state: E): E {
        return this._wrappedAnalysis.widen(state);
    }

    createStateSets(): [FrontierSet<F>, ReachedSet<F>] {
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

    unwrap(e: E): E {
        return e;
    }

    mergeInto(state: E, frontier: FrontierSet<F>, reached: ReachedSet<F>, unwrapper: (F) => E, wrapper: (E) => F): [FrontierSet<F>, ReachedSet<F>] {
        throw new ImplementMeException();
    }

    partitionOf(ofState: E, reached: ReachedSet<F>): Iterable<F> {
        return this._wrappedAnalysis.partitionOf(ofState, reached);
    }

    getPartitionKeys(element: E): ImmSet<PartitionKey> {
        return this._wrappedAnalysis.getPartitionKeys(element);
    }

    handleViolatingState(reached: ReachedSet<F>, violating: F) {
        throw new ImplementMeException();
    }
}
