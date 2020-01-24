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

import {AbstractElement} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {Record as ImmRec, Set as ImmSet, Map as ImmMap} from "immutable"

// TODO: Also implement based on ImmRec that has a map-field with the data
export type MemAbstractState = ImmMap<string, any>;

export class MemAbstractStates {

    private static EMPTY: MemAbstractState;

    public static empty(): MemAbstractState {
        if (!MemAbstractStates.EMPTY) {
            MemAbstractStates.EMPTY = ImmMap();
        }
        return MemAbstractStates.EMPTY;
    }

    public static builder(baseState: MemAbstractState): MemAbstractStateBuilder {
       return new MemAbstractStateBuilder(baseState);
    }

}

export class MemAbstractStateBuilder {

    private _state: MemAbstractState;

    constructor(state: MemAbstractState) {
        this._state = Preconditions.checkNotUndefined(state);
    }

    public build(): MemAbstractState {
        return this._state;
    }

}
