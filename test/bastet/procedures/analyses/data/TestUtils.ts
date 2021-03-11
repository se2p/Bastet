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
import path from "path"
import {Bastet} from "../../../../../src/bastet/Bastet";
import {AnalysisResult, MultiPropertyAnalysisResult} from "../../../../../src/bastet/procedures/AnalysisProcedure";

const intermediateRelPath = "../../../../../src/public/library.sc";
const intermediatePath = path.join(__dirname, intermediateRelPath);

const configRelPath = "../../../../../config/default.json";
const configFilePath = path.join(__dirname, configRelPath);

const ciConfigRelPath = "../../../../../config/ci.delta.json";
const ciConfigFilePath = path.join(__dirname, ciConfigRelPath);

const specRelPath = "../../../../specs/empty.sc";
const specFilePath = path.join(__dirname, specRelPath);

let timeout: number = 20000; // in milliseconds
export {timeout, execFixture, execute, execute_explicit};

function execFixture(fixturePath: string, done) {
    const bastet = new Bastet();
    execute(bastet, fixturePath, done)
}

function execute(bastet: Bastet, fixturePath: string, done) {
    try {
        if (fixturePath.endsWith("_SAFE.sc")) {
            execute_explicit(bastet, fixturePath, true, done);
        } else if (fixturePath.endsWith("_UNSAFE.sc")) {
            execute_explicit(bastet, fixturePath, false, done);
        } else {
            fail("Fixture file does not fit naming scheme")
        }
    } finally {
        done();
    }
}

function execute_explicit(bastet: Bastet, fixturePath: string, expectSuccess: boolean, done) {
    async function asyncAwaitFunction(): Promise<AnalysisResult> {
        return await bastet.runFor([configFilePath, ciConfigFilePath], intermediatePath, fixturePath, specFilePath);
    }

    asyncAwaitFunction().then(result => {
            const analysisResult: MultiPropertyAnalysisResult = result as MultiPropertyAnalysisResult;
            if (expectSuccess) {
                expect(analysisResult.satisfied.size).toBeGreaterThan(0)
            } else {
                expect(analysisResult.violated.size).toBeGreaterThan(0)
            }
            done();
        }
    );
}
