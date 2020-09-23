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
import {Z3FirstOrderLattice, Z3NumberFormula} from "../../../../src/bastet/utils/smt/z3/Z3Theories";
import {BooleanType, IntegerType, StringType} from "../../../../src/bastet/syntax/ast/core/ScratchType";

let smt: Z3SMT;
let ctx;
let theories;
let prover;

beforeAll(async (done) => {
    smt = await SMTFactory.createZ3();
    ctx = smt.createContext();
    theories = smt.createTheories(ctx);
    prover = smt.createProver(ctx);
    done();
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

test("Bool: Long 1", () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), BooleanType.instance()));
    const bx = theories.boolTheory.abstractBooleanValue(x);
    const y = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("y"), BooleanType.instance()));
    const by = theories.boolTheory.abstractBooleanValue(y);

    const xor = theories.boolTheory.and(
        theories.boolTheory.or(bx, by),
        theories.boolTheory.not(
            theories.boolTheory.and(bx,by)),
    );

    // There seems to be no 'xor' in boolTheory  :(

    // const f = theories.boolTheory.and(
    //     theories.boolTheory.and(
    //         theories.boolTheory.or(bx,by),
    //         theories.boolTheory.xor(bx,by)),
    //     theories.boolTheory.not(bx)
    // )

    prover.assert(xor);
    expect(prover.isSat()).toBe(true);
    const model: Z3Model = prover.getModel();
    const Z3Const[] = model.getConstValues()
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
            theories.boolTheory.implies(bx,by),
            theories.boolTheory.implies(by,bz)),
        theories.boolTheory.implies(bx,bz));

    const proof = theories.boolTheory.not(conjecture);

    prover.assert(proof);
    expect(prover.isUnsat()).toBe(true);
})