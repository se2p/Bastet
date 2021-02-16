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

import {SingletonStateWrapper} from "../AbstractStates";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {AbstractElement, AbstractElementVisitor, AbstractState, Lattice} from "../../../lattices/Lattice";
import {List as ImmList, Map as ImmMap, Record as ImmRec, Set as ImmSet} from "immutable";
import {ActorId} from "../../../syntax/app/Actor";
import {LocationId} from "../../../syntax/app/controlflow/ControlLocation";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {
    ConcreteDomain,
    ConcreteElement,
    ConcreteUnifiedMemory
} from '../../domains/ConcreteElements'
import {App} from "../../../syntax/app/App";
import {AfterStatementMonitoringEvent, SingularityEvent, TerminationEvent} from "../../../syntax/ast/core/CoreEvent";
import {Property} from "../../../syntax/Property";
import {Preconditions} from "../../../utils/Preconditions";
import {
    DataLocation,
    DataLocations,
    VAR_SCOPING_SPLITTER
} from "../../../syntax/app/controlflow/DataLocation";
import {ActorType} from "../../../syntax/ast/core/ScratchType";
import {Identifier} from "../../../syntax/ast/core/Identifier";
import {AbstractionPrecision} from "../../AbstractionPrecision";
import {DataLocationScoper} from "./DataLocationScoping";
import {
    ConcreteProgramState,
    RelationLocation,
    ThreadComputationState,
    ThreadId,
    ThreadState,
    ThreadStateFactory
} from "./ConcreteProgramState";


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

    /**
     * Threads that are not observers, which been stepped to get to this state;
     * observer threads might have been stepped meanwhile.
     */
    lastSteppedNonObserverThreadIndices: ImmSet<number>;

    /** Actor scopes */
    actorScopes: ImmMap<DataLocation, ActorId>;

}

const ControlAbstractStateRecord = ImmRec({

    threadStates: ImmList<ThreadState>([]),

    conditionStates: ImmList<ThreadState>([]),

    steppedThreadIndices: ImmSet<number>(),

    lastSteppedNonObserverThreadIndices: ImmSet<number>(),

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
                steppedThreadIndices: ImmSet<number>, lastSteppedNonObserverThreadIndices: ImmSet<number>,
                actorScopes: ImmMap<DataLocation, ActorId>) {
        super({threadStates: threadStates, conditionStates: conditionStates, wrappedState: wrappedState,
            isTargetFor: isTargetFor,
            steppedThreadIndices: steppedThreadIndices, lastSteppedNonObserverThreadIndices: lastSteppedNonObserverThreadIndices,
            actorScopes: actorScopes});
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

    public getLastSteppedNonObserverThreadIndices(): ImmSet<number> {
        return this.get("lastSteppedNonObserverThreadIndices");
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

    public withLastSteppedNonObserverThreadIndices(indices: Iterable<number>): ControlAbstractState {
        return this.set("lastSteppedNonObserverThreadIndices", ImmSet(indices));
    }

    public withIsTargetFor(targetFor: Iterable<Property>): ControlAbstractState {
        return this.set('isTargetFor', ImmSet(targetFor));
    }

    public withThreadState(threadIndex: number, setStateTo: ThreadState): ControlAbstractState {
       return this.set('threadStates', this.getThreadStates().set(threadIndex, setStateTo));
    }

    public withThreadStates(threadList: ImmList<ThreadState>): ControlAbstractState {
        return this.set('threadStates', threadList);
    }

    public withAddedConditionState(threadState: ThreadState): ControlAbstractState {
        return this.set('conditionStates', this.getConditionStates().push(threadState));
    }

    public withConditionState(threadIndex: number, setStateTo: ThreadState): ControlAbstractState {
        return this.set('conditionStates', this.getConditionStates().set(threadIndex, setStateTo));
    }

    public withConditionStates(threadStateList: ImmList<ThreadState>): ControlAbstractState {
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
                let threadState = ThreadComputationState.THREAD_STATE_DONE; // Also scripts that have not yet been triggered

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
                        loc, threadState, ImmSet(), ImmSet(), ImmList(), ImmList(), 0, -1));
                }
            }
        }

        return new ControlAbstractState(threads, conditions, wrappedState, isTarget, ImmSet(), ImmSet(), actors);
    }
}

export class ControlLattice implements Lattice<ControlAbstractState> {

    private readonly _wrapped: Lattice<AbstractElement>;

    private readonly _bottom: ControlAbstractState;

    constructor(wrapped: Lattice<AbstractElement>) {
        this._wrapped = Preconditions.checkNotUndefined(wrapped);
        this._bottom = new ControlAbstractState(ImmList(), ImmList(), this._wrapped.bottom(), ImmSet(), ImmSet(), ImmSet(), ImmMap());
    }

    bottom(): ControlAbstractState {
        return this._bottom;
    }

    isIncluded(element1: ControlAbstractState, element2: ControlAbstractState): boolean {
        if (element2 === this._bottom) {
            return this._wrapped.isIncluded(element1.getWrappedState(), element2.getWrappedState());
        }

        throw new ImplementMeException();
    }

    join(element1: ControlAbstractState, element2: ControlAbstractState): ControlAbstractState {
        if (!element1.getThreadStates().equals(element2.getThreadStates())) {
            return this.top();
        }

        if (!element1.getActorScopes().equals(element2.getActorScopes())) {
            return this.top();
        }

        // Removed the following to improve performance:
        //  Preconditions.checkArgument(element1.getSteppedFor().equals(element2.getSteppedFor()));

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

export class ControlAbstractDomain implements AbstractDomain<ConcreteProgramState, ControlAbstractState> {

    private readonly _lattice: Lattice<ControlAbstractState>;

    private readonly _wrapped: AbstractDomain<ConcreteElement, AbstractElement>;

    constructor(wrapped: AbstractDomain<ConcreteElement, AbstractElement>) {
        this._wrapped = Preconditions.checkNotUndefined(wrapped);
        this._lattice = new ControlLattice(wrapped.lattice);
    }

    abstract(elements: Iterable<ConcreteProgramState>): ControlAbstractState {
        throw new ImplementMeException();
    }

    concretize(element: ControlAbstractState): Iterable<ConcreteProgramState> {
        throw new ImplementMeException();
    }

    concretizeOne(element: ControlAbstractState): ConcreteProgramState {
        return this.enrich(this._wrapped.concretizeOne(element.getWrappedState()));
    }

    enrich(element: ConcreteElement): ConcreteProgramState {
        Preconditions.checkArgument(element instanceof ConcreteUnifiedMemory);
        const m = element as ConcreteUnifiedMemory;

        const splitTargetPrefixFromAttribute = (attributeWithTargetName: string): {attribute: string, target: string} => {
            const target = DataLocationScoper.leftUnwrapScope(attributeWithTargetName).prefix;
            const attribute = DataLocationScoper.rightUnwrapScope(attributeWithTargetName).suffix;
            return {attribute, target};
        }

        const toProgramState = (c: ConcreteUnifiedMemory): ConcreteProgramState => {
            const actorStates: Map<string, ConcreteUnifiedMemory> = new Map();
            let globalState: ConcreteUnifiedMemory = new ConcreteUnifiedMemory(ImmMap());

            for (const k of c.variables()) {
                const value = c.getValue(k);
                if (k.includes(VAR_SCOPING_SPLITTER)) {
                    const split = splitTargetPrefixFromAttribute(k);
                    const actorMem = actorStates.get(split.target) || new ConcreteUnifiedMemory(ImmMap());
                    actorStates.set(split.target, actorMem.withValue(split.attribute, value));
                } else {
                    globalState = globalState.withValue(k, value);
                }
            }

            return new ConcreteProgramState(globalState, ImmMap(actorStates), m);
        };

        return toProgramState(m);
    }

    widen(element: ControlAbstractState, precision: AbstractionPrecision): ControlAbstractState {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<ConcreteProgramState> {
        throw new ImplementMeException();
    }

    get lattice(): Lattice<ControlAbstractState> {
        return this._lattice;
    }

    composeSeq(e1: ControlAbstractState, e2: ControlAbstractState): ControlAbstractState {
        throw new ImplementMeException();
    }

}
