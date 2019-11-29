import {ProgramContext} from "./grammar/ScratchParser";

export interface ProgramParser {

    parseFile(filepath: string): ProgramContext;

    parseSource(basename: string, sourcecode: string): ProgramContext;

}
