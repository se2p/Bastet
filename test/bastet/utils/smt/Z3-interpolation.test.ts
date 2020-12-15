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

import {SMTFactory, Z3Const, Z3Model, Z3SMT} from "../../../../src/bastet/utils/smt/z3/Z3SMT";
import {VariableWithDataLocation} from "../../../../src/bastet/syntax/ast/core/Variable";
import {DataLocations} from "../../../../src/bastet/syntax/app/controlflow/DataLocation";
import {Identifier} from "../../../../src/bastet/syntax/ast/core/Identifier";
import {ConcreteNumber, ConcreteString} from "../../../../src/bastet/procedures/domains/ConcreteElements";
import {Z3FirstOrderLattice, Z3NumberFormula, Z3Theories} from "../../../../src/bastet/utils/smt/z3/Z3Theories";
import {BooleanType, IntegerType, StringType} from "../../../../src/bastet/syntax/ast/core/ScratchType";
import {Map as ImmMap, Record as ImmRec} from "immutable";


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


test ("Interpolation", () => {
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