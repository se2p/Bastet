/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of Passau (uni-passau.de)
 *
 *   See the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Please make sure to CITE this work in your publications if you
 *   build on this work. Some of our maintainers or contributors might
 *   be interested in actively CONTRIBUTING to your research project.
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

import {ProgramAnalysisWithLabels, WrappingProgramAnalysis} from "../ProgramAnalysis";
import {
    ControlAbstractDomain,
    ControlAbstractState,
    IndexedThread,
    ScheduleAbstractStateFactory
} from "./ControlAbstractDomain";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {App} from "../../../syntax/app/App";
import {ControlTransferRelation} from "./ControlTransferRelation";
import {Preconditions} from "../../../utils/Preconditions";
import {BastetConfiguration} from "../../../utils/BastetConfiguration";
import {ProgramOperation, ProgramOperationInContext} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Refiner, Unwrapper, WrappingRefiner} from "../Refiner";
import {AbstractElement, AbstractState, Lattices} from "../../../lattices/Lattice";
import {Property} from "../../../syntax/Property";
import {FrontierSet, PartitionKey, ReachedSet} from "../../algorithms/StateSet";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {List as ImmList, Set as ImmSet} from "immutable";
import {LocationId} from "../../../syntax/app/controlflow/ControlLocation";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {LexiKey} from "../../../utils/Lexicographic";
import {getTheOnlyElement} from "../../../utils/Collections";
import {TransitionRelation} from "../../../syntax/app/controlflow/TransitionRelation";
import {ControlCoverageExaminer} from "./coverage/ControlCoverage";
import {ControlLocationExtractor} from "./ControlUtils";
import {CallStatement} from "../../../syntax/ast/core/statements/CallStatement";
import {Record as ImmRec, Map as ImmMap} from "immutable";
import {ReturnStatement} from "../../../syntax/ast/core/statements/ControlStatement";
import {AccessibilityRelation} from "../Accessibility";
import {
    ConcreteElement,
    ConcretePrimitive,
    ConcreteUnifiedMemory
} from "../../domains/ConcreteElements";
import {NotSupportedException} from "../../../core/exceptions/NotSupportedException";
import {Concern} from "../../../syntax/Concern";
import {AfterStatementMonitoringEvent} from "../../../syntax/ast/core/CoreEvent";
import {ConcreteProgramState, MethodCall, RelationLocation, ThreadId, ThreadState} from "./ConcreteProgramState";
import {EpsilonStatement} from "../../../syntax/ast/core/statements/EpsilonStatement";

export class ControlAnalysisConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ["ControlAnalysis"]);
    }

    get aggregateAtomicTransitions(): boolean {
        return this.getBoolProperty('aggregate-atomic-transitions', false);
    }

    get widenOnLoopHeads(): boolean {
        // TODO: im predicateAbstraction branch in der predicate-abstraction.json diesen Parameter noch auf true
        //  setzen
        return this.getBoolProperty('widen-on-loop-heads', false);
    }

    get checkLoopUnrollingFeasibility(): boolean {
        return this.getBoolProperty('check-feasibility-on-unrolling', true);
    }

    get widenAfterEachStep(): boolean {
        return this.getBoolProperty('widen-after-each-step', false);
    }

    get widenAfterFunctionReturn(): boolean {
        return this.getBoolProperty('widen-after-function-return', false);
    }

    get widenBeforeFunctionCall(): boolean {
        return this.getBoolProperty('widen-after-function-call', false);
    }

}

export class ControlAnalysis implements ProgramAnalysisWithLabels<ConcreteProgramState, ControlAbstractState, AbstractState>,
    WrappingProgramAnalysis<ConcreteProgramState, ControlAbstractState, AbstractState>,
    Unwrapper<ControlAbstractState, AbstractElement> {

    private readonly _config: ControlAnalysisConfig;

    private readonly _abstractDomain: AbstractDomain<ConcreteProgramState, ControlAbstractState>;

    private readonly _wrappedAnalysis: ProgramAnalysisWithLabels<any, any, AbstractState>;

    private readonly _transferRelation: ControlTransferRelation;

    private readonly _task: App;

    private readonly _statistics: AnalysisStatistics;

    private _seq: number = 0;

    constructor(config: {}, task: App, wrappedAnalysis: ProgramAnalysisWithLabels<any, any, AbstractState>, statistics: AnalysisStatistics) {
        this._config = new ControlAnalysisConfig(config);
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(this.constructor.name);
        this._task = Preconditions.checkNotUndefined(task);
        this._wrappedAnalysis = Preconditions.checkNotUndefined(wrappedAnalysis);
        this._abstractDomain = new ControlAbstractDomain(wrappedAnalysis.abstractDomain);
        this._transferRelation = new ControlTransferRelation(this._config, task, this.wrappedAnalysis,
            this._wrappedAnalysis.abstractDomain, this._statistics);
    }

    abstractSucc(fromState: ControlAbstractState): Iterable<ControlAbstractState> {
        const getThreadRelName = (ts: ThreadState) =>
            this._task.getTransitionRelationById(ts.getRelationLocation().getRelationId()).name;
        const filterRelNames = (threads: ImmSet<IndexedThread>) => {
            return threads.map(ts => getThreadRelName(ts.threadStatus)).filter((value, key) => key !== "messageDispatcherLoop");
        };

        const result: ControlAbstractState[] = [];
        for (const succ of this._transferRelation.abstractSucc(fromState)) {
            const steppedToLoopRelations = filterRelNames(this.getSteppedToLoopHeadThreads(succ));
            if (steppedToLoopRelations.size > 0 && this._config.checkLoopUnrollingFeasibility) {
                if (!Lattices.isFeasible(succ, this._abstractDomain.lattice, "Loop unrolling for " + steppedToLoopRelations.toString())) {
                    continue;
                }
            }
            result.push(succ);
        }
        return result;
    }

    createUniquePartition(): Object {
        return {id: this._seq++};
    }

    getControlPartition(element: ControlAbstractState): PartitionKey {
        const steppedFor: ImmSet<ThreadId> = element.getSteppedFor();
        const locations: ImmSet<LocationId> = ImmSet(element.getThreadStates()
            .map((ts) => ts.getRelationLocation().getLocationId()));
        const callstacks: ImmSet<ImmList<MethodCall>> = ImmSet(element.getThreadStates()
            .map((ts) => ts.getCallStack()));
        const loopstacks: ImmSet<ImmList<RelationLocation>> = ImmSet(element.getThreadStates()
            .map((ts) => ts.getLoopStack()));
        return new PartitionKey(ImmList([steppedFor, locations, callstacks, loopstacks]));
    }

    getStopPartitionKeys(element: ControlAbstractState): ImmSet<PartitionKey> {
        const controlPartition = this.getControlPartition(element);

        let result: ImmSet<PartitionKey> = ImmSet();
        for (const wrappedPartition of this.wrappedAnalysis.getPartitionKeys(element.getWrappedState())) {
            result = result.add(controlPartition.concat(wrappedPartition));
        }

        return result;
    }

    getMergePartitionKeys(element: ControlAbstractState): ImmSet<PartitionKey> {
        var controlPartition;
        if (this.steppedToLoopHead(element)) {
            // Results in a factor 2 performance boost of the merge operation
            controlPartition = new PartitionKey(ImmList([this.createUniquePartition()]));
        } else {
            controlPartition = this.getControlPartition(element);
        }

        let result: ImmSet<PartitionKey> = ImmSet();
        for (const wrappedPartition of this.wrappedAnalysis.getPartitionKeys(element.getWrappedState())) {
            result = result.add(controlPartition.concat(wrappedPartition));
        }

        return result;
    }

    getPartitionKeys(element: ControlAbstractState): ImmSet<PartitionKey> {
        return this.getStopPartitionKeys(element); // this.getMergePartitionKeys(element).union(this.getStopPartitionKeys(element));
    }

    join(state1: ControlAbstractState, state2: ControlAbstractState): ControlAbstractState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    shouldMerge(state1: ControlAbstractState, state2: ControlAbstractState): boolean {
        if (!state1.getSteppedFor().equals(state2.getSteppedFor())) {
            return false;
        }

        const steppedLocations1 = state1.getSteppedFor().map((i) =>
            state1.getIndexedThreadState(i)).map((ts) => ts.threadStatus.getRelationLocation());
        const steppedLocations2 = state2.getSteppedFor().map((i) =>
            state2.getIndexedThreadState(i)).map((ts) => ts.threadStatus.getRelationLocation());

        if (!steppedLocations1.equals(steppedLocations2)) {
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

        if (this.isWideningState(state1) || this.isWideningState(state2)) {
            // Do also consider threads that were not stepped!
            // Needed, for example, if the specification is checked after stepping on a loop head.
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

    isWideningState(state: ControlAbstractState): boolean {
        const isWideningState = this._config.widenAfterEachStep
            || (this._config.widenOnLoopHeads && this.steppedToLoopHead(state));

        if (this._config.widenAfterFunctionReturn || this._config.widenBeforeFunctionCall) {
            throw new ImplementMeException();
        }

        return isWideningState;
    }

    widen(state: ControlAbstractState, reached: Iterable<AbstractState>): ControlAbstractState {
        if (this.isWideningState(state)) {
            const wrappedResult = this._wrappedAnalysis.widen(state.getWrappedState(), reached);
            if (wrappedResult != state.getWrappedState()) {
                // Also the control state has to be widened (get rid of loop stacks)
                let result = state
                for (let steppedIx of state.getSteppedFor()) {
                   result = result.withThreadStateUpdate(steppedIx, (ts) => ts.withLoopStack(ImmList()));
                }
                return result.withWrappedState(wrappedResult);
            } else {
                return state;
            }
        } else {
            return state;
        }
    }

    unwrap(e: ControlAbstractState): AbstractElement {
        return e.getWrappedState();
    }

    get refiner(): Refiner<AbstractState> {
        return new WrappingRefiner(this.wrappedAnalysis.refiner);
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

    getTransitionLabel(from: ControlAbstractState, to: ControlAbstractState): [ThreadState, ProgramOperation][] {
        const result: [ThreadState, ProgramOperation][] = this._wrappedAnalysis
            .getTransitionLabel(from.getWrappedState(), to.getWrappedState())
            .filter(([t, o]) => !(o.ast instanceof EpsilonStatement));

        if (result.length > 0) {
            return result;
        }

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
                result.push([steppedThread, t]);
            } else {
                const fromRelation = this._task.getTransitionRelationById(fromLocation.getRelationId());
                const toRelation = this._task.getTransitionRelationById(toLocation.getRelationId());

                const calls = fromRelation.transitionsFrom(fromLocation.getLocationId())
                    .map(t => ProgramOperation.for(t.opId))
                    .filter(o => o.ast instanceof CallStatement || o.ast instanceof ReturnStatement);
                if (calls.length > 0) {
                    const call = getTheOnlyElement(calls);
                    result.push([steppedThread, call]);
                } else {
                    const mkTuple = (t: ThreadState, o: ProgramOperation): [ThreadState, ProgramOperation] => [t, o];
                    return steppedThread.getOperations().map(oid => mkTuple(steppedThread, ProgramOperation.for(oid))).toArray();
                }
            }
        }

        return result;
    }

    createStateSets(): [FrontierSet<AbstractState>, ReachedSet<AbstractState>] {
        throw new ImplementMeException();
    }

    widenPartitionOf(ofState: ControlAbstractState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    mergePartitionOf(ofState: ControlAbstractState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    stopPartitionOf(ofState: ControlAbstractState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    private getSteppedToLoopHeadThreads(r: ControlAbstractState) {
        return r.getSteppedFor().map((i) =>
            r.getIndexedThreadState(i)).filter((ts) => this.isThreadOnLoophead(ts.threadStatus));
    }

    private steppedToLoopHead(r: ControlAbstractState) {
        const steppedThreads = this.getSteppedToLoopHeadThreads(r);
        return steppedThreads.size > 0;
    }

    private isThreadOnLoophead(ts: ThreadState) {
        const relation = this._task.getTransitionRelationById(ts.getRelationLocation().getRelationId());
        return relation.isLoopHead(ts.getRelationLocation().getLocationId());
    }

    private isSteppedOrWaitingOnLoophead(r: ControlAbstractState) {
        for (const ts of r.getThreadStates()) {
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

    getThreadLexiOrderKey(threadStatus: ThreadState): LexiKey {
        const relLocA: RelationLocation = threadStatus.getRelationLocation();
        const relA: TransitionRelation = this._task.getTransitionRelationById(relLocA.getRelationId());
        const rpoA: number = relA.getWaitAtMeetOrderOf(relLocA.getLocationId());
        const callstackKey = threadStatus.getCallStack().size;
        const loopstackKey = threadStatus.getLoopStack().size;

        const actor = this._task.getActorByName(threadStatus.getActorId());
        const script = actor.getScript(threadStatus.getScriptId());
        const isSpec = script.event instanceof AfterStatementMonitoringEvent ? 1 : 0;

        // We use a Max-Priority-Queue. Larger elements are prefered but we
        // want to process elements with the smaller wait-at-meet order first:
        return new LexiKey([isSpec, -loopstackKey, callstackKey, -rpoA]);
    }

    getLexiOrderKey(ofState: ControlAbstractState): LexiKey {
        const steppedThreadsA = ofState.getSteppedFor().map((i) => ofState.getIndexedThreadState(i));

        if (steppedThreadsA.size == 1) {
            const steppedA: IndexedThread = getTheOnlyElement(steppedThreadsA);
            const steppedLexiKey = this.getThreadLexiOrderKey(steppedA.threadStatus);

            // Also take the activating thread into account.
            // This is important for the progress of the analysis process (it is
            // relevant how different threads activate each other).
            let activationLexiKey: LexiKey;
            const activatedBy = steppedA.threadStatus.getActivatedByThread();
            if (activatedBy > -1) {
                const activatedByThread = getTheOnlyElement(ofState.threadStates.filter(
                    (ts) => ts.threadId == activatedBy));
                activationLexiKey = this.getThreadLexiOrderKey(activatedByThread);
            } else {
                activationLexiKey = new LexiKey([]);
            }


            // We use a Max-Priority-Queue. Larger elements are prefered but we
            // want to process elements with the smaller wait-at-meet order first:
            return new LexiKey([activationLexiKey, steppedLexiKey]);
        }

        return new LexiKey([]);
    }

    getLexiDiffKey(ofState: ControlAbstractState): LexiKey {
        const steppedThreadsA = ofState.getSteppedFor().map((i) => ofState.getIndexedThreadState(i));

        if (steppedThreadsA.size == 1) {
            const steppedA: IndexedThread = getTheOnlyElement(steppedThreadsA);
            return new LexiKey([steppedA.threadStatus.getThreadId()]);
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
        covStats.put("uncoveredPerLocationAbs", coverage.numberOfUncoveredPerRelation);

        const actors = this._statistics.withContext("Actors");
        actors.put("actorOrder", this._task.actors.map(a => a.ident).toString())
        for (const a of this._task.actors) {
            actors.withContext(a.ident).put("scripts", Array.from(a.scripts).map((s) => s.transitions.name).toString());
        }
    }

    testify(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): AccessibilityRelation<AbstractState> {
        return this._wrappedAnalysis.testify(accessibility, state);
    }

    testifyOne(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): AccessibilityRelation<AbstractState> {
        return this._wrappedAnalysis.testifyOne(accessibility, state);
    }

    testifyConcrete(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): Iterable<[AbstractState, ConcreteProgramState][]> {
        throw new ImplementMeException();
    }

    testifyConcreteOne(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): Iterable<[AbstractState, ConcreteProgramState][]> {
        const seq: Iterable<[AbstractState, ConcreteElement][]> = this._wrappedAnalysis.testifyConcreteOne(accessibility, state);
        const result: [AbstractState, ConcreteProgramState][][] = [];

        // Given a sequence of concrete unified memories to goal is to build a sequence of concrete PROGRAM states

        for (const s of seq) {
            const sPrime: [AbstractState, ConcreteProgramState][] = [];

            for (const [e, c] of s) {
                sPrime.push([e, this._abstractDomain.enrich(c as ConcreteUnifiedMemory)]);
            }

            result.push(sPrime);
        }

        return result;
    }

    abstractSuccFor(fromState: ControlAbstractState, op: ProgramOperationInContext, co: Concern): Iterable<ControlAbstractState> {
        throw new NotSupportedException();
    }

    accessibility(reached: ReachedSet<AbstractState>, state: AbstractState): AccessibilityRelation<AbstractState> {
        throw new ImplementMeException();
    }

    incRef(state: ControlAbstractState) {
        this.wrappedAnalysis.incRef(state.getWrappedState());
    }

    decRef(state: ControlAbstractState) {
        this.wrappedAnalysis.decRef(state.getWrappedState());
    }

}
