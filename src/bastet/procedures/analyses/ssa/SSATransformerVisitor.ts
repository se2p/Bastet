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
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {WaitUntilStatement} from "../../../syntax/ast/core/statements/WaitUntilStatement";
import {
    BoolAsNumberExpression,
    DivideExpression,
    IndexOfExpression,
    LengthOfStringExpression, LengthOListExpression,
    MinusExpression,
    ModuloExpression,
    MultiplyExpression, NumberExpression,
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
    StringAttributeOfExpression, StringExpression,
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
import {NumberType, ScratchType, ScratchTypeID} from "../../../syntax/ast/core/ScratchType";
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
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {SSAState} from "./SSAAbstractDomain";
import {
    DataLocation,
    DataLocationMapper,
    DataLocations,
    VersionedDataLocation
} from "../../../syntax/app/controlflow/DataLocation";
import {Expression} from "../../../syntax/ast/core/expressions/Expression";
import {Identifier} from "../../../syntax/ast/core/Identifier";
import {Variable, VariableWithDataLocation} from "../../../syntax/ast/core/Variable";

export class SSAssigner {

    private _ssa: SSAState;

    constructor(ssa: SSAState) {
        this._ssa = Preconditions.checkNotUndefined(ssa);
    }

    getCurrentVersionOf(id: string) {
        return this._ssa.getIndex(id);
    }

   currentVersionOf(assignedDataLoc: DataLocation): VersionedDataLocation {
       const id = assignedDataLoc.ident;
       const currentVersion = this.getCurrentVersionOf(id);
       return new VersionedDataLocation(assignedDataLoc.ident, assignedDataLoc.type, currentVersion);
   }

    newVersionOf(assignedDataLoc: DataLocation): VersionedDataLocation {
        const id = assignedDataLoc.ident;
        const currentVersion = this.getCurrentVersionOf(id);

        // Update the internal SSA map
        const newVersion = currentVersion + 1;
        this._ssa = this._ssa.withIndex(id, newVersion);

        // New versioned data allocation
        return new VersionedDataLocation(assignedDataLoc.ident, assignedDataLoc.type, newVersion);
    }

    newVariableFrom(assignedDataLoc: DataLocation): VariableWithDataLocation {
        return new VariableWithDataLocation(this.newVersionOf(assignedDataLoc));
    }

    get ssa(): SSAState {
        return this._ssa;
    }
}

export class SSATransformerVisitor implements CoreVisitor<AstNode>,
    CoreNonCtrlStatementnVisitor<AstNode>,
    CoreNumberExpressionVisitor<AstNode>,
    CoreBoolExpressionVisitor<AstNode>,
    CoreStringExpressionVisitor<AstNode>,
    CoreListExpressionVisitor<AstNode> {

    private _ssa: SSAssigner;
    private _mapper: DataLocationMapper;

    constructor(ssa: SSAssigner, mapper: DataLocationMapper) {
        this._ssa = Preconditions.checkNotUndefined(ssa);
        this._mapper = Preconditions.checkNotUndefined(mapper);
    }

    private transformBeforeException() {
        throw new IllegalStateException("Statements on list must have been translated before to assignements of transformed list expressions");
    }

    visit(node: AstNode): AstNode {
        throw new ImplementMeException();
    }

    visitBoolAsNumberExpression(node: BoolAsNumberExpression): AstNode {
        return new BoolAsNumberExpression(node.toConvert.accept(this) as BooleanExpression);
    }

    visitDivideExpression(node: DivideExpression): AstNode {
        return new DivideExpression(
            node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitIndexOfExpression(node: IndexOfExpression): AstNode {
        const readDataLoc: DataLocation = this.mapDataLocation( node.variable);
        const readDataLocVersion: VersionedDataLocation = this._ssa.currentVersionOf(readDataLoc);
        return new IndexOfExpression(node.expr.accept(this) as Expression,
            new VariableWithDataLocation(readDataLocVersion));
    }

    visitLengthOListExpression(node: LengthOListExpression): AstNode {
        throw new ImplementMeException();
    }

    visitLengthOfStringExpression(node: LengthOfStringExpression): AstNode {
        throw new ImplementMeException();
    }

    visitMinusExpression(node: MinusExpression): AstNode {
        return new MinusExpression(
            node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitModuloExpression(node: ModuloExpression): AstNode {
        return new ModuloExpression(
            node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitMultiplyExpression(node: MultiplyExpression): AstNode {
        return new MultiplyExpression(
            node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitNumFunctExpression(node: NumFunctExpression): AstNode {
        throw new IllegalStateException("Assuming that this expression is handled in the IL");
    }

    visitNumberLiteral(node: NumberLiteral): AstNode {
        return node;
    }

    visitNumberVariableExpression(node: NumberVariableExpression): AstNode {
        const readDataLoc: DataLocation = this.mapDataLocation(node.variable);
        const readDataLocVersion: VersionedDataLocation = this._ssa.currentVersionOf(readDataLoc);
        return new NumberVariableExpression(new VariableWithDataLocation(readDataLocVersion));
    }

    visitPickRandomFromExpression(node: PickRandomFromExpression): AstNode {
        return new PickRandomFromExpression(node.from.accept(this) as NumberExpression,
            node.to.accept(this) as NumberExpression);
    }

    visitPlusExpression(node: PlusExpression): AstNode {
        return new PlusExpression(
            node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitRoundExpression(node: RoundExpression): AstNode {
        return new RoundExpression(node.num.accept(this) as NumberExpression);
    }

    visitStringAsNumberExpression(node: StringAsNumberExpression): AstNode {
        return new StringAsNumberExpression(node.toConvert.accept(this) as StringExpression);
    }

    visitTimerExpression(node: TimerExpression): AstNode {
        throw new ImplementMeException();
    }

    visitAndExpression(node: AndExpression): AstNode {
        return new AndExpression(node.operand1.accept(this) as BooleanExpression,
            node.operand2.accept(this) as BooleanExpression);
    }

    visitBooleanLiteral(node: BooleanLiteral): AstNode {
        return node;
    }

    visitBooleanVariableExpression(node: BooleanVariableExpression): AstNode {
        const readDataLoc: DataLocation = this.mapDataLocation(node.variable);
        const readDataLocVersion: VersionedDataLocation = this._ssa.currentVersionOf(readDataLoc);
        return new BooleanVariableExpression(new VariableWithDataLocation(readDataLocVersion));
    }

    visitNegationExpression(node: NegationExpression): AstNode {
        return new NegationExpression(node.negate.accept(this) as BooleanExpression);
    }

    visitNumEqualsExpression(node: NumEqualsExpression): AstNode {
        return new NumEqualsExpression(node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitNumGreaterThanExpression(node: NumGreaterThanExpression): AstNode {
        return new NumGreaterThanExpression(node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitNumLessThanExpression(node: NumLessThanExpression): AstNode {
        return new NumLessThanExpression(node.operand1.accept(this) as NumberExpression,
            node.operand2.accept(this) as NumberExpression);
    }

    visitOrExpression(node: OrExpression): AstNode {
        return new OrExpression(node.operand1.accept(this) as BooleanExpression,
            node.operand2.accept(this) as BooleanExpression);
    }

    visitStrContainsExpression(node: StrContainsExpression): AstNode {
        throw new ImplementMeException();
    }

    visitStrEqualsExpression(node: StrEqualsExpression): AstNode {
        throw new ImplementMeException();
    }

    visitStrGreaterThanExpression(node: StrGreaterThanExpression): AstNode {
        throw new ImplementMeException();
    }

    visitStrLessThanExpression(node: StrLessThanExpression): AstNode {
        throw new ImplementMeException();
    }

    visitExpressionListExpression(node: ExpressionListExpression): AstNode {
        throw new ImplementMeException();
    }

    visitListVariableExpression(node: ListVariableExpression): AstNode {
        throw new ImplementMeException();
    }

    visitBoolAsStringExpression(node: BoolAsStringExpression): AstNode {
        throw new ImplementMeException();
    }

    visitIthLetterOfStringExpression(node: IthLetterOfStringExpression): AstNode {
        throw new ImplementMeException();
    }

    visitIthStringItemOfExpression(node: IthStringItemOfExpression): AstNode {
        throw new ImplementMeException();
    }

    visitJoinStringsExpression(node: JoinStringsExpression): AstNode {
        throw new ImplementMeException();
    }

    visitNumAsStringExpression(node: NumAsStringExpression): AstNode {
        throw new ImplementMeException();
    }

    visitResourceAttributeOfExpression(node: ResourceAttributeOfExpression): AstNode {
        throw new ImplementMeException();
    }

    visitStringAttributeOfExpression(node: StringAttributeOfExpression): AstNode {
        throw new ImplementMeException();
    }

    visitStringLiteral(node: StringLiteral): AstNode {
        throw new ImplementMeException();
    }

    visitStringVariableExpression(node: StringVariableExpression): AstNode {
        throw new ImplementMeException();
    }

    visitAddElementToStatement(node: AddElementToStatement): AstNode {
        this.transformBeforeException();
        return node;
    }

    visitDeleteFromAllStatement(node: DeleteAllFromStatement): AstNode {
        this.transformBeforeException();
        return node;
    }

    visitDeleteIthFromStatement(node: DeleteIthFromStatement): AstNode {
        this.transformBeforeException();
        return node;
    }

    visitInsertAtStatement(node: InsertAtStatement): AstNode {
        this.transformBeforeException();
        return node;
    }

    visitReplaceElementAtStatement(node: ReplaceElementAtStatement): AstNode {
        this.transformBeforeException();
        return node;
    }

    visitBroadcastAndWaitStatement(node: BroadcastAndWaitStatement): AstNode {
        return new BroadcastAndWaitStatement(
            node.msg.accept(this) as StringExpression);
    }

    visitBroadcastMessageStatement(node: BroadcastMessageStatement): AstNode {
        return new BroadcastMessageStatement(
            node.msg.accept(this) as StringExpression);
    }

    visitCreateCloneOfStatement(node: CreateCloneOfStatement): AstNode {
        // Handled by another analysis
        return node;
    }

    visitDeleteThisCloneStatement(node: DeleteThisCloneStatement): AstNode {
        // TODO: We assume that there are separate statements
        //  that release the memory for the allocated variables.
        return node;
    }

    visitEpsilonStatement(node: EpsilonStatement): AstNode {
        // No assignments
        return node;
    }

    visitExpressionStatement(node: ExpressionStatement): AstNode {
        return new ExpressionStatement(
            node.expression.accept(this) as Expression);
    }

    visitStopAllStatement(node: StopAllStatement): AstNode {
        // Handled by another analysis.
        return node;
    }

    visitStopOthersInActorStatement(node: StopOthersInActorStatement): AstNode {
        // Handled by another analysis.
        return node;
    }

    visitStopThisStatement(node: StopThisStatement): AstNode {
        // Handled by another analysis.
        return node;
    }

    visitWaitUntilStatement(node: WaitUntilStatement): AstNode {
        return new WaitUntilStatement(
            node.cond.accept(this) as BooleanExpression);
    }

    visitChangeAttributeByStatement(node: ChangeAttributeByStatement): AstNode {
        throw new IllegalStateException("Please use variables instead of attributes for actor-local variable changes");
    }

    visitChangeVarByStatement(node: ChangeVarByStatement): AstNode {
        const assignedDataLoc: DataLocation = this.mapDataLocation(node.variable);
        const assignedVariablePrime: Variable = this._ssa.newVariableFrom(assignedDataLoc);
        const valuePrime: Expression = node.value.accept(this) as Expression;
        return new ChangeVarByStatement(assignedVariablePrime, valuePrime);
    }

    visitDeclareAttributeOfStatement(node: DeclareAttributeOfStatement): AstNode {
        throw new IllegalStateException("We assume that 'attributes' are no more used");
    }

    visitDeclareAttributeStatement(node: DeclareAttributeStatement): AstNode {
        throw new IllegalStateException("We assume that 'attributes' are no more used");
    }

    visitDeclareStackVariableStatement(node: DeclareStackVariableStatement): AstNode {
        const declaredDataLoc: DataLocation = this.mapDataLocation(node.variable);
        const declaredVariablePrime: Variable = this._ssa.newVariableFrom(declaredDataLoc);
        return new DeclareStackVariableStatement(declaredVariablePrime);
    }

    visitSetAttributeOfToStatement(node: SetAttributeOfToStatement): AstNode {
        throw new IllegalStateException("We assume that 'attributes' are no more used");
    }

    visitSetAttributeToStatement(node: SetAttributeToStatement): AstNode {
        throw new IllegalStateException("We assume that 'attributes' are no more used");
    }

    visitStoreEvalResultToVariableStatement(node: StoreEvalResultToVariableStatement): AstNode {
       const assignedDataLoc: DataLocation = this.mapDataLocation(node.variable);
       const assignedVariablePrime: Variable = this._ssa.newVariableFrom(assignedDataLoc);
       return new StoreEvalResultToVariableStatement(
           assignedVariablePrime,
           node.toValue.accept(this) as Expression);
    }

    visitResetTimerStatement(node: ResetTimerStatement): AstNode {
        throw new ImplementMeException();
    }

    private mapDataLocation(variable: Variable): DataLocation {
        return this._mapper.mapDataLocation(
            DataLocations.createTypedLocation(variable.identifier, variable.type));
    }
}
