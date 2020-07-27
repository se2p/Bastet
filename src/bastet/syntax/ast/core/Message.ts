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

import {AbstractNode} from "../AstNode";
import {extractStringLiteral, StringExpression, StringLiteral} from "./expressions/StringExpression";
import {ExpressionList} from "./expressions/ExpressionList";
import {Preconditions} from "../../../utils/Preconditions";
import {ActorExpression} from "./expressions/ActorExpression";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import instantiate = WebAssembly.instantiate;

export interface Message {

}

export const SYSTEM_NAMESPACE_NAME = StringLiteral.from("SYSTEM");
export const USER_NAMESPACE_NAME = StringLiteral.from("USER");

export abstract class MessageDestination extends AbstractNode {

}

export class NamedDestination extends MessageDestination {

    private readonly _namespace: StringLiteral;

    constructor(namespace: StringLiteral) {
        super([namespace]);
        this._namespace = Preconditions.checkNotUndefined(namespace);
    }

    get namespace(): StringLiteral {
        return this._namespace;
    }
}

export class ActorDestination extends MessageDestination {

    private readonly _actor: ActorExpression;

    constructor(actor: ActorExpression) {
        super([actor]);
        this._actor = Preconditions.checkNotUndefined(actor);
    }

    get actor(): ActorExpression {
        return this._actor;
    }
}

export const SYSTEM_NAMESPACE: NamedDestination = new NamedDestination(SYSTEM_NAMESPACE_NAME);
export const USER_NAMESPACE: NamedDestination = new NamedDestination(USER_NAMESPACE_NAME);

export class SystemMessage extends AbstractNode implements Message {

    private readonly _destination: MessageDestination;
    private readonly _messageid: StringExpression;
    private readonly _payload: ExpressionList;

    constructor(destination: MessageDestination, messageid: StringExpression, payload: ExpressionList) {
        super([destination, messageid, payload]);
        this._destination = destination;
        this._messageid = messageid;
        this._payload = payload;
    }

    get destination() : MessageDestination {
        return this._destination;
    }

    get messageid() : StringExpression {
        return this._messageid;
    }

    get payload() : ExpressionList {
        return this._payload
    }

}

export class UserMessage extends SystemMessage implements Message {

    constructor(messageid: StringExpression) {
        super(USER_NAMESPACE, messageid, ExpressionList.empty());
    }

}

export function extractNamespaceName(dest: MessageDestination): string {
    Preconditions.checkArgument(dest instanceof NamedDestination);
    return extractStringLiteral((dest as NamedDestination).namespace);
}

export function isBootstrapFinishedMessage(msg: SystemMessage): boolean {
    return (extractStringLiteral(msg.messageid) == BOOTSTRAP_FINISHED_MESSAGE_MSG)
        && (extractNamespaceName(msg.destination) == SYSTEM_NAMESPACE_NAME.text);
}

export const BOOTSTRAP_MESSAGE_MSG = "__BOOTSTRAP";
export const BOOTSTRAP_FINISHED_MESSAGE_MSG = "__BOOTSTRAP_FINISHED";
export const GREENFLAG_MESSAGE_MSG = "__STARTUP";

export const BOOTSTRAP_MESSAGE = new SystemMessage(SYSTEM_NAMESPACE, StringLiteral.from(BOOTSTRAP_MESSAGE_MSG), ExpressionList.empty());
export const BOOTSTRAP_FINISHED_MESSAGE = new SystemMessage(SYSTEM_NAMESPACE, StringLiteral.from(BOOTSTRAP_FINISHED_MESSAGE_MSG), ExpressionList.empty());
export const GREENFLAG_MESSAGE = new SystemMessage(SYSTEM_NAMESPACE, StringLiteral.from(GREENFLAG_MESSAGE_MSG), ExpressionList.empty());
export const STARTUP_MESSAGE = GREENFLAG_MESSAGE;
export const STARTUP_FINISHED_MESSAGE = new SystemMessage(SYSTEM_NAMESPACE, StringLiteral.from("__STARTUP_FINISHED"), ExpressionList.empty());

