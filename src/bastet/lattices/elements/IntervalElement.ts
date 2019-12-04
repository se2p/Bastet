import {AbstractElement} from './AbstractElement'
import {Record} from 'immutable'

export interface IntervalAttributes {
    readonly fromIncluse: any
    readonly toExclusive: any
}

export const bottomIntervalAttributes: IntervalAttributes = {
    fromIncluse: undefined,
    toExclusive: undefined,
}

export class IntervalElement extends Record(bottomIntervalAttributes) implements IntervalAttributes, AbstractElement {
    constructor(fromInclusive: any, toExclusive: any) {
        super({ fromIncluse: fromInclusive, toExclusive: toExclusive })
    }

    get fromIncluse() {
        return this.get('fromIncluse')
    }

    get toExclusive() {
        return this.get('toExclusive')
    }
}
