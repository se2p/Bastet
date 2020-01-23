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

import {AppResource, AppResourceMap} from "./AppResource";
import {Script} from "./controlflow/Script";
import {Maps} from "../../utils/Maps";
import {Lists} from "../../utils/Lists";
import {ImmutableList} from "../../utils/ImmutableList";
import {ImmutableMap} from "../../utils/ImmutableMap";
import DataLocation, {DataLocationMap} from "./controlflow/DataLocation";
import {MethodDefinition, MethodDefinitionMap, MethodSignature, MethodSignatureMap} from "../ast/core/MethodDefinition";
import {ActorMode} from "../ast/core/ActorDefinition";
import {Preconditions} from "../../utils/Preconditions";
import {Method} from "./controlflow/Method";

export type ActorMap = { [id:string]: Actor } ;

export type ActorId = string;

/**
 * Represents an actor.
 */
export class Actor {

    /** An actor can inherit methods or members from another actor. */
    private readonly _inheritsFrom: Actor[];

    /** Mode of the actor. Onle concrete actors can be instantiated as processes. */
    private readonly _actorMode: ActorMode;

    /** Unique identifier of the actor */
    private readonly _ident: ActorId;

    /** Set of the actor's resources */
    private readonly _resources: ImmutableMap<string, AppResource>;

    /** Set of the actor's data locations (variables) */
    private readonly _datalocs: ImmutableMap<string, DataLocation>;

    /** List of initialization statements. Includes declarations and initializations. */
    private readonly _initScript: Script;

    /** Set of the actor's methods with bodies (not external ones) */
    private readonly _methodDefinitions: ImmutableMap<string, MethodDefinition>;

    /** Set of the actor's methods with bodies (not external ones) */
    private readonly _externalMethodSignatures: ImmutableMap<string, MethodSignature>;

    /** List of scripts that define the behavior of the actor. */
    private readonly _scripts: ImmutableList<Script>;

    /** List of methods that are defined in the actor. */
    private readonly _methods: ImmutableList<Method>;

    constructor(mode: ActorMode, ident: string, inheritFrom: Actor[],
                resources: AppResourceMap, datalocs: DataLocationMap,
                initScript: Script, methodDefs: MethodDefinitionMap,
                externalMethods: MethodSignatureMap,
                scripts: Script[], methods: Method[]) {
        Preconditions.checkNotUndefined(inheritFrom);

        this._actorMode = mode;
        this._ident = ident;
        this._inheritsFrom = inheritFrom;
        this._initScript = initScript;
        this._resources = Maps.immutableCopyOf(resources);
        this._datalocs = Maps.immutableCopyOf(datalocs);
        this._methodDefinitions = Maps.immutableCopyOf(methodDefs);
        this._externalMethodSignatures = Maps.immutableCopyOf(externalMethods);
        this._scripts = Lists.immutableCopyOf(scripts);
        this._methods = Lists.immutableCopyOf(methods);
    }

    get ident(): string {
        return this._ident;
    }

    get inheritsFrom(): Actor[] {
        return this._inheritsFrom;
    }

    get datalocs(): IterableIterator<DataLocation> {
        return this._datalocs.values();
    }

    get datalocMap(): ImmutableMap<string, DataLocation> {
        return this._resources;
    }

    get resources(): IterableIterator<AppResource> {
        return this._resources.values();
    }

    get resourceMap(): ImmutableMap<string, AppResource> {
        return this._resources;
    }

    get initScript(): Script {
        return this._initScript;
    }

    get methodDefs(): IterableIterator<MethodDefinition> {
        return this._methodDefinitions.values();
    }

    get methodMap(): ImmutableMap<string, MethodDefinition> {
        return this._methodDefinitions;
    }

    get externalMethodMap(): ImmutableMap<string, MethodSignature> {
        return this._externalMethodSignatures;
    }

    get scripts(): ImmutableList<Script> {
        return this._scripts;
    }

    get methods(): ImmutableList<Method> {
        return this._methods;
    }

    get actorMode(): ActorMode {
        return this._actorMode;
    }
}


