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
import {AbstractString} from "./MemoryTransformer";
import {Lattice} from "../../lattices/Lattice";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {ConcreteDomain, ConcreteString} from "./ConcreteElements";

export class FlatStringValueDomain implements AbstractDomain<ConcreteString, AbstractString> {

    lattice: Lattice<AbstractString>;

    abstract(elements: Iterable<ConcreteString>): AbstractString {
        throw new ImplementMeException();
    }

    concretize(element: AbstractString): Iterable<ConcreteString> {
        throw new ImplementMeException();
    }

    widen(element: AbstractString, precision: AbstractionPrecision): AbstractString {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<ConcreteString> {
        throw new ImplementMeException();
    }

}
