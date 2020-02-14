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

import {LibZ3InContext, LibZ3NonContext} from "./libz3";
import {Preconditions} from "../Preconditions";
import {WasmJSInstance} from "./wasmInstance";

export var PreModule = {
    print: function(text) {
        console.log(text);
    },

    printErr: function(text) {
        console.error(text);
    },

    locateFile: function (path, scriptDir) {
        return "lib/z3/libz3.so.wasm";
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

export class SolverFactory {

    public static async createZ3(): Promise<Z3Solver> {
        require("./libz3.so.js");

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

        return new Z3Solver(global['Module']);
    }
}

export class Z3Solver extends LibZ3NonContext {

    private _module: WasmJSInstance;

    constructor(z3mod: WasmJSInstance) {
        super(z3mod);
        this._module = Preconditions.checkNotUndefined(z3mod);
    }

    public createContext(): LibZ3InContext {
        const cfg = this.mk_config();
        const ctx = this.mk_context(cfg);
        return new LibZ3InContext(this._wasmInstance, ctx);
    }

}
