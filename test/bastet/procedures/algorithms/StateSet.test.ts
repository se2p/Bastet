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


import {Map as ImmMap, List as ImmList, Record as ImmRec} from "immutable"
import {DifferencingFrontierSet, PartitionKey} from "../../../../src/bastet/procedures/algorithms/StateSet";

describe('State Sets', function() {

    test('Partition Keys, Immutable Map', function() {
        let pm = ImmMap<PartitionKey, any>();

        const key1 = new PartitionKey(ImmList([1, 2, ImmList(['a', 'b'])]));
        const key2 = new PartitionKey(ImmList([1, 2, ImmList(['a', 'b'])]));

        const value1 = {"a": 1};
        const value2 = {"b": 2};

        pm = pm.set(key1, value1);
        pm = pm.set(key2, value2);

        expect(pm.get(key1)["b"]).toEqual(2);
    });

    test('Partition Keys, Mutable Map', function() {
        const pm = ImmMap<PartitionKey, any>().asMutable();

        const key1 = new PartitionKey(ImmList([1, 2, ImmList(['a', 'b'])]));
        const key2 = new PartitionKey(ImmList([1, 2, ImmList(['a', 'b'])]));

        const value1 = {"a": 1};
        const value2 = {"b": 2};

        pm.set(key1, value1);
        pm.set(key2, value2);

        expect(pm.get(key1)["b"]).toEqual(2);
    });

});
