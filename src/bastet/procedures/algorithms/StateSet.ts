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

import {AbstractElement} from "../../lattices/Lattice";
import {Preconditions} from "../../utils/Preconditions";
import {List as ImmList, Map as ImmMap, OrderedSet, Record as ImmRec, Set as ImmSet} from "immutable";
import {getTheOnlyElement} from "../../utils/Collections";
import {Heap} from 'heap-js';
import {LexiKey} from "../../utils/Lexicographic";
import {IllegalStateException} from "../../core/exceptions/IllegalStateException";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {StateReferenceOperator} from "../analyses/ProgramAnalysis";

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

    has(element: E): boolean
}

export interface ReachedSet<E extends AbstractElement> extends StateSet<E> {

    isRootState(element: E): boolean;

    addRootSates(elements: Iterable<E>);

    getRootStates(): Set<E>;

    getStateSet(inPartitionOf: E): Iterable<E>;

    getAddedLast(): E[];

}

export interface FrontierSet<E extends AbstractElement> extends StateSet<E> {

    peek(): E;

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

    /**
     * Get the set of partitions (their identifiers) into that a given element
     * should be mapped (the term partition is misused here since
     * since partitions are actually disjoint sets).
     *
     * @param element
     */
    getPartitionKeys(element: E): ImmSet<PartitionKey>;

}

export type SinglePartitionKeyFunction<E extends AbstractElement> = (E) => LexiKey;

export type StateOrderingFunction<E extends AbstractElement> = (a: E, b: E) => number;

export interface SingleStatePartitionOperator<E extends AbstractElement> {

    getPartitionKey(element: E): LexiKey;

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
        Preconditions.checkNotUndefined(key);
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

    public has(element: E): boolean {
        return this._elements.has(element);
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

export class DifferencingFrontierSet<E extends AbstractElement> implements FrontierSet<E> {

    private _size: number;

    private _diffKeyOperator: SinglePartitionKeyFunction<E>;

    private _elements: Set<E>;

    private _partitions: ImmMap<LexiKey, PriorityFrontierSet<E>>;

    private readonly _nextPartitions: Heap<LexiKey>;

    private readonly _intraPartitionComparator: StateOrderingFunction<E>;

    private readonly _refCountOperator: StateReferenceOperator<E>;

    private _lastPartitionIndex: number;

    constructor(diffKeyOperator: SinglePartitionKeyFunction<E>, 
                intraPartitionComparator: StateOrderingFunction<E>,
                refCountOperator: StateReferenceOperator<E>) {
        this._diffKeyOperator = Preconditions.checkNotUndefined(diffKeyOperator);
        this._intraPartitionComparator = Preconditions.checkNotUndefined(intraPartitionComparator);
        this._refCountOperator = Preconditions.checkNotUndefined(refCountOperator);
        this._size = 0;
        this._elements = new Set<E>();
        this._partitions = ImmMap<LexiKey, PriorityFrontierSet<E>>().asMutable();
        this._lastPartitionIndex = 0;
        this._nextPartitions = new Heap<LexiKey>((l1, l2) => this.compareKeys(l1, l2));
    }

    private compareKeys(l1: LexiKey, l2: LexiKey): number {
       Preconditions.checkNotUndefined(l1);
       Preconditions.checkNotUndefined(l2);
       return l1.compareTo(l2);
    }

    private getPartitionKey(element: E): LexiKey {
        return this._diffKeyOperator(element);
    }

    public getPartitionOf(element: E): PriorityFrontierSet<E> {
        const key: LexiKey = this.getPartitionKey(element);
        return this.getPartition(key);
    }

    private getPartition(key: LexiKey): PriorityFrontierSet<E> {
        let result = this._partitions.get(key);
        if (!result) {
            result = new PriorityFrontierSet(this._intraPartitionComparator);
            this._partitions.set(key, result);
        }

        return result;
    }

    public remove(element: E) {
        const partitionKey = this.getPartitionKey(element);

        this.getPartition(partitionKey).remove(element);
        if (this._elements.delete(element)) {
            this._refCountOperator.decRef(element);
            this._size--;
        }

        this.activateNextPeekPartition();
    }

    public add(element: E) {
        this._refCountOperator.incRef(element);
        const partitionKey = this.getPartitionKey(element);
        this.getPartition(partitionKey).add(element);

        this._elements.add(element);
        this._size++;
    }

    public has(element: E): boolean {
        return this._elements.has(element);
    }

    public isEmpty(): boolean {
        return this._size == 0;
    }

    get size(): number {
        return this._size;
    }

    private hasElements(partition: LexiKey) {
        const p = this._partitions.get(partition);
        if (p == null) {
            return false;
        } else {
            return p.getSize() > 0;
        }
    }

    /**
     * Choose the next non-empty partition to peek (or pop) elements in/from.
     * Goal: Choose in a round-robin-fashion from the different partitions.
     */
    private activateNextPeekPartition(): boolean {
        // Activate the next partition
        if (!this._nextPartitions.isEmpty()) {
            // ... by removing the current from the heap
            this._nextPartitions.pop();
        }

        if (this._nextPartitions.isEmpty()) {
            this._nextPartitions.addAll(this._partitions.keySeq().toArray());
        }

        while (!this._nextPartitions.isEmpty() && !this.hasElements(this._nextPartitions.peek())) {
            this._nextPartitions.pop();
        }

        if (!this.isEmpty() && this._nextPartitions.isEmpty()) {
            return this.activateNextPeekPartition();
        }

        Preconditions.checkState(this.isEmpty() || !this._nextPartitions.isEmpty());

        return !this._nextPartitions.isEmpty();
    }

    peek(): E {
        if (this.isEmpty()) {
            throw new IllegalStateException("No elements to peek");
        }

        if (this._nextPartitions.isEmpty()) {
            this.activateNextPeekPartition();
        }

        const peekPartition: LexiKey = this._nextPartitions.peek();
        Preconditions.checkNotUndefined(peekPartition);

        const partition = this._partitions.get(peekPartition);
        return partition.peek();
    }

    pop(): E {
        const result = this.peek();
        this.remove(result);
        return result
    }

    removeAll(elements: Iterable<E>) {
        for (const e of elements) {
            this.remove(e);
        }
    }

    addAll(elements: Iterable<E>) {
        for (const e of elements) {
            this.add(e);
        }
    }

    getSize(): number {
        return this.size;
    }

    public [Symbol.iterator](): IterableIterator<E> {
        return this._elements[Symbol.iterator]();
    }

}

export const CHOOSE_EITHER: number = 0;
export const CHOOSE_SECOND: number = +1;
export const CHOOSE_FIRST: number = -1;

export interface StateOrderComparator<E extends AbstractElement> {

    compareStateOrder(a: E, b: E): number;

}

export class PriorityFrontierSet<E extends AbstractElement> implements FrontierSet<E> {

    private readonly _elements: Heap<E>;

    constructor(comparator: StateOrderingFunction<E>) {
        this._elements = new Heap((a, b) => {return comparator(a, b)});
    }

    public [Symbol.iterator](): IterableIterator<E> {
        throw new ImplementMeException();
    }

    add(element: E) {
        return this._elements.add(element);
    }

    addAll(elements: Iterable<E>) {
        for (const e of elements) {
            this.add(e);
        }
    }

    has(element: E): boolean {
        return this._elements.contains(element);
    }

    getSize(): number {
        return this._elements.length
    }

    isEmpty(): boolean {
        return this._elements.length == 0;
    }

    peek(): E {
        return this._elements.peek();
    }

    remove(element: E) {
        this._elements.remove(element);
    }

    removeAll(elements: Iterable<E>) {
        for (const e of elements) {
            this.remove(e);
        }
    }

}

export enum PeekMode { PeekFirstAdded, PeekLastAdded};

export class DefaultFrontierSet<E extends AbstractElement> implements FrontierSet<E> {

    private readonly _elements: Set<E>;

    private readonly _peekMode: PeekMode;

    constructor(mode: PeekMode = PeekMode.PeekFirstAdded) {
        this._elements = new Set();
        this._peekMode = mode;
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

    has(element: E): boolean {
        return this._elements.has(element);
    }

    getSize(): number {
        return this._elements.size;
    }

    isEmpty(): boolean {
        return this._elements.size == 0;
    }

    peek(): E {
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

    public has(element: E) {
        return this._states.has(element);
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

