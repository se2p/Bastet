import { describe, test } from 'node:test';
import * as utils from '../bastet/procedures/analyses/data/TestUtils';

const scenarios = [
    ['broadcast', 'common-broadcast-1'],
    ['clone creation', 'common-create-clone-basic-1'],
    ['string length', 'expr-num-string-length-1'],
    ['string-to-number cast', 'cast-str-to-num-1'],
    ['method call', 'ctrl-call-1'],
    ['wait', 'common-wait-2'],
] as const;

for (const [name, fixtureBase] of scenarios) {
    describe(`${name} verifier scenarios`, () => {
        test('accepts the SAFE fixture', { timeout: utils.timeout }, async () => {
            await utils.execFixture(`test/programs/language-coverage/${fixtureBase}_SAFE.sc`);
        });

        test('finds the violation in the UNSAFE fixture', { timeout: utils.timeout }, async () => {
            await utils.execFixture(`test/programs/language-coverage/${fixtureBase}_UNSAFE.sc`);
        });
    });
}
