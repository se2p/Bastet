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

import {FirstOrderFormula} from "../../ConjunctiveNormalForm";
import {
    AbstractBoolean,
    AbstractList,
    AbstractTheories,
    AbstractNumber,
    AbstractString,
    BooleanTheory,
    ListTheory,
    NumberTheory,
    StringTheory, IntegerTheory, RealTheory, FloatTheory
} from "../../../procedures/domains/MemoryTransformer";
import {Record as ImmRec} from "immutable";
import {LibZ3InContext, Z3_ast, Z3_sort} from "./libz3";
import {ConcreteBoolean, ConcreteNumber, ConcreteString} from "../../../procedures/domains/ConcreteElements";
import {Preconditions} from "../../Preconditions";
import {Float, Ptr, Sint32, Uint32} from "./ctypes";
import {ImplementMeException, ImplementMeForException} from "../../../core/exceptions/ImplementMeException";
import {SMTFirstOrderLattice} from "../../../procedures/domains/FirstOrderDomain";
import {Z3ProverEnvironment} from "./Z3SMT";
import {Variable} from "../../../syntax/ast/core/Variable";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {FloatType, IntegerType, ScratchType} from "../../../syntax/ast/core/ScratchType";

export type Z3FirstOrderFormula = Z3BooleanFormula;

export interface Z3FormulaAttributes {

    ast_pointer: number;

}

const Z3FormulaRecord = ImmRec({

    ast_pointer: 0

});

export class Z3Formula extends Z3FormulaRecord implements FirstOrderFormula  {

    constructor(ast: Z3_ast) {
        super({ast_pointer: ast.val()});
    }

    public withAST(ast: Z3_ast): Z3Formula {
        return this.set("ast_pointer", ast.val());
    }

    public getAST(): Z3_ast {
        return new Z3_ast(this.get("ast_pointer"));
    }

}

export class Z3BooleanFormula extends Z3Formula implements AbstractBoolean {

}

export abstract class Z3NumberFormula extends Z3Formula implements AbstractNumber {

}

export class Z3IntegerFormula extends Z3NumberFormula {

}

export class Z3RealFormula extends Z3NumberFormula {

}

export class Z3FloatFormula extends Z3NumberFormula {

}

export class Z3StringFormula extends Z3Formula implements AbstractString {

}

export class Z3ListFormula extends Z3Formula implements AbstractList {

}

export class Z3Theory {

    protected readonly _ctx: LibZ3InContext;

    constructor(ctx: LibZ3InContext) {
        this._ctx = Preconditions.checkNotUndefined(ctx);
    }

    protected freeArray(heapBytes){
        this._ctx.wasmInstance._free(heapBytes.byteOffset);
    }

    protected arrayToHeap(typedArray){
        const wasmInstance = this._ctx.wasmInstance;
        var numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
        var ptr = wasmInstance._malloc(numBytes);
        var heapBytes = new Uint8Array(wasmInstance.HEAPU8.buffer, ptr, numBytes);
        heapBytes.set(new Uint8Array(typedArray.buffer));
        return heapBytes;
    }

}

export class Z3BooleanTheory extends Z3Theory implements BooleanTheory<Z3BooleanFormula> {

    constructor(ctx: LibZ3InContext) {
        super(ctx);
    }

    abstractBooleanValue(id: Variable): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_const(this._ctx.mk_string_symbol(id.qualifiedName), this._ctx.mk_bool_sort()));
    }

    and(op1: Z3BooleanFormula, op2: Z3BooleanFormula): Z3BooleanFormula {
        const typedArray = new Int32Array([op1.getAST().val(), op2.getAST().val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            return new Z3BooleanFormula(this._ctx.mk_and(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    bottomBoolean(): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_false());
    }

    falseBool(): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_false());
    }

    fromBoolean(value: boolean): Z3BooleanFormula {
        if (value) {
            return this.trueBool();
        } else {
            return this.falseBool();
        }
    }

    fromConcreteBoolean(str: ConcreteBoolean): Z3BooleanFormula {
        return this.fromBoolean(str.value);
    }

    not(op1: Z3BooleanFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_not(op1.getAST()));
    }

    or(op1: Z3BooleanFormula, op2: Z3BooleanFormula): Z3BooleanFormula {
        const typedArray = new Int32Array([op1.getAST().val(), op2.getAST().val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            return new Z3BooleanFormula(this._ctx.mk_or(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    equal(op1: Z3BooleanFormula, op2: Z3BooleanFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_eq(op1.getAST(), op2.getAST()));
    }

    topBoolean(): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_true());
    }

    trueBool(): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_true());
    }

}

export abstract class Z3AbstractNumberTheory<N extends Z3NumberFormula> extends Z3Theory
    implements NumberTheory<N, Z3IntegerFormula, Z3RealFormula, Z3FloatFormula, Z3BooleanFormula, Z3StringFormula> {

    protected abstract makeTheorySort(): Z3_sort;

    protected abstract createTypedWrapper(ast: Z3_ast): N;

    abstract castFrom(from: AbstractNumber): N;

    abstract toFloatFormula(from: N): Z3FloatFormula;

    abstract toIntegerFormula(from: N): Z3IntegerFormula;

    abstract toRealFormula(from: N): Z3RealFormula;

    abstract toStringFormula(from: N): Z3StringFormula;

    abstract fromConcreteString(from: ConcreteString): N;

    abstract fromConcreteNumber(str: ConcreteNumber): N;

    abstractNumberValue(id: Variable): N {
        return this.createTypedWrapper(this._ctx.mk_const(this._ctx.mk_string_symbol(id.qualifiedName), this.makeTheorySort()));
    }

    topNumber(): N {
        throw new ImplementMeException();
    }

    bottomNumber(): N {
        throw new ImplementMeException();
    }

    fromBoolean(val: Z3BooleanFormula): N {
        return this.ifThenElse(val, this.one(), this.zero());
    }

    one(): N {
        return this.fromConcreteNumber(new ConcreteNumber(1));
    }

    zero(): N {
        return this.fromConcreteNumber(new ConcreteNumber(0));
    }

    ifThenElse(cond: Z3BooleanFormula, thenResult: N, elseResult: N): N {
        return this.createTypedWrapper(this._ctx.mk_ite(cond.getAST(), thenResult.getAST(), elseResult.getAST()));
    }

    abstract divide(op1: N, op2: N): N;


    abstract isGreaterEqual(s1: N, s2: N): Z3BooleanFormula;

    abstract isGreaterThan(s1: N, s2: N): Z3BooleanFormula;

    abstract isLessEqual(s1: N, s2: N): Z3BooleanFormula;

    abstract isLessThan(s1: N, s2: N): Z3BooleanFormula;

    abstract isNumberEqualTo(s1: N, s2: N): Z3BooleanFormula;

    abstract minus(op1: N, op2: N): N;

    abstract multiply(op1: N, op2: N): N;

    abstract plus(op1: N, op2: N): N;

    abstract power(op1: N, op2: N): N;

    abstract sqrt(op1: N): N;

}

export class Z3RealTheory extends Z3AbstractNumberTheory<Z3RealFormula>
    implements RealTheory<Z3RealFormula, Z3IntegerFormula, Z3RealFormula, Z3FloatFormula, Z3BooleanFormula, Z3StringFormula> {

    constructor(ctx: LibZ3InContext) {
        super(ctx);
    }

    private makeFpaRoundingStrategy(): Z3_ast {
        return this._ctx.mk_fpa_round_nearest_ties_to_even();
    }

    castFrom(from: AbstractNumber): Z3RealFormula {
        if (from instanceof Z3IntegerFormula) {
            return new Z3RealFormula(this._ctx.mk_int2real(from.getAST()));

        } else if (from instanceof Z3FloatFormula) {
            return new Z3RealFormula(this._ctx.mk_fpa_to_real(from.getAST()));
        }

        throw new ImplementMeForException(from.constructor.name);
    }

    fromConcreteString(from: ConcreteString): Z3RealFormula {
        return this.createTypedWrapper(
            this._ctx.mk_numeral(from.value, this.makeTheorySort()));
    }

    protected createTypedWrapper(ast: Z3_ast): Z3RealFormula {
        return new Z3RealFormula(ast);
    }

    protected makeTheorySort(): Z3_sort {
        return this._ctx.mk_real_sort();
    }

    toFloatFormula(from: Z3RealFormula): Z3FloatFormula {
        throw new ImplementMeException();
    }

    toIntegerFormula(from: Z3RealFormula): Z3IntegerFormula {
        return new Z3IntegerFormula(this._ctx.mk_real2int(from.getAST()));
    }

    toRealFormula(from: Z3RealFormula): Z3RealFormula {
        return from;
    }

    toStringFormula(from: Z3RealFormula): Z3StringFormula {
        throw new ImplementMeException();
    }

    divide(op1: Z3RealFormula, op2: Z3RealFormula): Z3RealFormula {
        return this.createTypedWrapper(this._ctx.mk_div(op1.getAST(), op2.getAST()));
    }

    fromConcreteNumber(str: ConcreteNumber): Z3RealFormula {
        return this.fromConcreteString(new ConcreteString(str.value.toString()));
    }

    isGreaterThan(op1: Z3RealFormula, op2: Z3RealFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_gt(op1.getAST(), op2.getAST()));
    }

    isLessThan(op1: Z3RealFormula, op2: Z3RealFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_lt(op1.getAST(), op2.getAST()));
    }

    isGreaterEqual(op1: Z3RealFormula, op2: Z3RealFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_ge(op1.getAST(), op2.getAST()));
    }

    isLessEqual(op1: Z3RealFormula, op2: Z3RealFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_le(op1.getAST(), op2.getAST()));
    }

    isNumberEqualTo(op1: Z3RealFormula, op2: Z3RealFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_eq(op1.getAST(), op2.getAST()));
    }

    power(op1: Z3RealFormula, op2: Z3RealFormula): Z3RealFormula {
        return this.createTypedWrapper(this._ctx.mk_power(op1.getAST(), op2.getAST()));
    }

    sqrt(op1: Z3RealFormula): Z3RealFormula {
        return this.power(op1, this.fromConcreteNumber(new ConcreteNumber(0.5)));
    }

    minus(op1: Z3RealFormula, op2: Z3RealFormula): Z3RealFormula {
        const typedArray = new Int32Array([op1.getAST().val(), this._ctx.mk_unary_minus(op2.getAST()).val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            // 'Minus' adds a negative number
            return this.createTypedWrapper(this._ctx.mk_add(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    multiply(op1: Z3RealFormula, op2: Z3RealFormula): Z3RealFormula {
        const typedArray = new Int32Array([op1.getAST().val(), op2.getAST().val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            return this.createTypedWrapper(this._ctx.mk_mul(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    plus(op1: Z3RealFormula, op2: Z3RealFormula): Z3RealFormula {
        const typedArray = new Int32Array([op1.getAST().val(), op2.getAST().val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            return this.createTypedWrapper(this._ctx.mk_add(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

}

export class Z3FloatTheory extends Z3AbstractNumberTheory<Z3FloatFormula>
    implements FloatTheory<Z3FloatFormula, Z3IntegerFormula, Z3RealFormula, Z3FloatFormula, Z3BooleanFormula, Z3StringFormula> {

    constructor(ctx: LibZ3InContext) {
        super(ctx);
    }

    protected createTypedWrapper(ast: Z3_ast): Z3FloatFormula {
        return new Z3FloatFormula(ast);
    }

    castFrom(from: AbstractNumber): Z3FloatFormula {
        if (from instanceof Z3IntegerFormula) {
            return new Z3FloatFormula(this._ctx.mk_fpa_to_fp_real(
                this.makeRoundingStrategy(), this._ctx.mk_int2real(from.getAST()), this.makeTheorySort()));
        } else if (from instanceof Z3RealFormula) {
            return new Z3FloatFormula(this._ctx.mk_fpa_to_fp_real(
                this.makeRoundingStrategy(), from.getAST(), this.makeTheorySort()));
        }

        throw new ImplementMeForException(from.constructor.name);
    }

    toFloatFormula(from: Z3FloatFormula): Z3FloatFormula {
        return from;
    }

    toIntegerFormula(from: Z3FloatFormula): Z3IntegerFormula {
        throw new ImplementMeException();
    }

    toRealFormula(from: Z3FloatFormula): Z3RealFormula {
        return new Z3RealFormula(this._ctx.mk_fpa_to_real(from.getAST()));
    }

    toStringFormula(from: Z3FloatFormula): Z3StringFormula {
        throw new ImplementMeException();
    }

    fromConcreteString(from: ConcreteString): Z3FloatFormula {
        return this.createTypedWrapper(this._ctx.mk_numeral(from.value, this.makeTheorySort()));
    }

    protected makeTheorySort(): Z3_sort {
        return this._ctx.mk_fpa_sort_single();
    }

    private makeRoundingStrategy(): Z3_ast {
        return this._ctx.mk_fpa_round_nearest_ties_to_even();
    }

    fromConcreteNumber(number: ConcreteNumber): Z3FloatFormula {
        return this.fromConcreteString(new ConcreteString(number.value.toString()));
    }

    castStringAsNumber(str: Z3StringFormula): Z3NumberFormula {
        // Approach: use castStringAsNumber of the int theory (mk_str_to_int)?
        throw new ImplementMeException();
    }

    isGreaterThan(s1: Z3FloatFormula, s2: Z3FloatFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_fpa_gt(s1.getAST(), s2.getAST()));
    }

    isLessThan(s1: Z3FloatFormula, s2: Z3FloatFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_fpa_lt(s1.getAST(), s2.getAST()));
    }

    isNumberEqualTo(s1: Z3FloatFormula, s2: Z3FloatFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_fpa_eq(s1.getAST(), s2.getAST()));
    }

    power(op1: Z3FloatFormula, op2: Z3FloatFormula): Z3FloatFormula {
        throw new ImplementMeException();
    }

    sqrt(op1: Z3FloatFormula): Z3FloatFormula {
        return this.createTypedWrapper(this._ctx.mk_fpa_sqrt(this.makeRoundingStrategy(), op1.getAST()));
    }

    minus(op1: Z3FloatFormula, op2: Z3FloatFormula): Z3FloatFormula {
        const minusAst = this.multiply(op2, this.fromConcreteNumber(new ConcreteNumber(-1)));
        // 'Minus' adds a negative number
        return this.createTypedWrapper(this._ctx.mk_fpa_add(this.makeRoundingStrategy(), op1.getAST(), minusAst.getAST()));
    }

    divide(op1: Z3FloatFormula, op2: Z3FloatFormula): Z3FloatFormula {
        return this.createTypedWrapper(this._ctx.mk_fpa_div(this.makeRoundingStrategy(), op1.getAST(), op2.getAST()));
    }

    multiply(op1: Z3FloatFormula, op2: Z3FloatFormula): Z3FloatFormula {
        return this.createTypedWrapper(this._ctx.mk_fpa_mul(this.makeRoundingStrategy(), op1.getAST(), op2.getAST()));
    }

    plus(op1: Z3FloatFormula, op2: Z3FloatFormula): Z3FloatFormula {
        return this.createTypedWrapper(this._ctx.mk_fpa_add(this.makeRoundingStrategy(), op1.getAST(), op2.getAST()));
    }

    isGreaterEqual(s1: Z3FloatFormula, s2: Z3FloatFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_fpa_geq(s1.getAST(), s2.getAST()));
    }

    isLessEqual(s1: Z3FloatFormula, s2: Z3FloatFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_fpa_leq(s1.getAST(), s2.getAST()));
    }

}

export class Z3IntegerTheory extends Z3AbstractNumberTheory<Z3IntegerFormula>
    implements IntegerTheory<Z3IntegerFormula, Z3IntegerFormula, Z3RealFormula, Z3FloatFormula, Z3BooleanFormula, Z3StringFormula> {

    constructor(ctx: LibZ3InContext) {
        super(ctx);
    }

    makeTheorySort(): Z3_sort {
        return this._ctx.mk_int_sort();
    }

    castFrom(from: AbstractNumber): Z3IntegerFormula {
        if (from instanceof Z3RealFormula) {
            return new Z3IntegerFormula(this._ctx.mk_real2int(from.getAST()));
        }

        throw new ImplementMeForException(from.constructor.name);
    }

    protected createTypedWrapper(ast: Z3_ast): Z3IntegerFormula {
        return new Z3IntegerFormula(ast);
    }

    fromConcreteString(from: ConcreteString): Z3IntegerFormula {
        throw new ImplementMeException();
    }

    fromConcreteNumber(str: ConcreteNumber): Z3IntegerFormula {
        return new Z3IntegerFormula(
            this._ctx.mk_int(new Sint32(str.value), this._ctx.mk_int_sort()));
    }

    toFloatFormula(from: Z3IntegerFormula): Z3FloatFormula {
        throw new ImplementMeException();
    }

    toIntegerFormula(from: Z3IntegerFormula): Z3IntegerFormula {
        return from;
    }

    toRealFormula(from: Z3IntegerFormula): Z3RealFormula {
        return new Z3RealFormula(this._ctx.mk_int2real(from.getAST()));
    }

    toStringFormula(from: Z3IntegerFormula): Z3StringFormula {
        return new Z3StringFormula(this._ctx.mk_int_to_str(from.getAST()));
    }

    divide(op1: Z3IntegerFormula, op2: Z3IntegerFormula): Z3IntegerFormula {
        return this.createTypedWrapper(this._ctx.mk_div(op1.getAST(), op2.getAST()));
    }

    isGreaterThan(s1: Z3IntegerFormula, s2: Z3IntegerFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_gt(s1.getAST(), s2.getAST()));
    }

    isLessThan(s1: Z3IntegerFormula, s2: Z3IntegerFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_lt(s1.getAST(), s2.getAST()));
    }

    isNumberEqualTo(s1: Z3IntegerFormula, s2: Z3IntegerFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_eq(s1.getAST(), s2.getAST()));
    }

    power(op1: Z3IntegerFormula, op2: Z3IntegerFormula): Z3IntegerFormula {
        return this.createTypedWrapper(this._ctx.mk_power(op1.getAST(), op2.getAST()));
    }

    sqrt(op1: Z3IntegerFormula): Z3IntegerFormula {
        throw new ImplementMeException();
        // return this.power(op1, this.fromConcreteNumber(new ConcreteNumber(0.5)));
    }

    minus(op1: Z3IntegerFormula, op2: Z3IntegerFormula): Z3NumberFormula {
        const typedArray = new Int32Array([op1.getAST().val(), this._ctx.mk_unary_minus(op2.getAST()).val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            // 'Minus' adds a negative number
            return this.createTypedWrapper(this._ctx.mk_add(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    modulo(op1: Z3IntegerFormula, op2: Z3IntegerFormula): Z3IntegerFormula {
        return this.createTypedWrapper(this._ctx.mk_mod(op1.getAST(), op2.getAST()));
    }

    multiply(op1: Z3IntegerFormula, op2: Z3IntegerFormula): Z3IntegerFormula {
        const typedArray = new Int32Array([op1.getAST().val(), op2.getAST().val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            return this.createTypedWrapper(this._ctx.mk_mul(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    plus(op1: Z3IntegerFormula, op2: Z3IntegerFormula): Z3IntegerFormula {
        const typedArray = new Int32Array([op1.getAST().val(), op2.getAST().val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            return this.createTypedWrapper(this._ctx.mk_add(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    isGreaterEqual(s1: Z3IntegerFormula, s2: Z3IntegerFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_ge(s1.getAST(), s2.getAST()));
    }

    isLessEqual(s1: Z3IntegerFormula, s2: Z3IntegerFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_le(s1.getAST(), s2.getAST()));
    }

}

export class Z3StringTheory extends Z3Theory implements StringTheory<Z3StringFormula, Z3BooleanFormula, Z3IntegerFormula, Z3RealFormula, Z3FloatFormula> {

    constructor(ctx: LibZ3InContext) {
        super(ctx);
    }

    toFloat(from: Z3StringFormula): Z3FloatFormula {
        throw new ImplementMeException();
    }

    toInteger(from: Z3StringFormula): Z3IntegerFormula {
        return new Z3IntegerFormula(this._ctx.mk_str_to_int(from.getAST()));
    }

    toBoolean(from: Z3StringFormula): Z3IntegerFormula {
        throw new ImplementMeException();
    }

    toReal(from: Z3StringFormula): Z3RealFormula {
        throw new ImplementMeException();
    }

    fromConcrete(str: ConcreteString): Z3StringFormula {
        return new Z3StringFormula(this._ctx.mk_string(str.value));
    }

    abstractStringValue(id: Variable): Z3StringFormula {
        return new Z3StringFormula(this._ctx.mk_const(
            this._ctx.mk_string_symbol(id.qualifiedName), this._ctx.mk_string_sort()));
    }

    bottomString(): Z3StringFormula {
        throw new ImplementMeException();
    }

    castBoolAsString(num: Z3BooleanFormula): Z3StringFormula {
        throw new ImplementMeException();
    }

    castNumberAsString(num: Z3NumberFormula): Z3StringFormula {
        return new Z3StringFormula(this._ctx.mk_int_to_str(num.getAST()));
    }

    emptyString(): Z3StringFormula {
        return new Z3StringFormula(this._ctx.mk_string(""));
    }

    ithLetterOf(index: Z3NumberFormula, str: Z3StringFormula): Z3StringFormula {
        throw new ImplementMeException();
    }

    joinStrings(str1: Z3StringFormula, str2: Z3StringFormula): Z3StringFormula {
        const typedArray = new Int32Array([str1.getAST().val(), str2.getAST().val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            return new Z3StringFormula(this._ctx.mk_seq_concat(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    lengthOf(str: Z3StringFormula): Z3NumberFormula {
        return new Z3IntegerFormula(this._ctx.mk_seq_length(str.getAST()));
    }

    topString(): Z3StringFormula {
        throw new ImplementMeException();
    }

    stringContains(str1: Z3StringFormula, str2: Z3StringFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_seq_contains(str1.getAST(), str2.getAST()));
    }

    stringsEqual(str1: Z3StringFormula, str2: Z3StringFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_eq(str1.getAST(), str2.getAST()));
    }

    ifThenElse(cond: Z3BooleanFormula, thenResult: Z3StringFormula, elseResult: Z3StringFormula): Z3StringFormula {
        return new Z3StringFormula(this._ctx.mk_ite(cond.getAST(), thenResult.getAST(), elseResult.getAST()));
    }

}

export class Z3ListTheory implements ListTheory<Z3ListFormula> {

    private readonly _ctx: LibZ3InContext;

    constructor(ctx: LibZ3InContext) {
        this._ctx = Preconditions.checkNotUndefined(ctx);
    }

}

export class Z3Theories implements AbstractTheories<Z3Formula, Z3BooleanFormula, Z3IntegerFormula, Z3RealFormula, Z3FloatFormula, Z3StringFormula, Z3ListFormula> {

    private readonly _boolTheory: BooleanTheory<Z3BooleanFormula>;

    private readonly _listTheory: ListTheory<Z3ListFormula>;

    private readonly _intTheory: Z3IntegerTheory;

    private readonly _realTheory: Z3RealTheory;

    private readonly _floatTheory: Z3FloatTheory;

    private readonly _stringTheory: Z3StringTheory;

    private readonly _ctx: LibZ3InContext;

    constructor(ctx: LibZ3InContext) {
        this._ctx = Preconditions.checkNotUndefined(ctx);
        this._boolTheory = new Z3BooleanTheory(ctx);
        this._intTheory = new Z3IntegerTheory(ctx);
        this._realTheory = new Z3RealTheory(ctx);
        this._floatTheory = new Z3FloatTheory(ctx);
        this._stringTheory = new Z3StringTheory(ctx);
        this._listTheory = new Z3ListTheory(ctx);
    }

    get boolTheory(): BooleanTheory<Z3BooleanFormula> {
        return this._boolTheory;
    }

    get listTheory(): ListTheory<Z3ListFormula> {
        return this._listTheory;
    }

    get intTheory(): Z3IntegerTheory {
        return this._intTheory;
    }

    get floatTheory(): Z3FloatTheory {
        return this._floatTheory;
    }

    get realTheory(): Z3RealTheory {
        return this._realTheory;
    }

    get stringTheory(): Z3StringTheory {
        return this._stringTheory;
    }

    public simplify(e: Z3Formula): Z3Formula {
        const simplifiedAst: Z3_ast = this._ctx.simplify(e.getAST());
        if (e instanceof Z3BooleanFormula) {
            return new Z3BooleanFormula(simplifiedAst);
        }
        throw new ImplementMeException();
    }

    getNumberTheoryOf(e: AbstractNumber): NumberTheory<AbstractNumber, Z3IntegerFormula, Z3RealFormula, Z3FloatFormula, Z3BooleanFormula, Z3StringFormula> {
        Preconditions.checkNotUndefined(e);

        if (e instanceof Z3FloatFormula) {
            return this.floatTheory;

        } else if (e instanceof Z3RealFormula) {
            return this.realTheory;

        } else if (e instanceof Z3IntegerFormula) {
            return this.intTheory;

        } else {
            throw new IllegalArgumentException(`Illegal type of number entity: ${e.constructor.name}`);
        }
    }

}

export class Z3FirstOrderLattice extends SMTFirstOrderLattice<Z3FirstOrderFormula> {

    constructor(theory: BooleanTheory<Z3FirstOrderFormula>, prover: Z3ProverEnvironment) {
        super(theory, prover);
    }

}
