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

import {Actor, ActorMap} from './Actor'
import {Maps} from "../../utils/Maps";
import {MethodDefinition, MethodDefinitionList} from "../ast/core/MethodDefinition";
import {Preconditions} from "../../utils/Preconditions";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";
import {Record as ImmRec, Set as ImmSet} from "immutable";
import {OperationId, ProgramOperation} from "./controlflow/ops/ProgramOperation";
import {LocationId} from "./controlflow/ControlLocation";
import {CallStatement} from "../ast/core/statements/CallStatement";
import {MethodIdentifiers} from "./controlflow/MethodIdentifiers";
import {Properties, Property} from "../Property";
import {TransitionRelation, TransRelId} from "./controlflow/TransitionRelation";


export class App {

    private readonly _origin: string;

    private readonly _ident: string;

    private readonly _actorMap: ActorMap;

    private readonly _transRelById: Map<TransRelId, TransitionRelation>;

    constructor(origin: string, ident: string, actorMap: ActorMap) {
        this._origin = Preconditions.checkNotUndefined(origin);
        this._ident = Preconditions.checkNotEmpty(ident);
        this._actorMap = Preconditions.checkIsDic(actorMap);

        this._transRelById = new Map();
        for (const a of Maps.values(this._actorMap)) {
            for (const [id, r] of a.transRelMap.entries()) {
                this._transRelById.set(id, r);
            }
        }
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

    public getProperties(): ImmSet<Property> {
        let result = ImmSet<Property>();
        for (const a of this.actors.values()) {
            for (const s of a.scripts) {
                for (const l of s.transitions.locationSet) {
                    for (const ts of s.transitions.transitionsFrom(l)) {
                        const op = ProgramOperation.for(ts.opId);
                        if (op.ast instanceof CallStatement) {
                            const call = op.ast as CallStatement;
                            if (call.calledMethod.text == MethodIdentifiers._RUNTIME_signalFailure) {
                                const properties = Properties.fromArguments(call.args);
                                result = result.union(properties);
                            }
                        }
                    }
                }
            }
        }

        return result;
    }

    public getActorByName(name: string): Actor {
        if (!this._actorMap[name]) {
            throw new IllegalArgumentException(`Actor with name "${name}" is unknown!`);
        }
        return this._actorMap[name];
    }

    public getTransitionRelationById(id: TransRelId): TransitionRelation {
        return this._transRelById.get(id);
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
           App.EMPTY_APP = new App("", "empty", {});
       }
       return App.EMPTY_APP;
    }

}
