import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { IllegalArgumentException } from '../../../src/bastet/core/exceptions/IllegalArgumentException';
import { IllegalStateException } from '../../../src/bastet/core/exceptions/IllegalStateException';
import { Preconditions } from '../../../src/bastet/utils/Preconditions';

describe('Preconditions', () => {
    test('returns valid values unchanged', () => {
        const dictionary = { value: 1 };

        assert.strictEqual(Preconditions.checkIsDic(dictionary), dictionary);
        assert.strictEqual(Preconditions.checkNotEmpty('value'), 'value');
        assert.strictEqual(Preconditions.checkNotUndefined(dictionary), dictionary);
        assert.strictEqual(Preconditions.checkNotUndefined(''), '');
    });

    const nonDictionaries = [
        ['null', null],
        ['array', []],
        ['date', new Date(0)],
    ];

    for (const [name, value] of nonDictionaries) {
        test(`rejects non-dictionaries: ${name}`, () => {
            assert.throws(() => Preconditions.checkIsDic(value), IllegalArgumentException);
        });
    }

    test('uses supplied argument and state messages', () => {
        assert.throws(
            () => Preconditions.checkArgument(false, 'bad argument'),
            new IllegalArgumentException('bad argument')
        );
        assert.throws(() => Preconditions.checkState(false, 'bad state'), new IllegalStateException('bad state'));
    });

    test('uses stable default messages', () => {
        assert.throws(() => Preconditions.checkArgument(false), /Illegal argument!/);
        assert.throws(() => Preconditions.checkState(false), /Illegal state!/);
        assert.throws(() => Preconditions.checkNotEmpty(''), /String must not be empty/);
        assert.throws(() => Preconditions.checkNotUndefined(undefined), /Reference must not be undefined\./);
    });
});
