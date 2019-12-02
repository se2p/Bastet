
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

    public static copyOf<K, V>(input: ReadonlyMap<K, V>) {
        if (input.constructor == ImmutableMap) {
            return input;
        }
        return new ImmutableMap(input.entries());
    }

}


