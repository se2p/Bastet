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
import {Script, ScriptId} from "./controlflow/Script";
import {Maps} from "../../utils/Maps";
import {Lists} from "../../utils/Lists";
import {ImmutableList} from "../../utils/ImmutableList";
import {ImmutableMap} from "../../utils/ImmutableMap";
import {DataLocationMap, TypedDataLocation} from "./controlflow/DataLocation";
import {MethodDefinition, MethodDefinitionMap, MethodSignature, MethodSignatureMap} from "../ast/core/MethodDefinition";
import {ActorMode} from "../ast/core/ActorDefinition";
import {Preconditions} from "../../utils/Preconditions";
import {Method} from "./controlflow/Method";
import {
    AfterStatementMonitoringEvent,
    BootstrapEvent,
    NeverEvent,
    RenderedMonitoringEvent
} from "../ast/core/CoreEvent";
import {TransitionRelation, TransitionRelations, TransRelId} from "./controlflow/TransitionRelation";
import {Scripts} from "./controlflow/Scripts";
import {BroadcastAndWaitStatement} from "../ast/core/statements/BroadcastAndWaitStatement";
import {GREENFLAG_MESSAGE, INIT_MESSAGE} from "../ast/core/Message";
import {StatementList} from "../ast/core/statements/Statement";
import {RelationBuildingVisitor} from "./controlflow/RelationBuildingVisitor";
import {BroadcastMessageStatement} from "../ast/core/statements/BroadcastMessageStatement";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";

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
    private readonly _datalocs: ImmutableMap<string, TypedDataLocation>;

    /** List of initialization statements. Includes declarations and initializations. */
    private readonly _initScript: Script;

    /** Set of the actor's methods with bodies (not external ones) */
    private readonly _methodDefinitions: ImmutableMap<string, MethodDefinition>;

    /** Set of the actor's methods with bodies (not external ones) */
    private readonly _externalMethodSignatures: ImmutableMap<string, MethodSignature>;

    /** List of scripts that define the behavior of the actor. */
    private readonly _scripts: ImmutableList<Script>;

    /** Map of script id's to scripts for a fast lookup  */
    private readonly _scriptMap: ImmutableMap<ScriptId, Script>;

    /** List of methods that are defined in the actor. */
    private readonly _methods: ImmutableList<Method>;

    /** Map of method names to their defs */
    private readonly _methodMap: ImmutableMap<string, Method>;

    /** Is the actor an observer, used to check if the spec is satisfied? */
    private readonly _isObserver: boolean;

    /** Map from transition relation identifiers to the corresponding transition relation */
    private readonly _transRelMap: ImmutableMap<TransRelId, TransitionRelation>;

    constructor(mode: ActorMode, ident: string, inheritFrom: Actor[],
                resources: AppResourceMap, datalocs: DataLocationMap,
                initScript: Script, methodDefs: MethodDefinitionMap,
                externalMethods: MethodSignatureMap,
                scripts: Script[], methods: Method[]) {
        Preconditions.checkNotUndefined(inheritFrom);

        this._actorMode = Preconditions.checkNotUndefined(mode);
        this._ident = Preconditions.checkNotUndefined(ident);
        this._inheritsFrom = Preconditions.checkNotUndefined(inheritFrom);
        this._initScript = Preconditions.checkNotUndefined(initScript);
        this._resources = Maps.immutableCopyOf(resources);
        this._datalocs = Maps.immutableCopyOf(datalocs);
        this._methodDefinitions = Maps.immutableCopyOf(methodDefs);
        this._externalMethodSignatures = Maps.immutableCopyOf(externalMethods);
        this._scripts = Lists.immutableCopyOf(scripts);
        this._methods = Lists.immutableCopyOf(methods);
        this._isObserver = this.deterineIsObserver();

        const transRelMap: Map<TransRelId, TransitionRelation> = new Map<TransRelId, TransitionRelation>();

        const scriptMap: Map<ScriptId, Script> = new Map<ScriptId, Script>();
        for (const s of this._scripts) {
            scriptMap.set(s.id, s);
            transRelMap.set(s.transitions.ident, s.transitions);
        }
        this._scriptMap = new ImmutableMap<ScriptId, Script>(scriptMap.entries());

        const methodMap: Map<string, Method> = new Map<string, Method>();
        for (const m of this._methods) {
            methodMap.set(m.ident.text, m);
            transRelMap.set(m.transitions.ident, m.transitions);
        }
        this._methodMap = new ImmutableMap<string, Method>(methodMap.entries());

        this._transRelMap = new ImmutableMap<TransRelId, TransitionRelation>(transRelMap.entries());

        Preconditions.checkArgument(initScript.event === NeverEvent.instance()
            || initScript.event === BootstrapEvent.instance());
    }

    get ident(): string {
        return this._ident;
    }

    get inheritsFrom(): Actor[] {
        return this._inheritsFrom;
    }

    get datalocs(): IterableIterator<TypedDataLocation> {
        return this._datalocs.values();
    }

    get datalocMap(): ImmutableMap<string, TypedDataLocation> {
        return this._datalocs;
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

    get transRelMap(): ImmutableMap<TransRelId, TransitionRelation> {
        return this._transRelMap;
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

    public isExternalMethod(name: string) {
        return this._externalMethodSignatures.get(name) != null;
    }

    public getMethod(name: string): Method {
        const result: Method = this._methodMap.get(name);
        if (!result) {
            throw new IllegalArgumentException(`Method "${name}" is not defined!`);
        }
        return result;
    }

    public getScript(id: ScriptId): Script {
        return Preconditions.checkNotUndefined(this._scriptMap.get(id));
    }

    private deterineIsObserver() {
        for (const s of this.scripts) {
            if (s.event instanceof RenderedMonitoringEvent) {
                return true;
            }
            if (s.event instanceof AfterStatementMonitoringEvent) {
                return true;
            }
        }
        return false;
    }

    get isObserver(): boolean {
        return this._isObserver;
    }

    get isBootstrapper(): boolean {
        for (const s of this.scripts) {
            if (s.event === BootstrapEvent.instance()) {
                return true;
            }
        }
        return false;
    }
}

export class Actors {

    private static _DEFAULT_BOOTSTRAPPER: Actor;

    public static defaultBoostraper(): Actor {
        if (!Actors._DEFAULT_BOOTSTRAPPER) {
            const bootstrapStmts = new StatementList([
                new BroadcastAndWaitStatement(INIT_MESSAGE.messageid),
                new BroadcastMessageStatement(GREENFLAG_MESSAGE.messageid),
            ]);
            const visitor: RelationBuildingVisitor = new RelationBuildingVisitor();
            const bootstrapTransitions: TransitionRelation =
                TransitionRelations.eliminateEpsilons(bootstrapStmts.accept(visitor));
            const bootstrapScript: Script = new Script(Scripts.freshScriptId(),
                BootstrapEvent.instance(), bootstrapTransitions);
            Actors._DEFAULT_BOOTSTRAPPER = new Actor(ActorMode.concrete(), "__BOOT", [],
                {}, {}, bootstrapScript, {}, {},
                [bootstrapScript], []);
        }

        return Actors._DEFAULT_BOOTSTRAPPER;
    }

}


