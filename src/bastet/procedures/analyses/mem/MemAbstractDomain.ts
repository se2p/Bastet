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
import {ScratchType} from "../../../syntax/ast/core/ScratchType";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {AbstractDomain, AbstractionPrecision, ConcreteElement} from "../AbstractDomain";
import {Identifier} from "../../../syntax/ast/core/Identifier";

/**
 * Separated by type, similar to the variables in the
 * different background theories of a solver.
 */
export interface MemAbstractState extends AbstractElement {

    types: ImmMap<string, ScratchType>;

    numData: ImmMap<string, AbstractElement>;

    boolData: ImmMap<string, AbstractElement>;

    stringData: ImmMap<string, AbstractElement>;

    listData: ImmMap<string, AbstractElement>;

}

const MemAbstractStateRecord = ImmRec({

    types: ImmMap({}),
    numData: ImmMap({}),
    boolData: ImmMap({}),
    stringData: ImmMap({}),
    listData: ImmMap({}),

});

export class MemAbstractStateImpl extends MemAbstractStateRecord implements MemAbstractState {

    types: ImmMap<string, ScratchType>;
    numData: ImmMap<string, AbstractElement>;
    boolData: ImmMap<string, AbstractElement>;
    stringData: ImmMap<string, AbstractElement>;
    listData: ImmMap<string, AbstractElement>;

    constructor(args: any = {}) {
        super(Object.assign({}, args, {}));
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

    public static builder(baseState: MemAbstractState): MemAbstractStateBuilder {
       return new MemAbstractStateBuilder(baseState);
    }

}

export class AbstractString {

}

export class ConcreteString {

}

export class AbstractBoolean {

}

export class ConcreteBoolean {

}

export class AbstractNumber {

}

export class ConcreteNumber {

}

export interface StringTheory {

    fromConcreteString(str: ConcreteString): AbstractString;

    abstractStringValue(id: Identifier): AbstractString;

    emptyString(): AbstractString;

    topString(): AbstractString;

    bottomString(): AbstractString;

    lengthOf(str: AbstractString): AbstractNumber;

    castNumberAsString(num: AbstractNumber): AbstractString;

    castBoolAsString(num: AbstractBoolean): AbstractString;

    joinStrings(str1: AbstractString, str2: AbstractString): AbstractString;

    ithLetterOf(index: AbstractNumber, str: AbstractString): AbstractString;

}

export interface RationalNumberTheory {

    fromConcreteNumber(str: ConcreteNumber): AbstractNumber;

    abstractNumberValue(id: Identifier): AbstractNumber;

    zero(): AbstractNumber;

    one(): AbstractNumber;

    topNumber(): AbstractNumber;

    bottomNumber(): AbstractNumber;

    castStringAsNumber(str: AbstractString): AbstractNumber;

    castBoolAsNumber(val: AbstractBoolean): AbstractNumber;

    multiply(op1: AbstractNumber, op2: AbstractNumber): AbstractNumber;

    divide(op1: AbstractNumber, op2: AbstractNumber): AbstractNumber;

    modulo(op1: AbstractNumber, op2: AbstractNumber): AbstractNumber;

    plus(op1: AbstractNumber, op2: AbstractNumber): AbstractNumber;

    minus(op1: AbstractNumber, op2: AbstractNumber): AbstractNumber;

}

export interface BooleanTheory {

    fromConcreteBoolean(str: ConcreteBoolean): AbstractBoolean;

    abstractBooleanValue(id: Identifier): AbstractBoolean;

    falseBool(): AbstractBoolean;

    trueBool(): AbstractBoolean;

    topBoolean(): AbstractBoolean;

    bottomBoolean(): AbstractBoolean;

    not(op1: AbstractBoolean): AbstractBoolean;

    and(op1: AbstractBoolean, op2: AbstractBoolean): AbstractBoolean;

    or(op1: AbstractBoolean, op2: AbstractBoolean): AbstractBoolean;

}

export class MemAbstractStateBuilder {

    private _state: MemAbstractState;

    constructor(base: MemAbstractState) {
        this._state = Preconditions.checkNotUndefined(base);
    }

    public declare(ident: string, type: ScratchType): this {
        throw new ImplementMeException();
    }

    public assignAbstractValue(ident: string, value: AbstractElement): this {
        const type: ScratchType = this._state.types.get(ident);
        if (!type) {
            throw new IllegalArgumentException(`Type of variable ${ident} is unknown!`);
        }
        throw new ImplementMeException();
    }

    public assignAbstractNumValue(ident: string, value: AbstractElement): this {
        throw new ImplementMeException();
    }

    public assignAbstractBoolValue(ident: string, value: AbstractElement): this {
        throw new ImplementMeException();
    }

    public assignAbstractStringValue(ident: string, value: AbstractElement): this {
        throw new ImplementMeException();
    }

    public assignAbstractListValue(ident: string, value: AbstractElement): this {
        throw new ImplementMeException();
    }

    public free(ident: string): this {
        throw new ImplementMeException();
    }

    public build(): MemAbstractState {
        return this._state;
    }

}

export class TypePartitionedMapLattice implements Lattice<MemAbstractState> {

    private readonly _numLattice: Lattice<AbstractElement>;

    private readonly _boolLattice: Lattice<AbstractElement>;

    private readonly _stringLattice: Lattice<AbstractElement>;

    private readonly _listLattice: Lattice<AbstractElement>;

    private readonly _mapLattice: Lattice<AbstractElement>;

    constructor(numLattice: Lattice<AbstractElement>, boolLattice: Lattice<AbstractElement>,
                stringLattice: Lattice<AbstractElement>, listLattice: Lattice<AbstractElement>,
                mapLattice: Lattice<AbstractElement>) {
        this._numLattice = Preconditions.checkNotUndefined(numLattice);
        this._boolLattice = Preconditions.checkNotUndefined(boolLattice);
        this._stringLattice = Preconditions.checkNotUndefined(stringLattice);
        this._listLattice = Preconditions.checkNotUndefined(listLattice);
        this._mapLattice = Preconditions.checkNotUndefined(mapLattice);
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

export class MemAbstractDomain implements AbstractDomain<MemAbstractState> {

    private readonly _lattice: Lattice<MemAbstractState>;

    private readonly _numDomain: AbstractDomain<AbstractElement>;

    private readonly _boolDomain: AbstractDomain<AbstractElement>;

    private readonly _stringDomain: AbstractDomain<AbstractElement>;

    private readonly _listDomain: AbstractDomain<AbstractElement>;

    private readonly _mapDomain: AbstractDomain<AbstractElement>;

    constructor(numDomain: AbstractDomain<AbstractElement>, boolDomain: AbstractDomain<AbstractElement>,
                stringDomain: AbstractDomain<AbstractElement>, listDomain: AbstractDomain<AbstractElement>,
                mapDomain: AbstractDomain<AbstractElement>) {
        this._numDomain = Preconditions.checkNotUndefined(numDomain);
        this._boolDomain = Preconditions.checkNotUndefined(boolDomain);
        this._stringDomain = Preconditions.checkNotUndefined(stringDomain);
        this._listDomain = Preconditions.checkNotUndefined(listDomain);
        this._mapDomain = Preconditions.checkNotUndefined(mapDomain);
        this._lattice = new TypePartitionedMapLattice(numDomain.lattice,
            boolDomain.lattice, stringDomain.lattice, listDomain.lattice,
            mapDomain.lattice);
    }

    abstract(elements: Iterable<ConcreteElement>): MemAbstractState {
        return undefined;
    }

    concretize(element: MemAbstractState): Iterable<ConcreteElement> {
        return undefined;
    }

    widen(element: MemAbstractState, precision: AbstractionPrecision): MemAbstractState {
        return undefined;
    }

    get lattice(): Lattice<MemAbstractState> {
        return this._lattice;
    }

}


