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
import {WasmJSInstance} from "./wasmInstance";

const Z3Mod = require("./libz3.so.js");

export class Z3Context {

    private readonly _context: Z3_context;

}

export class Z3Solver {

    private _lib: LibZ3;

    constructor() {
        this._lib = new LibZ3(Z3Mod);
    }

    public createContext(): Z3Context {
        throw new ImplementMeException();
    }

    get lib(): LibZ3 {
        return this._lib;
    }
}
