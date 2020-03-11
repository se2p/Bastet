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
import {Actor, ActorId} from "../../../syntax/app/Actor";
import {LocationId} from "../../../syntax/app/controlflow/ControlLocation";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ConcreteDomain} from "../../domains/ConcreteElements";
import {App} from "../../../syntax/app/App";
import {AfterStatementMonitoringEvent, BootstrapEvent, SingularityEvent} from "../../../syntax/ast/core/CoreEvent";
import {Property} from "../../../syntax/Property";
import {TransRelId} from "../../../syntax/app/controlflow/TransitionRelation";
import {ScriptId} from "../../../syntax/app/controlflow/Script";
import {OperationId} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Preconditions} from "../../../utils/Preconditions";
import {DataLocation, DataLocations, TypedDataLocation} from "../../../syntax/app/controlflow/DataLocation";
import {ActorType} from "../../../syntax/ast/core/ScratchType";
import {VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {Identifier} from "../../../syntax/ast/core/Identifier";

export enum ThreadComputationState {
    THREAD_STATE_RUNNING = "R",
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

export interface ScriptLocationAttributes {

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

export class RelationLocation extends RelationLocationRecord implements ScriptLocationAttributes {

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

    /** Scope to uniquely identify currently declared and references variables (data locations) */
    scopeStack: ImmList<string>;

    /** In atomic group? */
    inAtomicMode: number;

}

const ThreadStateRecord = ImmRec({
    threadId: -1,
    scriptId: -1,
    actorId: "",
    operations: ImmList<OperationId>(),
    location: new RelationLocation("", 0, 0),
    computationState: ThreadComputationState.THREAD_STATE_UNKNOWN,
    waitingForThreads: ImmSet<ThreadId>(),
    failedFor: ImmSet<Property>(),
    callStack: ImmList<MethodCall>(),
    scopeStack: ImmList<string>(),
    inAtomicMode: 0
});

export class ThreadState extends ThreadStateRecord implements AbstractElement, ThreadStateAttributes {

    constructor(threadId: ThreadId, actorId: ActorId, scriptId: ScriptId, operations: ImmList<OperationId>,
                location: RelationLocation, compState: ThreadComputationState, waitingForThreads: ImmSet<ThreadId>,
                failedFor: ImmSet<Property>, callStack: ImmList<MethodCall>, scopeStack: ImmList<string>,
                actorScopes: ImmMap<TypedDataLocation, string>,  inAtomicMode: number) {
        super({threadId: threadId, actorId: actorId, scriptId: scriptId, operations: operations, location: location,
            computationState: compState, waitingForThreads: waitingForThreads, failedFor: failedFor,
            callStack: callStack, scopeStack: scopeStack, inAtomicMode: inAtomicMode});
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

    public getScopeStack(): ImmList<string> {
        return this.get('scopeStack');
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

    public withOperations(value: ImmList<OperationId>): ThreadState {
        return this.set('operations', value);
    }

    public withCallStack(value: ImmList<MethodCall>): ThreadState {
        return this.set('callStack', value);
    }

    public withFailedFor(value: ImmSet<Property>): ThreadState {
        return this.set('failedFor', value);
    }

    public withScopeStack(value: ImmList<string>): ThreadState {
        return this.set('scopeStack', value);
    }

    public withIncrementedAtomic(): ThreadState {
        return this.set('inAtomicMode', this.getInAtomicMode() + 1);
    }

    public withDecrementedAtomic(): ThreadState {
        const newValue = this.getInAtomicMode() - 1;
        Preconditions.checkState(newValue >= 0);
        return this.set('inAtomicMode', newValue);
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

    /** Wrapped abstract state that stores the actual data of heap and stack */
    wrappedState: AbstractState;

    /** The threads that have been stepped to get to this state */
    steppedThreadIndices: ImmSet<number>;

    /** Actor scopes */
    actorScopes: ImmMap<DataLocation, ActorId>;

}

const ControlAbstractStateRecord = ImmRec({

    threadStates: ImmList<ThreadState>([]),

    steppedThreadIndices: ImmSet<number>(),

    wrappedState: null,

    actorScopes: ImmMap<DataLocation, ActorId>(),

    isTargetFor: ImmSet<Property>()

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

    constructor(threadStates: ImmList<ThreadState>, wrappedState: AbstractElement, isTargetFor: ImmSet<Property>,
                steppedThreadIndices: ImmSet<number>, actorScopes: ImmMap<DataLocation, ActorId>) {
        super({threadStates: threadStates, wrappedState: wrappedState, isTargetFor: isTargetFor,
            steppedThreadIndices: steppedThreadIndices, actorScopes: actorScopes});
    }

    public getIndexedThreadState(atIndex: number): IndexedThread {
        return new IndexedThread(this.getThreadStates().get(atIndex), atIndex);
    }

    public getThreadStates(): ImmList<ThreadState> {
        return this.get("threadStates");
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
                }

                for (const locId of script.transitions.entryLocationSet) {
                    const loc: RelationLocation = new RelationLocation(actor.ident, script.transitions.ident, locId);
                    threads = threads.push(new ThreadState(threadId, actor.ident, script.id, ImmList(),
                        loc, threadState, ImmSet(), ImmSet(), ImmList(),
                        ImmList([actor.ident]), ImmMap(), 0));
                }
            }
        }

        return new ControlAbstractState(threads, wrappedState, isTarget, ImmSet(), actors);
    }
}

export class ControlAbstractDomain implements AbstractDomain<ControlConcreteState, ControlAbstractState> {

    lattice: Lattice<ControlAbstractState>;

    abstract(elements: Iterable<ControlConcreteState>): ControlAbstractState {
        throw new ImplementMeException();
    }

    concretize(element: ControlAbstractState): Iterable<ControlConcreteState> {
        throw new ImplementMeException();
    }

    widen(element: ControlAbstractState, precision: AbstractionPrecision): ControlAbstractState {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<ControlConcreteState> {
        throw new ImplementMeException();
    }

}
