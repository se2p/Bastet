import {
    CoreBoolExpressionVisitor,
    CoreEventVisitor,
    CoreNonCtrlStatementnVisitor,
    CoreNumberExpressionVisitor,
    CoreTypeVisitor
} from "./CoreVisitor";
import {AstNode} from "./AstNode";
import {
    AfterBootstrapMonitoringEvent,
    AfterStatementMonitoringEvent,
    BootstrapEvent,
    CloneStartEvent,
    ConditionReachedEvent,
    MessageReceivedEvent,
    NeverEvent,
    RenderedMonitoringEvent,
    SingularityEvent,
    StartupEvent
} from "./core/CoreEvent";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
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
import {CastExpression} from "./core/expressions/CastExpression";
import {VariableWithDataLocation} from "./core/Variable";
import {
    DivideExpression, FloatLiteral,
    IndexOfExpression, IntegerLiteral,
    LengthOfListExpression,
    LengthOfStringExpression,
    MinusExpression,
    ModuloExpression,
    MultiplyExpression,
    NumberLiteral,
    NumberVariableExpression,
    PlusExpression,
    TimerExpression
} from "./core/expressions/NumberExpression";
import {
    BoolAsStringExpression,
    IthLetterOfStringExpression,
    IthStringItemOfExpression,
    JoinStringsExpression,
    NumAsStringExpression,
    StringAttributeOfExpression,
    StringLiteral,
    StringVariableExpression
} from "./core/expressions/StringExpression";
import {
    ActorVariableExpression,
    LocateActorExpression,
    StartCloneActorExpression,
    UsherActorExpression
} from "./core/expressions/ActorExpression";
import {ExpressionListExpression, ListVariableExpression} from "./core/expressions/ListExpression";
import {ExpressionList} from "./core/expressions/ExpressionList";
import {CallStatement} from "./core/statements/CallStatement";
import {
    BeginAtomicStatement,
    EndAtomicStatement,
    IfStatement,
    RepeatForeverStatement, ReturnStatement,
    UntilStatement
} from "./core/statements/ControlStatement";
import {StatementList} from "./core/statements/Statement";
import {
    AddElementToStatement,
    DeleteAllFromStatement,
    DeleteIthFromStatement,
    InsertAtStatement,
    ReplaceElementAtStatement
} from "./core/statements/ListStatement";
import {AssumeStatement} from "./core/statements/AssumeStatement";
import {BroadcastAndWaitStatement} from "./core/statements/BroadcastAndWaitStatement";
import {BroadcastMessageStatement} from "./core/statements/BroadcastMessageStatement";
import {CreateCloneOfStatement} from "./core/statements/CreateCloneOfStatement";
import {
    DeclareActorVariableStatement,
    DeclareStackVariableStatement,
    DeclareSystemVariableStatement
} from "./core/statements/DeclarationStatement";
import {DeleteThisCloneStatement, StopAllStatement, StopThisStatement} from "./core/statements/TerminationStatement";
import {EpsilonStatement} from "./core/statements/EpsilonStatement";
import {ExpressionStatement} from "./core/statements/ExpressionStatement";
import {ResetTimerStatement} from "./core/statements/ResetTimerStatement";
import {
    ActorType,
    BooleanType, FloatType, IntegerType,
    ListType,
    ScratchType,
    StringEnumType,
    StringType
} from "./core/ScratchType";
import {StoreEvalResultToVariableStatement} from "./core/statements/SetStatement";
import {StopOthersInActorStatement} from "./core/statements/StopOthersInActorStatement";
import {WaitUntilStatement} from "./core/statements/WaitUntilStatement";
import {SystemMessage} from "./core/Message";
import {InitializeAnalysisStatement, SignalTargetReachedStatement} from "./core/statements/InternalStatement";
import {MethodIdentifiers} from "../app/controlflow/MethodIdentifiers";

export class CorePrintVisitor implements CoreEventVisitor<string>,
    CoreBoolExpressionVisitor<string>, CoreNumberExpressionVisitor<string>,
    CoreNonCtrlStatementnVisitor<string> {

    visit(node: AstNode): string {
        throw new ImplementMeException();
    }

    visitReturnStatement(node: ReturnStatement): string {
        return 'RETURN';
    }

    visitSignalTargetReachedStatement(node: SignalTargetReachedStatement): string {
        return `REACHED (${node.targetCharacteristics.accept(this)})`;
    }

    visitInitializeAnalysisStatement(node: InitializeAnalysisStatement): string {
        return "initialize analysis";
    }

    visitAfterBootstrapMonitoringEvent(node: AfterBootstrapMonitoringEvent): string {
        return `bootstrap finished`;
    }

    visitAfterStatementMonitoringEvent(node: AfterStatementMonitoringEvent): string {
        return `statement finished`;
    }

    visitBootstrapEvent(node: BootstrapEvent): string {
        return `bootstrap`;
    }

    visitCloneStartEvent(node: CloneStartEvent): string {
        return `started as clone`;
    }

    visitStringEnumType(node: StringEnumType): string {
        return `enum [${node.values.accept(this)}]`
    }

    visitConditionReachedEvent(node: ConditionReachedEvent): string {
        return `reached condition ${node.cond.accept(this)}`;
    }

    visitMessageReceivedEvent(node: MessageReceivedEvent): string {
        return `received message ${node.message.accept(this)} ${node.namespace.accept(this)}`;
    }

    visitNeverEvent(node: NeverEvent): string {
        return `never`;
    }

    visitRenderedMonitoringEvent(node: RenderedMonitoringEvent): string {
        return `rendered`;
    }

    visitSingularityEvent(node: SingularityEvent): string {
        return `big bang`;
    }

    visitStartupEvent(node: StartupEvent): string {
        return `startup`;
    }

    visitAndExpression(node: AndExpression): string {
        return `${node.operand1.accept(this)} and ${node.operand2.accept(this)}`;
    }

    visitBooleanLiteral(node: BooleanLiteral): string {
        return node.value ? `true` : `false`;
    }

    visitBooleanVariableExpression(node: BooleanVariableExpression): string {
        return node.variable.accept(this);
    }

    visitCastExpression(node: CastExpression): string {
        return `cast ${node.toConvertFrom.accept(this)} as ${node.castToType.accept(this)}`;
    }

    visitNegationExpression(node: NegationExpression): string {
        return `not ${node.negate.accept(this)}`;
    }

    visitNumEqualsExpression(node: NumEqualsExpression): string {
        return `${node.operand1.accept(this)} = ${node.operand2.accept(this)}`;
    }

    visitNumGreaterEqualExpression(node: NumGreaterEqualExpression): string {
        return `${node.operand1.accept(this)} > ${node.operand2.accept(this)} or ${node.operand1.accept(this)} = ${node.operand2.accept(this)}`;
    }

    visitNumGreaterThanExpression(node: NumGreaterThanExpression): string {
        return `${node.operand1.accept(this)} > ${node.operand2.accept(this)}`;
    }

    visitNumLessEqualExpression(node: NumLessEqualExpression): string {
        return `${node.operand1.accept(this)} < ${node.operand2.accept(this)} or ${node.operand1.accept(this)} = ${node.operand2.accept(this)}`;
    }

    visitNumLessThanExpression(node: NumLessThanExpression): string {
        return `${node.operand1.accept(this)} < ${node.operand2.accept(this)}`;
    }

    visitOrExpression(node: OrExpression): string {
        return `${node.operand1.accept(this)} or ${node.operand2.accept(this)}`;
    }

    visitStrContainsExpression(node: StrContainsExpression): string {
        return `${node.operand1.accept(this)} contains ${node.operand2.accept(this)}`;
    }

    visitStrEqualsExpression(node: StrEqualsExpression): string {
        return `${node.operand1.accept(this)} = ${node.operand2.accept(this)}`;
    }

    visitStrGreaterThanExpression(node: StrGreaterThanExpression): string {
        return `${node.operand1.accept(this)} > ${node.operand2.accept(this)}`;
    }

    visitStrLessThanExpression(node: StrLessThanExpression): string {
        return `${node.operand1.accept(this)} < ${node.operand2.accept(this)}`;
    }

    visitVariableWithDataLocation(node: VariableWithDataLocation): string {
        return node.qualifiedName;
    }

    visitDivideExpression(node: DivideExpression): string {
        return `${node.operand1.accept(this)} / ${node.operand2.accept(this)}`;
    }

    visitIndexOfExpression(node: IndexOfExpression): string {
        return `index of ${node.expr.accept(this)} in ${node.variable.accept(this)}`;
    }

    visitLengthOListExpression(node: LengthOfListExpression): string {
        return `length of list ${node.listVar.accept(this)}`;
    }

    visitLengthOfStringExpression(node: LengthOfStringExpression): string {
        return `length of ${node.str.accept(this)}`;
    }

    visitMinusExpression(node: MinusExpression): string {
        return `${node.operand1.accept(this)} - ${node.operand2.accept(this)}`;
    }

    visitModuloExpression(node: ModuloExpression): string {
        return `${node.operand1.accept(this)} mod ${node.operand2.accept(this)}`;
    }

    visitMultiplyExpression(node: MultiplyExpression): string {
        return `${node.operand1.accept(this)} * ${node.operand2.accept(this)}`;
    }

    visitIntegerLiteral(node: IntegerLiteral): string {
        return node.num.toString();
    }

    visitFloatLiteral(node: FloatLiteral): string {
        return node.num.toString();
    }

    visitNumberVariableExpression(node: NumberVariableExpression): string {
        return node.variable.accept(this);
    }

    visitPlusExpression(node: PlusExpression): string {
        return `(${node.operand1.accept(this)} + ${node.operand2.accept(this)})`;
    }

    visitTimerExpression(node: TimerExpression): string {
        return `timer`;
    }

    visitIthLetterOfStringExpression(node: IthLetterOfStringExpression): string {
        return `letter ${node.index.accept(this)} of ${node.strExpr.accept(this)}`;
    }

    visitIthStringItemOfExpression(node: IthStringItemOfExpression): string {
        return `item ${node.index.accept(this)} of ${node.ofVariable.accept(this)}`;
    }

    visitJoinStringsExpression(node: JoinStringsExpression): string {
        return `join ${node.operand1.accept(this)} ${node.operand2.accept(this)}`;
    }

    visitStringAttributeOfExpression(node: StringAttributeOfExpression): string {
        return `attribute ${node.attribute.accept(this)} of ${node.ofEntity.accept(this)}`;
    }

    visitStringLiteral(node: StringLiteral): string {
        return `"${node.text}"`;
    }

    visitStringVariableExpression(node: StringVariableExpression): string {
        return node.variable.accept(this);
    }

    visitActorVariableExpression(node: ActorVariableExpression): string {
        return node.variable.accept(this);
    }

    visitLocateActorExpression(node: LocateActorExpression): string {
        return `locate actor ${node.actorName.accept(this)}`;
    }

    visitStartCloneActorExpression(node: StartCloneActorExpression): string {
        return `start clone of ${node.ofActor.accept(this)}`;
    }

    visitUsherActorExpression(node: UsherActorExpression): string {
        return `start actor ${node.actorName.accept(this)} as ${node.role.accept(this)}`;
    }

    visitExpressionList(node: ExpressionList): string {
        return node.elements.map((e) => e.accept(this)).join(", ");
    }

    visitExpressionListExpression(node: ExpressionListExpression): string {
        return `[${node.elements.accept(this)}]`;
    }

    visitListVariableExpression(node: ListVariableExpression): string {
        return node.variable.accept(this);
    }

    visitCallStatement(node: CallStatement): string {
        return `${node.calledMethod.text}(${node.args.accept(this)})`;
    }

    visitIfStatement(node: IfStatement): string {
        throw new ImplementMeException();
    }

    visitRepeatForeverStatement(node: RepeatForeverStatement): string {
        throw new ImplementMeException();
    }

    visitStatementList(node: StatementList): string {
        throw new ImplementMeException();
    }

    visitUntilStatement(node: UntilStatement): string {
        throw new ImplementMeException();
    }

    visitAddElementToStatement(node: AddElementToStatement): string {
        return `add ${node.element.accept(this)} to ${node.listVariable.accept(this)}`;
    }

    visitAssumeStatement(node: AssumeStatement): string {
        return `assume ${node.condition.accept(this)}`;
    }

    visitBeginAtomicStatement(node: BeginAtomicStatement): string {
        return `enter atomic`;
    }

    visitSystemMessage(node: SystemMessage): string {
        return `${node.messageid.accept(this)}/${node.namespace.accept(this)}`;
    }

    visitBroadcastAndWaitStatement(node: BroadcastAndWaitStatement): string {
        return `broadcast ${node.msg.accept(this)} and wait`;
    }

    visitBroadcastMessageStatement(node: BroadcastMessageStatement): string {
        return `broadcast ${node.msg.accept(this)}`;
    }

    visitCreateCloneOfStatement(node: CreateCloneOfStatement): string {
        return `create clone of ${node.cloneOf.accept(this)}`;
    }

    visitDeclareStackVariableStatement(node: DeclareStackVariableStatement): string {
        return `declare ${node.variable.accept(this)} as ${node.variableType.accept(this)}`;
    }

    visitDeclareActorVariableStatement(node: DeclareActorVariableStatement): string {
        return `declare ${node.variable.accept(this)} as ${node.variableType.accept(this)}`;
    }

    visitDeclareSystemVariableStatement(node: DeclareSystemVariableStatement): string {
        return `declare ${node.variable.accept(this)} as ${node.variableType.accept(this)}`;
    }

    visitDeleteFromAllStatement(node: DeleteAllFromStatement): string {
        return `delete all from ${node.listVariable.accept(this)}`;
    }

    visitDeleteIthFromStatement(node: DeleteIthFromStatement): string {
        return `delete ${node.index.accept(this)} of ${node.listVariable.accept(this)}`;
    }

    visitDeleteThisCloneStatement(node: DeleteThisCloneStatement): string {
        return `delete this clone`;
    }

    visitEndAtomicStatement(node: EndAtomicStatement): string {
        return `leave atomic`;
    }

    visitEpsilonStatement(node: EpsilonStatement): string {
        return `epsilon`;
    }

    visitExpressionStatement(node: ExpressionStatement): string {
        return `evaluate ${node.expression}`;
    }

    visitInsertAtStatement(node: InsertAtStatement): string {
        return `insert ${node.element} at ${node.index.accept(this)} of ${node.listVariable.accept(this)}`;
    }

    visitReplaceElementAtStatement(node: ReplaceElementAtStatement): string {
        return `replace item ${node.index.accept(this)} of ${node.listVariable.accept(this)} by ${node.element.accept(this)}`;
    }

    visitResetTimerStatement(node: ResetTimerStatement): string {
        return `reset timer`;
    }

    visitStopAllStatement(node: StopAllStatement): string {
        return `stop all`;
    }

    visitStopOthersInActorStatement(node: StopOthersInActorStatement): string {
        return `stop other scripts in actor`;
    }

    visitStopThisStatement(node: StopThisStatement): string {
        return `stop this script`;
    }

    visitStoreEvalResultToVariableStatement(node: StoreEvalResultToVariableStatement): string {
        return `define ${node.variable.accept(this)} as ${node.toValue.accept(this)}`;
    }

    visitWaitUntilStatement(node: WaitUntilStatement): string {
        return `wait until ${node.cond.accept(this)}`;
    }

    visitBooleanType(type: BooleanType): string {
        return `boolean`;
    }

    visitListType(type: ListType): string {
        return `list of ${type.elementType.accept(this)}`;
    }

    visitIntegerType(type: IntegerType): string {
        return `integer`;
    }

    visitFloatType(type: FloatType): string {
        return `float`;
    }

    visitStringType(type: StringType): string {
        return `string`;
    }

    visitActorType(type: ActorType): string {
        return 'actor';
    }

}