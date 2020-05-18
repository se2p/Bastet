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
import {EpsilonStatement} from "../../../ast/core/statements/EpsilonStatement";
import {BooleanType} from "../../../ast/core/ScratchType";
import {ImplementMeException} from "../../../../core/exceptions/ImplementMeException";

export type OperationId = number;

export abstract class ProgramOperation implements WithIdent {

    private readonly _ast: AstNode;

    private readonly _id: OperationId;

    constructor(ast: AstNode) {
        this._ast = Preconditions.checkNotUndefined(ast);
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

    public static for(id: OperationId): ProgramOperation {
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

    constructor() {
        super(new EpsilonStatement());
    }

    toString(): string {
        return "epsilon";
    }

}

export class ProgramOperations {

    private static opCodeToIdMap: Map<string, OperationId> = new Map();
    private static idToAstMap: Map<OperationId, AstNode> = new Map();
    private static opMap: Map<OperationId, ProgramOperation> = new Map();
    private static idSequencePos: OperationId;

    public static isAssumingOp(op: ProgramOperation): boolean {
        throw new ImplementMeException();
    }

    public static fresh(): OperationId {
        if (isNaN(ProgramOperations.idSequencePos)) {
            ProgramOperations.idSequencePos = 0;
        }
        return ProgramOperations.idSequencePos++;
    }

    public static constructOp(ast: AstNode): OperationId {
        if (ast == null) {
            return this.fresh();
        } else {
            let opStr: string = ast.toTreeString();
            let result: OperationId = ProgramOperations.opCodeToIdMap.get(opStr);
            if (!result) {
                result = this.fresh();
                ProgramOperations.idToAstMap.set(result, ast);
                ProgramOperations.opCodeToIdMap.set(opStr, result);
            }
            return result;
        }
    }

    public static withID(id: OperationId): ProgramOperation|null {
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

    private static EPSILON_OP: ProgramOperation;

    public static epsilon(): ProgramOperation {
        if (!ProgramOperations.EPSILON_OP) {
            ProgramOperations.EPSILON_OP = new RawOperation(new EpsilonStatement());
        }
        return ProgramOperations.EPSILON_OP;
    }

    private static IRREDUCIBLE_EPSILON_OP: ProgramOperation;

    public static irreducibleEpsilon(): ProgramOperation {
        if (!ProgramOperations.IRREDUCIBLE_EPSILON_OP) {
            ProgramOperations.IRREDUCIBLE_EPSILON_OP = new RawOperation(new EpsilonStatement());
        }
        return ProgramOperations.IRREDUCIBLE_EPSILON_OP;
    }

}

export class ProgramOperationFactory {

    public static createFor(ast: AstNode): ProgramOperation {
        if (ast['expressionType'] === BooleanType.instance()) {
            return this.createAssumeOpFrom(ast as BooleanExpression);
        }
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

