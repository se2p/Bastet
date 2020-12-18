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

import {AbstractElement} from "../lattices/Lattice";
import {Record as ImmRec} from "immutable";

export interface OptionalAttribs<T extends AbstractElement> extends AbstractElement {

    value?: T;

}

const OptionalRecord = ImmRec({

    value: null,

});

export class Optional<T extends AbstractElement> extends OptionalRecord implements OptionalAttribs<T>, AbstractElement {

    constructor(value: T) {
        super({value: value});
    }

    public getValue(): T {
        return this.get('value');
    }

    public withValue(v: T): this {
        return this.set('value', v);
    }

    public withoutValue(): this {
        return this.set('value', null);
    }

    public isPresent(): boolean {
        return this.getValue() !== null;
    }

    public static absent<T extends AbstractElement>(): Optional<T> {
       return new Optional(null);
    }

    public static of<T extends AbstractElement>(value: T): Optional<T> {
        return new Optional(value);
    }

}
