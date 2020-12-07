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

import {AbstractState} from "../../../lattices/Lattice";
import {AbstractionPrecision, PredicatePrecision, PredicatePrecisionLattice} from "../../AbstractionPrecision";
import {AbstractionState} from "./AbstractionAbstractDomain";
import {FirstOrderFormula} from "../../../utils/ConjunctiveNormalForm";
import {Preconditions} from "../../../utils/Preconditions";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {FirstOrderLattice} from "../../domains/FirstOrderDomain";
import {AbstractionStateLattice} from "../../../../../../../../../../Users/stahlbau/uni/develop/bastet-framework/src/bastet/procedures/analyses/abstraction/AbstractionAbstractDomain";
import {doc} from "prettier";

export interface AbstractionComputation<E extends AbstractState, P extends AbstractionPrecision> {

    computeAbstraction(of: E, withPrecision: P): E;

}

export interface PrecisionOperator<E extends AbstractState, P extends AbstractionPrecision> {

    precisionFor(state: E): P;
}

export abstract class PredicateAbstraction implements AbstractionComputation<AbstractionState, PredicatePrecision> {

    protected readonly _precLattice: PredicatePrecisionLattice<FirstOrderFormula>;

    protected readonly _stateLattice: AbstractionStateLattice;

    constructor(precLattice: PredicatePrecisionLattice<FirstOrderFormula>, stateLattice: AbstractionStateLattice) {
        this._precLattice = Preconditions.checkNotUndefined(precLattice);
        this._stateLattice = Preconditions.checkNotUndefined(stateLattice);
    }

    protected constructAbstractionProblem(of: AbstractionState): FirstOrderFormula {
        // 1. Instantiate the summary formula with SSA indices (should be zeros)

        // 2. Conjunct the instantiated summary to the block formula and provide it as result.
        throw new ImplementMeException();
    }

    abstract computeAbstraction(of: AbstractionState, withPrecision: PredicatePrecision): AbstractionState;

}

export class BooleanPredicateAbstraction extends PredicateAbstraction {

    computeAbstraction(of: AbstractionState, withPrecision: PredicatePrecision): AbstractionState {
        const abstractionProblem: FirstOrderFormula = this.constructAbstractionProblem(of);
        const predicates: FirstOrderFormula[] = withPrecision.predicates.toArray();

        const newSummary: FirstOrderFormula = this._stateLattice.summaryLattice.prover
            .booleanAbstraction(abstractionProblem, predicates);

        return of.withAbstraction(newSummary)
            .withWrappedState(this._stateLattice.wrappedStateLattice.top());
    }

}

export class CartesianPredicateAbstraction extends PredicateAbstraction {

    computeAbstraction(of: AbstractionState, withPrecision: PredicatePrecision): AbstractionState {
        throw new ImplementMeException();
    }

}