export class ImmutableSet<E> implements ReadonlySet<E> {

    private readonly _elements: Set<E>;

    constructor(elements: Iterable<E>) {
        this._elements = new Set(elements);
    }

    public get size() {
        return this._elements.size;
    }

    public [Symbol.iterator](): IterableIterator<E> {
        return this._elements[Symbol.iterator]();
    }

    public entries(): IterableIterator<[E, E]> {
        return this._elements.entries();
    }

    public forEach(callbackfn: (value: E, value2: E, set: Set<E>) => void, thisArg?: any): void {
        return this._elements.forEach(callbackfn, thisArg);
    }

    public has(value: E): boolean {
        return this._elements.has(value);
    }

    public keys(): IterableIterator<E> {
        return this._elements.keys();
    }

    public values(): IterableIterator<E> {
        return this._elements.values();
    }

    static copyOf<E>(entries: Set<E>) {
        return new ImmutableSet(entries);
    }

}
