// Generated from src/bastet/syntax/parser/grammar/Leila.g4 by ANTLR 4.7.3-SNAPSHOT
// @ts-nocheck


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { IdentExpressionContext } from "./LeilaParser";
import { StrIdentExpressionContext } from "./LeilaParser";
import { FullMethodDefinitionContext } from "./LeilaParser";
import { ExternMethodDefinitionContext } from "./LeilaParser";
import { RestartScriptContext } from "./LeilaParser";
import { ListTypeContext } from "./LeilaParser";
import { ActorTypeContext } from "./LeilaParser";
import { PrimitiveContext } from "./LeilaParser";
import { StringLiteralExpressionContext } from "./LeilaParser";
import { StringVariableExpressionContext } from "./LeilaParser";
import { StringParanthExpressionContext } from "./LeilaParser";
import { StringCallStatementExpressionContext } from "./LeilaParser";
import { NumAsStringExpressionContext } from "./LeilaParser";
import { BoolAsStringExpressionContext } from "./LeilaParser";
import { StringAttributeOfExpressionContext } from "./LeilaParser";
import { JoinStringsExpressionContext } from "./LeilaParser";
import { IthLetterOfStringExpressionContext } from "./LeilaParser";
import { IthStringItemOfExpressionContext } from "./LeilaParser";
import { DefaultStringExpressionContext } from "./LeilaParser";
import { UnspecifiedStringExpressionContext } from "./LeilaParser";
import { IntegerLiteralExpressionContext } from "./LeilaParser";
import { DecimalLiteralExpressionContext } from "./LeilaParser";
import { ConcreteActorModeContext } from "./LeilaParser";
import { ActorRoleModeContext } from "./LeilaParser";
import { ExternFunctionReturnDefinitionContext } from "./LeilaParser";
import { ExternVoidReturnDefinitionContext } from "./LeilaParser";
import { QualifiedNamespaceContext } from "./LeilaParser";
import { UnqualifiedNamespaceContext } from "./LeilaParser";
import { StoreEvalResultStatementContext } from "./LeilaParser";
import { StoreCallResultStatementContext } from "./LeilaParser";
import { ListVariableExpressionContext } from "./LeilaParser";
import { ListWithElementsExpressionContext } from "./LeilaParser";
import { StopAllContext } from "./LeilaParser";
import { StopThisContext } from "./LeilaParser";
import { DeleteThisCloneContext } from "./LeilaParser";
import { ActorVariableExpressionContext } from "./LeilaParser";
import { ActorSelfExpressionContext } from "./LeilaParser";
import { LocateActorExpressionContext } from "./LeilaParser";
import { StartCloneActorExpressionContext } from "./LeilaParser";
import { UsherActorExpressionContext } from "./LeilaParser";
import { AtomicBlockContext } from "./LeilaParser";
import { NonAtomicBlocContext } from "./LeilaParser";
import { NumLiteralExpressionContext } from "./LeilaParser";
import { NumVariableExpressionContext } from "./LeilaParser";
import { NumBracketsContext } from "./LeilaParser";
import { NumCallStatementExpressionContext } from "./LeilaParser";
import { StringToFloatExpressionContext } from "./LeilaParser";
import { StringToIntExpressionContext } from "./LeilaParser";
import { BoolToIntExpressionContext } from "./LeilaParser";
import { NumToFloatExpressionContext } from "./LeilaParser";
import { NumToIntExpressionContext } from "./LeilaParser";
import { TimerExpressionContext } from "./LeilaParser";
import { LengthOfStringExpressionContext } from "./LeilaParser";
import { LengthOfListExpressionContext } from "./LeilaParser";
import { IndexOfExpressionContext } from "./LeilaParser";
import { NumMulExpressionContext } from "./LeilaParser";
import { NumDivExpressionContext } from "./LeilaParser";
import { NumModExpressionContext } from "./LeilaParser";
import { NumPlusExpressionContext } from "./LeilaParser";
import { NumMinusExpressionContext } from "./LeilaParser";
import { DefaultNumExprContext } from "./LeilaParser";
import { UnspecifiedNumExprContext } from "./LeilaParser";
import { NumberExpressionContext } from "./LeilaParser";
import { StringExpressionContext } from "./LeilaParser";
import { AtomicMethodContext } from "./LeilaParser";
import { NamedScriptIdentContext } from "./LeilaParser";
import { AnonymousScriptIdentContext } from "./LeilaParser";
import { DeleteAllFromStatementContext } from "./LeilaParser";
import { DeleteIthFromStatementContext } from "./LeilaParser";
import { AddElementToStatementContext } from "./LeilaParser";
import { InsertAtStatementContext } from "./LeilaParser";
import { ReplaceElementAtStatementContext } from "./LeilaParser";
import { NamedMessageDestinationContext } from "./LeilaParser";
import { ActorMessageDestinationContext } from "./LeilaParser";
import { FunctionReturnDefinitionContext } from "./LeilaParser";
import { VoidReturnDefinitionContext } from "./LeilaParser";
import { WaitSecsStatementContext } from "./LeilaParser";
import { WaitUntilStatementContext } from "./LeilaParser";
import { StopOthersInActorStatementContext } from "./LeilaParser";
import { CreateCloneOfStatementContext } from "./LeilaParser";
import { BroadcastMessageStatementContext } from "./LeilaParser";
import { BroadcastAndWaitStatementContext } from "./LeilaParser";
import { ResetTimerStatementContext } from "./LeilaParser";
import { EpsilonStatementContext } from "./LeilaParser";
import { AssumeStatementContext } from "./LeilaParser";
import { SetStatementContext } from "./LeilaParser";
import { DeclareVariableContext } from "./LeilaParser";
import { NeverEventContext } from "./LeilaParser";
import { BootstrapEventContext } from "./LeilaParser";
import { AfterBootstrapMonitoringEventContext } from "./LeilaParser";
import { StartupEventContext } from "./LeilaParser";
import { CloneStartEventContext } from "./LeilaParser";
import { MessageReceivedEventContext } from "./LeilaParser";
import { ConditionReachedEventContext } from "./LeilaParser";
import { AfterStatementMonitoringEventContext } from "./LeilaParser";
import { IntegerTypeContext } from "./LeilaParser";
import { FloatingPointTypeContext } from "./LeilaParser";
import { BooleanTypeContext } from "./LeilaParser";
import { StringTypeContext } from "./LeilaParser";
import { EnumTypeContext } from "./LeilaParser";
import { UserMessageContext } from "./LeilaParser";
import { SystemMessageContext } from "./LeilaParser";
import { PureElseContext } from "./LeilaParser";
import { ElseIfCaseContext } from "./LeilaParser";
import { EmptyElseCaseContext } from "./LeilaParser";
import { FlatVariableContext } from "./LeilaParser";
import { QualifiedVariableContext } from "./LeilaParser";
import { BoolLiteralExpressionContext } from "./LeilaParser";
import { BoolVariableExpressionContext } from "./LeilaParser";
import { BoolParanthExpressionContext } from "./LeilaParser";
import { BoolCallStatementExpressionContext } from "./LeilaParser";
import { NumAsBoolExpressionContext } from "./LeilaParser";
import { StringAsBoolExpressionContext } from "./LeilaParser";
import { NegatedBoolExpressionContext } from "./LeilaParser";
import { BoolAndExpressionContext } from "./LeilaParser";
import { BoolOrExpressionContext } from "./LeilaParser";
import { GreaterEqualExpressionContext } from "./LeilaParser";
import { GreaterThanExpressionContext } from "./LeilaParser";
import { LessThanExpressionContext } from "./LeilaParser";
import { LessEqualExpressionContext } from "./LeilaParser";
import { EqualsExpressionContext } from "./LeilaParser";
import { StrContainsExpressionContext } from "./LeilaParser";
import { DefaultBoolExpressionContext } from "./LeilaParser";
import { UnspecifiedBoolExpressionContext } from "./LeilaParser";
import { ControlStatementContext } from "./LeilaParser";
import { NonControlStatementContext } from "./LeilaParser";
import { StmtListStatementContext } from "./LeilaParser";
import { ImageResourceContext } from "./LeilaParser";
import { SoundResourceContext } from "./LeilaParser";
import { ProgramContext } from "./LeilaParser";
import { FileTypeContext } from "./LeilaParser";
import { ActorDefinitionListContext } from "./LeilaParser";
import { ActorDefinitionContext } from "./LeilaParser";
import { InheritsFromContext } from "./LeilaParser";
import { ActorModeContext } from "./LeilaParser";
import { ActorComponentsDefinitionContext } from "./LeilaParser";
import { ResourceContext } from "./LeilaParser";
import { ResourceTypeContext } from "./LeilaParser";
import { ResourceListContext } from "./LeilaParser";
import { DeclarationStmtContext } from "./LeilaParser";
import { DeclarationStmtListContext } from "./LeilaParser";
import { TypeContext } from "./LeilaParser";
import { PrimitiveTypeContext } from "./LeilaParser";
import { ScriptContext } from "./LeilaParser";
import { ScriptIdentContext } from "./LeilaParser";
import { ScriptListContext } from "./LeilaParser";
import { ScriptAttributeListContext } from "./LeilaParser";
import { ScriptAttributeContext } from "./LeilaParser";
import { EventContext } from "./LeilaParser";
import { MessageNamespaceContext } from "./LeilaParser";
import { MethodDefinitionListContext } from "./LeilaParser";
import { MethodDefinitionContext } from "./LeilaParser";
import { MethodResultDeclarationContext } from "./LeilaParser";
import { ExternMethodResultDeclarationContext } from "./LeilaParser";
import { MethodAttributeListContext } from "./LeilaParser";
import { MethodAttributeContext } from "./LeilaParser";
import { ParameterContext } from "./LeilaParser";
import { ParameterListContext } from "./LeilaParser";
import { ParameterListPlainContext } from "./LeilaParser";
import { StmtListContext } from "./LeilaParser";
import { BlockModeContext } from "./LeilaParser";
import { StmtListPlainContext } from "./LeilaParser";
import { ControlStmtContext } from "./LeilaParser";
import { IfStmtContext } from "./LeilaParser";
import { ElseCaseContext } from "./LeilaParser";
import { UntilStmtContext } from "./LeilaParser";
import { RepeatTimesStmtContext } from "./LeilaParser";
import { RepeatForeverStmtContext } from "./LeilaParser";
import { CallStmtContext } from "./LeilaParser";
import { ExpressionListContext } from "./LeilaParser";
import { ExpressionListPlainContext } from "./LeilaParser";
import { ExpressionStmtContext } from "./LeilaParser";
import { StmtContext } from "./LeilaParser";
import { MetaAttributeListContext } from "./LeilaParser";
import { MetaAttributeContext } from "./LeilaParser";
import { NonCtrlStmtContext } from "./LeilaParser";
import { CommonStmtContext } from "./LeilaParser";
import { ListStmtContext } from "./LeilaParser";
import { SetStmtContext } from "./LeilaParser";
import { SetStmtListContext } from "./LeilaParser";
import { TerminationStmtContext } from "./LeilaParser";
import { StringExprContext } from "./LeilaParser";
import { BoolExprContext } from "./LeilaParser";
import { NumOrStringExprContext } from "./LeilaParser";
import { NumExprContext } from "./LeilaParser";
import { ListExprContext } from "./LeilaParser";
import { ActorExprContext } from "./LeilaParser";
import { ExpressionContext } from "./LeilaParser";
import { UnspecifiedExprContext } from "./LeilaParser";
import { VariableContext } from "./LeilaParser";
import { IdentContext } from "./LeilaParser";
import { NumberContext } from "./LeilaParser";
import { ResourceLocatorContext } from "./LeilaParser";
import { MessageContext } from "./LeilaParser";
import { MessageDestinationContext } from "./LeilaParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `LeilaParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface LeilaVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `IdentExpression`
	 * labeled alternative in `LeilaParser.ident`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentExpression?: (ctx: IdentExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StrIdentExpression`
	 * labeled alternative in `LeilaParser.ident`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStrIdentExpression?: (ctx: StrIdentExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `FullMethodDefinition`
	 * labeled alternative in `LeilaParser.methodDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFullMethodDefinition?: (ctx: FullMethodDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `ExternMethodDefinition`
	 * labeled alternative in `LeilaParser.methodDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternMethodDefinition?: (ctx: ExternMethodDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `RestartScript`
	 * labeled alternative in `LeilaParser.scriptAttribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRestartScript?: (ctx: RestartScriptContext) => Result;

	/**
	 * Visit a parse tree produced by the `ListType`
	 * labeled alternative in `LeilaParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListType?: (ctx: ListTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `ActorType`
	 * labeled alternative in `LeilaParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorType?: (ctx: ActorTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `Primitive`
	 * labeled alternative in `LeilaParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimitive?: (ctx: PrimitiveContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringLiteralExpression`
	 * labeled alternative in `LeilaParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLiteralExpression?: (ctx: StringLiteralExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringVariableExpression`
	 * labeled alternative in `LeilaParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringVariableExpression?: (ctx: StringVariableExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringParanthExpression`
	 * labeled alternative in `LeilaParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringParanthExpression?: (ctx: StringParanthExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringCallStatementExpression`
	 * labeled alternative in `LeilaParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringCallStatementExpression?: (ctx: StringCallStatementExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumAsStringExpression`
	 * labeled alternative in `LeilaParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumAsStringExpression?: (ctx: NumAsStringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolAsStringExpression`
	 * labeled alternative in `LeilaParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolAsStringExpression?: (ctx: BoolAsStringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringAttributeOfExpression`
	 * labeled alternative in `LeilaParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringAttributeOfExpression?: (ctx: StringAttributeOfExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `JoinStringsExpression`
	 * labeled alternative in `LeilaParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinStringsExpression?: (ctx: JoinStringsExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `IthLetterOfStringExpression`
	 * labeled alternative in `LeilaParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIthLetterOfStringExpression?: (ctx: IthLetterOfStringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `IthStringItemOfExpression`
	 * labeled alternative in `LeilaParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIthStringItemOfExpression?: (ctx: IthStringItemOfExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `DefaultStringExpression`
	 * labeled alternative in `LeilaParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefaultStringExpression?: (ctx: DefaultStringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `UnspecifiedStringExpression`
	 * labeled alternative in `LeilaParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnspecifiedStringExpression?: (ctx: UnspecifiedStringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `IntegerLiteralExpression`
	 * labeled alternative in `LeilaParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntegerLiteralExpression?: (ctx: IntegerLiteralExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `DecimalLiteralExpression`
	 * labeled alternative in `LeilaParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecimalLiteralExpression?: (ctx: DecimalLiteralExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `ConcreteActorMode`
	 * labeled alternative in `LeilaParser.actorMode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcreteActorMode?: (ctx: ConcreteActorModeContext) => Result;

	/**
	 * Visit a parse tree produced by the `ActorRoleMode`
	 * labeled alternative in `LeilaParser.actorMode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorRoleMode?: (ctx: ActorRoleModeContext) => Result;

	/**
	 * Visit a parse tree produced by the `ExternFunctionReturnDefinition`
	 * labeled alternative in `LeilaParser.externMethodResultDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternFunctionReturnDefinition?: (ctx: ExternFunctionReturnDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `ExternVoidReturnDefinition`
	 * labeled alternative in `LeilaParser.externMethodResultDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternVoidReturnDefinition?: (ctx: ExternVoidReturnDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `QualifiedNamespace`
	 * labeled alternative in `LeilaParser.messageNamespace`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedNamespace?: (ctx: QualifiedNamespaceContext) => Result;

	/**
	 * Visit a parse tree produced by the `UnqualifiedNamespace`
	 * labeled alternative in `LeilaParser.messageNamespace`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnqualifiedNamespace?: (ctx: UnqualifiedNamespaceContext) => Result;

	/**
	 * Visit a parse tree produced by the `StoreEvalResultStatement`
	 * labeled alternative in `LeilaParser.setStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStoreEvalResultStatement?: (ctx: StoreEvalResultStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `StoreCallResultStatement`
	 * labeled alternative in `LeilaParser.setStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStoreCallResultStatement?: (ctx: StoreCallResultStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `ListVariableExpression`
	 * labeled alternative in `LeilaParser.listExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListVariableExpression?: (ctx: ListVariableExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `ListWithElementsExpression`
	 * labeled alternative in `LeilaParser.listExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListWithElementsExpression?: (ctx: ListWithElementsExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StopAll`
	 * labeled alternative in `LeilaParser.terminationStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStopAll?: (ctx: StopAllContext) => Result;

	/**
	 * Visit a parse tree produced by the `StopThis`
	 * labeled alternative in `LeilaParser.terminationStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStopThis?: (ctx: StopThisContext) => Result;

	/**
	 * Visit a parse tree produced by the `DeleteThisClone`
	 * labeled alternative in `LeilaParser.terminationStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeleteThisClone?: (ctx: DeleteThisCloneContext) => Result;

	/**
	 * Visit a parse tree produced by the `ActorVariableExpression`
	 * labeled alternative in `LeilaParser.actorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorVariableExpression?: (ctx: ActorVariableExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `ActorSelfExpression`
	 * labeled alternative in `LeilaParser.actorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorSelfExpression?: (ctx: ActorSelfExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `LocateActorExpression`
	 * labeled alternative in `LeilaParser.actorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocateActorExpression?: (ctx: LocateActorExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StartCloneActorExpression`
	 * labeled alternative in `LeilaParser.actorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStartCloneActorExpression?: (ctx: StartCloneActorExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `UsherActorExpression`
	 * labeled alternative in `LeilaParser.actorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUsherActorExpression?: (ctx: UsherActorExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `AtomicBlock`
	 * labeled alternative in `LeilaParser.blockMode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomicBlock?: (ctx: AtomicBlockContext) => Result;

	/**
	 * Visit a parse tree produced by the `NonAtomicBloc`
	 * labeled alternative in `LeilaParser.blockMode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonAtomicBloc?: (ctx: NonAtomicBlocContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumLiteralExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumLiteralExpression?: (ctx: NumLiteralExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumVariableExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumVariableExpression?: (ctx: NumVariableExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumBrackets`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumBrackets?: (ctx: NumBracketsContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumCallStatementExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumCallStatementExpression?: (ctx: NumCallStatementExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringToFloatExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringToFloatExpression?: (ctx: StringToFloatExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringToIntExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringToIntExpression?: (ctx: StringToIntExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolToIntExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolToIntExpression?: (ctx: BoolToIntExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumToFloatExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumToFloatExpression?: (ctx: NumToFloatExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumToIntExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumToIntExpression?: (ctx: NumToIntExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `TimerExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimerExpression?: (ctx: TimerExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `LengthOfStringExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLengthOfStringExpression?: (ctx: LengthOfStringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `LengthOfListExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLengthOfListExpression?: (ctx: LengthOfListExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `IndexOfExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexOfExpression?: (ctx: IndexOfExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumMulExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumMulExpression?: (ctx: NumMulExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumDivExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumDivExpression?: (ctx: NumDivExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumModExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumModExpression?: (ctx: NumModExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumPlusExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumPlusExpression?: (ctx: NumPlusExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumMinusExpression`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumMinusExpression?: (ctx: NumMinusExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `DefaultNumExpr`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefaultNumExpr?: (ctx: DefaultNumExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `UnspecifiedNumExpr`
	 * labeled alternative in `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnspecifiedNumExpr?: (ctx: UnspecifiedNumExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumberExpression`
	 * labeled alternative in `LeilaParser.numOrStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberExpression?: (ctx: NumberExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringExpression`
	 * labeled alternative in `LeilaParser.numOrStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringExpression?: (ctx: StringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `AtomicMethod`
	 * labeled alternative in `LeilaParser.methodAttribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomicMethod?: (ctx: AtomicMethodContext) => Result;

	/**
	 * Visit a parse tree produced by the `NamedScriptIdent`
	 * labeled alternative in `LeilaParser.scriptIdent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamedScriptIdent?: (ctx: NamedScriptIdentContext) => Result;

	/**
	 * Visit a parse tree produced by the `AnonymousScriptIdent`
	 * labeled alternative in `LeilaParser.scriptIdent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnonymousScriptIdent?: (ctx: AnonymousScriptIdentContext) => Result;

	/**
	 * Visit a parse tree produced by the `DeleteAllFromStatement`
	 * labeled alternative in `LeilaParser.listStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeleteAllFromStatement?: (ctx: DeleteAllFromStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `DeleteIthFromStatement`
	 * labeled alternative in `LeilaParser.listStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeleteIthFromStatement?: (ctx: DeleteIthFromStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `AddElementToStatement`
	 * labeled alternative in `LeilaParser.listStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddElementToStatement?: (ctx: AddElementToStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `InsertAtStatement`
	 * labeled alternative in `LeilaParser.listStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInsertAtStatement?: (ctx: InsertAtStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `ReplaceElementAtStatement`
	 * labeled alternative in `LeilaParser.listStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReplaceElementAtStatement?: (ctx: ReplaceElementAtStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `NamedMessageDestination`
	 * labeled alternative in `LeilaParser.messageDestination`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamedMessageDestination?: (ctx: NamedMessageDestinationContext) => Result;

	/**
	 * Visit a parse tree produced by the `ActorMessageDestination`
	 * labeled alternative in `LeilaParser.messageDestination`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorMessageDestination?: (ctx: ActorMessageDestinationContext) => Result;

	/**
	 * Visit a parse tree produced by the `FunctionReturnDefinition`
	 * labeled alternative in `LeilaParser.methodResultDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionReturnDefinition?: (ctx: FunctionReturnDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `VoidReturnDefinition`
	 * labeled alternative in `LeilaParser.methodResultDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVoidReturnDefinition?: (ctx: VoidReturnDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `WaitSecsStatement`
	 * labeled alternative in `LeilaParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWaitSecsStatement?: (ctx: WaitSecsStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `WaitUntilStatement`
	 * labeled alternative in `LeilaParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWaitUntilStatement?: (ctx: WaitUntilStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `StopOthersInActorStatement`
	 * labeled alternative in `LeilaParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStopOthersInActorStatement?: (ctx: StopOthersInActorStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `CreateCloneOfStatement`
	 * labeled alternative in `LeilaParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateCloneOfStatement?: (ctx: CreateCloneOfStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `BroadcastMessageStatement`
	 * labeled alternative in `LeilaParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBroadcastMessageStatement?: (ctx: BroadcastMessageStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `BroadcastAndWaitStatement`
	 * labeled alternative in `LeilaParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBroadcastAndWaitStatement?: (ctx: BroadcastAndWaitStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `ResetTimerStatement`
	 * labeled alternative in `LeilaParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResetTimerStatement?: (ctx: ResetTimerStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `EpsilonStatement`
	 * labeled alternative in `LeilaParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEpsilonStatement?: (ctx: EpsilonStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `AssumeStatement`
	 * labeled alternative in `LeilaParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssumeStatement?: (ctx: AssumeStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `SetStatement`
	 * labeled alternative in `LeilaParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetStatement?: (ctx: SetStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `DeclareVariable`
	 * labeled alternative in `LeilaParser.declarationStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclareVariable?: (ctx: DeclareVariableContext) => Result;

	/**
	 * Visit a parse tree produced by the `NeverEvent`
	 * labeled alternative in `LeilaParser.event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNeverEvent?: (ctx: NeverEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `BootstrapEvent`
	 * labeled alternative in `LeilaParser.event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBootstrapEvent?: (ctx: BootstrapEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `AfterBootstrapMonitoringEvent`
	 * labeled alternative in `LeilaParser.event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAfterBootstrapMonitoringEvent?: (ctx: AfterBootstrapMonitoringEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `StartupEvent`
	 * labeled alternative in `LeilaParser.event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStartupEvent?: (ctx: StartupEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `CloneStartEvent`
	 * labeled alternative in `LeilaParser.event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCloneStartEvent?: (ctx: CloneStartEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `MessageReceivedEvent`
	 * labeled alternative in `LeilaParser.event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMessageReceivedEvent?: (ctx: MessageReceivedEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `ConditionReachedEvent`
	 * labeled alternative in `LeilaParser.event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditionReachedEvent?: (ctx: ConditionReachedEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `AfterStatementMonitoringEvent`
	 * labeled alternative in `LeilaParser.event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAfterStatementMonitoringEvent?: (ctx: AfterStatementMonitoringEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `IntegerType`
	 * labeled alternative in `LeilaParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntegerType?: (ctx: IntegerTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `FloatingPointType`
	 * labeled alternative in `LeilaParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFloatingPointType?: (ctx: FloatingPointTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `BooleanType`
	 * labeled alternative in `LeilaParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanType?: (ctx: BooleanTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringType`
	 * labeled alternative in `LeilaParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringType?: (ctx: StringTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `EnumType`
	 * labeled alternative in `LeilaParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumType?: (ctx: EnumTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `UserMessage`
	 * labeled alternative in `LeilaParser.message`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUserMessage?: (ctx: UserMessageContext) => Result;

	/**
	 * Visit a parse tree produced by the `SystemMessage`
	 * labeled alternative in `LeilaParser.message`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSystemMessage?: (ctx: SystemMessageContext) => Result;

	/**
	 * Visit a parse tree produced by the `PureElse`
	 * labeled alternative in `LeilaParser.elseCase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPureElse?: (ctx: PureElseContext) => Result;

	/**
	 * Visit a parse tree produced by the `ElseIfCase`
	 * labeled alternative in `LeilaParser.elseCase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElseIfCase?: (ctx: ElseIfCaseContext) => Result;

	/**
	 * Visit a parse tree produced by the `EmptyElseCase`
	 * labeled alternative in `LeilaParser.elseCase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmptyElseCase?: (ctx: EmptyElseCaseContext) => Result;

	/**
	 * Visit a parse tree produced by the `FlatVariable`
	 * labeled alternative in `LeilaParser.variable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFlatVariable?: (ctx: FlatVariableContext) => Result;

	/**
	 * Visit a parse tree produced by the `QualifiedVariable`
	 * labeled alternative in `LeilaParser.variable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedVariable?: (ctx: QualifiedVariableContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolLiteralExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolLiteralExpression?: (ctx: BoolLiteralExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolVariableExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolVariableExpression?: (ctx: BoolVariableExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolParanthExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolParanthExpression?: (ctx: BoolParanthExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolCallStatementExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolCallStatementExpression?: (ctx: BoolCallStatementExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumAsBoolExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumAsBoolExpression?: (ctx: NumAsBoolExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringAsBoolExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringAsBoolExpression?: (ctx: StringAsBoolExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NegatedBoolExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNegatedBoolExpression?: (ctx: NegatedBoolExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolAndExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolAndExpression?: (ctx: BoolAndExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolOrExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolOrExpression?: (ctx: BoolOrExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `GreaterEqualExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGreaterEqualExpression?: (ctx: GreaterEqualExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `GreaterThanExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGreaterThanExpression?: (ctx: GreaterThanExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `LessThanExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLessThanExpression?: (ctx: LessThanExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `LessEqualExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLessEqualExpression?: (ctx: LessEqualExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `EqualsExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualsExpression?: (ctx: EqualsExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StrContainsExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStrContainsExpression?: (ctx: StrContainsExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `DefaultBoolExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefaultBoolExpression?: (ctx: DefaultBoolExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `UnspecifiedBoolExpression`
	 * labeled alternative in `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnspecifiedBoolExpression?: (ctx: UnspecifiedBoolExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `ControlStatement`
	 * labeled alternative in `LeilaParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitControlStatement?: (ctx: ControlStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `NonControlStatement`
	 * labeled alternative in `LeilaParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonControlStatement?: (ctx: NonControlStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `StmtListStatement`
	 * labeled alternative in `LeilaParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmtListStatement?: (ctx: StmtListStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `ImageResource`
	 * labeled alternative in `LeilaParser.resourceType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImageResource?: (ctx: ImageResourceContext) => Result;

	/**
	 * Visit a parse tree produced by the `SoundResource`
	 * labeled alternative in `LeilaParser.resourceType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSoundResource?: (ctx: SoundResourceContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.fileType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFileType?: (ctx: FileTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.actorDefinitionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorDefinitionList?: (ctx: ActorDefinitionListContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.actorDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorDefinition?: (ctx: ActorDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.inheritsFrom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInheritsFrom?: (ctx: InheritsFromContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.actorMode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorMode?: (ctx: ActorModeContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.actorComponentsDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorComponentsDefinition?: (ctx: ActorComponentsDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.resource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResource?: (ctx: ResourceContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.resourceType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResourceType?: (ctx: ResourceTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.resourceList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResourceList?: (ctx: ResourceListContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.declarationStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclarationStmt?: (ctx: DeclarationStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.declarationStmtList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclarationStmtList?: (ctx: DeclarationStmtListContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType?: (ctx: TypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimitiveType?: (ctx: PrimitiveTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.script`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScript?: (ctx: ScriptContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.scriptIdent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScriptIdent?: (ctx: ScriptIdentContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.scriptList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScriptList?: (ctx: ScriptListContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.scriptAttributeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScriptAttributeList?: (ctx: ScriptAttributeListContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.scriptAttribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScriptAttribute?: (ctx: ScriptAttributeContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent?: (ctx: EventContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.messageNamespace`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMessageNamespace?: (ctx: MessageNamespaceContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.methodDefinitionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodDefinitionList?: (ctx: MethodDefinitionListContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.methodDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodDefinition?: (ctx: MethodDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.methodResultDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodResultDeclaration?: (ctx: MethodResultDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.externMethodResultDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternMethodResultDeclaration?: (ctx: ExternMethodResultDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.methodAttributeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodAttributeList?: (ctx: MethodAttributeListContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.methodAttribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodAttribute?: (ctx: MethodAttributeContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.parameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter?: (ctx: ParameterContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.parameterList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameterList?: (ctx: ParameterListContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.parameterListPlain`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameterListPlain?: (ctx: ParameterListPlainContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.stmtList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmtList?: (ctx: StmtListContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.blockMode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlockMode?: (ctx: BlockModeContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.stmtListPlain`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmtListPlain?: (ctx: StmtListPlainContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.controlStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitControlStmt?: (ctx: ControlStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.ifStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfStmt?: (ctx: IfStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.elseCase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElseCase?: (ctx: ElseCaseContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.untilStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUntilStmt?: (ctx: UntilStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.repeatTimesStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRepeatTimesStmt?: (ctx: RepeatTimesStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.repeatForeverStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRepeatForeverStmt?: (ctx: RepeatForeverStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.callStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallStmt?: (ctx: CallStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.expressionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionList?: (ctx: ExpressionListContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.expressionListPlain`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionListPlain?: (ctx: ExpressionListPlainContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.expressionStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionStmt?: (ctx: ExpressionStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmt?: (ctx: StmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.metaAttributeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMetaAttributeList?: (ctx: MetaAttributeListContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.metaAttribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMetaAttribute?: (ctx: MetaAttributeContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.nonCtrlStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonCtrlStmt?: (ctx: NonCtrlStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommonStmt?: (ctx: CommonStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.listStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListStmt?: (ctx: ListStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.setStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetStmt?: (ctx: SetStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.setStmtList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetStmtList?: (ctx: SetStmtListContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.terminationStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTerminationStmt?: (ctx: TerminationStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringExpr?: (ctx: StringExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolExpr?: (ctx: BoolExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.numOrStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumOrStringExpr?: (ctx: NumOrStringExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumExpr?: (ctx: NumExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.listExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListExpr?: (ctx: ListExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.actorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorExpr?: (ctx: ActorExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.unspecifiedExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnspecifiedExpr?: (ctx: UnspecifiedExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.variable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable?: (ctx: VariableContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.ident`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdent?: (ctx: IdentContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.resourceLocator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResourceLocator?: (ctx: ResourceLocatorContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.message`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMessage?: (ctx: MessageContext) => Result;

	/**
	 * Visit a parse tree produced by `LeilaParser.messageDestination`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMessageDestination?: (ctx: MessageDestinationContext) => Result;
}

