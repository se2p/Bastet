// Generated from /Users/stahlbau/uni/develop/bastet-framework/src/bastet/syntax/parser/grammar/LEILA.g4 by ANTLR 4.8
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link LEILAParser}.
 */
public interface LEILAListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link LEILAParser#program}.
	 * @param ctx the parse tree
	 */
	void enterProgram(LEILAParser.ProgramContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#program}.
	 * @param ctx the parse tree
	 */
	void exitProgram(LEILAParser.ProgramContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#fileType}.
	 * @param ctx the parse tree
	 */
	void enterFileType(LEILAParser.FileTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#fileType}.
	 * @param ctx the parse tree
	 */
	void exitFileType(LEILAParser.FileTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#importDefinitionList}.
	 * @param ctx the parse tree
	 */
	void enterImportDefinitionList(LEILAParser.ImportDefinitionListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#importDefinitionList}.
	 * @param ctx the parse tree
	 */
	void exitImportDefinitionList(LEILAParser.ImportDefinitionListContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#importDefinition}.
	 * @param ctx the parse tree
	 */
	void enterImportDefinition(LEILAParser.ImportDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#importDefinition}.
	 * @param ctx the parse tree
	 */
	void exitImportDefinition(LEILAParser.ImportDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ImportSelectedActor}
	 * labeled alternative in {@link LEILAParser#importSelector}.
	 * @param ctx the parse tree
	 */
	void enterImportSelectedActor(LEILAParser.ImportSelectedActorContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ImportSelectedActor}
	 * labeled alternative in {@link LEILAParser#importSelector}.
	 * @param ctx the parse tree
	 */
	void exitImportSelectedActor(LEILAParser.ImportSelectedActorContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ImportAllActors}
	 * labeled alternative in {@link LEILAParser#importSelector}.
	 * @param ctx the parse tree
	 */
	void enterImportAllActors(LEILAParser.ImportAllActorsContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ImportAllActors}
	 * labeled alternative in {@link LEILAParser#importSelector}.
	 * @param ctx the parse tree
	 */
	void exitImportAllActors(LEILAParser.ImportAllActorsContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#actorDefinitionList}.
	 * @param ctx the parse tree
	 */
	void enterActorDefinitionList(LEILAParser.ActorDefinitionListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#actorDefinitionList}.
	 * @param ctx the parse tree
	 */
	void exitActorDefinitionList(LEILAParser.ActorDefinitionListContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#actorDefinition}.
	 * @param ctx the parse tree
	 */
	void enterActorDefinition(LEILAParser.ActorDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#actorDefinition}.
	 * @param ctx the parse tree
	 */
	void exitActorDefinition(LEILAParser.ActorDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#inheritsFrom}.
	 * @param ctx the parse tree
	 */
	void enterInheritsFrom(LEILAParser.InheritsFromContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#inheritsFrom}.
	 * @param ctx the parse tree
	 */
	void exitInheritsFrom(LEILAParser.InheritsFromContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ConcreteActorMode}
	 * labeled alternative in {@link LEILAParser#actorMode}.
	 * @param ctx the parse tree
	 */
	void enterConcreteActorMode(LEILAParser.ConcreteActorModeContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ConcreteActorMode}
	 * labeled alternative in {@link LEILAParser#actorMode}.
	 * @param ctx the parse tree
	 */
	void exitConcreteActorMode(LEILAParser.ConcreteActorModeContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ActorRoleMode}
	 * labeled alternative in {@link LEILAParser#actorMode}.
	 * @param ctx the parse tree
	 */
	void enterActorRoleMode(LEILAParser.ActorRoleModeContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ActorRoleMode}
	 * labeled alternative in {@link LEILAParser#actorMode}.
	 * @param ctx the parse tree
	 */
	void exitActorRoleMode(LEILAParser.ActorRoleModeContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#actorComponentsDefinition}.
	 * @param ctx the parse tree
	 */
	void enterActorComponentsDefinition(LEILAParser.ActorComponentsDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#actorComponentsDefinition}.
	 * @param ctx the parse tree
	 */
	void exitActorComponentsDefinition(LEILAParser.ActorComponentsDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#resource}.
	 * @param ctx the parse tree
	 */
	void enterResource(LEILAParser.ResourceContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#resource}.
	 * @param ctx the parse tree
	 */
	void exitResource(LEILAParser.ResourceContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ImageResource}
	 * labeled alternative in {@link LEILAParser#resourceType}.
	 * @param ctx the parse tree
	 */
	void enterImageResource(LEILAParser.ImageResourceContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ImageResource}
	 * labeled alternative in {@link LEILAParser#resourceType}.
	 * @param ctx the parse tree
	 */
	void exitImageResource(LEILAParser.ImageResourceContext ctx);
	/**
	 * Enter a parse tree produced by the {@code SoundResource}
	 * labeled alternative in {@link LEILAParser#resourceType}.
	 * @param ctx the parse tree
	 */
	void enterSoundResource(LEILAParser.SoundResourceContext ctx);
	/**
	 * Exit a parse tree produced by the {@code SoundResource}
	 * labeled alternative in {@link LEILAParser#resourceType}.
	 * @param ctx the parse tree
	 */
	void exitSoundResource(LEILAParser.SoundResourceContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#resourceList}.
	 * @param ctx the parse tree
	 */
	void enterResourceList(LEILAParser.ResourceListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#resourceList}.
	 * @param ctx the parse tree
	 */
	void exitResourceList(LEILAParser.ResourceListContext ctx);
	/**
	 * Enter a parse tree produced by the {@code DeclareVariable}
	 * labeled alternative in {@link LEILAParser#declarationStmt}.
	 * @param ctx the parse tree
	 */
	void enterDeclareVariable(LEILAParser.DeclareVariableContext ctx);
	/**
	 * Exit a parse tree produced by the {@code DeclareVariable}
	 * labeled alternative in {@link LEILAParser#declarationStmt}.
	 * @param ctx the parse tree
	 */
	void exitDeclareVariable(LEILAParser.DeclareVariableContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#declarationStmtList}.
	 * @param ctx the parse tree
	 */
	void enterDeclarationStmtList(LEILAParser.DeclarationStmtListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#declarationStmtList}.
	 * @param ctx the parse tree
	 */
	void exitDeclarationStmtList(LEILAParser.DeclarationStmtListContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ListType}
	 * labeled alternative in {@link LEILAParser#type}.
	 * @param ctx the parse tree
	 */
	void enterListType(LEILAParser.ListTypeContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ListType}
	 * labeled alternative in {@link LEILAParser#type}.
	 * @param ctx the parse tree
	 */
	void exitListType(LEILAParser.ListTypeContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ActorType}
	 * labeled alternative in {@link LEILAParser#type}.
	 * @param ctx the parse tree
	 */
	void enterActorType(LEILAParser.ActorTypeContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ActorType}
	 * labeled alternative in {@link LEILAParser#type}.
	 * @param ctx the parse tree
	 */
	void exitActorType(LEILAParser.ActorTypeContext ctx);
	/**
	 * Enter a parse tree produced by the {@code Primitive}
	 * labeled alternative in {@link LEILAParser#type}.
	 * @param ctx the parse tree
	 */
	void enterPrimitive(LEILAParser.PrimitiveContext ctx);
	/**
	 * Exit a parse tree produced by the {@code Primitive}
	 * labeled alternative in {@link LEILAParser#type}.
	 * @param ctx the parse tree
	 */
	void exitPrimitive(LEILAParser.PrimitiveContext ctx);
	/**
	 * Enter a parse tree produced by the {@code IntegerType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 */
	void enterIntegerType(LEILAParser.IntegerTypeContext ctx);
	/**
	 * Exit a parse tree produced by the {@code IntegerType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 */
	void exitIntegerType(LEILAParser.IntegerTypeContext ctx);
	/**
	 * Enter a parse tree produced by the {@code FloatingPointType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 */
	void enterFloatingPointType(LEILAParser.FloatingPointTypeContext ctx);
	/**
	 * Exit a parse tree produced by the {@code FloatingPointType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 */
	void exitFloatingPointType(LEILAParser.FloatingPointTypeContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BooleanType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 */
	void enterBooleanType(LEILAParser.BooleanTypeContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BooleanType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 */
	void exitBooleanType(LEILAParser.BooleanTypeContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StringType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 */
	void enterStringType(LEILAParser.StringTypeContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StringType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 */
	void exitStringType(LEILAParser.StringTypeContext ctx);
	/**
	 * Enter a parse tree produced by the {@code EnumType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 */
	void enterEnumType(LEILAParser.EnumTypeContext ctx);
	/**
	 * Exit a parse tree produced by the {@code EnumType}
	 * labeled alternative in {@link LEILAParser#primitiveType}.
	 * @param ctx the parse tree
	 */
	void exitEnumType(LEILAParser.EnumTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#script}.
	 * @param ctx the parse tree
	 */
	void enterScript(LEILAParser.ScriptContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#script}.
	 * @param ctx the parse tree
	 */
	void exitScript(LEILAParser.ScriptContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#scriptList}.
	 * @param ctx the parse tree
	 */
	void enterScriptList(LEILAParser.ScriptListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#scriptList}.
	 * @param ctx the parse tree
	 */
	void exitScriptList(LEILAParser.ScriptListContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#scriptAttributeList}.
	 * @param ctx the parse tree
	 */
	void enterScriptAttributeList(LEILAParser.ScriptAttributeListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#scriptAttributeList}.
	 * @param ctx the parse tree
	 */
	void exitScriptAttributeList(LEILAParser.ScriptAttributeListContext ctx);
	/**
	 * Enter a parse tree produced by the {@code RestartScript}
	 * labeled alternative in {@link LEILAParser#scriptAttribute}.
	 * @param ctx the parse tree
	 */
	void enterRestartScript(LEILAParser.RestartScriptContext ctx);
	/**
	 * Exit a parse tree produced by the {@code RestartScript}
	 * labeled alternative in {@link LEILAParser#scriptAttribute}.
	 * @param ctx the parse tree
	 */
	void exitRestartScript(LEILAParser.RestartScriptContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NeverEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void enterNeverEvent(LEILAParser.NeverEventContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NeverEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void exitNeverEvent(LEILAParser.NeverEventContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BootstapEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void enterBootstapEvent(LEILAParser.BootstapEventContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BootstapEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void exitBootstapEvent(LEILAParser.BootstapEventContext ctx);
	/**
	 * Enter a parse tree produced by the {@code AfterBootstrapMonitoringEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void enterAfterBootstrapMonitoringEvent(LEILAParser.AfterBootstrapMonitoringEventContext ctx);
	/**
	 * Exit a parse tree produced by the {@code AfterBootstrapMonitoringEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void exitAfterBootstrapMonitoringEvent(LEILAParser.AfterBootstrapMonitoringEventContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StartupEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void enterStartupEvent(LEILAParser.StartupEventContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StartupEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void exitStartupEvent(LEILAParser.StartupEventContext ctx);
	/**
	 * Enter a parse tree produced by the {@code CloneStartEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void enterCloneStartEvent(LEILAParser.CloneStartEventContext ctx);
	/**
	 * Exit a parse tree produced by the {@code CloneStartEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void exitCloneStartEvent(LEILAParser.CloneStartEventContext ctx);
	/**
	 * Enter a parse tree produced by the {@code MessageReceivedEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void enterMessageReceivedEvent(LEILAParser.MessageReceivedEventContext ctx);
	/**
	 * Exit a parse tree produced by the {@code MessageReceivedEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void exitMessageReceivedEvent(LEILAParser.MessageReceivedEventContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ConditionReachedEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void enterConditionReachedEvent(LEILAParser.ConditionReachedEventContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ConditionReachedEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void exitConditionReachedEvent(LEILAParser.ConditionReachedEventContext ctx);
	/**
	 * Enter a parse tree produced by the {@code RenderedMonitoringEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void enterRenderedMonitoringEvent(LEILAParser.RenderedMonitoringEventContext ctx);
	/**
	 * Exit a parse tree produced by the {@code RenderedMonitoringEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void exitRenderedMonitoringEvent(LEILAParser.RenderedMonitoringEventContext ctx);
	/**
	 * Enter a parse tree produced by the {@code AfterStatementMonitoringEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void enterAfterStatementMonitoringEvent(LEILAParser.AfterStatementMonitoringEventContext ctx);
	/**
	 * Exit a parse tree produced by the {@code AfterStatementMonitoringEvent}
	 * labeled alternative in {@link LEILAParser#event}.
	 * @param ctx the parse tree
	 */
	void exitAfterStatementMonitoringEvent(LEILAParser.AfterStatementMonitoringEventContext ctx);
	/**
	 * Enter a parse tree produced by the {@code MessageNameSpace}
	 * labeled alternative in {@link LEILAParser#messageNamespace}.
	 * @param ctx the parse tree
	 */
	void enterMessageNameSpace(LEILAParser.MessageNameSpaceContext ctx);
	/**
	 * Exit a parse tree produced by the {@code MessageNameSpace}
	 * labeled alternative in {@link LEILAParser#messageNamespace}.
	 * @param ctx the parse tree
	 */
	void exitMessageNameSpace(LEILAParser.MessageNameSpaceContext ctx);
	/**
	 * Enter a parse tree produced by the {@code GlobalNameSpace}
	 * labeled alternative in {@link LEILAParser#messageNamespace}.
	 * @param ctx the parse tree
	 */
	void enterGlobalNameSpace(LEILAParser.GlobalNameSpaceContext ctx);
	/**
	 * Exit a parse tree produced by the {@code GlobalNameSpace}
	 * labeled alternative in {@link LEILAParser#messageNamespace}.
	 * @param ctx the parse tree
	 */
	void exitGlobalNameSpace(LEILAParser.GlobalNameSpaceContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#methodDefinitionList}.
	 * @param ctx the parse tree
	 */
	void enterMethodDefinitionList(LEILAParser.MethodDefinitionListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#methodDefinitionList}.
	 * @param ctx the parse tree
	 */
	void exitMethodDefinitionList(LEILAParser.MethodDefinitionListContext ctx);
	/**
	 * Enter a parse tree produced by the {@code FullMethodDefinition}
	 * labeled alternative in {@link LEILAParser#methodDefinition}.
	 * @param ctx the parse tree
	 */
	void enterFullMethodDefinition(LEILAParser.FullMethodDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code FullMethodDefinition}
	 * labeled alternative in {@link LEILAParser#methodDefinition}.
	 * @param ctx the parse tree
	 */
	void exitFullMethodDefinition(LEILAParser.FullMethodDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ExternMethodDefinition}
	 * labeled alternative in {@link LEILAParser#methodDefinition}.
	 * @param ctx the parse tree
	 */
	void enterExternMethodDefinition(LEILAParser.ExternMethodDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ExternMethodDefinition}
	 * labeled alternative in {@link LEILAParser#methodDefinition}.
	 * @param ctx the parse tree
	 */
	void exitExternMethodDefinition(LEILAParser.ExternMethodDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code FunctionReturnDefinition}
	 * labeled alternative in {@link LEILAParser#methodResultDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterFunctionReturnDefinition(LEILAParser.FunctionReturnDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code FunctionReturnDefinition}
	 * labeled alternative in {@link LEILAParser#methodResultDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitFunctionReturnDefinition(LEILAParser.FunctionReturnDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code VoidReturnDefinition}
	 * labeled alternative in {@link LEILAParser#methodResultDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterVoidReturnDefinition(LEILAParser.VoidReturnDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code VoidReturnDefinition}
	 * labeled alternative in {@link LEILAParser#methodResultDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitVoidReturnDefinition(LEILAParser.VoidReturnDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ExternFunctionReturnDefinition}
	 * labeled alternative in {@link LEILAParser#externMethodResultDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterExternFunctionReturnDefinition(LEILAParser.ExternFunctionReturnDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ExternFunctionReturnDefinition}
	 * labeled alternative in {@link LEILAParser#externMethodResultDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitExternFunctionReturnDefinition(LEILAParser.ExternFunctionReturnDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ExternVoidReturnDefinition}
	 * labeled alternative in {@link LEILAParser#externMethodResultDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterExternVoidReturnDefinition(LEILAParser.ExternVoidReturnDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ExternVoidReturnDefinition}
	 * labeled alternative in {@link LEILAParser#externMethodResultDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitExternVoidReturnDefinition(LEILAParser.ExternVoidReturnDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#methodAttributeList}.
	 * @param ctx the parse tree
	 */
	void enterMethodAttributeList(LEILAParser.MethodAttributeListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#methodAttributeList}.
	 * @param ctx the parse tree
	 */
	void exitMethodAttributeList(LEILAParser.MethodAttributeListContext ctx);
	/**
	 * Enter a parse tree produced by the {@code AtomicMethod}
	 * labeled alternative in {@link LEILAParser#methodAttribute}.
	 * @param ctx the parse tree
	 */
	void enterAtomicMethod(LEILAParser.AtomicMethodContext ctx);
	/**
	 * Exit a parse tree produced by the {@code AtomicMethod}
	 * labeled alternative in {@link LEILAParser#methodAttribute}.
	 * @param ctx the parse tree
	 */
	void exitAtomicMethod(LEILAParser.AtomicMethodContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#parameter}.
	 * @param ctx the parse tree
	 */
	void enterParameter(LEILAParser.ParameterContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#parameter}.
	 * @param ctx the parse tree
	 */
	void exitParameter(LEILAParser.ParameterContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#parameterList}.
	 * @param ctx the parse tree
	 */
	void enterParameterList(LEILAParser.ParameterListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#parameterList}.
	 * @param ctx the parse tree
	 */
	void exitParameterList(LEILAParser.ParameterListContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#parameterListPlain}.
	 * @param ctx the parse tree
	 */
	void enterParameterListPlain(LEILAParser.ParameterListPlainContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#parameterListPlain}.
	 * @param ctx the parse tree
	 */
	void exitParameterListPlain(LEILAParser.ParameterListPlainContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#stmtList}.
	 * @param ctx the parse tree
	 */
	void enterStmtList(LEILAParser.StmtListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#stmtList}.
	 * @param ctx the parse tree
	 */
	void exitStmtList(LEILAParser.StmtListContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#atomicBlock}.
	 * @param ctx the parse tree
	 */
	void enterAtomicBlock(LEILAParser.AtomicBlockContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#atomicBlock}.
	 * @param ctx the parse tree
	 */
	void exitAtomicBlock(LEILAParser.AtomicBlockContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#stmtListPlain}.
	 * @param ctx the parse tree
	 */
	void enterStmtListPlain(LEILAParser.StmtListPlainContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#stmtListPlain}.
	 * @param ctx the parse tree
	 */
	void exitStmtListPlain(LEILAParser.StmtListPlainContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#controlStmt}.
	 * @param ctx the parse tree
	 */
	void enterControlStmt(LEILAParser.ControlStmtContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#controlStmt}.
	 * @param ctx the parse tree
	 */
	void exitControlStmt(LEILAParser.ControlStmtContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#ifStmt}.
	 * @param ctx the parse tree
	 */
	void enterIfStmt(LEILAParser.IfStmtContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#ifStmt}.
	 * @param ctx the parse tree
	 */
	void exitIfStmt(LEILAParser.IfStmtContext ctx);
	/**
	 * Enter a parse tree produced by the {@code PureElse}
	 * labeled alternative in {@link LEILAParser#elseCase}.
	 * @param ctx the parse tree
	 */
	void enterPureElse(LEILAParser.PureElseContext ctx);
	/**
	 * Exit a parse tree produced by the {@code PureElse}
	 * labeled alternative in {@link LEILAParser#elseCase}.
	 * @param ctx the parse tree
	 */
	void exitPureElse(LEILAParser.PureElseContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ElseIfCase}
	 * labeled alternative in {@link LEILAParser#elseCase}.
	 * @param ctx the parse tree
	 */
	void enterElseIfCase(LEILAParser.ElseIfCaseContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ElseIfCase}
	 * labeled alternative in {@link LEILAParser#elseCase}.
	 * @param ctx the parse tree
	 */
	void exitElseIfCase(LEILAParser.ElseIfCaseContext ctx);
	/**
	 * Enter a parse tree produced by the {@code EmptyElseCase}
	 * labeled alternative in {@link LEILAParser#elseCase}.
	 * @param ctx the parse tree
	 */
	void enterEmptyElseCase(LEILAParser.EmptyElseCaseContext ctx);
	/**
	 * Exit a parse tree produced by the {@code EmptyElseCase}
	 * labeled alternative in {@link LEILAParser#elseCase}.
	 * @param ctx the parse tree
	 */
	void exitEmptyElseCase(LEILAParser.EmptyElseCaseContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#untilStmt}.
	 * @param ctx the parse tree
	 */
	void enterUntilStmt(LEILAParser.UntilStmtContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#untilStmt}.
	 * @param ctx the parse tree
	 */
	void exitUntilStmt(LEILAParser.UntilStmtContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#repeatTimesStmt}.
	 * @param ctx the parse tree
	 */
	void enterRepeatTimesStmt(LEILAParser.RepeatTimesStmtContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#repeatTimesStmt}.
	 * @param ctx the parse tree
	 */
	void exitRepeatTimesStmt(LEILAParser.RepeatTimesStmtContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#repeatForeverStmt}.
	 * @param ctx the parse tree
	 */
	void enterRepeatForeverStmt(LEILAParser.RepeatForeverStmtContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#repeatForeverStmt}.
	 * @param ctx the parse tree
	 */
	void exitRepeatForeverStmt(LEILAParser.RepeatForeverStmtContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#callStmt}.
	 * @param ctx the parse tree
	 */
	void enterCallStmt(LEILAParser.CallStmtContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#callStmt}.
	 * @param ctx the parse tree
	 */
	void exitCallStmt(LEILAParser.CallStmtContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#expressionList}.
	 * @param ctx the parse tree
	 */
	void enterExpressionList(LEILAParser.ExpressionListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#expressionList}.
	 * @param ctx the parse tree
	 */
	void exitExpressionList(LEILAParser.ExpressionListContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#expressionListPlain}.
	 * @param ctx the parse tree
	 */
	void enterExpressionListPlain(LEILAParser.ExpressionListPlainContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#expressionListPlain}.
	 * @param ctx the parse tree
	 */
	void exitExpressionListPlain(LEILAParser.ExpressionListPlainContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#expressionStmt}.
	 * @param ctx the parse tree
	 */
	void enterExpressionStmt(LEILAParser.ExpressionStmtContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#expressionStmt}.
	 * @param ctx the parse tree
	 */
	void exitExpressionStmt(LEILAParser.ExpressionStmtContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ControlStatement}
	 * labeled alternative in {@link LEILAParser#stmt}.
	 * @param ctx the parse tree
	 */
	void enterControlStatement(LEILAParser.ControlStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ControlStatement}
	 * labeled alternative in {@link LEILAParser#stmt}.
	 * @param ctx the parse tree
	 */
	void exitControlStatement(LEILAParser.ControlStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NonControlStatement}
	 * labeled alternative in {@link LEILAParser#stmt}.
	 * @param ctx the parse tree
	 */
	void enterNonControlStatement(LEILAParser.NonControlStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NonControlStatement}
	 * labeled alternative in {@link LEILAParser#stmt}.
	 * @param ctx the parse tree
	 */
	void exitNonControlStatement(LEILAParser.NonControlStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code AtomicBlockStatement}
	 * labeled alternative in {@link LEILAParser#stmt}.
	 * @param ctx the parse tree
	 */
	void enterAtomicBlockStatement(LEILAParser.AtomicBlockStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code AtomicBlockStatement}
	 * labeled alternative in {@link LEILAParser#stmt}.
	 * @param ctx the parse tree
	 */
	void exitAtomicBlockStatement(LEILAParser.AtomicBlockStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code AttributedStatement}
	 * labeled alternative in {@link LEILAParser#stmt}.
	 * @param ctx the parse tree
	 */
	void enterAttributedStatement(LEILAParser.AttributedStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code AttributedStatement}
	 * labeled alternative in {@link LEILAParser#stmt}.
	 * @param ctx the parse tree
	 */
	void exitAttributedStatement(LEILAParser.AttributedStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#nonCtrlStmt}.
	 * @param ctx the parse tree
	 */
	void enterNonCtrlStmt(LEILAParser.NonCtrlStmtContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#nonCtrlStmt}.
	 * @param ctx the parse tree
	 */
	void exitNonCtrlStmt(LEILAParser.NonCtrlStmtContext ctx);
	/**
	 * Enter a parse tree produced by the {@code WaitSecsStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void enterWaitSecsStatement(LEILAParser.WaitSecsStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code WaitSecsStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void exitWaitSecsStatement(LEILAParser.WaitSecsStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code WaitUntilStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void enterWaitUntilStatement(LEILAParser.WaitUntilStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code WaitUntilStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void exitWaitUntilStatement(LEILAParser.WaitUntilStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StopOthersInActorStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void enterStopOthersInActorStatement(LEILAParser.StopOthersInActorStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StopOthersInActorStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void exitStopOthersInActorStatement(LEILAParser.StopOthersInActorStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code CreateCloneOfStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void enterCreateCloneOfStatement(LEILAParser.CreateCloneOfStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code CreateCloneOfStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void exitCreateCloneOfStatement(LEILAParser.CreateCloneOfStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BroadcastMessageStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void enterBroadcastMessageStatement(LEILAParser.BroadcastMessageStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BroadcastMessageStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void exitBroadcastMessageStatement(LEILAParser.BroadcastMessageStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BroadcastAndWaitStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void enterBroadcastAndWaitStatement(LEILAParser.BroadcastAndWaitStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BroadcastAndWaitStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void exitBroadcastAndWaitStatement(LEILAParser.BroadcastAndWaitStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ResetTimerStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void enterResetTimerStatement(LEILAParser.ResetTimerStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ResetTimerStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void exitResetTimerStatement(LEILAParser.ResetTimerStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code EpsilonStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void enterEpsilonStatement(LEILAParser.EpsilonStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code EpsilonStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void exitEpsilonStatement(LEILAParser.EpsilonStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code AssumeStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void enterAssumeStatement(LEILAParser.AssumeStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code AssumeStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void exitAssumeStatement(LEILAParser.AssumeStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code SetStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void enterSetStatement(LEILAParser.SetStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code SetStatement}
	 * labeled alternative in {@link LEILAParser#commonStmt}.
	 * @param ctx the parse tree
	 */
	void exitSetStatement(LEILAParser.SetStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code DeleteAllFromStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 */
	void enterDeleteAllFromStatement(LEILAParser.DeleteAllFromStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code DeleteAllFromStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 */
	void exitDeleteAllFromStatement(LEILAParser.DeleteAllFromStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code DeleteIthFromStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 */
	void enterDeleteIthFromStatement(LEILAParser.DeleteIthFromStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code DeleteIthFromStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 */
	void exitDeleteIthFromStatement(LEILAParser.DeleteIthFromStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code AddElementToStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 */
	void enterAddElementToStatement(LEILAParser.AddElementToStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code AddElementToStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 */
	void exitAddElementToStatement(LEILAParser.AddElementToStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code InsertAtStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 */
	void enterInsertAtStatement(LEILAParser.InsertAtStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code InsertAtStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 */
	void exitInsertAtStatement(LEILAParser.InsertAtStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ReplaceElementAtStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 */
	void enterReplaceElementAtStatement(LEILAParser.ReplaceElementAtStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ReplaceElementAtStatement}
	 * labeled alternative in {@link LEILAParser#listStmt}.
	 * @param ctx the parse tree
	 */
	void exitReplaceElementAtStatement(LEILAParser.ReplaceElementAtStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StoreEvalResultStatement}
	 * labeled alternative in {@link LEILAParser#setStmt}.
	 * @param ctx the parse tree
	 */
	void enterStoreEvalResultStatement(LEILAParser.StoreEvalResultStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StoreEvalResultStatement}
	 * labeled alternative in {@link LEILAParser#setStmt}.
	 * @param ctx the parse tree
	 */
	void exitStoreEvalResultStatement(LEILAParser.StoreEvalResultStatementContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StoreCallResultStatement}
	 * labeled alternative in {@link LEILAParser#setStmt}.
	 * @param ctx the parse tree
	 */
	void enterStoreCallResultStatement(LEILAParser.StoreCallResultStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StoreCallResultStatement}
	 * labeled alternative in {@link LEILAParser#setStmt}.
	 * @param ctx the parse tree
	 */
	void exitStoreCallResultStatement(LEILAParser.StoreCallResultStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#setStmtList}.
	 * @param ctx the parse tree
	 */
	void enterSetStmtList(LEILAParser.SetStmtListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#setStmtList}.
	 * @param ctx the parse tree
	 */
	void exitSetStmtList(LEILAParser.SetStmtListContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StopAll}
	 * labeled alternative in {@link LEILAParser#terminationStmt}.
	 * @param ctx the parse tree
	 */
	void enterStopAll(LEILAParser.StopAllContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StopAll}
	 * labeled alternative in {@link LEILAParser#terminationStmt}.
	 * @param ctx the parse tree
	 */
	void exitStopAll(LEILAParser.StopAllContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StopThis}
	 * labeled alternative in {@link LEILAParser#terminationStmt}.
	 * @param ctx the parse tree
	 */
	void enterStopThis(LEILAParser.StopThisContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StopThis}
	 * labeled alternative in {@link LEILAParser#terminationStmt}.
	 * @param ctx the parse tree
	 */
	void exitStopThis(LEILAParser.StopThisContext ctx);
	/**
	 * Enter a parse tree produced by the {@code DeleteThisClone}
	 * labeled alternative in {@link LEILAParser#terminationStmt}.
	 * @param ctx the parse tree
	 */
	void enterDeleteThisClone(LEILAParser.DeleteThisCloneContext ctx);
	/**
	 * Exit a parse tree produced by the {@code DeleteThisClone}
	 * labeled alternative in {@link LEILAParser#terminationStmt}.
	 * @param ctx the parse tree
	 */
	void exitDeleteThisClone(LEILAParser.DeleteThisCloneContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StringLiteralExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void enterStringLiteralExpression(LEILAParser.StringLiteralExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StringLiteralExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void exitStringLiteralExpression(LEILAParser.StringLiteralExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StringVariableExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void enterStringVariableExpression(LEILAParser.StringVariableExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StringVariableExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void exitStringVariableExpression(LEILAParser.StringVariableExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StringParanthExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void enterStringParanthExpression(LEILAParser.StringParanthExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StringParanthExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void exitStringParanthExpression(LEILAParser.StringParanthExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StringCallStatementExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void enterStringCallStatementExpression(LEILAParser.StringCallStatementExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StringCallStatementExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void exitStringCallStatementExpression(LEILAParser.StringCallStatementExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumAsStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumAsStringExpression(LEILAParser.NumAsStringExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumAsStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumAsStringExpression(LEILAParser.NumAsStringExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BoolAsStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void enterBoolAsStringExpression(LEILAParser.BoolAsStringExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BoolAsStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void exitBoolAsStringExpression(LEILAParser.BoolAsStringExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StringAttributeOfExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void enterStringAttributeOfExpression(LEILAParser.StringAttributeOfExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StringAttributeOfExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void exitStringAttributeOfExpression(LEILAParser.StringAttributeOfExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code JoinStringsExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void enterJoinStringsExpression(LEILAParser.JoinStringsExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code JoinStringsExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void exitJoinStringsExpression(LEILAParser.JoinStringsExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code IthLetterOfStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void enterIthLetterOfStringExpression(LEILAParser.IthLetterOfStringExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code IthLetterOfStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void exitIthLetterOfStringExpression(LEILAParser.IthLetterOfStringExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code IthStringItemOfExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void enterIthStringItemOfExpression(LEILAParser.IthStringItemOfExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code IthStringItemOfExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void exitIthStringItemOfExpression(LEILAParser.IthStringItemOfExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code DefaultStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void enterDefaultStringExpression(LEILAParser.DefaultStringExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code DefaultStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void exitDefaultStringExpression(LEILAParser.DefaultStringExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code UnspecifiedStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void enterUnspecifiedStringExpression(LEILAParser.UnspecifiedStringExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code UnspecifiedStringExpression}
	 * labeled alternative in {@link LEILAParser#stringExpr}.
	 * @param ctx the parse tree
	 */
	void exitUnspecifiedStringExpression(LEILAParser.UnspecifiedStringExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BoolOrExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterBoolOrExpression(LEILAParser.BoolOrExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BoolOrExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitBoolOrExpression(LEILAParser.BoolOrExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code GreaterEqualExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterGreaterEqualExpression(LEILAParser.GreaterEqualExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code GreaterEqualExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitGreaterEqualExpression(LEILAParser.GreaterEqualExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StringAsBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterStringAsBoolExpression(LEILAParser.StringAsBoolExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StringAsBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitStringAsBoolExpression(LEILAParser.StringAsBoolExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BoolVariableExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterBoolVariableExpression(LEILAParser.BoolVariableExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BoolVariableExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitBoolVariableExpression(LEILAParser.BoolVariableExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StrContainsExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterStrContainsExpression(LEILAParser.StrContainsExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StrContainsExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitStrContainsExpression(LEILAParser.StrContainsExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code GreaterThanExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterGreaterThanExpression(LEILAParser.GreaterThanExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code GreaterThanExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitGreaterThanExpression(LEILAParser.GreaterThanExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code DefaultBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterDefaultBoolExpression(LEILAParser.DefaultBoolExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code DefaultBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitDefaultBoolExpression(LEILAParser.DefaultBoolExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumAsBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumAsBoolExpression(LEILAParser.NumAsBoolExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumAsBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumAsBoolExpression(LEILAParser.NumAsBoolExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BoolCallStatementExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterBoolCallStatementExpression(LEILAParser.BoolCallStatementExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BoolCallStatementExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitBoolCallStatementExpression(LEILAParser.BoolCallStatementExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code LessEqualExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterLessEqualExpression(LEILAParser.LessEqualExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code LessEqualExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitLessEqualExpression(LEILAParser.LessEqualExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BoolParanthExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterBoolParanthExpression(LEILAParser.BoolParanthExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BoolParanthExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitBoolParanthExpression(LEILAParser.BoolParanthExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code UnspecifiedBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterUnspecifiedBoolExpression(LEILAParser.UnspecifiedBoolExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code UnspecifiedBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitUnspecifiedBoolExpression(LEILAParser.UnspecifiedBoolExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NegatedBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterNegatedBoolExpression(LEILAParser.NegatedBoolExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NegatedBoolExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitNegatedBoolExpression(LEILAParser.NegatedBoolExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BoolLiteralExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterBoolLiteralExpression(LEILAParser.BoolLiteralExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BoolLiteralExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitBoolLiteralExpression(LEILAParser.BoolLiteralExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BoolAndExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterBoolAndExpression(LEILAParser.BoolAndExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BoolAndExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitBoolAndExpression(LEILAParser.BoolAndExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code LessThanExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterLessThanExpression(LEILAParser.LessThanExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code LessThanExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitLessThanExpression(LEILAParser.LessThanExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code EqualsExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void enterEqualsExpression(LEILAParser.EqualsExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code EqualsExpression}
	 * labeled alternative in {@link LEILAParser#boolExpr}.
	 * @param ctx the parse tree
	 */
	void exitEqualsExpression(LEILAParser.EqualsExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumberExpression}
	 * labeled alternative in {@link LEILAParser#numOrStringExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumberExpression(LEILAParser.NumberExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumberExpression}
	 * labeled alternative in {@link LEILAParser#numOrStringExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumberExpression(LEILAParser.NumberExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StringExpression}
	 * labeled alternative in {@link LEILAParser#numOrStringExpr}.
	 * @param ctx the parse tree
	 */
	void enterStringExpression(LEILAParser.StringExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StringExpression}
	 * labeled alternative in {@link LEILAParser#numOrStringExpr}.
	 * @param ctx the parse tree
	 */
	void exitStringExpression(LEILAParser.StringExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumVariableExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumVariableExpression(LEILAParser.NumVariableExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumVariableExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumVariableExpression(LEILAParser.NumVariableExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code LengthOfStringExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterLengthOfStringExpression(LEILAParser.LengthOfStringExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code LengthOfStringExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitLengthOfStringExpression(LEILAParser.LengthOfStringExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StringToIntExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterStringToIntExpression(LEILAParser.StringToIntExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StringToIntExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitStringToIntExpression(LEILAParser.StringToIntExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StringToFloatExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterStringToFloatExpression(LEILAParser.StringToFloatExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StringToFloatExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitStringToFloatExpression(LEILAParser.StringToFloatExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code TimerExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterTimerExpression(LEILAParser.TimerExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code TimerExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitTimerExpression(LEILAParser.TimerExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumCallStatementExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumCallStatementExpression(LEILAParser.NumCallStatementExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumCallStatementExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumCallStatementExpression(LEILAParser.NumCallStatementExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumDivExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumDivExpression(LEILAParser.NumDivExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumDivExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumDivExpression(LEILAParser.NumDivExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumLiteralExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumLiteralExpression(LEILAParser.NumLiteralExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumLiteralExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumLiteralExpression(LEILAParser.NumLiteralExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BoolToIntExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterBoolToIntExpression(LEILAParser.BoolToIntExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BoolToIntExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitBoolToIntExpression(LEILAParser.BoolToIntExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code DefaultNumExpr}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterDefaultNumExpr(LEILAParser.DefaultNumExprContext ctx);
	/**
	 * Exit a parse tree produced by the {@code DefaultNumExpr}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitDefaultNumExpr(LEILAParser.DefaultNumExprContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumMinusExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumMinusExpression(LEILAParser.NumMinusExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumMinusExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumMinusExpression(LEILAParser.NumMinusExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumModExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumModExpression(LEILAParser.NumModExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumModExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumModExpression(LEILAParser.NumModExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumBrackets}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumBrackets(LEILAParser.NumBracketsContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumBrackets}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumBrackets(LEILAParser.NumBracketsContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumPlusExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumPlusExpression(LEILAParser.NumPlusExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumPlusExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumPlusExpression(LEILAParser.NumPlusExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code LengthOfListExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterLengthOfListExpression(LEILAParser.LengthOfListExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code LengthOfListExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitLengthOfListExpression(LEILAParser.LengthOfListExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumToFloatExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumToFloatExpression(LEILAParser.NumToFloatExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumToFloatExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumToFloatExpression(LEILAParser.NumToFloatExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code UnspecifiedNumExpr}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterUnspecifiedNumExpr(LEILAParser.UnspecifiedNumExprContext ctx);
	/**
	 * Exit a parse tree produced by the {@code UnspecifiedNumExpr}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitUnspecifiedNumExpr(LEILAParser.UnspecifiedNumExprContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumToIntExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumToIntExpression(LEILAParser.NumToIntExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumToIntExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumToIntExpression(LEILAParser.NumToIntExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code IndexOfExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterIndexOfExpression(LEILAParser.IndexOfExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code IndexOfExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitIndexOfExpression(LEILAParser.IndexOfExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumMulExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void enterNumMulExpression(LEILAParser.NumMulExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumMulExpression}
	 * labeled alternative in {@link LEILAParser#numExpr}.
	 * @param ctx the parse tree
	 */
	void exitNumMulExpression(LEILAParser.NumMulExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ListVariableExpression}
	 * labeled alternative in {@link LEILAParser#listExpr}.
	 * @param ctx the parse tree
	 */
	void enterListVariableExpression(LEILAParser.ListVariableExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ListVariableExpression}
	 * labeled alternative in {@link LEILAParser#listExpr}.
	 * @param ctx the parse tree
	 */
	void exitListVariableExpression(LEILAParser.ListVariableExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ListWithElementsExpression}
	 * labeled alternative in {@link LEILAParser#listExpr}.
	 * @param ctx the parse tree
	 */
	void enterListWithElementsExpression(LEILAParser.ListWithElementsExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ListWithElementsExpression}
	 * labeled alternative in {@link LEILAParser#listExpr}.
	 * @param ctx the parse tree
	 */
	void exitListWithElementsExpression(LEILAParser.ListWithElementsExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ActorVariableExpression}
	 * labeled alternative in {@link LEILAParser#actorExpr}.
	 * @param ctx the parse tree
	 */
	void enterActorVariableExpression(LEILAParser.ActorVariableExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ActorVariableExpression}
	 * labeled alternative in {@link LEILAParser#actorExpr}.
	 * @param ctx the parse tree
	 */
	void exitActorVariableExpression(LEILAParser.ActorVariableExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code LocateActorExpression}
	 * labeled alternative in {@link LEILAParser#actorExpr}.
	 * @param ctx the parse tree
	 */
	void enterLocateActorExpression(LEILAParser.LocateActorExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code LocateActorExpression}
	 * labeled alternative in {@link LEILAParser#actorExpr}.
	 * @param ctx the parse tree
	 */
	void exitLocateActorExpression(LEILAParser.LocateActorExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StartCloneActorExpression}
	 * labeled alternative in {@link LEILAParser#actorExpr}.
	 * @param ctx the parse tree
	 */
	void enterStartCloneActorExpression(LEILAParser.StartCloneActorExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StartCloneActorExpression}
	 * labeled alternative in {@link LEILAParser#actorExpr}.
	 * @param ctx the parse tree
	 */
	void exitStartCloneActorExpression(LEILAParser.StartCloneActorExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code UsherActorExpression}
	 * labeled alternative in {@link LEILAParser#actorExpr}.
	 * @param ctx the parse tree
	 */
	void enterUsherActorExpression(LEILAParser.UsherActorExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code UsherActorExpression}
	 * labeled alternative in {@link LEILAParser#actorExpr}.
	 * @param ctx the parse tree
	 */
	void exitUsherActorExpression(LEILAParser.UsherActorExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterExpression(LEILAParser.ExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitExpression(LEILAParser.ExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#unspecifiedExpr}.
	 * @param ctx the parse tree
	 */
	void enterUnspecifiedExpr(LEILAParser.UnspecifiedExprContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#unspecifiedExpr}.
	 * @param ctx the parse tree
	 */
	void exitUnspecifiedExpr(LEILAParser.UnspecifiedExprContext ctx);
	/**
	 * Enter a parse tree produced by the {@code FlatVariable}
	 * labeled alternative in {@link LEILAParser#variable}.
	 * @param ctx the parse tree
	 */
	void enterFlatVariable(LEILAParser.FlatVariableContext ctx);
	/**
	 * Exit a parse tree produced by the {@code FlatVariable}
	 * labeled alternative in {@link LEILAParser#variable}.
	 * @param ctx the parse tree
	 */
	void exitFlatVariable(LEILAParser.FlatVariableContext ctx);
	/**
	 * Enter a parse tree produced by the {@code QualifiedVariable}
	 * labeled alternative in {@link LEILAParser#variable}.
	 * @param ctx the parse tree
	 */
	void enterQualifiedVariable(LEILAParser.QualifiedVariableContext ctx);
	/**
	 * Exit a parse tree produced by the {@code QualifiedVariable}
	 * labeled alternative in {@link LEILAParser#variable}.
	 * @param ctx the parse tree
	 */
	void exitQualifiedVariable(LEILAParser.QualifiedVariableContext ctx);
	/**
	 * Enter a parse tree produced by the {@code IdentExpression}
	 * labeled alternative in {@link LEILAParser#ident}.
	 * @param ctx the parse tree
	 */
	void enterIdentExpression(LEILAParser.IdentExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code IdentExpression}
	 * labeled alternative in {@link LEILAParser#ident}.
	 * @param ctx the parse tree
	 */
	void exitIdentExpression(LEILAParser.IdentExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StrIdentExpression}
	 * labeled alternative in {@link LEILAParser#ident}.
	 * @param ctx the parse tree
	 */
	void enterStrIdentExpression(LEILAParser.StrIdentExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StrIdentExpression}
	 * labeled alternative in {@link LEILAParser#ident}.
	 * @param ctx the parse tree
	 */
	void exitStrIdentExpression(LEILAParser.StrIdentExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code IntegerLiteralExpression}
	 * labeled alternative in {@link LEILAParser#number}.
	 * @param ctx the parse tree
	 */
	void enterIntegerLiteralExpression(LEILAParser.IntegerLiteralExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code IntegerLiteralExpression}
	 * labeled alternative in {@link LEILAParser#number}.
	 * @param ctx the parse tree
	 */
	void exitIntegerLiteralExpression(LEILAParser.IntegerLiteralExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code DecimalLiteralExpression}
	 * labeled alternative in {@link LEILAParser#number}.
	 * @param ctx the parse tree
	 */
	void enterDecimalLiteralExpression(LEILAParser.DecimalLiteralExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code DecimalLiteralExpression}
	 * labeled alternative in {@link LEILAParser#number}.
	 * @param ctx the parse tree
	 */
	void exitDecimalLiteralExpression(LEILAParser.DecimalLiteralExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link LEILAParser#resourceLocator}.
	 * @param ctx the parse tree
	 */
	void enterResourceLocator(LEILAParser.ResourceLocatorContext ctx);
	/**
	 * Exit a parse tree produced by {@link LEILAParser#resourceLocator}.
	 * @param ctx the parse tree
	 */
	void exitResourceLocator(LEILAParser.ResourceLocatorContext ctx);
	/**
	 * Enter a parse tree produced by the {@code UserMessage}
	 * labeled alternative in {@link LEILAParser#message}.
	 * @param ctx the parse tree
	 */
	void enterUserMessage(LEILAParser.UserMessageContext ctx);
	/**
	 * Exit a parse tree produced by the {@code UserMessage}
	 * labeled alternative in {@link LEILAParser#message}.
	 * @param ctx the parse tree
	 */
	void exitUserMessage(LEILAParser.UserMessageContext ctx);
	/**
	 * Enter a parse tree produced by the {@code SystemMessage}
	 * labeled alternative in {@link LEILAParser#message}.
	 * @param ctx the parse tree
	 */
	void enterSystemMessage(LEILAParser.SystemMessageContext ctx);
	/**
	 * Exit a parse tree produced by the {@code SystemMessage}
	 * labeled alternative in {@link LEILAParser#message}.
	 * @param ctx the parse tree
	 */
	void exitSystemMessage(LEILAParser.SystemMessageContext ctx);
}