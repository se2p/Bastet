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

import {Script, ScriptId} from "./Script";
import {TransitionRelations} from "./TransitionRelation";
import {Preconditions} from "../../../utils/Preconditions";
import {NeverEvent} from "../../ast/core/CoreEvent";
import {Identifier} from "../../ast/core/Identifier";

export class Scripts {

    private static SCRIPT_ID_SEQ: number;

    public static freshScriptId(): ScriptId {
        if (!Scripts.SCRIPT_ID_SEQ) {
            Scripts.SCRIPT_ID_SEQ = 0;
        }
        Scripts.SCRIPT_ID_SEQ = Scripts.SCRIPT_ID_SEQ + 1;
        return Scripts.SCRIPT_ID_SEQ.toString();
    }

    /**
     * Sequential composition of the control flows that are
     * described by the two given scripts.
     *
     * @param script1
     * @param script2
     */
    public static concat(script1: Script, script2: Script) : Script {
        Preconditions.checkArgument(script1.event === script2.event);
        const newTR = TransitionRelations.concat(script1.transitions, script2.transitions);
        return new Script(Identifier.freshWithPrefix("concat"), script1.event, script1.restartOnTriggered, newTR);
    }

    private static EMPTY_SCRIPT: Script;

    static empty() {
        if (!Scripts.EMPTY_SCRIPT) {
            Scripts.EMPTY_SCRIPT = new Script(Identifier.freshWithPrefix("empty"),
                NeverEvent.instance(), false, TransitionRelations.epsilon());
        }
        return Scripts.EMPTY_SCRIPT;
    }
}
