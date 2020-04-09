// Generated from src/bastet/syntax/parser/grammar/Scratch.g4 by ANTLR 4.7.3-SNAPSHOT


import {ParseTreeListener} from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `ScratchParser`.
 */
export interface ScratchListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `IdentExpression`
	 * labeled alternative in `ScratchParser.ident`.
	 * @param ctx the parse tree
	 */
	enterIdentExpression?: (ctx: IdentExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `IdentExpression`
	 * labeled alternative in `ScratchParser.ident`.
	 * @param ctx the parse tree
	 */
	exitIdentExpression?: (ctx: IdentExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `StrIdentExpression`
	 * labeled alternative in `ScratchParser.ident`.
	 * @param ctx the parse tree
	 */
	enterStrIdentExpression?: (ctx: StrIdentExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `StrIdentExpression`
	 * labeled alternative in `ScratchParser.ident`.
	 * @param ctx the parse tree
	 */
	exitStrIdentExpression?: (ctx: StrIdentExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `FullMethodDefinition`
	 * labeled alternative in `ScratchParser.methodDefinition`.
	 * @param ctx the parse tree
	 */
	enterFullMethodDefinition?: (ctx: FullMethodDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by the `FullMethodDefinition`
	 * labeled alternative in `ScratchParser.methodDefinition`.
	 * @param ctx the parse tree
	 */
	exitFullMethodDefinition?: (ctx: FullMethodDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by the `RestartScript`
	 * labeled alternative in `ScratchParser.scriptAttribute`.
	 * @param ctx the parse tree
	 */
	enterRestartScript?: (ctx: RestartScriptContext) => void;
	/**
	 * Exit a parse tree produced by the `RestartScript`
	 * labeled alternative in `ScratchParser.scriptAttribute`.
	 * @param ctx the parse tree
	 */
	exitRestartScript?: (ctx: RestartScriptContext) => void;

	/**
	 * Enter a parse tree produced by the `ListType`
	 * labeled alternative in `ScratchParser.type`.
	 * @param ctx the parse tree
	 */
	enterListType?: (ctx: ListTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `ListType`
	 * labeled alternative in `ScratchParser.type`.
	 * @param ctx the parse tree
	 */
	exitListType?: (ctx: ListTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `ActorType`
	 * labeled alternative in `ScratchParser.type`.
	 * @param ctx the parse tree
	 */
	enterActorType?: (ctx: ActorTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `ActorType`
	 * labeled alternative in `ScratchParser.type`.
	 * @param ctx the parse tree
	 */
	exitActorType?: (ctx: ActorTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `Primitive`
	 * labeled alternative in `ScratchParser.type`.
	 * @param ctx the parse tree
	 */
	enterPrimitive?: (ctx: PrimitiveContext) => void;
	/**
	 * Exit a parse tree produced by the `Primitive`
	 * labeled alternative in `ScratchParser.type`.
	 * @param ctx the parse tree
	 */
	exitPrimitive?: (ctx: PrimitiveContext) => void;

	/**
	 * Enter a parse tree produced by the `IntegerLiteralExpression`
	 * labeled alternative in `ScratchParser.number`.
	 * @param ctx the parse tree
	 */
	enterIntegerLiteralExpression?: (ctx: IntegerLiteralExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `IntegerLiteralExpression`
	 * labeled alternative in `ScratchParser.number`.
	 * @param ctx the parse tree
	 */
	exitIntegerLiteralExpression?: (ctx: IntegerLiteralExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `DecimalLiteralExpression`
	 * labeled alternative in `ScratchParser.number`.
	 * @param ctx the parse tree
	 */
	enterDecimalLiteralExpression?: (ctx: DecimalLiteralExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `DecimalLiteralExpression`
	 * labeled alternative in `ScratchParser.number`.
	 * @param ctx the parse tree
	 */
	exitDecimalLiteralExpression?: (ctx: DecimalLiteralExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `ConcreteActorMode`
	 * labeled alternative in `ScratchParser.actorMode`.
	 * @param ctx the parse tree
	 */
	enterConcreteActorMode?: (ctx: ConcreteActorModeContext) => void;
	/**
	 * Exit a parse tree produced by the `ConcreteActorMode`
	 * labeled alternative in `ScratchParser.actorMode`.
	 * @param ctx the parse tree
	 */
	exitConcreteActorMode?: (ctx: ConcreteActorModeContext) => void;

	/**
	 * Enter a parse tree produced by the `ActorRoleMode`
	 * labeled alternative in `ScratchParser.actorMode`.
	 * @param ctx the parse tree
	 */
	enterActorRoleMode?: (ctx: ActorRoleModeContext) => void;
	/**
	 * Exit a parse tree produced by the `ActorRoleMode`
	 * labeled alternative in `ScratchParser.actorMode`.
	 * @param ctx the parse tree
	 */
	exitActorRoleMode?: (ctx: ActorRoleModeContext) => void;

	/**
	 * Enter a parse tree produced by the `ExternFunctionReturnDefinition`
	 * labeled alternative in `ScratchParser.externMethodResultDeclaration`.
	 * @param ctx the parse tree
	 */
	enterExternFunctionReturnDefinition?: (ctx: ExternFunctionReturnDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by the `ExternFunctionReturnDefinition`
	 * labeled alternative in `ScratchParser.externMethodResultDeclaration`.
	 * @param ctx the parse tree
	 */
	exitExternFunctionReturnDefinition?: (ctx: ExternFunctionReturnDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by the `ExternVoidReturnDefinition`
	 * labeled alternative in `ScratchParser.externMethodResultDeclaration`.
	 * @param ctx the parse tree
	 */
	enterExternVoidReturnDefinition?: (ctx: ExternVoidReturnDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by the `ExternVoidReturnDefinition`
	 * labeled alternative in `ScratchParser.externMethodResultDeclaration`.
	 * @param ctx the parse tree
	 */
	exitExternVoidReturnDefinition?: (ctx: ExternVoidReturnDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by the `MessageNameSpace`
	 * labeled alternative in `ScratchParser.messageNamespace`.
	 * @param ctx the parse tree
	 */
	enterMessageNameSpace?: (ctx: MessageNameSpaceContext) => void;
	/**
	 * Exit a parse tree produced by the `MessageNameSpace`
	 * labeled alternative in `ScratchParser.messageNamespace`.
	 * @param ctx the parse tree
	 */
	exitMessageNameSpace?: (ctx: MessageNameSpaceContext) => void;

	/**
	 * Enter a parse tree produced by the `GlobalNameSpace`
	 * labeled alternative in `ScratchParser.messageNamespace`.
	 * @param ctx the parse tree
	 */
	enterGlobalNameSpace?: (ctx: GlobalNameSpaceContext) => void;
	/**
	 * Exit a parse tree produced by the `GlobalNameSpace`
	 * labeled alternative in `ScratchParser.messageNamespace`.
	 * @param ctx the parse tree
	 */
	exitGlobalNameSpace?: (ctx: GlobalNameSpaceContext) => void;

	/**
	 * Enter a parse tree produced by the `StoreEvalResultStatement`
	 * labeled alternative in `ScratchParser.setStmt`.
	 * @param ctx the parse tree
	 */
	enterStoreEvalResultStatement?: (ctx: StoreEvalResultStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `StoreEvalResultStatement`
	 * labeled alternative in `ScratchParser.setStmt`.
	 * @param ctx the parse tree
	 */
	exitStoreEvalResultStatement?: (ctx: StoreEvalResultStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `StoreCallResultStatement`
	 * labeled alternative in `ScratchParser.setStmt`.
	 * @param ctx the parse tree
	 */
	enterStoreCallResultStatement?: (ctx: StoreCallResultStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `StoreCallResultStatement`
	 * labeled alternative in `ScratchParser.setStmt`.
	 * @param ctx the parse tree
	 */
	exitStoreCallResultStatement?: (ctx: StoreCallResultStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `ListVariableExpression`
	 * labeled alternative in `ScratchParser.listExpr`.
	 * @param ctx the parse tree
	 */
	enterListVariableExpression?: (ctx: ListVariableExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ListVariableExpression`
	 * labeled alternative in `ScratchParser.listExpr`.
	 * @param ctx the parse tree
	 */
	exitListVariableExpression?: (ctx: ListVariableExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `ListWithElementsExpression`
	 * labeled alternative in `ScratchParser.listExpr`.
	 * @param ctx the parse tree
	 */
	enterListWithElementsExpression?: (ctx: ListWithElementsExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ListWithElementsExpression`
	 * labeled alternative in `ScratchParser.listExpr`.
	 * @param ctx the parse tree
	 */
	exitListWithElementsExpression?: (ctx: ListWithElementsExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `ImportSelectedActor`
	 * labeled alternative in `ScratchParser.importSelector`.
	 * @param ctx the parse tree
	 */
	enterImportSelectedActor?: (ctx: ImportSelectedActorContext) => void;
	/**
	 * Exit a parse tree produced by the `ImportSelectedActor`
	 * labeled alternative in `ScratchParser.importSelector`.
	 * @param ctx the parse tree
	 */
	exitImportSelectedActor?: (ctx: ImportSelectedActorContext) => void;

	/**
	 * Enter a parse tree produced by the `ImportAllActors`
	 * labeled alternative in `ScratchParser.importSelector`.
	 * @param ctx the parse tree
	 */
	enterImportAllActors?: (ctx: ImportAllActorsContext) => void;
	/**
	 * Exit a parse tree produced by the `ImportAllActors`
	 * labeled alternative in `ScratchParser.importSelector`.
	 * @param ctx the parse tree
	 */
	exitImportAllActors?: (ctx: ImportAllActorsContext) => void;

	/**
	 * Enter a parse tree produced by the `StopAll`
	 * labeled alternative in `ScratchParser.terminationStmt`.
	 * @param ctx the parse tree
	 */
	enterStopAll?: (ctx: StopAllContext) => void;
	/**
	 * Exit a parse tree produced by the `StopAll`
	 * labeled alternative in `ScratchParser.terminationStmt`.
	 * @param ctx the parse tree
	 */
	exitStopAll?: (ctx: StopAllContext) => void;

	/**
	 * Enter a parse tree produced by the `StopThis`
	 * labeled alternative in `ScratchParser.terminationStmt`.
	 * @param ctx the parse tree
	 */
	enterStopThis?: (ctx: StopThisContext) => void;
	/**
	 * Exit a parse tree produced by the `StopThis`
	 * labeled alternative in `ScratchParser.terminationStmt`.
	 * @param ctx the parse tree
	 */
	exitStopThis?: (ctx: StopThisContext) => void;

	/**
	 * Enter a parse tree produced by the `DeleteThisClone`
	 * labeled alternative in `ScratchParser.terminationStmt`.
	 * @param ctx the parse tree
	 */
	enterDeleteThisClone?: (ctx: DeleteThisCloneContext) => void;
	/**
	 * Exit a parse tree produced by the `DeleteThisClone`
	 * labeled alternative in `ScratchParser.terminationStmt`.
	 * @param ctx the parse tree
	 */
	exitDeleteThisClone?: (ctx: DeleteThisCloneContext) => void;

	/**
	 * Enter a parse tree produced by the `ActorVariableExpression`
	 * labeled alternative in `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 */
	enterActorVariableExpression?: (ctx: ActorVariableExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ActorVariableExpression`
	 * labeled alternative in `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 */
	exitActorVariableExpression?: (ctx: ActorVariableExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `LocateActorExpression`
	 * labeled alternative in `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 */
	enterLocateActorExpression?: (ctx: LocateActorExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `LocateActorExpression`
	 * labeled alternative in `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 */
	exitLocateActorExpression?: (ctx: LocateActorExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `StartCloneActorExpression`
	 * labeled alternative in `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 */
	enterStartCloneActorExpression?: (ctx: StartCloneActorExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `StartCloneActorExpression`
	 * labeled alternative in `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 */
	exitStartCloneActorExpression?: (ctx: StartCloneActorExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `UsherActorExpression`
	 * labeled alternative in `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 */
	enterUsherActorExpression?: (ctx: UsherActorExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `UsherActorExpression`
	 * labeled alternative in `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 */
	exitUsherActorExpression?: (ctx: UsherActorExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `NumberExpression`
	 * labeled alternative in `ScratchParser.numOrStringExpr`.
	 * @param ctx the parse tree
	 */
	enterNumberExpression?: (ctx: NumberExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumberExpression`
	 * labeled alternative in `ScratchParser.numOrStringExpr`.
	 * @param ctx the parse tree
	 */
	exitNumberExpression?: (ctx: NumberExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `StringExpression`
	 * labeled alternative in `ScratchParser.numOrStringExpr`.
	 * @param ctx the parse tree
	 */
	enterStringExpression?: (ctx: StringExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `StringExpression`
	 * labeled alternative in `ScratchParser.numOrStringExpr`.
	 * @param ctx the parse tree
	 */
	exitStringExpression?: (ctx: StringExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `AtomicMethod`
	 * labeled alternative in `ScratchParser.methodAttribute`.
	 * @param ctx the parse tree
	 */
	enterAtomicMethod?: (ctx: AtomicMethodContext) => void;
	/**
	 * Exit a parse tree produced by the `AtomicMethod`
	 * labeled alternative in `ScratchParser.methodAttribute`.
	 * @param ctx the parse tree
	 */
	exitAtomicMethod?: (ctx: AtomicMethodContext) => void;

	/**
	 * Enter a parse tree produced by the `DeleteAllFromStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 */
	enterDeleteAllFromStatement?: (ctx: DeleteAllFromStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `DeleteAllFromStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 */
	exitDeleteAllFromStatement?: (ctx: DeleteAllFromStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `DeleteIthFromStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 */
	enterDeleteIthFromStatement?: (ctx: DeleteIthFromStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `DeleteIthFromStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 */
	exitDeleteIthFromStatement?: (ctx: DeleteIthFromStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `AddElementToStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 */
	enterAddElementToStatement?: (ctx: AddElementToStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `AddElementToStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 */
	exitAddElementToStatement?: (ctx: AddElementToStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `InsertAtStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 */
	enterInsertAtStatement?: (ctx: InsertAtStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `InsertAtStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 */
	exitInsertAtStatement?: (ctx: InsertAtStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `ReplaceElementAtStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 */
	enterReplaceElementAtStatement?: (ctx: ReplaceElementAtStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `ReplaceElementAtStatement`
	 * labeled alternative in `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 */
	exitReplaceElementAtStatement?: (ctx: ReplaceElementAtStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `NeverEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	enterNeverEvent?: (ctx: NeverEventContext) => void;
	/**
	 * Exit a parse tree produced by the `NeverEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	exitNeverEvent?: (ctx: NeverEventContext) => void;

	/**
	 * Enter a parse tree produced by the `BootstapEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	enterBootstapEvent?: (ctx: BootstapEventContext) => void;
	/**
	 * Exit a parse tree produced by the `BootstapEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	exitBootstapEvent?: (ctx: BootstapEventContext) => void;

	/**
	 * Enter a parse tree produced by the `AfterBootstrapMonitoringEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	enterAfterBootstrapMonitoringEvent?: (ctx: AfterBootstrapMonitoringEventContext) => void;
	/**
	 * Exit a parse tree produced by the `AfterBootstrapMonitoringEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	exitAfterBootstrapMonitoringEvent?: (ctx: AfterBootstrapMonitoringEventContext) => void;

	/**
	 * Enter a parse tree produced by the `StartupEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	enterStartupEvent?: (ctx: StartupEventContext) => void;
	/**
	 * Exit a parse tree produced by the `StartupEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	exitStartupEvent?: (ctx: StartupEventContext) => void;

	/**
	 * Enter a parse tree produced by the `CloneStartEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	enterCloneStartEvent?: (ctx: CloneStartEventContext) => void;
	/**
	 * Exit a parse tree produced by the `CloneStartEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	exitCloneStartEvent?: (ctx: CloneStartEventContext) => void;

	/**
	 * Enter a parse tree produced by the `MessageReceivedEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	enterMessageReceivedEvent?: (ctx: MessageReceivedEventContext) => void;
	/**
	 * Exit a parse tree produced by the `MessageReceivedEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	exitMessageReceivedEvent?: (ctx: MessageReceivedEventContext) => void;

	/**
	 * Enter a parse tree produced by the `ConditionReachedEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	enterConditionReachedEvent?: (ctx: ConditionReachedEventContext) => void;
	/**
	 * Exit a parse tree produced by the `ConditionReachedEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	exitConditionReachedEvent?: (ctx: ConditionReachedEventContext) => void;

	/**
	 * Enter a parse tree produced by the `RenderedMonitoringEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	enterRenderedMonitoringEvent?: (ctx: RenderedMonitoringEventContext) => void;
	/**
	 * Exit a parse tree produced by the `RenderedMonitoringEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	exitRenderedMonitoringEvent?: (ctx: RenderedMonitoringEventContext) => void;

	/**
	 * Enter a parse tree produced by the `AfterStatementMonitoringEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	enterAfterStatementMonitoringEvent?: (ctx: AfterStatementMonitoringEventContext) => void;
	/**
	 * Exit a parse tree produced by the `AfterStatementMonitoringEvent`
	 * labeled alternative in `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	exitAfterStatementMonitoringEvent?: (ctx: AfterStatementMonitoringEventContext) => void;

	/**
	 * Enter a parse tree produced by the `FunctionReturnDefinition`
	 * labeled alternative in `ScratchParser.methodResultDeclaration`.
	 * @param ctx the parse tree
	 */
	enterFunctionReturnDefinition?: (ctx: FunctionReturnDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by the `FunctionReturnDefinition`
	 * labeled alternative in `ScratchParser.methodResultDeclaration`.
	 * @param ctx the parse tree
	 */
	exitFunctionReturnDefinition?: (ctx: FunctionReturnDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by the `VoidReturnDefinition`
	 * labeled alternative in `ScratchParser.methodResultDeclaration`.
	 * @param ctx the parse tree
	 */
	enterVoidReturnDefinition?: (ctx: VoidReturnDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by the `VoidReturnDefinition`
	 * labeled alternative in `ScratchParser.methodResultDeclaration`.
	 * @param ctx the parse tree
	 */
	exitVoidReturnDefinition?: (ctx: VoidReturnDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by the `WaitSecsStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	enterWaitSecsStatement?: (ctx: WaitSecsStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `WaitSecsStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	exitWaitSecsStatement?: (ctx: WaitSecsStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `WaitUntilStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	enterWaitUntilStatement?: (ctx: WaitUntilStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `WaitUntilStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	exitWaitUntilStatement?: (ctx: WaitUntilStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `StopOthersInActorStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	enterStopOthersInActorStatement?: (ctx: StopOthersInActorStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `StopOthersInActorStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	exitStopOthersInActorStatement?: (ctx: StopOthersInActorStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `CreateCloneOfStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	enterCreateCloneOfStatement?: (ctx: CreateCloneOfStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `CreateCloneOfStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	exitCreateCloneOfStatement?: (ctx: CreateCloneOfStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `BroadcastMessageStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	enterBroadcastMessageStatement?: (ctx: BroadcastMessageStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `BroadcastMessageStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	exitBroadcastMessageStatement?: (ctx: BroadcastMessageStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `BroadcastAndWaitStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	enterBroadcastAndWaitStatement?: (ctx: BroadcastAndWaitStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `BroadcastAndWaitStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	exitBroadcastAndWaitStatement?: (ctx: BroadcastAndWaitStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `ResetTimerStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	enterResetTimerStatement?: (ctx: ResetTimerStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `ResetTimerStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	exitResetTimerStatement?: (ctx: ResetTimerStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `EpsilonStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	enterEpsilonStatement?: (ctx: EpsilonStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `EpsilonStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	exitEpsilonStatement?: (ctx: EpsilonStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `AssumeStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	enterAssumeStatement?: (ctx: AssumeStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `AssumeStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	exitAssumeStatement?: (ctx: AssumeStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `SetStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	enterSetStatement?: (ctx: SetStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `SetStatement`
	 * labeled alternative in `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	exitSetStatement?: (ctx: SetStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `BoolLiteralExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterBoolLiteralExpression?: (ctx: BoolLiteralExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `BoolLiteralExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitBoolLiteralExpression?: (ctx: BoolLiteralExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `BoolVariableExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterBoolVariableExpression?: (ctx: BoolVariableExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `BoolVariableExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitBoolVariableExpression?: (ctx: BoolVariableExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `BoolParanthExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterBoolParanthExpression?: (ctx: BoolParanthExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `BoolParanthExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitBoolParanthExpression?: (ctx: BoolParanthExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `BoolCallStatementExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterBoolCallStatementExpression?: (ctx: BoolCallStatementExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `BoolCallStatementExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitBoolCallStatementExpression?: (ctx: BoolCallStatementExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `NumAsBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterNumAsBoolExpression?: (ctx: NumAsBoolExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumAsBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitNumAsBoolExpression?: (ctx: NumAsBoolExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `StringAsBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterStringAsBoolExpression?: (ctx: StringAsBoolExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `StringAsBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitStringAsBoolExpression?: (ctx: StringAsBoolExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `NegatedBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterNegatedBoolExpression?: (ctx: NegatedBoolExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NegatedBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitNegatedBoolExpression?: (ctx: NegatedBoolExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `BoolAndExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterBoolAndExpression?: (ctx: BoolAndExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `BoolAndExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitBoolAndExpression?: (ctx: BoolAndExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `BoolOrExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterBoolOrExpression?: (ctx: BoolOrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `BoolOrExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitBoolOrExpression?: (ctx: BoolOrExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `GreaterEqualExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterGreaterEqualExpression?: (ctx: GreaterEqualExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `GreaterEqualExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitGreaterEqualExpression?: (ctx: GreaterEqualExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `GreaterThanExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterGreaterThanExpression?: (ctx: GreaterThanExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `GreaterThanExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitGreaterThanExpression?: (ctx: GreaterThanExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `LessThanExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterLessThanExpression?: (ctx: LessThanExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `LessThanExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitLessThanExpression?: (ctx: LessThanExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `LessEqualExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterLessEqualExpression?: (ctx: LessEqualExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `LessEqualExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitLessEqualExpression?: (ctx: LessEqualExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `EqualsExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterEqualsExpression?: (ctx: EqualsExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `EqualsExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitEqualsExpression?: (ctx: EqualsExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `StrContainsExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterStrContainsExpression?: (ctx: StrContainsExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `StrContainsExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitStrContainsExpression?: (ctx: StrContainsExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `DefaultBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterDefaultBoolExpression?: (ctx: DefaultBoolExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `DefaultBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitDefaultBoolExpression?: (ctx: DefaultBoolExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `UnspecifiedBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterUnspecifiedBoolExpression?: (ctx: UnspecifiedBoolExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `UnspecifiedBoolExpression`
	 * labeled alternative in `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitUnspecifiedBoolExpression?: (ctx: UnspecifiedBoolExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `DeclareVariable`
	 * labeled alternative in `ScratchParser.declarationStmt`.
	 * @param ctx the parse tree
	 */
	enterDeclareVariable?: (ctx: DeclareVariableContext) => void;
	/**
	 * Exit a parse tree produced by the `DeclareVariable`
	 * labeled alternative in `ScratchParser.declarationStmt`.
	 * @param ctx the parse tree
	 */
	exitDeclareVariable?: (ctx: DeclareVariableContext) => void;

	/**
	 * Enter a parse tree produced by the `StringLiteralExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	enterStringLiteralExpression?: (ctx: StringLiteralExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `StringLiteralExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	exitStringLiteralExpression?: (ctx: StringLiteralExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `StringVariableExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	enterStringVariableExpression?: (ctx: StringVariableExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `StringVariableExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	exitStringVariableExpression?: (ctx: StringVariableExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `StringParanthExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	enterStringParanthExpression?: (ctx: StringParanthExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `StringParanthExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	exitStringParanthExpression?: (ctx: StringParanthExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `StringCallStatementExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	enterStringCallStatementExpression?: (ctx: StringCallStatementExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `StringCallStatementExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	exitStringCallStatementExpression?: (ctx: StringCallStatementExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `NumAsStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	enterNumAsStringExpression?: (ctx: NumAsStringExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumAsStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	exitNumAsStringExpression?: (ctx: NumAsStringExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `BoolAsStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	enterBoolAsStringExpression?: (ctx: BoolAsStringExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `BoolAsStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	exitBoolAsStringExpression?: (ctx: BoolAsStringExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `StringAttributeOfExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	enterStringAttributeOfExpression?: (ctx: StringAttributeOfExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `StringAttributeOfExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	exitStringAttributeOfExpression?: (ctx: StringAttributeOfExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `JoinStringsExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	enterJoinStringsExpression?: (ctx: JoinStringsExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `JoinStringsExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	exitJoinStringsExpression?: (ctx: JoinStringsExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `IthLetterOfStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	enterIthLetterOfStringExpression?: (ctx: IthLetterOfStringExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `IthLetterOfStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	exitIthLetterOfStringExpression?: (ctx: IthLetterOfStringExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `IthStringItemOfExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	enterIthStringItemOfExpression?: (ctx: IthStringItemOfExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `IthStringItemOfExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	exitIthStringItemOfExpression?: (ctx: IthStringItemOfExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `DefaultStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	enterDefaultStringExpression?: (ctx: DefaultStringExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `DefaultStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	exitDefaultStringExpression?: (ctx: DefaultStringExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `UnspecifiedStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	enterUnspecifiedStringExpression?: (ctx: UnspecifiedStringExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `UnspecifiedStringExpression`
	 * labeled alternative in `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	exitUnspecifiedStringExpression?: (ctx: UnspecifiedStringExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `IntegerType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	enterIntegerType?: (ctx: IntegerTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `IntegerType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	exitIntegerType?: (ctx: IntegerTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `FloatingPointType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	enterFloatingPointType?: (ctx: FloatingPointTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `FloatingPointType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	exitFloatingPointType?: (ctx: FloatingPointTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `BooleanType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	enterBooleanType?: (ctx: BooleanTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `BooleanType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	exitBooleanType?: (ctx: BooleanTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `StringType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	enterStringType?: (ctx: StringTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `StringType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	exitStringType?: (ctx: StringTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `EnumType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	enterEnumType?: (ctx: EnumTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `EnumType`
	 * labeled alternative in `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	exitEnumType?: (ctx: EnumTypeContext) => void;

	/**
	 * Enter a parse tree produced by the `UserMessage`
	 * labeled alternative in `ScratchParser.message`.
	 * @param ctx the parse tree
	 */
	enterUserMessage?: (ctx: UserMessageContext) => void;
	/**
	 * Exit a parse tree produced by the `UserMessage`
	 * labeled alternative in `ScratchParser.message`.
	 * @param ctx the parse tree
	 */
	exitUserMessage?: (ctx: UserMessageContext) => void;

	/**
	 * Enter a parse tree produced by the `SystemMessage`
	 * labeled alternative in `ScratchParser.message`.
	 * @param ctx the parse tree
	 */
	enterSystemMessage?: (ctx: SystemMessageContext) => void;
	/**
	 * Exit a parse tree produced by the `SystemMessage`
	 * labeled alternative in `ScratchParser.message`.
	 * @param ctx the parse tree
	 */
	exitSystemMessage?: (ctx: SystemMessageContext) => void;

	/**
	 * Enter a parse tree produced by the `PureElse`
	 * labeled alternative in `ScratchParser.elseCase`.
	 * @param ctx the parse tree
	 */
	enterPureElse?: (ctx: PureElseContext) => void;
	/**
	 * Exit a parse tree produced by the `PureElse`
	 * labeled alternative in `ScratchParser.elseCase`.
	 * @param ctx the parse tree
	 */
	exitPureElse?: (ctx: PureElseContext) => void;

	/**
	 * Enter a parse tree produced by the `ElseIfCase`
	 * labeled alternative in `ScratchParser.elseCase`.
	 * @param ctx the parse tree
	 */
	enterElseIfCase?: (ctx: ElseIfCaseContext) => void;
	/**
	 * Exit a parse tree produced by the `ElseIfCase`
	 * labeled alternative in `ScratchParser.elseCase`.
	 * @param ctx the parse tree
	 */
	exitElseIfCase?: (ctx: ElseIfCaseContext) => void;

	/**
	 * Enter a parse tree produced by the `EmptyElseCase`
	 * labeled alternative in `ScratchParser.elseCase`.
	 * @param ctx the parse tree
	 */
	enterEmptyElseCase?: (ctx: EmptyElseCaseContext) => void;
	/**
	 * Exit a parse tree produced by the `EmptyElseCase`
	 * labeled alternative in `ScratchParser.elseCase`.
	 * @param ctx the parse tree
	 */
	exitEmptyElseCase?: (ctx: EmptyElseCaseContext) => void;

	/**
	 * Enter a parse tree produced by the `FlatVariable`
	 * labeled alternative in `ScratchParser.variable`.
	 * @param ctx the parse tree
	 */
	enterFlatVariable?: (ctx: FlatVariableContext) => void;
	/**
	 * Exit a parse tree produced by the `FlatVariable`
	 * labeled alternative in `ScratchParser.variable`.
	 * @param ctx the parse tree
	 */
	exitFlatVariable?: (ctx: FlatVariableContext) => void;

	/**
	 * Enter a parse tree produced by the `QualifiedVariable`
	 * labeled alternative in `ScratchParser.variable`.
	 * @param ctx the parse tree
	 */
	enterQualifiedVariable?: (ctx: QualifiedVariableContext) => void;
	/**
	 * Exit a parse tree produced by the `QualifiedVariable`
	 * labeled alternative in `ScratchParser.variable`.
	 * @param ctx the parse tree
	 */
	exitQualifiedVariable?: (ctx: QualifiedVariableContext) => void;

	/**
	 * Enter a parse tree produced by the `NumLiteralExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterNumLiteralExpression?: (ctx: NumLiteralExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumLiteralExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitNumLiteralExpression?: (ctx: NumLiteralExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `NumVariableExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterNumVariableExpression?: (ctx: NumVariableExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumVariableExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitNumVariableExpression?: (ctx: NumVariableExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `NumBrackets`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterNumBrackets?: (ctx: NumBracketsContext) => void;
	/**
	 * Exit a parse tree produced by the `NumBrackets`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitNumBrackets?: (ctx: NumBracketsContext) => void;

	/**
	 * Enter a parse tree produced by the `NumCallStatementExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterNumCallStatementExpression?: (ctx: NumCallStatementExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumCallStatementExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitNumCallStatementExpression?: (ctx: NumCallStatementExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `StringToFloatExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterStringToFloatExpression?: (ctx: StringToFloatExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `StringToFloatExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitStringToFloatExpression?: (ctx: StringToFloatExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `StringToIntExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterStringToIntExpression?: (ctx: StringToIntExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `StringToIntExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitStringToIntExpression?: (ctx: StringToIntExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `BoolToIntExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterBoolToIntExpression?: (ctx: BoolToIntExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `BoolToIntExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitBoolToIntExpression?: (ctx: BoolToIntExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `NumToFloatExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterNumToFloatExpression?: (ctx: NumToFloatExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumToFloatExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitNumToFloatExpression?: (ctx: NumToFloatExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `NumToIntExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterNumToIntExpression?: (ctx: NumToIntExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumToIntExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitNumToIntExpression?: (ctx: NumToIntExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `TimerExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterTimerExpression?: (ctx: TimerExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `TimerExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitTimerExpression?: (ctx: TimerExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `LengthOfStringExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterLengthOfStringExpression?: (ctx: LengthOfStringExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `LengthOfStringExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitLengthOfStringExpression?: (ctx: LengthOfStringExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `LengthOfListExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterLengthOfListExpression?: (ctx: LengthOfListExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `LengthOfListExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitLengthOfListExpression?: (ctx: LengthOfListExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `IndexOfExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterIndexOfExpression?: (ctx: IndexOfExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `IndexOfExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitIndexOfExpression?: (ctx: IndexOfExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `NumMulExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterNumMulExpression?: (ctx: NumMulExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumMulExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitNumMulExpression?: (ctx: NumMulExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `NumDivExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterNumDivExpression?: (ctx: NumDivExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumDivExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitNumDivExpression?: (ctx: NumDivExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `NumModExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterNumModExpression?: (ctx: NumModExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumModExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitNumModExpression?: (ctx: NumModExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `NumPlusExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterNumPlusExpression?: (ctx: NumPlusExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumPlusExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitNumPlusExpression?: (ctx: NumPlusExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `NumMinusExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterNumMinusExpression?: (ctx: NumMinusExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumMinusExpression`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitNumMinusExpression?: (ctx: NumMinusExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `DefaultNumExpr`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterDefaultNumExpr?: (ctx: DefaultNumExprContext) => void;
	/**
	 * Exit a parse tree produced by the `DefaultNumExpr`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitDefaultNumExpr?: (ctx: DefaultNumExprContext) => void;

	/**
	 * Enter a parse tree produced by the `UnspecifiedNumExpr`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterUnspecifiedNumExpr?: (ctx: UnspecifiedNumExprContext) => void;
	/**
	 * Exit a parse tree produced by the `UnspecifiedNumExpr`
	 * labeled alternative in `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitUnspecifiedNumExpr?: (ctx: UnspecifiedNumExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ControlStatement`
	 * labeled alternative in `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 */
	enterControlStatement?: (ctx: ControlStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `ControlStatement`
	 * labeled alternative in `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 */
	exitControlStatement?: (ctx: ControlStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `NonControlStatement`
	 * labeled alternative in `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 */
	enterNonControlStatement?: (ctx: NonControlStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `NonControlStatement`
	 * labeled alternative in `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 */
	exitNonControlStatement?: (ctx: NonControlStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `AtomicBlockStatement`
	 * labeled alternative in `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 */
	enterAtomicBlockStatement?: (ctx: AtomicBlockStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `AtomicBlockStatement`
	 * labeled alternative in `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 */
	exitAtomicBlockStatement?: (ctx: AtomicBlockStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `AttributedStatement`
	 * labeled alternative in `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 */
	enterAttributedStatement?: (ctx: AttributedStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `AttributedStatement`
	 * labeled alternative in `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 */
	exitAttributedStatement?: (ctx: AttributedStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `ImageResource`
	 * labeled alternative in `ScratchParser.resourceType`.
	 * @param ctx the parse tree
	 */
	enterImageResource?: (ctx: ImageResourceContext) => void;
	/**
	 * Exit a parse tree produced by the `ImageResource`
	 * labeled alternative in `ScratchParser.resourceType`.
	 * @param ctx the parse tree
	 */
	exitImageResource?: (ctx: ImageResourceContext) => void;

	/**
	 * Enter a parse tree produced by the `SoundResource`
	 * labeled alternative in `ScratchParser.resourceType`.
	 * @param ctx the parse tree
	 */
	enterSoundResource?: (ctx: SoundResourceContext) => void;
	/**
	 * Exit a parse tree produced by the `SoundResource`
	 * labeled alternative in `ScratchParser.resourceType`.
	 * @param ctx the parse tree
	 */
	exitSoundResource?: (ctx: SoundResourceContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.fileType`.
	 * @param ctx the parse tree
	 */
	enterFileType?: (ctx: FileTypeContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.fileType`.
	 * @param ctx the parse tree
	 */
	exitFileType?: (ctx: FileTypeContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.importDefinitionList`.
	 * @param ctx the parse tree
	 */
	enterImportDefinitionList?: (ctx: ImportDefinitionListContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.importDefinitionList`.
	 * @param ctx the parse tree
	 */
	exitImportDefinitionList?: (ctx: ImportDefinitionListContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.importDefinition`.
	 * @param ctx the parse tree
	 */
	enterImportDefinition?: (ctx: ImportDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.importDefinition`.
	 * @param ctx the parse tree
	 */
	exitImportDefinition?: (ctx: ImportDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.importSelector`.
	 * @param ctx the parse tree
	 */
	enterImportSelector?: (ctx: ImportSelectorContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.importSelector`.
	 * @param ctx the parse tree
	 */
	exitImportSelector?: (ctx: ImportSelectorContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.actorDefinitionList`.
	 * @param ctx the parse tree
	 */
	enterActorDefinitionList?: (ctx: ActorDefinitionListContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.actorDefinitionList`.
	 * @param ctx the parse tree
	 */
	exitActorDefinitionList?: (ctx: ActorDefinitionListContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.actorDefinition`.
	 * @param ctx the parse tree
	 */
	enterActorDefinition?: (ctx: ActorDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.actorDefinition`.
	 * @param ctx the parse tree
	 */
	exitActorDefinition?: (ctx: ActorDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.inheritsFrom`.
	 * @param ctx the parse tree
	 */
	enterInheritsFrom?: (ctx: InheritsFromContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.inheritsFrom`.
	 * @param ctx the parse tree
	 */
	exitInheritsFrom?: (ctx: InheritsFromContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.actorMode`.
	 * @param ctx the parse tree
	 */
	enterActorMode?: (ctx: ActorModeContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.actorMode`.
	 * @param ctx the parse tree
	 */
	exitActorMode?: (ctx: ActorModeContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.actorComponentsDefinition`.
	 * @param ctx the parse tree
	 */
	enterActorComponentsDefinition?: (ctx: ActorComponentsDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.actorComponentsDefinition`.
	 * @param ctx the parse tree
	 */
	exitActorComponentsDefinition?: (ctx: ActorComponentsDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.resource`.
	 * @param ctx the parse tree
	 */
	enterResource?: (ctx: ResourceContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.resource`.
	 * @param ctx the parse tree
	 */
	exitResource?: (ctx: ResourceContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.resourceType`.
	 * @param ctx the parse tree
	 */
	enterResourceType?: (ctx: ResourceTypeContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.resourceType`.
	 * @param ctx the parse tree
	 */
	exitResourceType?: (ctx: ResourceTypeContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.resourceList`.
	 * @param ctx the parse tree
	 */
	enterResourceList?: (ctx: ResourceListContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.resourceList`.
	 * @param ctx the parse tree
	 */
	exitResourceList?: (ctx: ResourceListContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.declarationStmt`.
	 * @param ctx the parse tree
	 */
	enterDeclarationStmt?: (ctx: DeclarationStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.declarationStmt`.
	 * @param ctx the parse tree
	 */
	exitDeclarationStmt?: (ctx: DeclarationStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.declarationStmtList`.
	 * @param ctx the parse tree
	 */
	enterDeclarationStmtList?: (ctx: DeclarationStmtListContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.declarationStmtList`.
	 * @param ctx the parse tree
	 */
	exitDeclarationStmtList?: (ctx: DeclarationStmtListContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.type`.
	 * @param ctx the parse tree
	 */
	enterType?: (ctx: TypeContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.type`.
	 * @param ctx the parse tree
	 */
	exitType?: (ctx: TypeContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	enterPrimitiveType?: (ctx: PrimitiveTypeContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	exitPrimitiveType?: (ctx: PrimitiveTypeContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.script`.
	 * @param ctx the parse tree
	 */
	enterScript?: (ctx: ScriptContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.script`.
	 * @param ctx the parse tree
	 */
	exitScript?: (ctx: ScriptContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.scriptList`.
	 * @param ctx the parse tree
	 */
	enterScriptList?: (ctx: ScriptListContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.scriptList`.
	 * @param ctx the parse tree
	 */
	exitScriptList?: (ctx: ScriptListContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.scriptAttributeList`.
	 * @param ctx the parse tree
	 */
	enterScriptAttributeList?: (ctx: ScriptAttributeListContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.scriptAttributeList`.
	 * @param ctx the parse tree
	 */
	exitScriptAttributeList?: (ctx: ScriptAttributeListContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.scriptAttribute`.
	 * @param ctx the parse tree
	 */
	enterScriptAttribute?: (ctx: ScriptAttributeContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.scriptAttribute`.
	 * @param ctx the parse tree
	 */
	exitScriptAttribute?: (ctx: ScriptAttributeContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.event`.
	 * @param ctx the parse tree
	 */
	enterEvent?: (ctx: EventContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.event`.
	 * @param ctx the parse tree
	 */
	exitEvent?: (ctx: EventContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	enterCoreEvent?: (ctx: CoreEventContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.coreEvent`.
	 * @param ctx the parse tree
	 */
	exitCoreEvent?: (ctx: CoreEventContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.messageNamespace`.
	 * @param ctx the parse tree
	 */
	enterMessageNamespace?: (ctx: MessageNamespaceContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.messageNamespace`.
	 * @param ctx the parse tree
	 */
	exitMessageNamespace?: (ctx: MessageNamespaceContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.externMethodDefinition`.
	 * @param ctx the parse tree
	 */
	enterExternMethodDefinition?: (ctx: ExternMethodDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.externMethodDefinition`.
	 * @param ctx the parse tree
	 */
	exitExternMethodDefinition?: (ctx: ExternMethodDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.externMethodResultDeclaration`.
	 * @param ctx the parse tree
	 */
	enterExternMethodResultDeclaration?: (ctx: ExternMethodResultDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.externMethodResultDeclaration`.
	 * @param ctx the parse tree
	 */
	exitExternMethodResultDeclaration?: (ctx: ExternMethodResultDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.externMethodDefinitionList`.
	 * @param ctx the parse tree
	 */
	enterExternMethodDefinitionList?: (ctx: ExternMethodDefinitionListContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.externMethodDefinitionList`.
	 * @param ctx the parse tree
	 */
	exitExternMethodDefinitionList?: (ctx: ExternMethodDefinitionListContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.methodDefinition`.
	 * @param ctx the parse tree
	 */
	enterMethodDefinition?: (ctx: MethodDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.methodDefinition`.
	 * @param ctx the parse tree
	 */
	exitMethodDefinition?: (ctx: MethodDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.methodResultDeclaration`.
	 * @param ctx the parse tree
	 */
	enterMethodResultDeclaration?: (ctx: MethodResultDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.methodResultDeclaration`.
	 * @param ctx the parse tree
	 */
	exitMethodResultDeclaration?: (ctx: MethodResultDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.methodDefinitionList`.
	 * @param ctx the parse tree
	 */
	enterMethodDefinitionList?: (ctx: MethodDefinitionListContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.methodDefinitionList`.
	 * @param ctx the parse tree
	 */
	exitMethodDefinitionList?: (ctx: MethodDefinitionListContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.methodAttributeList`.
	 * @param ctx the parse tree
	 */
	enterMethodAttributeList?: (ctx: MethodAttributeListContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.methodAttributeList`.
	 * @param ctx the parse tree
	 */
	exitMethodAttributeList?: (ctx: MethodAttributeListContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.methodAttribute`.
	 * @param ctx the parse tree
	 */
	enterMethodAttribute?: (ctx: MethodAttributeContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.methodAttribute`.
	 * @param ctx the parse tree
	 */
	exitMethodAttribute?: (ctx: MethodAttributeContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.parameter`.
	 * @param ctx the parse tree
	 */
	enterParameter?: (ctx: ParameterContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.parameter`.
	 * @param ctx the parse tree
	 */
	exitParameter?: (ctx: ParameterContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.parameterList`.
	 * @param ctx the parse tree
	 */
	enterParameterList?: (ctx: ParameterListContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.parameterList`.
	 * @param ctx the parse tree
	 */
	exitParameterList?: (ctx: ParameterListContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.parameterListPlain`.
	 * @param ctx the parse tree
	 */
	enterParameterListPlain?: (ctx: ParameterListPlainContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.parameterListPlain`.
	 * @param ctx the parse tree
	 */
	exitParameterListPlain?: (ctx: ParameterListPlainContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.stmtList`.
	 * @param ctx the parse tree
	 */
	enterStmtList?: (ctx: StmtListContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.stmtList`.
	 * @param ctx the parse tree
	 */
	exitStmtList?: (ctx: StmtListContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.atomicBlock`.
	 * @param ctx the parse tree
	 */
	enterAtomicBlock?: (ctx: AtomicBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.atomicBlock`.
	 * @param ctx the parse tree
	 */
	exitAtomicBlock?: (ctx: AtomicBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.stmtListPlain`.
	 * @param ctx the parse tree
	 */
	enterStmtListPlain?: (ctx: StmtListPlainContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.stmtListPlain`.
	 * @param ctx the parse tree
	 */
	exitStmtListPlain?: (ctx: StmtListPlainContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.controlStmt`.
	 * @param ctx the parse tree
	 */
	enterControlStmt?: (ctx: ControlStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.controlStmt`.
	 * @param ctx the parse tree
	 */
	exitControlStmt?: (ctx: ControlStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.coreControlStmt`.
	 * @param ctx the parse tree
	 */
	enterCoreControlStmt?: (ctx: CoreControlStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.coreControlStmt`.
	 * @param ctx the parse tree
	 */
	exitCoreControlStmt?: (ctx: CoreControlStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.ifStmt`.
	 * @param ctx the parse tree
	 */
	enterIfStmt?: (ctx: IfStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.ifStmt`.
	 * @param ctx the parse tree
	 */
	exitIfStmt?: (ctx: IfStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.elseCase`.
	 * @param ctx the parse tree
	 */
	enterElseCase?: (ctx: ElseCaseContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.elseCase`.
	 * @param ctx the parse tree
	 */
	exitElseCase?: (ctx: ElseCaseContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.untilStmt`.
	 * @param ctx the parse tree
	 */
	enterUntilStmt?: (ctx: UntilStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.untilStmt`.
	 * @param ctx the parse tree
	 */
	exitUntilStmt?: (ctx: UntilStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.repeatTimesStmt`.
	 * @param ctx the parse tree
	 */
	enterRepeatTimesStmt?: (ctx: RepeatTimesStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.repeatTimesStmt`.
	 * @param ctx the parse tree
	 */
	exitRepeatTimesStmt?: (ctx: RepeatTimesStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.repeatForeverStmt`.
	 * @param ctx the parse tree
	 */
	enterRepeatForeverStmt?: (ctx: RepeatForeverStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.repeatForeverStmt`.
	 * @param ctx the parse tree
	 */
	exitRepeatForeverStmt?: (ctx: RepeatForeverStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.callStmt`.
	 * @param ctx the parse tree
	 */
	enterCallStmt?: (ctx: CallStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.callStmt`.
	 * @param ctx the parse tree
	 */
	exitCallStmt?: (ctx: CallStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.expressionList`.
	 * @param ctx the parse tree
	 */
	enterExpressionList?: (ctx: ExpressionListContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.expressionList`.
	 * @param ctx the parse tree
	 */
	exitExpressionList?: (ctx: ExpressionListContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.expressionListPlain`.
	 * @param ctx the parse tree
	 */
	enterExpressionListPlain?: (ctx: ExpressionListPlainContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.expressionListPlain`.
	 * @param ctx the parse tree
	 */
	exitExpressionListPlain?: (ctx: ExpressionListPlainContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.expressionStmt`.
	 * @param ctx the parse tree
	 */
	enterExpressionStmt?: (ctx: ExpressionStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.expressionStmt`.
	 * @param ctx the parse tree
	 */
	exitExpressionStmt?: (ctx: ExpressionStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 */
	enterStmt?: (ctx: StmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.stmt`.
	 * @param ctx the parse tree
	 */
	exitStmt?: (ctx: StmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.nonCtrlStmt`.
	 * @param ctx the parse tree
	 */
	enterNonCtrlStmt?: (ctx: NonCtrlStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.nonCtrlStmt`.
	 * @param ctx the parse tree
	 */
	exitNonCtrlStmt?: (ctx: NonCtrlStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.coreNonCtrlStmt`.
	 * @param ctx the parse tree
	 */
	enterCoreNonCtrlStmt?: (ctx: CoreNonCtrlStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.coreNonCtrlStmt`.
	 * @param ctx the parse tree
	 */
	exitCoreNonCtrlStmt?: (ctx: CoreNonCtrlStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	enterCommonStmt?: (ctx: CommonStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.commonStmt`.
	 * @param ctx the parse tree
	 */
	exitCommonStmt?: (ctx: CommonStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 */
	enterListStmt?: (ctx: ListStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.listStmt`.
	 * @param ctx the parse tree
	 */
	exitListStmt?: (ctx: ListStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.setStmt`.
	 * @param ctx the parse tree
	 */
	enterSetStmt?: (ctx: SetStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.setStmt`.
	 * @param ctx the parse tree
	 */
	exitSetStmt?: (ctx: SetStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.setStmtList`.
	 * @param ctx the parse tree
	 */
	enterSetStmtList?: (ctx: SetStmtListContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.setStmtList`.
	 * @param ctx the parse tree
	 */
	exitSetStmtList?: (ctx: SetStmtListContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.terminationStmt`.
	 * @param ctx the parse tree
	 */
	enterTerminationStmt?: (ctx: TerminationStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.terminationStmt`.
	 * @param ctx the parse tree
	 */
	exitTerminationStmt?: (ctx: TerminationStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.stringExpr`.
	 * @param ctx the parse tree
	 */
	enterStringExpr?: (ctx: StringExprContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.stringExpr`.
	 * @param ctx the parse tree
	 */
	exitStringExpr?: (ctx: StringExprContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	enterCoreStringExpr?: (ctx: CoreStringExprContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.coreStringExpr`.
	 * @param ctx the parse tree
	 */
	exitCoreStringExpr?: (ctx: CoreStringExprContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.boolExpr`.
	 * @param ctx the parse tree
	 */
	enterBoolExpr?: (ctx: BoolExprContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.boolExpr`.
	 * @param ctx the parse tree
	 */
	exitBoolExpr?: (ctx: BoolExprContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	enterCoreBoolExpr?: (ctx: CoreBoolExprContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.coreBoolExpr`.
	 * @param ctx the parse tree
	 */
	exitCoreBoolExpr?: (ctx: CoreBoolExprContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.numExpr`.
	 * @param ctx the parse tree
	 */
	enterNumExpr?: (ctx: NumExprContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.numExpr`.
	 * @param ctx the parse tree
	 */
	exitNumExpr?: (ctx: NumExprContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.numOrStringExpr`.
	 * @param ctx the parse tree
	 */
	enterNumOrStringExpr?: (ctx: NumOrStringExprContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.numOrStringExpr`.
	 * @param ctx the parse tree
	 */
	exitNumOrStringExpr?: (ctx: NumOrStringExprContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	enterCoreNumExpr?: (ctx: CoreNumExprContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.coreNumExpr`.
	 * @param ctx the parse tree
	 */
	exitCoreNumExpr?: (ctx: CoreNumExprContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.listExpr`.
	 * @param ctx the parse tree
	 */
	enterListExpr?: (ctx: ListExprContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.listExpr`.
	 * @param ctx the parse tree
	 */
	exitListExpr?: (ctx: ListExprContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 */
	enterActorExpr?: (ctx: ActorExprContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.actorExpr`.
	 * @param ctx the parse tree
	 */
	exitActorExpr?: (ctx: ActorExprContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.coreExpression`.
	 * @param ctx the parse tree
	 */
	enterCoreExpression?: (ctx: CoreExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.coreExpression`.
	 * @param ctx the parse tree
	 */
	exitCoreExpression?: (ctx: CoreExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.unspecifiedExpr`.
	 * @param ctx the parse tree
	 */
	enterUnspecifiedExpr?: (ctx: UnspecifiedExprContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.unspecifiedExpr`.
	 * @param ctx the parse tree
	 */
	exitUnspecifiedExpr?: (ctx: UnspecifiedExprContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.variable`.
	 * @param ctx the parse tree
	 */
	enterVariable?: (ctx: VariableContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.variable`.
	 * @param ctx the parse tree
	 */
	exitVariable?: (ctx: VariableContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.ident`.
	 * @param ctx the parse tree
	 */
	enterIdent?: (ctx: IdentContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.ident`.
	 * @param ctx the parse tree
	 */
	exitIdent?: (ctx: IdentContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.number`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.number`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.resourceLocator`.
	 * @param ctx the parse tree
	 */
	enterResourceLocator?: (ctx: ResourceLocatorContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.resourceLocator`.
	 * @param ctx the parse tree
	 */
	exitResourceLocator?: (ctx: ResourceLocatorContext) => void;

	/**
	 * Enter a parse tree produced by `ScratchParser.message`.
	 * @param ctx the parse tree
	 */
	enterMessage?: (ctx: MessageContext) => void;
	/**
	 * Exit a parse tree produced by `ScratchParser.message`.
	 * @param ctx the parse tree
	 */
	exitMessage?: (ctx: MessageContext) => void;
}

