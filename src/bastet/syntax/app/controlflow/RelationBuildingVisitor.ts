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
    CallStmtContext, CommonStmtContext, CoreControlStmtContext, CoreNonCtrlStmtContext,
    DeclarationStmtContext,
    DeclarationStmtListContext, ExpressionStmtContext,
    IfStmtContext,
    NonCtrlStmtContext,
    RepeatForeverStmtContext,
    RepeatTimesStmtContext,
    ResourceContext,
    ResourceListContext,
    ScriptContext, SetStatementContext,
    SetStmtContext,
    SetStmtListContext,
    StmtListContext,
    TerminationStmtContext,
    UntilStmtContext
} from "../../parser/grammar/ScratchParser";
import {Preconditions} from "../../../utils/Preconditions";


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

    visitCommonStmt (ctx: CommonStmtContext) : TransitionRelation {
        return this.buildForOpNode(ctx);
    }

    visitExpressionStmt (ctx: ExpressionStmtContext) : TransitionRelation {
        return this.buildForOpNode(ctx);
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
        return this.buildForOpNode(ctx);
    }

    visit(tree: ParseTree): TransitionRelation {
        throw new ImplementMeException();
    }

    private isLeafStatement(node: RuleNode): boolean {
        if (node.constructor.name.startsWith("Core")) {
            return false;
        }
        else if (node.constructor.name.endsWith("Statement")) {
            return true;
        }
        return false;
    }

    visitChildren(node: RuleNode): TransitionRelation {
        const isLeaf = this.isLeafStatement(node);
        if (isLeaf) {
            return this.buildForOpNode(node);
        } else if (node.childCount == 1) {
            return node.getChild(0).accept(this);
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
            const declTR = this.buildForOpNode(decl);
            result = TransitionRelations.concat(result, declTR);
        }

        return result;
    }

    visitDeclarationStmt(node: DeclarationStmtContext): TransitionRelation {
        return this.buildForOpNode(node);
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
        return this.buildForOpNode(node);
    }

    visitCoreControlStmt(ctx: CoreControlStmtContext): TransitionRelation {
        Preconditions.checkArgument(ctx.childCount == 1);
        return ctx.getChild(0).accept(this);
    }

    visitSetStmtList(node: SetStmtListContext): TransitionRelation {
        let result: TransitionRelation = TransitionRelations.epsilon();

        for (let setStmt of node.setStmt()) {
            let stmtTR = this.buildForOpNode(setStmt);
            result = TransitionRelations.concat(result, stmtTR);
        }

        return result;
    }

    private buildForOpNode(node: RuleNode): TransitionRelation {
        const op: ProgramOperation = ProgramOperationFactory.createFor(node);
        return TransitionRelations.forOpSeq(op);
    }

    visitSetStmt(node: SetStmtContext): TransitionRelation {
        return this.buildForOpNode(node);
    }

    public static buildFromTree(tree: ScriptContext): Script {
        throw new ImplementMeException();
    }

    public static buildFromStmtList(tree: StmtListContext): Script {
        throw new ImplementMeException();
    }

}

