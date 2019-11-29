import {SyntaxTreeTransformer} from "./SyntaxTreeTransformer";
import {RuleNode} from "antlr4ts/tree";

export class ToIntermediateTransformer implements SyntaxTreeTransformer {

    transform(origin: RuleNode): RuleNode {
        return origin;
    }

}
