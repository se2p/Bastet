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


import {AbstractElement, AbstractState} from "../lattices/Lattice";
import {Record as ImmRec, Set as ImmSet, List as ImmList} from "immutable";

export interface LexiKeyAttribs extends AbstractElement {

    tuple: ImmList<any>;

}

const LexiKeyRecord = ImmRec({

    tuple: ImmList()

});

export class LexiKey extends LexiKeyRecord implements LexiKeyAttribs {

    constructor(tuple: Iterable<any>) {
        super({tuple: ImmList(tuple)});
    }

    public getTuple(): ImmList<any> {
        return this.get("tuple");
    }

    public withTuple(tuple: Iterable<any>): this {
        return this.set("tuple", ImmList(tuple));
    }

    public concat(key: LexiKey): LexiKey {
        return this.withTuple(this.getTuple().concat(key.getTuple()));
    }

}