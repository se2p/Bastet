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

var Module = {
    print: function(text) {
        console.log(text);
    },

    printErr: function(text) {
        console.error(text);
    },

    locateFile: function (path, scriptDir) {
        return "lib/z3/libz3.so.wasm";
    },

    instantiateWasm: function(info, callback) {
        const filename = this.locateFile("", "");

        const fs = require('fs');
        const buffer = fs.readFileSync(filename);

        const env = {
            memoryBase: 0,
            tableBase: 0,
            memory: new WebAssembly.Memory({
                initial: 256
            }),
            table: new WebAssembly.Table({
                initial: 0,
                element: 'anyfunc'
            })
        };

        (async () => {
            const modulePromies = WebAssembly.compile(buffer);
            const module = await modulePromies;
            console.log(module);
            const instancePromies = WebAssembly.instantiate(module, env);
            const instance = await instancePromies;
            console.log(instancePromies);

            console.log(instance.exports);
            Module["asm"] = instance.exports;
        })();

        return Module["asm"];
    }

};

global['Module'] = Module;

global.Module = Module;

