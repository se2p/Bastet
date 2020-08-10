/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of Passau (uni-passau.de)
 *
 *   See the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Please make sure to CITE this work in your publications if you
 *   build on this work. Some of our maintainers or contributors might
 *   be interested in actively CONTRIBUTING to your research project.
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
    CoreActorExpressionVisitor,
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
    DivideExpression,
    FloatLiteral,
    IndexOfExpression,
    IntegerLiteral,
    LengthOfListExpression,
    LengthOfStringExpression,
    MinusExpression,
    ModuloExpression,
    MultiplyExpression,
    NumberExpression,
    NumberVariableExpression,
    PickRandomFromExpression,
    PlusExpression,
    RoundExpression,
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
    NumGreaterEqualExpression,
    NumGreaterThanExpression,
    NumLessEqualExpression,
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
    DeclareActorVariableStatement,
    DeclareAttributeStatement,
    DeclareStackVariableStatement,
    DeclareSystemVariableStatement
} from "../ast/core/statements/DeclarationStatement";
import {CreateCloneOfStatement} from "../ast/core/statements/CreateCloneOfStatement";
import {BroadcastMessageStatement} from "../ast/core/statements/BroadcastMessageStatement";
import {BroadcastAndWaitStatement} from "../ast/core/statements/BroadcastAndWaitStatement";
import {AbsentAstNode, AstNode, OptionalAstNode, PresentAstNode} from "../ast/AstNode";
import {Preconditions} from "../../utils/Preconditions";
import {IllegalStateException} from "../../core/exceptions/IllegalStateException";
import {DataLocation} from "../app/controlflow/DataLocation";
import {Expression} from "../ast/core/expressions/Expression";
import {VariableWithDataLocation} from "../ast/core/Variable";
import {
    BranchingAssumeStatement,
    StrengtheningAssumeStatement
} from "../ast/core/statements/AssumeStatement";
import {CallStatement} from "../ast/core/statements/CallStatement";
import {ExpressionList} from "../ast/core/expressions/ExpressionList";
import {Statement} from "../ast/core/statements/Statement";
import {BeginAtomicStatement, EndAtomicStatement, ReturnStatement} from "../ast/core/statements/ControlStatement";
import {SystemMessage, UserMessage} from "../ast/core/Message";
import {CastExpression} from "../ast/core/expressions/CastExpression";
import {
    ActorExpression, ActorSelfExpression,
    ActorVariableExpression,
    LocateActorExpression,
    StartCloneActorExpression,
    UsherActorExpression
} from "../ast/core/expressions/ActorExpression";
import {Identifier} from "../ast/core/Identifier";
import {
    InitializeAnalysisStatement,
    SignalTargetReachedStatement,
    TerminateProgramStatement
} from "../ast/core/statements/InternalStatement";

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
    CoreActorExpressionVisitor<AstNode>,
    CoreListExpressionVisitor<AstNode> {

    private readonly _renamer: DataLocationRenamer;

    protected _activeStatement: Statement;

    private _activeUsageMode: DataLocationMode;

    constructor(renamer: DataLocationRenamer) {
        this._renamer = renamer;
        this._activeUsageMode = DataLocationMode.READ_FROM;
    }

    private transformBeforeException() {
        throw new IllegalStateException("Statements on list must have been translated before to assignments of transformed list expressions");
    }

    visit(node: AstNode): AstNode {
        throw new ImplementMeException();
    }

    visitExpressionList(node: ExpressionList): AstNode {
        return new ExpressionList(node.elements.map(e => e.accept(this) as Expression));
    }

    visitSignalTargetReachedStatement(node: SignalTargetReachedStatement): AstNode {
        return new SignalTargetReachedStatement(node.targetCharacteristics.accept(this) as ExpressionList);
    }

    visitInitializeAnalysisStatement(node: InitializeAnalysisStatement): AstNode {
        return node;
    }

    visitTerminateProgramStatement(node: TerminateProgramStatement): AstNode {
        return node;
    }

    visitCastExpression(node: CastExpression): AstNode {
        const result = new CastExpression(node.toConvertFrom.accept(this) as Expression, node.castToType);

        // TODO: Check if the following simplification should be moved to another (new?) visitor

        // Remove needless cast (1)
        if (result.toConvertFrom.expressionType == result.castToType) {
            return result.toConvertFrom;
        }

        // Remove needless cast (2)
        if (result.toConvertFrom instanceof CastExpression) {
            const innerCast = result.toConvertFrom as CastExpression;
            if (innerCast.toConvertFrom.expressionType == result.castToType) {
                return innerCast.toConvertFrom;
            }
        }

        return result;
    }

    visitAbsentAstNode(node: AbsentAstNode<AstNode>): AstNode {
        return node;
    }

    visitPresentAstNode(node: PresentAstNode<AstNode>): AstNode {
        return OptionalAstNode.with(node.value().accept(this));
    }

    visitOptionalAstNode(node: OptionalAstNode<AstNode>): AstNode {
        if (node.isPresent()) {
            return OptionalAstNode.with(node.value().accept(this));
        } else {
            return OptionalAstNode.absent();
        }
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

    visitEndAtomicStatement(node: EndAtomicStatement): AstNode {
        return node;
    }

    visitBeginAtomicStatement(node: BeginAtomicStatement): AstNode {
        return node;
    }

    visitReturnStatement(node: ReturnStatement): AstNode {
        return this.doForStatement(node, () => {
            let resultVar;
            if (node.resultVariable.isPresent()) {
                // ATTENTION: We use 'renameRead' here because the actual assignment
                // should have been done by another, previous statement (created by the ControlAnalysis).
                const writeDataLoc = this.renameRead(node.resultVariable.value().dataloc);
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

    visitStrengtheningAssumeStatement(node: StrengtheningAssumeStatement): AstNode {
        return this.doForStatement(node, (() => {
            return new StrengtheningAssumeStatement(node.condition.accept(this) as BooleanExpression);
        }));
    }

    visitBranchingAssumeStatement(node: BranchingAssumeStatement): AstNode {
        return this.doForStatement(node, (() => {
            return new BranchingAssumeStatement(node.condition.accept(this) as BooleanExpression);
        }));
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
        return new LengthOfListExpression(node.listVar.accept(this) as VariableWithDataLocation);
    }

    visitLengthOfStringExpression(node: LengthOfStringExpression): AstNode {
        return new LengthOfStringExpression(node.str.accept(this) as StringExpression);
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

    visitIntegerLiteral(node: IntegerLiteral): AstNode {
        return node;
    }

    visitFloatLiteral(node: FloatLiteral): AstNode {
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

    visitNumGreaterEqualExpression(node: NumGreaterEqualExpression): AstNode {
        return new NumGreaterEqualExpression(node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitNumLessThanExpression(node: NumLessThanExpression): AstNode {
        return new NumLessThanExpression(node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitNumLessEqualExpression(node: NumLessEqualExpression): AstNode {
        return new NumLessEqualExpression(node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitOrExpression(node: OrExpression): AstNode {
        return new OrExpression(node.operand1.accept(this) as BooleanExpression,
            node.operand2.accept(this) as BooleanExpression);
    }

    visitStrContainsExpression(node: StrContainsExpression): AstNode {
        return new StrContainsExpression(
            node.operand1.accept(this) as StringExpression,
            node.operand2.accept(this) as StringExpression);
    }

    visitStrEqualsExpression(node: StrEqualsExpression): AstNode {
        return new StrEqualsExpression(
            node.operand1.accept(this) as StringExpression,
            node.operand2.accept(this) as StringExpression);
    }

    visitStrGreaterThanExpression(node: StrGreaterThanExpression): AstNode {
        return new StrGreaterThanExpression(
            node.operand1.accept(this) as StringExpression,
            node.operand2.accept(this) as StringExpression);
    }

    visitStrLessThanExpression(node: StrLessThanExpression): AstNode {
        return new StrLessThanExpression(
            node.operand1.accept(this) as StringExpression,
            node.operand2.accept(this) as StringExpression);
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
        return new IthLetterOfStringExpression(
            node.index.accept(this) as NumberExpression,
            node.strExpr.accept(this) as StringExpression);
    }

    visitIthStringItemOfExpression(node: IthStringItemOfExpression): AstNode {
        return new IthStringItemOfExpression(
            node.index.accept(this) as NumberExpression,
            node.ofVariable.accept(this) as VariableWithDataLocation)
    }

    visitJoinStringsExpression(node: JoinStringsExpression): AstNode {
        return new JoinStringsExpression(
            node.operand1.accept(this) as StringExpression,
            node.operand2.accept(this) as StringExpression);
    }

    visitNumAsStringExpression(node: NumAsStringExpression): AstNode {
        return new NumAsStringExpression(node.num.accept(this) as NumberExpression);
    }

    visitResourceAttributeOfExpression(node: ResourceAttributeOfExpression): AstNode {
        throw new ImplementMeException();
    }

    visitStringAttributeOfExpression(node: StringAttributeOfExpression): AstNode {
        return new StringAttributeOfExpression(node.attribute.accept(this) as StringExpression, node.ofEntity);
    }

    visitStringLiteral(node: StringLiteral): AstNode {
        return node;
    }

    visitStringVariableExpression(node: StringVariableExpression): AstNode {
        const renamedDataLoc: DataLocation = this.renameRead(node.variable.dataloc);
        return new StringVariableExpression(new VariableWithDataLocation(renamedDataLoc));
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
                node.msg.accept(this) as SystemMessage);
        }));
    }

    visitUserMessage(node: UserMessage): AstNode {
        return new UserMessage(node.messageid.accept(this) as StringExpression);
    }

    visitSystemMessage(node: SystemMessage): AstNode {
       return new SystemMessage(node.destination,
           node.messageid.accept(this) as StringExpression,
           node.payload.accept(this) as ExpressionList) ;
    }

    visitBroadcastMessageStatement(node: BroadcastMessageStatement): AstNode {
        return this.doForStatement(node, (() => {
            return new BroadcastMessageStatement(
                node.msg.accept(this) as SystemMessage);
        }));
    }

    visitActorSelfExpression(node: ActorSelfExpression): AstNode {
        return node;
    }

    visitLocateActorExpression(node: LocateActorExpression): AstNode {
        return new LocateActorExpression(node.actorName.accept(this) as StringExpression);
    }

    visitActorVariableExpression(node: ActorVariableExpression): AstNode {
        const renamedDataLoc: DataLocation = this.renameRead(node.variable.dataloc);
        return new ActorVariableExpression(new VariableWithDataLocation(renamedDataLoc));
    }

    visitStartCloneActorExpression(node: StartCloneActorExpression): AstNode {
        return new StartCloneActorExpression(node.ofActor.accept(this) as ActorExpression);
    }

    visitUsherActorExpression(node: UsherActorExpression): AstNode {
       return new UsherActorExpression(
           node.actorName.accept(this) as StringExpression,
           node.role.accept(this) as Identifier);
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

    visitDeclareAttributeStatement(node: DeclareAttributeStatement): AstNode {
        throw new IllegalStateException("We assume that 'attributes' are no more used");
    }

    visitDeclareActorVariableStatement(node: DeclareActorVariableStatement): AstNode {
        return this.doForStatement(node, (() => {
            const renamedDataLoc: DataLocation = this.renameDeclaration(node.variable.dataloc);
            return new DeclareActorVariableStatement(new VariableWithDataLocation(renamedDataLoc));
        }));
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
            // ATTENTION: It is importat to conduct the visit for the RHS first (for a forwards analysis)!
            const rhs = this.withMode(DataLocationMode.READ_FROM, () => node.toValue.accept(this)) as Expression;
            const assignedDataLoc: DataLocation = this.renameAssigned(node.variable.dataloc);
            return new StoreEvalResultToVariableStatement(new VariableWithDataLocation(assignedDataLoc), rhs);
        }));
    }

    visitResetTimerStatement(node: ResetTimerStatement): AstNode {
        return this.doForStatement(node, (() => {
            throw new ImplementMeException();
        }));
    }
}


