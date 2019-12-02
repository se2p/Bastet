import {ImmutableList} from "./ImmutableList";

export class Lists {

    static immutableCopyOf<E>(elements: E[]): ImmutableList<E> {
        return new ImmutableList(elements);
    }

    static concatImmutableLists<E>(list1: ImmutableList<E>, list2: ImmutableList<E>): ImmutableList<E> {
        let result: Array<E> = new Array();
        for (let e1 of list1) {
            result.push(e1);
        }
        for (let e2 of list2) {
            result.push(e2);
        }
        return new ImmutableList(result);
    }
}
