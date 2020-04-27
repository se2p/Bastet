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

import {MergeOperator} from "../ProgramAnalysis";
import {TimeState} from "./TimeAbstractDomain";

export class TimeMergeOperator implements MergeOperator<TimeState> {

    private readonly _wrappedMergeOp: MergeOperator<any>;

    constructor(wrappedMergeOp: MergeOperator<any>) {
        this._wrappedMergeOp = wrappedMergeOp;
    }

    merge(state1: TimeState, state2: TimeState): TimeState {
        const wrappedMerged = this._wrappedMergeOp.merge(state1.getWrappedState(), state2.getWrappedState());
        return state1.withWrappedState(wrappedMerged);
    }

    shouldMerge(state1: TimeState, state2: TimeState): boolean {
        return state1.getTimedBlockStack().equals(state2.getTimedBlockStack())
            && this._wrappedMergeOp.shouldMerge(state1.getWrappedState(), state2.getWrappedState());
    }


}