/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of Passau (uni-passau.de)
 *
 *   See the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Please make sure to CITE this work in your publications if you
 *   build on this work. Some of our maintainers or contributors might
 *   be interested in actively CONTRIBUTING to your research project.
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


import {AbstractElement, AbstractState} from "../lattices/Lattice";
import {Record as ImmRec, Set as ImmSet, List as ImmList} from "immutable";
import {ImplementMeForException} from "../core/exceptions/ImplementMeException";

export type LexiKeyElement = LexiKey | number | string ;

export interface LexiKeyAttribs extends AbstractElement {

    tuple: ImmList<LexiKeyElement>;

}

const LexiKeyRecord = ImmRec({

    tuple: ImmList()

});

export const OTHER_LARGER = +1;
export const THIS_LARGER = -1;
export const NEITHER_LARGER = 0;

export class LexiKey extends LexiKeyRecord implements LexiKeyAttribs {

    constructor(tuple: Iterable<LexiKeyElement>) {
        super({tuple: ImmList(tuple)});
    }

    public getTuple(): ImmList<LexiKeyElement> {
        return this.get("tuple");
    }

    public withTuple(tuple: Iterable<LexiKeyElement>): this {
        return this.set("tuple", ImmList(tuple));
    }

    public concat(key: LexiKey): LexiKey {
        return this.withTuple(this.getTuple().concat(key.getTuple()));
    }

    public compareTo(other: LexiKey): number {
        const otherTuple = other.getTuple();

        for (const [index, element] of this.getTuple().entries()) {
            if (otherTuple.size <= index) {
                return THIS_LARGER;
            }

            const otherElement = otherTuple.get(index);
            const result = this.compareElements(element, otherElement);
            if (result != NEITHER_LARGER) {
                return result;
            }
        }

        if (this.getTuple().size < otherTuple.size) {
            return THIS_LARGER
        } else {
            return NEITHER_LARGER;
        }
    }

    private compareElements(a: LexiKeyElement, b: LexiKeyElement): number {
        const typeA = typeof a;
        const typeB = typeof b;

        if (typeA != typeB) {
            return NEITHER_LARGER;
        }

        if (typeA == 'number') {
            if (b > a) {
                return OTHER_LARGER;
            } else if (a > b) {
                return THIS_LARGER;
            } else {
                return NEITHER_LARGER;
            }

        } else if (typeA == 'string') {
            const result = (a as string).localeCompare(b as string);
            if (result > 0) {
                return THIS_LARGER;
            } else if (result < 0) {
                return OTHER_LARGER;
            } else {
                return NEITHER_LARGER;
            }

        } else if (a instanceof LexiKey) {
            return (a as LexiKey).compareTo(b as LexiKey);

        } else {
            throw new ImplementMeForException(a.constructor.name);
        }
    }

}