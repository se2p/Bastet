/*
 *   BASTET Program Analysis Framework
 *
 *   Copyright 2019 by University of Passau
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

export class BinaryExpression<A extends AstNode, B extends AstNode> extends AbstractNode implements Expression {

    private readonly _operand1: A;

    private readonly _operand2: B;

    private readonly _type: ScratchType;

    constructor(expressionType: ScratchType, op1: A, op2: B) {
        super(op1, op2);
        this._type = expressionType;
        this._operand1 = op1;
        this._operand2 = op2;
    }

    get operand1(): A {
        return this._operand1;
    }

    get operand2(): B {
        return this._operand2;
    }

    get type(): ScratchType {
        return this._type;
    }

}
