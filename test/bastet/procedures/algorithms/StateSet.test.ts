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


import {Map as ImmMap, List as ImmList, Record as ImmRec, Set as ImmSet} from "immutable"
import {DifferencingFrontierSet, PartitionKey} from "../../../../src/bastet/procedures/algorithms/StateSet";
import {LexiKey} from "../../../../src/bastet/utils/Lexicographic";
import {AbstractElement, AbstractState} from "../../../../src/bastet/lattices/Lattice";
import {StateReferenceOperator} from "../../../../src/bastet/procedures/analyses/ProgramAnalysis";

const DummyAbstractElementRecord = ImmRec({
    id: 0,
});

export class DummyAbstractElement extends DummyAbstractElementRecord implements AbstractElement {

    constructor(id: number) {
        super({id: id});
    }

    public getId(): number {
        return this.get('id');
    }

}

class StateReferenceOperatorStub implements StateReferenceOperator<DummyAbstractElement> {
    decRef(state: DummyAbstractElement) {
    }

    incRef(state: DummyAbstractElement) {
    }
}

describe('DifferencingFrontierSet', function() {

    test('Lexy Key', function() {
        const k1 = new LexiKey([2, 1]);
        const k2 = new LexiKey([2, 2]);
        const k3 = new LexiKey([1, 1]);
        const k4 = new LexiKey([1, 2]);

        const e1 = new DummyAbstractElement(1);
        const e2 = new DummyAbstractElement(2);
        const e3 = new DummyAbstractElement(3);
        const e4 = new DummyAbstractElement(4);

        const keyMap = { 1: k1, 2: k2, 3: k3, 4: k4 };

        const s = new DifferencingFrontierSet((e) => new LexiKey([1]), (a, b) => {
            const ka: LexiKey = keyMap[(a as DummyAbstractElement).getId()];
            const kb: LexiKey = keyMap[(b as DummyAbstractElement).getId()];
            return ka.compareTo(kb);
        }, new StateReferenceOperatorStub());

        s.add(e1);
        s.add(e2);
        s.add(e3);
        s.add(e4);

        expect(s.pop()).toStrictEqual(e2);
        expect(s.pop()).toStrictEqual(e1);
        expect(s.pop()).toStrictEqual(e4);
        expect(s.pop()).toStrictEqual(e3);
    });

    test('Test One Partition', function() {
        const s = new DifferencingFrontierSet((e) => new LexiKey([1]),
            (a, b) => 0, new StateReferenceOperatorStub());

        const e1 = new DummyAbstractElement(1)
        s.add(e1);
        expect(s.getSize()).toEqual(1);
        s.add(new DummyAbstractElement(2));
        expect(s.getSize()).toEqual(2);
        s.add(new DummyAbstractElement(3));
        expect(s.getSize()).toEqual(3);
        s.remove(e1);
        expect(s.getSize()).toEqual(2);
        s.remove(e1);
        expect(s.getSize()).toEqual(2);
    });

    test('Test Two Partitions', function() {
        const s = new DifferencingFrontierSet<DummyAbstractElement>((e) => new LexiKey([e.getId() % 2]),
            (a, b) => 0, new StateReferenceOperatorStub());

        const e1 = new DummyAbstractElement(1);
        const e2 = new DummyAbstractElement(2);
        const e3 = new DummyAbstractElement(3);
        const e4 = new DummyAbstractElement(4);
        const e5 = new DummyAbstractElement(5);

        s.addAll([e1, e2, e3, e4, e5]);
        expect(s.getSize()).toEqual(5);
        s.removeAll([e1, e2, e3, e4]);
        expect(s.getSize()).toEqual(1);
        expect(s.peek()).toStrictEqual(e5);
        expect(s.getSize()).toEqual(1);
        expect(s.has(e5)).toBeTruthy();
        s.remove(e5);
        expect(s.has(e5)).toBeFalsy();
    });

    test('Test Alternating Pop', function() {
        const s = new DifferencingFrontierSet<DummyAbstractElement>((e) => new LexiKey([e.getId() % 2]),
            (a, b) => 0, new StateReferenceOperatorStub());

        const e1 = new DummyAbstractElement(1);
        const e2 = new DummyAbstractElement(2);
        const e3 = new DummyAbstractElement(3);
        const e4 = new DummyAbstractElement(4);
        const e5 = new DummyAbstractElement(5);

        function isEven(e: DummyAbstractElement): boolean {
            return e.getId() % 2 == 0;
        }

        s.addAll([e1, e2, e3, e4, e5]);

        const first = s.peek();
        expect(first).toStrictEqual(s.peek());

        const firstEven: boolean = isEven(first);
        s.remove(s.peek());
        const next = s.peek();
        expect(isEven(next)).not.toEqual(firstEven);
    });

});

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
