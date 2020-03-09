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


import {Statement} from "./Statement";
import {Expression} from "../expressions/Expression";
import {StringExpression} from "../expressions/StringExpression";
import {Identifier} from "../Identifier";
import {VariableWithDataLocation} from "../Variable";
import {AstNode} from "../../AstNode";
import {Preconditions} from "../../../../utils/Preconditions";

export abstract class SetStatement extends Statement {

    constructor(childs: AstNode[]) {
        super(childs);
    }
}

export class SetAttributeToStatement extends SetStatement {

    private readonly _attrib: StringExpression;
    private readonly _toValue: Expression;

    constructor(attrib: StringExpression, toValue: Expression) {
        super([attrib, toValue]);
        this._attrib = attrib;
        this._toValue = toValue;
    }

    get attrib(): StringExpression {
        return this._attrib;
    }

    get toValue(): Expression {
        return this._toValue;
    }
}

export class SetAttributeOfToStatement extends SetStatement {

    private readonly _attrib: StringExpression;
    private readonly _ofEntity: Identifier;
    private readonly _toValue: Expression;

    constructor(attrib: StringExpression, ofEntity: Identifier, toValue: Expression) {
        super([attrib, ofEntity, toValue]);
        this._attrib = attrib;
        this._ofEntity = ofEntity;
        this._toValue = toValue;
    }

    get attrib(): StringExpression {
        return this._attrib;
    }

    get ofEntity(): Identifier {
        return this._ofEntity;
    }

    get toValue(): Expression {
        return this._toValue;
    }
}

export class StoreEvalResultToVariableStatement extends SetStatement {

    private readonly _variable: VariableWithDataLocation;
    private readonly _toValue: Expression;

    constructor(variable: VariableWithDataLocation, toValue: Expression) {
        super([variable.identifier, toValue]);
        this._variable = Preconditions.checkNotUndefined(variable);
        this._toValue = Preconditions.checkNotUndefined(toValue);
    }

    get variable(): VariableWithDataLocation {
        return this._variable;
    }

    get toValue(): Expression {
        return this._toValue;
    }
}


