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

import {SyntaxTreeTransformer} from "./SyntaxTreeTransformer";
import {ErrorNode, ParseTree, RuleNode, TerminalNode} from "antlr4ts/tree";
import {ScratchVisitor} from "../parser/grammar/ScratchVisitor";
import {AbsentAstNode, AstNode, OptionalAstNode, PresentAstNode} from "../ast/AstNode";
import {
    ActorComponentsDefinitionContext,
    ActorDefinitionContext,
    ActorDefinitionListContext,
    AddElementToStatementContext,
    AppMessageContext,
    BoolAndExpressionContext,
    BoolAsNumExpressionContext,
    BoolAsStringExpressionContext,
    BooleanTypeContext,
    BoolLiteralExpressionContext,
    BoolOrExpressionContext,
    BoolParanthExpressionContext,
    BoolVariableExpressionContext,
    BroadcastAndWaitStatementContext,
    BroadcastMessageStatementContext,
    CallStmtContext,
    ChagenAttributeByStatementContext,
    ChangeVarByStatementContext,
    ClickEventContext,
    CloneStartEventContext,
    ColorFromNumExpressionContext,
    ConditionReachedEventContext,
    CreateCloneOfStatementContext,
    CurrentTimeCompExpressionContext,
    DateCompContext,
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
    DistanceToExpressionContext,
    EnumTypeContext,
    EpsilonStatementContext,
    ExpressionListContext,
    ExpressionListPlainContext,
    ExpressionStmtContext,
    FunctionReturnDefinitionContext,
    IdentContext,
    IdentExpressionContext,
    IfStmtContext,
    ImportDefinitionContext,
    ImportDefinitionListContext,
    IndexOfExpressionContext,
    IndexTypeContext,
    InheritsFromContext,
    InsertAtStatementContext,
    IthLetterOfStringExpressionContext,
    IthStringItemOfExpressionContext,
    JoinStringsExpressionContext,
    KeyContext,
    KeyEventContext,
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
    NumRoundExpressionContext,
    NumVariableExpressionContext,
    ParameterContext,
    ParameterListContext,
    ParameterListPlainContext,
    ProgramContext,
    QualifiedVariableContext,
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
    SetVariableToStatementContext,
    SoundResourceContext,
    StartupEventContext,
    StmtContext,
    StmtListContext,
    StmtListPlainContext,
    StopAllContext,
    StopOthersInActorStatementContext,
    StopThisContext,
    StrContainsExpressionContext,
    StrEqualsExpressionContext,
    StrGreaterThanExpressionContext,
    StrIdentExpressionContext,
    StringAsNumExpressionContext,
    StringAttributeOfExpressionContext,
    StringLiteralExpressionContext,
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
    VariableValueEventContext,
    VoidReturnDefinitionContext,
    WaitSecsStatementContext,
    WaitUntilStatementContext
} from "../parser/grammar/ScratchParser";
import {ProgramDefinition} from "../ast/core/ModuleDefinition";
import {Identifier} from "../ast/core/Identifier";
import {ImportDefinition, ImportDefinitionList} from "../ast/core/ImportDefinition";
import {ActorDefinition, ActorDefinitionList} from "../ast/core/ActorDefinition";
import {ImplementMeException, ImplementMeForException} from "../../core/exceptions/ImplementMeException";
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
import {MethodDefinition, MethodDefinitionList, ResultDeclaration} from "../ast/core/MethodDefinition";
import {ScriptDefinition, ScriptDefinitionList} from "../ast/core/ScriptDefinition";
import {
    DeclarationStatement,
    DeclareAttributeOfStatement,
    DeclareAttributeStatement,
    DeclareVariableStatement
} from "../ast/core/statements/DeclarationStatement";
import {SetAttributeToStatement, SetStatement, SetVariableToStatement} from "../ast/core/statements/SetStatement";
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
    StringType
} from "../ast/core/ScratchType";
import {
    CloneStartEvent,
    ConditionReachedEvent,
    CoreEvent,
    MessageReceivedEvent,
    NeverEvent,
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
    AndExpression,
    BooleanExpression,
    BooleanLiteral,
    BooleanVariableExpression,
    NegationExpression,
    NumEqualsExpression, NumGreaterThanExpression,
    NumLessThanExpression,
    OrExpression,
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
    NumFunctExpression,
    PickRandomFromExpression,
    PlusExpression,
    RoundExpression,
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
import {debuglog} from "util";

class TTransformerResult<T extends AstNode> {

    private readonly _statementsToPrepend: StatementList;
    private readonly _node: T;

    constructor(statementsToPrepend: StatementList, node: T) {
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
        return this.node as E;
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

class ToIntermediateVisitor implements ScratchVisitor<TransformerResult> {

    private getOperand1(ctx: RuleNode): RuleNode {
        throw new ImplementMeException();
    }

    private getOperand2(ctx: RuleNode): RuleNode {
        throw new ImplementMeException();
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

    public visitImportDefinition(ctx: ImportDefinitionContext): TransformerResult {
        const toImport: AstNode = ctx.ident().accept(this).node;
        const importFrom: AstNode = ctx.resourceLocator().accept(this).node;
        return TransformerResult.withNode(new ImportDefinition(toImport as Identifier,
            importFrom as ResourceLocation));
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

    public visitActorDefinition(ctx: ActorDefinitionContext): TransformerResult {
        let initStatements: StatementList = StatementList.empty();

        // Identifier and inheritance information
        const ident = ctx.ident().accept(this).node;
        const inheritesFrom = this.optionalIdentifier(ctx.inheritsFrom());

        // Resource declarations and definitions
        const resouceDefs: TransformerResult = ctx.actorComponentsDefinition().resourceList().accept(this);
        initStatements = StatementLists.concat(initStatements, resouceDefs.statementsToPrepend);

        // Variable declarations and initializations
        const declarations: TransformerResult = ctx.actorComponentsDefinition().declarationStmtList().accept(this);
        initStatements = StatementLists.concat(initStatements, declarations.statementsToPrepend);

        // Method declarations and definitions
        const methods = ctx.actorComponentsDefinition().methodDefinitionList().accept(this);
        Preconditions.checkState(methods.statementsToPrepend.elements.length == 0);

        // Script definitions
        const scripts = ctx.actorComponentsDefinition().scriptList().accept(this);
        Preconditions.checkState(scripts.statementsToPrepend.elements.length == 0);

        // Initialization statements
        const inits = ctx.actorComponentsDefinition().setStmtList().accept(this);
        Preconditions.checkState(inits.statementsToPrepend.elements.length == 0);
        initStatements = StatementLists.concat(initStatements, inits.node as StatementList);

        return TransformerResult.withNode(new ActorDefinition(
            ident as Identifier,
            inheritesFrom as Identifier,
            resouceDefs.node as ResourceDefinitionList,
            declarations.node as StatementList,
            initStatements,
            methods.node as MethodDefinitionList,
            scripts.node as ScriptDefinitionList));
    }

    public visitActorDefinitionList(ctx: ActorDefinitionListContext): TransformerResult {
        const actorDefs = this.buildArrayFrom<ActorDefinition>(ctx.actorDefinition());
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
        return TransformerResult.withNode(new ResultDeclaration(
            ctx.ident().accept(this).nodeOnly() as Identifier,
            ctx.type().accept(this).nodeOnly() as ScratchType));
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
        const counterVar = new NumberVariableExpression(counterIdent);
        const declarationStmt = new DeclareVariableStatement(counterIdent, NumberType.instance());
        const initStmt: Statement = new SetVariableToStatement(counterIdent, NumberLiteral.of(0));
        prepend = StatementLists.concat(prepend, StatementList.from([declarationStmt, initStmt]));

        // Determine the number of iterations
        const timesTr: TransformerResult = ctx.numExpr().accept(this);
        const times: NumberExpression = timesTr.node as NumberExpression;
        prepend = StatementLists.concat(prepend, timesTr.statementsToPrepend);

        // Build the loop
        const untilCond = new NegationExpression(new NumLessThanExpression(counterVar, times));
        const loopBody = ctx.stmtList().accept(this).nodeOnly<StatementList>();
        const untilStatement = new UntilStatement(untilCond, loopBody);

        return new TransformerResult(prepend, untilStatement);
    }

    public visitNumBrackets(ctx: NumBracketsContext) : TransformerResult {
        return ctx.accept(this);
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
        const resultVarExpr = new NumberVariableExpression(resultVarIdent);
        const declarationStmt = new DeclareVariableStatement(resultVarIdent, NumberType.instance());
        const initStmt: Statement = new SetVariableToStatement(resultVarIdent, NumberLiteral.of(0));
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
        return TransformerResult.withNode(new NumberVariableExpression(ctx.variable().accept(this).nodeOnly() as Identifier));
    }

    public visitNumber(ctx: NumberContext) : TransformerResult {
        return TransformerResult.withNode(NumberLiteral.fromFloatString(ctx.DecimalLiteral().text));
    }

    private declareFreshBooleanVariable(value: boolean): TTransformerResult<BooleanVariableExpression> {
        const resultVarIdent: Identifier = Identifier.fresh();
        const resultVarExpr = new BooleanVariableExpression(resultVarIdent);
        const declareVarStmt = new DeclareVariableStatement(resultVarIdent, BooleanType.instance());
        const initStmt: Statement = new SetVariableToStatement(resultVarIdent, BooleanLiteral.from(value));

        let prepend: StatementList = StatementList.empty();
        prepend = StatementLists.concat(prepend, StatementList.from([declareVarStmt, initStmt]));

        return new TTransformerResult(prepend, resultVarExpr);
    }

    private evaluateIntoBooleanVariable(variable: BooleanVariableExpression, expr: RuleNode): TTransformerResult<BooleanVariableExpression> {
        const tr1: TransformerResult = expr.accept(this);

        let prepend: StatementList = StatementList.empty();
        prepend = StatementLists.concat(prepend, tr1.statementsToPrepend);

        const initStmt: Statement = new SetVariableToStatement(variable.ident, tr1.node as BooleanExpression);
        prepend = StatementLists.concat(prepend, StatementList.from([initStmt]));

        return new TTransformerResult(prepend, variable);
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
        return TransformerResult.withNode(new BooleanVariableExpression(ctx.variable().accept(this).nodeOnly() as Identifier));
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
            ctx.variable().accept(this).nodeOnly() as Identifier,
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
                ctx.variable().accept(this).node as Identifier,
                exprTr.node as Expression));
    }

    public visitClickEvent(ctx: ClickEventContext) : TransformerResult {
        return TransformerResult.withNode(new MessageReceivedEvent(StringLiteral.from("mouse"), StringLiteral.from("click")));
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

    public visitCurrentTimeCompExpression(ctx: CurrentTimeCompExpressionContext) : TransformerResult {
        throw new ImplementMeException();
    }

    public visitDateComp(ctx: DateCompContext) : TransformerResult {
        throw new ImplementMeException();
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
        return TransformerResult.withNode(
            new DeclareVariableStatement(
                ctx.ident().accept(this).nodeOnly() as Identifier,
                ctx.type().accept(this).nodeOnly() as ScratchType));
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
            new DeleteAllFromStatement(ctx.variable().accept(this).nodeOnly() as Identifier));
    }

    public visitDeleteIthFromStatement(ctx: DeleteIthFromStatementContext) : TransformerResult {
        const numTr = ctx.numExpr().accept(this);
        return new TransformerResult(
            numTr.statementsToPrepend,
            new DeleteIthFromStatement(ctx.variable().accept(this).nodeOnly() as Identifier,
                numTr.node as NumberExpression));
    }

    public visitDeleteThisClone(ctx: DeleteThisCloneContext) : TransformerResult {
        return TransformerResult.withNode(new DeleteThisCloneStatement());
    }

    public visitDistanceToExpression(ctx: DistanceToExpressionContext) : TransformerResult {
        throw new ImplementMeException();
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
            ctx.variable().accept(this).nodeOnly() as Identifier));
    }

    public visitNumberIndexType(ctx: IndexTypeContext) : TransformerResult {
        return TransformerResult.withNode(NumberType.instance());
    }

    public visitStringIndexType(ctx: IndexTypeContext) : TransformerResult {
        return TransformerResult.withNode(StringType.instance());
    }

    public visitInheritsFrom(ctx: InheritsFromContext) : TransformerResult {
        let result: OptionalAstNode<Identifier> = null;
        if (ctx.ident()) {
            result = new PresentAstNode<Identifier>(ctx.ident().accept(this).nodeOnly() as Identifier);
        } else {
            result = OptionalAstNode.absent<Identifier>();
        }
        return TransformerResult.withNode(result);
    }

    public visitInsertAtStatement(ctx: InsertAtStatementContext) : TransformerResult {
        const numTr = ctx.numExpr().accept(this);
        const strTr = ctx.stringExpr().accept(this);
        return new TransformerResult(
            StatementLists.concat(numTr.statementsToPrepend, strTr.statementsToPrepend),
            new InsertAtStatement(ctx.variable().accept(this).nodeOnly() as Identifier,
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

    public visitKeyEvent(ctx: KeyEventContext) : TransformerResult {
        return TransformerResult.withNode(new MessageReceivedEvent(
            StringLiteral.from("key"), StringLiteral.from(ctx.key().numExpr().text)));
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
                ctx.variable().accept(this).nodeOnly() as Identifier,
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

    public visitSetVariableToStatement(ctx: SetVariableToStatementContext) : TransformerResult {
        const tr = ctx.expression().accept(this);
        return  new TransformerResult(
            tr.statementsToPrepend,
            new SetVariableToStatement(ctx.variable().accept(this).nodeOnly() as Identifier,
                tr.node as Expression));
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
        return TransformerResult.withNode(new StringVariableExpression(ctx.variable().accept(this).nodeOnly() as Identifier));
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

    public visitVariableValueEvent(ctx: VariableValueEventContext) : TransformerResult {
        throw new ImplementMeException();
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
            return stmtMatch.groups.method;
        }
        return null;
    }

    private identifyFunctionCall(node: RuleNode) : string|null {
        let result: string = node.constructor.name;
        const exprMatch = EXPRESSION_MATCHER.exec(result);
        if (exprMatch) {
            return exprMatch.groups.method;
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
                return exprMatch.groups.method;
            } else {
                return null;
            }
        }
    }

    visitChildren(node: RuleNode): TransformerResult {
        if (node.childCount == 1) {
            return node.getChild(0).accept(this);
        }
        throw new ImplementMeForException(this.identifyIntermediateMethodName(node));
        //
        // const methodName = this.identifyIntermediateMethodName(node);
        // let args: Expression[] = [];
        // let i = 0;
        // while (i < node.childCount) {
        //     const c = node.getChild(i);
        //     const childResult: AstNode = c.accept(this);
        //     args.push(childResult as Expression);
        //     i++;
        // }

        // If the node is an expression, or if the corresponding
        // method produces a result

        // return new CallStatement(Identifier.of(methodName),
        //    new ExpressionList(args), assignResultTo);
    }

    visitErrorNode(node: ErrorNode): TransformerResult {
        throw new ImplementMeException();
    }

    visitTerminal(node: TerminalNode): TransformerResult {
        throw new ImplementMeException();
    }

}

export class ToIntermediateTransformer {

    transform(origin: RuleNode): AstNode {
        const visitor = new ToIntermediateVisitor();
        return origin.accept(visitor).nodeOnly();
    }

}
