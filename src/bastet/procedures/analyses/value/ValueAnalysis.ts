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
import {ValueAbstractDomain, ValueAbstractState} from "./ValueAbstractDomain";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {App} from "../../../syntax/app/App";
import {LabeledTransferRelation} from "../TransferRelation";
import {ProgramOperation, ProgramOperationInContext} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {ValueTransferRelation} from "./ValueTransferRelation";
import {ConcreteElement, ConcreteMemory} from "../../domains/ConcreteElements";
import {Preconditions} from "../../../utils/Preconditions";
import {
    AbstractBoolean, AbstractFloat, AbstractInteger, AbstractList,
    AbstractMemory,
    AbstractNumber, AbstractReal, AbstractString,
    AbstractTheories,
    BooleanTheory,
    FloatTheory,
    IntegerTheory,
    ListTheory,
    NumberTheory,
    RealTheory,
    StringTheory,
    TransformerTheories
} from "../../domains/MemoryTransformer";
import {
    BooleanFormula,
    FirstOrderFormula,
    FloatFormula,
    IntegerFormula,
    ListFormula,
    RealFormula,
    StringFormula
} from "../../../utils/ConjunctiveNormalForm";
import {PropositionalFormula} from "../../../utils/bdd/BDD";
import {AbstractElement, AbstractState, LatticeWithComplements} from "../../../lattices/Lattice";
import {Refiner} from "../Refiner";
import {Property} from "../../../syntax/Property";
import {FrontierSet, PartitionKey, ReachedSet, StateSet} from "../../algorithms/StateSet";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {Concern} from "../../../syntax/Concern";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {BastetConfiguration} from "../../../utils/BastetConfiguration";
import {StandardMergeOperatorFactory} from "../Operators";
import {List as ImmList, Set as ImmSet} from "immutable";
import {LexiKey} from "../../../utils/Lexicographic";
import {AccessibilityRelation} from "../Accessibility";
import {NotSupportedException} from "../../../core/exceptions/NotSupportedException";
import {ValueRefiner} from "./ValueRefiner";
import {ThreadState} from "../control/ConcreteProgramState";


export class DataAnalysisConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ['DataAnalysis']);
    }

    get mergeOperator(): string {
        return this.getStringProperty('merge-operator', 'JOIN');
    }

    get encodeFloatsAs(): string {
        return this.getStringProperty('encode-floats-as', "Reals");
    }

}

export class ValueAnalysis implements ProgramAnalysisWithLabels<ConcreteMemory, ValueAbstractState, AbstractState>,
    LabeledTransferRelation<ValueAbstractState> {

    private readonly _theories: TransformerTheories<AbstractMemory, AbstractBoolean, AbstractInteger, AbstractReal, AbstractFloat, AbstractString, AbstractList>;

    private readonly _abstractDomain: ValueAbstractDomain;

    private readonly _transferRelation: ValueTransferRelation;

    private readonly _statistics: AnalysisStatistics;

    private readonly _config: DataAnalysisConfig;

    private readonly _mergeOp: MergeOperator<ValueAbstractState>;

    private readonly _refiner: ValueRefiner;

    constructor(config:{}, statistics: AnalysisStatistics) {
        this._config = new DataAnalysisConfig(config);
        this._abstractDomain = new ValueAbstractDomain();
        this._transferRelation = new ValueTransferRelation(this._abstractDomain);
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(this.constructor.name);
        this._mergeOp = StandardMergeOperatorFactory.create(this._config.mergeOperator, this._abstractDomain);
    }

    getTransitionLabel(from: ValueAbstractState, to: ValueAbstractState): [ThreadState, ProgramOperation][] {
        throw new NotSupportedException();
    }

    chooseFinitePathAlong(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): AbstractState[] {
        throw new ImplementMeException();
    }

    abstractSucc(fromState: ValueAbstractState): Iterable<ValueAbstractState> {
        return this._transferRelation.abstractSucc(fromState);
    }

    accessibility(reached: ReachedSet<AbstractState>, state: AbstractState): AccessibilityRelation<AbstractState> {
        throw new ImplementMeException();
    }

    shouldMerge(state1: ValueAbstractState, state2: ValueAbstractState): boolean {
        return this._mergeOp.shouldMerge(state1, state2);
    }

    merge(state1: ValueAbstractState, state2: ValueAbstractState): ValueAbstractState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    stop(state: ValueAbstractState, reached: Iterable<AbstractElement>, unwrapper: (AbstractElement) => ValueAbstractState): boolean {
        for (const r of reached) {
            if (unwrapper(r).equals(state)) {
                return true;
            }
        }
        return false;
    }

    target(state: ValueAbstractState): Property[] {
        return [];
    }

    isWideningState(state: ValueAbstractState): boolean {
        return false;
    }

    widen(state: ValueAbstractState, reached: Iterable<AbstractState>): ValueAbstractState {
        return state;
    }

    initialStatesFor(task: App): ValueAbstractState[] {
        return [this._abstractDomain.lattice.top()];
    }

    abstractSuccFor(fromState: ValueAbstractState, op: ProgramOperationInContext, co: Concern): Iterable<ValueAbstractState> {
        Preconditions.checkNotUndefined(fromState);
        Preconditions.checkNotUndefined(op);
        return this._transferRelation.abstractSuccFor(fromState, op, co);
    }

    get abstractDomain(): AbstractDomain<ConcreteMemory, ValueAbstractState> {
        return this._abstractDomain;
    }

    get refiner(): Refiner<AbstractState> {
        return this._refiner;
    }

    createStateSets(): [FrontierSet<AbstractState>, ReachedSet<AbstractState>] {
        throw new ImplementMeException();
    }

    mergeInto(state: ValueAbstractState, frontier: FrontierSet<AbstractState>, reached: ReachedSet<AbstractState>, unwrapper: (AbstractElement) => ValueAbstractState, wrapper: (E) => AbstractElement): [FrontierSet<AbstractState>, ReachedSet<AbstractState>] {
        throw new ImplementMeException();
    }

    partitionOf(ofState: ValueAbstractState, reached: StateSet<AbstractState>): Iterable<AbstractState> {
        return reached;
    }

    widenPartitionOf(ofState: ValueAbstractState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    mergePartitionOf(ofState: ValueAbstractState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    stopPartitionOf(ofState: ValueAbstractState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    getPartitionKeys(element: ValueAbstractState): ImmSet<PartitionKey> {
        return ImmSet([new PartitionKey(ImmList())]);
    }

    handleViolatingState(reached: ReachedSet<AbstractState>, violating: AbstractState) {
        throw new ImplementMeException();
    }

    compareStateOrder(a: ValueAbstractState, b: ValueAbstractState): number {
        throw new ImplementMeException();
    }

    getLexiOrderKey(ofState: ValueAbstractState): LexiKey {
        return new LexiKey([]);
    }

    getLexiDiffKey(ofState: ValueAbstractState): LexiKey {
        return new LexiKey([]);
    }

    finalizeResults(frontier: FrontierSet<AbstractState>, reached: ReachedSet<AbstractState>) {
    }

    testify(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): AccessibilityRelation<AbstractState> {
        throw new ImplementMeException();
    }

    testifyConcrete(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): Iterable<[AbstractState, ConcreteMemory][]> {
        throw new ImplementMeException();
    }

    testifyConcreteOne(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): Iterable<[AbstractState, ConcreteMemory][]> {
        throw new ImplementMeException();
    }

    testifyOne(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): AccessibilityRelation<AbstractState> {
        throw new ImplementMeException();
    }

    get theories(): TransformerTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula> {
        return this._theories;
    }

    incRef(state: ValueAbstractState) {
    }

    decRef(state: ValueAbstractState) {
        // this._solver.decRef(state.blockFormula);
    }
}
