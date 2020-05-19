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

import path from "path";
import {InvalidInputFormatException} from "../../core/exceptions/InvalidInputFormatException";
import {NotSupportedException} from "../../core/exceptions/NotSupportedException";
import {TextualProgramParser} from "./TextualProgramParser";
import {ProgramParser} from "./ProgramParser";

export class ProgramParserFactory {

    private static readonly fileParserMapping: { [ext:string]: () => ProgramParser } = {
        ".sc" : function(): ProgramParser {
            return new TextualProgramParser();
        },
        ".sb2": function(): ProgramParser {
            throw new NotSupportedException("Support from Scratch project files is not yet implemented");
        }
    };

    public static createParserFor(filepath: string) : ProgramParser {
        let ext : string = path.extname(filepath);
        let parserFactoryMethod = this.fileParserMapping[ext] || null;

        if (!parserFactoryMethod) {
            throw new InvalidInputFormatException("The given file does not map to a parser: " + filepath);
        }

        return parserFactoryMethod();
    }

}
