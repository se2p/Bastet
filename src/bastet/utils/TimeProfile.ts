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

import {NumIntervalValue} from "../procedures/domains/NumIntervalValueDomain";
import {OperationId, ProgramOperation} from "../syntax/app/controlflow/ops/ProgramOperation";
import {ImplementMeException} from "../core/exceptions/ImplementMeException";
import {ConcreteNumber} from "../procedures/domains/ConcreteElements";
import {EndAtomicStatement} from "../syntax/ast/core/statements/ControlStatement";
import {EpsilonStatement} from "../syntax/ast/core/statements/EpsilonStatement";
import {
    DeclareActorVariableStatement,
    DeclareStackVariableStatement, DeclareSystemVariableStatement
} from "../syntax/ast/core/statements/DeclarationStatement";

/**
 * A STATIC time profile for a given program operation.
 *
 * Please note that the time interval must be an overapproximation
 * can covers ALL possible parameterizations of the corresponding program operation.
 *
 * A more accurate time profile can be determined based
 * on dynamic information (which actual parameters get passed to the operation?)
 */
export class OperationTimeProfile {

    /** Interval of nanoseconds needed on the reference machine(s) */
    private readonly _nsecs: NumIntervalValue;

    constructor(nsecs: NumIntervalValue) {
        this._nsecs = nsecs;
    }

    get nsecs(): NumIntervalValue {
        return this._nsecs;
    }

}

export const ONE_MICSEC_IN_NSECS = 1000;

export class StaticTimeProfile implements ProgramTimeProfile {

    private readonly _opTimes: Map<OperationId, OperationTimeProfile>;

    private readonly _avgOpProfile: OperationTimeProfile;
    private readonly _avgAtomicBlockProfile: OperationTimeProfile;
    private readonly _noDurationProfile: OperationTimeProfile;

    constructor() {
        this._opTimes = new Map();
        this._avgOpProfile = new OperationTimeProfile(
            new NumIntervalValue(
                new ConcreteNumber(ONE_MICSEC_IN_NSECS * 10),
                new ConcreteNumber(ONE_MICSEC_IN_NSECS * 1000)));
        this._avgAtomicBlockProfile = new OperationTimeProfile(
            new NumIntervalValue(
                new ConcreteNumber(ONE_MICSEC_IN_NSECS * 100),
                new ConcreteNumber(ONE_MICSEC_IN_NSECS * 10000)));
        this._noDurationProfile = new OperationTimeProfile(
            new NumIntervalValue(new ConcreteNumber(0), new ConcreteNumber(0)));
    }

    public widen(op: ProgramOperation, minNanos: number, maxNanos: number) {
        throw new ImplementMeException();
    }

    public getOpProfile(op: ProgramOperation): OperationTimeProfile {
        if (op.ast instanceof EndAtomicStatement) {
            return this._avgAtomicBlockProfile;
        } else if (op.ast instanceof EpsilonStatement
            || op.ast instanceof DeclareStackVariableStatement
            || op.ast instanceof DeclareActorVariableStatement
            || op.ast instanceof DeclareSystemVariableStatement) {
            return this._noDurationProfile;
        } else {
            return this._avgOpProfile;
        }
    }

}

export interface ProgramTimeProfile {

    getOpProfile(op: ProgramOperation): OperationTimeProfile;

}
