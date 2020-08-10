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

import {ImplementMeForException} from "../../core/exceptions/ImplementMeException";
import {
    CoreBoolExpressionVisitor,
    CoreNonCtrlStatementnVisitor,
    CoreNumberExpressionVisitor,
    CoreVisitor,
} from "./CoreVisitor";
import {CorePrintVisitor} from "./CorePrintVisitor";
import {AstNode} from "./AstNode";
import {ActorVariableExpression, LocateActorExpression} from "./core/expressions/ActorExpression";
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
import {BranchingAssumeStatement, StrengtheningAssumeStatement} from "./core/statements/AssumeStatement";
import {StringLiteral, StringVariableExpression} from "./core/expressions/StringExpression";
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
import {BinaryExpression} from "./core/expressions/BinaryExpression";
import {ResetTimerStatement} from "./core/statements/ResetTimerStatement";
import {StopOthersInActorStatement} from "./core/statements/StopOthersInActorStatement";
import {StoreEvalResultToVariableStatement} from "./core/statements/SetStatement";
import {VariableWithDataLocation} from "./core/Variable";
import {WaitUntilStatement} from "./core/statements/WaitUntilStatement";
import {DataLocationScoper} from "../../procedures/analyses/control/DataLocationScoping";
import {VAR_SCOPING_SPLITTER} from "../app/controlflow/DataLocation";

export class MethodValueReadEvent {
    
    constructor(public readonly readFrom: string) {
    
    }

    combine(other: MethodValueReadEvent): MethodValueReadEvent {
        if (this.readFrom !== undefined && other.readFrom !== undefined && this.readFrom !== other.readFrom) {
            throw new ImplementMeForException("a binary expression using two different mouse alias variables");
        } else {
            return new MethodValueReadEvent(this.readFrom ? this.readFrom : other.readFrom);
        }
    }
}

/**
 * A visitor for a taint analysis that keeps track of the return value of a method.
 * If a variable is assigned the return value of the method and read inside an assume statement
 * then a MethodValueReadEvent is returned.
 * The event specifies the name of the variable where the return value of the method was initially assigned to.
 */
export class MethodValueReadVisitor implements CoreVisitor<MethodValueReadEvent>, CoreBoolExpressionVisitor<MethodValueReadEvent>, CoreNumberExpressionVisitor<MethodValueReadEvent>,
    CoreNonCtrlStatementnVisitor<MethodValueReadEvent>{

    constructor(private readonly methodName: string) {
    }

    private readonly nothingReadEvent = new MethodValueReadEvent(undefined);
    private readonly printVisitor = new CorePrintVisitor();

    private readonly attributeAlias = [];

    private readonly usageToAttributeAlias = new Map<string, string>();

    visit(node: AstNode): MethodValueReadEvent {
        throw new ImplementMeForException(node.constructor.name);
    }

    visitLocateActorExpression(node: LocateActorExpression): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitReturnStatement(node: ReturnStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitCallStatement(node: CallStatement): MethodValueReadEvent {
        if (node.assignResultTo.isPresent()) {
            const assignResultToName = node.assignResultTo.value().accept(this.printVisitor);
            const calledMethod = node.calledMethod.text;

            if (calledMethod === this.methodName) {
                // Attribute written to variable --> need to keep track of its new alias
                const unwrappedVariable = DataLocationScoper.rightUnwrapScope(assignResultToName);
                // Increase the SSA index by 1 since the actual value will be saved to the variable with the next index
                const nextSSAIndex = Number(unwrappedVariable.suffix) + 1;
                const variableName = `${unwrappedVariable.prefix}${VAR_SCOPING_SPLITTER}${nextSSAIndex}`

                this.attributeAlias.push(assignResultToName);
                this.usageToAttributeAlias.set(variableName, assignResultToName);
                this.usageToAttributeAlias.set(assignResultToName, assignResultToName);
            }
        }

        return this.nothingReadEvent;
    }

    visitAddElementToStatement(node: AddElementToStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitAndExpression(node: AndExpression): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitBranchingAssumeStatement(node: BranchingAssumeStatement): MethodValueReadEvent {
        return node.condition.accept(this);
    }

    visitStrengtheningAssumeStatement(node: StrengtheningAssumeStatement): MethodValueReadEvent {
        return node.condition.accept(this);
    }

    visitBeginAtomicStatement(node: BeginAtomicStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitBooleanLiteral(node: BooleanLiteral): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitBooleanVariableExpression(node: BooleanVariableExpression): MethodValueReadEvent {
        return node.variable.accept(this);
    }

    visitStringVariableExpression(node: StringVariableExpression): MethodValueReadEvent {
        return node.variable.accept(this);
    }

    visitActorVariableExpression(node: ActorVariableExpression): MethodValueReadEvent {
        return node.variable.accept(this);
    }

    visitBroadcastAndWaitStatement(node: BroadcastAndWaitStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitBroadcastMessageStatement(node: BroadcastMessageStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitCastExpression(node: CastExpression): MethodValueReadEvent {
        return node.toConvertFrom.accept(this);
    }

    visitCreateCloneOfStatement(node: CreateCloneOfStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitDeclareActorVariableStatement(node: DeclareActorVariableStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitDeclareStackVariableStatement(node: DeclareStackVariableStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitDeclareSystemVariableStatement(node: DeclareSystemVariableStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitDeleteFromAllStatement(node: DeleteAllFromStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitDeleteIthFromStatement(node: DeleteIthFromStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitDeleteThisCloneStatement(node: DeleteThisCloneStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitDivideExpression(node: DivideExpression): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitEndAtomicStatement(node: EndAtomicStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitEpsilonStatement(node: EpsilonStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitExpressionStatement(node: ExpressionStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitFloatLiteral(node: FloatLiteral): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitStringLiteral(node: StringLiteral): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitIndexOfExpression(node: IndexOfExpression): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitInitializeAnalysisStatement(node: InitializeAnalysisStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitInsertAtStatement(node: InsertAtStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitIntegerLiteral(node: IntegerLiteral): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitLengthOListExpression(node: LengthOfListExpression): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitLengthOfStringExpression(node: LengthOfStringExpression): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitMinusExpression(node: MinusExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitModuloExpression(node: ModuloExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitMultiplyExpression(node: MultiplyExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNegationExpression(node: NegationExpression): MethodValueReadEvent {
        return node.negate.accept(this);
    }

    visitNumEqualsExpression(node: NumEqualsExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumGreaterEqualExpression(node: NumGreaterEqualExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumGreaterThanExpression(node: NumGreaterThanExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumLessEqualExpression(node: NumLessEqualExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumLessThanExpression(node: NumLessThanExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumberVariableExpression(node: NumberVariableExpression): MethodValueReadEvent {
        return node.variable.accept(this);
    }

    visitOrExpression(node: OrExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitPlusExpression(node: PlusExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    private visitBinaryExpression(node: BinaryExpression<any, any>): MethodValueReadEvent {
        const op1Event: MethodValueReadEvent = node.operand1.accept(this);
        const op2Event: MethodValueReadEvent = node.operand2.accept(this);

        return op1Event.combine(op2Event);
    }

    visitReplaceElementAtStatement(node: ReplaceElementAtStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitResetTimerStatement(node: ResetTimerStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitSignalTargetReachedStatement(node: SignalTargetReachedStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitStopAllStatement(node: StopAllStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitStopOthersInActorStatement(node: StopOthersInActorStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitStopThisStatement(node: StopThisStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitStoreEvalResultToVariableStatement(node: StoreEvalResultToVariableStatement): MethodValueReadEvent {
        // define asd as mouseX
        const variableName = node.variable.accept(this.printVisitor);
        const readEvent = node.toValue.accept(this);

        if (readEvent.readFrom !== undefined) {
            this.usageToAttributeAlias.set(variableName, this.usageToAttributeAlias.get(readEvent.readFrom));
        }

        return this.nothingReadEvent;
    }

    visitStrContainsExpression(node: StrContainsExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitStrEqualsExpression(node: StrEqualsExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitStrGreaterThanExpression(node: StrGreaterThanExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitStrLessThanExpression(node: StrLessThanExpression): MethodValueReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitTerminateProgramStatement(node: TerminateProgramStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitTimerExpression(node: TimerExpression): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

    visitVariableWithDataLocation(node: VariableWithDataLocation): MethodValueReadEvent {
        const variableName = node.qualifiedName;

        return new MethodValueReadEvent(this.usageToAttributeAlias.get(variableName));
    }

    visitWaitUntilStatement(node: WaitUntilStatement): MethodValueReadEvent {
        return this.nothingReadEvent;
    }

}