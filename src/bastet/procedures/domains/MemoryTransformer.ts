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

import {Preconditions} from "../../utils/Preconditions";
import {Identifier} from "../../syntax/ast/core/Identifier";
import {BooleanType, NumberType, ScratchType, StringType} from "../../syntax/ast/core/ScratchType";
import {AbstractMemory} from "../analyses/mem/MemAbstractDomain";
import {ConcreteBoolean, ConcreteNumber, ConcreteString} from "./ConcreteElements";

export abstract class AbstractValue {

}

export class AbstractString extends AbstractValue {

}


export class AbstractBoolean extends AbstractValue {

}

export class AbstractNumber extends AbstractValue {

}

export class IdentifiableMemoryCell {

    private readonly _type: ScratchType;
    private readonly _name: string;

    constructor(type: ScratchType, name: string) {
        this._type = type;
        this._name = name;
    }

    get type(): ScratchType {
        return this._type;
    }

    get name(): string {
        return this._name;
    }
}


export class AbstractList {

}

export class AbstractMap {

}

export class BooleanVariable extends IdentifiableMemoryCell {

    constructor(name: string) {
        super(BooleanType.instance(), name);
    }
}

export class StringVariable extends IdentifiableMemoryCell {

    constructor(name: string) {
        super(StringType.instance(), name);
    }
}

export class NumberVariable extends IdentifiableMemoryCell {

    constructor(name: string) {
        super(NumberType.instance(), name);
    }
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

    assignBoolean(assignTo: BooleanVariable, b: AbstractBoolean): AbstractMemory;

    assignAnd(assignTo: BooleanVariable, b1: AbstractBoolean, b2: AbstractBoolean): AbstractMemory;

    assignOr(assignTo: BooleanVariable, b1: AbstractBoolean, b2: AbstractBoolean): AbstractMemory;

    assignNot(assignTo: BooleanVariable, b1: AbstractBoolean): AbstractMemory;


    /** Boolean Assumes */

    assumeTrue(boolVar: BooleanVariable): AbstractMemory;

    assumeFalse(boolVar: BooleanVariable): AbstractMemory;

    assumeTruth(boolVal: AbstractBoolean): AbstractMemory;


    /** Strings */

    assignString(assignTo: StringVariable, b: AbstractString): AbstractMemory;

    assignJoinedStrings(assignTo: StringVariable, s1: AbstractString, s2: AbstractString): AbstractMemory;

    assignIthLetterOf(assignTo: StringVariable, index: AbstractNumber, str: AbstractString): AbstractMemory;


    /** Strings --> Boolean */

    assignStringGreaterThan(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): AbstractMemory;

    assignIsStringLessThan(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): AbstractMemory;

    assignIsStringEqualTo(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): AbstractMemory;

    assignIsStringContained(assignTo: BooleanVariable, s: AbstractString, containedIn: AbstractString): AbstractMemory;


    /** Numbers */

    assignNumber(assignTo: NumberVariable, b: AbstractNumber): AbstractMemory;

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

export abstract class MemoryTransformer<M extends AbstractMemory> implements MemoryTheory {

    protected readonly _state: M;

    constructor(state: M) {
        this._state = Preconditions.checkNotUndefined(state);
    }

    abstract assignAnd(assignTo: BooleanVariable, b1: AbstractBoolean, b2: AbstractBoolean): AbstractMemory;

    abstract assignBoolean(assignTo: BooleanVariable, b: AbstractBoolean): AbstractMemory;

    abstract assignDivide(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory;

    abstract assignIsNumberEqualTo(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): AbstractMemory;

    abstract assignIsNumberLessThan(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): AbstractMemory;

    abstract assignIsStringContained(assignTo: BooleanVariable, s: AbstractString, containedIn: AbstractString): AbstractMemory;

    abstract assignIsStringEqualTo(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): AbstractMemory;

    abstract assignIsStringLessThan(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): AbstractMemory;

    abstract assignIthLetterOf(assignTo: StringVariable, index: AbstractNumber, str: AbstractString): AbstractMemory;

    abstract assignJoinedStrings(assignTo: StringVariable, s1: AbstractString, s2: AbstractString): AbstractMemory;

    abstract assignMinus(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory;

    abstract assignModulo(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory;

    abstract assignMultiply(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory;

    abstract assignNot(assignTo: BooleanVariable, b1: AbstractBoolean): AbstractMemory;

    abstract assignNumber(assignTo: NumberVariable, b: AbstractNumber): AbstractMemory;

    abstract assignNumberGreaterThan(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): AbstractMemory;

    abstract assignOr(assignTo: BooleanVariable, b1: AbstractBoolean, b2: AbstractBoolean): AbstractMemory;

    abstract assignPlus(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): AbstractMemory;

    abstract assignString(assignTo: StringVariable, b: AbstractString): AbstractMemory;

    abstract assignStringGreaterThan(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): AbstractMemory;

    abstract assumeFalse(boolVar: BooleanVariable): AbstractMemory;

    abstract assumeTrue(boolVar: BooleanVariable): AbstractMemory;

    abstract assumeTruth(boolVal: AbstractBoolean): AbstractMemory;

    abstract declareVariable(id: Identifier, type: ScratchType): AbstractMemory;

    abstract freeVariable(id: Identifier): AbstractMemory;

    abstract getBooleanVariable(id: Identifier): BooleanVariable;

    abstract getListVariable(id: Identifier): ListVariable;

    abstract getMapVariable(id: Identifier): MapVariable;

    abstract getNumberVariable(id: Identifier): NumberVariable;

    abstract getStringVariable(id: Identifier): StringVariable;

    abstract queryAbstractBoolean(id: BooleanVariable): AbstractBoolean;

    abstract queryAbstractList(id: ListVariable): AbstractList;

    abstract queryAbstractMap(id: MapVariable): AbstractMap;

    abstract queryAbstractNumber(id: NumberVariable): AbstractNumber;

    abstract queryAbstractString(id: StringVariable): AbstractString;

}
