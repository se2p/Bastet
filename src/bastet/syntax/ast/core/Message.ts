/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of Passau (uni-passau.de)
 *
 *   See the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Please make sure to CITE this work in your publications if you
 *   build on this work. Some of our maintainers or contributors might
 *   be interested in actively CONTRIBUTING to your research project.
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
import {extractStringLiteral, StringExpression, StringLiteral} from "./expressions/StringExpression";
import {Expression} from "./expressions/Expression";
import {ExpressionList} from "./expressions/ExpressionList";

export interface Message {

}

export const SYSTEM_NAMESPACE = StringLiteral.from("SYSTEM");
export const USER_NAMESPACE = StringLiteral.from("USER");

export class SystemMessage extends AbstractNode implements Message {

    private readonly _namespace: StringLiteral;
    private readonly _messageid: StringExpression;
    private readonly _payload: ExpressionList;

    constructor(namespace: StringLiteral, messageid: StringExpression, payload: ExpressionList) {
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

    get payload() : ExpressionList {
        return this._payload
    }

    public isEqualTo(msg: SystemMessage): boolean {
       return extractStringLiteral(msg.messageid) == extractStringLiteral(this.messageid)
           && extractStringLiteral(msg.namespace) == extractStringLiteral(this.namespace);
    }

}

export class UserMessage extends SystemMessage implements Message {

    constructor(messageid: StringExpression) {
        super(USER_NAMESPACE, messageid, ExpressionList.empty());
    }

}

export const BOOTSTRAP_MESSAGE = new SystemMessage(SYSTEM_NAMESPACE, StringLiteral.from("__BOOTSTRAP"), ExpressionList.empty());
export const BOOTSTRAP_FINISHED_MESSAGE = new SystemMessage(SYSTEM_NAMESPACE, StringLiteral.from("__BOOTSTRAP_FINISHED"), ExpressionList.empty());
export const GREENFLAG_MESSAGE = new SystemMessage(SYSTEM_NAMESPACE, StringLiteral.from("__STARTUP"), ExpressionList.empty());
export const STARTUP_MESSAGE = GREENFLAG_MESSAGE;
export const STARTUP_FINISHED_MESSAGE = new SystemMessage(SYSTEM_NAMESPACE, StringLiteral.from("__STARTUP_FINISHED"), ExpressionList.empty());

