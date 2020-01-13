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

export interface AbstractElement {

}

export interface Lattice<E extends AbstractElement> {

    /**
     * The lattice's inclusion relation (is-less-or-equal).
     * @param element1
     * @param element2
     */
    isIncluded(element1: E, element2: E): boolean;

    /**
     * Determines the greatest lower bound (glb) of two given elements.
     * @param element1
     * @param element2
     */
    meet(element1: E, element2: E): E;

    /**
     * Determines the least upper bound (lub) of two given elements.
     * @param element1
     * @param element2
     */
    join(element1: E, element2: E): E;

    /**
     * Returns the bottom element of the lattice.
     */
    bottom(): E;

    /**
     * Returns the top element of the lattice.
     */
    top(): E;

}
