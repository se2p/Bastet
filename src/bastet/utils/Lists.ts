/*
 *   BASTET Program Analysis Framework
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

import {ImmutableList} from "./ImmutableList";

export class Lists {

    static immutableCopyOf<E>(elements: E[]): ImmutableList<E> {
        return new ImmutableList(elements);
    }

    static concatImmutableLists<E>(list1: ImmutableList<E>, list2: ImmutableList<E>): ImmutableList<E> {
        let result: Array<E> = new Array();
        for (let e1 of list1) {
            result.push(e1);
        }
        for (let e2 of list2) {
            result.push(e2);
        }
        return new ImmutableList(result);
    }
}
