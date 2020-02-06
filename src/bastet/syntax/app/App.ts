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

import {Actor, ActorMap, Actors} from './Actor'
import {Maps} from "../../utils/Maps";
import {MethodDefinition, MethodDefinitionList} from "../ast/core/MethodDefinition";
import {Preconditions} from "../../utils/Preconditions";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";
import {Script} from "./controlflow/Script";

export class App {

    private readonly _origin: string;

    private readonly _ident: string;

    private readonly _actorMap: ActorMap;

    private readonly _bootstrapper: Actor;

    constructor(origin: string, ident: string, actorMap: ActorMap, bootstrapper: Actor) {
        this._origin = Preconditions.checkNotUndefined(origin);
        this._ident = Preconditions.checkNotEmpty(ident);
        this._actorMap = Preconditions.checkIsDic(actorMap);
        this._bootstrapper = Preconditions.checkNotUndefined(bootstrapper);
    }

    get origin(): string {
        return this._origin;
    }

    get ident(): string {
        return this._ident;
    }

    get bootstrapper(): Actor {
        return this._bootstrapper;
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

    public getActorByName(name: string): Actor {
        if (!this._actorMap[name]) {
            if (this.bootstrapper.ident == name) {
                return this.bootstrapper;
            }
            throw new IllegalArgumentException(`Actor with name "${name}" is unknown!`);
        }
        return this._actorMap[name];
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

    public getInitScript(): Script {
        Preconditions.checkNotUndefined(this._bootstrapper);
        Preconditions.checkArgument(this.bootstrapper.scripts.length == 1);
        return this.bootstrapper.scripts.values().next().value;
    }

    private static EMPTY_APP: App = null;

    public static empty(): App {
       if (App.EMPTY_APP == null) {
           App.EMPTY_APP = new App("", "empty", {}, Actors.defaultBoostraper());
       }
       return App.EMPTY_APP;
    }

}
