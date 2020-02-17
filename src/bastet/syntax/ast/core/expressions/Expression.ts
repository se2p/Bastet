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

import {ScratchType} from "../ScratchType";
import {AstNode} from "../../AstNode";

export interface Expression extends AstNode {

    type: ScratchType;

}

export class Expressions {

    private static EXPRESSION_ID_SEQ: number;
    private static EXPR_TO_ID_MAP: Map<string, number>;

    public static freshId(): number {
        if (!Expressions.EXPRESSION_ID_SEQ) {
            Expressions.EXPRESSION_ID_SEQ = 0;
        }
        return Expressions.EXPRESSION_ID_SEQ++;
    }

    static idFor(param: Expression): number {
        if (!Expressions.EXPR_TO_ID_MAP) {
            Expressions.EXPR_TO_ID_MAP = new Map();
        }

        const key = param.toTreeString();
        let result = Expressions.EXPR_TO_ID_MAP.get(key);
        if (result === undefined)  {
            result = this.freshId();
            Expressions.EXPR_TO_ID_MAP.set(key, result);
        }

        return result;
    }
}
