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

import {TransitionRelation, TransitionRelationBuilder, TransitionRelations} from "./TransitionRelation";
import {OperationId, ProgramOperation, ProgramOperationFactory, ProgramOperations} from "./ops/ProgramOperation";
import {ControlLocation} from "./ControlLocation";
import {CoreCtrlStatementnVisitor, CoreVisitor} from "../../ast/CoreVisitor";
import {CallStatement} from "../../ast/core/statements/CallStatement";
import {
    IfStatement,
    RepeatForeverStatement,
    ReturnStatement,
    UntilQueriedConditionStatement,
    UntilStatement
} from "../../ast/core/statements/ControlStatement";
import {StatementList} from "../../ast/core/statements/Statement";
import {AstNode} from "../../ast/AstNode";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";


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

    visitReturnStatement(node: ReturnStatement): TransitionRelation {
        this._stack.push("visitReturnStatement");
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
            const thenAssumeOp = ProgramOperationFactory.createAssumeOpFrom(node.cond);
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

        const builder = TransitionRelation.builder();
        builder.addAllTransitionsOf(loopBody)
            .connectLocations(loopBody.exitLocationSet, loopBody.entryLocationSet);

        loopBody.entryLocationSet.forEach((l) => builder.addEntryLocationWithID(l));

        return builder.build();
    }

    visitUntilStatement(node: UntilStatement): TransitionRelation {
        throw new IllegalArgumentException("Not expected. Transform to UntilQueriedConditionStatement before!");
    }

    visitUntilQueriedConditionStatement(node: UntilQueriedConditionStatement): TransitionRelation {
        this._stack.push("visitUntilQueriedConditionStatement");
        try {
            const loopHead: ControlLocation = ControlLocation.fresh();
            const loopTerminationLocation: ControlLocation = ControlLocation.fresh();

            const queryBody: TransitionRelation = node.conditionQueryStatements.accept(this);
            const loopBody: TransitionRelation = node.body.accept(this);

            const enterLoopBodyGuarded = TransitionRelations.concat(
                TransitionRelations.forOpSeq(ProgramOperationFactory.negatedAssumeOpFrom(node.untilCondition)), loopBody);

            const leaveLoopGuarded = TransitionRelations.forOpSeq(
                ProgramOperationFactory.createAssumeOpFrom(node.untilCondition));

            const loopHeadToQueryBody = TransitionRelations.concatOpTr(loopHead, ProgramOperations.epsilon(), queryBody);
            const guardedBodyToHead = TransitionRelations.concatTrOpGoto(enterLoopBodyGuarded, ProgramOperations.epsilon(), loopHead);
            const guardedLoopExit = TransitionRelations.concatTrOpGoto(leaveLoopGuarded, ProgramOperations.epsilon(), loopTerminationLocation);

            const builder = new TransitionRelationBuilder();
            builder.addAllTransitionsOf(loopHeadToQueryBody)
                .addAllTransitionsOf(guardedBodyToHead)
                .addAllTransitionsOf(guardedLoopExit)
                .connectLocations(loopHeadToQueryBody.exitLocationSet, guardedBodyToHead.entryLocationSet)
                .connectLocations(loopHeadToQueryBody.exitLocationSet, guardedLoopExit.entryLocationSet)
                .connectLocations(guardedBodyToHead.exitLocationSet, loopHeadToQueryBody.entryLocationSet);

            guardedLoopExit.exitLocationSet.forEach((loc) => builder.addExitLocationWithID(loc));
            loopHeadToQueryBody.entryLocationSet.forEach((loc) => builder.addEntryLocationWithID(loc));

            return builder.build();
        } finally {
            this._stack.pop();
        }
    }

    visit(node: AstNode): TransitionRelation {
        this._stack.push("visit");
        try {
            const opid: OperationId = ProgramOperations.constructOp(node);
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

