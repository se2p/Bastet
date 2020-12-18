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

import {ProgramAnalysis, ProgramAnalysisWithLabels, WrappingProgramAnalysis} from "../ProgramAnalysis";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {ConcreteElement} from "../../domains/ConcreteElements";
import {Property} from "../../../syntax/Property";
import {FrontierSet, PartitionKey, ReachedSet} from "../../algorithms/StateSet";
import {App} from "../../../syntax/app/App";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {Refiner, Unwrapper, WrappingRefiner} from "../Refiner";
import {ProgramTimeProfile} from "../../../utils/TimeProfile";
import {TimeTransferRelation} from "./TimeTransferRelation";
import {LabeledTransferRelation} from "../TransferRelation";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Concern} from "../../../syntax/Concern";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {List as ImmList, Set as ImmSet} from "immutable";
import {LexiKey} from "../../../utils/Lexicographic";
import {TimeAbstractDomain, TimeState} from "./TimeAbstractDomain";
import {TimeMergeOperator} from "./TimeMergeOperator";
import {AccessibilityRelation} from "../Accessibility";


export class TimeAnalysis<F extends AbstractState>
    implements WrappingProgramAnalysis<ConcreteElement, TimeState, F>,
        ProgramAnalysisWithLabels<ConcreteElement, TimeState, F>,
        Unwrapper<TimeState, AbstractElement>,
        LabeledTransferRelation<TimeState> {

    private readonly _abstractDomain: TimeAbstractDomain;

    private readonly _wrappedAnalysis: ProgramAnalysisWithLabels<any, any, F>;

    private readonly _statistics: AnalysisStatistics;

    private readonly _timeProfile: ProgramTimeProfile;

    private readonly _transfer: TimeTransferRelation;

    private readonly _mergeOperator: TimeMergeOperator;

    private readonly _task: App;

    constructor(task: App, wrappedAnalysis: ProgramAnalysisWithLabels<any, any, F>, statistics: AnalysisStatistics,
                timeProfile: ProgramTimeProfile) {
        this._task = Preconditions.checkNotUndefined(task);
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(wrappedAnalysis.constructor.name);
        this._wrappedAnalysis = Preconditions.checkNotUndefined(wrappedAnalysis);
        this._timeProfile = Preconditions.checkNotUndefined(timeProfile);
        this._abstractDomain = new TimeAbstractDomain(wrappedAnalysis.abstractDomain);
        this._mergeOperator = new TimeMergeOperator(wrappedAnalysis);
        this._transfer = new TimeTransferRelation(task, timeProfile, wrappedAnalysis);
    }

    getTransitionLabel(from: TimeState, to: TimeState): ProgramOperation[] {
        return this._wrappedAnalysis.getTransitionLabel(from.getWrappedState(), to.getWrappedState());
    }

    abstractSucc(fromState: TimeState): Iterable<TimeState> {
        return this._transfer.abstractSucc(fromState);
    }

    abstractSuccFor(fromState: TimeState, op: ProgramOperation, co: Concern): Iterable<TimeState> {
        return this._transfer.abstractSuccFor(fromState, op, co);
    }

    initialStatesFor(task: App): TimeState[] {
        Preconditions.checkArgument(task === this._task);
        return this._wrappedAnalysis.initialStatesFor(task).map((w) => {
            return new TimeState(ImmList([]), w);
        } );
    }

    accessibility(reached: ReachedSet<F>, state: F): AccessibilityRelation< F> {
        throw new ImplementMeException();
    }

    join(state1: TimeState, state2: TimeState): TimeState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    merge(state1: TimeState, state2: TimeState): TimeState {
        return this._mergeOperator.merge(state1, state2);
    }

    shouldMerge(state1: TimeState, state2: TimeState): boolean {
        return this._mergeOperator.shouldMerge(state1, state2);
    }

    stop(state: TimeState, reached: Iterable<F>, unwrapper: (e: F) => TimeState): boolean {
        return this._wrappedAnalysis.stop(state.getWrappedState(), reached, unwrapper);
    }

    target(state: TimeState): Property[] {
        return this._wrappedAnalysis.target(state.getWrappedState());
    }

    isWideningState(state: TimeState): boolean {
        return this._wrappedAnalysis.isWideningState(state.getWrappedState());
    }

    widen(state: TimeState, reached: Iterable<F>): TimeState {
        const wrappedResult = this._wrappedAnalysis.widen(state.getWrappedState(), reached);
        if (wrappedResult != state.getWrappedState()) {
            return state.withWrappedState(wrappedResult);
        } else {
            return state;
        }
    }

    createStateSets(): [FrontierSet<F>, ReachedSet<F>] {
        return this._wrappedAnalysis.createStateSets();
    }

    get abstractDomain(): AbstractDomain<ConcreteElement, TimeState> {
        return this._abstractDomain;
    }

    get refiner(): Refiner<F> {
        return new WrappingRefiner(this._wrappedAnalysis.refiner);
    }

    get wrappedAnalysis(): ProgramAnalysis<any, any, F> {
        return this._wrappedAnalysis;
    }

    unwrap(e: TimeState): AbstractElement {
        return e.getWrappedState();
    }

    mergeInto(state: TimeState, frontier: FrontierSet<F>, reached: ReachedSet<F>, unwrapper: (F) => TimeState, wrapper: (TimeState) => F): [FrontierSet<F>, ReachedSet<F>] {
        throw new ImplementMeException();
    }

    widenPartitionOf(ofState: TimeState, reached: ReachedSet<F>): Iterable<F> {
        throw new ImplementMeException();
    }

    stopPartitionOf(ofState: TimeState, reached: ReachedSet<F>): Iterable<F> {
        throw new ImplementMeException();
    }

    mergePartitionOf(ofState: TimeState, reached: ReachedSet<F>): Iterable<F> {
        throw new ImplementMeException();
    }

    getPartitionKeys(element: TimeState): ImmSet<PartitionKey> {
        return this._wrappedAnalysis.getPartitionKeys(element.getWrappedState());
    }

    handleViolatingState(reached: ReachedSet<F>, violating: F) {
        throw new ImplementMeException();
    }

    compareStateOrder(a: TimeState, b: TimeState): number {
        throw new ImplementMeException();
    }

    getLexiOrderKey(ofState: TimeState): LexiKey {
        return this._wrappedAnalysis.getLexiOrderKey(ofState.getWrappedState());
    }

    getLexiDiffKey(ofState: TimeState): LexiKey {
        return this._wrappedAnalysis.getLexiDiffKey(ofState.getWrappedState());
    }

    finalizeResults(frontier: FrontierSet<F>, reached: ReachedSet<F>) {
        return this.wrappedAnalysis.finalizeResults(frontier, reached);
    }

    testify(accessibility: AccessibilityRelation< F>, state: F): AccessibilityRelation< F> {
        return this.wrappedAnalysis.testify(accessibility, state);
    }

    testifyConcrete(accessibility: AccessibilityRelation< F>, state: F): Iterable<ConcreteElement[]> {
        return this.wrappedAnalysis.testifyConcrete(accessibility, state);
    }

    testifyConcreteOne(accessibility: AccessibilityRelation< F>, state: F): Iterable<ConcreteElement[]> {
        return this.wrappedAnalysis.testifyConcreteOne(accessibility, state);
    }

    testifyOne(accessibility: AccessibilityRelation< F>, state: F): AccessibilityRelation< F> {
        return this.wrappedAnalysis.testifyOne(accessibility, state);
    }

}
