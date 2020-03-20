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
import {StateLabelVisitor} from "../StateVisitors";

export class GraphTransferRelation implements TransferRelation<GraphAbstractState> {

    private readonly _wrappedAbstractSucc: (GraphAbstractState) => Iterable<GraphAbstractState>;

    constructor(wrappedAbstractSucc: (GraphAbstractState) => Iterable<GraphAbstractState>) {
        this._wrappedAbstractSucc = Preconditions.checkNotUndefined(wrappedAbstractSucc);
    }

    abstractSucc(fromState: GraphAbstractState): Iterable<GraphAbstractState> {
        Preconditions.checkNotUndefined(fromState);
        const result = [];
        const wrappedSuccs = this._wrappedAbstractSucc(fromState.getWrappedState());
        for (const w of wrappedSuccs) {
            const succState = GraphAbstractStateFactory.withFreshID([fromState.getId()], [], w);
            result.push(succState);
        }

        return result;
    }

}
