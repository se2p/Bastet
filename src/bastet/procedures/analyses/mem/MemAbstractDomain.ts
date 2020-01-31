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
import {Record as ImmRec, Map as ImmMap} from "immutable"
import {ScratchType, ScratchTypeID} from "../../../syntax/ast/core/ScratchType";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {AbstractDomain, AbstractionPrecision} from "../../domains/AbstractDomain";
import {CNFFormula} from "../../../utils/ConjunctiveNormalForm";
import {ConcreteElement, ConcreteMemory} from "../../domains/ConcreteElements";
import {AbstractBoolean, AbstractList, AbstractNumber, AbstractString} from "../../domains/MemoryTransformer";

export type AbstractMemory = MemAbstractState;

/**
 * Separated by type, similar to the variables in the
 * different background theories of a solver.
 */
export interface MemAbstractState extends AbstractElement {

    /** All declared variables and their types */
    types: ImmMap<string, ScratchTypeID>;

    /** Explicit abstract *number* values of particular variables */
    numData: ImmMap<string, AbstractElement>;

    /** Explicit abstract *boolean* values of particular variables */
    boolData: ImmMap<string, AbstractElement>;

    /** Explicit abstract *string* values of particular variables */
    stringData: ImmMap<string, AbstractElement>;

    /** Explicit abstract *list* values of particular variables */
    listData: ImmMap<string, AbstractElement>;

    /** Constraints on the state (a formula in predicate logic) */
    constraint: CNFFormula;

}

const MemAbstractStateRecord = ImmRec({

    types: ImmMap({}),
    numData: ImmMap({}),
    boolData: ImmMap({}),
    stringData: ImmMap({}),
    listData: ImmMap({}),
    constraint: new CNFFormula({})

});

export class MemAbstractStateImpl extends MemAbstractStateRecord implements MemAbstractState {

    types: ImmMap<string, ScratchTypeID>;
    numData: ImmMap<string, AbstractNumber>;
    boolData: ImmMap<string, AbstractBoolean>;
    stringData: ImmMap<string, AbstractString>;
    listData: ImmMap<string, AbstractList>;
    constraint: CNFFormula;

    constructor(args: any = {}) {
        super(Object.assign({}, args, {}));
    }

    public withString(ident: string, value: AbstractString): MemAbstractStateImpl {
        return this.set('stringData', this.stringData.set(ident, value));
    }

    public withBool(ident: string, value: AbstractBoolean): MemAbstractStateImpl {
        return this.set('boolData', this.boolData.set(ident, value));
    }

    public withNum(ident: string, value: AbstractNumber): MemAbstractStateImpl {
        return this.set('numData', this.numData.set(ident, value));
    }

    public withList(ident: string, value: AbstractList): MemAbstractStateImpl {
        return this.set('listData', this.listData.set(ident, value));
    }

    public withConstraint(constr: CNFFormula): MemAbstractStateImpl {
        return this.set('constraint', constr);
    }

    public getString(ident: string): AbstractString {
        return this.stringData.get(ident);
    }

    public getBool(ident: string): AbstractBoolean {
        return this.boolData.get(ident);
    }

    public getNum(ident: string): AbstractNumber {
        return this.numData.get(ident);
    }

    public getList(ident: string): AbstractList {
        return this.listData.get(ident);
    }

    public declare(ident: string, type: ScratchType) {
        return this.set('types', this.types.set(ident, type.typeId));
    }

    public free(ident: string) {
        let result = this.set('types', this.types.remove(ident));
        // TODO: Also remove the values
        return result;
    }

}

export class MemAbstractStates {

    private static EMPTY: MemAbstractState;

    public static empty(): MemAbstractState {
        if (!MemAbstractStates.EMPTY) {
            MemAbstractStates.EMPTY = new MemAbstractStateImpl({});
        }
        return MemAbstractStates.EMPTY;
    }

}

export class TypePartitionedMapLattice implements Lattice<MemAbstractState> {

    private readonly _numLattice: Lattice<AbstractElement>;

    private readonly _boolLattice: Lattice<AbstractElement>;

    private readonly _stringLattice: Lattice<AbstractElement>;

    private readonly _listLattice: Lattice<AbstractElement>;

    constructor(numLattice: Lattice<AbstractElement>, boolLattice: Lattice<AbstractElement>,
                stringLattice: Lattice<AbstractElement>, listLattice: Lattice<AbstractElement>) {
        this._numLattice = Preconditions.checkNotUndefined(numLattice);
        this._boolLattice = Preconditions.checkNotUndefined(boolLattice);
        this._stringLattice = Preconditions.checkNotUndefined(stringLattice);
        this._listLattice = Preconditions.checkNotUndefined(listLattice);
    }

    bottom(): MemAbstractState {
        throw new ImplementMeException();
    }

    isIncluded(element1: MemAbstractState, element2: MemAbstractState): boolean {
        throw new ImplementMeException();
    }

    join(element1: MemAbstractState, element2: MemAbstractState): MemAbstractState {
        throw new ImplementMeException();
    }

    meet(element1: MemAbstractState, element2: MemAbstractState): MemAbstractState {
        throw new ImplementMeException();
    }

    top(): MemAbstractState {
        throw new ImplementMeException();
    }

}

export class MemAbstractDomain implements AbstractDomain<ConcreteMemory, AbstractMemory> {

    private readonly _lattice: Lattice<MemAbstractState>;

    private readonly _numDomain: AbstractDomain<ConcreteElement, AbstractElement>;

    private readonly _boolDomain: AbstractDomain<ConcreteElement, AbstractElement>;

    private readonly _stringDomain: AbstractDomain<ConcreteElement, AbstractElement>;

    private readonly _listDomain: AbstractDomain<ConcreteElement, AbstractElement>;

    constructor(numDomain: AbstractDomain<ConcreteElement, AbstractElement>,
                boolDomain: AbstractDomain<ConcreteElement, AbstractElement>,
                stringDomain: AbstractDomain<ConcreteElement, AbstractElement>,
                listDomain: AbstractDomain<ConcreteElement, AbstractElement>) {
        this._numDomain = Preconditions.checkNotUndefined(numDomain);
        this._boolDomain = Preconditions.checkNotUndefined(boolDomain);
        this._stringDomain = Preconditions.checkNotUndefined(stringDomain);
        this._listDomain = Preconditions.checkNotUndefined(listDomain);
        this._lattice = new TypePartitionedMapLattice(numDomain.lattice,
            boolDomain.lattice, stringDomain.lattice, listDomain.lattice);
    }

    abstract(elements: Iterable<ConcreteMemory>): MemAbstractState {
        throw new ImplementMeException();
    }

    concretize(element: MemAbstractState): Iterable<ConcreteMemory> {
        throw new ImplementMeException();
    }

    widen(element: MemAbstractState, precision: AbstractionPrecision): MemAbstractState {
        throw new ImplementMeException();
    }

    get lattice(): Lattice<MemAbstractState> {
        return this._lattice;
    }

}


