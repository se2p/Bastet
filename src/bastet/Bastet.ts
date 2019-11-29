'use strict';

import {ProgramParserFactory} from "./syntax/parser/ProgramParserFactory";
import {ToIntermediateTransformer} from "./syntax/transformers/ToIntermediateTransformer";
import {ControlFlows} from "./syntax/app/ControlFlows";
import {RuleNode} from "antlr4ts/tree";
import {NotSupportedException} from "./core/exceptions/NotSupportedException";
import {App} from "./syntax/app/App";
import {AnalysisProcedure} from "./analyses/AnalysisProcedure";
import {ProgramParser} from "./syntax/parser/ProgramParser";
import {Preconditions} from "./utils/Preconditions";

const commander = require('commander');

/**
 * The main class of the Main program analysis framework.
 */
export class Bastet {

    /**
     * Runs the requested analysis on a given analysis task.
     *
     * @returns a JSON object with the analysis result.
     */
    public runAnalysis() : {} {
        // Parsing of command line options
        let programArguments = this.parseProgramArguments();
        if (!programArguments) {
            return {};
        }

        // Parse the program (a Scratch program) into an intermediate AST
        let intermediateProgramAST = this.parseIntoIntermediateAST(programArguments.program);

        // Parse the specification (also a Scratch program) into an intermediate AST
        let intermediateSpecAST = this.parseIntoIntermediateAST(programArguments.specification);

        // Create the control-flow structure of the verification task
        let programControlFlow = this.createControlFlowFrom(intermediateProgramAST);
        let specControlFlow = this.createControlFlowFrom(intermediateSpecAST, "__spec");
        let taskControlFlow = ControlFlows.unionOf(programControlFlow, specControlFlow);

        // TODO: Allow for sequences of analysis procedures that can built on the respective previous results.
        // Create the program analysis and program analysis algorithms
        let analysisProcedure = this.createAnalysisProcedure(programArguments);

        // Run the program analysis and return the result
        return analysisProcedure.run(taskControlFlow);
    }

    private createAnalysisProcedure(programArguments) : AnalysisProcedure {
        throw new NotSupportedException("Implement 'createAnalysisProcedure'");
    }

    private parseProgramArguments() : any {
        const program = new commander.Command();
        return program
            .version('0.0.1')
            .option('-d, --debug', 'Debugging mode')
            .requiredOption('-P, --program <required>', 'Program file')
            .requiredOption('-S, --specification <required>', 'Specification file')
            .parse(process.argv);
    }

    /**
     *  Parse a given Scratch program (which can also represent the specification)
     *  into an transformers AST.
     *
     * @param filepath
     */
    private parseIntoIntermediateAST(filepath: string) {
        Preconditions.checkNotEmpty(filepath);

        // Create the parser for the file format
        let scratchParser : ProgramParser = ProgramParserFactory.createParserFor(filepath);

        // Create the RAW AST (no simplifications or generalizations were applied)
        let rawAST = scratchParser.parseFile(filepath);

        // Transform the AST: Replaces specific statements or expressions
        // by generic constructs.
        let transformer = new ToIntermediateTransformer();
        let intermediateAST = transformer.transform(rawAST);

        return intermediateAST;
    }

    private createControlFlowFrom(intermediateSpecAST: RuleNode, actorNamePrefix?: string): App {
        throw new NotSupportedException("Implement 'createControlFlowFrom'");
    }
}


