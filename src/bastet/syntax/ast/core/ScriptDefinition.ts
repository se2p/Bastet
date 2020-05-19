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
import {StatementList} from "./statements/Statement";
import {AstNodeList} from "../AstNodeList";
import {CoreEvent} from "./CoreEvent";
import {Identifier} from "./Identifier";
import {Preconditions} from "../../../utils/Preconditions";

export class ScriptDefinition extends AbstractNode {

    /**
     * The script identifier is used to scope variables
     * that were declared local to the script.
     */
    private readonly _ident: Identifier;

    private readonly _event: CoreEvent;

    private readonly _stmtList: StatementList;

    private readonly _isRestart: boolean;

    constructor(ident: Identifier, event: CoreEvent, stmtList: StatementList, restart: boolean) {
        super([event, stmtList]);
        this._ident = Preconditions.checkNotUndefined(ident);
        this._event = Preconditions.checkNotUndefined(event);
        this._stmtList = Preconditions.checkNotUndefined(stmtList);
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

    get ident(): Identifier {
        return this._ident;
    }
}

export class ScriptDefinitionList extends AstNodeList<ScriptDefinition> {

}
