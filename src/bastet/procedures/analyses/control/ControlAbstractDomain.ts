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
import {AbstractElement, AbstractElementVisitor, AbstractState, Lattice} from "../../../lattices/Lattice";
import {List as ImmList, Map as ImmMap, Record as ImmRec, Set as ImmSet} from "immutable";
import {ActorId} from "../../../syntax/app/Actor";
import {LocationId} from "../../../syntax/app/controlflow/ControlLocation";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ConcreteDomain, ConcreteElement} from "../../domains/ConcreteElements";
import {App} from "../../../syntax/app/App";
import {AfterStatementMonitoringEvent, SingularityEvent, TerminationEvent} from "../../../syntax/ast/core/CoreEvent";
import {Property} from "../../../syntax/Property";
import {TransRelId} from "../../../syntax/app/controlflow/TransitionRelation";
import {ScriptId} from "../../../syntax/app/controlflow/Script";
import {OperationId} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Preconditions} from "../../../utils/Preconditions";
import {DataLocation, DataLocations, TypedDataLocation} from "../../../syntax/app/controlflow/DataLocation";
import {ActorType} from "../../../syntax/ast/core/ScratchType";
import {Identifier} from "../../../syntax/ast/core/Identifier";

/**
 * Current thread state that is active or becomes active if...
 */
export enum ThreadComputationState {
    /**
     * ... the thread is supposed to perform a transition next.
     */
    THREAD_STATE_RUNNING = "R",

    /**
     * ... the thread is waiting for other threads to finish.
     */
    THREAD_STATE_WAIT = "W",
    THREAD_STATE_DONE = "D",
    THREAD_STATE_YIELD = "Y",
    THREAD_STATE_FAILURE = "F",
    THREAD_STATE_DISABLED = "P",
    THREAD_STATE_UNKNOWN = "?",
}

export type ThreadId = number;

export interface ControlConcreteState {

}

export interface RelationLocationAttributes {

    /** Unique identifier of the actor */
    actor: ActorId;

    /** Unique identifier of the transition relation */
    relation: TransRelId;

    /** Unique position within the transition relation */
    location: LocationId;

}

const RelationLocationRecord = ImmRec({
    actor: "",
    relation: 0,
    location: 0
});

export class RelationLocation extends RelationLocationRecord implements RelationLocationAttributes {

    constructor(actor: ActorId, relation: TransRelId, location: LocationId) {
        super({actor: actor, relation: relation, location: location});
    }

    public getActorId(): ActorId {
        return this.get('actor');
    }

    public getLocationId(): LocationId {
        return this.get('location');
    }

    public getRelationId(): TransRelId {
        return this.get('relation');
    }

    public withLocationId(location: LocationId): RelationLocation {
        return this.set("location", location);
    }

    public toString() {
        return `${this.getActorId()} ${this.getRelationId()} ${this.getLocationId()}`;
    }

}

export interface MethodCallAttributes {

    /**
     * Control location from that the method has been called
     */
    callFrom: RelationLocation;


    /**
     * Control location to that the method call is supposed to
     * return to after the method is finished
     */
    returnTo: RelationLocation;

}

const MethodCallRecord = ImmRec({
    callFrom: new RelationLocation("", 0, 0),
    returnTo: new RelationLocation("", 0, 0),
});

export class MethodCall extends MethodCallRecord implements MethodCallAttributes {

    constructor(callFrom: RelationLocation, returnTo: RelationLocation) {
        super({callFrom: callFrom, returnTo: returnTo});
    }

    public getCallFrom(): RelationLocation {
        return this.get('callFrom');
    }

    public getReturnTo(): RelationLocation {
        return this.get('returnTo');
    }

}

export interface ThreadStateAttributes {

    /** Unique identifier of the thread */
    threadId: ThreadId;

    /** Unique identifier of the actor */
    actorId: ActorId;

    /**
     * Script that is executed by the thread. Attention: The script might also call methods
     * with other transition relations. Furthermore, some transitions that become executed
     * might have been woven dynamically.
     */
    scriptId: ScriptId;

    /** Identifier of the control location (position in the transition system of the script) */
    operations: ImmList<OperationId>;

    /** Identifier of the control location (position in the transition system of the script) */
    location: RelationLocation;

    /** Computation state of the thread */
    computationState: ThreadComputationState;

    /** Set of threads this thread is waiting for before it can continue */
    waitingForThreads: ImmSet<ThreadId>;

    /** Set of properties for that the thread ran into a failing control location (ERROR location) */
    failedFor: ImmSet<Property>;

    /** Stack of method call and return locations to enable the inter-procedural analysis */
    callStack: ImmList<MethodCall>;

    /** Stack of loop bodies entered (represented by the loop head location) */
    loopStack: ImmList<RelationLocation>;

    /** In atomic group? */
    inAtomicMode: number;

}

const ThreadStateRecord = ImmRec({
    threadId: -1,
    scriptId: "",
    actorId: "",
    operations: ImmList<OperationId>(),
    location: new RelationLocation("", 0, 0),
    computationState: ThreadComputationState.THREAD_STATE_UNKNOWN,
    waitingForThreads: ImmSet<ThreadId>(),
    failedFor: ImmSet<Property>(),
    callStack: ImmList<MethodCall>(),
    loopStack: ImmList<RelationLocation>(),
    inAtomicMode: 0
});

export class ThreadState extends ThreadStateRecord implements AbstractElement, ThreadStateAttributes {

    constructor(threadId: ThreadId, actorId: ActorId, scriptId: ScriptId, operations: ImmList<OperationId>,
                location: RelationLocation, compState: ThreadComputationState, waitingForThreads: ImmSet<ThreadId>,
                failedFor: ImmSet<Property>, callStack: ImmList<MethodCall>, loopStack: ImmList<RelationLocation>,
                actorScopes: ImmMap<TypedDataLocation, string>,  inAtomicMode: number) {
        super({threadId: threadId, actorId: actorId, scriptId: scriptId, operations: operations, location: location,
            computationState: compState, waitingForThreads: waitingForThreads, failedFor: failedFor,
            callStack: callStack, loopStack: loopStack, inAtomicMode: inAtomicMode});
    }

    public getInAtomicMode(): number {
        return this.get('inAtomicMode');
    }

    public getThreadId(): ThreadId {
        return this.get('threadId');
    }

    public getActorId(): ActorId {
        return this.get('actorId');
    }

    public getScriptId(): ScriptId {
        return this.get('scriptId');
    }

    public getOperations(): ImmList<OperationId> {
        return this.get('operations');
    }

    public getRelationLocation(): RelationLocation {
        return this.get('location');
    }

    public getCallStack(): ImmList<MethodCall> {
        return this.get('callStack');
    }

    public getLoopStack(): ImmList<RelationLocation> {
        return this.get('loopStack');
    }

    public withLocation(value: RelationLocation): ThreadState {
        return this.set('location', value);
    }

    public getComputationState(): ThreadComputationState {
        return this.get('computationState');
    }

    public withComputationState(value: ThreadComputationState): ThreadState {
        return this.set('computationState', value);
    }

    public getWaitingForThreads(): ImmSet<ThreadId> {
        return this.get('waitingForThreads');
    }

    public getFailedFor(): ImmSet<Property> {
        return this.get('failedFor');
    }

    public withWaitingForThreads(value: ImmSet<ThreadId>): ThreadState {
        return this.set('waitingForThreads', value);
    }

    public withAddedWaitingFor(waitFor: ThreadState): ThreadState {
        return this.withWaitingForThreads(this.getWaitingForThreads().add(waitFor.threadId));
    }

    public withOperations(value: ImmList<OperationId>): ThreadState {
        return this.set('operations', value);
    }

    public withLoopStack(value: ImmList<RelationLocation>): ThreadState {
        return this.set('loopStack', value);
    }

    public withCallStack(value: ImmList<MethodCall>): ThreadState {
        return this.set('callStack', value);
    }

    public withFailedFor(value: ImmSet<Property>): ThreadState {
        return this.set('failedFor', value);
    }

    public withIncrementedAtomic(): ThreadState {
        return this.set('inAtomicMode', this.getInAtomicMode() + 1);
    }

    public withDecrementedAtomic(): ThreadState {
        const newValue = this.getInAtomicMode() - 1;
        Preconditions.checkState(newValue >= 0);
        return this.set('inAtomicMode', newValue);
    }

    withRemovedWaitingFor(threadId: ThreadId): ThreadState {
        return this.withWaitingForThreads(this.getWaitingForThreads().remove(threadId));
    }
}

export class ThreadStateFactory {

    private static THREAD_ID_SEQ: number;

    public static freshId(): number {
        if (!ThreadStateFactory.THREAD_ID_SEQ) {
            ThreadStateFactory.THREAD_ID_SEQ = 0;
        }
        return ThreadStateFactory.THREAD_ID_SEQ++;
    }

}

export interface ControlAbstractStateAttributes extends AbstractElement, SingletonStateWrapper {

    /** Set of properties for that the abstract state is a target state (computed, for faster lookup) */
    isTargetFor: ImmSet<Property>;

    /** List of threads and their states */
    threadStates: ImmList<ThreadState>;

    /** List of threads that check reaching a condition */
    conditionStates: ImmList<ThreadState>;

    /** Wrapped abstract state that stores the actual data of heap and stack */
    wrappedState: AbstractState;

    /** The threads that have been stepped to get to this state */
    steppedThreadIndices: ImmSet<number>;

    /** Actor scopes */
    actorScopes: ImmMap<DataLocation, ActorId>;

}

const ControlAbstractStateRecord = ImmRec({

    threadStates: ImmList<ThreadState>([]),

    conditionStates: ImmList<ThreadState>([]),

    steppedThreadIndices: ImmSet<number>(),

    wrappedState: null,

    actorScopes: ImmMap<DataLocation, ActorId>(),

    isTargetFor: ImmSet<Property>(),

});

export class IndexedThread {

    private readonly _threadStatus: ThreadState;

    private readonly _threadIndex: number;

    constructor(threadStatus: ThreadState, threadIndex: number) {
        this._threadStatus = Preconditions.checkNotUndefined(threadStatus);
        this._threadIndex = threadIndex;
    }

    get threadStatus(): ThreadState {
        return this._threadStatus;
    }

    get threadIndex(): number {
        return this._threadIndex;
    }

}

/**
 * A state with SHARED MEMORY
 */
export class ControlAbstractState extends ControlAbstractStateRecord implements AbstractState {

    constructor(threadStates: ImmList<ThreadState>, conditionStates: ImmList<ThreadState>,
                wrappedState: AbstractElement, isTargetFor: ImmSet<Property>,
                steppedThreadIndices: ImmSet<number>, actorScopes: ImmMap<DataLocation, ActorId>) {
        super({threadStates: threadStates, conditionStates: conditionStates, wrappedState: wrappedState, isTargetFor: isTargetFor,
            steppedThreadIndices: steppedThreadIndices, actorScopes: actorScopes});
    }

    public getIndexedThreadState(atIndex: number): IndexedThread {
        Preconditions.checkArgument(atIndex < this.getThreadStates().size);
        return new IndexedThread(this.getThreadStates().get(atIndex), atIndex);
    }

    public findThreadWithId(threadId: ThreadId): IndexedThread {
        for (const [index, state] of this.getThreadStates().entries()) {
            if (state.getThreadId() == threadId) {
                return new IndexedThread(state, index);
            }
        }
        return null;
    }

    public getThreadStates(): ImmList<ThreadState> {
        return this.get("threadStates");
    }

    public getConditionStates(): ImmList<ThreadState> {
        return this.get("conditionStates");
    }

    public getWrappedState(): AbstractState {
        return this.get("wrappedState");
    }

    public getIsTargetFor(): ImmSet<Property> {
        return this.get("isTargetFor");
    }

    public getSteppedFor(): ImmSet<number> {
        return this.get("steppedThreadIndices");
    }

    public getActorScopes(): ImmMap<DataLocation, ActorId> {
        return this.get('actorScopes');
    }

    public withActorScopes(scopes: ImmMap<DataLocation, ActorId>): ControlAbstractState {
        return this.set('actorScopes', scopes);
    }

    public withWrappedState(wrapped: AbstractElement): ControlAbstractState {
        return this.set('wrappedState', wrapped);
    }

    public withSteppedFor(steppedFor: Iterable<number>): ControlAbstractState {
        return this.set('steppedThreadIndices', ImmSet(steppedFor));
    }

    public withIsTargetFor(targetFor: Iterable<Property>): ControlAbstractState {
        return this.set('isTargetFor', ImmSet(targetFor));
    }

    public withThreadState(threadIndex: number, setStateTo: ThreadState): ControlAbstractState {
       return this.set('threadStates', this.getThreadStates().set(threadIndex, setStateTo));
    }

    withThreadStates(threadList: ImmList<ThreadState>): ControlAbstractState {
        return this.set('threadStates', threadList);
    }

    public withAddedConditionState(threadState: ThreadState): ControlAbstractState {
        return this.set('conditionStates', this.getConditionStates().push(threadState));
    }

    public withConditionState(threadIndex: number, setStateTo: ThreadState): ControlAbstractState {
        return this.set('conditionStates', this.getConditionStates().set(threadIndex, setStateTo));
    }

    withConditionStates(threadStateList: ImmList<ThreadState>): ControlAbstractState {
        return this.set('conditionStates', threadStateList);
    }

    public withThreadStateUpdate(threadIndex: number, updateFn: (ts: ThreadState) => ThreadState): ControlAbstractState {
        const toUpdate = this.getThreadStates().get(threadIndex);
        return this.withThreadState(threadIndex, updateFn(toUpdate));
    }

    public accept<R>(visitor: AbstractElementVisitor<R>): R {
        const visitMethod: string = `visit${this.constructor.name}`;
        if (visitor[visitMethod]) {
            return visitor[visitMethod](this);
        } else {
            return visitor.visit(this);
        }
    }
}

export class ScheduleAbstractStateFactory {

    static createInitialState(task: App, wrappedState: ImmRec<any>, isTarget) {
        let singular = false;
        let threads = ImmList<ThreadState>([]);
        let conditions = ImmList<ThreadState>([]);
        let actors = ImmMap<DataLocation, ActorId>();

        for (const actor of task.actors) {
            actors = actors.set(DataLocations.createTypedLocation(Identifier.of(actor.ident), ActorType.instance()), actor.ident);
            for (const script of actor.scripts) {
                if (script.transitions.transitionTable.size == 0) {
                    // Ignore empty scripts. We assume that there are
                    // no running threads with no operations to be processed.
                    continue;
                }

                const threadId = ThreadStateFactory.freshId();
                let threadState = ThreadComputationState.THREAD_STATE_WAIT;

                if (script.event instanceof SingularityEvent) {
                    Preconditions.checkState(!singular);
                    threadState = ThreadComputationState.THREAD_STATE_RUNNING;
                    singular = true;

                } else if (script.event instanceof AfterStatementMonitoringEvent) {
                    // This is a hack that would not be needed if threads would
                    // be scheduled by concern.
                    // The idea is that monitoring the program should be started
                    // if the program is fully initialized.
                    threadState = ThreadComputationState.THREAD_STATE_DISABLED;

                } else if (script.event instanceof TerminationEvent) {
                    // Will be activated if no other thread has ops to execute
                    threadState = ThreadComputationState.THREAD_STATE_DISABLED;
                }

                for (const locId of script.transitions.entryLocationSet) {
                    const loc: RelationLocation = new RelationLocation(actor.ident, script.transitions.ident, locId);
                    threads = threads.push(new ThreadState(threadId, actor.ident, script.id, ImmList(),
                        loc, threadState, ImmSet(), ImmSet(), ImmList(), ImmList(),
                        ImmMap(), 0));
                }
            }
        }

        return new ControlAbstractState(threads, conditions, wrappedState, isTarget, ImmSet(), actors);
    }
}

export class ControlLattice implements Lattice<ControlAbstractState> {

    private readonly _wrapped: Lattice<AbstractElement>;

    constructor(wrapped: Lattice<AbstractElement>) {
        this._wrapped = Preconditions.checkNotUndefined(wrapped);
    }

    bottom(): ControlAbstractState {
        throw new ImplementMeException();
    }

    isIncluded(element1: ControlAbstractState, element2: ControlAbstractState): boolean {
        throw new ImplementMeException();
    }

    join(element1: ControlAbstractState, element2: ControlAbstractState): ControlAbstractState {
        if (!element1.getThreadStates().equals(element2.getThreadStates())) {
            return this.top();
        }

        if (!element1.getActorScopes().equals(element2.getActorScopes())) {
            return this.top();
        }

        Preconditions.checkArgument(element1.getSteppedFor().equals(element2.getSteppedFor()));

        return element1
            .withWrappedState(this._wrapped.join(element1.getWrappedState(), element2.getWrappedState()))
            .withIsTargetFor(element1.getIsTargetFor().union(element2.getIsTargetFor()));
    }

    meet(element1: ControlAbstractState, element2: ControlAbstractState): ControlAbstractState {
        throw new ImplementMeException();
    }

    top(): ControlAbstractState {
        throw new ImplementMeException();
    }

}

export class ControlAbstractDomain implements AbstractDomain<ControlConcreteState, ControlAbstractState> {

    private readonly _lattice: Lattice<ControlAbstractState>;

    private readonly _wrapped: AbstractDomain<ConcreteElement, AbstractElement>;

    constructor(wrapped: AbstractDomain<ConcreteElement, AbstractElement>) {
        this._wrapped = Preconditions.checkNotUndefined(wrapped);
        this._lattice = new ControlLattice(wrapped.lattice);
    }

    abstract(elements: Iterable<ControlConcreteState>): ControlAbstractState {
        throw new ImplementMeException();
    }

    concretize(element: ControlAbstractState): Iterable<ControlConcreteState> {
        throw new ImplementMeException();
    }

    concretizeOne(element: ControlAbstractState): ControlConcreteState {
        return this._wrapped.concretizeOne(element);
    }

    widen(element: ControlAbstractState, precision: AbstractionPrecision): ControlAbstractState {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<ControlConcreteState> {
        throw new ImplementMeException();
    }

    get lattice(): Lattice<ControlAbstractState> {
        return this._lattice;
    }

}
