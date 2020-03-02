// Generated from src/bastet/syntax/parser/grammar/Scratch.g4 by ANTLR 4.7.3-SNAPSHOT


import {ATN} from "antlr4ts/atn/ATN";
import {ATNDeserializer} from "antlr4ts/atn/ATNDeserializer";
import {FailedPredicateException} from "antlr4ts/FailedPredicateException";
import {NoViableAltException} from "antlr4ts/NoViableAltException";
import {Parser} from "antlr4ts/Parser";
import {ParserRuleContext} from "antlr4ts/ParserRuleContext";
import {ParserATNSimulator} from "antlr4ts/atn/ParserATNSimulator";
import {RecognitionException} from "antlr4ts/RecognitionException";
import {RuleContext} from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import {TerminalNode} from "antlr4ts/tree/TerminalNode";
import {Token} from "antlr4ts/Token";
import {TokenStream} from "antlr4ts/TokenStream";
import {Vocabulary} from "antlr4ts/Vocabulary";
import {VocabularyImpl} from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import {ScratchListener} from "./ScratchListener";
import {ScratchVisitor} from "./ScratchVisitor";


export class ScratchParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly T__33 = 34;
	public static readonly T__34 = 35;
	public static readonly T__35 = 36;
	public static readonly T__36 = 37;
	public static readonly T__37 = 38;
	public static readonly T__38 = 39;
	public static readonly T__39 = 40;
	public static readonly T__40 = 41;
	public static readonly T__41 = 42;
	public static readonly T__42 = 43;
	public static readonly T__43 = 44;
	public static readonly T__44 = 45;
	public static readonly T__45 = 46;
	public static readonly T__46 = 47;
	public static readonly T__47 = 48;
	public static readonly T__48 = 49;
	public static readonly T__49 = 50;
	public static readonly T__50 = 51;
	public static readonly T__51 = 52;
	public static readonly T__52 = 53;
	public static readonly T__53 = 54;
	public static readonly T__54 = 55;
	public static readonly T__55 = 56;
	public static readonly T__56 = 57;
	public static readonly T__57 = 58;
	public static readonly T__58 = 59;
	public static readonly T__59 = 60;
	public static readonly T__60 = 61;
	public static readonly T__61 = 62;
	public static readonly T__62 = 63;
	public static readonly T__63 = 64;
	public static readonly T__64 = 65;
	public static readonly T__65 = 66;
	public static readonly T__66 = 67;
	public static readonly T__67 = 68;
	public static readonly T__68 = 69;
	public static readonly T__69 = 70;
	public static readonly T__70 = 71;
	public static readonly T__71 = 72;
	public static readonly T__72 = 73;
	public static readonly T__73 = 74;
	public static readonly T__74 = 75;
	public static readonly T__75 = 76;
	public static readonly T__76 = 77;
	public static readonly T__77 = 78;
	public static readonly T__78 = 79;
	public static readonly T__79 = 80;
	public static readonly T__80 = 81;
	public static readonly T__81 = 82;
	public static readonly T__82 = 83;
	public static readonly T__83 = 84;
	public static readonly T__84 = 85;
	public static readonly T__85 = 86;
	public static readonly T__86 = 87;
	public static readonly T__87 = 88;
	public static readonly T__88 = 89;
	public static readonly T__89 = 90;
	public static readonly T__90 = 91;
	public static readonly T__91 = 92;
	public static readonly T__92 = 93;
	public static readonly T__93 = 94;
	public static readonly T__94 = 95;
	public static readonly T__95 = 96;
	public static readonly T__96 = 97;
	public static readonly T__97 = 98;
	public static readonly T__98 = 99;
	public static readonly T__99 = 100;
	public static readonly T__100 = 101;
	public static readonly T__101 = 102;
	public static readonly T__102 = 103;
	public static readonly Boolean = 104;
	public static readonly String = 105;
	public static readonly Bool = 106;
	public static readonly Identifier = 107;
	public static readonly DecimalLiteral = 108;
	public static readonly Whitespace = 109;
	public static readonly Newline = 110;
	public static readonly BlockComment = 111;
	public static readonly LineComment = 112;
	public static readonly RULE_program = 0;
	public static readonly RULE_fileType = 1;
	public static readonly RULE_importDefinitionList = 2;
	public static readonly RULE_importDefinition = 3;
	public static readonly RULE_importSelector = 4;
	public static readonly RULE_actorDefinitionList = 5;
	public static readonly RULE_actorDefinition = 6;
	public static readonly RULE_inheritsFrom = 7;
	public static readonly RULE_actorMode = 8;
	public static readonly RULE_actorComponentsDefinition = 9;
	public static readonly RULE_resource = 10;
	public static readonly RULE_resourceType = 11;
	public static readonly RULE_resourceList = 12;
	public static readonly RULE_declarationStmt = 13;
	public static readonly RULE_declarationStmtList = 14;
	public static readonly RULE_type = 15;
	public static readonly RULE_primitiveType = 16;
	public static readonly RULE_indexType = 17;
	public static readonly RULE_script = 18;
	public static readonly RULE_scriptList = 19;
	public static readonly RULE_event = 20;
	public static readonly RULE_coreEvent = 21;
	public static readonly RULE_externMethodDefinition = 22;
	public static readonly RULE_externMethodResultDeclaration = 23;
	public static readonly RULE_externMethodDefinitionList = 24;
	public static readonly RULE_methodDefinition = 25;
	public static readonly RULE_methodResultDeclaration = 26;
	public static readonly RULE_methodDefinitionList = 27;
	public static readonly RULE_methodAttributeList = 28;
	public static readonly RULE_methodAttribute = 29;
	public static readonly RULE_parameter = 30;
	public static readonly RULE_parameterList = 31;
	public static readonly RULE_parameterListPlain = 32;
	public static readonly RULE_stmtList = 33;
	public static readonly RULE_atomicBlock = 34;
	public static readonly RULE_stmtListPlain = 35;
	public static readonly RULE_controlStmt = 36;
	public static readonly RULE_coreControlStmt = 37;
	public static readonly RULE_ifStmt = 38;
	public static readonly RULE_elseCase = 39;
	public static readonly RULE_untilStmt = 40;
	public static readonly RULE_repeatTimesStmt = 41;
	public static readonly RULE_repeatForeverStmt = 42;
	public static readonly RULE_callStmt = 43;
	public static readonly RULE_expressionList = 44;
	public static readonly RULE_expressionListPlain = 45;
	public static readonly RULE_expressionStmt = 46;
	public static readonly RULE_stmt = 47;
	public static readonly RULE_nonCtrlStmt = 48;
	public static readonly RULE_coreNonCtrlStmt = 49;
	public static readonly RULE_commonStmt = 50;
	public static readonly RULE_listStmt = 51;
	public static readonly RULE_setStmt = 52;
	public static readonly RULE_setStmtList = 53;
	public static readonly RULE_terminationStmt = 54;
	public static readonly RULE_stringExpr = 55;
	public static readonly RULE_coreStringExpr = 56;
	public static readonly RULE_boolExpr = 57;
	public static readonly RULE_coreBoolExpr = 58;
	public static readonly RULE_numExpr = 59;
	public static readonly RULE_numOrStringExpr = 60;
	public static readonly RULE_coreNumExpr = 61;
	public static readonly RULE_listExpr = 62;
	public static readonly RULE_expression = 63;
	public static readonly RULE_coreExpression = 64;
	public static readonly RULE_unspecifiedExpr = 65;
	public static readonly RULE_variable = 66;
	public static readonly RULE_color = 67;
	public static readonly RULE_ident = 68;
	public static readonly RULE_number = 69;
	public static readonly RULE_key = 70;
	public static readonly RULE_resourceLocator = 71;
	public static readonly RULE_message = 72;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "fileType", "importDefinitionList", "importDefinition", "importSelector",
		"actorDefinitionList", "actorDefinition", "inheritsFrom", "actorMode",
		"actorComponentsDefinition", "resource", "resourceType", "resourceList",
		"declarationStmt", "declarationStmtList", "type", "primitiveType", "indexType",
		"script", "scriptList", "event", "coreEvent", "externMethodDefinition",
		"externMethodResultDeclaration", "externMethodDefinitionList", "methodDefinition",
		"methodResultDeclaration", "methodDefinitionList", "methodAttributeList",
		"methodAttribute", "parameter", "parameterList", "parameterListPlain",
		"stmtList", "atomicBlock", "stmtListPlain", "controlStmt", "coreControlStmt",
		"ifStmt", "elseCase", "untilStmt", "repeatTimesStmt", "repeatForeverStmt",
		"callStmt", "expressionList", "expressionListPlain", "expressionStmt",
		"stmt", "nonCtrlStmt", "coreNonCtrlStmt", "commonStmt", "listStmt", "setStmt",
		"setStmtList", "terminationStmt", "stringExpr", "coreStringExpr", "boolExpr",
		"coreBoolExpr", "numExpr", "numOrStringExpr", "coreNumExpr", "listExpr",
		"expression", "coreExpression", "unspecifiedExpr", "variable", "color",
		"ident", "number", "key", "resourceLocator", "message",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'program'", "'module'", "'import'", "'from'", "'*'", "'begin'",
		"'end'", "'is'", "','", "'actor'", "'role'", "'image'", "'sound'", "'declare'",
		"'as'", "'list'", "'of'", "'number'", "'boolean'", "'string'", "'enum'",
		"'['", "']'", "'script'", "'on'", "'do'", "'never'", "'bootstrap'", "'finished'",
		"'startup'", "'started'", "'clone'", "'received'", "'message'", "'in'",
		"'reached condition'", "'rendered'", "'statement'", "'extern'", "'returns'",
		"'define'", "':'", "'atomic'", "'('", "')'", "'if'", "'then'", "'else'",
		"'until'", "'repeat'", "'times'", "'forever'", "'evaluate'", "'@'", "'wait'",
		"'seconds'", "'stop'", "'other'", "'scripts'", "'create'", "'broadcast'",
		"'and'", "'reset'", "'timer'", "'epsilon'", "'assume'", "'delete'", "'all'",
		"'add'", "'to'", "'insert'", "'at'", "'replace'", "'item'", "'by'", "'this'",
		"'cast'", "'attribute'", "'resource'", "'join'", "'letter'", "'default'",
		"'for'", "'?string'", "'not'", "'or'", "'>'", "'<'", "'='", "'contains'",
		"'?bool'", "'length'", "'index'", "'/'", "'mod'", "'+'", "'-'", "'?number'",
		"'?expr'", "'.'", "'rgba'", "'strid'", "'key'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, undefined,
		undefined, undefined, undefined, undefined, undefined, undefined, "Boolean",
		"String", "Bool", "Identifier", "DecimalLiteral", "Whitespace", "Newline",
		"BlockComment", "LineComment",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ScratchParser._LITERAL_NAMES, ScratchParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ScratchParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Scratch.g4"; }

	// @Override
	public get ruleNames(): string[] { return ScratchParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ScratchParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ScratchParser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ScratchParser.RULE_program);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 146;
			this.fileType();
			this.state = 147;
			this.ident();
			this.state = 148;
			this.importDefinitionList();
			this.state = 149;
			this.actorDefinitionList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fileType(): FileTypeContext {
		let _localctx: FileTypeContext = new FileTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ScratchParser.RULE_fileType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 151;
			_la = this._input.LA(1);
			if (!(_la === ScratchParser.T__0 || _la === ScratchParser.T__1)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public importDefinitionList(): ImportDefinitionListContext {
		let _localctx: ImportDefinitionListContext = new ImportDefinitionListContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ScratchParser.RULE_importDefinitionList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 156;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__2) {
				{
				{
				this.state = 153;
				this.importDefinition();
				}
				}
				this.state = 158;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public importDefinition(): ImportDefinitionContext {
		let _localctx: ImportDefinitionContext = new ImportDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ScratchParser.RULE_importDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 159;
			this.match(ScratchParser.T__2);
			this.state = 160;
			this.importSelector();
			this.state = 161;
			this.match(ScratchParser.T__3);
			this.state = 162;
			this.resourceLocator();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public importSelector(): ImportSelectorContext {
		let _localctx: ImportSelectorContext = new ImportSelectorContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, ScratchParser.RULE_importSelector);
		try {
			this.state = 166;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__101:
			case ScratchParser.Identifier:
				_localctx = new ImportSelectedActorContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 164;
				this.ident();
				}
				break;
			case ScratchParser.T__4:
				_localctx = new ImportAllActorsContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 165;
				this.match(ScratchParser.T__4);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public actorDefinitionList(): ActorDefinitionListContext {
		let _localctx: ActorDefinitionListContext = new ActorDefinitionListContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ScratchParser.RULE_actorDefinitionList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 171;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__9 || _la === ScratchParser.T__10) {
				{
				{
				this.state = 168;
				this.actorDefinition();
				}
				}
				this.state = 173;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public actorDefinition(): ActorDefinitionContext {
		let _localctx: ActorDefinitionContext = new ActorDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ScratchParser.RULE_actorDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 174;
			this.actorMode();
			this.state = 175;
			this.ident();
			this.state = 176;
			this.inheritsFrom();
			this.state = 177;
			this.match(ScratchParser.T__5);
			this.state = 178;
			this.actorComponentsDefinition();
			this.state = 179;
			this.match(ScratchParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public inheritsFrom(): InheritsFromContext {
		let _localctx: InheritsFromContext = new InheritsFromContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ScratchParser.RULE_inheritsFrom);
		let _la: number;
		try {
			this.state = 191;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__7:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 181;
				this.match(ScratchParser.T__7);
				this.state = 182;
				this.ident();
				this.state = 187;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ScratchParser.T__8) {
					{
					{
					this.state = 183;
					this.match(ScratchParser.T__8);
					this.state = 184;
					this.ident();
					}
					}
					this.state = 189;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case ScratchParser.T__5:
				this.enterOuterAlt(_localctx, 2);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public actorMode(): ActorModeContext {
		let _localctx: ActorModeContext = new ActorModeContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, ScratchParser.RULE_actorMode);
		try {
			this.state = 195;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__9:
				_localctx = new ConcreteActorModeContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 193;
				this.match(ScratchParser.T__9);
				}
				break;
			case ScratchParser.T__10:
				_localctx = new ActorRoleModeContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 194;
				this.match(ScratchParser.T__10);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public actorComponentsDefinition(): ActorComponentsDefinitionContext {
		let _localctx: ActorComponentsDefinitionContext = new ActorComponentsDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, ScratchParser.RULE_actorComponentsDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 197;
			this.resourceList();
			this.state = 198;
			this.declarationStmtList();
			this.state = 199;
			this.setStmtList();
			this.state = 200;
			this.externMethodDefinitionList();
			this.state = 201;
			this.methodDefinitionList();
			this.state = 202;
			this.scriptList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resource(): ResourceContext {
		let _localctx: ResourceContext = new ResourceContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, ScratchParser.RULE_resource);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 204;
			this.resourceType();
			this.state = 205;
			this.ident();
			this.state = 206;
			this.resourceLocator();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resourceType(): ResourceTypeContext {
		let _localctx: ResourceTypeContext = new ResourceTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, ScratchParser.RULE_resourceType);
		try {
			this.state = 210;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__11:
				_localctx = new ImageResourceContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 208;
				this.match(ScratchParser.T__11);
				}
				break;
			case ScratchParser.T__12:
				_localctx = new SoundResourceContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 209;
				this.match(ScratchParser.T__12);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resourceList(): ResourceListContext {
		let _localctx: ResourceListContext = new ResourceListContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, ScratchParser.RULE_resourceList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 215;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__11 || _la === ScratchParser.T__12) {
				{
				{
				this.state = 212;
				this.resource();
				}
				}
				this.state = 217;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public declarationStmt(): DeclarationStmtContext {
		let _localctx: DeclarationStmtContext = new DeclarationStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, ScratchParser.RULE_declarationStmt);
		try {
			_localctx = new DeclareVariableContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 218;
			this.match(ScratchParser.T__13);
			this.state = 219;
			this.ident();
			this.state = 220;
			this.match(ScratchParser.T__14);
			this.state = 221;
			this.type();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public declarationStmtList(): DeclarationStmtListContext {
		let _localctx: DeclarationStmtListContext = new DeclarationStmtListContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, ScratchParser.RULE_declarationStmtList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 226;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__13) {
				{
				{
				this.state = 223;
				this.declarationStmt();
				}
				}
				this.state = 228;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type(): TypeContext {
		let _localctx: TypeContext = new TypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, ScratchParser.RULE_type);
		try {
			this.state = 233;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__17:
			case ScratchParser.T__18:
			case ScratchParser.T__19:
			case ScratchParser.T__20:
				_localctx = new PrimitiveContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 229;
				this.primitiveType();
				}
				break;
			case ScratchParser.T__15:
				_localctx = new ListTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 230;
				this.match(ScratchParser.T__15);
				this.state = 231;
				this.match(ScratchParser.T__16);
				this.state = 232;
				this.type();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primitiveType(): PrimitiveTypeContext {
		let _localctx: PrimitiveTypeContext = new PrimitiveTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, ScratchParser.RULE_primitiveType);
		try {
			this.state = 243;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__17:
				_localctx = new NumberTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 235;
				this.match(ScratchParser.T__17);
				}
				break;
			case ScratchParser.T__18:
				_localctx = new BooleanTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 236;
				this.match(ScratchParser.T__18);
				}
				break;
			case ScratchParser.T__19:
				_localctx = new StringTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 237;
				this.match(ScratchParser.T__19);
				}
				break;
			case ScratchParser.T__20:
				_localctx = new EnumTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 238;
				this.match(ScratchParser.T__20);
				this.state = 239;
				this.match(ScratchParser.T__21);
				this.state = 240;
				this.expressionListPlain();
				this.state = 241;
				this.match(ScratchParser.T__22);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public indexType(): IndexTypeContext {
		let _localctx: IndexTypeContext = new IndexTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, ScratchParser.RULE_indexType);
		try {
			this.state = 247;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__17:
				_localctx = new NumberIndexTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 245;
				this.match(ScratchParser.T__17);
				}
				break;
			case ScratchParser.T__19:
				_localctx = new StringIndexTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 246;
				this.match(ScratchParser.T__19);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public script(): ScriptContext {
		let _localctx: ScriptContext = new ScriptContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, ScratchParser.RULE_script);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 249;
			this.match(ScratchParser.T__23);
			this.state = 250;
			this.match(ScratchParser.T__24);
			this.state = 251;
			this.event();
			this.state = 252;
			this.match(ScratchParser.T__25);
			this.state = 253;
			this.stmtList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public scriptList(): ScriptListContext {
		let _localctx: ScriptListContext = new ScriptListContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, ScratchParser.RULE_scriptList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 258;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__23) {
				{
				{
				this.state = 255;
				this.script();
				}
				}
				this.state = 260;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public event(): EventContext {
		let _localctx: EventContext = new EventContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, ScratchParser.RULE_event);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 261;
			this.coreEvent();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public coreEvent(): CoreEventContext {
		let _localctx: CoreEventContext = new CoreEventContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, ScratchParser.RULE_coreEvent);
		try {
			this.state = 282;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				_localctx = new NeverEventContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 263;
				this.match(ScratchParser.T__26);
				}
				break;

			case 2:
				_localctx = new BootstapEventContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 264;
				this.match(ScratchParser.T__27);
				}
				break;

			case 3:
				_localctx = new AfterBootstrapMonitoringEventContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 265;
				this.match(ScratchParser.T__27);
				this.state = 266;
				this.match(ScratchParser.T__28);
				}
				break;

			case 4:
				_localctx = new StartupEventContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 267;
				this.match(ScratchParser.T__29);
				}
				break;

			case 5:
				_localctx = new CloneStartEventContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 268;
				this.match(ScratchParser.T__30);
				this.state = 269;
				this.match(ScratchParser.T__14);
				this.state = 270;
				this.match(ScratchParser.T__31);
				}
				break;

			case 6:
				_localctx = new MessageReceivedEventContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 271;
				this.match(ScratchParser.T__32);
				this.state = 272;
				this.match(ScratchParser.T__33);
				this.state = 273;
				this.stringExpr();
				this.state = 274;
				this.match(ScratchParser.T__34);
				this.state = 275;
				this.match(ScratchParser.String);
				}
				break;

			case 7:
				_localctx = new ConditionReachedEventContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 277;
				this.match(ScratchParser.T__35);
				this.state = 278;
				this.boolExpr();
				}
				break;

			case 8:
				_localctx = new RenderedMonitoringEventContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 279;
				this.match(ScratchParser.T__36);
				}
				break;

			case 9:
				_localctx = new AfterStatementMonitoringEventContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 280;
				this.match(ScratchParser.T__37);
				this.state = 281;
				this.match(ScratchParser.T__28);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public externMethodDefinition(): ExternMethodDefinitionContext {
		let _localctx: ExternMethodDefinitionContext = new ExternMethodDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, ScratchParser.RULE_externMethodDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 284;
			this.match(ScratchParser.T__38);
			this.state = 285;
			this.ident();
			this.state = 286;
			this.parameterList();
			this.state = 287;
			this.externMethodResultDeclaration();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public externMethodResultDeclaration(): ExternMethodResultDeclarationContext {
		let _localctx: ExternMethodResultDeclarationContext = new ExternMethodResultDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, ScratchParser.RULE_externMethodResultDeclaration);
		try {
			this.state = 292;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__39:
				_localctx = new ExternFunctionReturnDefinitionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 289;
				this.match(ScratchParser.T__39);
				this.state = 290;
				this.type();
				}
				break;
			case ScratchParser.T__6:
			case ScratchParser.T__23:
			case ScratchParser.T__38:
			case ScratchParser.T__40:
				_localctx = new ExternVoidReturnDefinitionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public externMethodDefinitionList(): ExternMethodDefinitionListContext {
		let _localctx: ExternMethodDefinitionListContext = new ExternMethodDefinitionListContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, ScratchParser.RULE_externMethodDefinitionList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 297;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__38) {
				{
				{
				this.state = 294;
				this.externMethodDefinition();
				}
				}
				this.state = 299;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodDefinition(): MethodDefinitionContext {
		let _localctx: MethodDefinitionContext = new MethodDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, ScratchParser.RULE_methodDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 300;
			this.match(ScratchParser.T__40);
			this.state = 301;
			this.methodAttributeList();
			this.state = 302;
			this.ident();
			this.state = 303;
			this.parameterList();
			this.state = 304;
			this.stmtList();
			this.state = 305;
			this.methodResultDeclaration();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodResultDeclaration(): MethodResultDeclarationContext {
		let _localctx: MethodResultDeclarationContext = new MethodResultDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, ScratchParser.RULE_methodResultDeclaration);
		try {
			this.state = 313;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__39:
				_localctx = new FunctionReturnDefinitionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 307;
				this.match(ScratchParser.T__39);
				this.state = 308;
				this.ident();
				this.state = 309;
				this.match(ScratchParser.T__41);
				this.state = 310;
				this.type();
				}
				break;
			case ScratchParser.T__6:
			case ScratchParser.T__23:
			case ScratchParser.T__40:
				_localctx = new VoidReturnDefinitionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodDefinitionList(): MethodDefinitionListContext {
		let _localctx: MethodDefinitionListContext = new MethodDefinitionListContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, ScratchParser.RULE_methodDefinitionList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 318;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__40) {
				{
				{
				this.state = 315;
				this.methodDefinition();
				}
				}
				this.state = 320;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodAttributeList(): MethodAttributeListContext {
		let _localctx: MethodAttributeListContext = new MethodAttributeListContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, ScratchParser.RULE_methodAttributeList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 324;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__42) {
				{
				{
				this.state = 321;
				this.methodAttribute();
				}
				}
				this.state = 326;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodAttribute(): MethodAttributeContext {
		let _localctx: MethodAttributeContext = new MethodAttributeContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, ScratchParser.RULE_methodAttribute);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 327;
			this.match(ScratchParser.T__42);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameter(): ParameterContext {
		let _localctx: ParameterContext = new ParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, ScratchParser.RULE_parameter);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 329;
			this.ident();
			this.state = 330;
			this.match(ScratchParser.T__41);
			this.state = 331;
			this.type();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameterList(): ParameterListContext {
		let _localctx: ParameterListContext = new ParameterListContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, ScratchParser.RULE_parameterList);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 333;
			this.match(ScratchParser.T__43);
			this.state = 334;
			this.parameterListPlain();
			this.state = 335;
			this.match(ScratchParser.T__44);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameterListPlain(): ParameterListPlainContext {
		let _localctx: ParameterListPlainContext = new ParameterListPlainContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, ScratchParser.RULE_parameterListPlain);
		let _la: number;
		try {
			this.state = 346;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__101:
			case ScratchParser.Identifier:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 337;
				this.parameter();
				this.state = 342;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ScratchParser.T__8) {
					{
					{
					this.state = 338;
					this.match(ScratchParser.T__8);
					this.state = 339;
					this.parameter();
					}
					}
					this.state = 344;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case ScratchParser.T__44:
				this.enterOuterAlt(_localctx, 2);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmtList(): StmtListContext {
		let _localctx: StmtListContext = new StmtListContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, ScratchParser.RULE_stmtList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 348;
			this.match(ScratchParser.T__5);
			this.state = 349;
			this.stmtListPlain();
			this.state = 351;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ScratchParser.T__56 || _la === ScratchParser.T__66) {
				{
				this.state = 350;
				this.terminationStmt();
				}
			}

			this.state = 353;
			this.match(ScratchParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public atomicBlock(): AtomicBlockContext {
		let _localctx: AtomicBlockContext = new AtomicBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, ScratchParser.RULE_atomicBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 355;
			this.match(ScratchParser.T__42);
			this.state = 356;
			this.stmtList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmtListPlain(): StmtListPlainContext {
		let _localctx: StmtListPlainContext = new StmtListPlainContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, ScratchParser.RULE_stmtListPlain);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 361;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 22, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 358;
					this.stmt();
					}
					}
				}
				this.state = 363;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 22, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public controlStmt(): ControlStmtContext {
		let _localctx: ControlStmtContext = new ControlStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, ScratchParser.RULE_controlStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 364;
			this.coreControlStmt();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public coreControlStmt(): CoreControlStmtContext {
		let _localctx: CoreControlStmtContext = new CoreControlStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, ScratchParser.RULE_coreControlStmt);
		try {
			this.state = 371;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 366;
				this.ifStmt();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 367;
				this.untilStmt();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 368;
				this.repeatTimesStmt();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 369;
				this.repeatForeverStmt();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 370;
				this.callStmt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ifStmt(): IfStmtContext {
		let _localctx: IfStmtContext = new IfStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, ScratchParser.RULE_ifStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 373;
			this.match(ScratchParser.T__45);
			this.state = 374;
			this.boolExpr();
			this.state = 375;
			this.match(ScratchParser.T__46);
			this.state = 376;
			this.stmtList();
			this.state = 377;
			this.elseCase();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elseCase(): ElseCaseContext {
		let _localctx: ElseCaseContext = new ElseCaseContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, ScratchParser.RULE_elseCase);
		try {
			this.state = 382;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__47:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 379;
				this.match(ScratchParser.T__47);
				this.state = 380;
				this.stmtList();
				}
				break;
			case ScratchParser.T__6:
			case ScratchParser.T__13:
			case ScratchParser.T__40:
			case ScratchParser.T__42:
			case ScratchParser.T__45:
			case ScratchParser.T__48:
			case ScratchParser.T__49:
			case ScratchParser.T__52:
			case ScratchParser.T__53:
			case ScratchParser.T__54:
			case ScratchParser.T__56:
			case ScratchParser.T__59:
			case ScratchParser.T__60:
			case ScratchParser.T__62:
			case ScratchParser.T__64:
			case ScratchParser.T__65:
			case ScratchParser.T__66:
			case ScratchParser.T__68:
			case ScratchParser.T__70:
			case ScratchParser.T__72:
			case ScratchParser.T__101:
			case ScratchParser.Identifier:
				this.enterOuterAlt(_localctx, 2);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public untilStmt(): UntilStmtContext {
		let _localctx: UntilStmtContext = new UntilStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, ScratchParser.RULE_untilStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 384;
			this.match(ScratchParser.T__48);
			this.state = 385;
			this.boolExpr();
			this.state = 386;
			this.match(ScratchParser.T__49);
			this.state = 387;
			this.stmtList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public repeatTimesStmt(): RepeatTimesStmtContext {
		let _localctx: RepeatTimesStmtContext = new RepeatTimesStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, ScratchParser.RULE_repeatTimesStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 389;
			this.match(ScratchParser.T__49);
			this.state = 390;
			this.numExpr();
			this.state = 391;
			this.match(ScratchParser.T__50);
			this.state = 392;
			this.stmtList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public repeatForeverStmt(): RepeatForeverStmtContext {
		let _localctx: RepeatForeverStmtContext = new RepeatForeverStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, ScratchParser.RULE_repeatForeverStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 394;
			this.match(ScratchParser.T__49);
			this.state = 395;
			this.match(ScratchParser.T__51);
			this.state = 396;
			this.stmtList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public callStmt(): CallStmtContext {
		let _localctx: CallStmtContext = new CallStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, ScratchParser.RULE_callStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 398;
			this.ident();
			this.state = 399;
			this.expressionList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionList(): ExpressionListContext {
		let _localctx: ExpressionListContext = new ExpressionListContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, ScratchParser.RULE_expressionList);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 401;
			this.match(ScratchParser.T__43);
			this.state = 402;
			this.expressionListPlain();
			this.state = 403;
			this.match(ScratchParser.T__44);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionListPlain(): ExpressionListPlainContext {
		let _localctx: ExpressionListPlainContext = new ExpressionListPlainContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, ScratchParser.RULE_expressionListPlain);
		let _la: number;
		try {
			this.state = 414;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__21:
			case ScratchParser.T__43:
			case ScratchParser.T__63:
			case ScratchParser.T__73:
			case ScratchParser.T__76:
			case ScratchParser.T__77:
			case ScratchParser.T__78:
			case ScratchParser.T__79:
			case ScratchParser.T__80:
			case ScratchParser.T__81:
			case ScratchParser.T__83:
			case ScratchParser.T__84:
			case ScratchParser.T__90:
			case ScratchParser.T__91:
			case ScratchParser.T__92:
			case ScratchParser.T__97:
			case ScratchParser.T__98:
			case ScratchParser.T__101:
			case ScratchParser.Boolean:
			case ScratchParser.String:
			case ScratchParser.Identifier:
			case ScratchParser.DecimalLiteral:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 405;
				this.expression();
				this.state = 410;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ScratchParser.T__8) {
					{
					{
					this.state = 406;
					this.match(ScratchParser.T__8);
					this.state = 407;
					this.expression();
					}
					}
					this.state = 412;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case ScratchParser.T__22:
			case ScratchParser.T__44:
				this.enterOuterAlt(_localctx, 2);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionStmt(): ExpressionStmtContext {
		let _localctx: ExpressionStmtContext = new ExpressionStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, ScratchParser.RULE_expressionStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 416;
			this.match(ScratchParser.T__52);
			this.state = 417;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmt(): StmtContext {
		let _localctx: StmtContext = new StmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, ScratchParser.RULE_stmt);
		try {
			this.state = 427;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__45:
			case ScratchParser.T__48:
			case ScratchParser.T__49:
			case ScratchParser.T__101:
			case ScratchParser.Identifier:
				_localctx = new ControlStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 419;
				this.controlStmt();
				}
				break;
			case ScratchParser.T__13:
			case ScratchParser.T__40:
			case ScratchParser.T__52:
			case ScratchParser.T__54:
			case ScratchParser.T__56:
			case ScratchParser.T__59:
			case ScratchParser.T__60:
			case ScratchParser.T__62:
			case ScratchParser.T__64:
			case ScratchParser.T__65:
			case ScratchParser.T__66:
			case ScratchParser.T__68:
			case ScratchParser.T__70:
			case ScratchParser.T__72:
				_localctx = new NonControlStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 420;
				this.nonCtrlStmt();
				}
				break;
			case ScratchParser.T__42:
				_localctx = new AtomicBlockStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 421;
				this.atomicBlock();
				}
				break;
			case ScratchParser.T__53:
				_localctx = new AttributedStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 422;
				this.match(ScratchParser.T__53);
				this.state = 423;
				this.match(ScratchParser.Identifier);
				this.state = 424;
				this.expressionList();
				this.state = 425;
				this.stmt();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nonCtrlStmt(): NonCtrlStmtContext {
		let _localctx: NonCtrlStmtContext = new NonCtrlStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, ScratchParser.RULE_nonCtrlStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 429;
			this.coreNonCtrlStmt();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public coreNonCtrlStmt(): CoreNonCtrlStmtContext {
		let _localctx: CoreNonCtrlStmtContext = new CoreNonCtrlStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, ScratchParser.RULE_coreNonCtrlStmt);
		try {
			this.state = 435;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__52:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 431;
				this.expressionStmt();
				}
				break;
			case ScratchParser.T__40:
			case ScratchParser.T__54:
			case ScratchParser.T__56:
			case ScratchParser.T__59:
			case ScratchParser.T__60:
			case ScratchParser.T__62:
			case ScratchParser.T__64:
			case ScratchParser.T__65:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 432;
				this.commonStmt();
				}
				break;
			case ScratchParser.T__66:
			case ScratchParser.T__68:
			case ScratchParser.T__70:
			case ScratchParser.T__72:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 433;
				this.listStmt();
				}
				break;
			case ScratchParser.T__13:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 434;
				this.declarationStmt();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public commonStmt(): CommonStmtContext {
		let _localctx: CommonStmtContext = new CommonStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, ScratchParser.RULE_commonStmt);
		try {
			this.state = 466;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 29, this._ctx) ) {
			case 1:
				_localctx = new WaitSecsStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 437;
				this.match(ScratchParser.T__54);
				this.state = 438;
				this.numExpr();
				this.state = 439;
				this.match(ScratchParser.T__55);
				}
				break;

			case 2:
				_localctx = new WaitUntilStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 441;
				this.match(ScratchParser.T__54);
				this.state = 442;
				this.match(ScratchParser.T__48);
				this.state = 443;
				this.boolExpr();
				}
				break;

			case 3:
				_localctx = new StopOthersInActorStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 444;
				this.match(ScratchParser.T__56);
				this.state = 445;
				this.match(ScratchParser.T__57);
				this.state = 446;
				this.match(ScratchParser.T__58);
				this.state = 447;
				this.match(ScratchParser.T__34);
				this.state = 448;
				this.match(ScratchParser.T__9);
				}
				break;

			case 4:
				_localctx = new CreateCloneOfStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 449;
				this.match(ScratchParser.T__59);
				this.state = 450;
				this.match(ScratchParser.T__31);
				this.state = 451;
				this.match(ScratchParser.T__16);
				this.state = 452;
				this.stringExpr();
				}
				break;

			case 5:
				_localctx = new BroadcastMessageStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 453;
				this.match(ScratchParser.T__60);
				this.state = 454;
				this.message();
				}
				break;

			case 6:
				_localctx = new BroadcastAndWaitStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 455;
				this.match(ScratchParser.T__60);
				this.state = 456;
				this.message();
				this.state = 457;
				this.match(ScratchParser.T__61);
				this.state = 458;
				this.match(ScratchParser.T__54);
				}
				break;

			case 7:
				_localctx = new ResetTimerStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 460;
				this.match(ScratchParser.T__62);
				this.state = 461;
				this.match(ScratchParser.T__63);
				}
				break;

			case 8:
				_localctx = new EpsilonStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 462;
				this.match(ScratchParser.T__64);
				}
				break;

			case 9:
				_localctx = new AssumeStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 463;
				this.match(ScratchParser.T__65);
				this.state = 464;
				this.boolExpr();
				}
				break;

			case 10:
				_localctx = new SetStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 465;
				this.setStmt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public listStmt(): ListStmtContext {
		let _localctx: ListStmtContext = new ListStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, ScratchParser.RULE_listStmt);
		try {
			this.state = 497;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				_localctx = new DeleteAllFromStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 468;
				this.match(ScratchParser.T__66);
				this.state = 469;
				this.match(ScratchParser.T__67);
				this.state = 470;
				this.match(ScratchParser.T__16);
				this.state = 471;
				this.variable();
				}
				break;

			case 2:
				_localctx = new DeleteIthFromStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 472;
				this.match(ScratchParser.T__66);
				this.state = 473;
				this.numExpr();
				this.state = 474;
				this.match(ScratchParser.T__16);
				this.state = 475;
				this.variable();
				}
				break;

			case 3:
				_localctx = new AddElementToStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 477;
				this.match(ScratchParser.T__68);
				this.state = 478;
				this.stringExpr();
				this.state = 479;
				this.match(ScratchParser.T__69);
				this.state = 480;
				this.variable();
				}
				break;

			case 4:
				_localctx = new InsertAtStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 482;
				this.match(ScratchParser.T__70);
				this.state = 483;
				this.stringExpr();
				this.state = 484;
				this.match(ScratchParser.T__71);
				this.state = 485;
				this.numExpr();
				this.state = 486;
				this.match(ScratchParser.T__16);
				this.state = 487;
				this.variable();
				}
				break;

			case 5:
				_localctx = new ReplaceElementAtStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 489;
				this.match(ScratchParser.T__72);
				this.state = 490;
				this.match(ScratchParser.T__73);
				this.state = 491;
				this.numExpr();
				this.state = 492;
				this.match(ScratchParser.T__16);
				this.state = 493;
				this.variable();
				this.state = 494;
				this.match(ScratchParser.T__74);
				this.state = 495;
				this.stringExpr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public setStmt(): SetStmtContext {
		let _localctx: SetStmtContext = new SetStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, ScratchParser.RULE_setStmt);
		try {
			this.state = 509;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 31, this._ctx) ) {
			case 1:
				_localctx = new StoreEvalResultStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 499;
				this.match(ScratchParser.T__40);
				this.state = 500;
				this.variable();
				this.state = 501;
				this.match(ScratchParser.T__14);
				this.state = 502;
				this.expression();
				}
				break;

			case 2:
				_localctx = new StoreCallResultStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 504;
				this.match(ScratchParser.T__40);
				this.state = 505;
				this.variable();
				this.state = 506;
				this.match(ScratchParser.T__14);
				this.state = 507;
				this.callStmt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public setStmtList(): SetStmtListContext {
		let _localctx: SetStmtListContext = new SetStmtListContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, ScratchParser.RULE_setStmtList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 514;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 32, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 511;
					this.setStmt();
					}
					}
				}
				this.state = 516;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 32, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public terminationStmt(): TerminationStmtContext {
		let _localctx: TerminationStmtContext = new TerminationStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, ScratchParser.RULE_terminationStmt);
		try {
			this.state = 525;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				_localctx = new StopAllContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 517;
				this.match(ScratchParser.T__56);
				this.state = 518;
				this.match(ScratchParser.T__67);
				}
				break;

			case 2:
				_localctx = new StopThisContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 519;
				this.match(ScratchParser.T__56);
				this.state = 520;
				this.match(ScratchParser.T__75);
				this.state = 521;
				this.match(ScratchParser.T__23);
				}
				break;

			case 3:
				_localctx = new DeleteThisCloneContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 522;
				this.match(ScratchParser.T__66);
				this.state = 523;
				this.match(ScratchParser.T__75);
				this.state = 524;
				this.match(ScratchParser.T__31);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stringExpr(): StringExprContext {
		let _localctx: StringExprContext = new StringExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, ScratchParser.RULE_stringExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 527;
			this.coreStringExpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public coreStringExpr(): CoreStringExprContext {
		let _localctx: CoreStringExprContext = new CoreStringExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, ScratchParser.RULE_coreStringExpr);
		try {
			this.state = 576;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				_localctx = new StringLiteralExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 529;
				this.match(ScratchParser.String);
				}
				break;

			case 2:
				_localctx = new StringVariableExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 530;
				this.variable();
				}
				break;

			case 3:
				_localctx = new StringParanthExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 531;
				this.match(ScratchParser.T__43);
				this.state = 532;
				this.coreStringExpr();
				this.state = 533;
				this.match(ScratchParser.T__44);
				}
				break;

			case 4:
				_localctx = new StringCallStatementExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 535;
				this.callStmt();
				}
				break;

			case 5:
				_localctx = new NumAsStringExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 536;
				this.match(ScratchParser.T__76);
				this.state = 537;
				this.numExpr();
				this.state = 538;
				this.match(ScratchParser.T__69);
				this.state = 539;
				this.match(ScratchParser.T__19);
				}
				break;

			case 6:
				_localctx = new BoolAsStringExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 541;
				this.match(ScratchParser.T__76);
				this.state = 542;
				this.boolExpr();
				this.state = 543;
				this.match(ScratchParser.T__69);
				this.state = 544;
				this.match(ScratchParser.T__19);
				}
				break;

			case 7:
				_localctx = new StringAttributeOfExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 546;
				this.match(ScratchParser.T__77);
				this.state = 547;
				this.stringExpr();
				this.state = 548;
				this.match(ScratchParser.T__16);
				this.state = 549;
				this.ident();
				}
				break;

			case 8:
				_localctx = new ResourceAttributeOfExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 551;
				this.match(ScratchParser.T__78);
				this.state = 552;
				this.match(ScratchParser.T__77);
				this.state = 553;
				this.stringExpr();
				this.state = 554;
				this.match(ScratchParser.T__16);
				this.state = 555;
				this.variable();
				}
				break;

			case 9:
				_localctx = new JoinStringsExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 557;
				this.match(ScratchParser.T__79);
				this.state = 558;
				this.stringExpr();
				this.state = 559;
				this.stringExpr();
				}
				break;

			case 10:
				_localctx = new IthLetterOfStringExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 561;
				this.match(ScratchParser.T__80);
				this.state = 562;
				this.numExpr();
				this.state = 563;
				this.match(ScratchParser.T__16);
				this.state = 564;
				this.stringExpr();
				}
				break;

			case 11:
				_localctx = new IthStringItemOfExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 566;
				this.match(ScratchParser.T__73);
				this.state = 567;
				this.numExpr();
				this.state = 568;
				this.match(ScratchParser.T__16);
				this.state = 569;
				this.variable();
				}
				break;

			case 12:
				_localctx = new DefaultStringExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 571;
				this.match(ScratchParser.T__81);
				this.state = 572;
				this.match(ScratchParser.String);
				this.state = 573;
				this.match(ScratchParser.T__82);
				this.state = 574;
				this.stringExpr();
				}
				break;

			case 13:
				_localctx = new UnspecifiedStringExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 575;
				this.match(ScratchParser.T__83);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public boolExpr(): BoolExprContext {
		let _localctx: BoolExprContext = new BoolExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, ScratchParser.RULE_boolExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 578;
			this.coreBoolExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public coreBoolExpr(): CoreBoolExprContext;
	public coreBoolExpr(_p: number): CoreBoolExprContext;
	// @RuleVersion(0)
	public coreBoolExpr(_p?: number): CoreBoolExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: CoreBoolExprContext = new CoreBoolExprContext(this._ctx, _parentState);
		let _prevctx: CoreBoolExprContext = _localctx;
		let _startState: number = 116;
		this.enterRecursionRule(_localctx, 116, ScratchParser.RULE_coreBoolExpr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 611;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 35, this._ctx) ) {
			case 1:
				{
				_localctx = new BoolLiteralExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 581;
				this.match(ScratchParser.Boolean);
				}
				break;

			case 2:
				{
				_localctx = new BoolVariableExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 582;
				this.variable();
				}
				break;

			case 3:
				{
				_localctx = new BoolParanthExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 583;
				this.match(ScratchParser.T__43);
				this.state = 584;
				this.coreBoolExpr(0);
				this.state = 585;
				this.match(ScratchParser.T__44);
				}
				break;

			case 4:
				{
				_localctx = new BoolCallStatementExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 587;
				this.callStmt();
				}
				break;

			case 5:
				{
				_localctx = new NegatedBoolExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 588;
				this.match(ScratchParser.T__84);
				this.state = 589;
				this.coreBoolExpr(9);
				}
				break;

			case 6:
				{
				_localctx = new GreaterThanExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 590;
				this.numOrStringExpr();
				this.state = 591;
				this.match(ScratchParser.T__86);
				this.state = 592;
				this.numOrStringExpr();
				}
				break;

			case 7:
				{
				_localctx = new LessThanExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 594;
				this.numOrStringExpr();
				this.state = 595;
				this.match(ScratchParser.T__87);
				this.state = 596;
				this.numOrStringExpr();
				}
				break;

			case 8:
				{
				_localctx = new EqualsExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 598;
				this.numOrStringExpr();
				this.state = 599;
				this.match(ScratchParser.T__88);
				this.state = 600;
				this.numOrStringExpr();
				}
				break;

			case 9:
				{
				_localctx = new StrContainsExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 602;
				this.stringExpr();
				this.state = 603;
				this.match(ScratchParser.T__89);
				this.state = 604;
				this.stringExpr();
				}
				break;

			case 10:
				{
				_localctx = new DefaultBoolExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 606;
				this.match(ScratchParser.T__81);
				this.state = 607;
				this.match(ScratchParser.Boolean);
				this.state = 608;
				this.match(ScratchParser.T__82);
				this.state = 609;
				this.coreBoolExpr(2);
				}
				break;

			case 11:
				{
				_localctx = new UnspecifiedBoolExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 610;
				this.match(ScratchParser.T__90);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 621;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 37, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 619;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 36, this._ctx) ) {
					case 1:
						{
						_localctx = new BoolAndExpressionContext(new CoreBoolExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_coreBoolExpr);
						this.state = 613;
						if (!(this.precpred(this._ctx, 8))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 8)");
						}
						this.state = 614;
						this.match(ScratchParser.T__61);
						this.state = 615;
						this.coreBoolExpr(9);
						}
						break;

					case 2:
						{
						_localctx = new BoolOrExpressionContext(new CoreBoolExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_coreBoolExpr);
						this.state = 616;
						if (!(this.precpred(this._ctx, 7))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 7)");
						}
						this.state = 617;
						this.match(ScratchParser.T__85);
						this.state = 618;
						this.coreBoolExpr(8);
						}
						break;
					}
					}
				}
				this.state = 623;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 37, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numExpr(): NumExprContext {
		let _localctx: NumExprContext = new NumExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, ScratchParser.RULE_numExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 624;
			this.coreNumExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numOrStringExpr(): NumOrStringExprContext {
		let _localctx: NumOrStringExprContext = new NumOrStringExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, ScratchParser.RULE_numOrStringExpr);
		try {
			this.state = 628;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 38, this._ctx) ) {
			case 1:
				_localctx = new NumberExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 626;
				this.numExpr();
				}
				break;

			case 2:
				_localctx = new StringExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 627;
				this.stringExpr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public coreNumExpr(): CoreNumExprContext;
	public coreNumExpr(_p: number): CoreNumExprContext;
	// @RuleVersion(0)
	public coreNumExpr(_p?: number): CoreNumExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: CoreNumExprContext = new CoreNumExprContext(this._ctx, _parentState);
		let _prevctx: CoreNumExprContext = _localctx;
		let _startState: number = 122;
		this.enterRecursionRule(_localctx, 122, ScratchParser.RULE_coreNumExpr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 668;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				{
				_localctx = new NumLiteralExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 631;
				this.number();
				}
				break;

			case 2:
				{
				_localctx = new NumVariableExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 632;
				this.variable();
				}
				break;

			case 3:
				{
				_localctx = new NumBracketsContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 633;
				this.match(ScratchParser.T__43);
				this.state = 634;
				this.coreNumExpr(0);
				this.state = 635;
				this.match(ScratchParser.T__44);
				}
				break;

			case 4:
				{
				_localctx = new NumCallStatementExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 637;
				this.callStmt();
				}
				break;

			case 5:
				{
				_localctx = new StringAsNumExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 638;
				this.match(ScratchParser.T__76);
				this.state = 639;
				this.stringExpr();
				this.state = 640;
				this.match(ScratchParser.T__69);
				this.state = 641;
				this.match(ScratchParser.T__17);
				}
				break;

			case 6:
				{
				_localctx = new BoolAsNumExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 643;
				this.match(ScratchParser.T__76);
				this.state = 644;
				this.boolExpr();
				this.state = 645;
				this.match(ScratchParser.T__69);
				this.state = 646;
				this.match(ScratchParser.T__17);
				}
				break;

			case 7:
				{
				_localctx = new TimerExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 648;
				this.match(ScratchParser.T__63);
				}
				break;

			case 8:
				{
				_localctx = new LengthOfStringExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 649;
				this.match(ScratchParser.T__91);
				this.state = 650;
				this.match(ScratchParser.T__16);
				this.state = 651;
				this.stringExpr();
				}
				break;

			case 9:
				{
				_localctx = new LengthOfListExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 652;
				this.match(ScratchParser.T__91);
				this.state = 653;
				this.match(ScratchParser.T__16);
				this.state = 654;
				this.match(ScratchParser.T__15);
				this.state = 655;
				this.variable();
				}
				break;

			case 10:
				{
				_localctx = new IndexOfExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 656;
				this.match(ScratchParser.T__92);
				this.state = 657;
				this.match(ScratchParser.T__16);
				this.state = 658;
				this.expression();
				this.state = 659;
				this.match(ScratchParser.T__34);
				this.state = 660;
				this.variable();
				}
				break;

			case 11:
				{
				_localctx = new DefaultNumExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 662;
				this.match(ScratchParser.T__81);
				this.state = 663;
				this.number();
				this.state = 664;
				this.match(ScratchParser.T__82);
				this.state = 665;
				this.coreNumExpr(2);
				}
				break;

			case 12:
				{
				_localctx = new UnspecifiedNumExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 667;
				this.match(ScratchParser.T__97);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 687;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 685;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 40, this._ctx) ) {
					case 1:
						{
						_localctx = new NumMulExpressionContext(new CoreNumExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_coreNumExpr);
						this.state = 670;
						if (!(this.precpred(this._ctx, 7))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 7)");
						}
						this.state = 671;
						this.match(ScratchParser.T__4);
						this.state = 672;
						this.coreNumExpr(8);
						}
						break;

					case 2:
						{
						_localctx = new NumDivExpressionContext(new CoreNumExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_coreNumExpr);
						this.state = 673;
						if (!(this.precpred(this._ctx, 6))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 6)");
						}
						this.state = 674;
						this.match(ScratchParser.T__93);
						this.state = 675;
						this.coreNumExpr(7);
						}
						break;

					case 3:
						{
						_localctx = new NumModExpressionContext(new CoreNumExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_coreNumExpr);
						this.state = 676;
						if (!(this.precpred(this._ctx, 5))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 5)");
						}
						this.state = 677;
						this.match(ScratchParser.T__94);
						this.state = 678;
						this.coreNumExpr(6);
						}
						break;

					case 4:
						{
						_localctx = new NumPlusExpressionContext(new CoreNumExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_coreNumExpr);
						this.state = 679;
						if (!(this.precpred(this._ctx, 4))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 4)");
						}
						this.state = 680;
						this.match(ScratchParser.T__95);
						this.state = 681;
						this.coreNumExpr(5);
						}
						break;

					case 5:
						{
						_localctx = new NumMinusExpressionContext(new CoreNumExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_coreNumExpr);
						this.state = 682;
						if (!(this.precpred(this._ctx, 3))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 3)");
						}
						this.state = 683;
						this.match(ScratchParser.T__96);
						this.state = 684;
						this.coreNumExpr(4);
						}
						break;
					}
					}
				}
				this.state = 689;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public listExpr(): ListExprContext {
		let _localctx: ListExprContext = new ListExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, ScratchParser.RULE_listExpr);
		try {
			this.state = 695;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__101:
			case ScratchParser.Identifier:
				_localctx = new ListVariableExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 690;
				this.variable();
				}
				break;
			case ScratchParser.T__21:
				_localctx = new ListWithElementsExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 691;
				this.match(ScratchParser.T__21);
				this.state = 692;
				this.expressionListPlain();
				this.state = 693;
				this.match(ScratchParser.T__22);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, ScratchParser.RULE_expression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 697;
			this.coreExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public coreExpression(): CoreExpressionContext {
		let _localctx: CoreExpressionContext = new CoreExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, ScratchParser.RULE_coreExpression);
		try {
			this.state = 704;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 43, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 699;
				this.stringExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 700;
				this.numExpr();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 701;
				this.boolExpr();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 702;
				this.listExpr();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 703;
				this.unspecifiedExpr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unspecifiedExpr(): UnspecifiedExprContext {
		let _localctx: UnspecifiedExprContext = new UnspecifiedExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, ScratchParser.RULE_unspecifiedExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 706;
			this.match(ScratchParser.T__98);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variable(): VariableContext {
		let _localctx: VariableContext = new VariableContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, ScratchParser.RULE_variable);
		try {
			this.state = 713;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 44, this._ctx) ) {
			case 1:
				_localctx = new FlatVariableContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 708;
				this.ident();
				}
				break;

			case 2:
				_localctx = new QualifiedVariableContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 709;
				this.ident();
				this.state = 710;
				this.match(ScratchParser.T__99);
				this.state = 711;
				this.ident();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public color(): ColorContext {
		let _localctx: ColorContext = new ColorContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, ScratchParser.RULE_color);
		try {
			this.state = 724;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__100:
				_localctx = new RGBAColorExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 715;
				this.match(ScratchParser.T__100);
				this.state = 716;
				this.numExpr();
				this.state = 717;
				this.numExpr();
				this.state = 718;
				this.numExpr();
				this.state = 719;
				this.numExpr();
				}
				break;
			case ScratchParser.T__3:
				_localctx = new ColorFromNumExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 721;
				this.match(ScratchParser.T__3);
				this.state = 722;
				this.match(ScratchParser.T__17);
				this.state = 723;
				this.numExpr();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ident(): IdentContext {
		let _localctx: IdentContext = new IdentContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, ScratchParser.RULE_ident);
		try {
			this.state = 729;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.Identifier:
				_localctx = new IdentExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 726;
				this.match(ScratchParser.Identifier);
				}
				break;
			case ScratchParser.T__101:
				_localctx = new StrIdentExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 727;
				this.match(ScratchParser.T__101);
				this.state = 728;
				this.match(ScratchParser.String);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public number(): NumberContext {
		let _localctx: NumberContext = new NumberContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, ScratchParser.RULE_number);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 731;
			this.match(ScratchParser.DecimalLiteral);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public key(): KeyContext {
		let _localctx: KeyContext = new KeyContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, ScratchParser.RULE_key);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 733;
			this.match(ScratchParser.T__102);
			this.state = 734;
			this.numExpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resourceLocator(): ResourceLocatorContext {
		let _localctx: ResourceLocatorContext = new ResourceLocatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, ScratchParser.RULE_resourceLocator);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 736;
			this.match(ScratchParser.String);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public message(): MessageContext {
		let _localctx: MessageContext = new MessageContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, ScratchParser.RULE_message);
		try {
			this.state = 742;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 47, this._ctx) ) {
			case 1:
				_localctx = new AppMessageContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 738;
				this.stringExpr();
				}
				break;

			case 2:
				_localctx = new SystemMessageContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 739;
				this.match(ScratchParser.String);
				this.state = 740;
				this.match(ScratchParser.T__93);
				this.state = 741;
				this.stringExpr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 58:
			return this.coreBoolExpr_sempred(_localctx as CoreBoolExprContext, predIndex);

		case 61:
			return this.coreNumExpr_sempred(_localctx as CoreNumExprContext, predIndex);
		}
		return true;
	}
	private coreBoolExpr_sempred(_localctx: CoreBoolExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 8);

		case 1:
			return this.precpred(this._ctx, 7);
		}
		return true;
	}
	private coreNumExpr_sempred(_localctx: CoreNumExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 2:
			return this.precpred(this._ctx, 7);

		case 3:
			return this.precpred(this._ctx, 6);

		case 4:
			return this.precpred(this._ctx, 5);

		case 5:
			return this.precpred(this._ctx, 4);

		case 6:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03r\u02EB\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x03\x03\x03\x03\x04\x07\x04\x9D\n\x04\f\x04\x0E\x04\xA0\v\x04" +
		"\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x05\x06\xA9\n" +
		"\x06\x03\x07\x07\x07\xAC\n\x07\f\x07\x0E\x07\xAF\v\x07\x03\b\x03\b\x03" +
		"\b\x03\b\x03\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x07\t\xBC\n\t\f\t\x0E" +
		"\t\xBF\v\t\x03\t\x05\t\xC2\n\t\x03\n\x03\n\x05\n\xC6\n\n\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x05\r\xD5" +
		"\n\r\x03\x0E\x07\x0E\xD8\n\x0E\f\x0E\x0E\x0E\xDB\v\x0E\x03\x0F\x03\x0F" +
		"\x03\x0F\x03\x0F\x03\x0F\x03\x10\x07\x10\xE3\n\x10\f\x10\x0E\x10\xE6\v" +
		"\x10\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\xEC\n\x11\x03\x12\x03\x12" +
		"\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x05\x12\xF6\n\x12\x03" +
		"\x13\x03\x13\x05\x13\xFA\n\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14" +
		"\x03\x14\x03\x15\x07\x15\u0103\n\x15\f\x15\x0E\x15\u0106\v\x15\x03\x16" +
		"\x03\x16\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17" +
		"\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17" +
		"\x03\x17\x03\x17\x05\x17\u011D\n\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03" +
		"\x18\x03\x19\x03\x19\x03\x19\x05\x19\u0127\n\x19\x03\x1A\x07\x1A\u012A" +
		"\n\x1A\f\x1A\x0E\x1A\u012D\v\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
		"\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x05\x1C" +
		"\u013C\n\x1C\x03\x1D\x07\x1D\u013F\n\x1D\f\x1D\x0E\x1D\u0142\v\x1D\x03" +
		"\x1E\x07\x1E\u0145\n\x1E\f\x1E\x0E\x1E\u0148\v\x1E\x03\x1F\x03\x1F\x03" +
		" \x03 \x03 \x03 \x03!\x03!\x03!\x03!\x03\"\x03\"\x03\"\x07\"\u0157\n\"" +
		"\f\"\x0E\"\u015A\v\"\x03\"\x05\"\u015D\n\"\x03#\x03#\x03#\x05#\u0162\n" +
		"#\x03#\x03#\x03$\x03$\x03$\x03%\x07%\u016A\n%\f%\x0E%\u016D\v%\x03&\x03" +
		"&\x03\'\x03\'\x03\'\x03\'\x03\'\x05\'\u0176\n\'\x03(\x03(\x03(\x03(\x03" +
		"(\x03(\x03)\x03)\x03)\x05)\u0181\n)\x03*\x03*\x03*\x03*\x03*\x03+\x03" +
		"+\x03+\x03+\x03+\x03,\x03,\x03,\x03,\x03-\x03-\x03-\x03.\x03.\x03.\x03" +
		".\x03/\x03/\x03/\x07/\u019B\n/\f/\x0E/\u019E\v/\x03/\x05/\u01A1\n/\x03" +
		"0\x030\x030\x031\x031\x031\x031\x031\x031\x031\x031\x051\u01AE\n1\x03" +
		"2\x032\x033\x033\x033\x033\x053\u01B6\n3\x034\x034\x034\x034\x034\x03" +
		"4\x034\x034\x034\x034\x034\x034\x034\x034\x034\x034\x034\x034\x034\x03" +
		"4\x034\x034\x034\x034\x034\x034\x034\x034\x034\x054\u01D5\n4\x035\x03" +
		"5\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x03" +
		"5\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x05" +
		"5\u01F4\n5\x036\x036\x036\x036\x036\x036\x036\x036\x036\x036\x056\u0200" +
		"\n6\x037\x077\u0203\n7\f7\x0E7\u0206\v7\x038\x038\x038\x038\x038\x038" +
		"\x038\x038\x058\u0210\n8\x039\x039\x03:\x03:\x03:\x03:\x03:\x03:\x03:" +
		"\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03" +
		":\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03" +
		":\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x05:\u0243" +
		"\n:\x03;\x03;\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03" +
		"<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03" +
		"<\x03<\x03<\x03<\x03<\x03<\x05<\u0266\n<\x03<\x03<\x03<\x03<\x03<\x03" +
		"<\x07<\u026E\n<\f<\x0E<\u0271\v<\x03=\x03=\x03>\x03>\x05>\u0277\n>\x03" +
		"?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03" +
		"?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03" +
		"?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x05?\u029F\n?\x03?\x03" +
		"?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x07" +
		"?\u02B0\n?\f?\x0E?\u02B3\v?\x03@\x03@\x03@\x03@\x03@\x05@\u02BA\n@\x03" +
		"A\x03A\x03B\x03B\x03B\x03B\x03B\x05B\u02C3\nB\x03C\x03C\x03D\x03D\x03" +
		"D\x03D\x03D\x05D\u02CC\nD\x03E\x03E\x03E\x03E\x03E\x03E\x03E\x03E\x03" +
		"E\x05E\u02D7\nE\x03F\x03F\x03F\x05F\u02DC\nF\x03G\x03G\x03H\x03H\x03H" +
		"\x03I\x03I\x03J\x03J\x03J\x03J\x05J\u02E9\nJ\x03J\x02\x02\x04v|K\x02\x02" +
		"\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16" +
		"\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02" +
		".\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02" +
		"J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02" +
		"f\x02h\x02j\x02l\x02n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80" +
		"\x02\x82\x02\x84\x02\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92" +
		"\x02\x02\x03\x03\x02\x03\x04\x02\u0311\x02\x94\x03\x02\x02\x02\x04\x99" +
		"\x03\x02\x02\x02\x06\x9E\x03\x02\x02\x02\b\xA1\x03\x02\x02\x02\n\xA8\x03" +
		"\x02\x02\x02\f\xAD\x03\x02\x02\x02\x0E\xB0\x03\x02\x02\x02\x10\xC1\x03" +
		"\x02\x02\x02\x12\xC5\x03\x02\x02\x02\x14\xC7\x03\x02\x02\x02\x16\xCE\x03" +
		"\x02\x02\x02\x18\xD4\x03\x02\x02\x02\x1A\xD9\x03\x02\x02\x02\x1C\xDC\x03" +
		"\x02\x02\x02\x1E\xE4\x03\x02\x02\x02 \xEB\x03\x02\x02\x02\"\xF5\x03\x02" +
		"\x02\x02$\xF9\x03\x02\x02\x02&\xFB\x03\x02\x02\x02(\u0104\x03\x02\x02" +
		"\x02*\u0107\x03\x02\x02\x02,\u011C\x03\x02\x02\x02.\u011E\x03\x02\x02" +
		"\x020\u0126\x03\x02\x02\x022\u012B\x03\x02\x02\x024\u012E\x03\x02\x02" +
		"\x026\u013B\x03\x02\x02\x028\u0140\x03\x02\x02\x02:\u0146\x03\x02\x02" +
		"\x02<\u0149\x03\x02\x02\x02>\u014B\x03\x02\x02\x02@\u014F\x03\x02\x02" +
		"\x02B\u015C\x03\x02\x02\x02D\u015E\x03\x02\x02\x02F\u0165\x03\x02\x02" +
		"\x02H\u016B\x03\x02\x02\x02J\u016E\x03\x02\x02\x02L\u0175\x03\x02\x02" +
		"\x02N\u0177\x03\x02\x02\x02P\u0180\x03\x02\x02\x02R\u0182\x03\x02\x02" +
		"\x02T\u0187\x03\x02\x02\x02V\u018C\x03\x02\x02\x02X\u0190\x03\x02\x02" +
		"\x02Z\u0193\x03\x02\x02\x02\\\u01A0\x03\x02\x02\x02^\u01A2\x03\x02\x02" +
		"\x02`\u01AD\x03\x02\x02\x02b\u01AF\x03\x02\x02\x02d\u01B5\x03\x02\x02" +
		"\x02f\u01D4\x03\x02\x02\x02h\u01F3\x03\x02\x02\x02j\u01FF\x03\x02\x02" +
		"\x02l\u0204\x03\x02\x02\x02n\u020F\x03\x02\x02\x02p\u0211\x03\x02\x02" +
		"\x02r\u0242\x03\x02\x02\x02t\u0244\x03\x02\x02\x02v\u0265\x03\x02\x02" +
		"\x02x\u0272\x03\x02\x02\x02z\u0276\x03\x02\x02\x02|\u029E\x03\x02\x02" +
		"\x02~\u02B9\x03\x02\x02\x02\x80\u02BB\x03\x02\x02\x02\x82\u02C2\x03\x02" +
		"\x02\x02\x84\u02C4\x03\x02\x02\x02\x86\u02CB\x03\x02\x02\x02\x88\u02D6" +
		"\x03\x02\x02\x02\x8A\u02DB\x03\x02\x02\x02\x8C\u02DD\x03\x02\x02\x02\x8E" +
		"\u02DF\x03\x02\x02\x02\x90\u02E2\x03\x02\x02\x02\x92\u02E8\x03\x02\x02" +
		"\x02\x94\x95\x05\x04\x03\x02\x95\x96\x05\x8AF\x02\x96\x97\x05\x06\x04" +
		"\x02\x97\x98\x05\f\x07\x02\x98\x03\x03\x02\x02\x02\x99\x9A\t\x02\x02\x02" +
		"\x9A\x05\x03\x02\x02\x02\x9B\x9D\x05\b\x05\x02\x9C\x9B\x03\x02\x02\x02" +
		"\x9D\xA0\x03\x02\x02\x02\x9E\x9C\x03\x02\x02\x02\x9E\x9F\x03\x02\x02\x02" +
		"\x9F\x07\x03\x02\x02\x02\xA0\x9E\x03\x02\x02\x02\xA1\xA2\x07\x05\x02\x02" +
		"\xA2\xA3\x05\n\x06\x02\xA3\xA4\x07\x06\x02\x02\xA4\xA5\x05\x90I\x02\xA5" +
		"\t\x03\x02\x02\x02\xA6\xA9\x05\x8AF\x02\xA7\xA9\x07\x07\x02\x02\xA8\xA6" +
		"\x03\x02\x02\x02\xA8\xA7\x03\x02\x02\x02\xA9\v\x03\x02\x02\x02\xAA\xAC" +
		"\x05\x0E\b\x02\xAB\xAA\x03\x02\x02\x02\xAC\xAF\x03\x02\x02\x02\xAD\xAB" +
		"\x03\x02\x02\x02\xAD\xAE\x03\x02\x02\x02\xAE\r\x03\x02\x02\x02\xAF\xAD" +
		"\x03\x02\x02\x02\xB0\xB1\x05\x12\n\x02\xB1\xB2\x05\x8AF\x02\xB2\xB3\x05" +
		"\x10\t\x02\xB3\xB4\x07\b\x02\x02\xB4\xB5\x05\x14\v\x02\xB5\xB6\x07\t\x02" +
		"\x02\xB6\x0F\x03\x02\x02\x02\xB7\xB8\x07\n\x02\x02\xB8\xBD\x05\x8AF\x02" +
		"\xB9\xBA\x07\v\x02\x02\xBA\xBC\x05\x8AF\x02\xBB\xB9\x03\x02\x02\x02\xBC" +
		"\xBF\x03\x02\x02\x02\xBD\xBB\x03\x02\x02\x02\xBD\xBE\x03\x02\x02\x02\xBE" +
		"\xC2\x03\x02\x02\x02\xBF\xBD\x03\x02\x02\x02\xC0\xC2\x03\x02\x02\x02\xC1" +
		"\xB7\x03\x02\x02\x02\xC1\xC0\x03\x02\x02\x02\xC2\x11\x03\x02\x02\x02\xC3" +
		"\xC6\x07\f\x02\x02\xC4\xC6\x07\r\x02\x02\xC5\xC3\x03\x02\x02\x02\xC5\xC4" +
		"\x03\x02\x02\x02\xC6\x13\x03\x02\x02\x02\xC7\xC8\x05\x1A\x0E\x02\xC8\xC9" +
		"\x05\x1E\x10\x02\xC9\xCA\x05l7\x02\xCA\xCB\x052\x1A\x02\xCB\xCC\x058\x1D" +
		"\x02\xCC\xCD\x05(\x15\x02\xCD\x15\x03\x02\x02\x02\xCE\xCF\x05\x18\r\x02" +
		"\xCF\xD0\x05\x8AF\x02\xD0\xD1\x05\x90I\x02\xD1\x17\x03\x02\x02\x02\xD2" +
		"\xD5\x07\x0E\x02\x02\xD3\xD5\x07\x0F\x02\x02\xD4\xD2\x03\x02\x02\x02\xD4" +
		"\xD3\x03\x02\x02\x02\xD5\x19\x03\x02\x02\x02\xD6\xD8\x05\x16\f\x02\xD7" +
		"\xD6\x03\x02\x02\x02\xD8\xDB\x03\x02\x02\x02\xD9\xD7\x03\x02\x02\x02\xD9" +
		"\xDA\x03\x02\x02\x02\xDA\x1B\x03\x02\x02\x02\xDB\xD9\x03\x02\x02\x02\xDC" +
		"\xDD\x07\x10\x02\x02\xDD\xDE\x05\x8AF\x02\xDE\xDF\x07\x11\x02\x02\xDF" +
		"\xE0\x05 \x11\x02\xE0\x1D\x03\x02\x02\x02\xE1\xE3\x05\x1C\x0F\x02\xE2" +
		"\xE1\x03\x02\x02\x02\xE3\xE6\x03\x02\x02\x02\xE4\xE2\x03\x02\x02\x02\xE4" +
		"\xE5\x03\x02\x02\x02\xE5\x1F\x03\x02\x02\x02\xE6\xE4\x03\x02\x02\x02\xE7" +
		"\xEC\x05\"\x12\x02\xE8\xE9\x07\x12\x02\x02\xE9\xEA\x07\x13\x02\x02\xEA" +
		"\xEC\x05 \x11\x02\xEB\xE7\x03\x02\x02\x02\xEB\xE8\x03\x02\x02\x02\xEC" +
		"!\x03\x02\x02\x02\xED\xF6\x07\x14\x02\x02\xEE\xF6\x07\x15\x02\x02\xEF" +
		"\xF6\x07\x16\x02\x02\xF0\xF1\x07\x17\x02\x02\xF1\xF2\x07\x18\x02\x02\xF2" +
		"\xF3\x05\\/\x02\xF3\xF4\x07\x19\x02\x02\xF4\xF6\x03\x02\x02\x02\xF5\xED" +
		"\x03\x02\x02\x02\xF5\xEE\x03\x02\x02\x02\xF5\xEF\x03\x02\x02\x02\xF5\xF0" +
		"\x03\x02\x02\x02\xF6#\x03\x02\x02\x02\xF7\xFA\x07\x14\x02\x02\xF8\xFA" +
		"\x07\x16\x02\x02\xF9\xF7\x03\x02\x02\x02\xF9\xF8\x03\x02\x02\x02\xFA%" +
		"\x03\x02\x02\x02\xFB\xFC\x07\x1A\x02\x02\xFC\xFD\x07\x1B\x02\x02\xFD\xFE" +
		"\x05*\x16\x02\xFE\xFF\x07\x1C\x02\x02\xFF\u0100\x05D#\x02\u0100\'\x03" +
		"\x02\x02\x02\u0101\u0103\x05&\x14\x02\u0102\u0101\x03\x02\x02\x02\u0103" +
		"\u0106\x03\x02\x02\x02\u0104\u0102\x03\x02\x02\x02\u0104\u0105\x03\x02" +
		"\x02\x02\u0105)\x03\x02\x02\x02\u0106\u0104\x03\x02\x02\x02\u0107\u0108" +
		"\x05,\x17\x02\u0108+\x03\x02\x02\x02\u0109\u011D\x07\x1D\x02\x02\u010A" +
		"\u011D\x07\x1E\x02\x02\u010B\u010C\x07\x1E\x02\x02\u010C\u011D\x07\x1F" +
		"\x02\x02\u010D\u011D\x07 \x02\x02\u010E\u010F\x07!\x02\x02\u010F\u0110" +
		"\x07\x11\x02\x02\u0110\u011D\x07\"\x02\x02\u0111\u0112\x07#\x02\x02\u0112" +
		"\u0113\x07$\x02\x02\u0113\u0114\x05p9\x02\u0114\u0115\x07%\x02\x02\u0115" +
		"\u0116\x07k\x02\x02\u0116\u011D\x03\x02\x02\x02\u0117\u0118\x07&\x02\x02" +
		"\u0118\u011D\x05t;\x02\u0119\u011D\x07\'\x02\x02\u011A\u011B\x07(\x02" +
		"\x02\u011B\u011D\x07\x1F\x02\x02\u011C\u0109\x03\x02\x02\x02\u011C\u010A" +
		"\x03\x02\x02\x02\u011C\u010B\x03\x02\x02\x02\u011C\u010D\x03\x02\x02\x02" +
		"\u011C\u010E\x03\x02\x02\x02\u011C\u0111\x03\x02\x02\x02\u011C\u0117\x03" +
		"\x02\x02\x02\u011C\u0119\x03\x02\x02\x02\u011C\u011A\x03\x02\x02\x02\u011D" +
		"-\x03\x02\x02\x02\u011E\u011F\x07)\x02\x02\u011F\u0120\x05\x8AF\x02\u0120" +
		"\u0121\x05@!\x02\u0121\u0122\x050\x19\x02\u0122/\x03\x02\x02\x02\u0123" +
		"\u0124\x07*\x02\x02\u0124\u0127\x05 \x11\x02\u0125\u0127\x03\x02\x02\x02" +
		"\u0126\u0123\x03\x02\x02\x02\u0126\u0125\x03\x02\x02\x02\u01271\x03\x02" +
		"\x02\x02\u0128\u012A\x05.\x18\x02\u0129\u0128\x03\x02\x02\x02\u012A\u012D" +
		"\x03\x02\x02\x02\u012B\u0129\x03\x02\x02\x02\u012B\u012C\x03\x02\x02\x02" +
		"\u012C3\x03\x02\x02\x02\u012D\u012B\x03\x02\x02\x02\u012E\u012F\x07+\x02" +
		"\x02\u012F\u0130\x05:\x1E\x02\u0130\u0131\x05\x8AF\x02\u0131\u0132\x05" +
		"@!\x02\u0132\u0133\x05D#\x02\u0133\u0134\x056\x1C\x02\u01345\x03\x02\x02" +
		"\x02\u0135\u0136\x07*\x02\x02\u0136\u0137\x05\x8AF\x02\u0137\u0138\x07" +
		",\x02\x02\u0138\u0139\x05 \x11\x02\u0139\u013C\x03\x02\x02\x02\u013A\u013C" +
		"\x03\x02\x02\x02\u013B\u0135\x03\x02\x02\x02\u013B\u013A\x03\x02\x02\x02" +
		"\u013C7\x03\x02\x02\x02\u013D\u013F\x054\x1B\x02\u013E\u013D\x03\x02\x02" +
		"\x02\u013F\u0142\x03\x02\x02\x02\u0140\u013E\x03\x02\x02\x02\u0140\u0141" +
		"\x03\x02\x02\x02\u01419\x03\x02\x02\x02\u0142\u0140\x03\x02\x02\x02\u0143" +
		"\u0145\x05<\x1F\x02\u0144\u0143\x03\x02\x02\x02\u0145\u0148\x03\x02\x02" +
		"\x02\u0146\u0144\x03\x02\x02\x02\u0146\u0147\x03\x02\x02\x02\u0147;\x03" +
		"\x02\x02\x02\u0148\u0146\x03\x02\x02\x02\u0149\u014A\x07-\x02\x02\u014A" +
		"=\x03\x02\x02\x02\u014B\u014C\x05\x8AF\x02\u014C\u014D\x07,\x02\x02\u014D" +
		"\u014E\x05 \x11\x02\u014E?\x03\x02\x02\x02\u014F\u0150\x07.\x02\x02\u0150" +
		"\u0151\x05B\"\x02\u0151\u0152\x07/\x02\x02\u0152A\x03\x02\x02\x02\u0153" +
		"\u0158\x05> \x02\u0154\u0155\x07\v\x02\x02\u0155\u0157\x05> \x02\u0156" +
		"\u0154\x03\x02\x02\x02\u0157\u015A\x03\x02\x02\x02\u0158\u0156\x03\x02" +
		"\x02\x02\u0158\u0159\x03\x02\x02\x02\u0159\u015D\x03\x02\x02\x02\u015A" +
		"\u0158\x03\x02\x02\x02\u015B\u015D\x03\x02\x02\x02\u015C\u0153\x03\x02" +
		"\x02\x02\u015C\u015B\x03\x02\x02\x02\u015DC\x03\x02\x02\x02\u015E\u015F" +
		"\x07\b\x02\x02\u015F\u0161\x05H%\x02\u0160\u0162\x05n8\x02\u0161\u0160" +
		"\x03\x02\x02\x02\u0161\u0162\x03\x02\x02\x02\u0162\u0163\x03\x02\x02\x02" +
		"\u0163\u0164\x07\t\x02\x02\u0164E\x03\x02\x02\x02\u0165\u0166\x07-\x02" +
		"\x02\u0166\u0167\x05D#\x02\u0167G\x03\x02\x02\x02\u0168\u016A\x05`1\x02" +
		"\u0169\u0168\x03\x02\x02\x02\u016A\u016D\x03\x02\x02\x02\u016B\u0169\x03" +
		"\x02\x02\x02\u016B\u016C\x03\x02\x02\x02\u016CI\x03\x02\x02\x02\u016D" +
		"\u016B\x03\x02\x02\x02\u016E\u016F\x05L\'\x02\u016FK\x03\x02\x02\x02\u0170" +
		"\u0176\x05N(\x02\u0171\u0176\x05R*\x02\u0172\u0176\x05T+\x02\u0173\u0176" +
		"\x05V,\x02\u0174\u0176\x05X-\x02\u0175\u0170\x03\x02\x02\x02\u0175\u0171" +
		"\x03\x02\x02\x02\u0175\u0172\x03\x02\x02\x02\u0175\u0173\x03\x02\x02\x02" +
		"\u0175\u0174\x03\x02\x02\x02\u0176M\x03\x02\x02\x02\u0177\u0178\x070\x02" +
		"\x02\u0178\u0179\x05t;\x02\u0179\u017A\x071\x02\x02\u017A\u017B\x05D#" +
		"\x02\u017B\u017C\x05P)\x02\u017CO\x03\x02\x02\x02\u017D\u017E\x072\x02" +
		"\x02\u017E\u0181\x05D#\x02\u017F\u0181\x03\x02\x02\x02\u0180\u017D\x03" +
		"\x02\x02\x02\u0180\u017F\x03\x02\x02\x02\u0181Q\x03\x02\x02\x02\u0182" +
		"\u0183\x073\x02\x02\u0183\u0184\x05t;\x02\u0184\u0185\x074\x02\x02\u0185" +
		"\u0186\x05D#\x02\u0186S\x03\x02\x02\x02\u0187\u0188\x074\x02\x02\u0188" +
		"\u0189\x05x=\x02\u0189\u018A\x075\x02\x02\u018A\u018B\x05D#\x02\u018B" +
		"U\x03\x02\x02\x02\u018C\u018D\x074\x02\x02\u018D\u018E\x076\x02\x02\u018E" +
		"\u018F\x05D#\x02\u018FW\x03\x02\x02\x02\u0190\u0191\x05\x8AF\x02\u0191" +
		"\u0192\x05Z.\x02\u0192Y\x03\x02\x02\x02\u0193\u0194\x07.\x02\x02\u0194" +
		"\u0195\x05\\/\x02\u0195\u0196\x07/\x02\x02\u0196[\x03\x02\x02\x02\u0197" +
		"\u019C\x05\x80A\x02\u0198\u0199\x07\v\x02\x02\u0199\u019B\x05\x80A\x02" +
		"\u019A\u0198\x03\x02\x02\x02\u019B\u019E\x03\x02\x02\x02\u019C\u019A\x03" +
		"\x02\x02\x02\u019C\u019D\x03\x02\x02\x02\u019D\u01A1\x03\x02\x02\x02\u019E" +
		"\u019C\x03\x02\x02\x02\u019F\u01A1\x03\x02\x02\x02\u01A0\u0197\x03\x02" +
		"\x02\x02\u01A0\u019F\x03\x02\x02\x02\u01A1]\x03\x02\x02\x02\u01A2\u01A3" +
		"\x077\x02\x02\u01A3\u01A4\x05\x80A\x02\u01A4_\x03\x02\x02\x02\u01A5\u01AE" +
		"\x05J&\x02\u01A6\u01AE\x05b2\x02\u01A7\u01AE\x05F$\x02\u01A8\u01A9\x07" +
		"8\x02\x02\u01A9\u01AA\x07m\x02\x02\u01AA\u01AB\x05Z.\x02\u01AB\u01AC\x05" +
		"`1\x02\u01AC\u01AE\x03\x02\x02\x02\u01AD\u01A5\x03\x02\x02\x02\u01AD\u01A6" +
		"\x03\x02\x02\x02\u01AD\u01A7\x03\x02\x02\x02\u01AD\u01A8\x03\x02\x02\x02" +
		"\u01AEa\x03\x02\x02\x02\u01AF\u01B0\x05d3\x02\u01B0c\x03\x02\x02\x02\u01B1" +
		"\u01B6\x05^0\x02\u01B2\u01B6\x05f4\x02\u01B3\u01B6\x05h5\x02\u01B4\u01B6" +
		"\x05\x1C\x0F\x02\u01B5\u01B1\x03\x02\x02\x02\u01B5\u01B2\x03\x02\x02\x02" +
		"\u01B5\u01B3\x03\x02\x02\x02\u01B5\u01B4\x03\x02\x02\x02\u01B6e\x03\x02" +
		"\x02\x02\u01B7\u01B8\x079\x02\x02\u01B8\u01B9\x05x=\x02\u01B9\u01BA\x07" +
		":\x02\x02\u01BA\u01D5\x03\x02\x02\x02\u01BB\u01BC\x079\x02\x02\u01BC\u01BD" +
		"\x073\x02\x02\u01BD\u01D5\x05t;\x02\u01BE\u01BF\x07;\x02\x02\u01BF\u01C0" +
		"\x07<\x02\x02\u01C0\u01C1\x07=\x02\x02\u01C1\u01C2\x07%\x02\x02\u01C2" +
		"\u01D5\x07\f\x02\x02\u01C3\u01C4\x07>\x02\x02\u01C4\u01C5\x07\"\x02\x02" +
		"\u01C5\u01C6\x07\x13\x02\x02\u01C6\u01D5\x05p9\x02\u01C7\u01C8\x07?\x02" +
		"\x02\u01C8\u01D5\x05\x92J\x02\u01C9\u01CA\x07?\x02\x02\u01CA\u01CB\x05" +
		"\x92J\x02\u01CB\u01CC\x07@\x02\x02\u01CC\u01CD\x079\x02\x02\u01CD\u01D5" +
		"\x03\x02\x02\x02\u01CE\u01CF\x07A\x02\x02\u01CF\u01D5\x07B\x02\x02\u01D0" +
		"\u01D5\x07C\x02\x02\u01D1\u01D2\x07D\x02\x02\u01D2\u01D5\x05t;\x02\u01D3" +
		"\u01D5\x05j6\x02\u01D4\u01B7\x03\x02\x02\x02\u01D4\u01BB\x03\x02\x02\x02" +
		"\u01D4\u01BE\x03\x02\x02\x02\u01D4\u01C3\x03\x02\x02\x02\u01D4\u01C7\x03" +
		"\x02\x02\x02\u01D4\u01C9\x03\x02\x02\x02\u01D4\u01CE\x03\x02\x02\x02\u01D4" +
		"\u01D0\x03\x02\x02\x02\u01D4\u01D1\x03\x02\x02\x02\u01D4\u01D3\x03\x02" +
		"\x02\x02\u01D5g\x03\x02\x02\x02\u01D6\u01D7\x07E\x02\x02\u01D7\u01D8\x07" +
		"F\x02\x02\u01D8\u01D9\x07\x13\x02\x02\u01D9\u01F4\x05\x86D\x02\u01DA\u01DB" +
		"\x07E\x02\x02\u01DB\u01DC\x05x=\x02\u01DC\u01DD\x07\x13\x02\x02\u01DD" +
		"\u01DE\x05\x86D\x02\u01DE\u01F4\x03\x02\x02\x02\u01DF\u01E0\x07G\x02\x02" +
		"\u01E0\u01E1\x05p9\x02\u01E1\u01E2\x07H\x02\x02\u01E2\u01E3\x05\x86D\x02" +
		"\u01E3\u01F4\x03\x02\x02\x02\u01E4\u01E5\x07I\x02\x02\u01E5\u01E6\x05" +
		"p9\x02\u01E6\u01E7\x07J\x02\x02\u01E7\u01E8\x05x=\x02\u01E8\u01E9\x07" +
		"\x13\x02\x02\u01E9\u01EA\x05\x86D\x02\u01EA\u01F4\x03\x02\x02\x02\u01EB" +
		"\u01EC\x07K\x02\x02\u01EC\u01ED\x07L\x02\x02\u01ED\u01EE\x05x=\x02\u01EE" +
		"\u01EF\x07\x13\x02\x02\u01EF\u01F0\x05\x86D\x02\u01F0\u01F1\x07M\x02\x02" +
		"\u01F1\u01F2\x05p9\x02\u01F2\u01F4\x03\x02\x02\x02\u01F3\u01D6\x03\x02" +
		"\x02\x02\u01F3\u01DA\x03\x02\x02\x02\u01F3\u01DF\x03\x02\x02\x02\u01F3" +
		"\u01E4\x03\x02\x02\x02\u01F3\u01EB\x03\x02\x02\x02\u01F4i\x03\x02\x02" +
		"\x02\u01F5\u01F6\x07+\x02\x02\u01F6\u01F7\x05\x86D\x02\u01F7\u01F8\x07" +
		"\x11\x02\x02\u01F8\u01F9\x05\x80A\x02\u01F9\u0200\x03\x02\x02\x02\u01FA" +
		"\u01FB\x07+\x02\x02\u01FB\u01FC\x05\x86D\x02\u01FC\u01FD\x07\x11\x02\x02" +
		"\u01FD\u01FE\x05X-\x02\u01FE\u0200\x03\x02\x02\x02\u01FF\u01F5\x03\x02" +
		"\x02\x02\u01FF\u01FA\x03\x02\x02\x02\u0200k\x03\x02\x02\x02\u0201\u0203" +
		"\x05j6\x02\u0202\u0201\x03\x02\x02\x02\u0203\u0206\x03\x02\x02\x02\u0204" +
		"\u0202\x03\x02\x02\x02\u0204\u0205\x03\x02\x02\x02\u0205m\x03\x02\x02" +
		"\x02\u0206\u0204\x03\x02\x02\x02\u0207\u0208\x07;\x02\x02\u0208\u0210" +
		"\x07F\x02\x02\u0209\u020A\x07;\x02\x02\u020A\u020B\x07N\x02\x02\u020B" +
		"\u0210\x07\x1A\x02\x02\u020C\u020D\x07E\x02\x02\u020D\u020E\x07N\x02\x02" +
		"\u020E\u0210\x07\"\x02\x02\u020F\u0207\x03\x02\x02\x02\u020F\u0209\x03" +
		"\x02\x02\x02\u020F\u020C\x03\x02\x02\x02\u0210o\x03\x02\x02\x02\u0211" +
		"\u0212\x05r:\x02\u0212q\x03\x02\x02\x02\u0213\u0243\x07k\x02\x02\u0214" +
		"\u0243\x05\x86D\x02\u0215\u0216\x07.\x02\x02\u0216\u0217\x05r:\x02\u0217" +
		"\u0218\x07/\x02\x02\u0218\u0243\x03\x02\x02\x02\u0219\u0243\x05X-\x02" +
		"\u021A\u021B\x07O\x02\x02\u021B\u021C\x05x=\x02\u021C\u021D\x07H\x02\x02" +
		"\u021D\u021E\x07\x16\x02\x02\u021E\u0243\x03\x02\x02\x02\u021F\u0220\x07" +
		"O\x02\x02\u0220\u0221\x05t;\x02\u0221\u0222\x07H\x02\x02\u0222\u0223\x07" +
		"\x16\x02\x02\u0223\u0243\x03\x02\x02\x02\u0224\u0225\x07P\x02\x02\u0225" +
		"\u0226\x05p9\x02\u0226\u0227\x07\x13\x02\x02\u0227\u0228\x05\x8AF\x02" +
		"\u0228\u0243\x03\x02\x02\x02\u0229\u022A\x07Q\x02\x02\u022A\u022B\x07" +
		"P\x02\x02\u022B\u022C\x05p9\x02\u022C\u022D\x07\x13\x02\x02\u022D\u022E" +
		"\x05\x86D\x02\u022E\u0243\x03\x02\x02\x02\u022F";
	private static readonly _serializedATNSegment1: string =
		"\u0230\x07R\x02\x02\u0230\u0231\x05p9\x02\u0231\u0232\x05p9\x02\u0232" +
		"\u0243\x03\x02\x02\x02\u0233\u0234\x07S\x02\x02\u0234\u0235\x05x=\x02" +
		"\u0235\u0236\x07\x13\x02\x02\u0236\u0237\x05p9\x02\u0237\u0243\x03\x02" +
		"\x02\x02\u0238\u0239\x07L\x02\x02\u0239\u023A\x05x=\x02\u023A\u023B\x07" +
		"\x13\x02\x02\u023B\u023C\x05\x86D\x02\u023C\u0243\x03\x02\x02\x02\u023D" +
		"\u023E\x07T\x02\x02\u023E\u023F\x07k\x02\x02\u023F\u0240\x07U\x02\x02" +
		"\u0240\u0243\x05p9\x02\u0241\u0243\x07V\x02\x02\u0242\u0213\x03\x02\x02" +
		"\x02\u0242\u0214\x03\x02\x02\x02\u0242\u0215\x03\x02\x02\x02\u0242\u0219" +
		"\x03\x02\x02\x02\u0242\u021A\x03\x02\x02\x02\u0242\u021F\x03\x02\x02\x02" +
		"\u0242\u0224\x03\x02\x02\x02\u0242\u0229\x03\x02\x02\x02\u0242\u022F\x03" +
		"\x02\x02\x02\u0242\u0233\x03\x02\x02\x02\u0242\u0238\x03\x02\x02\x02\u0242" +
		"\u023D\x03\x02\x02\x02\u0242\u0241\x03\x02\x02\x02\u0243s\x03\x02\x02" +
		"\x02\u0244\u0245\x05v<\x02\u0245u\x03\x02\x02\x02\u0246\u0247\b<\x01\x02" +
		"\u0247\u0266\x07j\x02\x02\u0248\u0266\x05\x86D\x02\u0249\u024A\x07.\x02" +
		"\x02\u024A\u024B\x05v<\x02\u024B\u024C\x07/\x02\x02\u024C\u0266\x03\x02" +
		"\x02\x02\u024D\u0266\x05X-\x02\u024E\u024F\x07W\x02\x02\u024F\u0266\x05" +
		"v<\v\u0250\u0251\x05z>\x02\u0251\u0252\x07Y\x02\x02\u0252\u0253\x05z>" +
		"\x02\u0253\u0266\x03\x02\x02\x02\u0254\u0255\x05z>\x02\u0255\u0256\x07" +
		"Z\x02\x02\u0256\u0257\x05z>\x02\u0257\u0266\x03\x02\x02\x02\u0258\u0259" +
		"\x05z>\x02\u0259\u025A\x07[\x02\x02\u025A\u025B\x05z>\x02\u025B\u0266" +
		"\x03\x02\x02\x02\u025C\u025D\x05p9\x02\u025D\u025E\x07\\\x02\x02\u025E" +
		"\u025F\x05p9\x02\u025F\u0266\x03\x02\x02\x02\u0260\u0261\x07T\x02\x02" +
		"\u0261\u0262\x07j\x02\x02\u0262\u0263\x07U\x02\x02\u0263\u0266\x05v<\x04" +
		"\u0264\u0266\x07]\x02\x02\u0265\u0246\x03\x02\x02\x02\u0265\u0248\x03" +
		"\x02\x02\x02\u0265\u0249\x03\x02\x02\x02\u0265\u024D\x03\x02\x02\x02\u0265" +
		"\u024E\x03\x02\x02\x02\u0265\u0250\x03\x02\x02\x02\u0265\u0254\x03\x02" +
		"\x02\x02\u0265\u0258\x03\x02\x02\x02\u0265\u025C\x03\x02\x02\x02\u0265" +
		"\u0260\x03\x02\x02\x02\u0265\u0264\x03\x02\x02\x02\u0266\u026F\x03\x02" +
		"\x02\x02\u0267\u0268\f\n\x02\x02\u0268\u0269\x07@\x02\x02\u0269\u026E" +
		"\x05v<\v\u026A\u026B\f\t\x02\x02\u026B\u026C\x07X\x02\x02\u026C\u026E" +
		"\x05v<\n\u026D\u0267\x03\x02\x02\x02\u026D\u026A\x03\x02\x02\x02\u026E" +
		"\u0271\x03\x02\x02\x02\u026F\u026D\x03\x02\x02\x02\u026F\u0270\x03\x02" +
		"\x02\x02\u0270w\x03\x02\x02\x02\u0271\u026F\x03\x02\x02\x02\u0272\u0273" +
		"\x05|?\x02\u0273y\x03\x02\x02\x02\u0274\u0277\x05x=\x02\u0275\u0277\x05" +
		"p9\x02\u0276\u0274\x03\x02\x02\x02\u0276\u0275\x03\x02\x02\x02\u0277{" +
		"\x03\x02\x02\x02\u0278\u0279\b?\x01\x02\u0279\u029F\x05\x8CG\x02\u027A" +
		"\u029F\x05\x86D\x02\u027B\u027C\x07.\x02\x02\u027C\u027D\x05|?\x02\u027D" +
		"\u027E\x07/\x02\x02\u027E\u029F\x03\x02\x02\x02\u027F\u029F\x05X-\x02" +
		"\u0280\u0281\x07O\x02\x02\u0281\u0282\x05p9\x02\u0282\u0283\x07H\x02\x02" +
		"\u0283\u0284\x07\x14\x02\x02\u0284\u029F\x03\x02\x02\x02\u0285\u0286\x07" +
		"O\x02\x02\u0286\u0287\x05t;\x02\u0287\u0288\x07H\x02\x02\u0288\u0289\x07" +
		"\x14\x02\x02\u0289\u029F\x03\x02\x02\x02\u028A\u029F\x07B\x02\x02\u028B" +
		"\u028C\x07^\x02\x02\u028C\u028D\x07\x13\x02\x02\u028D\u029F\x05p9\x02" +
		"\u028E\u028F\x07^\x02\x02\u028F\u0290\x07\x13\x02\x02\u0290\u0291\x07" +
		"\x12\x02\x02\u0291\u029F\x05\x86D\x02\u0292\u0293\x07_\x02\x02\u0293\u0294" +
		"\x07\x13\x02\x02\u0294\u0295\x05\x80A\x02\u0295\u0296\x07%\x02\x02\u0296" +
		"\u0297\x05\x86D\x02\u0297\u029F\x03\x02\x02\x02\u0298\u0299\x07T\x02\x02" +
		"\u0299\u029A\x05\x8CG\x02\u029A\u029B\x07U\x02\x02\u029B\u029C\x05|?\x04" +
		"\u029C\u029F\x03\x02\x02\x02\u029D\u029F\x07d\x02\x02\u029E\u0278\x03" +
		"\x02\x02\x02\u029E\u027A\x03\x02\x02\x02\u029E\u027B\x03\x02\x02\x02\u029E" +
		"\u027F\x03\x02\x02\x02\u029E\u0280\x03\x02\x02\x02\u029E\u0285\x03\x02" +
		"\x02\x02\u029E\u028A\x03\x02\x02\x02\u029E\u028B\x03\x02\x02\x02\u029E" +
		"\u028E\x03\x02\x02\x02\u029E\u0292\x03\x02\x02\x02\u029E\u0298\x03\x02" +
		"\x02\x02\u029E\u029D\x03\x02\x02\x02\u029F\u02B1\x03\x02\x02\x02\u02A0" +
		"\u02A1\f\t\x02\x02\u02A1\u02A2\x07\x07\x02\x02\u02A2\u02B0\x05|?\n\u02A3" +
		"\u02A4\f\b\x02\x02\u02A4\u02A5\x07`\x02\x02\u02A5\u02B0\x05|?\t\u02A6" +
		"\u02A7\f\x07\x02\x02\u02A7\u02A8\x07a\x02\x02\u02A8\u02B0\x05|?\b\u02A9" +
		"\u02AA\f\x06\x02\x02\u02AA\u02AB\x07b\x02\x02\u02AB\u02B0\x05|?\x07\u02AC" +
		"\u02AD\f\x05\x02\x02\u02AD\u02AE\x07c\x02\x02\u02AE\u02B0\x05|?\x06\u02AF" +
		"\u02A0\x03\x02\x02\x02\u02AF\u02A3\x03\x02\x02\x02\u02AF\u02A6\x03\x02" +
		"\x02\x02\u02AF\u02A9\x03\x02\x02\x02\u02AF\u02AC\x03\x02\x02\x02\u02B0" +
		"\u02B3\x03\x02\x02\x02\u02B1\u02AF\x03\x02\x02\x02\u02B1\u02B2\x03\x02" +
		"\x02\x02\u02B2}\x03\x02\x02\x02\u02B3\u02B1\x03\x02\x02\x02\u02B4\u02BA" +
		"\x05\x86D\x02\u02B5\u02B6\x07\x18\x02\x02\u02B6\u02B7\x05\\/\x02\u02B7" +
		"\u02B8\x07\x19\x02\x02\u02B8\u02BA\x03\x02\x02\x02\u02B9\u02B4\x03\x02" +
		"\x02\x02\u02B9\u02B5\x03\x02\x02\x02\u02BA\x7F\x03\x02\x02\x02\u02BB\u02BC" +
		"\x05\x82B\x02\u02BC\x81\x03\x02\x02\x02\u02BD\u02C3\x05p9\x02\u02BE\u02C3" +
		"\x05x=\x02\u02BF\u02C3\x05t;\x02\u02C0\u02C3\x05~@\x02\u02C1\u02C3\x05" +
		"\x84C\x02\u02C2\u02BD\x03\x02\x02\x02\u02C2\u02BE\x03\x02\x02\x02\u02C2" +
		"\u02BF\x03\x02\x02\x02\u02C2\u02C0\x03\x02\x02\x02\u02C2\u02C1\x03\x02" +
		"\x02\x02\u02C3\x83\x03\x02\x02\x02\u02C4\u02C5\x07e\x02\x02\u02C5\x85" +
		"\x03\x02\x02\x02\u02C6\u02CC\x05\x8AF\x02\u02C7\u02C8\x05\x8AF\x02\u02C8" +
		"\u02C9\x07f\x02\x02\u02C9\u02CA\x05\x8AF\x02\u02CA\u02CC\x03\x02\x02\x02" +
		"\u02CB\u02C6\x03\x02\x02\x02\u02CB\u02C7\x03\x02\x02\x02\u02CC\x87\x03" +
		"\x02\x02\x02\u02CD\u02CE\x07g\x02\x02\u02CE\u02CF\x05x=\x02\u02CF\u02D0" +
		"\x05x=\x02\u02D0\u02D1\x05x=\x02\u02D1\u02D2\x05x=\x02\u02D2\u02D7\x03" +
		"\x02\x02\x02\u02D3\u02D4\x07\x06\x02\x02\u02D4\u02D5\x07\x14\x02\x02\u02D5" +
		"\u02D7\x05x=\x02\u02D6\u02CD\x03\x02\x02\x02\u02D6\u02D3\x03\x02\x02\x02" +
		"\u02D7\x89\x03\x02\x02\x02\u02D8\u02DC\x07m\x02\x02\u02D9\u02DA\x07h\x02" +
		"\x02\u02DA\u02DC\x07k\x02\x02\u02DB\u02D8\x03\x02\x02\x02\u02DB\u02D9" +
		"\x03\x02\x02\x02\u02DC\x8B\x03\x02\x02\x02\u02DD\u02DE\x07n\x02\x02\u02DE" +
		"\x8D\x03\x02\x02\x02\u02DF\u02E0\x07i\x02\x02\u02E0\u02E1\x05x=\x02\u02E1" +
		"\x8F\x03\x02\x02\x02\u02E2\u02E3\x07k\x02\x02\u02E3\x91\x03\x02\x02\x02" +
		"\u02E4\u02E9\x05p9\x02\u02E5\u02E6\x07k\x02\x02\u02E6\u02E7\x07`\x02\x02" +
		"\u02E7\u02E9\x05p9\x02\u02E8\u02E4\x03\x02\x02\x02\u02E8\u02E5\x03\x02" +
		"\x02\x02\u02E9\x93\x03\x02\x02\x022\x9E\xA8\xAD\xBD\xC1\xC5\xD4\xD9\xE4" +
		"\xEB\xF5\xF9\u0104\u011C\u0126\u012B\u013B\u0140\u0146\u0158\u015C\u0161" +
		"\u016B\u0175\u0180\u019C\u01A0\u01AD\u01B5\u01D4\u01F3\u01FF\u0204\u020F" +
		"\u0242\u0265\u026D\u026F\u0276\u029E\u02AF\u02B1\u02B9\u02C2\u02CB\u02D6" +
		"\u02DB\u02E8";
	public static readonly _serializedATN: string = Utils.join(
		[
			ScratchParser._serializedATNSegment0,
			ScratchParser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ScratchParser.__ATN) {
			ScratchParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ScratchParser._serializedATN));
		}

		return ScratchParser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public fileType(): FileTypeContext {
		return this.getRuleContext(0, FileTypeContext);
	}
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	public importDefinitionList(): ImportDefinitionListContext {
		return this.getRuleContext(0, ImportDefinitionListContext);
	}
	public actorDefinitionList(): ActorDefinitionListContext {
		return this.getRuleContext(0, ActorDefinitionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_program; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FileTypeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_fileType; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterFileType) {
			listener.enterFileType(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitFileType) {
			listener.exitFileType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitFileType) {
			return visitor.visitFileType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportDefinitionListContext extends ParserRuleContext {
	public importDefinition(): ImportDefinitionContext[];
	public importDefinition(i: number): ImportDefinitionContext;
	public importDefinition(i?: number): ImportDefinitionContext | ImportDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ImportDefinitionContext);
		} else {
			return this.getRuleContext(i, ImportDefinitionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_importDefinitionList; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterImportDefinitionList) {
			listener.enterImportDefinitionList(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitImportDefinitionList) {
			listener.exitImportDefinitionList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitImportDefinitionList) {
			return visitor.visitImportDefinitionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportDefinitionContext extends ParserRuleContext {
	public importSelector(): ImportSelectorContext {
		return this.getRuleContext(0, ImportSelectorContext);
	}
	public resourceLocator(): ResourceLocatorContext {
		return this.getRuleContext(0, ResourceLocatorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_importDefinition; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterImportDefinition) {
			listener.enterImportDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitImportDefinition) {
			listener.exitImportDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitImportDefinition) {
			return visitor.visitImportDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportSelectorContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_importSelector; }
	public copyFrom(ctx: ImportSelectorContext): void {
		super.copyFrom(ctx);
	}
}
export class ImportSelectedActorContext extends ImportSelectorContext {
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	constructor(ctx: ImportSelectorContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterImportSelectedActor) {
			listener.enterImportSelectedActor(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitImportSelectedActor) {
			listener.exitImportSelectedActor(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitImportSelectedActor) {
			return visitor.visitImportSelectedActor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ImportAllActorsContext extends ImportSelectorContext {
	constructor(ctx: ImportSelectorContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterImportAllActors) {
			listener.enterImportAllActors(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitImportAllActors) {
			listener.exitImportAllActors(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitImportAllActors) {
			return visitor.visitImportAllActors(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActorDefinitionListContext extends ParserRuleContext {
	public actorDefinition(): ActorDefinitionContext[];
	public actorDefinition(i: number): ActorDefinitionContext;
	public actorDefinition(i?: number): ActorDefinitionContext | ActorDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ActorDefinitionContext);
		} else {
			return this.getRuleContext(i, ActorDefinitionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_actorDefinitionList; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterActorDefinitionList) {
			listener.enterActorDefinitionList(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitActorDefinitionList) {
			listener.exitActorDefinitionList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitActorDefinitionList) {
			return visitor.visitActorDefinitionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActorDefinitionContext extends ParserRuleContext {
	public actorMode(): ActorModeContext {
		return this.getRuleContext(0, ActorModeContext);
	}
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	public inheritsFrom(): InheritsFromContext {
		return this.getRuleContext(0, InheritsFromContext);
	}
	public actorComponentsDefinition(): ActorComponentsDefinitionContext {
		return this.getRuleContext(0, ActorComponentsDefinitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_actorDefinition; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterActorDefinition) {
			listener.enterActorDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitActorDefinition) {
			listener.exitActorDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitActorDefinition) {
			return visitor.visitActorDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InheritsFromContext extends ParserRuleContext {
	public ident(): IdentContext[];
	public ident(i: number): IdentContext;
	public ident(i?: number): IdentContext | IdentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentContext);
		} else {
			return this.getRuleContext(i, IdentContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_inheritsFrom; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterInheritsFrom) {
			listener.enterInheritsFrom(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitInheritsFrom) {
			listener.exitInheritsFrom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitInheritsFrom) {
			return visitor.visitInheritsFrom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActorModeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_actorMode; }
	public copyFrom(ctx: ActorModeContext): void {
		super.copyFrom(ctx);
	}
}
export class ConcreteActorModeContext extends ActorModeContext {
	constructor(ctx: ActorModeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterConcreteActorMode) {
			listener.enterConcreteActorMode(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitConcreteActorMode) {
			listener.exitConcreteActorMode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitConcreteActorMode) {
			return visitor.visitConcreteActorMode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ActorRoleModeContext extends ActorModeContext {
	constructor(ctx: ActorModeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterActorRoleMode) {
			listener.enterActorRoleMode(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitActorRoleMode) {
			listener.exitActorRoleMode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitActorRoleMode) {
			return visitor.visitActorRoleMode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActorComponentsDefinitionContext extends ParserRuleContext {
	public resourceList(): ResourceListContext {
		return this.getRuleContext(0, ResourceListContext);
	}
	public declarationStmtList(): DeclarationStmtListContext {
		return this.getRuleContext(0, DeclarationStmtListContext);
	}
	public setStmtList(): SetStmtListContext {
		return this.getRuleContext(0, SetStmtListContext);
	}
	public externMethodDefinitionList(): ExternMethodDefinitionListContext {
		return this.getRuleContext(0, ExternMethodDefinitionListContext);
	}
	public methodDefinitionList(): MethodDefinitionListContext {
		return this.getRuleContext(0, MethodDefinitionListContext);
	}
	public scriptList(): ScriptListContext {
		return this.getRuleContext(0, ScriptListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_actorComponentsDefinition; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterActorComponentsDefinition) {
			listener.enterActorComponentsDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitActorComponentsDefinition) {
			listener.exitActorComponentsDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitActorComponentsDefinition) {
			return visitor.visitActorComponentsDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResourceContext extends ParserRuleContext {
	public resourceType(): ResourceTypeContext {
		return this.getRuleContext(0, ResourceTypeContext);
	}
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	public resourceLocator(): ResourceLocatorContext {
		return this.getRuleContext(0, ResourceLocatorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_resource; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterResource) {
			listener.enterResource(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitResource) {
			listener.exitResource(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitResource) {
			return visitor.visitResource(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResourceTypeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_resourceType; }
	public copyFrom(ctx: ResourceTypeContext): void {
		super.copyFrom(ctx);
	}
}
export class ImageResourceContext extends ResourceTypeContext {
	constructor(ctx: ResourceTypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterImageResource) {
			listener.enterImageResource(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitImageResource) {
			listener.exitImageResource(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitImageResource) {
			return visitor.visitImageResource(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SoundResourceContext extends ResourceTypeContext {
	constructor(ctx: ResourceTypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterSoundResource) {
			listener.enterSoundResource(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitSoundResource) {
			listener.exitSoundResource(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitSoundResource) {
			return visitor.visitSoundResource(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResourceListContext extends ParserRuleContext {
	public resource(): ResourceContext[];
	public resource(i: number): ResourceContext;
	public resource(i?: number): ResourceContext | ResourceContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ResourceContext);
		} else {
			return this.getRuleContext(i, ResourceContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_resourceList; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterResourceList) {
			listener.enterResourceList(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitResourceList) {
			listener.exitResourceList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitResourceList) {
			return visitor.visitResourceList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_declarationStmt; }
	public copyFrom(ctx: DeclarationStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class DeclareVariableContext extends DeclarationStmtContext {
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	constructor(ctx: DeclarationStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterDeclareVariable) {
			listener.enterDeclareVariable(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitDeclareVariable) {
			listener.exitDeclareVariable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitDeclareVariable) {
			return visitor.visitDeclareVariable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationStmtListContext extends ParserRuleContext {
	public declarationStmt(): DeclarationStmtContext[];
	public declarationStmt(i: number): DeclarationStmtContext;
	public declarationStmt(i?: number): DeclarationStmtContext | DeclarationStmtContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DeclarationStmtContext);
		} else {
			return this.getRuleContext(i, DeclarationStmtContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_declarationStmtList; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterDeclarationStmtList) {
			listener.enterDeclarationStmtList(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitDeclarationStmtList) {
			listener.exitDeclarationStmtList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitDeclarationStmtList) {
			return visitor.visitDeclarationStmtList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_type; }
	public copyFrom(ctx: TypeContext): void {
		super.copyFrom(ctx);
	}
}
export class PrimitiveContext extends TypeContext {
	public primitiveType(): PrimitiveTypeContext {
		return this.getRuleContext(0, PrimitiveTypeContext);
	}
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterPrimitive) {
			listener.enterPrimitive(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitPrimitive) {
			listener.exitPrimitive(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitPrimitive) {
			return visitor.visitPrimitive(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ListTypeContext extends TypeContext {
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterListType) {
			listener.enterListType(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitListType) {
			listener.exitListType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitListType) {
			return visitor.visitListType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimitiveTypeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_primitiveType; }
	public copyFrom(ctx: PrimitiveTypeContext): void {
		super.copyFrom(ctx);
	}
}
export class NumberTypeContext extends PrimitiveTypeContext {
	constructor(ctx: PrimitiveTypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumberType) {
			listener.enterNumberType(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumberType) {
			listener.exitNumberType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumberType) {
			return visitor.visitNumberType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BooleanTypeContext extends PrimitiveTypeContext {
	constructor(ctx: PrimitiveTypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBooleanType) {
			listener.enterBooleanType(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBooleanType) {
			listener.exitBooleanType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBooleanType) {
			return visitor.visitBooleanType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringTypeContext extends PrimitiveTypeContext {
	constructor(ctx: PrimitiveTypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStringType) {
			listener.enterStringType(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStringType) {
			listener.exitStringType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStringType) {
			return visitor.visitStringType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EnumTypeContext extends PrimitiveTypeContext {
	public expressionListPlain(): ExpressionListPlainContext {
		return this.getRuleContext(0, ExpressionListPlainContext);
	}
	constructor(ctx: PrimitiveTypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterEnumType) {
			listener.enterEnumType(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitEnumType) {
			listener.exitEnumType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitEnumType) {
			return visitor.visitEnumType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IndexTypeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_indexType; }
	public copyFrom(ctx: IndexTypeContext): void {
		super.copyFrom(ctx);
	}
}
export class NumberIndexTypeContext extends IndexTypeContext {
	constructor(ctx: IndexTypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumberIndexType) {
			listener.enterNumberIndexType(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumberIndexType) {
			listener.exitNumberIndexType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumberIndexType) {
			return visitor.visitNumberIndexType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringIndexTypeContext extends IndexTypeContext {
	constructor(ctx: IndexTypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStringIndexType) {
			listener.enterStringIndexType(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStringIndexType) {
			listener.exitStringIndexType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStringIndexType) {
			return visitor.visitStringIndexType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ScriptContext extends ParserRuleContext {
	public event(): EventContext {
		return this.getRuleContext(0, EventContext);
	}
	public stmtList(): StmtListContext {
		return this.getRuleContext(0, StmtListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_script; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterScript) {
			listener.enterScript(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitScript) {
			listener.exitScript(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitScript) {
			return visitor.visitScript(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ScriptListContext extends ParserRuleContext {
	public script(): ScriptContext[];
	public script(i: number): ScriptContext;
	public script(i?: number): ScriptContext | ScriptContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ScriptContext);
		} else {
			return this.getRuleContext(i, ScriptContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_scriptList; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterScriptList) {
			listener.enterScriptList(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitScriptList) {
			listener.exitScriptList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitScriptList) {
			return visitor.visitScriptList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EventContext extends ParserRuleContext {
	public coreEvent(): CoreEventContext {
		return this.getRuleContext(0, CoreEventContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_event; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterEvent) {
			listener.enterEvent(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitEvent) {
			listener.exitEvent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitEvent) {
			return visitor.visitEvent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CoreEventContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_coreEvent; }
	public copyFrom(ctx: CoreEventContext): void {
		super.copyFrom(ctx);
	}
}
export class NeverEventContext extends CoreEventContext {
	constructor(ctx: CoreEventContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNeverEvent) {
			listener.enterNeverEvent(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNeverEvent) {
			listener.exitNeverEvent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNeverEvent) {
			return visitor.visitNeverEvent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BootstapEventContext extends CoreEventContext {
	constructor(ctx: CoreEventContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBootstapEvent) {
			listener.enterBootstapEvent(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBootstapEvent) {
			listener.exitBootstapEvent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBootstapEvent) {
			return visitor.visitBootstapEvent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AfterBootstrapMonitoringEventContext extends CoreEventContext {
	constructor(ctx: CoreEventContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterAfterBootstrapMonitoringEvent) {
			listener.enterAfterBootstrapMonitoringEvent(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitAfterBootstrapMonitoringEvent) {
			listener.exitAfterBootstrapMonitoringEvent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitAfterBootstrapMonitoringEvent) {
			return visitor.visitAfterBootstrapMonitoringEvent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StartupEventContext extends CoreEventContext {
	constructor(ctx: CoreEventContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStartupEvent) {
			listener.enterStartupEvent(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStartupEvent) {
			listener.exitStartupEvent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStartupEvent) {
			return visitor.visitStartupEvent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CloneStartEventContext extends CoreEventContext {
	constructor(ctx: CoreEventContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterCloneStartEvent) {
			listener.enterCloneStartEvent(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitCloneStartEvent) {
			listener.exitCloneStartEvent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitCloneStartEvent) {
			return visitor.visitCloneStartEvent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MessageReceivedEventContext extends CoreEventContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	public String(): TerminalNode { return this.getToken(ScratchParser.String, 0); }
	constructor(ctx: CoreEventContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterMessageReceivedEvent) {
			listener.enterMessageReceivedEvent(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitMessageReceivedEvent) {
			listener.exitMessageReceivedEvent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitMessageReceivedEvent) {
			return visitor.visitMessageReceivedEvent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConditionReachedEventContext extends CoreEventContext {
	public boolExpr(): BoolExprContext {
		return this.getRuleContext(0, BoolExprContext);
	}
	constructor(ctx: CoreEventContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterConditionReachedEvent) {
			listener.enterConditionReachedEvent(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitConditionReachedEvent) {
			listener.exitConditionReachedEvent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitConditionReachedEvent) {
			return visitor.visitConditionReachedEvent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RenderedMonitoringEventContext extends CoreEventContext {
	constructor(ctx: CoreEventContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterRenderedMonitoringEvent) {
			listener.enterRenderedMonitoringEvent(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitRenderedMonitoringEvent) {
			listener.exitRenderedMonitoringEvent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitRenderedMonitoringEvent) {
			return visitor.visitRenderedMonitoringEvent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AfterStatementMonitoringEventContext extends CoreEventContext {
	constructor(ctx: CoreEventContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterAfterStatementMonitoringEvent) {
			listener.enterAfterStatementMonitoringEvent(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitAfterStatementMonitoringEvent) {
			listener.exitAfterStatementMonitoringEvent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitAfterStatementMonitoringEvent) {
			return visitor.visitAfterStatementMonitoringEvent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExternMethodDefinitionContext extends ParserRuleContext {
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	public parameterList(): ParameterListContext {
		return this.getRuleContext(0, ParameterListContext);
	}
	public externMethodResultDeclaration(): ExternMethodResultDeclarationContext {
		return this.getRuleContext(0, ExternMethodResultDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_externMethodDefinition; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterExternMethodDefinition) {
			listener.enterExternMethodDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitExternMethodDefinition) {
			listener.exitExternMethodDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitExternMethodDefinition) {
			return visitor.visitExternMethodDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExternMethodResultDeclarationContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_externMethodResultDeclaration; }
	public copyFrom(ctx: ExternMethodResultDeclarationContext): void {
		super.copyFrom(ctx);
	}
}
export class ExternFunctionReturnDefinitionContext extends ExternMethodResultDeclarationContext {
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	constructor(ctx: ExternMethodResultDeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterExternFunctionReturnDefinition) {
			listener.enterExternFunctionReturnDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitExternFunctionReturnDefinition) {
			listener.exitExternFunctionReturnDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitExternFunctionReturnDefinition) {
			return visitor.visitExternFunctionReturnDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExternVoidReturnDefinitionContext extends ExternMethodResultDeclarationContext {
	constructor(ctx: ExternMethodResultDeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterExternVoidReturnDefinition) {
			listener.enterExternVoidReturnDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitExternVoidReturnDefinition) {
			listener.exitExternVoidReturnDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitExternVoidReturnDefinition) {
			return visitor.visitExternVoidReturnDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExternMethodDefinitionListContext extends ParserRuleContext {
	public externMethodDefinition(): ExternMethodDefinitionContext[];
	public externMethodDefinition(i: number): ExternMethodDefinitionContext;
	public externMethodDefinition(i?: number): ExternMethodDefinitionContext | ExternMethodDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExternMethodDefinitionContext);
		} else {
			return this.getRuleContext(i, ExternMethodDefinitionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_externMethodDefinitionList; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterExternMethodDefinitionList) {
			listener.enterExternMethodDefinitionList(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitExternMethodDefinitionList) {
			listener.exitExternMethodDefinitionList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitExternMethodDefinitionList) {
			return visitor.visitExternMethodDefinitionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodDefinitionContext extends ParserRuleContext {
	public methodAttributeList(): MethodAttributeListContext {
		return this.getRuleContext(0, MethodAttributeListContext);
	}
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	public parameterList(): ParameterListContext {
		return this.getRuleContext(0, ParameterListContext);
	}
	public stmtList(): StmtListContext {
		return this.getRuleContext(0, StmtListContext);
	}
	public methodResultDeclaration(): MethodResultDeclarationContext {
		return this.getRuleContext(0, MethodResultDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_methodDefinition; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterMethodDefinition) {
			listener.enterMethodDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitMethodDefinition) {
			listener.exitMethodDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitMethodDefinition) {
			return visitor.visitMethodDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodResultDeclarationContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_methodResultDeclaration; }
	public copyFrom(ctx: MethodResultDeclarationContext): void {
		super.copyFrom(ctx);
	}
}
export class FunctionReturnDefinitionContext extends MethodResultDeclarationContext {
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	constructor(ctx: MethodResultDeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterFunctionReturnDefinition) {
			listener.enterFunctionReturnDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitFunctionReturnDefinition) {
			listener.exitFunctionReturnDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitFunctionReturnDefinition) {
			return visitor.visitFunctionReturnDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class VoidReturnDefinitionContext extends MethodResultDeclarationContext {
	constructor(ctx: MethodResultDeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterVoidReturnDefinition) {
			listener.enterVoidReturnDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitVoidReturnDefinition) {
			listener.exitVoidReturnDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitVoidReturnDefinition) {
			return visitor.visitVoidReturnDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodDefinitionListContext extends ParserRuleContext {
	public methodDefinition(): MethodDefinitionContext[];
	public methodDefinition(i: number): MethodDefinitionContext;
	public methodDefinition(i?: number): MethodDefinitionContext | MethodDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MethodDefinitionContext);
		} else {
			return this.getRuleContext(i, MethodDefinitionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_methodDefinitionList; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterMethodDefinitionList) {
			listener.enterMethodDefinitionList(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitMethodDefinitionList) {
			listener.exitMethodDefinitionList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitMethodDefinitionList) {
			return visitor.visitMethodDefinitionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodAttributeListContext extends ParserRuleContext {
	public methodAttribute(): MethodAttributeContext[];
	public methodAttribute(i: number): MethodAttributeContext;
	public methodAttribute(i?: number): MethodAttributeContext | MethodAttributeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MethodAttributeContext);
		} else {
			return this.getRuleContext(i, MethodAttributeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_methodAttributeList; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterMethodAttributeList) {
			listener.enterMethodAttributeList(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitMethodAttributeList) {
			listener.exitMethodAttributeList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitMethodAttributeList) {
			return visitor.visitMethodAttributeList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodAttributeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_methodAttribute; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterMethodAttribute) {
			listener.enterMethodAttribute(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitMethodAttribute) {
			listener.exitMethodAttribute(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitMethodAttribute) {
			return visitor.visitMethodAttribute(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterContext extends ParserRuleContext {
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_parameter; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterParameter) {
			listener.enterParameter(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitParameter) {
			listener.exitParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitParameter) {
			return visitor.visitParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterListContext extends ParserRuleContext {
	public parameterListPlain(): ParameterListPlainContext {
		return this.getRuleContext(0, ParameterListPlainContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_parameterList; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterParameterList) {
			listener.enterParameterList(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitParameterList) {
			listener.exitParameterList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitParameterList) {
			return visitor.visitParameterList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterListPlainContext extends ParserRuleContext {
	public parameter(): ParameterContext[];
	public parameter(i: number): ParameterContext;
	public parameter(i?: number): ParameterContext | ParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParameterContext);
		} else {
			return this.getRuleContext(i, ParameterContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_parameterListPlain; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterParameterListPlain) {
			listener.enterParameterListPlain(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitParameterListPlain) {
			listener.exitParameterListPlain(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitParameterListPlain) {
			return visitor.visitParameterListPlain(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StmtListContext extends ParserRuleContext {
	public stmtListPlain(): StmtListPlainContext {
		return this.getRuleContext(0, StmtListPlainContext);
	}
	public terminationStmt(): TerminationStmtContext | undefined {
		return this.tryGetRuleContext(0, TerminationStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_stmtList; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStmtList) {
			listener.enterStmtList(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStmtList) {
			listener.exitStmtList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStmtList) {
			return visitor.visitStmtList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AtomicBlockContext extends ParserRuleContext {
	public stmtList(): StmtListContext {
		return this.getRuleContext(0, StmtListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_atomicBlock; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterAtomicBlock) {
			listener.enterAtomicBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitAtomicBlock) {
			listener.exitAtomicBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitAtomicBlock) {
			return visitor.visitAtomicBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StmtListPlainContext extends ParserRuleContext {
	public stmt(): StmtContext[];
	public stmt(i: number): StmtContext;
	public stmt(i?: number): StmtContext | StmtContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StmtContext);
		} else {
			return this.getRuleContext(i, StmtContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_stmtListPlain; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStmtListPlain) {
			listener.enterStmtListPlain(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStmtListPlain) {
			listener.exitStmtListPlain(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStmtListPlain) {
			return visitor.visitStmtListPlain(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ControlStmtContext extends ParserRuleContext {
	public coreControlStmt(): CoreControlStmtContext {
		return this.getRuleContext(0, CoreControlStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_controlStmt; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterControlStmt) {
			listener.enterControlStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitControlStmt) {
			listener.exitControlStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitControlStmt) {
			return visitor.visitControlStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CoreControlStmtContext extends ParserRuleContext {
	public ifStmt(): IfStmtContext | undefined {
		return this.tryGetRuleContext(0, IfStmtContext);
	}
	public untilStmt(): UntilStmtContext | undefined {
		return this.tryGetRuleContext(0, UntilStmtContext);
	}
	public repeatTimesStmt(): RepeatTimesStmtContext | undefined {
		return this.tryGetRuleContext(0, RepeatTimesStmtContext);
	}
	public repeatForeverStmt(): RepeatForeverStmtContext | undefined {
		return this.tryGetRuleContext(0, RepeatForeverStmtContext);
	}
	public callStmt(): CallStmtContext | undefined {
		return this.tryGetRuleContext(0, CallStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_coreControlStmt; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterCoreControlStmt) {
			listener.enterCoreControlStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitCoreControlStmt) {
			listener.exitCoreControlStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitCoreControlStmt) {
			return visitor.visitCoreControlStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfStmtContext extends ParserRuleContext {
	public boolExpr(): BoolExprContext {
		return this.getRuleContext(0, BoolExprContext);
	}
	public stmtList(): StmtListContext {
		return this.getRuleContext(0, StmtListContext);
	}
	public elseCase(): ElseCaseContext {
		return this.getRuleContext(0, ElseCaseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_ifStmt; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterIfStmt) {
			listener.enterIfStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitIfStmt) {
			listener.exitIfStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitIfStmt) {
			return visitor.visitIfStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElseCaseContext extends ParserRuleContext {
	public stmtList(): StmtListContext | undefined {
		return this.tryGetRuleContext(0, StmtListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_elseCase; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterElseCase) {
			listener.enterElseCase(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitElseCase) {
			listener.exitElseCase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitElseCase) {
			return visitor.visitElseCase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UntilStmtContext extends ParserRuleContext {
	public boolExpr(): BoolExprContext {
		return this.getRuleContext(0, BoolExprContext);
	}
	public stmtList(): StmtListContext {
		return this.getRuleContext(0, StmtListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_untilStmt; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterUntilStmt) {
			listener.enterUntilStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitUntilStmt) {
			listener.exitUntilStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitUntilStmt) {
			return visitor.visitUntilStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RepeatTimesStmtContext extends ParserRuleContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	public stmtList(): StmtListContext {
		return this.getRuleContext(0, StmtListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_repeatTimesStmt; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterRepeatTimesStmt) {
			listener.enterRepeatTimesStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitRepeatTimesStmt) {
			listener.exitRepeatTimesStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitRepeatTimesStmt) {
			return visitor.visitRepeatTimesStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RepeatForeverStmtContext extends ParserRuleContext {
	public stmtList(): StmtListContext {
		return this.getRuleContext(0, StmtListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_repeatForeverStmt; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterRepeatForeverStmt) {
			listener.enterRepeatForeverStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitRepeatForeverStmt) {
			listener.exitRepeatForeverStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitRepeatForeverStmt) {
			return visitor.visitRepeatForeverStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CallStmtContext extends ParserRuleContext {
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	public expressionList(): ExpressionListContext {
		return this.getRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_callStmt; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterCallStmt) {
			listener.enterCallStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitCallStmt) {
			listener.exitCallStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitCallStmt) {
			return visitor.visitCallStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionListContext extends ParserRuleContext {
	public expressionListPlain(): ExpressionListPlainContext {
		return this.getRuleContext(0, ExpressionListPlainContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_expressionList; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterExpressionList) {
			listener.enterExpressionList(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitExpressionList) {
			listener.exitExpressionList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitExpressionList) {
			return visitor.visitExpressionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionListPlainContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_expressionListPlain; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterExpressionListPlain) {
			listener.enterExpressionListPlain(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitExpressionListPlain) {
			listener.exitExpressionListPlain(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitExpressionListPlain) {
			return visitor.visitExpressionListPlain(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionStmtContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_expressionStmt; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterExpressionStmt) {
			listener.enterExpressionStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitExpressionStmt) {
			listener.exitExpressionStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitExpressionStmt) {
			return visitor.visitExpressionStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_stmt; }
	public copyFrom(ctx: StmtContext): void {
		super.copyFrom(ctx);
	}
}
export class ControlStatementContext extends StmtContext {
	public controlStmt(): ControlStmtContext {
		return this.getRuleContext(0, ControlStmtContext);
	}
	constructor(ctx: StmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterControlStatement) {
			listener.enterControlStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitControlStatement) {
			listener.exitControlStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitControlStatement) {
			return visitor.visitControlStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NonControlStatementContext extends StmtContext {
	public nonCtrlStmt(): NonCtrlStmtContext {
		return this.getRuleContext(0, NonCtrlStmtContext);
	}
	constructor(ctx: StmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNonControlStatement) {
			listener.enterNonControlStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNonControlStatement) {
			listener.exitNonControlStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNonControlStatement) {
			return visitor.visitNonControlStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AtomicBlockStatementContext extends StmtContext {
	public atomicBlock(): AtomicBlockContext {
		return this.getRuleContext(0, AtomicBlockContext);
	}
	constructor(ctx: StmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterAtomicBlockStatement) {
			listener.enterAtomicBlockStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitAtomicBlockStatement) {
			listener.exitAtomicBlockStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitAtomicBlockStatement) {
			return visitor.visitAtomicBlockStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AttributedStatementContext extends StmtContext {
	public Identifier(): TerminalNode { return this.getToken(ScratchParser.Identifier, 0); }
	public expressionList(): ExpressionListContext {
		return this.getRuleContext(0, ExpressionListContext);
	}
	public stmt(): StmtContext {
		return this.getRuleContext(0, StmtContext);
	}
	constructor(ctx: StmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterAttributedStatement) {
			listener.enterAttributedStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitAttributedStatement) {
			listener.exitAttributedStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitAttributedStatement) {
			return visitor.visitAttributedStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NonCtrlStmtContext extends ParserRuleContext {
	public coreNonCtrlStmt(): CoreNonCtrlStmtContext {
		return this.getRuleContext(0, CoreNonCtrlStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_nonCtrlStmt; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNonCtrlStmt) {
			listener.enterNonCtrlStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNonCtrlStmt) {
			listener.exitNonCtrlStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNonCtrlStmt) {
			return visitor.visitNonCtrlStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CoreNonCtrlStmtContext extends ParserRuleContext {
	public expressionStmt(): ExpressionStmtContext | undefined {
		return this.tryGetRuleContext(0, ExpressionStmtContext);
	}
	public commonStmt(): CommonStmtContext | undefined {
		return this.tryGetRuleContext(0, CommonStmtContext);
	}
	public listStmt(): ListStmtContext | undefined {
		return this.tryGetRuleContext(0, ListStmtContext);
	}
	public declarationStmt(): DeclarationStmtContext | undefined {
		return this.tryGetRuleContext(0, DeclarationStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_coreNonCtrlStmt; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterCoreNonCtrlStmt) {
			listener.enterCoreNonCtrlStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitCoreNonCtrlStmt) {
			listener.exitCoreNonCtrlStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitCoreNonCtrlStmt) {
			return visitor.visitCoreNonCtrlStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CommonStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_commonStmt; }
	public copyFrom(ctx: CommonStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class WaitSecsStatementContext extends CommonStmtContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	constructor(ctx: CommonStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterWaitSecsStatement) {
			listener.enterWaitSecsStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitWaitSecsStatement) {
			listener.exitWaitSecsStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitWaitSecsStatement) {
			return visitor.visitWaitSecsStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class WaitUntilStatementContext extends CommonStmtContext {
	public boolExpr(): BoolExprContext {
		return this.getRuleContext(0, BoolExprContext);
	}
	constructor(ctx: CommonStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterWaitUntilStatement) {
			listener.enterWaitUntilStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitWaitUntilStatement) {
			listener.exitWaitUntilStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitWaitUntilStatement) {
			return visitor.visitWaitUntilStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StopOthersInActorStatementContext extends CommonStmtContext {
	constructor(ctx: CommonStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStopOthersInActorStatement) {
			listener.enterStopOthersInActorStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStopOthersInActorStatement) {
			listener.exitStopOthersInActorStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStopOthersInActorStatement) {
			return visitor.visitStopOthersInActorStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CreateCloneOfStatementContext extends CommonStmtContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: CommonStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterCreateCloneOfStatement) {
			listener.enterCreateCloneOfStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitCreateCloneOfStatement) {
			listener.exitCreateCloneOfStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitCreateCloneOfStatement) {
			return visitor.visitCreateCloneOfStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BroadcastMessageStatementContext extends CommonStmtContext {
	public message(): MessageContext {
		return this.getRuleContext(0, MessageContext);
	}
	constructor(ctx: CommonStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBroadcastMessageStatement) {
			listener.enterBroadcastMessageStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBroadcastMessageStatement) {
			listener.exitBroadcastMessageStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBroadcastMessageStatement) {
			return visitor.visitBroadcastMessageStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BroadcastAndWaitStatementContext extends CommonStmtContext {
	public message(): MessageContext {
		return this.getRuleContext(0, MessageContext);
	}
	constructor(ctx: CommonStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBroadcastAndWaitStatement) {
			listener.enterBroadcastAndWaitStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBroadcastAndWaitStatement) {
			listener.exitBroadcastAndWaitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBroadcastAndWaitStatement) {
			return visitor.visitBroadcastAndWaitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ResetTimerStatementContext extends CommonStmtContext {
	constructor(ctx: CommonStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterResetTimerStatement) {
			listener.enterResetTimerStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitResetTimerStatement) {
			listener.exitResetTimerStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitResetTimerStatement) {
			return visitor.visitResetTimerStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EpsilonStatementContext extends CommonStmtContext {
	constructor(ctx: CommonStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterEpsilonStatement) {
			listener.enterEpsilonStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitEpsilonStatement) {
			listener.exitEpsilonStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitEpsilonStatement) {
			return visitor.visitEpsilonStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AssumeStatementContext extends CommonStmtContext {
	public boolExpr(): BoolExprContext {
		return this.getRuleContext(0, BoolExprContext);
	}
	constructor(ctx: CommonStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterAssumeStatement) {
			listener.enterAssumeStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitAssumeStatement) {
			listener.exitAssumeStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitAssumeStatement) {
			return visitor.visitAssumeStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SetStatementContext extends CommonStmtContext {
	public setStmt(): SetStmtContext {
		return this.getRuleContext(0, SetStmtContext);
	}
	constructor(ctx: CommonStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterSetStatement) {
			listener.enterSetStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitSetStatement) {
			listener.exitSetStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitSetStatement) {
			return visitor.visitSetStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ListStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_listStmt; }
	public copyFrom(ctx: ListStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class DeleteAllFromStatementContext extends ListStmtContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: ListStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterDeleteAllFromStatement) {
			listener.enterDeleteAllFromStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitDeleteAllFromStatement) {
			listener.exitDeleteAllFromStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitDeleteAllFromStatement) {
			return visitor.visitDeleteAllFromStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DeleteIthFromStatementContext extends ListStmtContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: ListStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterDeleteIthFromStatement) {
			listener.enterDeleteIthFromStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitDeleteIthFromStatement) {
			listener.exitDeleteIthFromStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitDeleteIthFromStatement) {
			return visitor.visitDeleteIthFromStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AddElementToStatementContext extends ListStmtContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: ListStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterAddElementToStatement) {
			listener.enterAddElementToStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitAddElementToStatement) {
			listener.exitAddElementToStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitAddElementToStatement) {
			return visitor.visitAddElementToStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InsertAtStatementContext extends ListStmtContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: ListStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterInsertAtStatement) {
			listener.enterInsertAtStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitInsertAtStatement) {
			listener.exitInsertAtStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitInsertAtStatement) {
			return visitor.visitInsertAtStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReplaceElementAtStatementContext extends ListStmtContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: ListStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterReplaceElementAtStatement) {
			listener.enterReplaceElementAtStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitReplaceElementAtStatement) {
			listener.exitReplaceElementAtStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitReplaceElementAtStatement) {
			return visitor.visitReplaceElementAtStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SetStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_setStmt; }
	public copyFrom(ctx: SetStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class StoreEvalResultStatementContext extends SetStmtContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: SetStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStoreEvalResultStatement) {
			listener.enterStoreEvalResultStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStoreEvalResultStatement) {
			listener.exitStoreEvalResultStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStoreEvalResultStatement) {
			return visitor.visitStoreEvalResultStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StoreCallResultStatementContext extends SetStmtContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	public callStmt(): CallStmtContext {
		return this.getRuleContext(0, CallStmtContext);
	}
	constructor(ctx: SetStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStoreCallResultStatement) {
			listener.enterStoreCallResultStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStoreCallResultStatement) {
			listener.exitStoreCallResultStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStoreCallResultStatement) {
			return visitor.visitStoreCallResultStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SetStmtListContext extends ParserRuleContext {
	public setStmt(): SetStmtContext[];
	public setStmt(i: number): SetStmtContext;
	public setStmt(i?: number): SetStmtContext | SetStmtContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SetStmtContext);
		} else {
			return this.getRuleContext(i, SetStmtContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_setStmtList; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterSetStmtList) {
			listener.enterSetStmtList(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitSetStmtList) {
			listener.exitSetStmtList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitSetStmtList) {
			return visitor.visitSetStmtList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TerminationStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_terminationStmt; }
	public copyFrom(ctx: TerminationStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class StopAllContext extends TerminationStmtContext {
	constructor(ctx: TerminationStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStopAll) {
			listener.enterStopAll(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStopAll) {
			listener.exitStopAll(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStopAll) {
			return visitor.visitStopAll(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StopThisContext extends TerminationStmtContext {
	constructor(ctx: TerminationStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStopThis) {
			listener.enterStopThis(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStopThis) {
			listener.exitStopThis(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStopThis) {
			return visitor.visitStopThis(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DeleteThisCloneContext extends TerminationStmtContext {
	constructor(ctx: TerminationStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterDeleteThisClone) {
			listener.enterDeleteThisClone(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitDeleteThisClone) {
			listener.exitDeleteThisClone(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitDeleteThisClone) {
			return visitor.visitDeleteThisClone(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StringExprContext extends ParserRuleContext {
	public coreStringExpr(): CoreStringExprContext {
		return this.getRuleContext(0, CoreStringExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_stringExpr; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStringExpr) {
			listener.enterStringExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStringExpr) {
			listener.exitStringExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStringExpr) {
			return visitor.visitStringExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CoreStringExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_coreStringExpr; }
	public copyFrom(ctx: CoreStringExprContext): void {
		super.copyFrom(ctx);
	}
}
export class StringLiteralExpressionContext extends CoreStringExprContext {
	public String(): TerminalNode { return this.getToken(ScratchParser.String, 0); }
	constructor(ctx: CoreStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStringLiteralExpression) {
			listener.enterStringLiteralExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStringLiteralExpression) {
			listener.exitStringLiteralExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStringLiteralExpression) {
			return visitor.visitStringLiteralExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringVariableExpressionContext extends CoreStringExprContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: CoreStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStringVariableExpression) {
			listener.enterStringVariableExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStringVariableExpression) {
			listener.exitStringVariableExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStringVariableExpression) {
			return visitor.visitStringVariableExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringParanthExpressionContext extends CoreStringExprContext {
	public coreStringExpr(): CoreStringExprContext {
		return this.getRuleContext(0, CoreStringExprContext);
	}
	constructor(ctx: CoreStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStringParanthExpression) {
			listener.enterStringParanthExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStringParanthExpression) {
			listener.exitStringParanthExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStringParanthExpression) {
			return visitor.visitStringParanthExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringCallStatementExpressionContext extends CoreStringExprContext {
	public callStmt(): CallStmtContext {
		return this.getRuleContext(0, CallStmtContext);
	}
	constructor(ctx: CoreStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStringCallStatementExpression) {
			listener.enterStringCallStatementExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStringCallStatementExpression) {
			listener.exitStringCallStatementExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStringCallStatementExpression) {
			return visitor.visitStringCallStatementExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumAsStringExpressionContext extends CoreStringExprContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	constructor(ctx: CoreStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumAsStringExpression) {
			listener.enterNumAsStringExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumAsStringExpression) {
			listener.exitNumAsStringExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumAsStringExpression) {
			return visitor.visitNumAsStringExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BoolAsStringExpressionContext extends CoreStringExprContext {
	public boolExpr(): BoolExprContext {
		return this.getRuleContext(0, BoolExprContext);
	}
	constructor(ctx: CoreStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBoolAsStringExpression) {
			listener.enterBoolAsStringExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBoolAsStringExpression) {
			listener.exitBoolAsStringExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBoolAsStringExpression) {
			return visitor.visitBoolAsStringExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringAttributeOfExpressionContext extends CoreStringExprContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	constructor(ctx: CoreStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStringAttributeOfExpression) {
			listener.enterStringAttributeOfExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStringAttributeOfExpression) {
			listener.exitStringAttributeOfExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStringAttributeOfExpression) {
			return visitor.visitStringAttributeOfExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ResourceAttributeOfExpressionContext extends CoreStringExprContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: CoreStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterResourceAttributeOfExpression) {
			listener.enterResourceAttributeOfExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitResourceAttributeOfExpression) {
			listener.exitResourceAttributeOfExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitResourceAttributeOfExpression) {
			return visitor.visitResourceAttributeOfExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class JoinStringsExpressionContext extends CoreStringExprContext {
	public stringExpr(): StringExprContext[];
	public stringExpr(i: number): StringExprContext;
	public stringExpr(i?: number): StringExprContext | StringExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StringExprContext);
		} else {
			return this.getRuleContext(i, StringExprContext);
		}
	}
	constructor(ctx: CoreStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterJoinStringsExpression) {
			listener.enterJoinStringsExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitJoinStringsExpression) {
			listener.exitJoinStringsExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitJoinStringsExpression) {
			return visitor.visitJoinStringsExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IthLetterOfStringExpressionContext extends CoreStringExprContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: CoreStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterIthLetterOfStringExpression) {
			listener.enterIthLetterOfStringExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitIthLetterOfStringExpression) {
			listener.exitIthLetterOfStringExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitIthLetterOfStringExpression) {
			return visitor.visitIthLetterOfStringExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IthStringItemOfExpressionContext extends CoreStringExprContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: CoreStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterIthStringItemOfExpression) {
			listener.enterIthStringItemOfExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitIthStringItemOfExpression) {
			listener.exitIthStringItemOfExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitIthStringItemOfExpression) {
			return visitor.visitIthStringItemOfExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DefaultStringExpressionContext extends CoreStringExprContext {
	public String(): TerminalNode { return this.getToken(ScratchParser.String, 0); }
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: CoreStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterDefaultStringExpression) {
			listener.enterDefaultStringExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitDefaultStringExpression) {
			listener.exitDefaultStringExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitDefaultStringExpression) {
			return visitor.visitDefaultStringExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnspecifiedStringExpressionContext extends CoreStringExprContext {
	constructor(ctx: CoreStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterUnspecifiedStringExpression) {
			listener.enterUnspecifiedStringExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitUnspecifiedStringExpression) {
			listener.exitUnspecifiedStringExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitUnspecifiedStringExpression) {
			return visitor.visitUnspecifiedStringExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BoolExprContext extends ParserRuleContext {
	public coreBoolExpr(): CoreBoolExprContext {
		return this.getRuleContext(0, CoreBoolExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_boolExpr; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBoolExpr) {
			listener.enterBoolExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBoolExpr) {
			listener.exitBoolExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBoolExpr) {
			return visitor.visitBoolExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CoreBoolExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_coreBoolExpr; }
	public copyFrom(ctx: CoreBoolExprContext): void {
		super.copyFrom(ctx);
	}
}
export class BoolLiteralExpressionContext extends CoreBoolExprContext {
	public Boolean(): TerminalNode { return this.getToken(ScratchParser.Boolean, 0); }
	constructor(ctx: CoreBoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBoolLiteralExpression) {
			listener.enterBoolLiteralExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBoolLiteralExpression) {
			listener.exitBoolLiteralExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBoolLiteralExpression) {
			return visitor.visitBoolLiteralExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BoolVariableExpressionContext extends CoreBoolExprContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: CoreBoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBoolVariableExpression) {
			listener.enterBoolVariableExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBoolVariableExpression) {
			listener.exitBoolVariableExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBoolVariableExpression) {
			return visitor.visitBoolVariableExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BoolParanthExpressionContext extends CoreBoolExprContext {
	public coreBoolExpr(): CoreBoolExprContext {
		return this.getRuleContext(0, CoreBoolExprContext);
	}
	constructor(ctx: CoreBoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBoolParanthExpression) {
			listener.enterBoolParanthExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBoolParanthExpression) {
			listener.exitBoolParanthExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBoolParanthExpression) {
			return visitor.visitBoolParanthExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BoolCallStatementExpressionContext extends CoreBoolExprContext {
	public callStmt(): CallStmtContext {
		return this.getRuleContext(0, CallStmtContext);
	}
	constructor(ctx: CoreBoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBoolCallStatementExpression) {
			listener.enterBoolCallStatementExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBoolCallStatementExpression) {
			listener.exitBoolCallStatementExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBoolCallStatementExpression) {
			return visitor.visitBoolCallStatementExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NegatedBoolExpressionContext extends CoreBoolExprContext {
	public coreBoolExpr(): CoreBoolExprContext {
		return this.getRuleContext(0, CoreBoolExprContext);
	}
	constructor(ctx: CoreBoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNegatedBoolExpression) {
			listener.enterNegatedBoolExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNegatedBoolExpression) {
			listener.exitNegatedBoolExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNegatedBoolExpression) {
			return visitor.visitNegatedBoolExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BoolAndExpressionContext extends CoreBoolExprContext {
	public coreBoolExpr(): CoreBoolExprContext[];
	public coreBoolExpr(i: number): CoreBoolExprContext;
	public coreBoolExpr(i?: number): CoreBoolExprContext | CoreBoolExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CoreBoolExprContext);
		} else {
			return this.getRuleContext(i, CoreBoolExprContext);
		}
	}
	constructor(ctx: CoreBoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBoolAndExpression) {
			listener.enterBoolAndExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBoolAndExpression) {
			listener.exitBoolAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBoolAndExpression) {
			return visitor.visitBoolAndExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BoolOrExpressionContext extends CoreBoolExprContext {
	public coreBoolExpr(): CoreBoolExprContext[];
	public coreBoolExpr(i: number): CoreBoolExprContext;
	public coreBoolExpr(i?: number): CoreBoolExprContext | CoreBoolExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CoreBoolExprContext);
		} else {
			return this.getRuleContext(i, CoreBoolExprContext);
		}
	}
	constructor(ctx: CoreBoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBoolOrExpression) {
			listener.enterBoolOrExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBoolOrExpression) {
			listener.exitBoolOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBoolOrExpression) {
			return visitor.visitBoolOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GreaterThanExpressionContext extends CoreBoolExprContext {
	public numOrStringExpr(): NumOrStringExprContext[];
	public numOrStringExpr(i: number): NumOrStringExprContext;
	public numOrStringExpr(i?: number): NumOrStringExprContext | NumOrStringExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumOrStringExprContext);
		} else {
			return this.getRuleContext(i, NumOrStringExprContext);
		}
	}
	constructor(ctx: CoreBoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterGreaterThanExpression) {
			listener.enterGreaterThanExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitGreaterThanExpression) {
			listener.exitGreaterThanExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitGreaterThanExpression) {
			return visitor.visitGreaterThanExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LessThanExpressionContext extends CoreBoolExprContext {
	public numOrStringExpr(): NumOrStringExprContext[];
	public numOrStringExpr(i: number): NumOrStringExprContext;
	public numOrStringExpr(i?: number): NumOrStringExprContext | NumOrStringExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumOrStringExprContext);
		} else {
			return this.getRuleContext(i, NumOrStringExprContext);
		}
	}
	constructor(ctx: CoreBoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterLessThanExpression) {
			listener.enterLessThanExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitLessThanExpression) {
			listener.exitLessThanExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitLessThanExpression) {
			return visitor.visitLessThanExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqualsExpressionContext extends CoreBoolExprContext {
	public numOrStringExpr(): NumOrStringExprContext[];
	public numOrStringExpr(i: number): NumOrStringExprContext;
	public numOrStringExpr(i?: number): NumOrStringExprContext | NumOrStringExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumOrStringExprContext);
		} else {
			return this.getRuleContext(i, NumOrStringExprContext);
		}
	}
	constructor(ctx: CoreBoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterEqualsExpression) {
			listener.enterEqualsExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitEqualsExpression) {
			listener.exitEqualsExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitEqualsExpression) {
			return visitor.visitEqualsExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StrContainsExpressionContext extends CoreBoolExprContext {
	public stringExpr(): StringExprContext[];
	public stringExpr(i: number): StringExprContext;
	public stringExpr(i?: number): StringExprContext | StringExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StringExprContext);
		} else {
			return this.getRuleContext(i, StringExprContext);
		}
	}
	constructor(ctx: CoreBoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStrContainsExpression) {
			listener.enterStrContainsExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStrContainsExpression) {
			listener.exitStrContainsExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStrContainsExpression) {
			return visitor.visitStrContainsExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DefaultBoolExpressionContext extends CoreBoolExprContext {
	public Boolean(): TerminalNode { return this.getToken(ScratchParser.Boolean, 0); }
	public coreBoolExpr(): CoreBoolExprContext {
		return this.getRuleContext(0, CoreBoolExprContext);
	}
	constructor(ctx: CoreBoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterDefaultBoolExpression) {
			listener.enterDefaultBoolExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitDefaultBoolExpression) {
			listener.exitDefaultBoolExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitDefaultBoolExpression) {
			return visitor.visitDefaultBoolExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnspecifiedBoolExpressionContext extends CoreBoolExprContext {
	constructor(ctx: CoreBoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterUnspecifiedBoolExpression) {
			listener.enterUnspecifiedBoolExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitUnspecifiedBoolExpression) {
			listener.exitUnspecifiedBoolExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitUnspecifiedBoolExpression) {
			return visitor.visitUnspecifiedBoolExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumExprContext extends ParserRuleContext {
	public coreNumExpr(): CoreNumExprContext {
		return this.getRuleContext(0, CoreNumExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_numExpr; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumExpr) {
			listener.enterNumExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumExpr) {
			listener.exitNumExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumExpr) {
			return visitor.visitNumExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumOrStringExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_numOrStringExpr; }
	public copyFrom(ctx: NumOrStringExprContext): void {
		super.copyFrom(ctx);
	}
}
export class NumberExpressionContext extends NumOrStringExprContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	constructor(ctx: NumOrStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumberExpression) {
			listener.enterNumberExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumberExpression) {
			listener.exitNumberExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumberExpression) {
			return visitor.visitNumberExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringExpressionContext extends NumOrStringExprContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: NumOrStringExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStringExpression) {
			listener.enterStringExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStringExpression) {
			listener.exitStringExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStringExpression) {
			return visitor.visitStringExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CoreNumExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_coreNumExpr; }
	public copyFrom(ctx: CoreNumExprContext): void {
		super.copyFrom(ctx);
	}
}
export class NumLiteralExpressionContext extends CoreNumExprContext {
	public number(): NumberContext {
		return this.getRuleContext(0, NumberContext);
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumLiteralExpression) {
			listener.enterNumLiteralExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumLiteralExpression) {
			listener.exitNumLiteralExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumLiteralExpression) {
			return visitor.visitNumLiteralExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumVariableExpressionContext extends CoreNumExprContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumVariableExpression) {
			listener.enterNumVariableExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumVariableExpression) {
			listener.exitNumVariableExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumVariableExpression) {
			return visitor.visitNumVariableExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumBracketsContext extends CoreNumExprContext {
	public coreNumExpr(): CoreNumExprContext {
		return this.getRuleContext(0, CoreNumExprContext);
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumBrackets) {
			listener.enterNumBrackets(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumBrackets) {
			listener.exitNumBrackets(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumBrackets) {
			return visitor.visitNumBrackets(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumCallStatementExpressionContext extends CoreNumExprContext {
	public callStmt(): CallStmtContext {
		return this.getRuleContext(0, CallStmtContext);
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumCallStatementExpression) {
			listener.enterNumCallStatementExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumCallStatementExpression) {
			listener.exitNumCallStatementExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumCallStatementExpression) {
			return visitor.visitNumCallStatementExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringAsNumExpressionContext extends CoreNumExprContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStringAsNumExpression) {
			listener.enterStringAsNumExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStringAsNumExpression) {
			listener.exitStringAsNumExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStringAsNumExpression) {
			return visitor.visitStringAsNumExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BoolAsNumExpressionContext extends CoreNumExprContext {
	public boolExpr(): BoolExprContext {
		return this.getRuleContext(0, BoolExprContext);
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBoolAsNumExpression) {
			listener.enterBoolAsNumExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBoolAsNumExpression) {
			listener.exitBoolAsNumExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBoolAsNumExpression) {
			return visitor.visitBoolAsNumExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TimerExpressionContext extends CoreNumExprContext {
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterTimerExpression) {
			listener.enterTimerExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitTimerExpression) {
			listener.exitTimerExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitTimerExpression) {
			return visitor.visitTimerExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LengthOfStringExpressionContext extends CoreNumExprContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterLengthOfStringExpression) {
			listener.enterLengthOfStringExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitLengthOfStringExpression) {
			listener.exitLengthOfStringExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitLengthOfStringExpression) {
			return visitor.visitLengthOfStringExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LengthOfListExpressionContext extends CoreNumExprContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterLengthOfListExpression) {
			listener.enterLengthOfListExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitLengthOfListExpression) {
			listener.exitLengthOfListExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitLengthOfListExpression) {
			return visitor.visitLengthOfListExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexOfExpressionContext extends CoreNumExprContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterIndexOfExpression) {
			listener.enterIndexOfExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitIndexOfExpression) {
			listener.exitIndexOfExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitIndexOfExpression) {
			return visitor.visitIndexOfExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumMulExpressionContext extends CoreNumExprContext {
	public coreNumExpr(): CoreNumExprContext[];
	public coreNumExpr(i: number): CoreNumExprContext;
	public coreNumExpr(i?: number): CoreNumExprContext | CoreNumExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CoreNumExprContext);
		} else {
			return this.getRuleContext(i, CoreNumExprContext);
		}
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumMulExpression) {
			listener.enterNumMulExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumMulExpression) {
			listener.exitNumMulExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumMulExpression) {
			return visitor.visitNumMulExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumDivExpressionContext extends CoreNumExprContext {
	public coreNumExpr(): CoreNumExprContext[];
	public coreNumExpr(i: number): CoreNumExprContext;
	public coreNumExpr(i?: number): CoreNumExprContext | CoreNumExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CoreNumExprContext);
		} else {
			return this.getRuleContext(i, CoreNumExprContext);
		}
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumDivExpression) {
			listener.enterNumDivExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumDivExpression) {
			listener.exitNumDivExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumDivExpression) {
			return visitor.visitNumDivExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumModExpressionContext extends CoreNumExprContext {
	public coreNumExpr(): CoreNumExprContext[];
	public coreNumExpr(i: number): CoreNumExprContext;
	public coreNumExpr(i?: number): CoreNumExprContext | CoreNumExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CoreNumExprContext);
		} else {
			return this.getRuleContext(i, CoreNumExprContext);
		}
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumModExpression) {
			listener.enterNumModExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumModExpression) {
			listener.exitNumModExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumModExpression) {
			return visitor.visitNumModExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumPlusExpressionContext extends CoreNumExprContext {
	public coreNumExpr(): CoreNumExprContext[];
	public coreNumExpr(i: number): CoreNumExprContext;
	public coreNumExpr(i?: number): CoreNumExprContext | CoreNumExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CoreNumExprContext);
		} else {
			return this.getRuleContext(i, CoreNumExprContext);
		}
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumPlusExpression) {
			listener.enterNumPlusExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumPlusExpression) {
			listener.exitNumPlusExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumPlusExpression) {
			return visitor.visitNumPlusExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumMinusExpressionContext extends CoreNumExprContext {
	public coreNumExpr(): CoreNumExprContext[];
	public coreNumExpr(i: number): CoreNumExprContext;
	public coreNumExpr(i?: number): CoreNumExprContext | CoreNumExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CoreNumExprContext);
		} else {
			return this.getRuleContext(i, CoreNumExprContext);
		}
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumMinusExpression) {
			listener.enterNumMinusExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumMinusExpression) {
			listener.exitNumMinusExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumMinusExpression) {
			return visitor.visitNumMinusExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DefaultNumExprContext extends CoreNumExprContext {
	public number(): NumberContext {
		return this.getRuleContext(0, NumberContext);
	}
	public coreNumExpr(): CoreNumExprContext {
		return this.getRuleContext(0, CoreNumExprContext);
	}
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterDefaultNumExpr) {
			listener.enterDefaultNumExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitDefaultNumExpr) {
			listener.exitDefaultNumExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitDefaultNumExpr) {
			return visitor.visitDefaultNumExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnspecifiedNumExprContext extends CoreNumExprContext {
	constructor(ctx: CoreNumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterUnspecifiedNumExpr) {
			listener.enterUnspecifiedNumExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitUnspecifiedNumExpr) {
			listener.exitUnspecifiedNumExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitUnspecifiedNumExpr) {
			return visitor.visitUnspecifiedNumExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ListExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_listExpr; }
	public copyFrom(ctx: ListExprContext): void {
		super.copyFrom(ctx);
	}
}
export class ListVariableExpressionContext extends ListExprContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: ListExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterListVariableExpression) {
			listener.enterListVariableExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitListVariableExpression) {
			listener.exitListVariableExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitListVariableExpression) {
			return visitor.visitListVariableExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ListWithElementsExpressionContext extends ListExprContext {
	public expressionListPlain(): ExpressionListPlainContext {
		return this.getRuleContext(0, ExpressionListPlainContext);
	}
	constructor(ctx: ListExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterListWithElementsExpression) {
			listener.enterListWithElementsExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitListWithElementsExpression) {
			listener.exitListWithElementsExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitListWithElementsExpression) {
			return visitor.visitListWithElementsExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public coreExpression(): CoreExpressionContext {
		return this.getRuleContext(0, CoreExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_expression; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CoreExpressionContext extends ParserRuleContext {
	public stringExpr(): StringExprContext | undefined {
		return this.tryGetRuleContext(0, StringExprContext);
	}
	public numExpr(): NumExprContext | undefined {
		return this.tryGetRuleContext(0, NumExprContext);
	}
	public boolExpr(): BoolExprContext | undefined {
		return this.tryGetRuleContext(0, BoolExprContext);
	}
	public listExpr(): ListExprContext | undefined {
		return this.tryGetRuleContext(0, ListExprContext);
	}
	public unspecifiedExpr(): UnspecifiedExprContext | undefined {
		return this.tryGetRuleContext(0, UnspecifiedExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_coreExpression; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterCoreExpression) {
			listener.enterCoreExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitCoreExpression) {
			listener.exitCoreExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitCoreExpression) {
			return visitor.visitCoreExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnspecifiedExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_unspecifiedExpr; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterUnspecifiedExpr) {
			listener.enterUnspecifiedExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitUnspecifiedExpr) {
			listener.exitUnspecifiedExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitUnspecifiedExpr) {
			return visitor.visitUnspecifiedExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_variable; }
	public copyFrom(ctx: VariableContext): void {
		super.copyFrom(ctx);
	}
}
export class FlatVariableContext extends VariableContext {
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	constructor(ctx: VariableContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterFlatVariable) {
			listener.enterFlatVariable(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitFlatVariable) {
			listener.exitFlatVariable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitFlatVariable) {
			return visitor.visitFlatVariable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class QualifiedVariableContext extends VariableContext {
	public ident(): IdentContext[];
	public ident(i: number): IdentContext;
	public ident(i?: number): IdentContext | IdentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentContext);
		} else {
			return this.getRuleContext(i, IdentContext);
		}
	}
	constructor(ctx: VariableContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterQualifiedVariable) {
			listener.enterQualifiedVariable(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitQualifiedVariable) {
			listener.exitQualifiedVariable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitQualifiedVariable) {
			return visitor.visitQualifiedVariable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColorContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_color; }
	public copyFrom(ctx: ColorContext): void {
		super.copyFrom(ctx);
	}
}
export class RGBAColorExpressionContext extends ColorContext {
	public numExpr(): NumExprContext[];
	public numExpr(i: number): NumExprContext;
	public numExpr(i?: number): NumExprContext | NumExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumExprContext);
		} else {
			return this.getRuleContext(i, NumExprContext);
		}
	}
	constructor(ctx: ColorContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterRGBAColorExpression) {
			listener.enterRGBAColorExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitRGBAColorExpression) {
			listener.exitRGBAColorExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitRGBAColorExpression) {
			return visitor.visitRGBAColorExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColorFromNumExpressionContext extends ColorContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	constructor(ctx: ColorContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterColorFromNumExpression) {
			listener.enterColorFromNumExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitColorFromNumExpression) {
			listener.exitColorFromNumExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitColorFromNumExpression) {
			return visitor.visitColorFromNumExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_ident; }
	public copyFrom(ctx: IdentContext): void {
		super.copyFrom(ctx);
	}
}
export class IdentExpressionContext extends IdentContext {
	public Identifier(): TerminalNode { return this.getToken(ScratchParser.Identifier, 0); }
	constructor(ctx: IdentContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterIdentExpression) {
			listener.enterIdentExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitIdentExpression) {
			listener.exitIdentExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitIdentExpression) {
			return visitor.visitIdentExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StrIdentExpressionContext extends IdentContext {
	public String(): TerminalNode { return this.getToken(ScratchParser.String, 0); }
	constructor(ctx: IdentContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStrIdentExpression) {
			listener.enterStrIdentExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStrIdentExpression) {
			listener.exitStrIdentExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStrIdentExpression) {
			return visitor.visitStrIdentExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumberContext extends ParserRuleContext {
	public DecimalLiteral(): TerminalNode { return this.getToken(ScratchParser.DecimalLiteral, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_number; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumber) {
			listener.enterNumber(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumber) {
			listener.exitNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumber) {
			return visitor.visitNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KeyContext extends ParserRuleContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_key; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterKey) {
			listener.enterKey(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitKey) {
			listener.exitKey(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitKey) {
			return visitor.visitKey(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResourceLocatorContext extends ParserRuleContext {
	public String(): TerminalNode { return this.getToken(ScratchParser.String, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_resourceLocator; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterResourceLocator) {
			listener.enterResourceLocator(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitResourceLocator) {
			listener.exitResourceLocator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitResourceLocator) {
			return visitor.visitResourceLocator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MessageContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_message; }
	public copyFrom(ctx: MessageContext): void {
		super.copyFrom(ctx);
	}
}
export class AppMessageContext extends MessageContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: MessageContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterAppMessage) {
			listener.enterAppMessage(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitAppMessage) {
			listener.exitAppMessage(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitAppMessage) {
			return visitor.visitAppMessage(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SystemMessageContext extends MessageContext {
	public String(): TerminalNode { return this.getToken(ScratchParser.String, 0); }
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: MessageContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterSystemMessage) {
			listener.enterSystemMessage(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitSystemMessage) {
			listener.exitSystemMessage(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitSystemMessage) {
			return visitor.visitSystemMessage(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


