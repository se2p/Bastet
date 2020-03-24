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

import {AbstractElement, AbstractState} from "../../lattices/Lattice";
import {Preconditions} from "../../utils/Preconditions";
import {List as ImmList, Record as ImmRec, Set as ImmSet, Map as ImmMap} from "immutable";
import {getTheOnlyElement} from "../../utils/Collections";

export interface PartitionKeyAttribs extends AbstractElement {

    key: ImmList<any>;

}

const PartitionKeyRecord = ImmRec({
    key: ImmList()
});

export class PartitionKey extends PartitionKeyRecord implements PartitionKeyAttribs {

    constructor(partitionKey: ImmList<any>) {
        super({key: partitionKey});
    }

    public getKey(): ImmList<any> {
        return this.get('key');
    }

    public concat(other: PartitionKey): PartitionKey {
        return this.set('key', this.getKey().concat(other.getKey()));
    }

}

export interface StateSet<E extends AbstractElement> {

    isEmpty(): boolean;

    [Symbol.iterator](): IterableIterator<E>;

    remove(element: E);

    add(element: E);

    removeAll(elements: Iterable<E>);

    addAll(elements: Iterable<E>);

    getSize(): number;
}

export interface ReachedSet<E extends AbstractElement> extends StateSet<E> {

    isRootState(element: E): boolean;

    addRootSates(elements: Iterable<E>);

    getRootStates(): Set<E>;

    getStateSet(inPartitionOf: E): Iterable<E>;

    getAddedLast(): E[];

}

export interface FrontierSet<E extends AbstractElement> extends StateSet<E> {

    pop(): E;

}

export abstract class AbstractAnalysisStateSet<E extends AbstractElement> {

    abstract isEmpty(): boolean;

    abstract getStateSet(inPartitionOf: E): Iterable<E>;

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

    abstract getAddedLast(): E[];

    abstract getSize(): number;

}

export type PartitionKeyElement = string|number|boolean;

export interface StatePartitionOperator<E extends AbstractElement> {

    getPartitionKeys(element: E): ImmSet<PartitionKey>;

}

export class NoPartitioningOperator<E extends AbstractElement> implements StatePartitionOperator<E> {

    getPartitionKeys(element: E): ImmSet<PartitionKey> {
        return ImmSet([new PartitionKey(ImmList())]);
    }

}

export class PartitionedOrderedSet<E extends AbstractElement> {

    private _size: number;

    private _keyOperator: StatePartitionOperator<E>;

    private _elements: Set<E>;

    private _partitions: ImmMap<PartitionKey, Set<E>>;

    constructor(partitionOperator: StatePartitionOperator<E>) {
        this._keyOperator = Preconditions.checkNotUndefined(partitionOperator);
        this._size = 0;
        this._elements = new Set<E>();
        this._partitions = ImmMap<PartitionKey, Set<E>>().asMutable();
    }

    private getPartitionKey(element: E): PartitionKey {
        return getTheOnlyElement(this._keyOperator.getPartitionKeys(element));
    }

    public getPartitionOf(element: E): Set<E> {
        const key: PartitionKey = this.getPartitionKey(element);
        return this.getPartition(key);
    }

    private getPartition(key: PartitionKey): Set<E> {
        let result = this._partitions.get(key);
        if (!result) {
            result = new Set();
            this._partitions.set(key, result);
        }

        return result;
    }

    public remove(element: E) {
        const partitionKey = this.getPartitionKey(element);

        this.getPartition(partitionKey).delete(element);
        if (this._elements.delete(element)) {
            this._size--;
        }
    }

    public add(element: E) {
        const partitionKey = this.getPartitionKey(element);
        this.getPartition(partitionKey).add(element);

        this._elements.add(element);
        this._size++;
    }

    public isEmpty(): boolean {
        return this._size == 0;
    }

    get size(): number {
        return this._size;
    }

    public [Symbol.iterator](): IterableIterator<E> {
        return this._elements[Symbol.iterator]();
    }
}

export class DefaultFrontierSet<E extends AbstractElement> implements FrontierSet<E> {

    private readonly _elements: Set<E>;

    constructor() {
        this._elements = new Set();
    }

    public [Symbol.iterator](): IterableIterator<E> {
        return this._elements[Symbol.iterator]();
    }

    add(element: E) {
        return this._elements.add(element);
    }

    addAll(elements: Iterable<E>) {
        for (const e of elements) {
            this.add(e);
        }
    }

    getSize(): number {
        return this._elements.size;
    }

    isEmpty(): boolean {
        return this._elements.size == 0;
    }

    pop(): E {
        for (const e of this._elements) {
            return e;
        }

        return null;
    }

    remove(element: E) {
        this._elements.delete(element);
    }

    removeAll(elements: Iterable<E>) {
        for (const e of elements) {
            this.remove(e);
        }
    }

}

/**
 * Ordered by insertion time.
 */
export class DefaultAnalysisStateSet<E extends AbstractElement> extends AbstractAnalysisStateSet<E> {

    private _states: PartitionedOrderedSet<E>;

    private _root: Set<E>;

    private _addedLast: E[];

    constructor(partitionOp: StatePartitionOperator<E>) {
        super();
        this._states = new PartitionedOrderedSet(partitionOp);
        this._root = new Set();
        this._addedLast = [];
    }

    [Symbol.iterator](): IterableIterator<E> {
        return this._states[Symbol.iterator]();
    }

    public addRootSates(elements: Iterable<E>) {
        this._root = new Set(elements);
        this.addAll(elements);
    }

    public isRootState(element: E): boolean {
        return this._root.has(element);
    }

    public getRootStates(): Set<E> {
        return this._root;
    }

    public add(element: E) {
        this._states.add(element);
        this._addedLast = [element];
    }

    public getStateSet(inPartitionOf: E): Iterable<E> {
        return this._states.getPartitionOf(inPartitionOf);
    }

    public getAddedLast(): E[] {
        return this._addedLast;
    }

    public isEmpty(): boolean {
        return this._states.size == 0;
    }

    public remove(element: E) {
        this._addedLast = this._addedLast.filter((e) => e != element);
        this._states.remove(element);
    }

    public getSize(): number {
        return this._states.size;
    }
}

