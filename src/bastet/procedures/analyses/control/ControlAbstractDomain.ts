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
import {AbstractElement, Lattice} from "../../../lattices/Lattice";
import {List as ImmList, Record as ImmRec, Set as ImmSet} from "immutable";
import {ActorId} from "../../../syntax/app/Actor";
import {LocationId} from "../../../syntax/app/controlflow/ControlLocation";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ConcreteDomain} from "../../domains/ConcreteElements";
import {App} from "../../../syntax/app/App";
import {BootstrapEvent} from "../../../syntax/ast/core/CoreEvent";
import {Property} from "../../../syntax/Property";
import {TransRelId} from "../../../syntax/app/controlflow/TransitionRelation";
import {ScriptId} from "../../../syntax/app/controlflow/Script";
import {OperationId, ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";

export const THREAD_STATE_RUNNING = 1;
export const THREAD_STATE_RUNNING_ATOMIC = 2;
export const THREAD_STATE_WAIT = 3;
export const THREAD_STATE_DONE = 4;
export const THREAD_STATE_YIELD = 5;
export const THREAD_STATE_FAILURE = 6;
export const THREAD_STATE_UNKNOWN = 0;

export type ThreadComputationState = number;

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

}

const ThreadStateRecord = ImmRec({
    threadId: -1,
    scriptId: -1,
    actorId: "",
    operations: ImmList<OperationId>(),
    location: new RelationLocation("", 0, 0),
    computationState: THREAD_STATE_UNKNOWN,
    waitingForThreads: ImmSet<ThreadId>(),
    failedFor: ImmSet<Property>(),
    callStack: ImmList<MethodCall>(),
    scopeStack: ImmList<string>()
});

export class ThreadState extends ThreadStateRecord implements AbstractElement, ThreadStateAttributes {

    constructor(threadId: ThreadId, actorId: ActorId, scriptId: ScriptId, operations: ImmList<OperationId>,
                location: RelationLocation, compState: ThreadComputationState, waitingForThreads: ImmSet<ThreadId>,
                failedFor: ImmSet<Property>, callStack: ImmList<MethodCall>, scopeStack: ImmList<string>) {
        super({threadId: threadId, actorId: actorId, scriptId: scriptId, operations: operations, location: location,
            computationState: compState, waitingForThreads: waitingForThreads,
            failedFor: failedFor, callStack: callStack, scopeStack: scopeStack});
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
    wrappedState: AbstractElement;

    /** The threads that have been stepped to get to this state */
    steppedThreadIndices: ImmSet<number>;

}

const ControlAbstractStateRecord = ImmRec({

    threadStates: ImmList<ThreadState>([]),

    steppedThreadIndices: ImmSet<number>(),

    wrappedState: null,

    isTargetFor: ImmSet<Property>()

});

/**
 * A state with SHARED MEMORY
 */
export class ControlAbstractState extends ControlAbstractStateRecord implements AbstractElement {

    constructor(threadStates: ImmList<ThreadState>, wrappedState: AbstractElement, isTargetFor: ImmSet<Property>,
                steppedThreadIndices: ImmSet<number>) {
        super({threadStates: threadStates, wrappedState: wrappedState, isTargetFor: isTargetFor,
            steppedThreadIndices: steppedThreadIndices});
    }

    public getThreadStates(): ImmList<ThreadState> {
        return this.get("threadStates");
    }

    public getWrappedState(): AbstractElement {
        return this.get("wrappedState");
    }

    public getIsTargetFor(): ImmSet<Property> {
        return this.get("isTargetFor");
    }

    public getSteppedFor(): ImmSet<number> {
        return this.get("steppedThreadIndices");
    }
}

export class ScheduleAbstractStateFactory {

    static createInitialState(task: App, wrappedState: ImmRec<any>, isTarget) {
        let threads = ImmList<ThreadState>([]);
        for (const actor of task.actors) {
            for (const script of actor.scripts) {
                const threadId = ThreadStateFactory.freshId();
                let threadState = THREAD_STATE_WAIT;
                if (script.event === BootstrapEvent.instance()) {
                    threadState = THREAD_STATE_RUNNING;
                }
                for (const locId of script.transitions.entryLocationSet) {
                    const loc: RelationLocation = new RelationLocation(actor.ident, script.transitions.ident, locId);
                    threads = threads.push(new ThreadState(threadId, actor.ident, script.id, ImmList(), loc,
                        threadState, ImmSet(), ImmSet(), ImmList(), ImmList([actor.ident])));
                }
            }
        }

        return new ControlAbstractState(threads, wrappedState, isTarget, ImmSet());
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
