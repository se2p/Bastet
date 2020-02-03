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
import {
    ScheduleAbstractDomain,
    ScheduleAbstractStateAttributes,
    ScheduleAbstractStateFactory,
    ScheduleConcreteState
} from "./ScheduleAbstractDomain";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {StateSet} from "../../algorithms/StateSet";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {App} from "../../../syntax/app/App";
import {Script} from "../../../syntax/app/controlflow/Script";
import {Actor} from "../../../syntax/app/Actor";

export class ScheduleAnalysis implements WrappingProgramAnalysis<ScheduleConcreteState, ScheduleAbstractStateAttributes> {

    private readonly _abstractDomain: AbstractDomain<ScheduleConcreteState, ScheduleAbstractStateAttributes>;
    private readonly _wrappedAnalysis: ProgramAnalysis<any, any>;

    constructor(wrappedAnalysis: ProgramAnalysis<any, any>) {
        this._abstractDomain = new ScheduleAbstractDomain();
        this._wrappedAnalysis = wrappedAnalysis;
    }

    abstractSucc(fromState: ScheduleAbstractStateAttributes): Iterable<ScheduleAbstractStateAttributes> {
        return undefined;
    }

    join(state1: ScheduleAbstractStateAttributes, state2: ScheduleAbstractStateAttributes): ScheduleAbstractStateAttributes {
        return undefined;
    }

    merge(state1: ScheduleAbstractStateAttributes, state2: ScheduleAbstractStateAttributes): boolean {
        return false;
    }

    stop(state: ScheduleAbstractStateAttributes, reached: StateSet<ScheduleAbstractStateAttributes>): ScheduleAbstractStateAttributes {
        return undefined;
    }

    target(state: ScheduleAbstractStateAttributes): boolean {
        return this._wrappedAnalysis.target(state.wrappedState);
    }

    widen(state: ScheduleAbstractStateAttributes): ScheduleAbstractStateAttributes {
        return undefined;
    }

    get wrappedAnalysis(): ProgramAnalysis<any, any> {
        return this._wrappedAnalysis;
    }

    get abstractDomain(): AbstractDomain<any, any> {
        return this._abstractDomain;
    }

    initialStatesFor(task: App): ScheduleAbstractStateAttributes[] {
        const bootstrapper: Actor = task.bootstrapper;
        const initScript: Script = task.getInitScript();
        return this._wrappedAnalysis.initialStatesFor(task).map((w) => {
            return ScheduleAbstractStateFactory.createInitialState(bootstrapper, initScript, w);
        });
    }

}
