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

import {SMTFactory, Z3Const, Z3Model, Z3SMT} from "../../../../src/bastet/utils/smt/z3/Z3SMT";
import {VariableWithDataLocation} from "../../../../src/bastet/syntax/ast/core/Variable";
import {DataLocations} from "../../../../src/bastet/syntax/app/controlflow/DataLocation";
import {Identifier} from "../../../../src/bastet/syntax/ast/core/Identifier";
import {ConcreteNumber, ConcreteString} from "../../../../src/bastet/procedures/domains/ConcreteElements";
import {Z3FirstOrderLattice, Z3NumberFormula, Z3Theories} from "../../../../src/bastet/utils/smt/z3/Z3Theories";
import {BooleanType, IntegerType, StringType} from "../../../../src/bastet/syntax/ast/core/ScratchType";

let smt: Z3SMT;
let ctx;
let theories: Z3Theories;
let prover;

beforeAll( async (done) => {
    smt = await SMTFactory.createZ3();
    ctx = smt.createContext();
    theories = smt.createTheories(ctx);
    prover = smt.createProver(ctx);
    done();
});


test ("Case: False", () => {
    prover.push();
    const falseFormula = theories.boolTheory.falseBool();
    prover.assert(falseFormula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(true);
    prover.pop();
});

test ("Case: True", () => {
    prover.push();
    const trueFormula = theories.boolTheory.trueBool();
    prover.assert(trueFormula);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(false);
    prover.pop();
});

test ("Substitute", () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), IntegerType.instance()));
    const y = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("y"), IntegerType.instance()));
    const xvar = theories.intTheory.abstractNumberValue(x);
    const yvar = theories.intTheory.abstractNumberValue(y);

    const fx = theories.boolTheory.and(
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(0))),
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))));

    const fy = theories.substitute(fx, [xvar], [yvar]);
    expect(theories.stringRepresentation(fy)).toEqual("(and (= y 0) (= y 42))");
});

test ("Implication. Unsat", () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), IntegerType.instance()));
    prover.push();
    const f = theories.boolTheory.and(
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(0))),
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))));
    prover.assert(f);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(true);
    prover.pop();
});

test ("Implication. Sat", () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), IntegerType.instance()));
    prover.push();
    const f = theories.boolTheory.and(
                theories.intTheory.isNumberEqualTo(
                    theories.intTheory.abstractNumberValue(x),
                    theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))),
                theories.intTheory.isNumberEqualTo(
                    theories.intTheory.abstractNumberValue(x),
                    theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))));
    prover.assert(f);
    const isUnsat: boolean = prover.isUnsat();
    expect(isUnsat).toBe(false);
    prover.pop();
});

test("Lattice Include 1", () => {
    const lattice = new Z3FirstOrderLattice(theories.boolTheory, prover);
    const result = lattice.isIncluded(lattice.top(), lattice.bottom());
    expect(result).toBe(false);
});

test("Lattice Include 2", () => {
    const lattice = new Z3FirstOrderLattice(theories.boolTheory, prover);
    const result = lattice.isIncluded(lattice.bottom(), lattice.bottom());
    expect(result).toBe(true);
});

test("Lattice Include 3", () => {
    const lattice = new Z3FirstOrderLattice(theories.boolTheory, prover);
    const result = lattice.isIncluded(lattice.top(), lattice.top());
    expect(result).toBe(true);
});

test("Lattice Include 4", () => {
    const lattice = new Z3FirstOrderLattice(theories.boolTheory, prover);
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), IntegerType.instance()));
    const f = theories.boolTheory.and(
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))),
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))));
    const result = lattice.isIncluded(f, lattice.bottom());
    expect(result).toBe(false);
});

test("Lattice Include 5", () => {
    const lattice = new Z3FirstOrderLattice(theories.boolTheory, prover);
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), IntegerType.instance()));
    const f = theories.boolTheory.and(
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(0))),
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))));
    const result = lattice.isIncluded(f, lattice.bottom());
    expect(result).toBe(true);
});

test("Lattice Include T 1", () => {
    const lattice = new Z3FirstOrderLattice(theories.boolTheory, prover);
    const t: Z3NumberFormula = theories.intTheory.abstractNumberValue(new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("t"), IntegerType.instance())));
    const u1: Z3NumberFormula = theories.intTheory.abstractNumberValue(new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("u1"), IntegerType.instance())));
    const u2: Z3NumberFormula = theories.intTheory.abstractNumberValue(new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("u2"), IntegerType.instance())));

    const u1_eq_1 = theories.intTheory.isNumberEqualTo(u1, theories.intTheory.fromConcreteNumber(new ConcreteNumber(1)));
    const u2_eq_3 = theories.intTheory.isNumberEqualTo(u2, theories.intTheory.fromConcreteNumber(new ConcreteNumber(3)));

    const cond1 = theories.boolTheory.and(
        u1_eq_1,
        theories.intTheory.isGreaterThan(t, u1));
    const cond2 = theories.boolTheory.and(
        u2_eq_3,
        theories.intTheory.isGreaterThan(t, u2));

    const result = lattice.isIncluded(cond2, cond1);
    expect(result).toBe(false);
});

test("Lattice Include T 2", () => {
    const lattice = new Z3FirstOrderLattice(theories.boolTheory, prover);
    const t: Z3NumberFormula = theories.intTheory.abstractNumberValue(new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("t"), IntegerType.instance())));
    const u1: Z3NumberFormula = theories.intTheory.abstractNumberValue(new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("u1"), IntegerType.instance())));
    const u2: Z3NumberFormula = theories.intTheory.abstractNumberValue(new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("u2"), IntegerType.instance())));

    const u1_eq_1 = theories.intTheory.isNumberEqualTo(u1, theories.intTheory.fromConcreteNumber(new ConcreteNumber(1)));
    const u2_eq_3 = theories.intTheory.isNumberEqualTo(u2, theories.intTheory.fromConcreteNumber(new ConcreteNumber(3)));

    const cond1 = theories.boolTheory.and(
        u1_eq_1,
        theories.intTheory.isGreaterThan(t, u1));
    const cond2 = theories.boolTheory.and(
        u2_eq_3,
        theories.intTheory.isGreaterThan(t, u2));

    const result = lattice.isIncluded(cond1, cond2);
    expect(result).toBe(false);
});

test("Lattice Join 1", () => {
    const lattice = new Z3FirstOrderLattice(theories.boolTheory, prover);
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), IntegerType.instance()));
    const f1 = theories.boolTheory.and(
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))),
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))));
    const result = lattice.join(f1, lattice.bottom());
    prover.push();
    try {
        prover.assert(result);
        const isUnsat = prover.isUnsat();
        expect(isUnsat).toBe(false);
    } finally {
        prover.pop();
    }
});

test("Lattice Meet 1", () => {
    const lattice = new Z3FirstOrderLattice(theories.boolTheory, prover);
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), IntegerType.instance()));
    const f1 = theories.boolTheory.and(
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))),
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))));
    const result = lattice.meet(f1, lattice.bottom());
    prover.push();
    try {
        prover.assert(result);
        const isUnsat = prover.isUnsat();
        expect(isUnsat).toBe(true);
    } finally {
        prover.pop();
    }
});

test("Get model for unsat formula", () => {
   const oneGreaterZero = theories.intTheory.isGreaterThan(theories.intTheory.one(), theories.intTheory.zero());

   prover.push();
   try {
       prover.assert(oneGreaterZero);
       const isUnsat = prover.isUnsat();
       expect(isUnsat).toBe(false);

       const model = prover.getModel();
       expect(model.getNumConst()).toBe(0);
       expect(model.getConstValues()).toStrictEqual([]);
   } finally {
       prover.pop();
   }
});

test("Get model for int formula", () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), IntegerType.instance()));
    const y = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("y"), IntegerType.instance()));

    const xLessThan3 = theories.intTheory.isLessThan(theories.intTheory.abstractNumberValue(x), theories.intTheory.fromConcreteNumber(new ConcreteNumber(3)));

    const xGreater1 = theories.intTheory.isGreaterThan(theories.intTheory.abstractNumberValue(x), theories.intTheory.fromConcreteNumber(new ConcreteNumber(1)));

    const xPlus2 = theories.intTheory.plus(theories.intTheory.abstractNumberValue(x), theories.intTheory.fromConcreteNumber(new ConcreteNumber(2)));
    const yEqualsXPlus2 = theories.intTheory.isNumberEqualTo(theories.intTheory.abstractNumberValue(y), xPlus2);

    prover.push();
    try {
        prover.assert(theories.boolTheory.and(xGreater1, theories.boolTheory.and(xLessThan3, yEqualsXPlus2)));
        const isUnsat = prover.isUnsat();
        expect(isUnsat).toBe(false);

        const model: Z3Model = prover.getModel();
        expect(model.getNumConst()).toBe(2);
        expect(model.getConstValues()).toStrictEqual([new Z3Const("y", 4), new Z3Const("x", 2)]);
    } finally {
        prover.pop();
    }
});

test('Get model for string formula', () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), StringType.instance()));

    const xContainsB = theories.stringTheory.stringContains(theories.stringTheory.abstractStringValue(x), theories.stringTheory.fromConcrete(new ConcreteString("B")));

    const xJoinedOther = theories.stringTheory.joinStrings(theories.stringTheory.abstractStringValue(x), theories.stringTheory.fromConcrete(new ConcreteString("b")));
    const xJoinedOtherEqualsBob = theories.stringTheory.stringsEqual(xJoinedOther, theories.stringTheory.fromConcrete(new ConcreteString("Bob")));

    prover.push();
    try {
        prover.assert(theories.boolTheory.and(xContainsB, xJoinedOtherEqualsBob));
        const isUnsat = prover.isUnsat();
        expect(isUnsat).toBe(false);

        const model: Z3Model = prover.getModel();
        expect(model.getNumConst()).toBe(1);
        expect(model.getConstValues()).toStrictEqual([new Z3Const("x", "Bo")]);
    } finally {
        prover.pop();
    }
});

test('Get model for boolean formula (x && !z)', () => {
    const x = theories.boolTheory.abstractBooleanValue(new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), BooleanType.instance())));
    const z = theories.boolTheory.abstractBooleanValue(new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("z"), BooleanType.instance())));
    const notZ = theories.boolTheory.not(z);

    prover.push();
    try {
        prover.assert(theories.boolTheory.and(x, notZ));
        const isUnsat = prover.isUnsat();
        expect(isUnsat).toBe(false);

        const model: Z3Model = prover.getModel();
        expect(model.getNumConst()).toBe(2);

        const constValues = model.getConstValues();
        const constZ = constValues.find(constV => constV.getName() === "z");
        expect(constZ.getValue()).toBe(false);
        const constX = constValues.find(constV => constV.getName() === "x");
        expect(constX.getValue()).toBe(true);
    } finally {
        prover.pop();
    }
});