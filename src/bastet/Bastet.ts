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
import {
    ActorDefinitionContext,
    ImportAllActorsContext,
    ImportSelectedActorContext, MethodDefinitionContext,
    ProgramContext, ResourceLocatorContext
} from "./syntax/parser/grammar/ScratchParser";
import {RawAstToDotVisitor} from "./syntax/parser/RawAstToDotVisitor";
import {RuleNode} from "antlr4ts/tree";
import {AstNode} from "./syntax/ast/AstNode";
import {AstToDotVisitor} from "./syntax/ast/AstToDotVisitor";
import {RawAstQuery} from "./syntax/parser/RawAstQuery";
import * as path from "path";

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
        const programArguments = this.parseProgramArguments();
        if (!programArguments) {
            return {};
        }

        const intermLibFilepath: string = programArguments.intermediateLibrary;
        const programFilepath: string = programArguments.program;
        const specFilepath: string = programArguments.specification;

        // Build the set of methods for translating into the intermediate AST
        const staticLibraryModel: App = this.parseFromIntermediateCode("library", intermLibFilepath);

        // Parse the program (a Scratch program) into an intermediate AST
        const staticProgramModel: App = this.parseFromRawCode("program", "", programFilepath, staticLibraryModel);

        // Parse the specification (also a Scratch program) into an intermediate AST
        const staticSpecModel: App = this.parseFromRawCode("spec", "__spec", specFilepath, staticLibraryModel);

        // Create the control-flow structure of the verification task
        const staticTaskModel: App = ControlFlows.unionOf(staticLibraryModel, ControlFlows.unionOf(staticProgramModel, staticSpecModel));

        // TODO: Allow for sequences of analysis procedures that can built on the respective previous results.

        // Create the program analysis and program analysis algorithms
        const analysisProcedure = this.createAnalysisProcedure(programArguments);

        // Run the program analysis and return the result
        return analysisProcedure.run(staticTaskModel);
    }

    private createAnalysisProcedure(programArguments) : AnalysisProcedure {
        throw new NotSupportedException("Implement 'createAnalysisProcedure'");
    }

    private parseProgramArguments() : any {
        const program = new commander.Command();
        return program
            .version('0.0.1')
            .option('-d, --debug', 'Debugging mode')
            .option('-I, --intermediateLibrary', 'Program file that defines the intermediate functions', './src/public/intermediate.sc')
            .requiredOption('-P, --program <required>', 'Program file')
            .requiredOption('-S, --specification <required>', 'Specification file')
            .parse(process.argv);
    }

    private parseFromIntermediateCode(ident: string, filepath: string): App {
        Preconditions.checkNotEmpty(filepath);

        const scratchParser : ProgramParser = ProgramParserFactory.createParserFor(filepath);

        // Create the RAW AST
        const rawAST: RuleNode = scratchParser.parseFile(filepath);
        {
            const rawToDotVisitor = new RawAstToDotVisitor();
            rawAST.accept(rawToDotVisitor);
            rawToDotVisitor.writeToFile(`output/ast_library_raw_${ident}.dot`);
        }
        Preconditions.checkState(rawAST instanceof ProgramContext );

        const transformer = new ToIntermediateTransformer();
        const intermediateAST: AstNode = transformer.transform(App.empty(), rawAST);

        {
            const astToDotVisitor = new AstToDotVisitor();
            intermediateAST.accept(astToDotVisitor);
            astToDotVisitor.writeToFile(`output/ast_library_interm_${ident}.dot`);
        }

        return this.createControlFlowFrom(filepath, intermediateAST, "");
    }

    /**
     *  Parse a given Scratch program (which can also represent the specification)
     *  into an transformers AST.
     *
     * @param filepath
     */
    private parseFromRawCode(ident: string, actorNamePrefix: string, filepath: string, staticLibraryModel: App): App {
        Preconditions.checkNotEmpty(filepath);

        // Create the parser for the file format
        const scratchParser : ProgramParser = ProgramParserFactory.createParserFor(filepath);

        // Create the RAW AST (no simplifications or generalizations were applied)
        const rawAST: RuleNode = scratchParser.parseFile(filepath);

        {
            const rawToDotVisitor = new RawAstToDotVisitor();
            rawAST.accept(rawToDotVisitor);
            rawToDotVisitor.writeToFile(`output/ast_${ident}_raw.dot`);
        }

        // Transform the AST: Replaces specific statements or expressions
        // by generic constructs.
        const transformer = new ToIntermediateTransformer();
        const intermediateAST: AstNode = transformer.transform(staticLibraryModel, rawAST);

        {
            const astToDotVisitor = new AstToDotVisitor();
            intermediateAST.accept(astToDotVisitor);
            astToDotVisitor.writeToFile(`output/ast_${ident}_interm.dot`);
        }

        Preconditions.checkState(intermediateAST instanceof ProgramContext);

        return this.createControlFlowFrom(filepath, intermediateAST, actorNamePrefix);
    }

    private createControlFlowFrom(programOrigin: string, intermediateSpecAST: AstNode, actorNamePrefix?: string): App {
        return AppBuilder.buildControlFlowsFromSyntaxTree(programOrigin, intermediateSpecAST, actorNamePrefix);
    }

}


