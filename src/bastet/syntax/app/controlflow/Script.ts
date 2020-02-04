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

import {TransitionRelation} from "./TransitionRelation";
import {CoreEvent} from "../../ast/core/CoreEvent";
import {Preconditions} from "../../../utils/Preconditions";
import {LocationID} from "./ControlLocation";


export type ScriptId = number;

/**
 * A single script, which represents the control flow
 * of a program or a fraction of a program.
 */
export class Script {

    /** A unique identifier of this script */
    private readonly _id: ScriptId;

    /** This script is triggered by the following event */
    private readonly _event: CoreEvent;

    /** The transition relation of the script */
    private readonly _transitions: TransitionRelation;

    constructor(id: ScriptId, event: CoreEvent, transitions: TransitionRelation) {
        Preconditions.checkNotUndefined(event);
        Preconditions.checkNotUndefined(transitions);
        this._id = id;
        this._event = event;
        this._transitions = transitions;
    }

    get transitions(): TransitionRelation {
        return this._transitions;
    }

    get event(): CoreEvent {
        return this._event;
    }

    get id(): number {
        return this._id;
    }

    public getInitialLocation(): LocationID {
        Preconditions.checkState(this.transitions.entryLocationSet.size === 1);
        return this.transitions.entryLocationSet.values().next().value;
    }
}
