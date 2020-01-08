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

import {CoreVisitor} from "./CoreVisitor";
import {List as ImmList, Record as ImmRecord} from "immutable"
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";

export interface AstNode {

    accept<R>(visitor: CoreVisitor<R>): R;

    children: AstNode[];

    uniqueName: string;

    childCount: number;

    getChild(index: number): AstNode;

    // @ts-ignore
    toRecord(): ImmList;

    [Symbol.iterator](): IterableIterator<AstNode>;

    toTreeString(): string;
}

export abstract class AbstractNode implements AstNode {

    private readonly _children: AstNode[];

    private treeString: string = null;

    protected constructor(childs: AstNode[]) {
        this._children = childs;
    }

    get children(): AstNode[] {
        return this._children;
    }

    get uniqueName(): string {
        return this.constructor.name;
    }

    get childCount(): number {
        return this._children.length;
    }

    public getChild(index: number): AstNode {
        return this._children[index];
    }

    accept<R>(visitor: CoreVisitor<R>): R {
        const visitMethod: string = `visit${this.constructor.name}`;
        if (visitor[visitMethod]) {
            return visitor[visitMethod](this);
        } else {
            return visitor.visit(this);
        }
    }

    // @ts-ignore
    toRecord(): ImmList {
        throw new ImplementMeException();
    }

    [Symbol.iterator](): IterableIterator<AstNode> {
        return this._children[Symbol.iterator]();
    }

    toTreeString(): string {
        if (!this.treeString) {
            let result: string[] = [this.constructor.name];
            for (let c of this) {
                result.push("{")
                result.push(c.toTreeString())
                result.push("}")
            }
            this.treeString = result.join(" ");
        }
        return this.treeString;
    }

}

export abstract class OptionalAstNode<T extends AstNode> extends AbstractNode {

    protected constructor(childs: AstNode[]) {
        super(childs);
    }

    public static absent<T extends AstNode>(): AbsentAstNode<T> {
        return new AbsentAstNode<T>();
    }

    public static with<T extends AstNode>(node: T): PresentAstNode<T> {
        return new PresentAstNode<T>(node);
    }

}

export class PresentAstNode<T extends AstNode> extends OptionalAstNode<T> {

    private readonly _node: T;

    constructor(node: T) {
        super([node]);
        this._node = node;
    }

    get node(): T {
        return this._node;
    }

}

export class AbsentAstNode<T extends AstNode>  extends OptionalAstNode<T> {

    constructor() {
        super([]);
    }

}



