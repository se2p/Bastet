import {Script} from "./Script";
import {ScratchVisitor} from "../../parser/grammar/ScratchVisitor";
import {TransitionRelation} from "./TransitionRelation";
import {ErrorNode, ParseTree, RuleNode, TerminalNode} from "antlr4ts/tree";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ProgramOperationFactory} from "./ops/ProgramOperationFactory";
import {ProgramOperation} from "./ops/ProgramOperation";
import {ControlLocation} from "./ControlLocation";
import {
    CallStmtContext,
    IfStmtContext, NonCtrlStmtContext, RepeatForeverStmtContext, RepeatTimesStmtContext,
    ScriptContext, StmtListContext, TerminationStmtContext, UntilStmtContext
} from "../../parser/grammar/ScratchParser";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";

class RelationBuildingVisitor implements ScratchVisitor<TransitionRelation> {

    visitCallStmt (ctx: CallStmtContext): TransitionRelation {
        throw new ImplementMeException();
    }

    visitIfStmt (ctx: IfStmtContext): TransitionRelation {
        const thenAssumeOp = ProgramOperationFactory.assumeOpFrom(ctx.boolExpr());
        const elseAssumeOp = ProgramOperationFactory.negatedAssumeOpFrom(ctx.boolExpr());
        const thenStatements: TransitionRelation = ctx.stmtList().accept(this);

        let elseStatements: TransitionRelation;
        if (ctx.elseCase().stmtList()) {
            elseStatements = ctx.stmtList().accept(this);
        } else {
            elseStatements = TransitionRelation.epsilon();
        }

        const exitLocation = ControlLocation.fresh();
        const thenCaseGuarded = TransitionRelation.concat(thenAssumeOp, thenStatements);
        const elseCaseGuarded = TransitionRelation.concat(elseAssumeOp, elseStatements);

        return TransitionRelation.branching(thenCaseGuarded, elseCaseGuarded, exitLocation);
    }

    visitRepeatForeverStmt (ctx: RepeatForeverStmtContext) : TransitionRelation {
        const loopBody: TransitionRelation = ctx.stmtList().accept(this);
        const loopHead: ControlLocation = ControlLocation.fresh();
        const headRelation = TransitionRelation.singleton(loopHead);
        return TransitionRelation.concatAndGoto(headRelation, loopBody, loopHead);
    }

    visitRepeatTimesStmt (ctx: RepeatTimesStmtContext) : TransitionRelation {
        throw new IllegalArgumentException("Repeat-times statements must have been replaced in a previous transformation step.");
    }

    visitUntilStmt (ctx: UntilStmtContext) : TransitionRelation {
        const loopHead: ControlLocation = ControlLocation.fresh();
        const loopBody: TransitionRelation = ctx.stmtList().accept(this);
        const condAssumeOp = ProgramOperationFactory.assumeOpFrom(ctx.boolExpr());

        return TransitionRelation.concatAndGoto(
            TransitionRelation.singleton(loopHead),
            TransitionRelation.concat(condAssumeOp, loopBody),
            loopHead);
    }

    visitNonCtrlStmt (ctx: NonCtrlStmtContext) : TransitionRelation {
        const op: ProgramOperation = ProgramOperationFactory.createFor(ctx);
        return TransitionRelation.forOpSeq(op);
    }

    visitStmtList (ctx: StmtListContext) :  TransitionRelation {
        let result: TransitionRelation = TransitionRelation.epsilon();

        for (let stmt of ctx.stmtListPlain().stmt()) {
            let stmtTR: TransitionRelation = stmt.accept(this);
            result = TransitionRelation.concat(result, stmtTR);
        }

        if (ctx.terminationStmt()) {
            let stmtTR: TransitionRelation = ctx.terminationStmt().accept(this);
            result = TransitionRelation.concat(result, stmtTR);
        }

        return result;
    }

    visitTerminationStmt (ctx: TerminationStmtContext) :  TransitionRelation {
        const op: ProgramOperation = ProgramOperationFactory.createFor(ctx);
        return TransitionRelation.forOpSeq(op);
    }

    visit(tree: ParseTree): TransitionRelation {
        throw new ImplementMeException();
    }

    visitChildren(node: RuleNode): TransitionRelation {
        throw new ImplementMeException();
    }

    visitErrorNode(node: ErrorNode): TransitionRelation {
        throw new ImplementMeException();
    }

    visitTerminal(node: TerminalNode): TransitionRelation {
        throw new ImplementMeException();
    }

}


export class VisitingScriptBuilder {

    public static buildFromTree(tree: ScriptContext): Script {
        throw new ImplementMeException();
    }

    public static buildFromStmtList(tree: StmtListContext): Script {
        throw new ImplementMeException();
    }

}
