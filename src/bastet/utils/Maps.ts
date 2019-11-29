import {WithIdent} from "./WithIdent";

export class Maps {

    public static values<T>(inputMap: { [id: string] : T; }) : T[] {
        return Object.keys(inputMap).map(k => inputMap[k]);
    }

    public static createMap<T extends WithIdent> (elements: T[]): { [id: string] : T; } {
        let result : { [id: string] : T; } = {};
        for (let e of elements) {
            result[e.ident] = e;
        }
        return result;
    }

    public static mergeMaps<V> (map1: { [id: string] : V; }, map2: { [id: string] : V; }): { [id: string] : V; } {
        let result : { [id: string] : V; } = {};
        for (let key in map1) {
            result[key] = map1[key];
        }
        for (let key in map2) {
            if (result[key]) {
                throw Error("Merge only supports unique entries!");
            }
            result[key] = map2[key];
        }
        return result;
    }

}
