import {RuleNode} from "antlr4ts/tree";

export default abstract class ProgramOperation {

    private readonly _ast: RuleNode;

    constructor(ast: RuleNode) {
        this._ast = ast;
    }

    get ast() {
        return this._ast;
    }

}

export class NoopProgramOperation extends ProgramOperation {

}
