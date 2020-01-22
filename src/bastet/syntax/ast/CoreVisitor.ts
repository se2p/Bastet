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
    LengthOListExpression,
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
    NumGreaterThanExpression,
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
import {IfStatement, RepeatForeverStatement, UntilStatement} from "./core/statements/ControlStatement";
import {CallStatement} from "./core/statements/CallStatement";
import {StatementList} from "./core/statements/Statement";
import {
    DeclareAttributeOfStatement,
    DeclareAttributeStatement,
    DeclareVariableStatement
} from "./core/statements/DeclarationStatement";
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

export interface CoreVisitor<R> {

    visit(node: AstNode): R;

}

export interface CoreNumberExpressionVisitor<R> extends CoreVisitor<R>{

    visitNumberLiteral(node: NumberLiteral): R;

    visitNumberVariableExpression(node: NumberVariableExpression): R;

    visitStringAsNumberExpression(node: StringAsNumberExpression): R;

    visitBoolAsNumberExpression(node: BoolAsNumberExpression): R;

    visitTimerExpression(node: TimerExpression): R;

    visitLengthOfStringExpression(node: LengthOfStringExpression): R;

    visitLengthOListExpression(node: LengthOListExpression): R;

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

    visitNumEqualsExpression(node: NumEqualsExpression): R;

    visitStrContainsExpression(node: StrContainsExpression): R;

}

export interface CoreStringExpressionVisitor<R> extends CoreVisitor<R> {

    visitNumAsStringExpression(node: NumAsStringExpression): R;

    visitBoolAsStringExpression(node: BoolAsStringExpression): R;

    visitStringAttributeOfExpression(node: StringAttributeOfExpression): R;

    visitResourceAttributeOfExpression(node: ResourceAttributeOfExpression): R;

    visitIthLetterOfStringExpression(node: IthLetterOfStringExpression): R;

    visitIthStringItemOfExpression(node: IthStringItemOfExpression): R;

    visitJoinStringsExpression(node: JoinStringsExpression): R;

    visitStringLiteral(node: StringLiteral): R;

    visitStringVariableExpression(node: StringVariableExpression): R;

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

    visit(node: DeclareVariableStatement): R;

    visit(node: DeclareAttributeStatement): R;

    visit(node: DeclareAttributeOfStatement): R;

    visit(node: ExpressionStatement): R;

    visit(node: WaitUntilStatement): R;

    visit(node: StopOthersInActorStatement): R;

    visit(node: CreateCloneOfStatement): R;

    visit(node: BroadcastMessageStatement): R;

    visit(node: BroadcastAndWaitStatement): R;

    visit(node: ResetTimerStatement): R;

    visit(node: ChangeVarByStatement): R;

    visit(node: ChangeAttributeByStatement): R;

    visit(node: EpsilonStatement): R;

    visit(node: DeleteAllFromStatement): R;

    visit(node: DeleteIthFromStatement): R;

    visit(node: AddElementToStatement): R;

    visit(node: InsertAtStatement): R;

    visit(node: ReplaceElementAtStatement): R;

    visit(node: SetAttributeOfToStatement): R;

    visit(node: SetAttributeToStatement): R;

    visit(node: StoreEvalResultToVariableStatement): R;

    visit(node: StopAllStatement): R;

    visit(node: StopThisStatement): R;

    visit(node: DeleteThisCloneStatement): R;

}
