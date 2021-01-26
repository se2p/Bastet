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

import {Record as ImmRec} from "immutable";
import { IllegalArgumentException } from "../core/exceptions/IllegalArgumentException";
import {PerfTimer} from "../utils/PerfTimer";

/**
 * Common interface for all lattice elements.
 */
export interface AbstractElement extends ImmRec<any> {

}

/**
 * A visitor for {@link AbstractElement}s.
 */
export interface AbstractElementVisitor<T> {

    visit(element: AbstractElement): T;

}

/**
 * A lattice element that implements the visitor pattern.
 */
export interface AbstractState extends AbstractElement {

    accept<T>(visitor: AbstractElementVisitor<T>): T;

}

export interface WithReferenceCounting<E extends AbstractElement> {

    /**
     * Increment the number of references to this element.
     *
     * @param element
     */
    incRef(element: E);

    /**
     * Decrement the number of references to this element.
     *
     * @param element
     */
    decRef(element: E);
}

/**
 * A (bounded) lattice is an algebraic structure consisting of the following:
 *  - A partially ordered set of elements, also called {@link AbstractState abstract states}.
 *  - The partial order is given by the so called inclusion relation (is-less-or equal)
 *  - Every two elements have a least upper bound (join) and a greatest lower bound (meet).
 *  - In addition, if the lattice is bounded, there exists a greatest element (top) and a least element (bottom).
 */
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

/**
 * A bounded {@link Lattice} where every element `a: E` also has a complement `complement(a): E`. That is:
 * ```ts
 * meet(a, complement(a)) == meet(complement(a), a) == bottom()
 * join(a, complement(a)) == join(complement(a), a) == top()
 * ```
 */
export interface LatticeWithComplements<E extends AbstractElement> extends Lattice<E> {

    /**
     * Returns the complement of the given element.
     * @param element the element for which to return its complement
     */
    complement(element: E): E;

}

/**
 * Utility class for working with {@link Lattice}s.
 */
export class Lattices {

    private static isFeasible0<E extends AbstractElement>(element: E, inLattice: Lattice<E>) {
        return !inLattice.isIncluded(element, inLattice.bottom());
    }

    public static isFeasible<E extends AbstractElement>(element: E, inLattice: Lattice<E>, purpose: string = null) {
        let isFeasible: boolean;
        if (purpose) {
            console.group(`Feasibility Check (${purpose})...`);
        } else {
            console.group("Feasibility Check...");
        }

        const timer = new PerfTimer(null);
        timer.start();
        try {
            try {
                isFeasible = this.isFeasible0(element, inLattice);
                return isFeasible;
            } catch(e) {
                throw new IllegalArgumentException(`Checking feasibility for "${purpose}" failed: ${e.toString()}`);
            }
        } finally {
            timer.stop();
            console.log(`${isFeasible ? "Feasible" : "Infeasible"} ${timer.lastIntervalDuration}`)
            console.groupEnd();
        }

    }

}
