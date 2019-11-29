#!/usr/bin/env node
'use strict';

import {ProgramParserFactory} from "./bastet/syntax/parser/ProgramParserFactory";
import {ToIntermediateTransformer} from "./bastet/syntax/transformers/ToIntermediateTransformer";
import {ControlFlows} from "./bastet/syntax/app/ControlFlows";
import {RuleNode} from "antlr4ts/tree";
import {NotSupportedException} from "./bastet/core/exceptions/NotSupportedException";
import {App} from "./bastet/syntax/app/App";
import {AnalysisProcedure} from "./bastet/analyses/AnalysisProcedure";

const commander = require('commander');

/**
 * The main class of the Bastet program analysis framework.
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
        throw new NotSupportedException("Implement me");
    }

    private parseProgramArguments() : any {
        const program = new commander.Command();
        let programArguments = program
            .version('0.0.1')
            .option('-d, --debug', 'Debugging mode')
            .option('-P, --program <required>', 'Program file')
            .option('-S, --specification <required>', 'Specification file')
            .parse(process.argv);
        return programArguments;
    }

    /**
     *  Parse a given Scratch program (which can also represent the specification)
     *  into an transformers AST.
     *
     * @param filepath
     */
    private parseIntoIntermediateAST(filepath: string) {
        // Create the parser for the file format
        let scratchParser = ProgramParserFactory.createParserFor(filepath);

        // Create the RAW AST (no simplifications or generalizations were applied)
        let rawAST = scratchParser.parse(filepath);

        // Transform the AST: Replaces specific statements or expressions
        // by generic constructs.
        let transformer = new ToIntermediateTransformer();
        let intermediateAST = transformer.transform(rawAST);

        return intermediateAST;
    }

    private createControlFlowFrom(intermediateSpecAST: RuleNode, actorNamePrefix?: string): App {
        throw new NotSupportedException("Implement me");
    }
}

var bastet = new Bastet();
let analysisResult = bastet.runAnalysis();
