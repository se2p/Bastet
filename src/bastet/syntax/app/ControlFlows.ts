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

import {App} from "./App";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";

export class ControlFlows {

    public static unionOf(controlflow1: App, controlflow2: App, ident: string) : App {
        const unionActors = controlflow1.actors.concat(controlflow2.actors);
        let resultActorsMap = {};

        for (let a of unionActors) {
            if (resultActorsMap[a.ident]) {
                throw new IllegalArgumentException("Duplicated actor name! " + a.ident);
            }
            resultActorsMap[a.ident] = a;
        }

        return new App("union_of_" + controlflow1.origin + "_and_" + controlflow2.origin,
            ident, resultActorsMap);
    }

}
