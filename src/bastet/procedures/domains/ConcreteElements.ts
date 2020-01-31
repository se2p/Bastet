/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net),
 *   see the file CONTRIBUTORS.md for the list of contributors.
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

import {AbstractElement, Lattice} from "../../lattices/Lattice";
import {ImmutableMap} from "../../utils/ImmutableMap";
import {ImmutableList} from "../../utils/ImmutableList";
import {Preconditions} from "../../utils/Preconditions";
import {Record as ImmRec} from "immutable";

export interface ConcreteElement {

}

export class ConcreteNumberOrderLattice implements Lattice<ConcreteNumber> {

    bottom(): ConcreteNumber {
        return undefined;
    }

    isIncluded(element1: ConcreteNumber, element2: ConcreteNumber): boolean {
        return false;
    }

    join(element1: ConcreteNumber, element2: ConcreteNumber): ConcreteNumber {
        return undefined;
    }

    meet(element1: ConcreteNumber, element2: ConcreteNumber): ConcreteNumber {
        return undefined;
    }

    top(): ConcreteNumber {
        return undefined;
    }

}

export interface ConcretePrimitiveValue<T> extends ConcreteElement {

    value: T;

}

const ConcretePrimitiveValueRecord = ImmRec({

    value: null,

});

export class ConcretePrimitive<T> extends ConcretePrimitiveValueRecord implements ConcretePrimitiveValue<T> {

    value: T;

    constructor(args: any = {}) {
        super(Object.assign({}, args, {}));
    }
}

export class ConcreteString extends ConcretePrimitive<string> {

    constructor(value: string) {
        super({value: value});
    }
}

export class ConcreteBoolean extends ConcretePrimitive<boolean> {

    constructor(value: boolean) {
        super({value: value});
    }
}

export class ConcreteNumber extends ConcretePrimitive<number> {

    constructor(value: number) {
        super({value: value});
    }
}


export class ConcreteMemory implements ConcreteElement {

    private readonly _numberMem: ImmutableMap<string, ConcreteNumber>;

    private readonly _stringMem: ImmutableMap<string, ConcreteString>;

    private readonly _booleanMem: ImmutableMap<string, ConcreteBoolean>;

    private readonly _listMem: ImmutableMap<string, ConcreteList<ConcreteString>>;

    constructor(numberMem: Map<string, ConcreteNumber>, stringMem: Map<string, ConcreteString>,
                booleanMem: Map<string, ConcreteBoolean>, listMem: Map<string, ConcreteList<ConcreteString>>) {
        this._numberMem = ImmutableMap.copyOf(numberMem);
        this._stringMem = ImmutableMap.copyOf(stringMem);
        this._booleanMem = ImmutableMap.copyOf(booleanMem);
        this._listMem = ImmutableMap.copyOf(listMem);
    }

    get numberMem(): ImmutableMap<string, ConcreteNumber> {
        return this._numberMem;
    }

    get stringMem(): ImmutableMap<string, ConcreteString> {
        return this._stringMem;
    }

    get booleanMem(): ImmutableMap<string, ConcreteBoolean> {
        return this._booleanMem;
    }

    get listMem(): ImmutableMap<string, ConcreteList<ConcreteString>> {
        return this._listMem;
    }
}

export class ConcreteList<O> implements ConcreteElement {

    private readonly _elements: ImmutableList<O>;

    constructor(elements: O[]) {
        Preconditions.checkNotUndefined(elements);
        this._elements = new ImmutableList(elements);
    }

    get elements(): ImmutableList<O> {
        return this._elements;
    }
}

export class ConcreteElementFactory {

    static concreteStringFrom(str: string): ConcreteString {
        return new ConcreteString(str);
    }

    static concreteNumberFrom(num: number): ConcreteNumber {
        return new ConcreteNumber(num);
    }

    static concreteBooleanFrom(bo: boolean): ConcreteBoolean {
        return new ConcreteBoolean(bo);
    }

}

