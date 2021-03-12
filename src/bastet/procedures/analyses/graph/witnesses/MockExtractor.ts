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
import {ConcreteProgramState, ThreadState} from "../../control/ConcreteProgramState";
import {AssignmentMock, Mock, ReturnValueMock} from "./ErrorWitness";

/**
 * Can be applied to error paths to generate mocks of (probabilistic) functions. These mocks are useful in case one
 * wants to crate a replay-able error witness for a violation that Bastet found.
 */
export interface MockExtractor {

    /**
     * Processes the given transition label between two states of an error witness path. Note that a single label can
     * consist of multiple program operations due to the inherently parallel nature of Scratch programs (e.g., one
     * operation per actor). The successor state is reached after executing the operations described by the transition
     * label.
     *
     * @param transitionLabel TODO
     * @param successorState TODO
     */
    processOperations(transitionLabel: [ThreadState, ProgramOperation][], successorState: ConcreteProgramState): void;

    getMock(): Mock
}

/** A mock extractor for the `randomBetween` block. */
export class RandomIntegerMockExtractor implements MockExtractor {

    private readonly _methodName: string = "randomBetween";

    /**
     * The values to be returned by the mock. Works similar to Mockito chain stubbing: the first call will return the
     * first number in the array, the second call the second number, and so on.
     */
    private readonly _returnValues: number[] = [];

    /**
     * Whether the method to mock has already been encountered while processing the transition labels of a given path.
     * error witness path.
     */
    private _methodEncountered: boolean = false;

    processOperations(transitionLabel: [ThreadState, ProgramOperation][], successorState: ConcreteProgramState): void {
        /*
         * A transition label consists of possibly multiple ASTs. We are interested in two kinds of ASTs: first, we need
         * to look for a call statement that calls the method that should be mocked. Afterwards, we expect to find a
         * corresponding return statement as transition label somewhere in the tail of the error witness path.
         * Inspecting this return statement allows us to obtain the return value that was chosen for the mocked method
         * by the SMT solver.
         */
        for (const [threadState, operation] of transitionLabel) {
            const ast = operation.ast;
            if (!this._methodEncountered && ast instanceof CallStatement) { // method to mock has been called
                const callStmt = ast as CallStatement;
                const methodName = callStmt.calledMethod.text;
                if (this._methodName === methodName) {
                    this._methodEncountered = true;
                }
            } else if (this._methodEncountered && ast instanceof ReturnStatement) { // method to mock has returned
                const returnStmt = ast as ReturnStatement;
                Preconditions.checkState(returnStmt.resultVariable.isPresent(),
                    `return value for ${this._methodName} should have been present`);
                const resultVariable = returnStmt.resultVariable.value();

                const resultValue = successorState.getValueFor(resultVariable).value;
                Preconditions.checkState(Number.isInteger(resultValue),
                    `result of calling ${this._methodName} should have been an integer`);
                this._returnValues.push(resultValue);

                this._methodEncountered = false;
            }
        }
    }

    getMock(): Mock {
        return new ReturnValueMock<number>(this._methodName, this._returnValues);
    }
}

/** A mock extractor for the `goToRandomPosition` block. */
export class RandomPositionMockExtractor implements MockExtractor {

    private readonly _methodName: string = "goToRandomPosition";

    /** The x- and y-coordinates returned by "goToRandomPosition", grouped by actor. */
    private readonly _coordinates: Map<string, {"x": number, "y": number}[]>
        = new Map<string, {x: number; y: number}[]>();

    /** Models a call stack for every thread (identified by its actor name). */
    private readonly _callStacks: Map<string, string[]> = new Map<string, string[]>();

    processOperations(operations: [ThreadState, ProgramOperation][], cp: ConcreteProgramState): void {
        for (const [threadState, operation] of operations) {
            const actorName = threadState.getActorId();
            const ast = operation.ast;

            if (ast instanceof CallStatement) {
                const callStmt = ast as CallStatement;
                const methodName = callStmt.calledMethod.text;

                // We need to group the methods calls by actors. Invoking "goToRandomPosition" changes the state of
                // the current actor (as opposed to "randomBetween", which does not expose any side effects to the
                // outside world.) Moreover, the scheduler might interleave method calls of different actors.
                if (this._callStacks.has(actorName)) {
                    this._callStacks.get(actorName).push(methodName);
                } else {
                    this._callStacks.set(actorName, [methodName]);
                }
            } else if (ast instanceof ReturnStatement) {
                Preconditions.checkState(this._callStacks.has(actorName),
                    "there should have been a call statement prior to the return statement")
                const methodName = this._callStacks.get(actorName).pop();
                if (this._methodName === methodName) {
                    // When "goToRandomPosition" is popped off the stack again we know that the new x- and y-coordinate
                    // are now readily available in the actor memory.
                    const xVal = cp.getActorMemory(actorName).getValue("x").value;
                    const yVal = cp.getActorMemory(actorName).getValue("y").value;

                    Preconditions.checkState(Number.isInteger(xVal),
                        `x-coordinate of ${this._methodName} should have been a number`);
                    Preconditions.checkState(Number.isInteger(yVal),
                        `y-coordinate of ${this._methodName} should have been a number`);

                    const coordinates = {"x": xVal, "y": yVal};
                    if (this._coordinates.has(actorName)) {
                        this._coordinates.get(actorName).push(coordinates);
                    } else {
                        this._coordinates.set(actorName, [coordinates]);
                    }
                }
            }
        }
    }

    getMock(): Mock {
        const assignments = [];
        for (const [actorName, values] of this._coordinates.entries()) {
            assignments.push({"actor": actorName, "assigns": values, "index": 0})
        }
        return new AssignmentMock(this._methodName, assignments);
    }
}
