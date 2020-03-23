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
import {AbstractStateVisitor} from "../analyses/AbstractStates";
import {Preconditions} from "../../utils/Preconditions";

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

export interface PartitionVisitor extends AbstractStateVisitor<PartitionKeyElement[]> {

}

export interface StatePartitionOperator<E extends AbstractElement> {

    getPartitionKey(element: E): PartitionKeyElement[];

}

export class NoPartitioningOperator<E extends AbstractElement> implements StatePartitionOperator<E> {

    getPartitionKey(element: E): PartitionKeyElement[] {
        return [];
    }

}

export class PartitionedOrderedSet<E extends AbstractElement> {

    private _childs: Map<PartitionKeyElement, PartitionedOrderedSet<E>>;

    private _elements: Set<E>;

    private _size: number;

    private _keyOperator: StatePartitionOperator<E>;

    constructor(partitionOperator: StatePartitionOperator<E>) {
        this._keyOperator = Preconditions.checkNotUndefined(partitionOperator);
        this._size = 0;
        this._elements = new Set<E>();
        this._childs = new Map<PartitionKeyElement, PartitionedOrderedSet<E>>();
    }

    private getPartitionKey(element: E): PartitionKeyElement[] {
        return this._keyOperator.getPartitionKey(element);
    }

    public getPartitionOf(element: E): PartitionedOrderedSet<E> {
        const key: PartitionKeyElement[] = this.getPartitionKey(element).slice();
        return this.getPartition(key);
    }

    private getChildPartition(key: PartitionKeyElement): PartitionedOrderedSet<E> {
        let result = this._childs.get(key);
        if (!result) {
            result = new PartitionedOrderedSet(this._keyOperator);
            this._childs.set(key, result);
        }

        return result;
    }

    public removeFrom(element: E, from: PartitionKeyElement[]) {
        if (from.length > 0) {
            this.getChildPartition(from[0]).removeFrom(element, from.slice(1, from.length));
        }

        if (this._elements.delete(element)) {
            this._size--;
        }
    }

    public remove(element: E) {
        const partitionKey = this.getPartitionKey(element);
        this.removeFrom(element, partitionKey);
    }

    private addElementTo(element: E, to: PartitionKeyElement[]) {
        if (to.length > 0) {
            this.getChildPartition(to[0]).addElementTo(element, to.slice(1, to.length));
        }

        this._elements.add(element);
        this._size++;
    }

    public add(element: E) {
        const partitionKey = this.getPartitionKey(element);
        this.addElementTo(element, partitionKey);
    }

    public getPartition(key: PartitionKeyElement[]): PartitionedOrderedSet<E> {
        if (key.length == 0) {
            return this;
        }

        const elementKey = key[0];
        let elementPartition = this.getChildPartition(elementKey);

        const subpart = key.slice(1, key.length);
        return elementPartition.getPartition(subpart);
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

