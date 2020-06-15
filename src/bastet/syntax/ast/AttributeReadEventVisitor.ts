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
import {AssumeStatement} from "./core/statements/AssumeStatement";
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
import {IllegalStateException} from "../../core/exceptions/IllegalStateException";
import {WaitUntilStatement} from "./core/statements/WaitUntilStatement";

export class AttributeReadEvent {
    
    constructor(public readonly readFrom: string) {
    
    }

    combine(other: AttributeReadEvent): AttributeReadEvent {
        if (this.readFrom !== undefined && other.readFrom !== undefined && this.readFrom !== other.readFrom) {
            throw new ImplementMeForException("a binary expression using two different mouse alias variables");
        } else {
            return new AttributeReadEvent(this.readFrom ? this.readFrom : other.readFrom);
        }
    }

    equals(other: AttributeReadEvent): boolean {
        return this.readFrom === other.readFrom;
    }
}

export class AttributeReadEventVisitor implements CoreVisitor<AttributeReadEvent>, CoreBoolExpressionVisitor<AttributeReadEvent>, CoreNumberExpressionVisitor<AttributeReadEvent>,
    CoreNonCtrlStatementnVisitor<AttributeReadEvent>{

    constructor(private readonly methodName: string) {
    }

    private readonly nothingReadEvent = new AttributeReadEvent(undefined);
    private readonly printVisitor = new CorePrintVisitor();

    private readonly attributeAlias = [];

    private readonly usageToAttributeAlias = new Map<string, string>();

    visit(node: AstNode): AttributeReadEvent {
        throw new ImplementMeForException(node.constructor.name);
    }

    visitLocateActorExpression(node: LocateActorExpression): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitReturnStatement(node: ReturnStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitCallStatement(node: CallStatement): AttributeReadEvent {
        if (node.assignResultTo.isPresent()) {
            const assignResultToName = node.assignResultTo.value().accept(this.printVisitor);
            const calledMethod = node.calledMethod.text;

            if (calledMethod === this.methodName) {
                // Attribute written to variable --> need to keep track of its new alias
                this.attributeAlias.push(assignResultToName);
                this.usageToAttributeAlias.set(assignResultToName, assignResultToName);

                console.log({alias: this.attributeAlias, usageToAlias: this.usageToAttributeAlias})
            }
        }

        return this.nothingReadEvent;
    }

    visitAddElementToStatement(node: AddElementToStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitAndExpression(node: AndExpression): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitAssumeStatement(node: AssumeStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitBeginAtomicStatement(node: BeginAtomicStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitBooleanLiteral(node: BooleanLiteral): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitBooleanVariableExpression(node: BooleanVariableExpression): AttributeReadEvent {
        return node.variable.accept(this);
    }

    visitStringVariableExpression(node: StringVariableExpression): AttributeReadEvent {
        return node.variable.accept(this);
    }

    visitActorVariableExpression(node: ActorVariableExpression): AttributeReadEvent {
        return node.variable.accept(this);
    }

    visitBroadcastAndWaitStatement(node: BroadcastAndWaitStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitBroadcastMessageStatement(node: BroadcastMessageStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitCastExpression(node: CastExpression): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitCreateCloneOfStatement(node: CreateCloneOfStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitDeclareActorVariableStatement(node: DeclareActorVariableStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitDeclareStackVariableStatement(node: DeclareStackVariableStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitDeclareSystemVariableStatement(node: DeclareSystemVariableStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitDeleteFromAllStatement(node: DeleteAllFromStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitDeleteIthFromStatement(node: DeleteIthFromStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitDeleteThisCloneStatement(node: DeleteThisCloneStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitDivideExpression(node: DivideExpression): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitEndAtomicStatement(node: EndAtomicStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitEpsilonStatement(node: EpsilonStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitExpressionStatement(node: ExpressionStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitFloatLiteral(node: FloatLiteral): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitStringLiteral(node: StringLiteral): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitIndexOfExpression(node: IndexOfExpression): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitInitializeAnalysisStatement(node: InitializeAnalysisStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitInsertAtStatement(node: InsertAtStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitIntegerLiteral(node: IntegerLiteral): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitLengthOListExpression(node: LengthOfListExpression): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitLengthOfStringExpression(node: LengthOfStringExpression): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitMinusExpression(node: MinusExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitModuloExpression(node: ModuloExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitMultiplyExpression(node: MultiplyExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNegationExpression(node: NegationExpression): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitNumEqualsExpression(node: NumEqualsExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumGreaterEqualExpression(node: NumGreaterEqualExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumGreaterThanExpression(node: NumGreaterThanExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumLessEqualExpression(node: NumLessEqualExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumLessThanExpression(node: NumLessThanExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitNumberVariableExpression(node: NumberVariableExpression): AttributeReadEvent {
        return node.variable.accept(this);
    }

    visitOrExpression(node: OrExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitPlusExpression(node: PlusExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    private visitBinaryExpression(node: BinaryExpression<any, any>): AttributeReadEvent {
        const op1Event: AttributeReadEvent = node.operand1.accept(this);
        const op2Event: AttributeReadEvent = node.operand2.accept(this);

        return op1Event.combine(op2Event);
    }

    visitReplaceElementAtStatement(node: ReplaceElementAtStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitResetTimerStatement(node: ResetTimerStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitSignalTargetReachedStatement(node: SignalTargetReachedStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitStopAllStatement(node: StopAllStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitStopOthersInActorStatement(node: StopOthersInActorStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitStopThisStatement(node: StopThisStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitStoreEvalResultToVariableStatement(node: StoreEvalResultToVariableStatement): AttributeReadEvent {
        // define asd as mouseX
        const variableName = node.variable.accept(this.printVisitor);
        const readEvent = node.toValue.accept(this);

        if (readEvent.readFrom !== undefined) {
            this.usageToAttributeAlias.set(variableName, readEvent.readFrom);
        }

        return this.nothingReadEvent;
    }

    visitStrContainsExpression(node: StrContainsExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitStrEqualsExpression(node: StrEqualsExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitStrGreaterThanExpression(node: StrGreaterThanExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitStrLessThanExpression(node: StrLessThanExpression): AttributeReadEvent {
        return this.visitBinaryExpression(node);
    }

    visitTerminateProgramStatement(node: TerminateProgramStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitTimerExpression(node: TimerExpression): AttributeReadEvent {
        return this.nothingReadEvent;
    }

    visitVariableWithDataLocation(node: VariableWithDataLocation): AttributeReadEvent {
        const variableNameParts = node.qualifiedName.split("@");

        if (variableNameParts.length > 1) {
            const variableName = node.qualifiedName;
            const script = variableNameParts[1];

            if (script === this.methodName) {
                this.attributeAlias.push(variableName);
                this.usageToAttributeAlias.set(variableName, variableName);
            }

            return new AttributeReadEvent(this.usageToAttributeAlias.get(variableName));
        } else {
            throw new IllegalStateException();
        }
    }

    visitWaitUntilStatement(node: WaitUntilStatement): AttributeReadEvent {
        return this.nothingReadEvent;
    }

}