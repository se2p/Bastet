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

import {MergeOperator, ProgramAnalysisWithLabelProducer, ProgramAnalysisWithLabels} from "../ProgramAnalysis";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {App} from "../../../syntax/app/App";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {ConcreteElement} from "../../domains/ConcreteElements";
import {LabeledTransferRelation, LabeledTransferRelationImpl} from "../TransferRelation";
import {SSAAbstractDomain, SSAState} from "./SSAAbstractDomain";
import {SSATransferRelation} from "./SSATransferRelation";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Refiner, Unwrapper, WrappingRefiner} from "../Refiner";
import {Property} from "../../../syntax/Property";
import {FrontierSet, PartitionKey, ReachedSet, StateSet} from "../../algorithms/StateSet";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {Concern} from "../../../syntax/Concern";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {BastetConfiguration} from "../../../utils/BastetConfiguration";
import {SSAMergeOperator} from "./SSAMergeOperator";
import {Map as ImmMap, Set as ImmSet} from "immutable";
import {LexiKey} from "../../../utils/Lexicographic";
import {AccessibilityRelation} from "../Accessibility";


export class SSAAnalysisConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ['SSAAnalysis']);
    }

}

export class SSAAnalysis<F extends AbstractState> implements ProgramAnalysisWithLabelProducer<ConcreteElement, SSAState, F>,
    LabeledTransferRelation<SSAState>,
    Unwrapper<SSAState, AbstractElement> {

    private readonly _abstractDomain: AbstractDomain<ConcreteElement, SSAState>;

    private readonly _wrappedAnalysis: ProgramAnalysisWithLabelProducer<any, AbstractState, F>;

    private readonly _transferRelation: SSATransferRelation;

    private readonly _refiner: Refiner<SSAState>;

    private readonly _task: App;

    private readonly _statistics: AnalysisStatistics;

    private readonly _mergeOp: MergeOperator<SSAState>;

    private readonly _config: SSAAnalysisConfig;

    constructor(config: {}, task: App, wrappedAnalysis: ProgramAnalysisWithLabelProducer<any, any, F>, statistics: AnalysisStatistics) {
        this._config = new SSAAnalysisConfig(config);
        this._task = Preconditions.checkNotUndefined(task);
        this._wrappedAnalysis = Preconditions.checkNotUndefined(wrappedAnalysis);
        this._abstractDomain = new SSAAbstractDomain(wrappedAnalysis.abstractDomain);

        this._transferRelation = new SSATransferRelation(wrappedAnalysis);
        this._refiner = new WrappingRefiner(this._wrappedAnalysis.refiner, this);
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(this.constructor.name);
        this._mergeOp = new SSAMergeOperator(this._task, this.wrappedAnalysis, this.wrappedAnalysis);
    }

    getTransitionLabel(from: SSAState, to: SSAState): ProgramOperation[] {
        return this._wrappedAnalysis.getTransitionLabel(from.getWrappedState(), to.getWrappedState());
    }

    abstractSucc(fromState: SSAState): Iterable<SSAState> {
        return this._transferRelation.abstractSucc(fromState);
    }

    abstractSuccFor(fromState: SSAState, op: ProgramOperation, co: Concern): Iterable<SSAState> {
        return this._transferRelation.abstractSuccFor(fromState, op, co);
    }

    join(state1: SSAState, state2: SSAState): SSAState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    shouldMerge(state1: SSAState, state2: SSAState): boolean {
        return this._mergeOp.shouldMerge(state1, state2);
    }

    merge(state1: SSAState, state2: SSAState): SSAState {
        return this._mergeOp.merge(state1, state2);
    }

    stop(state: SSAState, reached: Iterable<F>, unwrapper: (F) => SSAState): boolean {
        return this._wrappedAnalysis.stop(state.getWrappedState(), reached, (e) => e.getWrappedState());
    }

    target(state: SSAState): Property[] {
        return this._wrappedAnalysis.target(state.wrappedState);
    }

    widen(state: SSAState): SSAState {
        // TODO: Implement the widening (delegate to wrapped analyses)
        return state;
    }

    unwrap(e: SSAState): AbstractElement {
        return e.getWrappedState();
    }

    get refiner(): Refiner<SSAState> {
        return this._refiner;
    }

    get abstractDomain(): AbstractDomain<ConcreteElement, SSAState> {
        return this._abstractDomain;
    }

    get wrappedAnalysis(): ProgramAnalysisWithLabels<any, any, F> {
        return this._wrappedAnalysis;
    }

    initialStatesFor(task: App): SSAState[] {
        Preconditions.checkArgument(task === this._task);
        return this._wrappedAnalysis.initialStatesFor(task).map((w) => {
            return new SSAState(ImmMap({}), w);
        } );
    }

    createStateSets(): [FrontierSet<F>, ReachedSet<F>] {
        return this.wrappedAnalysis.createStateSets();
    }

    mergeInto(state: SSAState, frontier: StateSet<F>, reached: ReachedSet<F>, unwrapper: (F) => SSAState, wrapper: (E) => F): [FrontierSet<F>, ReachedSet<F>] {
        throw new ImplementMeException();
    }

    partitionOf(ofState: SSAState, reached: ReachedSet<F>): Iterable<F> {
        return this.wrappedAnalysis.partitionOf(ofState.getWrappedState(), reached);
    }

    getPartitionKeys(element: SSAState): ImmSet<PartitionKey> {
        return this._wrappedAnalysis.getPartitionKeys(element.getWrappedState());
    }

    handleViolatingState(reached: ReachedSet<F>, violating: F) {
        throw new ImplementMeException();
    }

    compareStateOrder(a: SSAState, b: SSAState): number {
        throw new ImplementMeException();
    }

    getLexiOrderKey(ofState: SSAState): LexiKey {
        return this._wrappedAnalysis.getLexiOrderKey(ofState.getWrappedState());
    }

    finalizeResults(frontier: FrontierSet<F>, reached: ReachedSet<F>) {
        return this.wrappedAnalysis.finalizeResults(frontier, reached);
    }

    testify(accessibility: AccessibilityRelation<SSAState, F>, state: F): AccessibilityRelation<SSAState, F> {
        return this.wrappedAnalysis.testify(accessibility, state);
    }

    testifyOne(accessibility: AccessibilityRelation<SSAState, F>, state: F): AccessibilityRelation<SSAState, F> {
        return this.wrappedAnalysis.testifyOne(accessibility, state);
    }

    testifyConcrete(accessibility: AccessibilityRelation<SSAState, F>, state: F): Iterable<ConcreteElement[]> {
        throw new ImplementMeException();
    }

    testifyConcreteOne(accessibility: AccessibilityRelation<SSAState, F>, state: F): Iterable<ConcreteElement[]> {
        const resultWithSSA = this.wrappedAnalysis.testifyConcreteOne(accessibility, state);

        // TODO: Remove the SSA-Indices from the concrete elements along the path
        throw new ImplementMeException();
    }

}
