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

import {LibZ3InContext, LibZ3NonContext, Z3_solver} from "./libz3";
import {Preconditions} from "../../Preconditions";
import {WasmJSInstance} from "./WasmInstance";
import {Z3FirstOrderFormula, Z3FirstOrderLattice, Z3Theories} from "./Z3Theories";
import {FirstOrderSolver} from "../../../procedures/domains/FirstOrderDomain";
import {Sint32, Uint32} from "./ctypes";
import {BooleanTheory} from "../../../procedures/domains/MemoryTransformer";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {BastetConfiguration} from "../../BastetConfiguration";

export var PreModule = {
    print: function(text) {
        console.log(text);
    },

    printErr: function(text) {
        console.error(text);
    },

    locateFile: function (path, scriptDir) {
        return "dist/src/lib/z3/libz3.so.wasm";
    },

    postRun: function() {
    },

    instantiateWasm: function(importObject, callback) {
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

    onRuntimeInitialized: function() {
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

        let solverInitPromise = new Promise( (resolve, reject) => {
            global['Module']['onSolverInitDone'] = () => {
                resolve();
            };

        });

        let solverInitTimeout = new Promise( (resolve, reject) => {
            setTimeout(_ => {
                resolve();
            }, 15000);
        });

        await Promise.race([solverInitPromise, solverInitTimeout])
            .then((value) => { })
            .catch((reason) => { });

        return new Z3SMT(global['Module']);
    }
}

const Z3_L_TRUE = 1;
const Z3_L_UNDEF = 0;
const Z3_L_FALSE = -1;

export class Z3ProverEnvironment extends FirstOrderSolver<Z3FirstOrderFormula> {

    private _ctx: LibZ3InContext;
    private _solver: Z3_solver;

    constructor(ctx: LibZ3InContext) {
        super();
        this._ctx = Preconditions.checkNotUndefined(ctx);
        this._solver = this._ctx.mk_solver();
        this._ctx.solver_inc_ref(this._solver);
    }

    /**
     * Check whether the assertions in a given solver are consistent or not.
     */
    public isUnsat(): boolean {
        const checkResult: Sint32 = this._ctx.solver_check(this._solver);
        return (checkResult.val() == Z3_L_FALSE);
    }

    /**
     * Assert a constraint `f` into the solver.
     *
     * @param f
     */
    public assert(f: Z3FirstOrderFormula): void  {
        console.log(this._ctx.ast_to_string(
            f.getAST()
        ));
        this._ctx.solver_assert(this._solver, f.getAST());
    }

    /**
     * Remove all assertions from the solver.
     */
    public reset(): void {
        this._ctx.solver_reset(this._solver);
    }

    /**
     * Backtrack one backtracking point.
     */
    public pop(): void {
        this._ctx.solver_pop(this._solver, new Uint32(1));
    }

    /**
     * Create a backtracking point.
     */
    public push(): void {
        this._ctx.solver_push(this._solver);
    }

    public release(): void {
        this.reset();
        this._ctx.solver_dec_ref(this._solver);
    }

}


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
        this.set_param_value(cfg, "proof", "false"); // No proof generation (sufficient for BMC)
        this.set_param_value(cfg, "unsat_core", "false"); // No unsat-core generation (sufficient for BMC)

        const ctx = this.mk_context(cfg);
        return new LibZ3InContext(this._wasmInstance, ctx);
    }

    public createProver(ctx: LibZ3InContext): Z3ProverEnvironment {
        return new Z3ProverEnvironment(ctx);
    }

    public createTheories(ctx: LibZ3InContext): Z3Theories {
        return new Z3Theories(ctx);
    }

    public createLattice(prover: Z3ProverEnvironment, boolTheory: BooleanTheory<Z3FirstOrderFormula>): Z3FirstOrderLattice {
        return new Z3FirstOrderLattice(boolTheory, prover);
    }

}
