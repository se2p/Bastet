/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of Passau (uni-passau.de)
 *
 *   See the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Please make sure to CITE this work in your publications if you
 *   build on this work. Some of our maintainers or contributors might
 *   be interested in actively CONTRIBUTING to your research project.
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
import {ImplementMeException, ImplementMeForException} from "../../../core/exceptions/ImplementMeException";
import {WaitUntilStatement} from "../../../syntax/ast/core/statements/WaitUntilStatement";
import {
    DivideExpression,
    FloatLiteral,
    IndexOfExpression,
    IntegerLiteral,
    LengthOfListExpression,
    LengthOfStringExpression,
    MinusExpression,
    ModuloExpression,
    MultiplyExpression,
    NumberVariableExpression,
    PickRandomFromExpression,
    PlusExpression,
    RoundExpression,
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
import {
    BroadcastAndWaitStatement,
    BroadcastMessageStatement
} from "../../../syntax/ast/core/statements/BroadcastMessageStatement";
import {AstNode} from "../../../syntax/ast/AstNode";
import {Preconditions} from "../../../utils/Preconditions";
import {
    AbstractBoolean,
    AbstractFloat,
    AbstractInteger,
    AbstractList,
    AbstractNumber,
    AbstractReal,
    AbstractString,
    NumberTheory,
    TransformerTheories
} from "../../domains/MemoryTransformer";
import {
    ActorType,
    BooleanType,
    FloatType,
    IntegerType,
    ScratchType,
    StringType
} from "../../../syntax/ast/core/ScratchType";
import {CallStatement} from "../../../syntax/ast/core/statements/CallStatement";
import {ConcreteBoolean, ConcreteNumber, ConcreteString} from "../../domains/ConcreteElements";
import {
    BranchingAssumeStatement,
    StrengtheningAssumeStatement
} from "../../../syntax/ast/core/statements/AssumeStatement";
import {MethodIdentifiers} from "../../../syntax/app/controlflow/MethodIdentifiers";
import {VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {
    BeginAtomicStatement,
    EndAtomicStatement,
    ReturnStatement
} from "../../../syntax/ast/core/statements/ControlStatement";
import {CastExpression} from "../../../syntax/ast/core/expressions/CastExpression";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {
    InitializeAnalysisStatement,
    SignalTargetReachedStatement,
    TerminateProgramStatement
} from "../../../syntax/ast/core/statements/InternalStatement";
import {DataLocation} from "../../../syntax/app/controlflow/DataLocation";
import {PrecisionPopStatement, PrecisionPushStatement} from "../../../syntax/ast/core/Precisions";

abstract class TransformingVisitor<RT, B extends AbstractBoolean, I extends AbstractInteger, R extends AbstractReal,
    F extends AbstractFloat, S extends AbstractString, L extends AbstractList> implements CoreVisitor<RT> {

    protected readonly _theories: TransformerTheories<B, B, I, R, F, S, L>;

    constructor(theories: TransformerTheories<B, B, I, R, F, S, L>) {
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    visit(node: AstNode): RT {
        throw new ImplementMeForException(node.toTreeString());
    }

    protected createVisitorByType(t: ScratchType): CoreVisitor<any> {
       if (t == IntegerType.instance()) {
           return new DataNumExpressionVisitor(this._theories);
       } else if (t == FloatType.instance()) {
           return new DataNumExpressionVisitor(this._theories);
       } else if (t == BooleanType.instance()) {
           return new DataBoolExpressionVisitor(this._theories);
       } else if (t == StringType.instance()) {
           return new DataStringExpressionVisitor(this._theories);
       } else {
           throw new ImplementMeForException(t.toTreeString());
       }
    }

}

export class DataNumExpressionVisitor<B extends AbstractBoolean, I extends AbstractInteger, R extends AbstractReal,
    F extends AbstractFloat, S extends AbstractString, L extends AbstractList>
    extends TransformingVisitor<AbstractNumber, B, I, R, F, S, L>
    implements CoreNumberExpressionVisitor<AbstractNumber> {

    visitCastExpression(node: CastExpression): AbstractNumber {
        Preconditions.checkArgument(ScratchType.isNumericType(node.castToType));

        // TODO: Implement purely on `castFrom` of the theories?

        if (node.toConvertFrom.expressionType == StringType.instance()) {
            const stringVisitor = new DataStringExpressionVisitor(this._theories);
            if (node.castToType == IntegerType.instance()) {
                return this._theories.stringTheory.toInteger(node.toConvertFrom.accept(stringVisitor));
            } else if (node.castToType == FloatType.instance()) {
                const convertFrom = node.toConvertFrom.accept(stringVisitor);
                return this._theories.getNumberTheoryFor(node.castToType).castFrom(convertFrom);
            } else {
                throw new IllegalArgumentException();
            }
        } else if (node.toConvertFrom.expressionType == BooleanType.instance()) {
            const boolVisitor = new DataBoolExpressionVisitor(this._theories);
            if (node.castToType == IntegerType.instance()) {
                return this._theories.intTheory.ifThenElse(node.toConvertFrom.accept(boolVisitor),
                    this._theories.intTheory.one(), this._theories.intTheory.zero());
            } else {
                throw new IllegalArgumentException();
            }
        } else if (node.toConvertFrom.expressionType == FloatType.instance()) {
            const convertFrom = node.toConvertFrom.accept(this.createVisitorByType(node.toConvertFrom.expressionType));
            return this._theories.getNumberTheoryFor(node.castToType).castFrom(convertFrom);
        } else if (node.toConvertFrom.expressionType == IntegerType.instance()) {
            const convertFrom = node.toConvertFrom.accept(this.createVisitorByType(node.toConvertFrom.expressionType));
            return this._theories.getNumberTheoryFor(node.castToType).castFrom(convertFrom);
        }

        throw new ImplementMeForException(node.toTreeString());
    }

    visitVariableWithDataLocation(node: VariableWithDataLocation): AbstractNumber {
        if (node.dataloc.type == IntegerType.instance().typeId) {
            return this._theories.intTheory.abstractNumberValue(node);

        } else if (node.dataloc.type == FloatType.instance().typeId) {
            return this._theories.getNumberTheoryFor(node.expressionType).abstractNumberValue(node);

        } else {
            throw new IllegalArgumentException();
        }
    }

    visitNumberVariableExpression(node: NumberVariableExpression): AbstractNumber {
        return this.visitVariableWithDataLocation(node.variable);
    }

    visitDivideExpression(node: DivideExpression): AbstractNumber {
        const op1: AbstractNumber = node.operand1.accept(this);
        const op2: AbstractNumber = node.operand2.accept(this);
        const t = this._theories.getNumberTheoryOf(op1);
        return t.divide(op1, op2);
    }

    visitIndexOfExpression(node: IndexOfExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitLengthOListExpression(node: LengthOfListExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitLengthOfStringExpression(node: LengthOfStringExpression): AbstractNumber {
        const stringVisitor = new DataStringExpressionVisitor(this._theories);
        return this._theories.stringTheory.lengthOf(node.str.accept(stringVisitor) as S);
    }

    visitMinusExpression(node: MinusExpression): AbstractNumber {
        const op1: AbstractNumber = node.operand1.accept(this);
        const op2: AbstractNumber = node.operand2.accept(this);
        const t = this._theories.getNumberTheoryOf(op1);
        return t.minus(op1, op2);
    }

    visitModuloExpression(node: ModuloExpression): AbstractNumber {
        const op1: AbstractNumber = node.operand1.accept(this);
        const op2: AbstractNumber = node.operand2.accept(this);
        const t = this._theories.intTheory;
        return t.modulo(op1 as I, op2 as I);
    }

    visitMultiplyExpression(node: MultiplyExpression): AbstractNumber {
        const op1: AbstractNumber = node.operand1.accept(this);
        const op2: AbstractNumber = node.operand2.accept(this);
        const t = this._theories.getNumberTheoryOf(op1);
        return t.multiply(op1, op2);
    }

    visitPickRandomFromExpression(node: PickRandomFromExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitPlusExpression(node: PlusExpression): AbstractNumber {
        const op1: AbstractNumber = node.operand1.accept(this);
        const op2: AbstractNumber = node.operand2.accept(this);
        const t = this._theories.getNumberTheoryOf(op1);
        return t.plus(op1, op2);
    }

    visitRoundExpression(node: RoundExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitTimerExpression(node: TimerExpression): AbstractNumber {
        throw new ImplementMeException();
    }

    visitIntegerLiteral(node: IntegerLiteral): AbstractNumber {
        return this._theories.intTheory.fromConcreteNumber(new ConcreteNumber(node.num));
    }

    visitFloatLiteral(node: FloatLiteral): AbstractNumber {
        return this._theories.getNumberTheoryFor(node.expressionType).fromConcreteNumber(new ConcreteNumber(node.num));
    }

}

export class DataBoolExpressionVisitor<B extends AbstractBoolean, I extends AbstractInteger, R extends AbstractReal,
    F extends AbstractFloat, S extends AbstractString, L extends AbstractList>
    extends TransformingVisitor<B, B, I, R, F, S, L>
    implements CoreBoolExpressionVisitor<B> {

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
        const op1: AbstractNumber = node.operand1.accept(numVisitor);
        const op2: AbstractNumber = node.operand2.accept(numVisitor);
        return this._theories.getNumberTheoryOf(op1).isNumberEqualTo(op1, op2);
    }

    visitNumGreaterEqualExpression(node: NumGreaterEqualExpression): B {
        const numVisitor = new DataNumExpressionVisitor(this._theories);
        const op1: AbstractNumber = node.operand1.accept(numVisitor);
        const op2: AbstractNumber = node.operand2.accept(numVisitor);
        return this._theories.getNumberTheoryOf(op1).isGreaterEqual(op1, op2);
    }

    visitNumGreaterThanExpression(node: NumGreaterThanExpression): B {
        const numVisitor = new DataNumExpressionVisitor(this._theories);
        const op1: AbstractNumber = node.operand1.accept(numVisitor);
        const op2: AbstractNumber = node.operand2.accept(numVisitor);
        return this._theories.getNumberTheoryOf(op1).isGreaterThan(op1, op2);
    }

    visitNumLessThanExpression(node: NumLessThanExpression): B {
        const numVisitor = new DataNumExpressionVisitor(this._theories);
        const op1: AbstractNumber = node.operand1.accept(numVisitor);
        const op2: AbstractNumber = node.operand2.accept(numVisitor);
        return this._theories.getNumberTheoryOf(op1).isLessThan(op1, op2);
    }

    visitNumLessEqualExpression(node: NumLessEqualExpression): B {
        const numVisitor = new DataNumExpressionVisitor(this._theories);
        const op1: AbstractNumber = node.operand1.accept(numVisitor);
        const op2: AbstractNumber = node.operand2.accept(numVisitor);
        return this._theories.getNumberTheoryOf(op1).isLessEqual(op1, op2);
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

        if (node.toConvertFrom.expressionType == StringType.instance()) {
            const stringVisitor = new DataStringExpressionVisitor(this._theories);
            throw new ImplementMeException();

        } else if (ScratchType.isNumericType(node.toConvertFrom.expressionType)) {
            const numVisitor = new DataNumExpressionVisitor(this._theories);
            const numFormula: AbstractNumber = node.toConvertFrom.accept(numVisitor);
            const numTheory = this._theories.getNumberTheoryOf(numFormula);
            return this._theories.boolTheory.not(numTheory.isNumberEqualTo(numFormula, numTheory.zero()));
        }

        throw new ImplementMeException();
    }

}

export class DataStringExpressionVisitor<B extends AbstractBoolean, I extends AbstractInteger, R extends AbstractReal,
    F extends AbstractFloat, S extends AbstractString, L extends AbstractList>
    extends TransformingVisitor<S, B, I, R, F, S, L>
    implements CoreStringExpressionVisitor<S> {

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
        const num = node.accept(numVisitor)
        return this._theories.getNumberTheoryOf(num).toStringFormula(num);
    }

    visitResourceAttributeOfExpression(node: ResourceAttributeOfExpression): S {
        throw new ImplementMeException();
    }

    visitStringAttributeOfExpression(node: StringAttributeOfExpression): S {
        throw new ImplementMeException();
    }

    visitStringLiteral(node: StringLiteral): S {
        return this._theories.stringTheory.fromConcrete(new ConcreteString(node.text));
    }

    visitStringVariableExpression(node: StringVariableExpression): S {
        return this._theories.stringTheory.abstractStringValue(node.variable);
    }

    visitVariableWithDataLocation(node: VariableWithDataLocation): S {
        return this._theories.stringTheory.abstractStringValue(node);
    }

    visitCastExpression(node: CastExpression): S {
        Preconditions.checkArgument(node.castToType == StringType.instance());

        if (ScratchType.isNumericType(node.toConvertFrom.expressionType)) {
            const numVisitor = new DataNumExpressionVisitor(this._theories);
            const num = node.toConvertFrom.accept(numVisitor);
            return this._theories.getNumberTheoryOf(num).toStringFormula(num);

        } else if (node.toConvertFrom.expressionType == StringType.instance()) {
            return node.toConvertFrom.accept(this);
        }

        throw new ImplementMeException();
    }

}

export class DataListExpressionVisitor<B extends AbstractBoolean, I extends AbstractInteger, R extends AbstractReal,
    F extends AbstractFloat, S extends AbstractString, L extends AbstractList>
    extends TransformingVisitor<S, B, I, R, F, S, L>
    implements CoreListExpressionVisitor<AbstractList> {

    visitExpressionListExpression(node: ExpressionListExpression): AbstractList {
        throw new ImplementMeException();
    }

    visitListVariableExpression(node: ListVariableExpression): AbstractList {
        throw new ImplementMeException();
    }

}

export class DataTransformerVisitor<B extends AbstractBoolean,
    I extends AbstractInteger, R extends AbstractReal, F extends AbstractFloat,
    S extends AbstractString, L extends AbstractList>
    extends TransformingVisitor<B, B, I, R, F, S, L>
    implements CoreVisitor<B>, CoreNonCtrlStatementnVisitor<B> {

    private readonly _mem: B;

    constructor(base: B, theories: TransformerTheories<B, B, I, R, F, S, L>) {
        super(theories);
        this._mem = Preconditions.checkNotUndefined(base);
    }

    private numberTheoryFor(dl: DataLocation): NumberTheory<AbstractNumber, I, R, F, B, S> {
        return this._theories.getNumberTheoryFor(ScratchType.fromId(dl.type));
    }

    visitCallStatement(node: CallStatement): B {
        const method = node.calledMethod.text;

        if (method == MethodIdentifiers._RUNTIME_signalFailure) {
            return this._mem;
        }

        return this._mem;
    }

    visitTerminateProgramStatement(node: TerminateProgramStatement): B {
        return this._mem;
    }

    visitSignalTargetReachedStatement(node: SignalTargetReachedStatement) {
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
        return this._mem;
    }

    visitStopOthersInActorStatement(node: StopOthersInActorStatement): B {
        throw new ImplementMeException();
    }

    visitStopThisStatement(node: StopThisStatement): B {
        throw new ImplementMeException();
    }

    visitStrengtheningAssumeStatement(node: StrengtheningAssumeStatement): B {
        const assume = this.visitBoolExpression(node.condition);
        return this._theories.boolTheory.and(this._mem, assume);
    }

    visitBranchingAssumeStatement(node: BranchingAssumeStatement): B {
        const assume = this.visitBoolExpression(node.condition);
        return this._theories.boolTheory.and(this._mem, assume);
    }

    visitStoreEvalResultToVariableStatement(node: StoreEvalResultToVariableStatement): B {
        // We assume that a wrapping analysis step takes care of ssa.
        const declaredType = node.variable.expressionType;
        if (declaredType instanceof IntegerType || declaredType instanceof FloatType) {
            const visitor = new DataNumExpressionVisitor(this._theories);
            const value: AbstractNumber = node.toValue.accept(visitor);
            const assignTo = this.numberTheoryFor(node.variable.dataloc).abstractNumberValue(node.variable);
            const assume: B = this.numberTheoryFor(node.variable.dataloc).isNumberEqualTo(assignTo, value);
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

    visitReturnStatement(node: ReturnStatement): B {
       return this._mem;
    }

    visit(node: AstNode): B {
        throw new ImplementMeException();
    }

    visitPrecisionPopStatement(node: PrecisionPopStatement): B {
        return this._mem;
    }

    visitPrecisionPushStatement(node: PrecisionPushStatement): B {
        return this._mem;
    }

}

