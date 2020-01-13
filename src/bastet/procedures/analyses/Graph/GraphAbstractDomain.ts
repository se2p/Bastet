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


import {AbstractDomain, AbstractionPrecision, ConcreteElement} from "../AbstractDomain";
import {AbstractElement, Lattice} from "../../../lattices/Lattice";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export class GraphAbstractState implements AbstractElement {

    // TODO: Make use of Immutability.js
}

export class GraphAbstractStateLattice implements Lattice<GraphAbstractState> {

    bottom(): GraphAbstractState {
        throw new ImplementMeException();
    }

    isIncluded(element1: GraphAbstractState, element2: GraphAbstractState): boolean {
        throw new ImplementMeException();
    }

    join(element1: GraphAbstractState, element2: GraphAbstractState): GraphAbstractState {
        throw new ImplementMeException();
    }

    meet(element1: GraphAbstractState, element2: GraphAbstractState): GraphAbstractState {
        throw new ImplementMeException();
    }

    top(): GraphAbstractState {
        throw new ImplementMeException();
    }

}

export class GraphAbstractDomain implements AbstractDomain<GraphAbstractState> {

    private readonly _lattice: GraphAbstractStateLattice;

    get lattice(): Lattice<GraphAbstractState> {
        return this._lattice;
    }

    abstract(elements: Iterable<ConcreteElement>): GraphAbstractState {
        throw new ImplementMeException();
    }

    concretize(element: GraphAbstractState): Iterable<ConcreteElement> {
        throw new ImplementMeException();
    }

    widen(element: GraphAbstractState, precision: AbstractionPrecision): GraphAbstractState {
        throw new ImplementMeException();
    }

}
