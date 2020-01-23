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

import {MethodDefinition, MethodSignature, ResultDeclaration} from "../../ast/core/MethodDefinition";
import {ParameterDeclarationList} from "../../ast/core/ParameterDeclaration";
import {Identifier} from "../../ast/core/Identifier";
import {StatementList} from "../../ast/core/statements/Statement";
import {TransitionRelation} from "./TransitionRelation";
import {Preconditions} from "../../../utils/Preconditions";

export class Method {

    private readonly _definition: MethodDefinition;

    private readonly _controlflow: TransitionRelation;

    constructor(definition: MethodDefinition, controlflow: TransitionRelation) {
        this._definition = Preconditions.checkNotUndefined(definition);
        this._controlflow = Preconditions.checkNotUndefined(controlflow);
    }

    get signature() : MethodSignature {
        return this._definition;
    }

    get ident(): Identifier {
        return this._definition.ident;
    }

    get parameters(): ParameterDeclarationList {
        return this._definition.params;
    }

    get returns(): ResultDeclaration {
        return this._definition.returns;
    }

    get body(): StatementList {
        return this._definition.statements;
    }

    get controlflow(): TransitionRelation {
        return this._controlflow;
    }

}
