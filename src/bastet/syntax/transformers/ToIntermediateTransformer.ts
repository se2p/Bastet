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
    ActorLookStmtContext,
    ActorSoundStmtContext,
    AddElementToStatementContext,
    AskAndWaitStatementContext,
    BackdropChangeEventContext,
    BoolAndExpressionContext,
    BoolAsNumExpressionContext, BoolAsStringExpressionContext, BooleanTypeContext,
    BoolExprContext,
    BoolLiteralExpressionContext,
    BoolOrExpressionContext,
    BoolParanthExpressionContext,
    BoolVariableExpressionContext,
    BroadcastAndWaitStatementContext, BroadcastMessageStatementContext,
    CallStmtContext,
    ChagenAttributeByStatementContext,
    ChagenGraphicEffectsByStatementContext,
    ChagenLayerByStatementContext,
    ChagenSizeByStatementContext, ChangePenAttributeByStementContext,
    ChangeSoundEffectStatementContext, ChangeVarByStatementContext, ChangeXbyStatementContext,
    ChangeYbyStatementContext,
    CleareSoundEffectsStatementContext,
    ClearGraphicEffectsStatementContext,
    ClickEventContext,
    CloneStartEventContext,
    ColorContext,
    ColorFromNumExpressionContext,
    ColorTouchesColorExpressionContext,
    CommonStmtContext,
    ConditionReachedEventContext,
    ControlStatementContext, ControlStmtContext,
    CoreBoolExprContext,
    CoreBoolExpressionContext, CoreControlStmtContext,
    CoreEventContext,
    CoreExpressionContext, CoreNonCtrlStmtContext,
    CoreNumExprContext, CoreNumExpressionContext,
    CoreStringExprContext,
    CoreStringExpressionContext,
    CreateCloneOfStatementContext,
    CurrentTimeCompExpressionContext, DateCompContext,
    DaysSinceMileniumExpressionContext,
    DeclarationStmtContext, DeclarationStmtListContext,
    DeclareAttributeContext,
    DeclareAttributeOfContext, DeclareVariableContext, DefaultBoolExpressionContext,
    DefaultNumExprContext,
    DefaultStringExpressionContext,
    DeleteAllFromStatementContext,
    DeleteIthFromStatementContext,
    DeleteThisCloneContext,
    DistanceToExpressionContext,
    ElementChoiceContext,
    ElseCaseContext,
    EnumTypeContext, EpsilonStatementContext, EraseAllStatementContext,
    EventContext, ExplicitPositionContext,
    ExpressionContext,
    ExpressionListContext,
    ExpressionListPlainContext, ExpressionStmtContext,
    FileTypeContext,
    FlatVariableContext, FunctionReturnDefinitionContext,
    GlideNumSecsToStatementContext,
    GotoBackLayerStatementContext,
    GotoFrontLayerStatementContext,
    GotoLayerStatementContext, GoToPositionStatementContext,
    HideSpriteStatementContext,
    HideVariableStatementContext, HourCompContext, IdentContext, IdentExpressionContext,
    IfOnEdgeBounceStatementContext, IfStmtContext, ImportDefinitionContext,
    ImportDefinitionListContext,
    InCoreEventContext,
    IndexOfExpressionContext,
    IndexTypeContext, InheritsFromContext,
    InsertAtStatementContext, IthLetterOfStringExpressionContext,
    IthStringItemOfExpressionContext,
    JoinStringsExpressionContext, KeyContext, KeyEventContext,
    KeyPressedExpressionContext,
    LengthOfListExpressionContext,
    LengthOfStringExpressionContext,
    ListExprContext, ListStmtContext,
    ListTypeContext,
    ListVariableExpressionContext,
    ListWithElementsExpressionContext,
    LoudnessExpressionContext,
    MapTypeContext, MessageContext, MessageReceivedEventContext,
    MethodDefinitionContext, MethodDefinitionListContext,
    MethodResultDeclarationContext,
    MinuteCompContext,
    MonthCompContext, MouseDownExpressionContext, MousePositionContext,
    MouseXExpressionContext, MouseYExpressionContext,
    MoveNumStepsStatementContext,
    NamedElementContext,
    NegatedBoolExpressionContext,
    NeverEventContext,
    NextElementContext,
    NonControlStatementContext,
    NonCtrlStmtContext,
    NumAsStringExpressionContext,
    NumberContext,
    NumberedElementContext, NumberTypeContext, NumBracketsContext,
    NumDivExpressionContext,
    NumEqualsExpressionContext, NumerTypeContext,
    NumExprContext, NumFunctContext,
    NumFunctExpressionContext, NumGreaterThanExpressionContext,
    NumLessThanExpressionContext, NumLiteralExpressionContext,
    NumMinusExpressionContext,
    NumModExpressionContext,
    NumMulExpressionContext,
    NumPlusExpressionContext,
    NumRandomExpressionContext,
    NumRoundExpressionContext,
    NumVariableExpressionContext,
    ParameterContext, ParameterListContext,
    ParameterListPlainContext,
    PenDownStatementContext, PenStmtContext,
    PenUpStatementContext,
    PivotPositionContext, PlaySoundUntilStatementContext,
    PointInDirStatementContext, PointTowardsPosStatementContext,
    PositionContext, PrevElementContext, ProgramContext,
    QualifiedVariableContext,
    RandomElementContext,
    RandomPositionContext, RepeatForeverStmtContext,
    RepeatTimesStmtContext,
    ReplaceElementAtStatementContext,
    ResetTimerStatementContext,
    ResourceAttributeOfExpressionContext,
    ResourceContext,
    ResourceListContext,
    ResourceLocatorContext, ResourceTypeContext,
    RGBAColorExpressionContext,
    SayForStatementContext,
    ScriptContext, ScriptListContext, SecondCompContext,
    SetAttributeOfToStatementContext,
    SetAttributeToStatementContext, SetGraphicEffectToStatementContext,
    SetPenAttributeStatementContext, SetPenColorStatementContext,
    SetSizeToPercStatementContext,
    SetSoundEffectStatementContext,
    SetStatementContext,
    SetStmtContext, SetStmtListContext, SetVariableToStatementContext,
    SetXtoStatementContext,
    SetYtoStatementContext, ShowSpriteStatementContext,
    ShowVariableStatementContext,
    SpriteLookStmtContext, SpriteMotionStmtContext,
    StampStatementContext,
    StartSoundStatementContext, StartupEventContext,
    StmtContext, StmtListContext,
    StmtListPlainContext,
    StopAllContext,
    StopAllSoundsStatementContext, StopOthersInActorStatementContext, StopThisContext, StrContainsExpressionContext,
    StrEqualsExpressionContext,
    StrGreaterThanExpressionContext, StrIdentExpressionContext,
    StringAsNumExpressionContext,
    StringAttributeOfExpressionContext,
    StringExprContext, StringLiteralExpressionContext,
    StringTypeContext, StringVariableExpressionContext,
    StrLessThanExpressionContext, SwitchBackdropAndWaitStatementContext, SwitchBackdropToStatementContext,
    SwitchCostumeStatementContext,
    TerminationStmtContext, ThinkForStatementContext,
    TimeCompContext,
    TimerExpressionContext,
    TouchableColorContext,
    TouchableContext,
    TouchableEdgeContext,
    TouchableMousePointerContext,
    TouchableSpriteContext,
    TouchingBoolExpressionContext, TurnLeftDegreeStatementContext,
    TurnRightDegreeStatementContext, TypeContext,
    UnspecifiedBoolExpressionContext,
    UnspecifiedExprContext,
    UnspecifiedNumExprContext,
    UnspecifiedStringExpressionContext, UntilStmtContext,
    UsernameExpressionContext,
    VarContainsExpressionContext,
    VariableContext,
    VariableValueEventContext, VoidReturnDefinitionContext,
    WaitSecsStatementContext, WaitUntilStatementContext,
    WeekdayCompContext,
    YearCompContext
} from "../parser/grammar/ScratchParser";
import {ProgramDefinition} from "../ast/core/ModuleDefinition";
import {Identifier} from "../ast/core/Identifier";
import {ImportDefinition, ImportDefinitionList} from "../ast/core/ImportDefinition";
import {ActorDefinition, ActorDefinitionList} from "../ast/core/ActorDefinition";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {StringLiteral} from "../ast/core/expressions/StringExpression";
import {ResourceLocation} from "../ast/core/ResourceLocation";
import {ResourceDefinition, ResourceDefinitionList, ResourceType} from "../ast/core/ResourceDefinition";
import {Statement, StatementList} from "../ast/core/statements/Statement";
import {MethodDefinition, MethodDefinitionList, ResultDeclaration} from "../ast/core/MethodDefinition";
import {ScriptDefinition, ScriptDefinitionList} from "../ast/core/ScriptDefinition";
import {DeclarationStatement} from "../ast/core/statements/DeclarationStatement";
import {SetStatement} from "../ast/core/statements/SetStatement";
import {Expression} from "../ast/core/expressions/Expression";
import {ExpressionList} from "../ast/core/expressions/ExpressionList";
import {ParameterDeclaration, ParameterDeclarationList} from "../ast/core/ParameterDeclaration";
import {BooleanType, NumberType, ScratchType, StringEnumType, StringType} from "../ast/core/ScratchType";
import {Scripts} from "../app/controlflow/Scripts";
import {CoreEvent} from "../ast/core/CoreEvent";

class ToIntermediateVisitor implements ScratchVisitor<AstNode> {

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

    public visitStmtList(ctx: StmtListContext): AstNode {
        const elems: Statement[] = this.buildArrayFrom(ctx.stmtListPlain().stmt());
        if (ctx.terminationStmt()) {
            elems.push(ctx.terminationStmt().accept(this) as Statement);
        }
        return new StatementList(elems);
    }

    public visitStmtListPlain(ctx: StmtListPlainContext): AstNode {
        const elems: Statement[] = this.buildArrayFrom(ctx.stmt());
        return new StatementList(elems);
    }

    visitBooleanType(ctx: BooleanTypeContext): AstNode {
        return BooleanType.instance();
    }

    visitEnumType(ctx: EnumTypeContext): AstNode {
        return StringEnumType.withValues(ctx.expressionListPlain().accept(this) as ExpressionList);
    }

    visitStringType(ctx: StringTypeContext): AstNode {
        return StringType.instance();
    }

    visitListType(ctx: ListTypeContext): AstNode {

    }

    visitNumberType (ctx: NumberTypeContext): AstNode {
        return NumberType.instance();
    }

    visitMapType: (ctx: MapTypeContext) => AstNode;

    visitActorComponentsDefinition: (ctx: ActorComponentsDefinitionContext) => AstNode;
    visitActorLookStmt: (ctx: ActorLookStmtContext) => AstNode;
    visitActorSoundStmt: (ctx: ActorSoundStmtContext) => AstNode;
    visitAddElementToStatement: (ctx: AddElementToStatementContext) => AstNode;
    visitAskAndWaitStatement: (ctx: AskAndWaitStatementContext) => AstNode;
    visitBackdropChangeEvent: (ctx: BackdropChangeEventContext) => AstNode;
    visitBoolAndExpression: (ctx: BoolAndExpressionContext) => AstNode;
    visitBoolAsNumExpression: (ctx: BoolAsNumExpressionContext) => AstNode;
    visitBoolAsStringExpression: (ctx: BoolAsStringExpressionContext) => AstNode;
    visitBoolExpr: (ctx: BoolExprContext) => AstNode;
    visitBoolLiteralExpression: (ctx: BoolLiteralExpressionContext) => AstNode;
    visitBoolOrExpression: (ctx: BoolOrExpressionContext) => AstNode;
    visitBoolParanthExpression: (ctx: BoolParanthExpressionContext) => AstNode;
    visitBoolVariableExpression: (ctx: BoolVariableExpressionContext) => AstNode;
    visitBroadcastAndWaitStatement: (ctx: BroadcastAndWaitStatementContext) => AstNode;
    visitBroadcastMessageStatement: (ctx: BroadcastMessageStatementContext) => AstNode;
    visitCallStmt: (ctx: CallStmtContext) => AstNode;
    visitChagenAttributeByStatement: (ctx: ChagenAttributeByStatementContext) => AstNode;
    visitChagenGraphicEffectsByStatement: (ctx: ChagenGraphicEffectsByStatementContext) => AstNode;
    visitChagenLayerByStatement: (ctx: ChagenLayerByStatementContext) => AstNode;
    visitChagenSizeByStatement: (ctx: ChagenSizeByStatementContext) => AstNode;
    visitChangePenAttributeByStement: (ctx: ChangePenAttributeByStementContext) => AstNode;
    visitChangeSoundEffectStatement: (ctx: ChangeSoundEffectStatementContext) => AstNode;
    visitChangeVarByStatement: (ctx: ChangeVarByStatementContext) => AstNode;
    visitChangeXbyStatement: (ctx: ChangeXbyStatementContext) => AstNode;
    visitChangeYbyStatement: (ctx: ChangeYbyStatementContext) => AstNode;
    visitClearGraphicEffectsStatement: (ctx: ClearGraphicEffectsStatementContext) => AstNode;
    visitCleareSoundEffectsStatement: (ctx: CleareSoundEffectsStatementContext) => AstNode;
    visitClickEvent: (ctx: ClickEventContext) => AstNode;
    visitCloneStartEvent: (ctx: CloneStartEventContext) => AstNode;
    visitColor: (ctx: ColorContext) => AstNode;
    visitColorFromNumExpression: (ctx: ColorFromNumExpressionContext) => AstNode;
    visitColorTouchesColorExpression: (ctx: ColorTouchesColorExpressionContext) => AstNode;
    visitCommonStmt: (ctx: CommonStmtContext) => AstNode;
    visitConditionReachedEvent: (ctx: ConditionReachedEventContext) => AstNode;
    visitControlStatement: (ctx: ControlStatementContext) => AstNode;
    visitControlStmt: (ctx: ControlStmtContext) => AstNode;
    visitCoreBoolExpr: (ctx: CoreBoolExprContext) => AstNode;
    visitCoreBoolExpression: (ctx: CoreBoolExpressionContext) => AstNode;
    visitCoreControlStmt: (ctx: CoreControlStmtContext) => AstNode;
    visitCoreEvent: (ctx: CoreEventContext) => AstNode;
    visitCoreExpression: (ctx: CoreExpressionContext) => AstNode;
    visitCoreNonCtrlStmt: (ctx: CoreNonCtrlStmtContext) => AstNode;
    visitCoreNumExpr: (ctx: CoreNumExprContext) => AstNode;
    visitCoreNumExpression: (ctx: CoreNumExpressionContext) => AstNode;
    visitCoreStringExpr: (ctx: CoreStringExprContext) => AstNode;
    visitCoreStringExpression: (ctx: CoreStringExpressionContext) => AstNode;
    visitCreateCloneOfStatement: (ctx: CreateCloneOfStatementContext) => AstNode;
    visitCurrentTimeCompExpression: (ctx: CurrentTimeCompExpressionContext) => AstNode;
    visitDateComp: (ctx: DateCompContext) => AstNode;
    visitDaysSinceMileniumExpression: (ctx: DaysSinceMileniumExpressionContext) => AstNode;
    visitDeclareAttribute: (ctx: DeclareAttributeContext) => AstNode;
    visitDeclareAttributeOf: (ctx: DeclareAttributeOfContext) => AstNode;
    visitDeclareVariable: (ctx: DeclareVariableContext) => AstNode;
    visitDefaultBoolExpression: (ctx: DefaultBoolExpressionContext) => AstNode;
    visitDefaultNumExpr: (ctx: DefaultNumExprContext) => AstNode;
    visitDefaultStringExpression: (ctx: DefaultStringExpressionContext) => AstNode;
    visitDeleteAllFromStatement: (ctx: DeleteAllFromStatementContext) => AstNode;
    visitDeleteIthFromStatement: (ctx: DeleteIthFromStatementContext) => AstNode;
    visitDeleteThisClone: (ctx: DeleteThisCloneContext) => AstNode;
    visitDistanceToExpression: (ctx: DistanceToExpressionContext) => AstNode;
    visitElementChoice: (ctx: ElementChoiceContext) => AstNode;
    visitElseCase: (ctx: ElseCaseContext) => AstNode;
    visitEpsilonStatement: (ctx: EpsilonStatementContext) => AstNode;
    visitEraseAllStatement: (ctx: EraseAllStatementContext) => AstNode;
    visitEvent: (ctx: EventContext) => AstNode;
    visitExplicitPosition: (ctx: ExplicitPositionContext) => AstNode;
    visitExpression: (ctx: ExpressionContext) => AstNode;
    visitExpressionStmt: (ctx: ExpressionStmtContext) => AstNode;
    visitFileType: (ctx: FileTypeContext) => AstNode;
    visitFlatVariable: (ctx: FlatVariableContext) => AstNode;
    visitGlideNumSecsToStatement: (ctx: GlideNumSecsToStatementContext) => AstNode;
    visitGoToPositionStatement: (ctx: GoToPositionStatementContext) => AstNode;
    visitGotoBackLayerStatement: (ctx: GotoBackLayerStatementContext) => AstNode;
    visitGotoFrontLayerStatement: (ctx: GotoFrontLayerStatementContext) => AstNode;
    visitGotoLayerStatement: (ctx: GotoLayerStatementContext) => AstNode;
    visitHideSpriteStatement: (ctx: HideSpriteStatementContext) => AstNode;
    visitHideVariableStatement: (ctx: HideVariableStatementContext) => AstNode;
    visitHourComp: (ctx: HourCompContext) => AstNode;
    visitIfOnEdgeBounceStatement: (ctx: IfOnEdgeBounceStatementContext) => AstNode;
    visitIfStmt: (ctx: IfStmtContext) => AstNode;
    visitInCoreEvent: (ctx: InCoreEventContext) => AstNode;
    visitIndexOfExpression: (ctx: IndexOfExpressionContext) => AstNode;
    visitIndexType: (ctx: IndexTypeContext) => AstNode;
    visitInheritsFrom: (ctx: InheritsFromContext) => AstNode;
    visitInsertAtStatement: (ctx: InsertAtStatementContext) => AstNode;
    visitIthLetterOfStringExpression: (ctx: IthLetterOfStringExpressionContext) => AstNode;
    visitIthStringItemOfExpression: (ctx: IthStringItemOfExpressionContext) => AstNode;
    visitJoinStringsExpression: (ctx: JoinStringsExpressionContext) => AstNode;
    visitKey: (ctx: KeyContext) => AstNode;
    visitKeyEvent: (ctx: KeyEventContext) => AstNode;
    visitKeyPressedExpression: (ctx: KeyPressedExpressionContext) => AstNode;
    visitLengthOfListExpression: (ctx: LengthOfListExpressionContext) => AstNode;
    visitLengthOfStringExpression: (ctx: LengthOfStringExpressionContext) => AstNode;
    visitListExpr: (ctx: ListExprContext) => AstNode;
    visitListStmt: (ctx: ListStmtContext) => AstNode;
    visitListVariableExpression: (ctx: ListVariableExpressionContext) => AstNode;
    visitListWithElementsExpression: (ctx: ListWithElementsExpressionContext) => AstNode;
    visitLoudnessExpression: (ctx: LoudnessExpressionContext) => AstNode;
    visitMessage: (ctx: MessageContext) => AstNode;
    visitMessageReceivedEvent: (ctx: MessageReceivedEventContext) => AstNode;
    visitMinuteComp: (ctx: MinuteCompContext) => AstNode;
    visitMonthComp: (ctx: MonthCompContext) => AstNode;
    visitMouseDownExpression: (ctx: MouseDownExpressionContext) => AstNode;
    visitMousePosition: (ctx: MousePositionContext) => AstNode;
    visitMouseXExpression: (ctx: MouseXExpressionContext) => AstNode;
    visitMouseYExpression: (ctx: MouseYExpressionContext) => AstNode;
    visitMoveNumStepsStatement: (ctx: MoveNumStepsStatementContext) => AstNode;
    visitNamedElement: (ctx: NamedElementContext) => AstNode;
    visitNegatedBoolExpression: (ctx: NegatedBoolExpressionContext) => AstNode;
    visitNeverEvent: (ctx: NeverEventContext) => AstNode;
    visitNextElement: (ctx: NextElementContext) => AstNode;
    visitNonControlStatement: (ctx: NonControlStatementContext) => AstNode;
    visitNonCtrlStmt: (ctx: NonCtrlStmtContext) => AstNode;
    visitNumAsStringExpression: (ctx: NumAsStringExpressionContext) => AstNode;
    visitNumBrackets: (ctx: NumBracketsContext) => AstNode;
    visitNumDivExpression: (ctx: NumDivExpressionContext) => AstNode;
    visitNumEqualsExpression: (ctx: NumEqualsExpressionContext) => AstNode;
    visitNumExpr: (ctx: NumExprContext) => AstNode;
    visitNumFunct: (ctx: NumFunctContext) => AstNode;
    visitNumFunctExpression: (ctx: NumFunctExpressionContext) => AstNode;
    visitNumGreaterThanExpression: (ctx: NumGreaterThanExpressionContext) => AstNode;
    visitNumLessThanExpression: (ctx: NumLessThanExpressionContext) => AstNode;
    visitNumLiteralExpression: (ctx: NumLiteralExpressionContext) => AstNode;
    visitNumMinusExpression: (ctx: NumMinusExpressionContext) => AstNode;
    visitNumModExpression: (ctx: NumModExpressionContext) => AstNode;
    visitNumMulExpression: (ctx: NumMulExpressionContext) => AstNode;
    visitNumPlusExpression: (ctx: NumPlusExpressionContext) => AstNode;
    visitNumRandomExpression: (ctx: NumRandomExpressionContext) => AstNode;
    visitNumRoundExpression: (ctx: NumRoundExpressionContext) => AstNode;
    visitNumVariableExpression: (ctx: NumVariableExpressionContext) => AstNode;
    visitNumber: (ctx: NumberContext) => AstNode;
    visitNumberedElement: (ctx: NumberedElementContext) => AstNode;
    visitNumerType: (ctx: NumerTypeContext) => AstNode;
    visitParameter: (ctx: ParameterContext) => AstNode;
    visitPenDownStatement: (ctx: PenDownStatementContext) => AstNode;
    visitPenStmt: (ctx: PenStmtContext) => AstNode;
    visitPenUpStatement: (ctx: PenUpStatementContext) => AstNode;
    visitPivotPosition: (ctx: PivotPositionContext) => AstNode;
    visitPlaySoundUntilStatement: (ctx: PlaySoundUntilStatementContext) => AstNode;
    visitPointInDirStatement: (ctx: PointInDirStatementContext) => AstNode;
    visitPointTowardsPosStatement: (ctx: PointTowardsPosStatementContext) => AstNode;
    visitPosition: (ctx: PositionContext) => AstNode;
    visitPrevElement: (ctx: PrevElementContext) => AstNode;
    visitQualifiedVariable: (ctx: QualifiedVariableContext) => AstNode;
    visitRGBAColorExpression: (ctx: RGBAColorExpressionContext) => AstNode;
    visitRandomElement: (ctx: RandomElementContext) => AstNode;
    visitRandomPosition: (ctx: RandomPositionContext) => AstNode;
    visitRepeatForeverStmt: (ctx: RepeatForeverStmtContext) => AstNode;
    visitRepeatTimesStmt: (ctx: RepeatTimesStmtContext) => AstNode;
    visitReplaceElementAtStatement: (ctx: ReplaceElementAtStatementContext) => AstNode;
    visitResetTimerStatement: (ctx: ResetTimerStatementContext) => AstNode;
    visitResourceAttributeOfExpression: (ctx: ResourceAttributeOfExpressionContext) => AstNode;
    visitResourceType: (ctx: ResourceTypeContext) => AstNode;
    visitSayForStatement: (ctx: SayForStatementContext) => AstNode;
    visitSecondComp: (ctx: SecondCompContext) => AstNode;
    visitSetAttributeOfToStatement: (ctx: SetAttributeOfToStatementContext) => AstNode;
    visitSetAttributeToStatement: (ctx: SetAttributeToStatementContext) => AstNode;
    visitSetGraphicEffectToStatement: (ctx: SetGraphicEffectToStatementContext) => AstNode;
    visitSetPenAttributeStatement: (ctx: SetPenAttributeStatementContext) => AstNode;
    visitSetPenColorStatement: (ctx: SetPenColorStatementContext) => AstNode;
    visitSetSizeToPercStatement: (ctx: SetSizeToPercStatementContext) => AstNode;
    visitSetSoundEffectStatement: (ctx: SetSoundEffectStatementContext) => AstNode;
    visitSetVariableToStatement: (ctx: SetVariableToStatementContext) => AstNode;
    visitSetXtoStatement: (ctx: SetXtoStatementContext) => AstNode;
    visitSetYtoStatement: (ctx: SetYtoStatementContext) => AstNode;
    visitShowSpriteStatement: (ctx: ShowSpriteStatementContext) => AstNode;
    visitShowVariableStatement: (ctx: ShowVariableStatementContext) => AstNode;
    visitSpriteLookStmt: (ctx: SpriteLookStmtContext) => AstNode;
    visitSpriteMotionStmt: (ctx: SpriteMotionStmtContext) => AstNode;
    visitStampStatement: (ctx: StampStatementContext) => AstNode;
    visitStartSoundStatement: (ctx: StartSoundStatementContext) => AstNode;
    visitStartupEvent: (ctx: StartupEventContext) => AstNode;
    visitStmt: (ctx: StmtContext) => AstNode;
    visitStopAll: (ctx: StopAllContext) => AstNode;
    visitStopAllSoundsStatement: (ctx: StopAllSoundsStatementContext) => AstNode;
    visitStopOthersInActorStatement: (ctx: StopOthersInActorStatementContext) => AstNode;
    visitStopThis: (ctx: StopThisContext) => AstNode;
    visitStrContainsExpression: (ctx: StrContainsExpressionContext) => AstNode;
    visitStrEqualsExpression: (ctx: StrEqualsExpressionContext) => AstNode;
    visitStrGreaterThanExpression: (ctx: StrGreaterThanExpressionContext) => AstNode;
    visitStrLessThanExpression: (ctx: StrLessThanExpressionContext) => AstNode;
    visitStringAsNumExpression: (ctx: StringAsNumExpressionContext) => AstNode;
    visitStringAttributeOfExpression: (ctx: StringAttributeOfExpressionContext) => AstNode;
    visitStringExpr: (ctx: StringExprContext) => AstNode;
    visitStringLiteralExpression: (ctx: StringLiteralExpressionContext) => AstNode;
    visitStringVariableExpression: (ctx: StringVariableExpressionContext) => AstNode;
    visitSwitchBackdropAndWaitStatement: (ctx: SwitchBackdropAndWaitStatementContext) => AstNode;
    visitSwitchBackdropToStatement: (ctx: SwitchBackdropToStatementContext) => AstNode;
    visitSwitchCostumeStatement: (ctx: SwitchCostumeStatementContext) => AstNode;
    visitTerminationStmt: (ctx: TerminationStmtContext) => AstNode;
    visitThinkForStatement: (ctx: ThinkForStatementContext) => AstNode;
    visitTimeComp: (ctx: TimeCompContext) => AstNode;
    visitTimerExpression: (ctx: TimerExpressionContext) => AstNode;
    visitTouchable: (ctx: TouchableContext) => AstNode;
    visitTouchableColor: (ctx: TouchableColorContext) => AstNode;
    visitTouchableEdge: (ctx: TouchableEdgeContext) => AstNode;
    visitTouchableMousePointer: (ctx: TouchableMousePointerContext) => AstNode;
    visitTouchableSprite: (ctx: TouchableSpriteContext) => AstNode;
    visitTouchingBoolExpression: (ctx: TouchingBoolExpressionContext) => AstNode;
    visitTurnLeftDegreeStatement: (ctx: TurnLeftDegreeStatementContext) => AstNode;
    visitTurnRightDegreeStatement: (ctx: TurnRightDegreeStatementContext) => AstNode;
    visitUnspecifiedBoolExpression: (ctx: UnspecifiedBoolExpressionContext) => AstNode;
    visitUnspecifiedExpr: (ctx: UnspecifiedExprContext) => AstNode;
    visitUnspecifiedNumExpr: (ctx: UnspecifiedNumExprContext) => AstNode;
    visitUnspecifiedStringExpression: (ctx: UnspecifiedStringExpressionContext) => AstNode;
    visitUntilStmt: (ctx: UntilStmtContext) => AstNode;
    visitUsernameExpression: (ctx: UsernameExpressionContext) => AstNode;
    visitVarContainsExpression: (ctx: VarContainsExpressionContext) => AstNode;
    visitVariable: (ctx: VariableContext) => AstNode;
    visitVariableValueEvent: (ctx: VariableValueEventContext) => AstNode;
    visitWaitSecsStatement: (ctx: WaitSecsStatementContext) => AstNode;
    visitWaitUntilStatement: (ctx: WaitUntilStatementContext) => AstNode;
    visitWeekdayComp: (ctx: WeekdayCompContext) => AstNode;
    visitYearComp: (ctx: YearCompContext) => AstNode;

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
