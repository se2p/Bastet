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


import {Map as ImmMap, Record as ImmRec} from "immutable"
import {SSATransferRelation} from "../../../../../src/bastet/procedures/analyses/ssa/SSATransferRelation";
import {AbstractMockElement, TransferRelationMock} from "../../TransferRelationMock";
import {SSAState} from "../../../../../src/bastet/procedures/analyses/ssa/SSAAbstractDomain";
import {IntegerType, ScratchType} from "../../../../../src/bastet/syntax/ast/core/ScratchType";
import {
    ProgramOperationFactory,
    ProgramOperationInContext
} from "../../../../../src/bastet/syntax/app/controlflow/ops/ProgramOperation";
import {StoreEvalResultToVariableStatement} from "../../../../../src/bastet/syntax/ast/core/statements/SetStatement";
import {VariableWithDataLocation} from "../../../../../src/bastet/syntax/ast/core/Variable";
import {DataLocations} from "../../../../../src/bastet/syntax/app/controlflow/DataLocation";
import {Identifier} from "../../../../../src/bastet/syntax/ast/core/Identifier";
import {Concerns} from "../../../../../src/bastet/syntax/Concern";
import {PlusExpression} from "../../../../../src/bastet/syntax/ast/core/expressions/NumberExpression";
import {ThreadStateFactory} from "../../../../../src/bastet/procedures/analyses/control/ConcreteProgramState";

describe('SSA Transfer Relation', function() {

    const mockTr = new TransferRelationMock();
    const ssaTr = new SSATransferRelation(mockTr);

    test('LHS and RHS', function() {
        const varA = new VariableWithDataLocation(DataLocations.createTypedLocation(Identifier.of("a"), IntegerType.instance()));
        const ssaState = new SSAState(
            ImmMap([[varA.qualifiedName, 1]]),
            new AbstractMockElement(0)
        );

        const result = ssaTr.abstractSuccFor(ssaState, new ProgramOperationInContext(ProgramOperationFactory.createFor(
            new StoreEvalResultToVariableStatement(varA, new PlusExpression(varA, varA))), ThreadStateFactory.dummy()),
            Concerns.defaultProgramConcern());

        expect(result).toHaveLength(1);

        const [callPredState, callOp, callCo] = mockTr.getOneExpectedCall();

        expect(callPredState.stateId).toEqual(0);
        expect(callOp.ast).toBeInstanceOf(StoreEvalResultToVariableStatement);

        const callOpStmt = callOp.ast as StoreEvalResultToVariableStatement;
        const assignedExpression = callOpStmt.toValue as PlusExpression;

        expect(callOpStmt.variable.qualifiedName).toEqual("a@2");
        expect((assignedExpression.operand1 as VariableWithDataLocation).qualifiedName).toEqual("a@1");
        expect((assignedExpression.operand2 as VariableWithDataLocation).qualifiedName).toEqual("a@1");
    })

});

