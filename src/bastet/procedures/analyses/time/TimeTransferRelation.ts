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


import {LabeledTransferRelation, Transfers} from "../TransferRelation";
import {AbstractElement} from "../../../lattices/Lattice";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {ProgramOperation, ProgramOperationFactory} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Concern, Concerns} from "../../../syntax/Concern";
import {Preconditions} from "../../../utils/Preconditions";
import {ProgramTimeProfile} from "../../../utils/TimeProfile";
import {DeclareStackVariableStatement} from "../../../syntax/ast/core/statements/DeclarationStatement";
import {VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {Statement} from "../../../syntax/ast/core/statements/Statement";
import {StrengtheningAssumeStatement} from "../../../syntax/ast/core/statements/AssumeStatement";
import {StoreEvalResultToVariableStatement} from "../../../syntax/ast/core/statements/SetStatement";
import {
    DivideExpression,
    IntegerLiteral,
    MinusExpression,
    NumberExpression,
    NumberVariableExpression,
    PlusExpression
} from "../../../syntax/ast/core/expressions/NumberExpression";
import {
    NumGreaterEqualExpression,
    NumLessEqualExpression
} from "../../../syntax/ast/core/expressions/BooleanExpression";
import {DataLocations} from "../../../syntax/app/controlflow/DataLocation";
import {Identifier} from "../../../syntax/ast/core/Identifier";
import {CallStatement} from "../../../syntax/ast/core/statements/CallStatement";
import {MethodIdentifiers} from "../../../syntax/app/controlflow/MethodIdentifiers";
import {App} from "../../../syntax/app/App";
import {
    InitializeAnalysisStatement,
    TerminateProgramStatement
} from "../../../syntax/ast/core/statements/InternalStatement";
import {IntegerType} from "../../../syntax/ast/core/ScratchType";
import {TimeState} from "./TimeAbstractDomain";
import {BeginAtomicStatement, EndAtomicStatement} from "../../../syntax/ast/core/statements/ControlStatement";
import instantiate = WebAssembly.instantiate;

class StaticTimeIntervalDefinition {

    private readonly _min: NumberExpression;

    private readonly _max: NumberExpression;

    private readonly _intervalVariableExpression: NumberVariableExpression;

    private readonly _opTimeVariable: VariableWithDataLocation;

    constructor(min: NumberExpression, max: NumberExpression, opTimeVariable: VariableWithDataLocation, intervalVariable: NumberVariableExpression) {
        this._min = min;
        this._max = max;
        this._opTimeVariable = opTimeVariable;
        this._intervalVariableExpression = intervalVariable;
    }

    get min(): NumberExpression {
        return this._min;
    }

    get max(): NumberExpression {
        return this._max;
    }

    get intervalVariableExpression(): NumberVariableExpression {
        return this._intervalVariableExpression;
    }

    get opTimeVariable(): VariableWithDataLocation {
        return this._opTimeVariable;
    }
}

export class TimeTransferRelation implements LabeledTransferRelation<TimeState> {

    private readonly _task: App;

    private readonly _wrappedTransfer: LabeledTransferRelation<AbstractElement>;

    private readonly _timeProfile: ProgramTimeProfile;

    private readonly _globalMicrosExpr: NumberExpression;
    private readonly _globalMillisExpr: NumberExpression;
    private readonly _globalSecondsExpr: NumberExpression;

    private readonly _staticIntervals: Map<string, StaticTimeIntervalDefinition>;

    constructor(task: App, timeProfile: ProgramTimeProfile, wrappedTransfer: LabeledTransferRelation<AbstractElement>) {
        this._task = Preconditions.checkNotUndefined(task);
        this._timeProfile = Preconditions.checkNotUndefined(timeProfile);
        this._wrappedTransfer = Preconditions.checkNotUndefined(wrappedTransfer);

        this._globalMicrosExpr = task.systemVariables.globalTimeMicrosVariable;
        this._globalMillisExpr = new DivideExpression(task.systemVariables.globalTimeMicrosVariable, IntegerLiteral.of(1000));
        this._globalSecondsExpr = new DivideExpression(task.systemVariables.globalTimeMicrosVariable, IntegerLiteral.of(1000000));

        this._staticIntervals = new Map();

        this.setupStaticIntervals();
    }

    private setupStaticIntervals() {
        for (const p of this._timeProfile.getStaticProfiles()) {
            const opTimeVariable: VariableWithDataLocation = new VariableWithDataLocation(
                DataLocations.createTypedLocation(Identifier.freshWithPrefix("__op_time_"), IntegerType.instance()));
            const opTimeVariableExpr: NumberVariableExpression = new NumberVariableExpression(opTimeVariable);

            this._task.typeStorage.getScopeOf(opTimeVariable.qualifiedName).putVariable(opTimeVariable);

            const minTimeMicrosExpr = new IntegerLiteral(Math.floor(p.nsecs.minValue.value / 1000));
            const maxTimeMicrosExpr = new IntegerLiteral(Math.floor(p.nsecs.maxValue.value / 1000));

            const itvKey = this.intervalKey(minTimeMicrosExpr.num, maxTimeMicrosExpr.num);
            this._staticIntervals.set(itvKey, new StaticTimeIntervalDefinition(minTimeMicrosExpr, maxTimeMicrosExpr, opTimeVariable, opTimeVariableExpr));
        }
    }

    abstractSucc(fromState: TimeState): Iterable<TimeState> {
        throw new IllegalStateException("Not intended to be used.");
    }

    abstractSuccFor(fromState: TimeState, op: ProgramOperation, co: Concern): Iterable<TimeState> {
        if (op.ast instanceof InitializeAnalysisStatement) {
            const initStmts: Statement[] = this._task.systemVariables.initStatements.elements;

            for (const itv of this._staticIntervals.values()) {
                this._task.typeStorage.getScopeOf(itv.opTimeVariable.qualifiedName).putVariable(itv.opTimeVariable);

                const assumeTimeMin = new NumGreaterEqualExpression(itv.opTimeVariable, itv.min);
                const assumeTimeMax = new NumLessEqualExpression(itv.opTimeVariable, itv.max);

                initStmts.push(new DeclareStackVariableStatement(itv.opTimeVariable));
                initStmts.push(new StrengtheningAssumeStatement(assumeTimeMin));
                initStmts.push(new StrengtheningAssumeStatement(assumeTimeMax));
            }

            return Transfers.withIntermediateTransfersBefore(this._wrappedTransfer, fromState.getWrappedState(), initStmts, [op], co)
                .map((w) => fromState.withWrappedState(w));
        }

        let timeStatePrime = fromState;
        if (op.ast instanceof BeginAtomicStatement) {
            timeStatePrime = timeStatePrime.withPushedBlock("block");
        } else if (op.ast instanceof EndAtomicStatement) {
            timeStatePrime = timeStatePrime.withPopBlock();
        }

        const [minTimeMicrosExpr, maxTimeMicrosExpr, ops] = this.reinterprete(op);
        let intermediateStatements: Statement[] = [];

        if (!this.isObserverConcern(co)) {
            if (timeStatePrime.getTimedBlockStack().isEmpty()) {
                if (!this.isEmptyInterval(minTimeMicrosExpr, maxTimeMicrosExpr)) {
                    intermediateStatements = this.getIntermediateStatementsFor(minTimeMicrosExpr, maxTimeMicrosExpr);
                }
            }
        }

        return Transfers.withIntermediateTransfersBefore(this._wrappedTransfer, fromState.getWrappedState(), intermediateStatements, ops, co)
            .map((w) => timeStatePrime.withWrappedState(w));
    }

    private reinterprete(op: ProgramOperation): [NumberExpression, NumberExpression, ProgramOperation[]] {
        if (op.ast instanceof CallStatement) {
            if (op.ast.assignResultTo.isPresent()) {
                const assignTo: VariableWithDataLocation = op.ast.assignResultTo.value();
                if (op.ast.calledMethod.text == MethodIdentifiers._RUNTIME_seconds) {
                    return [IntegerLiteral.zero(), IntegerLiteral.zero(),
                        [op, ProgramOperationFactory.createFor(new StoreEvalResultToVariableStatement(assignTo, this._globalSecondsExpr))]];

                } else if (op.ast.calledMethod.text == MethodIdentifiers._RUNTIME_millis) {
                    return [IntegerLiteral.zero(), IntegerLiteral.zero(),
                        [op, ProgramOperationFactory.createFor(new StoreEvalResultToVariableStatement(assignTo, this._globalMillisExpr))]];

                } else if (op.ast.calledMethod.text == MethodIdentifiers._RUNTIME_micros) {
                    return [IntegerLiteral.zero(), IntegerLiteral.zero(),
                        [op, ProgramOperationFactory.createFor(new StoreEvalResultToVariableStatement(assignTo, this._globalMicrosExpr))]];

                } else if (op.ast.calledMethod.text == MethodIdentifiers._RUNTIME_timerValue) {
                    return [IntegerLiteral.zero(), IntegerLiteral.zero(),
                        [op, ProgramOperationFactory.createFor(new StoreEvalResultToVariableStatement(assignTo,
                            new MinusExpression(this._task.systemVariables.globalTimeMicrosVariable, this._task.systemVariables.globalTimeResetMicrosVariable)))]];
                }
            } else {
                if (op.ast.calledMethod.text == MethodIdentifiers._RUNTIME_resetTimer) {
                    return [IntegerLiteral.zero(), IntegerLiteral.zero(),
                        [op, ProgramOperationFactory.createFor(
                            new StoreEvalResultToVariableStatement(this._task.systemVariables.globalTimeResetMicrosVariable, this._task.systemVariables.globalTimeMicrosVariable))]];
                }
            }

            return [IntegerLiteral.zero(), IntegerLiteral.zero(), [op]];
        }

        const [minTimeExpr, maxTimeExpr] = this.determineMicrosTimeIntervalExpressions(op);
        return [minTimeExpr, maxTimeExpr, [op]];
    }

    private determineMicrosTimeIntervalExpressions(op: ProgramOperation): [NumberExpression, NumberExpression] {
        if (op.ast instanceof TerminateProgramStatement) {
            const maxMicros = new IntegerLiteral(Math.floor(2147483647));
            return [new IntegerLiteral(0), maxMicros];
        } else {
            const profile = this._timeProfile.getOpProfile(op);
            return [new IntegerLiteral(Math.floor(profile.nsecs.minValue.value / 1000)),
                new IntegerLiteral(Math.ceil(profile.nsecs.maxValue.value / 1000))];
        }
    }

    private isEmptyInterval(minTimeExpr: NumberExpression, maxTimeExpr: NumberExpression) {
        Preconditions.checkArgument(minTimeExpr instanceof IntegerLiteral);
        Preconditions.checkArgument(maxTimeExpr instanceof IntegerLiteral);
        if ((minTimeExpr as IntegerLiteral).num == 0
            && (maxTimeExpr as IntegerLiteral).num == 0) {
            return true;
        }

        return false;
    }

    private isObserverConcern(co: Concern): boolean {
        // TOOD: Allow for other concerns (for example, more specific specification concerns)
        return co.equals(Concerns.defaultSpecificationConcern());
    }

    private intervalKey(from: number, to: number): string {
        return `${from}--${to}`;
    }

    private getIntermediateStatementsFor(minTimeMicrosExpr: NumberExpression, maxTimeMicrosExpr: NumberExpression) {
        const staticKey: string = this.intervalKey((minTimeMicrosExpr as IntegerLiteral).num, (maxTimeMicrosExpr as IntegerLiteral).num);
        const staticItv = this._staticIntervals.get(staticKey);
        if (staticItv) {
            return [new StoreEvalResultToVariableStatement(this._task.systemVariables.globalTimeMicrosVariable,
                    new PlusExpression(this._task.systemVariables.globalTimeMicrosVariable, staticItv.intervalVariableExpression))];
        } else {
            const opTimeVariable: VariableWithDataLocation = new VariableWithDataLocation(
                DataLocations.createTypedLocation(Identifier.freshWithPrefix("__op_time_"), IntegerType.instance()));
            const opTimeVariableExpr: NumberVariableExpression = new NumberVariableExpression(opTimeVariable);

            this._task.typeStorage.getScopeOf(opTimeVariable.qualifiedName).putVariable(opTimeVariable);

            const assumeTimeMin = new NumGreaterEqualExpression(opTimeVariableExpr, minTimeMicrosExpr);
            const assumeTimeMax = new NumLessEqualExpression(opTimeVariableExpr, maxTimeMicrosExpr);

            return [new DeclareStackVariableStatement(opTimeVariable),
                new StrengtheningAssumeStatement(assumeTimeMin),
                new StrengtheningAssumeStatement(assumeTimeMax),
                new StoreEvalResultToVariableStatement(this._task.systemVariables.globalTimeMicrosVariable,
                    new PlusExpression(this._task.systemVariables.globalTimeMicrosVariable, opTimeVariableExpr))];
        }
    }
}
