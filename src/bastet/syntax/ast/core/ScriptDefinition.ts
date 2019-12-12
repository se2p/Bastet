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

import {AbstractNode} from "../AstNode";
import {Statement} from "./statements/Statement";
import {AstNodeList} from "../AstNodeList";
import {CoreEvent} from "./CoreEvent";

export class ScriptDefinition extends AbstractNode {

    private readonly _event: CoreEvent;
    private readonly _stmtList: AstNodeList<Statement>;

    constructor(event: CoreEvent, stmtList: AstNodeList<Statement>) {
        super(event, stmtList);
    }

    get event(): CoreEvent {
        return this._event;
    }

    get stmtList(): CoreEvent {
        return this._stmtList;
    }

}
