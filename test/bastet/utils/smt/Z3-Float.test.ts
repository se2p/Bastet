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
import {VariableWithDataLocation} from "../../../../src/bastet/syntax/ast/core/Variable";
import {DataLocations} from "../../../../src/bastet/syntax/app/controlflow/DataLocation";
import {FloatType} from "../../../../src/bastet/syntax/ast/core/ScratchType";
import {Identifier} from "../../../../src/bastet/syntax/ast/core/Identifier";
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

test ("Case: 1 < 0", async (done) => {
    prover.push();
    const falseFormula = theories.floatTheory.isLessThan(theories.floatTheory.one(), theories.floatTheory.zero());
    prover.assert(falseFormula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(true);
    prover.pop();
    done();
});

test ("Case: 1 > 0", async (done) => {
    prover.push();
    const falseFormula = theories.floatTheory.isGreaterThan(theories.floatTheory.one(), theories.floatTheory.zero());
    prover.assert(falseFormula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(false);
    prover.pop();
    done();
});

test ("Case: Cast float from int. True", async (done) => {
    prover.push();
    const intFormula = theories.intTheory.fromConcreteNumber(new ConcreteNumber(42));
    const floatFormula = theories.floatTheory.castFrom(intFormula);
    const formula = theories.floatTheory.isNumberEqualTo(floatFormula, theories.floatTheory.fromConcreteNumber(new ConcreteNumber(42)));
    prover.assert(formula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(false);
    prover.pop();
    done();
});

test ("Case: Cast float from int. False", async (done) => {
    prover.push();
    const intFormula = theories.intTheory.fromConcreteNumber(new ConcreteNumber(42));
    const floatFormula = theories.floatTheory.castFrom(intFormula);
    const formula = theories.boolTheory.not(theories.floatTheory.isNumberEqualTo(floatFormula, theories.floatTheory.fromConcreteNumber(new ConcreteNumber(42))));
    prover.assert(formula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(true);
    prover.pop();
    done();
});

test ("Case: Cast float to int. True", async (done) => {
    prover.push();
    const floatFormula = theories.floatTheory.fromConcreteNumber(new ConcreteNumber(1.1));
    const intFormula = theories.intTheory.castFrom(floatFormula);
    const formula = theories.intTheory.isNumberEqualTo(intFormula, theories.intTheory.fromConcreteNumber(new ConcreteNumber(1)));
    prover.assert(theories.boolTheory.not(formula));
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(true);
    prover.pop();
    done();
});

xtest ("Case: Cast float to int. Variables. True", async (done) => {
    prover.push();
    const floatOneOne = theories.floatTheory.fromConcreteNumber(new ConcreteNumber(1.1));
    const floatVar = theories.floatTheory.abstractNumberValue(
        new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("f"), FloatType.instance())));
    const floatVarEq = theories.floatTheory.isNumberEqualTo(floatVar, floatOneOne);
    const intFromFloatVar = theories.intTheory.castFrom(floatVar);
    const checkCastResult = theories.intTheory.isNumberEqualTo(intFromFloatVar, theories.intTheory.fromConcreteNumber(new ConcreteNumber(1)));
    prover.assert(floatVarEq);
    prover.assert(theories.boolTheory.not(checkCastResult));
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(true);
    prover.pop();
});


test ("Case: From string. True", async (done) => {
    prover.push();
    const floatFormula1 = theories.floatTheory.fromConcreteString(new ConcreteString("12.4"));
    const floatFormula2 = theories.floatTheory.fromConcreteString(new ConcreteString("12.5"));
    const formula = theories.floatTheory.isGreaterThan(floatFormula1, floatFormula2);
    prover.assert(formula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(true);
    prover.pop();
    done();
});

test ("Case: From string. False", async (done) => {
    prover.push();
    const floatFormula1 = theories.floatTheory.fromConcreteString(new ConcreteString("12.4"));
    const floatFormula2 = theories.floatTheory.fromConcreteString(new ConcreteString("12.5"));
    const formula = theories.floatTheory.isLessThan(floatFormula1, floatFormula2);
    prover.assert(formula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(false);
    prover.pop();
    done();
});
