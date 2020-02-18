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

import {Lattice} from "../../../lattices/Lattice";
import {Record as ImmRec} from "immutable"
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {AbstractDomain, AbstractionPrecision} from "../../domains/AbstractDomain";
import {FirstOrderFormula} from "../../../utils/ConjunctiveNormalForm";
import {ConcreteDomain, ConcreteMemory} from "../../domains/ConcreteElements";
import {PropositionalFormula} from "../../../utils/bdd/BDD";

export interface SyMemAbstractStateAttributes {

    blockFormula: FirstOrderFormula;

    summaryFormula: PropositionalFormula;

}

const SyMemAbstractStateRecord = ImmRec({

    blockFormula: null,
    summaryFormula: null

});

export class SymMemAbstractState extends SyMemAbstractStateRecord implements SyMemAbstractStateAttributes {

    blockFormula: FirstOrderFormula;
    summaryFormula: PropositionalFormula;

    constructor(blockFormula: FirstOrderFormula, summaryFormula: PropositionalFormula) {
        super({blockFormula: blockFormula, summaryFormula: summaryFormula});
    }

    public withBlockFormula(value: FirstOrderFormula): SymMemAbstractState {
        return this.set('blockFormula', value);
    }

    public withSummaryFormula(value: PropositionalFormula): SymMemAbstractState {
        return this.set('summaryFormula', value);
    }

}

export class SymMemAbstractStateLattice implements Lattice<SymMemAbstractState> {

    private readonly _bottom: SymMemAbstractState;

    private readonly _top: SymMemAbstractState;

    constructor(folLattice: Lattice<FirstOrderFormula>, propLattice: Lattice<PropositionalFormula>) {
        this._bottom = new SymMemAbstractState(folLattice.bottom(), propLattice.bottom());
        this._top = new SymMemAbstractState(folLattice.top(), propLattice.top());
    }

    bottom(): SymMemAbstractState {
        return this._bottom;
    }

    isIncluded(element1: SymMemAbstractState, element2: SymMemAbstractState): boolean {
        throw new ImplementMeException();
    }

    join(element1: SymMemAbstractState, element2: SymMemAbstractState): SymMemAbstractState {
        throw new ImplementMeException();
    }

    meet(element1: SymMemAbstractState, element2: SymMemAbstractState): SymMemAbstractState {
        throw new ImplementMeException();
    }

    top(): SymMemAbstractState {
        return this._top;
    }

}

export class SyMemAbstractDomain implements AbstractDomain<ConcreteMemory, SymMemAbstractState> {

    private readonly _lattice: Lattice<SymMemAbstractState>;

    constructor(folLattice: Lattice<FirstOrderFormula>, propLattice: Lattice<PropositionalFormula>) {
        this._lattice = new SymMemAbstractStateLattice(folLattice, propLattice);
    }

    abstract(elements: Iterable<ConcreteMemory>): SymMemAbstractState {
        throw new ImplementMeException();
    }

    concretize(element: SymMemAbstractState): Iterable<ConcreteMemory> {
        throw new ImplementMeException();
    }

    widen(element: SymMemAbstractState, precision: AbstractionPrecision): SymMemAbstractState {
        throw new ImplementMeException();
    }

    get lattice(): Lattice<SymMemAbstractState> {
        return this._lattice;
    }

    get concreteDomain(): ConcreteDomain<ConcreteMemory> {
        throw new ImplementMeException();
    }

}


