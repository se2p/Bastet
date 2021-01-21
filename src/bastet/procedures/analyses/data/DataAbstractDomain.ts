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

import {AbstractElementVisitor, AbstractState, LatticeWithComplements} from "../../../lattices/Lattice";
import {Record as ImmRec} from "immutable";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {FirstOrderFormula} from "../../../utils/ConjunctiveNormalForm";
import {ConcreteDomain, ConcreteMemory,} from "../../domains/ConcreteElements";
import {PropositionalFormula} from "../../../utils/bdd/BDD";
import {Preconditions} from "../../../utils/Preconditions";
import {FirstOrderDomain, FirstOrderLattice, FirstOrderSolver} from "../../domains/FirstOrderDomain";
import {AbstractionPrecision} from "../../AbstractionPrecision";

export interface DataAbstractStateAttributes {

    blockFormula: FirstOrderFormula;

}

const DataAbstractStateRecord = ImmRec({

    blockFormula: null,

});

export class DataAbstractState extends DataAbstractStateRecord implements DataAbstractStateAttributes, AbstractState {

    blockFormula: FirstOrderFormula;

    constructor(blockFormula: FirstOrderFormula) {
        super({blockFormula: blockFormula});
    }

    public withBlockFormula(value: FirstOrderFormula): DataAbstractState {
        return this.set('blockFormula', value);
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

    constructor(folLattice: LatticeWithComplements<FirstOrderFormula>) {
        this._folLattice = Preconditions.checkNotUndefined(folLattice);
        this._bottom = new DataAbstractState(folLattice.bottom());
        this._top = new DataAbstractState(folLattice.top());
    }

    bottom(): DataAbstractState {
        return this._bottom;
    }

    isIncluded(element1: DataAbstractState, element2: DataAbstractState): boolean {
        Preconditions.checkNotUndefined(element1);
        Preconditions.checkNotUndefined(element2);

        return this._folLattice.isIncluded(element1.blockFormula, element2.blockFormula);
    }

    join(element1: DataAbstractState, element2: DataAbstractState): DataAbstractState {
        return element1
            .withBlockFormula(this._folLattice.join(element1.blockFormula, element2.blockFormula));
    }

    meet(element1: DataAbstractState, element2: DataAbstractState): DataAbstractState {
        return element1
            .withBlockFormula(this._folLattice.meet(element1.blockFormula, element2.blockFormula));
    }

    top(): DataAbstractState {
        return this._top;
    }

    complement(element: DataAbstractState): DataAbstractState {
        return new DataAbstractState(this._folLattice.complement(element.blockFormula));
    }

}

export class DataAbstractDomain implements AbstractDomain<ConcreteMemory, DataAbstractState> {

    private readonly _folDomain : FirstOrderDomain<FirstOrderFormula>;
    private readonly _lattice: LatticeWithComplements<DataAbstractState>;
    private readonly _solver: FirstOrderSolver<FirstOrderFormula>;

    constructor(folLattice: FirstOrderLattice<FirstOrderFormula>) {
        this._lattice = new DataAbstractStateLattice(folLattice);
        this._folDomain = new FirstOrderDomain(folLattice);
        this._solver = folLattice.prover;
    }

    abstract(elements: Iterable<ConcreteMemory>): DataAbstractState {
        throw new ImplementMeException();
    }

    concretize(element: DataAbstractState): Iterable<ConcreteMemory> {
        throw new ImplementMeException();
    }

    concretizeOne(element: DataAbstractState): ConcreteMemory {
        return this._folDomain.concretizeOne(element.blockFormula);
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

    get folDomain(): FirstOrderDomain<FirstOrderFormula> {
        return this._folDomain;
    }
}


