/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net),
 *   see the file CONTRIBUTORS.md for the list of contributors.
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
import assert from 'node:assert/strict';
import path from 'path';
import { Bastet } from '../../../../../src/bastet/Bastet';
import { AnalysisResult, MultiPropertyAnalysisResult } from '../../../../../src/bastet/procedures/AnalysisProcedure';

const intermediateRelPath = '../../../../../src/public/library.sc';
const intermediatePath = path.join(__dirname, intermediateRelPath);

const configRelPath = '../../../../../config/default.json';
const configFilePath = path.join(__dirname, configRelPath);

const ciConfigRelPath = '../../../../../config/ci.delta.json';
const ciConfigFilePath = path.join(__dirname, ciConfigRelPath);

const specRelPath = '../../../../specs/empty.sc';
const specFilePath = path.join(__dirname, specRelPath);

let timeout: number = 120000; // in milliseconds
export { timeout, execFixture, execute, execute_explicit };

async function execFixture(
    fixturePath: string,
    configurationFilepaths: string[] = [configFilePath, ciConfigFilePath],
    libraryFilepath: string = intermediatePath
): Promise<void> {
    const bastet = new Bastet();
    await execute(bastet, fixturePath, configurationFilepaths, libraryFilepath);
}

async function execute(
    bastet: Bastet,
    fixturePath: string,
    configurationFilepaths: string[] = [configFilePath, ciConfigFilePath],
    libraryFilepath: string = intermediatePath
): Promise<void> {
    if (fixturePath.endsWith('_SAFE.sc')) {
        await execute_explicit(bastet, fixturePath, true, configurationFilepaths, libraryFilepath);
    } else if (fixturePath.endsWith('_UNSAFE.sc')) {
        await execute_explicit(bastet, fixturePath, false, configurationFilepaths, libraryFilepath);
    } else {
        throw new Error('Fixture file does not fit the _SAFE.sc/_UNSAFE.sc naming scheme');
    }
}

async function execute_explicit(
    bastet: Bastet,
    fixturePath: string,
    expectSuccess: boolean,
    configurationFilepaths: string[] = [configFilePath, ciConfigFilePath],
    libraryFilepath: string = intermediatePath
): Promise<void> {
    const result: AnalysisResult = await bastet.runFor(
        configurationFilepaths,
        libraryFilepath,
        fixturePath,
        specFilePath
    );
    const analysisResult = result as MultiPropertyAnalysisResult;

    if (expectSuccess) {
        assert.ok(analysisResult.satisfied.size > 0);
    } else {
        assert.ok(analysisResult.violated.size > 0);
    }
}
