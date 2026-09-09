import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { Record as ImmRec } from 'immutable';
import { AbstractElement } from '../../../src/bastet/lattices/Lattice';
import { Optional } from '../../../src/bastet/utils/Optional';

const ValueRecord = ImmRec({ value: 0 });

class ValueElement extends ValueRecord implements AbstractElement {
    constructor(value: number) {
        super({ value });
    }
}

describe('Optional', () => {
    test('represents present and absent values', () => {
        const value = new ValueElement(1);

        assert.strictEqual(Optional.of(value).isPresent(), true);
        assert.strictEqual(Optional.of(value).getValue(), value);
        assert.strictEqual(Optional.absent<ValueElement>().isAbsent(), true);
        assert.strictEqual(Optional.of<ValueElement>(null).isAbsent(), true);
    });

    test('updates immutably', () => {
        const value = new ValueElement(1);
        const absent = Optional.absent<ValueElement>();
        const present = absent.withValue(value);

        assert.strictEqual(absent.isAbsent(), true);
        assert.strictEqual(present.getValue(), value);
        assert.strictEqual(present.withoutValue().isAbsent(), true);
    });
});
