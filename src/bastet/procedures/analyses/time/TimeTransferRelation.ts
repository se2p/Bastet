/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net),
 *   see the file CONTRIBUTORS.md for the list of contributors.
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


import {LabeledTransferRelation, Transfers} from "../TransferRelation";
import {AbstractElement} from "../../../lattices/Lattice";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {ProgramOperation, ProgramOperationFactory} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Concern, Concerns} from "../../../syntax/Concern";
import {Preconditions} from "../../../utils/Preconditions";
import {ProgramTimeProfile} from "../../../utils/TimeProfile";
import {
    DeclareStackVariableStatement,
    DeclareSystemVariableStatement
} from "../../../syntax/ast/core/statements/DeclarationStatement";
import {Variable, VariableExpression, VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {Statement} from "../../../syntax/ast/core/statements/Statement";
import {AssumeStatement} from "../../../syntax/ast/core/statements/AssumeStatement";
import {StoreEvalResultToVariableStatement} from "../../../syntax/ast/core/statements/SetStatement";
import {
    NumberExpression,
    NumberLiteral,
    NumberVariableExpression,
    PlusExpression
} from "../../../syntax/ast/core/expressions/NumberExpression";
import {
    NumGreaterEqualExpression,
    NumLessEqualExpression
} from "../../../syntax/ast/core/expressions/BooleanExpression";
import {DataLocations} from "../../../syntax/app/controlflow/DataLocation";
import {NumberType} from "../../../syntax/ast/core/ScratchType";
import {Identifier} from "../../../syntax/ast/core/Identifier";
import {BroadcastAndWaitStatement} from "../../../syntax/ast/core/statements/BroadcastAndWaitStatement";
import {INIT_MESSAGE} from "../../../syntax/ast/core/Message";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {WaitSecsStatement} from "../../../syntax/ast/core/statements/WaitSecsStatement";

export class TimeTransferRelation<W extends AbstractElement> implements LabeledTransferRelation<W> {

    private readonly _wrappedTransfer: LabeledTransferRelation<W>;

    private readonly _timeProfile: ProgramTimeProfile;

    private readonly _globalTimeVariable: Variable;
    private readonly _globalTimeVariableExpr: NumberVariableExpression;

    constructor(timeProfile: ProgramTimeProfile, wrappedTransfer: LabeledTransferRelation<W>) {
        this._timeProfile = Preconditions.checkNotUndefined(timeProfile);
        this._wrappedTransfer = Preconditions.checkNotUndefined(wrappedTransfer);

        this._globalTimeVariable = new VariableWithDataLocation(
            DataLocations.createTypedLocation(new Identifier("__global_time"), NumberType.instance()));
        this._globalTimeVariableExpr = new VariableExpression(this._globalTimeVariable);
    }

    abstractSucc(fromState: W): Iterable<W> {
        throw new IllegalStateException("Not intended to be used.");
    }

    abstractSuccFor(fromState: W, op: ProgramOperation, co: Concern): Iterable<W> {
        if (op.ast instanceof BroadcastAndWaitStatement) {
            const bcw = op.ast as BroadcastAndWaitStatement;
            if (bcw.msg === INIT_MESSAGE.messageid) {
                const initStmts: Statement[] = [
                    new DeclareSystemVariableStatement(this._globalTimeVariable),
                    new StoreEvalResultToVariableStatement(this._globalTimeVariable, NumberLiteral.of(0)) ];

                return Transfers.withIntermediateTransfersBefore(this._wrappedTransfer, fromState, initStmts, op, co);
            }
        }

        if (this.isTimeMonitoringConcern(co)) {
            // Do not add time transitions here!
            return this._wrappedTransfer.abstractSuccFor(fromState, op, co);
        } else {
            const opTimeVariable: Variable = new VariableWithDataLocation(
                DataLocations.createTypedLocation(Identifier.freshWithPrefix("__op_time_"), NumberType.instance()));
            const opTimeVariableExpr: NumberVariableExpression = new NumberVariableExpression(opTimeVariable);

            const [minTimeExpr, maxTimeExpr] = this.determineTimeIntervalExpressions(op);

            let intermediateStatements: Statement[] = [];
            if (!this.isEmptyInterval(minTimeExpr, maxTimeExpr)) {
                const assumeTimeMin = new NumGreaterEqualExpression(opTimeVariableExpr, minTimeExpr);
                const assumeTimeMax = new NumLessEqualExpression(opTimeVariableExpr, maxTimeExpr);

                const intermediateStatements: Statement[] = [
                    new DeclareStackVariableStatement(opTimeVariable),
                    new AssumeStatement(assumeTimeMin),
                    new AssumeStatement(assumeTimeMax),
                    new StoreEvalResultToVariableStatement(this._globalTimeVariable,
                        new PlusExpression(this._globalTimeVariableExpr, opTimeVariableExpr))];
            }

            return Transfers.withIntermediateTransfersBefore(this._wrappedTransfer, fromState, intermediateStatements, op, co);
        }
    }

    private determineTimeIntervalExpressions(op: ProgramOperation): [NumberExpression, NumberExpression] {
        if (op.ast instanceof WaitSecsStatement) {
            // TODO: How is this handled in the scheduling? Is this relevant?
            throw new ImplementMeException();
        }
        throw new ImplementMeException();
    }

    private isEmptyInterval(minTimeExpr: NumberExpression, maxTimeExpr: NumberExpression) {
        if (minTimeExpr === NumberLiteral.zero() && maxTimeExpr === NumberLiteral.zero()) {
            return true;
        }

        return false;
    }

    private isTimeMonitoringConcern(co: Concern): boolean {
        // TOOD: Allow for other concerns (for example, more specific specification concerns)
        return co.equals(Concerns.defaultSpecificationConcern());
    }

}
