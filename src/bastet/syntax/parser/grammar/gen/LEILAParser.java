// Generated from /Users/stahlbau/uni/develop/bastet-framework/src/bastet/syntax/parser/grammar/LEILA.g4 by ANTLR 4.8
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class LEILAParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, T__20=21, T__21=22, T__22=23, T__23=24, 
		T__24=25, T__25=26, T__26=27, T__27=28, T__28=29, T__29=30, T__30=31, 
		T__31=32, T__32=33, T__33=34, T__34=35, T__35=36, T__36=37, T__37=38, 
		T__38=39, T__39=40, T__40=41, T__41=42, T__42=43, T__43=44, T__44=45, 
		T__45=46, T__46=47, T__47=48, T__48=49, T__49=50, T__50=51, T__51=52, 
		T__52=53, T__53=54, T__54=55, T__55=56, T__56=57, T__57=58, T__58=59, 
		T__59=60, T__60=61, T__61=62, T__62=63, T__63=64, T__64=65, T__65=66, 
		T__66=67, T__67=68, T__68=69, T__69=70, T__70=71, T__71=72, T__72=73, 
		T__73=74, T__74=75, T__75=76, T__76=77, T__77=78, T__78=79, T__79=80, 
		T__80=81, T__81=82, T__82=83, T__83=84, T__84=85, T__85=86, T__86=87, 
		T__87=88, T__88=89, T__89=90, T__90=91, T__91=92, T__92=93, T__93=94, 
		T__94=95, T__95=96, T__96=97, T__97=98, T__98=99, T__99=100, T__100=101, 
		T__101=102, T__102=103, T__103=104, T__104=105, Boolean=106, Bool=107, 
		String=108, Identifier=109, IntegerLiteral=110, DecimalLiteral=111, Whitespace=112, 
		Newline=113, BlockComment=114, LineComment=115;
	public static final int
		RULE_program = 0, RULE_fileType = 1, RULE_importDefinitionList = 2, RULE_importDefinition = 3, 
		RULE_importSelector = 4, RULE_actorDefinitionList = 5, RULE_actorDefinition = 6, 
		RULE_inheritsFrom = 7, RULE_actorMode = 8, RULE_actorComponentsDefinition = 9, 
		RULE_resource = 10, RULE_resourceType = 11, RULE_resourceList = 12, RULE_declarationStmt = 13, 
		RULE_declarationStmtList = 14, RULE_type = 15, RULE_primitiveType = 16, 
		RULE_script = 17, RULE_scriptList = 18, RULE_scriptAttributeList = 19, 
		RULE_scriptAttribute = 20, RULE_event = 21, RULE_messageNamespace = 22, 
		RULE_methodDefinitionList = 23, RULE_methodDefinition = 24, RULE_methodResultDeclaration = 25, 
		RULE_externMethodResultDeclaration = 26, RULE_methodAttributeList = 27, 
		RULE_methodAttribute = 28, RULE_parameter = 29, RULE_parameterList = 30, 
		RULE_parameterListPlain = 31, RULE_stmtList = 32, RULE_atomicBlock = 33, 
		RULE_stmtListPlain = 34, RULE_controlStmt = 35, RULE_ifStmt = 36, RULE_elseCase = 37, 
		RULE_untilStmt = 38, RULE_repeatTimesStmt = 39, RULE_repeatForeverStmt = 40, 
		RULE_callStmt = 41, RULE_expressionList = 42, RULE_expressionListPlain = 43, 
		RULE_expressionStmt = 44, RULE_stmt = 45, RULE_nonCtrlStmt = 46, RULE_commonStmt = 47, 
		RULE_listStmt = 48, RULE_setStmt = 49, RULE_setStmtList = 50, RULE_terminationStmt = 51, 
		RULE_stringExpr = 52, RULE_boolExpr = 53, RULE_numOrStringExpr = 54, RULE_numExpr = 55, 
		RULE_listExpr = 56, RULE_actorExpr = 57, RULE_expression = 58, RULE_unspecifiedExpr = 59, 
		RULE_variable = 60, RULE_ident = 61, RULE_number = 62, RULE_resourceLocator = 63, 
		RULE_message = 64;
	private static String[] makeRuleNames() {
		return new String[] {
			"program", "fileType", "importDefinitionList", "importDefinition", "importSelector", 
			"actorDefinitionList", "actorDefinition", "inheritsFrom", "actorMode", 
			"actorComponentsDefinition", "resource", "resourceType", "resourceList", 
			"declarationStmt", "declarationStmtList", "type", "primitiveType", "script", 
			"scriptList", "scriptAttributeList", "scriptAttribute", "event", "messageNamespace", 
			"methodDefinitionList", "methodDefinition", "methodResultDeclaration", 
			"externMethodResultDeclaration", "methodAttributeList", "methodAttribute", 
			"parameter", "parameterList", "parameterListPlain", "stmtList", "atomicBlock", 
			"stmtListPlain", "controlStmt", "ifStmt", "elseCase", "untilStmt", "repeatTimesStmt", 
			"repeatForeverStmt", "callStmt", "expressionList", "expressionListPlain", 
			"expressionStmt", "stmt", "nonCtrlStmt", "commonStmt", "listStmt", "setStmt", 
			"setStmtList", "terminationStmt", "stringExpr", "boolExpr", "numOrStringExpr", 
			"numExpr", "listExpr", "actorExpr", "expression", "unspecifiedExpr", 
			"variable", "ident", "number", "resourceLocator", "message"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'program'", "'module'", "'import'", "'from'", "'*'", "'begin'", 
			"'end'", "'is'", "','", "'actor'", "'role'", "'image'", "'sound'", "'declare'", 
			"'as'", "'list'", "'of'", "'int'", "'float'", "'boolean'", "'string'", 
			"'enum'", "'['", "']'", "'script'", "'on'", "'do'", "'restart'", "'never'", 
			"'bootstrap'", "'finished'", "'startup'", "'started'", "'clone'", "'message'", 
			"'condition'", "'rendered'", "'statement'", "'in'", "'define'", "'extern'", 
			"'returns'", "':'", "'atomic'", "'('", "')'", "'if'", "'then'", "'else'", 
			"'until'", "'repeat'", "'times'", "'forever'", "'evaluate'", "'@'", "'wait'", 
			"'seconds'", "'stop'", "'other'", "'scripts'", "'create'", "'broadcast'", 
			"'and'", "'reset'", "'timer'", "'epsilon'", "'assume'", "'delete'", "'all'", 
			"'add'", "'to'", "'insert'", "'at'", "'replace'", "'item'", "'by'", "'this'", 
			"'cast'", "'attribute'", "'join'", "'letter'", "'default'", "'for'", 
			"'?string'", "'not'", "'or'", "'>='", "'>'", "'<'", "'<='", "'='", "'contains'", 
			"'?bool'", "'length'", "'index'", "'/'", "'mod'", "'+'", "'-'", "'?number'", 
			"'locate'", "'start'", "'?expr'", "'.'", "'strid'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, "Boolean", 
			"Bool", "String", "Identifier", "IntegerLiteral", "DecimalLiteral", "Whitespace", 
			"Newline", "BlockComment", "LineComment"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "LEILA.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public LEILAParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class ProgramContext extends ParserRuleContext {
		public FileTypeContext fileType() {
			return getRuleContext(FileTypeContext.class,0);
		}
		public IdentContext ident() {
			return getRuleContext(IdentContext.class,0);
		}
		public ImportDefinitionListContext importDefinitionList() {
			return getRuleContext(ImportDefinitionListContext.class,0);
		}
		public ActorDefinitionListContext actorDefinitionList() {
			return getRuleContext(ActorDefinitionListContext.class,0);
		}
		public TerminalNode EOF() { return getToken(LEILAParser.EOF, 0); }
		public ProgramContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_program; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterProgram(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitProgram(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitProgram(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ProgramContext program() throws RecognitionException {
		ProgramContext _localctx = new ProgramContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_program);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(130);
			fileType();
			setState(131);
			ident();
			setState(132);
			importDefinitionList();
			setState(133);
			actorDefinitionList();
			setState(134);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FileTypeContext extends ParserRuleContext {
		public FileTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_fileType; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterFileType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitFileType(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitFileType(this);
			else return visitor.visitChildren(this);
		}
	}

	public final FileTypeContext fileType() throws RecognitionException {
		FileTypeContext _localctx = new FileTypeContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_fileType);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(136);
			_la = _input.LA(1);
			if ( !(_la==T__0 || _la==T__1) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ImportDefinitionListContext extends ParserRuleContext {
		public List<ImportDefinitionContext> importDefinition() {
			return getRuleContexts(ImportDefinitionContext.class);
		}
		public ImportDefinitionContext importDefinition(int i) {
			return getRuleContext(ImportDefinitionContext.class,i);
		}
		public ImportDefinitionListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_importDefinitionList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterImportDefinitionList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitImportDefinitionList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitImportDefinitionList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ImportDefinitionListContext importDefinitionList() throws RecognitionException {
		ImportDefinitionListContext _localctx = new ImportDefinitionListContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_importDefinitionList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(141);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__2) {
				{
				{
				setState(138);
				importDefinition();
				}
				}
				setState(143);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ImportDefinitionContext extends ParserRuleContext {
		public ImportSelectorContext importSelector() {
			return getRuleContext(ImportSelectorContext.class,0);
		}
		public ResourceLocatorContext resourceLocator() {
			return getRuleContext(ResourceLocatorContext.class,0);
		}
		public ImportDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_importDefinition; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterImportDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitImportDefinition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitImportDefinition(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ImportDefinitionContext importDefinition() throws RecognitionException {
		ImportDefinitionContext _localctx = new ImportDefinitionContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_importDefinition);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(144);
			match(T__2);
			setState(145);
			importSelector();
			setState(146);
			match(T__3);
			setState(147);
			resourceLocator();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ImportSelectorContext extends ParserRuleContext {
		public ImportSelectorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_importSelector; }
	 
		public ImportSelectorContext() { }
		public void copyFrom(ImportSelectorContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class ImportAllActorsContext extends ImportSelectorContext {
		public ImportAllActorsContext(ImportSelectorContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterImportAllActors(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitImportAllActors(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitImportAllActors(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class ImportSelectedActorContext extends ImportSelectorContext {
		public IdentContext ident() {
			return getRuleContext(IdentContext.class,0);
		}
		public ImportSelectedActorContext(ImportSelectorContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterImportSelectedActor(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitImportSelectedActor(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitImportSelectedActor(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ImportSelectorContext importSelector() throws RecognitionException {
		ImportSelectorContext _localctx = new ImportSelectorContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_importSelector);
		try {
			setState(151);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__104:
			case Identifier:
				_localctx = new ImportSelectedActorContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(149);
				ident();
				}
				break;
			case T__4:
				_localctx = new ImportAllActorsContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(150);
				match(T__4);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ActorDefinitionListContext extends ParserRuleContext {
		public List<ActorDefinitionContext> actorDefinition() {
			return getRuleContexts(ActorDefinitionContext.class);
		}
		public ActorDefinitionContext actorDefinition(int i) {
			return getRuleContext(ActorDefinitionContext.class,i);
		}
		public ActorDefinitionListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_actorDefinitionList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterActorDefinitionList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitActorDefinitionList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitActorDefinitionList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ActorDefinitionListContext actorDefinitionList() throws RecognitionException {
		ActorDefinitionListContext _localctx = new ActorDefinitionListContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_actorDefinitionList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(156);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__9 || _la==T__10) {
				{
				{
				setState(153);
				actorDefinition();
				}
				}
				setState(158);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ActorDefinitionContext extends ParserRuleContext {
		public ActorModeContext actorMode() {
			return getRuleContext(ActorModeContext.class,0);
		}
		public IdentContext ident() {
			return getRuleContext(IdentContext.class,0);
		}
		public InheritsFromContext inheritsFrom() {
			return getRuleContext(InheritsFromContext.class,0);
		}
		public ActorComponentsDefinitionContext actorComponentsDefinition() {
			return getRuleContext(ActorComponentsDefinitionContext.class,0);
		}
		public ActorDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_actorDefinition; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterActorDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitActorDefinition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitActorDefinition(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ActorDefinitionContext actorDefinition() throws RecognitionException {
		ActorDefinitionContext _localctx = new ActorDefinitionContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_actorDefinition);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(159);
			actorMode();
			setState(160);
			ident();
			setState(161);
			inheritsFrom();
			setState(162);
			match(T__5);
			setState(163);
			actorComponentsDefinition();
			setState(164);
			match(T__6);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class InheritsFromContext extends ParserRuleContext {
		public List<IdentContext> ident() {
			return getRuleContexts(IdentContext.class);
		}
		public IdentContext ident(int i) {
			return getRuleContext(IdentContext.class,i);
		}
		public InheritsFromContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_inheritsFrom; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterInheritsFrom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitInheritsFrom(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitInheritsFrom(this);
			else return visitor.visitChildren(this);
		}
	}

	public final InheritsFromContext inheritsFrom() throws RecognitionException {
		InheritsFromContext _localctx = new InheritsFromContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_inheritsFrom);
		int _la;
		try {
			setState(176);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__7:
				enterOuterAlt(_localctx, 1);
				{
				setState(166);
				match(T__7);
				setState(167);
				ident();
				setState(172);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__8) {
					{
					{
					setState(168);
					match(T__8);
					setState(169);
					ident();
					}
					}
					setState(174);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				break;
			case T__5:
				enterOuterAlt(_localctx, 2);
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ActorModeContext extends ParserRuleContext {
		public ActorModeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_actorMode; }
	 
		public ActorModeContext() { }
		public void copyFrom(ActorModeContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class ActorRoleModeContext extends ActorModeContext {
		public ActorRoleModeContext(ActorModeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterActorRoleMode(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitActorRoleMode(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitActorRoleMode(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class ConcreteActorModeContext extends ActorModeContext {
		public ConcreteActorModeContext(ActorModeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterConcreteActorMode(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitConcreteActorMode(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitConcreteActorMode(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ActorModeContext actorMode() throws RecognitionException {
		ActorModeContext _localctx = new ActorModeContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_actorMode);
		try {
			setState(180);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__9:
				_localctx = new ConcreteActorModeContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(178);
				match(T__9);
				}
				break;
			case T__10:
				_localctx = new ActorRoleModeContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(179);
				match(T__10);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ActorComponentsDefinitionContext extends ParserRuleContext {
		public ResourceListContext resourceList() {
			return getRuleContext(ResourceListContext.class,0);
		}
		public DeclarationStmtListContext declarationStmtList() {
			return getRuleContext(DeclarationStmtListContext.class,0);
		}
		public SetStmtListContext setStmtList() {
			return getRuleContext(SetStmtListContext.class,0);
		}
		public MethodDefinitionListContext methodDefinitionList() {
			return getRuleContext(MethodDefinitionListContext.class,0);
		}
		public ScriptListContext scriptList() {
			return getRuleContext(ScriptListContext.class,0);
		}
		public ActorComponentsDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_actorComponentsDefinition; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterActorComponentsDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitActorComponentsDefinition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitActorComponentsDefinition(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ActorComponentsDefinitionContext actorComponentsDefinition() throws RecognitionException {
		ActorComponentsDefinitionContext _localctx = new ActorComponentsDefinitionContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_actorComponentsDefinition);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(182);
			resourceList();
			setState(183);
			declarationStmtList();
			setState(184);
			setStmtList();
			setState(185);
			methodDefinitionList();
			setState(186);
			scriptList();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ResourceContext extends ParserRuleContext {
		public ResourceTypeContext resourceType() {
			return getRuleContext(ResourceTypeContext.class,0);
		}
		public IdentContext ident() {
			return getRuleContext(IdentContext.class,0);
		}
		public ResourceLocatorContext resourceLocator() {
			return getRuleContext(ResourceLocatorContext.class,0);
		}
		public ResourceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_resource; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterResource(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitResource(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitResource(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ResourceContext resource() throws RecognitionException {
		ResourceContext _localctx = new ResourceContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_resource);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(188);
			resourceType();
			setState(189);
			ident();
			setState(190);
			resourceLocator();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ResourceTypeContext extends ParserRuleContext {
		public ResourceTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_resourceType; }
	 
		public ResourceTypeContext() { }
		public void copyFrom(ResourceTypeContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class ImageResourceContext extends ResourceTypeContext {
		public ImageResourceContext(ResourceTypeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterImageResource(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitImageResource(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitImageResource(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class SoundResourceContext extends ResourceTypeContext {
		public SoundResourceContext(ResourceTypeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterSoundResource(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitSoundResource(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitSoundResource(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ResourceTypeContext resourceType() throws RecognitionException {
		ResourceTypeContext _localctx = new ResourceTypeContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_resourceType);
		try {
			setState(194);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__11:
				_localctx = new ImageResourceContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(192);
				match(T__11);
				}
				break;
			case T__12:
				_localctx = new SoundResourceContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(193);
				match(T__12);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ResourceListContext extends ParserRuleContext {
		public List<ResourceContext> resource() {
			return getRuleContexts(ResourceContext.class);
		}
		public ResourceContext resource(int i) {
			return getRuleContext(ResourceContext.class,i);
		}
		public ResourceListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_resourceList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterResourceList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitResourceList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitResourceList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ResourceListContext resourceList() throws RecognitionException {
		ResourceListContext _localctx = new ResourceListContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_resourceList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(199);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__11 || _la==T__12) {
				{
				{
				setState(196);
				resource();
				}
				}
				setState(201);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DeclarationStmtContext extends ParserRuleContext {
		public DeclarationStmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_declarationStmt; }
	 
		public DeclarationStmtContext() { }
		public void copyFrom(DeclarationStmtContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class DeclareVariableContext extends DeclarationStmtContext {
		public IdentContext ident() {
			return getRuleContext(IdentContext.class,0);
		}
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public DeclareVariableContext(DeclarationStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterDeclareVariable(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitDeclareVariable(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitDeclareVariable(this);
			else return visitor.visitChildren(this);
		}
	}

	public final DeclarationStmtContext declarationStmt() throws RecognitionException {
		DeclarationStmtContext _localctx = new DeclarationStmtContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_declarationStmt);
		try {
			_localctx = new DeclareVariableContext(_localctx);
			enterOuterAlt(_localctx, 1);
			{
			setState(202);
			match(T__13);
			setState(203);
			ident();
			setState(204);
			match(T__14);
			setState(205);
			type();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DeclarationStmtListContext extends ParserRuleContext {
		public List<DeclarationStmtContext> declarationStmt() {
			return getRuleContexts(DeclarationStmtContext.class);
		}
		public DeclarationStmtContext declarationStmt(int i) {
			return getRuleContext(DeclarationStmtContext.class,i);
		}
		public DeclarationStmtListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_declarationStmtList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterDeclarationStmtList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitDeclarationStmtList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitDeclarationStmtList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final DeclarationStmtListContext declarationStmtList() throws RecognitionException {
		DeclarationStmtListContext _localctx = new DeclarationStmtListContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_declarationStmtList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(210);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__13) {
				{
				{
				setState(207);
				declarationStmt();
				}
				}
				setState(212);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TypeContext extends ParserRuleContext {
		public TypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_type; }
	 
		public TypeContext() { }
		public void copyFrom(TypeContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class ActorTypeContext extends TypeContext {
		public ActorTypeContext(TypeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterActorType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitActorType(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitActorType(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class PrimitiveContext extends TypeContext {
		public PrimitiveTypeContext primitiveType() {
			return getRuleContext(PrimitiveTypeContext.class,0);
		}
		public PrimitiveContext(TypeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterPrimitive(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitPrimitive(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitPrimitive(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class ListTypeContext extends TypeContext {
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public ListTypeContext(TypeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterListType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitListType(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitListType(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TypeContext type() throws RecognitionException {
		TypeContext _localctx = new TypeContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_type);
		try {
			setState(218);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__15:
				_localctx = new ListTypeContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(213);
				match(T__15);
				setState(214);
				match(T__16);
				setState(215);
				type();
				}
				break;
			case T__9:
				_localctx = new ActorTypeContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(216);
				match(T__9);
				}
				break;
			case T__17:
			case T__18:
			case T__19:
			case T__20:
			case T__21:
				_localctx = new PrimitiveContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(217);
				primitiveType();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PrimitiveTypeContext extends ParserRuleContext {
		public PrimitiveTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_primitiveType; }
	 
		public PrimitiveTypeContext() { }
		public void copyFrom(PrimitiveTypeContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class IntegerTypeContext extends PrimitiveTypeContext {
		public IntegerTypeContext(PrimitiveTypeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterIntegerType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitIntegerType(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitIntegerType(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StringTypeContext extends PrimitiveTypeContext {
		public StringTypeContext(PrimitiveTypeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStringType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStringType(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStringType(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class EnumTypeContext extends PrimitiveTypeContext {
		public ExpressionListPlainContext expressionListPlain() {
			return getRuleContext(ExpressionListPlainContext.class,0);
		}
		public EnumTypeContext(PrimitiveTypeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterEnumType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitEnumType(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitEnumType(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class BooleanTypeContext extends PrimitiveTypeContext {
		public BooleanTypeContext(PrimitiveTypeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterBooleanType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitBooleanType(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitBooleanType(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class FloatingPointTypeContext extends PrimitiveTypeContext {
		public FloatingPointTypeContext(PrimitiveTypeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterFloatingPointType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitFloatingPointType(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitFloatingPointType(this);
			else return visitor.visitChildren(this);
		}
	}

	public final PrimitiveTypeContext primitiveType() throws RecognitionException {
		PrimitiveTypeContext _localctx = new PrimitiveTypeContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_primitiveType);
		try {
			setState(229);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__17:
				_localctx = new IntegerTypeContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(220);
				match(T__17);
				}
				break;
			case T__18:
				_localctx = new FloatingPointTypeContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(221);
				match(T__18);
				}
				break;
			case T__19:
				_localctx = new BooleanTypeContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(222);
				match(T__19);
				}
				break;
			case T__20:
				_localctx = new StringTypeContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(223);
				match(T__20);
				}
				break;
			case T__21:
				_localctx = new EnumTypeContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(224);
				match(T__21);
				setState(225);
				match(T__22);
				setState(226);
				expressionListPlain();
				setState(227);
				match(T__23);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ScriptContext extends ParserRuleContext {
		public EventContext event() {
			return getRuleContext(EventContext.class,0);
		}
		public ScriptAttributeListContext scriptAttributeList() {
			return getRuleContext(ScriptAttributeListContext.class,0);
		}
		public StmtListContext stmtList() {
			return getRuleContext(StmtListContext.class,0);
		}
		public ScriptContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_script; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterScript(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitScript(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitScript(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ScriptContext script() throws RecognitionException {
		ScriptContext _localctx = new ScriptContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_script);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(231);
			match(T__24);
			setState(232);
			match(T__25);
			setState(233);
			event();
			setState(234);
			match(T__26);
			setState(235);
			scriptAttributeList();
			setState(236);
			stmtList();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ScriptListContext extends ParserRuleContext {
		public List<ScriptContext> script() {
			return getRuleContexts(ScriptContext.class);
		}
		public ScriptContext script(int i) {
			return getRuleContext(ScriptContext.class,i);
		}
		public ScriptListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_scriptList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterScriptList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitScriptList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitScriptList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ScriptListContext scriptList() throws RecognitionException {
		ScriptListContext _localctx = new ScriptListContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_scriptList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(241);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__24) {
				{
				{
				setState(238);
				script();
				}
				}
				setState(243);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ScriptAttributeListContext extends ParserRuleContext {
		public List<ScriptAttributeContext> scriptAttribute() {
			return getRuleContexts(ScriptAttributeContext.class);
		}
		public ScriptAttributeContext scriptAttribute(int i) {
			return getRuleContext(ScriptAttributeContext.class,i);
		}
		public ScriptAttributeListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_scriptAttributeList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterScriptAttributeList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitScriptAttributeList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitScriptAttributeList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ScriptAttributeListContext scriptAttributeList() throws RecognitionException {
		ScriptAttributeListContext _localctx = new ScriptAttributeListContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_scriptAttributeList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(247);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__27) {
				{
				{
				setState(244);
				scriptAttribute();
				}
				}
				setState(249);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ScriptAttributeContext extends ParserRuleContext {
		public ScriptAttributeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_scriptAttribute; }
	 
		public ScriptAttributeContext() { }
		public void copyFrom(ScriptAttributeContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class RestartScriptContext extends ScriptAttributeContext {
		public RestartScriptContext(ScriptAttributeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterRestartScript(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitRestartScript(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitRestartScript(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ScriptAttributeContext scriptAttribute() throws RecognitionException {
		ScriptAttributeContext _localctx = new ScriptAttributeContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_scriptAttribute);
		try {
			_localctx = new RestartScriptContext(_localctx);
			enterOuterAlt(_localctx, 1);
			{
			setState(250);
			match(T__27);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EventContext extends ParserRuleContext {
		public EventContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_event; }
	 
		public EventContext() { }
		public void copyFrom(EventContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class NeverEventContext extends EventContext {
		public NeverEventContext(EventContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNeverEvent(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNeverEvent(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNeverEvent(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class AfterBootstrapMonitoringEventContext extends EventContext {
		public AfterBootstrapMonitoringEventContext(EventContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterAfterBootstrapMonitoringEvent(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitAfterBootstrapMonitoringEvent(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitAfterBootstrapMonitoringEvent(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StartupEventContext extends EventContext {
		public StartupEventContext(EventContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStartupEvent(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStartupEvent(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStartupEvent(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class ConditionReachedEventContext extends EventContext {
		public BoolExprContext boolExpr() {
			return getRuleContext(BoolExprContext.class,0);
		}
		public ConditionReachedEventContext(EventContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterConditionReachedEvent(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitConditionReachedEvent(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitConditionReachedEvent(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class RenderedMonitoringEventContext extends EventContext {
		public RenderedMonitoringEventContext(EventContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterRenderedMonitoringEvent(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitRenderedMonitoringEvent(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitRenderedMonitoringEvent(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class CloneStartEventContext extends EventContext {
		public CloneStartEventContext(EventContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterCloneStartEvent(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitCloneStartEvent(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitCloneStartEvent(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class BootstapEventContext extends EventContext {
		public BootstapEventContext(EventContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterBootstapEvent(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitBootstapEvent(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitBootstapEvent(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class AfterStatementMonitoringEventContext extends EventContext {
		public AfterStatementMonitoringEventContext(EventContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterAfterStatementMonitoringEvent(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitAfterStatementMonitoringEvent(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitAfterStatementMonitoringEvent(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class MessageReceivedEventContext extends EventContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public ParameterListContext parameterList() {
			return getRuleContext(ParameterListContext.class,0);
		}
		public MessageNamespaceContext messageNamespace() {
			return getRuleContext(MessageNamespaceContext.class,0);
		}
		public MessageReceivedEventContext(EventContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterMessageReceivedEvent(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitMessageReceivedEvent(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitMessageReceivedEvent(this);
			else return visitor.visitChildren(this);
		}
	}

	public final EventContext event() throws RecognitionException {
		EventContext _localctx = new EventContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_event);
		try {
			setState(270);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,13,_ctx) ) {
			case 1:
				_localctx = new NeverEventContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(252);
				match(T__28);
				}
				break;
			case 2:
				_localctx = new BootstapEventContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(253);
				match(T__29);
				}
				break;
			case 3:
				_localctx = new AfterBootstrapMonitoringEventContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(254);
				match(T__29);
				setState(255);
				match(T__30);
				}
				break;
			case 4:
				_localctx = new StartupEventContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(256);
				match(T__31);
				}
				break;
			case 5:
				_localctx = new CloneStartEventContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(257);
				match(T__32);
				setState(258);
				match(T__14);
				setState(259);
				match(T__33);
				}
				break;
			case 6:
				_localctx = new MessageReceivedEventContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(260);
				match(T__34);
				setState(261);
				stringExpr();
				setState(262);
				parameterList();
				setState(263);
				messageNamespace();
				}
				break;
			case 7:
				_localctx = new ConditionReachedEventContext(_localctx);
				enterOuterAlt(_localctx, 7);
				{
				setState(265);
				match(T__35);
				setState(266);
				boolExpr(0);
				}
				break;
			case 8:
				_localctx = new RenderedMonitoringEventContext(_localctx);
				enterOuterAlt(_localctx, 8);
				{
				setState(267);
				match(T__36);
				}
				break;
			case 9:
				_localctx = new AfterStatementMonitoringEventContext(_localctx);
				enterOuterAlt(_localctx, 9);
				{
				setState(268);
				match(T__37);
				setState(269);
				match(T__30);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MessageNamespaceContext extends ParserRuleContext {
		public MessageNamespaceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_messageNamespace; }
	 
		public MessageNamespaceContext() { }
		public void copyFrom(MessageNamespaceContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class MessageNameSpaceContext extends MessageNamespaceContext {
		public TerminalNode String() { return getToken(LEILAParser.String, 0); }
		public MessageNameSpaceContext(MessageNamespaceContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterMessageNameSpace(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitMessageNameSpace(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitMessageNameSpace(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class GlobalNameSpaceContext extends MessageNamespaceContext {
		public GlobalNameSpaceContext(MessageNamespaceContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterGlobalNameSpace(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitGlobalNameSpace(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitGlobalNameSpace(this);
			else return visitor.visitChildren(this);
		}
	}

	public final MessageNamespaceContext messageNamespace() throws RecognitionException {
		MessageNamespaceContext _localctx = new MessageNamespaceContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_messageNamespace);
		try {
			setState(275);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__38:
				_localctx = new MessageNameSpaceContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(272);
				match(T__38);
				setState(273);
				match(String);
				}
				break;
			case T__26:
				_localctx = new GlobalNameSpaceContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MethodDefinitionListContext extends ParserRuleContext {
		public List<MethodDefinitionContext> methodDefinition() {
			return getRuleContexts(MethodDefinitionContext.class);
		}
		public MethodDefinitionContext methodDefinition(int i) {
			return getRuleContext(MethodDefinitionContext.class,i);
		}
		public MethodDefinitionListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_methodDefinitionList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterMethodDefinitionList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitMethodDefinitionList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitMethodDefinitionList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final MethodDefinitionListContext methodDefinitionList() throws RecognitionException {
		MethodDefinitionListContext _localctx = new MethodDefinitionListContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_methodDefinitionList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(280);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__39 || _la==T__40) {
				{
				{
				setState(277);
				methodDefinition();
				}
				}
				setState(282);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MethodDefinitionContext extends ParserRuleContext {
		public MethodDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_methodDefinition; }
	 
		public MethodDefinitionContext() { }
		public void copyFrom(MethodDefinitionContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class FullMethodDefinitionContext extends MethodDefinitionContext {
		public MethodAttributeListContext methodAttributeList() {
			return getRuleContext(MethodAttributeListContext.class,0);
		}
		public IdentContext ident() {
			return getRuleContext(IdentContext.class,0);
		}
		public ParameterListContext parameterList() {
			return getRuleContext(ParameterListContext.class,0);
		}
		public StmtListContext stmtList() {
			return getRuleContext(StmtListContext.class,0);
		}
		public MethodResultDeclarationContext methodResultDeclaration() {
			return getRuleContext(MethodResultDeclarationContext.class,0);
		}
		public FullMethodDefinitionContext(MethodDefinitionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterFullMethodDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitFullMethodDefinition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitFullMethodDefinition(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class ExternMethodDefinitionContext extends MethodDefinitionContext {
		public IdentContext ident() {
			return getRuleContext(IdentContext.class,0);
		}
		public ParameterListContext parameterList() {
			return getRuleContext(ParameterListContext.class,0);
		}
		public ExternMethodResultDeclarationContext externMethodResultDeclaration() {
			return getRuleContext(ExternMethodResultDeclarationContext.class,0);
		}
		public ExternMethodDefinitionContext(MethodDefinitionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterExternMethodDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitExternMethodDefinition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitExternMethodDefinition(this);
			else return visitor.visitChildren(this);
		}
	}

	public final MethodDefinitionContext methodDefinition() throws RecognitionException {
		MethodDefinitionContext _localctx = new MethodDefinitionContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_methodDefinition);
		try {
			setState(295);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__39:
				_localctx = new FullMethodDefinitionContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(283);
				match(T__39);
				setState(284);
				methodAttributeList();
				setState(285);
				ident();
				setState(286);
				parameterList();
				setState(287);
				stmtList();
				setState(288);
				methodResultDeclaration();
				}
				break;
			case T__40:
				_localctx = new ExternMethodDefinitionContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(290);
				match(T__40);
				setState(291);
				ident();
				setState(292);
				parameterList();
				setState(293);
				externMethodResultDeclaration();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MethodResultDeclarationContext extends ParserRuleContext {
		public MethodResultDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_methodResultDeclaration; }
	 
		public MethodResultDeclarationContext() { }
		public void copyFrom(MethodResultDeclarationContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class VoidReturnDefinitionContext extends MethodResultDeclarationContext {
		public VoidReturnDefinitionContext(MethodResultDeclarationContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterVoidReturnDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitVoidReturnDefinition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitVoidReturnDefinition(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class FunctionReturnDefinitionContext extends MethodResultDeclarationContext {
		public IdentContext ident() {
			return getRuleContext(IdentContext.class,0);
		}
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public FunctionReturnDefinitionContext(MethodResultDeclarationContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterFunctionReturnDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitFunctionReturnDefinition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitFunctionReturnDefinition(this);
			else return visitor.visitChildren(this);
		}
	}

	public final MethodResultDeclarationContext methodResultDeclaration() throws RecognitionException {
		MethodResultDeclarationContext _localctx = new MethodResultDeclarationContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_methodResultDeclaration);
		try {
			setState(303);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__41:
				_localctx = new FunctionReturnDefinitionContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(297);
				match(T__41);
				setState(298);
				ident();
				setState(299);
				match(T__42);
				setState(300);
				type();
				}
				break;
			case T__6:
			case T__24:
			case T__39:
			case T__40:
				_localctx = new VoidReturnDefinitionContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExternMethodResultDeclarationContext extends ParserRuleContext {
		public ExternMethodResultDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_externMethodResultDeclaration; }
	 
		public ExternMethodResultDeclarationContext() { }
		public void copyFrom(ExternMethodResultDeclarationContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class ExternFunctionReturnDefinitionContext extends ExternMethodResultDeclarationContext {
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public ExternFunctionReturnDefinitionContext(ExternMethodResultDeclarationContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterExternFunctionReturnDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitExternFunctionReturnDefinition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitExternFunctionReturnDefinition(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class ExternVoidReturnDefinitionContext extends ExternMethodResultDeclarationContext {
		public ExternVoidReturnDefinitionContext(ExternMethodResultDeclarationContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterExternVoidReturnDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitExternVoidReturnDefinition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitExternVoidReturnDefinition(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExternMethodResultDeclarationContext externMethodResultDeclaration() throws RecognitionException {
		ExternMethodResultDeclarationContext _localctx = new ExternMethodResultDeclarationContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_externMethodResultDeclaration);
		try {
			setState(308);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__41:
				_localctx = new ExternFunctionReturnDefinitionContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(305);
				match(T__41);
				setState(306);
				type();
				}
				break;
			case T__6:
			case T__24:
			case T__39:
			case T__40:
				_localctx = new ExternVoidReturnDefinitionContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MethodAttributeListContext extends ParserRuleContext {
		public List<MethodAttributeContext> methodAttribute() {
			return getRuleContexts(MethodAttributeContext.class);
		}
		public MethodAttributeContext methodAttribute(int i) {
			return getRuleContext(MethodAttributeContext.class,i);
		}
		public MethodAttributeListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_methodAttributeList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterMethodAttributeList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitMethodAttributeList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitMethodAttributeList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final MethodAttributeListContext methodAttributeList() throws RecognitionException {
		MethodAttributeListContext _localctx = new MethodAttributeListContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_methodAttributeList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(313);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__43) {
				{
				{
				setState(310);
				methodAttribute();
				}
				}
				setState(315);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MethodAttributeContext extends ParserRuleContext {
		public MethodAttributeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_methodAttribute; }
	 
		public MethodAttributeContext() { }
		public void copyFrom(MethodAttributeContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class AtomicMethodContext extends MethodAttributeContext {
		public AtomicMethodContext(MethodAttributeContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterAtomicMethod(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitAtomicMethod(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitAtomicMethod(this);
			else return visitor.visitChildren(this);
		}
	}

	public final MethodAttributeContext methodAttribute() throws RecognitionException {
		MethodAttributeContext _localctx = new MethodAttributeContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_methodAttribute);
		try {
			_localctx = new AtomicMethodContext(_localctx);
			enterOuterAlt(_localctx, 1);
			{
			setState(316);
			match(T__43);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ParameterContext extends ParserRuleContext {
		public IdentContext ident() {
			return getRuleContext(IdentContext.class,0);
		}
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public ParameterContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parameter; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterParameter(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitParameter(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitParameter(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ParameterContext parameter() throws RecognitionException {
		ParameterContext _localctx = new ParameterContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_parameter);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(318);
			ident();
			setState(319);
			match(T__42);
			setState(320);
			type();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ParameterListContext extends ParserRuleContext {
		public ParameterListPlainContext parameterListPlain() {
			return getRuleContext(ParameterListPlainContext.class,0);
		}
		public ParameterListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parameterList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterParameterList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitParameterList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitParameterList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ParameterListContext parameterList() throws RecognitionException {
		ParameterListContext _localctx = new ParameterListContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_parameterList);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(322);
			match(T__44);
			setState(323);
			parameterListPlain();
			setState(324);
			match(T__45);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ParameterListPlainContext extends ParserRuleContext {
		public List<ParameterContext> parameter() {
			return getRuleContexts(ParameterContext.class);
		}
		public ParameterContext parameter(int i) {
			return getRuleContext(ParameterContext.class,i);
		}
		public ParameterListPlainContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parameterListPlain; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterParameterListPlain(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitParameterListPlain(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitParameterListPlain(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ParameterListPlainContext parameterListPlain() throws RecognitionException {
		ParameterListPlainContext _localctx = new ParameterListPlainContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_parameterListPlain);
		int _la;
		try {
			setState(335);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__104:
			case Identifier:
				enterOuterAlt(_localctx, 1);
				{
				setState(326);
				parameter();
				setState(331);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__8) {
					{
					{
					setState(327);
					match(T__8);
					setState(328);
					parameter();
					}
					}
					setState(333);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				break;
			case T__45:
				enterOuterAlt(_localctx, 2);
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StmtListContext extends ParserRuleContext {
		public StmtListPlainContext stmtListPlain() {
			return getRuleContext(StmtListPlainContext.class,0);
		}
		public TerminationStmtContext terminationStmt() {
			return getRuleContext(TerminationStmtContext.class,0);
		}
		public StmtListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_stmtList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStmtList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStmtList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStmtList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final StmtListContext stmtList() throws RecognitionException {
		StmtListContext _localctx = new StmtListContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_stmtList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(337);
			match(T__5);
			setState(338);
			stmtListPlain();
			setState(340);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__57 || _la==T__67) {
				{
				setState(339);
				terminationStmt();
				}
			}

			setState(342);
			match(T__6);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AtomicBlockContext extends ParserRuleContext {
		public StmtListContext stmtList() {
			return getRuleContext(StmtListContext.class,0);
		}
		public AtomicBlockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_atomicBlock; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterAtomicBlock(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitAtomicBlock(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitAtomicBlock(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AtomicBlockContext atomicBlock() throws RecognitionException {
		AtomicBlockContext _localctx = new AtomicBlockContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_atomicBlock);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(344);
			match(T__43);
			setState(345);
			stmtList();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StmtListPlainContext extends ParserRuleContext {
		public List<StmtContext> stmt() {
			return getRuleContexts(StmtContext.class);
		}
		public StmtContext stmt(int i) {
			return getRuleContext(StmtContext.class,i);
		}
		public StmtListPlainContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_stmtListPlain; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStmtListPlain(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStmtListPlain(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStmtListPlain(this);
			else return visitor.visitChildren(this);
		}
	}

	public final StmtListPlainContext stmtListPlain() throws RecognitionException {
		StmtListPlainContext _localctx = new StmtListPlainContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_stmtListPlain);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(350);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,23,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(347);
					stmt();
					}
					} 
				}
				setState(352);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,23,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ControlStmtContext extends ParserRuleContext {
		public IfStmtContext ifStmt() {
			return getRuleContext(IfStmtContext.class,0);
		}
		public UntilStmtContext untilStmt() {
			return getRuleContext(UntilStmtContext.class,0);
		}
		public RepeatTimesStmtContext repeatTimesStmt() {
			return getRuleContext(RepeatTimesStmtContext.class,0);
		}
		public RepeatForeverStmtContext repeatForeverStmt() {
			return getRuleContext(RepeatForeverStmtContext.class,0);
		}
		public CallStmtContext callStmt() {
			return getRuleContext(CallStmtContext.class,0);
		}
		public ControlStmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_controlStmt; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterControlStmt(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitControlStmt(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitControlStmt(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ControlStmtContext controlStmt() throws RecognitionException {
		ControlStmtContext _localctx = new ControlStmtContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_controlStmt);
		try {
			setState(358);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,24,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(353);
				ifStmt();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(354);
				untilStmt();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(355);
				repeatTimesStmt();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(356);
				repeatForeverStmt();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(357);
				callStmt();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IfStmtContext extends ParserRuleContext {
		public BoolExprContext boolExpr() {
			return getRuleContext(BoolExprContext.class,0);
		}
		public StmtListContext stmtList() {
			return getRuleContext(StmtListContext.class,0);
		}
		public ElseCaseContext elseCase() {
			return getRuleContext(ElseCaseContext.class,0);
		}
		public IfStmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ifStmt; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterIfStmt(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitIfStmt(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitIfStmt(this);
			else return visitor.visitChildren(this);
		}
	}

	public final IfStmtContext ifStmt() throws RecognitionException {
		IfStmtContext _localctx = new IfStmtContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_ifStmt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(360);
			match(T__46);
			setState(361);
			boolExpr(0);
			setState(362);
			match(T__47);
			setState(363);
			stmtList();
			setState(364);
			elseCase();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ElseCaseContext extends ParserRuleContext {
		public ElseCaseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elseCase; }
	 
		public ElseCaseContext() { }
		public void copyFrom(ElseCaseContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class ElseIfCaseContext extends ElseCaseContext {
		public IfStmtContext ifStmt() {
			return getRuleContext(IfStmtContext.class,0);
		}
		public ElseIfCaseContext(ElseCaseContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterElseIfCase(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitElseIfCase(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitElseIfCase(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class EmptyElseCaseContext extends ElseCaseContext {
		public EmptyElseCaseContext(ElseCaseContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterEmptyElseCase(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitEmptyElseCase(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitEmptyElseCase(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class PureElseContext extends ElseCaseContext {
		public StmtListContext stmtList() {
			return getRuleContext(StmtListContext.class,0);
		}
		public PureElseContext(ElseCaseContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterPureElse(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitPureElse(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitPureElse(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ElseCaseContext elseCase() throws RecognitionException {
		ElseCaseContext _localctx = new ElseCaseContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_elseCase);
		try {
			setState(371);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,25,_ctx) ) {
			case 1:
				_localctx = new PureElseContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(366);
				match(T__48);
				setState(367);
				stmtList();
				}
				break;
			case 2:
				_localctx = new ElseIfCaseContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(368);
				match(T__48);
				setState(369);
				ifStmt();
				}
				break;
			case 3:
				_localctx = new EmptyElseCaseContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class UntilStmtContext extends ParserRuleContext {
		public BoolExprContext boolExpr() {
			return getRuleContext(BoolExprContext.class,0);
		}
		public StmtListContext stmtList() {
			return getRuleContext(StmtListContext.class,0);
		}
		public UntilStmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_untilStmt; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterUntilStmt(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitUntilStmt(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitUntilStmt(this);
			else return visitor.visitChildren(this);
		}
	}

	public final UntilStmtContext untilStmt() throws RecognitionException {
		UntilStmtContext _localctx = new UntilStmtContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_untilStmt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(373);
			match(T__49);
			setState(374);
			boolExpr(0);
			setState(375);
			match(T__50);
			setState(376);
			stmtList();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RepeatTimesStmtContext extends ParserRuleContext {
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public StmtListContext stmtList() {
			return getRuleContext(StmtListContext.class,0);
		}
		public RepeatTimesStmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_repeatTimesStmt; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterRepeatTimesStmt(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitRepeatTimesStmt(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitRepeatTimesStmt(this);
			else return visitor.visitChildren(this);
		}
	}

	public final RepeatTimesStmtContext repeatTimesStmt() throws RecognitionException {
		RepeatTimesStmtContext _localctx = new RepeatTimesStmtContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_repeatTimesStmt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(378);
			match(T__50);
			setState(379);
			numExpr(0);
			setState(380);
			match(T__51);
			setState(381);
			stmtList();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RepeatForeverStmtContext extends ParserRuleContext {
		public StmtListContext stmtList() {
			return getRuleContext(StmtListContext.class,0);
		}
		public RepeatForeverStmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_repeatForeverStmt; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterRepeatForeverStmt(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitRepeatForeverStmt(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitRepeatForeverStmt(this);
			else return visitor.visitChildren(this);
		}
	}

	public final RepeatForeverStmtContext repeatForeverStmt() throws RecognitionException {
		RepeatForeverStmtContext _localctx = new RepeatForeverStmtContext(_ctx, getState());
		enterRule(_localctx, 80, RULE_repeatForeverStmt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(383);
			match(T__50);
			setState(384);
			match(T__52);
			setState(385);
			stmtList();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CallStmtContext extends ParserRuleContext {
		public IdentContext ident() {
			return getRuleContext(IdentContext.class,0);
		}
		public ExpressionListContext expressionList() {
			return getRuleContext(ExpressionListContext.class,0);
		}
		public CallStmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_callStmt; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterCallStmt(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitCallStmt(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitCallStmt(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CallStmtContext callStmt() throws RecognitionException {
		CallStmtContext _localctx = new CallStmtContext(_ctx, getState());
		enterRule(_localctx, 82, RULE_callStmt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(387);
			ident();
			setState(388);
			expressionList();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionListContext extends ParserRuleContext {
		public ExpressionListPlainContext expressionListPlain() {
			return getRuleContext(ExpressionListPlainContext.class,0);
		}
		public ExpressionListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressionList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterExpressionList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitExpressionList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitExpressionList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExpressionListContext expressionList() throws RecognitionException {
		ExpressionListContext _localctx = new ExpressionListContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_expressionList);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(390);
			match(T__44);
			setState(391);
			expressionListPlain();
			setState(392);
			match(T__45);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionListPlainContext extends ParserRuleContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public ExpressionListPlainContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressionListPlain; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterExpressionListPlain(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitExpressionListPlain(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitExpressionListPlain(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExpressionListPlainContext expressionListPlain() throws RecognitionException {
		ExpressionListPlainContext _localctx = new ExpressionListPlainContext(_ctx, getState());
		enterRule(_localctx, 86, RULE_expressionListPlain);
		int _la;
		try {
			setState(403);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__22:
			case T__44:
			case T__64:
			case T__74:
			case T__77:
			case T__78:
			case T__79:
			case T__80:
			case T__81:
			case T__83:
			case T__84:
			case T__92:
			case T__93:
			case T__94:
			case T__99:
			case T__100:
			case T__101:
			case T__102:
			case T__104:
			case Boolean:
			case String:
			case Identifier:
			case IntegerLiteral:
			case DecimalLiteral:
				enterOuterAlt(_localctx, 1);
				{
				setState(394);
				expression();
				setState(399);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__8) {
					{
					{
					setState(395);
					match(T__8);
					setState(396);
					expression();
					}
					}
					setState(401);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				break;
			case T__23:
			case T__45:
				enterOuterAlt(_localctx, 2);
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionStmtContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ExpressionStmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressionStmt; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterExpressionStmt(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitExpressionStmt(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitExpressionStmt(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExpressionStmtContext expressionStmt() throws RecognitionException {
		ExpressionStmtContext _localctx = new ExpressionStmtContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_expressionStmt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(405);
			match(T__53);
			setState(406);
			expression();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StmtContext extends ParserRuleContext {
		public StmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_stmt; }
	 
		public StmtContext() { }
		public void copyFrom(StmtContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class NonControlStatementContext extends StmtContext {
		public NonCtrlStmtContext nonCtrlStmt() {
			return getRuleContext(NonCtrlStmtContext.class,0);
		}
		public NonControlStatementContext(StmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNonControlStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNonControlStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNonControlStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class AttributedStatementContext extends StmtContext {
		public TerminalNode Identifier() { return getToken(LEILAParser.Identifier, 0); }
		public ExpressionListContext expressionList() {
			return getRuleContext(ExpressionListContext.class,0);
		}
		public StmtContext stmt() {
			return getRuleContext(StmtContext.class,0);
		}
		public AttributedStatementContext(StmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterAttributedStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitAttributedStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitAttributedStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class ControlStatementContext extends StmtContext {
		public ControlStmtContext controlStmt() {
			return getRuleContext(ControlStmtContext.class,0);
		}
		public ControlStatementContext(StmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterControlStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitControlStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitControlStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class AtomicBlockStatementContext extends StmtContext {
		public AtomicBlockContext atomicBlock() {
			return getRuleContext(AtomicBlockContext.class,0);
		}
		public AtomicBlockStatementContext(StmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterAtomicBlockStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitAtomicBlockStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitAtomicBlockStatement(this);
			else return visitor.visitChildren(this);
		}
	}

	public final StmtContext stmt() throws RecognitionException {
		StmtContext _localctx = new StmtContext(_ctx, getState());
		enterRule(_localctx, 90, RULE_stmt);
		try {
			setState(416);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__46:
			case T__49:
			case T__50:
			case T__104:
			case Identifier:
				_localctx = new ControlStatementContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(408);
				controlStmt();
				}
				break;
			case T__13:
			case T__39:
			case T__53:
			case T__55:
			case T__57:
			case T__60:
			case T__61:
			case T__63:
			case T__65:
			case T__66:
			case T__67:
			case T__69:
			case T__71:
			case T__73:
				_localctx = new NonControlStatementContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(409);
				nonCtrlStmt();
				}
				break;
			case T__43:
				_localctx = new AtomicBlockStatementContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(410);
				atomicBlock();
				}
				break;
			case T__54:
				_localctx = new AttributedStatementContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(411);
				match(T__54);
				setState(412);
				match(Identifier);
				setState(413);
				expressionList();
				setState(414);
				stmt();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NonCtrlStmtContext extends ParserRuleContext {
		public ExpressionStmtContext expressionStmt() {
			return getRuleContext(ExpressionStmtContext.class,0);
		}
		public CommonStmtContext commonStmt() {
			return getRuleContext(CommonStmtContext.class,0);
		}
		public ListStmtContext listStmt() {
			return getRuleContext(ListStmtContext.class,0);
		}
		public DeclarationStmtContext declarationStmt() {
			return getRuleContext(DeclarationStmtContext.class,0);
		}
		public NonCtrlStmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_nonCtrlStmt; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNonCtrlStmt(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNonCtrlStmt(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNonCtrlStmt(this);
			else return visitor.visitChildren(this);
		}
	}

	public final NonCtrlStmtContext nonCtrlStmt() throws RecognitionException {
		NonCtrlStmtContext _localctx = new NonCtrlStmtContext(_ctx, getState());
		enterRule(_localctx, 92, RULE_nonCtrlStmt);
		try {
			setState(422);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__53:
				enterOuterAlt(_localctx, 1);
				{
				setState(418);
				expressionStmt();
				}
				break;
			case T__39:
			case T__55:
			case T__57:
			case T__60:
			case T__61:
			case T__63:
			case T__65:
			case T__66:
				enterOuterAlt(_localctx, 2);
				{
				setState(419);
				commonStmt();
				}
				break;
			case T__67:
			case T__69:
			case T__71:
			case T__73:
				enterOuterAlt(_localctx, 3);
				{
				setState(420);
				listStmt();
				}
				break;
			case T__13:
				enterOuterAlt(_localctx, 4);
				{
				setState(421);
				declarationStmt();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CommonStmtContext extends ParserRuleContext {
		public CommonStmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_commonStmt; }
	 
		public CommonStmtContext() { }
		public void copyFrom(CommonStmtContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class ResetTimerStatementContext extends CommonStmtContext {
		public ResetTimerStatementContext(CommonStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterResetTimerStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitResetTimerStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitResetTimerStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class BroadcastMessageStatementContext extends CommonStmtContext {
		public MessageContext message() {
			return getRuleContext(MessageContext.class,0);
		}
		public BroadcastMessageStatementContext(CommonStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterBroadcastMessageStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitBroadcastMessageStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitBroadcastMessageStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class EpsilonStatementContext extends CommonStmtContext {
		public EpsilonStatementContext(CommonStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterEpsilonStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitEpsilonStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitEpsilonStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class AssumeStatementContext extends CommonStmtContext {
		public BoolExprContext boolExpr() {
			return getRuleContext(BoolExprContext.class,0);
		}
		public AssumeStatementContext(CommonStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterAssumeStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitAssumeStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitAssumeStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class WaitUntilStatementContext extends CommonStmtContext {
		public BoolExprContext boolExpr() {
			return getRuleContext(BoolExprContext.class,0);
		}
		public WaitUntilStatementContext(CommonStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterWaitUntilStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitWaitUntilStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitWaitUntilStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class BroadcastAndWaitStatementContext extends CommonStmtContext {
		public MessageContext message() {
			return getRuleContext(MessageContext.class,0);
		}
		public BroadcastAndWaitStatementContext(CommonStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterBroadcastAndWaitStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitBroadcastAndWaitStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitBroadcastAndWaitStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class CreateCloneOfStatementContext extends CommonStmtContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public CreateCloneOfStatementContext(CommonStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterCreateCloneOfStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitCreateCloneOfStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitCreateCloneOfStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class SetStatementContext extends CommonStmtContext {
		public SetStmtContext setStmt() {
			return getRuleContext(SetStmtContext.class,0);
		}
		public SetStatementContext(CommonStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterSetStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitSetStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitSetStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class WaitSecsStatementContext extends CommonStmtContext {
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public WaitSecsStatementContext(CommonStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterWaitSecsStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitWaitSecsStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitWaitSecsStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StopOthersInActorStatementContext extends CommonStmtContext {
		public StopOthersInActorStatementContext(CommonStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStopOthersInActorStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStopOthersInActorStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStopOthersInActorStatement(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CommonStmtContext commonStmt() throws RecognitionException {
		CommonStmtContext _localctx = new CommonStmtContext(_ctx, getState());
		enterRule(_localctx, 94, RULE_commonStmt);
		try {
			setState(453);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,30,_ctx) ) {
			case 1:
				_localctx = new WaitSecsStatementContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(424);
				match(T__55);
				setState(425);
				numExpr(0);
				setState(426);
				match(T__56);
				}
				break;
			case 2:
				_localctx = new WaitUntilStatementContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(428);
				match(T__55);
				setState(429);
				match(T__49);
				setState(430);
				boolExpr(0);
				}
				break;
			case 3:
				_localctx = new StopOthersInActorStatementContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(431);
				match(T__57);
				setState(432);
				match(T__58);
				setState(433);
				match(T__59);
				setState(434);
				match(T__38);
				setState(435);
				match(T__9);
				}
				break;
			case 4:
				_localctx = new CreateCloneOfStatementContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(436);
				match(T__60);
				setState(437);
				match(T__33);
				setState(438);
				match(T__16);
				setState(439);
				stringExpr();
				}
				break;
			case 5:
				_localctx = new BroadcastMessageStatementContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(440);
				match(T__61);
				setState(441);
				message();
				}
				break;
			case 6:
				_localctx = new BroadcastAndWaitStatementContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(442);
				match(T__61);
				setState(443);
				message();
				setState(444);
				match(T__62);
				setState(445);
				match(T__55);
				}
				break;
			case 7:
				_localctx = new ResetTimerStatementContext(_localctx);
				enterOuterAlt(_localctx, 7);
				{
				setState(447);
				match(T__63);
				setState(448);
				match(T__64);
				}
				break;
			case 8:
				_localctx = new EpsilonStatementContext(_localctx);
				enterOuterAlt(_localctx, 8);
				{
				setState(449);
				match(T__65);
				}
				break;
			case 9:
				_localctx = new AssumeStatementContext(_localctx);
				enterOuterAlt(_localctx, 9);
				{
				setState(450);
				match(T__66);
				setState(451);
				boolExpr(0);
				}
				break;
			case 10:
				_localctx = new SetStatementContext(_localctx);
				enterOuterAlt(_localctx, 10);
				{
				setState(452);
				setStmt();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ListStmtContext extends ParserRuleContext {
		public ListStmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_listStmt; }
	 
		public ListStmtContext() { }
		public void copyFrom(ListStmtContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class DeleteAllFromStatementContext extends ListStmtContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public DeleteAllFromStatementContext(ListStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterDeleteAllFromStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitDeleteAllFromStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitDeleteAllFromStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class DeleteIthFromStatementContext extends ListStmtContext {
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public DeleteIthFromStatementContext(ListStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterDeleteIthFromStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitDeleteIthFromStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitDeleteIthFromStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class AddElementToStatementContext extends ListStmtContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public AddElementToStatementContext(ListStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterAddElementToStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitAddElementToStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitAddElementToStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class InsertAtStatementContext extends ListStmtContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public InsertAtStatementContext(ListStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterInsertAtStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitInsertAtStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitInsertAtStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class ReplaceElementAtStatementContext extends ListStmtContext {
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public ReplaceElementAtStatementContext(ListStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterReplaceElementAtStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitReplaceElementAtStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitReplaceElementAtStatement(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ListStmtContext listStmt() throws RecognitionException {
		ListStmtContext _localctx = new ListStmtContext(_ctx, getState());
		enterRule(_localctx, 96, RULE_listStmt);
		try {
			setState(484);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,31,_ctx) ) {
			case 1:
				_localctx = new DeleteAllFromStatementContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(455);
				match(T__67);
				setState(456);
				match(T__68);
				setState(457);
				match(T__3);
				setState(458);
				variable();
				}
				break;
			case 2:
				_localctx = new DeleteIthFromStatementContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(459);
				match(T__67);
				setState(460);
				numExpr(0);
				setState(461);
				match(T__16);
				setState(462);
				variable();
				}
				break;
			case 3:
				_localctx = new AddElementToStatementContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(464);
				match(T__69);
				setState(465);
				stringExpr();
				setState(466);
				match(T__70);
				setState(467);
				variable();
				}
				break;
			case 4:
				_localctx = new InsertAtStatementContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(469);
				match(T__71);
				setState(470);
				stringExpr();
				setState(471);
				match(T__72);
				setState(472);
				numExpr(0);
				setState(473);
				match(T__16);
				setState(474);
				variable();
				}
				break;
			case 5:
				_localctx = new ReplaceElementAtStatementContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(476);
				match(T__73);
				setState(477);
				match(T__74);
				setState(478);
				numExpr(0);
				setState(479);
				match(T__16);
				setState(480);
				variable();
				setState(481);
				match(T__75);
				setState(482);
				stringExpr();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SetStmtContext extends ParserRuleContext {
		public SetStmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_setStmt; }
	 
		public SetStmtContext() { }
		public void copyFrom(SetStmtContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class StoreCallResultStatementContext extends SetStmtContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public CallStmtContext callStmt() {
			return getRuleContext(CallStmtContext.class,0);
		}
		public StoreCallResultStatementContext(SetStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStoreCallResultStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStoreCallResultStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStoreCallResultStatement(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StoreEvalResultStatementContext extends SetStmtContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public StoreEvalResultStatementContext(SetStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStoreEvalResultStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStoreEvalResultStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStoreEvalResultStatement(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SetStmtContext setStmt() throws RecognitionException {
		SetStmtContext _localctx = new SetStmtContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_setStmt);
		try {
			setState(496);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,32,_ctx) ) {
			case 1:
				_localctx = new StoreEvalResultStatementContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(486);
				match(T__39);
				setState(487);
				variable();
				setState(488);
				match(T__14);
				setState(489);
				expression();
				}
				break;
			case 2:
				_localctx = new StoreCallResultStatementContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(491);
				match(T__39);
				setState(492);
				variable();
				setState(493);
				match(T__14);
				setState(494);
				callStmt();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SetStmtListContext extends ParserRuleContext {
		public List<SetStmtContext> setStmt() {
			return getRuleContexts(SetStmtContext.class);
		}
		public SetStmtContext setStmt(int i) {
			return getRuleContext(SetStmtContext.class,i);
		}
		public SetStmtListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_setStmtList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterSetStmtList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitSetStmtList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitSetStmtList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SetStmtListContext setStmtList() throws RecognitionException {
		SetStmtListContext _localctx = new SetStmtListContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_setStmtList);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(501);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,33,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(498);
					setStmt();
					}
					} 
				}
				setState(503);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,33,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TerminationStmtContext extends ParserRuleContext {
		public TerminationStmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_terminationStmt; }
	 
		public TerminationStmtContext() { }
		public void copyFrom(TerminationStmtContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class StopThisContext extends TerminationStmtContext {
		public StopThisContext(TerminationStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStopThis(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStopThis(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStopThis(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StopAllContext extends TerminationStmtContext {
		public StopAllContext(TerminationStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStopAll(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStopAll(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStopAll(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class DeleteThisCloneContext extends TerminationStmtContext {
		public DeleteThisCloneContext(TerminationStmtContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterDeleteThisClone(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitDeleteThisClone(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitDeleteThisClone(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TerminationStmtContext terminationStmt() throws RecognitionException {
		TerminationStmtContext _localctx = new TerminationStmtContext(_ctx, getState());
		enterRule(_localctx, 102, RULE_terminationStmt);
		try {
			setState(512);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,34,_ctx) ) {
			case 1:
				_localctx = new StopAllContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(504);
				match(T__57);
				setState(505);
				match(T__68);
				}
				break;
			case 2:
				_localctx = new StopThisContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(506);
				match(T__57);
				setState(507);
				match(T__76);
				setState(508);
				match(T__24);
				}
				break;
			case 3:
				_localctx = new DeleteThisCloneContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(509);
				match(T__67);
				setState(510);
				match(T__76);
				setState(511);
				match(T__33);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StringExprContext extends ParserRuleContext {
		public StringExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_stringExpr; }
	 
		public StringExprContext() { }
		public void copyFrom(StringExprContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class IthLetterOfStringExpressionContext extends StringExprContext {
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public IthLetterOfStringExpressionContext(StringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterIthLetterOfStringExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitIthLetterOfStringExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitIthLetterOfStringExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumAsStringExpressionContext extends StringExprContext {
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public NumAsStringExpressionContext(StringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumAsStringExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumAsStringExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumAsStringExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class BoolAsStringExpressionContext extends StringExprContext {
		public BoolExprContext boolExpr() {
			return getRuleContext(BoolExprContext.class,0);
		}
		public BoolAsStringExpressionContext(StringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterBoolAsStringExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitBoolAsStringExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitBoolAsStringExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class IthStringItemOfExpressionContext extends StringExprContext {
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public IthStringItemOfExpressionContext(StringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterIthStringItemOfExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitIthStringItemOfExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitIthStringItemOfExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StringLiteralExpressionContext extends StringExprContext {
		public TerminalNode String() { return getToken(LEILAParser.String, 0); }
		public StringLiteralExpressionContext(StringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStringLiteralExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStringLiteralExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStringLiteralExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StringParanthExpressionContext extends StringExprContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public StringParanthExpressionContext(StringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStringParanthExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStringParanthExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStringParanthExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class UnspecifiedStringExpressionContext extends StringExprContext {
		public UnspecifiedStringExpressionContext(StringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterUnspecifiedStringExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitUnspecifiedStringExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitUnspecifiedStringExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StringCallStatementExpressionContext extends StringExprContext {
		public CallStmtContext callStmt() {
			return getRuleContext(CallStmtContext.class,0);
		}
		public StringCallStatementExpressionContext(StringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStringCallStatementExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStringCallStatementExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStringCallStatementExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StringAttributeOfExpressionContext extends StringExprContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public ActorExprContext actorExpr() {
			return getRuleContext(ActorExprContext.class,0);
		}
		public StringAttributeOfExpressionContext(StringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStringAttributeOfExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStringAttributeOfExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStringAttributeOfExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class JoinStringsExpressionContext extends StringExprContext {
		public List<StringExprContext> stringExpr() {
			return getRuleContexts(StringExprContext.class);
		}
		public StringExprContext stringExpr(int i) {
			return getRuleContext(StringExprContext.class,i);
		}
		public JoinStringsExpressionContext(StringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterJoinStringsExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitJoinStringsExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitJoinStringsExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class DefaultStringExpressionContext extends StringExprContext {
		public TerminalNode String() { return getToken(LEILAParser.String, 0); }
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public DefaultStringExpressionContext(StringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterDefaultStringExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitDefaultStringExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitDefaultStringExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StringVariableExpressionContext extends StringExprContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public StringVariableExpressionContext(StringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStringVariableExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStringVariableExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStringVariableExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final StringExprContext stringExpr() throws RecognitionException {
		StringExprContext _localctx = new StringExprContext(_ctx, getState());
		enterRule(_localctx, 104, RULE_stringExpr);
		try {
			setState(555);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,35,_ctx) ) {
			case 1:
				_localctx = new StringLiteralExpressionContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(514);
				match(String);
				}
				break;
			case 2:
				_localctx = new StringVariableExpressionContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(515);
				variable();
				}
				break;
			case 3:
				_localctx = new StringParanthExpressionContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(516);
				match(T__44);
				setState(517);
				stringExpr();
				setState(518);
				match(T__45);
				}
				break;
			case 4:
				_localctx = new StringCallStatementExpressionContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(520);
				callStmt();
				}
				break;
			case 5:
				_localctx = new NumAsStringExpressionContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(521);
				match(T__77);
				setState(522);
				numExpr(0);
				setState(523);
				match(T__70);
				setState(524);
				match(T__20);
				}
				break;
			case 6:
				_localctx = new BoolAsStringExpressionContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(526);
				match(T__77);
				setState(527);
				boolExpr(0);
				setState(528);
				match(T__70);
				setState(529);
				match(T__20);
				}
				break;
			case 7:
				_localctx = new StringAttributeOfExpressionContext(_localctx);
				enterOuterAlt(_localctx, 7);
				{
				setState(531);
				match(T__78);
				setState(532);
				stringExpr();
				setState(533);
				match(T__16);
				setState(534);
				actorExpr();
				}
				break;
			case 8:
				_localctx = new JoinStringsExpressionContext(_localctx);
				enterOuterAlt(_localctx, 8);
				{
				setState(536);
				match(T__79);
				setState(537);
				stringExpr();
				setState(538);
				stringExpr();
				}
				break;
			case 9:
				_localctx = new IthLetterOfStringExpressionContext(_localctx);
				enterOuterAlt(_localctx, 9);
				{
				setState(540);
				match(T__80);
				setState(541);
				numExpr(0);
				setState(542);
				match(T__16);
				setState(543);
				stringExpr();
				}
				break;
			case 10:
				_localctx = new IthStringItemOfExpressionContext(_localctx);
				enterOuterAlt(_localctx, 10);
				{
				setState(545);
				match(T__74);
				setState(546);
				numExpr(0);
				setState(547);
				match(T__16);
				setState(548);
				variable();
				}
				break;
			case 11:
				_localctx = new DefaultStringExpressionContext(_localctx);
				enterOuterAlt(_localctx, 11);
				{
				setState(550);
				match(T__81);
				setState(551);
				match(String);
				setState(552);
				match(T__82);
				setState(553);
				stringExpr();
				}
				break;
			case 12:
				_localctx = new UnspecifiedStringExpressionContext(_localctx);
				enterOuterAlt(_localctx, 12);
				{
				setState(554);
				match(T__83);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BoolExprContext extends ParserRuleContext {
		public BoolExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_boolExpr; }
	 
		public BoolExprContext() { }
		public void copyFrom(BoolExprContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class BoolOrExpressionContext extends BoolExprContext {
		public List<BoolExprContext> boolExpr() {
			return getRuleContexts(BoolExprContext.class);
		}
		public BoolExprContext boolExpr(int i) {
			return getRuleContext(BoolExprContext.class,i);
		}
		public BoolOrExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterBoolOrExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitBoolOrExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitBoolOrExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class GreaterEqualExpressionContext extends BoolExprContext {
		public List<NumOrStringExprContext> numOrStringExpr() {
			return getRuleContexts(NumOrStringExprContext.class);
		}
		public NumOrStringExprContext numOrStringExpr(int i) {
			return getRuleContext(NumOrStringExprContext.class,i);
		}
		public GreaterEqualExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterGreaterEqualExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitGreaterEqualExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitGreaterEqualExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StringAsBoolExpressionContext extends BoolExprContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public StringAsBoolExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStringAsBoolExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStringAsBoolExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStringAsBoolExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class BoolVariableExpressionContext extends BoolExprContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public BoolVariableExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterBoolVariableExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitBoolVariableExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitBoolVariableExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StrContainsExpressionContext extends BoolExprContext {
		public List<StringExprContext> stringExpr() {
			return getRuleContexts(StringExprContext.class);
		}
		public StringExprContext stringExpr(int i) {
			return getRuleContext(StringExprContext.class,i);
		}
		public StrContainsExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStrContainsExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStrContainsExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStrContainsExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class GreaterThanExpressionContext extends BoolExprContext {
		public List<NumOrStringExprContext> numOrStringExpr() {
			return getRuleContexts(NumOrStringExprContext.class);
		}
		public NumOrStringExprContext numOrStringExpr(int i) {
			return getRuleContext(NumOrStringExprContext.class,i);
		}
		public GreaterThanExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterGreaterThanExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitGreaterThanExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitGreaterThanExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class DefaultBoolExpressionContext extends BoolExprContext {
		public TerminalNode Boolean() { return getToken(LEILAParser.Boolean, 0); }
		public BoolExprContext boolExpr() {
			return getRuleContext(BoolExprContext.class,0);
		}
		public DefaultBoolExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterDefaultBoolExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitDefaultBoolExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitDefaultBoolExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumAsBoolExpressionContext extends BoolExprContext {
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public NumAsBoolExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumAsBoolExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumAsBoolExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumAsBoolExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class BoolCallStatementExpressionContext extends BoolExprContext {
		public CallStmtContext callStmt() {
			return getRuleContext(CallStmtContext.class,0);
		}
		public BoolCallStatementExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterBoolCallStatementExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitBoolCallStatementExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitBoolCallStatementExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class LessEqualExpressionContext extends BoolExprContext {
		public List<NumOrStringExprContext> numOrStringExpr() {
			return getRuleContexts(NumOrStringExprContext.class);
		}
		public NumOrStringExprContext numOrStringExpr(int i) {
			return getRuleContext(NumOrStringExprContext.class,i);
		}
		public LessEqualExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterLessEqualExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitLessEqualExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitLessEqualExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class BoolParanthExpressionContext extends BoolExprContext {
		public BoolExprContext boolExpr() {
			return getRuleContext(BoolExprContext.class,0);
		}
		public BoolParanthExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterBoolParanthExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitBoolParanthExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitBoolParanthExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class UnspecifiedBoolExpressionContext extends BoolExprContext {
		public UnspecifiedBoolExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterUnspecifiedBoolExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitUnspecifiedBoolExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitUnspecifiedBoolExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NegatedBoolExpressionContext extends BoolExprContext {
		public BoolExprContext boolExpr() {
			return getRuleContext(BoolExprContext.class,0);
		}
		public NegatedBoolExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNegatedBoolExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNegatedBoolExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNegatedBoolExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class BoolLiteralExpressionContext extends BoolExprContext {
		public TerminalNode Boolean() { return getToken(LEILAParser.Boolean, 0); }
		public BoolLiteralExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterBoolLiteralExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitBoolLiteralExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitBoolLiteralExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class BoolAndExpressionContext extends BoolExprContext {
		public List<BoolExprContext> boolExpr() {
			return getRuleContexts(BoolExprContext.class);
		}
		public BoolExprContext boolExpr(int i) {
			return getRuleContext(BoolExprContext.class,i);
		}
		public BoolAndExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterBoolAndExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitBoolAndExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitBoolAndExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class LessThanExpressionContext extends BoolExprContext {
		public List<NumOrStringExprContext> numOrStringExpr() {
			return getRuleContexts(NumOrStringExprContext.class);
		}
		public NumOrStringExprContext numOrStringExpr(int i) {
			return getRuleContext(NumOrStringExprContext.class,i);
		}
		public LessThanExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterLessThanExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitLessThanExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitLessThanExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class EqualsExpressionContext extends BoolExprContext {
		public List<NumOrStringExprContext> numOrStringExpr() {
			return getRuleContexts(NumOrStringExprContext.class);
		}
		public NumOrStringExprContext numOrStringExpr(int i) {
			return getRuleContext(NumOrStringExprContext.class,i);
		}
		public EqualsExpressionContext(BoolExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterEqualsExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitEqualsExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitEqualsExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final BoolExprContext boolExpr() throws RecognitionException {
		return boolExpr(0);
	}

	private BoolExprContext boolExpr(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		BoolExprContext _localctx = new BoolExprContext(_ctx, _parentState);
		BoolExprContext _prevctx = _localctx;
		int _startState = 106;
		enterRecursionRule(_localctx, 106, RULE_boolExpr, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(606);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,36,_ctx) ) {
			case 1:
				{
				_localctx = new BoolLiteralExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(558);
				match(Boolean);
				}
				break;
			case 2:
				{
				_localctx = new BoolVariableExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(559);
				variable();
				}
				break;
			case 3:
				{
				_localctx = new BoolParanthExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(560);
				match(T__44);
				setState(561);
				boolExpr(0);
				setState(562);
				match(T__45);
				}
				break;
			case 4:
				{
				_localctx = new BoolCallStatementExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(564);
				callStmt();
				}
				break;
			case 5:
				{
				_localctx = new NumAsBoolExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(565);
				match(T__77);
				setState(566);
				numExpr(0);
				setState(567);
				match(T__70);
				setState(568);
				match(T__19);
				}
				break;
			case 6:
				{
				_localctx = new StringAsBoolExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(570);
				match(T__77);
				setState(571);
				stringExpr();
				setState(572);
				match(T__70);
				setState(573);
				match(T__19);
				}
				break;
			case 7:
				{
				_localctx = new NegatedBoolExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(575);
				match(T__84);
				setState(576);
				boolExpr(11);
				}
				break;
			case 8:
				{
				_localctx = new GreaterEqualExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(577);
				numOrStringExpr();
				setState(578);
				match(T__86);
				setState(579);
				numOrStringExpr();
				}
				break;
			case 9:
				{
				_localctx = new GreaterThanExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(581);
				numOrStringExpr();
				setState(582);
				match(T__87);
				setState(583);
				numOrStringExpr();
				}
				break;
			case 10:
				{
				_localctx = new LessThanExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(585);
				numOrStringExpr();
				setState(586);
				match(T__88);
				setState(587);
				numOrStringExpr();
				}
				break;
			case 11:
				{
				_localctx = new LessEqualExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(589);
				numOrStringExpr();
				setState(590);
				match(T__89);
				setState(591);
				numOrStringExpr();
				}
				break;
			case 12:
				{
				_localctx = new EqualsExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(593);
				numOrStringExpr();
				setState(594);
				match(T__90);
				setState(595);
				numOrStringExpr();
				}
				break;
			case 13:
				{
				_localctx = new StrContainsExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(597);
				stringExpr();
				setState(598);
				match(T__91);
				setState(599);
				stringExpr();
				}
				break;
			case 14:
				{
				_localctx = new DefaultBoolExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(601);
				match(T__81);
				setState(602);
				match(Boolean);
				setState(603);
				match(T__82);
				setState(604);
				boolExpr(2);
				}
				break;
			case 15:
				{
				_localctx = new UnspecifiedBoolExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(605);
				match(T__92);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(616);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,38,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(614);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,37,_ctx) ) {
					case 1:
						{
						_localctx = new BoolAndExpressionContext(new BoolExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_boolExpr);
						setState(608);
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(609);
						match(T__62);
						setState(610);
						boolExpr(11);
						}
						break;
					case 2:
						{
						_localctx = new BoolOrExpressionContext(new BoolExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_boolExpr);
						setState(611);
						if (!(precpred(_ctx, 9))) throw new FailedPredicateException(this, "precpred(_ctx, 9)");
						setState(612);
						match(T__85);
						setState(613);
						boolExpr(10);
						}
						break;
					}
					} 
				}
				setState(618);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,38,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class NumOrStringExprContext extends ParserRuleContext {
		public NumOrStringExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_numOrStringExpr; }
	 
		public NumOrStringExprContext() { }
		public void copyFrom(NumOrStringExprContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class StringExpressionContext extends NumOrStringExprContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public StringExpressionContext(NumOrStringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStringExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStringExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStringExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumberExpressionContext extends NumOrStringExprContext {
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public NumberExpressionContext(NumOrStringExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumberExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumberExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumberExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final NumOrStringExprContext numOrStringExpr() throws RecognitionException {
		NumOrStringExprContext _localctx = new NumOrStringExprContext(_ctx, getState());
		enterRule(_localctx, 108, RULE_numOrStringExpr);
		try {
			setState(621);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,39,_ctx) ) {
			case 1:
				_localctx = new NumberExpressionContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(619);
				numExpr(0);
				}
				break;
			case 2:
				_localctx = new StringExpressionContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(620);
				stringExpr();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NumExprContext extends ParserRuleContext {
		public NumExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_numExpr; }
	 
		public NumExprContext() { }
		public void copyFrom(NumExprContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class NumVariableExpressionContext extends NumExprContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public NumVariableExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumVariableExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumVariableExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumVariableExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class LengthOfStringExpressionContext extends NumExprContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public LengthOfStringExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterLengthOfStringExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitLengthOfStringExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitLengthOfStringExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StringToIntExpressionContext extends NumExprContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public StringToIntExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStringToIntExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStringToIntExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStringToIntExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StringToFloatExpressionContext extends NumExprContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public StringToFloatExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStringToFloatExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStringToFloatExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStringToFloatExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class TimerExpressionContext extends NumExprContext {
		public TimerExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterTimerExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitTimerExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitTimerExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumCallStatementExpressionContext extends NumExprContext {
		public CallStmtContext callStmt() {
			return getRuleContext(CallStmtContext.class,0);
		}
		public NumCallStatementExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumCallStatementExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumCallStatementExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumCallStatementExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumDivExpressionContext extends NumExprContext {
		public List<NumExprContext> numExpr() {
			return getRuleContexts(NumExprContext.class);
		}
		public NumExprContext numExpr(int i) {
			return getRuleContext(NumExprContext.class,i);
		}
		public NumDivExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumDivExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumDivExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumDivExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumLiteralExpressionContext extends NumExprContext {
		public NumberContext number() {
			return getRuleContext(NumberContext.class,0);
		}
		public NumLiteralExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumLiteralExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumLiteralExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumLiteralExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class BoolToIntExpressionContext extends NumExprContext {
		public BoolExprContext boolExpr() {
			return getRuleContext(BoolExprContext.class,0);
		}
		public BoolToIntExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterBoolToIntExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitBoolToIntExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitBoolToIntExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class DefaultNumExprContext extends NumExprContext {
		public NumberContext number() {
			return getRuleContext(NumberContext.class,0);
		}
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public DefaultNumExprContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterDefaultNumExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitDefaultNumExpr(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitDefaultNumExpr(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumMinusExpressionContext extends NumExprContext {
		public List<NumExprContext> numExpr() {
			return getRuleContexts(NumExprContext.class);
		}
		public NumExprContext numExpr(int i) {
			return getRuleContext(NumExprContext.class,i);
		}
		public NumMinusExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumMinusExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumMinusExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumMinusExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumModExpressionContext extends NumExprContext {
		public List<NumExprContext> numExpr() {
			return getRuleContexts(NumExprContext.class);
		}
		public NumExprContext numExpr(int i) {
			return getRuleContext(NumExprContext.class,i);
		}
		public NumModExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumModExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumModExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumModExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumBracketsContext extends NumExprContext {
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public NumBracketsContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumBrackets(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumBrackets(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumBrackets(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumPlusExpressionContext extends NumExprContext {
		public List<NumExprContext> numExpr() {
			return getRuleContexts(NumExprContext.class);
		}
		public NumExprContext numExpr(int i) {
			return getRuleContext(NumExprContext.class,i);
		}
		public NumPlusExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumPlusExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumPlusExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumPlusExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class LengthOfListExpressionContext extends NumExprContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public LengthOfListExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterLengthOfListExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitLengthOfListExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitLengthOfListExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumToFloatExpressionContext extends NumExprContext {
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public NumToFloatExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumToFloatExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumToFloatExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumToFloatExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class UnspecifiedNumExprContext extends NumExprContext {
		public UnspecifiedNumExprContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterUnspecifiedNumExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitUnspecifiedNumExpr(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitUnspecifiedNumExpr(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumToIntExpressionContext extends NumExprContext {
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public NumToIntExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumToIntExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumToIntExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumToIntExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class IndexOfExpressionContext extends NumExprContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public IndexOfExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterIndexOfExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitIndexOfExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitIndexOfExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumMulExpressionContext extends NumExprContext {
		public List<NumExprContext> numExpr() {
			return getRuleContexts(NumExprContext.class);
		}
		public NumExprContext numExpr(int i) {
			return getRuleContext(NumExprContext.class,i);
		}
		public NumMulExpressionContext(NumExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterNumMulExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitNumMulExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitNumMulExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final NumExprContext numExpr() throws RecognitionException {
		return numExpr(0);
	}

	private NumExprContext numExpr(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		NumExprContext _localctx = new NumExprContext(_ctx, _parentState);
		NumExprContext _prevctx = _localctx;
		int _startState = 110;
		enterRecursionRule(_localctx, 110, RULE_numExpr, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(676);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,40,_ctx) ) {
			case 1:
				{
				_localctx = new NumLiteralExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(624);
				number();
				}
				break;
			case 2:
				{
				_localctx = new NumVariableExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(625);
				variable();
				}
				break;
			case 3:
				{
				_localctx = new NumBracketsContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(626);
				match(T__44);
				setState(627);
				numExpr(0);
				setState(628);
				match(T__45);
				}
				break;
			case 4:
				{
				_localctx = new NumCallStatementExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(630);
				callStmt();
				}
				break;
			case 5:
				{
				_localctx = new StringToFloatExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(631);
				match(T__77);
				setState(632);
				stringExpr();
				setState(633);
				match(T__70);
				setState(634);
				match(T__18);
				}
				break;
			case 6:
				{
				_localctx = new StringToIntExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(636);
				match(T__77);
				setState(637);
				stringExpr();
				setState(638);
				match(T__70);
				setState(639);
				match(T__17);
				}
				break;
			case 7:
				{
				_localctx = new BoolToIntExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(641);
				match(T__77);
				setState(642);
				boolExpr(0);
				setState(643);
				match(T__70);
				setState(644);
				match(T__17);
				}
				break;
			case 8:
				{
				_localctx = new NumToFloatExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(646);
				match(T__77);
				setState(647);
				numExpr(0);
				setState(648);
				match(T__70);
				setState(649);
				match(T__18);
				}
				break;
			case 9:
				{
				_localctx = new NumToIntExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(651);
				match(T__77);
				setState(652);
				numExpr(0);
				setState(653);
				match(T__70);
				setState(654);
				match(T__17);
				}
				break;
			case 10:
				{
				_localctx = new TimerExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(656);
				match(T__64);
				}
				break;
			case 11:
				{
				_localctx = new LengthOfStringExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(657);
				match(T__93);
				setState(658);
				match(T__16);
				setState(659);
				stringExpr();
				}
				break;
			case 12:
				{
				_localctx = new LengthOfListExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(660);
				match(T__93);
				setState(661);
				match(T__16);
				setState(662);
				match(T__15);
				setState(663);
				variable();
				}
				break;
			case 13:
				{
				_localctx = new IndexOfExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(664);
				match(T__94);
				setState(665);
				match(T__16);
				setState(666);
				expression();
				setState(667);
				match(T__38);
				setState(668);
				variable();
				}
				break;
			case 14:
				{
				_localctx = new DefaultNumExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(670);
				match(T__81);
				setState(671);
				number();
				setState(672);
				match(T__82);
				setState(673);
				numExpr(2);
				}
				break;
			case 15:
				{
				_localctx = new UnspecifiedNumExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(675);
				match(T__99);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(695);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,42,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(693);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,41,_ctx) ) {
					case 1:
						{
						_localctx = new NumMulExpressionContext(new NumExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_numExpr);
						setState(678);
						if (!(precpred(_ctx, 7))) throw new FailedPredicateException(this, "precpred(_ctx, 7)");
						setState(679);
						match(T__4);
						setState(680);
						numExpr(8);
						}
						break;
					case 2:
						{
						_localctx = new NumDivExpressionContext(new NumExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_numExpr);
						setState(681);
						if (!(precpred(_ctx, 6))) throw new FailedPredicateException(this, "precpred(_ctx, 6)");
						setState(682);
						match(T__95);
						setState(683);
						numExpr(7);
						}
						break;
					case 3:
						{
						_localctx = new NumModExpressionContext(new NumExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_numExpr);
						setState(684);
						if (!(precpred(_ctx, 5))) throw new FailedPredicateException(this, "precpred(_ctx, 5)");
						setState(685);
						match(T__96);
						setState(686);
						numExpr(6);
						}
						break;
					case 4:
						{
						_localctx = new NumPlusExpressionContext(new NumExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_numExpr);
						setState(687);
						if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
						setState(688);
						match(T__97);
						setState(689);
						numExpr(5);
						}
						break;
					case 5:
						{
						_localctx = new NumMinusExpressionContext(new NumExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_numExpr);
						setState(690);
						if (!(precpred(_ctx, 3))) throw new FailedPredicateException(this, "precpred(_ctx, 3)");
						setState(691);
						match(T__98);
						setState(692);
						numExpr(4);
						}
						break;
					}
					} 
				}
				setState(697);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,42,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class ListExprContext extends ParserRuleContext {
		public ListExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_listExpr; }
	 
		public ListExprContext() { }
		public void copyFrom(ListExprContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class ListWithElementsExpressionContext extends ListExprContext {
		public ExpressionListPlainContext expressionListPlain() {
			return getRuleContext(ExpressionListPlainContext.class,0);
		}
		public ListWithElementsExpressionContext(ListExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterListWithElementsExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitListWithElementsExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitListWithElementsExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class ListVariableExpressionContext extends ListExprContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public ListVariableExpressionContext(ListExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterListVariableExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitListVariableExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitListVariableExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ListExprContext listExpr() throws RecognitionException {
		ListExprContext _localctx = new ListExprContext(_ctx, getState());
		enterRule(_localctx, 112, RULE_listExpr);
		try {
			setState(703);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__104:
			case Identifier:
				_localctx = new ListVariableExpressionContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(698);
				variable();
				}
				break;
			case T__22:
				_localctx = new ListWithElementsExpressionContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(699);
				match(T__22);
				setState(700);
				expressionListPlain();
				setState(701);
				match(T__23);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ActorExprContext extends ParserRuleContext {
		public ActorExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_actorExpr; }
	 
		public ActorExprContext() { }
		public void copyFrom(ActorExprContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class StartCloneActorExpressionContext extends ActorExprContext {
		public ActorExprContext actorExpr() {
			return getRuleContext(ActorExprContext.class,0);
		}
		public StartCloneActorExpressionContext(ActorExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStartCloneActorExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStartCloneActorExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStartCloneActorExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class LocateActorExpressionContext extends ActorExprContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public LocateActorExpressionContext(ActorExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterLocateActorExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitLocateActorExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitLocateActorExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class ActorVariableExpressionContext extends ActorExprContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public ActorVariableExpressionContext(ActorExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterActorVariableExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitActorVariableExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitActorVariableExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class UsherActorExpressionContext extends ActorExprContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public IdentContext ident() {
			return getRuleContext(IdentContext.class,0);
		}
		public UsherActorExpressionContext(ActorExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterUsherActorExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitUsherActorExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitUsherActorExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ActorExprContext actorExpr() throws RecognitionException {
		ActorExprContext _localctx = new ActorExprContext(_ctx, getState());
		enterRule(_localctx, 114, RULE_actorExpr);
		try {
			setState(719);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,44,_ctx) ) {
			case 1:
				_localctx = new ActorVariableExpressionContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(705);
				variable();
				}
				break;
			case 2:
				_localctx = new LocateActorExpressionContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(706);
				match(T__100);
				setState(707);
				match(T__9);
				setState(708);
				stringExpr();
				}
				break;
			case 3:
				_localctx = new StartCloneActorExpressionContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(709);
				match(T__101);
				setState(710);
				match(T__33);
				setState(711);
				match(T__16);
				setState(712);
				actorExpr();
				}
				break;
			case 4:
				_localctx = new UsherActorExpressionContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(713);
				match(T__101);
				setState(714);
				match(T__9);
				setState(715);
				stringExpr();
				setState(716);
				match(T__14);
				setState(717);
				ident();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionContext extends ParserRuleContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public NumExprContext numExpr() {
			return getRuleContext(NumExprContext.class,0);
		}
		public BoolExprContext boolExpr() {
			return getRuleContext(BoolExprContext.class,0);
		}
		public ListExprContext listExpr() {
			return getRuleContext(ListExprContext.class,0);
		}
		public ActorExprContext actorExpr() {
			return getRuleContext(ActorExprContext.class,0);
		}
		public UnspecifiedExprContext unspecifiedExpr() {
			return getRuleContext(UnspecifiedExprContext.class,0);
		}
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExpressionContext expression() throws RecognitionException {
		ExpressionContext _localctx = new ExpressionContext(_ctx, getState());
		enterRule(_localctx, 116, RULE_expression);
		try {
			setState(727);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,45,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(721);
				stringExpr();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(722);
				numExpr(0);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(723);
				boolExpr(0);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(724);
				listExpr();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(725);
				actorExpr();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(726);
				unspecifiedExpr();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class UnspecifiedExprContext extends ParserRuleContext {
		public UnspecifiedExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_unspecifiedExpr; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterUnspecifiedExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitUnspecifiedExpr(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitUnspecifiedExpr(this);
			else return visitor.visitChildren(this);
		}
	}

	public final UnspecifiedExprContext unspecifiedExpr() throws RecognitionException {
		UnspecifiedExprContext _localctx = new UnspecifiedExprContext(_ctx, getState());
		enterRule(_localctx, 118, RULE_unspecifiedExpr);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(729);
			match(T__102);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class VariableContext extends ParserRuleContext {
		public VariableContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variable; }
	 
		public VariableContext() { }
		public void copyFrom(VariableContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class FlatVariableContext extends VariableContext {
		public IdentContext ident() {
			return getRuleContext(IdentContext.class,0);
		}
		public FlatVariableContext(VariableContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterFlatVariable(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitFlatVariable(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitFlatVariable(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class QualifiedVariableContext extends VariableContext {
		public List<IdentContext> ident() {
			return getRuleContexts(IdentContext.class);
		}
		public IdentContext ident(int i) {
			return getRuleContext(IdentContext.class,i);
		}
		public QualifiedVariableContext(VariableContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterQualifiedVariable(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitQualifiedVariable(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitQualifiedVariable(this);
			else return visitor.visitChildren(this);
		}
	}

	public final VariableContext variable() throws RecognitionException {
		VariableContext _localctx = new VariableContext(_ctx, getState());
		enterRule(_localctx, 120, RULE_variable);
		try {
			setState(736);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,46,_ctx) ) {
			case 1:
				_localctx = new FlatVariableContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(731);
				ident();
				}
				break;
			case 2:
				_localctx = new QualifiedVariableContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(732);
				ident();
				setState(733);
				match(T__103);
				setState(734);
				ident();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IdentContext extends ParserRuleContext {
		public IdentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ident; }
	 
		public IdentContext() { }
		public void copyFrom(IdentContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class IdentExpressionContext extends IdentContext {
		public TerminalNode Identifier() { return getToken(LEILAParser.Identifier, 0); }
		public IdentExpressionContext(IdentContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterIdentExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitIdentExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitIdentExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class StrIdentExpressionContext extends IdentContext {
		public TerminalNode String() { return getToken(LEILAParser.String, 0); }
		public StrIdentExpressionContext(IdentContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterStrIdentExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitStrIdentExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitStrIdentExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final IdentContext ident() throws RecognitionException {
		IdentContext _localctx = new IdentContext(_ctx, getState());
		enterRule(_localctx, 122, RULE_ident);
		try {
			setState(741);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case Identifier:
				_localctx = new IdentExpressionContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(738);
				match(Identifier);
				}
				break;
			case T__104:
				_localctx = new StrIdentExpressionContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(739);
				match(T__104);
				setState(740);
				match(String);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NumberContext extends ParserRuleContext {
		public NumberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_number; }
	 
		public NumberContext() { }
		public void copyFrom(NumberContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class IntegerLiteralExpressionContext extends NumberContext {
		public TerminalNode IntegerLiteral() { return getToken(LEILAParser.IntegerLiteral, 0); }
		public IntegerLiteralExpressionContext(NumberContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterIntegerLiteralExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitIntegerLiteralExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitIntegerLiteralExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class DecimalLiteralExpressionContext extends NumberContext {
		public TerminalNode DecimalLiteral() { return getToken(LEILAParser.DecimalLiteral, 0); }
		public DecimalLiteralExpressionContext(NumberContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterDecimalLiteralExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitDecimalLiteralExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitDecimalLiteralExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final NumberContext number() throws RecognitionException {
		NumberContext _localctx = new NumberContext(_ctx, getState());
		enterRule(_localctx, 124, RULE_number);
		try {
			setState(745);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IntegerLiteral:
				_localctx = new IntegerLiteralExpressionContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(743);
				match(IntegerLiteral);
				}
				break;
			case DecimalLiteral:
				_localctx = new DecimalLiteralExpressionContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(744);
				match(DecimalLiteral);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ResourceLocatorContext extends ParserRuleContext {
		public TerminalNode String() { return getToken(LEILAParser.String, 0); }
		public ResourceLocatorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_resourceLocator; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterResourceLocator(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitResourceLocator(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitResourceLocator(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ResourceLocatorContext resourceLocator() throws RecognitionException {
		ResourceLocatorContext _localctx = new ResourceLocatorContext(_ctx, getState());
		enterRule(_localctx, 126, RULE_resourceLocator);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(747);
			match(String);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MessageContext extends ParserRuleContext {
		public MessageContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_message; }
	 
		public MessageContext() { }
		public void copyFrom(MessageContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class SystemMessageContext extends MessageContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public ExpressionListContext expressionList() {
			return getRuleContext(ExpressionListContext.class,0);
		}
		public TerminalNode String() { return getToken(LEILAParser.String, 0); }
		public SystemMessageContext(MessageContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterSystemMessage(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitSystemMessage(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitSystemMessage(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class UserMessageContext extends MessageContext {
		public StringExprContext stringExpr() {
			return getRuleContext(StringExprContext.class,0);
		}
		public UserMessageContext(MessageContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).enterUserMessage(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof LEILAListener ) ((LEILAListener)listener).exitUserMessage(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof LEILAVisitor ) return ((LEILAVisitor<? extends T>)visitor).visitUserMessage(this);
			else return visitor.visitChildren(this);
		}
	}

	public final MessageContext message() throws RecognitionException {
		MessageContext _localctx = new MessageContext(_ctx, getState());
		enterRule(_localctx, 128, RULE_message);
		try {
			setState(755);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,49,_ctx) ) {
			case 1:
				_localctx = new UserMessageContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(749);
				stringExpr();
				}
				break;
			case 2:
				_localctx = new SystemMessageContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(750);
				stringExpr();
				setState(751);
				expressionList();
				setState(752);
				match(T__70);
				setState(753);
				match(String);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 53:
			return boolExpr_sempred((BoolExprContext)_localctx, predIndex);
		case 55:
			return numExpr_sempred((NumExprContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean boolExpr_sempred(BoolExprContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 10);
		case 1:
			return precpred(_ctx, 9);
		}
		return true;
	}
	private boolean numExpr_sempred(NumExprContext _localctx, int predIndex) {
		switch (predIndex) {
		case 2:
			return precpred(_ctx, 7);
		case 3:
			return precpred(_ctx, 6);
		case 4:
			return precpred(_ctx, 5);
		case 5:
			return precpred(_ctx, 4);
		case 6:
			return precpred(_ctx, 3);
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3u\u02f8\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t+\4"+
		",\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62\t\62\4\63\t\63\4\64\t"+
		"\64\4\65\t\65\4\66\t\66\4\67\t\67\48\t8\49\t9\4:\t:\4;\t;\4<\t<\4=\t="+
		"\4>\t>\4?\t?\4@\t@\4A\tA\4B\tB\3\2\3\2\3\2\3\2\3\2\3\2\3\3\3\3\3\4\7\4"+
		"\u008e\n\4\f\4\16\4\u0091\13\4\3\5\3\5\3\5\3\5\3\5\3\6\3\6\5\6\u009a\n"+
		"\6\3\7\7\7\u009d\n\7\f\7\16\7\u00a0\13\7\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3"+
		"\t\3\t\3\t\3\t\7\t\u00ad\n\t\f\t\16\t\u00b0\13\t\3\t\5\t\u00b3\n\t\3\n"+
		"\3\n\5\n\u00b7\n\n\3\13\3\13\3\13\3\13\3\13\3\13\3\f\3\f\3\f\3\f\3\r\3"+
		"\r\5\r\u00c5\n\r\3\16\7\16\u00c8\n\16\f\16\16\16\u00cb\13\16\3\17\3\17"+
		"\3\17\3\17\3\17\3\20\7\20\u00d3\n\20\f\20\16\20\u00d6\13\20\3\21\3\21"+
		"\3\21\3\21\3\21\5\21\u00dd\n\21\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22"+
		"\3\22\5\22\u00e8\n\22\3\23\3\23\3\23\3\23\3\23\3\23\3\23\3\24\7\24\u00f2"+
		"\n\24\f\24\16\24\u00f5\13\24\3\25\7\25\u00f8\n\25\f\25\16\25\u00fb\13"+
		"\25\3\26\3\26\3\27\3\27\3\27\3\27\3\27\3\27\3\27\3\27\3\27\3\27\3\27\3"+
		"\27\3\27\3\27\3\27\3\27\3\27\3\27\5\27\u0111\n\27\3\30\3\30\3\30\5\30"+
		"\u0116\n\30\3\31\7\31\u0119\n\31\f\31\16\31\u011c\13\31\3\32\3\32\3\32"+
		"\3\32\3\32\3\32\3\32\3\32\3\32\3\32\3\32\3\32\5\32\u012a\n\32\3\33\3\33"+
		"\3\33\3\33\3\33\3\33\5\33\u0132\n\33\3\34\3\34\3\34\5\34\u0137\n\34\3"+
		"\35\7\35\u013a\n\35\f\35\16\35\u013d\13\35\3\36\3\36\3\37\3\37\3\37\3"+
		"\37\3 \3 \3 \3 \3!\3!\3!\7!\u014c\n!\f!\16!\u014f\13!\3!\5!\u0152\n!\3"+
		"\"\3\"\3\"\5\"\u0157\n\"\3\"\3\"\3#\3#\3#\3$\7$\u015f\n$\f$\16$\u0162"+
		"\13$\3%\3%\3%\3%\3%\5%\u0169\n%\3&\3&\3&\3&\3&\3&\3\'\3\'\3\'\3\'\3\'"+
		"\5\'\u0176\n\'\3(\3(\3(\3(\3(\3)\3)\3)\3)\3)\3*\3*\3*\3*\3+\3+\3+\3,\3"+
		",\3,\3,\3-\3-\3-\7-\u0190\n-\f-\16-\u0193\13-\3-\5-\u0196\n-\3.\3.\3."+
		"\3/\3/\3/\3/\3/\3/\3/\3/\5/\u01a3\n/\3\60\3\60\3\60\3\60\5\60\u01a9\n"+
		"\60\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3"+
		"\61\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3"+
		"\61\3\61\5\61\u01c8\n\61\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62"+
		"\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62"+
		"\3\62\3\62\3\62\3\62\3\62\3\62\5\62\u01e7\n\62\3\63\3\63\3\63\3\63\3\63"+
		"\3\63\3\63\3\63\3\63\3\63\5\63\u01f3\n\63\3\64\7\64\u01f6\n\64\f\64\16"+
		"\64\u01f9\13\64\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\5\65\u0203\n\65"+
		"\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66"+
		"\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66"+
		"\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\5\66"+
		"\u022e\n\66\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67"+
		"\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67"+
		"\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67"+
		"\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\3\67\5\67\u0261\n\67\3\67\3\67"+
		"\3\67\3\67\3\67\3\67\7\67\u0269\n\67\f\67\16\67\u026c\13\67\38\38\58\u0270"+
		"\n8\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39"+
		"\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39\39"+
		"\39\39\39\39\39\39\39\39\59\u02a7\n9\39\39\39\39\39\39\39\39\39\39\39"+
		"\39\39\39\39\79\u02b8\n9\f9\169\u02bb\139\3:\3:\3:\3:\3:\5:\u02c2\n:\3"+
		";\3;\3;\3;\3;\3;\3;\3;\3;\3;\3;\3;\3;\3;\5;\u02d2\n;\3<\3<\3<\3<\3<\3"+
		"<\5<\u02da\n<\3=\3=\3>\3>\3>\3>\3>\5>\u02e3\n>\3?\3?\3?\5?\u02e8\n?\3"+
		"@\3@\5@\u02ec\n@\3A\3A\3B\3B\3B\3B\3B\3B\5B\u02f6\nB\3B\2\4lpC\2\4\6\b"+
		"\n\f\16\20\22\24\26\30\32\34\36 \"$&(*,.\60\62\64\668:<>@BDFHJLNPRTVX"+
		"Z\\^`bdfhjlnprtvxz|~\u0080\u0082\2\3\3\2\3\4\2\u0334\2\u0084\3\2\2\2\4"+
		"\u008a\3\2\2\2\6\u008f\3\2\2\2\b\u0092\3\2\2\2\n\u0099\3\2\2\2\f\u009e"+
		"\3\2\2\2\16\u00a1\3\2\2\2\20\u00b2\3\2\2\2\22\u00b6\3\2\2\2\24\u00b8\3"+
		"\2\2\2\26\u00be\3\2\2\2\30\u00c4\3\2\2\2\32\u00c9\3\2\2\2\34\u00cc\3\2"+
		"\2\2\36\u00d4\3\2\2\2 \u00dc\3\2\2\2\"\u00e7\3\2\2\2$\u00e9\3\2\2\2&\u00f3"+
		"\3\2\2\2(\u00f9\3\2\2\2*\u00fc\3\2\2\2,\u0110\3\2\2\2.\u0115\3\2\2\2\60"+
		"\u011a\3\2\2\2\62\u0129\3\2\2\2\64\u0131\3\2\2\2\66\u0136\3\2\2\28\u013b"+
		"\3\2\2\2:\u013e\3\2\2\2<\u0140\3\2\2\2>\u0144\3\2\2\2@\u0151\3\2\2\2B"+
		"\u0153\3\2\2\2D\u015a\3\2\2\2F\u0160\3\2\2\2H\u0168\3\2\2\2J\u016a\3\2"+
		"\2\2L\u0175\3\2\2\2N\u0177\3\2\2\2P\u017c\3\2\2\2R\u0181\3\2\2\2T\u0185"+
		"\3\2\2\2V\u0188\3\2\2\2X\u0195\3\2\2\2Z\u0197\3\2\2\2\\\u01a2\3\2\2\2"+
		"^\u01a8\3\2\2\2`\u01c7\3\2\2\2b\u01e6\3\2\2\2d\u01f2\3\2\2\2f\u01f7\3"+
		"\2\2\2h\u0202\3\2\2\2j\u022d\3\2\2\2l\u0260\3\2\2\2n\u026f\3\2\2\2p\u02a6"+
		"\3\2\2\2r\u02c1\3\2\2\2t\u02d1\3\2\2\2v\u02d9\3\2\2\2x\u02db\3\2\2\2z"+
		"\u02e2\3\2\2\2|\u02e7\3\2\2\2~\u02eb\3\2\2\2\u0080\u02ed\3\2\2\2\u0082"+
		"\u02f5\3\2\2\2\u0084\u0085\5\4\3\2\u0085\u0086\5|?\2\u0086\u0087\5\6\4"+
		"\2\u0087\u0088\5\f\7\2\u0088\u0089\7\2\2\3\u0089\3\3\2\2\2\u008a\u008b"+
		"\t\2\2\2\u008b\5\3\2\2\2\u008c\u008e\5\b\5\2\u008d\u008c\3\2\2\2\u008e"+
		"\u0091\3\2\2\2\u008f\u008d\3\2\2\2\u008f\u0090\3\2\2\2\u0090\7\3\2\2\2"+
		"\u0091\u008f\3\2\2\2\u0092\u0093\7\5\2\2\u0093\u0094\5\n\6\2\u0094\u0095"+
		"\7\6\2\2\u0095\u0096\5\u0080A\2\u0096\t\3\2\2\2\u0097\u009a\5|?\2\u0098"+
		"\u009a\7\7\2\2\u0099\u0097\3\2\2\2\u0099\u0098\3\2\2\2\u009a\13\3\2\2"+
		"\2\u009b\u009d\5\16\b\2\u009c\u009b\3\2\2\2\u009d\u00a0\3\2\2\2\u009e"+
		"\u009c\3\2\2\2\u009e\u009f\3\2\2\2\u009f\r\3\2\2\2\u00a0\u009e\3\2\2\2"+
		"\u00a1\u00a2\5\22\n\2\u00a2\u00a3\5|?\2\u00a3\u00a4\5\20\t\2\u00a4\u00a5"+
		"\7\b\2\2\u00a5\u00a6\5\24\13\2\u00a6\u00a7\7\t\2\2\u00a7\17\3\2\2\2\u00a8"+
		"\u00a9\7\n\2\2\u00a9\u00ae\5|?\2\u00aa\u00ab\7\13\2\2\u00ab\u00ad\5|?"+
		"\2\u00ac\u00aa\3\2\2\2\u00ad\u00b0\3\2\2\2\u00ae\u00ac\3\2\2\2\u00ae\u00af"+
		"\3\2\2\2\u00af\u00b3\3\2\2\2\u00b0\u00ae\3\2\2\2\u00b1\u00b3\3\2\2\2\u00b2"+
		"\u00a8\3\2\2\2\u00b2\u00b1\3\2\2\2\u00b3\21\3\2\2\2\u00b4\u00b7\7\f\2"+
		"\2\u00b5\u00b7\7\r\2\2\u00b6\u00b4\3\2\2\2\u00b6\u00b5\3\2\2\2\u00b7\23"+
		"\3\2\2\2\u00b8\u00b9\5\32\16\2\u00b9\u00ba\5\36\20\2\u00ba\u00bb\5f\64"+
		"\2\u00bb\u00bc\5\60\31\2\u00bc\u00bd\5&\24\2\u00bd\25\3\2\2\2\u00be\u00bf"+
		"\5\30\r\2\u00bf\u00c0\5|?\2\u00c0\u00c1\5\u0080A\2\u00c1\27\3\2\2\2\u00c2"+
		"\u00c5\7\16\2\2\u00c3\u00c5\7\17\2\2\u00c4\u00c2\3\2\2\2\u00c4\u00c3\3"+
		"\2\2\2\u00c5\31\3\2\2\2\u00c6\u00c8\5\26\f\2\u00c7\u00c6\3\2\2\2\u00c8"+
		"\u00cb\3\2\2\2\u00c9\u00c7\3\2\2\2\u00c9\u00ca\3\2\2\2\u00ca\33\3\2\2"+
		"\2\u00cb\u00c9\3\2\2\2\u00cc\u00cd\7\20\2\2\u00cd\u00ce\5|?\2\u00ce\u00cf"+
		"\7\21\2\2\u00cf\u00d0\5 \21\2\u00d0\35\3\2\2\2\u00d1\u00d3\5\34\17\2\u00d2"+
		"\u00d1\3\2\2\2\u00d3\u00d6\3\2\2\2\u00d4\u00d2\3\2\2\2\u00d4\u00d5\3\2"+
		"\2\2\u00d5\37\3\2\2\2\u00d6\u00d4\3\2\2\2\u00d7\u00d8\7\22\2\2\u00d8\u00d9"+
		"\7\23\2\2\u00d9\u00dd\5 \21\2\u00da\u00dd\7\f\2\2\u00db\u00dd\5\"\22\2"+
		"\u00dc\u00d7\3\2\2\2\u00dc\u00da\3\2\2\2\u00dc\u00db\3\2\2\2\u00dd!\3"+
		"\2\2\2\u00de\u00e8\7\24\2\2\u00df\u00e8\7\25\2\2\u00e0\u00e8\7\26\2\2"+
		"\u00e1\u00e8\7\27\2\2\u00e2\u00e3\7\30\2\2\u00e3\u00e4\7\31\2\2\u00e4"+
		"\u00e5\5X-\2\u00e5\u00e6\7\32\2\2\u00e6\u00e8\3\2\2\2\u00e7\u00de\3\2"+
		"\2\2\u00e7\u00df\3\2\2\2\u00e7\u00e0\3\2\2\2\u00e7\u00e1\3\2\2\2\u00e7"+
		"\u00e2\3\2\2\2\u00e8#\3\2\2\2\u00e9\u00ea\7\33\2\2\u00ea\u00eb\7\34\2"+
		"\2\u00eb\u00ec\5,\27\2\u00ec\u00ed\7\35\2\2\u00ed\u00ee\5(\25\2\u00ee"+
		"\u00ef\5B\"\2\u00ef%\3\2\2\2\u00f0\u00f2\5$\23\2\u00f1\u00f0\3\2\2\2\u00f2"+
		"\u00f5\3\2\2\2\u00f3\u00f1\3\2\2\2\u00f3\u00f4\3\2\2\2\u00f4\'\3\2\2\2"+
		"\u00f5\u00f3\3\2\2\2\u00f6\u00f8\5*\26\2\u00f7\u00f6\3\2\2\2\u00f8\u00fb"+
		"\3\2\2\2\u00f9\u00f7\3\2\2\2\u00f9\u00fa\3\2\2\2\u00fa)\3\2\2\2\u00fb"+
		"\u00f9\3\2\2\2\u00fc\u00fd\7\36\2\2\u00fd+\3\2\2\2\u00fe\u0111\7\37\2"+
		"\2\u00ff\u0111\7 \2\2\u0100\u0101\7 \2\2\u0101\u0111\7!\2\2\u0102\u0111"+
		"\7\"\2\2\u0103\u0104\7#\2\2\u0104\u0105\7\21\2\2\u0105\u0111\7$\2\2\u0106"+
		"\u0107\7%\2\2\u0107\u0108\5j\66\2\u0108\u0109\5> \2\u0109\u010a\5.\30"+
		"\2\u010a\u0111\3\2\2\2\u010b\u010c\7&\2\2\u010c\u0111\5l\67\2\u010d\u0111"+
		"\7\'\2\2\u010e\u010f\7(\2\2\u010f\u0111\7!\2\2\u0110\u00fe\3\2\2\2\u0110"+
		"\u00ff\3\2\2\2\u0110\u0100\3\2\2\2\u0110\u0102\3\2\2\2\u0110\u0103\3\2"+
		"\2\2\u0110\u0106\3\2\2\2\u0110\u010b\3\2\2\2\u0110\u010d\3\2\2\2\u0110"+
		"\u010e\3\2\2\2\u0111-\3\2\2\2\u0112\u0113\7)\2\2\u0113\u0116\7n\2\2\u0114"+
		"\u0116\3\2\2\2\u0115\u0112\3\2\2\2\u0115\u0114\3\2\2\2\u0116/\3\2\2\2"+
		"\u0117\u0119\5\62\32\2\u0118\u0117\3\2\2\2\u0119\u011c\3\2\2\2\u011a\u0118"+
		"\3\2\2\2\u011a\u011b\3\2\2\2\u011b\61\3\2\2\2\u011c\u011a\3\2\2\2\u011d"+
		"\u011e\7*\2\2\u011e\u011f\58\35\2\u011f\u0120\5|?\2\u0120\u0121\5> \2"+
		"\u0121\u0122\5B\"\2\u0122\u0123\5\64\33\2\u0123\u012a\3\2\2\2\u0124\u0125"+
		"\7+\2\2\u0125\u0126\5|?\2\u0126\u0127\5> \2\u0127\u0128\5\66\34\2\u0128"+
		"\u012a\3\2\2\2\u0129\u011d\3\2\2\2\u0129\u0124\3\2\2\2\u012a\63\3\2\2"+
		"\2\u012b\u012c\7,\2\2\u012c\u012d\5|?\2\u012d\u012e\7-\2\2\u012e\u012f"+
		"\5 \21\2\u012f\u0132\3\2\2\2\u0130\u0132\3\2\2\2\u0131\u012b\3\2\2\2\u0131"+
		"\u0130\3\2\2\2\u0132\65\3\2\2\2\u0133\u0134\7,\2\2\u0134\u0137\5 \21\2"+
		"\u0135\u0137\3\2\2\2\u0136\u0133\3\2\2\2\u0136\u0135\3\2\2\2\u0137\67"+
		"\3\2\2\2\u0138\u013a\5:\36\2\u0139\u0138\3\2\2\2\u013a\u013d\3\2\2\2\u013b"+
		"\u0139\3\2\2\2\u013b\u013c\3\2\2\2\u013c9\3\2\2\2\u013d\u013b\3\2\2\2"+
		"\u013e\u013f\7.\2\2\u013f;\3\2\2\2\u0140\u0141\5|?\2\u0141\u0142\7-\2"+
		"\2\u0142\u0143\5 \21\2\u0143=\3\2\2\2\u0144\u0145\7/\2\2\u0145\u0146\5"+
		"@!\2\u0146\u0147\7\60\2\2\u0147?\3\2\2\2\u0148\u014d\5<\37\2\u0149\u014a"+
		"\7\13\2\2\u014a\u014c\5<\37\2\u014b\u0149\3\2\2\2\u014c\u014f\3\2\2\2"+
		"\u014d\u014b\3\2\2\2\u014d\u014e\3\2\2\2\u014e\u0152\3\2\2\2\u014f\u014d"+
		"\3\2\2\2\u0150\u0152\3\2\2\2\u0151\u0148\3\2\2\2\u0151\u0150\3\2\2\2\u0152"+
		"A\3\2\2\2\u0153\u0154\7\b\2\2\u0154\u0156\5F$\2\u0155\u0157\5h\65\2\u0156"+
		"\u0155\3\2\2\2\u0156\u0157\3\2\2\2\u0157\u0158\3\2\2\2\u0158\u0159\7\t"+
		"\2\2\u0159C\3\2\2\2\u015a\u015b\7.\2\2\u015b\u015c\5B\"\2\u015cE\3\2\2"+
		"\2\u015d\u015f\5\\/\2\u015e\u015d\3\2\2\2\u015f\u0162\3\2\2\2\u0160\u015e"+
		"\3\2\2\2\u0160\u0161\3\2\2\2\u0161G\3\2\2\2\u0162\u0160\3\2\2\2\u0163"+
		"\u0169\5J&\2\u0164\u0169\5N(\2\u0165\u0169\5P)\2\u0166\u0169\5R*\2\u0167"+
		"\u0169\5T+\2\u0168\u0163\3\2\2\2\u0168\u0164\3\2\2\2\u0168\u0165\3\2\2"+
		"\2\u0168\u0166\3\2\2\2\u0168\u0167\3\2\2\2\u0169I\3\2\2\2\u016a\u016b"+
		"\7\61\2\2\u016b\u016c\5l\67\2\u016c\u016d\7\62\2\2\u016d\u016e\5B\"\2"+
		"\u016e\u016f\5L\'\2\u016fK\3\2\2\2\u0170\u0171\7\63\2\2\u0171\u0176\5"+
		"B\"\2\u0172\u0173\7\63\2\2\u0173\u0176\5J&\2\u0174\u0176\3\2\2\2\u0175"+
		"\u0170\3\2\2\2\u0175\u0172\3\2\2\2\u0175\u0174\3\2\2\2\u0176M\3\2\2\2"+
		"\u0177\u0178\7\64\2\2\u0178\u0179\5l\67\2\u0179\u017a\7\65\2\2\u017a\u017b"+
		"\5B\"\2\u017bO\3\2\2\2\u017c\u017d\7\65\2\2\u017d\u017e\5p9\2\u017e\u017f"+
		"\7\66\2\2\u017f\u0180\5B\"\2\u0180Q\3\2\2\2\u0181\u0182\7\65\2\2\u0182"+
		"\u0183\7\67\2\2\u0183\u0184\5B\"\2\u0184S\3\2\2\2\u0185\u0186\5|?\2\u0186"+
		"\u0187\5V,\2\u0187U\3\2\2\2\u0188\u0189\7/\2\2\u0189\u018a\5X-\2\u018a"+
		"\u018b\7\60\2\2\u018bW\3\2\2\2\u018c\u0191\5v<\2\u018d\u018e\7\13\2\2"+
		"\u018e\u0190\5v<\2\u018f\u018d\3\2\2\2\u0190\u0193\3\2\2\2\u0191\u018f"+
		"\3\2\2\2\u0191\u0192\3\2\2\2\u0192\u0196\3\2\2\2\u0193\u0191\3\2\2\2\u0194"+
		"\u0196\3\2\2\2\u0195\u018c\3\2\2\2\u0195\u0194\3\2\2\2\u0196Y\3\2\2\2"+
		"\u0197\u0198\78\2\2\u0198\u0199\5v<\2\u0199[\3\2\2\2\u019a\u01a3\5H%\2"+
		"\u019b\u01a3\5^\60\2\u019c\u01a3\5D#\2\u019d\u019e\79\2\2\u019e\u019f"+
		"\7o\2\2\u019f\u01a0\5V,\2\u01a0\u01a1\5\\/\2\u01a1\u01a3\3\2\2\2\u01a2"+
		"\u019a\3\2\2\2\u01a2\u019b\3\2\2\2\u01a2\u019c\3\2\2\2\u01a2\u019d\3\2"+
		"\2\2\u01a3]\3\2\2\2\u01a4\u01a9\5Z.\2\u01a5\u01a9\5`\61\2\u01a6\u01a9"+
		"\5b\62\2\u01a7\u01a9\5\34\17\2\u01a8\u01a4\3\2\2\2\u01a8\u01a5\3\2\2\2"+
		"\u01a8\u01a6\3\2\2\2\u01a8\u01a7\3\2\2\2\u01a9_\3\2\2\2\u01aa\u01ab\7"+
		":\2\2\u01ab\u01ac\5p9\2\u01ac\u01ad\7;\2\2\u01ad\u01c8\3\2\2\2\u01ae\u01af"+
		"\7:\2\2\u01af\u01b0\7\64\2\2\u01b0\u01c8\5l\67\2\u01b1\u01b2\7<\2\2\u01b2"+
		"\u01b3\7=\2\2\u01b3\u01b4\7>\2\2\u01b4\u01b5\7)\2\2\u01b5\u01c8\7\f\2"+
		"\2\u01b6\u01b7\7?\2\2\u01b7\u01b8\7$\2\2\u01b8\u01b9\7\23\2\2\u01b9\u01c8"+
		"\5j\66\2\u01ba\u01bb\7@\2\2\u01bb\u01c8\5\u0082B\2\u01bc\u01bd\7@\2\2"+
		"\u01bd\u01be\5\u0082B\2\u01be\u01bf\7A\2\2\u01bf\u01c0\7:\2\2\u01c0\u01c8"+
		"\3\2\2\2\u01c1\u01c2\7B\2\2\u01c2\u01c8\7C\2\2\u01c3\u01c8\7D\2\2\u01c4"+
		"\u01c5\7E\2\2\u01c5\u01c8\5l\67\2\u01c6\u01c8\5d\63\2\u01c7\u01aa\3\2"+
		"\2\2\u01c7\u01ae\3\2\2\2\u01c7\u01b1\3\2\2\2\u01c7\u01b6\3\2\2\2\u01c7"+
		"\u01ba\3\2\2\2\u01c7\u01bc\3\2\2\2\u01c7\u01c1\3\2\2\2\u01c7\u01c3\3\2"+
		"\2\2\u01c7\u01c4\3\2\2\2\u01c7\u01c6\3\2\2\2\u01c8a\3\2\2\2\u01c9\u01ca"+
		"\7F\2\2\u01ca\u01cb\7G\2\2\u01cb\u01cc\7\6\2\2\u01cc\u01e7\5z>\2\u01cd"+
		"\u01ce\7F\2\2\u01ce\u01cf\5p9\2\u01cf\u01d0\7\23\2\2\u01d0\u01d1\5z>\2"+
		"\u01d1\u01e7\3\2\2\2\u01d2\u01d3\7H\2\2\u01d3\u01d4\5j\66\2\u01d4\u01d5"+
		"\7I\2\2\u01d5\u01d6\5z>\2\u01d6\u01e7\3\2\2\2\u01d7\u01d8\7J\2\2\u01d8"+
		"\u01d9\5j\66\2\u01d9\u01da\7K\2\2\u01da\u01db\5p9\2\u01db\u01dc\7\23\2"+
		"\2\u01dc\u01dd\5z>\2\u01dd\u01e7\3\2\2\2\u01de\u01df\7L\2\2\u01df\u01e0"+
		"\7M\2\2\u01e0\u01e1\5p9\2\u01e1\u01e2\7\23\2\2\u01e2\u01e3\5z>\2\u01e3"+
		"\u01e4\7N\2\2\u01e4\u01e5\5j\66\2\u01e5\u01e7\3\2\2\2\u01e6\u01c9\3\2"+
		"\2\2\u01e6\u01cd\3\2\2\2\u01e6\u01d2\3\2\2\2\u01e6\u01d7\3\2\2\2\u01e6"+
		"\u01de\3\2\2\2\u01e7c\3\2\2\2\u01e8\u01e9\7*\2\2\u01e9\u01ea\5z>\2\u01ea"+
		"\u01eb\7\21\2\2\u01eb\u01ec\5v<\2\u01ec\u01f3\3\2\2\2\u01ed\u01ee\7*\2"+
		"\2\u01ee\u01ef\5z>\2\u01ef\u01f0\7\21\2\2\u01f0\u01f1\5T+\2\u01f1\u01f3"+
		"\3\2\2\2\u01f2\u01e8\3\2\2\2\u01f2\u01ed\3\2\2\2\u01f3e\3\2\2\2\u01f4"+
		"\u01f6\5d\63\2\u01f5\u01f4\3\2\2\2\u01f6\u01f9\3\2\2\2\u01f7\u01f5\3\2"+
		"\2\2\u01f7\u01f8\3\2\2\2\u01f8g\3\2\2\2\u01f9\u01f7\3\2\2\2\u01fa\u01fb"+
		"\7<\2\2\u01fb\u0203\7G\2\2\u01fc\u01fd\7<\2\2\u01fd\u01fe\7O\2\2\u01fe"+
		"\u0203\7\33\2\2\u01ff\u0200\7F\2\2\u0200\u0201\7O\2\2\u0201\u0203\7$\2"+
		"\2\u0202\u01fa\3\2\2\2\u0202\u01fc\3\2\2\2\u0202\u01ff\3\2\2\2\u0203i"+
		"\3\2\2\2\u0204\u022e\7n\2\2\u0205\u022e\5z>\2\u0206\u0207\7/\2\2\u0207"+
		"\u0208\5j\66\2\u0208\u0209\7\60\2\2\u0209\u022e\3\2\2\2\u020a\u022e\5"+
		"T+\2\u020b\u020c\7P\2\2\u020c\u020d\5p9\2\u020d\u020e\7I\2\2\u020e\u020f"+
		"\7\27\2\2\u020f\u022e\3\2\2\2\u0210\u0211\7P\2\2\u0211\u0212\5l\67\2\u0212"+
		"\u0213\7I\2\2\u0213\u0214\7\27\2\2\u0214\u022e\3\2\2\2\u0215\u0216\7Q"+
		"\2\2\u0216\u0217\5j\66\2\u0217\u0218\7\23\2\2\u0218\u0219\5t;\2\u0219"+
		"\u022e\3\2\2\2\u021a\u021b\7R\2\2\u021b\u021c\5j\66\2\u021c\u021d\5j\66"+
		"\2\u021d\u022e\3\2\2\2\u021e\u021f\7S\2\2\u021f\u0220\5p9\2\u0220\u0221"+
		"\7\23\2\2\u0221\u0222\5j\66\2\u0222\u022e\3\2\2\2\u0223\u0224\7M\2\2\u0224"+
		"\u0225\5p9\2\u0225\u0226\7\23\2\2\u0226\u0227\5z>\2\u0227\u022e\3\2\2"+
		"\2\u0228\u0229\7T\2\2\u0229\u022a\7n\2\2\u022a\u022b\7U\2\2\u022b\u022e"+
		"\5j\66\2\u022c\u022e\7V\2\2\u022d\u0204\3\2\2\2\u022d\u0205\3\2\2\2\u022d"+
		"\u0206\3\2\2\2\u022d\u020a\3\2\2\2\u022d\u020b\3\2\2\2\u022d\u0210\3\2"+
		"\2\2\u022d\u0215\3\2\2\2\u022d\u021a\3\2\2\2\u022d\u021e\3\2\2\2\u022d"+
		"\u0223\3\2\2\2\u022d\u0228\3\2\2\2\u022d\u022c\3\2\2\2\u022ek\3\2\2\2"+
		"\u022f\u0230\b\67\1\2\u0230\u0261\7l\2\2\u0231\u0261\5z>\2\u0232\u0233"+
		"\7/\2\2\u0233\u0234\5l\67\2\u0234\u0235\7\60\2\2\u0235\u0261\3\2\2\2\u0236"+
		"\u0261\5T+\2\u0237\u0238\7P\2\2\u0238\u0239\5p9\2\u0239\u023a\7I\2\2\u023a"+
		"\u023b\7\26\2\2\u023b\u0261\3\2\2\2\u023c\u023d\7P\2\2\u023d\u023e\5j"+
		"\66\2\u023e\u023f\7I\2\2\u023f\u0240\7\26\2\2\u0240\u0261\3\2\2\2\u0241"+
		"\u0242\7W\2\2\u0242\u0261\5l\67\r\u0243\u0244\5n8\2\u0244\u0245\7Y\2\2"+
		"\u0245\u0246\5n8\2\u0246\u0261\3\2\2\2\u0247\u0248\5n8\2\u0248\u0249\7"+
		"Z\2\2\u0249\u024a\5n8\2\u024a\u0261\3\2\2\2\u024b\u024c\5n8\2\u024c\u024d"+
		"\7[\2\2\u024d\u024e\5n8\2\u024e\u0261\3\2\2\2\u024f\u0250\5n8\2\u0250"+
		"\u0251\7\\\2\2\u0251\u0252\5n8\2\u0252\u0261\3\2\2\2\u0253\u0254\5n8\2"+
		"\u0254\u0255\7]\2\2\u0255\u0256\5n8\2\u0256\u0261\3\2\2\2\u0257\u0258"+
		"\5j\66\2\u0258\u0259\7^\2\2\u0259\u025a\5j\66\2\u025a\u0261\3\2\2\2\u025b"+
		"\u025c\7T\2\2\u025c\u025d\7l\2\2\u025d\u025e\7U\2\2\u025e\u0261\5l\67"+
		"\4\u025f\u0261\7_\2\2\u0260\u022f\3\2\2\2\u0260\u0231\3\2\2\2\u0260\u0232"+
		"\3\2\2\2\u0260\u0236\3\2\2\2\u0260\u0237\3\2\2\2\u0260\u023c\3\2\2\2\u0260"+
		"\u0241\3\2\2\2\u0260\u0243\3\2\2\2\u0260\u0247\3\2\2\2\u0260\u024b\3\2"+
		"\2\2\u0260\u024f\3\2\2\2\u0260\u0253\3\2\2\2\u0260\u0257\3\2\2\2\u0260"+
		"\u025b\3\2\2\2\u0260\u025f\3\2\2\2\u0261\u026a\3\2\2\2\u0262\u0263\f\f"+
		"\2\2\u0263\u0264\7A\2\2\u0264\u0269\5l\67\r\u0265\u0266\f\13\2\2\u0266"+
		"\u0267\7X\2\2\u0267\u0269\5l\67\f\u0268\u0262\3\2\2\2\u0268\u0265\3\2"+
		"\2\2\u0269\u026c\3\2\2\2\u026a\u0268\3\2\2\2\u026a\u026b\3\2\2\2\u026b"+
		"m\3\2\2\2\u026c\u026a\3\2\2\2\u026d\u0270\5p9\2\u026e\u0270\5j\66\2\u026f"+
		"\u026d\3\2\2\2\u026f\u026e\3\2\2\2\u0270o\3\2\2\2\u0271\u0272\b9\1\2\u0272"+
		"\u02a7\5~@\2\u0273\u02a7\5z>\2\u0274\u0275\7/\2\2\u0275\u0276\5p9\2\u0276"+
		"\u0277\7\60\2\2\u0277\u02a7\3\2\2\2\u0278\u02a7\5T+\2\u0279\u027a\7P\2"+
		"\2\u027a\u027b\5j\66\2\u027b\u027c\7I\2\2\u027c\u027d\7\25\2\2\u027d\u02a7"+
		"\3\2\2\2\u027e\u027f\7P\2\2\u027f\u0280\5j\66\2\u0280\u0281\7I\2\2\u0281"+
		"\u0282\7\24\2\2\u0282\u02a7\3\2\2\2\u0283\u0284\7P\2\2\u0284\u0285\5l"+
		"\67\2\u0285\u0286\7I\2\2\u0286\u0287\7\24\2\2\u0287\u02a7\3\2\2\2\u0288"+
		"\u0289\7P\2\2\u0289\u028a\5p9\2\u028a\u028b\7I\2\2\u028b\u028c\7\25\2"+
		"\2\u028c\u02a7\3\2\2\2\u028d\u028e\7P\2\2\u028e\u028f\5p9\2\u028f\u0290"+
		"\7I\2\2\u0290\u0291\7\24\2\2\u0291\u02a7\3\2\2\2\u0292\u02a7\7C\2\2\u0293"+
		"\u0294\7`\2\2\u0294\u0295\7\23\2\2\u0295\u02a7\5j\66\2\u0296\u0297\7`"+
		"\2\2\u0297\u0298\7\23\2\2\u0298\u0299\7\22\2\2\u0299\u02a7\5z>\2\u029a"+
		"\u029b\7a\2\2\u029b\u029c\7\23\2\2\u029c\u029d\5v<\2\u029d\u029e\7)\2"+
		"\2\u029e\u029f\5z>\2\u029f\u02a7\3\2\2\2\u02a0\u02a1\7T\2\2\u02a1\u02a2"+
		"\5~@\2\u02a2\u02a3\7U\2\2\u02a3\u02a4\5p9\4\u02a4\u02a7\3\2\2\2\u02a5"+
		"\u02a7\7f\2\2\u02a6\u0271\3\2\2\2\u02a6\u0273\3\2\2\2\u02a6\u0274\3\2"+
		"\2\2\u02a6\u0278\3\2\2\2\u02a6\u0279\3\2\2\2\u02a6\u027e\3\2\2\2\u02a6"+
		"\u0283\3\2\2\2\u02a6\u0288\3\2\2\2\u02a6\u028d\3\2\2\2\u02a6\u0292\3\2"+
		"\2\2\u02a6\u0293\3\2\2\2\u02a6\u0296\3\2\2\2\u02a6\u029a\3\2\2\2\u02a6"+
		"\u02a0\3\2\2\2\u02a6\u02a5\3\2\2\2\u02a7\u02b9\3\2\2\2\u02a8\u02a9\f\t"+
		"\2\2\u02a9\u02aa\7\7\2\2\u02aa\u02b8\5p9\n\u02ab\u02ac\f\b\2\2\u02ac\u02ad"+
		"\7b\2\2\u02ad\u02b8\5p9\t\u02ae\u02af\f\7\2\2\u02af\u02b0\7c\2\2\u02b0"+
		"\u02b8\5p9\b\u02b1\u02b2\f\6\2\2\u02b2\u02b3\7d\2\2\u02b3\u02b8\5p9\7"+
		"\u02b4\u02b5\f\5\2\2\u02b5\u02b6\7e\2\2\u02b6\u02b8\5p9\6\u02b7\u02a8"+
		"\3\2\2\2\u02b7\u02ab\3\2\2\2\u02b7\u02ae\3\2\2\2\u02b7\u02b1\3\2\2\2\u02b7"+
		"\u02b4\3\2\2\2\u02b8\u02bb\3\2\2\2\u02b9\u02b7\3\2\2\2\u02b9\u02ba\3\2"+
		"\2\2\u02baq\3\2\2\2\u02bb\u02b9\3\2\2\2\u02bc\u02c2\5z>\2\u02bd\u02be"+
		"\7\31\2\2\u02be\u02bf\5X-\2\u02bf\u02c0\7\32\2\2\u02c0\u02c2\3\2\2\2\u02c1"+
		"\u02bc\3\2\2\2\u02c1\u02bd\3\2\2\2\u02c2s\3\2\2\2\u02c3\u02d2\5z>\2\u02c4"+
		"\u02c5\7g\2\2\u02c5\u02c6\7\f\2\2\u02c6\u02d2\5j\66\2\u02c7\u02c8\7h\2"+
		"\2\u02c8\u02c9\7$\2\2\u02c9\u02ca\7\23\2\2\u02ca\u02d2\5t;\2\u02cb\u02cc"+
		"\7h\2\2\u02cc\u02cd\7\f\2\2\u02cd\u02ce\5j\66\2\u02ce\u02cf\7\21\2\2\u02cf"+
		"\u02d0\5|?\2\u02d0\u02d2\3\2\2\2\u02d1\u02c3\3\2\2\2\u02d1\u02c4\3\2\2"+
		"\2\u02d1\u02c7\3\2\2\2\u02d1\u02cb\3\2\2\2\u02d2u\3\2\2\2\u02d3\u02da"+
		"\5j\66\2\u02d4\u02da\5p9\2\u02d5\u02da\5l\67\2\u02d6\u02da\5r:\2\u02d7"+
		"\u02da\5t;\2\u02d8\u02da\5x=\2\u02d9\u02d3\3\2\2\2\u02d9\u02d4\3\2\2\2"+
		"\u02d9\u02d5\3\2\2\2\u02d9\u02d6\3\2\2\2\u02d9\u02d7\3\2\2\2\u02d9\u02d8"+
		"\3\2\2\2\u02daw\3\2\2\2\u02db\u02dc\7i\2\2\u02dcy\3\2\2\2\u02dd\u02e3"+
		"\5|?\2\u02de\u02df\5|?\2\u02df\u02e0\7j\2\2\u02e0\u02e1\5|?\2\u02e1\u02e3"+
		"\3\2\2\2\u02e2\u02dd\3\2\2\2\u02e2\u02de\3\2\2\2\u02e3{\3\2\2\2\u02e4"+
		"\u02e8\7o\2\2\u02e5\u02e6\7k\2\2\u02e6\u02e8\7n\2\2\u02e7\u02e4\3\2\2"+
		"\2\u02e7\u02e5\3\2\2\2\u02e8}\3\2\2\2\u02e9\u02ec\7p\2\2\u02ea\u02ec\7"+
		"q\2\2\u02eb\u02e9\3\2\2\2\u02eb\u02ea\3\2\2\2\u02ec\177\3\2\2\2\u02ed"+
		"\u02ee\7n\2\2\u02ee\u0081\3\2\2\2\u02ef\u02f6\5j\66\2\u02f0\u02f1\5j\66"+
		"\2\u02f1\u02f2\5V,\2\u02f2\u02f3\7I\2\2\u02f3\u02f4\7n\2\2\u02f4\u02f6"+
		"\3\2\2\2\u02f5\u02ef\3\2\2\2\u02f5\u02f0\3\2\2\2\u02f6\u0083\3\2\2\2\64"+
		"\u008f\u0099\u009e\u00ae\u00b2\u00b6\u00c4\u00c9\u00d4\u00dc\u00e7\u00f3"+
		"\u00f9\u0110\u0115\u011a\u0129\u0131\u0136\u013b\u014d\u0151\u0156\u0160"+
		"\u0168\u0175\u0191\u0195\u01a2\u01a8\u01c7\u01e6\u01f2\u01f7\u0202\u022d"+
		"\u0260\u0268\u026a\u026f\u02a6\u02b7\u02b9\u02c1\u02d1\u02d9\u02e2\u02e7"+
		"\u02eb\u02f5";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}