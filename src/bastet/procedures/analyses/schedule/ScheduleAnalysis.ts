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

import {ProgramAnalysis, WrappingProgramAnalysis} from "../ProgramAnalysis";
import {ScheduleAbstractDomain, ScheduleAbstractState} from "./ScheduleAbstractDomain";
import {AbstractDomain} from "../AbstractDomain";
import {ReachedSet} from "../../algorithms/ReachedSet";

export class ScheduleAnalysis implements WrappingProgramAnalysis<ScheduleAbstractState> {

    private readonly _abstractDomain: AbstractDomain<ScheduleAbstractState>;
    private readonly _wrappedAnalysis: ProgramAnalysis<any>;

    constructor(wrappedAnalysis: ProgramAnalysis<any>) {
        this._abstractDomain = new ScheduleAbstractDomain();
        this._wrappedAnalysis = wrappedAnalysis;
    }

    abstractSucc(fromState: ScheduleAbstractState): Iterable<ScheduleAbstractState> {
        return undefined;
    }

    join(state1: ScheduleAbstractState, state2: ScheduleAbstractState): ScheduleAbstractState {
        return undefined;
    }

    merge(state1: ScheduleAbstractState, state2: ScheduleAbstractState): boolean {
        return false;
    }

    stop(state: ScheduleAbstractState, reached: ReachedSet<ScheduleAbstractState>): ScheduleAbstractState {
        return undefined;
    }

    target(state: ScheduleAbstractState): boolean {
        return false;
    }

    widen(state: ScheduleAbstractState): ScheduleAbstractState {
        return undefined;
    }

    get wrappedAnalysis(): ProgramAnalysis<any> {
        return this._wrappedAnalysis;
    }

    get abstractDomain(): AbstractDomain<any> {
        return this._abstractDomain;
    }

}
