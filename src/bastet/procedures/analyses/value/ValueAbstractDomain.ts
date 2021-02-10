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

import {AbstractElementVisitor, AbstractState, Lattice, LatticeWithComplements} from "../../../lattices/Lattice";
import {Record as ImmRec} from "immutable";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {ConcreteDomain, ConcreteMemory, ConcreteMemoryLattice,} from "../../domains/ConcreteElements";
import {AbstractionPrecision} from "../../AbstractionPrecision";

export type ValueAbstractState = ConcreteMemory;

export class ValueAbstractDomain implements AbstractDomain<ConcreteMemory, ConcreteMemory> {

    private readonly _lattice: Lattice<ConcreteMemory>;

    constructor() {
        this._lattice = new ConcreteMemoryLattice();
    }

    abstract(elements: Iterable<ConcreteMemory>): ConcreteMemory {
        throw new ImplementMeException();
    }

    concretize(element: ValueAbstractState): Iterable<ConcreteMemory> {
        throw new ImplementMeException();
    }

    concretizeOne(element: ValueAbstractState): ConcreteMemory {
        return element;
    }

    widen(element: ValueAbstractState, precision: AbstractionPrecision): ConcreteMemory {
        throw new ImplementMeException();
    }

    get lattice(): Lattice<ConcreteMemory> {
        return this._lattice;
    }

    get concreteDomain(): ConcreteDomain<ConcreteMemory> {
        throw new ImplementMeException();
    }

    composeSeq(e1: ValueAbstractState, e2: ValueAbstractState): ConcreteMemory {
        throw new ImplementMeException();
    }
}


