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
import {BooleanType, NumberType, ScratchType, StringType} from "../../syntax/ast/core/ScratchType";
import {ConcreteBoolean, ConcreteNumber, ConcreteString, ConcreteStringList} from "./ConcreteElements";
import {AbstractElement} from "../../lattices/Lattice";
import {AbstractDomain} from "./AbstractDomain";
import {AbstractStringList} from "./StringListAbstractDomain";
import {Variable} from "../../syntax/ast/core/Variable";

export interface AbstractValue extends AbstractElement {

}

export interface AbstractMemory extends AbstractElement {

}

export interface AbstractString extends AbstractValue {

}

export interface AbstractBoolean extends AbstractValue {

}

export interface AbstractNumber extends AbstractValue {

}

export interface AbstractFloat extends AbstractNumber {

}

export interface AbstractInteger extends AbstractNumber {

}

export interface AbstractReal extends AbstractNumber {

}

export interface AbstractList extends AbstractValue {

}

export interface AbstractMap extends AbstractValue {

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

export interface ListTheory<L extends AbstractList> {

}

export interface StringTheory<S extends AbstractString, B extends AbstractBoolean, I extends AbstractInteger,
    R extends AbstractReal, F extends AbstractFloat> {

    fromConcrete(str: ConcreteString): S;

    toFloat(from: S): F;

    toInteger(from: S): I;

    toBoolean(from: S): I;

    toReal(from: S): R;

    abstractStringValue(id: Variable): S;

    emptyString(): S;

    topString(): S;

    bottomString(): S;

    lengthOf(str: S): I;

    joinStrings(str1: S, str2: S): S;

    ithLetterOf(index: I, str: S): S;

    stringsEqual(str1: S, str2: S): B;

    stringContains(str1: S, str2: S): B;

    lengthOf(str: S): I;

    ifThenElse(cond: B, thenResult: S, elseResult: S): S;

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

export interface NumberTheory<N extends AbstractNumber, I extends AbstractInteger, R extends AbstractReal,
    F extends AbstractFloat, B extends AbstractBoolean, S extends AbstractString> {

    fromConcreteNumber(str: ConcreteNumber): N;

    fromConcreteString(str: ConcreteString): N;

    toFloatFormula(from: N): F;

    toIntegerFormula(from: N): I;

    toRealFormula(from: N): R;

    toStringFormula(from: N): S;

    abstractNumberValue(id: Variable): N;

    zero(): N;

    one(): N;

    topNumber(): N;

    bottomNumber(): N;

    multiply(op1: N, op2: N): N;

    divide(op1: N, op2: N): N;

    plus(op1: N, op2: N): N;

    minus(op1: N, op2: N): N;

    isGreaterThan(s1: N, s2: N): B;

    isGreaterEqual(s1: N, s2: N): B;

    isLessThan(s1: N, s2: N): B;

    isLessEqual(s1: N, s2: N): B;

    isNumberEqualTo(s1: N, s2: N): B;

    ifThenElse(cond: B, thenResult: N, elseResult: N): N;

}

export interface RealTheory<N extends AbstractReal, I extends AbstractInteger, R extends AbstractReal, F extends AbstractFloat,
    B extends AbstractBoolean, S extends AbstractString> extends NumberTheory<N, I, R, F, B, S> {

}

export interface FloatTheory<N extends AbstractFloat, I extends AbstractInteger, R extends AbstractReal, F extends AbstractFloat,
    B extends AbstractBoolean, S extends AbstractString> extends NumberTheory<N, I, R, F, B, S> {

}

export interface IntegerTheory<N extends AbstractInteger, I extends AbstractInteger, R extends AbstractReal, F extends AbstractFloat,
    B extends AbstractBoolean, S extends AbstractString> extends NumberTheory<N, I, R, F, B, S> {

    modulo(op1: N, op2: N): N;

}

export interface AbstractNumberDomain extends AbstractDomain<ConcreteNumber, AbstractNumber> {

}

export interface AbstractBooleanDomain<E extends AbstractBoolean> extends AbstractDomain<ConcreteBoolean, E> {

}

export interface AbstractStringDomain extends AbstractDomain<ConcreteString, AbstractString> {

}

export interface AbstractStringListDomain extends AbstractDomain<ConcreteStringList, AbstractStringList> {

}

export interface BooleanTheory<B extends AbstractBoolean> {

    fromBoolean(value: boolean): B;

    fromConcreteBoolean(str: ConcreteBoolean): B;

    abstractBooleanValue(id: Variable): B;

    falseBool(): B;

    trueBool(): B;

    topBoolean(): B;

    bottomBoolean(): B;

    not(op1: B): B;

    and(op1: B, op2: B): B;

    or(op1: B, op2: B): B;

    equal(op1: B, op2: B): B;

}

export interface MemoryTheory {

    /** Variable Declarations */

    declareVariable(id: Variable, type: ScratchType): AbstractMemory;

    freeVariable(id: Variable): AbstractMemory;

    getStringVariable(id: Variable): StringVariable;

    getNumberVariable(id: Variable): NumberVariable;

    getBooleanVariable(id: Variable): BooleanVariable;

    getListVariable(id: Variable): ListVariable;

    getMapVariable(id: Variable): MapVariable;


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

    abstract declareVariable(id: Variable, type: ScratchType): AbstractMemory;

    abstract freeVariable(id: Variable): AbstractMemory;

    abstract getBooleanVariable(id: Variable): BooleanVariable;

    abstract getListVariable(id: Variable): ListVariable;

    abstract getMapVariable(id: Variable): MapVariable;

    abstract getNumberVariable(id: Variable): NumberVariable;

    abstract getStringVariable(id: Variable): StringVariable;

    abstract queryAbstractBoolean(id: BooleanVariable): AbstractBoolean;

    abstract queryAbstractList(id: ListVariable): AbstractList;

    abstract queryAbstractMap(id: MapVariable): AbstractMap;

    abstract queryAbstractNumber(id: NumberVariable): AbstractNumber;

    abstract queryAbstractString(id: StringVariable): AbstractString;

}

export interface TheoryIndependent<E extends AbstractElement> {

    simplify(element: E): E;

}

export interface AbstractTheories<M extends AbstractMemory, B extends AbstractBoolean,
    I extends AbstractInteger, R extends AbstractReal, F extends AbstractFloat,
    S extends AbstractString, L extends AbstractList>
    extends TheoryIndependent<M> {

    boolTheory: BooleanTheory<B>;

    intTheory: IntegerTheory<I, I, R, F, B, S>;

    realTheory: RealTheory<R, I, R, F, B, S>;

    floatTheory: FloatTheory<F, I, R, F, B, S>;

    stringTheory: StringTheory<S, B, I, R, F>;

    listTheory: ListTheory<L>;

    getNumberTheoryOf(e: AbstractNumber): NumberTheory<AbstractNumber, I, R, F, B, S>;

}
