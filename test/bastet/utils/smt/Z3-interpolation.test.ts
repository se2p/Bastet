/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of Passau (uni-passau.de)
 *
 *   See the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Please make sure to CITE this work in your publications if you
 *   build on this work. Some of our maintainers or contributors might
 *   be interested in actively CONTRIBUTING to your research project.
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
import {VariableWithDataLocation} from "../../../../src/bastet/syntax/ast/core/Variable";
import {DataLocations} from "../../../../src/bastet/syntax/app/controlflow/DataLocation";
import {Identifier} from "../../../../src/bastet/syntax/ast/core/Identifier";
import {ConcreteNumber} from "../../../../src/bastet/procedures/domains/ConcreteElements";
import {Z3FirstOrderFormula, Z3Theories} from "../../../../src/bastet/utils/smt/z3/Z3Theories";
import {IntegerType} from "../../../../src/bastet/syntax/ast/core/ScratchType";
import {AnalysisStatistics} from "../../../../src/bastet/procedures/analyses/AnalysisStatistics";


let smt: Z3SMT;
let ctx;
let theories: Z3Theories;
let prover;

beforeAll( async (done) => {
    smt = await SMTFactory.createZ3();
    ctx = smt.createContext();
    theories = smt.createTheories(ctx);
    prover = smt.createProver(ctx, new AnalysisStatistics("Test", {}));

    done();
});

test ("Interpolation.SafeProgram", async () => {

    // loop-3-SAFE.sc
    /*
    x@0 = 3       && y@0 = 0       && x@0 != 0 &&   // vor der Schleife
    x@1 = x@0 - 1 && y@1 = y@0 + 1 && x@1 != 0 &&   // erste Iteration
    x@2 = x@1 - 1 && y@2 = y@1 + 1 && x@2 != 0 &&   // zweite Iteration
    x@3 = x@2 - 1 && y@3 = y@2 + 1 && x@3 == 0 &&   // dritte Iteration
                                      y@3 != 3      // if-Bedingung
     */

    prover.push();

    const makeVariables = (index: number): [Z3FirstOrderFormula, Z3FirstOrderFormula] => {
        const x0 = theories.intTheory.abstractNumberValue(new VariableWithDataLocation(
            DataLocations.createTypedLocation(Identifier.of(`x@${index}`), IntegerType.instance())));
        const y0 = theories.intTheory.abstractNumberValue(new VariableWithDataLocation(
            DataLocations.createTypedLocation(Identifier.of(`y@${index}`), IntegerType.instance())));
        return [x0, y0];
    }

    const [x0, y0] = makeVariables(0);
    const [x1, y1] = makeVariables(1);
    const [x2, y2] = makeVariables(2);
    const [x3, y3] = makeVariables(3);

    const three = theories.intTheory.fromConcreteNumber(new ConcreteNumber(3));
    const zero = theories.intTheory.fromConcreteNumber(new ConcreteNumber(0));
    const one = theories.intTheory.fromConcreteNumber(new ConcreteNumber(1));

    const p0 = theories.intTheory.isNumberEqualTo(x0, three);
    const p1 = theories.intTheory.isNumberEqualTo(y0, zero);
    const p2 = theories.boolTheory.not(theories.intTheory.isNumberEqualTo(x0, zero));

    const l0 = theories.boolTheory.and(theories.boolTheory.and(p0, p1), p2);

    const makeLoopBody = (xBefore, xAfter, yBefore, yAfter, reentry = true) => {
        const p0 = theories.intTheory.isNumberEqualTo(xAfter, theories.intTheory.minus(xBefore, one));
        const p1 = theories.intTheory.isNumberEqualTo(yAfter, theories.intTheory.plus(yBefore, one));
        let p2;
        if (reentry) {
            p2 = theories.boolTheory.not(theories.intTheory.isNumberEqualTo(xAfter, zero)); // x != y  <==> !(x == y)
        } else {
            p2 = theories.intTheory.isNumberEqualTo(xAfter, zero);
        }
        return theories.boolTheory.and(theories.boolTheory.and(p0, p1), p2);
    }

    const l1 = makeLoopBody(x0, x1, y0, y1);
    const l2 = makeLoopBody(x1, x2, y1, y2);
    const l3 = makeLoopBody(x2, x3, y2, y3, false);
    const l4 = theories.boolTheory.not(theories.intTheory.isNumberEqualTo(y3, three));

    [l0, l1, l2, l3, l4].forEach(x => prover.assert(x));
    const isUnsat = prover.isUnsat();
    expect(isUnsat).toBeTruthy();

    const interpolants = prover.collectInterpolants().map(x => theories.stringRepresentation(x));
    expect(interpolants).toContain("(= y@3 3)");

    prover.pop();
})

test("Interpolation.OnlyY", async () => {
    prover.push();

    const y = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("y@0"), IntegerType.instance()));

    const f1 = theories.intTheory.isNumberEqualTo(
        theories.intTheory.abstractNumberValue(y),
        theories.intTheory.fromConcreteNumber(new ConcreteNumber(42)));

    const f2 = theories.boolTheory.not(theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(y),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))));

    prover.assert(f1);
    prover.assert(f2);

    const isUnsat: boolean = prover.isUnsat();

    const interpolants = prover.collectInterpolants();

    expect(interpolants.length).toBeGreaterThan(0);

    for (const c of interpolants) {
        console.log(theories.stringRepresentation(c));
    }

    const interpolantsString = prover.collectInterpolants().map(x => theories.stringRepresentation(x));
    expect(interpolantsString).toContain("(= y@0 42)");

    prover.pop();
});

test ("Interpolation", async () => {
    prover.push();

    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), IntegerType.instance()));
    const y = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("y"), IntegerType.instance()));

    const f1 = theories.boolTheory.and(
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(0))),
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(y),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))));

    const f2 = theories.boolTheory.and(
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(0))),
        theories.boolTheory.not(theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(y),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42)))));

    prover.assert(f1);
    prover.assert(f2);

    const isUnsat: boolean = prover.isUnsat();

    const interpolants = prover.collectInterpolants();

    expect(interpolants.length).toBeGreaterThan(0);

    for (const c of interpolants) {
        console.log(theories.stringRepresentation(c));
    }

    prover.pop();
});
