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
import {AbstractBoolean, AbstractBooleanDomain, BooleanTheory} from "./MemoryTransformer";
import {Lattice} from "../../lattices/Lattice";
import {ConcreteBoolean, ConcreteDomain} from "./ConcreteElements";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {Identifier} from "../../syntax/ast/core/Identifier";

export class FlatBoolLattice implements Lattice<AbstractBoolean> {

    bottom(): AbstractBoolean {
        throw new ImplementMeException();
    }

    isIncluded(element1: AbstractBoolean, element2: AbstractBoolean): boolean {
        throw new ImplementMeException();
    }

    join(element1: AbstractBoolean, element2: AbstractBoolean): AbstractBoolean {
        throw new ImplementMeException();
    }

    meet(element1: AbstractBoolean, element2: AbstractBoolean): AbstractBoolean {
        throw new ImplementMeException();
    }

    top(): AbstractBoolean {
        throw new ImplementMeException();
    }

}

export class FlatBooleanValueTheory implements BooleanTheory {

    private readonly _dom: FlatBooleanValueDomain;

    private readonly _true: AbstractBoolean;
    private readonly _false: AbstractBoolean;

    constructor(dom: FlatBooleanValueDomain) {
        this._dom = dom;
        this._true = this._dom.abstract([this._dom.concreteDomain.createElement({value: true})]);
        this._false = this._dom.abstract([this._dom.concreteDomain.createElement({value: false})]);
    }

    abstractBooleanValue(id: Identifier): AbstractBoolean {
        return undefined;
    }

    and(op1: AbstractBoolean, op2: AbstractBoolean): AbstractBoolean {
        return undefined;
    }

    bottomBoolean(): AbstractBoolean {
        return undefined;
    }

    falseBool(): AbstractBoolean {
        return this.falseBool();
    }

    fromConcreteBoolean(str: ConcreteBoolean): AbstractBoolean {
        return undefined;
    }

    not(op1: AbstractBoolean): AbstractBoolean {
        return undefined;
    }

    or(op1: AbstractBoolean, op2: AbstractBoolean): AbstractBoolean {
        return undefined;
    }

    topBoolean(): AbstractBoolean {
        return undefined;
    }

    trueBool(): AbstractBoolean {
        return this._true;
    }

    fromBoolean(value: boolean): AbstractBoolean {
        if (value) {
            return this.trueBool()
        } else {
            return this.falseBool();
        }
    }

}

export class FlatBooleanValueDomain implements AbstractBooleanDomain {

    private readonly _concreteDomain: ConcreteDomain<ConcreteBoolean>;
    private readonly _lattice: FlatBoolLattice;

    constructor(concreteDomain: ConcreteDomain<ConcreteBoolean>) {
        this._concreteDomain = concreteDomain;
        this._lattice = new FlatBoolLattice();
    }

    abstract(elements: Iterable<AbstractBoolean>): ConcreteBoolean {
        return undefined;
    }

    concretize(element: AbstractBoolean): Iterable<ConcreteBoolean> {
        return undefined;
    }

    widen(element: AbstractBoolean, precision: AbstractionPrecision): AbstractBoolean {
        return undefined;
    }

    get concreteDomain(): ConcreteDomain<ConcreteBoolean> {
        return this._concreteDomain;
    }

    get lattice(): Lattice<AbstractBoolean> {
        return this._lattice;
    }

    getTheory(): BooleanTheory {
        throw new ImplementMeException();
    }

}
