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
    AbstractMemoryTheory,
    AbstractNumber,
    AbstractString,
    BooleanTheory,
    ListTheory,
    RationalNumberTheory,
    StringTheory
} from "../../../procedures/domains/MemoryTransformer";
import {Record as ImmRec} from "immutable";
import {LibZ3InContext, Z3_ast} from "./libz3";
import {Identifier} from "../../../syntax/ast/core/Identifier";
import {ConcreteBoolean, ConcreteNumber, ConcreteString} from "../../../procedures/domains/ConcreteElements";
import {Preconditions} from "../../Preconditions";
import {Ptr, Sint32, Uint32} from "./ctypes";
import {ImplementMeException, ImplementMeForException} from "../../../core/exceptions/ImplementMeException";
import {SMTFirstOrderLattice} from "../../../procedures/domains/FirstOrderDomain";
import {Z3ProverEnvironment} from "./Z3Wrapper";
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

export class Z3NumberTheory extends Z3Theory implements RationalNumberTheory<Z3NumberFormula, Z3BooleanFormula> {

    constructor(ctx: LibZ3InContext) {
        super(ctx);
    }

    abstractNumberValue(id: Variable): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_const(this._ctx.mk_string_symbol(id.qualifiedName), this._ctx.mk_int_sort()));
    }

    bottomNumber(): Z3NumberFormula {
        throw new ImplementMeException();
    }

    castBoolAsNumber(val: AbstractBoolean): Z3NumberFormula {
        throw new ImplementMeException();
    }

    castStringAsNumber(str: AbstractString): Z3NumberFormula {
        throw new ImplementMeException();
    }

    divide(op1: Z3NumberFormula, op2: Z3NumberFormula): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_div(op1.getAST(), op2.getAST()));
    }

    fromConcreteNumber(str: ConcreteNumber): Z3NumberFormula {
        return new Z3NumberFormula(
            this._ctx.mk_int(new Sint32(str.value), this._ctx.mk_int_sort()));
    }

    isGreaterEqual(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_ge(s1.getAST(), s2.getAST()));
    }

    isLessEqual(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_le(s1.getAST(), s2.getAST()));
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

    one(): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_int_symbol(new Sint32(1)));
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

    topNumber(): Z3NumberFormula {
        throw new ImplementMeException();
    }

    zero(): Z3NumberFormula {
        return new Z3NumberFormula(this._ctx.mk_int_symbol(new Sint32(0)));
    }

    isGreaterEqual(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_ge(s1.getAST(), s2.getAST()));
    }

    isLessEqual(s1: Z3NumberFormula, s2: Z3NumberFormula): Z3BooleanFormula {
        return new Z3BooleanFormula(this._ctx.mk_le(s1.getAST(), s2.getAST()));
    }

}

export class Z3StringTheory implements StringTheory<Z3StringFormula> {

    private readonly _ctx: LibZ3InContext;

    constructor(ctx: LibZ3InContext) {
        this._ctx = Preconditions.checkNotUndefined(ctx);
    }

    abstractStringValue(id: Identifier): Z3StringFormula {
        throw new ImplementMeException();
    }

    bottomString(): Z3StringFormula {
        throw new ImplementMeException();
    }

    castBoolAsString(num: AbstractBoolean): Z3StringFormula {
        throw new ImplementMeException();
    }

    castNumberAsString(num: AbstractNumber): Z3StringFormula {
        throw new ImplementMeException();
    }

    emptyString(): Z3StringFormula {
        throw new ImplementMeException();
    }

    fromConcreteString(str: ConcreteString): Z3StringFormula {
        throw new ImplementMeException();
    }

    ithLetterOf(index: AbstractNumber, str: Z3StringFormula): Z3StringFormula {
        throw new ImplementMeException();
    }

    joinStrings(str1: Z3StringFormula, str2: Z3StringFormula): Z3StringFormula {
        throw new ImplementMeException();
    }

    lengthOf(str: Z3StringFormula): AbstractNumber {
        throw new ImplementMeException();
    }

    topString(): Z3StringFormula {
        throw new ImplementMeException();
    }

}

export class Z3ListTheory implements ListTheory<Z3ListFormula> {

    private readonly _ctx: LibZ3InContext;

    constructor(ctx: LibZ3InContext) {
        this._ctx = Preconditions.checkNotUndefined(ctx);
    }

}

export class Z3MemoryTheoryInContext implements AbstractMemoryTheory<Z3Formula, Z3BooleanFormula, Z3NumberFormula, Z3StringFormula, Z3ListFormula> {

    private readonly _boolTheory: BooleanTheory<Z3BooleanFormula>;

    private readonly _listTheory: ListTheory<Z3ListFormula>;

    private readonly _numTheory: RationalNumberTheory<Z3NumberFormula, Z3BooleanFormula>;

    private readonly _stringTheory: StringTheory<Z3StringFormula>;

    private readonly _ctx: LibZ3InContext;

    constructor(ctx: LibZ3InContext) {
        this._ctx = Preconditions.checkNotUndefined(ctx);
        this._boolTheory = new Z3BooleanTheory(ctx);
        this._numTheory = new Z3NumberTheory(ctx);
        this._stringTheory = new Z3StringTheory(ctx);
        this._listTheory = new Z3ListTheory(ctx);
    }

    get boolTheory(): BooleanTheory<Z3BooleanFormula> {
        return this._boolTheory;
    }

    get listTheory(): ListTheory<Z3ListFormula> {
        return this._listTheory;
    }

    get numTheory(): RationalNumberTheory<Z3NumberFormula, Z3BooleanFormula> {
        return this._numTheory;
    }

    get stringTheory(): StringTheory<Z3StringFormula> {
        return this._stringTheory;
    }

}

export class Z3FirstOrderLattice extends SMTFirstOrderLattice<Z3FirstOrderFormula> {

    constructor(theory: BooleanTheory<Z3FirstOrderFormula>, prover: Z3ProverEnvironment) {
        super(theory, prover);
    }

}
