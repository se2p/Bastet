// Generated from /Users/stahlbau/uni/develop/bastet-framework/src/bastet/syntax/parser/grammar/LEILA.g4 by ANTLR 4.8
import org.antlr.v4.runtime.tree.ParseTreeVisitor;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link LEILAParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
public interface LEILAVisitor<T> extends ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link LEILAParser#program}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitProgram(LEILAParser.ProgramContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#fileType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFileType(LEILAParser.FileTypeContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#importDefinitionList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitImportDefinitionList(LEILAParser.ImportDefinitionListContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#importDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitImportDefinition(LEILAParser.ImportDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ImportSelectedActor}
	 * labeled alternative in {@link LEILAParser#importSelector}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitImportSelectedActor(LEILAParser.ImportSelectedActorContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ImportAllActors}
	 * labeled alternative in {@link LEILAParser#importSelector}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitImportAllActors(LEILAParser.ImportAllActorsContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#actorDefinitionList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitActorDefinitionList(LEILAParser.ActorDefinitionListContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#actorDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitActorDefinition(LEILAParser.ActorDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#inheritsFrom}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitInheritsFrom(LEILAParser.InheritsFromContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ConcreteActorMode}
	 * labeled alternative in {@link LEILAParser#actorMode}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitConcreteActorMode(LEILAParser.ConcreteActorModeContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ActorRoleMode}
	 * labeled alternative in {@link LEILAParser#actorMode}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitActorRoleMode(LEILAParser.ActorRoleModeContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#actorComponentsDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitActorComponentsDefinition(LEILAParser.ActorComponentsDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#resource}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitResource(LEILAParser.ResourceContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ImageResource}
	 * labeled alternative in {@link LEILAParser#resourceType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitImageResource(LEILAParser.ImageResourceContext ctx);
	/**
	 * Visit a parse tree produced by the {@code SoundResource}
	 * labeled alternative in {@link LEILAParser#resourceType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSoundResource(LEILAParser.SoundResourceContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#resourceList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitResourceList(LEILAParser.ResourceListContext ctx);
	/**
	 * Visit a parse tree produced by the {@code DeclareVariable}
	 * labeled alternative in {@link LEILAParser#declarationStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDeclareVariable(LEILAParser.DeclareVariableContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#declarationStmtList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDeclarationStmtList(LEILAParser.DeclarationStmtListContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ListType}
	 * labeled alternative in {@link LEILAParser#type}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitListType(LEILAParser.ListTypeContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ActorType}
	 * labeled alternative in {@link LEILAParser#type}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitActorType(LEILAParser.ActorTypeContext ctx);
	/**
	 * Visit a parse tree produced by the {@code Primitive}
	 * labeled alternative in {@link LEILAParser#type}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPrimitive(LEILAParser.PrimitiveContext ctx);
	/**
	 * Visit a parse tree produced by the {@code IntegerType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIntegerType(LEILAParser.IntegerTypeContext ctx);
	/**
	 * Visit a parse tree produced by the {@code FloatingPointType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFloatingPointType(LEILAParser.FloatingPointTypeContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BooleanType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBooleanType(LEILAParser.BooleanTypeContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StringType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringType(LEILAParser.StringTypeContext ctx);
	/**
	 * Visit a parse tree produced by the {@code EnumType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEnumType(LEILAParser.EnumTypeContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#script}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitScript(LEILAParser.ScriptContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#scriptList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitScriptList(LEILAParser.ScriptListContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#scriptAttributeList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitScriptAttributeList(LEILAParser.ScriptAttributeListContext ctx);
	/**
	 * Visit a parse tree produced by the {@code RestartScript}
	 * labeled alternative in {@link LEILAParser#scriptAttribute}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRestartScript(LEILAParser.RestartScriptContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NeverEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNeverEvent(LEILAParser.NeverEventContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BootstapEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBootstapEvent(LEILAParser.BootstapEventContext ctx);
	/**
	 * Visit a parse tree produced by the {@code AfterBootstrapMonitoringEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAfterBootstrapMonitoringEvent(LEILAParser.AfterBootstrapMonitoringEventContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StartupEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStartupEvent(LEILAParser.StartupEventContext ctx);
	/**
	 * Visit a parse tree produced by the {@code CloneStartEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCloneStartEvent(LEILAParser.CloneStartEventContext ctx);
	/**
	 * Visit a parse tree produced by the {@code MessageReceivedEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMessageReceivedEvent(LEILAParser.MessageReceivedEventContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ConditionReachedEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitConditionReachedEvent(LEILAParser.ConditionReachedEventContext ctx);
	/**
	 * Visit a parse tree produced by the {@code RenderedMonitoringEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRenderedMonitoringEvent(LEILAParser.RenderedMonitoringEventContext ctx);
	/**
	 * Visit a parse tree produced by the {@code AfterStatementMonitoringEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAfterStatementMonitoringEvent(LEILAParser.AfterStatementMonitoringEventContext ctx);
	/**
	 * Visit a parse tree produced by the {@code MessageNameSpace}
	 * labeled alternative in {@link LEILAParser#messageNamespace}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMessageNameSpace(LEILAParser.MessageNameSpaceContext ctx);
	/**
	 * Visit a parse tree produced by the {@code GlobalNameSpace}
	 * labeled alternative in {@link LEILAParser#messageNamespace}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitGlobalNameSpace(LEILAParser.GlobalNameSpaceContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#methodDefinitionList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMethodDefinitionList(LEILAParser.MethodDefinitionListContext ctx);
	/**
	 * Visit a parse tree produced by the {@code FullMethodDefinition}
	 * labeled alternative in {@link LEILAParser#methodDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFullMethodDefinition(LEILAParser.FullMethodDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ExternMethodDefinition}
	 * labeled alternative in {@link LEILAParser#methodDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExternMethodDefinition(LEILAParser.ExternMethodDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code FunctionReturnDefinition}
	 * labeled alternative in {@link LEILAParser#methodResultDeclaration}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFunctionReturnDefinition(LEILAParser.FunctionReturnDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code VoidReturnDefinition}
	 * labeled alternative in {@link LEILAParser#methodResultDeclaration}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitVoidReturnDefinition(LEILAParser.VoidReturnDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ExternFunctionReturnDefinition}
	 * labeled alternative in {@link LEILAParser#externMethodResultDeclaration}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExternFunctionReturnDefinition(LEILAParser.ExternFunctionReturnDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ExternVoidReturnDefinition}
	 * labeled alternative in {@link LEILAParser#externMethodResultDeclaration}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExternVoidReturnDefinition(LEILAParser.ExternVoidReturnDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#methodAttributeList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMethodAttributeList(LEILAParser.MethodAttributeListContext ctx);
	/**
	 * Visit a parse tree produced by the {@code AtomicMethod}
	 * labeled alternative in {@link LEILAParser#methodAttribute}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAtomicMethod(LEILAParser.AtomicMethodContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#parameter}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitParameter(LEILAParser.ParameterContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#parameterList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitParameterList(LEILAParser.ParameterListContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#parameterListPlain}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitParameterListPlain(LEILAParser.ParameterListPlainContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#stmtList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStmtList(LEILAParser.StmtListContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#atomicBlock}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAtomicBlock(LEILAParser.AtomicBlockContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#stmtListPlain}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStmtListPlain(LEILAParser.StmtListPlainContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#controlStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitControlStmt(LEILAParser.ControlStmtContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#ifStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIfStmt(LEILAParser.IfStmtContext ctx);
	/**
	 * Visit a parse tree produced by the {@code PureElse}
	 * labeled alternative in {@link LEILAParser#elseCase}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPureElse(LEILAParser.PureElseContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ElseIfCase}
	 * labeled alternative in {@link LEILAParser#elseCase}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitElseIfCase(LEILAParser.ElseIfCaseContext ctx);
	/**
	 * Visit a parse tree produced by the {@code EmptyElseCase}
	 * labeled alternative in {@link LEILAParser#elseCase}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEmptyElseCase(LEILAParser.EmptyElseCaseContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#untilStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUntilStmt(LEILAParser.UntilStmtContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#repeatTimesStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRepeatTimesStmt(LEILAParser.RepeatTimesStmtContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#repeatForeverStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRepeatForeverStmt(LEILAParser.RepeatForeverStmtContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#callStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCallStmt(LEILAParser.CallStmtContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#expressionList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpressionList(LEILAParser.ExpressionListContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#expressionListPlain}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpressionListPlain(LEILAParser.ExpressionListPlainContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#expressionStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpressionStmt(LEILAParser.ExpressionStmtContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ControlStatement}
	 * labeled alternative in {@link LEILAParser#stmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitControlStatement(LEILAParser.ControlStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NonControlStatement}
	 * labeled alternative in {@link LEILAParser#stmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNonControlStatement(LEILAParser.NonControlStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code AtomicBlockStatement}
	 * labeled alternative in {@link LEILAParser#stmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAtomicBlockStatement(LEILAParser.AtomicBlockStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code AttributedStatement}
	 * labeled alternative in {@link LEILAParser#stmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAttributedStatement(LEILAParser.AttributedStatementContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#nonCtrlStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNonCtrlStmt(LEILAParser.NonCtrlStmtContext ctx);
	/**
	 * Visit a parse tree produced by the {@code WaitSecsStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitWaitSecsStatement(LEILAParser.WaitSecsStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code WaitUntilStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitWaitUntilStatement(LEILAParser.WaitUntilStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StopOthersInActorStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStopOthersInActorStatement(LEILAParser.StopOthersInActorStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code CreateCloneOfStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCreateCloneOfStatement(LEILAParser.CreateCloneOfStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BroadcastMessageStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBroadcastMessageStatement(LEILAParser.BroadcastMessageStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BroadcastAndWaitStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBroadcastAndWaitStatement(LEILAParser.BroadcastAndWaitStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ResetTimerStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitResetTimerStatement(LEILAParser.ResetTimerStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code EpsilonStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEpsilonStatement(LEILAParser.EpsilonStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code AssumeStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAssumeStatement(LEILAParser.AssumeStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code SetStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSetStatement(LEILAParser.SetStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code DeleteAllFromStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDeleteAllFromStatement(LEILAParser.DeleteAllFromStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code DeleteIthFromStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDeleteIthFromStatement(LEILAParser.DeleteIthFromStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code AddElementToStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAddElementToStatement(LEILAParser.AddElementToStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code InsertAtStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitInsertAtStatement(LEILAParser.InsertAtStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ReplaceElementAtStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitReplaceElementAtStatement(LEILAParser.ReplaceElementAtStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StoreEvalResultStatement}
	 * labeled alternative in {@link LEILAParser#setStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStoreEvalResultStatement(LEILAParser.StoreEvalResultStatementContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StoreCallResultStatement}
	 * labeled alternative in {@link LEILAParser#setStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStoreCallResultStatement(LEILAParser.StoreCallResultStatementContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#setStmtList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSetStmtList(LEILAParser.SetStmtListContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StopAll}
	 * labeled alternative in {@link LEILAParser#terminationStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStopAll(LEILAParser.StopAllContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StopThis}
	 * labeled alternative in {@link LEILAParser#terminationStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStopThis(LEILAParser.StopThisContext ctx);
	/**
	 * Visit a parse tree produced by the {@code DeleteThisClone}
	 * labeled alternative in {@link LEILAParser#terminationStmt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDeleteThisClone(LEILAParser.DeleteThisCloneContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StringLiteralExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringLiteralExpression(LEILAParser.StringLiteralExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StringVariableExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringVariableExpression(LEILAParser.StringVariableExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StringParanthExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringParanthExpression(LEILAParser.StringParanthExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StringCallStatementExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringCallStatementExpression(LEILAParser.StringCallStatementExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumAsStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumAsStringExpression(LEILAParser.NumAsStringExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BoolAsStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBoolAsStringExpression(LEILAParser.BoolAsStringExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StringAttributeOfExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringAttributeOfExpression(LEILAParser.StringAttributeOfExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code JoinStringsExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitJoinStringsExpression(LEILAParser.JoinStringsExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code IthLetterOfStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIthLetterOfStringExpression(LEILAParser.IthLetterOfStringExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code IthStringItemOfExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIthStringItemOfExpression(LEILAParser.IthStringItemOfExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code DefaultStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDefaultStringExpression(LEILAParser.DefaultStringExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code UnspecifiedStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUnspecifiedStringExpression(LEILAParser.UnspecifiedStringExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BoolOrExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBoolOrExpression(LEILAParser.BoolOrExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code GreaterEqualExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitGreaterEqualExpression(LEILAParser.GreaterEqualExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StringAsBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringAsBoolExpression(LEILAParser.StringAsBoolExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BoolVariableExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBoolVariableExpression(LEILAParser.BoolVariableExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StrContainsExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStrContainsExpression(LEILAParser.StrContainsExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code GreaterThanExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitGreaterThanExpression(LEILAParser.GreaterThanExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code DefaultBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDefaultBoolExpression(LEILAParser.DefaultBoolExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumAsBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumAsBoolExpression(LEILAParser.NumAsBoolExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BoolCallStatementExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBoolCallStatementExpression(LEILAParser.BoolCallStatementExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code LessEqualExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLessEqualExpression(LEILAParser.LessEqualExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BoolParanthExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBoolParanthExpression(LEILAParser.BoolParanthExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code UnspecifiedBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUnspecifiedBoolExpression(LEILAParser.UnspecifiedBoolExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NegatedBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNegatedBoolExpression(LEILAParser.NegatedBoolExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BoolLiteralExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBoolLiteralExpression(LEILAParser.BoolLiteralExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BoolAndExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBoolAndExpression(LEILAParser.BoolAndExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code LessThanExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLessThanExpression(LEILAParser.LessThanExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code EqualsExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEqualsExpression(LEILAParser.EqualsExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumberExpression}
	 * labeled alternative in {@link LEILAParser#numOrStringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumberExpression(LEILAParser.NumberExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StringExpression}
	 * labeled alternative in {@link LEILAParser#numOrStringExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringExpression(LEILAParser.StringExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumVariableExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumVariableExpression(LEILAParser.NumVariableExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code LengthOfStringExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLengthOfStringExpression(LEILAParser.LengthOfStringExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StringToIntExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringToIntExpression(LEILAParser.StringToIntExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StringToFloatExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringToFloatExpression(LEILAParser.StringToFloatExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code TimerExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTimerExpression(LEILAParser.TimerExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumCallStatementExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumCallStatementExpression(LEILAParser.NumCallStatementExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumDivExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumDivExpression(LEILAParser.NumDivExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumLiteralExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumLiteralExpression(LEILAParser.NumLiteralExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BoolToIntExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBoolToIntExpression(LEILAParser.BoolToIntExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code DefaultNumExpr}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDefaultNumExpr(LEILAParser.DefaultNumExprContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumMinusExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumMinusExpression(LEILAParser.NumMinusExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumModExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumModExpression(LEILAParser.NumModExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumBrackets}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumBrackets(LEILAParser.NumBracketsContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumPlusExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumPlusExpression(LEILAParser.NumPlusExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code LengthOfListExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLengthOfListExpression(LEILAParser.LengthOfListExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumToFloatExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumToFloatExpression(LEILAParser.NumToFloatExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code UnspecifiedNumExpr}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUnspecifiedNumExpr(LEILAParser.UnspecifiedNumExprContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumToIntExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumToIntExpression(LEILAParser.NumToIntExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code IndexOfExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIndexOfExpression(LEILAParser.IndexOfExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumMulExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumMulExpression(LEILAParser.NumMulExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ListVariableExpression}
	 * labeled alternative in {@link LEILAParser#listExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitListVariableExpression(LEILAParser.ListVariableExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ListWithElementsExpression}
	 * labeled alternative in {@link LEILAParser#listExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitListWithElementsExpression(LEILAParser.ListWithElementsExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ActorVariableExpression}
	 * labeled alternative in {@link LEILAParser#actorExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitActorVariableExpression(LEILAParser.ActorVariableExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code LocateActorExpression}
	 * labeled alternative in {@link LEILAParser#actorExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLocateActorExpression(LEILAParser.LocateActorExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StartCloneActorExpression}
	 * labeled alternative in {@link LEILAParser#actorExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStartCloneActorExpression(LEILAParser.StartCloneActorExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code UsherActorExpression}
	 * labeled alternative in {@link LEILAParser#actorExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUsherActorExpression(LEILAParser.UsherActorExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpression(LEILAParser.ExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#unspecifiedExpr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUnspecifiedExpr(LEILAParser.UnspecifiedExprContext ctx);
	/**
	 * Visit a parse tree produced by the {@code FlatVariable}
	 * labeled alternative in {@link LEILAParser#variable}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFlatVariable(LEILAParser.FlatVariableContext ctx);
	/**
	 * Visit a parse tree produced by the {@code QualifiedVariable}
	 * labeled alternative in {@link LEILAParser#variable}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitQualifiedVariable(LEILAParser.QualifiedVariableContext ctx);
	/**
	 * Visit a parse tree produced by the {@code IdentExpression}
	 * labeled alternative in {@link LEILAParser#ident}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIdentExpression(LEILAParser.IdentExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StrIdentExpression}
	 * labeled alternative in {@link LEILAParser#ident}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStrIdentExpression(LEILAParser.StrIdentExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code IntegerLiteralExpression}
	 * labeled alternative in {@link LEILAParser#number}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIntegerLiteralExpression(LEILAParser.IntegerLiteralExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code DecimalLiteralExpression}
	 * labeled alternative in {@link LEILAParser#number}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDecimalLiteralExpression(LEILAParser.DecimalLiteralExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link LEILAParser#resourceLocator}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitResourceLocator(LEILAParser.ResourceLocatorContext ctx);
	/**
	 * Visit a parse tree produced by the {@code UserMessage}
	 * labeled alternative in {@link LEILAParser#message}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUserMessage(LEILAParser.UserMessageContext ctx);
	/**
	 * Visit a parse tree produced by the {@code SystemMessage}
	 * labeled alternative in {@link LEILAParser#message}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSystemMessage(LEILAParser.SystemMessageContext ctx);
}