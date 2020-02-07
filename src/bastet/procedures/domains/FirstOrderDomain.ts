/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net),
 *   see the file CONTRIBUTORS.md for the list of contributors.
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


import {AbstractDomain, AbstractionPrecision} from "./AbstractDomain";
import {ConcreteDomain, ConcreteElement} from "./ConcreteElements";
import {FirstOrderFormula} from "../../utils/ConjunctiveNormalForm";
import {Lattice} from "../../lattices/Lattice";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";

export interface FirstOrderLattice extends Lattice<FirstOrderFormula> {

}

export class FirstOrderDomain implements AbstractDomain<ConcreteElement, FirstOrderFormula> {

    private readonly _concreteDomain: ConcreteDomain<ConcreteElement>;
    private readonly _lattice: FirstOrderLattice;

    constructor(concreteDomain: ConcreteDomain<ConcreteElement>, lattice: FirstOrderLattice) {
        this._concreteDomain = concreteDomain;
        this._lattice = lattice;
    }

    abstract(elements: Iterable<ConcreteElement>): FirstOrderFormula {
        throw new ImplementMeException();
    }

    concretize(element: FirstOrderFormula): Iterable<ConcreteElement> {
        throw new ImplementMeException();
    }

    widen(element: FirstOrderFormula, precision: AbstractionPrecision): FirstOrderFormula {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<ConcreteElement> {
        return this._concreteDomain;
    }

    get lattice(): FirstOrderLattice {
        return this._lattice;
    }
}
