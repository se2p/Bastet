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

import {AbstractState, Lattice} from "../../../lattices/Lattice";
import {AbstractionPrecision, PredicatePrecision, PredicatePrecisionLattice} from "../../AbstractionPrecision";
import {AbstractionState, AbstractionStateLattice} from "./AbstractionAbstractDomain";
import {
    BooleanFormula,
    FirstOrderFormula,
    FloatFormula,
    IntegerFormula, ListFormula,
    RealFormula, StringFormula
} from "../../../utils/ConjunctiveNormalForm";
import {Preconditions} from "../../../utils/Preconditions";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {FirstOrderSolver} from "../../domains/FirstOrderDomain";
import {AbstractTheories} from "../../domains/MemoryTransformer";
import {SSAMap, SSAState, SSAStateLattice} from "../ssa/SSAAbstractDomain";
import {DataAbstractStates} from "../data/DataAbstractStates";
import {from} from "immutable/contrib/cursor";
import {getTheOnlyElement} from "../../../utils/Collections";
import {SSAAbstractStates} from "../ssa/SSAAbstractStates";
import {DataLocations} from "../../../syntax/app/controlflow/DataLocation";

export interface AbstractionComputation<E extends AbstractState, P extends AbstractionPrecision> {

    computeAbstraction(of: E, withPrecision: P): E;

}

export interface PrecisionOperator<E extends AbstractState, P extends AbstractionPrecision> {

    precisionFor(state: E): P;
}

export abstract class PredicateAbstraction implements AbstractionComputation<AbstractionState, PredicatePrecision> {

    protected readonly _precLattice: PredicatePrecisionLattice<FirstOrderFormula>;

    protected readonly _stateToSummarizeLattice: Lattice<SSAState>;

    protected readonly _prover: FirstOrderSolver<FirstOrderFormula>

    private readonly _theories: AbstractTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>;

    constructor(
        theories: AbstractTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>,
        prover: FirstOrderSolver<FirstOrderFormula>,
        precLattice: PredicatePrecisionLattice<FirstOrderFormula>, stateToSummarizeLattice: Lattice<SSAState>) {
        this._precLattice = Preconditions.checkNotUndefined(precLattice);
        this._stateToSummarizeLattice = Preconditions.checkNotUndefined(stateToSummarizeLattice);
        this._theories = Preconditions.checkNotUndefined(theories);
        this._prover = Preconditions.checkNotUndefined(prover);
    }

    protected extractBlockFormula(fromState: AbstractionState): FirstOrderFormula {
        return getTheOnlyElement(DataAbstractStates.extractFrom(fromState)).blockFormula;
    }

    protected instantiatePred(predicate: FirstOrderFormula, ssa: SSAState) : FirstOrderFormula {
        const fnGetIndex = (name: string) => {
            return ssa.getIndex(name);
        };

        return this._theories.instantiate(predicate, fnGetIndex);
    }

    protected instantiatePrecisionFor(forState: AbstractState, predicates: FirstOrderFormula[]): FirstOrderFormula[] {
        const ssaState: SSAState = getTheOnlyElement(SSAAbstractStates.extractFrom(forState));
        return predicates.map((pred: FirstOrderFormula) => this.instantiatePred(pred, ssaState));
    }

    /**
     * Create a summary formula with all SSA indices at 0.
     *
     * @param formula
     * @protected
     */
    protected instantiateAsSummary(formula: FirstOrderFormula) : FirstOrderFormula {
        return this._theories.instantiate(formula, (v) => 0);
    }

    /**
     * Conjunct the instantiated summary to the block formula and provide it as result.
     * PRECONDITION: The summary formulas are instantiated with the SSA index zero
     *
     * @param of
     * @protected
     */
    protected constructAbstractionProblem(of: AbstractionState): FirstOrderFormula {
        return this._theories.boolTheory.and(of.getAbstraction(), this.extractBlockFormula(of));
    }

    abstract computeAbstraction(of: AbstractionState, withPrecision: PredicatePrecision): AbstractionState;

}

export class BooleanPredicateAbstraction extends PredicateAbstraction {

    computeAbstraction(of: AbstractionState, withPrecision: PredicatePrecision): AbstractionState {
        const abstractionProblem: FirstOrderFormula = this.constructAbstractionProblem(of);
        const instantiatedPredicates: FirstOrderFormula[] = this.instantiatePrecisionFor(of, withPrecision.predicates.toArray());
        const newSummary: FirstOrderFormula = this.instantiateAsSummary(this._prover.booleanAbstraction(abstractionProblem, instantiatedPredicates));

/*
        console.log("-ABST-PROB----------");
        console.log(this._prover.stringRepresentation(abstractionProblem));
        console.log("-INST-PI-----");
        instantiatedPredicates.forEach((p) => console.log(this._prover.stringRepresentation(p)));

        console.log(">>>");
        console.log(this._prover.stringRepresentation(newSummary));
*/

        return of.withAbstraction(newSummary)
            .withWrappedState(this._stateToSummarizeLattice.top());
    }

}

export class CartesianPredicateAbstraction extends PredicateAbstraction {

    computeAbstraction(of: AbstractionState, withPrecision: PredicatePrecision): AbstractionState {
        throw new ImplementMeException();
    }

}