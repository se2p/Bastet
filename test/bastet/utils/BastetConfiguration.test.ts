/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net),
 *   see the file CONTRIBUTORS.md for the list of contributors.
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


import {BastetConfiguration} from "../../../src/bastet/utils/BastetConfiguration";

describe("BastetConfiguration", () => {

    test("Scoped Option", async (done) => {
        const cfg = new BastetConfiguration({"foo": { "bar": 1}}, ["foo"]);
        expect(cfg.getProperty("bar")).toEqual(1);
        done();
    });

    test("Scoped Option Boolean", async (done) => {
        const cfg = new BastetConfiguration({"foo": { "bar": false}}, ["foo"]);
        expect(cfg.getProperty("bar", true)).toEqual(false);
        done();
    });

});
