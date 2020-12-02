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
import {DataAbstractDomain, DataAbstractState} from "./DataAbstractDomain";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {App} from "../../../syntax/app/App";
import {LabeledTransferRelation} from "../TransferRelation";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {DataTransferRelation} from "./DataTransferRelation";
import {ConcreteElement, ConcreteMemory} from "../../domains/ConcreteElements";
import {Preconditions} from "../../../utils/Preconditions";
import {
    AbstractNumber,
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
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {List as ImmList, Set as ImmSet} from "immutable";
import {FloatType, IntegerType, ScratchType} from "../../../syntax/ast/core/ScratchType";
import {LexiKey} from "../../../utils/Lexicographic";
import {AccessibilityRelation} from "../Accessibility";
import {DataTestifier} from "./DataTestifier";
import {FirstOrderLattice} from "../../domains/FirstOrderDomain";
import {NotSupportedException} from "../../../core/exceptions/NotSupportedException";
import {DataRefiner} from "./DataRefiner";


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

export class Theories implements TransformerTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula> {

    private readonly _wrapped: AbstractTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>;

    private readonly _encodeFloatsAs: RealTheory<AbstractNumber, IntegerFormula, RealFormula, FloatFormula, BooleanFormula, StringFormula>;

    constructor(encodeFloatsAs: string, wrapped: AbstractTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>) {
        this._wrapped = Preconditions.checkNotUndefined(wrapped);
        if (encodeFloatsAs.toUpperCase() == "REALS") {
            this._encodeFloatsAs = this._wrapped.realTheory;
        } else if (encodeFloatsAs.toUpperCase() == "FLOATS") {
            this._encodeFloatsAs = this._wrapped.floatTheory;
        } else {
            throw new IllegalArgumentException();
        }
    }

    get boolTheory(): BooleanTheory<BooleanFormula> {
        return this._wrapped.boolTheory;
    }

    get floatTheory(): FloatTheory<FloatFormula, IntegerFormula, RealFormula, FloatFormula, BooleanFormula, StringFormula> {
        return this._wrapped.floatTheory;
    }

    get intTheory(): IntegerTheory<IntegerFormula, IntegerFormula, RealFormula, FloatFormula, BooleanFormula, StringFormula> {
        return this._wrapped.intTheory;
    }

    get listTheory(): ListTheory<ListFormula> {
        return this._wrapped.listTheory;
    }

    get realTheory(): RealTheory<RealFormula, IntegerFormula, RealFormula, FloatFormula, BooleanFormula, StringFormula> {
        return this._wrapped.realTheory;
    }

    get stringTheory(): StringTheory<StringFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula> {
        return this._wrapped.stringTheory;
    }

    getNumberTheoryFor(t: ScratchType): NumberTheory<AbstractNumber, IntegerFormula, RealFormula, FloatFormula, BooleanFormula, StringFormula> {
        if (t == IntegerType.instance()) {
            return this.intTheory;
        } else if (t == FloatType.instance()) {
            return this._encodeFloatsAs;
        }

        throw new IllegalArgumentException("Unknown number type to map theory to");
    }

    getNumberTheoryOf(e: AbstractNumber): NumberTheory<AbstractNumber, IntegerFormula, RealFormula, FloatFormula, BooleanFormula, StringFormula> {
        return this._wrapped.getNumberTheoryOf(e);
    }

    simplify(element: FirstOrderFormula): FirstOrderFormula {
        return this._wrapped.simplify(element);
    }

    stringRepresentation(element: FirstOrderFormula): string {
        return this._wrapped.stringRepresentation(element);
    }

}

export class DataAnalysis implements ProgramAnalysisWithLabels<ConcreteMemory, DataAbstractState, AbstractState>,
    LabeledTransferRelation<DataAbstractState> {

    private readonly _theories: TransformerTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>;

    private readonly _abstractDomain: DataAbstractDomain;

    private readonly _transferRelation: DataTransferRelation;

    private readonly _testifier: DataTestifier;

    private readonly _statistics: AnalysisStatistics;

    private readonly _config: DataAnalysisConfig;

    private readonly _mergeOp: MergeOperator<DataAbstractState>;

    private readonly _refiner: DataRefiner;

    constructor(config:{}, folLattice: FirstOrderLattice<FirstOrderFormula>, propLattice: LatticeWithComplements<PropositionalFormula>,
                theories: AbstractTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>,
                statistics: AnalysisStatistics) {
        Preconditions.checkNotUndefined(folLattice);
        Preconditions.checkNotUndefined(propLattice);

        this._config = new DataAnalysisConfig(config);
        this._theories = new Theories(this._config.encodeFloatsAs, Preconditions.checkNotUndefined(theories));
        this._abstractDomain = new DataAbstractDomain(folLattice, propLattice);
        this._transferRelation = new DataTransferRelation(this._abstractDomain, this._theories);
        this._testifier = new DataTestifier(this._theories, this._abstractDomain);
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(this.constructor.name);
        this._mergeOp = StandardMergeOperatorFactory.create(this._config.mergeOperator, this._abstractDomain);
        this._refiner = new DataRefiner(this._abstractDomain.lattice);
    }

    getTransitionLabel(from: DataAbstractState, to: DataAbstractState): ProgramOperation[] {
        throw new NotSupportedException();
    }

    chooseFinitePathAlong(accessibility: AccessibilityRelation<AbstractState, AbstractState>, state: AbstractState): AbstractState[] {
        throw new ImplementMeException();
    }

    abstractSucc(fromState: DataAbstractState): Iterable<DataAbstractState> {
        return this._transferRelation.abstractSucc(fromState);
    }

    accessibility(reached: ReachedSet<AbstractState>, state: AbstractState): AccessibilityRelation<DataAbstractState, AbstractState> {
        throw new ImplementMeException();
    }

    shouldMerge(state1: DataAbstractState, state2: DataAbstractState): boolean {
        return this._mergeOp.shouldMerge(state1, state2);
    }

    merge(state1: DataAbstractState, state2: DataAbstractState): DataAbstractState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    stop(state: DataAbstractState, reached: Iterable<AbstractElement>, unwrapper: (AbstractElement) => DataAbstractState): boolean {
        for (const r of reached) {
            if (unwrapper(r).equals(state)) {
                return true;
            }
        }
        return false;
    }

    target(state: DataAbstractState): Property[] {
        return [];
    }

    widen(state: DataAbstractState, reached: Iterable<AbstractState>): DataAbstractState {
        return state;
    }

    initialStatesFor(task: App): DataAbstractState[] {
        return [this._abstractDomain.lattice.top()];
    }

    abstractSuccFor(fromState: DataAbstractState, op: ProgramOperation, co: Concern): Iterable<DataAbstractState> {
        Preconditions.checkNotUndefined(fromState);
        Preconditions.checkNotUndefined(op);
        return this._transferRelation.abstractSuccFor(fromState, op, co);
    }

    get abstractDomain(): AbstractDomain<ConcreteMemory, DataAbstractState> {
        return this._abstractDomain;
    }

    get refiner(): Refiner<DataAbstractState, AbstractState> {
        return this._refiner;
    }

    createStateSets(): [FrontierSet<AbstractState>, ReachedSet<AbstractState>] {
        throw new ImplementMeException();
    }

    mergeInto(state: DataAbstractState, frontier: FrontierSet<AbstractState>, reached: ReachedSet<AbstractState>, unwrapper: (AbstractElement) => DataAbstractState, wrapper: (E) => AbstractElement): [FrontierSet<AbstractState>, ReachedSet<AbstractState>] {
        throw new ImplementMeException();
    }

    partitionOf(ofState: DataAbstractState, reached: StateSet<AbstractState>): Iterable<AbstractState> {
        return reached;
    }

    widenPartitionOf(ofState: DataAbstractState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    mergePartitionOf(ofState: DataAbstractState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    stopPartitionOf(ofState: DataAbstractState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    getPartitionKeys(element: DataAbstractState): ImmSet<PartitionKey> {
        return ImmSet([new PartitionKey(ImmList())]);
    }

    handleViolatingState(reached: ReachedSet<AbstractState>, violating: AbstractState) {
        throw new ImplementMeException();
    }

    compareStateOrder(a: DataAbstractState, b: DataAbstractState): number {
        throw new ImplementMeException();
    }

    getLexiOrderKey(ofState: DataAbstractState): LexiKey {
        return new LexiKey([]);
    }

    getLexiDiffKey(ofState: DataAbstractState): LexiKey {
        return new LexiKey([]);
    }

    finalizeResults(frontier: FrontierSet<AbstractState>, reached: ReachedSet<AbstractState>) {
    }

    testify(accessibility: AccessibilityRelation<DataAbstractState, AbstractState>, state: AbstractState): AccessibilityRelation<DataAbstractState, AbstractState> {
        return this._testifier.testify(accessibility, state);
    }

    testifyConcrete(accessibility: AccessibilityRelation<DataAbstractState, AbstractState>, state: AbstractState): Iterable<ConcreteElement[]> {
        return this._testifier.testifyConcrete(accessibility, state);
    }

    testifyConcreteOne(accessibility: AccessibilityRelation<DataAbstractState, AbstractState>, state: AbstractState): Iterable<ConcreteElement[]> {
        return this._testifier.testifyConcreteOne(accessibility, state);
    }

    testifyOne(accessibility: AccessibilityRelation<DataAbstractState, AbstractState>, state: AbstractState): AccessibilityRelation<DataAbstractState, AbstractState> {
        return this._testifier.testifyOne(accessibility, state);
    }

    get theories(): TransformerTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula> {
        return this._theories;
    }
}
