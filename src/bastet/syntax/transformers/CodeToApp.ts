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

import {App} from "../app/App";
import {RuleNode} from "antlr4ts/tree";
import {ToIntermediateTransformer, TypeInformationStorage} from "./ToIntermediateTransformer";
import {AppBuilder} from "../app/AppBuilder";
import {AstNode} from "../ast/AstNode";
import {TextualProgramParser} from "../parser/TextualProgramParser";

export class CodeToApp {

    public static codeToApp(code: string, library: App, config: {}, actorNamePrefix: string = ""): App {
        const scratchParser = new TextualProgramParser();
        const rawAST: RuleNode = scratchParser.parseSource("string", code);
        const transformer = new ToIntermediateTransformer();
        const typeStorage = new TypeInformationStorage();
        const intermAST: AstNode = transformer.transform(library, rawAST, typeStorage, config);
        const ab: AppBuilder = new AppBuilder(library);
        return ab.buildFromSyntaxTree("string", intermAST, typeStorage, actorNamePrefix);
    }

}
