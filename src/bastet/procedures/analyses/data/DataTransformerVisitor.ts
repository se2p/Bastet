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

import {
    CoreBoolExpressionVisitor,
    CoreListExpressionVisitor,
    CoreNonCtrlStatementnVisitor,
    CoreNumberExpressionVisitor,
    CoreStringExpressionVisitor,
    CoreVisitor
} from "../../../syntax/ast/CoreVisitor";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {WaitUntilStatement} from "../../../syntax/ast/core/statements/WaitUntilStatement";
import {
    BoolAsNumberExpression,
    DivideExpression,
    IndexOfExpression,
    LengthOfListExpression,
    LengthOfStringExpression,
    MinusExpression,
    ModuloExpression,
    MultiplyExpression,
    NumberLiteral,
    NumberVariableExpression,
    NumFunctExpression,
    PickRandomFromExpression,
    PlusExpression,
    RoundExpression, StringAsNumberExpression,
    TimerExpression
} from "../../../syntax/ast/core/expressions/NumberExpression";
import {
    BoolAsStringExpression,
    IthLetterOfStringExpression,
    IthStringItemOfExpression,
    JoinStringsExpression, NumAsStringExpression,
    ResourceAttributeOfExpression,
    StringAttributeOfExpression,
    StringLiteral,
    StringVariableExpression
} from "../../../syntax/ast/core/expressions/StringExpression";
import {
    AndExpression,
    BooleanExpression,
    BooleanLiteral,
    BooleanVariableExpression,
    NegationExpression,
    NumEqualsExpression,
    NumGreaterEqualExpression,
    NumGreaterThanExpression,
    NumLessEqualExpression,
    NumLessThanExpression,
    OrExpression,
    StrContainsExpression,
    StrEqualsExpression,
    StrGreaterThanExpression,
    StrLessThanExpression
} from "../../../syntax/ast/core/expressions/BooleanExpression";
import {
    SetAttributeOfToStatement,
    SetAttributeToStatement,
    StoreEvalResultToVariableStatement
} from "../../../syntax/ast/core/statements/SetStatement";
import {
    DeleteThisCloneStatement,
    StopAllStatement,
    StopThisStatement
} from "../../../syntax/ast/core/statements/TerminationStatement";
import {StopOthersInActorStatement} from "../../../syntax/ast/core/statements/StopOthersInActorStatement";
import {ResetTimerStatement} from "../../../syntax/ast/core/statements/ResetTimerStatement";
import {
    AddElementToStatement,
    DeleteAllFromStatement,
    DeleteIthFromStatement,
    InsertAtStatement,
    ReplaceElementAtStatement
} from "../../../syntax/ast/core/statements/ListStatement";
import {ExpressionListExpression, ListVariableExpression} from "../../../syntax/ast/core/expressions/ListExpression";
import {ExpressionStatement} from "../../../syntax/ast/core/statements/ExpressionStatement";
import {EpsilonStatement} from "../../../syntax/ast/core/statements/EpsilonStatement";
import {
    DeclareActorVariableStatement,
    DeclareAttributeStatement,
    DeclareStackVariableStatement,
    DeclareSystemVariableStatement
} from "../../../syntax/ast/core/statements/DeclarationStatement";
import {CreateCloneOfStatement} from "../../../syntax/ast/core/statements/CreateCloneOfStatement";
import {ChangeVarByStatement} from "../../../syntax/ast/core/statements/ChangeVarByStatement";
import {ChangeAttributeByStatement} from "../../../syntax/ast/core/statements/ChangeAttributeByStatement";
import {BroadcastMessageStatement} from "../../../syntax/ast/core/statements/BroadcastMessageStatement";
import {BroadcastAndWaitStatement} from "../../../syntax/ast/core/statements/BroadcastAndWaitStatement";
import {AstNode} from "../../../syntax/ast/AstNode";
import {Preconditions} from "../../../utils/Preconditions";
import {
    AbstractBoolean,
    AbstractList,
    AbstractTheories,
    AbstractNumber,
    AbstractString,
    RationalNumberTheory
} from "../../domains/MemoryTransformer";
import {ActorType, BooleanType, NumberType, StringType} from "../../../syntax/ast/core/ScratchType";
import {CallStatement} from "../../../syntax/ast/core/statements/CallStatement";
import {
    BooleanFormula,
    FirstOrderFormula,
    ListFormula,
    NumberFormula,
    StringFormula
} from "../../../utils/ConjunctiveNormalForm";
import {ConcreteBoolean, ConcreteNumber, ConcreteString} from "../../domains/ConcreteElements";
import {AssumeStatement} from "../../../syntax/ast/core/statements/AssumeStatement";
import {MethodIdentifiers} from "../../../syntax/app/controlflow/MethodIdentifiers";
import {VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {BeginAtomicStatement, EndAtomicStatement} from "../../../syntax/ast/core/statements/ControlStatement";
import {CastExpression} from "../../../syntax/ast/core/expressions/CastExpression";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {InitializeAnalysisStatement} from "../../../syntax/ast/core/statements/InternalStatement";

export class DataNumExpressionVisitor<B extends AbstractBoolean, N extends AbstractNumber,
    S extends AbstractString, L extends AbstractList>
    implements CoreNumberExpressionVisitor<N> {

    private readonly _theories: AbstractTheories<B, B, N, S, L>;
    private readonly _theory: RationalNumberTheory<N, B>;

    constructor(theories: AbstractTheories<B, B, N, S, L>) {
        this._theories = Preconditions.checkNotUndefined(theories);
        this._theory = Preconditions.checkNotUndefined(theories.numTheory);
    }

    visit(node: AstNode): N {
        throw new ImplementMeException();
    }

    visitCastExpression(node: CastExpression): N {
        Preconditions.checkArgument(node.castToType == NumberType.instance());

        if (node.toConvert.expressionType == StringType.instance()) {
            const stringVisitor = new DataStringExpressionVisitor(this._theories);
            return this._theory.castStringAsNumber(node.toConvert.accept(stringVisitor));

        } else if (node.toConvert.expressionType == BooleanType.instance()) {
            const boolVisitor = new DataBoolExpressionVisitor(this._theories);
            return this._theory.castBoolAsNumber(node.toConvert.accept(boolVisitor));
        }

        throw new ImplementMeException();
    }

    visitVariableWithDataLocation(node: VariableWithDataLocation): N {
        return this._theory.abstractNumberValue(node);
    }

    visitNumberVariableExpression(node: NumberVariableExpression): N {
        return this.visitVariableWithDataLocation(node.variable);
    }

    visitBoolAsNumberExpression(node: BoolAsNumberExpression): N {
        throw new ImplementMeException();
    }

    visitDivideExpression(node: DivideExpression): N {
        return this._theory.divide(node.operand1.accept(this), node.operand2.accept(this));
    }

    visitIndexOfExpression(node: IndexOfExpression): N {
        throw new ImplementMeException();
    }

    visitLengthOListExpression(node: LengthOfListExpression): N {
        throw new ImplementMeException();
    }

    visitLengthOfStringExpression(node: LengthOfStringExpression): N {
        const stringVisitor = new DataStringExpressionVisitor(this._theories);
        return this._theories.stringTheory.lengthOf(node.str.accept(stringVisitor) as S);
    }

    visitMinusExpression(node: MinusExpression): N {
        return this._theory.minus(node.operand1.accept(this), node.operand2.accept(this));
    }

    visitModuloExpression(node: ModuloExpression): N {
        return this._theory.modulo(node.operand1.accept(this), node.operand2.accept(this));
    }

    visitMultiplyExpression(node: MultiplyExpression): N {
        return this._theory.multiply(node.operand1.accept(this), node.operand2.accept(this));
    }

    visitNumFunctExpression(node: NumFunctExpression): N {
        throw new ImplementMeException();
    }

    visitPickRandomFromExpression(node: PickRandomFromExpression): N {
        throw new ImplementMeException();
    }

    visitPlusExpression(node: PlusExpression): N {
        return this._theory.plus(node.operand1.accept(this), node.operand2.accept(this));
    }

    visitRoundExpression(node: RoundExpression): N {
        throw new ImplementMeException();
    }

    visitStringAsNumberExpression(node: StringAsNumberExpression): N {
        const stringVisitor = new DataStringExpressionVisitor(this._theories);
        return this._theory.castStringAsNumber(node.toConvert.accept(stringVisitor))
    }

    visitTimerExpression(node: TimerExpression): N {
        throw new ImplementMeException();
    }

    visitNumberLiteral(node: NumberLiteral): N {
        return this._theory.fromConcreteNumber(new ConcreteNumber(node.num));
    }

}

export class DataBoolExpressionVisitor<B extends AbstractBoolean, N extends AbstractNumber,
    S extends AbstractString, L extends AbstractList>
    implements CoreBoolExpressionVisitor<B> {

    private readonly _base: B;
    private readonly _theories: AbstractTheories<B, B, N, S, L>;

    constructor(theories: AbstractTheories<B, B, N, S, L>) {
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    visit(node: AstNode): B {
        throw new ImplementMeException();
    }

    visitAndExpression(node: AndExpression): B {
        return this._theories.boolTheory.and(node.operand1.accept(this), node.operand2.accept(this));
    }

    visitBooleanLiteral(node: BooleanLiteral): B {
        return this._theories.boolTheory.fromConcreteBoolean(new ConcreteBoolean(node.value));
    }

    visitVariableWithDataLocation(node: VariableWithDataLocation): B {
        return this._theories.boolTheory.abstractBooleanValue(node);
    }

    visitBooleanVariableExpression(node: BooleanVariableExpression): B {
        return this.visitVariableWithDataLocation(node.variable);
    }

    visitNegationExpression(node: NegationExpression): B {
        const toNegate: B = node.negate.accept(this);
        return this._theories.boolTheory.not(toNegate);
    }

    visitNumEqualsExpression(node: NumEqualsExpression): B {
        const numVisitor = new DataNumExpressionVisitor(this._theories);
        const op1: N = node.operand1.accept(numVisitor);
        const op2: N = node.operand2.accept(numVisitor);
        return this._theories.numTheory.isNumberEqualTo(op1, op2);
    }

    visitNumGreaterEqualExpression(node: NumGreaterEqualExpression): B {
        const numVisitor = new DataNumExpressionVisitor(this._theories);
        const op1: N = node.operand1.accept(numVisitor);
        const op2: N = node.operand2.accept(numVisitor);
        return this._theories.numTheory.isGreaterEqual(op1, op2);
    }

    visitNumGreaterThanExpression(node: NumGreaterThanExpression): B {
        const numVisitor = new DataNumExpressionVisitor(this._theories);
        const op1: N = node.operand1.accept(numVisitor);
        const op2: N = node.operand2.accept(numVisitor);
        return this._theories.numTheory.isGreaterThan(op1, op2);
    }

    visitNumLessThanExpression(node: NumLessThanExpression): B {
        const numVisitor = new DataNumExpressionVisitor(this._theories);
        const op1: N = node.operand1.accept(numVisitor);
        const op2: N = node.operand2.accept(numVisitor);
        return this._theories.numTheory.isLessThan(op1, op2);
    }

    visitNumLessEqualExpression(node: NumLessEqualExpression): B {
        const numVisitor = new DataNumExpressionVisitor(this._theories);
        const op1: N = node.operand1.accept(numVisitor);
        const op2: N = node.operand2.accept(numVisitor);
        return this._theories.numTheory.isLessEqual(op1, op2);
    }

    visitOrExpression(node: OrExpression): B {
        return this._theories.boolTheory.or(
            node.operand1.accept(this), node.operand2.accept(this));
    }

    visitStrContainsExpression(node: StrContainsExpression): B {
        const strVisitor = new DataStringExpressionVisitor(this._theories);
        return this._theories.stringTheory.stringContains(
            node.operand1.accept(strVisitor) as S, node.operand2.accept(strVisitor) as S);
    }

    visitStrEqualsExpression(node: StrEqualsExpression): B {
        const strVisitor = new DataStringExpressionVisitor(this._theories);
        return this._theories.stringTheory.stringsEqual(
            node.operand1.accept(strVisitor) as S, node.operand2.accept(strVisitor) as S);
    }

    visitStrGreaterThanExpression(node: StrGreaterThanExpression): B {
        // ATTENTION: Special semantics of the theory that is implemented
        throw new ImplementMeException();
    }

    visitStrLessThanExpression(node: StrLessThanExpression): B {
        // ATTENTION: Special semantics of the theory that is implemented
        throw new ImplementMeException();
    }

    visitCastExpression(node: CastExpression): B {
        Preconditions.checkArgument(node.castToType == BooleanType.instance());

        if (node.toConvert.expressionType == StringType.instance()) {
            const stringVisitor = new DataStringExpressionVisitor(this._theories);
            throw new ImplementMeException();

        } else if (node.toConvert.expressionType == NumberType.instance()) {
            const numVisitor = new DataNumExpressionVisitor(this._theories);
            const numFormula = node.toConvert.accept(numVisitor);
            return this._theories.boolTheory.not(
                this._theories.numTheory.isNumberEqualTo(numFormula, this._theories.numTheory.zero()));
        }

        throw new ImplementMeException();
    }

}

export class DataStringExpressionVisitor<B extends AbstractBoolean, N extends AbstractNumber,
    S extends AbstractString, L extends AbstractList> implements CoreStringExpressionVisitor<S> {

    private readonly _theories: AbstractTheories<B, B, N, S, L>;

    constructor(theories: AbstractTheories<B, B, N, S, L>) {
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    visit(node: AstNode): S {
        throw new ImplementMeException();
    }

    visitBoolAsStringExpression(node: BoolAsStringExpression): S {
        throw new ImplementMeException();
    }

    visitIthLetterOfStringExpression(node: IthLetterOfStringExpression): S {
        throw new ImplementMeException();
    }

    visitIthStringItemOfExpression(node: IthStringItemOfExpression): S {
        throw new ImplementMeException();
    }

    visitJoinStringsExpression(node: JoinStringsExpression): S {
        return this._theories.stringTheory.joinStrings(node.operand1.accept(this), node.operand2.accept(this));
    }

    visitNumAsStringExpression(node: NumAsStringExpression): S {
        const numVisitor = new DataNumExpressionVisitor(this._theories);
        return this._theories.stringTheory.castNumberAsString(node.accept(numVisitor));
    }

    visitResourceAttributeOfExpression(node: ResourceAttributeOfExpression): S {
        throw new ImplementMeException();
    }

    visitStringAttributeOfExpression(node: StringAttributeOfExpression): S {
        throw new ImplementMeException();
    }

    visitStringLiteral(node: StringLiteral): S {
        return this._theories.stringTheory.fromConcreteString(new ConcreteString(node.text));
    }

    visitStringVariableExpression(node: StringVariableExpression): S {
        return this._theories.stringTheory.abstractStringValue(node.variable);
    }

    visitVariableWithDataLocation(node: VariableWithDataLocation): S {
        return this._theories.stringTheory.abstractStringValue(node);
    }

    visitCastExpression(node: CastExpression): S {
        Preconditions.checkArgument(node.castToType == StringType.instance());

        if (node.toConvert.expressionType == NumberType.instance()) {
            const numVisitor = new DataNumExpressionVisitor(this._theories);
            return this._theories.stringTheory.castNumberAsString(node.toConvert.accept(numVisitor));

        } else if (node.toConvert.expressionType == StringType.instance()) {
            return node.toConvert.accept(this);
        }

        throw new ImplementMeException();
    }

}

export class DataListExpressionVisitor implements CoreListExpressionVisitor<AbstractList> {

    private readonly _theories: AbstractTheories<FirstOrderFormula, BooleanFormula, NumberFormula, StringFormula, ListFormula>;

    constructor(theories: AbstractTheories<FirstOrderFormula, BooleanFormula, NumberFormula, StringFormula, ListFormula>) {
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    visit(node: AstNode): AbstractList {
        throw new ImplementMeException();
    }

    visitExpressionListExpression(node: ExpressionListExpression): AbstractList {
        throw new ImplementMeException();
    }

    visitListVariableExpression(node: ListVariableExpression): AbstractList {
        throw new ImplementMeException();
    }

}

export class DataTransformerVisitor<B extends AbstractBoolean,
    N extends AbstractNumber, S extends AbstractString, L extends AbstractList>
    implements CoreVisitor<B>, CoreNonCtrlStatementnVisitor<B> {

    private readonly _mem: B;
    private readonly _theories: AbstractTheories<B, B, N, S, L>;

    constructor(base: B, theories: AbstractTheories<B, B, N, S, L>) {
        this._mem = Preconditions.checkNotUndefined(base);
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    visitCallStatement(node: CallStatement): B {
        const method = node.calledMethod.text;
        if (method == MethodIdentifiers._RUNTIME_signalFailure) {
            return this._mem;
        } else if (method.startsWith("_RUNTIME_")) {
            throw new ImplementMeException();
        }
        return this._mem;
    }

    visitBeginAtomicStatement(node: BeginAtomicStatement): B {
        return this._mem;
    }

    visitEndAtomicStatement(node: EndAtomicStatement): B {
        return this._mem;
    }

    visitAddElementToStatement(node: AddElementToStatement): B {
        throw new ImplementMeException();
    }

    visitBroadcastAndWaitStatement(node: BroadcastAndWaitStatement): B {
        return this._mem;
    }

    visitBroadcastMessageStatement(node: BroadcastMessageStatement): B {
        return this._mem;
    }

    visitChangeAttributeByStatement(node: ChangeAttributeByStatement): B {
        throw new ImplementMeException();
    }

    visitChangeVarByStatement(node: ChangeVarByStatement): B {
        throw new ImplementMeException();
    }

    visitCreateCloneOfStatement(node: CreateCloneOfStatement): B {
        throw new ImplementMeException();
    }

    visitDeclareAttributeStatement(node: DeclareAttributeStatement): B {
        throw new ImplementMeException();
    }

    visitDeclareActorVariableStatement(node: DeclareActorVariableStatement): B {
        // We assume the variables to be initialized with NONDET-values
        return this._mem;
    }

    visitDeclareStackVariableStatement(node: DeclareStackVariableStatement): B {
        // We assume the variables to be initialized with NONDET-values
        return this._mem;
    }

    visitDeclareSystemVariableStatement(node: DeclareSystemVariableStatement): B {
        // We assume the variables to be initialized with NONDET-values
        return this._mem;
    }

    visitInitializeAnalysisStatement(node: InitializeAnalysisStatement): B {
        return this._mem;
    }

    visitDeleteFromAllStatement(node: DeleteAllFromStatement): B {
        throw new ImplementMeException();
    }

    visitDeleteIthFromStatement(node: DeleteIthFromStatement): B {
        throw new ImplementMeException();
    }

    visitDeleteThisCloneStatement(node: DeleteThisCloneStatement): B {
        throw new ImplementMeException();
    }

    visitEpsilonStatement(node: EpsilonStatement): B {
        return this._mem;
    }

    visitExpressionStatement(node: ExpressionStatement): B {
        throw new ImplementMeException();
    }

    visitInsertAtStatement(node: InsertAtStatement): B {
        throw new ImplementMeException();
    }

    visitReplaceElementAtStatement(node: ReplaceElementAtStatement): B {
        throw new ImplementMeException();
    }

    visitResetTimerStatement(node: ResetTimerStatement): B {
        throw new ImplementMeException();
    }

    visitSetAttributeOfToStatement(node: SetAttributeOfToStatement): B {
        throw new ImplementMeException();
    }

    visitSetAttributeToStatement(node: SetAttributeToStatement): B {
        throw new ImplementMeException();
    }

    visitStopAllStatement(node: StopAllStatement): B {
        throw new ImplementMeException();
    }

    visitStopOthersInActorStatement(node: StopOthersInActorStatement): B {
        throw new ImplementMeException();
    }

    visitStopThisStatement(node: StopThisStatement): B {
        throw new ImplementMeException();
    }

    visitAssumeStatement(node: AssumeStatement): B {
        const assume = this.visitBoolExpression(node.condition);
        return this._theories.boolTheory.and(this._mem, assume);
    }

    visitStoreEvalResultToVariableStatement(node: StoreEvalResultToVariableStatement): B {
        // We assume that a wrapping analysis step takes care of ssa.
        const declaredType = node.variable.expressionType;
        if (declaredType instanceof NumberType) {
            const visitor = new DataNumExpressionVisitor(this._theories);
            const value: N = node.toValue.accept(visitor);
            const assignTo = this._theories.numTheory.abstractNumberValue(node.variable);
            const assume: B = this._theories.numTheory.isNumberEqualTo(assignTo, value);
            return this._theories.boolTheory.and(this._mem, assume);

        } else if (declaredType instanceof BooleanType) {
            const visitor = new DataBoolExpressionVisitor(this._theories);
            const value: B = node.toValue.accept(visitor);
            const assignTo = this._theories.boolTheory.abstractBooleanValue(node.variable);
            const assume: B = this._theories.boolTheory.equal(assignTo, value);
            return this._theories.boolTheory.and(this._mem, assume);

        } else if (declaredType instanceof StringType) {
            const visitor = new DataStringExpressionVisitor(this._theories);
            const value: S = node.toValue.accept(visitor);
            const assignTo = this._theories.stringTheory.abstractStringValue(node.variable);
            const assume: B = this._theories.stringTheory.stringsEqual(assignTo, value);
            return this._theories.boolTheory.and(this._mem, assume);

        } else if (declaredType instanceof ActorType) {
            // Handled by the control analysis
            throw new IllegalArgumentException("This operation should have been handled by the control analysis!");

        } else {
            throw new ImplementMeException();
        }
    }

    visitWaitUntilStatement(node: WaitUntilStatement): B {
        throw new ImplementMeException();
    }

    visitBoolExpression(node: BooleanExpression): B {
        Preconditions.checkNotUndefined(node);
        const visitor = new DataBoolExpressionVisitor(this._theories);
        return node.accept(visitor);
    }

    visit(node: AstNode): B {
        throw new ImplementMeException();
    }

}

