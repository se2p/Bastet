import {CharStreams, CommonTokenStream} from 'antlr4ts';
import {ScratchLexer} from "./grammar/ScratchLexer";
import {ProgramContext, ScratchParser} from "./grammar/ScratchParser";
import fs from "fs";
import path from "path";
import {ProgramParser} from "./ProgramParser";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";
import {Preconditions} from "../../utils/Preconditions";

export class TextualProgramParser implements ProgramParser {

    public parseFile(filepath: string): ProgramContext {
        Preconditions.checkNotEmpty(filepath);

        let basename = path.basename(filepath);
        let sourcecode : string = fs.readFileSync(filepath, 'utf8');

        Preconditions.checkNotEmpty(sourcecode, "Empty source file");

        return this.parseSource(basename, sourcecode);
    }

    /**
     * Create an transformers AST for a given scratch program.
     *
     * @param basename
     * @param sourcecode
     */
    public parseSource(basename: string, sourcecode: string): ProgramContext {
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
