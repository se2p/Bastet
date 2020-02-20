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

import {AbstractElement} from "../../lattices/Lattice";

export class ChooseOpConfig {

}

export interface ChooseOperator<E extends AbstractElement> {

    choose(): E;

}

export class ChooseLastOperator<E extends AbstractElement> implements ChooseOperator<E> {

    choose(): E {
        return undefined;
    }

}

export interface StateSet<E extends AbstractElement> {

    isEmpty(): boolean;

    getStateSet(inPartitionOf: E): StateSet<E>;

    [Symbol.iterator](): IterableIterator<E>;

    remove(element: E);

    add(element: E);

    createChooseOp(config: ChooseOpConfig);

    getAddedLast(): E[];

    removeAll(elements: Iterable<E>);

    addAll(elements: Iterable<E>);

    isRootState(element: E): boolean;

    addRootSates(elements: Iterable<E>);

    getRootStates(): Set<E>;

    getSize(): number;
}

export abstract class AbstractStateSet<E extends AbstractElement> {

    abstract isEmpty(): boolean;

    abstract getStateSet(inPartitionOf: E): StateSet<E>;

    abstract [Symbol.iterator](): IterableIterator<E>;

    abstract remove(element: E);

    removeAll(elements: Iterable<E>) {
        for (let e of elements){
            this.remove(e);
        }
    }

    abstract isRootState(element: E): boolean;

    abstract addRootSates(elements: Iterable<E>);

    abstract getRootStates(): Set<E>;

    addAll(elements: Iterable<E>) {
        for (let e of elements){
            this.add(e);
        }
    }

    abstract add(element: E);

    abstract createChooseOp(config: ChooseOpConfig);

    abstract getAddedLast(): E[];

    abstract getSize(): number;

}

/**
 * Ordered by insertion time.
 */
export class OrderedStateSet<E extends AbstractElement> extends AbstractStateSet<E> {

    private _states: Set<E>;

    private _root: Set<E>;

    private _addedLast: E[];

    constructor() {
        super();
        this._states = new Set();
        this._root = new Set();
        this._addedLast = [];
    }

    [Symbol.iterator](): IterableIterator<E> {
        return this._states[Symbol.iterator]();
    }

    addRootSates(elements: Iterable<E>) {
        this._root = new Set(elements);
        this.addAll(elements);
    }

    isRootState(element: E): boolean {
        return this._root.has(element);
    }

    getRootStates(): Set<E> {
        return this._root;
    }

    add(element: E) {
        this._states.add(element);
        this._addedLast = [element];
    }

    getStateSet(inPartitionOf: E): StateSet<E> {
        return this;
    }

    getAddedLast(): E[] {
        return this._addedLast;
    }

    isEmpty(): boolean {
        return this._states.size == 0;
    }

    remove(element: E) {
        this._states.delete(element);
    }

    public createChooseOp(config: ChooseOpConfig): ChooseOperator<E> {
        const outer = this;
        return new class implements ChooseOperator<E> {
            choose(): E {
                return outer._states.values().next().value as E;
            }
        }
    }

    getSize(): number {
        return this._states.size;
    }
}

export class StateSetFactory {

    public static createStateSet<E extends AbstractElement>(): StateSet<E> {
        return new OrderedStateSet();
    }

}
