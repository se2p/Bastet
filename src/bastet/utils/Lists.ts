import {NotSupportedException} from "../core/exceptions/NotSupportedException";
import {ImmutableList} from "./ImmutableList";

export class Lists {

    static immutableCopyOf<E>(elements: E[]): ImmutableList<E> {
        throw new NotSupportedException("Implement me");
    }

}
