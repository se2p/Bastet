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

import {ErrorNode, ParseTree, RuleNode, TerminalNode} from "antlr4ts/tree";
import {ScratchVisitor} from "../parser/grammar/ScratchVisitor";
import {AbsentAstNode, AstNode, OptionalAstNode, PresentAstNode} from "../ast/AstNode";
import {
    ActorComponentsDefinitionContext,
    ActorDefinitionContext,
    ActorDefinitionListContext,
    ActorModeContext,
    ActorRoleModeContext,
    AddElementToStatementContext, AfterBootstrapMonitoringEventContext,
    AfterStatementMonitoringEventContext,
    AppMessageContext,
    BoolAndExpressionContext,
    BoolAsNumExpressionContext,
    BoolAsStringExpressionContext,
    BoolCallStatementExpressionContext,
    BooleanTypeContext,
    BoolLiteralExpressionContext,
    BoolOrExpressionContext,
    BoolParanthExpressionContext,
    BoolVariableExpressionContext, BootstapEventContext,
    BroadcastAndWaitStatementContext,
    BroadcastMessageStatementContext,
    CallStmtContext,
    ChagenAttributeByStatementContext,
    ChangeVarByStatementContext,
    CloneStartEventContext,
    ColorFromNumExpressionContext,
    ConcreteActorModeContext,
    ConditionReachedEventContext,
    CoreBoolExprContext,
    CoreStringExprContext,
    CreateCloneOfStatementContext,
    DeclarationStmtListContext,
    DeclareAttributeContext,
    DeclareAttributeOfContext,
    DeclareVariableContext,
    DefaultBoolExpressionContext,
    DefaultNumExprContext,
    DefaultStringExpressionContext,
    DeleteAllFromStatementContext,
    DeleteIthFromStatementContext,
    DeleteThisCloneContext,
    EnumTypeContext,
    EpsilonStatementContext,
    ExpressionListContext,
    ExpressionListPlainContext,
    ExpressionStmtContext,
    ExternFunctionReturnDefinitionContext,
    ExternMethodDefinitionContext,
    ExternMethodDefinitionListContext,
    ExternMethodResultDeclarationContext,
    ExternVoidReturnDefinitionContext,
    FunctionReturnDefinitionContext,
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
    KeyContext,
    LengthOfListExpressionContext,
    LengthOfStringExpressionContext,
    ListTypeContext,
    ListVariableExpressionContext,
    ListWithElementsExpressionContext,
    MapTypeContext,
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
    NumEqualsExpressionContext,
    NumFunctContext,
    NumFunctExpressionContext,
    NumGreaterThanExpressionContext,
    NumLessThanExpressionContext,
    NumLiteralExpressionContext,
    NumMinusExpressionContext,
    NumModExpressionContext,
    NumMulExpressionContext,
    NumPlusExpressionContext,
    NumRandomExpressionContext,
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
    ResourceContext,
    ResourceListContext,
    ResourceLocatorContext,
    ScriptContext,
    ScriptListContext,
    SetAttributeOfToStatementContext,
    SetAttributeToStatementContext,
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
    StrEqualsExpressionContext,
    StrGreaterThanExpressionContext,
    StrIdentExpressionContext,
    StringAsNumExpressionContext,
    StringAttributeOfExpressionContext,
    StringCallStatementExpressionContext,
    StringLiteralExpressionContext,
    StringParanthExpressionContext,
    StringTypeContext,
    StringVariableExpressionContext,
    StrLessThanExpressionContext,
    SystemMessageContext,
    TimerExpressionContext,
    UnspecifiedBoolExpressionContext,
    UnspecifiedExprContext,
    UnspecifiedNumExprContext,
    UnspecifiedStringExpressionContext,
    UntilStmtContext,
    VarContainsExpressionContext,
    VariableContext,
    VoidReturnDefinitionContext,
    WaitSecsStatementContext,
    WaitUntilStatementContext
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
    DeclareAttributeOfStatement,
    DeclareAttributeStatement,
    DeclareStackVariableStatement,
    VariableDeclaration
} from "../ast/core/statements/DeclarationStatement";
import {
    SetAttributeToStatement,
    StoreCallResultToVariableStatement,
    StoreEvalResultToVariableStatement
} from "../ast/core/statements/SetStatement";
import {Expression} from "../ast/core/expressions/Expression";
import {ExpressionList} from "../ast/core/expressions/ExpressionList";
import {ParameterDeclaration, ParameterDeclarationList} from "../ast/core/ParameterDeclaration";
import {
    BooleanType,
    ListType,
    MapType,
    NumberType,
    ScratchType,
    StringEnumType,
    StringType,
    VoidType
} from "../ast/core/ScratchType";
import {
    AfterBootstrapMonitoringEvent,
    AfterStatementMonitoringEvent, BootstrapEvent,
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
    LengthOfStringExpression,
    LengthOListExpression,
    MinusExpression,
    ModuloExpression,
    MultiplyExpression,
    NumberExpression,
    NumberLiteral,
    NumberVariableExpression,
    PickRandomFromExpression,
    PlusExpression,
    StringAsNumberExpression,
    TimerExpression
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
import {ChangeAttributeByStatement} from "../ast/core/statements/ChangeAttributeByStatement";
import {ChangeVarByStatement} from "../ast/core/statements/ChangeVarByStatement";
import {CreateCloneOfStatement} from "../ast/core/statements/CreateCloneOfStatement";
import {
    DeleteThisCloneStatement,
    StopAllStatement,
    StopThisStatement
} from "../ast/core/statements/TerminationStatement";
import {SystemMessage} from "../ast/core/Message";
import {StopOthersInActorStatement} from "../ast/core/statements/StopOthersInActorStatement";
import {WaitSecsStatement} from "../ast/core/statements/WaitSecsStatement";
import {WaitUntilStatement} from "../ast/core/statements/WaitUntilStatement";
import {Preconditions} from "../../utils/Preconditions";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";
import {App} from "../app/App";
import {AbstractVariable, Variable, VariableWithDataLocation} from "../ast/core/Variable";
import {DataLocations} from "../app/controlflow/DataLocation";
import {NumberVariable} from "../../procedures/domains/MemoryTransformer";

const toposort = require('toposort')

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

class TransformerResult extends TTransformerResult<AstNode> {

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

export class ActorTypeInformation {

    private readonly _actor: Identifier;

    private _methods: {[id: string]: MethodSignature};

    private _actorVariables: {[id: string]: VariableDeclaration};

    constructor(actor: Identifier) {
        this._actor = actor;
        this._methods = {};
        this._actorVariables = {};
    }

    public putMethod(signature: MethodSignature) {
        this._methods[signature.ident.text] = signature;
    }

    public putVariable(v: VariableDeclaration) {
        this._actorVariables[v.ident.text] = v;
    }

    public getMethodResultType(ident: Identifier): ScratchType {
        return this.getMethodSignature(ident).returns.type;
    }

    public getMethodSignature(ident: Identifier): MethodSignature {
        let result: MethodSignature = this._methods[ident.text];
        if (!result) {
            throw new IllegalArgumentException("No method signature for the given identifier: " + ident.text);
        }
        return result;
    }

    public addAllFrom(infos: ActorTypeInformation) {
        Preconditions.checkNotUndefined(infos);

        for (let m of Object.values(infos.methods)) {
            this.putMethod(m);
        }

        for (let v of Object.values(infos.variables)) {
            this.putVariable(v);
        }
    }

    get variables(): {[id: string]: VariableDeclaration} {
        return this._actorVariables;
    }

    get methods(): {[id: string]: MethodSignature} {
        return this._methods;
    }

    get actor(): Identifier {
        return this._actor;
    }
}

export class TypeInformationStorage {

    private _actorTypeInfos: {[id: string]: ActorTypeInformation};

    constructor() {
        this._actorTypeInfos = {};
    }

    public putActorTypeInformation(ti: ActorTypeInformation) {
        Preconditions.checkNotUndefined(ti);
        this._actorTypeInfos[ti.actor.text] = ti;
    }

    public getInfos(id: Identifier): ActorTypeInformation {
        Preconditions.checkNotUndefined(id);
        return this._actorTypeInfos[id.text];
    }

}

class ToIntermediateVisitor implements ScratchVisitor<TransformerResult> {

    private _actorTypeInfos: TypeInformationStorage;
    private _activeActorTypes: ActorTypeInformation;
    private readonly _methodLibrary: App;
    private readonly _typeStack: Array<ScratchType>;
    private _actorScope : boolean;

    constructor(methodLibrary: App, typeInformationStorage: TypeInformationStorage) {
        Preconditions.checkNotUndefined(methodLibrary);
        this._methodLibrary = methodLibrary;
        this._typeStack = new Array<ScratchType>();
        this._activeActorTypes = null;
        this._actorTypeInfos = typeInformationStorage;
        this._actorScope = false;
    }

    get actorTypeInfos(): TypeInformationStorage {
        return this._actorTypeInfos;
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

    private getOperand1(ctx: RuleNode): RuleNode {
        return this.getArgumentNodes(ctx)[0];
    }

    private getOperand2(ctx: RuleNode): RuleNode {
        return this.getArgumentNodes(ctx)[1];
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
        return TransformerResult.withNode(new Identifier(StringLiteral.from(ctx.Identifier().text)));
    }

    public visitStrIdentExpression(ctx: StrIdentExpressionContext): TransformerResult {
        return TransformerResult.withNode(new Identifier(StringLiteral.from(ctx.text)));
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

    private precollectMethodSignatures(actorIdent: Identifier, ctx: MethodDefinitionListContext,
                                       ectx: ExternMethodDefinitionListContext) {

        for (let md of ctx.methodDefinition()) {
            const identTr = md.ident().accept(this);
            const paramsTr = md.parameterList().accept(this);
            const resultTr = md.methodResultDeclaration().accept(this);

            this._activeActorTypes.putMethod(new MethodSignature(
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

            this._activeActorTypes.putMethod(new MethodSignature(
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

        this._activeActorTypes = new ActorTypeInformation(ident);
        try {
            this._actorTypeInfos.putActorTypeInformation(this._activeActorTypes);
            if (!inheritesFrom.isEmpty()) {
                for (let id of inheritesFrom.elements) {
                    const inheritsFromName = id.text;
                    const baseActorTypeInfos: ActorTypeInformation = this._actorTypeInfos.getInfos(id);
                    if (!baseActorTypeInfos) {
                        throw new IllegalStateException(`Type infos for ${inheritsFromName} missing`);
                    }
                    this._activeActorTypes.addAllFrom(baseActorTypeInfos);
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
            this._activeActorTypes = null;
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

    public visitMethodDefinition(ctx: MethodDefinitionContext) : TransformerResult {
        return TransformerResult.withNode(new MethodDefinition(
            ctx.ident().accept(this).nodeOnly() as Identifier,
            ctx.parameterList().accept(this).nodeOnly() as ParameterDeclarationList,
            ctx.stmtList().accept(this).nodeOnly() as StatementList,
            ctx.methodResultDeclaration().accept(this).nodeOnly() as ResultDeclaration));
    }

    public visitMethodDefinitionList(ctx: MethodDefinitionListContext) : TransformerResult {
        const defs = this.buildArrayFrom<MethodDefinition>(ctx.methodDefinition());
        return new TransformerResult(defs.statementsToPrepend, new MethodDefinitionList(defs.nodeList));
    }

    public visitFunctionReturnDefinition(ctx: FunctionReturnDefinitionContext) : TransformerResult {
        const ident = ctx.ident().accept(this).nodeOnly() as Identifier;
        const resultType = ctx.type().accept(this).nodeOnly() as ScratchType;
        const resultVar = new VariableWithDataLocation(DataLocations.createTypedLocation(ident, resultType));
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
        return new TransformerResult(stmts.statementsToPrepend, new StatementList(stmts.nodeList));
    }

    public visitScript(ctx: ScriptContext) : TransformerResult {
        return TransformerResult.withNode(new ScriptDefinition(
            ctx.event().accept(this).nodeOnly() as CoreEvent,
            ctx.stmtList().accept(this).nodeOnly() as StatementList));
    }

    public visitScriptList(ctx: ScriptListContext) : TransformerResult {
        const defs = this.buildArrayFrom<ScriptDefinition>(ctx.script());
        return new TransformerResult(defs.statementsToPrepend, new ScriptDefinitionList(defs.nodeList));
    }

    public visitExpressionList(ctx: ExpressionListContext) : TransformerResult {
        const elems = this.buildArrayFrom<Expression>(ctx.expressionListPlain().expression());
        return new TransformerResult(elems.statementsToPrepend, new ExpressionList(elems.nodeList));
    }

    public visitExpressionListPlain(ctx: ExpressionListPlainContext): TransformerResult {
        const elems = this.buildArrayFrom<Expression>(ctx.expression());
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
        let result: StatementList = StatementList.empty();

        for (let idc of ctx.stmtListPlain().stmt()) {
            const tr: TransformerResult = idc.accept(this);
            result = StatementLists.concat(result, tr.statementsToPrepend);
            const trs: StatementList = new StatementList([ tr.node as Statement ]);
            result = StatementLists.concat(result, trs);
        }

        if (ctx.terminationStmt()) {
            const tr: TransformerResult = ctx.terminationStmt().accept(this);
            result = StatementLists.concat(result, tr.statementsToPrepend);
            const trs: StatementList = new StatementList([ tr.node as Statement ]);
            result = StatementLists.concat(result, trs);
        }

        return TransformerResult.withNode(result);
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

    public visitMapType (ctx: MapTypeContext): TransformerResult {
        return TransformerResult.withNode(MapType.withIndexType(ctx.indexType().accept(this).nodeOnly() as ScratchType));
    }

    public visitActorComponentsDefinition (ctx: ActorComponentsDefinitionContext): TransformerResult {
        throw new IllegalStateException("Not expected to be needed.");
    }

    public visitUntilStmt (ctx: UntilStmtContext): TransformerResult {
        const cond: TransformerResult = ctx.boolExpr().accept(this);
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

    public visitIfStmt (ctx: IfStmtContext): TransformerResult {
        const cond: TransformerResult = ctx.boolExpr().accept(this);
        return new TransformerResult(
            cond.statementsToPrepend,
            new IfStatement(
                cond.nodeOnly() as BooleanExpression,
                ctx.stmtList().accept(this).nodeOnly() as StatementList,
                this.statementListFrom(ctx.elseCase().stmtList())));
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
        const tr1 = this.getOperand1(ctx).accept(this);
        const tr2 = this.getOperand2(ctx).accept(this);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new DivideExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    public visitNumEqualsExpression(ctx: NumEqualsExpressionContext) : TransformerResult {
        const tr1 = this.getOperand1(ctx).accept(this);
        const tr2 = this.getOperand2(ctx).accept(this);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new NumEqualsExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    public visitNumFunct(ctx: NumFunctContext) : TransformerResult {
        return TransformerResult.withNode(new StringLiteral(ctx.text));
    }

    public visitNumFunctExpression(ctx: NumFunctExpressionContext) : TransformerResult {
        let prepend: StatementList = StatementList.empty();

        // Declare and initialize a fresh variable for the result
        const resultVarIdent: Identifier = Identifier.fresh();
        const resultVar = new VariableWithDataLocation(DataLocations.createTypedLocation(resultVarIdent, NumberType.instance()));
        const resultVarExpr = new NumberVariableExpression(resultVar);
        const declarationStmt = new DeclareStackVariableStatement(resultVar);
        const initStmt: Statement = new StoreEvalResultToVariableStatement(resultVar, NumberLiteral.of(0));
        prepend = StatementLists.concat(prepend, StatementList.from([declarationStmt, initStmt]));

        // Function call
        // - Arguments
        const argsTr = ctx.coreNumExpr().accept(this);
        const callArgs = new ExpressionList([argsTr.node as Expression]);
        prepend = StatementLists.concat(prepend, argsTr.statementsToPrepend);
        // - The actual call statement
        const callMethodIdent = new Identifier(ctx.numFunct().accept(this).nodeOnly() as StringLiteral);
        const callStmt = new CallStatement(callMethodIdent, callArgs, OptionalAstNode.with(resultVarIdent));
        prepend = StatementLists.concat(prepend, new StatementList([callStmt]));

        return new TransformerResult(prepend, resultVarExpr);
    }

    public visitNumGreaterThanExpression(ctx: NumGreaterThanExpressionContext) : TransformerResult {
        const tr1 = this.getOperand1(ctx).accept(this);
        const tr2 = this.getOperand2(ctx).accept(this);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new NumGreaterThanExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    public visitNumLessThanExpression(ctx: NumLessThanExpressionContext) : TransformerResult {
        const tr1 = this.getOperand1(ctx).accept(this);
        const tr2 = this.getOperand2(ctx).accept(this);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new NumLessThanExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    public visitNumLiteralExpression(ctx: NumLiteralExpressionContext) : TransformerResult {
        return TransformerResult.withNode(NumberLiteral.fromFloatString(ctx.number().text));
    }

    public visitNumMinusExpression(ctx: NumMinusExpressionContext) : TransformerResult {
        const tr1 = this.getOperand1(ctx).accept(this);
        const tr2 = this.getOperand2(ctx).accept(this);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new MinusExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    public visitNumModExpression(ctx: NumModExpressionContext) : TransformerResult {
        const tr1 = this.getOperand1(ctx).accept(this);
        const tr2 = this.getOperand2(ctx).accept(this);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new ModuloExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    public visitNumMulExpression(ctx: NumMulExpressionContext) : TransformerResult {
        const tr1 = this.getOperand1(ctx).accept(this);
        const tr2 = this.getOperand2(ctx).accept(this);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new MultiplyExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    public visitNumPlusExpression(ctx: NumPlusExpressionContext) : TransformerResult {
        const tr1 = this.getOperand1(ctx).accept(this);
        const tr2 = this.getOperand2(ctx).accept(this);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new PlusExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    public visitNumRandomExpression(ctx: NumRandomExpressionContext) : TransformerResult {
        // We support this as a native operation.
        // This is useful if dealing with non-det data that can be in a specific range
        const tr1 = this.getOperand1(ctx).accept(this);
        const tr2 = this.getOperand2(ctx).accept(this);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new PickRandomFromExpression(
                tr1.node as NumberExpression,
                tr2.node as NumberExpression));
    }

    public visitNumVariableExpression(ctx: NumVariableExpressionContext) : TransformerResult {
        const ident = ctx.variable().accept(this).nodeOnly() as Identifier;
        const variable = new VariableWithDataLocation(DataLocations.createTypedLocation(ident, NumberType.instance()));
        return TransformerResult.withNode(new NumberVariableExpression(variable));
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

        let prepend: StatementList = StatementList.empty();
        prepend = StatementLists.concat(prepend, StatementList.from([declareVarStmt, initStmt]));

        return new TTransformerResult(prepend, resultVarExpr);
    }

    private evaluateIntoBooleanVariable(varExpr: BooleanVariableExpression, expr: RuleNode): TTransformerResult<BooleanVariableExpression> {
        const tr1: TransformerResult = expr.accept(this);

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
        return new TransformerResult(exprTr.statementsToPrepend, new BoolAsNumberExpression(exprTr.node as BooleanExpression));
    }

    public visitBoolAsStringExpression(ctx: BoolAsStringExpressionContext) : TransformerResult {
        const exprTr: TransformerResult = ctx.boolExpr().accept(this);
        return new TransformerResult(exprTr.statementsToPrepend, new BoolAsStringExpression(exprTr.node as BooleanExpression));
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
        return TransformerResult.withNode(new BooleanVariableExpression(ctx.variable().accept(this).nodeOnly() as AbstractVariable));
    }

    private constructBinaryOp(ctx: RuleNode, constr: new (n1:AstNode, n2:AstNode) => AstNode) : TransformerResult {
        const tr1 = this.getOperand1(ctx).accept(this);
        const tr2 = this.getOperand2(ctx).accept(this);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new constr(tr1.node, tr2.node));
    }

    public visitStrContainsExpression(ctx: StrContainsExpressionContext) : TransformerResult {
        const tr1 = this.getOperand1(ctx).accept(this);
        const tr2 = this.getOperand2(ctx).accept(this);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new StrContainsExpression(
                tr1.node as StringExpression,
                tr2.node as StringExpression));
    }

    public visitStrEqualsExpression(ctx: StrEqualsExpressionContext) : TransformerResult {
        return this.constructBinaryOp(ctx, StrEqualsExpression);
    }

    public visitStrGreaterThanExpression(ctx: StrGreaterThanExpressionContext) : TransformerResult {
        return this.constructBinaryOp(ctx, StrGreaterThanExpression);
    }

    public visitStrLessThanExpression(ctx: StrLessThanExpressionContext) : TransformerResult {
        return this.constructBinaryOp(ctx, StrLessThanExpression);
    }

    public visitAddElementToStatement(ctx: AddElementToStatementContext) : TransformerResult {
        const exprTr = ctx.stringExpr().accept(this);
        return new TransformerResult(exprTr.statementsToPrepend, new AddElementToStatement(
            ctx.variable().accept(this).nodeOnly() as AbstractVariable,
            exprTr.node as StringExpression));
    }

    public visitBroadcastAndWaitStatement(ctx: BroadcastAndWaitStatementContext) : TransformerResult {
        const exprTr = ctx.message().accept(this);
        return new TransformerResult(exprTr.statementsToPrepend,
            new BroadcastAndWaitStatement(exprTr.node as StringExpression));
    }

    public visitBroadcastMessageStatement(ctx: BroadcastMessageStatementContext) : TransformerResult {
        const exprTr = ctx.message().accept(this);
        return new TransformerResult(
            exprTr.statementsToPrepend,
            new BroadcastMessageStatement(exprTr.node as StringExpression));
    }

    public visitCallStmt(ctx: CallStmtContext) : TransformerResult {
        const exprTr = ctx.expressionList().accept(this);
        return new TransformerResult(
            exprTr.statementsToPrepend,
            new CallStatement(
                ctx.ident().accept(this).nodeOnly() as Identifier,
                exprTr.node as ExpressionList,
                OptionalAstNode.absent<Identifier>()));
    }

    public visitChagenAttributeByStatement(ctx: ChagenAttributeByStatementContext) : TransformerResult {
        const attributeTr = ctx.stringExpr().accept(this);
        const valueTr = ctx.numExpr().accept(this);
        return new TransformerResult(
            StatementLists.concat(attributeTr.statementsToPrepend, valueTr.statementsToPrepend),
            new ChangeAttributeByStatement(
                attributeTr.node as StringExpression,
                valueTr.node as NumberExpression));
    }

    public visitChangeVarByStatement(ctx: ChangeVarByStatementContext) : TransformerResult {
        const exprTr = ctx.expression().accept(this);
        return new TransformerResult(
            exprTr.statementsToPrepend,
            new ChangeVarByStatement(
                ctx.variable().accept(this).node as AbstractVariable,
                exprTr.node as Expression));
    }

    public visitCloneStartEvent(ctx: CloneStartEventContext) : TransformerResult {
        return TransformerResult.withNode(new CloneStartEvent());
    }

    public visitColorFromNumExpression(ctx: ColorFromNumExpressionContext) : TransformerResult {
        // Colors are mapped to numbers
        return ctx.numExpr().accept(this);
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

    public visitDeclareAttribute(ctx: DeclareAttributeContext) : TransformerResult {
        const strTr = ctx.stringExpr().accept(this);
        return new TransformerResult(
            strTr.statementsToPrepend,
            new DeclareAttributeStatement(strTr.node as StringExpression,
                ctx.type().accept(this).node as ScratchType));
    }

    public visitDeclareAttributeOf(ctx: DeclareAttributeOfContext) : TransformerResult {
        const strTr = ctx.stringExpr().accept(this);
        return new TransformerResult(
            strTr.statementsToPrepend,
            new DeclareAttributeOfStatement(
                strTr.node as StringExpression,
                ctx.type().accept(this).nodeOnly() as ScratchType,
                ctx.ident().accept(this).nodeOnly() as Identifier));
    }

    public visitDeclareVariable(ctx: DeclareVariableContext) : TransformerResult {
        const type = ctx.type().accept(this).nodeOnly() as ScratchType;
        const ident = ctx.ident().accept(this).nodeOnly() as Identifier;

        const dataLoc = DataLocations.createTypedLocation(ident, type);
        const variable = new VariableWithDataLocation(dataLoc);

        if (this._actorScope) {
            return TransformerResult.withNode(
                new DeclareActorVariableStatement(variable));
        } else {
            return TransformerResult.withNode(
                new DeclareStackVariableStatement(variable));
        }
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
            new DeleteAllFromStatement(ctx.variable().accept(this).nodeOnly() as AbstractVariable));
    }

    public visitDeleteIthFromStatement(ctx: DeleteIthFromStatementContext) : TransformerResult {
        const numTr = ctx.numExpr().accept(this);
        return new TransformerResult(
            numTr.statementsToPrepend,
            new DeleteIthFromStatement(ctx.variable().accept(this).nodeOnly() as AbstractVariable,
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
                ctx.variable().accept(this).nodeOnly() as AbstractVariable));
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
            new InsertAtStatement(ctx.variable().accept(this).nodeOnly() as AbstractVariable,
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
                ctx.variable().accept(this).nodeOnly() as Identifier));
    }

    public visitJoinStringsExpression(ctx: JoinStringsExpressionContext) : TransformerResult {
        const tr1 = this.getOperand1(ctx).accept(this);
        const tr2 = this.getOperand2(ctx).accept(this);
        return new TransformerResult(
            StatementLists.concat(tr1.statementsToPrepend, tr2.statementsToPrepend),
            new JoinStringsExpression(tr1.node as StringExpression, tr2.node as StringExpression));
    }

    public visitKey(ctx: KeyContext) : TransformerResult {
        // Keys are mapped to numbers
        return ctx.numExpr().accept(this);
    }

    public visitAppMessage(ctx: AppMessageContext) : TransformerResult {
        const strTr = ctx.stringExpr().accept(this);
        return new TransformerResult(strTr.statementsToPrepend,
            new SystemMessage(StringLiteral.from("app"),
                strTr.node as StringExpression,
                OptionalAstNode.absent()));
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
        return TransformerResult.withNode(new LengthOListExpression(ctx.variable().accept(this).node as Identifier));
    }

    public visitLengthOfStringExpression(ctx: LengthOfStringExpressionContext) : TransformerResult {
        const tr = ctx.stringExpr().accept(this);
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
            new MessageReceivedEvent(StringLiteral.from(ctx.String().text),
            tr.node as StringExpression));
    }

    public visitNegatedBoolExpression(ctx: NegatedBoolExpressionContext) : TransformerResult {
        const tr = ctx.coreBoolExpr().accept(this);
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
            new NumAsStringExpression(tr.node as NumberExpression));
    }

    public visitParameter(ctx: ParameterContext) : TransformerResult {
        return TransformerResult.withNode(
            new ParameterDeclaration(ctx.ident().accept(this).nodeOnly() as Identifier,
            ctx.type().accept(this).node as ScratchType));
    }

    public visitQualifiedVariable(ctx: QualifiedVariableContext) : TransformerResult {
        throw new ImplementMeException();
    }

    public visitReplaceElementAtStatement(ctx: ReplaceElementAtStatementContext) : TransformerResult {
        const strTr = ctx.stringExpr().accept(this);
        const numTr = ctx.numExpr().accept(this);
        return new TransformerResult(
            StatementLists.concat(strTr.statementsToPrepend, numTr.statementsToPrepend),
            new ReplaceElementAtStatement(
                ctx.variable().accept(this).nodeOnly() as AbstractVariable,
                numTr.node as NumberExpression,
                strTr.node as StringExpression));
    }

    public visitSoundResource(ctx: SoundResourceContext): TransformerResult {
        return TransformerResult.withNode(SoundResourceType.instance());
    }

    public visitImageResource(ctx: SoundResourceContext): TransformerResult {
        return TransformerResult.withNode(ImageResourceType.instance());
    }

    public visitSetAttributeOfToStatement(ctx: SetAttributeOfToStatementContext) : TransformerResult {
        throw new ImplementMeException();
    }

    public visitSetAttributeToStatement(ctx: SetAttributeToStatementContext) : TransformerResult {
        const tr = ctx.expression().accept(this);
        return new TransformerResult(
            tr.statementsToPrepend,
            new SetAttributeToStatement(
                StringLiteral.from(ctx.String().text) as StringExpression,
                tr.node as Expression));
    }

    public visitStoreEvalResultStatement(ctx: StoreEvalResultStatementContext) : TransformerResult {
        const tr = ctx.expression().accept(this);

        return new TransformerResult(
            tr.statementsToPrepend,
            new StoreEvalResultToVariableStatement(ctx.variable().accept(this).nodeOnly() as AbstractVariable,
                tr.node as Expression));
    }

    public visitStoreCallResultStatement(ctx: StoreCallResultStatementContext) : TransformerResult {
        const exprListTr = ctx.callStmt().expressionList().expressionListPlain().accept(this);
        const methodIdent = ctx.callStmt().ident().accept(this).nodeOnly() as Identifier;
        const toVar = ctx.variable().accept(this).nodeOnly() as AbstractVariable;
        return new TransformerResult(exprListTr.statementsToPrepend,
            new StoreCallResultToVariableStatement(methodIdent, exprListTr.node as ExpressionList, toVar));
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

    public visitStringAsNumExpression(ctx: StringAsNumExpressionContext) : TransformerResult {
        const tr = ctx.stringExpr().accept(this);
        return new TransformerResult(
            tr.statementsToPrepend,
            new StringAsNumberExpression(tr.node as StringExpression));
    }

    public visitStringAttributeOfExpression(ctx: StringAttributeOfExpressionContext) : TransformerResult {
        const tr = ctx.stringExpr().accept(this);
        return new TransformerResult(tr.statementsToPrepend,
            new StringAttributeOfExpression(tr.node as StringExpression,
                ctx.ident().accept(this).nodeOnly() as Identifier));
    }

    public visitStringLiteralExpression(ctx: StringLiteralExpressionContext) : TransformerResult {
        return TransformerResult.withNode(StringLiteral.from(ctx.text));
    }

    public visitStringVariableExpression(ctx: StringVariableExpressionContext) : TransformerResult {
        const ident = ctx.variable().accept(this).nodeOnly() as Identifier;
        const variable = new VariableWithDataLocation(DataLocations.createTypedLocation(ident, StringType.instance()));
        return TransformerResult.withNode(new StringVariableExpression(variable));
    }

    public visitTimerExpression(ctx: TimerExpressionContext) : TransformerResult {
        return TransformerResult.withNode(new TimerExpression());
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

    public visitVarContainsExpression(ctx: VarContainsExpressionContext) : TransformerResult {
        throw new ImplementMeException();
    }

    public visitVariable(ctx: VariableContext) : TransformerResult {
        return TransformerResult.withNode(new Identifier(StringLiteral.from(ctx.text)));
    }

    public visitWaitSecsStatement(ctx: WaitSecsStatementContext) : TransformerResult {
        const tr = ctx.numExpr().accept(this);
        return new TransformerResult(
            tr.statementsToPrepend,
            new WaitSecsStatement(tr.node as NumberExpression));
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
        const methodSig = this._activeActorTypes.getMethodSignature(methodIdent);

        Preconditions.checkNotUndefined(methodSig);
        const resultVarType: ScratchType = methodSig.returns.type;

        const resultVarIdent: Identifier = Identifier.fresh();
        const resultVar = new VariableWithDataLocation(DataLocations.createTypedLocation(resultVarIdent, resultVarType));
        const resultVarExpr = this.createVariableExpression(resultVarType, resultVarIdent);
        const declarationStmt = new DeclareStackVariableStatement(resultVar);
        prepend = StatementLists.concat(prepend, StatementList.from([declarationStmt]));

        const argsTr = ctx.expressionList().accept(this);
        const storeCallResultStmt = new StoreCallResultToVariableStatement(methodIdent,
            argsTr.node as ExpressionList, resultVar);
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
                        OptionalAstNode.with(resultVarIdent))
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

}

export class ToIntermediateTransformer {

    transform(methodLib: App, origin: RuleNode, typeInformationStorage: TypeInformationStorage): AstNode {
        const visitor = new ToIntermediateVisitor(methodLib, typeInformationStorage);
        return origin.accept(visitor).nodeOnly();
    }

}
