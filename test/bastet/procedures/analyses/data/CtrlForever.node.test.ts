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
import { test } from 'node:test';
import * as utils from './TestUtils';
import path from 'path';

const predicateConfig = path.join(__dirname, '../../../../../config/predicate-abstraction.json');
const ciConfig = path.join(__dirname, '../../../../../config/ci.delta.json');

test('Test ctrl forever 1 safe', { timeout: utils.timeout }, async () => {
    const fixtureRelPath: string = 'test/programs/language-coverage/ctrl-forever-1_SAFE.sc';
    await utils.execFixture(fixtureRelPath, [predicateConfig, ciConfig]);
});

test('Test ctrl forever 1 unsafe', { timeout: utils.timeout }, async () => {
    const fixtureRelPath: string = 'test/programs/language-coverage/ctrl-forever-1_UNSAFE.sc';
    await utils.execFixture(fixtureRelPath);
});

test('Test ctrl forever 2 safe', { timeout: utils.timeout }, async () => {
    const fixtureRelPath: string = 'test/programs/language-coverage/ctrl-forever-2_SAFE.sc';
    await utils.execFixture(fixtureRelPath, [predicateConfig, ciConfig]);
});
