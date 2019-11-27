import {FromParseTree} from "./FromParseTree";
import {RuleNode} from "antlr4ts/tree";

export class AppResource extends FromParseTree {

    constructor(node: RuleNode) {
        super(node);
    }

}
