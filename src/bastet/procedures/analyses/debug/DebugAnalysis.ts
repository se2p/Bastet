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

import {
    ProgramAnalysis,
    ProgramAnalysisWithLabels,
    TransitionLabelProvider,
    WrappingProgramAnalysis
} from "../ProgramAnalysis";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {ConcreteElement} from "../../domains/ConcreteElements";
import {Property} from "../../../syntax/Property";
import {FrontierSet, PartitionKey, ReachedSet} from "../../algorithms/StateSet";
import {App} from "../../../syntax/app/App";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {Refiner, Unwrapper, WrappingRefiner} from "../Refiner";
import {LabeledTransferRelation} from "../TransferRelation";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Concern} from "../../../syntax/Concern";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {List as ImmList, Set as ImmSet} from "immutable";
import {LexiKey} from "../../../utils/Lexicographic";
import {AccessibilityRelation} from "../Accessibility";
import {MergeJoinOperator} from "../Operators";
import {DebugAbstractDomain, DebugState} from "./DebugAbstractDomain";
import {DebugTransferRelation} from "./DebugTransferRelation";


export class DebugAnalysis<F extends AbstractState>
    implements WrappingProgramAnalysis<ConcreteElement, DebugState, F>,
        TransitionLabelProvider<DebugState>,
        Unwrapper<DebugState, AbstractElement> {

    private readonly _abstractDomain: DebugAbstractDomain;

    private readonly _wrappedAnalysis: ProgramAnalysisWithLabels<any, any, F>;

    private readonly _statistics: AnalysisStatistics;

    private readonly _transfer: DebugTransferRelation;

    private readonly _refiner: Refiner<F>;

    private readonly _mergeOperator: MergeJoinOperator<DebugState>;

    private readonly _task: App;

    constructor(task: App, wrappedAnalysis: ProgramAnalysisWithLabels<any, any, F>, statistics: AnalysisStatistics) {
        this._task = Preconditions.checkNotUndefined(task);
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(wrappedAnalysis.constructor.name);
        this._wrappedAnalysis = Preconditions.checkNotUndefined(wrappedAnalysis);
        this._abstractDomain = new DebugAbstractDomain(wrappedAnalysis.abstractDomain);
        this._mergeOperator = new MergeJoinOperator(this._abstractDomain);
        this._transfer = new DebugTransferRelation(wrappedAnalysis);
    }

    getTransitionLabel(fromState: DebugState, toState: DebugState): ProgramOperation[] {
        return this._wrappedAnalysis.getTransitionLabel(fromState.getWrappedState(), toState.getWrappedState());
    }

    abstractSucc(fromState: DebugState): Iterable<DebugState> {
        return this._transfer.abstractSucc(fromState);
    }

    initialStatesFor(task: App): DebugState[] {
        Preconditions.checkArgument(task === this._task);
        return this._wrappedAnalysis.initialStatesFor(task).map((w) => {
            return new DebugState(ImmList([]), w);
        } );
    }

    join(state1: DebugState, state2: DebugState): DebugState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    merge(state1: DebugState, state2: DebugState): DebugState {
        return this._mergeOperator.merge(state1, state2);
    }

    shouldMerge(state1: DebugState, state2: DebugState): boolean {
        return this._wrappedAnalysis.shouldMerge(state1.getWrappedState(), state2.getWrappedState());
    }

    stop(state: DebugState, reached: Iterable<F>, unwrapper: (e: F) => DebugState): boolean {
        return this._wrappedAnalysis.stop(state.getWrappedState(), reached, (e) => this.unwrap(unwrapper(e)));
    }

    target(state: DebugState): Property[] {
        return this._wrappedAnalysis.target(state.getWrappedState());
    }

    widen(state: DebugState, reached: Iterable<F>): DebugState {
        const wrappedResult = this._wrappedAnalysis.widen(state.getWrappedState(), reached);
        if (wrappedResult != state.getWrappedState()) {
            return state.withWrappedState(wrappedResult);
        } else {
            return state;
        }
    }

    createStateSets(): [FrontierSet<F>, ReachedSet<F>] {
        throw new ImplementMeException();
    }

    get abstractDomain(): AbstractDomain<ConcreteElement, DebugState> {
        return this._abstractDomain;
    }

    get refiner(): Refiner<F> {
        return this._wrappedAnalysis.refiner;
    }

    get wrappedAnalysis(): ProgramAnalysisWithLabels<any, any, F> {
        return this._wrappedAnalysis;
    }

    unwrap(e: DebugState): AbstractElement {
        return e.getWrappedState();
    }

    mergeInto(state: DebugState, frontier: FrontierSet<F>, reached: ReachedSet<F>, unwrapper: (F) => DebugState, wrapper: (DebugState) => F): [FrontierSet<F>, ReachedSet<F>] {
        throw new ImplementMeException();
    }

    widenPartitionOf(ofState: DebugState, reached: ReachedSet<F>): Iterable<F> {
        throw new ImplementMeException();
    }

    stopPartitionOf(ofState: DebugState, reached: ReachedSet<F>): Iterable<F> {
        throw new ImplementMeException();
    }

    mergePartitionOf(ofState: DebugState, reached: ReachedSet<F>): Iterable<F> {
        throw new ImplementMeException();
    }

    getPartitionKeys(element: DebugState): ImmSet<PartitionKey> {
        return this.wrappedAnalysis.getPartitionKeys(element.getWrappedState());
    }

    handleViolatingState(reached: ReachedSet<F>, violating: F) {
        return this.wrappedAnalysis.handleViolatingState(reached, violating);
    }

    compareStateOrder(a: DebugState, b: DebugState): number {
        return this.wrappedAnalysis.compareStateOrder(a.getWrappedState(), b.getWrappedState());
    }

    getLexiOrderKey(ofState: DebugState): LexiKey {
        return this.wrappedAnalysis.getLexiOrderKey(ofState.getWrappedState());
    }

    getLexiDiffKey(ofState: DebugState): LexiKey {
        return this.wrappedAnalysis.getLexiDiffKey(ofState.getWrappedState());
    }

    finalizeResults(frontier: FrontierSet<F>, reached: ReachedSet<F>) {
        return this.wrappedAnalysis.finalizeResults(frontier, reached);
    }

    testify(accessibility: AccessibilityRelation<DebugState, F>, state: F): AccessibilityRelation<DebugState, F> {
        return this.wrappedAnalysis.testify(accessibility, state);
    }

    testifyConcrete(accessibility: AccessibilityRelation<DebugState, F>, state: F): Iterable<ConcreteElement[]> {
        return this.wrappedAnalysis.testifyConcrete(accessibility, state);
    }

    testifyConcreteOne(accessibility: AccessibilityRelation<DebugState, F>, state: F): Iterable<ConcreteElement[]> {
        return this.wrappedAnalysis.testifyConcreteOne(accessibility, state);
    }

    testifyOne(accessibility: AccessibilityRelation<DebugState, F>, state: F): AccessibilityRelation<DebugState, F> {
        return this.wrappedAnalysis.testifyOne(accessibility, state);
    }

    accessibility(reached: ReachedSet<F>, state: F): AccessibilityRelation<DebugState, F> {
        throw new ImplementMeException();
    }

}
