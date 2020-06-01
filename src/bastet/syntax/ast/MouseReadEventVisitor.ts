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
    CoreNonCtrlStatementnVisitor,
    CoreNumberExpressionVisitor,
    CoreVisitor,
} from "./CoreVisitor";
import {AstNode} from "./AstNode";
import {
    AddElementToStatement,
    DeleteAllFromStatement,
    DeleteIthFromStatement,
    InsertAtStatement,
    ReplaceElementAtStatement,
} from "./core/statements/ListStatement";
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
import {BeginAtomicStatement, EndAtomicStatement, ReturnStatement} from "./core/statements/ControlStatement";
import {
    DeclareActorVariableStatement,
    DeclareStackVariableStatement,
    DeclareSystemVariableStatement,
} from "./core/statements/DeclarationStatement";
import {ResetTimerStatement} from "./core/statements/ResetTimerStatement";
import {CreateCloneOfStatement} from "./core/statements/CreateCloneOfStatement";
import {VariableWithDataLocation} from "./core/Variable";
import {DeleteThisCloneStatement, StopAllStatement, StopThisStatement} from "./core/statements/TerminationStatement";
import {
    InitializeAnalysisStatement,
    SignalTargetReachedStatement,
    TerminateProgramStatement,
} from "./core/statements/InternalStatement";
import {StopOthersInActorStatement} from "./core/statements/StopOthersInActorStatement";
import {WaitUntilStatement} from "./core/statements/WaitUntilStatement";
import {CastExpression} from "./core/expressions/CastExpression";
import {ImplementMeForException} from "../../core/exceptions/ImplementMeException";
import {AssumeStatement} from "./core/statements/AssumeStatement";
import {EpsilonStatement} from "./core/statements/EpsilonStatement";
import {BroadcastAndWaitStatement} from "./core/statements/BroadcastAndWaitStatement";
import {StoreEvalResultToVariableStatement} from "./core/statements/SetStatement";
import {BroadcastMessageStatement} from "./core/statements/BroadcastMessageStatement";
import {ExpressionStatement} from "./core/statements/ExpressionStatement";
import {CallStatement} from "./core/statements/CallStatement";
import {CorePrintVisitor} from "./CorePrintVisitor";
import {BinaryExpression} from "./core/expressions/BinaryExpression";
import {StringLiteral, StringVariableExpression} from "./core/expressions/StringExpression";
import {ActorVariableExpression, LocateActorExpression} from "./core/expressions/ActorExpression";
import {IllegalStateException} from "../../core/exceptions/IllegalStateException";

export class MouseReadEvent {
    public readonly readXFrom: string;
    public readonly readYFrom: string;

    constructor(readXFrom: string, readYFrom: string) {
        this.readXFrom = readXFrom;
        this.readYFrom = readYFrom;
    }

    combine(other: MouseReadEvent): MouseReadEvent {
        if ((this.readYFrom !== undefined && other.readYFrom !== undefined && this.readYFrom !== other.readYFrom)
        || (this.readXFrom !== undefined && other.readXFrom !== undefined && this.readXFrom !== other.readXFrom)) {
            throw new ImplementMeForException("a binary expression using two different mouse alias variables");
        } else {
            const x = this.readXFrom !== undefined ? this.readXFrom : other.readXFrom;
            const y = this.readYFrom !== undefined ? this.readYFrom : other.readYFrom;
            return new MouseReadEvent(x, y);
        }
    }

    equals(other: MouseReadEvent): boolean {
        return this.readXFrom === other.readXFrom && this.readYFrom === other.readYFrom;
    }
}

export class MouseReadEventVisitor implements CoreVisitor<MouseReadEvent>, CoreBoolExpressionVisitor<MouseReadEvent>, CoreNumberExpressionVisitor<MouseReadEvent>,
    CoreNonCtrlStatementnVisitor<MouseReadEvent>{
    
    private readonly nothingMouseEvent = new MouseReadEvent(undefined, undefined);
    private readonly printVisitor = new CorePrintVisitor();
    
    private readonly mouseXAlias = [];
    private readonly mouseYAlias = [];

    private readonly usageToMouseXAlias = new Map<string, string>();
    private readonly usageToMouseYAlias = new Map<string, string>();

    visit(node: AstNode): MouseReadEvent {
        throw new ImplementMeForException(node.constructor.name);
    }

    visitLocateActorExpression(node: LocateActorExpression): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitReturnStatement(node: ReturnStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitCallStatement(node: CallStatement): MouseReadEvent {
        if (node.assignResultTo.isPresent()) {
            const assignResultToName = node.assignResultTo.value().accept(this.printVisitor);
            const calledMethod = node.calledMethod.text;

            // TODO It's assumed that the functions mouseX() and mouseY() have no alias function
            if (calledMethod === 'mouseX') {
                // MouseX was written to variable --> need to keep track of variable reads
                this.mouseXAlias.push(assignResultToName);
                this.usageToMouseXAlias.set(assignResultToName, assignResultToName);
            } else if (calledMethod === 'mouseY') {
                this.mouseYAlias.push(assignResultToName);
                this.usageToMouseYAlias.set(assignResultToName, assignResultToName);
            }
        }
        
        return this.nothingMouseEvent;
    }

    visitAddElementToStatement(node: AddElementToStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitAndExpression(node: AndExpression): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitAssumeStatement(node: AssumeStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitBeginAtomicStatement(node: BeginAtomicStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitBooleanLiteral(node: BooleanLiteral): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitBooleanVariableExpression(node: BooleanVariableExpression): MouseReadEvent {
        return node.variable.accept(this);
    }

    visitStringVariableExpression(node: StringVariableExpression): MouseReadEvent {
        return node.variable.accept(this);
    }

    visitActorVariableExpression(node: ActorVariableExpression): MouseReadEvent {
        return node.variable.accept(this);
    }

    visitBroadcastAndWaitStatement(node: BroadcastAndWaitStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitBroadcastMessageStatement(node: BroadcastMessageStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitCastExpression(node: CastExpression): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitCreateCloneOfStatement(node: CreateCloneOfStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitDeclareActorVariableStatement(node: DeclareActorVariableStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitDeclareStackVariableStatement(node: DeclareStackVariableStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitDeclareSystemVariableStatement(node: DeclareSystemVariableStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitDeleteFromAllStatement(node: DeleteAllFromStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitDeleteIthFromStatement(node: DeleteIthFromStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitDeleteThisCloneStatement(node: DeleteThisCloneStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitDivideExpression(node: DivideExpression): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitEndAtomicStatement(node: EndAtomicStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitEpsilonStatement(node: EpsilonStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitExpressionStatement(node: ExpressionStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitFloatLiteral(node: FloatLiteral): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitStringLiteral(node: StringLiteral): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitIndexOfExpression(node: IndexOfExpression): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitInitializeAnalysisStatement(node: InitializeAnalysisStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitInsertAtStatement(node: InsertAtStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitIntegerLiteral(node: IntegerLiteral): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitLengthOListExpression(node: LengthOfListExpression): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitLengthOfStringExpression(node: LengthOfStringExpression): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitMinusExpression(node: MinusExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitModuloExpression(node: ModuloExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitMultiplyExpression(node: MultiplyExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNegationExpression(node: NegationExpression): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitNumEqualsExpression(node: NumEqualsExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumGreaterEqualExpression(node: NumGreaterEqualExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumGreaterThanExpression(node: NumGreaterThanExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumLessEqualExpression(node: NumLessEqualExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumLessThanExpression(node: NumLessThanExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumberVariableExpression(node: NumberVariableExpression): MouseReadEvent {
        return node.variable.accept(this);
    }

    visitOrExpression(node: OrExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitPlusExpression(node: PlusExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }
    
    private visitBinaryExpression(node: BinaryExpression<any, any>): MouseReadEvent {
        const op1Event: MouseReadEvent = node.operand1.accept(this);
        const op2Event: MouseReadEvent = node.operand2.accept(this);

        return op1Event.combine(op2Event);
    }

    visitReplaceElementAtStatement(node: ReplaceElementAtStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitResetTimerStatement(node: ResetTimerStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitSignalTargetReachedStatement(node: SignalTargetReachedStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitStopAllStatement(node: StopAllStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitStopOthersInActorStatement(node: StopOthersInActorStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitStopThisStatement(node: StopThisStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitStoreEvalResultToVariableStatement(node: StoreEvalResultToVariableStatement): MouseReadEvent {
        // define asd as mouseX
        const variableName = node.variable.accept(this.printVisitor);
        const mouseEvent = node.toValue.accept(this);

        if (mouseEvent.readYFrom !== undefined) {
            this.usageToMouseYAlias.set(variableName, mouseEvent.readYFrom);
        }

        if (mouseEvent.readXFrom !== undefined) {
            this.usageToMouseXAlias.set(variableName, mouseEvent.readXFrom);
        }

        return this.nothingMouseEvent;
    }

    visitStrContainsExpression(node: StrContainsExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitStrEqualsExpression(node: StrEqualsExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitStrGreaterThanExpression(node: StrGreaterThanExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitStrLessThanExpression(node: StrLessThanExpression): MouseReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitTerminateProgramStatement(node: TerminateProgramStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitTimerExpression(node: TimerExpression): MouseReadEvent {
        return this.nothingMouseEvent;
    }

    visitVariableWithDataLocation(node: VariableWithDataLocation): MouseReadEvent {
        const variableNameParts = node.qualifiedName.split("@");

        if (variableNameParts.length > 1) {
            const variableName = node.qualifiedName;
            const script = variableNameParts[1];

            if (script === "mouseX") {
                console.log(JSON.stringify({ variableName, script }));
                this.mouseXAlias.push(variableName);
                this.usageToMouseXAlias.set(variableName, variableName);
            } else if (script === "mouseY") {
                this.mouseYAlias.push(variableName);
                this.usageToMouseYAlias.set(variableName, variableName);
            }

            return new MouseReadEvent(this.usageToMouseXAlias.get(variableName), this.usageToMouseYAlias.get(variableName));
        } else {
            throw new IllegalStateException();
        }
    }

    visitWaitUntilStatement(node: WaitUntilStatement): MouseReadEvent {
        return this.nothingMouseEvent;
    }

}