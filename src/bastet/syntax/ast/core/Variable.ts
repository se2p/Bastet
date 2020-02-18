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

import {ScratchType} from "./ScratchType";
import {Identifier} from "./Identifier";
import {AbstractExpression} from "./expressions/AbstractExpression";
import {DataLocation} from "../../app/controlflow/DataLocation";
import {StringLiteral} from "./expressions/StringExpression";
import {Preconditions} from "../../../utils/Preconditions";

export interface Variable {

    identifier: Identifier;

    type: ScratchType;

}

export abstract class AbstractVariable extends AbstractExpression implements Variable {

    private readonly _identifier: Identifier;

    constructor(type: ScratchType, identifier: Identifier) {
        super(type, [type, identifier]);
        this._identifier = identifier;
    }

    get identifier(): Identifier {
        return this._identifier;
    }

}

export class VariableExpression extends AbstractExpression {

    private readonly _variable: Variable;

    constructor(variable: Variable) {
        super(Preconditions.checkNotUndefined(variable.type),
            [Preconditions.checkNotUndefined(variable.identifier)]);
        this._variable = variable;
    }

    get variable(): Variable {
        return this._variable;
    }

}

export class VariableWithDataLocation extends AbstractExpression implements Variable {

    private readonly _dataloc: DataLocation;

    private readonly _identifier: Identifier;

    constructor(dataloc: DataLocation) {
        super(ScratchType.fromId(dataloc.type), []);
        this._dataloc = dataloc;
        this._identifier = Identifier.of(dataloc.ident);
    }

    get identifier(): Identifier {
        return this._identifier;
    }
}
