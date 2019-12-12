/*
 *   BASTET Program Analysis Framework
 *
 *   Copyright 2019 by University of Passau
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

import {AbstractNode} from "../AstNode";
import {AstNodeList} from "../AstNodeList";
import {Identifier} from "./Identifier";
import {ParameterDeclarationList} from "./ParameterDeclaration";
import {StatementList} from "./statements/Statement";
import {ScratchType} from "./ScratchType";


export class ResultDeclaration extends AbstractNode {

    private readonly _ident: Identifier;
    private readonly _type: ScratchType;

    constructor(ident: Identifier, type: ScratchType) {
        super([ident, type]);
        this._ident = ident;
        this._type = type;
    }

}

export class MethodDefinition extends AbstractNode {

    private readonly _ident: Identifier;
    private readonly _params: ParameterDeclarationList;
    private readonly _statements: StatementList;
    private readonly _returns: ResultDeclaration;

    constructor(ident: Identifier, params: ParameterDeclarationList, statements: StatementList, returns: ResultDeclaration) {
        super([ident, params, statements, returns]);
        this._ident = ident;
        this._params = params;
        this._statements = statements;
        this._returns = returns;
    }

}

export class MethodDefinitionList extends AstNodeList<MethodDefinition> {

}
