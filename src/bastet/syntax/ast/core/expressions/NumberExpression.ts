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
import {ensureEqualExpressionTypes, ensureEqualTypes, FloatType, IntegerType, ScratchType} from "../ScratchType";
import {AstNode} from "../../AstNode";
import {StringExpression, StringLiteral} from "./StringExpression";
import {BinaryExpression} from "./BinaryExpression";
import {VariableExpression, VariableWithDataLocation} from "../Variable";

export type NumericType = FloatType | IntegerType;

export interface NumberExpression extends Expression {

}

export class AbstractNumberExpression extends AbstractExpression implements NumberExpression {

    constructor(numericType: NumericType, childs: AstNode[]) {
        super(numericType, childs);
    }

}

export class BinaryNumberExpression extends BinaryExpression<NumberExpression, NumberExpression> implements NumberExpression {

    constructor(op1: NumberExpression, op2: NumberExpression) {
        super(ensureEqualExpressionTypes(op1, op2), op1, op2);
    }

}

export class NumberLiteral {

    public static fromIntString(str: string): IntegerLiteral {
        return new IntegerLiteral(parseInt(str));
    }

    public static fromFloatString(str: string): FloatLiteral {
        return new FloatLiteral(parseFloat(str));
    }

}

export class FloatLiteral extends AbstractNumberExpression {

    private readonly _floatLiteral: number;

    constructor(num: number) {
        super(FloatType.instance(), []);
        this._floatLiteral = num;
    }

    public static of(num: number) {
        if (num == 0) {
            return this.zero();
        }
        return new FloatLiteral(num);
    }

    get num() {
        return this._floatLiteral;
    }

    toTreeString(): string {
        return this.num.toString();
    }

    private static ZERO: FloatLiteral;

    public static zero(): FloatLiteral {
        if (!FloatLiteral.ZERO) {
            FloatLiteral.ZERO = new FloatLiteral(0);
        }
        return FloatLiteral.ZERO;
    }

    public static fromString(str: string): FloatLiteral {
        return new FloatLiteral(parseFloat(str));
    }

}

export class IntegerLiteral extends AbstractNumberExpression {

    private readonly _intLiteral: number;

    constructor(num: number) {
        super(IntegerType.instance(), []);
        this._intLiteral = num;
    }

    public static of(num: number) {
        if (num == 0) {
            return this.zero();
        }
        return new FloatLiteral(num);
    }

    get num() {
        return this._intLiteral;
    }

    toTreeString(): string {
        return this.num.toString();
    }

    private static ZERO: IntegerLiteral;

    public static zero(): IntegerLiteral {
        if (!IntegerLiteral.ZERO) {
            IntegerLiteral.ZERO = new IntegerLiteral(0);
        }
        return IntegerLiteral.ZERO;
    }

    public static fromString(str: string): IntegerLiteral {
        return new IntegerLiteral(parseInt(str));
    }

}

export class NumberVariableExpression extends VariableExpression implements NumberExpression {

    constructor(variable: VariableWithDataLocation) {
        super(variable);
    }
}

export class TimerExpression extends AbstractNumberExpression {

    constructor() {
        super(IntegerType.instance(), []);
    }

}

export class LengthOfStringExpression extends AbstractNumberExpression {

    private readonly _str: StringExpression;

    constructor(str: StringExpression) {
        super(IntegerType.instance(), [str]);
        this._str = str;
    }

    get str(): StringExpression {
        return this._str;
    }
}

export class LengthOfListExpression extends AbstractNumberExpression {

    private readonly _listVar: VariableWithDataLocation;

    constructor(listVar: VariableWithDataLocation) {
        super(IntegerType.instance(), [listVar]);
        this._listVar = listVar;
    }

    get listVar(): VariableWithDataLocation {
        return this._listVar;
    }

}

export class IndexOfExpression extends AbstractNumberExpression {

    private readonly _variable: VariableWithDataLocation;
    private readonly _expr: Expression;

    constructor(expr: Expression, variable: VariableWithDataLocation) {
        super(IntegerType.instance(), [expr, variable.identifier]);
        this._expr = expr;
        this._variable = variable;
    }

    get expr(): Expression {
        return this._expr;
    }

    get variable(): VariableWithDataLocation {
        return this._variable;
    }
}

export class PickRandomFromExpression extends AbstractNumberExpression {

    private readonly _from: NumberExpression;
    private readonly _to: NumberExpression;

    constructor(from: NumberExpression, to: NumberExpression) {
        super(IntegerType.instance(), [from, to]);
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
        super(IntegerType.instance(), [num]);
        this._num = num;
    }

    get num(): NumberExpression {
        return this._num;
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
