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
    InsertAtStatement, ReplaceElementAtStatement,
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
    StrGreaterThanExpression, StrLessThanExpression,
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
    NumberVariableExpression, PlusExpression, TimerExpression,
} from "./core/expressions/NumberExpression";
import {EpsilonStatement} from "./core/statements/EpsilonStatement";
import {ExpressionStatement} from "./core/statements/ExpressionStatement";
import {
    InitializeAnalysisStatement,
    SignalTargetReachedStatement,
    TerminateProgramStatement,
} from "./core/statements/InternalStatement";
import {BinaryExpression} from "./core/expressions/BinaryExpression";
import {ResetTimerStatement} from "./core/statements/ResetTimerStatement";
import {StopOthersInActorStatement} from "./core/statements/StopOthersInActorStatement";
import {StoreEvalResultToVariableStatement} from "./core/statements/SetStatement";
import {VariableWithDataLocation} from "./core/Variable";
import {WaitUntilStatement} from "./core/statements/WaitUntilStatement";
import {MouseReadEvent} from "./MouseReadEventVisitor";
import {
    CoreBoolExpressionVisitor,
    CoreNonCtrlStatementnVisitor,
    CoreNumberExpressionVisitor,
    CoreVisitor,
} from "./CoreVisitor";
import {MethodIdentifiers} from "../app/controlflow/MethodIdentifiers";
import {CorePrintVisitor} from "./CorePrintVisitor";

export enum Action {
    DEFINE = "DEFINE",
    DECLARE = "DECLARE",
    METHOD_CALL = "METHOD_CALL",
    EPSILON = "EPSILON",
    MOUSE_INPUT = "MOUSE_INPUT",
    INITIAL_STATE = "INITIAL_STATE",
    WAIT = "WAIT"
}

export class ActionWithArgs {
    args: {[key: string]: any};
    
    constructor(public action: Action) {
    }
    
    public static readonly DEFINE = new ActionWithArgs(Action.DEFINE);
    public static readonly DECLARE = new ActionWithArgs(Action.DECLARE);
    public static readonly METHOD_CALL = new ActionWithArgs(Action.METHOD_CALL);
    public static readonly EPSILON = new ActionWithArgs(Action.EPSILON);
    public static readonly MOUSE_INPUT = new ActionWithArgs(Action.MOUSE_INPUT);
    public static readonly INITIAL_STATE = new ActionWithArgs(Action.INITIAL_STATE);
}

export class WaitActionWithArgs extends ActionWithArgs {
    args: {
        unit: 'seconds'|'millis',
        amount: number
    }

    constructor(unit: 'seconds'|'millis', amount: number) {
        super(Action.WAIT);
        this.args = {unit, amount};
    }
}

export class ErrorWitnessActionVisitor implements CoreVisitor<ActionWithArgs>, CoreBoolExpressionVisitor<ActionWithArgs>, CoreNumberExpressionVisitor<ActionWithArgs>,
CoreNonCtrlStatementnVisitor<ActionWithArgs>{

    private readonly printer = new CorePrintVisitor();

    visit(node: AstNode): ActionWithArgs {
        throw new ImplementMeForException(node.constructor.name);
    }

    visitReturnStatement(node: ReturnStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitCallStatement(node: CallStatement): ActionWithArgs {
        if (node.assignResultTo.isPresent()) {
            return ActionWithArgs.DEFINE;
        } else {
            const methodName = node.calledMethod.text;
            const arg = node.args.accept(this.printer);

            switch (methodName) {
                case MethodIdentifiers._RUNTIME_waitSeconds: return new WaitActionWithArgs('seconds', Number(arg));
                case MethodIdentifiers._RUNTIME_waitMillis: return new WaitActionWithArgs('millis', Number(arg));
                default: return ActionWithArgs.METHOD_CALL;
            }
        }
    }

    visitAddElementToStatement(node: AddElementToStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitAndExpression(node: AndExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitAssumeStatement(node: AssumeStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitBeginAtomicStatement(node: BeginAtomicStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitBooleanLiteral(node: BooleanLiteral): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitBooleanVariableExpression(node: BooleanVariableExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitStringVariableExpression(node: StringVariableExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitActorVariableExpression(node: ActorVariableExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitBroadcastAndWaitStatement(node: BroadcastAndWaitStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitBroadcastMessageStatement(node: BroadcastMessageStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitCastExpression(node: CastExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitCreateCloneOfStatement(node: CreateCloneOfStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitDeclareActorVariableStatement(node: DeclareActorVariableStatement): ActionWithArgs {
        return ActionWithArgs.DECLARE;
    }

    visitDeclareStackVariableStatement(node: DeclareStackVariableStatement): ActionWithArgs {
        return ActionWithArgs.DECLARE;
    }

    visitDeclareSystemVariableStatement(node: DeclareSystemVariableStatement): ActionWithArgs {
        return ActionWithArgs.DECLARE;
    }

    visitDeleteFromAllStatement(node: DeleteAllFromStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitDeleteIthFromStatement(node: DeleteIthFromStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitDeleteThisCloneStatement(node: DeleteThisCloneStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitDivideExpression(node: DivideExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitEndAtomicStatement(node: EndAtomicStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitEpsilonStatement(node: EpsilonStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitExpressionStatement(node: ExpressionStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitFloatLiteral(node: FloatLiteral): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitStringLiteral(node: StringLiteral): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitIndexOfExpression(node: IndexOfExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitInitializeAnalysisStatement(node: InitializeAnalysisStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitInsertAtStatement(node: InsertAtStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitIntegerLiteral(node: IntegerLiteral): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitLengthOListExpression(node: LengthOfListExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitLengthOfStringExpression(node: LengthOfStringExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitMinusExpression(node: MinusExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitModuloExpression(node: ModuloExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitMultiplyExpression(node: MultiplyExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitNegationExpression(node: NegationExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitNumEqualsExpression(node: NumEqualsExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitNumGreaterEqualExpression(node: NumGreaterEqualExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitNumGreaterThanExpression(node: NumGreaterThanExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitNumLessEqualExpression(node: NumLessEqualExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitNumLessThanExpression(node: NumLessThanExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitNumberVariableExpression(node: NumberVariableExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitOrExpression(node: OrExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitPlusExpression(node: PlusExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitReplaceElementAtStatement(node: ReplaceElementAtStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitResetTimerStatement(node: ResetTimerStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitSignalTargetReachedStatement(node: SignalTargetReachedStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitStopAllStatement(node: StopAllStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitStopOthersInActorStatement(node: StopOthersInActorStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitStopThisStatement(node: StopThisStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitStoreEvalResultToVariableStatement(node: StoreEvalResultToVariableStatement): ActionWithArgs {
        return ActionWithArgs.DEFINE;
    }

    visitStrContainsExpression(node: StrContainsExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitStrEqualsExpression(node: StrEqualsExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitStrGreaterThanExpression(node: StrGreaterThanExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitStrLessThanExpression(node: StrLessThanExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitTerminateProgramStatement(node: TerminateProgramStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitTimerExpression(node: TimerExpression): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitVariableWithDataLocation(node: VariableWithDataLocation): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }

    visitWaitUntilStatement(node: WaitUntilStatement): ActionWithArgs {
        return ActionWithArgs.EPSILON;
    }
}