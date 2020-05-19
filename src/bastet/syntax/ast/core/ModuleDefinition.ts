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
import {Identifier} from "./Identifier";
import {ImportDefinitionList} from "./ImportDefinition";
import {ActorDefinitionList} from "./ActorDefinition";

export class ProgramDefinition extends AbstractNode {

    private readonly _ident: Identifier;
    private readonly _imports: ImportDefinitionList;
    private readonly _actors: ActorDefinitionList;

    constructor(ident: Identifier, imports: ImportDefinitionList, actors: ActorDefinitionList) {
        super([ident, imports, actors]);
        this._ident = ident;
        this._imports = imports;
        this._actors = actors;
    }

    get ident(): Identifier {
        return this._ident;
    }

    get imports(): ImportDefinitionList {
        return this._imports;
    }

    get actors(): ActorDefinitionList {
        return this._actors;
    }

}
