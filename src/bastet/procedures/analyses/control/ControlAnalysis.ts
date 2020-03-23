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
    ControlAbstractState,
    ControlConcreteState,
    ScheduleAbstractStateFactory
} from "./ControlAbstractDomain";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {App} from "../../../syntax/app/App";
import {ControlTransferRelation} from "./ControlTransferRelation";
import {LabeledTransferRelationImpl} from "../TransferRelation";
import {Preconditions} from "../../../utils/Preconditions";
import {BastetConfiguration} from "../../../utils/BastetConfiguration";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Refiner, Unwrapper, WrappingRefiner} from "../Refiner";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {Property} from "../../../syntax/Property";
import {FrontierSet, PartitionKeyElement, ReachedSet, StateSet} from "../../algorithms/StateSet";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {DataAbstractState} from "../data/DataAbstractDomain";

export class ControlAnalysisConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ["ControlAnalysis"]);
    }

    get aggregateAtomicTransitions(): boolean {
        return this.getBoolProperty('aggregate-atomic-transitions', false);
    }

}

export class ControlAnalysis implements ProgramAnalysisWithLabelProducer<ControlConcreteState, ControlAbstractState, AbstractState>,
    WrappingProgramAnalysis<ControlConcreteState, ControlAbstractState, AbstractState>,
    Unwrapper<ControlAbstractState, AbstractElement> {

    private readonly _config: ControlAnalysisConfig;

    private readonly _abstractDomain: AbstractDomain<ControlConcreteState, ControlAbstractState>;

    private readonly _wrappedAnalysis: ProgramAnalysisWithLabels<any, any, AbstractState>;

    private readonly _transferRelation: ControlTransferRelation;

    private readonly _refiner: Refiner<ControlAbstractState>;

    private readonly _task: App;

    private readonly _statistics: AnalysisStatistics;

    constructor(config: {}, task: App, wrappedAnalysis: ProgramAnalysisWithLabels<any, any, AbstractState>, statistics: AnalysisStatistics) {
        this._config = new ControlAnalysisConfig(config);
        this._task = Preconditions.checkNotUndefined(task);
        this._wrappedAnalysis = Preconditions.checkNotUndefined(wrappedAnalysis);
        this._abstractDomain = new ControlAbstractDomain(wrappedAnalysis.abstractDomain);
        this._transferRelation = new ControlTransferRelation(this._config, task,
            new LabeledTransferRelationImpl((e) => this._wrappedAnalysis.abstractSucc(e),
                (e, op, co) => this._wrappedAnalysis.abstractSuccFor(e, op, co)));
        this._refiner = new WrappingRefiner(this._wrappedAnalysis.refiner, this);
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(this.constructor.name);
    }

    abstractSucc(fromState: ControlAbstractState): Iterable<ControlAbstractState> {
        const result: ControlAbstractState[] = [];
        for (const r of this._transferRelation.abstractSucc(fromState)) {
            if (!this.steppedOnLoophead(r) || this.refiner.checkIsFeasible(r)) {
                result.push(r);
            }
        }

        return result;
    }

    getPartitionKey(element: ControlAbstractState): PartitionKeyElement[] {
        const steppedForLocations: PartitionKeyElement[] = element.getSteppedFor()
            .map((ix) => element.getIndexedThreadState(ix).threadStatus.getRelationLocation().getLocationId()).toArray();
        return steppedForLocations.concat(this.wrappedAnalysis.getPartitionKey(element.getWrappedState()));
    }

    join(state1: ControlAbstractState, state2: ControlAbstractState): ControlAbstractState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    shouldMerge(state1: ControlAbstractState, state2: ControlAbstractState): boolean {
        if (!state1.getSteppedFor().equals(state2.getSteppedFor())) {
            return false;
        }

        if (!state1.getThreadStates().equals(state2.getThreadStates())) {
            return false;
        }

        if (!state1.getIsTargetFor().equals(state2.getIsTargetFor())) {
            return false;
        }


        return this.wrappedAnalysis.shouldMerge(state1.getWrappedState(), state2.getWrappedState());
    }

    merge(state1: ControlAbstractState, state2: ControlAbstractState): ControlAbstractState {
        return state1
            .withWrappedState(this._wrappedAnalysis.merge(state1.getWrappedState(), state2.getWrappedState()))
            .withIsTargetFor(state1.getIsTargetFor().union(state2.getIsTargetFor()));
    }

    mergeInto(state: ControlAbstractState, frontier: FrontierSet<ControlAbstractState>, reached: ReachedSet<ControlAbstractState>, unwrapper: (AbstractElement) => ControlAbstractState, wrapper: (E) => AbstractElement): [FrontierSet<ControlAbstractState>, ReachedSet<ControlAbstractState>] {
        throw new ImplementMeException();
    }

    stop(state: ControlAbstractState, reached: Iterable<AbstractElement>, unwrapper: (AbstractElement) => ControlAbstractState): boolean {
        // TODO: Rewrite this?
        for (const r of reached) {
            const cs = unwrapper(r);
            if (state.getThreadStates().equals(cs.getThreadStates())) {
                const w = state.getWrappedState();
                if (this._wrappedAnalysis.stop(w, [cs.getWrappedState()], (e) => this.unwrap(e))) {
                    return true;
                }
            }
        }

        return false;
    }

    target(state: ControlAbstractState): Property[] {
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

    widen(state: ControlAbstractState): ControlAbstractState {
        return undefined;
    }

    unwrap(e: ControlAbstractState): AbstractElement {
        return e.getWrappedState();
    }

    get refiner(): Refiner<ControlAbstractState> {
        return this._refiner;
    }

    get wrappedAnalysis(): ProgramAnalysis<any, any, AbstractState> {
        return this._wrappedAnalysis;
    }

    get abstractDomain(): AbstractDomain<any, any> {
        return this._abstractDomain;
    }

    initialStatesFor(task: App): ControlAbstractState[] {
        return this._wrappedAnalysis.initialStatesFor(task).map((w) => {
            return ScheduleAbstractStateFactory.createInitialState(task, w, false);
        });
    }

    getTransitionLabel(from: ControlAbstractState, to: ControlAbstractState): ProgramOperation[] {
        const result: ProgramOperation[] = [];
        for (const threadIdx of to.getSteppedFor().values()) {
            const steppedThread = from.getThreadStates().get(threadIdx);
            const succThread = to.getThreadStates().get(threadIdx);
            Preconditions.checkArgument(steppedThread.getScriptId() == succThread.getScriptId());

            const fromLocation = steppedThread.getRelationLocation();
            const toLocation = succThread.getRelationLocation();

            if (fromLocation.getRelationId() == toLocation.getRelationId()) {
               const withinRelation = this._task.getTransitionRelationById(fromLocation.getRelationId());
               result.push(withinRelation.transitionBetween(fromLocation.getLocationId(), toLocation.getLocationId()));
            } else {
                return steppedThread.getOperations().map(oid => ProgramOperation.for(oid)).toArray();
            }
        }

        return result;
    }

    getStateLabel(state: ControlAbstractState): string {
        const innerLabelingFn = this.wrappedAnalysis['getStateLabel'];
        const innerLabel = innerLabelingFn ? innerLabelingFn(state) : "?";
        const controlLabel = state.getThreadStates()
            .map((e) => `[${e.getActorId()} ${e.getScriptId()} ${e.getRelationLocation().getLocationId()}]`)
            .join(", ");

        return `${controlLabel} ${innerLabel}`;
    }

    createStateSets(): [FrontierSet<AbstractState>, ReachedSet<AbstractState>] {
        throw new ImplementMeException();
    }

    partitionOf(ofState: ControlAbstractState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        return this.wrappedAnalysis.partitionOf(ofState, reached);
    }

    private steppedOnLoophead(r: ControlAbstractState) {
        const steppedThreads = r.getSteppedFor().map((i) => r.getIndexedThreadState(i));

        for (const t of steppedThreads) {
            const ts = t.threadStatus;
            const actor = this._task.getActorByName(ts.getActorId());
            const script = actor.getScript(ts.getScriptId());
            if (script.transitions.isLoopHead(ts.getRelationLocation().getLocationId())) {
                return true;
            }
        }

        return false;
    }
}
