/*
 *
 *    Copyright 2019 University of Passau
 *
 *    Project maintained by Andreas Stahlbauer (firstname @ lastname . net)
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import {ImmutableMap} from "../../../src/bastet/utils/ImmutableMap";

describe("ImmutableMap", (done) => {

    describe("constructor", (done) => {

        describe("case: empty argument", (done) => {

            it("creates an empty map form a map", (done) => {
                const emptyMap: Map<string, number> = new Map();
                const map = new ImmutableMap<string, number>(emptyMap.entries());

                expect(map.size).toBe(0);
            });

            it("creates an empty map from an array", (done) => {
                const myArray: Array<[string, number]> = new Array();
                const map = new ImmutableMap<string, number>(myArray.values());

                expect(map.size).toBe(0);
            });

        });

        describe("case: non-empty argument", (done) => {

            it("creates an map from an array", (done) => {
                const myArray: Array<[string, number]> = [["a", 1], ["b", 1]];
                const map = new ImmutableMap<string, number>(myArray.values());

                expect(map.size).toBe(2);
            });

        });

    });

    describe("get", (done) => {

        let subject: ImmutableMap<string, number>;

        beforeEach((done) => {
            const myArray: Array<[string, number]> = [["a", 1], ["b", 2], ["d", 4]];
            subject = new ImmutableMap<string, number>(myArray.values());
        });

        describe("case: existing element", (done) => {

            it("provides the element", (done) => {
                expect(subject.get("a")).toEqual(1);
                expect(subject.get("b")).toEqual(2);
                expect(subject.get("d")).toEqual(4);
            });

        });

        describe("case: NOT existing element", (done) => {

            it("returns undefined", (done) => {
                expect(subject.get("c")).toBeUndefined();
                expect(subject.get("f")).toBeUndefined();
            });

        });

    });

});
