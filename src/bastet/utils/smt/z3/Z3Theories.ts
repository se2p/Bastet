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
    StringTheory
} from "../../../procedures/domains/MemoryTransformer";
import {Record as ImmRec} from "immutable";
import {LibZ3InContext, Z3_ast, Z3_sort} from "./libz3";
import {ConcreteBoolean, ConcreteNumber, ConcreteString} from "../../../procedures/domains/ConcreteElements";
import {Preconditions} from "../../Preconditions";
import {Float, Ptr, Sint32, Uint32} from "./ctypes";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {SMTFirstOrderLattice} from "../../../procedures/domains/FirstOrderDomain";
import {Z3ProverEnvironment} from "./Z3SMT";
import {Variable} from "../../../syntax/ast/core/Variable";

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

export class Z3NumberFormula extends Z3Formula implements AbstractNumber {

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

export abstract class Z3AbstractNumberTheory extends Z3Theory implements NumberTheory<Z3NumberFormula, Z3BooleanFormula> {

    protected abstract makeTheorySort(): Z3_sort;

    abstractNumberValue(id: Variable): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_const(this._ctx.mk_string_symbol(id.qualifiedName), this.makeTheorySort()));
    }

    topNumber(): Z3NumberFormula {
        throw new ImplementMeException();
    }

    bottomNumber(): Z3NumberFormula {
        throw new ImplementMeException();
    }

    castBoolAsNumber(val: Z3BooleanFormula): Z3NumberFormula {
        return this.ifThenElse(val, this.one(), this.zero());
    }

    one(): Z3NumberFormula {
        return this.fromConcreteNumber(new ConcreteNumber(1));
    }

    zero(): Z3NumberFormula {
        return this.fromConcreteNumber(new ConcreteNumber(0));
    }

    ifThenElse(cond: Z3BooleanFormula, thenResult: Z3NumberFormula, elseResult: Z3NumberFormula): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_ite(cond.getAST(), thenResult.getAST(), elseResult.getAST()));
    }

    abstract castStringAsNumber(str: AbstractString): Z3NumberFormula;

    abstract divide(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula;

    abstract fromConcreteNumber(str: ConcreteNumber): Z3NumberFormula;

    abstract isGreaterEqual(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula;

    abstract isGreaterThan(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula;

    abstract isLessEqual(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula;

    abstract isLessThan(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula;

    abstract isNumberEqualTo(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula;

    abstract minus(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula;

    abstract modulo(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula;

    abstract multiply(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula;

    abstract plus(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula;

}

export class Z3RealTheory extends Z3AbstractNumberTheory implements NumberTheory<Z3NumberFormula, Z3BooleanFormula> {

    constructor(ctx: LibZ3InContext) {
        super(ctx);
    }

    protected makeTheorySort(): Z3_sort {
        return this._ctx.mk_real_sort();
    }

    castStringAsNumber(str: Z3StringFormula): Z3NumberFormula {
        // Do you really need this method?
        //      Does the given string really encode a 'real' or is it an 'int'?
        throw new ImplementMeException();
    }

    divide(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_div(op1.getAST(), op2.getAST()));
    }

    fromConcreteNumber(str: ConcreteNumber): Z3NumberFormula {
        return new Z3NumberFormula(
            this._ctx.mk_fpa_numeral_float(new Float(str.value), this.makeTheorySort()));
    }

    isGreaterThan(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_gt(s1.getAST(), s2.getAST()));
    }

    isLessThan(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_lt(s1.getAST(), s2.getAST()));
    }

    isNumberEqualTo(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_eq(s1.getAST(), s2.getAST()));
    }

    minus(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        const typedArray = new Int32Array([op1.getAST().val(), this._ctx.mk_unary_minus(op2.getAST()).val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            // 'Minus' adds a negative number
            return new Z3NumberFormula(this._ctx.mk_add(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    modulo(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_mod(op1.getAST(), op2.getAST()));
    }

    multiply(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        const typedArray = new Int32Array([op1.getAST().val(), op2.getAST().val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            return new Z3NumberFormula(this._ctx.mk_mul(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    plus(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        const typedArray = new Int32Array([op1.getAST().val(), op2.getAST().val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            return new Z3NumberFormula(this._ctx.mk_add(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    isGreaterEqual(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_ge(s1.getAST(), s2.getAST()));
    }

    isLessEqual(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_le(s1.getAST(), s2.getAST()));
    }

}

export class Z3FloatTheory extends Z3AbstractNumberTheory implements NumberTheory<Z3NumberFormula, Z3BooleanFormula> {

    constructor(ctx: LibZ3InContext) {
        super(ctx);
    }

    protected makeTheorySort(): Z3_sort {
        return this._ctx.mk_fpa_sort_single();
    }

    private makeRoundingStrategy(): Z3_ast {
        return this._ctx.mk_fpa_round_nearest_ties_to_even();
    }

    fromConcreteNumber(str: ConcreteNumber): Z3NumberFormula {
        return new Z3NumberFormula(
            this._ctx.mk_fpa_numeral_float(new Float(str.value), this.makeTheorySort()));
    }

    castStringAsNumber(str: Z3StringFormula): Z3NumberFormula {
        // Approach: use castStringAsNumber of the int theory (mk_str_to_int)?
        throw new ImplementMeException();
    }

    isGreaterThan(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_fpa_gt(s1.getAST(), s2.getAST()));
    }

    isLessThan(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_fpa_lt(s1.getAST(), s2.getAST()));
    }

    isNumberEqualTo(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_fpa_eq(s1.getAST(), s2.getAST()));
    }

    minus(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        const minusAst = this._ctx.mk_unary_minus(op2.getAST());
        // 'Minus' adds a negative number
        return new Z3NumberFormula(this._ctx.mk_fpa_add(this.makeRoundingStrategy(), op1.getAST(), minusAst));
    }

    modulo(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        // Only available in the integer theory. Convert the given numbers to ints!
        throw new ImplementMeException();
    }

    divide(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_fpa_div(this.makeRoundingStrategy(), op1.getAST(), op2.getAST()));
    }

    multiply(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_fpa_mul(this.makeRoundingStrategy(), op1.getAST(), op2.getAST()));
    }

    plus(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_fpa_add(this.makeRoundingStrategy(), op1.getAST(), op2.getAST()));
    }

    isGreaterEqual(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_fpa_geq(s1.getAST(), s2.getAST()));
    }

    isLessEqual(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_fpa_leq(s1.getAST(), s2.getAST()));
    }

}

export class Z3IntegerTheory extends Z3AbstractNumberTheory implements NumberTheory<Z3NumberFormula, Z3BooleanFormula> {

    constructor(ctx: LibZ3InContext) {
        super(ctx);
    }

    makeTheorySort(): Z3_sort {
        return this._ctx.mk_int_sort();
    }

    castStringAsNumber(str: Z3StringFormula): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_str_to_int(str.getAST()));
    }

    divide(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_div(op1.getAST(), op2.getAST()));
    }

    fromConcreteNumber(str: ConcreteNumber): Z3NumberFormula {
        return new Z3NumberFormula(
            this._ctx.mk_int(new Sint32(str.value), this._ctx.mk_int_sort()));
    }

    isGreaterThan(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_gt(s1.getAST(), s2.getAST()));
    }

    isLessThan(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_lt(s1.getAST(), s2.getAST()));
    }

    isNumberEqualTo(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_eq(s1.getAST(), s2.getAST()));
    }

    minus(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        const typedArray = new Int32Array([op1.getAST().val(), this._ctx.mk_unary_minus(op2.getAST()).val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            // 'Minus' adds a negative number
            return new Z3NumberFormula(this._ctx.mk_add(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    modulo(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_mod(op1.getAST(), op2.getAST()));
    }

    multiply(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        const typedArray = new Int32Array([op1.getAST().val(), op2.getAST().val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            return new Z3NumberFormula(this._ctx.mk_mul(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    plus(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        const typedArray = new Int32Array([op1.getAST().val(), op2.getAST().val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            return new Z3NumberFormula(this._ctx.mk_add(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    isGreaterEqual(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_ge(s1.getAST(), s2.getAST()));
    }

    isLessEqual(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_le(s1.getAST(), s2.getAST()));
    }

}

export class Z3StringTheory extends Z3Theory implements StringTheory<Z3StringFormula, Z3BooleanFormula, Z3NumberFormula> {

    constructor(ctx: LibZ3InContext) {
        super(ctx);
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

    fromConcreteString(str: ConcreteString): Z3StringFormula {
        return new Z3StringFormula(this._ctx.mk_string(str.value));
    }

    ithLetterOf(index: Z3NumberFormula, str: Z3StringFormula): Z3StringFormula {
        throw new ImplementMeException();
    }

    joinStrings(str1: Z3StringFormula, str2: Z3StringFormula): Z3StringFormula {
        const typedArray = new Int32Array([str1.getAST().val(), str2.getAST().val()]);
        const arrayOnHeap = this.arrayToHeap(typedArray);
        try {
            return new Z3NumberFormula(this._ctx.mk_seq_concat(new Uint32(2), new Ptr(arrayOnHeap.byteOffset)));
        } finally {
            this.freeArray(arrayOnHeap);
        }
    }

    lengthOf(str: Z3StringFormula): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_seq_length(str.getAST()));
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

export class Z3Theories implements AbstractTheories<Z3Formula, Z3BooleanFormula, Z3NumberFormula, Z3StringFormula, Z3ListFormula> {

    private readonly _boolTheory: BooleanTheory<Z3BooleanFormula>;

    private readonly _listTheory: ListTheory<Z3ListFormula>;

    private readonly _intTheory: Z3IntegerTheory;

    private readonly _realTheory: Z3RealTheory;

    private readonly _floatTheory: Z3FloatTheory;

    private readonly _stringTheory: StringTheory<Z3StringFormula, Z3BooleanFormula, Z3NumberFormula>;

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

    get intTheory(): NumberTheory<Z3NumberFormula, Z3BooleanFormula> {
        return this._intTheory;
    }

    get floatTheory(): NumberTheory<Z3NumberFormula, Z3BooleanFormula> {
        return this._floatTheory;
    }

    get realTheory(): NumberTheory<Z3NumberFormula, Z3BooleanFormula> {
        return this._realTheory;
    }

    get stringTheory(): StringTheory<Z3StringFormula, Z3BooleanFormula, Z3NumberFormula> {
        return this._stringTheory;
    }

    public simplify(e: Z3Formula): Z3Formula {
        const simplifiedAst: Z3_ast = this._ctx.simplify(e.getAST());
        if (e instanceof Z3BooleanFormula) {
            return new Z3BooleanFormula(simplifiedAst);
        }
        throw new ImplementMeException();
    }

}

export class Z3FirstOrderLattice extends SMTFirstOrderLattice<Z3FirstOrderFormula> {

    constructor(theory: BooleanTheory<Z3FirstOrderFormula>, prover: Z3ProverEnvironment) {
        super(theory, prover);
    }

}
