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
import {Broadcast, BroadcastVisitor} from "../../../../syntax/ast/BroadcastVisitor";
import {ThreadState} from "../../control/ConcreteProgramState";

export interface ActionExtractor {
    /**
     * Processes new operations that took place before the step.
     * @param operations
     * @param step
     */
    processOperations(operations: [ThreadState, ProgramOperation][], step: ErrorWitnessStep): void;

    /**
     * Sets an action for the step if necessary and can return an extra predecessor to be inserted before the step.
     * @param step
     * @param successors
     */
    setActionForStep(step: ErrorWitnessStep, successors: ErrorWitnessStep[]): ErrorWitnessStep|void;
}

export abstract class BroadcastActionExtractor implements ActionExtractor {
    protected readonly _broadcast: string;
    protected readonly _stepToBroadcasts: Map<number, Broadcast[]> = new Map<number, Broadcast[]>();
    private readonly _broadcastVisitor = new BroadcastVisitor();

    protected constructor(broadcast: string) {
        this._broadcast = broadcast;
    }

    processOperations(operations: [ThreadState, ProgramOperation][], step: ErrorWitnessStep): void {
        const broadcasts = operations.map(([ts, operation]) => operation.ast.accept(this._broadcastVisitor))
            .filter(broadcast => broadcast && broadcast.id === this._broadcast);
        this._stepToBroadcasts.set(step.id, broadcasts);
    }

    abstract setActionForStep(step: ErrorWitnessStep, successors: ErrorWitnessStep[]): ErrorWitnessStep | void;
}

export class SpriteClickBroadcastActionExtractor extends BroadcastActionExtractor {

    constructor() {
        super('SPRITE_CLICK');
    }

    setActionForStep(step: ErrorWitnessStep, successors: ErrorWitnessStep[]): ErrorWitnessStep | void {
        const broadcastsAtStep = this._stepToBroadcasts.get(step.id);

        if (broadcastsAtStep.length > 0) {
            step.action = Action.MOUSE_UP;
            const clone = step.clone();
            clone.id = clone.id * -1;
            clone.action = Action.MOUSE_DOWN;
            return clone;
        }
    }
}

export abstract class QueryMethodActionExtractor implements ActionExtractor {

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

    processOperations(operations: [ThreadState, ProgramOperation][], step: ErrorWitnessStep): void {
        const readEvent = operations
            .map(([ts, o]) => o.ast.accept(this._visitor))
            .reduce((prev, cur) => prev.combine(cur));

        if (readEvent.readFrom) {
            this._actionMethodReadFrom.push(readEvent.readFrom);
        }

        const assignments = operations
            .map(([ts, op]) => op.ast.accept(new MethodCallAssignmentVisitor()))
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

                this.setActionForStepInternal(step, variableValue, assignmentWithReadEvent);
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

    protected abstract setActionForStepInternal(step: ErrorWitnessStep, actionValue, assignment: Assignment): void;
}

export class MouseXActionExtractor extends QueryMethodActionExtractor {
    constructor() {
        super('mouseX', 'getMouseX');
    }

    protected setActionForStepInternal(step: ErrorWitnessStep, actionValue): void {
        step.action = Action.MOUSE_MOVE;

        if (!step.mousePosition) {
            step.mousePosition = { x: actionValue, y: undefined };
        } else {
            step.mousePosition.x = actionValue;
        }
    }
}

export class MouseYActionExtractor extends QueryMethodActionExtractor {
    constructor() {
        super('mouseY', 'getMouseY');
    }

    protected setActionForStepInternal(step: ErrorWitnessStep, actionValue): void {
        step.action = Action.MOUSE_MOVE;

        if (!step.mousePosition) {
            step.mousePosition = { x: undefined, y: actionValue };
        } else {
            step.mousePosition.y = actionValue;
        }
    }
}

export class MouseDownActionExtractor extends QueryMethodActionExtractor {
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

export class AnswerActionExtractor extends QueryMethodActionExtractor {
    constructor() {
        super('answer', 'integerAnswer');
    }

    protected setActionForStepInternal(step: ErrorWitnessStep, actionValue): void {
        step.action = Action.ANSWER;
        step.answer = actionValue;
    }
}

export class KeyPressedActionExtractor extends QueryMethodActionExtractor {
    constructor() {
        super('keyPressedByCode', 'keyPressedByCodeNondet');
    }

    protected setActionForStepInternal(step: ErrorWitnessStep, actionValue, assignment: Assignment): void {
        step.action = actionValue ? Action.KEY_DOWN : Action.KEY_UP;

        const scopedKeyCodeVariableActorAndSSA = assignment.methodParameters[0];

        const unwrapped = DataLocationScoper.rightUnwrapScope(scopedKeyCodeVariableActorAndSSA).prefix;

        step.keyPressed = step.getVariableValue(step.actionTargetName, unwrapped);
    }
}
