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

import {AstNode} from "./AstNode";
import {ImplementMeForException} from "../../core/exceptions/ImplementMeException";
import {BeginAtomicStatement, EndAtomicStatement, ReturnStatement} from "./core/statements/ControlStatement";
import {CallStatement} from "./core/statements/CallStatement";
import {
    AddElementToStatement,
    DeleteAllFromStatement,
    DeleteIthFromStatement,
    InsertAtStatement,
    ReplaceElementAtStatement,
} from "./core/statements/ListStatement";
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
    StrLessThanExpression,
} from "./core/expressions/BooleanExpression";
import {AssumeStatement} from "./core/statements/AssumeStatement";
import {StringLiteral, StringVariableExpression} from "./core/expressions/StringExpression";
import {ActorVariableExpression} from "./core/expressions/ActorExpression";
import {BroadcastAndWaitStatement} from "./core/statements/BroadcastAndWaitStatement";
import {BroadcastMessageStatement} from "./core/statements/BroadcastMessageStatement";
import {CastExpression} from "./core/expressions/CastExpression";
import {CreateCloneOfStatement} from "./core/statements/CreateCloneOfStatement";
import {
    DeclareActorVariableStatement,
    DeclareStackVariableStatement,
    DeclareSystemVariableStatement,
} from "./core/statements/DeclarationStatement";
import {DeleteThisCloneStatement, StopAllStatement, StopThisStatement} from "./core/statements/TerminationStatement";
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
    NumberVariableExpression,
    PlusExpression,
    TimerExpression,
} from "./core/expressions/NumberExpression";
import {EpsilonStatement} from "./core/statements/EpsilonStatement";
import {ExpressionStatement} from "./core/statements/ExpressionStatement";
import {
    InitializeAnalysisStatement,
    SignalTargetReachedStatement,
    TerminateProgramStatement,
} from "./core/statements/InternalStatement";
import {ResetTimerStatement} from "./core/statements/ResetTimerStatement";
import {StopOthersInActorStatement} from "./core/statements/StopOthersInActorStatement";
import {StoreEvalResultToVariableStatement} from "./core/statements/SetStatement";
import {VariableWithDataLocation} from "./core/Variable";
import {WaitUntilStatement} from "./core/statements/WaitUntilStatement";
import {
    CoreBoolExpressionVisitor,
    CoreNonCtrlStatementnVisitor,
    CoreNumberExpressionVisitor,
    CoreVisitor,
} from "./CoreVisitor";
import {CorePrintVisitor} from "./CorePrintVisitor";

export enum Action {
    DEFINE = "DEFINE",
    DECLARE = "DECLARE",
    METHOD_CALL = "METHOD_CALL",
    EPSILON = "EPSILON",
    MOUSE_INPUT = "MOUSE_INPUT",
    MOUSE_DOWN = "MOUSE_DOWN",
    MOUSE_UP = "MOUSE_UP",
    KEY_PRESSED = "KEY_PRESSED",
    INITIAL_STATE = "INITIAL_STATE",
    WAIT = "WAIT",
    ENTER_ATOMIC = "ENTER_ATOMIC",
    LEAVE_ATOMIC = "LEAVE_ATOMIC",
    COLLAPSED_ATOMIC = "COLLAPSED_ATOMIC",
    REACHED_VIOLATION = "REACHED_VIOLATION",
    ANSWER = "ANSWER"
}

export class ActionWithWeight {
    constructor(public action: Action, public weight: number) {
    }

    public static readonly INITIAL_STATE = new ActionWithWeight(Action.INITIAL_STATE, 5);
    public static readonly DEFINE = new ActionWithWeight(Action.DEFINE, 1);
    public static readonly DECLARE = new ActionWithWeight(Action.DECLARE, 0);
    public static readonly METHOD_CALL = new ActionWithWeight(Action.METHOD_CALL, 2);
    public static readonly EPSILON = new ActionWithWeight(Action.EPSILON, 0);
    public static readonly ENTER_ATOMIC = new ActionWithWeight(Action.ENTER_ATOMIC, 3);
    public static readonly LEAVE_ATOMIC = new ActionWithWeight(Action.LEAVE_ATOMIC, 3);
    public static readonly REACHED_VIOLATION = new ActionWithWeight(Action.REACHED_VIOLATION, 2);

    public static isActionEpsilonLike(action: Action) {
        return !action || [
            Action.DEFINE,
            Action.DECLARE,
            Action.METHOD_CALL,
            Action.EPSILON,
            Action.ENTER_ATOMIC,
            Action.LEAVE_ATOMIC,
            Action.COLLAPSED_ATOMIC].includes(action);
    }
}

export class ErrorWitnessActionVisitor implements CoreVisitor<ActionWithWeight>, CoreBoolExpressionVisitor<ActionWithWeight>, CoreNumberExpressionVisitor<ActionWithWeight>,
CoreNonCtrlStatementnVisitor<ActionWithWeight>{

    private readonly printer = new CorePrintVisitor();

    visit(node: AstNode): ActionWithWeight {
        throw new ImplementMeForException(node.constructor.name);
    }

    visitReturnStatement(node: ReturnStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitCallStatement(node: CallStatement): ActionWithWeight {
        if (node.assignResultTo.isPresent()) {
            return ActionWithWeight.DEFINE;
        } else {
            return ActionWithWeight.METHOD_CALL;
        }
    }

    visitAddElementToStatement(node: AddElementToStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitAndExpression(node: AndExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitAssumeStatement(node: AssumeStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitBeginAtomicStatement(node: BeginAtomicStatement): ActionWithWeight {
        return ActionWithWeight.ENTER_ATOMIC;
    }

    visitBooleanLiteral(node: BooleanLiteral): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitBooleanVariableExpression(node: BooleanVariableExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitStringVariableExpression(node: StringVariableExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitActorVariableExpression(node: ActorVariableExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitBroadcastAndWaitStatement(node: BroadcastAndWaitStatement): ActionWithWeight {
        const broadcast = node.msg.accept(this.printer);

        return broadcast === '\"__BOOTSTRAP_FINISHED\"/\"SYSTEM\"' ? ActionWithWeight.INITIAL_STATE : ActionWithWeight.EPSILON;
    }

    visitBroadcastMessageStatement(node: BroadcastMessageStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitCastExpression(node: CastExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitCreateCloneOfStatement(node: CreateCloneOfStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitDeclareActorVariableStatement(node: DeclareActorVariableStatement): ActionWithWeight {
        return ActionWithWeight.DECLARE;
    }

    visitDeclareStackVariableStatement(node: DeclareStackVariableStatement): ActionWithWeight {
        return ActionWithWeight.DECLARE;
    }

    visitDeclareSystemVariableStatement(node: DeclareSystemVariableStatement): ActionWithWeight {
        return ActionWithWeight.DECLARE;
    }

    visitDeleteFromAllStatement(node: DeleteAllFromStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitDeleteIthFromStatement(node: DeleteIthFromStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitDeleteThisCloneStatement(node: DeleteThisCloneStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitDivideExpression(node: DivideExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitEndAtomicStatement(node: EndAtomicStatement): ActionWithWeight {
        return ActionWithWeight.LEAVE_ATOMIC;
    }

    visitEpsilonStatement(node: EpsilonStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitExpressionStatement(node: ExpressionStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitFloatLiteral(node: FloatLiteral): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitStringLiteral(node: StringLiteral): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitIndexOfExpression(node: IndexOfExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitInitializeAnalysisStatement(node: InitializeAnalysisStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitInsertAtStatement(node: InsertAtStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitIntegerLiteral(node: IntegerLiteral): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitLengthOListExpression(node: LengthOfListExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitLengthOfStringExpression(node: LengthOfStringExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitMinusExpression(node: MinusExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitModuloExpression(node: ModuloExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitMultiplyExpression(node: MultiplyExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitNegationExpression(node: NegationExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitNumEqualsExpression(node: NumEqualsExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitNumGreaterEqualExpression(node: NumGreaterEqualExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitNumGreaterThanExpression(node: NumGreaterThanExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitNumLessEqualExpression(node: NumLessEqualExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitNumLessThanExpression(node: NumLessThanExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitNumberVariableExpression(node: NumberVariableExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitOrExpression(node: OrExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitPlusExpression(node: PlusExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitReplaceElementAtStatement(node: ReplaceElementAtStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitResetTimerStatement(node: ResetTimerStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitSignalTargetReachedStatement(node: SignalTargetReachedStatement): ActionWithWeight {
        return ActionWithWeight.REACHED_VIOLATION;
    }

    visitStopAllStatement(node: StopAllStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitStopOthersInActorStatement(node: StopOthersInActorStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitStopThisStatement(node: StopThisStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitStoreEvalResultToVariableStatement(node: StoreEvalResultToVariableStatement): ActionWithWeight {
        return ActionWithWeight.DEFINE;
    }

    visitStrContainsExpression(node: StrContainsExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitStrEqualsExpression(node: StrEqualsExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitStrGreaterThanExpression(node: StrGreaterThanExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitStrLessThanExpression(node: StrLessThanExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitTerminateProgramStatement(node: TerminateProgramStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitTimerExpression(node: TimerExpression): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitVariableWithDataLocation(node: VariableWithDataLocation): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }

    visitWaitUntilStatement(node: WaitUntilStatement): ActionWithWeight {
        return ActionWithWeight.EPSILON;
    }
}