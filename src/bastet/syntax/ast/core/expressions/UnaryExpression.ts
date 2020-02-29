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

import {AbstractNode, AstNode} from "../../AstNode";
import {Expression} from "./Expression";
import {ScratchType} from "../ScratchType";

export class UnaryExpression<A extends AstNode> extends AbstractNode implements Expression {

    private readonly _operand1: A;
    private readonly _type: ScratchType;

    constructor(type: ScratchType, op1: A) {
        super([op1]);
        this._operand1 = op1;
        this._type = type;
    }

    get operand1(): A {
        return this._operand1;
    }

    get expressionType(): ScratchType {
        return this._type;
    }

}
