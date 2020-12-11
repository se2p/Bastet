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
import {ImplementMeException, ImplementMeForException} from "../../../core/exceptions/ImplementMeException";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {AbstractionState, AbstractionStateLattice} from "./AbstractionAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";
import {
    BooleanFormula,
    FirstOrderFormula,
    FloatFormula,
    IntegerFormula,
    ListFormula,
    RealFormula,
    StringFormula
} from "../../../utils/ConjunctiveNormalForm";
import {PrecisionOperator} from "./AbstractionComputation";
import {PrecisionRole, PredicatePrecision, PredicatePrecisionLattice} from "../../AbstractionPrecision";
import {AccessibilityRelation} from "../Accessibility";
import {FirstOrderSolver} from "../../domains/FirstOrderDomain";
import {TransformerTheories} from "../../domains/MemoryTransformer";
import {BastetConfiguration} from "../../../utils/BastetConfiguration";
import {getTheOnlyElement} from "../../../utils/Collections";
import {AbstractionStateStates} from "./AbstractionStates";
import {DataAbstractStates} from "../../../../../../../../../../Users/stahlbau/uni/develop/bastet-framework/src/bastet/procedures/analyses/data/DataAbstractStates";
import {SSAAbstractStates} from "../../../../../../../../../../Users/stahlbau/uni/develop/bastet-framework/src/bastet/procedures/analyses/ssa/SSAAbstractStates";

export class AbstractionRefinerConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ['AbstractionRefiner']);
    }

    get useLazyAbstraction(): boolean {
        return this.getBoolProperty('use-lazy-abstraction', false);
    }
}

class InterpolationSolution {
    private readonly _targetState: AbstractState;
    private readonly _interpolants: FirstOrderFormula[];

    constructor(e: AbstractState, interpolants: FirstOrderFormula[]) {
        this._targetState = Preconditions.checkNotUndefined(e);
        this._interpolants = Preconditions.checkNotUndefined(interpolants);
    }

    get targetState(): AbstractState {
        return this._targetState;
    }

    get interpolants(): FirstOrderFormula[] {
        return this._interpolants;
    }
}

export class AbstractionRefiner implements Refiner<AbstractState>, PrecisionOperator<AbstractionState, PredicatePrecision> {

    private readonly _unwrapper: Unwrapper<AbstractState, AbstractElement>;

    private readonly _lattice: AbstractionStateLattice;
    private readonly _prover: FirstOrderSolver<FirstOrderFormula>;
    private readonly _theories: TransformerTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>;
    private _lastInterpolationSolution: InterpolationSolution;

    private _currentPrecision: PredicatePrecision;
    private readonly _precisionLattice: PredicatePrecisionLattice<FirstOrderFormula>;
    private readonly _config: AbstractionRefinerConfig;

    constructor(config: {}, unwrapper: Unwrapper<AbstractState, AbstractElement>, lattice: AbstractionStateLattice, theories: TransformerTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>,
                precisionLattice: PredicatePrecisionLattice<FirstOrderFormula>, prover: FirstOrderSolver<FirstOrderFormula>) {
        this._config = new AbstractionRefinerConfig(config);
        this._unwrapper = Preconditions.checkNotUndefined(unwrapper);
        this._lattice = Preconditions.checkNotUndefined(lattice);
        this._prover = prover;
        this._theories = Preconditions.checkNotUndefined(theories);
        this._precisionLattice = Preconditions.checkNotUndefined(precisionLattice);
        this._currentPrecision = precisionLattice.bottom();
    }

    public checkIsFeasible(reached: ReachedSet<AbstractState>, ar: AccessibilityRelation<AbstractionState>, e: AbstractState, purpose?: string): boolean {
        // 1. Build the abstract path formula (describes a set of paths)
        // 1.1 Extract the sequence of states for that a widening was computed along the
        // given accessibility relation.
        const wideningStateSeq: AbstractionState[] = this.getBlockStateSequence(ar, e);
        const alignedBlockFormulas: FirstOrderFormula[] = this.alignSsaIndices(wideningStateSeq, this.extractTraceBlockFormulas(wideningStateSeq));
        Preconditions.checkState(wideningStateSeq.length == alignedBlockFormulas.length);

        // Use:
        //      isWideningState function
        //      DataAbstractStates.extractFrom(...)

        // ATTENTION: We assume that there is only one unique sequence of
        // abstraction states along the abstract reachability relation.

        // 2. Check the feasibility of the trace formula
        this._prover.push();
        try {
            for (const blockFormula of alignedBlockFormulas) {
                console.log(this._prover.stringRepresentation(blockFormula));
                this._prover.assert(blockFormula);
            }

            const feasible = !this._prover.isUnsat();

            if (!feasible) {
                console.log("Interpolants needed!");
                // Compute interpolant
                const interpolants: FirstOrderFormula[] = this._prover.collectInterpolants();
                Preconditions.checkState(interpolants.length === alignedBlockFormulas.length - 1,
                    "There should have been one interpolant for each intermediate point");
                this._lastInterpolationSolution = new InterpolationSolution(e, interpolants);
            } else {
                console.log("Seems to be a feasible counterexample!");
            }

            return feasible;
        } finally {
            this._prover.pop();
        }
    }

    alignSsaIndices(wideningStateSeq: AbstractionState[], blockFormulas: FirstOrderFormula[]): FirstOrderFormula[] {
        Preconditions.checkArgument(blockFormulas.length > 0);
        const result: FirstOrderFormula[] = [blockFormulas[0]];


        return result;
    }

    public refinePrecision(frontier: FrontierSet<AbstractState>, reached: ReachedSet<AbstractState>,
                           ar: AccessibilityRelation<AbstractionState>,
                           infeasibleState: AbstractState): [FrontierSet<AbstractState>, ReachedSet<AbstractState>] {
        // TODO: welchen Teil vom ReachedSet wegwerfen?
        //  -> Man wirft den Teil weg, der infeasible ist
        //  -> Und man wirft den Teil weg, für den die Precision zu niedrig war
        // TODO: welche Prädikate sollen zur AbstractionPrecision hinzugefügt werden?
        //  ->

        // Cache must have been filled before invoking this method.
        Preconditions.checkState(this._lastInterpolationSolution !== null);

        Preconditions.checkArgument(infeasibleState === this._lastInterpolationSolution.targetState);

        this._currentPrecision = this._lastInterpolationSolution.interpolants
            .map((f) => new PredicatePrecision([f], PrecisionRole.INTERMEDIATE))
            .reduce((precision, last) => this._precisionLattice.join(precision, last),
                this._currentPrecision);

        if (this._config.useLazyAbstraction) {
            throw new ImplementMeForException("Lazy abstraction not yet supported");
        } else {
            for (const e of ar.initial()) {
                reached.removeAll(ar.successorsOf(e));
            }
            return [frontier, reached];
        }
    }

    /**
     * Determine whether or not a widening was performed for a given abstract state.
     *
     * @param state
     * @private
     */
    private isWideningState(state: AbstractionState) {
        return state.getWideningOf().isPresent();
    }

    public precisionFor(state: AbstractionState): PredicatePrecision {
        return state.getPrecision().stack.reduce((pi: PredicatePrecision, result: PredicatePrecision) =>
            this._lattice.precStacLattice.lattice.join(pi, result), this._currentPrecision);
    }

    private getBlockStateSequence(ar: AccessibilityRelation<AbstractState>, target: AbstractState): AbstractionState[] {
        const result: AbstractionState[] = [];

        const worklist: AbstractState[] = [];
        worklist.push(target);

        while (worklist.length > 0) {
            const state: AbstractState = worklist.pop();
            const abst: AbstractionState = getTheOnlyElement(AbstractionStateStates.extractFrom(state));
            if (abst.getWideningOf().isPresent() || state === target) {
                result.push(abst);
            }

            for (const pred of ar.predecessorsOf(state)) {
                worklist.push(pred);
            }
        }

        return result.reverse();
    }

    private static getSingleAbstractionState(e: AbstractState): AbstractionState {
        return getTheOnlyElement(AbstractionStateStates.extractFrom(e));
    }

    private extractTraceBlockFormulas(wideningStateSeq: AbstractionState[]): FirstOrderFormula[] {
        const result: FirstOrderFormula[] = [];

        for (const abst of wideningStateSeq) {
             if (abst.getWideningOf().isPresent()) {
                 result.push(getTheOnlyElement(DataAbstractStates.extractFrom(abst.getWideningOf().getValue())).blockFormula);
             } else {
                 result.push(getTheOnlyElement(DataAbstractStates.extractFrom(abst)).blockFormula);
             }
        }

        return result;

    }
}