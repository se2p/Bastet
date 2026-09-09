'use strict';

const assert = require('node:assert/strict');
const { describe, test } = require('node:test');
const { findPolicyViolations } = require('../../scripts/check-test-policy');

function messages(source) {
    return findPolicyViolations(source).map((violation) => violation.message);
}

describe('test policy checker', () => {
    test('accepts ordinary tests and non-enabling options', () => {
        const source = `
            import {test as check, describe} from 'node:test';
            describe('group', () => {
                check('runs', {skip: false, only: false}, (context) => {
                    context.runOnly(false);
                });
            });
        `;
        assert.deepEqual(messages(source), []);
    });

    test('ignores policy-like text in comments and strings', () => {
        const source = `
            // test.skip('commented out');
            const documentation = "test.only('example') and {skip: true}";
            test('runs', () => assert.ok(documentation));
        `;
        assert.deepEqual(messages(source), []);
    });

    test('rejects legacy skip and focus forms', () => {
        const source = `
            test.only('focused', () => {});
            it.skip('skipped', () => {});
            describe.only('focused suite', () => {});
            xtest('disabled', () => {});
            xit('disabled', () => {});
            fit('focused', () => {});
            fdescribe('focused suite', () => {});
        `;
        assert.equal(messages(source).length, 7);
    });

    test('rejects aliased and namespaced node:test modifiers', () => {
        const source = `
            import test, {describe as group, only as focused, skip as skipped} from 'node:test';
            import * as nodeTest from 'node:test';
            test.skip('skipped', () => {});
            group.only('focused', () => {});
            focused('focused', () => {});
            skipped('skipped', () => {});
            nodeTest.test.only('focused', () => {});
            nodeTest.skip('skipped', () => {});
            nodeTest.only('focused', () => {});
        `;
        assert.equal(messages(source).length, 7);
    });

    test('rejects enabled options and callback-context controls', () => {
        const source = `
            import {test as check} from 'node:test';
            check('skipped', {skip: true}, () => {});
            check('focused', {only: true}, () => {});
            check('context', (context) => {
                context.skip('not today');
                context.runOnly(true);
                context.test('subtest', {only: true}, () => {});
            });
        `;
        assert.equal(messages(source).length, 5);
    });
});
