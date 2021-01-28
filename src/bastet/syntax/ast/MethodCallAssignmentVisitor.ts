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

import {CallStatement} from "./core/statements/CallStatement";
import {CoreVisitor} from "./CoreVisitor";
import {AstNode} from "./AstNode";
import {CorePrintVisitor} from "./CorePrintVisitor";

export interface Assignment {
    variable: string;
    method: string;
    methodParameters: string[];
}

export class MethodCallAssignmentVisitor implements CoreVisitor<Assignment> {
    visit(node: AstNode): Assignment {
        return undefined;
    }

    visitCallStatement(node: CallStatement): Assignment {
        if (node.assignResultTo.isPresent()) {
            return {
                variable: node.assignResultTo.value().accept(new CorePrintVisitor()),
                method: node.calledMethod.text,
                methodParameters: node.args.elements.map(element => element.accept(new CorePrintVisitor()))
            };
        }

        return undefined;
    }
}
