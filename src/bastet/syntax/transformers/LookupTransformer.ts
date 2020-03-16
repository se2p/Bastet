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

import {MethodDefinition, ResultDeclaration} from "../ast/core/MethodDefinition";
import {TransformerResult} from "./ToIntermediateTransformer";
import {Identifier} from "../ast/core/Identifier";
import {ParameterDeclaration, ParameterDeclarationList} from "../ast/core/ParameterDeclaration";
import {StringType} from "../ast/core/ScratchType";
import {Statement, StatementList} from "../ast/core/statements/Statement";
import {IfStatement} from "../ast/core/statements/ControlStatement";
import {StrEqualsExpression} from "../ast/core/expressions/BooleanExpression";
import {VariableWithDataLocation} from "../ast/core/Variable";
import {TypedDataLocation} from "../app/controlflow/DataLocation";
import {StringLiteral} from "../ast/core/expressions/StringExpression";
import {StoreEvalResultToVariableStatement} from "../ast/core/statements/SetStatement";
import * as fs from "fs";
import {ResourceDefinition} from "../ast/core/ResourceDefinition";
import * as path from "path";

export class LookupTransformer {
    // FIXME using strings is probably not correct here
    private static _data: Map<string, string> = new Map();

    public static transformResourceDefs(resourceDefs: TransformerResult, filePath: string): MethodDefinition {
        console.log(resourceDefs.node.children)

        let dirName = path.dirname(filePath);

        let methodIdent = new Identifier("ResourceLookup");

        let paramDecl = new ParameterDeclaration(new Identifier("ident"), new StringType());
        let paramDeclList = new ParameterDeclarationList([paramDecl]);


        let resultVarDecl = new VariableWithDataLocation(new TypedDataLocation("result", new StringType().typeId));
        let stmts = []
        for (let child of resourceDefs.node.children) {

            let name = (<ResourceDefinition> child).ident.text
            let fileName = (<ResourceDefinition> child).resourceLocator.uri
            fileName = fileName.replace(/^"(.*)"$/, '$1'); // remove quotation marks
            let uri = path.join(dirName, fileName)

            let varWithDataLoc = new VariableWithDataLocation(new TypedDataLocation("ident", new StringType().typeId));
            let cond = new StrEqualsExpression(varWithDataLoc, new StringLiteral(name));

            let s = LookupTransformer.loadImage(uri)
            let resourceData = new StringLiteral(s);

            let stmt = new StoreEvalResultToVariableStatement(resultVarDecl, resourceData)
            let ifStmt = new IfStatement(cond, new StatementList([stmt], true), StatementList.empty())
            stmts.push(ifStmt)
        }

        let stmtList = new StatementList(stmts)

        let resultDecl = new ResultDeclaration(resultVarDecl)
        return new MethodDefinition(
            methodIdent, paramDeclList,
            stmtList, resultDecl, true);
    }

    private static loadImage(uniqueName: string): string {
        let path = uniqueName;
        if (this._data.has(uniqueName)) {
            return this._data.get(uniqueName)
        } else {
            let f = fs.readFileSync(process.cwd() + "/" + path);
            this._data[path] = f;
            let fileData = f.toString();

            this._data.set(uniqueName, fileData);

            return fileData
        }
    }
}
