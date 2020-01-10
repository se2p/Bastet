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

import {TransitionRelation, TransitionRelations} from "./TransitionRelation";
import {OperationID, ProgramOperation, ProgramOperationFactory, ProgramOperations} from "./ops/ProgramOperation";
import {ControlLocation} from "./ControlLocation";
import {CoreCtrlStatementnVisitor, CoreVisitor} from "../../ast/CoreVisitor";
import {CallStatement} from "../../ast/core/statements/CallStatement";
import {
    IfStatement,
    RepeatForeverStatement,
    UntilStatement
} from "../../ast/core/statements/ControlStatement";
import {StatementList} from "../../ast/core/statements/Statement";
import {AstNode} from "../../ast/AstNode";


export class RelationBuildingVisitor implements CoreVisitor<TransitionRelation>, CoreCtrlStatementnVisitor<TransitionRelation> {

    private readonly _stack: string[];

    constructor() {
        this._stack = [];
    }

    visitStatementList(node: StatementList): TransitionRelation {
        this._stack.push("visitStatementList");
        try {
            let result: TransitionRelation = TransitionRelations.epsilon();

            for (let stmt of node) {
                let stmtTR: TransitionRelation = stmt.accept(this);
                result = TransitionRelations.concat(result, stmtTR);
            }

            return result;
        } finally {
            this._stack.pop();
        }
    }

    visitCallStatement(node: CallStatement): TransitionRelation {
        this._stack.push("visitCallStatement");
        try {
            // ATTENTION: The inter-procedural transition relation
            // is built in a different step.
            const op: ProgramOperation = ProgramOperationFactory.createFor(node);
            return TransitionRelations.forOpSeq(op);
        } finally {
            this._stack.pop();
        }
    }

    visitIfStatement(node: IfStatement): TransitionRelation {
        this._stack.push("visitIfStatement");
        try {
            const thenAssumeOp = ProgramOperationFactory.assumeOpFrom(node.cond);
            const elseAssumeOp = ProgramOperationFactory.negatedAssumeOpFrom(node.cond);
            const thenStatements: TransitionRelation = node.thenStmts.accept(this);
            const elseStatements: TransitionRelation = node.elseStmts.accept(this);

            const exitLocation = ControlLocation.fresh();
            const thenCaseGuarded = TransitionRelations.concat(
                TransitionRelations.forOpSeq(thenAssumeOp), thenStatements);
            const elseCaseGuarded = TransitionRelations.concat(
                TransitionRelations.forOpSeq(elseAssumeOp), elseStatements);

            return TransitionRelations.branching(thenCaseGuarded, elseCaseGuarded, exitLocation);
        } finally {
            this._stack.pop();
        }
    }

    visitRepeatForeverStatement(node: RepeatForeverStatement): TransitionRelation {
        const loopBody: TransitionRelation = node.body.accept(this);
        const loopHead: ControlLocation = ControlLocation.fresh();
        const headRelation = TransitionRelations.singleton(loopHead);
        return TransitionRelations.concatAndGoto(headRelation, loopBody, loopHead);
    }

    visitUntilStatement(node: UntilStatement): TransitionRelation {
        this._stack.push("visitUntilStatement");
        try {
            const loopHead: ControlLocation = ControlLocation.fresh();
            const loopBody: TransitionRelation = node.body.accept(this);
            const condAssumeOp = ProgramOperationFactory.assumeOpFrom(node.cond);

            return TransitionRelations.concatAndGoto(
                TransitionRelations.singleton(loopHead),
                TransitionRelations.concat(TransitionRelations.forOpSeq(condAssumeOp), loopBody),
                loopHead);
        } finally {
            this._stack.pop();
        }
    }

    visit(node: AstNode): TransitionRelation {
        this._stack.push("visit");
        try {
            const opid: OperationID = ProgramOperations.constructOp(node);
            return TransitionRelations.forOpSeq(ProgramOperation.for(opid));
        } finally {
            this._stack.pop();
        }
    }

    private static nonTerminalName(node: AstNode) : string {
        let result: string = node.constructor.name;
        const search = "Context$";
        const replacement = "";
        return result.replace(new RegExp(search, 'g'), replacement);
    }

    private buildForOpNode(node: AstNode): TransitionRelation {
        const op: ProgramOperation = ProgramOperationFactory.createFor(node);
        return TransitionRelations.forOpSeq(op);
    }

}

