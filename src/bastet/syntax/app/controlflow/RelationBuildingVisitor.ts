/*
 *
 *    Copyright 2019 University of Passau
 *
 *    Project maintained by Andreas Stahlbauer (firstname @ lastname . net)
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import {Script} from "./Script";
import {ScratchVisitor} from "../../parser/grammar/ScratchVisitor";
import {TransitionRelation, TransitionRelations} from "./TransitionRelation";
import {ErrorNode, ParseTree, RuleNode, TerminalNode} from "antlr4ts/tree";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ProgramOperationFactory} from "./ops/ProgramOperationFactory";
import {ProgramOperation} from "./ops/ProgramOperation";
import {ControlLocation} from "./ControlLocation";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {
    CallStmtContext,
    DeclarationStmtContext,
    DeclarationStmtListContext,
    IfStmtContext,
    NonCtrlStmtContext,
    RepeatForeverStmtContext,
    RepeatTimesStmtContext,
    ResourceContext,
    ResourceListContext,
    ScriptContext,
    SetStmtContext,
    SetStmtListContext,
    StmtListContext,
    TerminationStmtContext,
    UntilStmtContext
} from "../../parser/grammar/ScratchParser";


export class RelationBuildingVisitor implements ScratchVisitor<TransitionRelation> {

    visitCallStmt (ctx: CallStmtContext): TransitionRelation {
        // ATTENTION: The inter-procedural transition relation
        // is built in a different step.
        const op: ProgramOperation = ProgramOperationFactory.createFor(ctx);
        return TransitionRelations.forOpSeq(op);
    }

    visitIfStmt (ctx: IfStmtContext): TransitionRelation {
        const thenAssumeOp = ProgramOperationFactory.assumeOpFrom(ctx.boolExpr());
        const elseAssumeOp = ProgramOperationFactory.negatedAssumeOpFrom(ctx.boolExpr());
        const thenStatements: TransitionRelation = ctx.stmtList().accept(this);

        let elseStatements: TransitionRelation;
        if (ctx.elseCase().stmtList()) {
            elseStatements = ctx.stmtList().accept(this);
        } else {
            elseStatements = TransitionRelations.epsilon();
        }

        const exitLocation = ControlLocation.fresh();
        const thenCaseGuarded = TransitionRelations.concat(
            TransitionRelations.forOpSeq(thenAssumeOp), thenStatements);
        const elseCaseGuarded = TransitionRelations.concat(
            TransitionRelations.forOpSeq(elseAssumeOp), elseStatements);

        return TransitionRelations.branching(thenCaseGuarded, elseCaseGuarded, exitLocation);
    }

    visitRepeatForeverStmt (ctx: RepeatForeverStmtContext) : TransitionRelation {
        const loopBody: TransitionRelation = ctx.stmtList().accept(this);
        const loopHead: ControlLocation = ControlLocation.fresh();
        const headRelation = TransitionRelations.singleton(loopHead);
        return TransitionRelations.concatAndGoto(headRelation, loopBody, loopHead);
    }

    visitRepeatTimesStmt (ctx: RepeatTimesStmtContext) : TransitionRelation {
        throw new IllegalArgumentException("Repeat-times statements must have been replaced in a previous transformation step.");
    }

    visitUntilStmt (ctx: UntilStmtContext) : TransitionRelation {
        const loopHead: ControlLocation = ControlLocation.fresh();
        const loopBody: TransitionRelation = ctx.stmtList().accept(this);
        const condAssumeOp = ProgramOperationFactory.assumeOpFrom(ctx.boolExpr());

        return TransitionRelations.concatAndGoto(
            TransitionRelations.singleton(loopHead),
            TransitionRelations.concat(TransitionRelations.forOpSeq(condAssumeOp), loopBody),
            loopHead);
    }

    visitNonCtrlStmt (ctx: NonCtrlStmtContext) : TransitionRelation {
        const op: ProgramOperation = ProgramOperationFactory.createFor(ctx);
        return TransitionRelations.forOpSeq(op);
    }

    visitStmtList (ctx: StmtListContext) : TransitionRelation {
        let result: TransitionRelation = TransitionRelations.epsilon();

        for (let stmt of ctx.stmtListPlain().stmt()) {
            let stmtTR: TransitionRelation = stmt.accept(this);
            result = TransitionRelations.concat(result, stmtTR);
        }

        if (ctx.terminationStmt()) {
            let stmtTR: TransitionRelation = ctx.terminationStmt().accept(this);
            result = TransitionRelations.concat(result, stmtTR);
        }

        return result;
    }

    visitTerminationStmt (ctx: TerminationStmtContext) : TransitionRelation {
        const op: ProgramOperation = ProgramOperationFactory.createFor(ctx);
        return TransitionRelations.forOpSeq(op);
    }

    visit(tree: ParseTree): TransitionRelation {
        throw new ImplementMeException();
    }

    visitChildren(node: RuleNode): TransitionRelation {
        if (node.childCount == 1) {
            return node.getChild(0).accept(this);
        } else if (node.childCount > 1) {
            let result: TransitionRelation = TransitionRelations.epsilon();
            let i = 0;
            for (let i = 0; i<node.childCount; i++) {
                let child = node.getChild(i);
                result = TransitionRelations.concat(result, child.accept(this));
            }
            return result;
        } else {
            throw new ImplementMeException();
        }
    }

    visitErrorNode(node: ErrorNode): TransitionRelation {
        console.log(node);
        throw new ImplementMeException();
    }

    visitTerminal(node: TerminalNode): TransitionRelation {
        console.log(node);
        throw new ImplementMeException();
    }

    visitDeclarationStmtList(node: DeclarationStmtListContext): TransitionRelation {
        let result: TransitionRelation = TransitionRelations.epsilon();

        for (let decl of node.declarationStmt()) {
            const op: ProgramOperation = ProgramOperationFactory.createFor(node);
            const declTR = TransitionRelations.forOpSeq(op);

            result = TransitionRelations.concat(result, declTR);
        }

        return result;
    }

    visitDeclarationStmt(node: DeclarationStmtContext): TransitionRelation {
        const op: ProgramOperation = ProgramOperationFactory.createFor(node);
        return TransitionRelations.forOpSeq(op);
    }

    visitResourceList(node: ResourceListContext): TransitionRelation {
        let result: TransitionRelation = TransitionRelations.epsilon();

        for (let res of node.resource()) {
            let stmtTR: TransitionRelation = res.accept(this);
            result = TransitionRelations.concat(result, stmtTR);
        }

        return result;
    }

    visitResource(node: ResourceContext): TransitionRelation {
        // FIXME: Load the resources. Add operations
        // that set, for example, attribute variables.
        const op: ProgramOperation = ProgramOperationFactory.createFor(node);
        return TransitionRelations.forOpSeq(op);
    }

    visitSetStmtList(node: SetStmtListContext): TransitionRelation {
        let result: TransitionRelation = TransitionRelations.epsilon();

        for (let setStmt of node.setStmt()) {
            let stmtTR: TransitionRelation = setStmt.accept(this);
            result = TransitionRelations.concat(result, stmtTR);
        }

        return result;
    }

    visitSetStmt(node: SetStmtContext): TransitionRelation {
        const op: ProgramOperation = ProgramOperationFactory.createFor(node);
        return TransitionRelations.forOpSeq(op);
    }

    public static buildFromTree(tree: ScriptContext): Script {
        throw new ImplementMeException();
    }

    public static buildFromStmtList(tree: StmtListContext): Script {
        throw new ImplementMeException();
    }

}
