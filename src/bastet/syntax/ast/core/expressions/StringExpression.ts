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

import {Expression} from "./Expression";
import {AbstractNode, AstNode} from "../../AstNode";
import {AbstractExpression} from "./AbstractExpression";
import {ScratchType, StringType} from "../ScratchType";
import {NumberExpression} from "./NumberExpression";
import {BooleanExpression} from "./BooleanExpression";
import {Identifier} from "../Identifier";
import {BinaryExpression} from "./BinaryExpression";

export class StringLiteral extends AbstractNode {

}

export interface StringExpression extends Expression {

}

export abstract class AbstractStringExpression extends AbstractExpression implements StringExpression {

    protected constructor(childs: AstNode[]) {
        super(StringType.instance(), childs);
    }

}

export class NumAsStringExpression extends AbstractStringExpression {

    private readonly _num: NumberExpression;

    constructor(num: NumberExpression) {
        super([num]);
    }
}

export class BoolAsStringExpression extends AbstractStringExpression {

    private readonly _bool: BooleanExpression;

    constructor(bool: BooleanExpression) {
        super([bool]);
        this._bool = bool;
    }

}

export class StringAttributeOfExpression extends AbstractStringExpression {

    private readonly _attribute: StringExpression;
    private readonly _ofEntity: Identifier;

    constructor(attribute: StringExpression, ofEntity: Identifier) {
        super([attribute, ofEntity]);
        this._attribute = attribute;
        this._ofEntity = ofEntity;
    }

}

export class ResourceAttributeOfExpression extends AbstractStringExpression {

    private readonly _attribute: StringExpression;
    private readonly _ofResource: Identifier;

    constructor(attribute: StringExpression, ofResource: Identifier) {
        super([attribute, ofResource]);
        this._attribute = attribute;
        this._ofResource = ofResource;
    }

}

export class JoinStringsExpression extends BinaryExpression<StringExpression, StringExpression> implements StringExpression {

    constructor(op1: StringExpression, op2: StringExpression) {
        super(StringType.instance(), op1, op2);
    }

}

export class IthLetterOfStringExpression extends AbstractStringExpression {

    private readonly _index: NumberExpression;
    private readonly _strExpr: StringExpression;

    constructor(index: NumberExpression, strExpr: StringExpression) {
        super([index, strExpr]);
        this._index = index;
        this._strExpr = strExpr;
    }

}

export class IthStringItemOfExpression extends AbstractStringExpression {

    private readonly _index: NumberExpression;
    private readonly _ofVariable: Identifier;

    constructor(index: NumberExpression, ofVariable: Identifier) {
        super([index, ofVariable]);
        this._index = index;
        this._ofVariable = ofVariable;
    }

}

