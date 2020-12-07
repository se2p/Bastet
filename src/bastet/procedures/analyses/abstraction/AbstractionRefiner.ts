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

import {Refiner, Unwrapper} from "../Refiner";
import {FrontierSet, ReachedSet} from "../../algorithms/StateSet";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {AbstractionState, AbstractionStateLattice} from "./AbstractionAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";
import {AccessibilityOperator} from "../ProgramAnalysis";
import {FirstOrderFormula} from "../../../utils/ConjunctiveNormalForm";
import {PrecisionOperator} from "./AbstractionComputation";
import {PredicatePrecision} from "../../AbstractionPrecision";

export class AbstractionRefiner implements Refiner<AbstractionState, AbstractState>, PrecisionOperator<AbstractionState, PredicatePrecision> {

    private readonly _unwrapper: Unwrapper<AbstractState, AbstractElement>;

    private readonly _lattice: AbstractionStateLattice;

    private readonly _accOp: AccessibilityOperator<AbstractionState, AbstractState>;

    constructor(unwrapper: Unwrapper<AbstractState, AbstractElement>, lattice: AbstractionStateLattice,
                accOp: AccessibilityOperator<AbstractionState, AbstractState>) {
        this._unwrapper = Preconditions.checkNotUndefined(unwrapper);
        this._lattice = Preconditions.checkNotUndefined(lattice);
        this._accOp = Preconditions.checkNotUndefined(accOp);
    }

    public checkIsFeasible(reached: ReachedSet<AbstractState>, e: AbstractionState, purpose?: string): boolean {
        // 1. Build the abstract path formula (describes a set of paths)
        const ar = this._accOp.accessibility(reached, e);

        // Use:
        //      isWideningState operator (from the CPA)
        //      DataAbstractStates.extractFrom(...)

        // ATTENTION: We assume that there is only one unique sequence of
        // abstraction states along the abstract reachability relation.

        // 2. Check the feasibility of the path formula
        const pathFormula: FirstOrderFormula = null;

        throw new ImplementMeException();
    }

    public refinePrecision(frontier: FrontierSet<AbstractState>, reached: ReachedSet<AbstractState>,
                           infeasibleState: AbstractState): [FrontierSet<AbstractState>, ReachedSet<AbstractState>] {
        // TODO: welchen Teil vom ReachedSet wegwerfen?
        //  -> Man wirft den Teil weg, der infeasible ist
        //  -> Und man wirft den Teil weg, für den die Precision zu niedrig war
        // TODO: welche Prädikate sollen zur AbstractionPrecision hinzugefügt werden?
        //  ->
        throw new ImplementMeException();
    }

    /**
     * Determine wheter or not a widening was performed for a given abstract state.
     *
     * @param state
     * @private
     */
    private isWideningState(state: AbstractionState) {
        return state.getWrappedState() === this._lattice.wrappedStateLattice.top();
    }

    public precisionFor(state: AbstractionState): PredicatePrecision {
        return state.getPrecision().stack.reduce((pi: PredicatePrecision, result: PredicatePrecision) =>
                this._lattice.precStacLattice.lattice.join(pi, result), this._lattice.precStacLattice.lattice.bottom());
    }

}