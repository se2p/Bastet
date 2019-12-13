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
    LengthOfStringExpression,
    LengthOListExpression, MinusExpression, ModuloExpression,
    MultiplyExpression,
    NumberLiteral,
    NumberVariableExpression,
    NumFunctExpression,
    PickRandomFromExpression, PlusExpression,
    RoundExpression,
    StringAsNumberExpression,
    TimerExpression
} from "./core/expressions/NumberExpression";
import {
    AndExpression,
    BooleanLiteral,
    BooleanVariableExpression,
    NegationExpression, NumEqualsExpression, NumGreaterThanExpression, NumLessThanExpression,
    OrExpression, StrContainsExpression, StrEqualsExpression, StrGreaterThanExpression, StrLessThanExpression
} from "./core/expressions/BooleanExpression";
import {
    BoolAsStringExpression, IthLetterOfStringExpression, IthStringItemOfExpression, JoinStringsExpression,
    NumAsStringExpression, ResourceAttributeOfExpression,
    StringAttributeOfExpression, StringLiteral, StringVariableExpression
} from "./core/expressions/StringExpression";
import {ExpressionListExpression, ListVariableExpression} from "./core/expressions/ListExpression";
import {
    IfStatement,
    RepeatForeverStatement,
    RepeatTimesStatement,
    UntilStatement
} from "./core/statements/ControlStatement";
import {CallStatement} from "./core/statements/CallStatement";
import {StatementList} from "./core/statements/Statement";
import {
    DeclareAttributeOfStatement,
    DeclareAttributeStatement,
    DeclareVariableStatement
} from "./core/statements/DeclarationStatement";
import {ExpressionStatement} from "./core/statements/ExpressionStatement";
import {WaitUntilStatement} from "./core/statements/WaitSecsStatement";
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
    InsertAtStatement, ReplaceElementAtStatement
} from "./core/statements/ListStatement";
import {
    SetAttributeOfToStatement,
    SetAttributeToStatement,
    SetVariableToStatement
} from "./core/statements/SetStatement";
import {DelteThisCloneStatement, StopAllStatement, StopThisStatement} from "./core/statements/TerminationStatement";

export interface BasicCoreVisitor<R> {

    visit<R>(node: AstNode): R;

}

export interface CoreNumberExpressionVisitor<R> extends BasicCoreVisitor<R>{

    visitNumberLiteral<R>(node: NumberLiteral): R;

    visitNumberVariableExpression<R>(node: NumberVariableExpression): R;

    visitStringAsNumberExpression<R>(node: StringAsNumberExpression): R;

    visitBoolAsNumberExpression<R>(node: BoolAsNumberExpression): R;

    visitTimerExpression<R>(node: TimerExpression): R;

    visitLengthOfStringExpression<R>(node: LengthOfStringExpression): R;

    visitLengthOListExpression<R>(node: LengthOListExpression): R;

    visitIndexOfExpression<R>(node: IndexOfExpression): R;

    visitPickRandomFromExpression<R>(node: PickRandomFromExpression): R;

    visitRoundExpression<R>(node: RoundExpression): R;

    visitNumFunctExpression<R>(node: NumFunctExpression): R;

    visitMultiplyExpression<R>(node: MultiplyExpression): R;

    visitDivideExpression<R>(node: DivideExpression): R;

    visitModuloExpression<R>(node: ModuloExpression): R;

    visitPlusExpression<R>(node: PlusExpression): R;

    visitMinusExpression<R>(node: MinusExpression): R;

}

export interface CoreBoolExpressionVisitor<R> extends BasicCoreVisitor<R> {

    visitAndExpression<R>(node: AndExpression): R;

    visitOrExpression<R>(node: OrExpression): R;

    visitNegationExpression<R>(node: NegationExpression): R;

    visitBooleanLiteral<R>(node: BooleanLiteral): R;

    visitBooleanVariableExpression<R>(node: BooleanVariableExpression): R;

    visitStrGreaterThanExpression<R>(node: StrGreaterThanExpression): R;

    visitStrLessThanExpression<R>(node: StrLessThanExpression): R;

    visitStrEqualsExpression<R>(node: StrEqualsExpression): R;

    visitNumGreaterThanExpression<R>(node: NumGreaterThanExpression): R;

    visitNumLessThanExpression<R>(node: NumLessThanExpression): R;

    visitNumEqualsExpression<R>(node: NumEqualsExpression): R;

    visitStrContainsExpression<R>(node: StrContainsExpression): R;

}

export interface CoreStringExpressionVisitor<R> extends BasicCoreVisitor<R> {

    visitNumAsStringExpression<R>(node: NumAsStringExpression): R;

    visitBoolAsStringExpression<R>(node: BoolAsStringExpression): R;

    visitStringAttributeOfExpression<R>(node: StringAttributeOfExpression): R;

    visitResourceAttributeOfExpression<R>(node: ResourceAttributeOfExpression): R;

    visitIthLetterOfStringExpression<R>(node: IthLetterOfStringExpression): R;

    visitIthStringItemOfExpression<R>(node: IthStringItemOfExpression): R;

    visitJoinStringsExpression<R>(node: JoinStringsExpression): R;

    visitStringLiteral<R>(node: StringLiteral): R;

    visitStringVariableExpression<R>(node: StringVariableExpression): R;

}

export interface CoreListExpressionVisitor<R> extends BasicCoreVisitor<R> {

    visitListVariableExpression<R>(node: ListVariableExpression): R;

    visitExpressionListExpression<R>(node: ExpressionListExpression): R;

}

export interface CoreCtrlStatementnVisitor<R> extends BasicCoreVisitor<R> {

    visitIfStatement<R>(node: IfStatement): R;

    visitUntilStatement<R>(node: UntilStatement): R;

    visitRepeatForeverStatement<R>(node: RepeatForeverStatement): R;

    visitRepeatTimesStatement<R>(node: RepeatTimesStatement): R;

    visitCallStatement<R>(node: CallStatement): R;

    visitStatementList<R>(node: StatementList): R;

}

export interface CoreNonCtrlStatementnVisitor<R> extends BasicCoreVisitor<R> {

    visit<R>(node: DeclareVariableStatement): R;

    visit<R>(node: DeclareAttributeStatement): R;

    visit<R>(node: DeclareAttributeOfStatement): R;

    visit<R>(node: ExpressionStatement): R;

    visit<R>(node: WaitUntilStatement): R;

    visit<R>(node: StopOthersInActorStatement): R;

    visit<R>(node: CreateCloneOfStatement): R;

    visit<R>(node: BroadcastMessageStatement): R;

    visit<R>(node: BroadcastAndWaitStatement): R;

    visit<R>(node: ResetTimerStatement): R;

    visit<R>(node: ChangeVarByStatement): R;

    visit<R>(node: ChangeAttributeByStatement): R;

    visit<R>(node: EpsilonStatement): R;

    visit<R>(node: DeleteAllFromStatement): R;

    visit<R>(node: DeleteIthFromStatement): R;

    visit<R>(node: AddElementToStatement): R;

    visit<R>(node: InsertAtStatement): R;

    visit<R>(node: ReplaceElementAtStatement): R;

    visit<R>(node: SetAttributeOfToStatement): R;

    visit<R>(node: SetAttributeToStatement): R;

    visit<R>(node: SetVariableToStatement): R;

    visit<R>(node: StopAllStatement): R;

    visit<R>(node: StopThisStatement): R;

    visit<R>(node: DelteThisCloneStatement): R;

}
