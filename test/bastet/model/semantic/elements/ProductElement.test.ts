import assert from 'assert';
import { Map } from 'immutable';
import { ProductElement } from '../../../../../src/bastet/model/semantic/elements/ProductElement'
import {MapElement} from "../../../../../src/bastet/model/semantic/elements/MapElement";

describe('Functionality of immutable maps', function() {
    it('Operations on immutable maps', function() {
        let map = Map({"a": 1, b: 2});
        let product = [new FlatElement(1), new MapElement(map)];
        let e = new ProductElement(product);
    });
});
