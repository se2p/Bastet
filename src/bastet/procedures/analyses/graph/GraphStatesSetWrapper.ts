/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net),
 *   see the file CONTRIBUTORS.md for the list of contributors.
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


import {ChooseOpConfig, StateSet} from "../../algorithms/StateSet";
import {GraphAbstractState} from "./GraphAbstractDomain";
import {AbstractElement} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";

export abstract class DelegatingStateSetWrapper<E extends AbstractElement> implements StateSet<E> {

    protected readonly _wrappedReached: StateSet<E>;

    constructor(wrappedReached: StateSet<E>) {
        this._wrappedReached = Preconditions.checkNotUndefined(wrappedReached);
    }

    [Symbol.iterator](): IterableIterator<E> {
        return this._wrappedReached[Symbol.iterator]();
    }

    add(element: E) {
        return this._wrappedReached.add(element);
    }

    addAll(elements: Iterable<E>) {
        return this._wrappedReached.addAll(elements);
    }

    addRootSates(elements: Iterable<E>) {
        return this._wrappedReached.addRootSates(elements);
    }

    createChooseOp(config: ChooseOpConfig) {
        return this._wrappedReached.createChooseOp(config);
    }

    getAddedLast(): E[] {
        return this._wrappedReached.getAddedLast();
    }

    getRootStates(): Set<E> {
        return this._wrappedReached.getRootStates();
    }

    getStateSet(inPartitionOf: E): StateSet<E> {
        return this._wrappedReached.getStateSet(inPartitionOf);
    }

    isEmpty(): boolean {
        return this._wrappedReached.isEmpty();
    }

    isRootState(element: E): boolean {
        return this._wrappedReached.isRootState(element);
    }

    remove(element: E) {
        return this._wrappedReached.remove(element);
    }

    removeAll(elements: Iterable<E>) {
        return this._wrappedReached.removeAll(elements);
    }

}

export class GraphReachedSetWrapper<E extends GraphAbstractState> extends DelegatingStateSetWrapper<E> {

    private readonly _frontierSet: StateSet<E>;

    constructor(wrappedReached: StateSet<E>, frontierSet: StateSet<E>) {
        super(wrappedReached);
        this._frontierSet = Preconditions.checkNotUndefined(frontierSet);
    }

    add(element: E): any {
        return super.add(element);
    }

    remove(element: E): any {
        return super.remove(element);
    }

}


