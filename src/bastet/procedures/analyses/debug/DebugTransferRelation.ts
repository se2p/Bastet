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


import {LabeledTransferRelation, TransferRelation} from "../TransferRelation";
import {List as ImmList} from "immutable";
import {AbstractElement} from "../../../lattices/Lattice";
import {DebugState} from "./DebugAbstractDomain";
import {clearDebugInfos, getDebugInfos} from "./DebugInfos";


export class DebugTransferRelation implements TransferRelation<DebugState> {

    private readonly _wrappedTransfer: TransferRelation<AbstractElement>;

    constructor(wrappedTransfer: LabeledTransferRelation<AbstractElement>) {
        this._wrappedTransfer = wrappedTransfer;
    }

    abstractSucc(fromState: DebugState): Iterable<DebugState> {
        const result: DebugState[] = [];
        for (const w of this._wrappedTransfer.abstractSucc(fromState.wrappedState)) {
            result.push(fromState
                .withDebugInfos(ImmList(getDebugInfos()))
                .withWrappedState(w));
        }

        clearDebugInfos();

        return result;
    }

}
