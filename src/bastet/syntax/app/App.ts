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

import {Actor, ActorId, ActorMap} from './Actor'
import {Maps} from "../../utils/Maps";
import {MethodDefinition, MethodDefinitionList} from "../ast/core/MethodDefinition";
import {Preconditions} from "../../utils/Preconditions";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";
import {Set as ImmSet} from "immutable";
import {Properties, Property} from "../Property";
import {TransitionRelation, TransRelId} from "./controlflow/TransitionRelation";
import {TypeInformationStorage} from "../DeclarationScopes";
import {Script} from "./controlflow/Script";
import {SignalTargetReachedStatement} from "../ast/core/statements/InternalStatement";
import {BooleanExpression} from "../ast/core/expressions/BooleanExpression";
import {SystemVariables} from "./SystemVariables";

export class App {

    private readonly _origin: string;

    private readonly _ident: string;

    private readonly _actorMap: ActorMap;

    private readonly _transRelById: Map<TransRelId, TransitionRelation>;

    private readonly _typeStorage: TypeInformationStorage;

    private readonly _systemVariables: SystemVariables;

    constructor(origin: string, ident: string, actorMap: ActorMap, typeStorage: TypeInformationStorage) {
        this._origin = Preconditions.checkNotUndefined(origin);
        this._ident = Preconditions.checkNotEmpty(ident);
        this._actorMap = Preconditions.checkIsDic(actorMap);
        this._typeStorage = Preconditions.checkNotUndefined(typeStorage);

        this._transRelById = new Map();
        for (const a of Maps.values(this._actorMap)) {
            for (const [id, r] of a.transRelMap.entries()) {
                this._transRelById.set(id, r);
            }
        }

        this._systemVariables = new SystemVariables(typeStorage);
    }

    get typeStorage(): TypeInformationStorage {
        return this._typeStorage;
    }

    get origin(): string {
        return this._origin;
    }

    get ident(): string {
        return this._ident;
    }

    get actorMap(): ActorMap {
        return this._actorMap;
    }

    get actors(): Actor[] {
        return Maps.values(this._actorMap);
    }

    get actorNames(): string[] {
        return Object.keys(this._actorMap);
    }

    get nonBootActors(): Actor[] {
        return Maps.values(this.actorMap).filter((a) => !a.isBootstrapper);
    }

    get systemVariables(): SystemVariables {
        return this._systemVariables;
    }

    public getProperties(): ImmSet<Property> {
        let result = ImmSet<Property>();
        const signaled = new Set<SignalTargetReachedStatement>();

        for (const a of this.actors) {
            for (const s of a.scripts) {
                a.transitivelyPresent(s.transitions, (s) => s instanceof SignalTargetReachedStatement)
                    .forEach((cs) => signaled.add(cs as SignalTargetReachedStatement));
            }
        }

        for (const sig of signaled) {
            const properties = Properties.fromArguments(sig.targetCharacteristics);
            result = result.union(properties);
        }

        return result;
    }

    public getActorByName(name: ActorId): Actor {
        if (!this._actorMap[name]) {
            throw new IllegalArgumentException(`Actor with name "${name}" is unknown!`);
        }
        return this._actorMap[name];
    }

    public getTransitionRelationById(id: TransRelId): TransitionRelation {
        return this._transRelById.get(id);
    }

    public registerTrasitionRelation(tr: TransitionRelation) {
        this._transRelById.set(tr.ident, tr);
    }

    public getMethodDefinition(methodName: string): MethodDefinitionList {
        let result: MethodDefinition[] = [];
        for (let ac of Maps.values(this._actorMap)) {
            const methodDef = ac.methodMap.get(methodName);
            if (methodDef) {
                result.push(methodDef);
            }
        }
        return new MethodDefinitionList(result);
    }

    private static EMPTY_APP: App = null;

    public static empty(): App {
       if (App.EMPTY_APP == null) {
           App.EMPTY_APP = new App("", "empty", {}, new TypeInformationStorage());
       }
       return App.EMPTY_APP;
    }

    getConditionCheckScript(actor: Actor, condition: BooleanExpression): Script {
        const script: Script = actor.getConditionCheckScript(condition);
        this.registerTrasitionRelation(script.transitions);
        return script;
    }

}

