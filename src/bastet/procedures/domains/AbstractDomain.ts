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
import {ConcreteDomain, ConcreteElement} from "./ConcreteElements";
import {NotSupportedException} from "../../core/exceptions/NotSupportedException";

export class ConcreteNumberElement implements ConcreteElement {

}

export class ConcreteBoolElement implements ConcreteElement {

}

export class ConcreteStringElement implements ConcreteElement {

}

export class ConcreteListElement implements ConcreteElement {

}

export class ConcreteMapElement implements ConcreteElement {

}

export interface AbstractionPrecision {

}

export interface Concretizer<C extends ConcreteElement, E extends AbstractElement> {

    concretize(element: E): Iterable<C>;

    concretizeOne(element: E): C;

}

export class UnavailableConcretizer<C extends ConcreteElement, E extends AbstractElement> implements Concretizer<C, E> {

    concretize(element: E): Iterable<C> {
        throw new NotSupportedException();
    }

    concretizeOne(element: E): C {
        throw new NotSupportedException();
    }

}

export interface AbstractDomain<C extends ConcreteElement, E extends AbstractElement> extends Concretizer<C, E> {

    lattice: Lattice<E>;

    abstract(elements: Iterable<C>): E;

    widen(element: E, precision: AbstractionPrecision): E;

    concreteDomain: ConcreteDomain<C>;

}
