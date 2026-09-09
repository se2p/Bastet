/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net)
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

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { App } from '../../../../src/bastet/syntax/app/App';
import { AppBuilder } from '../../../../src/bastet/syntax/app/AppBuilder';
import { CodeToApp } from '../../../../src/bastet/syntax/transformers/CodeToApp';

describe('AppBuilder', () => {
    describe('dissolveInheritance', () => {
        const code: string = `
            program Test
            
            role A begin
                define atomic base (cond: boolean) begin
                end
                extern _RUN_foo () returns int
            end
            
            role B is A begin
                define atomic assert (cond: boolean) begin
                end
            end
            
            actor C is B begin
                define atomic caesar () begin
                end
            end
            
            actor D is A begin
                define anton () begin
                end
            end
            `;

        const config: {} = {};
        const app: App = CodeToApp.codeToApp(code, App.empty(), {});
        const diss: App = AppBuilder.dissolveInheritance(app);

        test('Results in two actors: D and C', async () => {
            assert.deepStrictEqual(diss.nonBootActors.length, 2);
            assert.ok([...diss.actorNames].includes('D'));
            assert.ok([...diss.actorNames].includes('C'));
        });

        test('copies all attributes and methods from the actors it inherits from', async () => {
            assert.ok(![...diss.getActorByName('D').methodMap.keys()].includes('caesar'));
            assert.ok([...diss.getActorByName('D').methodMap.keys()].includes('anton'));
            assert.ok(![...diss.getActorByName('D').methodMap.keys()].includes('_RUN_foo'));
            assert.ok([...diss.getActorByName('D').externalMethodMap.keys()].includes('_RUN_foo'));
            assert.ok([...diss.getActorByName('D').methodMap.keys()].includes('base'));
            assert.ok([...diss.getActorByName('C').methodMap.keys()].includes('assert'));
            assert.ok([...diss.getActorByName('C').methodMap.keys()].includes('base'));
        });
    });
});
