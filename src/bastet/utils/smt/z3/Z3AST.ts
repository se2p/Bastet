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

import {LibZ3InContext, Z3_ast, Z3_func_decl, Z3_symbol} from "./libz3";
import {Preconditions} from "../../Preconditions";
import {Uint32} from "./ctypes";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {Map as ImmMap} from "immutable";
import {Z3Formula} from "./Z3Theories";

export enum Z3AstKind {
    Z3_NUMERAL_AST,
    Z3_APP_AST,
    Z3_VAR_AST,
    Z3_QUANTIFIER_AST,
    Z3_SORT_AST,
    Z3_FUNC_DECL_AST,
    Z3_UNKNOWN_AST = 1000
}

export interface Z3AstVisitor<R> {

    visitConstantOrApplication(node: Z3_ast): R;

    visitNumeral(node: Z3_ast): R;

    visitBoundVariable(node: Z3_ast): R;

    visitQuantifier(node: Z3_ast): R;

    visitQuantifier(node: Z3_ast): R;

    visitSort(node: Z3_ast): R;

    visitFunctionDecl(node: Z3_ast): R;

    visitUnknown(node: Z3_ast): R;

    visit(node: Z3_ast): R;

}

export class Z3AstNodeList {

    private readonly _list: Z3_ast[];
    private readonly _ctx: LibZ3InContext;

    constructor(ctx: LibZ3InContext, list: Z3_ast[]) {
        this._list = Preconditions.checkNotUndefined(list);
        this._ctx = Preconditions.checkNotUndefined(ctx);

        for (const e of list) {
            this._ctx.inc_ref(e);
        }
    }

    public release() {
        for (const e of this._list) {
            this._ctx.dec_ref(e);
        }
    }

    get list(): Z3_ast[] {
        return this._list;
    }
}

export abstract class Z3Visitor<R> implements Z3AstVisitor<R> {

    protected readonly _ctx: LibZ3InContext

    constructor(ctx: LibZ3InContext) {
        this._ctx = Preconditions.checkNotUndefined(ctx);
    }

    visit(node: Z3_ast): R {
        switch (this.getAstKind(node)) {
            case Z3AstKind.Z3_APP_AST:
                return this.visitConstantOrApplication(node);
            case Z3AstKind.Z3_QUANTIFIER_AST:
                return this.visitQuantifier(node);
            case Z3AstKind.Z3_VAR_AST:
                return this.visitBoundVariable(node);
            case Z3AstKind.Z3_NUMERAL_AST:
                return this.visitNumeral(node);
            case Z3AstKind.Z3_FUNC_DECL_AST:
                return this.visitFunctionDecl(node);
            case Z3AstKind.Z3_SORT_AST:
                return this.visitSort(node);
            case Z3AstKind.Z3_UNKNOWN_AST:
                return this.visitUnknown(node);
            default:
                throw new ImplementMeException();
        }
    }

    children(node: Z3_ast): Z3AstNodeList {
        let result: Z3_ast[] = [];
        switch (this.getAstKind(node)) {
            case Z3AstKind.Z3_APP_AST: {
                const numArgs = this._ctx.get_app_num_args(node);
                for (let i = 0; i < numArgs.val(); i++) {
                    result.push(this._ctx.get_app_arg(node, new Uint32(i)));
                }
                break;
            }
            case Z3AstKind.Z3_FUNC_DECL_AST: {
                const numArgs = this._ctx.get_decl_num_parameters(node);
                for (let i=0; i<numArgs.val(); i++) {
                    result.push(this._ctx.get_decl_ast_parameter(node, new Uint32(i)));
                }
                break;
            }
            case Z3AstKind.Z3_NUMERAL_AST: {
                break;
            }
            case Z3AstKind.Z3_QUANTIFIER_AST: {
                throw new ImplementMeException();
                break;
            }
            case Z3AstKind.Z3_SORT_AST: {
                break;
            }
            case Z3AstKind.Z3_VAR_AST: {
                break;
            }
            case Z3AstKind.Z3_UNKNOWN_AST: {
                throw new IllegalArgumentException("Unknown AST node");
            }
        }

        return new Z3AstNodeList(this._ctx, result);
    }

    private getAstKind(node: Z3_ast): Z3AstKind {
        const kind = this._ctx.get_ast_kind(node);
        return kind.val() as Z3AstKind;
    }

    abstract visitBoundVariable(node: Z3_ast): R;

    abstract visitConstantOrApplication(node: Z3_ast): R;

    abstract visitFunctionDecl(node: Z3_ast): R;

    abstract visitNumeral(node: Z3_ast): R;

    abstract visitQuantifier(node: Z3_ast): R;

    abstract visitSort(node: Z3_ast): R;

    abstract visitUnknown(node: Z3_ast): R;

}

export class VariableCollectingVisitor extends Z3Visitor<ImmMap<string, Z3Formula>> {

    visitBoundVariable(node: Z3_ast): ImmMap<string, Z3Formula> {
        return ImmMap<string, Z3Formula>([]);
    }

    visitConstantOrApplication(node: Z3_ast): ImmMap<string, Z3Formula> {
        let result = ImmMap<string, Z3Formula>([]);
        const childs = this.children(node);

        for (let c of childs.list) {
            result = result.merge(this.visit(c));
        }

        if (childs.list.length == 0) {
            const decl: Z3_func_decl = this._ctx.get_app_decl(node);
            const symbol: Z3_symbol = this._ctx.get_decl_name(decl);
            const name: string = this._ctx.get_symbol_string(symbol);

            if (!(name == "true" || name == "false")) {
                result = result.set(name, new Z3Formula(node));
            }
        }

        childs.release();

        return result;
    }

    visitFunctionDecl(node: Z3_ast): ImmMap<string, Z3Formula> {
        const symb = this._ctx.get_decl_name(node);
        const name = this._ctx.get_symbol_string(symb);
        throw new ImplementMeException();
        // return ImmMap<string, Z3Formula>([name, node]);
    }

    visitNumeral(node: Z3_ast): ImmMap<string, Z3Formula> {
        return ImmMap<string, Z3Formula>([]);
    }

    visitQuantifier(node: Z3_ast): ImmMap<string, Z3Formula> {
        throw new ImplementMeException();
    }

    visitSort(node: Z3_ast): ImmMap<string, Z3Formula> {
        return ImmMap<string, Z3Formula>([]);
    }

    visitUnknown(node: Z3_ast): ImmMap<string, Z3Formula> {
        throw new ImplementMeException();
    }

}


