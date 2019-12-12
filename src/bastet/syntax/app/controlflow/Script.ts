/*
 *   BASTET Program Analysis Framework
 *
 *   Copyright 2019 by University of Passau
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

import {AppEvent} from '../AppEvent'
import {TransitionRelation} from "./TransitionRelation";

/**
 * A single script, which represents the control flow
 * of a program or a fraction of a program.
 */
export class Script {

    /** This script is triggered by the following event */
    private readonly _event: AppEvent;

    /** The transition relation of the script */
    private readonly _transitions: TransitionRelation;

    constructor(event: AppEvent, transitions: TransitionRelation) {
        this._event = event;
        this._transitions = transitions;
    }

    get transitions(): TransitionRelation {
        return this._transitions;
    }

    get event(): AppEvent {
        return this._event;
    }

}
