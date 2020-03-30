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

import {MergeOperator, ProgramAnalysisWithLabels} from "../ProgramAnalysis";
import {DataAbstractDomain, DataAbstractState} from "./DataAbstractDomain";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {App} from "../../../syntax/app/App";
import {LabeledTransferRelation} from "../TransferRelation";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {DataTransferRelation} from "./DataTransferRelation";
import {ConcreteMemory} from "../../domains/ConcreteElements";
import {Preconditions} from "../../../utils/Preconditions";
import {AbstractTheories} from "../../domains/MemoryTransformer";
import {
    BooleanFormula,
    FirstOrderFormula,
    ListFormula,
    NumberFormula,
    StringFormula
} from "../../../utils/ConjunctiveNormalForm";
import {PropositionalFormula} from "../../../utils/bdd/BDD";
import {AbstractElement, AbstractState, LatticeWithComplements} from "../../../lattices/Lattice";
import {DataRefiner} from "./DataRefiner";
import {Refiner} from "../Refiner";
import {Property} from "../../../syntax/Property";
import {FrontierSet, PartitionKey, PartitionKeyElement, ReachedSet, StateSet} from "../../algorithms/StateSet";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {Concern} from "../../../syntax/Concern";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {BastetConfiguration} from "../../../utils/BastetConfiguration";
import {MergeJoinOperator, MergeSepOperator, StandardMergeOperatorFactory} from "../Operators";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {List as ImmList, Map as ImmMap, Record as ImmRec, Set as ImmSet} from "immutable";


export class DataAnalysisConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ['DataAnalysis']);
    }

    get mergeOperator(): string {
        return this.getStringProperty('merge-operator', 'JOIN');
    }

    get encodeAllNumbersAsFloats(): boolean {
        return this.getBoolProperty('encode-all-numbers-as-floats', true);
    }

}

export class DataAnalysis implements ProgramAnalysisWithLabels<ConcreteMemory, DataAbstractState, AbstractState>,
    LabeledTransferRelation<DataAbstractState> {

    private readonly _theories: AbstractTheories<FirstOrderFormula, BooleanFormula, NumberFormula, StringFormula, ListFormula>;

    private readonly _abstractDomain: DataAbstractDomain;

    private readonly _transferRelation: DataTransferRelation;

    private readonly _refiner: DataRefiner;

    private readonly _statistics: AnalysisStatistics;

    private readonly _config: DataAnalysisConfig;

    private readonly _mergeOp: MergeOperator<DataAbstractState>;

    constructor(config:{}, folLattice: LatticeWithComplements<FirstOrderFormula>, propLattice: LatticeWithComplements<PropositionalFormula>,
                theories: AbstractTheories<FirstOrderFormula, BooleanFormula, NumberFormula, StringFormula, ListFormula>,
                statistics: AnalysisStatistics) {
        Preconditions.checkNotUndefined(folLattice);
        Preconditions.checkNotUndefined(propLattice);

        this._config = new DataAnalysisConfig(config);
        this._theories = Preconditions.checkNotUndefined(theories);
        this._abstractDomain = new DataAbstractDomain(folLattice, propLattice);
        this._transferRelation = new DataTransferRelation(this._abstractDomain, this._theories);
        this._refiner = new DataRefiner(this._abstractDomain.lattice);
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(this.constructor.name);
        this._mergeOp = StandardMergeOperatorFactory.create(this._config.mergeOperator, this._abstractDomain);
    }

    abstractSucc(fromState: DataAbstractState): Iterable<DataAbstractState> {
        return this._transferRelation.abstractSucc(fromState);
    }

    join(state1: DataAbstractState, state2: DataAbstractState): DataAbstractState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    shouldMerge(state1: DataAbstractState, state2: DataAbstractState): boolean {
        return this._mergeOp.shouldMerge(state1, state2);
    }

    merge(state1: DataAbstractState, state2: DataAbstractState): DataAbstractState {
        return this.join(state1, state2);
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

    widen(state: DataAbstractState): DataAbstractState {
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

    get refiner(): Refiner<DataAbstractState> {
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

    getPartitionKeys(element: DataAbstractState): ImmSet<PartitionKey> {
        return ImmSet([new PartitionKey(ImmList())]);
    }

}
