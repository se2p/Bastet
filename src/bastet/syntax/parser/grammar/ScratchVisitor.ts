// Generated from src/bastet/syntax/parser/grammar/Scratch.g4 by ANTLR 4.7.3-SNAPSHOT


import {ParseTreeVisitor} from "antlr4ts/tree/ParseTreeVisitor";

import {
	ActorComponentsDefinitionContext,
	ActorDefinitionContext,
	ActorDefinitionListContext,
	ActorExprContext,
	ActorModeContext,
	ActorRoleModeContext,
	ActorTypeContext,
	ActorVariableExpressionContext,
	AddElementToStatementContext,
	AfterBootstrapMonitoringEventContext,
	AfterStatementMonitoringEventContext,
	AssumeStatementContext,
	AtomicBlockContext,
	AtomicBlockStatementContext,
	AtomicMethodContext,
	AttributedStatementContext,
	BoolAndExpressionContext,
	BoolAsStringExpressionContext,
	BoolCallStatementExpressionContext,
	BooleanTypeContext,
	BoolExprContext,
	BoolLiteralExpressionContext,
	BoolOrExpressionContext,
	BoolParanthExpressionContext,
	BoolToIntExpressionContext,
	BoolVariableExpressionContext,
	BootstapEventContext,
	BroadcastAndWaitStatementContext,
	BroadcastMessageStatementContext,
	CallStmtContext,
	CloneStartEventContext,
	CommonStmtContext,
	ConcreteActorModeContext,
	ConditionReachedEventContext,
	ControlStatementContext,
	ControlStmtContext,
	CoreBoolExprContext,
	CoreControlStmtContext,
	CoreEventContext,
	CoreExpressionContext,
	CoreNonCtrlStmtContext,
	CoreNumExprContext,
	CoreStringExprContext,
	CreateCloneOfStatementContext,
	DecimalLiteralExpressionContext,
	DeclarationStmtContext,
	DeclarationStmtListContext,
	DeclareVariableContext,
	DefaultBoolExpressionContext,
	DefaultNumExprContext,
	DefaultStringExpressionContext,
	DeleteAllFromStatementContext,
	DeleteIthFromStatementContext,
	DeleteThisCloneContext,
	ElseCaseContext,
	ElseIfCaseContext,
	EmptyElseCaseContext,
	EnumTypeContext,
	EpsilonStatementContext,
	EqualsExpressionContext,
	EventContext,
	ExpressionContext,
	ExpressionListContext,
	ExpressionListPlainContext,
	ExpressionStmtContext,
	ExternFunctionReturnDefinitionContext,
	ExternMethodDefinitionContext,
	ExternMethodDefinitionListContext,
	ExternMethodResultDeclarationContext,
	ExternVoidReturnDefinitionContext,
	FileTypeContext,
	FlatVariableContext,
	FloatingPointTypeContext,
	FullMethodDefinitionContext,
	FunctionReturnDefinitionContext,
	GlobalNameSpaceContext,
	GreaterEqualExpressionContext,
	GreaterThanExpressionContext,
	IdentContext,
	IdentExpressionContext,
	IfStmtContext,
	ImageResourceContext,
	ImportAllActorsContext,
	ImportDefinitionContext,
	ImportDefinitionListContext,
	ImportSelectedActorContext,
	ImportSelectorContext,
	IndexOfExpressionContext,
	InheritsFromContext,
	InsertAtStatementContext,
	IntegerLiteralExpressionContext,
	IntegerTypeContext,
	IthLetterOfStringExpressionContext,
	IthStringItemOfExpressionContext,
	JoinStringsExpressionContext,
	LengthOfListExpressionContext,
	LengthOfStringExpressionContext,
	LessEqualExpressionContext,
	LessThanExpressionContext,
	ListExprContext,
	ListStmtContext,
	ListTypeContext,
	ListVariableExpressionContext,
	ListWithElementsExpressionContext,
	LocateActorExpressionContext,
	MessageContext,
	MessageNameSpaceContext,
	MessageNamespaceContext,
	MessageReceivedEventContext,
	MethodAttributeContext,
	MethodAttributeListContext,
	MethodDefinitionContext,
	MethodDefinitionListContext,
	MethodResultDeclarationContext,
	NegatedBoolExpressionContext,
	NeverEventContext,
	NonControlStatementContext,
	NonCtrlStmtContext,
	NumAsBoolExpressionContext,
	NumAsStringExpressionContext,
	NumberContext,
	NumberExpressionContext,
	NumBracketsContext,
	NumCallStatementExpressionContext,
	NumDivExpressionContext,
	NumExprContext,
	NumLiteralExpressionContext,
	NumMinusExpressionContext,
	NumModExpressionContext,
	NumMulExpressionContext,
	NumOrStringExprContext,
	NumPlusExpressionContext,
	NumToFloatExpressionContext,
	NumToIntExpressionContext,
	NumVariableExpressionContext,
	ParameterContext,
	ParameterListContext,
	ParameterListPlainContext,
	PrimitiveContext,
	PrimitiveTypeContext,
	ProgramContext,
	PureElseContext,
	QualifiedVariableContext,
	RenderedMonitoringEventContext,
	RepeatForeverStmtContext,
	RepeatTimesStmtContext,
	ReplaceElementAtStatementContext,
	ResetTimerStatementContext,
	ResourceContext,
	ResourceListContext,
	ResourceLocatorContext,
	ResourceTypeContext,
	RestartScriptContext,
	ScriptAttributeContext,
	ScriptAttributeListContext,
	ScriptContext,
	ScriptListContext,
	SetStatementContext,
	SetStmtContext,
	SetStmtListContext,
	SoundResourceContext,
	StartCloneActorExpressionContext,
	StartupEventContext,
	StmtContext,
	StmtListContext,
	StmtListPlainContext,
	StopAllContext,
	StopOthersInActorStatementContext,
	StopThisContext,
	StoreCallResultStatementContext,
	StoreEvalResultStatementContext,
	StrContainsExpressionContext,
	StrIdentExpressionContext,
	StringAsBoolExpressionContext,
	StringAttributeOfExpressionContext,
	StringCallStatementExpressionContext,
	StringExprContext,
	StringExpressionContext,
	StringLiteralExpressionContext,
	StringParanthExpressionContext,
	StringToFloatExpressionContext,
	StringToIntExpressionContext,
	StringTypeContext,
	StringVariableExpressionContext,
	SystemMessageContext,
	TerminationStmtContext,
	TimerExpressionContext,
	TypeContext,
	UnspecifiedBoolExpressionContext,
	UnspecifiedExprContext,
	UnspecifiedNumExprContext,
	UnspecifiedStringExpressionContext,
	UntilStmtContext,
	UserMessageContext,
	UsherActorExpressionContext,
	VariableContext,
	VoidReturnDefinitionContext,
	WaitSecsStatementContext,
	WaitUntilStatementContext
} from "./ScratchParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ScratchParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ScratchVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `IdentExpression`
	 * labeled alternative in `ScratchParser.ident`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentExpression?: (ctx: IdentExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StrIdentExpression`
	 * labeled alternative in `ScratchParser.ident`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStrIdentExpression?: (ctx: StrIdentExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `FullMethodDefinition`
	 * labeled alternative in `ScratchParser.methodDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFullMethodDefinition?: (ctx: FullMethodDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `RestartScript`
	 * labeled alternative in `ScratchParser.scriptAttribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRestartScript?: (ctx: RestartScriptContext) => Result;

	/**
	 * Visit a parse tree produced by the `ListType`
	 * labeled alternative in `ScratchParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListType?: (ctx: ListTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `ActorType`
	 * labeled alternative in `ScratchParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorType?: (ctx: ActorTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `Primitive`
	 * labeled alternative in `ScratchParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimitive?: (ctx: PrimitiveContext) => Result;

	/**
	 * Visit a parse tree produced by the `IntegerLiteralExpression`
	 * labeled alternative in `ScratchParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntegerLiteralExpression?: (ctx: IntegerLiteralExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `DecimalLiteralExpression`
	 * labeled alternative in `ScratchParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecimalLiteralExpression?: (ctx: DecimalLiteralExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `ConcreteActorMode`
	 * labeled alternative in `ScratchParser.actorMode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcreteActorMode?: (ctx: ConcreteActorModeContext) => Result;

	/**
	 * Visit a parse tree produced by the `ActorRoleMode`
	 * labeled alternative in `ScratchParser.actorMode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorRoleMode?: (ctx: ActorRoleModeContext) => Result;

	/**
	 * Visit a parse tree produced by the `ExternFunctionReturnDefinition`
	 * labeled alternative in `ScratchParser.externMethodResultDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternFunctionReturnDefinition?: (ctx: ExternFunctionReturnDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `ExternVoidReturnDefinition`
	 * labeled alternative in `ScratchParser.externMethodResultDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternVoidReturnDefinition?: (ctx: ExternVoidReturnDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `MessageNameSpace`
	 * labeled alternative in `ScratchParser.messageNamespace`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMessageNameSpace?: (ctx: MessageNameSpaceContext) => Result;

	/**
	 * Visit a parse tree produced by the `GlobalNameSpace`
	 * labeled alternative in `ScratchParser.messageNamespace`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGlobalNameSpace?: (ctx: GlobalNameSpaceContext) => Result;

	/**
	 * Visit a parse tree produced by the `StoreEvalResultStatement`
	 * labeled alternative in `ScratchParser.setStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStoreEvalResultStatement?: (ctx: StoreEvalResultStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `StoreCallResultStatement`
	 * labeled alternative in `ScratchParser.setStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStoreCallResultStatement?: (ctx: StoreCallResultStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `ListVariableExpression`
	 * labeled alternative in `ScratchParser.listExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListVariableExpression?: (ctx: ListVariableExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `ListWithElementsExpression`
	 * labeled alternative in `ScratchParser.listExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListWithElementsExpression?: (ctx: ListWithElementsExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `ImportSelectedActor`
	 * labeled alternative in `ScratchParser.importSelector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportSelectedActor?: (ctx: ImportSelectedActorContext) => Result;

	/**
	 * Visit a parse tree produced by the `ImportAllActors`
	 * labeled alternative in `ScratchParser.importSelector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportAllActors?: (ctx: ImportAllActorsContext) => Result;

	/**
	 * Visit a parse tree produced by the `StopAll`
	 * labeled alternative in `ScratchParser.terminationStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStopAll?: (ctx: StopAllContext) => Result;

	/**
	 * Visit a parse tree produced by the `StopThis`
	 * labeled alternative in `ScratchParser.terminationStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStopThis?: (ctx: StopThisContext) => Result;

	/**
	 * Visit a parse tree produced by the `DeleteThisClone`
	 * labeled alternative in `ScratchParser.terminationStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeleteThisClone?: (ctx: DeleteThisCloneContext) => Result;

	/**
	 * Visit a parse tree produced by the `ActorVariableExpression`
	 * labeled alternative in `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorVariableExpression?: (ctx: ActorVariableExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `LocateActorExpression`
	 * labeled alternative in `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocateActorExpression?: (ctx: LocateActorExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StartCloneActorExpression`
	 * labeled alternative in `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStartCloneActorExpression?: (ctx: StartCloneActorExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `UsherActorExpression`
	 * labeled alternative in `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUsherActorExpression?: (ctx: UsherActorExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumberExpression`
	 * labeled alternative in `ScratchParser.numOrStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberExpression?: (ctx: NumberExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringExpression`
	 * labeled alternative in `ScratchParser.numOrStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringExpression?: (ctx: StringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `AtomicMethod`
	 * labeled alternative in `ScratchParser.methodAttribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomicMethod?: (ctx: AtomicMethodContext) => Result;

	/**
	 * Visit a parse tree produced by the `DeleteAllFromStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeleteAllFromStatement?: (ctx: DeleteAllFromStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `DeleteIthFromStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeleteIthFromStatement?: (ctx: DeleteIthFromStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `AddElementToStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddElementToStatement?: (ctx: AddElementToStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `InsertAtStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInsertAtStatement?: (ctx: InsertAtStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `ReplaceElementAtStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReplaceElementAtStatement?: (ctx: ReplaceElementAtStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `NeverEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNeverEvent?: (ctx: NeverEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `BootstapEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBootstapEvent?: (ctx: BootstapEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `AfterBootstrapMonitoringEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAfterBootstrapMonitoringEvent?: (ctx: AfterBootstrapMonitoringEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `StartupEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStartupEvent?: (ctx: StartupEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `CloneStartEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCloneStartEvent?: (ctx: CloneStartEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `MessageReceivedEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMessageReceivedEvent?: (ctx: MessageReceivedEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `ConditionReachedEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditionReachedEvent?: (ctx: ConditionReachedEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `RenderedMonitoringEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRenderedMonitoringEvent?: (ctx: RenderedMonitoringEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `AfterStatementMonitoringEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAfterStatementMonitoringEvent?: (ctx: AfterStatementMonitoringEventContext) => Result;

	/**
	 * Visit a parse tree produced by the `FunctionReturnDefinition`
	 * labeled alternative in `ScratchParser.methodResultDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionReturnDefinition?: (ctx: FunctionReturnDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `VoidReturnDefinition`
	 * labeled alternative in `ScratchParser.methodResultDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVoidReturnDefinition?: (ctx: VoidReturnDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `WaitSecsStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWaitSecsStatement?: (ctx: WaitSecsStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `WaitUntilStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWaitUntilStatement?: (ctx: WaitUntilStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `StopOthersInActorStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStopOthersInActorStatement?: (ctx: StopOthersInActorStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `CreateCloneOfStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateCloneOfStatement?: (ctx: CreateCloneOfStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `BroadcastMessageStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBroadcastMessageStatement?: (ctx: BroadcastMessageStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `BroadcastAndWaitStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBroadcastAndWaitStatement?: (ctx: BroadcastAndWaitStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `ResetTimerStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResetTimerStatement?: (ctx: ResetTimerStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `EpsilonStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEpsilonStatement?: (ctx: EpsilonStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `AssumeStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssumeStatement?: (ctx: AssumeStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `SetStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetStatement?: (ctx: SetStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolLiteralExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolLiteralExpression?: (ctx: BoolLiteralExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolVariableExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolVariableExpression?: (ctx: BoolVariableExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolParanthExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolParanthExpression?: (ctx: BoolParanthExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolCallStatementExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolCallStatementExpression?: (ctx: BoolCallStatementExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumAsBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumAsBoolExpression?: (ctx: NumAsBoolExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringAsBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringAsBoolExpression?: (ctx: StringAsBoolExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NegatedBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNegatedBoolExpression?: (ctx: NegatedBoolExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolAndExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolAndExpression?: (ctx: BoolAndExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolOrExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolOrExpression?: (ctx: BoolOrExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `GreaterEqualExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGreaterEqualExpression?: (ctx: GreaterEqualExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `GreaterThanExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGreaterThanExpression?: (ctx: GreaterThanExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `LessThanExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLessThanExpression?: (ctx: LessThanExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `LessEqualExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLessEqualExpression?: (ctx: LessEqualExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `EqualsExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualsExpression?: (ctx: EqualsExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StrContainsExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStrContainsExpression?: (ctx: StrContainsExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `DefaultBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefaultBoolExpression?: (ctx: DefaultBoolExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `UnspecifiedBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnspecifiedBoolExpression?: (ctx: UnspecifiedBoolExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `DeclareVariable`
	 * labeled alternative in `ScratchParser.declarationStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclareVariable?: (ctx: DeclareVariableContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringLiteralExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLiteralExpression?: (ctx: StringLiteralExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringVariableExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringVariableExpression?: (ctx: StringVariableExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringParanthExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringParanthExpression?: (ctx: StringParanthExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringCallStatementExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringCallStatementExpression?: (ctx: StringCallStatementExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumAsStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumAsStringExpression?: (ctx: NumAsStringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolAsStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolAsStringExpression?: (ctx: BoolAsStringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringAttributeOfExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringAttributeOfExpression?: (ctx: StringAttributeOfExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `JoinStringsExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinStringsExpression?: (ctx: JoinStringsExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `IthLetterOfStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIthLetterOfStringExpression?: (ctx: IthLetterOfStringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `IthStringItemOfExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIthStringItemOfExpression?: (ctx: IthStringItemOfExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `DefaultStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefaultStringExpression?: (ctx: DefaultStringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `UnspecifiedStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnspecifiedStringExpression?: (ctx: UnspecifiedStringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `IntegerType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntegerType?: (ctx: IntegerTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `FloatingPointType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFloatingPointType?: (ctx: FloatingPointTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `BooleanType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanType?: (ctx: BooleanTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringType?: (ctx: StringTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `EnumType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumType?: (ctx: EnumTypeContext) => Result;

	/**
	 * Visit a parse tree produced by the `UserMessage`
	 * labeled alternative in `ScratchParser.message`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUserMessage?: (ctx: UserMessageContext) => Result;

	/**
	 * Visit a parse tree produced by the `SystemMessage`
	 * labeled alternative in `ScratchParser.message`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSystemMessage?: (ctx: SystemMessageContext) => Result;

	/**
	 * Visit a parse tree produced by the `PureElse`
	 * labeled alternative in `ScratchParser.elseCase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPureElse?: (ctx: PureElseContext) => Result;

	/**
	 * Visit a parse tree produced by the `ElseIfCase`
	 * labeled alternative in `ScratchParser.elseCase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElseIfCase?: (ctx: ElseIfCaseContext) => Result;

	/**
	 * Visit a parse tree produced by the `EmptyElseCase`
	 * labeled alternative in `ScratchParser.elseCase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmptyElseCase?: (ctx: EmptyElseCaseContext) => Result;

	/**
	 * Visit a parse tree produced by the `FlatVariable`
	 * labeled alternative in `ScratchParser.variable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFlatVariable?: (ctx: FlatVariableContext) => Result;

	/**
	 * Visit a parse tree produced by the `QualifiedVariable`
	 * labeled alternative in `ScratchParser.variable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedVariable?: (ctx: QualifiedVariableContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumLiteralExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumLiteralExpression?: (ctx: NumLiteralExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumVariableExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumVariableExpression?: (ctx: NumVariableExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumBrackets`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumBrackets?: (ctx: NumBracketsContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumCallStatementExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumCallStatementExpression?: (ctx: NumCallStatementExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringToFloatExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringToFloatExpression?: (ctx: StringToFloatExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringToIntExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringToIntExpression?: (ctx: StringToIntExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `BoolToIntExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolToIntExpression?: (ctx: BoolToIntExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumToFloatExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumToFloatExpression?: (ctx: NumToFloatExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumToIntExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumToIntExpression?: (ctx: NumToIntExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `TimerExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimerExpression?: (ctx: TimerExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `LengthOfStringExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLengthOfStringExpression?: (ctx: LengthOfStringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `LengthOfListExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLengthOfListExpression?: (ctx: LengthOfListExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `IndexOfExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexOfExpression?: (ctx: IndexOfExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumMulExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumMulExpression?: (ctx: NumMulExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumDivExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumDivExpression?: (ctx: NumDivExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumModExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumModExpression?: (ctx: NumModExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumPlusExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumPlusExpression?: (ctx: NumPlusExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumMinusExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumMinusExpression?: (ctx: NumMinusExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `DefaultNumExpr`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefaultNumExpr?: (ctx: DefaultNumExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `UnspecifiedNumExpr`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnspecifiedNumExpr?: (ctx: UnspecifiedNumExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ControlStatement`
	 * labeled alternative in `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitControlStatement?: (ctx: ControlStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `NonControlStatement`
	 * labeled alternative in `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonControlStatement?: (ctx: NonControlStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `AtomicBlockStatement`
	 * labeled alternative in `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomicBlockStatement?: (ctx: AtomicBlockStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `AttributedStatement`
	 * labeled alternative in `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttributedStatement?: (ctx: AttributedStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `ImageResource`
	 * labeled alternative in `ScratchParser.resourceType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImageResource?: (ctx: ImageResourceContext) => Result;

	/**
	 * Visit a parse tree produced by the `SoundResource`
	 * labeled alternative in `ScratchParser.resourceType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSoundResource?: (ctx: SoundResourceContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.fileType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFileType?: (ctx: FileTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.importDefinitionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportDefinitionList?: (ctx: ImportDefinitionListContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.importDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportDefinition?: (ctx: ImportDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.importSelector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportSelector?: (ctx: ImportSelectorContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.actorDefinitionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorDefinitionList?: (ctx: ActorDefinitionListContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.actorDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorDefinition?: (ctx: ActorDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.inheritsFrom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInheritsFrom?: (ctx: InheritsFromContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.actorMode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorMode?: (ctx: ActorModeContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.actorComponentsDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorComponentsDefinition?: (ctx: ActorComponentsDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.resource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResource?: (ctx: ResourceContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.resourceType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResourceType?: (ctx: ResourceTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.resourceList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResourceList?: (ctx: ResourceListContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.declarationStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclarationStmt?: (ctx: DeclarationStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.declarationStmtList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclarationStmtList?: (ctx: DeclarationStmtListContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType?: (ctx: TypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimitiveType?: (ctx: PrimitiveTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.script`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScript?: (ctx: ScriptContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.scriptList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScriptList?: (ctx: ScriptListContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.scriptAttributeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScriptAttributeList?: (ctx: ScriptAttributeListContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.scriptAttribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScriptAttribute?: (ctx: ScriptAttributeContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent?: (ctx: EventContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCoreEvent?: (ctx: CoreEventContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.messageNamespace`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMessageNamespace?: (ctx: MessageNamespaceContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.externMethodDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternMethodDefinition?: (ctx: ExternMethodDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.externMethodResultDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternMethodResultDeclaration?: (ctx: ExternMethodResultDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.externMethodDefinitionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternMethodDefinitionList?: (ctx: ExternMethodDefinitionListContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.methodDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodDefinition?: (ctx: MethodDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.methodResultDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodResultDeclaration?: (ctx: MethodResultDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.methodDefinitionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodDefinitionList?: (ctx: MethodDefinitionListContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.methodAttributeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodAttributeList?: (ctx: MethodAttributeListContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.methodAttribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodAttribute?: (ctx: MethodAttributeContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.parameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter?: (ctx: ParameterContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.parameterList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameterList?: (ctx: ParameterListContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.parameterListPlain`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameterListPlain?: (ctx: ParameterListPlainContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.stmtList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmtList?: (ctx: StmtListContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.atomicBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomicBlock?: (ctx: AtomicBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.stmtListPlain`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmtListPlain?: (ctx: StmtListPlainContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.controlStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitControlStmt?: (ctx: ControlStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.coreControlStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCoreControlStmt?: (ctx: CoreControlStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.ifStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfStmt?: (ctx: IfStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.elseCase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElseCase?: (ctx: ElseCaseContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.untilStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUntilStmt?: (ctx: UntilStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.repeatTimesStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRepeatTimesStmt?: (ctx: RepeatTimesStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.repeatForeverStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRepeatForeverStmt?: (ctx: RepeatForeverStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.callStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallStmt?: (ctx: CallStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.expressionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionList?: (ctx: ExpressionListContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.expressionListPlain`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionListPlain?: (ctx: ExpressionListPlainContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.expressionStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionStmt?: (ctx: ExpressionStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmt?: (ctx: StmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.nonCtrlStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonCtrlStmt?: (ctx: NonCtrlStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.coreNonCtrlStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCoreNonCtrlStmt?: (ctx: CoreNonCtrlStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommonStmt?: (ctx: CommonStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListStmt?: (ctx: ListStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.setStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetStmt?: (ctx: SetStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.setStmtList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetStmtList?: (ctx: SetStmtListContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.terminationStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTerminationStmt?: (ctx: TerminationStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringExpr?: (ctx: StringExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCoreStringExpr?: (ctx: CoreStringExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.boolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolExpr?: (ctx: BoolExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCoreBoolExpr?: (ctx: CoreBoolExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.numExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumExpr?: (ctx: NumExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.numOrStringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumOrStringExpr?: (ctx: NumOrStringExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCoreNumExpr?: (ctx: CoreNumExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.listExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListExpr?: (ctx: ListExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActorExpr?: (ctx: ActorExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.coreExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCoreExpression?: (ctx: CoreExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.unspecifiedExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnspecifiedExpr?: (ctx: UnspecifiedExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.variable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable?: (ctx: VariableContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.ident`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdent?: (ctx: IdentContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.resourceLocator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResourceLocator?: (ctx: ResourceLocatorContext) => Result;

	/**
	 * Visit a parse tree produced by `ScratchParser.message`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMessage?: (ctx: MessageContext) => Result;
}

