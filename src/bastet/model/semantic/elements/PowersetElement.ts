import { AbstractElement } from './AbstractElement'
import { Set, Record } from 'immutable'

export interface PowersetElementAttributes {
    readonly elements: Set<AbstractElement>
}

export const bottomElementAttributes: PowersetElementAttributes = {
    elements: Set(),
}

export class PowersetElement extends Record(bottomElementAttributes)
    implements PowersetElementAttributes, AbstractElement {
    constructor(elements: Set<AbstractElement>) {
        super({ elements: elements })
    }

    get elements() {
        return this.get('elements')
    }
}
