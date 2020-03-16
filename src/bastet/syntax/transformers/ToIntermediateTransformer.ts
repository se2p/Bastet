/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net)
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

import {List as ImmList, Map as ImmMap, Set as ImmSet} from "immutable";
import {ErrorNode, ParseTree, RuleNode, TerminalNode} from "antlr4ts/tree";
import {ScratchVisitor} from "../parser/grammar/ScratchVisitor";
import {AbsentAstNode, AstNode, OptionalAstNode, PresentAstNode} from "../ast/AstNode";
import {
    ActorComponentsDefinitionContext,
    ActorDefinitionContext,
    ActorDefinitionListContext,
    ActorModeContext,
    ActorRoleModeContext,
    AddElementToStatementContext,
    AfterBootstrapMonitoringEventContext,
    AfterStatementMonitoringEventContext,
    UserMessageContext,
    AssumeStatementContext,
    AtomicMethodContext,
    BoolAndExpressionContext,
    BoolAsNumExpressionContext,
    BoolAsStringExpressionContext,
    BoolCallStatementExpressionContext,
    BooleanTypeContext,
    BoolLiteralExpressionContext,
    BoolOrExpressionContext,
    BoolParanthExpressionContext,
    BoolVariableExpressionContext,
    BootstapEventContext,
    BroadcastAndWaitStatementContext,
    BroadcastMessageStatementContext,
    CallStmtContext,
    CloneStartEventContext,
    ConcreteActorModeContext,
    ConditionReachedEventContext,
    CoreBoolExprContext,
    CoreStringExprContext,
    CreateCloneOfStatementContext,
    DeclarationStmtListContext,
    DeclareVariableContext,
    DefaultBoolExpressionContext,
    DefaultNumExprContext,
    DefaultStringExpressionContext,
    DeleteAllFromStatementContext,
    DeleteIthFromStatementContext,
    DeleteThisCloneContext,
    EnumTypeContext,
    EpsilonStatementContext,
    EqualsExpressionContext,
    ExpressionListContext,
    ExpressionListPlainContext,
    ExpressionStmtContext,
    ExternFunctionReturnDefinitionContext,
    ExternMethodDefinitionContext,
    ExternMethodDefinitionListContext,
    ExternMethodResultDeclarationContext,
    ExternVoidReturnDefinitionContext,
    FunctionReturnDefinitionContext,
    GreaterThanExpressionContext,
    IdentContext,
    IdentExpressionContext,
    IfStmtContext,
    ImportAllActorsContext,
    ImportDefinitionContext,
    ImportDefinitionListContext,
    ImportSelectedActorContext,
    IndexOfExpressionContext,
    IndexTypeContext,
    InheritsFromContext,
    InsertAtStatementContext,
    IthLetterOfStringExpressionContext,
    IthStringItemOfExpressionContext,
    JoinStringsExpressionContext,
    LengthOfListExpressionContext,
    LengthOfStringExpressionContext,
    LessThanExpressionContext,
    ListTypeContext,
    ListVariableExpressionContext,
    ListWithElementsExpressionContext,
    MessageReceivedEventContext,
    MethodDefinitionContext,
    MethodDefinitionListContext,
    NegatedBoolExpressionContext,
    NeverEventContext,
    NumAsStringExpressionContext,
    NumberContext,
    NumberTypeContext,
    NumBracketsContext,
    NumCallStatementExpressionContext,
    NumDivExpressionContext,
    NumLiteralExpressionContext,
    NumMinusExpressionContext,
    NumModExpressionContext,
    NumMulExpressionContext,
    NumPlusExpressionContext,
    NumVariableExpressionContext,
    ParameterContext,
    ParameterListContext,
    ParameterListPlainContext,
    ProgramContext,
    QualifiedVariableContext,
    RenderedMonitoringEventContext,
    RepeatForeverStmtContext,
    RepeatTimesStmtContext,
    ReplaceElementAtStatementContext,
    ResetTimerStatementContext,
    ResourceContext,
    ResourceListContext,
    ResourceLocatorContext,
    RestartScriptContext,
    ScriptContext,
    ScriptListContext,
    SetStatementContext,
    SetStmtListContext,
    SoundResourceContext,
    StartupEventContext,
    StmtListContext,
    StmtListPlainContext,
    StopAllContext,
    StopOthersInActorStatementContext,
    StopThisContext,
    StoreCallResultStatementContext,
    StoreEvalResultStatementContext,
    StrContainsExpressionContext,
    StrIdentExpressionContext,
    StringAsNumExpressionContext,
    StringAttributeOfExpressionContext,
    StringCallStatementExpressionContext,
    StringLiteralExpressionContext,
    StringParanthExpressionContext,
    StringTypeContext,
    StringVariableExpressionContext,
    SystemMessageContext,
    TimerExpressionContext,
    UnspecifiedBoolExpressionContext,
    UnspecifiedExprContext,
    UnspecifiedNumExprContext,
    UnspecifiedStringExpressionContext,
    UntilStmtContext,
    VariableContext,
    VoidReturnDefinitionContext,
    WaitSecsStatementContext,
    WaitUntilStatementContext,
    LocateActorExpressionContext,
    ActorVariableExpressionContext,
    ActorTypeContext,
    EmptyElseCaseContext,
    PureElseContext,
    ElseIfCaseContext,
    FullMethodDefinitionContext,
    RuntimeMethodDefinitionContext, FlatVariableContext, NumAsBoolExpressionContext
} from "../parser/grammar/ScratchParser";
import {ProgramDefinition} from "../ast/core/ModuleDefinition";
import {Identifier} from "../ast/core/Identifier";
import {
    ImportAllActors,
    ImportDefinition,
    ImportDefinitionList,
    ImportSelectedActor,
    ImportSelector
} from "../ast/core/ImportDefinition";
import {
    ActorDefinition,
    ActorDefinitionList,
    ActorMode,
    ActorRoleMode,
    ConcreteActorMode,
    InheritsFromList
} from "../ast/core/ActorDefinition";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {
    BoolAsStringExpression,
    IthLetterOfStringExpression,
    IthStringItemOfExpression,
    JoinStringsExpression,
    NumAsStringExpression,
    StringAttributeOfExpression,
    StringExpression,
    StringLiteral,
    StringVariableExpression
} from "../ast/core/expressions/StringExpression";
import {ResourceLocation} from "../ast/core/ResourceLocation";
import {
    ImageResourceType,
    ResourceDefinition,
    ResourceDefinitionList,
    ResourceType,
    SoundResourceType
} from "../ast/core/ResourceDefinition";
import {Statement, StatementList, StatementLists} from "../ast/core/statements/Statement";
import {
    ExternMethodDeclaration,
    MethodDefinition,
    MethodDefinitionList,
    MethodSignature,
    MethodSignatureList,
    ResultDeclaration
} from "../ast/core/MethodDefinition";
import {ScriptDefinition, ScriptDefinitionList} from "../ast/core/ScriptDefinition";
import {
    DeclareActorVariableStatement,
    DeclareStackVariableStatement,
    VariableDeclaration
} from "../ast/core/statements/DeclarationStatement";
import {StoreEvalResultToVariableStatement} from "../ast/core/statements/SetStatement";
import {Expression} from "../ast/core/expressions/Expression";
import {ExpressionList} from "../ast/core/expressions/ExpressionList";
import {ParameterDeclaration, ParameterDeclarationList} from "../ast/core/ParameterDeclaration";
import {
    ActorType,
    BooleanType,
    ListType,
    NumberType,
    ScratchType,
    StringEnumType,
    StringType,
    VoidType
} from "../ast/core/ScratchType";
import {
    AfterBootstrapMonitoringEvent,
    AfterStatementMonitoringEvent,
    BootstrapEvent,
    CloneStartEvent,
    ConditionReachedEvent,
    CoreEvent,
    MessageReceivedEvent,
    NeverEvent,
    RenderedMonitoringEvent,
    StartupEvent
} from "../ast/core/CoreEvent";
import {IllegalStateException} from "../../core/exceptions/IllegalStateException";
import {
    IfStatement,
    RepeatForeverStatement,
    UntilQueriedConditionStatement,
    UntilStatement
} from "../ast/core/statements/ControlStatement";
import {
    BooleanExpression,
    BooleanLiteral,
    BooleanVariableExpression,
    NegationExpression,
    NumEqualsExpression,
    NumGreaterThanExpression,
    NumLessThanExpression,
    StrContainsExpression,
    StrEqualsExpression,
    StrGreaterThanExpression,
    StrLessThanExpression
} from "../ast/core/expressions/BooleanExpression";
import {
    BoolAsNumberExpression,
    DivideExpression,
    IndexOfExpression,
    LengthOfListExpression,
    LengthOfStringExpression,
    MinusExpression,
    ModuloExpression,
    MultiplyExpression,
    NumberExpression,
    NumberLiteral,
    NumberVariableExpression,
    PlusExpression,
    StringAsNumberExpression
} from "../ast/core/expressions/NumberExpression";
import {EpsilonStatement} from "../ast/core/statements/EpsilonStatement";
import {ExpressionStatement} from "../ast/core/statements/ExpressionStatement";
import {
    AddElementToStatement,
    DeleteAllFromStatement,
    DeleteIthFromStatement,
    InsertAtStatement,
    ReplaceElementAtStatement
} from "../ast/core/statements/ListStatement";
import {BroadcastAndWaitStatement} from "../ast/core/statements/BroadcastAndWaitStatement";
import {BroadcastMessageStatement} from "../ast/core/statements/BroadcastMessageStatement";
import {CallStatement} from "../ast/core/statements/CallStatement";
import {CreateCloneOfStatement} from "../ast/core/statements/CreateCloneOfStatement";
import {
    DeleteThisCloneStatement,
    StopAllStatement,
    StopThisStatement
} from "../ast/core/statements/TerminationStatement";
import {SystemMessage, UserMessage} from "../ast/core/Message";
import {StopOthersInActorStatement} from "../ast/core/statements/StopOthersInActorStatement";
import {WaitUntilStatement} from "../ast/core/statements/WaitUntilStatement";
import {Preconditions} from "../../utils/Preconditions";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";
import {App} from "../app/App";
import {VariableWithDataLocation} from "../ast/core/Variable";
import {DataLocation, DataLocations} from "../app/controlflow/DataLocation";
import {AssumeStatement} from "../ast/core/statements/AssumeStatement";
import {MethodIdentifiers} from "../app/controlflow/MethodIdentifiers";
import {BastetConfiguration} from "../../utils/BastetConfiguration";
import {ParsingException} from "../../core/exceptions/ParsingException";
import {ParserRuleContext} from "antlr4ts";
import {CastExpression} from "../ast/core/expressions/CastExpression";
import {ActorExpression, ActorVariableExpression, LocateActorExpression} from "../ast/core/expressions/ActorExpression";
import {TransitionRelation} from "../app/controlflow/TransitionRelation";
import {ScopeTypeInformation, TypeInformationStorage} from "../DeclarationScopes";
import instantiate = WebAssembly.instantiate;
import {LookupTransformer} from "./LookupTransformer";

const toposort = require('toposort');

export class TransformerConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ['Transformer']);
    }

    get useBusyWaiting(): boolean {
        return this.getBoolProperty('use-busy-waiting', true);
    }

}

class TTransformerResult<T extends AstNode> {

    private readonly _statementsToPrepend: StatementList;
    private readonly _node: T;

    constructor(statementsToPrepend: StatementList, node: T) {
        Preconditions.checkNotUndefined(statementsToPrepend);
        Preconditions.checkNotUndefined(node);

        this._statementsToPrepend = statementsToPrepend;
        this._node = node;
    }

    get statementsToPrepend(): StatementList {
        return this._statementsToPrepend;
    }

    get node(): T {
        return this._node;
    }

    public nodeOnly<E extends T>(): E {
        Preconditions.checkState(this._statementsToPrepend.elements.length == 0);
        Preconditions.checkNotUndefined(this._node);
        return this._node as E;
    }

    public static withNode<T extends AstNode>(node: T): TTransformerResult<T> {
        return new TTransformerResult(StatementList.empty(), node);
    }

}

export class TransformerResult extends TTransformerResult<AstNode> {

}
const STATEMENT_MATCHER = /(?<method>[A-Za-z0-9_]*)StatementContext/;
const EXPRESSION_MATCHER = /(?<method>[A-Za-z0-9_]*)ExpressionContext/;

class TransformerResultList<E extends AstNode> {

    private readonly _statementsToPrepend: StatementList;
    private readonly _nodeList: E[];

    constructor(statementsToPrepend: StatementList, nodeList: E[]) {
        this._statementsToPrepend = statementsToPrepend;
        this._nodeList = nodeList;
    }

    get statementsToPrepend(): StatementList {
        return this._statementsToPrepend;
    }

    get nodeList(): E[] {
        return this._nodeList;
    }
}

class ToIntermediateVisitor implements ScratchVisitor<TransformerResult> {

    private readonly _methodLibrary: App;
    private readonly _typeStack: Array<ScratchType>;
    private readonly _config: TransformerConfig;
    private readonly _typeStorage: TypeInformationStorage;

    private _actorScope : boolean;
    private _activeDeclarationScope: ScopeTypeInformation;
    private _filePath: string;
    private imageLookupMethods: Map<Identifier, MethodDefinition> = new Map();

    constructor(config: TransformerConfig, methodLibrary: App,
                typeInformationStorage: TypeInformationStorage, filePath: string) {
        this._config = Preconditions.checkNotUndefined(config);
        this._methodLibrary = Preconditions.checkNotUndefined(methodLibrary);
        this._typeStorage = Preconditions.checkNotUndefined(typeInformationStorage);

        this._typeStack = new Array<ScratchType>();
        this._activeDeclarationScope = null;
        this._actorScope = false;
        this._filePath = filePath;
    }

    get typeStorage(): TypeInformationStorage {
        return this._typeStorage;
    }

    private getTypeOf(ident: Identifier): ScratchType {
        return this._activeDeclarationScope.getTypeOf(ident);
    }

    private getArgumentNodes(ctx: RuleNode): RuleNode[] {
        let result: RuleNode[] = [];
        for (let i = 0; i<ctx.childCount; i++) {
            const child = ctx.getChild(i);
            if (!(child instanceof TerminalNode)) {
                result.push(child as RuleNode);
            }
        }

        return result;
    }

    private getOperand1(ctx: RuleNode): ParserRuleContext {
        return this.getArgumentNodes(ctx)[0] as ParserRuleContext;
    }

    private parseOperand(ctx: RuleNode, index: number): TransformerResult {
        const result = this.getArgumentNodes(ctx)[index].accept(this);
        if (!result.node['expressionType']) {
            // Some repair
            if (result.node instanceof Identifier) {
                return this.produceVariableFromIdentifier(result.node);
            }

            throw new IllegalArgumentException("Operands must always be expressions!");
        }

        return result;
    }

    private parseOperand1(ctx: RuleNode): TransformerResult {
        return this.parseOperand(ctx, 0);
    }

    private parseOperand2(ctx: RuleNode): TransformerResult {
        return this.parseOperand(ctx, 1);
    }

    private getOperand2(ctx: RuleNode): ParserRuleContext {
        return this.getArgumentNodes(ctx)[1] as ParserRuleContext;
    }

    public visitProgram(ctx: ProgramContext): TransformerResult {
        const ident: AstNode = ctx.ident().accept(this).node;
        const imports: AstNode = ctx.importDefinitionList().accept(this).node;
        const actors: AstNode = ctx.actorDefinitionList().accept(this).node;

        return TransformerResult.withNode(new ProgramDefinition(
            ident as Identifier,
            imports as ImportDefinitionList,
            actors as ActorDefinitionList));
    }

    public visitIdentExpression(ctx: IdentExpressionContext): TransformerResult {
        return TransformerResult.withNode(Identifier.of(ctx.Identifier().text));
    }

    public visitStrIdentExpression(ctx: StrIdentExpressionContext): TransformerResult {
        return TransformerResult.withNode(Identifier.of(this.unquote(ctx.String().text)));
    }

    private buildExpressionArrayFrom<E extends Expression>(elements: RuleNode[]): TransformerResultList<E> {
        const results: E[] = [];

        let stmtsToPrepend: StatementList = StatementList.empty();

        for (let idc of elements) {
            const tr: TransformerResult = idc.accept(this);
            stmtsToPrepend = StatementLists.concat(stmtsToPrepend, tr.statementsToPrepend);

            if (tr.node instanceof Identifier) {
                results.push(this.produceVariableFromIdentifier(tr.node).node as E);
            } else {
                results.push(tr.node as E);
            }
        }

        return new TransformerResultList(stmtsToPrepend, results);
    }

    private buildArrayFrom<E extends AstNode>(elements: RuleNode[]): TransformerResultList<E> {
        const results: E[] = [];

        let stmtsToPrepend: StatementList = StatementList.empty();

        for (let idc of elements) {
            const tr: TransformerResult = idc.accept(this);
            stmtsToPrepend = StatementLists.concat(stmtsToPrepend, tr.statementsToPrepend);
            results.push(tr.node as E);
        }

        return new TransformerResultList(stmtsToPrepend, results);
    }

    public visitImportDefinitionList(ctx: ImportDefinitionListContext): TransformerResult {
        const importDefs = this.buildArrayFrom<ImportDefinition>(ctx.importDefinition());
        return new TransformerResult(importDefs.statementsToPrepend,
            new ImportDefinitionList(importDefs.nodeList));
    }

    public visitImportSelector(ctx: ImportSelectedActorContext): TransformerResult {
        return TransformerResult.withNode(
            new ImportSelectedActor(ctx.ident().accept(this).nodeOnly() as Identifier));
    }

    public visitImportAllActors(ctx: ImportAllActorsContext): TransformerResult {
        return TransformerResult.withNode(new ImportAllActors());
    }

    public visitImportDefinition(ctx: ImportDefinitionContext): TransformerResult {
        const toImportTr = ctx.importSelector().accept(this);
        const importFrom: AstNode = ctx.resourceLocator().accept(this).node;
        return TransformerResult.withNode(
            new ImportDefinition(toImportTr.nodeOnly() as ImportSelector, importFrom as ResourceLocation));
    }

    public visitResourceLocator(ctx: ResourceLocatorContext): TransformerResult {
        return TransformerResult.withNode(new ResourceLocation(new StringLiteral(ctx.String().text)));
    }

    private optionalIdentifier(ctx: IdentContext|null): OptionalAstNode<Identifier> {
        if (ctx) {
            const id = ctx.accept(this).node;
            return new PresentAstNode(id as Identifier);
        } else {
            return new AbsentAstNode();
        }
    }

    public visitExternMethodDefinition(ctx: ExternMethodDefinitionContext): TransformerResult {
        const identTr = ctx.ident().accept(this);
        const paramsTr = ctx.parameterList().accept(this);
        const resultTr = ctx.externMethodResultDeclaration().accept(this);
        return TransformerResult.withNode(new ExternMethodDeclaration(
            identTr.nodeOnly() as Identifier,
            paramsTr.nodeOnly() as ParameterDeclarationList,
            resultTr.nodeOnly() as ResultDeclaration));
    }

    public visitExternMethodResultDeclaration(ctx: ExternMethodResultDeclarationContext): TransformerResult {
        return this.visitSingleChild(ctx);
    }

    public visitExternFunctionReturnDefinition(ctx: ExternFunctionReturnDefinitionContext): TransformerResult {
        const resultType = ctx.type().accept(this).nodeOnly() as ScratchType;
        const resultVar = new VariableWithDataLocation(
            DataLocations.createTypedLocation(Identifier.resultIdentifier(), resultType));
        return TransformerResult.withNode(new ResultDeclaration(resultVar));
    }

    public visitExternVoidReturnDefinition(ctx: ExternVoidReturnDefinitionContext): TransformerResult {
        const resultType = VoidType.instance();
        const resultVar = new VariableWithDataLocation(
            DataLocations.createTypedLocation(Identifier.resultIdentifier(), resultType));
        return TransformerResult.withNode(new ResultDeclaration(resultVar));
    }

    private toMethodDef(ctx: MethodDefinitionContext): FullMethodDefinitionContext|RuntimeMethodDefinitionContext {
        return ctx as FullMethodDefinitionContext|RuntimeMethodDefinitionContext;
    }

    private precollectMethodSignatures(actorIdent: Identifier, ctx: MethodDefinitionListContext,
                                       ectx: ExternMethodDefinitionListContext) {

        for (let md of ctx.methodDefinition().map((m) => this.toMethodDef(m))) {
            const identTr = md.ident().accept(this);
            const paramsTr = md.parameterList().accept(this);
            const resultTr = md.methodResultDeclaration().accept(this);

            this._activeDeclarationScope.putMethod(new MethodSignature(
                identTr.nodeOnly(),
                paramsTr.node as ParameterDeclarationList,
                resultTr.nodeOnly(),
                false
            ));
        }

        for (let md of ectx.externMethodDefinition()) {
            const identTr = md.ident().accept(this);
            const paramsTr = md.parameterList().accept(this);
            const resultTr = md.externMethodResultDeclaration().accept(this);

            this._activeDeclarationScope.putMethod(new MethodSignature(
                identTr.nodeOnly(),
                paramsTr.node as ParameterDeclarationList,
                resultTr.nodeOnly(),
                true
            ));
        }
    }

    public visitExternMethodDefinitionList(ctx: ExternMethodDefinitionListContext): TransformerResult {
        const defs = this.buildArrayFrom<MethodDefinition>(ctx.externMethodDefinition());
        return new TransformerResult(defs.statementsToPrepend, new MethodSignatureList(defs.nodeList));
    }

    public visitConcreteActorMode(ctx: ConcreteActorModeContext): TransformerResult {
        return TransformerResult.withNode(ConcreteActorMode.instance());
    }

    public visitActorRoleMode(ctx: ActorRoleModeContext): TransformerResult {
        return TransformerResult.withNode(ActorRoleMode.instance());
    }

    public visitActorMode(ctx: ActorModeContext): TransformerResult {
        return this.visitSingleChild(ctx);
    }

    public visitActorDefinition(ctx: ActorDefinitionContext): TransformerResult {
        let initStatements: StatementList = StatementList.empty();

        // Identifier and inheritance information
        const ident = ctx.ident().accept(this).nodeOnly() as Identifier;
        const inheritesFrom: InheritsFromList = ctx.inheritsFrom().accept(this).nodeOnly();

        // Role
        const actorMode: ActorMode = ctx.actorMode().accept(this).nodeOnly();
        Preconditions.checkNotUndefined(actorMode);

        this._activeDeclarationScope = this._typeStorage.beginActorScope(ident.text);
        try {
            if (!inheritesFrom.isEmpty()) {
                for (let id of inheritesFrom.elements) {
                    const inheritsFromName = id.text;
                    const baseActorTypeInfos: ScopeTypeInformation = this._typeStorage.beginActorScope(inheritsFromName);
                    if (!baseActorTypeInfos) {
                        throw new IllegalStateException(`Type infos for ${inheritsFromName} missing`);
                    }
                    this._activeDeclarationScope.addAllFrom(baseActorTypeInfos);
                }
            }

            // Before parsing the body of the methods, collect type information
            // on all available methods
            this.precollectMethodSignatures(ident, ctx.actorComponentsDefinition().methodDefinitionList(),
                ctx.actorComponentsDefinition().externMethodDefinitionList());

            // All variable declarations should be on the scope of the
            // actor, and not on the stack.
            let resouceDefs: TransformerResult;
            let declarations: TransformerResult;

            this._actorScope = true;
            try {
                // Resource declarations and definitions
                resouceDefs = ctx.actorComponentsDefinition().resourceList().accept(this);
                initStatements = StatementLists.concat(initStatements, resouceDefs.statementsToPrepend);

                let imageLookup = LookupTransformer.transformResourceDefs(resouceDefs, this._filePath)
                this.imageLookupMethods.set(ident, imageLookup);

                // Variable declarations and initializations
                declarations = ctx.actorComponentsDefinition().declarationStmtList().accept(this);
                initStatements = StatementLists.concat(initStatements, declarations.statementsToPrepend);
            } finally {
                this._actorScope = false;
            }

            // Method declarations and definitions
            const methods = ctx.actorComponentsDefinition().methodDefinitionList().accept(this);
            Preconditions.checkState(methods.statementsToPrepend.elements.length == 0);

            // External method declarations
            const externalMethods = ctx.actorComponentsDefinition().externMethodDefinitionList().accept(this);
            Preconditions.checkState(externalMethods.statementsToPrepend.elements.length == 0);

            // Script definitions
            const scripts = ctx.actorComponentsDefinition().scriptList().accept(this);
            Preconditions.checkState(scripts.statementsToPrepend.elements.length == 0);

            // Initialization statements
            const inits = ctx.actorComponentsDefinition().setStmtList().accept(this);
            Preconditions.checkState(inits.statementsToPrepend.elements.length == 0);
            initStatements = StatementLists.concat(initStatements, inits.node as StatementList);

            return TransformerResult.withNode(new ActorDefinition(
                actorMode,
                ident as Identifier,
                inheritesFrom,
                resouceDefs.node as ResourceDefinitionList,
                declarations.node as StatementList,
                initStatements,
                methods.node as MethodDefinitionList,
                externalMethods.nodeOnly() as MethodSignatureList,
                scripts.node as ScriptDefinitionList));

        } finally {
            this._activeDeclarationScope = this._activeDeclarationScope.endScope();
        }
    }

    private buildActorInheritanceRelation(ctx: ActorDefinitionListContext): Array<[string, string]> {
        let result = new Array<[string, string]>();
        for (let e of ctx.actorDefinition()) {
           const adc: ActorDefinitionContext = e as ActorDefinitionContext;
           const actorName = adc.ident().text;
           for (let id of adc.inheritsFrom().ident()) {
               result.push([actorName, id.text]);
           }
        }
        return result;
    }

    private orderActorsByInheritance(ctx: ActorDefinitionListContext): ActorDefinitionContext[] {
        const inheritance = this.buildActorInheritanceRelation(ctx);
        const sorted = toposort(inheritance).reverse();
        let nameToActorMap = {};
        for (let acd of ctx.actorDefinition()) {
            nameToActorMap[acd.ident().text] = acd;
        }
        return sorted
            .filter((name) => nameToActorMap[name])
            .map((name) => nameToActorMap[name]);
    }

    public visitActorDefinitionList(ctx: ActorDefinitionListContext): TransformerResult {
        const actorDefs = this.buildArrayFrom<ActorDefinition>(this.orderActorsByInheritance(ctx));
        return new TransformerResult(actorDefs.statementsToPrepend, new ActorDefinitionList(actorDefs.nodeList));
    }

    public visitResource(ctx: ResourceContext) : TransformerResult {
        return TransformerResult.withNode(new ResourceDefinition(
            ctx.resourceType().accept(this).node as ResourceType,
            ctx.ident().accept(this).node as Identifier,
            ctx.resourceLocator().accept(this).node as ResourceLocation));
    }

    public visitResourceList(ctx: ResourceListContext) : TransformerResult {
        const defs = this.buildArrayFrom<ResourceDefinition>(ctx.resource());
        return new TransformerResult(defs.statementsToPrepend, new ResourceDefinitionList(defs.nodeList));
    }

    private parseIsAtomic(ctx: RuntimeMethodDefinitionContext|FullMethodDefinitionContext): boolean {
        for (const attrib of ctx.methodAttributeList().methodAttribute()) {
            if (attrib instanceof AtomicMethodContext) {
                return true;
            }
        }

        return false;
    }

    visitMethodDefinition(ctx: MethodDefinitionContext) : TransformerResult {
        return this.visitSingleChild(ctx);
    }

    public visitRuntimeMethodDefinition(ctx: RuntimeMethodDefinitionContext) : TransformerResult {
        const methodIdent: Identifier = ctx.ident().accept(this).nodeOnly() as Identifier;

        const isAtomic = this.parseIsAtomic(ctx);

        this._activeDeclarationScope = this._activeDeclarationScope.beginMethodScope(methodIdent.text);
        try {
            throw new ImplementMeException();
            // const resultDeclaration = ctx.methodResultDeclaration().accept(this).nodeOnly() as ResultDeclaration;
            // return TransformerResult.withNode(new MethodDefinition(
            //     methodIdent,
            //     ctx.parameterList().accept(this).nodeOnly() as ParameterDeclarationList,
            //     ctx.stmtList().accept(this).nodeOnly() as StatementList,
            //     resultDeclaration, isAtomic));
        } finally {
            this._activeDeclarationScope = this._activeDeclarationScope.endScope();
        }
    }

    public visitFullMethodDefinition(ctx: FullMethodDefinitionContext) : TransformerResult {
        const methodIdent: Identifier = ctx.ident().accept(this).nodeOnly() as Identifier;

        const isAtomic = this.parseIsAtomic(ctx);

        this._activeDeclarationScope = this._activeDeclarationScope.beginMethodScope(methodIdent.text);
        try {
            const resultDeclaration = ctx.methodResultDeclaration().accept(this).nodeOnly() as ResultDeclaration;
            return TransformerResult.withNode(new MethodDefinition(
                methodIdent,
                ctx.parameterList().accept(this).nodeOnly() as ParameterDeclarationList,
                ctx.stmtList().accept(this).nodeOnly() as StatementList,
                resultDeclaration, isAtomic));
        } finally {
            this._activeDeclarationScope = this._activeDeclarationScope.endScope();
        }
    }

    public visitMethodDefinitionList(ctx: MethodDefinitionListContext) : TransformerResult {
        const defs = this.buildArrayFrom<MethodDefinition>(ctx.methodDefinition());
        return new TransformerResult(defs.statementsToPrepend, new MethodDefinitionList(defs.nodeList));
    }

    public visitFunctionReturnDefinition(ctx: FunctionReturnDefinitionContext) : TransformerResult {
        const ident = ctx.ident().accept(this).nodeOnly() as Identifier;
        const resultType = ctx.type().accept(this).nodeOnly() as ScratchType;
        const resultVar = new VariableWithDataLocation(DataLocations.createTypedLocation(ident, resultType));
        this._activeDeclarationScope.putVariable(resultVar);

        return TransformerResult.withNode(new ResultDeclaration(resultVar));
    }

    public visitVoidReturnDefinition(ctx: VoidReturnDefinitionContext): TransformerResult {
        return TransformerResult.withNode(ResultDeclaration.void());
    }

    public visitDeclarationStmtList(ctx: DeclarationStmtListContext) : TransformerResult {
        const decls = this.buildArrayFrom<Statement>(ctx.declarationStmt());
        return new TransformerResult(decls.statementsToPrepend, new StatementList(decls.nodeList));
    }

    public visitSetStatement(ctx: SetStatementContext) : TransformerResult {
        return ctx.setStmt().accept(this);
    }

    public visitSetStmtList(ctx: SetStmtListContext) : TransformerResult {
        const stmts = this.buildArrayFrom<Statement>(ctx.setStmt());
        return TransformerResult.withNode(StatementLists.concat(stmts.statementsToPrepend, new StatementList(stmts.nodeList)));
    }

    private parseIsRestart(ctx: ScriptContext): boolean {
        for (const attrib of ctx.scriptAttributeList().scriptAttribute()) {
            if (attrib instanceof RestartScriptContext) {
                return true;
            }
        }

        return false;
    }

    public visitScript(ctx: ScriptContext) : TransformerResult {
        return TransformerResult.withNode(new ScriptDefinition(
            ctx.event().accept(this).nodeOnly() as CoreEvent,
            ctx.stmtList().accept(this).nodeOnly() as StatementList,
            this.parseIsRestart(ctx)));
    }

    public visitScriptList(ctx: ScriptListContext) : TransformerResult {
        const defs = this.buildArrayFrom<ScriptDefinition>(ctx.script());
        return new TransformerResult(defs.statementsToPrepend, new ScriptDefinitionList(defs.nodeList));
    }

    public visitExpressionList(ctx: ExpressionListContext) : TransformerResult {
        const elems = this.buildExpressionArrayFrom<Expression>(ctx.expressionListPlain().expression());
        return new TransformerResult(elems.statementsToPrepend, new ExpressionList(elems.nodeList));
    }

    public visitExpressionListPlain(ctx: ExpressionListPlainContext): TransformerResult {
        const elems = this.buildExpressionArrayFrom<Expression>(ctx.expression());
        return new TransformerResult(elems.statementsToPrepend, new ExpressionList(elems.nodeList));
    }

    public visitParameterList(ctx: ParameterListContext): TransformerResult {
        const elems = this.buildArrayFrom<ParameterDeclaration>(ctx.parameterListPlain().parameter());
        Preconditions.checkState(elems.statementsToPrepend.elements.length == 0);
        return TransformerResult.withNode(new ParameterDeclarationList(elems.nodeList));
    }

    public visitParameterListPlain(ctx: ParameterListPlainContext): TransformerResult {
        const elems = this.buildArrayFrom<ParameterDeclaration>(ctx.parameter());
        return TransformerResult.withNode(new ParameterDeclarationList(elems.nodeList));
    }

    public visitStmtList(ctx: StmtListContext): TransformerResult {
        try {
            let result: StatementList = StatementList.empty();

            for (let idc of ctx.stmtListPlain().stmt()) {
                const tr: TransformerResult = idc.accept(this);
                result = StatementLists.concat(result, tr.statementsToPrepend);
                const trs: StatementList = new StatementList([tr.node as Statement]);
                result = StatementLists.concat(result, trs);
            }

            if (ctx.terminationStmt()) {
                const tr: TransformerResult = ctx.terminationStmt().accept(this);
                result = StatementLists.concat(result, tr.statementsToPrepend);
                const trs: StatementList = new StatementList([tr.node as Statement]);
                result = StatementLists.concat(result, trs);
            }

            return TransformerResult.withNode(result);

        } catch (e) {
           if (e.constructor.name == "ParsingException") {
               throw e;
           } else {
               throw new ParsingException(e.message, ctx);
           }
        }
    }

    public visitStmtListPlain(ctx: StmtListPlainContext): TransformerResult {
        const elems = this.buildArrayFrom<Statement>(ctx.stmt());
        return TransformerResult.withNode(
            StatementLists.concat(elems.statementsToPrepend, new StatementList(elems.nodeList)));
    }

    public visitBooleanType(ctx: BooleanTypeContext): TransformerResult {
        return TransformerResult.withNode(BooleanType.instance());
    }

    public visitEnumType(ctx: EnumTypeContext): TransformerResult {
        return TransformerResult.withNode(StringEnumType.withValues(ctx.expressionListPlain().accept(this).nodeOnly() as ExpressionList));
    }

    public visitStringType(ctx: StringTypeContext): TransformerResult {
        return TransformerResult.withNode(StringType.instance());
    }

    public visitListType(ctx: ListTypeContext): TransformerResult {
        return TransformerResult.withNode(ListType.withElementType(ctx.type().accept(this).nodeOnly() as ScratchType));
    }

    public visitNumberType (ctx: NumberTypeContext): TransformerResult {
        return TransformerResult.withNode(NumberType.instance());
    }

    public visitActorType (ctx: ActorTypeContext): TransformerResult {
        return TransformerResult.withNode(ActorType.instance());
    }

    public visitActorComponentsDefinition (ctx: ActorComponentsDefinitionContext): TransformerResult {
        throw new IllegalStateException("Not expected to be needed.");
    }

    public visitUntilStmt (ctx: UntilStmtContext): TransformerResult {
        const cond: TransformerResult = this.ensureType(ctx, BooleanType.instance(), ctx.boolExpr().accept(this));
        const body: TransformerResult = ctx.stmtList().accept(this);
        return TransformerResult.withNode(
            new UntilQueriedConditionStatement(cond.node as BooleanExpression,
                cond.statementsToPrepend, body.nodeOnly<StatementList>()));
    }

    private statementListFrom(ctx: StmtListContext|undefined) {
        if (ctx) {
            return ctx.accept(this).nodeOnly() as StatementList;
        } else {
            return StatementList.empty();
        }
    }

    public visitEmptyElseCase (ctx: EmptyElseCaseContext): TransformerResult {
        return TransformerResult.withNode(new StatementList([]));
    }

    public visitPureElse (ctx: PureElseContext): TransformerResult {
        return ctx.stmtList().accept(this);
    }

    public visitElseIfCase (ctx: ElseIfCaseContext): TransformerResult {
        const ifTr = ctx.ifStmt().accept(this);
        return TransformerResult.withNode(
            StatementLists.concat(ifTr.statementsToPrepend, new StatementList([ifTr.node as Statement])));
    }

    public visitIfStmt (ctx: IfStmtContext): TransformerResult {
        const cond: TransformerResult = this.ensureType(ctx, BooleanType.instance(), ctx.boolExpr().accept(this));

        const elseCaseTr = ctx.elseCase().accept(this);

        return new TransformerResult(
            cond.statementsToPrepend,
            new IfStatement(
                cond.node as BooleanExpression,
                ctx.stmtList().accept(this).nodeOnly() as StatementList,
                elseCaseTr.nodeOnly() as StatementList));
    }

    public visitRepeatForeverStmt (ctx: RepeatForeverStmtContext): TransformerResult {
        return TransformerResult.withNode(
            new RepeatForeverStatement(
                ctx.stmtList().accept(this).nodeOnly() as StatementList));
    }

    /**
     * Replaces a `RepeatTimesStatement` by an `UntilStatement`
     */
    public visitRepeatTimesStmt (ctx: RepeatTimesStmtContext): TransformerResult {
        // Semantics: Evaluate the expression once, and use the
        //      resulting number (constant) as the number of repetitions to conduct.
        let prepend: StatementList = StatementList.empty();

        // Declare and initialize a counter variable
        const counterIdent: Identifier = Identifier.fresh();
        const counterVar = new VariableWithDataLocation(DataLocations.createTypedLocation(counterIdent, NumberType.instance()));
        const counterVarExpr = new NumberVariableExpression(counterVar);
        const declarationStmt = new DeclareStackVariableStatement(counterVar);
        const initStmt: Statement = new StoreEvalResultToVariableStatement(counterVar, NumberLiteral.of(0));
        prepend = StatementLists.concat(prepend, StatementList.from([declarationStmt, initStmt]));

        this._activeDeclarationScope.putVariable(counterVar);

        // Determine the number of iterations
        const timesTr: TransformerResult = ctx.numExpr().accept(this);
        const times: NumberExpression = timesTr.node as NumberExpression;
        prepend = StatementLists.concat(prepend, timesTr.statementsToPrepend);

        // Build the loop
        const untilCond = new NegationExpression(new NumLessThanExpression(counterVarExpr, times));
        const loopBody = ctx.stmtList().accept(this).nodeOnly<StatementList>();
        const untilStatement = new UntilStatement(untilCond, loopBody);

        return new TransformerResult(prepend, untilStatement);
    }

    public visitNumBrackets(ctx: NumBracketsContext) : TransformerResult {
        return ctx.coreNumExpr().accept(this);
    }

    public visitNumDivExpression(ctx: NumDivExpressionContext) : TransformerResult {
        const tr1 = this.parseOperand1(ctx);
        const tr2 = this.parseOperand2(ctx);

        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new DivideExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    private assertEqualOperandTypes(context: RuleNode, op1: TransformerResult, op2: TransformerResult): ScratchType {
        Preconditions.checkNotUndefined(context);
        Preconditions.checkNotUndefined(op1);
        Preconditions.checkNotUndefined(op2);

        const type1 = Preconditions.checkNotUndefined((op1.node as Expression).expressionType);
        const type2 = Preconditions.checkNotUndefined((op2.node as Expression).expressionType);

        if (!(type1 == type2)) {
            console.log(context);
            throw new IllegalArgumentException(`Types are not equal: ${type1.toTreeString()} vs ${type2.toTreeString()}`);
        }

        return type1;
    }

    public visitEqualsExpression(ctx: EqualsExpressionContext) : TransformerResult {
        const tr1 = this.parseOperand1(ctx);
        const tr2 = this.parseOperand2(ctx);
        this.assertEqualOperandTypes(ctx, tr1, tr2);

        if ((tr1.node as Expression).expressionType == NumberType.instance()) {
            return new TransformerResult(
                StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
                new NumEqualsExpression(
                    tr1.node as NumberExpression,
                    tr2.node as NumberExpression));

        } if ((tr1.node as Expression).expressionType == StringType.instance()) {
            return new TransformerResult(
                StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
                new StrEqualsExpression(
                    tr1.node as StringExpression,
                    tr2.node as StringExpression));

        } else {
            throw new ImplementMeException();
        }
    }

    public visitGreaterThanExpression(ctx: GreaterThanExpressionContext) : TransformerResult {
        const tr1 = this.parseOperand1(ctx);
        const tr2 = this.parseOperand2(ctx);
        this.assertEqualOperandTypes(ctx, tr1, tr2);

        if ((tr1.node as Expression).expressionType == NumberType.instance()) {
            return new TransformerResult(
                StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
                new NumGreaterThanExpression(
                    tr1.node as NumberExpression,
                    tr2.node as NumberExpression));

        } else if ((tr1.node as Expression).expressionType == StringType.instance()) {
            return new TransformerResult(
                StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
                new StrGreaterThanExpression(
                    tr1.node as StringExpression,
                    tr2.node as StringExpression));

        } else {
            throw new ImplementMeException();
        }
    }

    public visitLessThanExpression(ctx: LessThanExpressionContext) : TransformerResult {
        const tr1 = this.parseOperand1(ctx);
        const tr2 = this.parseOperand2(ctx);
        this.assertEqualOperandTypes(ctx, tr1, tr2);

        if ((tr1.node as Expression).expressionType == NumberType.instance()) {
            return new TransformerResult(
                StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
                new NumLessThanExpression(
                    tr1.node as NumberExpression,
                    tr2.node as NumberExpression));

        } else if ((tr1.node as Expression).expressionType == StringType.instance()) {
            return new TransformerResult(
                StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
                new StrLessThanExpression(
                    tr1.node as StringExpression,
                    tr2.node as StringExpression));
        } else {
            throw new ImplementMeException();
        }
    }

    public visitNumLiteralExpression(ctx: NumLiteralExpressionContext) : TransformerResult {
        return TransformerResult.withNode(NumberLiteral.fromFloatString(ctx.number().text));
    }

    public visitNumMinusExpression(ctx: NumMinusExpressionContext) : TransformerResult {
        const tr1 = this.parseOperand1(ctx);
        const tr2 = this.parseOperand2(ctx);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new MinusExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    public visitNumModExpression(ctx: NumModExpressionContext) : TransformerResult {
        const tr1 = this.parseOperand1(ctx);
        const tr2 = this.parseOperand2(ctx);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new ModuloExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    public visitNumMulExpression(ctx: NumMulExpressionContext) : TransformerResult {
        const tr1 = this.parseOperand1(ctx);
        const tr2 = this.parseOperand2(ctx);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new MultiplyExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    public visitNumPlusExpression(ctx: NumPlusExpressionContext) : TransformerResult {
        const tr1 = this.parseOperand1(ctx);
        const tr2 = this.parseOperand2(ctx);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new PlusExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    public visitNumVariableExpression(ctx: NumVariableExpressionContext) : TransformerResult {
        return ctx.variable().accept(this);
    }

    public visitNumber(ctx: NumberContext) : TransformerResult {
        return TransformerResult.withNode(NumberLiteral.fromFloatString(ctx.DecimalLiteral().text));
    }

    private declareFreshBooleanVariable(value: boolean): TTransformerResult<BooleanVariableExpression> {
        const resultVarIdent: Identifier = Identifier.fresh();
        const resultVar = new VariableWithDataLocation(DataLocations.createTypedLocation(resultVarIdent, BooleanType.instance()));
        const resultVarExpr = new BooleanVariableExpression(resultVar);
        const declareVarStmt = new DeclareStackVariableStatement(resultVar);
        const initStmt: Statement = new StoreEvalResultToVariableStatement(resultVar, BooleanLiteral.from(value));

        this._activeDeclarationScope.putVariable(resultVar);

        let prepend: StatementList = StatementList.empty();
        prepend = StatementLists.concat(prepend, StatementList.from([declareVarStmt, initStmt]));

        return new TTransformerResult(prepend, resultVarExpr);
    }

    private evaluateIntoBooleanVariable(varExpr: BooleanVariableExpression, expr: ParserRuleContext): TTransformerResult<BooleanVariableExpression> {
        const tr1: TransformerResult = this.ensureType(expr, BooleanType.instance(),expr.accept(this));

        let prepend: StatementList = StatementList.empty();
        prepend = StatementLists.concat(prepend, tr1.statementsToPrepend);

        const initStmt: Statement = new StoreEvalResultToVariableStatement(varExpr.variable, tr1.node as BooleanExpression);
        prepend = StatementLists.concat(prepend, StatementList.from([initStmt]));

        return new TTransformerResult(prepend, varExpr);
    }

    public visitBoolAndExpression(ctx: BoolAndExpressionContext) : TransformerResult {
        // Goal: Evaluate the second argument only if the first evaluates to true
        let prepend = StatementList.empty();

        const varTr = this.declareFreshBooleanVariable(false);
        prepend = StatementLists.concat(prepend, varTr.statementsToPrepend);

        const tr1eval = this.evaluateIntoBooleanVariable(varTr.node, this.getOperand1(ctx));
        const tr2eval = this.evaluateIntoBooleanVariable(varTr.node, this.getOperand2(ctx));

        // res = evalop1();
        // if (res) {
        //    res = evalop2();
        // }
        // res

        prepend = StatementLists.concat(prepend, tr1eval.statementsToPrepend);
        const ifOp1: Statement = new IfStatement(varTr.node, tr2eval.statementsToPrepend, StatementList.empty());
        prepend = StatementLists.concat(prepend, StatementList.from([ifOp1]));

        return new TransformerResult(prepend, varTr.node);
    }

    public visitBoolAsNumExpression(ctx: BoolAsNumExpressionContext) : TransformerResult {
        const exprTr: TransformerResult = ctx.boolExpr().accept(this);
        return new TransformerResult(exprTr.statementsToPrepend,
            new CastExpression(exprTr.node as Expression, NumberType.instance()));
    }

    public visitBoolAsStringExpression(ctx: BoolAsStringExpressionContext) : TransformerResult {
        const exprTr: TransformerResult = ctx.boolExpr().accept(this);
        return new TransformerResult(exprTr.statementsToPrepend,
            new CastExpression(exprTr.node as Expression, StringType.instance()));
    }

    public visitBoolLiteralExpression(ctx: BoolLiteralExpressionContext) : TransformerResult {
        return TransformerResult.withNode(BooleanLiteral.fromString(ctx.Boolean().text));
    }

    public visitBoolOrExpression(ctx: BoolOrExpressionContext) : TransformerResult {
        // Goal: Evaluate the second argument only if the first evaluates to FALSE
        let prepend = StatementList.empty();

        const varTr = this.declareFreshBooleanVariable(false);
        prepend = StatementLists.concat(prepend, varTr.statementsToPrepend);

        const tr1eval = this.evaluateIntoBooleanVariable(varTr.node, this.getOperand1(ctx));
        const tr2eval = this.evaluateIntoBooleanVariable(varTr.node, this.getOperand2(ctx));

        // res = evalop1();
        // if (not res) {
        //    res = evalop2();
        // }
        // res

        prepend = StatementLists.concat(prepend, tr1eval.statementsToPrepend);
        const ifOp1: Statement = new IfStatement(new NegationExpression(varTr.node), tr2eval.statementsToPrepend, StatementList.empty());
        prepend = StatementLists.concat(prepend, StatementList.from([ifOp1]));

        return new TransformerResult(prepend, varTr.node);
    }

    public visitBoolParanthExpression(ctx: BoolParanthExpressionContext) : TransformerResult {
        return ctx.coreBoolExpr().accept(this);
    }

    public visitBoolVariableExpression(ctx: BoolVariableExpressionContext) : TransformerResult {
        return ctx.variable().accept(this);
    }

    private constructBinaryOp(ctx: RuleNode, constr: new (n1:AstNode, n2:AstNode) => AstNode) : TransformerResult {
        const tr1 = this.parseOperand1(ctx);
        const tr2 = this.parseOperand2(ctx);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new constr(tr1.node, tr2.node));
    }

    public visitStrContainsExpression(ctx: StrContainsExpressionContext) : TransformerResult {
        const tr1 = this.parseOperand1(ctx);
        const tr2 = this.parseOperand2(ctx);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new StrContainsExpression(
                tr1.node as StringExpression,
                tr2.node as StringExpression));
    }

    public visitAddElementToStatement(ctx: AddElementToStatementContext) : TransformerResult {
        const exprTr = ctx.stringExpr().accept(this);
        return new TransformerResult(exprTr.statementsToPrepend, new AddElementToStatement(
            ctx.variable().accept(this).nodeOnly() as VariableWithDataLocation,
            exprTr.node as StringExpression));
    }

    public visitBroadcastAndWaitStatement(ctx: BroadcastAndWaitStatementContext) : TransformerResult {
        const exprTr = ctx.message().accept(this);
        return new TransformerResult(exprTr.statementsToPrepend,
            new BroadcastAndWaitStatement(exprTr.node as SystemMessage));
    }

    public visitBroadcastMessageStatement(ctx: BroadcastMessageStatementContext) : TransformerResult {
        const exprTr = ctx.message().accept(this);
        return new TransformerResult(
            exprTr.statementsToPrepend,
            new BroadcastMessageStatement(exprTr.node as SystemMessage));
    }

    public visitCallStmt(ctx: CallStmtContext) : TransformerResult {
        const exprTr = ctx.expressionList().accept(this);
        return new TransformerResult(
            exprTr.statementsToPrepend,
            new CallStatement(
                ctx.ident().accept(this).nodeOnly() as Identifier,
                exprTr.node as ExpressionList,
                OptionalAstNode.absent<VariableWithDataLocation>()));
    }

    public visitCloneStartEvent(ctx: CloneStartEventContext) : TransformerResult {
        return TransformerResult.withNode(new CloneStartEvent());
    }

    public visitConditionReachedEvent(ctx: ConditionReachedEventContext) : TransformerResult {
        const exprTr = ctx.boolExpr().accept(this);
        return TransformerResult.withNode(
            new ConditionReachedEvent(exprTr.statementsToPrepend,
                exprTr.node as BooleanExpression));
    }

    public visitCreateCloneOfStatement(ctx: CreateCloneOfStatementContext) : TransformerResult {
        const strTr = ctx.stringExpr().accept(this);
        return new TransformerResult(
            strTr.statementsToPrepend,
            new CreateCloneOfStatement(strTr.node as StringExpression));
    }

    public visitDeclareVariable(ctx: DeclareVariableContext) : TransformerResult {
        const type = ctx.type().accept(this).nodeOnly() as ScratchType;
        const ident = ctx.ident().accept(this).nodeOnly() as Identifier;

        const dataLoc = DataLocations.createTypedLocation(ident, type);
        const variable = new VariableWithDataLocation(dataLoc);

        this._activeDeclarationScope.putVariable(variable);

        if (this._actorScope) {
            return TransformerResult.withNode(
                new DeclareActorVariableStatement(variable));
        } else {
            return TransformerResult.withNode(
                new DeclareStackVariableStatement(variable));
        }
    }

    public visitAssumeStatement(ctx: AssumeStatementContext): TransformerResult {
        const exprTr = ctx.boolExpr().accept(this);
        return new TransformerResult(exprTr.statementsToPrepend,
            new AssumeStatement(exprTr.node as BooleanExpression));
    }

    public visitDefaultBoolExpression(ctx: DefaultBoolExpressionContext) : TransformerResult {
        return ctx.coreBoolExpr().accept(this);
    }

    public visitDefaultNumExpr(ctx: DefaultNumExprContext) : TransformerResult {
        return ctx.coreNumExpr().accept(this);
    }

    public visitDefaultStringExpression(ctx: DefaultStringExpressionContext) : TransformerResult {
        return ctx.stringExpr().accept(this);
    }

    public visitDeleteAllFromStatement(ctx: DeleteAllFromStatementContext) : TransformerResult {
        return TransformerResult.withNode(
            new DeleteAllFromStatement(ctx.variable().accept(this).nodeOnly() as VariableWithDataLocation));
    }

    public visitDeleteIthFromStatement(ctx: DeleteIthFromStatementContext) : TransformerResult {
        const numTr = ctx.numExpr().accept(this);
        return new TransformerResult(
            numTr.statementsToPrepend,
            new DeleteIthFromStatement(ctx.variable().accept(this).nodeOnly() as VariableWithDataLocation,
                numTr.node as NumberExpression));
    }

    public visitDeleteThisClone(ctx: DeleteThisCloneContext) : TransformerResult {
        return TransformerResult.withNode(new DeleteThisCloneStatement());
    }

    public visitEpsilonStatement(ctx: EpsilonStatementContext) : TransformerResult {
        return TransformerResult.withNode(new EpsilonStatement());
    }

    public visitExpressionStmt(ctx: ExpressionStmtContext) : TransformerResult {
        const tr = ctx.expression().accept(this);
        return new TransformerResult(tr.statementsToPrepend,
            new ExpressionStatement(tr.node as Expression));
    }

    public visitIndexOfExpression(ctx: IndexOfExpressionContext) : TransformerResult {
        const tr = ctx.expression().accept(this);
        return new TransformerResult(tr.statementsToPrepend,
            new IndexOfExpression(tr.node as Expression,
                ctx.variable().accept(this).nodeOnly() as VariableWithDataLocation));
    }

    public visitNumberIndexType(ctx: IndexTypeContext) : TransformerResult {
        return TransformerResult.withNode(NumberType.instance());
    }

    public visitStringIndexType(ctx: IndexTypeContext) : TransformerResult {
        return TransformerResult.withNode(StringType.instance());
    }

    public visitInheritsFrom(ctx: InheritsFromContext) : TransformerResult {
        const inheritFromList: Identifier[] = this.buildArrayFrom<Identifier>(ctx.ident()).nodeList;
        return TransformerResult.withNode(new InheritsFromList(inheritFromList));
    }

    public visitInsertAtStatement(ctx: InsertAtStatementContext) : TransformerResult {
        const numTr = ctx.numExpr().accept(this);
        const strTr = ctx.stringExpr().accept(this);
        return new TransformerResult(
            StatementLists.concat(numTr.statementsToPrepend, strTr.statementsToPrepend),
            new InsertAtStatement(ctx.variable().accept(this).nodeOnly() as VariableWithDataLocation,
                numTr.node as NumberExpression,
                strTr.node as StringExpression));
    }

    public visitIthLetterOfStringExpression(ctx: IthLetterOfStringExpressionContext) : TransformerResult {
        const numTr = ctx.numExpr().accept(this);
        const strTr = ctx.stringExpr().accept(this);
        return new TransformerResult(
            StatementLists.concat(numTr.statementsToPrepend, strTr.statementsToPrepend),
            new IthLetterOfStringExpression(
                numTr.node as NumberExpression,
                strTr.node as StringExpression));
    }

    public visitIthStringItemOfExpression(ctx: IthStringItemOfExpressionContext) : TransformerResult {
        const numTr = ctx.numExpr().accept(this);
        return new TransformerResult(
            numTr.statementsToPrepend,
            new IthStringItemOfExpression(
                numTr.node as NumberExpression,
                ctx.variable().accept(this).nodeOnly() as VariableWithDataLocation));
    }

    public visitJoinStringsExpression(ctx: JoinStringsExpressionContext) : TransformerResult {
        const tr1 = this.parseOperand1(ctx);
        const tr2 = this.parseOperand2(ctx);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new JoinStringsExpression(tr1.node as StringExpression, tr2.node as StringExpression));
    }

    public visitUserMessage(ctx: UserMessageContext) : TransformerResult {
        const strTr = ctx.stringExpr().accept(this);
        return new TransformerResult(strTr.statementsToPrepend,
            new UserMessage(strTr.node as StringExpression));
    }

    public visitSystemMessage(ctx: SystemMessageContext) : TransformerResult {
        const strTr = ctx.stringExpr().accept(this);
        return new TransformerResult(
            strTr.statementsToPrepend,
            new SystemMessage(StringLiteral.from(ctx.String().text),
                strTr.node as StringExpression,
                OptionalAstNode.absent()));
    }

    public visitLengthOfListExpression(ctx: LengthOfListExpressionContext) : TransformerResult {
        const variableWithDataLocation = new VariableWithDataLocation(
            DataLocations.createTypedLocation(
                ctx.variable().accept(this).node as Identifier,
                ListType.withElementType(StringType.instance())));
        return TransformerResult.withNode(new LengthOfListExpression(variableWithDataLocation));
    }

    public visitLengthOfStringExpression(ctx: LengthOfStringExpressionContext) : TransformerResult {
        const tr = this.ensureType(ctx, StringType.instance(), ctx.stringExpr().accept(this));
        return new TransformerResult(tr.statementsToPrepend, new LengthOfStringExpression(tr.node as StringExpression));
    }

    public visitListVariableExpression(ctx: ListVariableExpressionContext) : TransformerResult {
        return ctx.variable().accept(this);
    }

    public visitListWithElementsExpression(ctx: ListWithElementsExpressionContext) : TransformerResult {
        return ctx.expressionListPlain().accept(this);
    }

    public visitMessageReceivedEvent(ctx: MessageReceivedEventContext) : TransformerResult {
        const tr = ctx.stringExpr().accept(this);
        return new TransformerResult(
            tr.statementsToPrepend,
            new MessageReceivedEvent(StringLiteral.from(ctx.stringExpr().text),
            tr.node as StringExpression));
    }

    public visitNegatedBoolExpression(ctx: NegatedBoolExpressionContext) : TransformerResult {
        const tr = this.parseOperand1(ctx);
        return new TransformerResult(
            tr.statementsToPrepend,
            new NegationExpression(tr.node as BooleanExpression));
    }

    public visitNeverEvent(ctx: NeverEventContext) : TransformerResult {
        return TransformerResult.withNode(new NeverEvent());
    }

    public visitRenderedMonitoringEvent(ctx: RenderedMonitoringEventContext) : TransformerResult {
        return TransformerResult.withNode(new RenderedMonitoringEvent());
    }

    public visitBootstapEvent(ctx: BootstapEventContext) : TransformerResult {
        return TransformerResult.withNode(new BootstrapEvent());
    }

    public visitAfterBootstrapMonitoringEvent(ctx: AfterBootstrapMonitoringEventContext) : TransformerResult {
        return TransformerResult.withNode(new AfterBootstrapMonitoringEvent());
    }

    public visitAfterStatementMonitoringEvent(ctx: AfterStatementMonitoringEventContext) : TransformerResult {
        return TransformerResult.withNode(new AfterStatementMonitoringEvent());
    }

    public visitNumAsStringExpression(ctx: NumAsStringExpressionContext) : TransformerResult {
        const tr = ctx.numExpr().accept(this);
        return new TransformerResult(
            tr.statementsToPrepend,
            new CastExpression(tr.node as NumberExpression, StringType.instance()));
    }

    public visitParameter(ctx: ParameterContext) : TransformerResult {
        const ident: Identifier = ctx.ident().accept(this).nodeOnly() as Identifier;
        const type: ScratchType = ctx.type().accept(this).node as ScratchType;

        this._activeDeclarationScope.putTypeInformation(ident, type);

        return TransformerResult.withNode(new ParameterDeclaration(ident, type));
    }

    public visitReplaceElementAtStatement(ctx: ReplaceElementAtStatementContext) : TransformerResult {
        const strTr = ctx.stringExpr().accept(this);
        const numTr = ctx.numExpr().accept(this);
        return new TransformerResult(
            StatementLists.concat(strTr.statementsToPrepend, numTr.statementsToPrepend),
            new ReplaceElementAtStatement(
                ctx.variable().accept(this).nodeOnly() as VariableWithDataLocation,
                numTr.node as NumberExpression,
                strTr.node as StringExpression));
    }

    public visitSoundResource(ctx: SoundResourceContext): TransformerResult {
        return TransformerResult.withNode(SoundResourceType.instance());
    }

    public visitImageResource(ctx: SoundResourceContext): TransformerResult {
        return TransformerResult.withNode(ImageResourceType.instance());
    }

    public visitStoreEvalResultStatement(ctx: StoreEvalResultStatementContext) : TransformerResult {
        const variable = ctx.variable().accept(this).nodeOnly() as VariableWithDataLocation;
        const varType = ScratchType.fromId(variable.dataloc.type);
        const exprTr = this.ensureType(ctx, varType, ctx.expression().accept(this));
        const exprType = (exprTr.node as Expression).expressionType;
        Preconditions.checkNotUndefined(exprType);

        return new TransformerResult(
            exprTr.statementsToPrepend,
            new StoreEvalResultToVariableStatement(variable, exprTr.node as Expression));
    }

    public visitStoreCallResultStatement(ctx: StoreCallResultStatementContext) : TransformerResult {
        const exprListTr = ctx.callStmt().expressionList().expressionListPlain().accept(this);
        const methodIdent = ctx.callStmt().ident().accept(this).nodeOnly() as Identifier;
        const toVar = ctx.variable().accept(this).nodeOnly() as VariableWithDataLocation;
        return new TransformerResult(exprListTr.statementsToPrepend,
            new CallStatement(methodIdent, exprListTr.node as ExpressionList, OptionalAstNode.with(toVar)));
    }

    public visitStartupEvent(ctx: StartupEventContext) : TransformerResult {
        return TransformerResult.withNode(new StartupEvent());
    }

    public visitStopAll(ctx: StopAllContext) : TransformerResult {
        return TransformerResult.withNode(new StopAllStatement());
    }

    public visitStopOthersInActorStatement(ctx: StopOthersInActorStatementContext) : TransformerResult {
        return TransformerResult.withNode(new StopOthersInActorStatement());
    }

    public visitStopThis(ctx: StopThisContext) : TransformerResult {
        return TransformerResult.withNode(new StopThisStatement());
    }

    public visitStringParanthExpression(ctx: StringParanthExpressionContext): TransformerResult {
        return ctx.coreStringExpr().accept(this);
    }

    public visitNumAsBoolExpression(ctx: NumAsBoolExpressionContext): TransformerResult {
        const tr = ctx.numExpr().accept(this);
        Preconditions.checkArgument(!(tr.node instanceof Identifier));

        return new TransformerResult(
            tr.statementsToPrepend,
            new CastExpression(tr.node as Expression, BooleanType.instance()));
    }

    public visitStringAsNumExpression(ctx: StringAsNumExpressionContext) : TransformerResult {
        const tr = ctx.stringExpr().accept(this);
        Preconditions.checkArgument(!(tr.node instanceof Identifier));

        return new TransformerResult(
            tr.statementsToPrepend,
            new CastExpression(tr.node as Expression, NumberType.instance()));
    }

    public visitLocateActorExpression(ctx: LocateActorExpressionContext): TransformerResult {
        const nameTr = ctx.stringExpr().accept(this);
        return new TransformerResult(nameTr.statementsToPrepend, new LocateActorExpression(nameTr.node as StringExpression));
    }

    public visitActorVariableExpression(ctx: ActorVariableExpressionContext): TransformerResult {
        return ctx.variable().accept(this);
    }

    public visitStringAttributeOfExpression(ctx: StringAttributeOfExpressionContext) : TransformerResult {
        const trAttribute = this.ensureType(ctx, StringType.instance(), ctx.stringExpr().accept(this));
        const trActor = this.ensureType(ctx, ActorType.instance(), ctx.actorExpr().accept(this));

        return new TransformerResult(
            StatementLists.concat(trAttribute.statementsToPrepend, trActor.statementsToPrepend),
            new StringAttributeOfExpression(trAttribute.node as StringExpression,
                trActor.node as ActorExpression));
    }

    public unquote(str: string): string {
        return str.replace(/^"(.*)"$/, '$1');
    }

    public visitStringLiteralExpression(ctx: StringLiteralExpressionContext) : TransformerResult {
        return TransformerResult.withNode(StringLiteral.from(this.unquote(ctx.text)));
    }

    public visitStringVariableExpression(ctx: StringVariableExpressionContext) : TransformerResult {
        // Do not StringVariableExpression here!! (but a type-independent variable)
        // (to deal with ambiguities in the parsing process)
        return ctx.variable().accept(this);
    }

    public visitTimerExpression(ctx: TimerExpressionContext) : TransformerResult {
        let prepend: StatementList = StatementList.empty();

        const resultVarIdent: Identifier = Identifier.fresh();
        const resultVar = new VariableWithDataLocation(DataLocations.createTypedLocation(resultVarIdent, NumberType.instance()));
        const resultVarExpr = this.createVariableExpression(NumberType.instance(), resultVarIdent);
        const declarationStmt = new DeclareStackVariableStatement(resultVar);
        prepend = StatementLists.concat(prepend, StatementList.from([declarationStmt]));

        this._activeDeclarationScope.putVariable(resultVar);

        const storeCallResultStmt = new CallStatement(Identifier.of(MethodIdentifiers._RUNTIME_timerValue),
            new ExpressionList([]), OptionalAstNode.with(resultVar));
        prepend = StatementLists.concat(prepend, StatementList.from([storeCallResultStmt]));

        return new TransformerResult(prepend, resultVarExpr);
    }

    public visitUnspecifiedBoolExpression(ctx: UnspecifiedBoolExpressionContext) : TransformerResult {
        throw new ImplementMeException();
    }

    public visitUnspecifiedExpr(ctx: UnspecifiedExprContext) : TransformerResult {
        throw new ImplementMeException();
    }

    public visitUnspecifiedNumExpr(ctx: UnspecifiedNumExprContext) : TransformerResult {
        throw new ImplementMeException();
    }

    public visitUnspecifiedStringExpression(ctx: UnspecifiedStringExpressionContext) : TransformerResult {
        throw new ImplementMeException();
    }

    public visitVariable(ctx: VariableContext) : TransformerResult {
        const varIdent = new Identifier(ctx.text);
        return this.produceVariableFromIdentifier(varIdent);
    }

    public visitFlatVariable(ctx: FlatVariableContext): TransformerResult {
        const varIdent = new Identifier(ctx.ident().text);
        return this.produceVariableFromIdentifier(varIdent);
    }

    public visitQualifiedVariable(ctx: QualifiedVariableContext): TransformerResult {
        throw new ImplementMeException();
    }

    private produceVariableFromIdentifier(varIdent: Identifier): TransformerResult {
        const varType = this.getTypeOf(varIdent);
        Preconditions.checkNotUndefined(varType);
        return TransformerResult.withNode(new VariableWithDataLocation(DataLocations.createTypedLocation(varIdent, varType)));
    }

    public visitWaitSecsStatement(ctx: WaitSecsStatementContext) : TransformerResult {
        const secondsTr = ctx.numExpr().accept(this);

        const methodToCall: string = this._config.useBusyWaiting
            ? MethodIdentifiers._BUSY_WAIT_waitSeconds
            : MethodIdentifiers._RUNTIME_waitSeconds;

        return new TransformerResult(
            secondsTr.statementsToPrepend,
            new CallStatement(Identifier.of(methodToCall),
                new ExpressionList([secondsTr.node as Expression]), OptionalAstNode.absent()));
    }

    public visitResetTimerStatement(ctx: ResetTimerStatementContext): TransformerResult {
        const methodToCall = MethodIdentifiers._RUNTIME_resetTimer;
        return TransformerResult.withNode(
            new CallStatement(Identifier.of(methodToCall),
                new ExpressionList([]), OptionalAstNode.absent()));
    }

    public visitWaitUntilStatement(ctx: WaitUntilStatementContext) : TransformerResult {
        const tr = ctx.boolExpr().accept(this);
        return new TransformerResult(
            tr.statementsToPrepend,
            new WaitUntilStatement(tr.node as BooleanExpression));
    }

    visit(tree: ParseTree): TransformerResult {
        throw new ImplementMeException();
    }

    private identifyProcedureCall(node: RuleNode) : string|null {
        let result: string = node.constructor.name;
        const stmtMatch = STATEMENT_MATCHER.exec(result);
        if (stmtMatch) {
            return this.toCamelCase(stmtMatch.groups.method);
        }
        return null;
    }

    private identifyFunctionCall(node: RuleNode) : string|null {
        let result: string = node.constructor.name;
        const exprMatch = EXPRESSION_MATCHER.exec(result);
        if (exprMatch) {
            return this.toCamelCase(exprMatch.groups.method);
        } else {
            return null;
        }
    }

    private identifyIntermediateMethodName(node: RuleNode) : string|null {
        let result: string = node.constructor.name;
        const stmtMatch = STATEMENT_MATCHER.exec(result);
        if (stmtMatch) {
            return stmtMatch.groups.method;
        } else {
            const exprMatch = EXPRESSION_MATCHER.exec(result);
            if (exprMatch) {
                return this.toCamelCase(exprMatch.groups.method);
            } else {
                return null;
            }
        }
    }

    private toCamelCase(str: string): string {
        // https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
            return index == 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    private createVariableExpression(type: ScratchType, ident: Identifier): Expression {
        const dataLoc = DataLocations.createTypedLocation(ident, type);
        const variable = new VariableWithDataLocation(dataLoc);

        // FIXME: Magic strings
        if (type.constructor.name == "NumberType") {
            return new NumberVariableExpression(variable);

        } else if (type.constructor.name == "StringType") {
            return new StringVariableExpression(variable);

        } else if (type.constructor.name == "BooleanType") {
            return new BooleanVariableExpression(variable);
        }

        throw new ImplementMeException();
    }

    /**
     * Constructs a list of arguments for a method call.
     * @param node
     */
    private childsAsExpressionList(node: RuleNode): TTransformerResult<ExpressionList> {
        let prepend: StatementList = StatementList.empty();
        let result: Expression[] = [];
        for (let i = 0; i<node.childCount; i++) {
            const child = node.getChild(i);
            if (!(child instanceof TerminalNode)) {
                const childTr: TransformerResult = child.accept(this);
                prepend = StatementLists.concat(prepend, childTr.statementsToPrepend);
                result.push(childTr.node as Expression);
            }
        }
        return new TTransformerResult(prepend,
            new ExpressionList(result));
    }

    private determineResultType(node: RuleNode): ScratchType {
        throw new ImplementMeException();
    }

    private isMethodInLib(methodName: string): boolean {
        Preconditions.checkNotUndefined(methodName);

        const defs = this._methodLibrary.getMethodDefinition(methodName);
        if (defs.elements.length == 1) {
            return true;
        }

        if (defs.elements.length > 1) {
            throw new IllegalArgumentException(`Method library has ambiguous method defs for "${methodName}"`);
        }

        return false;
    }

    private hasErrorChilds(node: RuleNode) {
        for (let i = 0; i<node.childCount; i++) {
            const child = node.getChild(i);
            if (child instanceof ErrorNode) {
                return true;
            }
        }
        return false;
    }

    private visitSingleChild(ctx: RuleNode): TransformerResult {
        if (ctx.childCount == 1) {
            return ctx.getChild(0).accept(this);
        }

        if (ctx.childCount > 0) {
            throw new IllegalArgumentException(ctx.constructor.name + " not a single-child node!");
        }

        throw new IllegalArgumentException(ctx.constructor.name + " is a terminal node!");
    }

    private transformCallStatementToVariable(ctx: CallStmtContext): TransformerResult {
        let prepend: StatementList = StatementList.empty();

        const methodIdent = ctx.ident().accept(this).nodeOnly() as Identifier;
        const methodSig = this._activeDeclarationScope.getMethodSignature(methodIdent);

        Preconditions.checkNotUndefined(methodSig);
        const resultVarType: ScratchType = methodSig.returns.type;

        const resultVarIdent: Identifier = Identifier.fresh();
        const resultVar = new VariableWithDataLocation(DataLocations.createTypedLocation(resultVarIdent, resultVarType));
        const resultVarExpr = this.createVariableExpression(resultVarType, resultVarIdent);
        const declarationStmt = new DeclareStackVariableStatement(resultVar);
        prepend = StatementLists.concat(prepend, StatementList.from([declarationStmt]));

        this._activeDeclarationScope.putVariable(resultVar);

        const argsTr = ctx.expressionList().accept(this);
        const storeCallResultStmt = new CallStatement(methodIdent,
            argsTr.node as ExpressionList, OptionalAstNode.with(resultVar));
        prepend = StatementLists.concat(prepend, argsTr.statementsToPrepend);
        prepend = StatementLists.concat(prepend, StatementList.from([storeCallResultStmt]));

        return new TransformerResult(prepend, resultVarExpr);
    }

    visitNumCallStatementExpression(ctx: NumCallStatementExpressionContext): TransformerResult {
        return this.transformCallStatementToVariable(ctx.callStmt());
    }

    visitStringCallStatementExpression(ctx: StringCallStatementExpressionContext): TransformerResult {
        return this.transformCallStatementToVariable(ctx.callStmt());
    }

    visitBoolCallStatementExpression(ctx: BoolCallStatementExpressionContext): TransformerResult {
        return this.transformCallStatementToVariable(ctx.callStmt());
    }

    visitCoreStringExpression(ctx: CoreStringExprContext): TransformerResult {
        return this.visitSingleChild(ctx);
    }

    visitCoreBoolExpression(ctx: CoreStringExprContext): TransformerResult {
        return this.visitSingleChild(ctx);
    }

    visitCoreBoolExpr(ctx: CoreBoolExprContext): TransformerResult {
        return this.visitSingleChild(ctx);
    }

    visitCoreNumExpression(ctx: CoreStringExprContext): TransformerResult {
        return this.visitSingleChild(ctx);
    }

    visitChildren(node: RuleNode): TransformerResult {
        const functionCandidateName: string = this.identifyFunctionCall(node);
        if (functionCandidateName) {
            if (this.isMethodInLib(functionCandidateName)) {
                let prepend = StatementList.empty();

                const resultVarIdent: Identifier = Identifier.fresh();
                const resultVarType = this.determineResultType(node);
                const resultVar = new VariableWithDataLocation(DataLocations.createTypedLocation(resultVarIdent, resultVarType));
                const resultVarExpr = this.createVariableExpression(resultVarType, resultVarIdent);
                const declarationStmt = new DeclareStackVariableStatement(resultVar);
                prepend = StatementLists.concat(prepend, StatementList.from([declarationStmt]));

                const argsTr: TTransformerResult<ExpressionList> = this.childsAsExpressionList(node);
                prepend = StatementLists.concat(prepend, argsTr.statementsToPrepend);

                prepend = StatementLists.concat(prepend, StatementList.from([
                    new CallStatement(
                        Identifier.of(functionCandidateName),
                        argsTr.node,
                        OptionalAstNode.with(new VariableWithDataLocation(DataLocations.createTypedLocation(resultVarIdent, resultVarType))))
                ]));

                return new TransformerResult(prepend, resultVarExpr);
            }
        }

        const procedureCandidateName: string = this.identifyProcedureCall(node);
        if (procedureCandidateName) {
            if (this.isMethodInLib(procedureCandidateName)) {
                let prepend = StatementList.empty();

                const argsTr: TTransformerResult<ExpressionList> = this.childsAsExpressionList(node);
                prepend = StatementLists.concat(prepend, argsTr.statementsToPrepend);

                return new TransformerResult(prepend,
                    new CallStatement(
                        Identifier.of(procedureCandidateName),
                        argsTr.node,
                        OptionalAstNode.absent()));
            }
        }

        return this.visitSingleChild(node);
    }

    visitErrorNode(node: ErrorNode): TransformerResult {
        throw new ImplementMeException();
    }

    visitTerminal(node: TerminalNode): TransformerResult {
        throw new ImplementMeException();
    }

    private ensureType0(context: ParserRuleContext, varType: ScratchType, transformerResult: TransformerResult): TransformerResult {
        if (transformerResult.node['expressionType'] == varType) {
            return transformerResult;

        } else if (transformerResult.node instanceof Identifier) {
            const varExpr = new VariableWithDataLocation(DataLocations.createTypedLocation(transformerResult.node, varType));
            return new TransformerResult(transformerResult.statementsToPrepend, varExpr);

        } else {
            throw new ParsingException(`Type ${varType.toTreeString()} expected.`, context);
        }
    }

    private ensureType(context: ParserRuleContext, varType: ScratchType, transformerResult: TransformerResult): TransformerResult {
        const result = this.ensureType0(context, varType, transformerResult);

        if (result.node instanceof VariableWithDataLocation) {
            const declaredType: ScratchType = this.getTypeOf(result.node.identifier);
            if (declaredType.typeId != varType.typeId) {
                throw new ParsingException(`Expected type ${varType.toTreeString()} differs from declared ${declaredType.toTreeString()}`, context);
            }
        }

        return result;
    }
}

export class ToIntermediateTransformer {

    transform(methodLib: App, origin: RuleNode, typeInformationStorage: TypeInformationStorage,
              config: {}, filePath: string): AstNode {
        const transformerConfig = new TransformerConfig(config);
        const visitor = new ToIntermediateVisitor(transformerConfig, methodLib, typeInformationStorage, filePath);
        return origin.accept(visitor).nodeOnly();
    }

}
