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

import {Actor} from "./Actor";
import {TransitionRelationToDot} from "./controlflow/TransitionRelationToDot";
import {App} from "./App";
import * as fs from "fs";

export class AppToDot {

    public exportApp(app: App, subfolder: string) {
        fs.mkdirSync('output/' + subfolder, { recursive: true })

        for (const actor of app.actors) {
            // Export scripts
            this.exportScriptsToDoT(actor, subfolder);

            // Export methods defs
            this.exportMethodsToDot(actor, subfolder);
        }
    }

    private exportMethodsToDot(actor: Actor, subfolder: string): void {
        const toDotWriter = new TransitionRelationToDot();
        let i: number = 1;
        for (let m of actor.methods) {
            const target: string = `output/${subfolder}/actor_${actor.ident}_method_${m.ident.text}.dot`;
            toDotWriter.export(m.controlflow, target);
            i++;
        }
    }

    private exportScriptsToDoT(actor: Actor, subfolder: string): void {
        const toDotWriter = new TransitionRelationToDot();
        let i: number = 1;
        for (let s of actor.scripts) {
            const target: string = `output/${subfolder}/actor_${actor.ident}_script_${i}.dot`;
            toDotWriter.export(s.transitions, target);
            i++;
        }
        const target: string = `output/${subfolder}/actor_${actor.ident}_script_init.dot`;
        toDotWriter.export(actor.initScript.transitions, target);
    }

}
