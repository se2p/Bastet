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


import {LabeledTransferRelation} from "../TransferRelation";
import {AbstractElement} from "../../../lattices/Lattice";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {ProgramOperation, ProgramOperationFactory} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Concern, Concerns} from "../../../syntax/Concern";
import {Preconditions} from "../../../utils/Preconditions";
import {ProgramTimeProfile} from "../../../utils/TimeProfile";
import {DeclareStackVariableStatement} from "../../../syntax/ast/core/statements/DeclarationStatement";
import {Variable, VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
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

export class TimeTransferRelation<W extends AbstractElement> implements LabeledTransferRelation<W> {

    private readonly _wrappedTransfer: LabeledTransferRelation<W>;

    private readonly _timeProfile: ProgramTimeProfile;

    private readonly _globalTimeVariable: Variable;
    private readonly _globalTimeVariableExpr: NumberVariableExpression;

    constructor(timeProfile: ProgramTimeProfile, wrappedTransfer: LabeledTransferRelation<W>) {
        this._timeProfile = Preconditions.checkNotUndefined(timeProfile);
        this._wrappedTransfer = Preconditions.checkNotUndefined(wrappedTransfer);
    }

    abstractSucc(fromState: W): Iterable<W> {
        throw new IllegalStateException("Not intended to be used.");
    }

    abstractSuccFor(fromState: W, op: ProgramOperation, co: Concern): Iterable<W> {
        if (this.isTimeMonitoringConcern(co)) {
            // Do not add time transitions here!
            return this._wrappedTransfer.abstractSuccFor(fromState, op, co);
        } else {
            const opTimeVariable: Variable = new VariableWithDataLocation(
                DataLocations.createTypedLocation(Identifier.fresh(), NumberType.instance()));
            const opTimeVariableExpr: NumberVariableExpression = new NumberVariableExpression(opTimeVariable);

            const opProfile = this._timeProfile.getOpProfile(op);
            const minTimeExpr: NumberExpression = new NumberLiteral(opProfile.nsecs.minValue.value);
            const maxTimeExpr: NumberExpression = new NumberLiteral(opProfile.nsecs.maxValue.value);

            const assumeTimeMin = new NumGreaterEqualExpression(opTimeVariableExpr, minTimeExpr);
            const assumeTimeMax = new NumLessEqualExpression(opTimeVariableExpr, maxTimeExpr);

            const opTimeStatements: Statement[] = [
                new DeclareStackVariableStatement(opTimeVariable),
                new AssumeStatement(assumeTimeMin),
                new AssumeStatement(assumeTimeMax),
                new StoreEvalResultToVariableStatement(this._globalTimeVariable,
                    new PlusExpression(this._globalTimeVariableExpr, opTimeVariableExpr)) ];

            let result: W[] = [fromState];
            for (const stmt of opTimeStatements) {
                const timeOp: ProgramOperation = ProgramOperationFactory.createFor(stmt);
                let statelistPrime: W[] = [];
                for (const w of result) {
                    for (const succ of this._wrappedTransfer.abstractSuccFor(w, timeOp, co)) {
                        statelistPrime.push(succ);
                    }
                }
                result = statelistPrime;
            }

            return result;
        }
    }

    private isTimeMonitoringConcern(co: Concern): boolean {
        // TOOD: Allow for other concerns (for example, more specific specification concerns)
        return co.equals(Concerns.defaultSpecificationConcern());
    }

}