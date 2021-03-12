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

import {
    LibZ3InContext,
    LibZ3NonContext,
    Z3_ast,
    Z3_ast_vector,
    Z3_func_decl,
    Z3_model,
    Z3_param,
    Z3_solver,
    Z3_sort,
    Z3_symbol,
} from './libz3';
import {Preconditions} from "../../Preconditions";
import {WasmJSInstance} from "./WasmInstance";
import {Z3BooleanFormula, Z3FirstOrderFormula, Z3FirstOrderLattice, Z3Formula, Z3Theories} from "./Z3Theories";
import {FirstOrderSolver} from "../../../procedures/domains/FirstOrderDomain";
import {Sint32, Uint32} from "./ctypes";
import {BooleanTheory} from "../../../procedures/domains/MemoryTransformer";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {BastetConfiguration} from "../../BastetConfiguration";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {DataLocations} from "../../../syntax/app/controlflow/DataLocation";
import {Identifier} from "../../../syntax/ast/core/Identifier";
import {BooleanType} from "../../../syntax/ast/core/ScratchType";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {AnalysisStatistics} from "../../../procedures/analyses/AnalysisStatistics";
import {List as ImmList, Map as ImmMap, Set as ImmSet} from "immutable"
import {
    ConcreteBoolean, ConcreteFloat,
    ConcreteInteger,
    ConcretePrimitive,
    ConcreteString, ConcreteUnifiedMemory
} from "../../../procedures/domains/ConcreteElements";

export var PreModule = {
    print: function (text) {
        console.log(text);
    },

    printErr: function (text) {
        console.error(text);
    },

    locateFile: function (path, scriptDir) {
        return "dist/src/lib/z3/libz3.so.wasm";
    },

    postRun: function () {
    },

    instantiateWasm: function (importObject, callback) {
        const filename = this.locateFile("", "");

        const fs = require('fs');
        const buffer = fs.readFileSync(filename);

        (async () => {
            var theAsmModule;
            await WebAssembly.compile(buffer)
                .then((asmModule) => {
                    theAsmModule = asmModule;
                    return WebAssembly.instantiate(asmModule, importObject);
                })
                .catch((reason => console.log(reason)))
                .then((asmInstance) => callback(asmInstance, theAsmModule))
                .catch((reason) => console.log(reason));
        })();

        return undefined;
    },

    onRuntimeInitialized: function () {
        global['Module']['onSolverInitDone']();
    }
};

global['Module'] = PreModule;

export class SMTFactory {

    public static async createZ3(): Promise<Z3SMT> {
        try {
            require("../../../../lib/z3/libz3.so.js");
        } catch (e) {
            throw new IllegalStateException("Initialization of Z3 failed: " + e);
        }

        let solverInitPromise = new Promise((resolve, reject) => {
            global['Module']['onSolverInitDone'] = () => {
                resolve('Success');
            };

        });

        let solverInitTimeout = new Promise((resolve, reject) => {
            setTimeout(_ => {
                resolve('Success');
            }, 15000);
        });

        await Promise.race([solverInitPromise, solverInitTimeout])
            .then((value) => {
            })
            .catch((reason) => {
            });

        return new Z3SMT(global['Module']);
    }
}

const Z3_L_TRUE = 1;
const Z3_L_UNDEF = 0;
const Z3_L_FALSE = -1;

const Z3_UNSATISFIABLE = -1;
const Z3_SATISFIABLE = 1;

export class Z3ProverEnvironment extends FirstOrderSolver<Z3FirstOrderFormula> {

    private _model: Z3Model;

    private readonly _ctx: LibZ3InContext;
    private readonly _solver: Z3_solver;
    private readonly _theories: Z3Theories;
    private readonly _stats: AnalysisStatistics;
    private readonly _statAllSat: AnalysisStatistics;
    private readonly _statBoolPredAbs: AnalysisStatistics;
    private readonly _statBoolPredAbsSetup: AnalysisStatistics;
    private readonly _statBoolPredAbsAllSat: AnalysisStatistics;

    constructor(ctx: LibZ3InContext, theories: Z3Theories, stats: AnalysisStatistics) {
        super();
        this._ctx = Preconditions.checkNotUndefined(ctx);
        this._solver = this._ctx.mk_solver();
        this._ctx.solver_inc_ref(this._solver);
        this._theories = Preconditions.checkNotUndefined(theories);
        this._stats = Preconditions.checkNotUndefined(stats).withContext("SMT");
        this._statBoolPredAbs = this._stats.withContext("bool-pred-abs");
        this._statBoolPredAbsSetup = this._statBoolPredAbs.withContext("setup");
        this._statBoolPredAbsAllSat = this._statBoolPredAbs.withContext("all-sat");
    }

    private solve(): number {
        const checkResult: Sint32 = this._ctx.solver_check(this._solver);
        if (checkResult.val() == Z3_L_UNDEF) {
            const reason: string = this._ctx.solver_get_reason_unknown(this._solver);
            throw new IllegalArgumentException(`Solving query failed (UNKNOWN): ${reason}`);
        }

        return checkResult.val();
    }

    /**
     * @inheritDoc
     */
    public isUnsat(): boolean {
        const checkResult: number = this.solve();
        this._model = null;
        return checkResult == Z3_UNSATISFIABLE;
    }

    // FIXME: Memory Leak! Result of this method should be a Z3FormulaVector that can release the memory
    //  (it must decrease the references)
    public collectInterpolants(): Z3BooleanFormula[] {
        try {
            // TODO: the following check is very expensive and should somehow be cached so that it can be reused
            // Preconditions.checkState(this.isUnsat(), "Formula should have been unsatisfiable");

            const assertedFormulas = new Z3Vector(this._ctx, this._ctx.solver_get_assertions(this._solver));

            // A refutation from premises (assertions) C (i.e., a proof of "false" from a set of formulas C).
            const proof: Z3_ast = this._ctx.solver_get_proof(this._solver);
            this._ctx.inc_ref(proof);
            try {
                // An interpolation pattern over C. The pattern pat is a formula combining the formulas in C using
                // logical conjunction and the "interp" operator (see Z3_mk_interpolant).
                const asserted = assertedFormulas.asArray();
                asserted.forEach((f) => this.incRef(f));
                try {
                    const pat: Z3_ast = this.buildInterpolationProblem(asserted).getAST();
                    const param: Z3_param = this._ctx.mk_params();
                    return new Z3Vector(this._ctx, this._ctx.get_interpolant(proof, pat, param)).asArray();
                } finally {
                    this._ctx.dec_ref(proof);
                    asserted.forEach((f) => this.decRef(f));
                }
            } finally {
                assertedFormulas.release();
            }
        } catch (e) {
            throw new IllegalArgumentException(`Interpolation failed. ${e.toString()}`);
        }
    }

    // FIXME: memory leaks! Have to increment and decrement the reference counters!
    private buildInterpolationProblem(seq: Z3BooleanFormula[]): Z3Formula {
        Preconditions.checkArgument(seq.length > 1,
            `Only got ${seq.length} formula(s) but there should have been at least 2`);

        const interpolationPoints: Z3_ast[] = [];
        for (const formula of seq.reverse()) {
            const point = this._ctx.mk_interpolant(formula.getAST());
            interpolationPoints.push(point);
            this._ctx.inc_ref(point);
        }

        const trueBool: Z3_ast = this._theories.boolTheory.trueBool().getAST();
        const conjunction = interpolationPoints.reduce((x, y) => this._ctx.mk_interpolant(
            this._theories.boolTheory.and(new Z3BooleanFormula(x), new Z3BooleanFormula(y)).getAST()), trueBool);
        return new Z3BooleanFormula(conjunction);
    }

    private buildInterpolationProblem2(seq: Z3BooleanFormula[]): Z3Formula {
        Preconditions.checkArgument(seq.length > 1,
            `Only got ${seq.length} formula(s) but there should have been at least 2`);

        const interpolationPoints: Z3_ast[] = [];
        for (const formula of seq) {
            const point = this._ctx.mk_interpolant(formula.getAST());
            interpolationPoints.push(point);
            this._ctx.inc_ref(point);
        }

        const trueBool = this._theories.boolTheory.trueBool().getAST();
        const conjunction = interpolationPoints.reduce((x, y) =>
            this._theories.boolTheory.and(new Z3BooleanFormula(x), new Z3BooleanFormula(y)).getAST(), trueBool);
        return new Z3BooleanFormula(conjunction);
    }

    /**
     * @inheritDoc
     */
    public isSat(): boolean {
        this._model = null;
        const checkResult: number = this.solve();
        return checkResult == Z3_SATISFIABLE;
    }

    /**
     * Assert a constraint `f` into the solver.
     *
     * @param f
     */
    public assert(f: Z3FirstOrderFormula): void {
        // console.log(this._ctx.ast_to_string(
        //     f.getAST()
        // ));
        this._ctx.solver_assert(this._solver, f.getAST());
        this._model = null;
    }

    /**
     * Remove all assertions from the solver.
     */
    public reset(): void {
        this._ctx.solver_reset(this._solver);
        this._model = null;
    }

    /**
     * Backtrack one backtracking point.
     */
    public pop(): void {
        this._ctx.solver_pop(this._solver, new Uint32(1));
        this._model = null;
    }

    /**
     * Create a backtracking point.
     */
    public push(): void {
        this._ctx.solver_push(this._solver);
        this._model = null;
    }

    public release(): void {
        this.reset();
        this._ctx.solver_dec_ref(this._solver);
        if (this._model) {
            this._model.release();
            this._model = null;
        }
    }

    public getModel(): Z3Model {
        if (!this._model) {
            this._model = new Z3Model(this._ctx, this._ctx.solver_get_model(this._solver));
        }

        return this._model;
    }

    public getCores(): Z3Vector {
        return new Z3Vector(this._ctx, this._ctx.solver_get_unsat_core(this._solver));
    }

    public stringRepresentation(f: Z3FirstOrderFormula): string {
        return this._ctx.ast_to_string(f.getAST());
    }

    private createFreeVariables(abstrPrec: Z3BooleanFormula[]): [string, Z3BooleanFormula][] {
        const result: [string, Z3BooleanFormula][] = [];
        const theories = new Z3Theories(this._ctx);

        for (let i = 0; i < abstrPrec.length; i++) {
            const varName = `__v_${i}`;
            const varData = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of(varName), BooleanType.instance()));
            result.push([varName, theories.boolTheory.abstractBooleanValue(varData)]);
        }

        return result;
    }

    formWithVariable(formula: Z3BooleanFormula, predicates: Z3BooleanFormula[], varMap: [string, Z3BooleanFormula][]): Z3BooleanFormula {
        const theories = new Z3Theories(this._ctx);

        let result = formula;
        varMap.forEach(([varName, varFormula], index) => {
            result = theories.boolTheory.and(result,
                theories.boolTheory.equal(predicates[index], varFormula));
        });

        return result;
    }

    /**
     * Given a formula in predicate logic, compute all satisfying
     * assignments for a given list `important` (\overline{v}) of (Boolean) variables.
     *
     * @param abstractionProblem. Note that `abstractionProblem` already encodes
     *      the list of predicates (equivalences with the Boolean variables from the list `important`.
     * @param freeVariables. The list of Boolean variables that correspond to the column names
     *      of the truth table to construct.
     *
     * @returns The truth table.
     */
    public allSat(abstractionProblem: Z3BooleanFormula, freeVariables: [string, Z3BooleanFormula][]): boolean[][] {
        if (freeVariables == null || freeVariables.length < 1) {
            throw new IllegalArgumentException("'important' must NOT be empty!");
        }

        let result: boolean[][] = [];

        const theories = new Z3Theories(this._ctx);

        // Start a new formula environment using `push`
        this.push();
        this.assert(abstractionProblem);

        // Build the truth-table row-by-row. One row for each satisfying assignment.
        // Terminate if there is no satisfying assignment left.
        let i: number = 0;
        while (this.isSat()) {
            // Get the model for the satisfying formula
            let modelConstValueMap: ConcreteUnifiedMemory;
            {
                const model: Z3Model = this.getModel();
                try {
                    modelConstValueMap = model.getValueMap();
                } finally {
                    model.release();
                }
            }

            // Create the truth-table row and push it to the result

            result[i] = [];
            let newFormula: Z3BooleanFormula;
            let j: number = 0;
            freeVariables.forEach(([variableName, variableFormula]) => {
                let modelValue: ConcretePrimitive<any> = modelConstValueMap.getValue(variableName);
                let helpForm = variableFormula;
                if (modelValue == null || !(modelValue instanceof ConcreteBoolean)) {
                    throw new IllegalArgumentException("There's a problem in 'abstractionProblem'");
                } else {
                    if (!modelValue.value) {
                        helpForm = theories.boolTheory.not(helpForm);
                    }
                    result[i][j] = modelValue.value;
                }
                newFormula = this.boolTermAnd(newFormula, helpForm, theories);
                j++;
            })
            this.assert(theories.boolTheory.not(newFormula));
            i++;
        }
        this.pop();
        return result;
    }

    /**
     * Compute the Boolean predicate abstraction for a given formula.
     *
     * @param formulaToAbstract
     * @param predicates
     */
    booleanAbstraction(formulaToAbstract: Z3FirstOrderFormula, predicates: Z3FirstOrderFormula[]): Z3FirstOrderFormula {
        this._statBoolPredAbsSetup.startTimer();
        // Create a new free Boolean variable for each of the predicates
        const freeVariables: [string, Z3BooleanFormula][] = this.createFreeVariables(predicates);

        // Create the formula to compute allSatFor (adds the free variables along with equivalences)
        const newForm: Z3BooleanFormula = this.formWithVariable(formulaToAbstract, predicates, freeVariables);
        this._statBoolPredAbsSetup.stopTimer();

        this._statBoolPredAbsAllSat.startTimer();
        const retTable = this.allSat(newForm, freeVariables);
        this._statBoolPredAbsAllSat.stopTimer();

        return this.truthTableToSummaryFormula(retTable, predicates);
    }

    cartesianAbstraction(abstractionProblem: Z3FirstOrderFormula, predicates: Z3FirstOrderFormula[]): Z3FirstOrderFormula {
        throw new ImplementMeException();
    }

    truthTableToSummaryFormula(retTable: boolean[][], predicates: Z3FirstOrderFormula[]): Z3BooleanFormula {
        const theories = new Z3Theories(this._ctx);
        let result = theories.boolTheory.falseBool();

        retTable.forEach(row => {
            let form;
            for (let i = 0; i < row.length; i++) {
                const value = row[i];
                let term = predicates[i];
                if(!value) {
                    term = theories.boolTheory.not(term);
                }
                form = this.boolTermAnd(form, term, theories);
            }
            result = this.boolTermOr(result, form, theories);
        });

        return result;
    }

    private boolTermAnd(baseForm: Z3BooleanFormula | null, addForm: Z3BooleanFormula, theories: Z3Theories): Z3BooleanFormula {
        let retTerm : Z3BooleanFormula;
        if (baseForm == null) {
            retTerm = addForm;
        } else {
            retTerm = theories.boolTheory.and(baseForm, addForm)
        }
        return retTerm;
    }

    private boolTermOr(baseForm: Z3BooleanFormula | null, addForm: Z3BooleanFormula, theories: Z3Theories): Z3BooleanFormula {
        let retTerm : Z3BooleanFormula;
        if (baseForm == null) {
            retTerm = addForm;
        } else {
            retTerm = theories.boolTheory.or(baseForm, addForm)
        }
        return retTerm;
    }

    public incRef(f: Z3FirstOrderFormula) {
        this._ctx.inc_ref(f.getAST());
    }

    public decRef(f: Z3FirstOrderFormula) {
        this._ctx.dec_ref(f.getAST());
    }
}

export class Z3Vector {

    private readonly _ctx: LibZ3InContext;

    private readonly _v: Z3_ast_vector;

    constructor(ctx: LibZ3InContext, v: Z3_ast_vector) {
        this._ctx = Preconditions.checkNotUndefined(ctx);
        this._v = v;
        this._ctx.ast_vector_inc_ref(this._v);
    }

    get vector(): Z3_ast_vector {
        return this._v;
    }

    public release(): void {
        this._ctx.ast_vector_dec_ref(this._v);
    }

    public get(index: number): Z3Formula {
        return new Z3BooleanFormula(this._ctx.ast_vector_get(this._v, new Uint32(index)));
    }

    public size(): number {
        return this._ctx.ast_vector_size(this._v).val();
    }

    public asArray(): Z3Formula[] {
        const result = [];
        var i = this.size() - 1;
        while (i >= 0) {
            result.push(this.get(i));
            i--;
        }
        return result;
    }

}

export class Z3Model {

    private readonly _ctx: LibZ3InContext;

    private readonly _model: Z3_model;

    private _valueMap: ConcreteUnifiedMemory;

    constructor(ctx: LibZ3InContext, model: Z3_model) {
        this._ctx = Preconditions.checkNotUndefined(ctx);
        this._model = Preconditions.checkNotUndefined(model);
        this._ctx.model_inc_ref(model);
        this._valueMap = null;
    }

    public release(): void {
        this._ctx.model_dec_ref(this._model);
    }

    private getConstName(ctx: LibZ3InContext, constDecl: Z3_func_decl): string {
        const symbol: Z3_symbol = ctx.get_decl_name(constDecl);
        return ctx.get_symbol_string(symbol);
    }

    private mapInterpToValue(constInterp: Z3_ast, ctx: LibZ3InContext): ConcretePrimitive<any> {
        const sort: Z3_sort = ctx.get_sort(constInterp);
        const sortString: string = ctx.sort_to_string(sort);

        switch (sortString) {
            case "String":
                return new ConcreteString(ctx.get_string(constInterp));
            case "Int":
                return new ConcreteInteger(parseInt(ctx.get_numeral_string(constInterp)));
            case "Bool":
                return new ConcreteBoolean(Z3_L_TRUE == ctx.get_bool_value(constInterp).val());
            case "Real":
                return new ConcreteFloat(parseFloat(ctx.get_numeral_string(constInterp)));
            default:
                throw new IllegalStateException(`Unknown const type '${sortString}'`)
        }
    }

    private getConstValue(ctx: LibZ3InContext, constDecl: Z3_func_decl, model: Z3_model): ConcretePrimitive<any> {
        const constInterp: Z3_ast = ctx.model_get_const_interp(model, constDecl);
        ctx.inc_ref(constInterp);
        const value = this.mapInterpToValue(constInterp, ctx);
        ctx.dec_ref(constInterp);

        return value;
    }

    public getValueMap(): ConcreteUnifiedMemory {
        if (!this._valueMap) {
            const valueMap = new Map<string, ConcretePrimitive<any>>();
            for (let index = 0; index < this.getNumConst(); index++) {
                const constDecl: Z3_func_decl = this._ctx.model_get_const_decl(this._model, new Uint32(index));
                valueMap.set(this.getConstName(this._ctx, constDecl), this.getConstValue(this._ctx, constDecl, this._model));
            }
            this._valueMap = new ConcreteUnifiedMemory(ImmMap(valueMap));
        }

        return this._valueMap;
    }

    public getNumConst(): number {
        return this._ctx.model_get_num_consts(this._model).val();
    }
}

type Z3VariableAssignment = string | number | boolean;

export class SolverConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ['Solver']);
    }

    get encodeAllNumbersAsFloats(): boolean {
        return this.getBoolProperty('encode-all-numbers-as-floats', true);
    }

}

export class Z3SMT extends LibZ3NonContext {

    private _module: WasmJSInstance;

    constructor(z3mod: WasmJSInstance) {
        super(z3mod);
        this._module = Preconditions.checkNotUndefined(z3mod);
    }

    public createContext(): LibZ3InContext {
        const cfg = this.mk_config();
        // this.set_param_value(cfg, "timeout", "60000"); // Timeout in milliseconds (the Z3 WASM must be recompiled with PTHREADS enabled)
        this.set_param_value(cfg, "proof", "true"); // No proof generation (sufficient for BMC)
        this.set_param_value(cfg, "unsat_core", "true"); // No unsat-core generation (sufficient for BMC)
        this.set_param_value(cfg, "model", "true"); // Create models

        const ctx = this.mk_context(cfg);
        return new LibZ3InContext(this._wasmInstance, ctx);
    }

    public createProver(ctx: LibZ3InContext, stats: AnalysisStatistics): Z3ProverEnvironment {
        return new Z3ProverEnvironment(ctx, this.createTheories(ctx), stats);
    }

    public createTheories(ctx: LibZ3InContext): Z3Theories {
        return new Z3Theories(ctx);
    }

    public createLattice(prover: Z3ProverEnvironment, boolTheory: BooleanTheory<Z3FirstOrderFormula>): Z3FirstOrderLattice {
        return new Z3FirstOrderLattice(boolTheory, prover);
    }

}
