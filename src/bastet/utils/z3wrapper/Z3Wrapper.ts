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

import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {LibZ3, Z3_context} from "./libz3";
import {Module} from "./Z3Module";
import {Preconditions} from "../Preconditions";
Preconditions.checkNotUndefined(Module);

const Z3Module = global['Module'];

export class Z3Context {

    private readonly _context: Z3_context;

}

export class SolverFactory {

    public static async createZ3(): Promise<Z3Solver> {
        const z3module = Z3Module;
        require("./libz3.so.js");

        let solverInitPromise = new Promise( (resolve, reject) => {
            Module['onSolverInitDone'] = () => {
                console.log("Hello World");
                resolve();
            };

        });

        let solverInitTimeout = new Promise( (resolve, reject) => {
            setTimeout(_ => {
                resolve(); console.log("Timeout");
            }, 5000);
        });

        await Promise.race([solverInitPromise, solverInitTimeout])
            .then((value) => { })
            .catch((reason) => { });

        return new Z3Solver(z3module)
    }
}

export class Z3Solver {

    private _lib: LibZ3;
    private _module: any;

    constructor(z3mod: any) {
        this._module = Preconditions.checkNotUndefined(z3mod);
        Preconditions.checkNotUndefined(z3mod["asm"]);
        this._lib = new LibZ3(z3mod);
    }

    public createContext(): Z3Context {
        throw new ImplementMeException();
    }

    get lib(): LibZ3 {
        return this._lib;
    }
}
