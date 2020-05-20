/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of Passau (uni-passau.de)
 *
 *   See the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Please make sure to CITE this work in your publications if you
 *   build on this work. Some of our maintainers or contributors might
 *   be interested in actively CONTRIBUTING to your research project.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

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

    public static mergeImmutableMaps<K,V> (map1: ImmutableMap<K, V>, map2: ImmutableMap<K, V>): ImmutableMap<K, V> {
        let result = new Map<K, V>(map1.entries());

        map2.forEach((v,k) => {
            if (result.has(k)) {
                throw new IllegalArgumentException("Merge only supports unique entries!");
            }
            result.set(k, map2.get(k));
        });

        return new ImmutableMap(result.entries());
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
