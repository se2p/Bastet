import {RuleNode} from "antlr4ts/tree";
import {WithIdent} from "../../../../utils/WithIdent";

export type OperationID = number;

export abstract class ProgramOperation implements WithIdent {

    private readonly _ast: RuleNode|null;
    private readonly _id: OperationID;

    constructor(ast: RuleNode|null) {
        this._ast = ast;
        this._id = ProgramOperations.constructOp(ast);
        ProgramOperations.register(this);
    }

    get ast() {
        return this._ast;
    }

    get ident() {
        return this._id;
    }

    public toString(): string {
        if (this._ast) {
            return this._ast.toStringTree();
        } else {
            return this.constructor.name;
        }
    }

}

export class NoopProgramOperation extends ProgramOperation {

}

export class ProgramOperations {

    private static opCodeToIdMap: Map<string, OperationID> = new Map();
    private static opMap: Map<OperationID, ProgramOperation> = new Map();
    private static readonly EPSILON_OP = new NoopProgramOperation(null);
    private static idSequencePos: OperationID = 0;

    public static fresh(): OperationID {
        return this.idSequencePos++;
    }

    public static constructOp(ast: RuleNode): OperationID {
        if (ast == null) {
            return this.fresh();
        } else {
            let opStr: string = ast.toStringTree();
            let result: OperationID = this.opCodeToIdMap.get(opStr);
            if (!result) {
                result = this.fresh();
                this.opCodeToIdMap.set(opStr, result);
            }
            return result;
        }
    }

    public static withID(id: OperationID): ProgramOperation|null {
        return this.opMap.get(id) || null;
    }

    public static register(op: ProgramOperation): void {
        if (this.opMap.has(op.ident)) {
            return;
            // throw new IllegalStateException(`Operation with ID ${op.ident} already registered!`);
        }
        this.opMap.set(op.ident, op);
    }

    public static epsilon(): ProgramOperation {
        return this.EPSILON_OP;
    }

}
