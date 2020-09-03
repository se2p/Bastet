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
import {ErrorWitnessStep} from "./ErrorWitness";
import {MethodValueReadVisitor} from "../../../../syntax/ast/MethodValueReadVisitor";
import {Assignment, MethodCallAssignmentVisitor} from "../../../../syntax/ast/MethodCallAssignmentVisitor";
import {Preconditions} from "../../../../utils/Preconditions";
import {DataLocationScoper} from "../../control/DataLocationScoping";
import {Action} from "../../../../syntax/ast/ErrorWitnessActionVisitor";

export abstract class ActionExtractor {
    private readonly _actionMethodNames: string[];
    private readonly _visitor: MethodValueReadVisitor;
    private readonly _stepToAssignments: Map<number, Assignment[]> = new Map<number, Assignment[]>();
    /**
     * The array includes the names of all variables that were read inside an if statement and assigned a value from an
     * action method
     */
    private readonly _actionMethodReadFrom: string[] = [];

    /**
     * @param actionMethodNames The names of methods in the 'library.sc' that should be tracked with an ActionValueReadVisitor
     */
    protected constructor(...actionMethodNames: string[]) {
        this._actionMethodNames = actionMethodNames;
        this._visitor = new MethodValueReadVisitor(actionMethodNames);
    }

    /**
     * Processes new operations that took place before the step.
     * @param operations
     * @param step
     */
    processOperations(operations: ProgramOperation[], step: ErrorWitnessStep): void {
        const readEvent = operations
            .map(o => o.ast.accept(this._visitor))
            .reduce((prev, cur) => prev.combine(cur));

        if (readEvent.readFrom) {
            this._actionMethodReadFrom.push(readEvent.readFrom);
        }

        const assignments = operations
            .map(op => op.ast.accept(new MethodCallAssignmentVisitor()))
            .filter(a => a !== undefined);
        this._stepToAssignments.set(step.id, assignments);
    }

    setActionForStep(step: ErrorWitnessStep, successors: ErrorWitnessStep[]): void {
        if (step && step.id !== 0) {
            const assignments = this._stepToAssignments.get(step.id);
            Preconditions.checkNotUndefined(assignments);

            const assignmentWithReadEvent = assignments.find(assignment => this._actionMethodNames.includes(assignment.method) && this._actionMethodReadFrom.includes(assignment.variable));

            if (assignmentWithReadEvent) {
                const variableNameWithoutSSA = DataLocationScoper.rightUnwrapScope(assignmentWithReadEvent.variable).prefix;
                // The value is only defined in the next step
                const variableValue = this.getFirstDefinedVariableValue(variableNameWithoutSSA, successors, step.actionTargetName);

                Preconditions.checkState(variableValue !== undefined, `Unknown variable '${variableNameWithoutSSA}'`)

                this.setActionForStepInternal(step, variableValue);
            }
        }
    }

    private getFirstDefinedVariableValue(variableName: string, steps: ErrorWitnessStep[], targetName: string): any {
        for (const step of steps) {
            const value = step.getVariableValue(targetName, variableName);

            if (value !== undefined) {
                return value;
            }
        }

        throw new Error(`Unknown variable '${variableName}' in '${targetName}'`);
    }

    protected abstract setActionForStepInternal(step: ErrorWitnessStep, actionValue): void;
}

export class MouseXActionExtractor extends ActionExtractor {
    constructor() {
        super('mouseX', 'getMouseX');
    }

    protected setActionForStepInternal(step: ErrorWitnessStep, actionValue): void {
        step.action = Action.MOUSE_MOVE;

        if (!step.mousePosition) {
            step.mousePosition = { x: actionValue, y: 0 };
        } else {
            step.mousePosition.x = actionValue;
        }
    }
}

export class MouseYActionExtractor extends ActionExtractor {
    constructor() {
        super('mouseY', 'getMouseY');
    }

    protected setActionForStepInternal(step: ErrorWitnessStep, actionValue): void {
        step.action = Action.MOUSE_MOVE;

        if (!step.mousePosition) {
            step.mousePosition = { x: 0, y: actionValue };
        } else {
            step.mousePosition.y = actionValue;
        }
    }
}

export class MouseDownActionExtractor extends ActionExtractor {
    constructor() {
        super('mouseDown');
    }

    protected setActionForStepInternal(step: ErrorWitnessStep, actionValue): void {
        if (actionValue) {
            step.action = Action.MOUSE_DOWN;
        } else {
            step.action = Action.MOUSE_UP;
        }
    }
}

export class AnswerActionExtractor extends ActionExtractor {
    constructor() {
        super('answer');
    }

    protected setActionForStepInternal(step: ErrorWitnessStep, actionValue): void {
        step.action = Action.ANSWER;
        step.answer = actionValue;
    }
}

export class KeyPressedActionExtractor extends ActionExtractor {
    constructor() {
        super('keyPressed');
    }

    protected setActionForStepInternal(step: ErrorWitnessStep, actionValue): void {
        step.action = Action.KEY_DOWN;
        step.keyPressed = actionValue;
    }
}
