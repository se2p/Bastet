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

import {SMTFactory, Z3SMT} from "../../../../src/bastet/utils/smt/z3/Z3SMT";
import {ConcreteNumber, ConcreteString} from "../../../../src/bastet/procedures/domains/ConcreteElements";
import {AnalysisStatistics} from "../../../../src/bastet/procedures/analyses/AnalysisStatistics";

let smt: Z3SMT;
let ctx;
let theories;
let prover;

beforeAll( async (done) => {
    smt = await SMTFactory.createZ3();
    ctx = smt.createContext();
    theories = smt.createTheories(ctx);
    prover = smt.createProver(ctx, new AnalysisStatistics("Test", {}));
    done();
});

test ("Case: 1 < 0", async () => {
    prover.push();
    const falseFormula = theories.realTheory.isLessThan(theories.realTheory.one(), theories.realTheory.zero());
    prover.assert(falseFormula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(true);
    prover.pop();
});

test ("Case: 1 > 0", async () => {
    prover.push();
    const falseFormula = theories.realTheory.isGreaterThan(theories.realTheory.one(), theories.realTheory.zero());
    prover.assert(falseFormula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(false);
    prover.pop();
});

test ("Case: Cast real from int. True", async () => {
    prover.push();
    const intFormula = theories.intTheory.fromConcreteNumber(new ConcreteNumber(42));
    const realFormula = theories.realTheory.castFrom(intFormula);
    const formula = theories.realTheory.isNumberEqualTo(realFormula, theories.realTheory.fromConcreteNumber(new ConcreteNumber(42)));
    prover.assert(formula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(false);
    prover.pop();
});

test ("Case: Cast real from int. False", async () => {
    prover.push();
    const intFormula = theories.intTheory.fromConcreteNumber(new ConcreteNumber(42));
    const realFormula = theories.realTheory.castFrom(intFormula);
    const formula = theories.boolTheory.not(theories.realTheory.isNumberEqualTo(realFormula, theories.realTheory.fromConcreteNumber(new ConcreteNumber(42))));
    prover.assert(formula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(true);
    prover.pop();
});

test ("Case: From string. True", async () => {
    prover.push();
    const realFormula1 = theories.realTheory.fromConcreteString(new ConcreteString("12.4"));
    const realFormula2 = theories.realTheory.fromConcreteString(new ConcreteString("12.5"));
    const formula = theories.realTheory.isGreaterThan(realFormula1, realFormula2);
    prover.assert(formula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(true);
    prover.pop();
});

test ("Case: From string. False", async () => {
    prover.push();
    const realFormula1 = theories.realTheory.fromConcreteString(new ConcreteString("12.4"));
    const realFormula2 = theories.realTheory.fromConcreteString(new ConcreteString("12.5"));
    const formula = theories.realTheory.isLessThan(realFormula1, realFormula2);
    prover.assert(formula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(false);
    prover.pop();
});
