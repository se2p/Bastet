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
import {Identifier} from "../Identifier";
import {ScratchType} from "../ScratchType";
import {StringExpression} from "../expressions/StringExpression";
import {Variable} from "../Variable";
import {Preconditions} from "../../../../utils/Preconditions";
import {AstNode} from "../../AstNode";

export abstract class DeclarationStatement extends Statement {

    constructor(childs: AstNode[]) {
        super(childs);
    }

}

export interface VariableDeclaration {

    ident: Identifier;
    type: ScratchType;

}

export abstract class DeclareVariableStatement extends DeclarationStatement implements VariableDeclaration {

    private readonly _variable: Variable;

    constructor(variable: Variable) {
        Preconditions.checkNotUndefined(variable);
        super([variable.identifier, variable.type]);
        this._variable = variable;
    }

    get ident(): Identifier {
        return this._variable.identifier;
    }

    get type(): ScratchType {
        return this._variable.type;
    }

    get variable(): Variable {
        return this._variable;
    }
}

export class DeclareStackVariableStatement extends DeclareVariableStatement {

    constructor(variable: Variable) {
        Preconditions.checkNotUndefined(variable);
        super(variable);
    }

}

export class DeclareActorVariableStatement extends DeclareVariableStatement {

    constructor(variable: Variable) {
        Preconditions.checkNotUndefined(variable);
        super(variable);
    }

}

export class DeclareAttributeStatement extends DeclarationStatement {

    private readonly _attribute: StringExpression;
    private readonly _type: ScratchType;

    constructor(attribute: StringExpression, type: ScratchType) {
        super([attribute, type]);
        this._attribute = attribute;
        this._type = type;
    }

    get type(): ScratchType {
        return this._type;
    }

    get attribute(): StringExpression {
        return this._attribute;
    }
}

export class DeclareAttributeOfStatement extends DeclarationStatement {

    private readonly _attribute: StringExpression;
    private readonly _type: ScratchType;
    private readonly _of: Identifier;

    constructor(attribute: StringExpression, type: ScratchType, of: Identifier) {
        super([attribute, type, of]);
        this._attribute = attribute;
        this._type = type;
        this._of = of;
    }

    get attribute(): StringExpression {
        return this._attribute;
    }

    get type(): ScratchType {
        return this._type;
    }

    get of(): Identifier {
        return this._of;
    }
}

