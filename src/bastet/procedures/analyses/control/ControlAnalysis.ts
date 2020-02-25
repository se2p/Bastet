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

import {
    ProgramAnalysis,
    ProgramAnalysisWithLabelProducer,
    ProgramAnalysisWithLabels,
    WrappingProgramAnalysis
} from "../ProgramAnalysis";
import {
    ControlAbstractDomain,
    ScheduleAbstractState,
    ScheduleAbstractStateFactory,
    ScheduleConcreteState
} from "./ControlAbstractDomain";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {App} from "../../../syntax/app/App";
import {ControlTransferRelation} from "./ControlTransferRelation";
import {LabeledTransferRelationImpl} from "../TransferRelation";
import {Preconditions} from "../../../utils/Preconditions";
import {BastetConfiguration} from "../../../utils/BastetConfiguration";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {Refiner, Unwrapper, WrappingRefiner} from "../Refiner";
import {AbstractElement} from "../../../lattices/Lattice";
import {GraphAbstractState} from "../graph/GraphAbstractDomain";
import {Property} from "../../../syntax/Property";
import {StateSet} from "../../algorithms/StateSet";
import {AnalysisStatistics} from "../AnalysisStatistics";

export class ScheduleAnalysisConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict);
    }

    get aggregateAtomicTransitions(): boolean {
        return this.getBoolProperty('aggregate-atomic-transitions', false);
    }

}

export class ControlAnalysis implements ProgramAnalysisWithLabelProducer<ScheduleConcreteState, ScheduleAbstractState>,
    WrappingProgramAnalysis<ScheduleConcreteState, ScheduleAbstractState>,
    Unwrapper<ScheduleAbstractState, AbstractElement> {

    private readonly _config: ScheduleAnalysisConfig;

    private readonly _abstractDomain: AbstractDomain<ScheduleConcreteState, ScheduleAbstractState>;

    private readonly _wrappedAnalysis: ProgramAnalysisWithLabels<any, any>;

    private readonly _transferRelation: ControlTransferRelation;

    private readonly _refiner: Refiner<ScheduleAbstractState>;

    private readonly _task: App;

    private readonly _statistics: AnalysisStatistics;

    constructor(config: {}, task: App, wrappedAnalysis: ProgramAnalysisWithLabels<any, any>, statistics: AnalysisStatistics) {
        this._config = new ScheduleAnalysisConfig(config);
        this._task = Preconditions.checkNotUndefined(task);
        this._wrappedAnalysis = Preconditions.checkNotUndefined(wrappedAnalysis);
        this._abstractDomain = new ControlAbstractDomain();
        this._transferRelation = new ControlTransferRelation(this._config, task,
            new LabeledTransferRelationImpl((e) => this._wrappedAnalysis.abstractSucc(e),
                (e, op, co) => this._wrappedAnalysis.abstractSuccFor(e, op, co)));
        this._refiner = new WrappingRefiner(this._wrappedAnalysis.refiner, this);
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(this.constructor.name);
    }

    abstractSucc(fromState: ScheduleAbstractState): Iterable<ScheduleAbstractState> {
        return this._transferRelation.abstractSucc(fromState);
    }

    join(state1: ScheduleAbstractState, state2: ScheduleAbstractState): ScheduleAbstractState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    merge(state1: ScheduleAbstractState, state2: ScheduleAbstractState): boolean {
        return false;
    }

    stop(state: ScheduleAbstractState, reached: Iterable<ScheduleAbstractState>): boolean {
        for (const r of reached) {
            if (state.getThreadStates().equals(r.getThreadStates())) {
                const w = state.getWrappedState();
                if (this._wrappedAnalysis.stop(w, [r.getWrappedState()])) {
                    return true;
                }
            }
        }
        return false;
    }

    target(state: ScheduleAbstractState): Property[] {
        let result: Property[] = [];
        if (state.getIsTargetFor().size > 0) {
            for (const p of state.getIsTargetFor()) {
                result.push(p);
            }
        }
        for (const p of this._wrappedAnalysis.target(state.wrappedState)) {
            result.push(p);
        }
        return result;
    }

    widen(state: ScheduleAbstractState): ScheduleAbstractState {
        return undefined;
    }

    unwrap(e: ScheduleAbstractState): AbstractElement {
        return e.getWrappedState();
    }

    get refiner(): Refiner<ScheduleAbstractState> {
        return this._refiner;
    }

    get wrappedAnalysis(): ProgramAnalysis<any, any> {
        return this._wrappedAnalysis;
    }

    get abstractDomain(): AbstractDomain<any, any> {
        return this._abstractDomain;
    }

    initialStatesFor(task: App): ScheduleAbstractState[] {
        return this._wrappedAnalysis.initialStatesFor(task).map((w) => {
            return ScheduleAbstractStateFactory.createInitialState(task, w, false);
        });
    }

    getTransitionLabel(from: ScheduleAbstractState, to: ScheduleAbstractState): ProgramOperation {
        throw new ImplementMeException();
    }

    wrapStateSets(frontier: StateSet<ScheduleAbstractState>, reached: StateSet<ScheduleAbstractState>): [StateSet<ScheduleAbstractState>, StateSet<ScheduleAbstractState>] {
        return [frontier, reached];
    }

}
