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

// Test by Robert Pernerstorfer

import {SMTFactory, Z3Const, Z3Model, Z3SMT} from "../../../../src/bastet/utils/smt/z3/Z3SMT";
import {VariableWithDataLocation} from "../../../../src/bastet/syntax/ast/core/Variable";
import {DataLocations} from "../../../../src/bastet/syntax/app/controlflow/DataLocation";
import {Identifier} from "../../../../src/bastet/syntax/ast/core/Identifier";
import {ConcreteNumber, ConcreteString} from "../../../../src/bastet/procedures/domains/ConcreteElements";
import {
    Z3BooleanFormula,
    Z3FirstOrderLattice,
    Z3NumberFormula,
    Z3Theories
} from "../../../../src/bastet/utils/smt/z3/Z3Theories";
import {BooleanType, IntegerType, StringType} from "../../../../src/bastet/syntax/ast/core/ScratchType";
import {FirstOrderDomain} from "../../../../src/bastet/procedures/domains/FirstOrderDomain";

let smt: Z3SMT;
let ctx;
let theories;
let prover;
let builder;

beforeAll(async (done) => {
    smt = await SMTFactory.createZ3();
    ctx = smt.createContext();
    theories = smt.createTheories(ctx);
    prover = smt.createProver(ctx);
    done();
    builder = new TestFormulaBuilder(theories);
});

test("Bool: Short 1", () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), BooleanType.instance()));
    const bx = theories.boolTheory.abstractBooleanValue(x);
    prover.assert(bx);
    expect(prover.isSat()).toBe(true);
})

test("Bool: Short 2", () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), BooleanType.instance()));
    const bx = theories.boolTheory.abstractBooleanValue(x);
    prover.assert(bx);
    expect(prover.isUnsat()).toBe(false);
})

xtest("Bool: Short 3", () => {
    let prover2 = smt.createProver(ctx);
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), BooleanType.instance()));
    const bx = theories.boolTheory.abstractBooleanValue(x);
    const y = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("y"), BooleanType.instance()));
    const by = theories.boolTheory.abstractBooleanValue(y);

    const test = theories.boolTheory.xor(bx, by);

    prover.assert(test);
    console.log("test");
    prover.getFirstVarName(bx, prover2);
    expect(prover.isUnsat()).toBe(false);
})

// test("Bool: Short 4", () => {
//     const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), BooleanType.instance()));
//     const bx = theories.boolTheory.abstractBooleanValue(x);
//     const b4 = theories.boolTheory
//     prover.assert(theories.boolTheory.equal(bx, 4));
//     expect(prover.isSat()).toBe(true);
// })

test("Bool: Long 1", () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), BooleanType.instance()));
    const bx = theories.boolTheory.abstractBooleanValue(x);
    const y = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("y"), BooleanType.instance()));
    const by = theories.boolTheory.abstractBooleanValue(y);

    const xor = theories.boolTheory.and(
        theories.boolTheory.or(bx, by),
        theories.boolTheory.not(
            theories.boolTheory.and(bx, by)),
    );

    // There seems to be no 'xor' in boolTheory  :(
    // Edit: I implemented xor now.

    // const f = theories.boolTheory.and(
    //     theories.boolTheory.and(
    //         theories.boolTheory.or(bx,by),
    //         theories.boolTheory.xor(bx,by)),
    //     theories.boolTheory.not(bx)
    // )

    prover.assert(xor);
    expect(prover.isSat()).toBe(true);
    const model: Z3Model = prover.getModel();
    //const Z3Const[] = model.getConstValues();
})

test("Bool: Long 2", () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), BooleanType.instance()));
    const y = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("y"), BooleanType.instance()));
    const z = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("z"), BooleanType.instance()));
    const bx = theories.boolTheory.abstractBooleanValue(x);
    const by = theories.boolTheory.abstractBooleanValue(y);
    const bz = theories.boolTheory.abstractBooleanValue(z);


    prover.push()
    const conjecture = theories.boolTheory.implies(
        theories.boolTheory.and(
            theories.boolTheory.implies(bx, by),
            theories.boolTheory.implies(by, bz)),
        theories.boolTheory.implies(bx, bz));

    const proof = theories.boolTheory.not(conjecture);

    prover.assert(proof);
    expect(prover.isUnsat()).toBe(true);
})

test("Bool: Long 3", () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), BooleanType.instance()));
    const bx = theories.boolTheory.abstractBooleanValue(x);
    const y = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("y"), BooleanType.instance()));
    const by = theories.boolTheory.abstractBooleanValue(y);

    const xor1 = theories.boolTheory.and(
        theories.boolTheory.or(bx, by),
        theories.boolTheory.not(
            theories.boolTheory.and(bx, by)),
    );

    const test = theories.boolTheory.not(
        theories.boolTheory.equal(
            xor1, theories.boolTheory.xor(bx, by)
        )
    );


    prover.assert(test);
    expect(prover.isUnsat()).toBe(true);
})

xtest("AllSat 1", () => {
    const basicTerm = builder.basicBoolTerm1();
    const predicates = builder.predicForBoolTerm1();

    const abstractProblem = theories.boolTheory.and(basicTerm, predicates);

    prover.push();
    prover.assert(basicTerm);
    expect(prover.isSat()).toBe(true);
    prover.pop();
    prover.push();
    prover.assert(predicates);
    expect(prover.isSat()).toBe(true);
    prover.pop();
    prover.push();
    prover.assert(abstractProblem);
    expect(prover.isSat()).toBe(true);
    prover.pop();

})

test("AllSat 2", () => {

    const basicTerm = builder.basicBoolTerm1();
    const predicates = builder.predicForBoolTerm1();

    const abstractProblem = theories.boolTheory.and(basicTerm, predicates);

    let propVars: Z3BooleanFormula[] = builder.propVarsTerm1();


    prover.push();
    console.log(prover.allSat(abstractProblem, propVars, ctx));
    prover.pop();

})

test("BPA 1",() => {
    const basicTerm = builder.basicBoolTerm1();
    const abstractPrec = builder.abstrPrecForBoolTerm1();

    const fOLattice = smt.createLattice(prover, theories.boolTheory);
    const fOD = new FirstOrderDomain(fOLattice);

})

class TestFormulaBuilder {

    private _theories: Z3Theories;
    private i_a;
    private i_b;
    private i_i;
    private i_x;
    private b_v1;
    private b_v2;
    private b_v3;


    constructor(theories: Z3Theories) {
        this._theories = theories;

        const a = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("a"), IntegerType.instance()));
        this.i_a = theories.intTheory.abstractNumberValue(a);
        const b = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("b"), IntegerType.instance()));
        this.i_b = theories.intTheory.abstractNumberValue(b);
        const i = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("i"), IntegerType.instance()));
        this.i_i = theories.intTheory.abstractNumberValue(i);
        const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), IntegerType.instance()));
        this.i_x = theories.intTheory.abstractNumberValue(x);

        const v1 = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("v1"), BooleanType.instance()));
        this.b_v1 = theories.boolTheory.abstractBooleanValue(v1);
        const v2 = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("v2"), BooleanType.instance()));
        this.b_v2 = theories.boolTheory.abstractBooleanValue(v2);
        const v3 = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("v3"), BooleanType.instance()));
        this.b_v3 = theories.boolTheory.abstractBooleanValue(v3);
    }

    public basicBoolTerm1(): Z3BooleanFormula {

        const basicTerm = theories.boolTheory.and(
            theories.intTheory.isNumberEqualTo(this.i_x, theories.intTheory.fromConcreteNumber(new ConcreteNumber(2))),
            theories.boolTheory.or(theories.boolTheory.or(
                theories.boolTheory.and(theories.boolTheory.and(
                    theories.intTheory.isNumberEqualTo(this.i_b, this.i_x),
                    theories.intTheory.isGreaterThan(this.i_a, theories.intTheory.zero())),
                    theories.intTheory.isNumberEqualTo(this.i_i, theories.intTheory.fromConcreteNumber(new ConcreteNumber(64)))),
                theories.boolTheory.and(theories.boolTheory.and(
                    theories.intTheory.isNumberEqualTo(this.i_b,
                        theories.intTheory.minus(this.i_x, theories.intTheory.one())),
                    theories.intTheory.isGreaterThan(this.i_i, theories.intTheory.fromConcreteNumber(new ConcreteNumber(128)))),
                    theories.intTheory.isNumberEqualTo(this.i_a, theories.intTheory.zero()))),
                theories.intTheory.isNumberEqualTo(this.i_i, theories.intTheory.fromConcreteNumber(new ConcreteNumber(64)))));
        return basicTerm;
    }

    public predicForBoolTerm1(): Z3BooleanFormula {
        const predicates = theories.boolTheory.and(theories.boolTheory.and(
            theories.boolTheory.equal(this.b_v1,
                theories.intTheory.isNumberEqualTo(this.i_b, theories.intTheory.one())),
            theories.boolTheory.equal(this.b_v2,
                theories.intTheory.isNumberEqualTo(this.i_x, theories.intTheory.fromConcreteNumber(new ConcreteNumber(2))))),
            theories.boolTheory.equal(this.b_v3,
                theories.intTheory.isLessEqual(this.i_i, theories.intTheory.fromConcreteNumber(new ConcreteNumber(90)))));

        return predicates;
    }

    public abstrPrecForBoolTerm1(): Z3BooleanFormula[] {
        return [theories.intTheory.isNumberEqualTo(this.i_b, theories.intTheory.one()),
            theories.intTheory.isNumberEqualTo(this.i_x, theories.intTheory.fromConcreteNumber(new ConcreteNumber(2))),
            theories.intTheory.isLessEqual(this.i_i, theories.intTheory.fromConcreteNumber(new ConcreteNumber(90)))];
    }

    public propVarsTerm1(): Z3BooleanFormula[] {
        return [this.b_v1, this.b_v2, this.b_v3]
    }

}