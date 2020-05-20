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


import {WitnessHandler} from "../../WitnessHandlers";
import {GraphAbstractState} from "../GraphAbstractDomain";
import {ReachedSet} from "../../../algorithms/StateSet";
import {Preconditions} from "../../../../utils/Preconditions";
import {GraphReachedSetWrapper} from "../GraphStatesSetWrapper";
import {TransitionLabelProvider, WrappingProgramAnalysis} from "../../ProgramAnalysis";
import {ConcreteElement, ConcreteMemory} from "../../../domains/ConcreteElements";
import {IllegalArgumentException} from "../../../../core/exceptions/IllegalArgumentException";
import {SSAStateVisitor} from "../../StateVisitors";
import {Map as ImmMap, Set as ImmSet} from "immutable";
import {MouseReadEvent, MouseReadEventVisitor} from "../../../../syntax/ast/MouseReadEventVisitor";
import {App} from "../../../../syntax/app/App";
import {ControlAbstractState, RelationLocation} from "../../control/ControlAbstractDomain";
import {ControlLocationExtractor} from "../../control/ControlUtils";
import {Action, ErrorWitnessActionVisitor} from "../../../../syntax/ast/ErrorWitnessActionVisitor";
import {CorePrintVisitor} from "../../../../syntax/ast/CorePrintVisitor";
import {ErrorWitness, ErrorWitnessStep, MousePosition, Target} from "./ErrorWitness";
import {AccessibilityRelation, AccessibilityRelations} from "../../Accessibility";
import {Property} from "../../../../syntax/Property";
import {getTheOnlyElement} from "../../../../utils/Collections";
import {VAR_SCOPING_SPLITTER} from "../../../../syntax/app/controlflow/DataLocation";

export class WitnessExporter implements WitnessHandler<GraphAbstractState> {

    private static readonly IRRELEVANT_USER_DEFINED_ATTRIBUTES = ['PI', 'TWO_PI', 'PI_HALF', 'PI_SQR_TIMES_FIVE',
        'KEY_ENTER', 'KEY_SPACE', 'KEY_ANY', 'KEY_LEFT', 'KEY_UP', 'KEY_DOWN', 'KEY_LEFT', 'KEY_RIGHT'];

    private readonly _analysis: WrappingProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>;
    private readonly _tlp: TransitionLabelProvider<GraphAbstractState>;
    private readonly _task: App;
    private readonly _controlLocationExtractor: ControlLocationExtractor;

    constructor(analysis: WrappingProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>,
                tlp: TransitionLabelProvider<GraphAbstractState>, task: App) {
        this._analysis = analysis;
        this._tlp = tlp;
        this._task = task;
        this._controlLocationExtractor = new ControlLocationExtractor(task);
    }

    handleViolatingState(reached: ReachedSet<GraphAbstractState>, violating: GraphAbstractState) {
        Preconditions.checkArgument(reached instanceof GraphReachedSetWrapper);
        const ar: GraphReachedSetWrapper<GraphAbstractState> = reached as GraphReachedSetWrapper<GraphAbstractState>;
        const testified = this._analysis.testifyOne(ar, violating);
        this.exportPath(testified, violating);
    }

    private exportPath(pathAr: AccessibilityRelation<GraphAbstractState, GraphAbstractState>, violating: GraphAbstractState) {
        const path: GraphAbstractState[] = AccessibilityRelations.mapToArray(pathAr);
        const violatedProperties: Property[] = this._analysis.target(violating);

        const violatingConcreteElement: ConcreteElement = pathAr.concretizer().concretizeOne(violating);
        Preconditions.checkArgument(violatingConcreteElement instanceof ConcreteMemory);
        const errorState: ConcreteMemory = violatingConcreteElement as ConcreteMemory;

        const errorWitness = new ErrorWitness();
        errorWitness.violations = violatedProperties.map(property => property.getText);

        let previousState: GraphAbstractState = undefined;
        let mousePosition: MousePosition = new MousePosition(0, 0);
        const errorWitnessActionVisitor = new ErrorWitnessActionVisitor();
        const labelPrintVisitor = new CorePrintVisitor();
        const mouseReadEventVisitor = new MouseReadEventVisitor();
        const ssaStateVisitor = new SSAStateVisitor();

        for (const currentState of path) {
            const step = new ErrorWitnessStep();
            const relationLocation = this.getRelationLocationForState(currentState);
            step.actionTargetName = relationLocation ? relationLocation.getActorId() : undefined;

            const ssaState = currentState.accept(ssaStateVisitor);
            const memoryInStep = ssaState.getPrimitiveAttributes(errorState);
            const targetStates = WitnessExporter.groupByTargets(memoryInStep);
            const globalTime = memoryInStep.get("__global_time_micros");
            step.timestamp = globalTime ? globalTime.value : 0;

            targetStates.forEach((state, targetName) => {
                const target = Target.fromConcretePrimitives(targetName, state);
                target.removeUserDefinedAttributes(WitnessExporter.IRRELEVANT_USER_DEFINED_ATTRIBUTES);
                step.targets.push(target);
            })

            if (previousState) {
                const actionWithArgs = this._tlp.getTransitionLabel(previousState, currentState)
                    .map(o => o.ast.accept(errorWitnessActionVisitor))
                    .reduce((prev, cur) => {
                        if (prev.weight > cur.weight) {
                            return prev;
                        } else {
                            return cur;
                        }
                    });

                step.action = actionWithArgs.action;

                step.actionLabel = this._tlp.getTransitionLabel(previousState, currentState)
                    .map(o => o.ast.accept(labelPrintVisitor))
                    .join("; ");
                const mouseEvent: MouseReadEvent = this._tlp.getTransitionLabel(previousState, currentState)
                    .map(o => o.ast.accept(mouseReadEventVisitor))
                    .reduce((prev, cur) => prev.combine(cur));

                if (mouseEvent) {
                    const mouseX = mouseEvent.readXFrom ? WitnessExporter.mapToTargetName(WitnessExporter.removeSSAIndex(mouseEvent.readXFrom)).attribute : undefined;
                    const mouseY = mouseEvent.readYFrom ? WitnessExporter.mapToTargetName(WitnessExporter.removeSSAIndex(mouseEvent.readYFrom)).attribute : undefined;

                    const x = mouseX ? step.getUserDefinedAttributeValue(step.actionTargetName, mouseX) : mousePosition.x;
                    const y = mouseY ? step.getUserDefinedAttributeValue(step.actionTargetName, mouseY) : mousePosition.y;
                    mousePosition = new MousePosition(x, y);
                }
            }

            step.mousePosition = mousePosition;

            errorWitness.steps.push(step);
            previousState = currentState;
        }

        errorWitness.steps = errorWitness.steps.filter(witness => !witness.isEmpty());
        errorWitness.steps = WitnessExporter.removeIrrelevantTransitions(errorWitness.steps);
        WitnessExporter.setMouseInputAction(errorWitness.steps);
        WitnessExporter.addWaitSteps(errorWitness.steps);
        errorWitness.steps = errorWitness.steps.filter(step => step.action !== Action.DECLARE);
        errorWitness.steps = WitnessExporter.buildInitialStep(errorWitness.steps);
        errorWitness.steps = errorWitness.steps.filter(step => step.action !== Action.DEFINE && step.action !== Action.EPSILON);

        this.exportErrorWitness(errorWitness);
    }

    private static mapGraphAbstractStateToControlAbstractState(graphAbstractState: GraphAbstractState): ControlAbstractState {
        let abstractState: any = graphAbstractState;
        while (abstractState && !(abstractState instanceof ControlAbstractState)) {
            abstractState = abstractState.getWrappedState();
        }

        return abstractState as ControlAbstractState;
    }

    private getRelationLocationForState(graphAbstractState: GraphAbstractState): RelationLocation {
        const controlAbstractState = WitnessExporter.mapGraphAbstractStateToControlAbstractState(graphAbstractState);
        const controlLocations: ImmSet<RelationLocation> = this._controlLocationExtractor.visitControlAbstractState(controlAbstractState);

        return getTheOnlyElement(controlLocations);
    }

    private static groupByTargets<T>(map: ImmMap<string, T>): Map<string, Map<string, T>> {
        const targets = new Map<string, Map<string, T>>();

        map.forEach((value, attributeWithTarget) => {
            if (this.isTargetAttribute(attributeWithTarget)) {
                const {attribute, target} = WitnessExporter.mapToTargetName(attributeWithTarget);

                let targetMap = targets.get(target);
                if (!targetMap) {
                    targetMap = new Map<string, T>();
                }

                targetMap.set(attribute, value);
                targets.set(target, targetMap);
            } else {
                // TODO figure out what to do with other attributes (__op_time_129, ...)
            }
        })

        return targets;
    }

    private static removeSSAIndex(attributeWithSSA: string): string {
        const indexLastAt = attributeWithSSA.lastIndexOf(VAR_SCOPING_SPLITTER);

        return  attributeWithSSA.substring(0, indexLastAt);
    }

    private static mapToTargetName(attributeWithTargetName: string): {attribute: string, target: string} {
        const indexFirstAt = attributeWithTargetName.indexOf(VAR_SCOPING_SPLITTER);
        const indexLastAt = attributeWithTargetName.lastIndexOf(VAR_SCOPING_SPLITTER);

        if (indexFirstAt < 0 || indexLastAt < 0) {
            throw new IllegalArgumentException("Attribute name didnt contain target name");
        }

        const target = attributeWithTargetName.substring(0, indexFirstAt);
        const attribute = attributeWithTargetName.substring(indexLastAt + 1);
        return {attribute, target};
    }

    private static isTargetAttribute(attribute: string): boolean {
        return attribute.includes(VAR_SCOPING_SPLITTER);
    }

    private static setMouseInputAction(steps: ErrorWitnessStep[]): void {
        let prevMousePos: MousePosition = undefined;

        for (const step of steps) {
            const currMousePos = step.mousePosition;

            if (prevMousePos && (prevMousePos.x !== currMousePos.x || prevMousePos.y !== currMousePos.y)) {
                step.action = Action.MOUSE_INPUT;
            }

            prevMousePos = currMousePos;
        }
    }

    private static removeIrrelevantTransitions(steps: ErrorWitnessStep[]): ErrorWitnessStep[] {
        const filteredArray = [];

        let previous = null;
        let current = steps[0];
        let index = 0;
        while (current != undefined) {
            if (current.relevantTransition(previous)) {
                filteredArray.push(current);
                previous = current;
            }
            index++;
            current = steps[index];
        }

        return filteredArray;
    }

    private static addWaitSteps(steps: ErrorWitnessStep[]) {
        let prevStep: ErrorWitnessStep = null;

        for (const step of steps) {
            if (prevStep) {
                const timeStampDiff = step.timestamp - prevStep.timestamp;

                if (timeStampDiff > 1000) {
                    step.action = Action.WAIT;
                    step.waitMicros = timeStampDiff;
                }
            }

            prevStep = step;
        }
    }

    private static buildInitialStep(steps: ErrorWitnessStep[]): ErrorWitnessStep[] {
        const filteredArray = [];

        // Combine first set of uninterrupted defines
        let buildInitialStep = false;
        let initialStep: ErrorWitnessStep = undefined;
        for (const step of steps) {
            if (!buildInitialStep) {
                if (step.action === Action.DEFINE) {
                    initialStep = step;
                } else {
                    buildInitialStep = true;
                    initialStep.action = Action.INITIAL_STATE;
                    filteredArray.push(initialStep);
                    filteredArray.push(step);
                }
            } else {
                filteredArray.push(step);
            }
        }

        return filteredArray;
    }

    private exportErrorWitness(errorWitness: ErrorWitness) {
        let fs = require('fs');
        fs.writeFileSync("output/error-witness.json", JSON.stringify(errorWitness, null, 2));
    }
}
