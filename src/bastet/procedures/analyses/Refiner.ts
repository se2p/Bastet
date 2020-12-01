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


import {AbstractElement, AbstractState} from "../../lattices/Lattice";
import {Preconditions} from "../../utils/Preconditions";
import {FrontierSet, ReachedSet} from "../algorithms/StateSet";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {AccessibilityRelation} from "./Accessibility";
import {AbstractionState} from "./abstraction/AbstractionAbstractDomain";

export interface Refiner<E extends AbstractElement, F extends AbstractState> {

    /**
     * Check if a given state is feasible, that is, if it describes
     * a concrete state that is also reachable in a concrete program execution.
     *
     * @param e: The abstract state to check feasibility for.
     * @param purpose??: An information for logging and performance debugging
     *      which describes the purpose of the feasibility check.
     */
    checkIsFeasible(reached: ReachedSet<F>, e: E, purpose?: string): boolean;

    /**
     * Refine the abstraction precision of the analysis to rule
     * out a spurious (infeasible) counterexample.
     *
     * @param frontier: The set of frontier states of the reachability analysis.
     * @param reached: The set of abstract states that have been reached, including infeasible ones.
     * @param infeasibleState: The infeasible state that should be eliminated by the refinement.
     */
    refinePrecision(frontier: FrontierSet<F>, reached: ReachedSet<F>, infeasibleState: E): [FrontierSet<F>, ReachedSet<F>];

}

export interface Unwrapper<E extends AbstractElement, W extends AbstractElement> {

    unwrap(e: E): W;

}

export interface Wrapper<E extends AbstractElement, W extends AbstractElement> {

    wrap(e: W): E;

}

export class WrappingRefiner<F extends AbstractState, E extends AbstractElement, W extends AbstractElement> implements Refiner<E, F>{

    private readonly _wrapped: Refiner<E, F>;
    private readonly _unwrapper: Unwrapper<E, W>;

    constructor(wrapped: Refiner<E, F>, unwrapper: Unwrapper<E, W>) {
        this._wrapped = Preconditions.checkNotUndefined(wrapped);
        this._unwrapper = Preconditions.checkNotUndefined(unwrapper);
    }

    checkIsFeasible(reached: ReachedSet<F>, e: E, purpose?: string): boolean {
        return this._wrapped.checkIsFeasible(reached, e, purpose);
    }

    refinePrecision(frontier: FrontierSet<F>, reached: ReachedSet<F>, infeasibleState: E): [FrontierSet<F>, ReachedSet<F>] {
        throw new ImplementMeException();
    }

}
