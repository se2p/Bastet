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

import {GraphAbstractState} from "./GraphAbstractDomain";
import {List as ImmList, Set as ImmSet} from "immutable"
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {GraphReachedSetWrapper} from "./GraphStatesSetWrapper";
import {Preconditions} from "../../../utils/Preconditions";
import {getTheOnlyElement} from "../../../utils/Collections";

export interface GraphPathSet {

    paths(): Iterable<GraphPath>;

    entryStates: Iterable<GraphAbstractState>;

    exitStates: Iterable<GraphAbstractState>;

}

export class GraphPath implements GraphPathSet {

    private readonly _states: ImmList<GraphAbstractState>;

    constructor(states: Iterable<GraphAbstractState>) {
        this._states = ImmList(states);
    }

    get states(): Iterable<GraphAbstractState> {
        return this._states;
    }

    get entryStates(): Iterable<GraphAbstractState> {
        if (this._states.size > 0) {
            return [ this._states.get(0) ];
        } else {
            return [];
        }
    }

    get exitStates(): Iterable<GraphAbstractState> {
        if (this._states.size > 0) {
            return [ this._states.get(this._states.size-1) ];
        } else {
            return [];
        }
    }

    get exitState(): GraphAbstractState {
        Preconditions.checkState(this._states.size > 0);
        return getTheOnlyElement(this.exitStates);
    }

    get entryState(): GraphAbstractState {
        Preconditions.checkState(this._states.size > 0);
        return getTheOnlyElement(this.entryStates);
    }

    paths(): Iterable<GraphPath> {
        return [this];
    }

}

export class ImplicitGraphPathSet implements GraphPathSet {

    /**
     * The graph path set describes a subset of paths from those
     * found in the graph described by `_in`.
     */
    private readonly _in: GraphReachedSetWrapper<GraphAbstractState>;

    /**
     * Set of states that enter the graph path set.
     */
    private readonly _entryStates: ImmSet<GraphAbstractState>;

    /**
     * Set of states from that the graph path set can be left (or which are terminating states).
     */
    private readonly _exitStates: ImmSet<GraphAbstractState>;

    /**
     * Set of states that are considered to be on paths in the set.
     */
    private readonly _states: ImmSet<GraphAbstractState>;

    constructor(inSet: GraphReachedSetWrapper<GraphAbstractState>, entryStates: ImmSet<GraphAbstractState>,
                exitStates: ImmSet<GraphAbstractState>, onPathsStates: ImmSet<GraphAbstractState>) {
        this._in = Preconditions.checkNotUndefined(inSet);
        this._entryStates = Preconditions.checkNotUndefined(entryStates);
        this._exitStates = Preconditions.checkNotUndefined(exitStates);
        this._states = Preconditions.checkNotUndefined(onPathsStates);
    }

    /**
     * Set of paths that are defined in by the set (elements of the set).
     */
    public paths(): Iterable<GraphPath> {
        throw new ImplementMeException();
    }

    get entryStates(): Iterable<GraphAbstractState> {
        return this._entryStates;
    }

    get exitStates(): Iterable<GraphAbstractState> {
        return this._exitStates;
    }

}

export class LabeledTransition<L> {

    private readonly _concurrentLabels: ImmList<L>;

    private readonly _succState: GraphAbstractState;

    constructor(concurrentLabels: Iterable<L>, succState: GraphAbstractState) {
        this._concurrentLabels = ImmList(concurrentLabels);
        this._succState = Preconditions.checkNotUndefined(succState);
    }

    get concurrentLabels(): Iterable<L> {
        return this._concurrentLabels;
    }

    get succState(): GraphAbstractState {
        return this._succState;
    }

}

export interface LabeledGraphPathSet extends GraphPathSet {


}

export class LabeledGraphPath<L> extends GraphPath implements LabeledGraphPathSet {

    constructor(states: Iterable<GraphAbstractState>) {
        super(states);
    }

}

export class LabeledImplicitGraphPahtSet<L> extends ImplicitGraphPathSet implements LabeledGraphPathSet {

    constructor(inSet: GraphReachedSetWrapper<GraphAbstractState>, entryStates: ImmSet<GraphAbstractState>,
                exitStates: ImmSet<GraphAbstractState>, onPathsStates: ImmSet<GraphAbstractState>) {
        super(inSet, entryStates, exitStates, onPathsStates);
    }

}