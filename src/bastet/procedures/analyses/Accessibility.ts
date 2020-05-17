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

import {AbstractElement, AbstractState} from "../../lattices/Lattice";
import {ConcreteElement} from "../domains/ConcreteElements";
import {ProgramOperation} from "../../syntax/app/controlflow/ops/ProgramOperation";

/**
 * The accessibility relation of an abstract reachability graph
 * (or Kripke structure, which is a specialization of an ARG).
 *
 * Please note that an accessibility relation can be refined.
 * In the coarsest relation, each state is reachable
 * directly from each other state.
 */
export interface AccessibilityRelation<E extends AbstractElement, F extends AbstractState> {

    /**
     *
     * @param state
     * @throws Exception if `state` is not in the accessibility relation.
     */
    successorsOf(state: F): Iterable<F>;

    /**
     * Important: Only the initial state has the empty set of predecessor states.
     * An exception is throw for all other states that are not in the
     * accessibility relation.
     *
     * @param state
     */
    predecessorsOf(state: F): Iterable<F>;

    /**
     * Is the given abstract state `state` reachable on in this
     * accessibility relation? (overapproximation!)
     */
    isReachable(state: F): boolean;

}

export interface LabeledAccessibilityRelation<E extends AbstractElement, F extends AbstractState>
    extends AccessibilityRelation<E, F> {

    getTransitionLabel(from: E, to: E): ProgramOperation[];

}

/**
 * An accessibility relation that pairs a particular set of concrete states
 * to each abstract state.
 *
 * Helper to testify to a particular test case.
 */
export interface ConcretizedAccessibilityRelation<E extends AbstractElement, F extends AbstractState>
    extends AccessibilityRelation<E, F> {

    getOneConcretizedFor(state: AbstractState): ConcreteElement;

}