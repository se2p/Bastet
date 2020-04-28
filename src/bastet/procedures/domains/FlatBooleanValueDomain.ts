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


import {AbstractionPrecision} from "./AbstractDomain";
import {AbstractBoolean, AbstractBooleanDomain, BooleanTheory} from "./MemoryTransformer";
import {AbstractElement, Lattice} from "../../lattices/Lattice";
import {ConcreteBoolean, ConcreteDomain} from "./ConcreteElements";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {Record as ImmRec} from "immutable";
import {Variable} from "../../syntax/ast/core/Variable";

export class FlatBoolLattice implements Lattice<FlatBooleanValue> {

    private readonly _bottom: FlatBooleanValue;
    private readonly _top: FlatBooleanValue;

    private readonly _true: FlatBooleanValue;
    private readonly _false: FlatBooleanValue;

    constructor() {
        this._bottom = new FlatBooleanValue(false, false);
        this._top = new FlatBooleanValue(true, true);

        this._true = new FlatBooleanValue(true, false);
        this._false = new FlatBooleanValue(false, true);
    }

    bottom(): FlatBooleanValue {
        return this._bottom;
    }

    isIncluded(element1: FlatBooleanValue, element2: FlatBooleanValue): boolean {
        throw new ImplementMeException();
    }

    join(element1: FlatBooleanValue, element2: FlatBooleanValue): FlatBooleanValue {
        throw new ImplementMeException();
    }

    meet(element1: FlatBooleanValue, element2: FlatBooleanValue): FlatBooleanValue {
        throw new ImplementMeException();
    }

    top(): FlatBooleanValue {
        return this._top;
    }

    get true(): FlatBooleanValue {
        return this._true;
    }

    get false(): FlatBooleanValue {
        return this._false;
    }
}

export interface FlatBooleanValueAttributes extends AbstractBoolean {

    hasTrue: boolean;
    hasFalse: boolean;

}

const FlatBooleanValueRecord = ImmRec({

    hasTrue: false,
    hasFalse: false

});

export class FlatBooleanValue extends FlatBooleanValueRecord implements FlatBooleanValueAttributes, AbstractBoolean, AbstractElement {

    constructor(hasTrue: boolean, hasFalse: boolean) {
        super({hasTrue: hasTrue, hasFalse: hasFalse});
    }

    get hasTrue(): boolean {
        return this.get('hasTrue');
    }

    get hasFalse(): boolean {
        return this.get('hasFalse');
    }
}

export class FlatBooleanValueTheory implements BooleanTheory<FlatBooleanValue> {

    private readonly _dom: FlatBooleanValueDomain;

    private readonly _true: FlatBooleanValue;
    private readonly _false: FlatBooleanValue;
    private readonly _bottom: FlatBooleanValue;
    private readonly _top: FlatBooleanValue;

    constructor(dom: FlatBooleanValueDomain) {
        this._dom = dom;
        this._true = dom.lattice.true;
        this._false = dom.lattice.false;
        this._bottom = dom.lattice.bottom();
        this._top = dom.lattice.top();
    }

    abstractBooleanValue(id: Variable): FlatBooleanValue {
        throw new ImplementMeException();
    }

    and(op1: FlatBooleanValue, op2: FlatBooleanValue): FlatBooleanValue {
        return this._dom.lattice.meet(op1, op2);
    }

    bottomBoolean(): FlatBooleanValue {
        return this._bottom;
    }

    falseBool(): FlatBooleanValue {
        return this._false;
    }

    equal(op1: FlatBooleanValue, op2: FlatBooleanValue): FlatBooleanValue {
        throw new ImplementMeException();
    }

    fromConcreteBoolean(str: ConcreteBoolean): FlatBooleanValue {
        if (str.value) {
            return this.trueBool();
        } else {
            return this.falseBool();
        }
    }

    not(op1: FlatBooleanValue): FlatBooleanValue {
        if (op1 === this.topBoolean()) {
            return this.bottomBoolean();
        } else if (op1 === this.bottomBoolean()) {
            return this.topBoolean();
        } else if (op1 === this.trueBool()) {
            return this.falseBool();
        } else if (op1 === this.falseBool()) {
            return this.trueBool();
        }
        throw new ImplementMeException();
    }

    or(op1: FlatBooleanValue, op2: FlatBooleanValue): FlatBooleanValue {
        return this._dom.lattice.join(op1, op2);
    }

    topBoolean(): FlatBooleanValue {
        return this._top;
    }

    trueBool(): FlatBooleanValue {
        return this._true;
    }

    fromBoolean(value: boolean): FlatBooleanValue {
        if (value) {
            return this.trueBool()
        } else {
            return this.falseBool();
        }
    }

}

export class FlatBooleanValueDomain implements AbstractBooleanDomain<FlatBooleanValue> {

    private readonly _concreteDomain: ConcreteDomain<ConcreteBoolean>;
    private readonly _lattice: FlatBoolLattice;

    constructor(concreteDomain: ConcreteDomain<ConcreteBoolean>) {
        this._concreteDomain = concreteDomain;
        this._lattice = new FlatBoolLattice();
    }

    abstract(elements: Iterable<ConcreteBoolean>): FlatBooleanValue {
        throw new ImplementMeException();
    }

    concretize(element: FlatBooleanValue): Iterable<ConcreteBoolean> {
        throw new ImplementMeException();
    }

    concretizeOne(element: FlatBooleanValue): ConcreteBoolean {
        throw new ImplementMeException();
    }

    widen(element: FlatBooleanValue, precision: AbstractionPrecision): FlatBooleanValue {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<ConcreteBoolean> {
        return this._concreteDomain;
    }

    get lattice(): FlatBoolLattice {
        return this._lattice;
    }

}
