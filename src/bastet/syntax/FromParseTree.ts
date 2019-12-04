import {RuleNode} from "antlr4ts/tree/RuleNode"

export abstract class FromParseTree {

    private readonly _astnode: RuleNode;

    protected constructor(astnode: RuleNode) {
        this._astnode = astnode;
    }

    get astnode(): RuleNode {
        return this._astnode;
    }

}
