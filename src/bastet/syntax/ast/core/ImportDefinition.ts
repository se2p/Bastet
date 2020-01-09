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

import {AbstractNode, AstNode} from "../AstNode";
import {AstNodeList} from "../AstNodeList";
import {Identifier} from "./Identifier";
import {ResourceLocation} from "./ResourceLocation";

export class ImportDefinition extends AbstractNode {

    private readonly _toImport: ImportSelector;
    private readonly _importFrom: ResourceLocation;

    constructor(toImport: ImportSelector, importFrom: ResourceLocation) {
        super([toImport, importFrom]);
        this._toImport = toImport;
        this._importFrom = importFrom;
    }

}

export interface ImportSelector extends AstNode {

}

export class ImportSelectedActor extends AbstractNode implements ImportSelector {

    private readonly _actorIdent: Identifier;

    constructor(actorIdent: Identifier) {
        super([actorIdent] );
        this._actorIdent = actorIdent;
    }

}

export class ImportAllActors extends AbstractNode implements ImportSelector {

    constructor() {
        super([]);
    }

}

export class ImportDefinitionList extends AstNodeList<ImportDefinition> {

    constructor(elements: ImportDefinition[]) {
        super(elements);
    }

}
