import {ANTLRInputStream, CharStreams, CommonTokenStream} from 'antlr4ts';
import {ScratchLexer} from "./grammar/ScratchLexer";
import {ProgramContext, ScratchParser} from "./grammar/ScratchParser";
import fs from 'fs';
import path from 'path';

export class TextualProgramParser {

    public parseScratchProgramFromFile(filepath: string): ProgramContext {
        let basename = path.basename(filepath);
        let sourcecode : string;
        fs.readFile(filepath, function (err, data) {
            if (err) {
                throw new Error("Reading file failed: " + err);
            }
            sourcecode = data.toString('utf8');
        });
        return this.parseScratchProgram(basename, sourcecode);
    }

    /**
     * Create an intermediate AST for a given scratch program.
     *
     * @param basename
     * @param sourcecode
     */
    public parseScratchProgram(basename: string, sourcecode: string): ProgramContext {
        // Create a character stream and the lexer
        let inputStream = CharStreams.fromString(sourcecode);
        let lexer = new ScratchLexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);

        // Create the parser
        let parser = new ScratchParser(tokenStream);

        // Parse the program and construct the AST
        let programContext = parser.program();

        return programContext;
    }

}
