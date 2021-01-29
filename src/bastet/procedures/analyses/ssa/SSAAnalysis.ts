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

import {MergeOperator, ProgramAnalysisWithLabels} from "../ProgramAnalysis";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {App} from "../../../syntax/app/App";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {
    ConcreteElement,
    ConcreteMemory,
    ConcretePrimitive,
    ConcreteUnifiedMemory
} from "../../domains/ConcreteElements";
import {LabeledTransferRelation} from "../TransferRelation";
import {extractPrimitiveAttributes, SSAAbstractDomain, SSAState} from "./SSAAbstractDomain";
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
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {SSAAbstractStates} from "./SSAAbstractStates";
import {getTheOnlyElement} from "../../../utils/Collections";


export class SSAAnalysisConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ['SSAAnalysis']);
    }

}

export class SSAAnalysis implements ProgramAnalysisWithLabels<ConcreteElement, SSAState, AbstractState>,
    LabeledTransferRelation<SSAState>,
    Unwrapper<SSAState, AbstractElement> {

    private readonly _abstractDomain: AbstractDomain<ConcreteElement, SSAState>;

    private readonly _wrappedAnalysis: ProgramAnalysisWithLabels<any, AbstractState, AbstractState>;

    private readonly _transferRelation: SSATransferRelation;

    private readonly _task: App;

    private readonly _statistics: AnalysisStatistics;

    private readonly _mergeOp: MergeOperator<SSAState>;

    private readonly _config: SSAAnalysisConfig;

    constructor(config: {}, task: App, wrappedAnalysis: ProgramAnalysisWithLabels<any, any, AbstractState>, statistics: AnalysisStatistics) {
        this._config = new SSAAnalysisConfig(config);
        this._task = Preconditions.checkNotUndefined(task);
        this._wrappedAnalysis = Preconditions.checkNotUndefined(wrappedAnalysis);
        this._abstractDomain = new SSAAbstractDomain(wrappedAnalysis.abstractDomain);

        this._transferRelation = new SSATransferRelation(wrappedAnalysis);
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

    stop(state: SSAState, reached: Iterable<AbstractState>, unwrapper: (F) => SSAState): boolean {
        return this._wrappedAnalysis.stop(state.getWrappedState(), reached, (e) => e.getWrappedState());
    }

    target(state: SSAState): Property[] {
        return this._wrappedAnalysis.target(state.wrappedState);
    }

    isWideningState(state: SSAState): boolean {
        return this.isWideningState(state);
    }

    widen(state: SSAState, reached: Iterable<AbstractState>): SSAState {
        const wrappedResult = this._wrappedAnalysis.widen(state.getWrappedState(), reached);
        if (wrappedResult != state.getWrappedState()) {
            return state.withWrappedState(wrappedResult);
        } else {
            return state;
        }
    }

    unwrap(e: SSAState): AbstractElement {
        return e.getWrappedState();
    }

    get refiner(): Refiner<AbstractState> {
        return new WrappingRefiner(this._wrappedAnalysis.refiner);
    }

    get abstractDomain(): AbstractDomain<ConcreteElement, SSAState> {
        return this._abstractDomain;
    }

    get wrappedAnalysis(): ProgramAnalysisWithLabels<any, any, AbstractState> {
        return this._wrappedAnalysis;
    }

    initialStatesFor(task: App): SSAState[] {
        Preconditions.checkArgument(task === this._task);
        return this._wrappedAnalysis.initialStatesFor(task).map((w) => {
            return new SSAState(ImmMap({}), w);
        } );
    }

    createStateSets(): [FrontierSet<AbstractState>, ReachedSet<AbstractState>] {
        return this.wrappedAnalysis.createStateSets();
    }

    mergeInto(state: SSAState, frontier: StateSet<AbstractState>, reached: ReachedSet<AbstractState>,
              unwrapper: (F) => SSAState, wrapper: (E) => AbstractState): [FrontierSet<AbstractState>, ReachedSet<AbstractState>] {
        throw new ImplementMeException();
    }

    widenPartitionOf(ofState: SSAState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    stopPartitionOf(ofState: SSAState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    mergePartitionOf(ofState: SSAState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    getPartitionKeys(element: SSAState): ImmSet<PartitionKey> {
        return this._wrappedAnalysis.getPartitionKeys(element.getWrappedState());
    }

    handleViolatingState(reached: ReachedSet<AbstractState>, violating: AbstractState) {
        throw new ImplementMeException();
    }

    compareStateOrder(a: SSAState, b: SSAState): number {
        throw new ImplementMeException();
    }

    getLexiOrderKey(ofState: SSAState): LexiKey {
        return this._wrappedAnalysis.getLexiOrderKey(ofState.getWrappedState());
    }

    getLexiDiffKey(ofState: SSAState): LexiKey {
        return this._wrappedAnalysis.getLexiDiffKey(ofState.getWrappedState());
    }

    finalizeResults(frontier: FrontierSet<AbstractState>, reached: ReachedSet<AbstractState>) {
        return this.wrappedAnalysis.finalizeResults(frontier, reached);
    }

    testify(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): AccessibilityRelation<AbstractState> {
        return this.wrappedAnalysis.testify(accessibility, state);
    }

    testifyOne(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): AccessibilityRelation<AbstractState> {
        return this.wrappedAnalysis.testifyOne(accessibility, state);
    }

    testifyConcrete(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): Iterable<[AbstractState, ConcreteElement][]> {
        throw new ImplementMeException();
    }

    testifyConcreteOne(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): Iterable<[AbstractState, ConcreteElement][]> {
        const resultWithSSA: Iterable<[AbstractState, ConcreteElement][]> = this.wrappedAnalysis.testifyConcreteOne(accessibility, state);

        const plus = (m1: ImmMap<string, number>, m2: ImmMap<string, number>): ImmMap<string, number> => {
            const keys = ImmSet(m1.keys()).union(ImmSet(m2.keys()));
            let result = m1;

            for (const k of keys) {
                const v1 = m1.get(k) || 0;
                const v2 = m2.get(k) || 0;
                result = result.set(k, v1 + v2);
            }

            return result;
        };

        for (const seq of resultWithSSA) {
            const result: [AbstractState, ConcreteElement][] = [];
            let ssaBase = this._abstractDomain.lattice.top().getSSA();
            let ssaAligned = ssaBase;
            for (const [e, c] of seq) {
                if (c instanceof ConcreteMemory) {
                    const ssaStateAtPos = getTheOnlyElement(SSAAbstractStates.extractFrom(e));
                    if (this._abstractDomain.lattice.top() === ssaStateAtPos) {
                        ssaBase = ssaAligned;
                    }
                    ssaAligned = plus(ssaBase, ssaStateAtPos.getSSA());
                    const mem = extractPrimitiveAttributes(c, ssaAligned);
                    result.push([e, new ConcreteUnifiedMemory(mem)]);
                } else {
                    throw new IllegalArgumentException();
                }
            }

            return [result];
        }

        return [];
    }

    accessibility(reached: ReachedSet<AbstractState>, state: AbstractState): AccessibilityRelation<AbstractState> {
        throw new ImplementMeException();
    }

    incRef(state: SSAState) {
        this.wrappedAnalysis.incRef(state.getWrappedState());
    }

    decRef(state: SSAState) {
        this.wrappedAnalysis.decRef(state.getWrappedState());
    }

}
