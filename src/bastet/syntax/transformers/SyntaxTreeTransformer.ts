import {RuleNode} from "antlr4ts/tree";

export interface SyntaxTreeTransformer {

    transform(origin: RuleNode) : RuleNode;

}
