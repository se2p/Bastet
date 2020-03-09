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

import {AbsentAstNode, AbstractNode, OptionalAstNode, PresentAstNode} from "../AstNode";
import {Preconditions} from "../../../utils/Preconditions";

export class Identifier extends AbstractNode {

    private static readonly FRESH_PREFIX = "__tmp_";

    private readonly _name: string;

    constructor(name: string) {
        super([]);
        this._name = Preconditions.checkNotUndefined(name);
    }

    toTreeString(): string {
        return this._name;
    }

    public static of(txt: string) {
        return new Identifier(txt);
    }

    public static optional(val: Identifier|null): OptionalAstNode<Identifier> {
        if (!val) {
            return new AbsentAstNode();
        } else {
            return new PresentAstNode<Identifier>(val);
        }
    }

    private static FRESH_SEQ: number;

    public static fresh(): Identifier {
        return Identifier.freshWithPrefix(this.FRESH_PREFIX);
    }

    public static freshWithPrefix(prefix: string): Identifier {
        if (!this.FRESH_SEQ) {
            this.FRESH_SEQ = 0;
        }
        const num: number = this.FRESH_SEQ++;
        return new Identifier(`${prefix}${num}`);
    }

    private static RESULT_IDENT: Identifier = new Identifier("result");

    public static resultIdentifier(): Identifier {
        if (this.RESULT_IDENT === null) {
            this.RESULT_IDENT = new Identifier("result");
        }
        return this.RESULT_IDENT;
    }

    get text(): string {
        return this._name;
    }

}
