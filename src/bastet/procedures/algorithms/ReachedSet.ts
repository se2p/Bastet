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

import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {AbstractElement} from "../../lattices/Lattice";

export class ReachedSet<E extends AbstractElement> {

    isEmpty(): boolean {
        throw new ImplementMeException();
    }

    getReached(inPartitionOf: E): ReachedSet<E> {
        throw new ImplementMeException();
    }

    public [Symbol.iterator](): IterableIterator<E> {
        throw new ImplementMeException();
    }

    removeAll(elements: Set<E>) {
       throw new ImplementMeException();
    }

    addAll(elements: Set<E>) {
        throw new ImplementMeException();
    }

    add(element: E) {
        throw new ImplementMeException();
    }
}
