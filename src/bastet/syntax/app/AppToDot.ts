/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of Passau (uni-passau.de)
 *
 *   See the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Please make sure to CITE this work in your publications if you
 *   build on this work. Some of our maintainers or contributors might
 *   be interested in actively CONTRIBUTING to your research project.
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
            toDotWriter.export(m.transitions, target);
            i++;
        }
    }

    private exportScriptsToDoT(actor: Actor, subfolder: string): void {
        const toDotWriter = new TransitionRelationToDot();
        for (let s of actor.scripts) {
            const target: string = `output/${subfolder}/actor_${actor.ident}_script_${s.id}.dot`;
            toDotWriter.export(s.transitions, target);
        }
    }

}
