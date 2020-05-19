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

import {LeilaVisitor} from "./grammar/LeilaVisitor";
import {ErrorNode, ParseTree, RuleNode, TerminalNode} from "antlr4ts/tree";

export class RawAstToDotVisitor implements LeilaVisitor<void> {

    private _dot: string[];
    private _idseq: number;

    constructor() {
        this._dot = [];
        this._idseq = 0;
    }

    visit(tree: ParseTree): void {
        return;
    }

    visitChildren(node: RuleNode): void {
        const nodeNo = node["nodeNo"] || 0;
        this._dot.push(`    ${nodeNo} [label="${node.constructor.name}"];`);

        let i = 0;
        while (i < node.childCount) {
            const child = node.getChild(i);
            child["nodeNo"] = this._idseq++;
            let childNo = child["nodeNo"];
            this._dot.push(`    ${nodeNo} -> ${childNo};`);
            child.accept(this);
            i = i + 1;
        }
        return;
    }

    visitErrorNode(node: ErrorNode): void {
        const nodeNo = this._idseq;
        this._dot.push(`    ${nodeNo} [label="ERROR"];`);
        return;
    }

    visitTerminal(node: TerminalNode): void {
        const nodeNo = this._idseq;
        this._dot.push(`    ${nodeNo} [label="${RawAstToDotVisitor.escpace(node.text)}"];`);
        return;
    }

    public writeToFile(filepath: string): void {
        let fs = require('fs');
        fs.writeFileSync(filepath, `digraph ast {\n` + this._dot.join("\n") + `\n}\n`);
    }

    private static escpace(text: string): string {
        const search = "\"";
        const replacement = "\\\"";
        return text.replace(new RegExp(search, 'g'), replacement);
    }

}

