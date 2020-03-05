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

import {AstNode} from "./AstNode";
import {
    BoolAsNumberExpression,
    DivideExpression,
    IndexOfExpression,
    LengthOfListExpression,
    LengthOfStringExpression,
    MinusExpression,
    ModuloExpression,
    MultiplyExpression,
    NumberLiteral,
    NumberVariableExpression,
    NumFunctExpression,
    PickRandomFromExpression,
    PlusExpression,
    RoundExpression,
    StringAsNumberExpression,
    TimerExpression
} from "./core/expressions/NumberExpression";
import {
    AndExpression,
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
} from "./core/expressions/BooleanExpression";
import {
    BoolAsStringExpression,
    IthLetterOfStringExpression,
    IthStringItemOfExpression,
    JoinStringsExpression,
    NumAsStringExpression,
    ResourceAttributeOfExpression,
    StringAttributeOfExpression,
    StringLiteral,
    StringVariableExpression
} from "./core/expressions/StringExpression";
import {ExpressionListExpression, ListVariableExpression} from "./core/expressions/ListExpression";
import {
    BeginAtomicStatement, EndAtomicStatement,
    IfStatement,
    RepeatForeverStatement,
    UntilStatement
} from "./core/statements/ControlStatement";
import {CallStatement} from "./core/statements/CallStatement";
import {StatementList} from "./core/statements/Statement";
import {DeclareStackVariableStatement} from "./core/statements/DeclarationStatement";
import {ExpressionStatement} from "./core/statements/ExpressionStatement";
import {StopOthersInActorStatement} from "./core/statements/StopOthersInActorStatement";
import {CreateCloneOfStatement} from "./core/statements/CreateCloneOfStatement";
import {BroadcastMessageStatement} from "./core/statements/BroadcastMessageStatement";
import {BroadcastAndWaitStatement} from "./core/statements/BroadcastAndWaitStatement";
import {ResetTimerStatement} from "./core/statements/ResetTimerStatement";
import {ChangeVarByStatement} from "./core/statements/ChangeVarByStatement";
import {ChangeAttributeByStatement} from "./core/statements/ChangeAttributeByStatement";
import {EpsilonStatement} from "./core/statements/EpsilonStatement";
import {
    AddElementToStatement,
    DeleteAllFromStatement,
    DeleteIthFromStatement,
    InsertAtStatement,
    ReplaceElementAtStatement
} from "./core/statements/ListStatement";
import {
    SetAttributeOfToStatement,
    SetAttributeToStatement,
    StoreEvalResultToVariableStatement
} from "./core/statements/SetStatement";
import {DeleteThisCloneStatement, StopAllStatement, StopThisStatement} from "./core/statements/TerminationStatement";
import {WaitUntilStatement} from "./core/statements/WaitUntilStatement";
import {AssumeStatement} from "./core/statements/AssumeStatement";
import {VariableWithDataLocation} from "./core/Variable";
import {CastExpression} from "./core/expressions/CastExpression";

export interface CoreVisitor<R> {

    visit(node: AstNode): R;

}

export interface CoreNumberExpressionVisitor<R> extends CoreVisitor<R>{

    visitCastExpression(node: CastExpression): R;

    visitNumberLiteral(node: NumberLiteral): R;

    visitNumberVariableExpression(node: NumberVariableExpression): R;

    visitVariableWithDataLocation(node: VariableWithDataLocation): R;

    visitStringAsNumberExpression(node: StringAsNumberExpression): R;

    visitBoolAsNumberExpression(node: BoolAsNumberExpression): R;

    visitTimerExpression(node: TimerExpression): R;

    visitLengthOfStringExpression(node: LengthOfStringExpression): R;

    visitLengthOListExpression(node: LengthOfListExpression): R;

    visitIndexOfExpression(node: IndexOfExpression): R;

    visitPickRandomFromExpression(node: PickRandomFromExpression): R;

    visitRoundExpression(node: RoundExpression): R;

    visitNumFunctExpression(node: NumFunctExpression): R;

    visitMultiplyExpression(node: MultiplyExpression): R;

    visitDivideExpression(node: DivideExpression): R;

    visitModuloExpression(node: ModuloExpression): R;

    visitPlusExpression(node: PlusExpression): R;

    visitMinusExpression(node: MinusExpression): R;

}

export interface CoreBoolExpressionVisitor<R> extends CoreVisitor<R> {

    visitCastExpression(node: CastExpression): R;

    visitAndExpression(node: AndExpression): R;

    visitOrExpression(node: OrExpression): R;

    visitNegationExpression(node: NegationExpression): R;

    visitBooleanLiteral(node: BooleanLiteral): R;

    visitBooleanVariableExpression(node: BooleanVariableExpression): R;

    visitStrGreaterThanExpression(node: StrGreaterThanExpression): R;

    visitStrLessThanExpression(node: StrLessThanExpression): R;

    visitStrEqualsExpression(node: StrEqualsExpression): R;

    visitNumGreaterThanExpression(node: NumGreaterThanExpression): R;

    visitNumLessThanExpression(node: NumLessThanExpression): R;

    visitNumLessEqualExpression(node: NumLessEqualExpression): R;

    visitNumGreaterEqualExpression(node: NumGreaterEqualExpression): R;

    visitNumEqualsExpression(node: NumEqualsExpression): R;

    visitStrContainsExpression(node: StrContainsExpression): R;

    visitVariableWithDataLocation(node: VariableWithDataLocation): R;

}

export interface CoreStringExpressionVisitor<R> extends CoreVisitor<R> {

    visitCastExpression(node: CastExpression): R;

    visitNumAsStringExpression(node: NumAsStringExpression): R;

    visitBoolAsStringExpression(node: BoolAsStringExpression): R;

    visitStringAttributeOfExpression(node: StringAttributeOfExpression): R;

    visitResourceAttributeOfExpression(node: ResourceAttributeOfExpression): R;

    visitIthLetterOfStringExpression(node: IthLetterOfStringExpression): R;

    visitIthStringItemOfExpression(node: IthStringItemOfExpression): R;

    visitJoinStringsExpression(node: JoinStringsExpression): R;

    visitStringLiteral(node: StringLiteral): R;

    visitStringVariableExpression(node: StringVariableExpression): R;

    visitVariableWithDataLocation(node: VariableWithDataLocation): R;

}

export interface CoreListExpressionVisitor<R> extends CoreVisitor<R> {

    visitListVariableExpression(node: ListVariableExpression): R;

    visitExpressionListExpression(node: ExpressionListExpression): R;

}

export interface CoreCtrlStatementnVisitor<R> extends CoreVisitor<R> {

    visitIfStatement(node: IfStatement): R;

    visitUntilStatement(node: UntilStatement): R;

    visitRepeatForeverStatement(node: RepeatForeverStatement): R;

    visitCallStatement(node: CallStatement): R;

    visitStatementList(node: StatementList): R;

}

export interface CoreNonCtrlStatementnVisitor<R> extends CoreVisitor<R> {

    visitBeginAtomicStatement(node: BeginAtomicStatement): R;

    visitEndAtomicStatement(node: EndAtomicStatement): R;

    visitAssumeStatement(node: AssumeStatement): R;

    visitDeclareStackVariableStatement(node: DeclareStackVariableStatement): R;

    visitExpressionStatement(node: ExpressionStatement): R;

    visitWaitUntilStatement(node: WaitUntilStatement): R;

    visitStopOthersInActorStatement(node: StopOthersInActorStatement): R;

    visitCreateCloneOfStatement(node: CreateCloneOfStatement): R;

    visitBroadcastMessageStatement(node: BroadcastMessageStatement): R;

    visitBroadcastAndWaitStatement(node: BroadcastAndWaitStatement): R;

    visitResetTimerStatement(node: ResetTimerStatement): R;

    visitChangeVarByStatement(node: ChangeVarByStatement): R;

    visitChangeAttributeByStatement(node: ChangeAttributeByStatement): R;

    visitEpsilonStatement(node: EpsilonStatement): R;

    visitDeleteFromAllStatement(node: DeleteAllFromStatement): R;

    visitDeleteIthFromStatement(node: DeleteIthFromStatement): R;

    visitAddElementToStatement(node: AddElementToStatement): R;

    visitInsertAtStatement(node: InsertAtStatement): R;

    visitReplaceElementAtStatement(node: ReplaceElementAtStatement): R;

    visitSetAttributeOfToStatement(node: SetAttributeOfToStatement): R;

    visitSetAttributeToStatement(node: SetAttributeToStatement): R;

    visitStoreEvalResultToVariableStatement(node: StoreEvalResultToVariableStatement): R;

    visitStopAllStatement(node: StopAllStatement): R;

    visitStopThisStatement(node: StopThisStatement): R;

    visitDeleteThisCloneStatement(node: DeleteThisCloneStatement): R;

}
