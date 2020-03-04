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

import {AbstractNode} from "../AstNode";
import {StatementList} from "./statements/Statement";
import {AstNodeList} from "../AstNodeList";
import {CoreEvent} from "./CoreEvent";

export class ScriptDefinition extends AbstractNode {

    private readonly _event: CoreEvent;

    private readonly _stmtList: StatementList;

    private readonly _isRestart: boolean;

    constructor(event: CoreEvent, stmtList: StatementList, restart: boolean) {
        super([event, stmtList]);
        this._event = event;
        this._stmtList = stmtList;
        this._isRestart = restart;
    }

    get event(): CoreEvent {
        return this._event;
    }

    get stmtList(): StatementList {
        return this._stmtList;
    }

    get isRestart(): boolean {
        return this._isRestart;
    }
}

export class ScriptDefinitionList extends AstNodeList<ScriptDefinition> {

}
