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

import {AbstractElement} from "../../lattices/Lattice";
import {ProgramAnalysis} from "../analyses/ProgramAnalysis";
import {ChooseOperator, StateSet} from "./StateSet";
import {Preconditions} from "../../utils/Preconditions";
import {ConcreteElement} from "../domains/ConcreteElements";


/**
 * The implementation of this algorithm is inspired by the
 * reachability algorithm that can be found in the CPA framework;
 * nevertheless, our implementation has important differences.
 */
export class ReachabilityAlgorithm<C extends ConcreteElement, E extends AbstractElement> {

    private readonly _analysis: ProgramAnalysis<C, E>;
    private readonly _chooseOp: ChooseOperator<E>;

    constructor(analysis: ProgramAnalysis<C, E>, chooseOp: ChooseOperator<E>) {
        this._analysis = analysis;
        this._chooseOp = chooseOp;
    }

    get analysis(): ProgramAnalysis<C, E> {
        return this._analysis;
    }

    public run(frontier: StateSet<E>, reached: StateSet<E>): [StateSet<E>, StateSet<E>] {
        while (!frontier.isEmpty()) {
            // CHOOSE: Choose the next state to compute successors for.
            //      This step determines the state-space traversal strategy.
            const e: E = this._chooseOp.choose();
            frontier.remove(e);

            // SUCC: Compute the set of successor states
            for (const ePrime of this._analysis.abstractSucc(e)) {
                // WIDEN: Apply the widening operator.
                //    ATTENTION: We assume that the abstraction
                //      precision to use for widening is determined by an
                //      inner analysis component from the given abstract state `ePrime`.
                // TODO: Adjust the widening such that it can return a set of states?
                const ePrimePrime: E = this._analysis.widen(ePrime);

                // MERGE: If desired, merge certain states
                const removeFromReached: Set<E> = new Set<E>();
                const addToReached: Set<E> = new Set<E>();
                const relevantReached: StateSet<E> = reached.getStateSet(ePrimePrime);
                for (let r of relevantReached) {
                    if (this._analysis.merge(ePrimePrime, r)) {
                        const ePrimePrimePrime = this._analysis.join(ePrimePrime, r);
                        removeFromReached.add(r);
                        addToReached.add(ePrimePrimePrime);
                    }
                }
                reached.removeAll(removeFromReached);
                reached.addAll(addToReached);

                // STOP: Check for coverage (fixed point iteration)
                const checkStopFor: E = ePrimePrime; // TODO: How does this interact with the 'merge' above
                if (!this._analysis.stop(checkStopFor, reached)) {
                    frontier.add(checkStopFor);
                    reached.add(checkStopFor);

                    // TARGET: Has a target state been signaled?
                    if (this._analysis.target(checkStopFor)) {
                        return [frontier, reached];
                    }
                }
            }
        }

        Preconditions.checkState(frontier.isEmpty());
        return [frontier, reached];
    }

}
