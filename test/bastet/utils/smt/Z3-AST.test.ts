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


import {VariableWithDataLocation} from "../../../../src/bastet/syntax/ast/core/Variable";
import {DataLocations} from "../../../../src/bastet/syntax/app/controlflow/DataLocation";
import {Identifier} from "../../../../src/bastet/syntax/ast/core/Identifier";
import {IntegerType} from "../../../../src/bastet/syntax/ast/core/ScratchType";
import {ConcreteNumber} from "../../../../src/bastet/procedures/domains/ConcreteElements";
import {SMTFactory, Z3SMT} from "../../../../src/bastet/utils/smt/z3/Z3SMT";
import {VariableCollectingVisitor, Z3Visitor} from "../../../../src/bastet/utils/smt/z3/Z3AST";
import {Z3Theories} from "../../../../src/bastet/utils/smt/z3/Z3Theories";
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

test ("Collect and Substitute", async () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), IntegerType.instance()));
    const y = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("y"), IntegerType.instance()));
    const base = theories.boolTheory.and(
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(0))),
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(y),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))));

    const visitor = new VariableCollectingVisitor(ctx);
    let vars = visitor.visit(base.getAST());

    let result = base;
    for (let [v, f] of vars) {
        const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of(`${v}@0`), IntegerType.instance()));
        result = theories.substitute(result, [f], [theories.intTheory.abstractNumberValue(x)]);
    }

    expect(theories.stringRepresentation(result)).toEqual("(and (= x@0 0) (= y@0 42))");
});

test ("Instantiate", async () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x"), IntegerType.instance()));
    const y = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("y"), IntegerType.instance()));
    const base = theories.boolTheory.and(
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(0))),
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(y),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))));

    const result = theories.instantiate(base, (s) => 7);

    expect(theories.stringRepresentation(result)).toEqual("(and (= x@7 0) (= y@7 42))");
});

test ("Uninstantiate", async () => {
    const x = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("x@3"), IntegerType.instance()));
    const y = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("y@9"), IntegerType.instance()));
    const base = theories.boolTheory.and(
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(x),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(0))),
        theories.intTheory.isNumberEqualTo(
            theories.intTheory.abstractNumberValue(y),
            theories.intTheory.fromConcreteNumber(new ConcreteNumber(42))));

    const result = theories.instantiate(base, (s) => NaN);

    expect(theories.stringRepresentation(result)).toEqual("(and (= x 0) (= y 42))");
});
