import {RuleNode} from "antlr4ts/tree";

export type OperationID = number;

export abstract class ProgramOperation {

    private readonly _ast: RuleNode;

    constructor(ast: RuleNode) {
        this._ast = ast;
    }

    get ast() {
        return this._ast;
    }

    public static withID(id: OperationID): ProgramOperation {

    }

}

export class NoopProgramOperation extends ProgramOperation {

}
