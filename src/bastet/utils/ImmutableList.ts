import {ImplementMeException} from "../core/exceptions/ImplementMeException";

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
