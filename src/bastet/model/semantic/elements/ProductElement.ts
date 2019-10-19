import {AbstractElement} from "./AbstractElement";
import {Record} from "immutable";

export interface ProductElementAttributes {
    readonly elements: AbstractElement[];
}

export const bottomElementAttributes: ProductElementAttributes = {
    elements: []
}

export class ProductElement extends Record(bottomElementAttributes) implements ProductElementAttributes, AbstractElement {

    get elements() {
        return this.get('elements');
    }

}
