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
