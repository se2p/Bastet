
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

export class ImmutableMap<K, V> implements ReadonlyMap<K, V>, Iterable<[K, V]> {

    private readonly _map: Map<K, V>;

    constructor(entries: IterableIterator<[K, V]>) {
        this._map = new Map<K, V>(entries);
    }

    public get(key: K) : V | null {
        return this._map.get(key);
    }

    public has(key: K): boolean {
        return this._map.has(key);
    }

    public keys(): IterableIterator<K> {
        return this._map.keys();
    }

    public entries(): IterableIterator<[K, V]> {
        return this._map.entries();
    }

    public values(): IterableIterator<V> {
        return this._map.values();
    }

    get size(): number {
        return this._map.size;
    }

    public [Symbol.iterator](): IterableIterator<[K, V]> {
        return this._map[Symbol.iterator]();
    }

    public forEach(callbackFn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        return this._map.forEach(callbackFn, thisArg);
    }

    public static copyOfStringMap<V>(input: {[id: string]: V}): ImmutableMap<string, V> {
        let interm: Map<string, V> = new Map<string, V>();
        for (let k in input) {
            interm.set(k, input[k]);
        }
        return new ImmutableMap<string, V>(interm.entries());
    }

    public static copyOf<K, V>(input: ReadonlyMap<K, V>): ImmutableMap<K, V> {
        if (input.constructor == ImmutableMap) {
            return <ImmutableMap<K, V>> input;
        }
        return new ImmutableMap(input.entries());
    }

}

