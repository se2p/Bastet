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

import {CoreVisitor} from "./CoreVisitor";
import {AstNode} from "./AstNode";
import {BroadcastMessageStatement} from "./core/statements/BroadcastMessageStatement";
import {CorePrintVisitor} from "./CorePrintVisitor";
import {StringExpression, StringLiteral} from "./core/expressions/StringExpression";
import {ImplementMeForException} from "../../core/exceptions/ImplementMeException";

export interface Broadcast {
    id: string;
    destination: string;
}

export class BroadcastVisitor implements CoreVisitor<Broadcast> {
    visit(node: AstNode): Broadcast {
        return undefined;
    }

    visitBroadcastMessageStatement(node: BroadcastMessageStatement): Broadcast {
        const idNode: StringExpression = node.msg.messageid;
        if (!(idNode instanceof StringLiteral)) {
            throw new ImplementMeForException("string expressions that aren't literals.");
        }

        return {
          id: idNode.text,
          destination: node.msg.destination.accept(new CorePrintVisitor())
        };
    }
}
