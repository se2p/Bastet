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
import {StringLiteral} from "./expressions/StringExpression";

export class Identifier extends AbstractNode {

    private static readonly FRESH_PREFIX = "__tmp_"

    private readonly _name: StringLiteral;

    constructor(name: StringLiteral) {
        super([name]);
        this._name = name;
    }

    public static optional(val: Identifier|null): OptionalAstNode<Identifier> {
        if (!val) {
            return new AbsentAstNode();
        } else {
            return new PresentAstNode<Identifier>(val);
        }
    }

    private static FRESH_SEQ: number = 0;

    public static fresh(): Identifier {
        const num: number = this.FRESH_SEQ++;
        return new Identifier(StringLiteral.from(`${this.FRESH_PREFIX}${num}`));
    }

}
