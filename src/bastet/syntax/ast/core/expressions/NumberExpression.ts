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
import {AbstractExpression} from "./AbstractExpression";
import {Identifier} from "../Identifier";
import {NumberType} from "../ScratchType";
import {AstNode} from "../../AstNode";
import {StringExpression, StringLiteral} from "./StringExpression";
import {BooleanExpression} from "./BooleanExpression";
import {BinaryExpression} from "./BinaryExpression";
import {AbstractVariable, Variable, VariableExpression} from "../Variable";
import {ListExpression} from "./ListExpression";

export interface NumberExpression extends Expression {

}

export class AbstractNumberExpression extends AbstractExpression implements NumberExpression {

    constructor(childs: AstNode[]) {
        super(NumberType.instance(), childs);
    }

}

export class BinaryNumberExpression extends BinaryExpression<NumberExpression, NumberExpression> implements NumberExpression {

    constructor(op1: NumberExpression, op2: NumberExpression) {
        super(NumberType.instance(), op1, op2);
    }

}

export class NumberLiteral extends AbstractNumberExpression {

    private readonly _numLiteral: number;

    constructor(num: number) {
        super([]);
        this._numLiteral = num;
    }

    public static of(num: number) {
        return new NumberLiteral(num);
    }

    public static fromIntString(str: string) {
        return new NumberLiteral(parseInt(str));
    }

    public static fromFloatString(str: string) {
        return new NumberLiteral(parseFloat(str));
    }

    get num() {
        return this._numLiteral;
    }

    toTreeString(): string {
        return this.num.toString();
    }

}

export class NumberVariableExpression extends VariableExpression implements NumberExpression {

}

export class StringAsNumberExpression extends AbstractNumberExpression {

    private readonly _toConvert: StringExpression;

    constructor(str: StringExpression) {
        super([str]);
        this._toConvert = str;
    }

    get toConvert(): StringExpression {
        return this._toConvert;
    }
}

export class BoolAsNumberExpression extends AbstractNumberExpression {

    private readonly _toConvert: BooleanExpression;

    constructor(toconvert: BooleanExpression) {
        super([toconvert]);
        this._toConvert = toconvert;
    }

    get toConvert(): BooleanExpression {
        return this._toConvert;
    }
}

export class TimerExpression extends AbstractNumberExpression {

    constructor() {
        super([]);
    }

}

export class LengthOfStringExpression extends AbstractNumberExpression {

    private readonly _str: StringExpression;

    constructor(str: StringExpression) {
        super([str]);
        this._str = str;
    }

    get str(): StringExpression {
        return this._str;
    }
}

export class LengthOListExpression extends AbstractNumberExpression {

    private readonly _listVar: Identifier;

    constructor(listVar: Identifier) {
        super([listVar]);
        this._listVar = listVar;
    }

    get listVar(): Identifier {
        return this._listVar;
    }

}

export class IndexOfExpression extends AbstractNumberExpression {

    private readonly _variable: Variable;
    private readonly _expr: Expression;

    constructor(expr: Expression, variable: Variable) {
        super([expr, variable.identifier]);
        this._expr = expr;
        this._variable = variable;
    }

    get expr(): Expression {
        return this._expr;
    }

    get variable(): Variable {
        return this._variable;
    }
}

export class PickRandomFromExpression extends AbstractNumberExpression {

    private readonly _from: NumberExpression;
    private readonly _to: NumberExpression;

    constructor(from: NumberExpression, to: NumberExpression) {
        super([from, to]);
        this._from = from;
        this._to = to;
    }

    get from(): NumberExpression {
        return this._from;
    }

    get to(): NumberExpression {
        return this._to;
    }
}

export class RoundExpression extends AbstractNumberExpression {

    private readonly _num: NumberExpression;

    constructor(num: NumberExpression) {
        super([num]);
        this._num = num;
    }

    get num(): NumberExpression {
        return this._num;
    }
}

export class NumFunctExpression extends AbstractNumberExpression {

    private readonly _funct: StringLiteral;
    private readonly _arg: NumberExpression;

    constructor(funct: StringLiteral, arg: NumberExpression) {
        super([funct, arg]);
        this._funct = funct;
        this._arg = arg;
    }

    get funct(): StringLiteral {
        return this._funct;
    }

    get arg(): NumberExpression {
        return this._arg;
    }
}

export class MultiplyExpression extends BinaryNumberExpression {

    constructor(op1: NumberExpression, op2: NumberExpression) {
        super(op1, op2);
    }

}

export class DivideExpression extends BinaryNumberExpression {

    constructor(op1: NumberExpression, op2: NumberExpression) {
        super(op1, op2);
    }
}

export class ModuloExpression extends BinaryNumberExpression {

    constructor(op1: NumberExpression, op2: NumberExpression) {
        super(op1, op2);
    }

}

export class PlusExpression extends BinaryNumberExpression {

    constructor(op1: NumberExpression, op2: NumberExpression) {
        super(op1, op2);
    }

}

export class MinusExpression extends BinaryNumberExpression {

    constructor(op1: NumberExpression, op2: NumberExpression) {
        super(op1, op2);
    }

}
