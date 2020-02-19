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

import {ProgramAnalysis, ProgramAnalysisWithLabels} from "../ProgramAnalysis";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {App} from "../../../syntax/app/App";
import {AbstractElement} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {ConcreteElement} from "../../domains/ConcreteElements";
import {LabeledTransferRelation, LabeledTransferRelationImpl} from "../TransferRelation";
import {SSAAbstractDomain, SSAState} from "./SSAAbstractDomain";
import {SSATransferRelation} from "./SSATransferRelation";
import {Map as ImmMap} from "immutable"
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Refiner, Unwrapper, WrappingRefiner} from "../Refiner";
import {ScheduleAbstractState} from "../schedule/ScheduleAbstractDomain";


export class SSAAnalysis implements ProgramAnalysisWithLabels<ConcreteElement, SSAState>,
    LabeledTransferRelation<SSAState>,
    Unwrapper<SSAState, AbstractElement> {

    private readonly _abstractDomain: AbstractDomain<ConcreteElement, SSAState>;

    private readonly _wrappedAnalysis: ProgramAnalysis<any, any>;

    private readonly _transferRelation: SSATransferRelation;

    private readonly _refiner: Refiner<SSAState>;

    private readonly _task: App;

    constructor(task: App, wrappedAnalysis: ProgramAnalysisWithLabels<any, any>) {
        this._task = Preconditions.checkNotUndefined(task);
        this._wrappedAnalysis = Preconditions.checkNotUndefined(wrappedAnalysis);
        this._abstractDomain = new SSAAbstractDomain(wrappedAnalysis.abstractDomain);

        const wrappedTr = LabeledTransferRelationImpl.from(wrappedAnalysis);
        this._transferRelation = new SSATransferRelation(wrappedTr);
        this._refiner = new WrappingRefiner(this._wrappedAnalysis.refiner, this);
    }

    abstractSucc(fromState: SSAState): Iterable<SSAState> {
        return this._transferRelation.abstractSucc(fromState);
    }

    abstractSuccFor(fromState: SSAState, op: ProgramOperation): Iterable<SSAState> {
        return this._transferRelation.abstractSuccFor(fromState, op);
    }

    join(state1: SSAState, state2: SSAState): SSAState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    merge(state1: SSAState, state2: SSAState): boolean {
        // MERGE-SEP
        return false;
    }

    stop(state: SSAState, reached: Iterable<SSAState>): boolean {
        for (const r of reached) {
            const w: AbstractElement = state.getWrappedState();
            if (this._wrappedAnalysis.stop(w, [r.getWrappedState()])) {
                return true;
            }
        }
        return false;
    }

    target(state: SSAState): boolean {
        return this._wrappedAnalysis.target(state.wrappedState);
    }

    widen(state: SSAState): SSAState {
        // TODO: Implement the widening (delegate to wrapped analyses)
        return state;
    }

    unwrap(e: SSAState): AbstractElement {
        return e.getWrappedState();
    }

    get refiner(): Refiner<SSAState> {
        return this._refiner;
    }

    get abstractDomain(): AbstractDomain<ConcreteElement, SSAState> {
        return this._abstractDomain;
    }

    get wrappedAnalysis(): ProgramAnalysis<any, any> {
        return this._wrappedAnalysis;
    }

    initialStatesFor(task: App): SSAState[] {
        Preconditions.checkArgument(task === this._task);
        return this._wrappedAnalysis.initialStatesFor(task).map((w) => {
            return new SSAState(ImmMap({}), ImmMap({}), w);
        } );
    }

}
