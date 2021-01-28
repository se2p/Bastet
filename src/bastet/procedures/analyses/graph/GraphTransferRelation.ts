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

import {TransferRelation} from "../TransferRelation";
import {GraphAbstractState, GraphAbstractStateFactory} from "./GraphAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";
import {AbstractSuccOperator, TraversalOrderOperator} from "../ProgramAnalysis";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {StatePartitionOperator} from "../../algorithms/StateSet";
import {LexiKey} from "../../../utils/Lexicographic";
import {AnalysisStatistics} from "../AnalysisStatistics";

export class GraphTransferRelation implements TransferRelation<GraphAbstractState> {

    private readonly _wrappedAbstractSucc: AbstractSuccOperator<AbstractElement>;
    private readonly _wrappedPartitionOp: StatePartitionOperator<AbstractElement>;
    private readonly _traversalOp: TraversalOrderOperator<AbstractElement, AbstractState>;
    private readonly _stats: AnalysisStatistics;

    constructor(wrappedAbstractSucc: AbstractSuccOperator<AbstractElement>, wrappedPartitionOp: StatePartitionOperator<AbstractElement>,
                traversalOp: TraversalOrderOperator<AbstractElement, AbstractState>, statistics: AnalysisStatistics) {
        this._wrappedAbstractSucc = Preconditions.checkNotUndefined(wrappedAbstractSucc);
        this._wrappedPartitionOp = Preconditions.checkNotUndefined(wrappedPartitionOp);
        this._traversalOp = Preconditions.checkNotUndefined(traversalOp);
        this._stats = Preconditions.checkNotUndefined(statistics).withContext(this.constructor.name);
    }

    abstractSucc(fromState: GraphAbstractState): Iterable<GraphAbstractState> {
        Preconditions.checkNotUndefined(fromState);
        const result = [];

        const wrappedSuccs = this._wrappedAbstractSucc.abstractSucc(fromState.wrappedState);

        for (const w of wrappedSuccs) {
            const newStateId = GraphAbstractStateFactory.freshStateID();
            const partitionKeys = this._wrappedPartitionOp.getPartitionKeys(w);
            const orderKey = this._traversalOp.getLexiOrderKey(w).concat(new LexiKey([-newStateId])); // Prefer older states;
            const succState = GraphAbstractStateFactory.withID(newStateId, [fromState.id], [], w, partitionKeys, orderKey);

            // console.log(`${fromState.getId()} ---> ${succState.getId()}`);
            result.push(succState);
        }

        return result;
    }

}
