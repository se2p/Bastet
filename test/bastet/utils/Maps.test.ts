import assert from 'assert'
import {Maps} from "../../../src/bastet/utils/Maps";
import {WithIdent} from "../../../src/bastet/utils/WithIdent";
import {IllegalArgumentException} from "../../../src/bastet/core/exceptions/IllegalArgumentException";

describe('Maps.values', function() {
    it('must return the map values', function() {
        let v = Maps.values({"a": 1, "b": 2, "d": 4});
        assert.ok(v.length == 3);
        assert.ok(!v.includes(3));
    })
});

class Identified implements WithIdent {

    private _value: number;

    constructor (v: number) {
        this._value = v;
    }

    get ident(): string {
        return this._value.toString();
    }

}

describe('Maps.createMap', function() {
    it('must create a map that is similar to a set based on an object identifier', function() {
        let m1 = Maps.createMap([new Identified(1), new Identified(1)]);
        assert.strictEqual(Object.keys(m1).length, 1);

        let m2 = Maps.createMap([new Identified(1), new Identified(4)]);
        assert.strictEqual(Object.keys(m2).length, 2);
    })
});

describe('Maps.mergeMaps', function() {
    it('Merge two maps. Exception if keys not disjoint', function() {
        let m1 = Maps.createMap([new Identified(1), new Identified(1)]);
        assert.strictEqual(Object.keys(m1).length, 1);

        let m2 = Maps.createMap([new Identified(1), new Identified(4)]);
        assert.strictEqual(Object.keys(m2).length, 2);

        assert.throws(() => {
            let mm = Maps.mergeMaps(m1, m2);
        }, IllegalArgumentException)
    })
});
