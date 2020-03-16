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
import {NumberType, StringType} from "../ast/core/ScratchType";
import {Statement, StatementList} from "../ast/core/statements/Statement";
import {IfStatement} from "../ast/core/statements/ControlStatement";
import {NumEqualsExpression, StrEqualsExpression} from "../ast/core/expressions/BooleanExpression";
import {VariableWithDataLocation} from "../ast/core/Variable";
import {TypedDataLocation} from "../app/controlflow/DataLocation";
import {StringLiteral} from "../ast/core/expressions/StringExpression";
import {StoreEvalResultToVariableStatement} from "../ast/core/statements/SetStatement";
import * as fs from "fs";
import {ResourceDefinition} from "../ast/core/ResourceDefinition";
import * as path from "path";
import {NumberLiteral} from "../ast/core/expressions/NumberExpression";

export class LookupTransformer {
    // FIXME using strings is probably not correct here
    private static _data: Map<Identifier, Map<string, string>> = new Map();

    public static buildGrapicPixelLookup(actor: Identifier, resourceDefs: TransformerResult, filePath: string): MethodDefinition {
        console.log(resourceDefs.node.children)

        let actorResources: Map<string, string> = new Map();
        this._data.set(actor, actorResources)

        let dirName = path.dirname(filePath);

        let methodIdent = new Identifier("ResourceLookup");

        let paramDecl = new ParameterDeclaration(new Identifier("ident"), new StringType());
        let paramDeclList = new ParameterDeclarationList([paramDecl]);

        let resultVarDecl = new VariableWithDataLocation(new TypedDataLocation("result", new StringType().typeId));
        let stmts = []
        for (let child of resourceDefs.node.children) {

            let name = (<ResourceDefinition>child).ident.text
            let fileName = (<ResourceDefinition>child).resourceLocator.uri
            fileName = fileName.replace(/^"(.*)"$/, '$1'); // remove quotation marks
            let uri = path.join(dirName, fileName)

            let varWithDataLoc = new VariableWithDataLocation(new TypedDataLocation("ident", new StringType().typeId));
            let cond = new StrEqualsExpression(varWithDataLoc, new StringLiteral(name));

            let s = LookupTransformer.loadImage(uri, actorResources)
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

    public static buildIndexByIdLookup(actor: Identifier, resourceDefs: TransformerResult, filePath: string): MethodDefinition {
        console.log(resourceDefs.node.children)

        let actorResources: Map<string, string> = new Map();
        this._data.set(actor, actorResources)

        let dirName = path.dirname(filePath);

        let methodIdent = new Identifier("_RUNTIME_getGraphicIdByIndex");

        let paramDecl = new ParameterDeclaration(new Identifier("id"), new StringType());
        let paramDeclList = new ParameterDeclarationList([paramDecl]);

        let resultVarDecl = new VariableWithDataLocation(new TypedDataLocation("result", new StringType().typeId));
        let stmts = []
        let idxCount = 0;
        for (let child of resourceDefs.node.children) {

            let name = (<ResourceDefinition>child).ident.text
            let fileName = (<ResourceDefinition>child).resourceLocator.uri
            fileName = fileName.replace(/^"(.*)"$/, '$1'); // remove quotation marks
            let uri = path.join(dirName, fileName)

            let varWithDataLoc = new VariableWithDataLocation(new TypedDataLocation("ident", new StringType().typeId));
            let cond = new StrEqualsExpression(varWithDataLoc, new StringLiteral(name));

            LookupTransformer.loadImage(uri, actorResources)

            let stmt = new StoreEvalResultToVariableStatement(resultVarDecl, new NumberLiteral(idxCount))
            let ifStmt = new IfStatement(cond, new StatementList([stmt], true), StatementList.empty())
            stmts.push(ifStmt)
            idxCount++;
        }

        let stmtList = new StatementList(stmts)

        let resultDecl = new ResultDeclaration(resultVarDecl)
        return new MethodDefinition(
            methodIdent, paramDeclList,
            stmtList, resultDecl, true);
    }

    public static buildIdByIndexLookup(actor: Identifier, resourceDefs: TransformerResult, filePath: string): MethodDefinition {
        console.log(resourceDefs.node.children)

        let actorResources: Map<string, string> = new Map();
        this._data.set(actor, actorResources)

        let dirName = path.dirname(filePath);

        let methodIdent = new Identifier("_RUNTIME_getGraphicIdByIndex");

        let paramDecl = new ParameterDeclaration(new Identifier("idx"), new NumberType());
        let paramDeclList = new ParameterDeclarationList([paramDecl]);

        let resultVarDecl = new VariableWithDataLocation(new TypedDataLocation("result", new StringType().typeId));
        let stmts = []
        let idxCount = 0;
        for (let child of resourceDefs.node.children) {

            let name = (<ResourceDefinition>child).ident.text
            let fileName = (<ResourceDefinition>child).resourceLocator.uri
            fileName = fileName.replace(/^"(.*)"$/, '$1'); // remove quotation marks
            let uri = path.join(dirName, fileName)

            let varWithDataLoc = new VariableWithDataLocation(new TypedDataLocation("ident", new StringType().typeId));
            let cond = new NumEqualsExpression(varWithDataLoc, new NumberLiteral(idxCount));

            LookupTransformer.loadImage(uri, actorResources)

            let stmt = new StoreEvalResultToVariableStatement(resultVarDecl, new StringLiteral(name))
            let ifStmt = new IfStatement(cond, new StatementList([stmt], true), StatementList.empty())
            stmts.push(ifStmt)
            idxCount++;
        }

        let stmtList = new StatementList(stmts)

        let resultDecl = new ResultDeclaration(resultVarDecl)
        return new MethodDefinition(
            methodIdent, paramDeclList,
            stmtList, resultDecl, true);
    }


    private static loadImage(uniqueName: string, actorResources: Map<string, string>): string {
        let path = uniqueName;
        if (actorResources.has(uniqueName)) {
            return actorResources.get(uniqueName)
        } else {
            let f = fs.readFileSync(process.cwd() + "/" + path);
            this._data[path] = f;
            let fileData = f.toString();

            actorResources.set(uniqueName, fileData);

            return fileData
        }
    }
}
