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

import {LabeledTransferRelation} from "../TransferRelation";
import {MemAbstractState} from "./MemAbstractDomain";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export class MemTransferRelation implements LabeledTransferRelation<MemAbstractState> {

    abstractSucc(fromState: MemAbstractState): Iterable<MemAbstractState> {
        throw new IllegalStateException("Only the labelled transfer is supported by this transfer relation");
    }

    abstractSuccFor(fromState: MemAbstractState, op: ProgramOperation): Iterable<MemAbstractState> {
        throw new ImplementMeException();
    }

}
