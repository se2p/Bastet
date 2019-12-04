/*
 *
 *    Copyright 2019 University of Passau
 *
 *    Project maintained by Andreas Stahlbauer (firstname @ lastname . net)
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import {Script} from "./Script";
import {TransitionRelations} from "./TransitionRelation";
import {Preconditions} from "../../../utils/Preconditions";

export class Scripts {

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
        return new Script(script1.event, newTR);
    }

}
