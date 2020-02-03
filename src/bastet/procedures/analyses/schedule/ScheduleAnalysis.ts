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

import {ProgramAnalysis, ProgramAnalysisWithLabels, WrappingProgramAnalysis} from "../ProgramAnalysis";
import {
    ScheduleAbstractDomain,
    ScheduleAbstractState,
    ScheduleAbstractStateFactory,
    ScheduleConcreteState
} from "./ScheduleAbstractDomain";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {StateSet} from "../../algorithms/StateSet";
import {App} from "../../../syntax/app/App";
import {Script} from "../../../syntax/app/controlflow/Script";
import {Actor} from "../../../syntax/app/Actor";
import {ScheduleTransferRelation} from "./ScheduleTransferRelation";
import {LabeledTransferRelationImpl} from "../TransferRelation";

export class ScheduleAnalysis implements WrappingProgramAnalysis<ScheduleConcreteState, ScheduleAbstractState> {

    private readonly _abstractDomain: AbstractDomain<ScheduleConcreteState, ScheduleAbstractState>;
    private readonly _wrappedAnalysis: ProgramAnalysisWithLabels<any, any>;
    private readonly _transferRelation: ScheduleTransferRelation;

    constructor(wrappedAnalysis: ProgramAnalysisWithLabels<any, any>) {
        this._abstractDomain = new ScheduleAbstractDomain();
        this._wrappedAnalysis = wrappedAnalysis;
        this._transferRelation = new ScheduleTransferRelation(
            new LabeledTransferRelationImpl(this._wrappedAnalysis.abstractSucc,
                this._wrappedAnalysis.abstractSuccFor));
    }

    abstractSucc(fromState: ScheduleAbstractState): Iterable<ScheduleAbstractState> {
        return this._transferRelation.abstractSucc(fromState);
    }

    join(state1: ScheduleAbstractState, state2: ScheduleAbstractState): ScheduleAbstractState {
        return undefined;
    }

    merge(state1: ScheduleAbstractState, state2: ScheduleAbstractState): boolean {
        return false;
    }

    stop(state: ScheduleAbstractState, reached: StateSet<ScheduleAbstractState>): ScheduleAbstractState {
        return undefined;
    }

    target(state: ScheduleAbstractState): boolean {
        return this._wrappedAnalysis.target(state.wrappedState);
    }

    widen(state: ScheduleAbstractState): ScheduleAbstractState {
        return undefined;
    }

    get wrappedAnalysis(): ProgramAnalysis<any, any> {
        return this._wrappedAnalysis;
    }

    get abstractDomain(): AbstractDomain<any, any> {
        return this._abstractDomain;
    }

    initialStatesFor(task: App): ScheduleAbstractState[] {
        const bootstrapper: Actor = task.bootstrapper;
        const initScript: Script = task.getInitScript();
        return this._wrappedAnalysis.initialStatesFor(task).map((w) => {
            return ScheduleAbstractStateFactory.createInitialState(bootstrapper, initScript, w);
        });
    }

}
