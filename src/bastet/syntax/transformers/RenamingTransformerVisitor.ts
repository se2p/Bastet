/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net),
 *   see the file CONTRIBUTORS.md for the list of contributors.
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

import {
    CoreBoolExpressionVisitor,
    CoreListExpressionVisitor,
    CoreNonCtrlStatementnVisitor,
    CoreNumberExpressionVisitor,
    CoreStringExpressionVisitor,
    CoreVisitor
} from "../ast/CoreVisitor";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {WaitUntilStatement} from "../ast/core/statements/WaitUntilStatement";
import {
    BoolAsNumberExpression,
    DivideExpression,
    IndexOfExpression,
    LengthOfListExpression,
    LengthOfStringExpression,
    MinusExpression,
    ModuloExpression,
    MultiplyExpression,
    NumberExpression,
    NumberLiteral,
    NumberVariableExpression,
    NumFunctExpression,
    PickRandomFromExpression,
    PlusExpression,
    RoundExpression,
    StringAsNumberExpression,
    TimerExpression
} from "../ast/core/expressions/NumberExpression";
import {
    BoolAsStringExpression,
    IthLetterOfStringExpression,
    IthStringItemOfExpression,
    JoinStringsExpression,
    NumAsStringExpression,
    ResourceAttributeOfExpression,
    StringAttributeOfExpression,
    StringExpression,
    StringLiteral,
    StringVariableExpression
} from "../ast/core/expressions/StringExpression";
import {
    AndExpression,
    BooleanExpression,
    BooleanLiteral,
    BooleanVariableExpression,
    NegationExpression,
    NumEqualsExpression,
    NumGreaterThanExpression,
    NumLessThanExpression,
    OrExpression,
    StrContainsExpression,
    StrEqualsExpression,
    StrGreaterThanExpression,
    StrLessThanExpression
} from "../ast/core/expressions/BooleanExpression";
import {
    SetAttributeOfToStatement,
    SetAttributeToStatement,
    StoreEvalResultToVariableStatement
} from "../ast/core/statements/SetStatement";
import {
    DeleteThisCloneStatement,
    StopAllStatement,
    StopThisStatement
} from "../ast/core/statements/TerminationStatement";
import {StopOthersInActorStatement} from "../ast/core/statements/StopOthersInActorStatement";
import {ResetTimerStatement} from "../ast/core/statements/ResetTimerStatement";
import {
    AddElementToStatement,
    DeleteAllFromStatement,
    DeleteIthFromStatement,
    InsertAtStatement,
    ReplaceElementAtStatement
} from "../ast/core/statements/ListStatement";
import {ExpressionListExpression, ListVariableExpression} from "../ast/core/expressions/ListExpression";
import {ExpressionStatement} from "../ast/core/statements/ExpressionStatement";
import {EpsilonStatement} from "../ast/core/statements/EpsilonStatement";
import {
    DeclareAttributeOfStatement,
    DeclareAttributeStatement,
    DeclareStackVariableStatement, DeclareSystemVariableStatement
} from "../ast/core/statements/DeclarationStatement";
import {CreateCloneOfStatement} from "../ast/core/statements/CreateCloneOfStatement";
import {ChangeVarByStatement} from "../ast/core/statements/ChangeVarByStatement";
import {ChangeAttributeByStatement} from "../ast/core/statements/ChangeAttributeByStatement";
import {BroadcastMessageStatement} from "../ast/core/statements/BroadcastMessageStatement";
import {BroadcastAndWaitStatement} from "../ast/core/statements/BroadcastAndWaitStatement";
import {AstNode, OptionalAstNode} from "../ast/AstNode";
import {Preconditions} from "../../utils/Preconditions";
import {IllegalStateException} from "../../core/exceptions/IllegalStateException";
import {DataLocation} from "../app/controlflow/DataLocation";
import {Expression} from "../ast/core/expressions/Expression";
import {VariableWithDataLocation} from "../ast/core/Variable";
import {AssumeStatement} from "../ast/core/statements/AssumeStatement";
import {CallStatement} from "../ast/core/statements/CallStatement";
import {ExpressionList} from "../ast/core/expressions/ExpressionList";
import {Statement} from "../ast/core/statements/Statement";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";
import {ReturnStatement} from "../ast/core/statements/ControlStatement";

export enum DataLocationMode {

    UNKNOWN,
    READ_FROM,
    ASSINGED_TO

}

export interface DataLocationRenamer {

    renameUsage(dataLoc: DataLocation, usageMode: DataLocationMode, inContextOf: Statement): DataLocation;

}

export class RenamingTransformerVisitor implements CoreVisitor<AstNode>,
    CoreNonCtrlStatementnVisitor<AstNode>,
    CoreNumberExpressionVisitor<AstNode>,
    CoreBoolExpressionVisitor<AstNode>,
    CoreStringExpressionVisitor<AstNode>,
    CoreListExpressionVisitor<AstNode> {

    private readonly _renamer: DataLocationRenamer;

    private _activeStatement: Statement;

    private _activeUsageMode: DataLocationMode;

    constructor(renamer: DataLocationRenamer) {
        this._renamer = Preconditions.checkNotUndefined(renamer);
    }

    private transformBeforeException() {
        throw new IllegalStateException("Statements on list must have been translated before to assignements of transformed list expressions");
    }

    visit(node: AstNode): AstNode {
        throw new ImplementMeException();
    }

    private doForStatement(stmt: Statement, cb: () => AstNode): AstNode {
        this._activeStatement = stmt;
        try {
            return cb();
        } finally {
            this._activeStatement = null;
        }
    }

    private doWithMode(mode: DataLocationMode, cb: () => void) {
        this._activeUsageMode = mode;
        try {
            cb();
        } finally {
            this._activeUsageMode = null;
        }
    }

    private withMode(mode: DataLocationMode, cb: () => AstNode): AstNode {
        this._activeUsageMode = mode;
        try {
            return cb();
        } finally {
            this._activeUsageMode = null;
        }
    }

    private rename(dataLoc: DataLocation): DataLocation {
        return this._renamer.renameUsage(dataLoc, this._activeUsageMode, this._activeStatement);
    }

    private renameRead(dataLoc: DataLocation): DataLocation {
        return this._renamer.renameUsage(dataLoc, DataLocationMode.READ_FROM, this._activeStatement);
    }

    private renameAssigned(dataLoc: DataLocation): DataLocation {
        return this._renamer.renameUsage(dataLoc, DataLocationMode.ASSINGED_TO, this._activeStatement);
    }

    private renameDeclaration(dataLoc: DataLocation): DataLocation {
        return this._renamer.renameUsage(dataLoc, DataLocationMode.ASSINGED_TO, this._activeStatement);
    }

    visitReturnStatement(node: ReturnStatement): AstNode {
        return this.doForStatement(node, () => {
            let resultVar;
            if (node.resultVariable.isPresent()) {
                const writeDataLoc = this.renameAssigned(node.resultVariable.value().dataloc);
                resultVar = OptionalAstNode.with(new VariableWithDataLocation(writeDataLoc));
            } else {
                resultVar = OptionalAstNode.absent();
            }
            return new ReturnStatement(resultVar);
        });
    }

    visitCallStatement(node: CallStatement): AstNode {
        return this.doForStatement(node, (() => {
            const argExprs = [];
            for (const a of node.args) {
                argExprs.push(a.accept(this) as Expression);
            }
            const args = new ExpressionList(argExprs);

            let assignResultTo: OptionalAstNode<VariableWithDataLocation>;
            if (node.assignResultTo.isPresent()) {
                const readDataLocVersion: DataLocation = this.renameAssigned(node.assignResultTo.value().dataloc);
                assignResultTo = OptionalAstNode.with(new VariableWithDataLocation(readDataLocVersion));
            } else {
                assignResultTo = node.assignResultTo;
            }

            return new CallStatement(node.calledMethod, args, assignResultTo);
        }));
    }

    visitAssumeStatement(node: AssumeStatement): AstNode {
        return this.doForStatement(node, (() => {
            return new AssumeStatement(node.condition.accept(this) as BooleanExpression);
        }));
    }

    visitBoolAsNumberExpression(node: BoolAsNumberExpression): AstNode {
        return new BoolAsNumberExpression(node.toConvert.accept(this) as BooleanExpression);
    }

    visitDivideExpression(node: DivideExpression): AstNode {
        return new DivideExpression(
            node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitIndexOfExpression(node: IndexOfExpression): AstNode {
        const readDataLoc: DataLocation = this.renameRead(node.variable.dataloc);
        return new IndexOfExpression(
            node.expr.accept(this) as Expression,
            new VariableWithDataLocation(readDataLoc));
    }

    visitLengthOListExpression(node: LengthOfListExpression): AstNode {
        throw new ImplementMeException();
    }

    visitLengthOfStringExpression(node: LengthOfStringExpression): AstNode {
        throw new ImplementMeException();
    }

    visitMinusExpression(node: MinusExpression): AstNode {
        return new MinusExpression(
            node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitModuloExpression(node: ModuloExpression): AstNode {
        return new ModuloExpression(
            node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitMultiplyExpression(node: MultiplyExpression): AstNode {
        return new MultiplyExpression(
            node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitNumFunctExpression(node: NumFunctExpression): AstNode {
        throw new IllegalStateException("Assuming that this expression is handled in the IL");
    }

    visitNumberLiteral(node: NumberLiteral): AstNode {
        return node;
    }

    visitNumberVariableExpression(node: NumberVariableExpression): AstNode {
        const renamedDataLoc: DataLocation = this.renameRead(node.variable.dataloc);
        return new NumberVariableExpression(new VariableWithDataLocation(renamedDataLoc));
    }

    visitPickRandomFromExpression(node: PickRandomFromExpression): AstNode {
        return new PickRandomFromExpression(node.from.accept(this) as NumberExpression,
            node.to.accept(this) as NumberExpression);
    }

    visitPlusExpression(node: PlusExpression): AstNode {
        return new PlusExpression(
            node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitRoundExpression(node: RoundExpression): AstNode {
        return new RoundExpression(node.num.accept(this) as NumberExpression);
    }

    visitStringAsNumberExpression(node: StringAsNumberExpression): AstNode {
        return new StringAsNumberExpression(node.toConvert.accept(this) as StringExpression);
    }

    visitTimerExpression(node: TimerExpression): AstNode {
        throw new ImplementMeException();
    }

    visitAndExpression(node: AndExpression): AstNode {
        return new AndExpression(node.operand1.accept(this) as BooleanExpression,
            node.operand2.accept(this) as BooleanExpression);
    }

    visitBooleanLiteral(node: BooleanLiteral): AstNode {
        return node;
    }

    visitBooleanVariableExpression(node: BooleanVariableExpression): AstNode {
        const renamedDataLoc: DataLocation = this.renameRead(node.variable.dataloc);
        return new BooleanVariableExpression(new VariableWithDataLocation(renamedDataLoc));
    }

    visitNegationExpression(node: NegationExpression): AstNode {
        return new NegationExpression(node.negate.accept(this) as BooleanExpression);
    }

    visitNumEqualsExpression(node: NumEqualsExpression): AstNode {
        return new NumEqualsExpression(node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitNumGreaterThanExpression(node: NumGreaterThanExpression): AstNode {
        return new NumGreaterThanExpression(node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitNumLessThanExpression(node: NumLessThanExpression): AstNode {
        return new NumLessThanExpression(node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitOrExpression(node: OrExpression): AstNode {
        return new OrExpression(node.operand1.accept(this) as BooleanExpression,
            node.operand2.accept(this) as BooleanExpression);
    }

    visitStrContainsExpression(node: StrContainsExpression): AstNode {
        throw new ImplementMeException();
    }

    visitStrEqualsExpression(node: StrEqualsExpression): AstNode {
        throw new ImplementMeException();
    }

    visitStrGreaterThanExpression(node: StrGreaterThanExpression): AstNode {
        throw new ImplementMeException();
    }

    visitStrLessThanExpression(node: StrLessThanExpression): AstNode {
        throw new ImplementMeException();
    }

    visitExpressionListExpression(node: ExpressionListExpression): AstNode {
        throw new ImplementMeException();
    }

    visitListVariableExpression(node: ListVariableExpression): AstNode {
        throw new ImplementMeException();
    }

    visitBoolAsStringExpression(node: BoolAsStringExpression): AstNode {
        throw new ImplementMeException();
    }

    visitIthLetterOfStringExpression(node: IthLetterOfStringExpression): AstNode {
        throw new ImplementMeException();
    }

    visitIthStringItemOfExpression(node: IthStringItemOfExpression): AstNode {
        throw new ImplementMeException();
    }

    visitJoinStringsExpression(node: JoinStringsExpression): AstNode {
        throw new ImplementMeException();
    }

    visitNumAsStringExpression(node: NumAsStringExpression): AstNode {
        throw new ImplementMeException();
    }

    visitResourceAttributeOfExpression(node: ResourceAttributeOfExpression): AstNode {
        throw new ImplementMeException();
    }

    visitStringAttributeOfExpression(node: StringAttributeOfExpression): AstNode {
        throw new ImplementMeException();
    }

    visitStringLiteral(node: StringLiteral): AstNode {
        return node;
    }

    visitStringVariableExpression(node: StringVariableExpression): AstNode {
        throw new ImplementMeException();
    }

    visitAddElementToStatement(node: AddElementToStatement): AstNode {
        this.transformBeforeException();
        return node;
    }

    visitDeleteFromAllStatement(node: DeleteAllFromStatement): AstNode {
        this.transformBeforeException();
        return node;
    }

    visitDeleteIthFromStatement(node: DeleteIthFromStatement): AstNode {
        this.transformBeforeException();
        return node;
    }

    visitInsertAtStatement(node: InsertAtStatement): AstNode {
        this.transformBeforeException();
        return node;
    }

    visitReplaceElementAtStatement(node: ReplaceElementAtStatement): AstNode {
        this.transformBeforeException();
        return node;
    }

    visitBroadcastAndWaitStatement(node: BroadcastAndWaitStatement): AstNode {
        return this.doForStatement(node, (() => {
            return new BroadcastAndWaitStatement(
                node.msg.accept(this) as StringExpression);
        }));
    }

    visitBroadcastMessageStatement(node: BroadcastMessageStatement): AstNode {
        return this.doForStatement(node, (() => {
            return new BroadcastMessageStatement(
                node.msg.accept(this) as StringExpression);
        }));
    }

    visitCreateCloneOfStatement(node: CreateCloneOfStatement): AstNode {
        // Handled by another analysis
        return node;
    }

    visitDeleteThisCloneStatement(node: DeleteThisCloneStatement): AstNode {
        // TODO: We assume that there are separate statements
        //  that release the memory for the allocated variables.
        return node;
    }

    visitEpsilonStatement(node: EpsilonStatement): AstNode {
        // No assignments
        return node;
    }

    visitExpressionStatement(node: ExpressionStatement): AstNode {
        return this.doForStatement(node, (() => {
            return new ExpressionStatement(
                node.expression.accept(this) as Expression);
        }));
    }

    visitStopAllStatement(node: StopAllStatement): AstNode {
        // Handled by another analysis.
        return node;
    }

    visitStopOthersInActorStatement(node: StopOthersInActorStatement): AstNode {
        // Handled by another analysis.
        return node;
    }

    visitStopThisStatement(node: StopThisStatement): AstNode {
        // Handled by another analysis.
        return node;
    }

    visitWaitUntilStatement(node: WaitUntilStatement): AstNode {
        return this.doForStatement(node, (() => {
            return new WaitUntilStatement(
                node.cond.accept(this) as BooleanExpression);
        }));
    }

    visitChangeAttributeByStatement(node: ChangeAttributeByStatement): AstNode {
        throw new IllegalArgumentException("Please use variables instead of attributes for actor-local variable changes");
    }

    visitChangeVarByStatement(node: ChangeVarByStatement): AstNode {
        throw new IllegalArgumentException("Should be replaced by other statements in a preprocessingt step");
    }

    visitDeclareAttributeOfStatement(node: DeclareAttributeOfStatement): AstNode {
        throw new IllegalStateException("We assume that 'attributes' are no more used");
    }

    visitDeclareAttributeStatement(node: DeclareAttributeStatement): AstNode {
        throw new IllegalStateException("We assume that 'attributes' are no more used");
    }

    visitDeclareStackVariableStatement(node: DeclareStackVariableStatement): AstNode {
        return this.doForStatement(node, (() => {
            const renamedDataLoc: DataLocation = this.renameDeclaration(node.variable.dataloc);
            return new DeclareStackVariableStatement(new VariableWithDataLocation(renamedDataLoc));
        }));
    }

    visitDeclareSystemVariableStatement(node: DeclareSystemVariableStatement): AstNode {
        return this.doForStatement(node, (() => {
            const renamedDataLoc: DataLocation = this.renameDeclaration(node.variable.dataloc);
            return new DeclareSystemVariableStatement(new VariableWithDataLocation(renamedDataLoc));
        }));
    }

    visitSetAttributeOfToStatement(node: SetAttributeOfToStatement): AstNode {
        throw new IllegalStateException("We assume that 'attributes' are no more used");
    }

    visitSetAttributeToStatement(node: SetAttributeToStatement): AstNode {
        throw new IllegalStateException("We assume that 'attributes' are no more used");
    }

    visitVariableWithDataLocation(node: VariableWithDataLocation): AstNode {
        return new VariableWithDataLocation(this.rename(node.dataloc));
    }

    visitStoreEvalResultToVariableStatement(node: StoreEvalResultToVariableStatement): AstNode {
        return this.doForStatement(node, (() => {
            const assignedDataLoc: DataLocation = this.renameAssigned(node.variable.dataloc);
            return new StoreEvalResultToVariableStatement(
                new VariableWithDataLocation(assignedDataLoc),
                this.withMode(DataLocationMode.READ_FROM, () => node.toValue.accept(this)) as Expression);
        }));
    }

    visitResetTimerStatement(node: ResetTimerStatement): AstNode {
        return this.doForStatement(node, (() => {
            throw new ImplementMeException();
        }));
    }
}


