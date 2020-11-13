/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of PaAbstractionu (uni-paAbstractionu.de)
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

import {LabeledTransferRelation} from "../TransferRelation";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {AbstractElement} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {Concern} from "../../../syntax/Concern";
import {AbstractionState} from "./AbstractionAbstractDomain";

export class AbstractionTransferRelation implements LabeledTransferRelation<AbstractionState> {

    private readonly _wrapped: LabeledTransferRelation<AbstractElement>;

    constructor(wrappedTr: LabeledTransferRelation<AbstractElement>) {
        this._wrapped = Preconditions.checkNotUndefined(wrappedTr);
    }

    abstractSucc(fromState: AbstractionState): Iterable<AbstractionState> {
        throw new IllegalStateException("This TR is only applicable to labeled transitions");
    }

    abstractSuccFor(fromState: AbstractionState, op: ProgramOperation, co: Concern): Iterable<AbstractionState> {
        const result: AbstractionState[] = [];
        for (const w of this._wrapped.abstractSuccFor(fromState.wrappedState, op, co)) {
            result.push(fromState.withWrappedState(w));
        }

        return result;
    }

}
