import {ProgramOperation} from "./ProgramOperation";
import {RuleNode} from "antlr4ts/tree";

export class RawOperation extends ProgramOperation {

     constructor(ast: RuleNode) {
         super(ast);
     }

}
