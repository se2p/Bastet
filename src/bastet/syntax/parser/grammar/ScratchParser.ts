// Generated from src/bastet/syntax/parser/grammar/Scratch.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ScratchListener } from "./ScratchListener";
import { ScratchVisitor } from "./ScratchVisitor";


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
	public static readonly T__103 = 104;
	public static readonly T__104 = 105;
	public static readonly Boolean = 106;
	public static readonly Bool = 107;
	public static readonly String = 108;
	public static readonly Identifier = 109;
	public static readonly IntegerLiteral = 110;
	public static readonly DecimalLiteral = 111;
	public static readonly Whitespace = 112;
	public static readonly Newline = 113;
	public static readonly BlockComment = 114;
	public static readonly LineComment = 115;
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
	public static readonly RULE_script = 17;
	public static readonly RULE_scriptList = 18;
	public static readonly RULE_scriptAttributeList = 19;
	public static readonly RULE_scriptAttribute = 20;
	public static readonly RULE_event = 21;
	public static readonly RULE_messageNamespace = 22;
	public static readonly RULE_methodDefinitionList = 23;
	public static readonly RULE_methodDefinition = 24;
	public static readonly RULE_methodResultDeclaration = 25;
	public static readonly RULE_externMethodResultDeclaration = 26;
	public static readonly RULE_methodAttributeList = 27;
	public static readonly RULE_methodAttribute = 28;
	public static readonly RULE_parameter = 29;
	public static readonly RULE_parameterList = 30;
	public static readonly RULE_parameterListPlain = 31;
	public static readonly RULE_stmtList = 32;
	public static readonly RULE_atomicBlock = 33;
	public static readonly RULE_stmtListPlain = 34;
	public static readonly RULE_controlStmt = 35;
	public static readonly RULE_ifStmt = 36;
	public static readonly RULE_elseCase = 37;
	public static readonly RULE_untilStmt = 38;
	public static readonly RULE_repeatTimesStmt = 39;
	public static readonly RULE_repeatForeverStmt = 40;
	public static readonly RULE_callStmt = 41;
	public static readonly RULE_expressionList = 42;
	public static readonly RULE_expressionListPlain = 43;
	public static readonly RULE_expressionStmt = 44;
	public static readonly RULE_stmt = 45;
	public static readonly RULE_nonCtrlStmt = 46;
	public static readonly RULE_commonStmt = 47;
	public static readonly RULE_listStmt = 48;
	public static readonly RULE_setStmt = 49;
	public static readonly RULE_setStmtList = 50;
	public static readonly RULE_terminationStmt = 51;
	public static readonly RULE_stringExpr = 52;
	public static readonly RULE_boolExpr = 53;
	public static readonly RULE_numOrStringExpr = 54;
	public static readonly RULE_numExpr = 55;
	public static readonly RULE_listExpr = 56;
	public static readonly RULE_actorExpr = 57;
	public static readonly RULE_expression = 58;
	public static readonly RULE_unspecifiedExpr = 59;
	public static readonly RULE_variable = 60;
	public static readonly RULE_ident = 61;
	public static readonly RULE_number = 62;
	public static readonly RULE_resourceLocator = 63;
	public static readonly RULE_message = 64;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
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
		"numExpr", "listExpr", "actorExpr", "expression", "unspecifiedExpr", "variable", 
		"ident", "number", "resourceLocator", "message",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'program'", "'module'", "'import'", "'from'", "'*'", "'begin'", 
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
		"'cast'", "'attribute'", "'join'", "'letter'", "'default'", "'for'", "'?string'", 
		"'not'", "'or'", "'>='", "'>'", "'<'", "'<='", "'='", "'contains'", "'?bool'", 
		"'length'", "'index'", "'/'", "'mod'", "'+'", "'-'", "'?number'", "'locate'", 
		"'start'", "'?expr'", "'.'", "'strid'",
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
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "Boolean", "Bool", "String", "Identifier", "IntegerLiteral", 
		"DecimalLiteral", "Whitespace", "Newline", "BlockComment", "LineComment",
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
			this.state = 130;
			this.fileType();
			this.state = 131;
			this.ident();
			this.state = 132;
			this.importDefinitionList();
			this.state = 133;
			this.actorDefinitionList();
			this.state = 134;
			this.match(ScratchParser.EOF);
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
			this.state = 136;
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
			this.state = 141;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__2) {
				{
				{
				this.state = 138;
				this.importDefinition();
				}
				}
				this.state = 143;
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
			this.state = 144;
			this.match(ScratchParser.T__2);
			this.state = 145;
			this.importSelector();
			this.state = 146;
			this.match(ScratchParser.T__3);
			this.state = 147;
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
			this.state = 151;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__104:
			case ScratchParser.Identifier:
				_localctx = new ImportSelectedActorContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 149;
				this.ident();
				}
				break;
			case ScratchParser.T__4:
				_localctx = new ImportAllActorsContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 150;
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
			this.state = 156;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__9 || _la === ScratchParser.T__10) {
				{
				{
				this.state = 153;
				this.actorDefinition();
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
	public actorDefinition(): ActorDefinitionContext {
		let _localctx: ActorDefinitionContext = new ActorDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ScratchParser.RULE_actorDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 159;
			this.actorMode();
			this.state = 160;
			this.ident();
			this.state = 161;
			this.inheritsFrom();
			this.state = 162;
			this.match(ScratchParser.T__5);
			this.state = 163;
			this.actorComponentsDefinition();
			this.state = 164;
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
			this.state = 176;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__7:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 166;
				this.match(ScratchParser.T__7);
				this.state = 167;
				this.ident();
				this.state = 172;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ScratchParser.T__8) {
					{
					{
					this.state = 168;
					this.match(ScratchParser.T__8);
					this.state = 169;
					this.ident();
					}
					}
					this.state = 174;
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
			this.state = 180;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__9:
				_localctx = new ConcreteActorModeContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 178;
				this.match(ScratchParser.T__9);
				}
				break;
			case ScratchParser.T__10:
				_localctx = new ActorRoleModeContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 179;
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
			this.state = 182;
			this.resourceList();
			this.state = 183;
			this.declarationStmtList();
			this.state = 184;
			this.setStmtList();
			this.state = 185;
			this.methodDefinitionList();
			this.state = 186;
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
			this.state = 188;
			this.resourceType();
			this.state = 189;
			this.ident();
			this.state = 190;
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
			this.state = 194;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__11:
				_localctx = new ImageResourceContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 192;
				this.match(ScratchParser.T__11);
				}
				break;
			case ScratchParser.T__12:
				_localctx = new SoundResourceContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 193;
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
			this.state = 199;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__11 || _la === ScratchParser.T__12) {
				{
				{
				this.state = 196;
				this.resource();
				}
				}
				this.state = 201;
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
			this.state = 202;
			this.match(ScratchParser.T__13);
			this.state = 203;
			this.ident();
			this.state = 204;
			this.match(ScratchParser.T__14);
			this.state = 205;
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
			this.state = 210;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__13) {
				{
				{
				this.state = 207;
				this.declarationStmt();
				}
				}
				this.state = 212;
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
			this.state = 218;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__15:
				_localctx = new ListTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 213;
				this.match(ScratchParser.T__15);
				this.state = 214;
				this.match(ScratchParser.T__16);
				this.state = 215;
				this.type();
				}
				break;
			case ScratchParser.T__9:
				_localctx = new ActorTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 216;
				this.match(ScratchParser.T__9);
				}
				break;
			case ScratchParser.T__17:
			case ScratchParser.T__18:
			case ScratchParser.T__19:
			case ScratchParser.T__20:
			case ScratchParser.T__21:
				_localctx = new PrimitiveContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 217;
				this.primitiveType();
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
			this.state = 229;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__17:
				_localctx = new IntegerTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 220;
				this.match(ScratchParser.T__17);
				}
				break;
			case ScratchParser.T__18:
				_localctx = new FloatingPointTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 221;
				this.match(ScratchParser.T__18);
				}
				break;
			case ScratchParser.T__19:
				_localctx = new BooleanTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 222;
				this.match(ScratchParser.T__19);
				}
				break;
			case ScratchParser.T__20:
				_localctx = new StringTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 223;
				this.match(ScratchParser.T__20);
				}
				break;
			case ScratchParser.T__21:
				_localctx = new EnumTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 224;
				this.match(ScratchParser.T__21);
				this.state = 225;
				this.match(ScratchParser.T__22);
				this.state = 226;
				this.expressionListPlain();
				this.state = 227;
				this.match(ScratchParser.T__23);
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
		this.enterRule(_localctx, 34, ScratchParser.RULE_script);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 231;
			this.match(ScratchParser.T__24);
			this.state = 232;
			this.match(ScratchParser.T__25);
			this.state = 233;
			this.event();
			this.state = 234;
			this.match(ScratchParser.T__26);
			this.state = 235;
			this.scriptAttributeList();
			this.state = 236;
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
		this.enterRule(_localctx, 36, ScratchParser.RULE_scriptList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 241;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__24) {
				{
				{
				this.state = 238;
				this.script();
				}
				}
				this.state = 243;
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
	public scriptAttributeList(): ScriptAttributeListContext {
		let _localctx: ScriptAttributeListContext = new ScriptAttributeListContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, ScratchParser.RULE_scriptAttributeList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 247;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__27) {
				{
				{
				this.state = 244;
				this.scriptAttribute();
				}
				}
				this.state = 249;
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
	public scriptAttribute(): ScriptAttributeContext {
		let _localctx: ScriptAttributeContext = new ScriptAttributeContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, ScratchParser.RULE_scriptAttribute);
		try {
			_localctx = new RestartScriptContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 250;
			this.match(ScratchParser.T__27);
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
		this.enterRule(_localctx, 42, ScratchParser.RULE_event);
		try {
			this.state = 270;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				_localctx = new NeverEventContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 252;
				this.match(ScratchParser.T__28);
				}
				break;

			case 2:
				_localctx = new BootstapEventContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 253;
				this.match(ScratchParser.T__29);
				}
				break;

			case 3:
				_localctx = new AfterBootstrapMonitoringEventContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 254;
				this.match(ScratchParser.T__29);
				this.state = 255;
				this.match(ScratchParser.T__30);
				}
				break;

			case 4:
				_localctx = new StartupEventContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 256;
				this.match(ScratchParser.T__31);
				}
				break;

			case 5:
				_localctx = new CloneStartEventContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 257;
				this.match(ScratchParser.T__32);
				this.state = 258;
				this.match(ScratchParser.T__14);
				this.state = 259;
				this.match(ScratchParser.T__33);
				}
				break;

			case 6:
				_localctx = new MessageReceivedEventContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 260;
				this.match(ScratchParser.T__34);
				this.state = 261;
				this.stringExpr();
				this.state = 262;
				this.parameterList();
				this.state = 263;
				this.messageNamespace();
				}
				break;

			case 7:
				_localctx = new ConditionReachedEventContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 265;
				this.match(ScratchParser.T__35);
				this.state = 266;
				this.boolExpr(0);
				}
				break;

			case 8:
				_localctx = new RenderedMonitoringEventContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 267;
				this.match(ScratchParser.T__36);
				}
				break;

			case 9:
				_localctx = new AfterStatementMonitoringEventContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 268;
				this.match(ScratchParser.T__37);
				this.state = 269;
				this.match(ScratchParser.T__30);
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
	public messageNamespace(): MessageNamespaceContext {
		let _localctx: MessageNamespaceContext = new MessageNamespaceContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, ScratchParser.RULE_messageNamespace);
		try {
			this.state = 275;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__38:
				_localctx = new MessageNameSpaceContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 272;
				this.match(ScratchParser.T__38);
				this.state = 273;
				this.match(ScratchParser.String);
				}
				break;
			case ScratchParser.T__26:
				_localctx = new GlobalNameSpaceContext(_localctx);
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
		this.enterRule(_localctx, 46, ScratchParser.RULE_methodDefinitionList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 280;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__39 || _la === ScratchParser.T__40) {
				{
				{
				this.state = 277;
				this.methodDefinition();
				}
				}
				this.state = 282;
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
		this.enterRule(_localctx, 48, ScratchParser.RULE_methodDefinition);
		try {
			this.state = 295;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__39:
				_localctx = new FullMethodDefinitionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 283;
				this.match(ScratchParser.T__39);
				this.state = 284;
				this.methodAttributeList();
				this.state = 285;
				this.ident();
				this.state = 286;
				this.parameterList();
				this.state = 287;
				this.stmtList();
				this.state = 288;
				this.methodResultDeclaration();
				}
				break;
			case ScratchParser.T__40:
				_localctx = new ExternMethodDefinitionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 290;
				this.match(ScratchParser.T__40);
				this.state = 291;
				this.ident();
				this.state = 292;
				this.parameterList();
				this.state = 293;
				this.externMethodResultDeclaration();
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
	public methodResultDeclaration(): MethodResultDeclarationContext {
		let _localctx: MethodResultDeclarationContext = new MethodResultDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, ScratchParser.RULE_methodResultDeclaration);
		try {
			this.state = 303;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__41:
				_localctx = new FunctionReturnDefinitionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 297;
				this.match(ScratchParser.T__41);
				this.state = 298;
				this.ident();
				this.state = 299;
				this.match(ScratchParser.T__42);
				this.state = 300;
				this.type();
				}
				break;
			case ScratchParser.T__6:
			case ScratchParser.T__24:
			case ScratchParser.T__39:
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
	public externMethodResultDeclaration(): ExternMethodResultDeclarationContext {
		let _localctx: ExternMethodResultDeclarationContext = new ExternMethodResultDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, ScratchParser.RULE_externMethodResultDeclaration);
		try {
			this.state = 308;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__41:
				_localctx = new ExternFunctionReturnDefinitionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 305;
				this.match(ScratchParser.T__41);
				this.state = 306;
				this.type();
				}
				break;
			case ScratchParser.T__6:
			case ScratchParser.T__24:
			case ScratchParser.T__39:
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
	public methodAttributeList(): MethodAttributeListContext {
		let _localctx: MethodAttributeListContext = new MethodAttributeListContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, ScratchParser.RULE_methodAttributeList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 313;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ScratchParser.T__43) {
				{
				{
				this.state = 310;
				this.methodAttribute();
				}
				}
				this.state = 315;
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
		this.enterRule(_localctx, 56, ScratchParser.RULE_methodAttribute);
		try {
			_localctx = new AtomicMethodContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 316;
			this.match(ScratchParser.T__43);
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
		this.enterRule(_localctx, 58, ScratchParser.RULE_parameter);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 318;
			this.ident();
			this.state = 319;
			this.match(ScratchParser.T__42);
			this.state = 320;
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
		this.enterRule(_localctx, 60, ScratchParser.RULE_parameterList);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 322;
			this.match(ScratchParser.T__44);
			this.state = 323;
			this.parameterListPlain();
			this.state = 324;
			this.match(ScratchParser.T__45);
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
		this.enterRule(_localctx, 62, ScratchParser.RULE_parameterListPlain);
		let _la: number;
		try {
			this.state = 335;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__104:
			case ScratchParser.Identifier:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 326;
				this.parameter();
				this.state = 331;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ScratchParser.T__8) {
					{
					{
					this.state = 327;
					this.match(ScratchParser.T__8);
					this.state = 328;
					this.parameter();
					}
					}
					this.state = 333;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case ScratchParser.T__45:
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
		this.enterRule(_localctx, 64, ScratchParser.RULE_stmtList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 337;
			this.match(ScratchParser.T__5);
			this.state = 338;
			this.stmtListPlain();
			this.state = 340;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ScratchParser.T__57 || _la === ScratchParser.T__67) {
				{
				this.state = 339;
				this.terminationStmt();
				}
			}

			this.state = 342;
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
		this.enterRule(_localctx, 66, ScratchParser.RULE_atomicBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 344;
			this.match(ScratchParser.T__43);
			this.state = 345;
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
		this.enterRule(_localctx, 68, ScratchParser.RULE_stmtListPlain);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 350;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 23, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 347;
					this.stmt();
					}
					}
				}
				this.state = 352;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 23, this._ctx);
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
		this.enterRule(_localctx, 70, ScratchParser.RULE_controlStmt);
		try {
			this.state = 358;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 353;
				this.ifStmt();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 354;
				this.untilStmt();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 355;
				this.repeatTimesStmt();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 356;
				this.repeatForeverStmt();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 357;
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
		this.enterRule(_localctx, 72, ScratchParser.RULE_ifStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 360;
			this.match(ScratchParser.T__46);
			this.state = 361;
			this.boolExpr(0);
			this.state = 362;
			this.match(ScratchParser.T__47);
			this.state = 363;
			this.stmtList();
			this.state = 364;
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
		this.enterRule(_localctx, 74, ScratchParser.RULE_elseCase);
		try {
			this.state = 371;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				_localctx = new PureElseContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 366;
				this.match(ScratchParser.T__48);
				this.state = 367;
				this.stmtList();
				}
				break;

			case 2:
				_localctx = new ElseIfCaseContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 368;
				this.match(ScratchParser.T__48);
				this.state = 369;
				this.ifStmt();
				}
				break;

			case 3:
				_localctx = new EmptyElseCaseContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				// tslint:disable-next-line:no-empty
				{
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
	public untilStmt(): UntilStmtContext {
		let _localctx: UntilStmtContext = new UntilStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, ScratchParser.RULE_untilStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 373;
			this.match(ScratchParser.T__49);
			this.state = 374;
			this.boolExpr(0);
			this.state = 375;
			this.match(ScratchParser.T__50);
			this.state = 376;
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
		this.enterRule(_localctx, 78, ScratchParser.RULE_repeatTimesStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 378;
			this.match(ScratchParser.T__50);
			this.state = 379;
			this.numExpr(0);
			this.state = 380;
			this.match(ScratchParser.T__51);
			this.state = 381;
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
		this.enterRule(_localctx, 80, ScratchParser.RULE_repeatForeverStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 383;
			this.match(ScratchParser.T__50);
			this.state = 384;
			this.match(ScratchParser.T__52);
			this.state = 385;
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
		this.enterRule(_localctx, 82, ScratchParser.RULE_callStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 387;
			this.ident();
			this.state = 388;
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
		this.enterRule(_localctx, 84, ScratchParser.RULE_expressionList);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 390;
			this.match(ScratchParser.T__44);
			this.state = 391;
			this.expressionListPlain();
			this.state = 392;
			this.match(ScratchParser.T__45);
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
		this.enterRule(_localctx, 86, ScratchParser.RULE_expressionListPlain);
		let _la: number;
		try {
			this.state = 403;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__22:
			case ScratchParser.T__44:
			case ScratchParser.T__64:
			case ScratchParser.T__74:
			case ScratchParser.T__77:
			case ScratchParser.T__78:
			case ScratchParser.T__79:
			case ScratchParser.T__80:
			case ScratchParser.T__81:
			case ScratchParser.T__83:
			case ScratchParser.T__84:
			case ScratchParser.T__92:
			case ScratchParser.T__93:
			case ScratchParser.T__94:
			case ScratchParser.T__99:
			case ScratchParser.T__100:
			case ScratchParser.T__101:
			case ScratchParser.T__102:
			case ScratchParser.T__104:
			case ScratchParser.Boolean:
			case ScratchParser.String:
			case ScratchParser.Identifier:
			case ScratchParser.IntegerLiteral:
			case ScratchParser.DecimalLiteral:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 394;
				this.expression();
				this.state = 399;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ScratchParser.T__8) {
					{
					{
					this.state = 395;
					this.match(ScratchParser.T__8);
					this.state = 396;
					this.expression();
					}
					}
					this.state = 401;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case ScratchParser.T__23:
			case ScratchParser.T__45:
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
		this.enterRule(_localctx, 88, ScratchParser.RULE_expressionStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 405;
			this.match(ScratchParser.T__53);
			this.state = 406;
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
		this.enterRule(_localctx, 90, ScratchParser.RULE_stmt);
		try {
			this.state = 416;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__46:
			case ScratchParser.T__49:
			case ScratchParser.T__50:
			case ScratchParser.T__104:
			case ScratchParser.Identifier:
				_localctx = new ControlStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 408;
				this.controlStmt();
				}
				break;
			case ScratchParser.T__13:
			case ScratchParser.T__39:
			case ScratchParser.T__53:
			case ScratchParser.T__55:
			case ScratchParser.T__57:
			case ScratchParser.T__60:
			case ScratchParser.T__61:
			case ScratchParser.T__63:
			case ScratchParser.T__65:
			case ScratchParser.T__66:
			case ScratchParser.T__67:
			case ScratchParser.T__69:
			case ScratchParser.T__71:
			case ScratchParser.T__73:
				_localctx = new NonControlStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 409;
				this.nonCtrlStmt();
				}
				break;
			case ScratchParser.T__43:
				_localctx = new AtomicBlockStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 410;
				this.atomicBlock();
				}
				break;
			case ScratchParser.T__54:
				_localctx = new AttributedStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 411;
				this.match(ScratchParser.T__54);
				this.state = 412;
				this.match(ScratchParser.Identifier);
				this.state = 413;
				this.expressionList();
				this.state = 414;
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
		this.enterRule(_localctx, 92, ScratchParser.RULE_nonCtrlStmt);
		try {
			this.state = 422;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__53:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 418;
				this.expressionStmt();
				}
				break;
			case ScratchParser.T__39:
			case ScratchParser.T__55:
			case ScratchParser.T__57:
			case ScratchParser.T__60:
			case ScratchParser.T__61:
			case ScratchParser.T__63:
			case ScratchParser.T__65:
			case ScratchParser.T__66:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 419;
				this.commonStmt();
				}
				break;
			case ScratchParser.T__67:
			case ScratchParser.T__69:
			case ScratchParser.T__71:
			case ScratchParser.T__73:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 420;
				this.listStmt();
				}
				break;
			case ScratchParser.T__13:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 421;
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
		this.enterRule(_localctx, 94, ScratchParser.RULE_commonStmt);
		try {
			this.state = 453;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				_localctx = new WaitSecsStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 424;
				this.match(ScratchParser.T__55);
				this.state = 425;
				this.numExpr(0);
				this.state = 426;
				this.match(ScratchParser.T__56);
				}
				break;

			case 2:
				_localctx = new WaitUntilStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 428;
				this.match(ScratchParser.T__55);
				this.state = 429;
				this.match(ScratchParser.T__49);
				this.state = 430;
				this.boolExpr(0);
				}
				break;

			case 3:
				_localctx = new StopOthersInActorStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 431;
				this.match(ScratchParser.T__57);
				this.state = 432;
				this.match(ScratchParser.T__58);
				this.state = 433;
				this.match(ScratchParser.T__59);
				this.state = 434;
				this.match(ScratchParser.T__38);
				this.state = 435;
				this.match(ScratchParser.T__9);
				}
				break;

			case 4:
				_localctx = new CreateCloneOfStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 436;
				this.match(ScratchParser.T__60);
				this.state = 437;
				this.match(ScratchParser.T__33);
				this.state = 438;
				this.match(ScratchParser.T__16);
				this.state = 439;
				this.stringExpr();
				}
				break;

			case 5:
				_localctx = new BroadcastMessageStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 440;
				this.match(ScratchParser.T__61);
				this.state = 441;
				this.message();
				}
				break;

			case 6:
				_localctx = new BroadcastAndWaitStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 442;
				this.match(ScratchParser.T__61);
				this.state = 443;
				this.message();
				this.state = 444;
				this.match(ScratchParser.T__62);
				this.state = 445;
				this.match(ScratchParser.T__55);
				}
				break;

			case 7:
				_localctx = new ResetTimerStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 447;
				this.match(ScratchParser.T__63);
				this.state = 448;
				this.match(ScratchParser.T__64);
				}
				break;

			case 8:
				_localctx = new EpsilonStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 449;
				this.match(ScratchParser.T__65);
				}
				break;

			case 9:
				_localctx = new AssumeStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 450;
				this.match(ScratchParser.T__66);
				this.state = 451;
				this.boolExpr(0);
				}
				break;

			case 10:
				_localctx = new SetStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 452;
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
		this.enterRule(_localctx, 96, ScratchParser.RULE_listStmt);
		try {
			this.state = 484;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 31, this._ctx) ) {
			case 1:
				_localctx = new DeleteAllFromStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 455;
				this.match(ScratchParser.T__67);
				this.state = 456;
				this.match(ScratchParser.T__68);
				this.state = 457;
				this.match(ScratchParser.T__3);
				this.state = 458;
				this.variable();
				}
				break;

			case 2:
				_localctx = new DeleteIthFromStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 459;
				this.match(ScratchParser.T__67);
				this.state = 460;
				this.numExpr(0);
				this.state = 461;
				this.match(ScratchParser.T__16);
				this.state = 462;
				this.variable();
				}
				break;

			case 3:
				_localctx = new AddElementToStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 464;
				this.match(ScratchParser.T__69);
				this.state = 465;
				this.stringExpr();
				this.state = 466;
				this.match(ScratchParser.T__70);
				this.state = 467;
				this.variable();
				}
				break;

			case 4:
				_localctx = new InsertAtStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 469;
				this.match(ScratchParser.T__71);
				this.state = 470;
				this.stringExpr();
				this.state = 471;
				this.match(ScratchParser.T__72);
				this.state = 472;
				this.numExpr(0);
				this.state = 473;
				this.match(ScratchParser.T__16);
				this.state = 474;
				this.variable();
				}
				break;

			case 5:
				_localctx = new ReplaceElementAtStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 476;
				this.match(ScratchParser.T__73);
				this.state = 477;
				this.match(ScratchParser.T__74);
				this.state = 478;
				this.numExpr(0);
				this.state = 479;
				this.match(ScratchParser.T__16);
				this.state = 480;
				this.variable();
				this.state = 481;
				this.match(ScratchParser.T__75);
				this.state = 482;
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
		this.enterRule(_localctx, 98, ScratchParser.RULE_setStmt);
		try {
			this.state = 496;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				_localctx = new StoreEvalResultStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 486;
				this.match(ScratchParser.T__39);
				this.state = 487;
				this.variable();
				this.state = 488;
				this.match(ScratchParser.T__14);
				this.state = 489;
				this.expression();
				}
				break;

			case 2:
				_localctx = new StoreCallResultStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 491;
				this.match(ScratchParser.T__39);
				this.state = 492;
				this.variable();
				this.state = 493;
				this.match(ScratchParser.T__14);
				this.state = 494;
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
		this.enterRule(_localctx, 100, ScratchParser.RULE_setStmtList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 501;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 33, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 498;
					this.setStmt();
					}
					}
				}
				this.state = 503;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 33, this._ctx);
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
		this.enterRule(_localctx, 102, ScratchParser.RULE_terminationStmt);
		try {
			this.state = 512;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				_localctx = new StopAllContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 504;
				this.match(ScratchParser.T__57);
				this.state = 505;
				this.match(ScratchParser.T__68);
				}
				break;

			case 2:
				_localctx = new StopThisContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 506;
				this.match(ScratchParser.T__57);
				this.state = 507;
				this.match(ScratchParser.T__76);
				this.state = 508;
				this.match(ScratchParser.T__24);
				}
				break;

			case 3:
				_localctx = new DeleteThisCloneContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 509;
				this.match(ScratchParser.T__67);
				this.state = 510;
				this.match(ScratchParser.T__76);
				this.state = 511;
				this.match(ScratchParser.T__33);
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
		this.enterRule(_localctx, 104, ScratchParser.RULE_stringExpr);
		try {
			this.state = 555;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 35, this._ctx) ) {
			case 1:
				_localctx = new StringLiteralExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 514;
				this.match(ScratchParser.String);
				}
				break;

			case 2:
				_localctx = new StringVariableExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 515;
				this.variable();
				}
				break;

			case 3:
				_localctx = new StringParanthExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 516;
				this.match(ScratchParser.T__44);
				this.state = 517;
				this.stringExpr();
				this.state = 518;
				this.match(ScratchParser.T__45);
				}
				break;

			case 4:
				_localctx = new StringCallStatementExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 520;
				this.callStmt();
				}
				break;

			case 5:
				_localctx = new NumAsStringExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 521;
				this.match(ScratchParser.T__77);
				this.state = 522;
				this.numExpr(0);
				this.state = 523;
				this.match(ScratchParser.T__70);
				this.state = 524;
				this.match(ScratchParser.T__20);
				}
				break;

			case 6:
				_localctx = new BoolAsStringExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 526;
				this.match(ScratchParser.T__77);
				this.state = 527;
				this.boolExpr(0);
				this.state = 528;
				this.match(ScratchParser.T__70);
				this.state = 529;
				this.match(ScratchParser.T__20);
				}
				break;

			case 7:
				_localctx = new StringAttributeOfExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 531;
				this.match(ScratchParser.T__78);
				this.state = 532;
				this.stringExpr();
				this.state = 533;
				this.match(ScratchParser.T__16);
				this.state = 534;
				this.actorExpr();
				}
				break;

			case 8:
				_localctx = new JoinStringsExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 536;
				this.match(ScratchParser.T__79);
				this.state = 537;
				this.stringExpr();
				this.state = 538;
				this.stringExpr();
				}
				break;

			case 9:
				_localctx = new IthLetterOfStringExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 540;
				this.match(ScratchParser.T__80);
				this.state = 541;
				this.numExpr(0);
				this.state = 542;
				this.match(ScratchParser.T__16);
				this.state = 543;
				this.stringExpr();
				}
				break;

			case 10:
				_localctx = new IthStringItemOfExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 545;
				this.match(ScratchParser.T__74);
				this.state = 546;
				this.numExpr(0);
				this.state = 547;
				this.match(ScratchParser.T__16);
				this.state = 548;
				this.variable();
				}
				break;

			case 11:
				_localctx = new DefaultStringExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 550;
				this.match(ScratchParser.T__81);
				this.state = 551;
				this.match(ScratchParser.String);
				this.state = 552;
				this.match(ScratchParser.T__82);
				this.state = 553;
				this.stringExpr();
				}
				break;

			case 12:
				_localctx = new UnspecifiedStringExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 554;
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

	public boolExpr(): BoolExprContext;
	public boolExpr(_p: number): BoolExprContext;
	// @RuleVersion(0)
	public boolExpr(_p?: number): BoolExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: BoolExprContext = new BoolExprContext(this._ctx, _parentState);
		let _prevctx: BoolExprContext = _localctx;
		let _startState: number = 106;
		this.enterRecursionRule(_localctx, 106, ScratchParser.RULE_boolExpr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 606;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				{
				_localctx = new BoolLiteralExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 558;
				this.match(ScratchParser.Boolean);
				}
				break;

			case 2:
				{
				_localctx = new BoolVariableExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 559;
				this.variable();
				}
				break;

			case 3:
				{
				_localctx = new BoolParanthExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 560;
				this.match(ScratchParser.T__44);
				this.state = 561;
				this.boolExpr(0);
				this.state = 562;
				this.match(ScratchParser.T__45);
				}
				break;

			case 4:
				{
				_localctx = new BoolCallStatementExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 564;
				this.callStmt();
				}
				break;

			case 5:
				{
				_localctx = new NumAsBoolExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 565;
				this.match(ScratchParser.T__77);
				this.state = 566;
				this.numExpr(0);
				this.state = 567;
				this.match(ScratchParser.T__70);
				this.state = 568;
				this.match(ScratchParser.T__19);
				}
				break;

			case 6:
				{
				_localctx = new StringAsBoolExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 570;
				this.match(ScratchParser.T__77);
				this.state = 571;
				this.stringExpr();
				this.state = 572;
				this.match(ScratchParser.T__70);
				this.state = 573;
				this.match(ScratchParser.T__19);
				}
				break;

			case 7:
				{
				_localctx = new NegatedBoolExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 575;
				this.match(ScratchParser.T__84);
				this.state = 576;
				this.boolExpr(11);
				}
				break;

			case 8:
				{
				_localctx = new GreaterEqualExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 577;
				this.numOrStringExpr();
				this.state = 578;
				this.match(ScratchParser.T__86);
				this.state = 579;
				this.numOrStringExpr();
				}
				break;

			case 9:
				{
				_localctx = new GreaterThanExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 581;
				this.numOrStringExpr();
				this.state = 582;
				this.match(ScratchParser.T__87);
				this.state = 583;
				this.numOrStringExpr();
				}
				break;

			case 10:
				{
				_localctx = new LessThanExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 585;
				this.numOrStringExpr();
				this.state = 586;
				this.match(ScratchParser.T__88);
				this.state = 587;
				this.numOrStringExpr();
				}
				break;

			case 11:
				{
				_localctx = new LessEqualExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 589;
				this.numOrStringExpr();
				this.state = 590;
				this.match(ScratchParser.T__89);
				this.state = 591;
				this.numOrStringExpr();
				}
				break;

			case 12:
				{
				_localctx = new EqualsExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 593;
				this.numOrStringExpr();
				this.state = 594;
				this.match(ScratchParser.T__90);
				this.state = 595;
				this.numOrStringExpr();
				}
				break;

			case 13:
				{
				_localctx = new StrContainsExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 597;
				this.stringExpr();
				this.state = 598;
				this.match(ScratchParser.T__91);
				this.state = 599;
				this.stringExpr();
				}
				break;

			case 14:
				{
				_localctx = new DefaultBoolExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 601;
				this.match(ScratchParser.T__81);
				this.state = 602;
				this.match(ScratchParser.Boolean);
				this.state = 603;
				this.match(ScratchParser.T__82);
				this.state = 604;
				this.boolExpr(2);
				}
				break;

			case 15:
				{
				_localctx = new UnspecifiedBoolExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 605;
				this.match(ScratchParser.T__92);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 616;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 38, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 614;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
					case 1:
						{
						_localctx = new BoolAndExpressionContext(new BoolExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_boolExpr);
						this.state = 608;
						if (!(this.precpred(this._ctx, 10))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 10)");
						}
						this.state = 609;
						this.match(ScratchParser.T__62);
						this.state = 610;
						this.boolExpr(11);
						}
						break;

					case 2:
						{
						_localctx = new BoolOrExpressionContext(new BoolExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_boolExpr);
						this.state = 611;
						if (!(this.precpred(this._ctx, 9))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 9)");
						}
						this.state = 612;
						this.match(ScratchParser.T__85);
						this.state = 613;
						this.boolExpr(10);
						}
						break;
					}
					}
				}
				this.state = 618;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 38, this._ctx);
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
	public numOrStringExpr(): NumOrStringExprContext {
		let _localctx: NumOrStringExprContext = new NumOrStringExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, ScratchParser.RULE_numOrStringExpr);
		try {
			this.state = 621;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				_localctx = new NumberExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 619;
				this.numExpr(0);
				}
				break;

			case 2:
				_localctx = new StringExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 620;
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

	public numExpr(): NumExprContext;
	public numExpr(_p: number): NumExprContext;
	// @RuleVersion(0)
	public numExpr(_p?: number): NumExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: NumExprContext = new NumExprContext(this._ctx, _parentState);
		let _prevctx: NumExprContext = _localctx;
		let _startState: number = 110;
		this.enterRecursionRule(_localctx, 110, ScratchParser.RULE_numExpr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 676;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 40, this._ctx) ) {
			case 1:
				{
				_localctx = new NumLiteralExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 624;
				this.number();
				}
				break;

			case 2:
				{
				_localctx = new NumVariableExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 625;
				this.variable();
				}
				break;

			case 3:
				{
				_localctx = new NumBracketsContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 626;
				this.match(ScratchParser.T__44);
				this.state = 627;
				this.numExpr(0);
				this.state = 628;
				this.match(ScratchParser.T__45);
				}
				break;

			case 4:
				{
				_localctx = new NumCallStatementExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 630;
				this.callStmt();
				}
				break;

			case 5:
				{
				_localctx = new StringToFloatExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 631;
				this.match(ScratchParser.T__77);
				this.state = 632;
				this.stringExpr();
				this.state = 633;
				this.match(ScratchParser.T__70);
				this.state = 634;
				this.match(ScratchParser.T__18);
				}
				break;

			case 6:
				{
				_localctx = new StringToIntExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 636;
				this.match(ScratchParser.T__77);
				this.state = 637;
				this.stringExpr();
				this.state = 638;
				this.match(ScratchParser.T__70);
				this.state = 639;
				this.match(ScratchParser.T__17);
				}
				break;

			case 7:
				{
				_localctx = new BoolToIntExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 641;
				this.match(ScratchParser.T__77);
				this.state = 642;
				this.boolExpr(0);
				this.state = 643;
				this.match(ScratchParser.T__70);
				this.state = 644;
				this.match(ScratchParser.T__17);
				}
				break;

			case 8:
				{
				_localctx = new NumToFloatExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 646;
				this.match(ScratchParser.T__77);
				this.state = 647;
				this.numExpr(0);
				this.state = 648;
				this.match(ScratchParser.T__70);
				this.state = 649;
				this.match(ScratchParser.T__18);
				}
				break;

			case 9:
				{
				_localctx = new NumToIntExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 651;
				this.match(ScratchParser.T__77);
				this.state = 652;
				this.numExpr(0);
				this.state = 653;
				this.match(ScratchParser.T__70);
				this.state = 654;
				this.match(ScratchParser.T__17);
				}
				break;

			case 10:
				{
				_localctx = new TimerExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 656;
				this.match(ScratchParser.T__64);
				}
				break;

			case 11:
				{
				_localctx = new LengthOfStringExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 657;
				this.match(ScratchParser.T__93);
				this.state = 658;
				this.match(ScratchParser.T__16);
				this.state = 659;
				this.stringExpr();
				}
				break;

			case 12:
				{
				_localctx = new LengthOfListExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 660;
				this.match(ScratchParser.T__93);
				this.state = 661;
				this.match(ScratchParser.T__16);
				this.state = 662;
				this.match(ScratchParser.T__15);
				this.state = 663;
				this.variable();
				}
				break;

			case 13:
				{
				_localctx = new IndexOfExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 664;
				this.match(ScratchParser.T__94);
				this.state = 665;
				this.match(ScratchParser.T__16);
				this.state = 666;
				this.expression();
				this.state = 667;
				this.match(ScratchParser.T__38);
				this.state = 668;
				this.variable();
				}
				break;

			case 14:
				{
				_localctx = new DefaultNumExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 670;
				this.match(ScratchParser.T__81);
				this.state = 671;
				this.number();
				this.state = 672;
				this.match(ScratchParser.T__82);
				this.state = 673;
				this.numExpr(2);
				}
				break;

			case 15:
				{
				_localctx = new UnspecifiedNumExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 675;
				this.match(ScratchParser.T__99);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 695;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 42, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 693;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 41, this._ctx) ) {
					case 1:
						{
						_localctx = new NumMulExpressionContext(new NumExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_numExpr);
						this.state = 678;
						if (!(this.precpred(this._ctx, 7))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 7)");
						}
						this.state = 679;
						this.match(ScratchParser.T__4);
						this.state = 680;
						this.numExpr(8);
						}
						break;

					case 2:
						{
						_localctx = new NumDivExpressionContext(new NumExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_numExpr);
						this.state = 681;
						if (!(this.precpred(this._ctx, 6))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 6)");
						}
						this.state = 682;
						this.match(ScratchParser.T__95);
						this.state = 683;
						this.numExpr(7);
						}
						break;

					case 3:
						{
						_localctx = new NumModExpressionContext(new NumExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_numExpr);
						this.state = 684;
						if (!(this.precpred(this._ctx, 5))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 5)");
						}
						this.state = 685;
						this.match(ScratchParser.T__96);
						this.state = 686;
						this.numExpr(6);
						}
						break;

					case 4:
						{
						_localctx = new NumPlusExpressionContext(new NumExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_numExpr);
						this.state = 687;
						if (!(this.precpred(this._ctx, 4))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 4)");
						}
						this.state = 688;
						this.match(ScratchParser.T__97);
						this.state = 689;
						this.numExpr(5);
						}
						break;

					case 5:
						{
						_localctx = new NumMinusExpressionContext(new NumExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ScratchParser.RULE_numExpr);
						this.state = 690;
						if (!(this.precpred(this._ctx, 3))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 3)");
						}
						this.state = 691;
						this.match(ScratchParser.T__98);
						this.state = 692;
						this.numExpr(4);
						}
						break;
					}
					}
				}
				this.state = 697;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 42, this._ctx);
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
		this.enterRule(_localctx, 112, ScratchParser.RULE_listExpr);
		try {
			this.state = 703;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.T__104:
			case ScratchParser.Identifier:
				_localctx = new ListVariableExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 698;
				this.variable();
				}
				break;
			case ScratchParser.T__22:
				_localctx = new ListWithElementsExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 699;
				this.match(ScratchParser.T__22);
				this.state = 700;
				this.expressionListPlain();
				this.state = 701;
				this.match(ScratchParser.T__23);
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
	public actorExpr(): ActorExprContext {
		let _localctx: ActorExprContext = new ActorExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, ScratchParser.RULE_actorExpr);
		try {
			this.state = 719;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 44, this._ctx) ) {
			case 1:
				_localctx = new ActorVariableExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 705;
				this.variable();
				}
				break;

			case 2:
				_localctx = new LocateActorExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 706;
				this.match(ScratchParser.T__100);
				this.state = 707;
				this.match(ScratchParser.T__9);
				this.state = 708;
				this.stringExpr();
				}
				break;

			case 3:
				_localctx = new StartCloneActorExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 709;
				this.match(ScratchParser.T__101);
				this.state = 710;
				this.match(ScratchParser.T__33);
				this.state = 711;
				this.match(ScratchParser.T__16);
				this.state = 712;
				this.actorExpr();
				}
				break;

			case 4:
				_localctx = new UsherActorExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 713;
				this.match(ScratchParser.T__101);
				this.state = 714;
				this.match(ScratchParser.T__9);
				this.state = 715;
				this.stringExpr();
				this.state = 716;
				this.match(ScratchParser.T__14);
				this.state = 717;
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
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, ScratchParser.RULE_expression);
		try {
			this.state = 727;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 45, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 721;
				this.stringExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 722;
				this.numExpr(0);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 723;
				this.boolExpr(0);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 724;
				this.listExpr();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 725;
				this.actorExpr();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 726;
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
		this.enterRule(_localctx, 118, ScratchParser.RULE_unspecifiedExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 729;
			this.match(ScratchParser.T__102);
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
		this.enterRule(_localctx, 120, ScratchParser.RULE_variable);
		try {
			this.state = 736;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 46, this._ctx) ) {
			case 1:
				_localctx = new FlatVariableContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 731;
				this.ident();
				}
				break;

			case 2:
				_localctx = new QualifiedVariableContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 732;
				this.ident();
				this.state = 733;
				this.match(ScratchParser.T__103);
				this.state = 734;
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
	public ident(): IdentContext {
		let _localctx: IdentContext = new IdentContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, ScratchParser.RULE_ident);
		try {
			this.state = 741;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.Identifier:
				_localctx = new IdentExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 738;
				this.match(ScratchParser.Identifier);
				}
				break;
			case ScratchParser.T__104:
				_localctx = new StrIdentExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 739;
				this.match(ScratchParser.T__104);
				this.state = 740;
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
		this.enterRule(_localctx, 124, ScratchParser.RULE_number);
		try {
			this.state = 745;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ScratchParser.IntegerLiteral:
				_localctx = new IntegerLiteralExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 743;
				this.match(ScratchParser.IntegerLiteral);
				}
				break;
			case ScratchParser.DecimalLiteral:
				_localctx = new DecimalLiteralExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 744;
				this.match(ScratchParser.DecimalLiteral);
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
	public resourceLocator(): ResourceLocatorContext {
		let _localctx: ResourceLocatorContext = new ResourceLocatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, ScratchParser.RULE_resourceLocator);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 747;
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
		this.enterRule(_localctx, 128, ScratchParser.RULE_message);
		try {
			this.state = 755;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 49, this._ctx) ) {
			case 1:
				_localctx = new UserMessageContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 749;
				this.stringExpr();
				}
				break;

			case 2:
				_localctx = new SystemMessageContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 750;
				this.stringExpr();
				this.state = 751;
				this.expressionList();
				this.state = 752;
				this.match(ScratchParser.T__70);
				this.state = 753;
				this.match(ScratchParser.String);
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
		case 53:
			return this.boolExpr_sempred(_localctx as BoolExprContext, predIndex);

		case 55:
			return this.numExpr_sempred(_localctx as NumExprContext, predIndex);
		}
		return true;
	}
	private boolExpr_sempred(_localctx: BoolExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 10);

		case 1:
			return this.precpred(this._ctx, 9);
		}
		return true;
	}
	private numExpr_sempred(_localctx: NumExprContext, predIndex: number): boolean {
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03u\u02F8\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x07\x04\x8E\n\x04\f\x04\x0E" +
		"\x04\x91\v\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06" +
		"\x05\x06\x9A\n\x06\x03\x07\x07\x07\x9D\n\x07\f\x07\x0E\x07\xA0\v\x07\x03" +
		"\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x07\t\xAD" +
		"\n\t\f\t\x0E\t\xB0\v\t\x03\t\x05\t\xB3\n\t\x03\n\x03\n\x05\n\xB7\n\n\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x05" +
		"\r\xC5\n\r\x03\x0E\x07\x0E\xC8\n\x0E\f\x0E\x0E\x0E\xCB\v\x0E\x03\x0F\x03" +
		"\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10\x07\x10\xD3\n\x10\f\x10\x0E\x10\xD6" +
		"\v\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\xDD\n\x11\x03\x12" +
		"\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x05\x12" +
		"\xE8\n\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03" +
		"\x14\x07\x14\xF2\n\x14\f\x14\x0E\x14\xF5\v\x14\x03\x15\x07\x15\xF8\n\x15" +
		"\f\x15\x0E\x15\xFB\v\x15\x03\x16\x03\x16\x03\x17\x03\x17\x03\x17\x03\x17" +
		"\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17" +
		"\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x05\x17\u0111\n\x17\x03\x18\x03" +
		"\x18\x03\x18\x05\x18\u0116\n\x18\x03\x19\x07\x19\u0119\n\x19\f\x19\x0E" +
		"\x19\u011C\v\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A" +
		"\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u012A\n\x1A\x03\x1B\x03" +
		"\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u0132\n\x1B\x03\x1C\x03\x1C" +
		"\x03\x1C\x05\x1C\u0137\n\x1C\x03\x1D\x07\x1D\u013A\n\x1D\f\x1D\x0E\x1D" +
		"\u013D\v\x1D\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03 \x03" +
		" \x03 \x03 \x03!\x03!\x03!\x07!\u014C\n!\f!\x0E!\u014F\v!\x03!\x05!\u0152" +
		"\n!\x03\"\x03\"\x03\"\x05\"\u0157\n\"\x03\"\x03\"\x03#\x03#\x03#\x03$" +
		"\x07$\u015F\n$\f$\x0E$\u0162\v$\x03%\x03%\x03%\x03%\x03%\x05%\u0169\n" +
		"%\x03&\x03&\x03&\x03&\x03&\x03&\x03\'\x03\'\x03\'\x03\'\x03\'\x05\'\u0176" +
		"\n\'\x03(\x03(\x03(\x03(\x03(\x03)\x03)\x03)\x03)\x03)\x03*\x03*\x03*" +
		"\x03*\x03+\x03+\x03+\x03,\x03,\x03,\x03,\x03-\x03-\x03-\x07-\u0190\n-" +
		"\f-\x0E-\u0193\v-\x03-\x05-\u0196\n-\x03.\x03.\x03.\x03/\x03/\x03/\x03" +
		"/\x03/\x03/\x03/\x03/\x05/\u01A3\n/\x030\x030\x030\x030\x050\u01A9\n0" +
		"\x031\x031\x031\x031\x031\x031\x031\x031\x031\x031\x031\x031\x031\x03" +
		"1\x031\x031\x031\x031\x031\x031\x031\x031\x031\x031\x031\x031\x031\x03" +
		"1\x031\x051\u01C8\n1\x032\x032\x032\x032\x032\x032\x032\x032\x032\x03" +
		"2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x03" +
		"2\x032\x032\x032\x032\x032\x052\u01E7\n2\x033\x033\x033\x033\x033\x03" +
		"3\x033\x033\x033\x033\x053\u01F3\n3\x034\x074\u01F6\n4\f4\x0E4\u01F9\v" +
		"4\x035\x035\x035\x035\x035\x035\x035\x035\x055\u0203\n5\x036\x036\x03" +
		"6\x036\x036\x036\x036\x036\x036\x036\x036\x036\x036\x036\x036\x036\x03" +
		"6\x036\x036\x036\x036\x036\x036\x036\x036\x036\x036\x036\x036\x036\x03" +
		"6\x036\x036\x036\x036\x036\x036\x036\x036\x036\x036\x056\u022E\n6\x03" +
		"7\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x03" +
		"7\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x03" +
		"7\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037\x03" +
		"7\x037\x037\x037\x037\x037\x037\x057\u0261\n7\x037\x037\x037\x037\x03" +
		"7\x037\x077\u0269\n7\f7\x0E7\u026C\v7\x038\x038\x058\u0270\n8\x039\x03" +
		"9\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x03" +
		"9\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x03" +
		"9\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x03" +
		"9\x039\x039\x039\x039\x039\x039\x039\x039\x039\x059\u02A7\n9\x039\x03" +
		"9\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x07" +
		"9\u02B8\n9\f9\x0E9\u02BB\v9\x03:\x03:\x03:\x03:\x03:\x05:\u02C2\n:\x03" +
		";\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x05" +
		";\u02D2\n;\x03<\x03<\x03<\x03<\x03<\x03<\x05<\u02DA\n<\x03=\x03=\x03>" +
		"\x03>\x03>\x03>\x03>\x05>\u02E3\n>\x03?\x03?\x03?\x05?\u02E8\n?\x03@\x03" +
		"@\x05@\u02EC\n@\x03A\x03A\x03B\x03B\x03B\x03B\x03B\x03B\x05B\u02F6\nB" +
		"\x03B\x02\x02\x04lpC\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02" +
		"\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02" +
		"\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02<\x02" +
		">\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02" +
		"Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02n\x02p\x02r\x02t\x02" +
		"v\x02x\x02z\x02|\x02~\x02\x80\x02\x82\x02\x02\x03\x03\x02\x03\x04\x02" +
		"\u0334\x02\x84\x03\x02\x02\x02\x04\x8A\x03\x02\x02\x02\x06\x8F\x03\x02" +
		"\x02\x02\b\x92\x03\x02\x02\x02\n\x99\x03\x02\x02\x02\f\x9E\x03\x02\x02" +
		"\x02\x0E\xA1\x03\x02\x02\x02\x10\xB2\x03\x02\x02\x02\x12\xB6\x03\x02\x02" +
		"\x02\x14\xB8\x03\x02\x02\x02\x16\xBE\x03\x02\x02\x02\x18\xC4\x03\x02\x02" +
		"\x02\x1A\xC9\x03\x02\x02\x02\x1C\xCC\x03\x02\x02\x02\x1E\xD4\x03\x02\x02" +
		"\x02 \xDC\x03\x02\x02\x02\"\xE7\x03\x02\x02\x02$\xE9\x03\x02\x02\x02&" +
		"\xF3\x03\x02\x02\x02(\xF9\x03\x02\x02\x02*\xFC\x03\x02\x02\x02,\u0110" +
		"\x03\x02\x02\x02.\u0115\x03\x02\x02\x020\u011A\x03\x02\x02\x022\u0129" +
		"\x03\x02\x02\x024\u0131\x03\x02\x02\x026\u0136\x03\x02\x02\x028\u013B" +
		"\x03\x02\x02\x02:\u013E\x03\x02\x02\x02<\u0140\x03\x02\x02\x02>\u0144" +
		"\x03\x02\x02\x02@\u0151\x03\x02\x02\x02B\u0153\x03\x02\x02\x02D\u015A" +
		"\x03\x02\x02\x02F\u0160\x03\x02\x02\x02H\u0168\x03\x02\x02\x02J\u016A" +
		"\x03\x02\x02\x02L\u0175\x03\x02\x02\x02N\u0177\x03\x02\x02\x02P\u017C" +
		"\x03\x02\x02\x02R\u0181\x03\x02\x02\x02T\u0185\x03\x02\x02\x02V\u0188" +
		"\x03\x02\x02\x02X\u0195\x03\x02\x02\x02Z\u0197\x03\x02\x02\x02\\\u01A2" +
		"\x03\x02\x02\x02^\u01A8\x03\x02\x02\x02`\u01C7\x03\x02\x02\x02b\u01E6" +
		"\x03\x02\x02\x02d\u01F2\x03\x02\x02\x02f\u01F7\x03\x02\x02\x02h\u0202" +
		"\x03\x02\x02\x02j\u022D\x03\x02\x02\x02l\u0260\x03\x02\x02\x02n\u026F" +
		"\x03\x02\x02\x02p\u02A6\x03\x02\x02\x02r\u02C1\x03\x02\x02\x02t\u02D1" +
		"\x03\x02\x02\x02v\u02D9\x03\x02\x02\x02x\u02DB\x03\x02\x02\x02z\u02E2" +
		"\x03\x02\x02\x02|\u02E7\x03\x02\x02\x02~\u02EB\x03\x02\x02\x02\x80\u02ED" +
		"\x03\x02\x02\x02\x82\u02F5\x03\x02\x02\x02\x84\x85\x05\x04\x03\x02\x85" +
		"\x86\x05|?\x02\x86\x87\x05\x06\x04\x02\x87\x88\x05\f\x07\x02\x88\x89\x07" +
		"\x02\x02\x03\x89\x03\x03\x02\x02\x02\x8A\x8B\t\x02\x02\x02\x8B\x05\x03" +
		"\x02\x02\x02\x8C\x8E\x05\b\x05\x02\x8D\x8C\x03\x02\x02\x02\x8E\x91\x03" +
		"\x02\x02\x02\x8F\x8D\x03\x02\x02\x02\x8F\x90\x03\x02\x02\x02\x90\x07\x03" +
		"\x02\x02\x02\x91\x8F\x03\x02\x02\x02\x92\x93\x07\x05\x02\x02\x93\x94\x05" +
		"\n\x06\x02\x94\x95\x07\x06\x02\x02\x95\x96\x05\x80A\x02\x96\t\x03\x02" +
		"\x02\x02\x97\x9A\x05|?\x02\x98\x9A\x07\x07\x02\x02\x99\x97\x03\x02\x02" +
		"\x02\x99\x98\x03\x02\x02\x02\x9A\v\x03\x02\x02\x02\x9B\x9D\x05\x0E\b\x02" +
		"\x9C\x9B\x03\x02\x02\x02\x9D\xA0\x03\x02\x02\x02\x9E\x9C\x03\x02\x02\x02" +
		"\x9E\x9F\x03\x02\x02\x02\x9F\r\x03\x02\x02\x02\xA0\x9E\x03\x02\x02\x02" +
		"\xA1\xA2\x05\x12\n\x02\xA2\xA3\x05|?\x02\xA3\xA4\x05\x10\t\x02\xA4\xA5" +
		"\x07\b\x02\x02\xA5\xA6\x05\x14\v\x02\xA6\xA7\x07\t\x02\x02\xA7\x0F\x03" +
		"\x02\x02\x02\xA8\xA9\x07\n\x02\x02\xA9\xAE\x05|?\x02\xAA\xAB\x07\v\x02" +
		"\x02\xAB\xAD\x05|?\x02\xAC\xAA\x03\x02\x02\x02\xAD\xB0\x03\x02\x02\x02" +
		"\xAE\xAC\x03\x02\x02\x02\xAE\xAF\x03\x02\x02\x02\xAF\xB3\x03\x02\x02\x02" +
		"\xB0\xAE\x03\x02\x02\x02\xB1\xB3\x03\x02\x02\x02\xB2\xA8\x03\x02\x02\x02" +
		"\xB2\xB1\x03\x02\x02\x02\xB3\x11\x03\x02\x02\x02\xB4\xB7\x07\f\x02\x02" +
		"\xB5\xB7\x07\r\x02\x02\xB6\xB4\x03\x02\x02\x02\xB6\xB5\x03\x02\x02\x02" +
		"\xB7\x13\x03\x02\x02\x02\xB8\xB9\x05\x1A\x0E\x02\xB9\xBA\x05\x1E\x10\x02" +
		"\xBA\xBB\x05f4\x02\xBB\xBC\x050\x19\x02\xBC\xBD\x05&\x14\x02\xBD\x15\x03" +
		"\x02\x02\x02\xBE\xBF\x05\x18\r\x02\xBF\xC0\x05|?\x02\xC0\xC1\x05\x80A" +
		"\x02\xC1\x17\x03\x02\x02\x02\xC2\xC5\x07\x0E\x02\x02\xC3\xC5\x07\x0F\x02" +
		"\x02\xC4\xC2\x03\x02\x02\x02\xC4\xC3\x03\x02\x02\x02\xC5\x19\x03\x02\x02" +
		"\x02\xC6\xC8\x05\x16\f\x02\xC7\xC6\x03\x02\x02\x02\xC8\xCB\x03\x02\x02" +
		"\x02\xC9\xC7\x03\x02\x02\x02\xC9\xCA\x03\x02\x02\x02\xCA\x1B\x03\x02\x02" +
		"\x02\xCB\xC9\x03\x02\x02\x02\xCC\xCD\x07\x10\x02\x02\xCD\xCE\x05|?\x02" +
		"\xCE\xCF\x07\x11\x02\x02\xCF\xD0\x05 \x11\x02\xD0\x1D\x03\x02\x02\x02" +
		"\xD1\xD3\x05\x1C\x0F\x02\xD2\xD1\x03\x02\x02\x02\xD3\xD6\x03\x02\x02\x02" +
		"\xD4\xD2\x03\x02\x02\x02\xD4\xD5\x03\x02\x02\x02\xD5\x1F\x03\x02\x02\x02" +
		"\xD6\xD4\x03\x02\x02\x02\xD7\xD8\x07\x12\x02\x02\xD8\xD9\x07\x13\x02\x02" +
		"\xD9\xDD\x05 \x11\x02\xDA\xDD\x07\f\x02\x02\xDB\xDD\x05\"\x12\x02\xDC" +
		"\xD7\x03\x02\x02\x02\xDC\xDA\x03\x02\x02\x02\xDC\xDB\x03\x02\x02\x02\xDD" +
		"!\x03\x02\x02\x02\xDE\xE8\x07\x14\x02\x02\xDF\xE8\x07\x15\x02\x02\xE0" +
		"\xE8\x07\x16\x02\x02\xE1\xE8\x07\x17\x02\x02\xE2\xE3\x07\x18\x02\x02\xE3" +
		"\xE4\x07\x19\x02\x02\xE4\xE5\x05X-\x02\xE5\xE6\x07\x1A\x02\x02\xE6\xE8" +
		"\x03\x02\x02\x02\xE7\xDE\x03\x02\x02\x02\xE7\xDF\x03\x02\x02\x02\xE7\xE0" +
		"\x03\x02\x02\x02\xE7\xE1\x03\x02\x02\x02\xE7\xE2\x03\x02\x02\x02\xE8#" +
		"\x03\x02\x02\x02\xE9\xEA\x07\x1B\x02\x02\xEA\xEB\x07\x1C\x02\x02\xEB\xEC" +
		"\x05,\x17\x02\xEC\xED\x07\x1D\x02\x02\xED\xEE\x05(\x15\x02\xEE\xEF\x05" +
		"B\"\x02\xEF%\x03\x02\x02\x02\xF0\xF2\x05$\x13\x02\xF1\xF0\x03\x02\x02" +
		"\x02\xF2\xF5\x03\x02\x02\x02\xF3\xF1\x03\x02\x02\x02\xF3\xF4\x03\x02\x02" +
		"\x02\xF4\'\x03\x02\x02\x02\xF5\xF3\x03\x02\x02\x02\xF6\xF8\x05*\x16\x02" +
		"\xF7\xF6\x03\x02\x02\x02\xF8\xFB\x03\x02\x02\x02\xF9\xF7\x03\x02\x02\x02" +
		"\xF9\xFA\x03\x02\x02\x02\xFA)\x03\x02\x02\x02\xFB\xF9\x03\x02\x02\x02" +
		"\xFC\xFD\x07\x1E\x02\x02\xFD+\x03\x02\x02\x02\xFE\u0111\x07\x1F\x02\x02" +
		"\xFF\u0111\x07 \x02\x02\u0100\u0101\x07 \x02\x02\u0101\u0111\x07!\x02" +
		"\x02\u0102\u0111\x07\"\x02\x02\u0103\u0104\x07#\x02\x02\u0104\u0105\x07" +
		"\x11\x02\x02\u0105\u0111\x07$\x02\x02\u0106\u0107\x07%\x02\x02\u0107\u0108" +
		"\x05j6\x02\u0108\u0109\x05> \x02\u0109\u010A\x05.\x18\x02\u010A\u0111" +
		"\x03\x02\x02\x02\u010B\u010C\x07&\x02\x02\u010C\u0111\x05l7\x02\u010D" +
		"\u0111\x07\'\x02\x02\u010E\u010F\x07(\x02\x02\u010F\u0111\x07!\x02\x02" +
		"\u0110\xFE\x03\x02\x02\x02\u0110\xFF\x03\x02\x02\x02\u0110\u0100\x03\x02" +
		"\x02\x02\u0110\u0102\x03\x02\x02\x02\u0110\u0103\x03\x02\x02\x02\u0110" +
		"\u0106\x03\x02\x02\x02\u0110\u010B\x03\x02\x02\x02\u0110\u010D\x03\x02" +
		"\x02\x02\u0110\u010E\x03\x02\x02\x02\u0111-\x03\x02\x02\x02\u0112\u0113" +
		"\x07)\x02\x02\u0113\u0116\x07n\x02\x02\u0114\u0116\x03\x02\x02\x02\u0115" +
		"\u0112\x03\x02\x02\x02\u0115\u0114\x03\x02\x02\x02\u0116/\x03\x02\x02" +
		"\x02\u0117\u0119\x052\x1A\x02\u0118\u0117\x03\x02\x02\x02\u0119\u011C" +
		"\x03\x02\x02\x02\u011A\u0118\x03\x02\x02\x02\u011A\u011B\x03\x02\x02\x02" +
		"\u011B1\x03\x02\x02\x02\u011C\u011A\x03\x02\x02\x02\u011D\u011E\x07*\x02" +
		"\x02\u011E\u011F\x058\x1D\x02\u011F\u0120\x05|?\x02\u0120\u0121\x05> " +
		"\x02\u0121\u0122\x05B\"\x02\u0122\u0123\x054\x1B\x02\u0123\u012A\x03\x02" +
		"\x02\x02\u0124\u0125\x07+\x02\x02\u0125\u0126\x05|?\x02\u0126\u0127\x05" +
		"> \x02\u0127\u0128\x056\x1C\x02\u0128\u012A\x03\x02\x02\x02\u0129\u011D" +
		"\x03\x02\x02\x02\u0129\u0124\x03\x02\x02\x02\u012A3\x03\x02\x02\x02\u012B" +
		"\u012C\x07,\x02\x02\u012C\u012D\x05|?\x02\u012D\u012E\x07-\x02\x02\u012E" +
		"\u012F\x05 \x11\x02\u012F\u0132\x03\x02\x02\x02\u0130\u0132\x03\x02\x02" +
		"\x02\u0131\u012B\x03\x02\x02\x02\u0131\u0130\x03\x02\x02\x02\u01325\x03" +
		"\x02\x02\x02\u0133\u0134\x07,\x02\x02\u0134\u0137\x05 \x11\x02\u0135\u0137" +
		"\x03\x02\x02\x02\u0136\u0133\x03\x02\x02\x02\u0136\u0135\x03\x02\x02\x02" +
		"\u01377\x03\x02\x02\x02\u0138\u013A\x05:\x1E\x02\u0139\u0138\x03\x02\x02" +
		"\x02\u013A\u013D\x03\x02\x02\x02\u013B\u0139\x03\x02\x02\x02\u013B\u013C" +
		"\x03\x02\x02\x02\u013C9\x03\x02\x02\x02\u013D\u013B\x03\x02\x02\x02\u013E" +
		"\u013F\x07.\x02\x02\u013F;\x03\x02\x02\x02\u0140\u0141\x05|?\x02\u0141" +
		"\u0142\x07-\x02\x02\u0142\u0143\x05 \x11\x02\u0143=\x03\x02\x02\x02\u0144" +
		"\u0145\x07/\x02\x02\u0145\u0146\x05@!\x02\u0146\u0147\x070\x02\x02\u0147" +
		"?\x03\x02\x02\x02\u0148\u014D\x05<\x1F\x02\u0149\u014A\x07\v\x02\x02\u014A" +
		"\u014C\x05<\x1F\x02\u014B\u0149\x03\x02\x02\x02\u014C\u014F\x03\x02\x02" +
		"\x02\u014D\u014B\x03\x02\x02\x02\u014D\u014E\x03\x02\x02\x02\u014E\u0152" +
		"\x03\x02\x02\x02\u014F\u014D\x03\x02\x02\x02\u0150\u0152\x03\x02\x02\x02" +
		"\u0151\u0148\x03\x02\x02\x02\u0151\u0150\x03\x02\x02\x02\u0152A\x03\x02" +
		"\x02\x02\u0153\u0154\x07\b\x02\x02\u0154\u0156\x05F$\x02\u0155\u0157\x05" +
		"h5\x02\u0156\u0155\x03\x02\x02\x02\u0156\u0157\x03\x02\x02\x02\u0157\u0158" +
		"\x03\x02\x02\x02\u0158\u0159\x07\t\x02\x02\u0159C\x03\x02\x02\x02\u015A" +
		"\u015B\x07.\x02\x02\u015B\u015C\x05B\"\x02\u015CE\x03\x02\x02\x02\u015D" +
		"\u015F\x05\\/\x02\u015E\u015D\x03\x02\x02\x02\u015F\u0162\x03\x02\x02" +
		"\x02\u0160\u015E\x03\x02\x02\x02\u0160\u0161\x03\x02\x02\x02\u0161G\x03" +
		"\x02\x02\x02\u0162\u0160\x03\x02\x02\x02\u0163\u0169\x05J&\x02\u0164\u0169" +
		"\x05N(\x02\u0165\u0169\x05P)\x02\u0166\u0169\x05R*\x02\u0167\u0169\x05" +
		"T+\x02\u0168\u0163\x03\x02\x02\x02\u0168\u0164\x03\x02\x02\x02\u0168\u0165" +
		"\x03\x02\x02\x02\u0168\u0166\x03\x02\x02\x02\u0168\u0167\x03\x02\x02\x02" +
		"\u0169I\x03\x02\x02\x02\u016A\u016B\x071\x02\x02\u016B\u016C\x05l7\x02" +
		"\u016C\u016D\x072\x02\x02\u016D\u016E\x05B\"\x02\u016E\u016F\x05L\'\x02" +
		"\u016FK\x03\x02\x02\x02\u0170\u0171\x073\x02\x02\u0171\u0176\x05B\"\x02" +
		"\u0172\u0173\x073\x02\x02\u0173\u0176\x05J&\x02\u0174\u0176\x03\x02\x02" +
		"\x02\u0175\u0170\x03\x02\x02\x02\u0175\u0172\x03\x02\x02\x02\u0175\u0174" +
		"\x03\x02\x02\x02\u0176M\x03\x02\x02\x02\u0177\u0178\x074\x02\x02\u0178" +
		"\u0179\x05l7\x02\u0179\u017A\x075\x02\x02\u017A\u017B\x05B\"\x02\u017B" +
		"O\x03\x02\x02\x02\u017C\u017D\x075\x02\x02\u017D\u017E\x05p9\x02\u017E" +
		"\u017F\x076\x02\x02\u017F\u0180\x05B\"\x02\u0180Q\x03\x02\x02\x02\u0181" +
		"\u0182\x075\x02\x02\u0182\u0183\x077\x02\x02\u0183\u0184\x05B\"\x02\u0184" +
		"S\x03\x02\x02\x02\u0185\u0186\x05|?\x02\u0186\u0187\x05V,\x02\u0187U\x03" +
		"\x02\x02\x02\u0188\u0189\x07/\x02\x02\u0189\u018A\x05X-\x02\u018A\u018B" +
		"\x070\x02\x02\u018BW\x03\x02\x02\x02\u018C\u0191\x05v<\x02\u018D\u018E" +
		"\x07\v\x02\x02\u018E\u0190\x05v<\x02\u018F\u018D\x03\x02\x02\x02\u0190" +
		"\u0193\x03\x02\x02\x02\u0191\u018F\x03\x02\x02\x02\u0191\u0192\x03\x02" +
		"\x02\x02\u0192\u0196\x03\x02\x02\x02\u0193\u0191\x03\x02\x02\x02\u0194" +
		"\u0196\x03\x02\x02\x02\u0195\u018C\x03\x02\x02\x02\u0195\u0194\x03\x02" +
		"\x02\x02\u0196Y\x03\x02\x02\x02\u0197\u0198\x078\x02\x02\u0198\u0199\x05" +
		"v<\x02\u0199[\x03\x02\x02\x02\u019A\u01A3\x05H%\x02\u019B\u01A3\x05^0" +
		"\x02\u019C\u01A3\x05D#\x02\u019D\u019E\x079\x02\x02\u019E\u019F\x07o\x02" +
		"\x02\u019F\u01A0\x05V,\x02\u01A0\u01A1\x05\\/\x02\u01A1\u01A3\x03\x02" +
		"\x02\x02\u01A2\u019A\x03\x02\x02\x02\u01A2\u019B\x03\x02\x02\x02\u01A2" +
		"\u019C\x03\x02\x02\x02\u01A2\u019D\x03\x02\x02\x02\u01A3]\x03\x02\x02" +
		"\x02\u01A4\u01A9\x05Z.\x02\u01A5\u01A9\x05`1\x02\u01A6\u01A9\x05b2\x02" +
		"\u01A7\u01A9\x05\x1C\x0F\x02\u01A8\u01A4\x03\x02\x02\x02\u01A8\u01A5\x03" +
		"\x02\x02\x02\u01A8\u01A6\x03\x02\x02\x02\u01A8\u01A7\x03\x02\x02\x02\u01A9" +
		"_\x03\x02\x02\x02\u01AA\u01AB\x07:\x02\x02\u01AB\u01AC\x05p9\x02\u01AC" +
		"\u01AD\x07;\x02\x02\u01AD\u01C8\x03\x02\x02\x02\u01AE\u01AF\x07:\x02\x02" +
		"\u01AF\u01B0\x074\x02\x02\u01B0\u01C8\x05l7\x02\u01B1\u01B2\x07<\x02\x02" +
		"\u01B2\u01B3\x07=\x02\x02\u01B3\u01B4\x07>\x02\x02\u01B4\u01B5\x07)\x02" +
		"\x02\u01B5\u01C8\x07\f\x02\x02\u01B6\u01B7\x07?\x02\x02\u01B7\u01B8\x07" +
		"$\x02\x02\u01B8\u01B9\x07\x13\x02\x02\u01B9\u01C8\x05j6\x02\u01BA\u01BB" +
		"\x07@\x02\x02\u01BB\u01C8\x05\x82B\x02\u01BC\u01BD\x07@\x02\x02\u01BD" +
		"\u01BE\x05\x82B\x02\u01BE\u01BF\x07A\x02\x02\u01BF\u01C0\x07:\x02\x02" +
		"\u01C0\u01C8\x03\x02\x02\x02\u01C1\u01C2\x07B\x02\x02\u01C2\u01C8\x07" +
		"C\x02\x02\u01C3\u01C8\x07D\x02\x02\u01C4\u01C5\x07E\x02\x02\u01C5\u01C8" +
		"\x05l7\x02\u01C6\u01C8\x05d3\x02\u01C7\u01AA\x03\x02\x02\x02\u01C7\u01AE" +
		"\x03\x02\x02\x02\u01C7\u01B1\x03\x02\x02\x02\u01C7\u01B6\x03\x02\x02\x02" +
		"\u01C7\u01BA\x03\x02\x02\x02\u01C7\u01BC\x03\x02\x02\x02\u01C7\u01C1\x03" +
		"\x02\x02\x02\u01C7\u01C3\x03\x02\x02\x02\u01C7\u01C4\x03\x02\x02\x02\u01C7" +
		"\u01C6\x03\x02\x02\x02\u01C8a\x03\x02\x02\x02\u01C9\u01CA\x07F\x02\x02" +
		"\u01CA\u01CB\x07G\x02\x02\u01CB\u01CC\x07\x06\x02\x02\u01CC\u01E7\x05" +
		"z>\x02\u01CD\u01CE\x07F\x02\x02\u01CE\u01CF\x05p9\x02\u01CF\u01D0\x07" +
		"\x13\x02\x02\u01D0\u01D1\x05z>\x02\u01D1\u01E7\x03\x02\x02\x02\u01D2\u01D3" +
		"\x07H\x02\x02\u01D3\u01D4\x05j6\x02\u01D4\u01D5\x07I\x02\x02\u01D5\u01D6" +
		"\x05z>\x02\u01D6\u01E7\x03\x02\x02\x02\u01D7\u01D8\x07J\x02\x02\u01D8" +
		"\u01D9\x05j6\x02\u01D9\u01DA\x07K\x02\x02\u01DA\u01DB\x05p9\x02\u01DB" +
		"\u01DC\x07\x13\x02\x02\u01DC\u01DD\x05z>\x02\u01DD\u01E7\x03\x02\x02\x02" +
		"\u01DE\u01DF\x07L\x02\x02\u01DF\u01E0\x07M\x02\x02\u01E0\u01E1\x05p9\x02" +
		"\u01E1\u01E2\x07\x13\x02\x02\u01E2\u01E3\x05z>\x02\u01E3\u01E4\x07N\x02" +
		"\x02\u01E4\u01E5\x05j6\x02\u01E5\u01E7\x03\x02\x02\x02\u01E6\u01C9\x03" +
		"\x02\x02\x02\u01E6\u01CD\x03\x02\x02\x02\u01E6\u01D2\x03\x02\x02\x02\u01E6" +
		"\u01D7\x03\x02\x02\x02\u01E6\u01DE\x03\x02\x02\x02\u01E7c\x03\x02\x02" +
		"\x02\u01E8\u01E9\x07*\x02\x02\u01E9\u01EA\x05z>\x02\u01EA\u01EB\x07\x11" +
		"\x02\x02\u01EB\u01EC\x05v<\x02\u01EC\u01F3\x03\x02\x02\x02\u01ED\u01EE" +
		"\x07*\x02\x02\u01EE\u01EF\x05z>\x02\u01EF\u01F0\x07\x11\x02\x02\u01F0" +
		"\u01F1\x05T+\x02\u01F1\u01F3\x03\x02\x02\x02\u01F2\u01E8\x03\x02\x02\x02" +
		"\u01F2\u01ED\x03\x02\x02\x02\u01F3e\x03\x02\x02\x02\u01F4\u01F6\x05d3" +
		"\x02\u01F5\u01F4\x03\x02\x02\x02\u01F6\u01F9\x03\x02\x02\x02\u01F7\u01F5" +
		"\x03\x02\x02\x02\u01F7\u01F8\x03\x02\x02\x02\u01F8g\x03\x02\x02\x02\u01F9" +
		"\u01F7\x03\x02\x02\x02\u01FA\u01FB\x07<\x02\x02\u01FB\u0203\x07G\x02\x02" +
		"\u01FC\u01FD\x07<\x02\x02\u01FD\u01FE\x07O\x02\x02\u01FE\u0203\x07\x1B" +
		"\x02\x02\u01FF\u0200\x07F\x02\x02\u0200\u0201\x07O\x02\x02\u0201\u0203" +
		"\x07$\x02\x02\u0202\u01FA\x03\x02\x02\x02\u0202\u01FC\x03\x02\x02\x02" +
		"\u0202\u01FF\x03\x02\x02\x02\u0203i\x03\x02\x02\x02\u0204\u022E\x07n\x02" +
		"\x02\u0205\u022E\x05z>\x02\u0206\u0207\x07/\x02\x02\u0207\u0208\x05j6" +
		"\x02\u0208\u0209\x070\x02\x02\u0209\u022E\x03\x02\x02\x02\u020A\u022E" +
		"\x05T+\x02\u020B\u020C\x07P\x02\x02\u020C\u020D\x05p9\x02\u020D\u020E" +
		"\x07I\x02\x02\u020E\u020F\x07\x17\x02\x02\u020F\u022E\x03\x02\x02\x02" +
		"\u0210\u0211\x07P\x02\x02\u0211\u0212\x05l7\x02\u0212\u0213\x07I\x02\x02" +
		"\u0213\u0214\x07\x17\x02\x02\u0214\u022E\x03\x02\x02\x02\u0215\u0216\x07" +
		"Q\x02\x02\u0216\u0217\x05j6\x02\u0217\u0218\x07\x13\x02\x02\u0218\u0219" +
		"\x05t;\x02\u0219\u022E\x03\x02\x02\x02\u021A\u021B\x07R\x02\x02\u021B" +
		"\u021C\x05j6\x02\u021C\u021D\x05j6\x02\u021D\u022E\x03\x02\x02\x02\u021E" +
		"\u021F\x07S\x02\x02\u021F\u0220\x05p9\x02\u0220\u0221\x07\x13\x02\x02" +
		"\u0221";
	private static readonly _serializedATNSegment1: string =
		"\u0222\x05j6\x02\u0222\u022E\x03\x02\x02\x02\u0223\u0224\x07M\x02\x02" +
		"\u0224\u0225\x05p9\x02\u0225\u0226\x07\x13\x02\x02\u0226\u0227\x05z>\x02" +
		"\u0227\u022E\x03\x02\x02\x02\u0228\u0229\x07T\x02\x02\u0229\u022A\x07" +
		"n\x02\x02\u022A\u022B\x07U\x02\x02\u022B\u022E\x05j6\x02\u022C\u022E\x07" +
		"V\x02\x02\u022D\u0204\x03\x02\x02\x02\u022D\u0205\x03\x02\x02\x02\u022D" +
		"\u0206\x03\x02\x02\x02\u022D\u020A\x03\x02\x02\x02\u022D\u020B\x03\x02" +
		"\x02\x02\u022D\u0210\x03\x02\x02\x02\u022D\u0215\x03\x02\x02\x02\u022D" +
		"\u021A\x03\x02\x02\x02\u022D\u021E\x03\x02\x02\x02\u022D\u0223\x03\x02" +
		"\x02\x02\u022D\u0228\x03\x02\x02\x02\u022D\u022C\x03\x02\x02\x02\u022E" +
		"k\x03\x02\x02\x02\u022F\u0230\b7\x01\x02\u0230\u0261\x07l\x02\x02\u0231" +
		"\u0261\x05z>\x02\u0232\u0233\x07/\x02\x02\u0233\u0234\x05l7\x02\u0234" +
		"\u0235\x070\x02\x02\u0235\u0261\x03\x02\x02\x02\u0236\u0261\x05T+\x02" +
		"\u0237\u0238\x07P\x02\x02\u0238\u0239\x05p9\x02\u0239\u023A\x07I\x02\x02" +
		"\u023A\u023B\x07\x16\x02\x02\u023B\u0261\x03\x02\x02\x02\u023C\u023D\x07" +
		"P\x02\x02\u023D\u023E\x05j6\x02\u023E\u023F\x07I\x02\x02\u023F\u0240\x07" +
		"\x16\x02\x02\u0240\u0261\x03\x02\x02\x02\u0241\u0242\x07W\x02\x02\u0242" +
		"\u0261\x05l7\r\u0243\u0244\x05n8\x02\u0244\u0245\x07Y\x02\x02\u0245\u0246" +
		"\x05n8\x02\u0246\u0261\x03\x02\x02\x02\u0247\u0248\x05n8\x02\u0248\u0249" +
		"\x07Z\x02\x02\u0249\u024A\x05n8\x02\u024A\u0261\x03\x02\x02\x02\u024B" +
		"\u024C\x05n8\x02\u024C\u024D\x07[\x02\x02\u024D\u024E\x05n8\x02\u024E" +
		"\u0261\x03\x02\x02\x02\u024F\u0250\x05n8\x02\u0250\u0251\x07\\\x02\x02" +
		"\u0251\u0252\x05n8\x02\u0252\u0261\x03\x02\x02\x02\u0253\u0254\x05n8\x02" +
		"\u0254\u0255\x07]\x02\x02\u0255\u0256\x05n8\x02\u0256\u0261\x03\x02\x02" +
		"\x02\u0257\u0258\x05j6\x02\u0258\u0259\x07^\x02\x02\u0259\u025A\x05j6" +
		"\x02\u025A\u0261\x03\x02\x02\x02\u025B\u025C\x07T\x02\x02\u025C\u025D" +
		"\x07l\x02\x02\u025D\u025E\x07U\x02\x02\u025E\u0261\x05l7\x04\u025F\u0261" +
		"\x07_\x02\x02\u0260\u022F\x03\x02\x02\x02\u0260\u0231\x03\x02\x02\x02" +
		"\u0260\u0232\x03\x02\x02\x02\u0260\u0236\x03\x02\x02\x02\u0260\u0237\x03" +
		"\x02\x02\x02\u0260\u023C\x03\x02\x02\x02\u0260\u0241\x03\x02\x02\x02\u0260" +
		"\u0243\x03\x02\x02\x02\u0260\u0247\x03\x02\x02\x02\u0260\u024B\x03\x02" +
		"\x02\x02\u0260\u024F\x03\x02\x02\x02\u0260\u0253\x03\x02\x02\x02\u0260" +
		"\u0257\x03\x02\x02\x02\u0260\u025B\x03\x02\x02\x02\u0260\u025F\x03\x02" +
		"\x02\x02\u0261\u026A\x03\x02\x02\x02\u0262\u0263\f\f\x02\x02\u0263\u0264" +
		"\x07A\x02\x02\u0264\u0269\x05l7\r\u0265\u0266\f\v\x02\x02\u0266\u0267" +
		"\x07X\x02\x02\u0267\u0269\x05l7\f\u0268\u0262\x03\x02\x02\x02\u0268\u0265" +
		"\x03\x02\x02\x02\u0269\u026C\x03\x02\x02\x02\u026A\u0268\x03\x02\x02\x02" +
		"\u026A\u026B\x03\x02\x02\x02\u026Bm\x03\x02\x02\x02\u026C\u026A\x03\x02" +
		"\x02\x02\u026D\u0270\x05p9\x02\u026E\u0270\x05j6\x02\u026F\u026D\x03\x02" +
		"\x02\x02\u026F\u026E\x03\x02\x02\x02\u0270o\x03\x02\x02\x02\u0271\u0272" +
		"\b9\x01\x02\u0272\u02A7\x05~@\x02\u0273\u02A7\x05z>\x02\u0274\u0275\x07" +
		"/\x02\x02\u0275\u0276\x05p9\x02\u0276\u0277\x070\x02\x02\u0277\u02A7\x03" +
		"\x02\x02\x02\u0278\u02A7\x05T+\x02\u0279\u027A\x07P\x02\x02\u027A\u027B" +
		"\x05j6\x02\u027B\u027C\x07I\x02\x02\u027C\u027D\x07\x15\x02\x02\u027D" +
		"\u02A7\x03\x02\x02\x02\u027E\u027F\x07P\x02\x02\u027F\u0280\x05j6\x02" +
		"\u0280\u0281\x07I\x02\x02\u0281\u0282\x07\x14\x02\x02\u0282\u02A7\x03" +
		"\x02\x02\x02\u0283\u0284\x07P\x02\x02\u0284\u0285\x05l7\x02\u0285\u0286" +
		"\x07I\x02\x02\u0286\u0287\x07\x14\x02\x02\u0287\u02A7\x03\x02\x02\x02" +
		"\u0288\u0289\x07P\x02\x02\u0289\u028A\x05p9\x02\u028A\u028B\x07I\x02\x02" +
		"\u028B\u028C\x07\x15\x02\x02\u028C\u02A7\x03\x02\x02\x02\u028D\u028E\x07" +
		"P\x02\x02\u028E\u028F\x05p9\x02\u028F\u0290\x07I\x02\x02\u0290\u0291\x07" +
		"\x14\x02\x02\u0291\u02A7\x03\x02\x02\x02\u0292\u02A7\x07C\x02\x02\u0293" +
		"\u0294\x07`\x02\x02\u0294\u0295\x07\x13\x02\x02\u0295\u02A7\x05j6\x02" +
		"\u0296\u0297\x07`\x02\x02\u0297\u0298\x07\x13\x02\x02\u0298\u0299\x07" +
		"\x12\x02\x02\u0299\u02A7\x05z>\x02\u029A\u029B\x07a\x02\x02\u029B\u029C" +
		"\x07\x13\x02\x02\u029C\u029D\x05v<\x02\u029D\u029E\x07)\x02\x02\u029E" +
		"\u029F\x05z>\x02\u029F\u02A7\x03\x02\x02\x02\u02A0\u02A1\x07T\x02\x02" +
		"\u02A1\u02A2\x05~@\x02\u02A2\u02A3\x07U\x02\x02\u02A3\u02A4\x05p9\x04" +
		"\u02A4\u02A7\x03\x02\x02\x02\u02A5\u02A7\x07f\x02\x02\u02A6\u0271\x03" +
		"\x02\x02\x02\u02A6\u0273\x03\x02\x02\x02\u02A6\u0274\x03\x02\x02\x02\u02A6" +
		"\u0278\x03\x02\x02\x02\u02A6\u0279\x03\x02\x02\x02\u02A6\u027E\x03\x02" +
		"\x02\x02\u02A6\u0283\x03\x02\x02\x02\u02A6\u0288\x03\x02\x02\x02\u02A6" +
		"\u028D\x03\x02\x02\x02\u02A6\u0292\x03\x02\x02\x02\u02A6\u0293\x03\x02" +
		"\x02\x02\u02A6\u0296\x03\x02\x02\x02\u02A6\u029A\x03\x02\x02\x02\u02A6" +
		"\u02A0\x03\x02\x02\x02\u02A6\u02A5\x03\x02\x02\x02\u02A7\u02B9\x03\x02" +
		"\x02\x02\u02A8\u02A9\f\t\x02\x02\u02A9\u02AA\x07\x07\x02\x02\u02AA\u02B8" +
		"\x05p9\n\u02AB\u02AC\f\b\x02\x02\u02AC\u02AD\x07b\x02\x02\u02AD\u02B8" +
		"\x05p9\t\u02AE\u02AF\f\x07\x02\x02\u02AF\u02B0\x07c\x02\x02\u02B0\u02B8" +
		"\x05p9\b\u02B1\u02B2\f\x06\x02\x02\u02B2\u02B3\x07d\x02\x02\u02B3\u02B8" +
		"\x05p9\x07\u02B4\u02B5\f\x05\x02\x02\u02B5\u02B6\x07e\x02\x02\u02B6\u02B8" +
		"\x05p9\x06\u02B7\u02A8\x03\x02\x02\x02\u02B7\u02AB\x03\x02\x02\x02\u02B7" +
		"\u02AE\x03\x02\x02\x02\u02B7\u02B1\x03\x02\x02\x02\u02B7\u02B4\x03\x02" +
		"\x02\x02\u02B8\u02BB\x03\x02\x02\x02\u02B9\u02B7\x03\x02\x02\x02\u02B9" +
		"\u02BA\x03\x02\x02\x02\u02BAq\x03\x02\x02\x02\u02BB\u02B9\x03\x02\x02" +
		"\x02\u02BC\u02C2\x05z>\x02\u02BD\u02BE\x07\x19\x02\x02\u02BE\u02BF\x05" +
		"X-\x02\u02BF\u02C0\x07\x1A\x02\x02\u02C0\u02C2\x03\x02\x02\x02\u02C1\u02BC" +
		"\x03\x02\x02\x02\u02C1\u02BD\x03\x02\x02\x02\u02C2s\x03\x02\x02\x02\u02C3" +
		"\u02D2\x05z>\x02\u02C4\u02C5\x07g\x02\x02\u02C5\u02C6\x07\f\x02\x02\u02C6" +
		"\u02D2\x05j6\x02\u02C7\u02C8\x07h\x02\x02\u02C8\u02C9\x07$\x02\x02\u02C9" +
		"\u02CA\x07\x13\x02\x02\u02CA\u02D2\x05t;\x02\u02CB\u02CC\x07h\x02\x02" +
		"\u02CC\u02CD\x07\f\x02\x02\u02CD\u02CE\x05j6\x02\u02CE\u02CF\x07\x11\x02" +
		"\x02\u02CF\u02D0\x05|?\x02\u02D0\u02D2\x03\x02\x02\x02\u02D1\u02C3\x03" +
		"\x02\x02\x02\u02D1\u02C4\x03\x02\x02\x02\u02D1\u02C7\x03\x02\x02\x02\u02D1" +
		"\u02CB\x03\x02\x02\x02\u02D2u\x03\x02\x02\x02\u02D3\u02DA\x05j6\x02\u02D4" +
		"\u02DA\x05p9\x02\u02D5\u02DA\x05l7\x02\u02D6\u02DA\x05r:\x02\u02D7\u02DA" +
		"\x05t;\x02\u02D8\u02DA\x05x=\x02\u02D9\u02D3\x03\x02\x02\x02\u02D9\u02D4" +
		"\x03\x02\x02\x02\u02D9\u02D5\x03\x02\x02\x02\u02D9\u02D6\x03\x02\x02\x02" +
		"\u02D9\u02D7\x03\x02\x02\x02\u02D9\u02D8\x03\x02\x02\x02\u02DAw\x03\x02" +
		"\x02\x02\u02DB\u02DC\x07i\x02\x02\u02DCy\x03\x02\x02\x02\u02DD\u02E3\x05" +
		"|?\x02\u02DE\u02DF\x05|?\x02\u02DF\u02E0\x07j\x02\x02\u02E0\u02E1\x05" +
		"|?\x02\u02E1\u02E3\x03\x02\x02\x02\u02E2\u02DD\x03\x02\x02\x02\u02E2\u02DE" +
		"\x03\x02\x02\x02\u02E3{\x03\x02\x02\x02\u02E4\u02E8\x07o\x02\x02\u02E5" +
		"\u02E6\x07k\x02\x02\u02E6\u02E8\x07n\x02\x02\u02E7\u02E4\x03\x02\x02\x02" +
		"\u02E7\u02E5\x03\x02\x02\x02\u02E8}\x03\x02\x02\x02\u02E9\u02EC\x07p\x02" +
		"\x02\u02EA\u02EC\x07q\x02\x02\u02EB\u02E9\x03\x02\x02\x02\u02EB\u02EA" +
		"\x03\x02\x02\x02\u02EC\x7F\x03\x02\x02\x02\u02ED\u02EE\x07n\x02\x02\u02EE" +
		"\x81\x03\x02\x02\x02\u02EF\u02F6\x05j6\x02\u02F0\u02F1\x05j6\x02\u02F1" +
		"\u02F2\x05V,\x02\u02F2\u02F3\x07I\x02\x02\u02F3\u02F4\x07n\x02\x02\u02F4" +
		"\u02F6\x03\x02\x02\x02\u02F5\u02EF\x03\x02\x02\x02\u02F5\u02F0\x03\x02" +
		"\x02\x02\u02F6\x83\x03\x02\x02\x024\x8F\x99\x9E\xAE\xB2\xB6\xC4\xC9\xD4" +
		"\xDC\xE7\xF3\xF9\u0110\u0115\u011A\u0129\u0131\u0136\u013B\u014D\u0151" +
		"\u0156\u0160\u0168\u0175\u0191\u0195\u01A2\u01A8\u01C7\u01E6\u01F2\u01F7" +
		"\u0202\u022D\u0260\u0268\u026A\u026F\u02A6\u02B7\u02B9\u02C1\u02D1\u02D9" +
		"\u02E2\u02E7\u02EB\u02F5";
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
	public EOF(): TerminalNode { return this.getToken(ScratchParser.EOF, 0); }
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
export class ActorTypeContext extends TypeContext {
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterActorType) {
			listener.enterActorType(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitActorType) {
			listener.exitActorType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitActorType) {
			return visitor.visitActorType(this);
		} else {
			return visitor.visitChildren(this);
		}
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
export class IntegerTypeContext extends PrimitiveTypeContext {
	constructor(ctx: PrimitiveTypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterIntegerType) {
			listener.enterIntegerType(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitIntegerType) {
			listener.exitIntegerType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitIntegerType) {
			return visitor.visitIntegerType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FloatingPointTypeContext extends PrimitiveTypeContext {
	constructor(ctx: PrimitiveTypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterFloatingPointType) {
			listener.enterFloatingPointType(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitFloatingPointType) {
			listener.exitFloatingPointType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitFloatingPointType) {
			return visitor.visitFloatingPointType(this);
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


export class ScriptContext extends ParserRuleContext {
	public event(): EventContext {
		return this.getRuleContext(0, EventContext);
	}
	public scriptAttributeList(): ScriptAttributeListContext {
		return this.getRuleContext(0, ScriptAttributeListContext);
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


export class ScriptAttributeListContext extends ParserRuleContext {
	public scriptAttribute(): ScriptAttributeContext[];
	public scriptAttribute(i: number): ScriptAttributeContext;
	public scriptAttribute(i?: number): ScriptAttributeContext | ScriptAttributeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ScriptAttributeContext);
		} else {
			return this.getRuleContext(i, ScriptAttributeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_scriptAttributeList; }
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterScriptAttributeList) {
			listener.enterScriptAttributeList(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitScriptAttributeList) {
			listener.exitScriptAttributeList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitScriptAttributeList) {
			return visitor.visitScriptAttributeList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ScriptAttributeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_scriptAttribute; }
	public copyFrom(ctx: ScriptAttributeContext): void {
		super.copyFrom(ctx);
	}
}
export class RestartScriptContext extends ScriptAttributeContext {
	constructor(ctx: ScriptAttributeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterRestartScript) {
			listener.enterRestartScript(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitRestartScript) {
			listener.exitRestartScript(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitRestartScript) {
			return visitor.visitRestartScript(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EventContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_event; }
	public copyFrom(ctx: EventContext): void {
		super.copyFrom(ctx);
	}
}
export class NeverEventContext extends EventContext {
	constructor(ctx: EventContext) {
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
export class BootstapEventContext extends EventContext {
	constructor(ctx: EventContext) {
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
export class AfterBootstrapMonitoringEventContext extends EventContext {
	constructor(ctx: EventContext) {
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
export class StartupEventContext extends EventContext {
	constructor(ctx: EventContext) {
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
export class CloneStartEventContext extends EventContext {
	constructor(ctx: EventContext) {
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
export class MessageReceivedEventContext extends EventContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	public parameterList(): ParameterListContext {
		return this.getRuleContext(0, ParameterListContext);
	}
	public messageNamespace(): MessageNamespaceContext {
		return this.getRuleContext(0, MessageNamespaceContext);
	}
	constructor(ctx: EventContext) {
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
export class ConditionReachedEventContext extends EventContext {
	public boolExpr(): BoolExprContext {
		return this.getRuleContext(0, BoolExprContext);
	}
	constructor(ctx: EventContext) {
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
export class RenderedMonitoringEventContext extends EventContext {
	constructor(ctx: EventContext) {
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
export class AfterStatementMonitoringEventContext extends EventContext {
	constructor(ctx: EventContext) {
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


export class MessageNamespaceContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_messageNamespace; }
	public copyFrom(ctx: MessageNamespaceContext): void {
		super.copyFrom(ctx);
	}
}
export class MessageNameSpaceContext extends MessageNamespaceContext {
	public String(): TerminalNode { return this.getToken(ScratchParser.String, 0); }
	constructor(ctx: MessageNamespaceContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterMessageNameSpace) {
			listener.enterMessageNameSpace(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitMessageNameSpace) {
			listener.exitMessageNameSpace(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitMessageNameSpace) {
			return visitor.visitMessageNameSpace(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GlobalNameSpaceContext extends MessageNamespaceContext {
	constructor(ctx: MessageNamespaceContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterGlobalNameSpace) {
			listener.enterGlobalNameSpace(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitGlobalNameSpace) {
			listener.exitGlobalNameSpace(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitGlobalNameSpace) {
			return visitor.visitGlobalNameSpace(this);
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


export class MethodDefinitionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_methodDefinition; }
	public copyFrom(ctx: MethodDefinitionContext): void {
		super.copyFrom(ctx);
	}
}
export class FullMethodDefinitionContext extends MethodDefinitionContext {
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
	constructor(ctx: MethodDefinitionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterFullMethodDefinition) {
			listener.enterFullMethodDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitFullMethodDefinition) {
			listener.exitFullMethodDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitFullMethodDefinition) {
			return visitor.visitFullMethodDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExternMethodDefinitionContext extends MethodDefinitionContext {
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	public parameterList(): ParameterListContext {
		return this.getRuleContext(0, ParameterListContext);
	}
	public externMethodResultDeclaration(): ExternMethodResultDeclarationContext {
		return this.getRuleContext(0, ExternMethodResultDeclarationContext);
	}
	constructor(ctx: MethodDefinitionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
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
	public copyFrom(ctx: MethodAttributeContext): void {
		super.copyFrom(ctx);
	}
}
export class AtomicMethodContext extends MethodAttributeContext {
	constructor(ctx: MethodAttributeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterAtomicMethod) {
			listener.enterAtomicMethod(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitAtomicMethod) {
			listener.exitAtomicMethod(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitAtomicMethod) {
			return visitor.visitAtomicMethod(this);
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_elseCase; }
	public copyFrom(ctx: ElseCaseContext): void {
		super.copyFrom(ctx);
	}
}
export class PureElseContext extends ElseCaseContext {
	public stmtList(): StmtListContext {
		return this.getRuleContext(0, StmtListContext);
	}
	constructor(ctx: ElseCaseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterPureElse) {
			listener.enterPureElse(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitPureElse) {
			listener.exitPureElse(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitPureElse) {
			return visitor.visitPureElse(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ElseIfCaseContext extends ElseCaseContext {
	public ifStmt(): IfStmtContext {
		return this.getRuleContext(0, IfStmtContext);
	}
	constructor(ctx: ElseCaseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterElseIfCase) {
			listener.enterElseIfCase(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitElseIfCase) {
			listener.exitElseIfCase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitElseIfCase) {
			return visitor.visitElseIfCase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EmptyElseCaseContext extends ElseCaseContext {
	constructor(ctx: ElseCaseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterEmptyElseCase) {
			listener.enterEmptyElseCase(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitEmptyElseCase) {
			listener.exitEmptyElseCase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitEmptyElseCase) {
			return visitor.visitEmptyElseCase(this);
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_stringExpr; }
	public copyFrom(ctx: StringExprContext): void {
		super.copyFrom(ctx);
	}
}
export class StringLiteralExpressionContext extends StringExprContext {
	public String(): TerminalNode { return this.getToken(ScratchParser.String, 0); }
	constructor(ctx: StringExprContext) {
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
export class StringVariableExpressionContext extends StringExprContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: StringExprContext) {
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
export class StringParanthExpressionContext extends StringExprContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: StringExprContext) {
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
export class StringCallStatementExpressionContext extends StringExprContext {
	public callStmt(): CallStmtContext {
		return this.getRuleContext(0, CallStmtContext);
	}
	constructor(ctx: StringExprContext) {
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
export class NumAsStringExpressionContext extends StringExprContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	constructor(ctx: StringExprContext) {
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
export class BoolAsStringExpressionContext extends StringExprContext {
	public boolExpr(): BoolExprContext {
		return this.getRuleContext(0, BoolExprContext);
	}
	constructor(ctx: StringExprContext) {
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
export class StringAttributeOfExpressionContext extends StringExprContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	public actorExpr(): ActorExprContext {
		return this.getRuleContext(0, ActorExprContext);
	}
	constructor(ctx: StringExprContext) {
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
export class JoinStringsExpressionContext extends StringExprContext {
	public stringExpr(): StringExprContext[];
	public stringExpr(i: number): StringExprContext;
	public stringExpr(i?: number): StringExprContext | StringExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StringExprContext);
		} else {
			return this.getRuleContext(i, StringExprContext);
		}
	}
	constructor(ctx: StringExprContext) {
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
export class IthLetterOfStringExpressionContext extends StringExprContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: StringExprContext) {
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
export class IthStringItemOfExpressionContext extends StringExprContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: StringExprContext) {
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
export class DefaultStringExpressionContext extends StringExprContext {
	public String(): TerminalNode { return this.getToken(ScratchParser.String, 0); }
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: StringExprContext) {
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
export class UnspecifiedStringExpressionContext extends StringExprContext {
	constructor(ctx: StringExprContext) {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_boolExpr; }
	public copyFrom(ctx: BoolExprContext): void {
		super.copyFrom(ctx);
	}
}
export class BoolLiteralExpressionContext extends BoolExprContext {
	public Boolean(): TerminalNode { return this.getToken(ScratchParser.Boolean, 0); }
	constructor(ctx: BoolExprContext) {
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
export class BoolVariableExpressionContext extends BoolExprContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: BoolExprContext) {
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
export class BoolParanthExpressionContext extends BoolExprContext {
	public boolExpr(): BoolExprContext {
		return this.getRuleContext(0, BoolExprContext);
	}
	constructor(ctx: BoolExprContext) {
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
export class BoolCallStatementExpressionContext extends BoolExprContext {
	public callStmt(): CallStmtContext {
		return this.getRuleContext(0, CallStmtContext);
	}
	constructor(ctx: BoolExprContext) {
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
export class NumAsBoolExpressionContext extends BoolExprContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	constructor(ctx: BoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumAsBoolExpression) {
			listener.enterNumAsBoolExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumAsBoolExpression) {
			listener.exitNumAsBoolExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumAsBoolExpression) {
			return visitor.visitNumAsBoolExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringAsBoolExpressionContext extends BoolExprContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: BoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStringAsBoolExpression) {
			listener.enterStringAsBoolExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStringAsBoolExpression) {
			listener.exitStringAsBoolExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStringAsBoolExpression) {
			return visitor.visitStringAsBoolExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NegatedBoolExpressionContext extends BoolExprContext {
	public boolExpr(): BoolExprContext {
		return this.getRuleContext(0, BoolExprContext);
	}
	constructor(ctx: BoolExprContext) {
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
export class BoolAndExpressionContext extends BoolExprContext {
	public boolExpr(): BoolExprContext[];
	public boolExpr(i: number): BoolExprContext;
	public boolExpr(i?: number): BoolExprContext | BoolExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BoolExprContext);
		} else {
			return this.getRuleContext(i, BoolExprContext);
		}
	}
	constructor(ctx: BoolExprContext) {
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
export class BoolOrExpressionContext extends BoolExprContext {
	public boolExpr(): BoolExprContext[];
	public boolExpr(i: number): BoolExprContext;
	public boolExpr(i?: number): BoolExprContext | BoolExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BoolExprContext);
		} else {
			return this.getRuleContext(i, BoolExprContext);
		}
	}
	constructor(ctx: BoolExprContext) {
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
export class GreaterEqualExpressionContext extends BoolExprContext {
	public numOrStringExpr(): NumOrStringExprContext[];
	public numOrStringExpr(i: number): NumOrStringExprContext;
	public numOrStringExpr(i?: number): NumOrStringExprContext | NumOrStringExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumOrStringExprContext);
		} else {
			return this.getRuleContext(i, NumOrStringExprContext);
		}
	}
	constructor(ctx: BoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterGreaterEqualExpression) {
			listener.enterGreaterEqualExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitGreaterEqualExpression) {
			listener.exitGreaterEqualExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitGreaterEqualExpression) {
			return visitor.visitGreaterEqualExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GreaterThanExpressionContext extends BoolExprContext {
	public numOrStringExpr(): NumOrStringExprContext[];
	public numOrStringExpr(i: number): NumOrStringExprContext;
	public numOrStringExpr(i?: number): NumOrStringExprContext | NumOrStringExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumOrStringExprContext);
		} else {
			return this.getRuleContext(i, NumOrStringExprContext);
		}
	}
	constructor(ctx: BoolExprContext) {
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
export class LessThanExpressionContext extends BoolExprContext {
	public numOrStringExpr(): NumOrStringExprContext[];
	public numOrStringExpr(i: number): NumOrStringExprContext;
	public numOrStringExpr(i?: number): NumOrStringExprContext | NumOrStringExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumOrStringExprContext);
		} else {
			return this.getRuleContext(i, NumOrStringExprContext);
		}
	}
	constructor(ctx: BoolExprContext) {
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
export class LessEqualExpressionContext extends BoolExprContext {
	public numOrStringExpr(): NumOrStringExprContext[];
	public numOrStringExpr(i: number): NumOrStringExprContext;
	public numOrStringExpr(i?: number): NumOrStringExprContext | NumOrStringExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumOrStringExprContext);
		} else {
			return this.getRuleContext(i, NumOrStringExprContext);
		}
	}
	constructor(ctx: BoolExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterLessEqualExpression) {
			listener.enterLessEqualExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitLessEqualExpression) {
			listener.exitLessEqualExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitLessEqualExpression) {
			return visitor.visitLessEqualExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqualsExpressionContext extends BoolExprContext {
	public numOrStringExpr(): NumOrStringExprContext[];
	public numOrStringExpr(i: number): NumOrStringExprContext;
	public numOrStringExpr(i?: number): NumOrStringExprContext | NumOrStringExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumOrStringExprContext);
		} else {
			return this.getRuleContext(i, NumOrStringExprContext);
		}
	}
	constructor(ctx: BoolExprContext) {
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
export class StrContainsExpressionContext extends BoolExprContext {
	public stringExpr(): StringExprContext[];
	public stringExpr(i: number): StringExprContext;
	public stringExpr(i?: number): StringExprContext | StringExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StringExprContext);
		} else {
			return this.getRuleContext(i, StringExprContext);
		}
	}
	constructor(ctx: BoolExprContext) {
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
export class DefaultBoolExpressionContext extends BoolExprContext {
	public Boolean(): TerminalNode { return this.getToken(ScratchParser.Boolean, 0); }
	public boolExpr(): BoolExprContext {
		return this.getRuleContext(0, BoolExprContext);
	}
	constructor(ctx: BoolExprContext) {
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
export class UnspecifiedBoolExpressionContext extends BoolExprContext {
	constructor(ctx: BoolExprContext) {
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


export class NumExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_numExpr; }
	public copyFrom(ctx: NumExprContext): void {
		super.copyFrom(ctx);
	}
}
export class NumLiteralExpressionContext extends NumExprContext {
	public number(): NumberContext {
		return this.getRuleContext(0, NumberContext);
	}
	constructor(ctx: NumExprContext) {
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
export class NumVariableExpressionContext extends NumExprContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: NumExprContext) {
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
export class NumBracketsContext extends NumExprContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	constructor(ctx: NumExprContext) {
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
export class NumCallStatementExpressionContext extends NumExprContext {
	public callStmt(): CallStmtContext {
		return this.getRuleContext(0, CallStmtContext);
	}
	constructor(ctx: NumExprContext) {
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
export class StringToFloatExpressionContext extends NumExprContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: NumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStringToFloatExpression) {
			listener.enterStringToFloatExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStringToFloatExpression) {
			listener.exitStringToFloatExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStringToFloatExpression) {
			return visitor.visitStringToFloatExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringToIntExpressionContext extends NumExprContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: NumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStringToIntExpression) {
			listener.enterStringToIntExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStringToIntExpression) {
			listener.exitStringToIntExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStringToIntExpression) {
			return visitor.visitStringToIntExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BoolToIntExpressionContext extends NumExprContext {
	public boolExpr(): BoolExprContext {
		return this.getRuleContext(0, BoolExprContext);
	}
	constructor(ctx: NumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterBoolToIntExpression) {
			listener.enterBoolToIntExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitBoolToIntExpression) {
			listener.exitBoolToIntExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitBoolToIntExpression) {
			return visitor.visitBoolToIntExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumToFloatExpressionContext extends NumExprContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	constructor(ctx: NumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumToFloatExpression) {
			listener.enterNumToFloatExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumToFloatExpression) {
			listener.exitNumToFloatExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumToFloatExpression) {
			return visitor.visitNumToFloatExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumToIntExpressionContext extends NumExprContext {
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	constructor(ctx: NumExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterNumToIntExpression) {
			listener.enterNumToIntExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitNumToIntExpression) {
			listener.exitNumToIntExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitNumToIntExpression) {
			return visitor.visitNumToIntExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TimerExpressionContext extends NumExprContext {
	constructor(ctx: NumExprContext) {
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
export class LengthOfStringExpressionContext extends NumExprContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: NumExprContext) {
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
export class LengthOfListExpressionContext extends NumExprContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: NumExprContext) {
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
export class IndexOfExpressionContext extends NumExprContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: NumExprContext) {
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
export class NumMulExpressionContext extends NumExprContext {
	public numExpr(): NumExprContext[];
	public numExpr(i: number): NumExprContext;
	public numExpr(i?: number): NumExprContext | NumExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumExprContext);
		} else {
			return this.getRuleContext(i, NumExprContext);
		}
	}
	constructor(ctx: NumExprContext) {
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
export class NumDivExpressionContext extends NumExprContext {
	public numExpr(): NumExprContext[];
	public numExpr(i: number): NumExprContext;
	public numExpr(i?: number): NumExprContext | NumExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumExprContext);
		} else {
			return this.getRuleContext(i, NumExprContext);
		}
	}
	constructor(ctx: NumExprContext) {
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
export class NumModExpressionContext extends NumExprContext {
	public numExpr(): NumExprContext[];
	public numExpr(i: number): NumExprContext;
	public numExpr(i?: number): NumExprContext | NumExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumExprContext);
		} else {
			return this.getRuleContext(i, NumExprContext);
		}
	}
	constructor(ctx: NumExprContext) {
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
export class NumPlusExpressionContext extends NumExprContext {
	public numExpr(): NumExprContext[];
	public numExpr(i: number): NumExprContext;
	public numExpr(i?: number): NumExprContext | NumExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumExprContext);
		} else {
			return this.getRuleContext(i, NumExprContext);
		}
	}
	constructor(ctx: NumExprContext) {
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
export class NumMinusExpressionContext extends NumExprContext {
	public numExpr(): NumExprContext[];
	public numExpr(i: number): NumExprContext;
	public numExpr(i?: number): NumExprContext | NumExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumExprContext);
		} else {
			return this.getRuleContext(i, NumExprContext);
		}
	}
	constructor(ctx: NumExprContext) {
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
export class DefaultNumExprContext extends NumExprContext {
	public number(): NumberContext {
		return this.getRuleContext(0, NumberContext);
	}
	public numExpr(): NumExprContext {
		return this.getRuleContext(0, NumExprContext);
	}
	constructor(ctx: NumExprContext) {
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
export class UnspecifiedNumExprContext extends NumExprContext {
	constructor(ctx: NumExprContext) {
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


export class ActorExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_actorExpr; }
	public copyFrom(ctx: ActorExprContext): void {
		super.copyFrom(ctx);
	}
}
export class ActorVariableExpressionContext extends ActorExprContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: ActorExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterActorVariableExpression) {
			listener.enterActorVariableExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitActorVariableExpression) {
			listener.exitActorVariableExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitActorVariableExpression) {
			return visitor.visitActorVariableExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LocateActorExpressionContext extends ActorExprContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: ActorExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterLocateActorExpression) {
			listener.enterLocateActorExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitLocateActorExpression) {
			listener.exitLocateActorExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitLocateActorExpression) {
			return visitor.visitLocateActorExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StartCloneActorExpressionContext extends ActorExprContext {
	public actorExpr(): ActorExprContext {
		return this.getRuleContext(0, ActorExprContext);
	}
	constructor(ctx: ActorExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterStartCloneActorExpression) {
			listener.enterStartCloneActorExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitStartCloneActorExpression) {
			listener.exitStartCloneActorExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitStartCloneActorExpression) {
			return visitor.visitStartCloneActorExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UsherActorExpressionContext extends ActorExprContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	public ident(): IdentContext {
		return this.getRuleContext(0, IdentContext);
	}
	constructor(ctx: ActorExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterUsherActorExpression) {
			listener.enterUsherActorExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitUsherActorExpression) {
			listener.exitUsherActorExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitUsherActorExpression) {
			return visitor.visitUsherActorExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
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
	public actorExpr(): ActorExprContext | undefined {
		return this.tryGetRuleContext(0, ActorExprContext);
	}
	public unspecifiedExpr(): UnspecifiedExprContext | undefined {
		return this.tryGetRuleContext(0, UnspecifiedExprContext);
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ScratchParser.RULE_number; }
	public copyFrom(ctx: NumberContext): void {
		super.copyFrom(ctx);
	}
}
export class IntegerLiteralExpressionContext extends NumberContext {
	public IntegerLiteral(): TerminalNode { return this.getToken(ScratchParser.IntegerLiteral, 0); }
	constructor(ctx: NumberContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterIntegerLiteralExpression) {
			listener.enterIntegerLiteralExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitIntegerLiteralExpression) {
			listener.exitIntegerLiteralExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitIntegerLiteralExpression) {
			return visitor.visitIntegerLiteralExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DecimalLiteralExpressionContext extends NumberContext {
	public DecimalLiteral(): TerminalNode { return this.getToken(ScratchParser.DecimalLiteral, 0); }
	constructor(ctx: NumberContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterDecimalLiteralExpression) {
			listener.enterDecimalLiteralExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitDecimalLiteralExpression) {
			listener.exitDecimalLiteralExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitDecimalLiteralExpression) {
			return visitor.visitDecimalLiteralExpression(this);
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
export class UserMessageContext extends MessageContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	constructor(ctx: MessageContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ScratchListener): void {
		if (listener.enterUserMessage) {
			listener.enterUserMessage(this);
		}
	}
	// @Override
	public exitRule(listener: ScratchListener): void {
		if (listener.exitUserMessage) {
			listener.exitUserMessage(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ScratchVisitor<Result>): Result {
		if (visitor.visitUserMessage) {
			return visitor.visitUserMessage(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SystemMessageContext extends MessageContext {
	public stringExpr(): StringExprContext {
		return this.getRuleContext(0, StringExprContext);
	}
	public expressionList(): ExpressionListContext {
		return this.getRuleContext(0, ExpressionListContext);
	}
	public String(): TerminalNode { return this.getToken(ScratchParser.String, 0); }
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


