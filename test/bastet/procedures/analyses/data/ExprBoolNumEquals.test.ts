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
import {Bastet} from "../../../../../src/bastet/Bastet";
import * as utils from './TestUtils'

xtest("Test bool num equals 1 safe", async () => {
    const fixtureRelPath: string = "test/programs/language-coverage/expr-bool-number-equals-1_SAFE.sc"
    utils.execFixture(fixtureRelPath);
}, utils.timeout);

xtest("Test bool num equals 1 unsafe", async () => {
    const fixtureRelPath: string = "test/programs/language-coverage/expr-bool-number-equals-1_UNSAFE.sc"
    utils.execFixture(fixtureRelPath);
}, utils.timeout);

test("Test bool num equals 2 safe", async () => {
    const fixtureRelPath: string = "test/programs/language-coverage/expr-bool-number-equals-2_SAFE.sc"
    utils.execFixture(fixtureRelPath);
}, utils.timeout);

test("Test bool num equals 2 unsafe", async () => {
    const fixtureRelPath: string = "test/programs/language-coverage/expr-bool-number-equals-2_UNSAFE.sc"
    utils.execFixture(fixtureRelPath);
}, utils.timeout);


