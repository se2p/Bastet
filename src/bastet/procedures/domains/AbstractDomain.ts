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

import {AbstractElement, Lattice} from "../../lattices/Lattice";
import {ConcreteDomain, ConcreteElement, ConcreteProgramState} from "./ConcreteElements";
import {NotSupportedException} from "../../core/exceptions/NotSupportedException";
import {AbstractionPrecision} from "../AbstractionPrecision";


/**
 * A concretizer is a function that maps an abstract element (of type `E`) to a concrete element (of type `C`).
 */
export interface Concretizer<C extends ConcreteElement, E extends AbstractElement> {

    concretize(element: E): Iterable<C>;

    concretizeOne(element: E): C;

    enrich(element: ConcreteElement): C;

}

export class UnavailableConcretizer<C extends ConcreteElement, E extends AbstractElement> implements Concretizer<C, E> {

    concretize(element: E): Iterable<C> {
        throw new NotSupportedException();
    }

    concretizeOne(element: E): C {
        throw new NotSupportedException();
    }

    enrich(element: ConcreteElement): C {
        throw new NotSupportedException();
    }

}

/**
 * An abstract domain consists of three components:
 *  - A set of concrete states of type `C`.
 *  - A (semi-)lattice, whose elements (of type `E`) are also called {@link AbstractElement abstract states}.
 *  - A concretization function that maps from `E` to `C`.
 */
export interface AbstractDomain<C extends ConcreteElement, E extends AbstractElement> extends Concretizer<C, E> {

    lattice: Lattice<E>;

    abstract(elements: Iterable<C>): E;

    widen(element: E, precision: AbstractionPrecision): E;

    concreteDomain: ConcreteDomain<C>;

    /**
     * Sequential composition of two abstract states. The exact meaning is defined by the domain.
     *
     * @param e1 an abstract state
     * @param e2 another abstract state
     * @return the sequential composition of the two given states
     */
    composeSeq(e1: E, e2: E): E;

}
