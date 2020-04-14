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
import {IntegerType, StringType} from "../ast/core/ScratchType";
import {StatementList} from "../ast/core/statements/Statement";
import {IfStatement} from "../ast/core/statements/ControlStatement";
import {NumEqualsExpression, StrEqualsExpression} from "../ast/core/expressions/BooleanExpression";
import {VariableWithDataLocation} from "../ast/core/Variable";
import {TypedDataLocation} from "../app/controlflow/DataLocation";
import {StringLiteral} from "../ast/core/expressions/StringExpression";
import {StoreEvalResultToVariableStatement} from "../ast/core/statements/SetStatement";
import * as fs from "fs";
import {ResourceDefinition} from "../ast/core/ResourceDefinition";
import * as path from "path";
import {IntegerLiteral} from "../ast/core/expressions/NumberExpression";
import {DeclareStackVariableStatement} from "../ast/core/statements/DeclarationStatement";
import {imageSize} from "image-size";
import {ScopeTypeInformation} from "../DeclarationScopes";

export class LookupTransformer {

    // Todo using strings is probably not correct here
    private static _data: Map<Identifier, Map<string, Buffer>> = new Map();

    public static buildGrapicPixelLookup(actor: Identifier, resourceDefs: TransformerResult, filePath: string, activeDeclarationScope: ScopeTypeInformation): MethodDefinition {

        //FIXME check if map already exists for actor
        let actorResources: Map<string, Buffer> = new Map();
        this._data.set(actor, actorResources);

        let dirName = path.dirname(filePath);

        let methodIdent = new Identifier("ResourceLookup");
        const ident = new Identifier("ident");
        let paramDecl = new ParameterDeclaration(ident , StringType.instance());
        let paramDeclList = new ParameterDeclarationList([paramDecl]);

        activeDeclarationScope.putTypeInformation(ident, StringType.instance())

        let resultVarDecl = new VariableWithDataLocation(new TypedDataLocation("result", StringType.instance().typeId));
        let declareStackVar = new DeclareStackVariableStatement(resultVarDecl);
        let stmts = [];
        stmts.push(declareStackVar)
        for (let child of resourceDefs.node.children) {

            let name = (<ResourceDefinition>child).ident.text;
            let fileName = (<ResourceDefinition>child).resourceLocator.uri;
            fileName = fileName.replace(/^"(.*)"$/, '$1'); // remove quotation marks

            if (fileName.endsWith(".png") || fileName.endsWith(".svg")) {
                let uri = path.join(dirName, fileName);

                let varWithDataLoc = new VariableWithDataLocation(new TypedDataLocation("ident", StringType.instance().typeId));
                let cond = new StrEqualsExpression(varWithDataLoc, new StringLiteral(name));

                let f = LookupTransformer.loadImage(uri, actorResources);
                let resourceData = new StringLiteral(f.toString());

                let stmt = new StoreEvalResultToVariableStatement(resultVarDecl, resourceData);
                let ifStmt = new IfStatement(cond, new StatementList([stmt], true), StatementList.empty());
                stmts.push(ifStmt)
            }
        }
        //todo add default case


        let stmtList = new StatementList(stmts);

        let resultDecl = new ResultDeclaration(resultVarDecl);
        return new MethodDefinition(
            methodIdent, paramDeclList,
            stmtList, resultDecl, true);
    }

    public static buildIndexByIdLookup(actor: Identifier, resourceDefs: TransformerResult, filePath: string, _activeDeclarationScope: ScopeTypeInformation): MethodDefinition {

        //FIXME check if map already exists for actor
        let actorResources: Map<string, Buffer> = new Map();
        this._data.set(actor, actorResources);

        let dirName = path.dirname(filePath);

        let methodIdent = new Identifier("getGraphicIndexById");

        const ident = new Identifier("id");
        let paramDecl = new ParameterDeclaration(ident, StringType.instance());
        let paramDeclList = new ParameterDeclarationList([paramDecl]);

        _activeDeclarationScope.putTypeInformation(ident, StringType.instance())

        const resultVarDecl = new VariableWithDataLocation(new TypedDataLocation("result", IntegerType.instance().typeId));
        const initStmt = new StoreEvalResultToVariableStatement(resultVarDecl, new IntegerLiteral(0));
        let stmts = [];
        stmts.push(initStmt);
        let idxCount = 0;
        for (let child of resourceDefs.node.children) {

            let name = (<ResourceDefinition>child).ident.text;
            let fileName = (<ResourceDefinition>child).resourceLocator.uri;
            fileName = fileName.replace(/^"(.*)"$/, '$1'); // remove quotation marks

            if (fileName.endsWith(".png") || fileName.endsWith(".svg")) {
                let uri = path.join(dirName, fileName);

                let varWithDataLoc = new VariableWithDataLocation(new TypedDataLocation("id", StringType.instance().typeId));
                let cond = new StrEqualsExpression(varWithDataLoc, new StringLiteral(name));

                LookupTransformer.loadImage(uri, actorResources);

                let stmt = new StoreEvalResultToVariableStatement(resultVarDecl, new IntegerLiteral(idxCount));
                let ifStmt = new IfStatement(cond, new StatementList([stmt], true), StatementList.empty());
                stmts.push(ifStmt);
                idxCount++;
            }
        }
        //TODO add default case

        let stmtList = new StatementList(stmts);

        let resultDecl = new ResultDeclaration(resultVarDecl);
        return new MethodDefinition(
            methodIdent, paramDeclList,
            stmtList, resultDecl, true);
    }

    public static buildIdByIndexLookup(actor: Identifier, resourceDefs: TransformerResult, filePath: string, activeDeclarationScope: ScopeTypeInformation): MethodDefinition {

        //FIXME check if map already exists for actor
        let actorResources: Map<string, Buffer> = new Map();
        this._data.set(actor, actorResources);

        let dirName = path.dirname(filePath);

        let methodIdent = new Identifier("getGraphicIdByIndex");
        const ident = new Identifier("idx")
        let paramDecl = new ParameterDeclaration(ident , IntegerType.instance());
        let paramDeclList = new ParameterDeclarationList([paramDecl]);

        activeDeclarationScope.putTypeInformation(ident, StringType.instance())

        let resultVarDecl = new VariableWithDataLocation(new TypedDataLocation("result", StringType.instance().typeId));
        let declareStackVar = new DeclareStackVariableStatement(resultVarDecl);
        let stmts = [];
        stmts.push(declareStackVar);
        let idxCount = 0;
        for (let child of resourceDefs.node.children) {

            let name = (<ResourceDefinition>child).ident.text;
            let fileName = (<ResourceDefinition>child).resourceLocator.uri;
            fileName = fileName.replace(/^"(.*)"$/, '$1'); // remove quotation marks

            if (fileName.endsWith(".png") || fileName.endsWith(".svg")) {
                let uri = path.join(dirName, fileName);

                let varWithDataLoc = new VariableWithDataLocation(new TypedDataLocation("idx", StringType.instance().typeId));
                let cond = new NumEqualsExpression(varWithDataLoc, new IntegerLiteral(idxCount));

                LookupTransformer.loadImage(uri, actorResources);

                let stmt = new StoreEvalResultToVariableStatement(resultVarDecl, new StringLiteral(name));
                let ifStmt = new IfStatement(cond, new StatementList([stmt], true), StatementList.empty());
                stmts.push(ifStmt);
                idxCount++;
            }
        }
        //TODO add default case

        let stmtList = new StatementList(stmts);

        let resultDecl = new ResultDeclaration(resultVarDecl);
        return new MethodDefinition(
            methodIdent, paramDeclList,
            stmtList, resultDecl, true);
    }


    public static buildGetImageWidthLookup(actor: Identifier, resourceDefs: TransformerResult, filePath: string, _activeDeclarationScope: ScopeTypeInformation): MethodDefinition {

        //FIXME check if map already exists for actor
        let actorResources: Map<string, Buffer> = new Map();
        this._data.set(actor, actorResources);

        let dirName = path.dirname(filePath);

        let methodIdent = new Identifier("getImageWidth");
        const ident = new Identifier("id");
        let paramDecl = new ParameterDeclaration(ident, StringType.instance());
        let paramDeclList = new ParameterDeclarationList([paramDecl]);

        _activeDeclarationScope.putTypeInformation(ident, StringType.instance())

        let resultVarDecl = new VariableWithDataLocation(new TypedDataLocation("result", IntegerType.instance().typeId));
        let declareStackVar = new DeclareStackVariableStatement(resultVarDecl);
        let stmts = [];
        stmts.push(declareStackVar);

        for (let child of resourceDefs.node.children) {

            let name = (<ResourceDefinition>child).ident.text;
            let fileName = (<ResourceDefinition>child).resourceLocator.uri;
            fileName = fileName.replace(/^"(.*)"$/, '$1'); // remove quotation marks

            if (fileName.endsWith(".png") || fileName.endsWith(".svg")) {
                let uri = path.join(dirName, fileName);

                let varWithDataLoc = new VariableWithDataLocation(new TypedDataLocation("id", StringType.instance().typeId));
                let cond = new StrEqualsExpression(varWithDataLoc, new StringLiteral(name));

                let dimensions = imageSize(uri);
                let width = dimensions.width;
                if (fileName.endsWith(".png")) {
                    width = this.resizeWidthAndHeight(dimensions.width, dimensions.height)[1]
                }

                let stmt = new StoreEvalResultToVariableStatement(resultVarDecl, new IntegerLiteral(width));
                let ifStmt = new IfStatement(cond, new StatementList([stmt], true), StatementList.empty());
                stmts.push(ifStmt);

            }
        }
        //TODO add default case

        let stmtList = new StatementList(stmts);

        let resultDecl = new ResultDeclaration(resultVarDecl);
        return new MethodDefinition(
            methodIdent, paramDeclList,
            stmtList, resultDecl, true);
    }

    public static buildGetImageHeightLookup(actor: Identifier, resourceDefs: TransformerResult, filePath: string, activeDeclarationScope: ScopeTypeInformation): MethodDefinition {

        //FIXME check if map already exists for actor
        let actorResources: Map<string, Buffer> = new Map();
        this._data.set(actor, actorResources);

        let dirName = path.dirname(filePath);

        let methodIdent = new Identifier("getImageHeight");
        const ident = new Identifier("id");
        let paramDecl = new ParameterDeclaration(ident, StringType.instance());
        let paramDeclList = new ParameterDeclarationList([paramDecl]);
        activeDeclarationScope.putTypeInformation(ident, StringType.instance())

        let resultVarDecl = new VariableWithDataLocation(new TypedDataLocation("result", IntegerType.instance().typeId));
        let declareStackVar = new DeclareStackVariableStatement(resultVarDecl);
        let stmts = [];
        stmts.push(declareStackVar)
        for (let child of resourceDefs.node.children) {

            let name = (<ResourceDefinition>child).ident.text;
            let fileName = (<ResourceDefinition>child).resourceLocator.uri;
            fileName = fileName.replace(/^"(.*)"$/, '$1'); // remove quotation marks

            if (fileName.endsWith(".png") || fileName.endsWith(".svg")) {
                let uri = path.join(dirName, fileName);

                let varWithDataLoc = new VariableWithDataLocation(new TypedDataLocation("ident", StringType.instance().typeId));
                let cond = new StrEqualsExpression(varWithDataLoc, new StringLiteral(name));

                let dimensions = imageSize(uri);
                let height = dimensions.height;
                if (fileName.endsWith(".png")) {
                    height = this.resizeWidthAndHeight(dimensions.width, dimensions.height)[0]
                }

                let stmt = new StoreEvalResultToVariableStatement(resultVarDecl, new IntegerLiteral(height));
                let ifStmt = new IfStatement(cond, new StatementList([stmt], true), StatementList.empty());
                stmts.push(ifStmt);

            }
        }
        //TODO add default case

        let stmtList = new StatementList(stmts);

        let resultDecl = new ResultDeclaration(resultVarDecl);
        return new MethodDefinition(
            methodIdent, paramDeclList,
            stmtList, resultDecl, true);
    }

    public static buildGetNumGraphics(actor: Identifier, resourceDefs: TransformerResult, filePath: string): MethodDefinition {

        let actorResources: Map<string, Buffer> = new Map();
        this._data.set(actor, actorResources);

        let dirName = path.dirname(filePath);

        let methodIdent = new Identifier("getNumGraphics");

        let paramDeclList = new ParameterDeclarationList([]);

        let stackVar = new VariableWithDataLocation(new TypedDataLocation("result", IntegerType.instance().typeId));
        let declareStackVar = new DeclareStackVariableStatement(stackVar);
        let stmts = [];
        stmts.push(declareStackVar)
        let idxCount = 0;
        for (let child of resourceDefs.node.children) {
            let fileName = (<ResourceDefinition>child).resourceLocator.uri;
            fileName = fileName.replace(/^"(.*)"$/, '$1'); // remove quotation marks

            if (fileName.endsWith(".png") || fileName.endsWith(".svg")) {
                let uri = path.join(dirName, fileName);
                LookupTransformer.loadImage(uri, actorResources);
                idxCount++;
            }
        }

        let stmt = new StoreEvalResultToVariableStatement(stackVar, new IntegerLiteral(idxCount));
        stmts.push(stmt);
        let stmtList = new StatementList(stmts);

        let resultVarDecl = new VariableWithDataLocation(new TypedDataLocation("result", IntegerType.instance().typeId));
        let resultDecl = new ResultDeclaration(resultVarDecl);
        return new MethodDefinition(
            methodIdent, paramDeclList,
            stmtList, resultDecl, true);
    }

    private static loadImage(uniqueName: string, actorResources: Map<string, Buffer>): Buffer {
        let path = uniqueName;
        if (actorResources.has(uniqueName)) {
            return actorResources.get(uniqueName)
        } else {
            let f = fs.readFileSync(path);
            this._data[path] = f;

            actorResources.set(uniqueName, f);

            return f
        }
    }


    // TODO do we really want this?
    private static resizeWidthAndHeight(width, height) {
        const inputRatio = width / height;
        const STAGE_WIDTH = 480;
        const STAGE_HEIGHT = 360;
        const RATIO = STAGE_WIDTH / STAGE_HEIGHT;

        if ((width <= STAGE_WIDTH) && (height <= STAGE_HEIGHT)) {
            return [width * 2, height * 2];
        } else if ((width <= STAGE_WIDTH * 2) && (height <= STAGE_HEIGHT * 2)) {
            return [width, height];
        } else if (inputRatio >= RATIO) {
            return [STAGE_WIDTH * 2, STAGE_WIDTH * 2 / inputRatio];
        } else {
            return [STAGE_HEIGHT * 2 * inputRatio, STAGE_HEIGHT * 2];
        }
    }
}
