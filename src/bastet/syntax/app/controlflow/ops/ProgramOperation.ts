import {RuleNode} from "antlr4ts/tree";
import {ImplementMeException} from "../../../../core/exceptions/ImplementMeException";

export type OperationID = number;

export abstract class ProgramOperation {

    private readonly _ast: RuleNode|null;

    constructor(ast: RuleNode|null) {
        this._ast = ast;
    }

    get ast() {
        return this._ast;
    }

}

export class NoopProgramOperation extends ProgramOperation {

}

export class ProgramOperations {

    public static withID(id: OperationID): ProgramOperation {
        throw new ImplementMeException();
    }

    private static readonly EPSILON_OP = new NoopProgramOperation(null);

    public static epsilon(): ProgramOperation {
        return this.EPSILON_OP;
    }

}
