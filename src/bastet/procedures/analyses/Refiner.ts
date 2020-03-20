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


import {AbstractElement} from "../../lattices/Lattice";
import {Preconditions} from "../../utils/Preconditions";

export interface Refiner<E extends AbstractElement> {

    checkIsFeasible(e: E): boolean;

}

export interface Unwrapper<E extends AbstractElement, W extends AbstractElement> {

    unwrap(e: E): W;

}

export interface Wrapper<E extends AbstractElement, W extends AbstractElement> {

    wrap(e: W): E;

}

export class WrappingRefiner<E extends AbstractElement, W extends AbstractElement> implements Refiner<E>{

    private readonly _wrapped: Refiner<W>;
    private readonly _unwrapper: Unwrapper<E, W>;

    constructor(wrapped: Refiner<W>, unwrapper: Unwrapper<E, W>) {
        this._wrapped = Preconditions.checkNotUndefined(wrapped);
        this._unwrapper = Preconditions.checkNotUndefined(unwrapper);
    }

    checkIsFeasible(e: E): boolean {
        const w = this._unwrapper.unwrap(e);
        return this._wrapped.checkIsFeasible(w);
    }

}
