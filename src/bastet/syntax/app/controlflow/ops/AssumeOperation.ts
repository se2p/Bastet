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

import {ProgramOperation} from './ProgramOperation'
import {RuleNode} from "antlr4ts/tree";

export class AssumeOperation extends ProgramOperation {

    constructor(ast: RuleNode) {
        super(ast);
    }

    toString(): string {
        return `[${this.ast.toStringTree()}]`;
    }

}
