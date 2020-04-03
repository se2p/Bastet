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
import {VariableWithDataLocation} from "../../../../src/bastet/syntax/ast/core/Variable";
import {DataLocations} from "../../../../src/bastet/syntax/app/controlflow/DataLocation";
import {Identifier} from "../../../../src/bastet/syntax/ast/core/Identifier";
import {ConcreteNumber} from "../../../../src/bastet/procedures/domains/ConcreteElements";
import {Z3FirstOrderLattice, Z3NumberFormula} from "../../../../src/bastet/utils/smt/z3/Z3Theories";
import {IntegerType} from "../../../../src/bastet/syntax/ast/core/ScratchType";

let smt: Z3SMT;
let ctx;
let theories;
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
    prover.assert(result);
    const isUnsat = prover.isUnsat();
    expect(isUnsat).toBe(false);
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
    prover.assert(result);
    const isUnsat = prover.isUnsat();
    expect(isUnsat).toBe(true);
});
