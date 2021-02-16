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


import {Optional} from "../../../utils/Optional";
import {ConcreteElement, ConcreteUnifiedMemory} from "../../domains/ConcreteElements";
import {List as ImmList, Map as ImmMap, Record as ImmRec, Set as ImmSet} from "immutable";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {ActorId} from "../../../syntax/app/Actor";
import {TransRelId} from "../../../syntax/app/controlflow/TransitionRelation";
import {LocationId} from "../../../syntax/app/controlflow/ControlLocation";
import {ScriptId} from "../../../syntax/app/controlflow/Script";
import {OperationId} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Property} from "../../../syntax/Property";
import {AbstractElement} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";

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

    public withActorId(value: ActorId): RelationLocation {
        return this.set("actor", value);
    }

    public withRelationId(value: TransRelId): RelationLocation {
        return this.set("relation", value);
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

    /** Activated by broadcast from thread */
    activatedByThread: ThreadId;

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
    inAtomicMode: 0,
    activatedByThread: -1
});

export class ThreadState extends ThreadStateRecord implements AbstractElement, ThreadStateAttributes {

    constructor(threadId: ThreadId, actorId: ActorId, scriptId: ScriptId, operations: ImmList<OperationId>,
                location: RelationLocation, compState: ThreadComputationState, waitingForThreads: ImmSet<ThreadId>,
                failedFor: ImmSet<Property>, callStack: ImmList<MethodCall>, loopStack: ImmList<RelationLocation>,
                inAtomicMode: number, activatedByThread: ThreadId) {
        super({threadId: threadId, actorId: actorId, scriptId: scriptId, operations: operations, location: location,
            computationState: compState, waitingForThreads: waitingForThreads, failedFor: failedFor,
            callStack: callStack, loopStack: loopStack, inAtomicMode: inAtomicMode, activatedByThread: activatedByThread});
    }

    public getInAtomicMode(): number {
        return this.get('inAtomicMode');
    }

    public getThreadId(): ThreadId {
        return this.get('threadId');
    }

    public getActivatedByThread(): ThreadId {
        return this.get('activatedByThread');
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

    public withActorId(value: ActorId): ThreadState {
        return this.set('actorId', value);
    }

    public withActivatedByThread(by: ThreadId): ThreadState {
        return this.set('activatedByThread', by);
    }

    public getComputationState(): ThreadComputationState {
        return this.get('computationState');
    }

    public withComputationState(value: ThreadComputationState): ThreadState {
        if (this.getWaitingForThreads().size > 0) {
            Preconditions.checkState(value == ThreadComputationState.THREAD_STATE_WAIT,
                `The computation state has to be WAIT as long it is waiting for threads; clear the list of threads waited for first? (ThreadID: ${this.getThreadId()})`);
        }
        return this.set('computationState', value);
    }

    public getWaitingForThreads(): ImmSet<ThreadId> {
        return this.get('waitingForThreads');
    }

    public getFailedFor(): ImmSet<Property> {
        return this.get('failedFor');
    }

    public withWaitingForThreads(value: ImmSet<ThreadId>): ThreadState {
        if (value.size > 0) {
            Preconditions.checkState(this.getComputationState() == ThreadComputationState.THREAD_STATE_WAIT,
                `Please activate the WAITING-state before assigning a non-empty list of threads to wait for. (Current status: ${this.getComputationState()}, ThreadID: ${this.getThreadId()})`);
        }
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

    private static DUMMY: ThreadState;

    public static freshId(): number {
        if (!ThreadStateFactory.THREAD_ID_SEQ) {
            ThreadStateFactory.THREAD_ID_SEQ = 0;
        }
        return ThreadStateFactory.THREAD_ID_SEQ++;
    }

    public static dummy(): ThreadState {
       if (!ThreadStateFactory.DUMMY) {
           ThreadStateFactory.DUMMY = new ThreadState(-2, "DUMMY", "DUMMY",
               ImmList(), null, ThreadComputationState.THREAD_STATE_UNKNOWN, ImmSet(), ImmSet(), ImmList(), ImmList(), 0, -2);
       }
       return ThreadStateFactory.DUMMY;
    }

}

export interface ConcreteProgramStateAttributes {

    enrichedFrom: Optional<ConcreteUnifiedMemory>;

    globalState: ConcreteUnifiedMemory;

    actorStates: ImmMap<string, ConcreteUnifiedMemory>;

}

const ConcreteProgramStateRecord = ImmRec({

    enrichedFrom: Optional.absent<ConcreteUnifiedMemory>(),
    globalState: null,
    actorStates: null

});

export class ConcreteProgramState extends ConcreteProgramStateRecord implements ConcreteProgramStateAttributes, ConcreteElement {

    constructor(globalState: ConcreteUnifiedMemory, actorStates: ImmMap<string, ConcreteUnifiedMemory>, enrichedFrom?: ConcreteUnifiedMemory) {
        super({globalState: globalState, actorStates: actorStates, enrichedFrom: Optional.of(enrichedFrom)});
    }

    public getActorMemory(actor: string): ConcreteUnifiedMemory {
        return this.actorStates.get(actor);
    }

    public getActors(): Iterable<string> {
        return this.actorStates.keys();
    }

    public getEnrichedFrom(): Optional<ConcreteUnifiedMemory> {
        return this.enrichedFrom;
    }
}

export function asUnifiedMemory(c: ConcreteElement): ConcreteUnifiedMemory {
    if (c instanceof ConcreteProgramState) {
        return c.getEnrichedFrom().getValue();
    } else if (c instanceof ConcreteUnifiedMemory) {
        return c as ConcreteUnifiedMemory;
    } else {
        throw new IllegalArgumentException();
    }
}
