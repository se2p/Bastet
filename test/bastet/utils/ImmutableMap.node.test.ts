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

import assert from 'node:assert/strict';
import { beforeEach, describe, test } from 'node:test';
import { ImmutableMap } from '../../../src/bastet/utils/ImmutableMap';

describe('ImmutableMap', () => {
    describe('constructor', () => {
        describe('case: empty argument', () => {
            test('creates an empty map form a map', async () => {
                const emptyMap: Map<string, number> = new Map();
                const map = new ImmutableMap<string, number>(emptyMap.entries());

                assert.strictEqual(map.size, 0);
            });

            test('creates an empty map from an array', async () => {
                const myArray: Array<[string, number]> = new Array();
                const map = new ImmutableMap<string, number>(myArray.values());

                assert.strictEqual(map.size, 0);
            });
        });

        describe('case: non-empty argument', () => {
            test('creates an map from an array', async () => {
                const myArray: Array<[string, number]> = [
                    ['a', 1],
                    ['b', 1],
                ];
                const map = new ImmutableMap<string, number>(myArray.values());

                assert.strictEqual(map.size, 2);
            });
        });
    });

    describe('get', () => {
        let subject: ImmutableMap<string, number>;

        beforeEach(async () => {
            const myArray: Array<[string, number]> = [
                ['a', 1],
                ['b', 2],
                ['d', 4],
            ];
            subject = new ImmutableMap<string, number>(myArray.values());
        });

        describe('case: existing element', () => {
            test('provides the element', async () => {
                assert.deepStrictEqual(subject.get('a'), 1);
                assert.deepStrictEqual(subject.get('b'), 2);
                assert.deepStrictEqual(subject.get('d'), 4);
            });
        });

        describe('case: NOT existing element', () => {
            test('returns undefined', async () => {
                assert.strictEqual(subject.get('c'), undefined);
                assert.strictEqual(subject.get('f'), undefined);
            });
        });
    });
});
