/*
 *   BASTET Program Analysis Framework
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

import {CoreVisitor} from "./CoreVisitor";
import {List as ImmList, Record as ImmRecord} from "immutable"
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";

export interface AstNode {

    accept<R>(visitor: CoreVisitor<R>): R;

    children: AstNode[];

    uniqueName: string;

    // @ts-ignore
    toRecord(): ImmList;

}

export abstract class AbstractNode implements AstNode {

    private readonly _children: AstNode[];

    protected constructor(childs: AstNode[]) {
        this._children = childs;
    }

    get children(): AstNode[] {
        return this._children;
    }

    get uniqueName(): string {
        return this.constructor.name;
    }

    accept<R>(visitor: CoreVisitor<R>): R {
        return visitor.visit(this);
    }

    // @ts-ignore
    toRecord(): ImmList {
        throw new ImplementMeException();
    }

}


