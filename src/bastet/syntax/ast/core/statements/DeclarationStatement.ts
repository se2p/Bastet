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

export abstract class DeclarationStatement extends Statement {

}

export class DeclareVariableStatement extends DeclarationStatement {

    private readonly _ident: Identifier;
    private readonly _type: ScratchType;

    constructor(ident: Identifier, type: ScratchType) {
        super([ident, type]);
        this._ident = ident;
        this._type = type;
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

}

