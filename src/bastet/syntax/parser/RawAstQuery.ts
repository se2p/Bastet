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

import {ErrorNode, ParseTree, RuleNode, TerminalNode} from "antlr4ts/tree";
import {LeilaVisitor} from "./grammar/LeilaVisitor";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";

class QueringVisitor implements LeilaVisitor<RuleNode[]> {

    private readonly pred: (RuleNode) => boolean;

    constructor(pred: (RuleNode) => boolean) {
        this.pred = pred;
    }

    visit(tree: ParseTree): RuleNode[] {
        throw new ImplementMeException();
    }

    visitChildren(node: RuleNode): RuleNode[] {
        let result: RuleNode[] = [];

        if (this.pred(node)) {
            result.push(node);
        } else {
            for (let i=0; i<node.childCount; i++) {
                const child = node.getChild(i);
                result = result.concat(child.accept(this));
            }
        }

        return result;
    }

    visitErrorNode(node: ErrorNode): RuleNode[] {
        throw new ImplementMeException();
    }

    visitTerminal(node: TerminalNode): RuleNode[] {
        return [];
    }

}

export class RawAstQuery {

    public static queryFor(pred: (RuleNode) => boolean, on: RuleNode): RuleNode[] {
        const visitor = new QueringVisitor(pred);
        return on.accept(visitor);
    }

}
