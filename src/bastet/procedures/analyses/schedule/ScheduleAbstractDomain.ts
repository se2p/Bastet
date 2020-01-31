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

import {SingletonStateWrapper} from "../AbstractStates";
import {AbstractDomain, AbstractionPrecision} from "../../domains/AbstractDomain";
import {AbstractElement, Lattice} from "../../../lattices/Lattice";
import {List as ImmList, Record as ImmRec} from "immutable";
import {ActorId} from "../../../syntax/app/Actor";
import {LocationID} from "../../../syntax/app/controlflow/ControlLocation";
import {ScriptId} from "../../../syntax/app/controlflow/Script";

export const THREAD_STATE_RUNNING = 1;
export const THREAD_STATE_WAIT = 2;
export const THREAD_STATE_DONE = 3;
export const THREAD_STATE_UNKNOWN = 0;

export type ScriptComputationState = number;

export interface ScheduleConcreteState {

}

export interface ThreadState {
    actorId: ActorId;
    scriptId: ScriptId;
    locationId: LocationID;
    computationState: ScriptComputationState;
}

const ThreadStateRecord = ImmRec({
    actorId: -1,
    scriptId: -1,
    locationId: -1,
    computationState: THREAD_STATE_UNKNOWN,
});

export interface ScheduleAbstractState extends AbstractElement, SingletonStateWrapper {
    threadStates: ImmList<ThreadState>;
    wrappedState: any;
}

const ScheduleAbstractStateRecord = ImmRec({
    threadStates: ImmList<ThreadState>([]),
    wrappedState: ImmRec<any>({}),
});

/**
 * A state with SHARED MEMORY
 */
export class ScheduleAbstractStateImpl extends ScheduleAbstractStateRecord implements AbstractElement {

    threadStates: ImmList<ThreadState>;
    wrappedState: any;

    constructor(args: any = {}) {
        super(Object.assign({}, args, {}));
    }
}


export class ScheduleAbstractDomain implements AbstractDomain<ScheduleConcreteState, ScheduleAbstractState> {

    lattice: Lattice<ScheduleAbstractState>;

    abstract(elements: Iterable<ScheduleConcreteState>): ScheduleAbstractState {
        return undefined;
    }

    concretize(element: ScheduleAbstractState): Iterable<ScheduleConcreteState> {
        return undefined;
    }

    widen(element: ScheduleAbstractState, precision: AbstractionPrecision): ScheduleAbstractState {
        return undefined;
    }

}
