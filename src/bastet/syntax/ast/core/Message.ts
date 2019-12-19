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

import {AbstractNode, OptionalAstNode} from "../AstNode";
import {StringExpression, StringLiteral} from "./expressions/StringExpression";
import {Expression} from "./expressions/Expression";

export interface Message {

}

export class AppMessage extends AbstractNode implements Message {

    private readonly _messageid: StringLiteral;

    constructor(messageid: StringLiteral) {
        super([messageid]);
        this._messageid = messageid;
    }

    get messageid() : StringLiteral {
        return this._messageid;
    }

}

export class SystemMessage extends AbstractNode implements Message {

    private readonly _namespace: StringLiteral;
    private readonly _messageid: StringExpression;
    private readonly _payload: OptionalAstNode<Expression>;

    constructor(namespace: StringLiteral, messageid: StringExpression, payload: OptionalAstNode<Expression>) {
        super([namespace, messageid, payload]);
        this._namespace = namespace;
        this._messageid = messageid;
        this._payload = payload;
    }

    get namespace() : StringLiteral {
        return this._namespace;
    }

    get messageid() : StringExpression {
        return this._messageid;
    }

    get payload() : OptionalAstNode<Expression> {
        return this._payload
    }

}
