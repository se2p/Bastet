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

import {RelationBuildingVisitor} from "../../../../../src/bastet/syntax/app/controlflow/RelationBuildingVisitor";
import {UntilQueriedConditionStatement} from "../../../../../src/bastet/syntax/ast/core/statements/ControlStatement";
import {
    BooleanLiteral,
} from "../../../../../src/bastet/syntax/ast/core/expressions/BooleanExpression";
import {VariableWithDataLocation} from "../../../../../src/bastet/syntax/ast/core/Variable";
import {BooleanType} from "../../../../../src/bastet/syntax/ast/core/ScratchType";
import {DataLocations} from "../../../../../src/bastet/syntax/app/controlflow/DataLocation";
import {Identifier} from "../../../../../src/bastet/syntax/ast/core/Identifier";
import {StatementList} from "../../../../../src/bastet/syntax/ast/core/statements/Statement";
import {StoreEvalResultToVariableStatement} from "../../../../../src/bastet/syntax/ast/core/statements/SetStatement";
import {CallStatement} from "../../../../../src/bastet/syntax/ast/core/statements/CallStatement";
import {ExpressionList} from "../../../../../src/bastet/syntax/ast/core/expressions/ExpressionList";
import {OptionalAstNode} from "../../../../../src/bastet/syntax/ast/AstNode";

describe("RelationBuildingVisitor", () => {

    const visitor = new RelationBuildingVisitor();

    test("UntilQueriedConditionStatement", async (done) => {
        const boolVar = new VariableWithDataLocation(
            DataLocations.createTypedLocation(Identifier.of("v"), BooleanType.instance()));

        const stmt = new UntilQueriedConditionStatement(
            boolVar,
            new StatementList([new StoreEvalResultToVariableStatement(boolVar, BooleanLiteral.true())]),
            new StatementList([new CallStatement(Identifier.of("foo"),
                new ExpressionList([]), OptionalAstNode.absent())]));

        const result = stmt.accept(visitor);

        expect(result.entryLocationSet.size).toEqual(1);
        expect(result.exitLocationSet.size).toEqual(1);

        done();

    });

});
