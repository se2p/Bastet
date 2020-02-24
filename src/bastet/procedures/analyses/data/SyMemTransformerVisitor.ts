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
    CoreBoolExpressionVisitor, CoreListExpressionVisitor, CoreNonCtrlStatementnVisitor,
    CoreNumberExpressionVisitor,
    CoreStringExpressionVisitor,
    CoreVisitor
} from "../../../syntax/ast/CoreVisitor";
import {SyMemAbstractDomain, SymMemAbstractState} from "./SyMemAbstractDomain";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {WaitUntilStatement} from "../../../syntax/ast/core/statements/WaitUntilStatement";
import {
    BoolAsNumberExpression,
    DivideExpression,
    IndexOfExpression,
    LengthOfStringExpression, LengthOListExpression,
    MinusExpression,
    ModuloExpression,
    MultiplyExpression,
    NumberLiteral,
    NumberVariableExpression, NumFunctExpression,
    PickRandomFromExpression,
    PlusExpression,
    RoundExpression,
    StringAsNumberExpression,
    TimerExpression
} from "../../../syntax/ast/core/expressions/NumberExpression";
import {
    BoolAsStringExpression,
    IthLetterOfStringExpression,
    IthStringItemOfExpression,
    JoinStringsExpression,
    NumAsStringExpression,
    ResourceAttributeOfExpression,
    StringAttributeOfExpression,
    StringLiteral,
    StringVariableExpression
} from "../../../syntax/ast/core/expressions/StringExpression";
import {
    AndExpression, BooleanExpression,
    BooleanLiteral,
    BooleanVariableExpression,
    NegationExpression,
    NumEqualsExpression,
    NumGreaterThanExpression,
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
    DeclareAttributeOfStatement,
    DeclareAttributeStatement,
    DeclareStackVariableStatement
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
    AbstractNumber,
    AbstractString,
    AbstractMemoryTheory,
    MemoryTransformer, RationalNumberTheory
} from "../../domains/MemoryTransformer";
import {BooleanType, NumberType, ScratchType, ScratchTypeID} from "../../../syntax/ast/core/ScratchType";
import {CallStatement} from "../../../syntax/ast/core/statements/CallStatement";
import {
    BooleanFormula,
    FirstOrderFormula,
    ListFormula,
    NumberFormula,
    StringFormula
} from "../../../utils/ConjunctiveNormalForm";
import {ConcreteNumber, ConcreteNumberDomain} from "../../domains/ConcreteElements";
import {AbstractElement} from "../../../lattices/Lattice";
import {Map as ImmMap} from "immutable";
import {AssumeStatement} from "../../../syntax/ast/core/statements/AssumeStatement";
import {Expression} from "../../../syntax/ast/core/expressions/Expression";
import {MethodIdentifiers} from "../../../syntax/app/controlflow/MethodIdentifiers";

export class MemNumExpressionVisitor<N extends AbstractNumber, B extends AbstractBoolean>
    implements CoreNumberExpressionVisitor<N> {

    private readonly _theory: RationalNumberTheory<N, B>;

    constructor(theory: RationalNumberTheory<N, B>) {
        this._theory = Preconditions.checkNotUndefined(theory);
    }

    visit(node: AstNode): N {
        throw new ImplementMeException();
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

    visitLengthOListExpression(node: LengthOListExpression): N {
        throw new ImplementMeException();
    }

    visitLengthOfStringExpression(node: LengthOfStringExpression): N {
        throw new ImplementMeException();
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
        throw new ImplementMeException();
    }

    visitTimerExpression(node: TimerExpression): N {
        throw new ImplementMeException();
    }

    visitNumberLiteral(node: NumberLiteral): N {
        return this._theory.fromConcreteNumber(new ConcreteNumber(node.num));
    }

    visitNumberVariableExpression(node: NumberVariableExpression): N {
        return this._theory.abstractNumberValue(node.variable);
    }

}

export class SyMemBoolExpressionVisitor<B extends AbstractBoolean, N extends AbstractNumber,
    S extends AbstractString, L extends AbstractList>
    implements CoreBoolExpressionVisitor<B> {

    private readonly _base: B;
    private readonly _theories: AbstractMemoryTheory<B, B, N, S, L>;

    constructor(theories: AbstractMemoryTheory<B, B, N, S, L>) {
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    visit(node: AstNode): B {
        throw new ImplementMeException();
    }

    visitAndExpression(node: AndExpression): B {
        throw new ImplementMeException();
    }

    visitBooleanLiteral(node: BooleanLiteral): B {
        throw new ImplementMeException();
    }

    visitBooleanVariableExpression(node: BooleanVariableExpression): B {
        throw new ImplementMeException();
    }

    visitNegationExpression(node: NegationExpression): B {
        const toNegate: B = node.negate.accept(this);
        return this._theories.boolTheory.not(toNegate);
    }

    visitNumEqualsExpression(node: NumEqualsExpression): B {
        const numVisitor = new MemNumExpressionVisitor(this._theories.numTheory);
        const op1: N = node.operand1.accept(numVisitor);
        const op2: N = node.operand2.accept(numVisitor);
        return this._theories.numTheory.isNumberEqualTo(op1, op2);
    }

    visitNumGreaterThanExpression(node: NumGreaterThanExpression): B {
        const numVisitor = new MemNumExpressionVisitor(this._theories.numTheory);
        const op1: N = node.operand1.accept(numVisitor);
        const op2: N = node.operand2.accept(numVisitor);
        return this._theories.numTheory.isGreaterThan(op1, op2);
    }

    visitNumLessThanExpression(node: NumLessThanExpression): B {
        const numVisitor = new MemNumExpressionVisitor(this._theories.numTheory);
        const op1: N = node.operand1.accept(numVisitor);
        const op2: N = node.operand2.accept(numVisitor);
        return this._theories.numTheory.isLessThan(op1, op2);
    }

    visitOrExpression(node: OrExpression): B {
        throw new ImplementMeException();
    }

    visitStrContainsExpression(node: StrContainsExpression): B {
        throw new ImplementMeException();
    }

    visitStrEqualsExpression(node: StrEqualsExpression): B {
        throw new ImplementMeException();
    }

    visitStrGreaterThanExpression(node: StrGreaterThanExpression): B {
        throw new ImplementMeException();
    }

    visitStrLessThanExpression(node: StrLessThanExpression): B {
        throw new ImplementMeException();
    }

}

export class MemStringExpressionVisitor implements CoreStringExpressionVisitor<AbstractString> {

    private readonly _theories: AbstractMemoryTheory<FirstOrderFormula, BooleanFormula, NumberFormula, StringFormula, ListFormula>;

    constructor(theories: AbstractMemoryTheory<FirstOrderFormula, BooleanFormula, NumberFormula, StringFormula, ListFormula>) {
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    visit(node: AstNode): AbstractString {
        throw new ImplementMeException();
    }

    visitBoolAsStringExpression(node: BoolAsStringExpression): AbstractString {
        throw new ImplementMeException();
    }

    visitIthLetterOfStringExpression(node: IthLetterOfStringExpression): AbstractString {
        throw new ImplementMeException();
    }

    visitIthStringItemOfExpression(node: IthStringItemOfExpression): AbstractString {
        throw new ImplementMeException();
    }

    visitJoinStringsExpression(node: JoinStringsExpression): AbstractString {
        throw new ImplementMeException();
    }

    visitNumAsStringExpression(node: NumAsStringExpression): AbstractString {
        throw new ImplementMeException();
    }

    visitResourceAttributeOfExpression(node: ResourceAttributeOfExpression): AbstractString {
        throw new ImplementMeException();
    }

    visitStringAttributeOfExpression(node: StringAttributeOfExpression): AbstractString {
        throw new ImplementMeException();
    }

    visitStringLiteral(node: StringLiteral): AbstractString {
        throw new ImplementMeException();
    }

    visitStringVariableExpression(node: StringVariableExpression): AbstractString {
        throw new ImplementMeException();
    }

}

export class MemListExpressionVisitor implements CoreListExpressionVisitor<AbstractList> {

    private readonly _theories: AbstractMemoryTheory<FirstOrderFormula, BooleanFormula, NumberFormula, StringFormula, ListFormula>;

    constructor(theories: AbstractMemoryTheory<FirstOrderFormula, BooleanFormula, NumberFormula, StringFormula, ListFormula>) {
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

export class SyMemTransformerVisitor<B extends AbstractBoolean,
    N extends AbstractNumber, S extends AbstractString, L extends AbstractList>
    implements CoreVisitor<B>, CoreNonCtrlStatementnVisitor<B> {

    private readonly _mem: B;
    private readonly _theories: AbstractMemoryTheory<B, B, N, S, L>;

    constructor(base: B, theories: AbstractMemoryTheory<B, B, N, S, L>) {
        this._mem = Preconditions.checkNotUndefined(base);
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    visitCallStatement(node: CallStatement): B {
        const method = node.calledMethod.text;
        if (method == MethodIdentifiers._RUNTIME_signalFailure) {
            return this._mem;
        }
        throw new ImplementMeException();
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

    visitDeclareAttributeOfStatement(node: DeclareAttributeOfStatement): B {
        throw new ImplementMeException();
    }

    visitDeclareAttributeStatement(node: DeclareAttributeStatement): B {
        throw new ImplementMeException();
    }

    visitDeclareStackVariableStatement(node: DeclareStackVariableStatement): B {
        // We assume the variables to be initialized with NONDET-values
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
        // We assume that a wrapping analysis step takes care of SSA.
        const declaredType = node.variable.type;
        if (declaredType instanceof NumberType) {
            const visitor = new MemNumExpressionVisitor(this._theories.numTheory);
            const value: N = node.toValue.accept(visitor);
            const assignTo = this._theories.numTheory.abstractNumberValue(node.variable);
            const assume: B = this._theories.numTheory.isNumberEqualTo(assignTo, value);
            return this._theories.boolTheory.and(this._mem, assume);
        } else {
            throw new ImplementMeException;
        }
    }

    visitWaitUntilStatement(node: WaitUntilStatement): B {
        throw new ImplementMeException();
    }

    visitBoolExpression(node: BooleanExpression): B {
        Preconditions.checkNotUndefined(node);
        const visitor = new SyMemBoolExpressionVisitor(this._theories);
        return node.accept(visitor);
    }

    visit(node: AstNode): B {
        throw new ImplementMeException();
    }

}
