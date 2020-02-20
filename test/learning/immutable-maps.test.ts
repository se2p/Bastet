import assert from 'assert'
import {Map} from 'immutable'

describe('Functionality of immutable maps', function() {
    it('Operations on immutable maps', function() {
        const map1 = Map({ a: 1, b: 2, c: 3 })
        const map2 = map1.set('b', 50)
        assert.notStrictEqual(map1.get('b'), map2.get('b'))
    })
})
