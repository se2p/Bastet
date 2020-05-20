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

'use strict';

import {ProgramParserFactory} from "./syntax/parser/ProgramParserFactory";
import {ControlFlows} from "./syntax/app/ControlFlows";
import {App} from "./syntax/app/App";
import {AnalysisProcedure, AnalysisResult, NullAnalysisResult} from "./procedures/AnalysisProcedure";
import {ProgramParser} from "./syntax/parser/ProgramParser";
import {Preconditions} from "./utils/Preconditions";
import {AppBuilder} from "./syntax/app/AppBuilder";
import {ProgramContext} from "./syntax/parser/grammar/LeilaParser";
import {RuleNode} from "antlr4ts/tree";
import {AstNode} from "./syntax/ast/AstNode";
import {AnalysisProcedureFactory} from "./procedures/AnalysisProcedureFactory";
import {AppToDot} from "./syntax/app/AppToDot";
import {IllegalArgumentException} from "./core/exceptions/IllegalArgumentException";
import {AnalysisStatistics} from "./procedures/analyses/AnalysisStatistics";
import {TypeInformationStorage} from "./syntax/DeclarationScopes";
import {ToIntermediateTransformer} from "./syntax/transformers/ToIntermediateTransformer";
import * as fs from "fs";
import {BastetConfiguration, mergeConfigFilesToJson} from "./utils/BastetConfiguration";
import {ParsingException} from "./core/exceptions/ParsingException";
import {NodeSystemLayer} from "./utils/SystemLayer";

const process = require('process');

const commander = require('commander');

class BastetRootConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, []);
    }

    get outputDir(): string {
        return this.getStringProperty('output-dir', "./output/");
    }

}

/**
 * The main class of the Main program analyses framework.
 */
export class Bastet {

    private parseProgramArguments() : any {
        function commaSeparatedList(value, dummy) {
            return value.split(',');
        }

        const program = new commander.Command();
        return program
            .version('0.0.1')
            .option('-d, --debug', 'Debugging mode')
            .option('-c, --configuration <required>', 'Configuration files, separated by comma', commaSeparatedList)
            .requiredOption('-I, --intermediateLibrary <required>', 'Program file that defines the intermediate functions')
            .requiredOption('-P, --program <required>', 'Program file')
            .requiredOption('-S, --specification <required>', 'Specification file')
            .parse(process.argv);
    }

    /**
     * Runs the requested analyses on a given analyses task.
     *
     * @returns a JSON object with the analyses result.
     */
    public async run() : Promise<AnalysisResult> {
        // Parsing of command line options
        const cmdlineArguments = this.parseProgramArguments();
        if (!cmdlineArguments) {
            return new NullAnalysisResult(new AnalysisStatistics("NULL", {}));
        }

        this.registerOnExitNotifiers();

        const intermLibFilepath: string = cmdlineArguments.intermediateLibrary;
        const programFilepath: string = cmdlineArguments.program;
        const specFilepath: string = cmdlineArguments.specification;
        const configFilepaths: string[] = cmdlineArguments['configuration'] || [ "./config/default.json" ];

        return this.runFor(configFilepaths, intermLibFilepath, programFilepath, specFilepath);
    }

    public registerOnExitNotifiers() {
        process.on('SIGINT', function() {
            console.log("Caught SIGINT signal");
            process.exit();
        });

        process.on('beforeExit', function() {
            console.log("Caught beforeExit signal");
        });
    }

    public async runFor(configFilepath: string[], libraryFilepath: string, programFilepath: string, specFilepath: string) : Promise<AnalysisResult> {
        Preconditions.checkArgument(fs.existsSync(libraryFilepath), "Library File does not exists.");
        Preconditions.checkArgument(fs.existsSync(programFilepath), "Program File does not exists.");
        Preconditions.checkArgument(fs.existsSync(specFilepath), "Spec File does not exists.");

        const config: {} = mergeConfigFilesToJson(configFilepath);

        // Build the static task model
        const staticTaskModel: App = this.buildTaskModel(libraryFilepath, programFilepath, specFilepath, config);

        // Build the analyses procedure as defined by the configuration
        const analysisProcedure = await this.buildAnalysisProcedure(config)
            .catch((e) => { throw new IllegalArgumentException(e); });

        // Run the analyses procedure on the task and return the result
        return this.runAnalysis(staticTaskModel, analysisProcedure);
    }

    private runAnalysis(staticTaskModel: App, analysisProcedure: AnalysisProcedure) : Promise<AnalysisResult> {
        return analysisProcedure.run(staticTaskModel);
    }

    private buildTaskModel(libraryFilepath: string, programFilepath: string, specFilepath: string, config: {}): App {
        const typeStorage = new TypeInformationStorage();

        // Build the set of methods for translating into the intermediate AST
        const staticLibraryModel: App = this.parseFromIntermediateCode("library", libraryFilepath, typeStorage, config);

        // Parse the program (a Scratch program) into an intermediate AST
        const staticProgramModel: App = this.parseFromRawCode("program", programFilepath, staticLibraryModel, typeStorage, config);

        // Parse the specification (also a Scratch program) into an intermediate AST
        const staticSpecModel: App = this.parseFromRawCode("spec", specFilepath, staticLibraryModel, typeStorage, config);

        // Create the control-flow structure of the verification task
        const staticTaskModelWithInheritance: App = ControlFlows.unionOf(staticLibraryModel,
            ControlFlows.unionOf(staticProgramModel, staticSpecModel, "task"), "task_and_library");

        // The intermediate language supports a (simple) version of prototypical inheritance.
        // Dissolve all inheritance relations now such the later analyses steps must not
        // care about handling inheritance.
        const staticTaskModel: App = AppBuilder.removeIrrelevantMethods(
            AppBuilder.dissolveInheritance(staticTaskModelWithInheritance));
        const add: AppToDot = new AppToDot();
        add.exportApp(staticTaskModel, "static");

        return staticTaskModel;
    }

    private async buildAnalysisProcedure(config: {}) : Promise<AnalysisProcedure> {
        // TODO: Allow for sequences of analyses procedures that can built on the respective previous results.
        return AnalysisProcedureFactory.createAnalysisProcedure(config);
    }

    private parseFromIntermediateCode(ident: string, filepath: string, typeStorage: TypeInformationStorage, config: {}): App {
        return this.parseFromRawCode(ident, filepath, App.empty(), typeStorage, config);
    }

    /**
     *  Parse a given Scratch program (which can also represent the specification)
     *  into an transformers AST.
     *
     * @param filepath
     */
    private parseFromRawCode(ident: string, filepath: string,
                             staticLibraryModel: App, typeStorage: TypeInformationStorage,
                             config: {}): App {
        Preconditions.checkNotEmpty(filepath);

        try {
            // Create the parser for the file format
            const scratchParser: ProgramParser = ProgramParserFactory.createParserFor(filepath);

            // Create the RAW AST (no simplifications or generalizations were applied)
            const rawAST: RuleNode = scratchParser.parseFile(filepath);

            // Transform the AST: Replaces specific statements or expressions
            // by generic constructs.
            const transformer = new ToIntermediateTransformer();
            const intermediateAST: AstNode = transformer.transform(staticLibraryModel, rawAST, typeStorage, config, filepath);

            return this.createControlFlowFrom(filepath, intermediateAST, staticLibraryModel, typeStorage);
        } catch (e) {
            if (e instanceof ParsingException) {
                const bn = new NodeSystemLayer().basename(filepath);
                throw new ParsingException(`Parsing '${bn}' failed: ${e.cause}`, e.node);
            } else {
                throw e;
            }
        }
    }

    private createControlFlowFrom(programOrigin: string, intermediateSpecAST: AstNode, libraryModule: App,
                                  typeStorage: TypeInformationStorage): App {
        const ab: AppBuilder = new AppBuilder(libraryModule);
        return ab.buildFromSyntaxTree(programOrigin, intermediateSpecAST, typeStorage);
    }

}


