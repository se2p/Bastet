/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net)
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

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
