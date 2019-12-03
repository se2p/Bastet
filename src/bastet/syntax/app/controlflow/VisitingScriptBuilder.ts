import {Script} from "./Script";
import {ScratchVisitor} from "../../parser/grammar/ScratchVisitor";
import {
    CallStmtContext,
    IfStmtContext, NonCtrlStmtContext, RepeatForeverStmtContext, RepeatTimesStmtContext,
    ScriptContext, StmtListContext, TerminationStmtContext, UntilStmtContext
} from "../../parser/grammar/ScratchParser";
import {TransitionRelation} from "./TransitionRelation";
import {ErrorNode, ParseTree, RuleNode, TerminalNode} from "antlr4ts/tree";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ProgramOperationFactory} from "./ops/ProgramOperationFactory";
import {ProgramOperation} from "./ops/ProgramOperation";

class RelationBuildingVisitor implements ScratchVisitor<TransitionRelation> {

    visitCallStmt (ctx: CallStmtContext): TransitionRelation {
        throw new ImplementMeException();
    }

    visitIfStmt (ctx: IfStmtContext): TransitionRelation {
        throw new ImplementMeException();
    }

    visitRepeatForeverStmt (ctx: RepeatForeverStmtContext) :  TransitionRelation {
        throw new ImplementMeException();
    }

    visitRepeatTimesStmt (ctx: RepeatTimesStmtContext) :  TransitionRelation {
        throw new ImplementMeException();
    }

    visitUntilStmt (ctx: UntilStmtContext) :  TransitionRelation {
        throw new ImplementMeException();
    }

    visitNonCtrlStmt (ctx: NonCtrlStmtContext) : TransitionRelation {
        let op: ProgramOperation = ProgramOperationFactory.createFor(ctx);
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
        throw new ImplementMeException();
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
