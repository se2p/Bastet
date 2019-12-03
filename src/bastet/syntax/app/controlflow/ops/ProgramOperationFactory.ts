import {RuleNode} from "antlr4ts/tree";
import {RawOperation} from "./RawOperation";
import {NoopProgramOperation, ProgramOperation} from "./ProgramOperation";
import {BoolExprContext} from "../../../parser/grammar/ScratchParser";
import {ImplementMeException} from "../../../../core/exceptions/ImplementMeException";
import {AssumeOperation} from "./AssumeOperation";

export class ProgramOperationFactory {

    public static createFor(ast: RuleNode): ProgramOperation {
        let result = new RawOperation(ast);
        return result;
    }

    static assumeOpFrom(boolExprContext: BoolExprContext): AssumeOperation {
        throw new ImplementMeException();
    }

    static negatedAssumeOpFrom(boolExprContext: BoolExprContext): AssumeOperation {
        throw new ImplementMeException();
    }

    static epsilon(): NoopProgramOperation {
        throw new ImplementMeException();
    }
}
