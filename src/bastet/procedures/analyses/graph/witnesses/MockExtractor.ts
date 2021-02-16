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

import {ProgramOperation} from "../../../../syntax/app/controlflow/ops/ProgramOperation";
import {CallStatement} from "../../../../syntax/ast/core/statements/CallStatement";
import {ReturnStatement} from "../../../../syntax/ast/core/statements/ControlStatement";
import {Preconditions} from "../../../../utils/Preconditions";
import {ConcreteProgramState} from "../../../domains/ConcreteElements";

export interface MockExtractor {
    /**
     * Processes new operations that took place before the step.
     * @param operations
     * @param cp
     */
    // TODO: is cp the predecessor or successor state (before the operations or after the operations)?
    processOperations(operations: ProgramOperation[], cp: ConcreteProgramState): void;
}

export class RandomIntegerMockExtractor implements MockExtractor {

    /** The (aliased) name(s) of the (LeiLa) method this extractor should create a mock for. */
    private readonly _methodNames: string[] = ["randomBetween"];

    /**
     * The values to be returned by the mock. Works similar to Mockito chain stubbing: the first call will return the
     * first number in the array, the second call the second number, and so on.
     */
    public readonly _returnValues: number[] = [];

    /**
     * Whether the method to mock has already been encountered while processing the transition labels of a given path.
     * error witness path.
     */
    private _methodEncountered: boolean = false;

    /**
     * Processes a single transition label of an error witness path. Note that a single label can consist of multiple
     * program operations due to the inherently parallel nature of Scratch programs (e.g., one label per actor).
     *
     * @param transitionLabel TODO
     * @param cp TODO
     */
    processOperations(transitionLabel: ProgramOperation[], cp: ConcreteProgramState): void {
        /*
         * A transition label consists of possibly multiple ASTs. We are interested in two kinds of ASTs: first, we need
         * to look for a call statement that calls the method that should be mocked. Afterwards, we expect to find a
         * corresponding return statement as transition label somewhere in the tail of the error witness path.
         * Inspecting this return statement allows us to obtain the return value that was chosen for the mocked method
         * by the SMT solver.
         */
        for (const programOperation of transitionLabel) {
            const ast = programOperation.ast;
            if (!this._methodEncountered && ast instanceof CallStatement) { // method to mock has been called
                const callStmt = ast as CallStatement;
                const methodName = callStmt.calledMethod.text;
                if (this._methodNames.includes(methodName)) {
                    this._methodEncountered = true;
                }
            } else if (this._methodEncountered && ast instanceof ReturnStatement) { // method to mock has returned
                const returnStmt = ast as ReturnStatement;
                Preconditions.checkState(returnStmt.resultVariable.isPresent(),
                    `return value for ${this._methodNames.join(" or ")} should have been present`);
                const resultVariable = returnStmt.resultVariable.value();

                const resultValue = cp.getValueFor(resultVariable).value;
                Preconditions.checkState(Number.isInteger(resultValue),
                    `result of calling ${this._methodNames.join(" or ")} should have been an integer`);
                this._returnValues.push(resultValue);

                this._methodEncountered = false;
            }
        }
    }
}

export class RandomPositionMockExtractor implements MockExtractor {
    private readonly _methodName: string = "goToRandomPosition";

    // TODO: there could be multiple calls for random position per actor and also multiple actors that call the method
    //  -> need to use a dictionary of some sort:
    /*
    private readonly _returnValues = {
        "Cat" : [ { "x" : 42, "y" : 7}, {"x" : 0, "y" : 12} ],
        "Dog" : [ { "x" : 13, "y" : 27}, {"x" : 7, "y" : 23} ] // etc.
    }
     */

    // TODO: for now, we limit ourselves to just a single sprite
    readonly _coordinates: {"x": number, "y": number}[] = [];

    private _methodCallFound: boolean = false;
    private _firstReturnValueFound: boolean = false;

    processOperations(operations: ProgramOperation[], cp: ConcreteProgramState): void {
        for (const operation of operations) {
            const ast = operation.ast;
            if (!this._methodCallFound && ast instanceof CallStatement) {
                const callStmt = ast as CallStatement;
                const methodName = callStmt.calledMethod.text;
                if (this._methodName === methodName) {
                    this._methodCallFound = true;
                }
            } else if (this._methodCallFound && ast instanceof ReturnStatement) {
                const returnStmt = ast as ReturnStatement;
                Preconditions.checkState(returnStmt.resultVariable.isPresent());
                const resultVariable = returnStmt.resultVariable.value();

                const resultValue = cp.getValueFor(resultVariable).value;
                Preconditions.checkState(Number.isInteger(resultValue),
                    `result of calling ${this._methodName} should have been an integer`);
                if (!this._firstReturnValueFound) {
                    this._coordinates.push({"x": resultValue, "y": undefined});
                    this._firstReturnValueFound = true;
                } else {
                    this._coordinates[this._coordinates.length - 1].y = resultValue;

                    // reset
                    this._methodCallFound = false;
                    this._firstReturnValueFound = false;
                }
            }
        }
    }
}
