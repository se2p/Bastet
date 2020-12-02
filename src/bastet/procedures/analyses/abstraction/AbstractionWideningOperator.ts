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

import {WidenOperator} from "../ProgramAnalysis";
import {AbstractionState} from "./AbstractionAbstractDomain";
import {AbstractState} from "../../../lattices/Lattice";
import {PrecisionOperator, PredicateAbstraction} from "./AbstractionComputation";
import {Preconditions} from "../../../utils/Preconditions";
import {PredicatePrecision} from "../../AbstractionPrecision";

export class AbstractionWideningOperator implements WidenOperator<AbstractionState, AbstractState> {

    private readonly _predAbs: PredicateAbstraction;
    private readonly _precOp: PrecisionOperator<AbstractionState, PredicatePrecision>;

    constructor(predAbs: PredicateAbstraction, precOp: PrecisionOperator<AbstractionState, PredicatePrecision>) {
        this._predAbs = Preconditions.checkNotUndefined(predAbs);
        this._precOp = Preconditions.checkNotUndefined(precOp);
    }

    widen(state: AbstractionState, reached: Iterable<AbstractState>): AbstractionState {
        const pi: PredicatePrecision = this._precOp.precisionFor(state);
        return this._predAbs.computeAbstraction(state, pi);
    }

}