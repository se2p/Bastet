/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net)
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

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

    public static for(id: OperationID): ProgramOperation {
        return ProgramOperations.withID(id);
    }

}

export class NoopProgramOperation extends ProgramOperation {

    toString(): string {
        return "epsilon";
    }
}

export class ProgramOperations {

    private static opCodeToIdMap: Map<string, OperationID> = new Map();
    private static opMap: Map<OperationID, ProgramOperation> = new Map();
    private static readonly EPSILON_OP = new NoopProgramOperation(null);
    private static idSequencePos: OperationID;

    public static fresh(): OperationID {
        if (isNaN(ProgramOperations.idSequencePos)) {
            ProgramOperations.idSequencePos = 0;
        }
        return ProgramOperations.idSequencePos++;
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
