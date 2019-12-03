import {RuleNode} from "antlr4ts/tree";
import {RawOperation} from "./RawOperation";
import {ProgramOperation} from "./ProgramOperation";

export class ProgramOperationFactory {

    public static createFor(ast: RuleNode): ProgramOperation {
        let result = new RawOperation(ast);
        return result;
    }

}
