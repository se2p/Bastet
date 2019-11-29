import path from "path";
import {InvalidInputFormatException} from "../../core/exceptions/InvalidInputFormatException";
import {NotSupportedException} from "../../core/exceptions/NotSupportedException";

export class ProgramParserFactory {

    private static readonly fileParserMapping = {
        ".sc" : function(filepath: string) {
            return
        },
        ".sb2": function(filepath: string) {
            throw new NotSupportedException("Support from Scratch project files is not yet implemented");
        }
    };

    public static createParserFor(filepath: string) {
        let ext : string = path.extname(filepath);
        let parseFunction = this.fileParserMapping[ext] || null;

        if (!parseFunction) {
            throw new InvalidInputFormatException("The given file does not map to a parser: " + filepath);
        }

        return parseFunction(filepath);
    }

}
