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

import {FromParseTree} from "../FromParseTree";
import {RuleNode} from "antlr4ts/tree";
import {WithIdent} from "../../utils/WithIdent";
import DataLocation from "./controlflow/DataLocation";
import {DataLocationDeclaration} from "./controlflow/DataLocationDeclaration";

export type MethodDefinitionMap = { [id:string]: MethodDefinition } ;

export class MethodDefinition extends FromParseTree implements WithIdent {

    private readonly _ident : string;

    constructor(node: RuleNode, ident: string, paramDecls: DataLocationDeclaration, resultDecl: DataLocation) {
        super(node);
        this._ident = ident;
    }

    get ident(): string {
        return this._ident;
    }

}
