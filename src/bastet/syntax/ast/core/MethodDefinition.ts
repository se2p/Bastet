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

import {AbstractNode} from "../AstNode";
import {AstNodeList} from "../AstNodeList";
import {Identifier} from "./Identifier";
import {ParameterDeclarationList} from "./ParameterDeclaration";
import {StatementList} from "./statements/Statement";
import {ScratchType, VoidType} from "./ScratchType";
import {StringLiteral} from "./expressions/StringExpression";


export class ResultDeclaration extends AbstractNode {

    private readonly _ident: Identifier;
    private readonly _type: ScratchType;

    constructor(ident: Identifier, type: ScratchType) {
        super([ident, type]);
        this._ident = ident;
        this._type = type;
    }

    private static readonly VOID = new ResultDeclaration(new Identifier(new StringLiteral("")), VoidType.instance());

    public static void(): ResultDeclaration {
        return this.VOID;
    }

    get ident(): Identifier {
        return this._ident;
    }

    get type(): ScratchType {
        return this._type;
    }
}

export class MethodSignature extends AbstractNode {

    private readonly _ident: Identifier;
    private readonly _params: ParameterDeclarationList;
    private readonly _returns: ResultDeclaration;
    private readonly _isExtern: boolean;

    constructor(ident: Identifier, params: ParameterDeclarationList, returns: ResultDeclaration, isExtern: boolean) {
        super([ident, params, returns]);
        this._ident = ident;
        this._params = params;
        this._returns = returns;
        this._isExtern = isExtern;
    }

    get ident(): Identifier {
        return this._ident;
    }

    get params(): ParameterDeclarationList {
        return this._params;
    }

    get returns(): ResultDeclaration {
        return this._returns;
    }

    get isExtern(): boolean {
        return this._isExtern;
    }

}

export type MethodDefinitionMap = { [id:string]: MethodDefinition } ;

export type MethodSignatureMap = { [id:string]: MethodSignature } ;

export class ExternMethodDeclaration extends MethodSignature {

    constructor(ident: Identifier, params: ParameterDeclarationList, returns: ResultDeclaration) {
        super(ident, params, returns, true);
    }

}

export class MethodDefinition extends MethodSignature {

    private readonly _statements: StatementList;

    constructor(ident: Identifier, params: ParameterDeclarationList, statements: StatementList, returns: ResultDeclaration) {
        super(ident, params, returns, false);
        this._statements = statements;
    }

    get statements(): StatementList {
        return this._statements;
    }

}

export class MethodDefinitionList extends AstNodeList<MethodDefinition> {

    constructor(elements: MethodDefinition[]) {
        super(elements);
    }

}

export class MethodSignatureList extends AstNodeList<MethodSignature> {

    constructor(elements: MethodSignature[]) {
        super(elements);
    }

}
