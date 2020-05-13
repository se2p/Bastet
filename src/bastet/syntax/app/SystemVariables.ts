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


import {TypeInformationStorage} from "../DeclarationScopes";
import {Preconditions} from "../../utils/Preconditions";
import {VariableWithDataLocation} from "../ast/core/Variable";
import {DataLocations} from "./controlflow/DataLocation";
import {Identifier} from "../ast/core/Identifier";
import {BooleanType, IntegerType} from "../ast/core/ScratchType";
import {StatementList} from "../ast/core/statements/Statement";
import {DeclareSystemVariableStatement} from "../ast/core/statements/DeclarationStatement";
import {StoreEvalResultToVariableStatement} from "../ast/core/statements/SetStatement";
import {IntegerLiteral} from "../ast/core/expressions/NumberExpression";
import {BooleanLiteral} from "../ast/core/expressions/BooleanExpression";

export const GLOBAL_TIME_MICROS_VAR: string = "__global_time_micros";
export const GLOBAL_TIME_RESET_MICROS_VAR: string = "__global_reset_micros";

export class SystemVariables {

    private readonly _threadWaitUntilMicrosVariable: VariableWithDataLocation;

    private readonly _globalTimeMicrosVariable: VariableWithDataLocation;

    private readonly _globalTimeResetMicrosVariable: VariableWithDataLocation;

    private readonly _programTerminatedVariable: VariableWithDataLocation;

    private readonly _initStatements: StatementList;

    constructor(registerTo: TypeInformationStorage) {
        Preconditions.checkNotUndefined(registerTo);

        this._threadWaitUntilMicrosVariable = new VariableWithDataLocation(
            DataLocations.createTypedLocation(new Identifier("__wait_until_micros"), IntegerType.instance()));
        registerTo.getScopeOf(this._threadWaitUntilMicrosVariable.qualifiedName).putVariable(this._threadWaitUntilMicrosVariable);

        this._programTerminatedVariable = new VariableWithDataLocation(
            DataLocations.createTypedLocation(new Identifier("__terminated"), BooleanType.instance()));
        registerTo.getScopeOf(this._programTerminatedVariable.qualifiedName).putVariable(this._programTerminatedVariable);

        this._globalTimeMicrosVariable = new VariableWithDataLocation(
            DataLocations.createTypedLocation(new Identifier(GLOBAL_TIME_MICROS_VAR), IntegerType.instance()));
        registerTo.getScopeOf(this._globalTimeMicrosVariable.qualifiedName).putVariable(this._globalTimeMicrosVariable);

        this._globalTimeResetMicrosVariable = new VariableWithDataLocation(
            DataLocations.createTypedLocation(new Identifier(GLOBAL_TIME_RESET_MICROS_VAR), IntegerType.instance()));
        registerTo.getScopeOf(this._globalTimeResetMicrosVariable.qualifiedName).putVariable(this._globalTimeResetMicrosVariable);

        this._initStatements = new StatementList([
            new DeclareSystemVariableStatement(this.threadWaitUntilMicrosVariable),
            new DeclareSystemVariableStatement(this._programTerminatedVariable),
            new StoreEvalResultToVariableStatement(this._programTerminatedVariable, BooleanLiteral.false()),
            new DeclareSystemVariableStatement(this.globalTimeMicrosVariable),
            new StoreEvalResultToVariableStatement(this.globalTimeMicrosVariable, IntegerLiteral.of(0)),
            new DeclareSystemVariableStatement(this.globalTimeResetMicrosVariable),
            new StoreEvalResultToVariableStatement(this.globalTimeResetMicrosVariable, IntegerLiteral.of(0))
        ]);
    }

    get initStatements(): StatementList {
        return this._initStatements;
    }

    get threadWaitUntilMicrosVariable(): VariableWithDataLocation {
        return this._threadWaitUntilMicrosVariable;
    }

    get programTerminatedVariable(): VariableWithDataLocation {
        return this._programTerminatedVariable;
    }

    get globalTimeMicrosVariable(): VariableWithDataLocation {
        return this._globalTimeMicrosVariable;
    }

    get globalTimeResetMicrosVariable(): VariableWithDataLocation {
        return this._globalTimeResetMicrosVariable;
    }
}