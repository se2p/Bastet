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

import {
    AbstractBoolean,
    AbstractFloat,
    AbstractInteger,
    AbstractList, AbstractMemory,
    AbstractNumber,
    AbstractReal, AbstractString, AbstractStringList
} from "./MemoryTransformer";

type float = number;
type integer = number;

import {AbstractElement, AbstractState, Lattice, AbstractElementVisitor} from "../../lattices/Lattice";
import {Preconditions} from "../../utils/Preconditions";
import {Record as ImmRec, Map as ImmMap} from "immutable";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";
import {Optional} from "../../utils/Optional";

function containsAll<K, V>(map1: ImmMap<K, V>, map2: ImmMap<K, V>): boolean {
    throw new ImplementMeException();
}

function joinMaps<K, V>(map1: ImmMap<K, V>, map2: ImmMap<K, V>): ImmMap<K, V> {
    throw new ImplementMeException();
}

/**
 * A concrete element is an abstract element, with all information (no abstraction applied).
 */
export interface ConcreteElement extends AbstractElement {

}

export class ConcreteNumberOrderLattice implements Lattice<ConcreteNumber> {

    private readonly _bottom: ConcreteNumber;
    private readonly _top: ConcreteNumber;

    constructor(bottomElement: ConcreteNumber, topElement: ConcreteNumber) {
        this._bottom = Preconditions.checkNotUndefined(bottomElement);
        this._top = Preconditions.checkNotUndefined(topElement);
    }

    bottom(): ConcreteNumber {
        return this._bottom;
    }

    isIncluded(element1: ConcreteNumber, element2: ConcreteNumber): boolean {
        return element1.value <= element2.value;
    }

    join(element1: ConcreteNumber, element2: ConcreteNumber): ConcreteNumber {
        throw new ImplementMeException();
    }

    meet(element1: ConcreteNumber, element2: ConcreteNumber): ConcreteNumber {
        throw new ImplementMeException();
    }

    top(): ConcreteNumber {
        return this._top;
    }

}

export interface ConcretePrimitiveValue<T> extends ConcreteElement {

    value: T;

}

const ConcretePrimitiveValueRecord = ImmRec({

    value: null,

});

export class ConcretePrimitive<T> extends ConcretePrimitiveValueRecord implements ConcretePrimitiveValue<T> {

    constructor(args: any = {}) {
        super(Object.assign({}, args, {}));
    }

}

export class ConcreteString extends ConcretePrimitive<string> implements AbstractString {

    constructor(value: string) {
        super({value: value});
    }
}

export class ConcreteFloat extends ConcretePrimitive<float> implements AbstractFloat, AbstractReal {

    constructor(value: float) {
        super({value: value});
    }
}

export class ConcreteInteger extends ConcretePrimitive<integer> implements AbstractInteger {

    constructor(value: integer) {
        super({value: value});
    }
}

export class ConcreteBoolean extends ConcretePrimitive<boolean> implements AbstractBoolean {

    constructor(value: boolean) {
        super({value: value});
    }
}

export class ConcreteNumber extends ConcretePrimitive<number> implements AbstractNumber {

    constructor(value: number) {
        super({value: value});
    }
}

export class ConcreteList<Of extends ConcreteElement> extends ConcretePrimitive<Of> implements ConcreteElement, AbstractList {

    constructor(values: Of[]) {
        super({value: values});
    }

}

export class ConcreteStringList extends ConcreteList<ConcreteString> implements AbstractStringList, AbstractList {

    constructor(elements: ConcreteString[]) {
        super(elements);
    }
}

export interface ConcreteDomain<T extends ConcreteElement> {

    createElement(attrs: {}): T;

}

export class ConcreteNumberDomain implements ConcreteDomain<ConcreteNumber> {

    createElement(attrs: {}): ConcreteNumber {
        return new ConcreteNumber(attrs['value']);
    }

    public static elementFomPrimitive(num: number): ConcreteNumber {
        return new ConcreteNumber(num);
    }

}

export class ConcreteBooleanDomain implements ConcreteDomain<ConcreteBoolean> {

    createElement(attrs: {}): ConcreteBoolean {
        return new ConcreteBoolean(attrs['value']);
    }

    elementFomPrimitive(val: boolean): ConcreteBoolean {
        return new ConcreteBoolean(val);
    }

}

export class ConcreteBoundedStringDomain implements ConcreteDomain<ConcreteString> {

    private readonly _bound: number;

    constructor(bound: number) {
        this._bound = bound;
    }

    createElement(attrs: {}): ConcreteString {
        return this.createFrom(attrs['value']);
    }

    createFrom(str: string): ConcreteString {
        return new ConcreteString(str.substr(0, this._bound));
    }

}

export interface ConcreteUnifiedMemoryAttributes {

    mem: ImmMap<string, ConcretePrimitive<any>>;

}

const ConcreteUnifiedMemoryRecord = ImmRec({

    mem: ImmMap<string, ConcretePrimitive<any>>(),

});

export class ConcreteUnifiedMemory extends ConcreteUnifiedMemoryRecord implements ConcreteUnifiedMemoryAttributes, ConcreteElement {

    constructor(mem: ImmMap<string, ConcretePrimitive<any>>) {
        super({mem: mem});
    }

    public variables(): Iterable<string> {
        return this.mem.keys();
    }

    public getValue(variable: string): ConcretePrimitive<any> {
        return this.mem.get(variable);
    }

    public getPrimitiveValue(variable: string): (number | boolean | string | (number | boolean | string)[]) {
        return this.mem.get(variable).value;
    }

    public withValue(forVariable: string, value: ConcretePrimitive<any>): ConcreteUnifiedMemory {
       return new ConcreteUnifiedMemory(this.mem.set(forVariable, value));
    }

    public getSize(): number {
        return this.mem.size;
    }

    public toConcreteMemory(): ConcreteMemory {
        const integers: Map<string, ConcreteInteger> = new Map();
        const floats: Map<string, ConcreteFloat> = new Map();
        const strings: Map<string, ConcreteString> = new Map();
        const booleans: Map<string, ConcreteBoolean> = new Map();
        const lists: Map<string, ConcreteStringList> = new Map();

        for (const [name, value] of this.mem.entries()) {
            if (value instanceof ConcreteInteger) {
                integers.set(name, value);
            } else if (value instanceof ConcreteFloat) {
                floats.set(name, value);
            } else if (value instanceof ConcreteString) {
                strings.set(name, value);
            } else if (value instanceof ConcreteBoolean) {
                booleans.set(name, value);
            } else if (value instanceof ConcreteStringList) {
                lists.set(name, value);
            } else {
                throw new IllegalArgumentException();
            }
        }

        return new ConcreteMemory(ImmMap(integers), ImmMap(floats), ImmMap(strings), ImmMap(booleans), ImmMap(lists));
    }
}


export interface ConcreteMemoryStateAttributes {

    integers: ImmMap<string, ConcreteInteger>;
    floats: ImmMap<string, ConcreteFloat>;
    strings: ImmMap<string, ConcreteString>;
    booleans: ImmMap<string, ConcreteBoolean>;
    lists: ImmMap<string, ConcreteList<ConcreteString>>;

}

const ConcreteMemoryRecord = ImmRec({

    integers: ImmMap<string, ConcreteInteger>(),
    floats: ImmMap<string, ConcreteFloat>(),
    strings: ImmMap<string, ConcreteString>(),
    booleans: ImmMap<string, ConcreteBoolean>(),
    lists: ImmMap<string, ConcreteStringList>()

});

export class ConcreteMemory extends ConcreteMemoryRecord implements ConcreteMemoryStateAttributes, ConcreteElement, AbstractState, AbstractBoolean, AbstractMemory {

    constructor(integerMem: ImmMap<string, ConcreteInteger>,
                floatMem: ImmMap<string, ConcreteFloat>,
                stringMem: ImmMap<string, ConcreteString>,
                booleanMem: ImmMap<string, ConcreteBoolean>,
                listMem: ImmMap<string, ConcreteList<ConcreteString>>) {
        super({integers: integerMem, floats: floatMem, strings: stringMem, booleans: booleanMem, lists: listMem});
    }

    public accept<R>(visitor: AbstractElementVisitor<R>): R {
        const visitMethod: string = `visit${this.constructor.name}`;
        if (visitor[visitMethod]) {
            return visitor[visitMethod](this);
        } else {
            return visitor.visit(this);
        }
    }

    public getIntegers(): ImmMap<string, ConcreteInteger> {
        return this.integers;
    }

    public getFloats(): ImmMap<string, ConcreteFloat> {
        return this.floats;
    }

    public getStrings(): ImmMap<string, ConcreteString> {
        return this.strings;
    }

    public getBooleans(): ImmMap<string, ConcreteBoolean> {
        return this.booleans;
    }

    public getLists(): ImmMap<string, ConcreteStringList> {
        return this.lists;
    }

    public withIntegers(value: ImmMap<string, ConcreteInteger>): ConcreteMemory {
        return this.set('integers', value);
    }

    public withFloats(value: ImmMap<string, ConcreteFloat>): ConcreteMemory {
        return this.set('floats', value);
    }

    public withStrings(value: ImmMap<string, ConcreteString>): ConcreteMemory {
        return this.set('strings', value);
    }

    public withBooleans(value: ImmMap<string, ConcreteBoolean>): ConcreteMemory {
        return this.set('booleans', value);
    }

    public withLists(value: ImmMap<string, ConcreteList<ConcreteString>>): ConcreteMemory {
        return this.set('lists', value);
    }

    getPrimitiveAttributeByName(name: string): ConcretePrimitive<any> {
        return this.integers.get(name)
            || this.strings.get(name)
            || this.booleans.get(name)
            || this.lists.get(name);
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

export abstract class FlatLattice<T extends ConcreteElement> implements Lattice<T> {

    private readonly _top: T;

    private readonly _bottom: T;

    constructor(top: T, bottom: T) {
        this._top = Preconditions.checkNotUndefined(top);
        this._bottom = Preconditions.checkNotUndefined(bottom);
    }

    bottom(): T {
        return this._bottom;
    }

    top(): T {
        return this._top;
    }

    isIncluded(element1: T, element2: T): boolean {
        if (element2 === this._top) {
            return true;
        }

        if (element1 === this._bottom) {
            return true;
        }

        return element1.equals(element2);
    }

    join(element1: T, element2: T): T {
        if (element1.equals(element2)) {
            return element1;
        }

        return this._top;
    }

    meet(element1: T, element2: T): T {
        if (element1.equals(element2)) {
            return element1;
        }

        return this._bottom;
    }
}

export class FlatIntegerLattice extends FlatLattice<ConcreteInteger> {

    constructor() {
        const top = new ConcreteInteger(1234567890);
        const bottom = new ConcreteInteger(-123456789);
        super(top, bottom);
    }

}

export class FlatFloatLattice extends FlatLattice<ConcreteFloat> {

    constructor() {
        const top = new ConcreteFloat(Math.PI);
        const bottom = new ConcreteFloat(-Math.PI);
        super(top, bottom);
    }

}

export class FlatBooleanLattice extends FlatLattice<ConcreteBoolean> {

    constructor() {
        const top = new ConcreteBoolean(true);
        const bottom = new ConcreteBoolean(false);
        super(top, bottom);
    }

}

export class FlatStringLattice extends FlatLattice<ConcreteString> {

    constructor() {
        const top = new ConcreteString("");
        const bottom = new ConcreteString("");
        super(top, bottom);
    }

}

export class FlatStringListLattice extends FlatLattice<ConcreteStringList> {

    constructor() {
        const stringLattice = new FlatStringLattice();
        const top = new ConcreteStringList([stringLattice.top()]);
        const bottom = new ConcreteStringList([stringLattice.bottom()]);
        super(top, bottom);
    }

}

export class ConcreteMemoryLattice implements Lattice<ConcreteMemory> {

    private readonly _bottom: ConcreteMemory;

    private readonly _top: ConcreteMemory;

    private readonly _integerLattice: Lattice<ConcreteInteger>;

    private readonly _floatLattice: Lattice<ConcreteFloat>;

    private readonly _booleanLattice: Lattice<ConcreteBoolean>;

    private readonly _stringLattice: Lattice<ConcreteString>;

    private readonly _listLattice: Lattice<ConcreteList<ConcreteString>>;

    constructor() {
        this._integerLattice = new FlatIntegerLattice();
        this._floatLattice = new FlatFloatLattice();
        this._booleanLattice = new FlatBooleanLattice();
        this._stringLattice = new FlatStringLattice();
        this._listLattice = new FlatStringListLattice();
        this._bottom = new ConcreteMemory(ImmMap(), ImmMap(), ImmMap(), ImmMap(), ImmMap());
        this._top = new ConcreteMemory(
            ImmMap([['*', this._integerLattice.top()]]),
            ImmMap([['*', this._floatLattice.top()]]),
            ImmMap([['*', this._stringLattice.top()]]),
            ImmMap([['*', this._booleanLattice.top()]]),
            ImmMap([['*', this._listLattice.top()]]));
    }

    bottom(): ConcreteMemory {
        return this._bottom;
    }

    isIncluded(element1: ConcreteMemory, element2: ConcreteMemory): boolean {
        if (element2 === this._top) {
            return true;
        }

        if (element1 === this._bottom) {
            return true;
        }

        if (element2 === this._bottom) {
            return element1 === this._bottom;
        }

        return containsAll(element1.integers, element2.integers)
            && containsAll(element1.floats, element2.floats)
            && containsAll(element1.strings, element2.strings)
            && containsAll(element1.booleans, element2.booleans)
            && containsAll(element1.lists, element2.lists);
    }

    join(element1: ConcreteMemory, element2: ConcreteMemory): ConcreteMemory {
        if (element2 === this._top || element1 === this._top) {
            return this._top;
        }

        if (element1 === this._bottom) {
            return element2;
        }

        if (element2 === this._bottom) {
            return element1;
        }

        return element1.withBooleans(joinMaps(element1.booleans, element2.booleans))
            .withIntegers(joinMaps(element1.integers, element2.integers))
            .withFloats(joinMaps(element1.floats, element2.floats))
            .withStrings(joinMaps(element1.strings, element2.strings))
            .withLists(joinMaps(element1.lists, element2.lists));
    }

    meet(element1: ConcreteMemory, element2: ConcreteMemory): ConcreteMemory {
        throw new ImplementMeException();
    }

    top(): ConcreteMemory {
        return this._top;
    }

}

