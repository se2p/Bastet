import {AbstractElement} from './AbstractElement'
import {Record, Set} from 'immutable'

export interface FlatElementAttributes {
    readonly value: any
}

export const bottomElementAttributes: FlatElementAttributes = {
    value: Set(),
}

export class FlatElement extends Record(bottomElementAttributes) implements FlatElementAttributes, AbstractElement {
    constructor(value: any) {
        super({ value: value })
    }

    get value() {
        return this.get('value')
    }
}
