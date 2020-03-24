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

import {TransferRelation} from "../TransferRelation";
import {GraphAbstractState, GraphAbstractStateFactory} from "./GraphAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";
import {List as ImmList, Record as ImmRec, Set as ImmSet} from "immutable"
import {AbstractSuccOperator, PartitionOperator} from "../ProgramAnalysis";
import {AbstractElement} from "../../../lattices/Lattice";
import {StatePartitionOperator} from "../../algorithms/StateSet";

export class GraphTransferRelation implements TransferRelation<GraphAbstractState> {

    private readonly _wrappedAbstractSucc: AbstractSuccOperator<AbstractElement>;
    private readonly _wrappedPartitionOp: StatePartitionOperator<AbstractElement>;

    constructor(wrappedAbstractSucc: AbstractSuccOperator<AbstractElement>, wrappedPartitionOp: StatePartitionOperator<AbstractElement>) {
        this._wrappedAbstractSucc = Preconditions.checkNotUndefined(wrappedAbstractSucc);
        this._wrappedPartitionOp = Preconditions.checkNotUndefined(wrappedPartitionOp);
    }

    abstractSucc(fromState: GraphAbstractState): Iterable<GraphAbstractState> {
        Preconditions.checkNotUndefined(fromState);
        const result = [];
        const wrappedSuccs = this._wrappedAbstractSucc.abstractSucc(fromState.getWrappedState());
        for (const w of wrappedSuccs) {
            const wrappedKeys = this._wrappedPartitionOp.getPartitionKeys(w);
            const succState = GraphAbstractStateFactory.withFreshID([fromState.getId()], [], w, wrappedKeys);
            result.push(succState);
        }

        return result;
    }

}
