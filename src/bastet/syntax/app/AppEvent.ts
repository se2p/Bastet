import {FromParseTree} from "../FromParseTree";
import {RuleNode} from "antlr4ts/tree";

export default class AppEvent extends FromParseTree {

    constructor(node: RuleNode) {
        super(node);
    }

}
