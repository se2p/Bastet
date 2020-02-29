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
    DivideExpression,
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
import {CallStatement} from "../../../syntax/ast/core/statements/CallStatement";
import {MethodIdentifiers} from "../../../syntax/app/controlflow/MethodIdentifiers";

export class TimeTransferRelation<W extends AbstractElement> implements LabeledTransferRelation<W> {

    private readonly _wrappedTransfer: LabeledTransferRelation<W>;

    private readonly _timeProfile: ProgramTimeProfile;

    private readonly _globalTimeMicrosVariable: VariableWithDataLocation;
    private readonly _globalMicrosExpr: NumberExpression;
    private readonly _globalMillisExpr: NumberExpression;
    private readonly _globalSecondsExpr: NumberExpression;

    constructor(timeProfile: ProgramTimeProfile, wrappedTransfer: LabeledTransferRelation<W>) {
        this._timeProfile = Preconditions.checkNotUndefined(timeProfile);
        this._wrappedTransfer = Preconditions.checkNotUndefined(wrappedTransfer);

        this._globalTimeMicrosVariable = new VariableWithDataLocation(
            DataLocations.createTypedLocation(new Identifier("__global_time_micros"), NumberType.instance()));
        this._globalMicrosExpr = this._globalTimeMicrosVariable;
        this._globalMillisExpr = new DivideExpression(this._globalTimeMicrosVariable, NumberLiteral.of(1000));
        this._globalSecondsExpr = new DivideExpression(this._globalTimeMicrosVariable, NumberLiteral.of(1000000));
    }

    private isBootstrapOperation(op: ProgramOperation): boolean {
        if (op.ast instanceof BroadcastAndWaitStatement) {
            const bcw = op.ast as BroadcastAndWaitStatement;
            if (bcw.msg === INIT_MESSAGE.messageid) {
                return true;
            }
        }
        return false;
    }

    abstractSucc(fromState: W): Iterable<W> {
        throw new IllegalStateException("Not intended to be used.");
    }

    abstractSuccFor(fromState: W, op: ProgramOperation, co: Concern): Iterable<W> {
        if (this.isBootstrapOperation(op)) {
            // Initialization: Create a system global variable that stores the current time
            const initStmts: Statement[] = [
                new DeclareSystemVariableStatement(this._globalTimeMicrosVariable),
                new StoreEvalResultToVariableStatement(this._globalTimeMicrosVariable, NumberLiteral.of(0)) ];

            return Transfers.withIntermediateTransfersBefore(this._wrappedTransfer, fromState, initStmts, [op], co);
        }

        const [minTimeMicrosExpr, maxTimeMicrosExpr, ops] = this.reinterprete(op);
        let intermediateStatements: Statement[] = [];

        if (!this.isObserverConcern(co)) {
            if (!this.isEmptyInterval(minTimeMicrosExpr, maxTimeMicrosExpr)) {
                const opTimeVariable: VariableWithDataLocation = new VariableWithDataLocation(
                    DataLocations.createTypedLocation(Identifier.freshWithPrefix("__op_time_"), NumberType.instance()));
                const opTimeVariableExpr: NumberVariableExpression = new NumberVariableExpression(opTimeVariable);

                const assumeTimeMin = new NumGreaterEqualExpression(opTimeVariableExpr, minTimeMicrosExpr);
                const assumeTimeMax = new NumLessEqualExpression(opTimeVariableExpr, maxTimeMicrosExpr);

                intermediateStatements = [
                    new DeclareStackVariableStatement(opTimeVariable),
                    new AssumeStatement(assumeTimeMin),
                    new AssumeStatement(assumeTimeMax),
                    new StoreEvalResultToVariableStatement(this._globalTimeMicrosVariable,
                        new PlusExpression(this._globalTimeMicrosVariable, opTimeVariableExpr))];
            }
        }

        return Transfers.withIntermediateTransfersBefore(this._wrappedTransfer, fromState, intermediateStatements, ops, co);
    }

    private reinterprete(op: ProgramOperation): [NumberExpression, NumberExpression, ProgramOperation[]] {
        if (op.ast instanceof CallStatement) {
            if (op.ast.assignResultTo.isPresent()) {
                const assignTo: VariableWithDataLocation = op.ast.assignResultTo.value();
                if (op.ast.calledMethod.text == MethodIdentifiers._RUNTIME_seconds) {
                    return [NumberLiteral.zero(), NumberLiteral.zero(),
                        [ProgramOperationFactory.createFor(new StoreEvalResultToVariableStatement(assignTo, this._globalSecondsExpr))]];
                } else if (op.ast.calledMethod.text == MethodIdentifiers._RUNTIME_millis) {
                    return [NumberLiteral.zero(), NumberLiteral.zero(),
                        [ProgramOperationFactory.createFor(new StoreEvalResultToVariableStatement(assignTo, this._globalMillisExpr))]];
                }
            }
        }

        const [minTimeExpr, maxTimeExpr] = this.determineMicrosTimeIntervalExpressions(op);
        return [minTimeExpr, maxTimeExpr, [op]];
    }

    private determineMicrosTimeIntervalExpressions(op: ProgramOperation): [NumberExpression, NumberExpression] {
        const profile = this._timeProfile.getOpProfile(op);
        return [new NumberLiteral(Math.floor(profile.nsecs.minValue.value / 1000)),
            new NumberLiteral(Math.ceil(profile.nsecs.maxValue.value / 1000))];
    }

    private isEmptyInterval(minTimeExpr: NumberExpression, maxTimeExpr: NumberExpression) {
        if (minTimeExpr === NumberLiteral.zero() && maxTimeExpr === NumberLiteral.zero()) {
            return true;
        }

        return false;
    }

    private isObserverConcern(co: Concern): boolean {
        // TOOD: Allow for other concerns (for example, more specific specification concerns)
        return co.equals(Concerns.defaultSpecificationConcern());
    }

}
