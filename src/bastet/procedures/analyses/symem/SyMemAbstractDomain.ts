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

import {AbstractElement, Lattice} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {Record as ImmRec, List as ImmList, Map as ImmMap} from "immutable"
import {ScratchType, ScratchTypeID} from "../../../syntax/ast/core/ScratchType";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {AbstractDomain, AbstractionPrecision} from "../../domains/AbstractDomain";
import {CNFFormula, FALSE_FORMULA, FirstOrderFormula, TRUE_FORMULA} from "../../../utils/ConjunctiveNormalForm";
import {ConcreteDomain, ConcreteElement, ConcreteMemory} from "../../domains/ConcreteElements";
import {
    AbstractBoolean,
    AbstractBooleanDomain,
    AbstractList,
    AbstractNumber,
    AbstractNumberDomain,
    AbstractString,
    AbstractStringDomain,
    AbstractStringListDomain,
    BooleanTheory,
    ListTheory,
    RationalNumberTheory,
    StringTheory
} from "../../domains/MemoryTransformer";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {PropositionalFormula} from "../../../utils/bdd/BDD";

export interface SyMemAbstractStateAttributes {

    /** All declared variables and their types */
    types: ImmMap<string, ScratchTypeID>;

    blockFormula: FirstOrderFormula;

    summaryFormula: PropositionalFormula;

}

const SyMemAbstractStateRecord = ImmRec({

    types: ImmMap({}),
    blockFormula: null,
    summaryFormula: null

});

export class SymMemAbstractState extends SyMemAbstractStateRecord implements SyMemAbstractStateAttributes {

    types: ImmMap<string, ScratchTypeID>;
    blockFormula: FirstOrderFormula;
    summaryFormula: PropositionalFormula;

    constructor(types: ImmMap<string, ScratchTypeID>,
                blockFormula: FirstOrderFormula, summaryFormula: PropositionalFormula) {
        super({blockFormula: blockFormula, summaryFormula: summaryFormula});
    }

    public withBlockFormula(value: FirstOrderFormula): SymMemAbstractState {
        return this.set('blockFormula', value);
    }

    public withSummaryFormula(value: PropositionalFormula): SymMemAbstractState {
        return this.set('summaryFormula', value);
    }

    public getType(ident: string): ScratchType {
        const typeId: ScratchTypeID = this.types.get(ident);
        if (!typeId) {
            throw new IllegalStateException(`Variable "${ident}" not declared.`);
        }
        return ScratchType.fromId(typeId);
    }

    public withDeclaration(ident: string, type: ScratchType) {
        return this.set('types', this.types.set(ident, type.typeId));
    }

    public withUndeclare(ident: string) {
        let result = this.set('types', this.types.remove(ident));
        // TODO: Also remove the values
        return result;
    }

}

export class SymMemAbstractStateLattice implements Lattice<SymMemAbstractState> {

    private readonly _bottom: SymMemAbstractState;

    private readonly _top: SymMemAbstractState;

    constructor(folLattice: Lattice<FirstOrderFormula>, propLattice: Lattice<PropositionalFormula>) {
        this._bottom = new SymMemAbstractState(ImmMap({}), folLattice.bottom(), propLattice.bottom());
        this._top = new SymMemAbstractState(ImmMap({}), folLattice.top(), propLattice.top());
    }

    bottom(): SymMemAbstractState {
        return this._bottom;
    }

    isIncluded(element1: SymMemAbstractState, element2: SymMemAbstractState): boolean {
        throw new ImplementMeException();
    }

    join(element1: SymMemAbstractState, element2: SymMemAbstractState): SymMemAbstractState {
        throw new ImplementMeException();
    }

    meet(element1: SymMemAbstractState, element2: SymMemAbstractState): SymMemAbstractState {
        throw new ImplementMeException();
    }

    top(): SymMemAbstractState {
        return this._top;
    }

}

export class SyMemAbstractDomain implements AbstractDomain<ConcreteMemory, SymMemAbstractState> {

    private readonly _lattice: Lattice<SymMemAbstractState>;

    constructor(folLattice: Lattice<FirstOrderFormula>, propLattice: Lattice<PropositionalFormula>) {
        this._lattice = new SymMemAbstractStateLattice(folLattice, propLattice);
    }

    abstract(elements: Iterable<ConcreteMemory>): SymMemAbstractState {
        throw new ImplementMeException();
    }

    concretize(element: SymMemAbstractState): Iterable<ConcreteMemory> {
        throw new ImplementMeException();
    }

    widen(element: SymMemAbstractState, precision: AbstractionPrecision): SymMemAbstractState {
        throw new ImplementMeException();
    }

    get lattice(): Lattice<SymMemAbstractState> {
        return this._lattice;
    }

    get concreteDomain(): ConcreteDomain<ConcreteMemory> {
        throw new ImplementMeException();
    }

}


