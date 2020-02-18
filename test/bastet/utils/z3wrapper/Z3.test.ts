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

import {SMTFactory, Z3SMT} from "../../../../src/bastet/utils/z3wrapper/Z3Wrapper";

let smt: Z3SMT;
let ctx;
let theory;
let prover;

beforeAll( async (done) => {
    smt = await SMTFactory.createZ3();
    ctx = smt.createContext();
    theory = smt.createTheory(ctx);
    prover = smt.createProver(ctx);
    done();
});


test ("Case: False", () => {
    prover.push();
    const falseFormula = theory.boolTheory.falseBool();
    prover.assert(falseFormula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(true);
    prover.pop();
});

test ("Case: True", () => {
    prover.push();
    const trueFormula = theory.boolTheory.trueBool();
    prover.assert(trueFormula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(false);
    prover.pop();
});


