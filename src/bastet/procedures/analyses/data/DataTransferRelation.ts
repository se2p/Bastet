/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net)
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

import {LabeledTransferRelation} from "../TransferRelation";
import {DataAbstractDomain, DataAbstractState} from "./DataAbstractDomain";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {AssumeOperation, ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {DataTransformerVisitor} from "./DataTransformerVisitor";
import {AbstractTheories} from "../../domains/MemoryTransformer";
import {Preconditions} from "../../../utils/Preconditions";
import {
    BooleanFormula,
    FirstOrderFormula, FloatFormula, IntegerFormula,
    ListFormula,
    NumberFormula, RealFormula,
    StringFormula
} from "../../../utils/ConjunctiveNormalForm";
import {AstNode} from "../../../syntax/ast/AstNode";
import {AssumeStatement} from "../../../syntax/ast/core/statements/AssumeStatement";
import {Concern} from "../../../syntax/Concern";
import {CorePrintVisitor} from "../../../syntax/ast/CorePrintVisitor";

export class DataTransferRelation implements LabeledTransferRelation<DataAbstractState> {

    private readonly _abstDomain: DataAbstractDomain;

    private readonly _theories: AbstractTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>;

    constructor(abstDomain: DataAbstractDomain, theories: AbstractTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>) {
        this._abstDomain = Preconditions.checkNotUndefined(abstDomain);
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    public abstractSucc(fromState: DataAbstractState): Iterable<DataAbstractState> {
        throw new IllegalStateException("Only the labelled transfer is supported by this transfer relation");
    }

    public abstractSuccFor(fromState: DataAbstractState, op: ProgramOperation, co: Concern): Iterable<DataAbstractState> {
        Preconditions.checkNotUndefined(fromState);
        Preconditions.checkNotUndefined(op);

        let ast: AstNode;
        if (op instanceof AssumeOperation) {
            const assume = op as AssumeOperation;
            ast = new AssumeStatement(op.expression);
        } else {
            ast = op.ast;
        }

        // console.log(ast.accept(new CorePrintVisitor()));

        return this.abstractSuccForAst(fromState, ast);
    }

    private abstractSuccForAst(fromState: DataAbstractState, ast: AstNode): Iterable<DataAbstractState> {
        const visitor = new DataTransformerVisitor(fromState.blockFormula, this._theories);

        const blockFormulaPrime: FirstOrderFormula = ast.accept(visitor);

        return [new DataAbstractState(blockFormulaPrime, fromState.summaryFormula)];
    }

}
