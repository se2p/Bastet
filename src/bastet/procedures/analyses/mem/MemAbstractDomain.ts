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
import {AbstractDomain, AbstractionPrecision, ConcreteElement} from "../AbstractDomain";
import {Identifier} from "../../../syntax/ast/core/Identifier";

export type AbstractMemory = MemAbstractState;

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

    public static transform(baseState: MemAbstractState): MemoryTransformer {
       return new MemoryTransformer(baseState);
    }

}

export abstract class AbstractValue {

}

export class AbstractString extends AbstractValue {

}

export class ConcreteString {

}

export class AbstractBoolean extends AbstractValue {

}

export class ConcreteBoolean {

}

export class AbstractNumber extends AbstractValue {

}

export class ConcreteNumber {

}

export class ConcreteMemory {

}

export class AbstractList {

}

export class AbstractMap {

}

export class BooleanVariable {

}

export class StringVariable {

}

export class NumberVariable {

}

export class MapVariable {

}

export class ListVariable {

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

export interface StringTheoryAssumes {

    assumeStringGreaterThan(s1: AbstractString, s2: AbstractString): AbstractString;

    assumeIsStringLessThan(s1: AbstractString, s2: AbstractString): AbstractString;

    assumeIsStringEqualTo(s1: AbstractString, s2: AbstractString): AbstractString;

    assumeIsStringContained(s: AbstractString, containedIn: AbstractString): AbstractString;

}

export interface StringTheoryQueries {

    queryIsStringGreaterThan(s1: AbstractString, s2: AbstractString): AbstractBoolean;

    queryIsStringLessThan(s1: AbstractString, s2: AbstractString): AbstractBoolean;

    queryIsStringEqualTo(s1: AbstractString, s2: AbstractString): AbstractBoolean;

    queryIsStringContained(s: AbstractString, containedIn: AbstractString): AbstractBoolean;

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

export interface MemoryTheory {

    /** Variable Declarations */

    declareVariable(id: Identifier, type: ScratchType): AbstractMemory;

    freeVariable(id: Identifier): AbstractMemory;

    getStringVariable(id: Identifier): StringVariable;

    getNumberVariable(id: Identifier): NumberVariable;

    getBooleanVariable(id: Identifier): BooleanVariable;

    getListVariable(id: Identifier): ListVariable;

    getMapVariable(id: Identifier): MapVariable;


    /** Querying Variable Values */

    queryAbstractString(id: StringVariable): AbstractString;

    queryAbstractNumber(id: NumberVariable): AbstractNumber;

    queryAbstractBoolean(id: BooleanVariable): AbstractBoolean;

    queryAbstractMap(id: MapVariable): AbstractMap;

    queryAbstractList(id: ListVariable): AbstractList;


    /** Booleans */

    assignAnd(assignTo: BooleanVariable, b1: AbstractBoolean, b2: AbstractBoolean): AbstractMemory;

    assignOr(assignTo: BooleanVariable, b1: AbstractBoolean, b2: AbstractBoolean): AbstractMemory;

    assignNot(assignTo: BooleanVariable, b1: AbstractBoolean): AbstractMemory;


    /** Boolean Assumes */

    assumeTrue(boolVar: BooleanVariable): AbstractMemory;

    assumeFalse(boolVar: BooleanVariable): AbstractMemory;


    /** Strings */

    assignJoinedStrings(assignTo: StringVariable, s1: AbstractString, s2: AbstractString): AbstractMemory;

    assignIthLetterOf(assignTo: StringVariable, index: AbstractNumber, str: AbstractString): AbstractMemory;


    /** Strings --> Boolean */

    assignStringGreaterThan(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): AbstractMemory;

    assignIsStringLessThan(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): AbstractMemory;

    assignIsStringEqualTo(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): AbstractMemory;

    assignIsStringContained(assignTo: BooleanVariable, s: AbstractString, containedIn: AbstractString): AbstractMemory;


    /** Numbers */

    assignMultiply(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory;

    assignDivide(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory;

    assignModulo(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory;

    assignPlus(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory;

    assignMinus(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory;


    /** Numbers --> Boolean */

    assignNumberGreaterThan(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): AbstractMemory;

    assignIsNumberLessThan(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): AbstractMemory;

    assignIsNumberEqualTo(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): AbstractMemory;

}

export class MemoryTransformer implements MemoryTheory {

    private readonly _state: AbstractMemory;

    constructor(state: AbstractMemory) {
        this._state = Preconditions.checkNotUndefined(state);
    }

    assignAnd(assignTo: BooleanVariable, b1: AbstractBoolean, b2: AbstractBoolean): AbstractMemory {
        return undefined;
    }

    assignDivide(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory {
        return undefined;
    }

    assignIsNumberEqualTo(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): AbstractMemory {
        return undefined;
    }

    assignIsNumberLessThan(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): AbstractMemory {
        return undefined;
    }

    assignIsStringContained(assignTo: BooleanVariable, s: AbstractString, containedIn: AbstractString): AbstractMemory {
        return undefined;
    }

    assignIsStringEqualTo(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): AbstractMemory {
        return undefined;
    }

    assignIsStringLessThan(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): AbstractMemory {
        return undefined;
    }

    assignIthLetterOf(assignTo: StringVariable, index: AbstractNumber, str: AbstractString): AbstractMemory {
        return undefined;
    }

    assignJoinedStrings(assignTo: StringVariable, s1: AbstractString, s2: AbstractString): AbstractMemory {
        return undefined;
    }

    assignMinus(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory {
        return undefined;
    }

    assignModulo(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory {
        return undefined;
    }

    assignMultiply(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory {
        return undefined;
    }

    assignNot(assignTo: BooleanVariable, b1: AbstractBoolean): AbstractMemory {
        return undefined;
    }

    assignNumberGreaterThan(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): AbstractMemory {
        return undefined;
    }

    assignOr(assignTo: BooleanVariable, b1: AbstractBoolean, b2: AbstractBoolean): AbstractMemory {
        return undefined;
    }

    assignPlus(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory {
        return undefined;
    }

    assignStringGreaterThan(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): AbstractMemory {
        return undefined;
    }

    assumeFalse(boolVar: BooleanVariable): AbstractMemory {
        return undefined;
    }

    assumeTrue(boolVar: BooleanVariable): AbstractMemory {
        return undefined;
    }

    declareVariable(id: Identifier, type: ScratchType): AbstractMemory {
        return undefined;
    }

    freeVariable(id: Identifier): AbstractMemory {
        return undefined;
    }

    getBooleanVariable(id: Identifier): BooleanVariable {
        return undefined;
    }

    getListVariable(id: Identifier): ListVariable {
        return undefined;
    }

    getMapVariable(id: Identifier): MapVariable {
        return undefined;
    }

    getNumberVariable(id: Identifier): NumberVariable {
        return undefined;
    }

    getStringVariable(id: Identifier): StringVariable {
        return undefined;
    }

    queryAbstractBoolean(id: BooleanVariable): AbstractBoolean {
        return undefined;
    }

    queryAbstractList(id: ListVariable): AbstractList {
        return undefined;
    }

    queryAbstractMap(id: MapVariable): AbstractMap {
        return undefined;
    }

    queryAbstractNumber(id: NumberVariable): AbstractNumber {
        return undefined;
    }

    queryAbstractString(id: StringVariable): AbstractString {
        return undefined;
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


