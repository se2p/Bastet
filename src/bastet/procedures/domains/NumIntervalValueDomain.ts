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

import {AbstractDomain, AbstractionPrecision} from "./AbstractDomain";
import {AbstractElement, Lattice} from "../../lattices/Lattice";
import {Map as ImmMap, Record as ImmRec} from "immutable";
import {ConcreteDomain, ConcreteElementFactory, ConcreteNumber, ConcreteNumberOrderLattice} from "./ConcreteElements";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {Preconditions} from "../../utils/Preconditions";

export interface NumIntervalValue extends AbstractElement {

    minValue: ConcreteNumber;
    maxValue: ConcreteNumber;

}

const NumIntervalValueRecord = ImmRec({

    minValue: ConcreteElementFactory.concreteNumberFrom(0),
    maxValue: ConcreteElementFactory.concreteNumberFrom(0)

});

export class NumIntervalValueImpl extends NumIntervalValueRecord implements NumIntervalValue {

    constructor(min: ConcreteNumber, max: ConcreteNumber) {
        super({minValue: min, maxValue: max});
    }

    get minValue(): ConcreteNumber {
        return this.get('minValue');
    }

    get maxValue(): ConcreteNumber {
        return this.get('maxValue');
    }
}

export class NumIntervalLattice implements Lattice<NumIntervalValue> {

    private readonly _concreteElementLattice: ConcreteNumberOrderLattice;

    constructor() {
        this._concreteElementLattice = new ConcreteNumberOrderLattice(
            new ConcreteNumber(Number.NEGATIVE_INFINITY),
            new ConcreteNumber(Number.POSITIVE_INFINITY));
    }

    bottom(): NumIntervalValue {
        throw new ImplementMeException();
    }

    isIncluded(element1: NumIntervalValue, element2: NumIntervalValue): boolean {
        if (element1.minValue.value >= element2.minValue.value) {
            if (element1.maxValue.value <= element2.maxValue.value) {
                return true;
            }
        }
        return false;
    }

    join(element1: NumIntervalValue, element2: NumIntervalValue): NumIntervalValue {
        throw new ImplementMeException();
    }

    meet(element1: NumIntervalValue, element2: NumIntervalValue): NumIntervalValue {
        throw new ImplementMeException();
    }

    top(): NumIntervalValue {
        throw new ImplementMeException();
    }

    get concreteElementLattice(): ConcreteNumberOrderLattice {
        return this._concreteElementLattice;
    }
}

export class NumIntervalValueDomain implements AbstractDomain<ConcreteNumber, NumIntervalValue> {

    private readonly _lattice: NumIntervalLattice;
    private readonly _concreteDomain: ConcreteDomain<ConcreteNumber>;
    private readonly _concreteValuelattice: Lattice<ConcreteNumber>;

    constructor(concreteDomain: ConcreteDomain<ConcreteNumber>) {
        this._lattice = new NumIntervalLattice();
        this._concreteDomain = Preconditions.checkNotUndefined(concreteDomain);
        this._concreteValuelattice = this._lattice.concreteElementLattice;
    }

    abstract(elements: Iterable<ConcreteNumber>): NumIntervalValue {
        let minElement: ConcreteNumber = this._concreteValuelattice.top();
        let maxElement: ConcreteNumber = this._concreteValuelattice.bottom();
        for (const e of elements) {
            if (this._concreteValuelattice.isIncluded(e, minElement)) {
                minElement = e;
            }
            if (this._concreteValuelattice.isIncluded(maxElement, e)) {
                maxElement = e;
            }
        }
        return new NumIntervalValueImpl(minElement, maxElement);
    }

    concretize(element: NumIntervalValue): Iterable<ConcreteNumber> {
        throw new ImplementMeException();
    }

    widen(element: NumIntervalValue, precision: AbstractionPrecision): NumIntervalValue {
        throw new ImplementMeException();
    }

    get lattice(): Lattice<NumIntervalValue> {
        return this._lattice;
    }

    get concreteDomain(): ConcreteDomain<ConcreteNumber> {
        return this._concreteDomain;
    }

}
