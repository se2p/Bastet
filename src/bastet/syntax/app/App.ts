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

import {ActorMap} from './Actor'
import {Maps} from "../../utils/Maps";
import {MethodDefinition, MethodDefinitionList} from "../ast/core/MethodDefinition";

export class App {

    private readonly _origin: string;

    private readonly _ident: string;

    private readonly _actors: ActorMap;

    constructor(origin: string, ident: string, actors: ActorMap) {
        this._origin = origin;
        this._ident = ident;
        this._actors = actors;
    }

    get origin() {
        return this._origin;
    }

    get ident() {
        return this._ident;
    }

    get actorMap() {
        return this.actors;
    }

    get actors() {
        return Maps.values(this._actors);
    }

    public getMethodDefinition(methodName: string): MethodDefinitionList {
        let result: MethodDefinition[] = [];
        for (let ac of Maps.values(this._actors)) {
            const methodDef = ac.methodMap.get(methodName);
            result.push(methodDef);
        }
        return new MethodDefinitionList(result);
    }

    private static EMPTY_APP: App = null;

    public static empty(): App {
       if (App.EMPTY_APP == null) {
           App.EMPTY_APP = new App("", "", {});
       }
       return App.EMPTY_APP;
    }

}
