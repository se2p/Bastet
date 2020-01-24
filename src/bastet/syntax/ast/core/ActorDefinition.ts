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
import {AstNodeList} from "../AstNodeList";
import {Identifier} from "./Identifier";
import {ResourceDefinitionList} from "./ResourceDefinition";
import {MethodDefinitionList, MethodSignatureList} from "./MethodDefinition";
import {ScriptDefinitionList} from "./ScriptDefinition";
import {StatementList} from "./statements/Statement";

export abstract class ActorMode extends AbstractNode {

    static concrete(): ActorMode {
        return ConcreteActorMode.instance();
    }

    static role(): ActorMode {
        return ActorRoleMode.instance();
    }

}

export class ConcreteActorMode extends ActorMode {

    private static INSTANCE: ConcreteActorMode;

    private constructor() {
        super([]);
    }

    public static instance() {
        if (!ConcreteActorMode.INSTANCE) {
            ConcreteActorMode.INSTANCE = new ConcreteActorMode();
        }
        return ConcreteActorMode.INSTANCE;
    }
}

export class ActorRoleMode extends ActorMode {

    private static INSTANCE: ActorRoleMode;

    private constructor() {
        super([]);
    }

    public static instance() {
        if (!ActorRoleMode.INSTANCE) {
            ActorRoleMode.INSTANCE = new ActorRoleMode();
        }
        return ActorRoleMode.INSTANCE;
    }
}

export class InheritsFromList extends AstNodeList<Identifier> {

    constructor(elements: Identifier[]) {
        super(elements);
    }

}

export class ActorDefinition extends AbstractNode {

    /** The name of the actor based on which it can be identified or addressed */
    private readonly _mode: ActorMode;
    private readonly _ident: Identifier;
    private readonly _inheritsFrom: InheritsFromList;
    private readonly _resourceDefs: ResourceDefinitionList;
    private readonly _declarationStmts: StatementList;
    private readonly _initStmts: StatementList;
    private readonly _methodDefs: MethodDefinitionList;
    private readonly _externalMethodDecls: MethodSignatureList;
    private readonly _scriptList: ScriptDefinitionList;

    constructor(mode: ActorMode, ident: Identifier, inheritsFrom: InheritsFromList,
                resourceDefs: ResourceDefinitionList, declarationStmts: StatementList,
                initStmts: StatementList, methodDefs: MethodDefinitionList,
                externalMethodDecls: MethodSignatureList,
                scriptList: ScriptDefinitionList) {
        super([mode, ident, inheritsFrom, resourceDefs, declarationStmts,
            initStmts, methodDefs, externalMethodDecls, scriptList]);
        this._mode = mode;
        this._ident = ident;
        this._inheritsFrom = inheritsFrom;
        this._resourceDefs = resourceDefs;
        this._declarationStmts = declarationStmts;
        this._initStmts = initStmts;
        this._methodDefs = methodDefs;
        this._externalMethodDecls = externalMethodDecls;
        this._scriptList = scriptList;
    }

    get mode(): ActorMode {
        return this._mode;
    }

    get externalMethodDecls(): MethodSignatureList {
        return this._externalMethodDecls;
    }

    get ident(): Identifier {
        return this._ident;
    }

    get inheritsFrom(): InheritsFromList {
        return this._inheritsFrom;
    }

    get resourceDefs(): ResourceDefinitionList {
        return this._resourceDefs;
    }

    get declarationStmts(): StatementList {
        return this._declarationStmts;
    }

    get initStmts(): StatementList {
        return this._initStmts;
    }

    get methodDefs(): MethodDefinitionList {
        return this._methodDefs;
    }

    get scriptList(): ScriptDefinitionList {
        return this._scriptList;
    }
}

export class ActorDefinitionList extends AstNodeList<ActorDefinition> {

    constructor(elements: ActorDefinition[]) {
        super(elements);
    }

}
