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
import {AbstractMemory, MemAbstractDomain, Theories} from "./MemAbstractDomain";
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
import {AbstractBoolean, AbstractList, AbstractNumber, AbstractString, MemoryTransformer} from "../../domains/MemoryTransformer";
import {NumberType, ScratchType} from "../../../syntax/ast/core/ScratchType";
import {CallStatement} from "../../../syntax/ast/core/statements/CallStatement";

export class MemNumExpressionVisitor implements CoreNumberExpressionVisitor<AbstractNumber> {

    private readonly _mem: AbstractMemory;
    private readonly _dom: MemAbstractDomain;

    constructor(dom: MemAbstractDomain, mem: AbstractMemory) {
        this._dom = Preconditions.checkNotUndefined(dom);
        this._mem = Preconditions.checkNotUndefined(mem);
    }

    visit(node: AstNode): AbstractNumber {
        throw new ImplementMeException();
    }

    visitBoolAsNumberExpression(node: BoolAsNumberExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitDivideExpression(node: DivideExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitIndexOfExpression(node: IndexOfExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitLengthOListExpression(node: LengthOListExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitLengthOfStringExpression(node: LengthOfStringExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitMinusExpression(node: MinusExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitModuloExpression(node: ModuloExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitMultiplyExpression(node: MultiplyExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitNumFunctExpression(node: NumFunctExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitNumberLiteral(node: NumberLiteral): AbstractNumber {
        return this._dom.numDomain.abstract([
            this._dom.numDomain.concreteDomain.createElement({value: node.num})]);
    }

    visitNumberVariableExpression(node: NumberVariableExpression): AbstractNumber {
        const result = this._mem.getNum(node.id.text);
        return Preconditions.checkNotUndefined(result);
    }

    visitPickRandomFromExpression(node: PickRandomFromExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitPlusExpression(node: PlusExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitRoundExpression(node: RoundExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitStringAsNumberExpression(node: StringAsNumberExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitTimerExpression(node: TimerExpression): AbstractNumber {
        throw new ImplementMeException();
    }

}

export class MemBoolExpressionVisitor implements CoreBoolExpressionVisitor<AbstractBoolean> {

    private readonly _mem: AbstractMemory;
    private readonly _dom: MemAbstractDomain;
    private readonly _theories: Theories;

    constructor(dom: MemAbstractDomain, theories: Theories, mem: AbstractMemory) {
        this._dom = Preconditions.checkNotUndefined(dom);
        this._mem = Preconditions.checkNotUndefined(mem);
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    visit(node: AstNode): AbstractBoolean {
        throw new ImplementMeException();
    }

    visitAndExpression(node: AndExpression): AbstractBoolean {
        throw new ImplementMeException();
    }

    visitBooleanLiteral(node: BooleanLiteral): AbstractBoolean {
        throw new ImplementMeException();
    }

    visitBooleanVariableExpression(node: BooleanVariableExpression): AbstractBoolean {
        throw new ImplementMeException();
    }

    visitNegationExpression(node: NegationExpression): AbstractBoolean {
        const toNegate: AbstractBoolean = node.negate.accept(this);
        return this._theories.boolTheory.not(toNegate);
    }

    visitNumEqualsExpression(node: NumEqualsExpression): AbstractBoolean {
        throw new ImplementMeException();
    }

    visitNumGreaterThanExpression(node: NumGreaterThanExpression): AbstractBoolean {
        const numVisitor = new MemNumExpressionVisitor(this._dom, this._mem);
        const op1: AbstractNumber = node.operand1.accept(numVisitor);
        const op2: AbstractNumber = node.operand2.accept(numVisitor);
        return this._theories.numTheory.isGreaterThan(op1, op2);
    }

    visitNumLessThanExpression(node: NumLessThanExpression): AbstractBoolean {
        throw new ImplementMeException();
    }

    visitOrExpression(node: OrExpression): AbstractBoolean {
        throw new ImplementMeException();
    }

    visitStrContainsExpression(node: StrContainsExpression): AbstractBoolean {
        throw new ImplementMeException();
    }

    visitStrEqualsExpression(node: StrEqualsExpression): AbstractBoolean {
        throw new ImplementMeException();
    }

    visitStrGreaterThanExpression(node: StrGreaterThanExpression): AbstractBoolean {
        throw new ImplementMeException();
    }

    visitStrLessThanExpression(node: StrLessThanExpression): AbstractBoolean {
        throw new ImplementMeException();
    }

}

export class MemStringExpressionVisitor implements CoreStringExpressionVisitor<AbstractString> {

    private readonly _mem: AbstractMemory;

    constructor(mem: AbstractMemory) {
        this._mem = Preconditions.checkNotUndefined(mem);
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

    private readonly _mem: AbstractMemory;

    constructor(mem: AbstractMemory) {
        this._mem = Preconditions.checkNotUndefined(mem);
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

export class MemTransformerVisitor implements
    CoreVisitor<AbstractMemory>,
    CoreNonCtrlStatementnVisitor<AbstractMemory> {

    private readonly _mem: AbstractMemory;
    private readonly _dom: MemAbstractDomain;

    constructor(dom: MemAbstractDomain, transformer: MemoryTransformer<AbstractMemory>, mem: AbstractMemory) {
        this._dom = Preconditions.checkNotUndefined(dom);
        this._mem = Preconditions.checkNotUndefined(mem);
    }

    visit(node: AstNode): AbstractMemory {
        throw new ImplementMeException();
    }

    visitCallStatement(node: CallStatement): AbstractMemory {
        return this._mem;
    }

    visitAddElementToStatement(node: AddElementToStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitBroadcastAndWaitStatement(node: BroadcastAndWaitStatement): AbstractMemory {
        return this._mem;
    }

    visitBroadcastMessageStatement(node: BroadcastMessageStatement): AbstractMemory {
        return this._mem;
    }

    visitChangeAttributeByStatement(node: ChangeAttributeByStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitChangeVarByStatement(node: ChangeVarByStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitCreateCloneOfStatement(node: CreateCloneOfStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitDeclareAttributeOfStatement(node: DeclareAttributeOfStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitDeclareAttributeStatement(node: DeclareAttributeStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitDeclareStackVariableStatement(node: DeclareStackVariableStatement): AbstractMemory {
        return this._mem.withDeclaration(node.ident.text, node.type);
    }

    visitDeleteFromAllStatement(node: DeleteAllFromStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitDeleteIthFromStatement(node: DeleteIthFromStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitDeleteThisCloneStatement(node: DeleteThisCloneStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitEpsilonStatement(node: EpsilonStatement): AbstractMemory {
        return this._mem;
    }

    visitExpressionStatement(node: ExpressionStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitInsertAtStatement(node: InsertAtStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitReplaceElementAtStatement(node: ReplaceElementAtStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitResetTimerStatement(node: ResetTimerStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitSetAttributeOfToStatement(node: SetAttributeOfToStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitSetAttributeToStatement(node: SetAttributeToStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitStopAllStatement(node: StopAllStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitStopOthersInActorStatement(node: StopOthersInActorStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitStopThisStatement(node: StopThisStatement): AbstractMemory {
        throw new ImplementMeException();
    }

    visitStoreEvalResultToVariableStatement(node: StoreEvalResultToVariableStatement): AbstractMemory {
        const declaredType: ScratchType = this._mem.getType(node.variable.text);
        if (declaredType instanceof NumberType) {
            const visitor = new MemNumExpressionVisitor(this._dom, this._mem);
            const value: AbstractNumber = node.toValue.accept(visitor);
            return this._mem.withNum(node.variable.text, value);
        } else {
            throw ImplementMeException;
        }
    }

    visitWaitUntilStatement(node: WaitUntilStatement): AbstractMemory {
        throw new ImplementMeException();
    }

}
