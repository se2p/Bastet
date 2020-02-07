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
import {ConcreteDomain, ConcreteString} from "./ConcreteElements";
import {
    AbstractBoolean,
    AbstractNumber,
    AbstractString,
    AbstractStringDomain,
    BooleanTheory, RationalNumberTheory,
    StringTheory
} from "./MemoryTransformer";
import {Lattice} from "../../lattices/Lattice";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {Preconditions} from "../../utils/Preconditions";
import {Identifier} from "../../syntax/ast/core/Identifier";

export class AbstractStringLattice implements Lattice<AbstractString> {

    bottom(): AbstractString {
        return undefined;
    }

    isIncluded(element1: AbstractString, element2: AbstractString): boolean {
        return false;
    }

    join(element1: AbstractString, element2: AbstractString): AbstractString {
        return undefined;
    }

    meet(element1: AbstractString, element2: AbstractString): AbstractString {
        return undefined;
    }

    top(): AbstractString {
        return undefined;
    }

}

export class OurStringTheory implements StringTheory {

    private readonly _dom: AbstractStringDomain;
    private readonly _boolTheory: BooleanTheory;
    private readonly _numTheory: RationalNumberTheory<AbstractNumber>;

    constructor(dom: AbstractStringDomain, boolTheory: BooleanTheory, numTheory: RationalNumberTheory<AbstractNumber>) {
        this._dom = Preconditions.checkNotUndefined(dom);
        this._boolTheory = Preconditions.checkNotUndefined(boolTheory);
        this._numTheory = Preconditions.checkNotUndefined(numTheory);
    }

    abstractStringValue(id: Identifier): AbstractString {
        return undefined;
    }

    bottomString(): AbstractString {
        return undefined;
    }

    castBoolAsString(num: AbstractBoolean): AbstractString {
        return undefined;
    }

    castNumberAsString(num: AbstractNumber): AbstractString {
        return undefined;
    }

    emptyString(): AbstractString {
        return undefined;
    }

    fromConcreteString(str: ConcreteString): AbstractString {
        return undefined;
    }

    ithLetterOf(index: AbstractNumber, str: AbstractString): AbstractString {
        return undefined;
    }

    joinStrings(str1: AbstractString, str2: AbstractString): AbstractString {
        return undefined;
    }

    lengthOf(str: AbstractString): AbstractNumber {
        return undefined;
    }

    topString(): AbstractString {
        return undefined;
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

    getTheory(): StringTheory {
        throw new ImplementMeException();
    }

}
