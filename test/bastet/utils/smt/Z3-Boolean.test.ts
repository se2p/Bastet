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
import {ConcreteNumber, ConcreteString} from "../../../../src/bastet/procedures/domains/ConcreteElements";
import {VariableWithDataLocation} from "../../../../src/bastet/syntax/ast/core/Variable";
import {DataLocations} from "../../../../src/bastet/syntax/app/controlflow/DataLocation";
import {BooleanType, FloatType} from "../../../../src/bastet/syntax/ast/core/ScratchType";
import {Identifier} from "../../../../src/bastet/syntax/ast/core/Identifier";

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

test("Must not cause an assertion in the solver", () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), BooleanType.instance()));
    const y = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("y"), BooleanType.instance()));

    const bx = theories.boolTheory.abstractBooleanValue(x);
    const by = theories.boolTheory.abstractBooleanValue(y);

    const f = theories.boolTheory.or(
        theories.boolTheory.not(
            theories.boolTheory.and(theories.boolTheory.equal(bx, by), bx)),
        theories.boolTheory.falseBool()
    );

    prover.assert(f);
    expect(prover.isUnsat()).toBe(false);
});
