/*
 *
 *    Copyright 2019 University of Passau
 *
 *    Project maintained by Andreas Stahlbauer (firstname @ lastname . net)
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

export class ImmutableList<E> implements Iterable<E> {

    private readonly _list: Array<E>;

    constructor(items: E[]) {
        this._list = Array.from(items);
    }

    [Symbol.iterator](): IterableIterator<E> {
        return this._list[Symbol.iterator]();
    }

    entries(): IterableIterator<[number, E]> {
        return this._list.entries();
    }

    keys(): IterableIterator<number> {
        return this._list.keys();
    }

    values(): IterableIterator<E> {
        return this._list.values();
    }

    forEach(callbackfn: <E>(value: E, index: number, array: E[]) => void, thisArg?: any): void {
        this._list.forEach(callbackfn, thisArg);
    }

    indexOf(searchElement: E, fromIndex?: number): number {
        return this._list.indexOf(searchElement, fromIndex);
    }

    map<U>(callbackfn: <E>(value: E, index: number, array: E[]) => U, thisArg?: any): U[] {
        return this._list.map(callbackfn, this);
    }

    get length(): number {
        return this._list.length;
    }

}
