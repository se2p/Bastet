import {WithIdent} from "./WithIdent";
import {ImmutableMap} from "./ImmutableMap";
import {IllegalArgumentException} from "../core/exceptions/IllegalArgumentException";

export class Maps {

    /**
     * @returns the values of the map `inputMap`
     */
    public static values<T>(inputMap: { [id: string] : T; }) : T[] {
        return Object.keys(inputMap).map(k => inputMap[k]);
    }

    /**
     * Create a mapping from identifier to object. The result is equivalent to a set
     * with only one object with the same identifier.
     *
     * ATTENTION: Please note that the type of an object is not taken into account.
     *      The identifier must reflect the type of an object in
     *      case a map must handle objects of different types.
     *
     * @param elements
     */
    public static createMap<T extends WithIdent> (elements: T[]): { [id: string] : T; } {
        let result : { [id: string] : T; } = {};
        for (let e of elements) {
            result[e.ident] = e;
        }
        return result;
    }

    /**
     * Merge two given maps.
     *
     * PRECONDITION: The sets of keys of these maps must be disjoint.
     *
     * @param map1
     * @param map2
     * @returns the merged map
     */
    public static mergeMaps<V> (map1: { [id: string] : V; }, map2: { [id: string] : V; }): { [id: string] : V; } {
        let result : { [id: string] : V; } = {};
        for (let key in map1) {
            result[key] = map1[key];
        }
        for (let key in map2) {
            if (result[key]) {
                throw new IllegalArgumentException("Merge only supports unique entries!");
            }
            result[key] = map2[key];
        }
        return result;
    }

    /**
     * Create an immutable map from a given dictionary.
     *
     * @param The dictionary to create the map from.
     */
    static immutableCopyOf<V>(map: {[id: string]: V}): ImmutableMap<string, V> {
        return ImmutableMap.copyOfStringMap(map);
    }
}
