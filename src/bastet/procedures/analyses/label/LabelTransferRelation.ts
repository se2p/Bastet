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
import {LabeledTransfer, LabelState} from "./LabelAbstractDomain";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Concern} from "../../../syntax/Concern";
import {List as ImmList, Record as ImmRec} from "immutable";
import {AbstractElement} from "../../../lattices/Lattice";
import {NotSupportedException} from "../../../core/exceptions/NotSupportedException";


export class LabelTransferRelation implements LabeledTransferRelation<LabelState> {

    private readonly _wrappedTransfer: LabeledTransferRelation<AbstractElement>;

    constructor(wrappedTransfer: LabeledTransferRelation<AbstractElement>) {
        this._wrappedTransfer = wrappedTransfer;
    }

    abstractSucc(fromState: LabelState): Iterable<LabelState> {
        throw new NotSupportedException();
    }

    abstractSuccFor(fromState: LabelState, op: ProgramOperation, co: Concern): Iterable<LabelState> {
        const result: LabelState[] = [];
        for (const w of this._wrappedTransfer.abstractSuccFor(fromState.wrappedState, op, co)) {
            result.push(fromState.withTransfers(ImmList([new LabeledTransfer(fromState, op)])).withWrappedState(w));
        }
        return result;
    }

}
