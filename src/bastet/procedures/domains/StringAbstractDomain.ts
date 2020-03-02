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
import {ConcreteDomain, ConcreteString} from "./ConcreteElements";
import {
    AbstractBoolean,
    AbstractNumber,
    AbstractString,
    AbstractStringDomain,
    BooleanTheory,
    RationalNumberTheory,
    StringTheory
} from "./MemoryTransformer";
import {Lattice} from "../../lattices/Lattice";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {Preconditions} from "../../utils/Preconditions";
import {Variable} from "../../syntax/ast/core/Variable";

export class AbstractStringLattice implements Lattice<AbstractString> {

    bottom(): AbstractString {
        throw new ImplementMeException();
    }

    isIncluded(element1: AbstractString, element2: AbstractString): boolean {
        return false;
    }

    join(element1: AbstractString, element2: AbstractString): AbstractString {
        throw new ImplementMeException();
    }

    meet(element1: AbstractString, element2: AbstractString): AbstractString {
        throw new ImplementMeException();
    }

    top(): AbstractString {
        throw new ImplementMeException();
    }

}

export class OurStringTheory implements StringTheory<AbstractString, AbstractBoolean, AbstractNumber> {

    private readonly _dom: AbstractStringDomain;
    private readonly _boolTheory: BooleanTheory<AbstractBoolean>;
    private readonly _numTheory: RationalNumberTheory<AbstractNumber, AbstractBoolean>;

    constructor(dom: AbstractStringDomain, boolTheory: BooleanTheory<AbstractBoolean>, numTheory: RationalNumberTheory<AbstractNumber, AbstractBoolean>) {
        this._dom = Preconditions.checkNotUndefined(dom);
        this._boolTheory = Preconditions.checkNotUndefined(boolTheory);
        this._numTheory = Preconditions.checkNotUndefined(numTheory);
    }

    abstractStringValue(id: Variable): AbstractString {
        throw new ImplementMeException();
    }

    bottomString(): AbstractString {
        throw new ImplementMeException();
    }

    castBoolAsString(num: AbstractBoolean): AbstractString {
        throw new ImplementMeException();
    }

    castNumberAsString(num: AbstractNumber): AbstractString {
        throw new ImplementMeException();
    }

    emptyString(): AbstractString {
        throw new ImplementMeException();
    }

    fromConcreteString(str: ConcreteString): AbstractString {
        throw new ImplementMeException();
    }

    ithLetterOf(index: AbstractNumber, str: AbstractString): AbstractString {
        throw new ImplementMeException();
    }

    joinStrings(str1: AbstractString, str2: AbstractString): AbstractString {
        throw new ImplementMeException();
    }

    lengthOf(str: AbstractString): AbstractNumber {
        throw new ImplementMeException();
    }

    topString(): AbstractString {
        throw new ImplementMeException();
    }

    stringContains(str1: AbstractString, str2: AbstractString): AbstractBoolean {
        throw new ImplementMeException();
    }

    stringsEqual(str1: AbstractString, str2: AbstractString): AbstractBoolean {
        throw new ImplementMeException();
    }

}

export class StringAbstractDomain implements AbstractStringDomain {

    private readonly _concreteDomain: ConcreteDomain<ConcreteString>;
    private readonly _lattice: Lattice<AbstractString>;

    constructor(concreteDomain: ConcreteDomain<ConcreteString>) {
        this._concreteDomain = Preconditions.checkNotUndefined(concreteDomain);
        this._lattice = new AbstractStringLattice();
    }

    abstract(elements: Iterable<ConcreteString>): AbstractString {
        throw new ImplementMeException();
    }

    concretize(element: AbstractString): Iterable<ConcreteString> {
        throw new ImplementMeException();
    }

    widen(element: AbstractString, precision: AbstractionPrecision): AbstractString {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<ConcreteString> {
        return this._concreteDomain;
    }

    get lattice(): Lattice<AbstractString> {
        return this._lattice;
    }

}
