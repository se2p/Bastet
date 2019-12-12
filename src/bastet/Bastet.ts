/*
 *   BASTET Program Analysis Framework
 *
 *   Copyright 2019 by University of Passau
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

'use strict';

import {ProgramParserFactory} from "./syntax/parser/ProgramParserFactory";
import {ToIntermediateTransformer} from "./syntax/transformers/ToIntermediateTransformer";
import {ControlFlows} from "./syntax/app/ControlFlows";
import {NotSupportedException} from "./core/exceptions/NotSupportedException";
import {App} from "./syntax/app/App";
import {AnalysisProcedure} from "./analyses/AnalysisProcedure";
import {ProgramParser} from "./syntax/parser/ProgramParser";
import {Preconditions} from "./utils/Preconditions";
import {AppBuilder} from "./syntax/app/AppBuilder";
import {ProgramContext} from "./syntax/parser/grammar/ScratchParser";
import {AstToDotVisitor} from "./syntax/ast/AstToDotVisitor";

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

        let programFilepath: string = programArguments.program;
        let specFilepath: string = programArguments.specification;

        // Parse the program (a Scratch program) into an intermediate AST
        let intermediateProgramAST = this.parseIntoIntermediateAST("program", programFilepath);

        // Parse the specification (also a Scratch program) into an intermediate AST
        let intermediateSpecAST = this.parseIntoIntermediateAST("spec", specFilepath);

        // Create the control-flow structure of the verification task
        let programControlFlow = this.createControlFlowFrom(programFilepath, intermediateProgramAST, "");
        let specControlFlow = this.createControlFlowFrom(specFilepath, intermediateSpecAST, "__spec");
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
    private parseIntoIntermediateAST(ident: string, filepath: string): ProgramContext {
        Preconditions.checkNotEmpty(filepath);

        // Create the parser for the file format
        const scratchParser : ProgramParser = ProgramParserFactory.createParserFor(filepath);

        // Create the RAW AST (no simplifications or generalizations were applied)
        const rawAST = scratchParser.parseFile(filepath);

        // Transform the AST: Replaces specific statements or expressions
        // by generic constructs.
        const transformer = new ToIntermediateTransformer();
        const intermediateAST = transformer.transform(rawAST);

        Preconditions.checkState(intermediateAST instanceof ProgramContext);

        const toDotVisitor = new AstToDotVisitor();
        intermediateAST.accept(toDotVisitor);
        toDotVisitor.writeToFile(`output/ast_${ident}.dot`);

        return intermediateAST as ProgramContext;
    }

    private createControlFlowFrom(programOrigin: string, intermediateSpecAST: ProgramContext, actorNamePrefix?: string): App {
        return AppBuilder.buildControlFlowsFromSyntaxTree(programOrigin, intermediateSpecAST, actorNamePrefix);
    }
}


