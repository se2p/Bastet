import {ImplementMeException} from "../core/exceptions/ImplementMeException";

export class ImmutableList<E> {

    public concat(other: ImmutableList<E>): ImmutableList<E> {
        throw new ImplementMeException();
    }
}
