import {NotSupportedException} from "../core/exceptions/NotSupportedException";

export class ImmutableMap<K, V> {

    public getValue(key: K) : V | null {
        throw new NotSupportedException("Implement me");
    }

    *[Symbol.iterator] () {

    }
}
