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

import {MethodDefinition, MethodSignature, ResultDeclaration} from "../../ast/core/MethodDefinition";
import {ParameterDeclarationList} from "../../ast/core/ParameterDeclaration";
import {Identifier} from "../../ast/core/Identifier";
import {StatementList} from "../../ast/core/statements/Statement";
import {TransitionRelation, WithTransitionRelation} from "./TransitionRelation";
import {Preconditions} from "../../../utils/Preconditions";

export class Method implements WithTransitionRelation {

    private readonly _definition: MethodDefinition;

    private readonly _transitions: TransitionRelation;

    constructor(definition: MethodDefinition, controlflow: TransitionRelation) {
        this._definition = Preconditions.checkNotUndefined(definition);
        this._transitions = Preconditions.checkNotUndefined(controlflow);
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

    get transitions(): TransitionRelation {
        return this._transitions;
    }

    get isAtomic(): boolean {
        return this._definition.isAtomic;
    }

}
