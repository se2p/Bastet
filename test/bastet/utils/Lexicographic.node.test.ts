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

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { LexiKey, OTHER_LARGER, THIS_LARGER } from '../../../src/bastet/utils/Lexicographic';

describe('LexiKey', function () {
    test('[1,3] > [1,2]', function () {
        const key1 = new LexiKey([1, 2]);
        const key2 = new LexiKey([1, 3]);
        assert.deepStrictEqual(key1.compareTo(key2), OTHER_LARGER);
    });

    test('[1] > [1,2]', function () {
        const key1 = new LexiKey([1]);
        const key2 = new LexiKey([1, 2]);
        assert.deepStrictEqual(key1.compareTo(key2), THIS_LARGER);
    });

    test('["a", "b"] > ["a", "a"]', function () {
        const key1 = new LexiKey(['a', 'b']);
        const key2 = new LexiKey(['a', 'a']);
        assert.deepStrictEqual(key1.compareTo(key2), THIS_LARGER);
    });

    test('["a", "ab"] > ["a", "a"]', function () {
        const key1 = new LexiKey(['a', 'ab']);
        const key2 = new LexiKey(['a', 'a']);
        assert.deepStrictEqual(key1.compareTo(key2), THIS_LARGER);
    });

    test('["a", [1,2]] > ["a", [1,1]]', function () {
        const key1 = new LexiKey(['a', new LexiKey([1, 2])]);
        const key2 = new LexiKey(['a', new LexiKey([1, 1])]);
        assert.deepStrictEqual(key1.compareTo(key2), THIS_LARGER);
    });
});
