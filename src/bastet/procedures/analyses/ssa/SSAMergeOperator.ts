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

import {AbstractSuccOperator, MergeOperator} from "../ProgramAnalysis";
import {SSAState} from "./SSAAbstractDomain";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";

export class SSAMergeOperator implements MergeOperator<SSAState> {

    private readonly _wrappedMergeOp: MergeOperator<AbstractState>;

    private readonly _wrappedAbstractSuccOp: AbstractSuccOperator<AbstractState>;

    constructor(wrappedMergeOp: MergeOperator<AbstractState>, wrappedAbstractSuccOp: AbstractSuccOperator<AbstractState>) {
        this._wrappedMergeOp = Preconditions.checkNotUndefined(wrappedMergeOp);
        this._wrappedAbstractSuccOp = Preconditions.checkNotUndefined(wrappedAbstractSuccOp);
    }

    merge(state1: SSAState, state2: SSAState): boolean {
        if (this._wrappedMergeOp.merge(state1.getWrappedState(), state2.getWrappedState())) {
            // Sync the SSA maps
            throw new ImplementMeException();
        } else {
            return false;
        }
    }

}
