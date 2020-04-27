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

import {ProgramAnalysisWithLabelProducer, ProgramAnalysisWithLabels, WrappingProgramAnalysis} from "../ProgramAnalysis";
import {
    ControlAbstractDomain,
    ControlAbstractState,
    ControlConcreteState, IndexedThread,
    MethodCall, RelationLocation,
    ScheduleAbstractStateFactory
} from "./ControlAbstractDomain";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {App} from "../../../syntax/app/App";
import {ControlTransferRelation} from "./ControlTransferRelation";
import {Preconditions} from "../../../utils/Preconditions";
import {BastetConfiguration} from "../../../utils/BastetConfiguration";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Refiner, Unwrapper, WrappingRefiner} from "../Refiner";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {Property} from "../../../syntax/Property";
import {
    CHOOSE_EITHER,
    CHOOSE_FIRST,
    CHOOSE_SECOND,
    FrontierSet,
    PartitionKey,
    ReachedSet
} from "../../algorithms/StateSet";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {List as ImmList, Set as ImmSet} from "immutable";
import {LocationId} from "../../../syntax/app/controlflow/ControlLocation";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {LexiKey} from "../../../utils/Lexicographic";
import {getTheOnlyElement} from "../../../utils/Collections";
import {TransitionRelation} from "../../../syntax/app/controlflow/TransitionRelation";
import {ControlCoverageExaminer} from "./coverage/ControlCoverage";

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
        this._transferRelation = new ControlTransferRelation(this._config, task, this.wrappedAnalysis,
            this._wrappedAnalysis.abstractDomain);
        this._refiner = new WrappingRefiner(this._wrappedAnalysis.refiner, this);
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(this.constructor.name);
    }

    abstractSucc(fromState: ControlAbstractState): Iterable<ControlAbstractState> {
        const result: ControlAbstractState[] = [];
        for (const r of this._transferRelation.abstractSucc(fromState)) {
            if (!this.steppedOnLoophead(r) || this.refiner.checkIsFeasible(r, "Loop unrolling")) {
                result.push(r);
            }
        }

        return result;
    }

    getPartitionKeys(element: ControlAbstractState): ImmSet<PartitionKey> {
        const locations: ImmSet<LocationId> = ImmSet(element.getThreadStates().map((ts) =>
            ts.getRelationLocation().getLocationId()));
        const callstacks: ImmSet<ImmList<MethodCall>> = ImmSet(element.getThreadStates().map((ts) =>
            ts.getCallStack()));
        const controlPartition = new PartitionKey(ImmList([locations, callstacks]));

        let result: ImmSet<PartitionKey> = ImmSet();
        for (const wrappedPartition of this.wrappedAnalysis.getPartitionKeys(element.getWrappedState())) {
            result = result.add(controlPartition.concat(wrappedPartition));
        }

        return result;
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

        if (!state1.getConditionStates().equals(state2.getConditionStates())) {
            return false;
        }

        if (!state1.getActorScopes().equals(state2.getActorScopes())) {
            return false;
        }

        if (!state1.getIsTargetFor().equals(state2.getIsTargetFor())) {
            return false;
        }

        if (this.steppedOnLoophead(state1) || this.steppedOnLoophead(state2)) {
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

    get wrappedAnalysis(): ProgramAnalysisWithLabels<any, any, AbstractState> {
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
                const t = withinRelation.transitionBetween(fromLocation.getLocationId(), toLocation.getLocationId())
                if (t == null && fromLocation.getLocationId() == toLocation.getLocationId()) {
                    throw new IllegalStateException("Conducted stuttering transition not known in the transition relation");
                } else if (t == null) {
                   throw new IllegalStateException("Something is really wrong here. This seems to be a BUG") ;
                }
                result.push(t);
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
        const steppedthreads = r.getSteppedFor().map((i) => r.getIndexedThreadState(i));

        for (const t of steppedthreads) {
            const ts = t.threadStatus;
            const relation = this._task.getTransitionRelationById(ts.getRelationLocation().getRelationId());
            if (relation.isLoopHead(ts.getRelationLocation().getLocationId())) {
                return true;
            }
        }

        return false;
    }

    handleViolatingState(reached: ReachedSet<AbstractState>, violating: AbstractState) {
        throw new ImplementMeException();
    }

    compareStateOrder(a: ControlAbstractState, b: ControlAbstractState): number {
        const keyA = this.getLexiOrderKey(a);
        const keyB = this.getLexiOrderKey(b);
        return keyA.compareTo(keyB);
    }

    getLexiOrderKey(ofState: ControlAbstractState): LexiKey {
        const steppedThreadsA = ofState.getSteppedFor().map((i) => ofState.getIndexedThreadState(i));

        if (steppedThreadsA.size == 1) {
            const steppedA: IndexedThread = getTheOnlyElement(steppedThreadsA);
            const relLocA: RelationLocation = steppedA.threadStatus.getRelationLocation();
            const relA: TransitionRelation = this._task.getTransitionRelationById(relLocA.getRelationId());
            const rpoA: number = relA.getWaitAtMeetOrderOf(relLocA.getLocationId());

            return new LexiKey([rpoA * -1]); // We use a Max-Priority-Queue. Larger elements are prefered but we
            // what to process elements with the smaller wait-at-meet order first
        }

        return new LexiKey([]);
    }

    finalizeResults(frontier: FrontierSet<AbstractState>, reached: ReachedSet<AbstractState>) {
        this.wrappedAnalysis.finalizeResults(frontier, reached);

        const examiner = new ControlCoverageExaminer();
        const coverage = examiner.determineCoverageOf(this._task, reached);
        const covStats = this._statistics.withContext("Coverage");
        covStats.put("coveredLocationsPercent", coverage.controlCoveragePercent);
        covStats.put("coveredLocationsAbs", coverage.coveredControlLocationsAbs);
        covStats.put("uncoveredLocationsAbs", coverage.uncoveredControlLocationsAbs);
    }
}
