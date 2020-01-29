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

import {WithIdent} from "../../../../utils/WithIdent";
import {AstNode} from "../../../ast/AstNode";
import {Preconditions} from "../../../../utils/Preconditions";
import {BooleanExpression, NegationExpression} from "../../../ast/core/expressions/BooleanExpression";

export type OperationID = number;

export abstract class ProgramOperation implements WithIdent {

    private readonly _ast: AstNode|null;
    private readonly _id: OperationID;

    constructor(ast: AstNode|null) {
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
            return this._ast.toTreeString();
        } else {
            return this.constructor.name;
        }
    }

    public static for(id: OperationID): ProgramOperation {
        return ProgramOperations.withID(id);
    }

}

export class AssignementOperation extends ProgramOperation {

}

export class AssumeOperation extends ProgramOperation {

    private readonly _expression: BooleanExpression;

    constructor(ast: BooleanExpression) {
        super(ast);
        this._expression = ast;
    }

    get expression(): BooleanExpression {
        return this._expression;
    }

    toString(): string {
        return `[${this.ast.toTreeString()}]`;
    }

}

export class RawOperation extends ProgramOperation {

    constructor(ast: AstNode) {
        super(ast);
    }

    toString(): string {
        return this.ast.toTreeString();
    }

}

export class NoopProgramOperation extends ProgramOperation {

    toString(): string {
        return "epsilon";
    }
}

export class ProgramOperations {

    private static opCodeToIdMap: Map<string, OperationID> = new Map();
    private static idToAstMap: Map<OperationID, AstNode> = new Map();
    private static opMap: Map<OperationID, ProgramOperation> = new Map();
    private static readonly EPSILON_OP = new NoopProgramOperation(null);
    private static idSequencePos: OperationID;

    public static fresh(): OperationID {
        if (isNaN(ProgramOperations.idSequencePos)) {
            ProgramOperations.idSequencePos = 0;
        }
        return ProgramOperations.idSequencePos++;
    }

    public static constructOp(ast: AstNode): OperationID {
        if (ast == null) {
            return this.fresh();
        } else {
            let opStr: string = ast.toTreeString();
            let result: OperationID = ProgramOperations.opCodeToIdMap.get(opStr);
            if (!result) {
                result = this.fresh();
                ProgramOperations.idToAstMap.set(result, ast);
                ProgramOperations.opCodeToIdMap.set(opStr, result);
            }
            return result;
        }
    }

    public static withID(id: OperationID): ProgramOperation|null {
        let result: ProgramOperation = ProgramOperations.opMap.get(id) || null;
        if (result == null) {
            const ast: AstNode = ProgramOperations.idToAstMap.get(id);
            result = ProgramOperationFactory.createFor(ast);
            ProgramOperations.opMap[id] = result;
        }
        return result;
    }

    public static register(op: ProgramOperation): void {
        Preconditions.checkNotUndefined(op);
        if (ProgramOperations.opMap.has(op.ident)) {
            return;
            // throw new IllegalStateException(`Operation with ID ${op.ident} already registered!`);
        }
        ProgramOperations.opMap.set(op.ident, op);
    }

    public static epsilon(): ProgramOperation {
        return ProgramOperations.EPSILON_OP;
    }

}

export class ProgramOperationFactory {

    public static createFor(ast: AstNode): ProgramOperation {
        return new RawOperation(ast);
    }

    static createAssumeOpFrom(boolExpr: BooleanExpression): AssumeOperation {
        return new AssumeOperation(boolExpr);
    }

    static negatedAssumeOpFrom(boolExpr: BooleanExpression): AssumeOperation {
        const negation = new NegationExpression(boolExpr);
        return new AssumeOperation(negation);
    }

    static epsilon(): NoopProgramOperation {
        return ProgramOperations.epsilon();
    }

}

