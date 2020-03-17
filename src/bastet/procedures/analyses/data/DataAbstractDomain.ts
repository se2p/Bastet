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

import {AbstractElementVisitor, AbstractState, LatticeWithComplements} from "../../../lattices/Lattice";
import {Record as ImmRec} from "immutable"
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {AbstractDomain, AbstractionPrecision} from "../../domains/AbstractDomain";
import {FirstOrderFormula} from "../../../utils/ConjunctiveNormalForm";
import {ConcreteDomain, ConcreteMemory} from "../../domains/ConcreteElements";
import {PropositionalFormula} from "../../../utils/bdd/BDD";
import {Preconditions} from "../../../utils/Preconditions";

export interface DataAbstractStateAttributes {

    blockFormula: FirstOrderFormula;

    summaryFormula: PropositionalFormula;

}

const DataAbstractStateRecord = ImmRec({

    blockFormula: null,

    summaryFormula: null

});

export class DataAbstractState extends DataAbstractStateRecord implements DataAbstractStateAttributes, AbstractState {

    blockFormula: FirstOrderFormula;
    summaryFormula: PropositionalFormula;

    constructor(blockFormula: FirstOrderFormula, summaryFormula: PropositionalFormula) {
        super({blockFormula: blockFormula, summaryFormula: summaryFormula});
    }

    public withBlockFormula(value: FirstOrderFormula): DataAbstractState {
        return this.set('blockFormula', value);
    }

    public withSummaryFormula(value: PropositionalFormula): DataAbstractState {
        return this.set('summaryFormula', value);
    }

    public accept<R>(visitor: AbstractElementVisitor<R>): R {
        const visitMethod: string = `visit${this.constructor.name}`;
        if (visitor[visitMethod]) {
            return visitor[visitMethod](this);
        } else {
            return visitor.visit(this);
        }
    }

}

export class DataAbstractStateLattice implements LatticeWithComplements<DataAbstractState> {

    private readonly _bottom: DataAbstractState;

    private readonly _top: DataAbstractState;

    private readonly _folLattice: LatticeWithComplements<FirstOrderFormula>;

    private readonly _propLattice: LatticeWithComplements<PropositionalFormula>;

    constructor(folLattice: LatticeWithComplements<FirstOrderFormula>, propLattice: LatticeWithComplements<PropositionalFormula>) {
        this._folLattice = Preconditions.checkNotUndefined(folLattice);
        this._propLattice = Preconditions.checkNotUndefined(propLattice);
        this._bottom = new DataAbstractState(folLattice.bottom(), propLattice.bottom());
        this._top = new DataAbstractState(folLattice.top(), propLattice.top());
    }

    bottom(): DataAbstractState {
        return this._bottom;
    }

    isIncluded(element1: DataAbstractState, element2: DataAbstractState): boolean {
        //if (!this._propLattice.isIncluded(element1.summaryFormula, element2.summaryFormula)) {
        //    return false;
        //}

        return this._folLattice.isIncluded(element1.blockFormula, element2.blockFormula);
    }

    join(element1: DataAbstractState, element2: DataAbstractState): DataAbstractState {
        return element1
            .withBlockFormula(this._folLattice.join(element1.blockFormula, element2.blockFormula))
            .withSummaryFormula(this._propLattice.join(element1.summaryFormula, element2.summaryFormula));
    }

    meet(element1: DataAbstractState, element2: DataAbstractState): DataAbstractState {
        return element1
            .withBlockFormula(this._folLattice.meet(element1.blockFormula, element2.blockFormula))
            .withSummaryFormula(this._propLattice.meet(element1.summaryFormula, element2.summaryFormula));
    }

    top(): DataAbstractState {
        return this._top;
    }

    complement(element: DataAbstractState): DataAbstractState {
        return new DataAbstractState(this._folLattice.complement(element.blockFormula),
            this._propLattice.complement(element.summaryFormula));
    }

}

export class DataAbstractDomain implements AbstractDomain<ConcreteMemory, DataAbstractState> {

    private readonly _lattice: LatticeWithComplements<DataAbstractState>;

    constructor(folLattice: LatticeWithComplements<FirstOrderFormula>, propLattice: LatticeWithComplements<PropositionalFormula>) {
        this._lattice = new DataAbstractStateLattice(folLattice, propLattice);
    }

    abstract(elements: Iterable<ConcreteMemory>): DataAbstractState {
        throw new ImplementMeException();
    }

    concretize(element: DataAbstractState): Iterable<ConcreteMemory> {
        throw new ImplementMeException();
    }

    widen(element: DataAbstractState, precision: AbstractionPrecision): DataAbstractState {
        throw new ImplementMeException();
    }

    get lattice(): LatticeWithComplements<DataAbstractState> {
        return this._lattice;
    }

    get concreteDomain(): ConcreteDomain<ConcreteMemory> {
        throw new ImplementMeException();
    }

}


