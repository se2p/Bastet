import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { ImmutableSet } from '../../../src/bastet/utils/ImmutableSet';

describe('ImmutableSet', () => {
    test('deduplicates its input and exposes the readonly set contract', () => {
        const subject = new ImmutableSet([1, 2, 2]);

        assert.strictEqual(subject.size, 2);
        assert.strictEqual(subject.has(1), true);
        assert.deepStrictEqual([...subject], [1, 2]);
        assert.deepStrictEqual([...subject.keys()], [1, 2]);
        assert.deepStrictEqual([...subject.values()], [1, 2]);
        assert.deepStrictEqual(
            [...subject.entries()],
            [
                [1, 1],
                [2, 2],
            ]
        );
    });

    test('copies without sharing later source mutations', () => {
        const source = new Set([1]);
        const subject = ImmutableSet.copyOf(source);
        source.add(2);

        assert.deepStrictEqual([...subject], [1]);
    });

    test('forEach honors the supplied receiver', () => {
        const receiver = { sum: 0 };
        new ImmutableSet([1, 2]).forEach(function (value) {
            this.sum += value;
        }, receiver);

        assert.strictEqual(receiver.sum, 3);
    });
});
