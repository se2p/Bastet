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

import {LabeledTransferRelation} from "../TransferRelation";
import {SSAState} from "./SSAAbstractDomain";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {AbstractElement} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export class SSATransferRelation implements LabeledTransferRelation<SSAState> {

    private readonly _wrapped: LabeledTransferRelation<AbstractElement>;

    constructor(wrappedTr: LabeledTransferRelation<AbstractElement>) {
        this._wrapped = Preconditions.checkNotUndefined(wrappedTr);
    }

    abstractSucc(fromState: SSAState): Iterable<SSAState> {
        throw new ImplementMeException();
    }

    abstractSuccFor(fromState: SSAState, op: ProgramOperation): Iterable<SSAState> {
        throw new ImplementMeException();
    }
    
}