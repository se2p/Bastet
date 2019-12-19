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
import {Statement, StatementList} from "../ast/core/statements/Statement";
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
import {IfStatement, RepeatForeverStatement, UntilStatement} from "../ast/core/statements/ControlStatement";
import {
    AndExpression,
    BooleanExpression,
    BooleanLiteral,
    BooleanVariableExpression,
    NegationExpression,
    NumEqualsExpression,
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

class ToIntermediateVisitor implements ScratchVisitor<AstNode> {

    private getOperand1(ctx: RuleNode): RuleNode {
        throw new ImplementMeException();
    }

    private getOperand2(ctx: RuleNode): RuleNode {
        throw new ImplementMeException();
    }

    public visitProgram(ctx: ProgramContext): AstNode {
        const ident: AstNode = ctx.ident().accept(this);
        const imports: AstNode = ctx.importDefinitionList().accept(this);
        const actors: AstNode = ctx.actorDefinitionList().accept(this);

        return new ProgramDefinition(
            ident as Identifier,
            imports as ImportDefinitionList,
            actors as ActorDefinitionList);
    }

    public visitIdentExpression(ctx: IdentExpressionContext): AstNode {
        return new Identifier(StringLiteral.from(ctx.Identifier().text));
    }

    public visitStrIdentExpression(ctx: StrIdentExpressionContext): AstNode {
        return new Identifier(StringLiteral.from(ctx.text));
    }

    private buildArrayFrom<E extends AstNode>(elements: RuleNode[]): E[] {
        const results: E[] = [];
        for (let idc of elements) {
            const id: E = idc.accept(this) as E;
            results.push(id);
        }
        return results;
    }

    public visitImportDefinitionList(ctx: ImportDefinitionListContext): AstNode {
        const importDefs: ImportDefinition[] = this.buildArrayFrom(ctx.importDefinition());
        return new ImportDefinitionList(importDefs);
    }

    public visitImportDefinition(ctx: ImportDefinitionContext): AstNode {
        const toImport: AstNode = ctx.ident().accept(this);
        const importFrom: AstNode = ctx.resourceLocator().accept(this);
        return new ImportDefinition(toImport as Identifier,
            importFrom as ResourceLocation);
    }

    public visitResourceLocator(ctx: ResourceLocatorContext): AstNode {
        return new ResourceLocation(new StringLiteral(ctx.String().text));
    }

    private optionalIdentifier(ctx: IdentContext|null): OptionalAstNode<Identifier> {
        if (ctx) {
            const id = ctx.accept(this);
            return new PresentAstNode(id as Identifier);
        } else {
            return new AbsentAstNode();
        }
    }

    public visitActorDefinition(ctx: ActorDefinitionContext): AstNode {
        const ident = ctx.ident().accept(this);
        const inheritesFrom = this.optionalIdentifier(ctx.inheritsFrom());
        const resouceDefs = ctx.actorComponentsDefinition().resourceList().accept(this);
        const declarations = ctx.actorComponentsDefinition().declarationStmtList().accept(this);
        const inits = ctx.actorComponentsDefinition().setStmtList().accept(this);
        const methods = ctx.actorComponentsDefinition().methodDefinitionList().accept(this);
        const scripts = ctx.actorComponentsDefinition().scriptList().accept(this);
        return new ActorDefinition(
            ident as Identifier,
            inheritesFrom as Identifier,
            resouceDefs as ResourceDefinitionList,
            declarations as StatementList,
            inits as StatementList,
            methods as MethodDefinitionList,
            scripts as ScriptDefinitionList);
    }

    public visitActorDefinitionList(ctx: ActorDefinitionListContext): AstNode {
        const actorDefs: ActorDefinition[] = this.buildArrayFrom(ctx.actorDefinition());
        return new ActorDefinitionList(actorDefs);
    }

    public visitResource(ctx: ResourceContext) : AstNode {
        return new ResourceDefinition(
            ctx.resourceType().accept(this) as ResourceType,
            ctx.ident().accept(this) as Identifier,
            ctx.resourceLocator().accept(this) as ResourceLocation);
    }

    public visitResourceList(ctx: ResourceListContext) : AstNode {
        const defs: ResourceDefinition[] = this.buildArrayFrom(ctx.resource());
        return new ResourceDefinitionList(defs);
    }

    public visitMethodDefinition(ctx: MethodDefinitionContext) : AstNode {
        return new MethodDefinition(
            ctx.ident().accept(this) as Identifier,
            ctx.parameterList().accept(this) as ParameterDeclarationList,
            ctx.stmtList().accept(this) as StatementList,
            ctx.methodResultDeclaration().accept(this) as ResultDeclaration);
    }

    public visitMethodDefinitionList(ctx: MethodDefinitionListContext) : AstNode {
        const defs: MethodDefinition[] = this.buildArrayFrom(ctx.methodDefinition());
        return new MethodDefinitionList(defs);
    }

    public visitFunctionReturnDefinition(ctx: FunctionReturnDefinitionContext): AstNode {
        return new ResultDeclaration(
            ctx.ident().accept(this) as Identifier,
            ctx.type().accept(this) as ScratchType);
    }

    public visitVoidReturnDefinition(ctx: VoidReturnDefinitionContext): AstNode {
        return ResultDeclaration.void();
    }

    public visitDeclarationStmtList(ctx: DeclarationStmtListContext) : AstNode {
        const decls: DeclarationStatement[] = this.buildArrayFrom(ctx.declarationStmt());
        return new StatementList(decls);
    }

    public visitSetStatement(ctx: SetStatementContext) : AstNode {
        return ctx.setStmt().accept(this);
    }

    public visitSetStmtList(ctx: SetStmtListContext) : AstNode {
        const stmts: SetStatement[] = this.buildArrayFrom(ctx.setStmt());
        return new StatementList(stmts);
    }

    public visitScript(ctx: ScriptContext) : AstNode {
        return new ScriptDefinition(
            ctx.event().accept(this) as CoreEvent,
            ctx.stmtList().accept(this) as StatementList);
    }

    public visitScriptList(ctx: ScriptListContext) : AstNode {
        const defs: ScriptDefinition[] = this.buildArrayFrom(ctx.script());
        return new ScriptDefinitionList(defs);
    }

    public visitExpressionList(ctx: ExpressionListContext) : AstNode {
        const elems: Expression[] = this.buildArrayFrom(ctx.expressionListPlain().expression());
        return new ExpressionList(elems);
    }

    public visitExpressionListPlain(ctx: ExpressionListPlainContext): AstNode {
        const elems: Expression[] = this.buildArrayFrom(ctx.expression());
        return new ExpressionList(elems);
    }

    public visitParameterList(ctx: ParameterListContext): AstNode {
        const elems: ParameterDeclaration[] = this.buildArrayFrom(ctx.parameterListPlain().parameter());
        return new ParameterDeclarationList(elems);
    }

    public visitParameterListPlain(ctx: ParameterListPlainContext): AstNode {
        const elems: ParameterDeclaration[] = this.buildArrayFrom(ctx.parameter());
        return new ParameterDeclarationList(elems);
    }

    private asListOfStatements(ctx: StmtContext): Statement[] {
        let result: Statement[];
        let visitResult = ctx.accept(this);

        if (visitResult instanceof StatementList) {
            result = (visitResult as StatementList).elements;
        } else if (visitResult instanceof Statement) {
            result = [ visitResult ];
        } else {
            throw new IllegalStateException("Unsupported return type");
        }

        return result;
    }

    public visitStmtList(ctx: StmtListContext): AstNode {
        let elems: Statement[] = [];

        for (let idc of ctx.stmtListPlain().stmt()) {
            elems = elems.concat(this.asListOfStatements(idc));
        }

        if (ctx.terminationStmt()) {
            elems = elems.concat(this.asListOfStatements(ctx.terminationStmt()));
        }

        return new StatementList(elems);
    }

    public visitStmtListPlain(ctx: StmtListPlainContext): AstNode {
        const elems: Statement[] = this.buildArrayFrom(ctx.stmt());
        return new StatementList(elems);
    }

    public visitBooleanType(ctx: BooleanTypeContext): AstNode {
        return BooleanType.instance();
    }

    public visitEnumType(ctx: EnumTypeContext): AstNode {
        return StringEnumType.withValues(ctx.expressionListPlain().accept(this) as ExpressionList);
    }

    public visitStringType(ctx: StringTypeContext): AstNode {
        return StringType.instance();
    }

    public visitListType(ctx: ListTypeContext): AstNode {
        return ListType.withElementType(ctx.type().accept(this) as ScratchType);
    }

    public visitNumberType (ctx: NumberTypeContext): AstNode {
        return NumberType.instance();
    }

    public visitMapType (ctx: MapTypeContext): AstNode {
        return MapType.withIndexType(ctx.indexType().accept(this) as ScratchType);
    }

    public visitActorComponentsDefinition (ctx: ActorComponentsDefinitionContext): AstNode {
        throw new IllegalStateException("Not expected to be needed.");
    }

    public visitUntilStmt (ctx: UntilStmtContext): AstNode {
        return new UntilStatement(
            ctx.boolExpr().accept(this) as BooleanExpression,
            ctx.stmtList().accept(this) as StatementList);
    }

    private statementListFrom(ctx: StmtListContext|undefined) {
        if (ctx) {
            return ctx.accept(this) as StatementList;
        } else {
            return StatementList.empty();
        }
    }

    public visitIfStmt (ctx: IfStmtContext): AstNode {
        return new IfStatement(
            ctx.boolExpr().accept(this) as BooleanExpression,
            ctx.stmtList().accept(this) as StatementList,
            this.statementListFrom(ctx.elseCase().stmtList()));
    }

    public visitRepeatForeverStmt (ctx: RepeatForeverStmtContext): AstNode {
        return new RepeatForeverStatement(ctx.stmtList().accept(this) as StatementList);
    }

    /**
     * Replaces a `RepeatTimesStatement` by an `UntilStatement`
     */
    public visitRepeatTimesStmt (ctx: RepeatTimesStmtContext): AstNode {
        const counterIdent: Identifier = Identifier.fresh();
        const counterVar = new NumberVariableExpression(counterIdent);
        const declaration = new DeclareVariableStatement(counterIdent, NumberType.instance());
        const init = new SetVariableToStatement(counterIdent, NumberLiteral.of(0));
        const times = ctx.numExpr().accept(this) as NumberExpression;
        const untilCond = new NegationExpression(new NumLessThanExpression(counterVar, times));

        const untilStatement = new UntilStatement(untilCond, ctx.stmtList().accept(this) as StatementList);
        const stmts: Statement[] = [ declaration, init, untilStatement ];

        return new StatementList(stmts);
    }

    public visitNumBrackets(ctx: NumBracketsContext) : AstNode {
        return ctx.accept(this);
    }

    public visitNumDivExpression(ctx: NumDivExpressionContext) : AstNode {
        return new DivideExpression(
            this.getOperand1(ctx).accept(this) as NumberExpression,
            this.getOperand2((ctx)).accept(this) as NumberExpression);
    }

    public visitNumEqualsExpression(ctx: NumEqualsExpressionContext) : AstNode {
        return new NumEqualsExpression(
            this.getOperand1(ctx).accept(this) as NumberExpression,
            this.getOperand2((ctx)).accept(this) as NumberExpression);
    }

    public visitNumFunct(ctx: NumFunctContext) : AstNode {
        return new StringLiteral(ctx.text);
    }

    public visitNumFunctExpression(ctx: NumFunctExpressionContext) : AstNode {
        return new NumFunctExpression(
            ctx.numFunct().accept(this) as StringLiteral,
            ctx.coreNumExpr().accept(this) as NumberExpression);
    }

    public visitNumGreaterThanExpression(ctx: NumGreaterThanExpressionContext) : AstNode {
        return new NumEqualsExpression(
            this.getOperand1(ctx).accept(this) as NumberExpression,
            this.getOperand2((ctx)).accept(this) as NumberExpression);

    }
    public visitNumLessThanExpression(ctx: NumLessThanExpressionContext) : AstNode {
        return new NumLessThanExpression(
            this.getOperand1(ctx).accept(this) as NumberExpression,
            this.getOperand2((ctx)).accept(this) as NumberExpression);

    }
    public visitNumLiteralExpression(ctx: NumLiteralExpressionContext) : AstNode {
        return NumberLiteral.fromFloatString(ctx.number().text);
    }

    public visitNumMinusExpression(ctx: NumMinusExpressionContext) : AstNode {
        return new MinusExpression(
            this.getOperand1(ctx).accept(this) as NumberExpression,
            this.getOperand2(ctx).accept(this) as NumberExpression);
    }

    public visitNumModExpression(ctx: NumModExpressionContext) : AstNode {
        return new ModuloExpression(
            this.getOperand1(ctx).accept(this) as NumberExpression,
            this.getOperand2(ctx).accept(this) as NumberExpression);
    }

    public visitNumMulExpression(ctx: NumMulExpressionContext) : AstNode {
        return new MultiplyExpression(
            this.getOperand1(ctx).accept(this) as NumberExpression,
            this.getOperand2(ctx).accept(this) as NumberExpression);
    }

    public visitNumPlusExpression(ctx: NumPlusExpressionContext) : AstNode {
        return new PlusExpression(
            this.getOperand1(ctx).accept(this) as NumberExpression,
            this.getOperand2(ctx).accept(this) as NumberExpression);
    }

    public visitNumRandomExpression(ctx: NumRandomExpressionContext) : AstNode {
        return new PickRandomFromExpression(
            this.getOperand1(ctx).accept(this) as NumberExpression,
            this.getOperand2(ctx).accept(this) as NumberExpression);
    }

    public visitNumRoundExpression(ctx: NumRoundExpressionContext) : AstNode {
        return new RoundExpression(ctx.coreNumExpr().accept(this) as NumberExpression);
    }

    public visitNumVariableExpression(ctx: NumVariableExpressionContext) : AstNode {
        return new NumberVariableExpression(ctx.variable().accept(this) as Identifier);
    }

    public visitNumber(ctx: NumberContext) : AstNode {
        return NumberLiteral.fromFloatString(ctx.DecimalLiteral().text);
    }

    public visitBoolAndExpression(ctx: BoolAndExpressionContext) : AstNode {
        return new AndExpression(
            this.getOperand1(ctx).accept(this) as BooleanExpression,
            this.getOperand2(ctx).accept(this) as BooleanExpression);
    }

    public visitBoolAsNumExpression(ctx: BoolAsNumExpressionContext) : AstNode {
        return new BoolAsNumberExpression(ctx.boolExpr().accept(this) as BooleanExpression);
    }

    public visitBoolAsStringExpression(ctx: BoolAsStringExpressionContext) : AstNode {
        return new BoolAsStringExpression(ctx.boolExpr().accept(this) as BooleanExpression);
    }

    public visitBoolLiteralExpression(ctx: BoolLiteralExpressionContext) : AstNode {
        return BooleanLiteral.fromString(ctx.Boolean().text);
    }

    public visitBoolOrExpression(ctx: BoolOrExpressionContext) : AstNode {
        return new OrExpression(
            this.getOperand1(ctx).accept(this) as BooleanExpression,
            this.getOperand2(ctx).accept(this) as BooleanExpression);
    }

    public visitBoolParanthExpression(ctx: BoolParanthExpressionContext) : AstNode {
        return ctx.coreBoolExpr().accept(this);
    }

    public visitBoolVariableExpression(ctx: BoolVariableExpressionContext) : AstNode {
        return new BooleanVariableExpression(ctx.variable().accept(this) as Identifier);
    }

    public visitStrContainsExpression(ctx: StrContainsExpressionContext) : AstNode {
        return new StrContainsExpression(
          this.getOperand1(ctx).accept(this) as StringExpression,
          this.getOperand2(ctx).accept(this) as StringExpression);
    }

    public visitStrEqualsExpression(ctx: StrEqualsExpressionContext) : AstNode {
        return new StrEqualsExpression(
            this.getOperand1(ctx).accept(this) as StringExpression,
            this.getOperand2(ctx).accept(this) as StringExpression);
    }

    public visitStrGreaterThanExpression(ctx: StrGreaterThanExpressionContext) : AstNode {
        return new StrGreaterThanExpression(
            this.getOperand1(ctx).accept(this) as StringExpression,
            this.getOperand2(ctx).accept(this) as StringExpression);
    }

    public visitStrLessThanExpression(ctx: StrLessThanExpressionContext) : AstNode {
        return new StrLessThanExpression(
            this.getOperand1(ctx).accept(this) as StringExpression,
            this.getOperand2(ctx).accept(this) as StringExpression);
    }

    public visitAddElementToStatement(ctx: AddElementToStatementContext) : AstNode {
        return new AddElementToStatement(
            ctx.variable().accept(this) as Identifier,
            ctx.stringExpr().accept(this) as StringExpression);
    }

    public visitBroadcastAndWaitStatement(ctx: BroadcastAndWaitStatementContext) : AstNode {
        return new BroadcastAndWaitStatement(ctx.message().accept(this) as StringExpression);
    }

    public visitBroadcastMessageStatement(ctx: BroadcastMessageStatementContext) : AstNode {
        return new BroadcastMessageStatement(ctx.message().accept(this) as StringExpression);
    }

    public visitCallStmt(ctx: CallStmtContext) : AstNode {
        return new CallStatement(ctx.ident().accept(this) as Identifier,
            ctx.expressionList().accept(this) as ExpressionList, OptionalAstNode.absent<Identifier>());
    }

    public visitChagenAttributeByStatement(ctx: ChagenAttributeByStatementContext) : AstNode {
        return new ChangeAttributeByStatement(
            ctx.stringExpr().accept(this) as StringExpression,
            ctx.numExpr().accept(this) as NumberExpression);
    }

    public visitChangeVarByStatement(ctx: ChangeVarByStatementContext) : AstNode {
        return new ChangeVarByStatement(ctx.variable().accept(this) as Identifier,
            ctx.expression().accept(this) as Expression);
    }

    public visitClickEvent(ctx: ClickEventContext) : AstNode {
        return new MessageReceivedEvent(StringLiteral.from("mouse"), StringLiteral.from("click"));
    }

    public visitCloneStartEvent(ctx: CloneStartEventContext) : AstNode {
        return new CloneStartEvent();
    }

    public visitColorFromNumExpression(ctx: ColorFromNumExpressionContext) : AstNode {
        // Colors are mapped to numbers
        return ctx.numExpr().accept(this);
    }

    public visitConditionReachedEvent(ctx: ConditionReachedEventContext) : AstNode {
        return new ConditionReachedEvent(ctx.boolExpr().accept(this) as BooleanExpression);
    }

    public visitCreateCloneOfStatement(ctx: CreateCloneOfStatementContext) : AstNode {
        return new CreateCloneOfStatement(ctx.stringExpr().accept(this) as StringExpression);
    }

    public visitCurrentTimeCompExpression(ctx: CurrentTimeCompExpressionContext) : AstNode {
        throw new ImplementMeException();
    }

    public visitDateComp(ctx: DateCompContext) : AstNode {
        throw new ImplementMeException();
    }

    public visitDeclareAttribute(ctx: DeclareAttributeContext) : AstNode {
        return new DeclareAttributeStatement(ctx.stringExpr().accept(this) as StringExpression,
            ctx.type().accept(this) as ScratchType);
    }

    public visitDeclareAttributeOf(ctx: DeclareAttributeOfContext) : AstNode {
        return new DeclareAttributeOfStatement(ctx.stringExpr().accept(this) as StringExpression,
            ctx.type().accept(this) as ScratchType, ctx.ident().accept(this) as Identifier);
    }

    public visitDeclareVariable(ctx: DeclareVariableContext) : AstNode {
        return new DeclareVariableStatement(ctx.ident().accept(this) as Identifier,
            ctx.type().accept(this) as ScratchType);
    }

    public visitDefaultBoolExpression(ctx: DefaultBoolExpressionContext) : AstNode {
        return ctx.coreBoolExpr().accept(this);
    }

    public visitDefaultNumExpr(ctx: DefaultNumExprContext) : AstNode {
        return ctx.coreNumExpr().accept(this);
    }

    public visitDefaultStringExpression(ctx: DefaultStringExpressionContext) : AstNode {
        return ctx.stringExpr().accept(this);
    }

    public visitDeleteAllFromStatement(ctx: DeleteAllFromStatementContext) : AstNode {
        return new DeleteAllFromStatement(ctx.variable().accept(this) as Identifier);
    }

    public visitDeleteIthFromStatement(ctx: DeleteIthFromStatementContext) : AstNode {
        return new DeleteIthFromStatement(ctx.variable().accept(this) as Identifier,
            ctx.numExpr().accept(this) as NumberExpression);
    }

    public visitDeleteThisClone(ctx: DeleteThisCloneContext) : AstNode {
        return new DeleteThisCloneStatement();
    }

    public visitDistanceToExpression(ctx: DistanceToExpressionContext) : AstNode {
        throw new ImplementMeException();
    }

    public visitEpsilonStatement(ctx: EpsilonStatementContext) : AstNode {
        return new EpsilonStatement();
    }

    public visitExpressionStmt(ctx: ExpressionStmtContext) : AstNode {
        return new ExpressionStatement(ctx.expression().accept(this) as Expression);
    }

    public visitIndexOfExpression(ctx: IndexOfExpressionContext) : AstNode {
        return new IndexOfExpression(ctx.expression().accept(this) as Expression,
            ctx.variable().accept(this) as Identifier);
    }

    public visitNumberIndexType(ctx: IndexTypeContext) : AstNode {
        return NumberType.instance();
    }

    public visitStringIndexType(ctx: IndexTypeContext) : AstNode {
        return StringType.instance();
    }

    public visitInheritsFrom(ctx: InheritsFromContext) : AstNode {
        if (ctx.ident()) {
            return new PresentAstNode<Identifier>(ctx.ident().accept(this) as Identifier);
        } else {
            return OptionalAstNode.absent<Identifier>();
        }
    }

    public visitInsertAtStatement(ctx: InsertAtStatementContext) : AstNode {
        return new InsertAtStatement(ctx.variable().accept(this) as Identifier,
            ctx.numExpr().accept(this) as NumberExpression,
            ctx.stringExpr().accept(this) as StringExpression);
    }

    public visitIthLetterOfStringExpression(ctx: IthLetterOfStringExpressionContext) : AstNode {
        return new IthLetterOfStringExpression(ctx.numExpr().accept(this) as NumberExpression,
            ctx.stringExpr().accept(this) as StringExpression);
    }

    public visitIthStringItemOfExpression(ctx: IthStringItemOfExpressionContext) : AstNode {
        return new IthStringItemOfExpression(ctx.numExpr().accept(this) as NumberExpression,
            ctx.variable().accept(this) as Identifier);
    }

    public visitJoinStringsExpression(ctx: JoinStringsExpressionContext) : AstNode {
        return new JoinStringsExpression(this.getOperand1(ctx).accept(this) as StringExpression,
            this.getOperand2(ctx).accept(this) as StringExpression);
    }

    public visitKey(ctx: KeyContext) : AstNode {
        // Keys are mapped to numbers
        return ctx.numExpr().accept(this);
    }

    public visitKeyEvent(ctx: KeyEventContext) : AstNode {
        return new MessageReceivedEvent(
            StringLiteral.from("key"), StringLiteral.from(ctx.key().numExpr().text));
    }

    public visitAppMessage(ctx: AppMessageContext) : AstNode {
        return new SystemMessage(StringLiteral.from("app"),
            ctx.stringExpr().accept(this) as StringExpression,
            OptionalAstNode.absent());
    }

    public visitSystemMessage(ctx: SystemMessageContext) : AstNode {
        return new SystemMessage(StringLiteral.from(ctx.String().text),
            ctx.stringExpr().accept(this) as StringExpression,
            OptionalAstNode.absent());
    }

    public visitLengthOfListExpression(ctx: LengthOfListExpressionContext) : AstNode {
        return new LengthOListExpression(ctx.variable().accept(this) as Identifier);
    }

    public visitLengthOfStringExpression(ctx: LengthOfStringExpressionContext) : AstNode {
        return new LengthOfStringExpression(ctx.stringExpr().accept(this) as StringExpression);
    }

    public visitListVariableExpression(ctx: ListVariableExpressionContext) : AstNode {
        return ctx.variable().accept(this);
    }

    public visitListWithElementsExpression(ctx: ListWithElementsExpressionContext) : AstNode {
        return ctx.expressionListPlain().accept(this);
    }

    public visitMessageReceivedEvent(ctx: MessageReceivedEventContext) : AstNode {
        return new MessageReceivedEvent(StringLiteral.from(ctx.String().text),
            ctx.stringExpr().accept(this) as StringExpression);
    }

    public visitNegatedBoolExpression(ctx: NegatedBoolExpressionContext) : AstNode {
        return new NegationExpression(ctx.coreBoolExpr().accept(this) as BooleanExpression);
    }

    public visitNeverEvent(ctx: NeverEventContext) : AstNode {
        return new NeverEvent();
    }

    public visitNumAsStringExpression(ctx: NumAsStringExpressionContext) : AstNode {
        return new NumAsStringExpression(ctx.numExpr().accept(this) as NumberExpression);
    }

    public visitParameter(ctx: ParameterContext) : AstNode {
        return new ParameterDeclaration(ctx.ident().accept(this) as Identifier,
            ctx.type().accept(this) as ScratchType);
    }

    public visitQualifiedVariable(ctx: QualifiedVariableContext) : AstNode {
        throw new ImplementMeException();
    }

    public visitReplaceElementAtStatement(ctx: ReplaceElementAtStatementContext) : AstNode {
        return new ReplaceElementAtStatement(ctx.variable().accept(this) as Identifier,
            ctx.numExpr().accept(this) as NumberExpression,
            ctx.stringExpr().accept(this) as StringExpression);
    }

    public visitSoundResource(ctx: SoundResourceContext): AstNode {
        return SoundResourceType.instance();
    }

    public visitImageResource(ctx: SoundResourceContext): AstNode {
        return ImageResourceType.instance();
    }

    public visitSetAttributeOfToStatement(ctx: SetAttributeOfToStatementContext) : AstNode {
        throw new ImplementMeException();
    }

    public visitSetAttributeToStatement(ctx: SetAttributeToStatementContext) : AstNode {
        return new SetAttributeToStatement(ctx.String().accept(this) as StringExpression,
            ctx.expression().accept(this) as Expression);
    }

    public visitSetVariableToStatement(ctx: SetVariableToStatementContext) : AstNode {
        return new SetVariableToStatement(ctx.variable().accept(this) as Identifier,
            ctx.expression().accept(this) as Expression);
    }

    public visitStartupEvent(ctx: StartupEventContext) : AstNode {
        return new StartupEvent();
    }

    public visitStopAll(ctx: StopAllContext) : AstNode {
        return new StopAllStatement();
    }

    public visitStopOthersInActorStatement(ctx: StopOthersInActorStatementContext) : AstNode {
        return new StopOthersInActorStatement();
    }

    public visitStopThis(ctx: StopThisContext) : AstNode {
        return new StopThisStatement();
    }

    public visitStringAsNumExpression(ctx: StringAsNumExpressionContext) : AstNode {
        return new StringAsNumberExpression(ctx.stringExpr().accept(this) as StringExpression);
    }

    public visitStringAttributeOfExpression(ctx: StringAttributeOfExpressionContext) : AstNode {
        return new StringAttributeOfExpression(ctx.stringExpr().accept(this) as StringExpression,
            ctx.ident().accept(this) as Identifier);
    }

    public visitStringLiteralExpression(ctx: StringLiteralExpressionContext) : AstNode {
        return StringLiteral.from(ctx.text);
    }

    public visitStringVariableExpression(ctx: StringVariableExpressionContext) : AstNode {
        return new StringVariableExpression(ctx.variable().accept(this) as Identifier);
    }

    public visitTimerExpression(ctx: TimerExpressionContext) : AstNode {
        return new TimerExpression();
    }

    public visitUnspecifiedBoolExpression(ctx: UnspecifiedBoolExpressionContext) : AstNode {
        throw new ImplementMeException();
    }

    public visitUnspecifiedExpr(ctx: UnspecifiedExprContext) : AstNode {
        throw new ImplementMeException();
    }

    public visitUnspecifiedNumExpr(ctx: UnspecifiedNumExprContext) : AstNode {
        throw new ImplementMeException();
    }

    public visitUnspecifiedStringExpression(ctx: UnspecifiedStringExpressionContext) : AstNode {
        throw new ImplementMeException();
    }

    public visitVarContainsExpression(ctx: VarContainsExpressionContext) : AstNode {
        throw new ImplementMeException();
    }

    public visitVariable(ctx: VariableContext) : AstNode {
        return new Identifier(StringLiteral.from(ctx.text));
    }

    public visitVariableValueEvent(ctx: VariableValueEventContext) : AstNode {
        throw new ImplementMeException();
    }

    public visitWaitSecsStatement(ctx: WaitSecsStatementContext) : AstNode {
        return new WaitSecsStatement(ctx.numExpr().accept(this) as NumberExpression);
    }

    public visitWaitUntilStatement(ctx: WaitUntilStatementContext) : AstNode {
        return new WaitUntilStatement(ctx.boolExpr().accept(this) as BooleanExpression);
    }

    visit(tree: ParseTree): AstNode {
        throw new ImplementMeException();
    }

    visitChildren(node: RuleNode): AstNode {
        throw new ImplementMeException();
    }

    visitErrorNode(node: ErrorNode): AstNode {
        throw new ImplementMeException();
    }

    visitTerminal(node: TerminalNode): AstNode {
        throw new ImplementMeException();
    }

}

export class ToIntermediateTransformer implements SyntaxTreeTransformer {

    transform(origin: RuleNode): RuleNode {
        return origin;
    }

}
