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
import {SSAStateVisitor} from "../../StateVisitors";
import {Map as ImmMap, Set as ImmSet} from "immutable";
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
import {DataLocationScoper} from "../../control/DataLocationScoping";
import {AttributeReadEvent, AttributeReadEventVisitor} from "../../../../syntax/ast/AttributeReadEventVisitor";

export interface WitnessExporterConfig {
    export: 'ALL' | 'ONLY_ACTIONS';
    collapseAtomicBlocks: boolean;
    removeAttributeStartingWith: string[];
    removeActorPrefixFromAttributes: boolean
}

export const DEFAULT_WITNESS_EXPORTER_CONFIG: WitnessExporterConfig = {
    export: 'ONLY_ACTIONS',
    collapseAtomicBlocks: true,
    removeAttributeStartingWith: ['PI', 'TWO_PI', 'PI_HALF', 'PI_SQR_TIMES_FIVE',
        'KEY_ENTER', 'KEY_SPACE', 'KEY_ANY', 'KEY_LEFT', 'KEY_UP', 'KEY_DOWN', 'KEY_LEFT', 'KEY_RIGHT', '__tmp'],
    removeActorPrefixFromAttributes: true
}

export class WitnessExporter implements WitnessHandler<GraphAbstractState> {

    private readonly _analysis: WrappingProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>;
    private readonly _tlp: TransitionLabelProvider<GraphAbstractState>;
    private readonly _task: App;
    private readonly _controlLocationExtractor: ControlLocationExtractor;
    private readonly _config: WitnessExporterConfig;

    constructor(analysis: WrappingProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>,
                tlp: TransitionLabelProvider<GraphAbstractState>, task: App, config: WitnessExporterConfig = DEFAULT_WITNESS_EXPORTER_CONFIG) {
        this._analysis = analysis;
        this._tlp = tlp;
        this._task = task;
        this._controlLocationExtractor = new ControlLocationExtractor(task);
        this._config = config;
    }

    handleViolatingState(reached: ReachedSet<GraphAbstractState>, violating: GraphAbstractState) {
        Preconditions.checkArgument(reached instanceof GraphReachedSetWrapper);
        const ar: GraphReachedSetWrapper<GraphAbstractState> = reached as GraphReachedSetWrapper<GraphAbstractState>;
        const testified = this._analysis.testifyOne(ar, violating);
        this.exportPath(testified, violating);
    }

    private exportPath(pathAr: AccessibilityRelation<GraphAbstractState, GraphAbstractState>, violating: GraphAbstractState) {
        const errorWitness: ErrorWitness = this.extractErrorWitness(pathAr, violating);

        if (this._config.collapseAtomicBlocks) {
            errorWitness.steps = WitnessExporter.collapseAtomics(errorWitness.steps);
        }

        if (this._config.export === "ONLY_ACTIONS") {
            errorWitness.steps = WitnessExporter.collapseActionSegments(errorWitness.steps);
        }

        errorWitness.steps.forEach(step => {
            step.targets.forEach(target => {
                if (this._config.removeActorPrefixFromAttributes) {
                    target.removeActorPrefix();
                }

                target.removeAttributesStartingWith(this._config.removeAttributeStartingWith);
            })
        })

        WitnessExporter.addWaitTimes(errorWitness.steps);

        this.exportErrorWitness(errorWitness);
    }

    private extractErrorWitness(pathAr: AccessibilityRelation<GraphAbstractState, GraphAbstractState>, violating: GraphAbstractState): ErrorWitness {
        const path: GraphAbstractState[] = AccessibilityRelations.mapToArray(pathAr);
        const violatedProperties: Property[] = this._analysis.target(violating);

        const violatingConcreteElement: ConcreteElement = pathAr.concretizer().concretizeOne(violating);
        Preconditions.checkArgument(violatingConcreteElement instanceof ConcreteMemory);
        const errorState: ConcreteMemory = violatingConcreteElement as ConcreteMemory;

        const errorWitness = new ErrorWitness();
        errorWitness.violations = violatedProperties.map(property => property.getText);

        let previousState: GraphAbstractState = undefined;
        const errorWitnessActionVisitor = new ErrorWitnessActionVisitor();
        const labelPrintVisitor = new CorePrintVisitor();
        const mouseXReadEventVisitor = new AttributeReadEventVisitor("mouseX");
        const mouseYReadEventVisitor = new AttributeReadEventVisitor("mouseY");
        const keyPressedReadEventVisitor = new AttributeReadEventVisitor("keyPressed");
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
                step.targets.push(target);
            })

            if (previousState) {
                const transitionLabel = this._tlp.getTransitionLabel(previousState, currentState);
                step.action = transitionLabel
                    .map(o => o.ast.accept(errorWitnessActionVisitor))
                    .reduce((prev, cur) => {
                        if (prev.weight > cur.weight) {
                            return prev;
                        } else {
                            return cur;
                        }
                    }).action;

                step.actionLabel = transitionLabel
                    .map(o => o.ast.accept(labelPrintVisitor))
                    .join("; ");

                const keyPressedEvent = transitionLabel
                    .map(o => o.ast.accept(keyPressedReadEventVisitor))
                    .reduce((prev, cur) => prev.combine(cur));

                if (keyPressedEvent && keyPressedEvent.readFrom) {
                    step.keyPressed = Number(step.getUserDefinedAttributeValue(step.actionTargetName, WitnessExporter.removeSSAIndex(keyPressedEvent.readFrom)));
                    step.action = Action.KEY_PRESSED;
                }

                const mouseXRead: AttributeReadEvent = transitionLabel
                    .map(o => o.ast.accept(mouseXReadEventVisitor))
                    .reduce((prev, cur) => prev.combine(cur));

                const mouseYRead: AttributeReadEvent = transitionLabel
                    .map(o => o.ast.accept(mouseYReadEventVisitor))
                    .reduce((prev, cur) => prev.combine(cur));

                if ((mouseXRead && mouseXRead.readFrom) || (mouseYRead && mouseYRead.readFrom)) {
                    const mouseX = mouseXRead.readFrom ? WitnessExporter.removeSSAIndex(mouseXRead.readFrom) : undefined;
                    const mouseY = mouseYRead.readFrom ? WitnessExporter.removeSSAIndex(mouseYRead.readFrom) : undefined;

                    const x = step.getUserDefinedAttributeValue(step.actionTargetName, mouseX) || 0;
                    const y = step.getUserDefinedAttributeValue(step.actionTargetName, mouseY) || 0;

                    step.action = Action.MOUSE_INPUT;
                    step.mousePosition = new MousePosition(x, y);
                }
            }

            errorWitness.steps.push(step);
            previousState = currentState;
        }

        return errorWitness;
    }

    /**
     * Combines actions with their non action successors.
     * E.g. [DEFINE, DECLARE, MOUSE_INPUT, KEY_PRESSED, DEFINE, EPSILON] will result in
     * [INITIAL_STEP, MOUSE_INPUT, KEY_PRESSED] where the last step contains the state information of the last step
     * EPSILON and the first two steps are combined in INITIAL_STEP.
     *
     * @param errorWitnessSteps The steps to reduce to only actions
     */
    private static collapseActionSegments(errorWitnessSteps: ErrorWitnessStep[]): ErrorWitnessStep[] {
        const filteredArray = [];

        let previousAction: ErrorWitnessStep = undefined;

        for (const step of errorWitnessSteps) {
            if (previousAction) {
                if (step.action === Action.MOUSE_INPUT) {
                    if (previousAction.action !== Action.MOUSE_INPUT
                        || previousAction.mousePosition.x !== step.mousePosition.x
                        || previousAction.mousePosition.y !== step.mousePosition.y) {
                        filteredArray.push(previousAction);
                    } else {
                        step.actionLabel = `${previousAction.actionLabel}; ${step.actionLabel}`;
                    }
                } else if (step.action === Action.KEY_PRESSED) {
                    filteredArray.push(previousAction);
                } else if (step.timestamp - previousAction.timestamp > 1000) {
                    if (previousAction.action !== Action.WAIT) {
                        filteredArray.push(previousAction);
                    } else {
                        step.actionLabel = `${previousAction.actionLabel}; ${step.actionLabel}`;
                    }

                    step.action = Action.WAIT;
                } else {
                    step.action = previousAction.action;
                    step.keyPressed = previousAction.keyPressed;
                    step.mousePosition = previousAction.mousePosition;
                    step.actionLabel = `${previousAction.actionLabel}; ${step.actionLabel}`;
                }
            } else {
                step.action = Action.INITIAL_STATE;
            }

            previousAction = step;
        }

        if (!filteredArray.includes(previousAction)) {
            filteredArray.push(previousAction);
        }

        return filteredArray;
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
                const {target} = WitnessExporter.splitTargetPrefixFromAttribute(attributeWithTarget);

                let targetMap = targets.get(target);
                if (!targetMap) {
                    targetMap = new Map<string, T>();
                }

                targetMap.set(attributeWithTarget, value);
                targets.set(target, targetMap);
            } else {
                // TODO figure out what to do with other attributes (__op_time_129, ...)
            }
        })

        return targets;
    }

    private static removeSSAIndex(attributeWithSSA: string): string {
        return DataLocationScoper.rightUnwrapScope(attributeWithSSA).prefix;
    }

    public static splitTargetPrefixFromAttribute(attributeWithTargetName: string): {attribute: string, target: string} {
        const target = DataLocationScoper.leftUnwrapScope(attributeWithTargetName).prefix;
        const attribute = DataLocationScoper.rightUnwrapScope(attributeWithTargetName).suffix;
        return {attribute, target};
    }

    public static isTargetAttribute(attribute: string): boolean {
        return attribute.includes(VAR_SCOPING_SPLITTER);
    }

    private static collapseAtomics(steps: ErrorWitnessStep[]): ErrorWitnessStep[] {
        const filteredArray = [];

        let openAtomicBrackets = 0;
        let collapsedActionLabel = undefined;

        for (const step of steps) {
            if (step.action === Action.LEAVE_ATOMIC) {
                openAtomicBrackets--;

                Preconditions.checkArgument(openAtomicBrackets >= 0, "Missing opening atomic bracket")

                if (openAtomicBrackets === 0) {
                    step.action = Action.COLLAPSED_ATOMIC;
                    step.actionLabel = `${collapsedActionLabel}; ${step.actionLabel}`;
                    collapsedActionLabel = undefined;
                }
            } else if (step.action === Action.ENTER_ATOMIC) {
                openAtomicBrackets++;
            } else if (step.action === Action.REACHED_VIOLATION && openAtomicBrackets > 0) {
                // Error was reached inside an atomic block
                openAtomicBrackets--;
                step.actionLabel = `${collapsedActionLabel}; ${step.actionLabel}`;
                collapsedActionLabel = undefined;
            }

            if (openAtomicBrackets === 0) {
                filteredArray.push(step);
            } else {
                collapsedActionLabel = collapsedActionLabel ? `${collapsedActionLabel}; ${step.actionLabel}` : step.actionLabel;
            }
        }

        Preconditions.checkArgument(openAtomicBrackets === 0, `Missing ${openAtomicBrackets} closing atomic bracket(s)`);

        return filteredArray;
    }

    private static addWaitTimes(steps: ErrorWitnessStep[]): void {
        let prevStep: ErrorWitnessStep;

        for (const step of steps) {
            if (prevStep && step.action === Action.WAIT) {
                step.waitMicros = step.timestamp - prevStep.timestamp;
            }

            prevStep = step;
        }
    }

    private exportErrorWitness(errorWitness: ErrorWitness) {
        let fs = require('fs');
        fs.writeFileSync("output/error-witness.json", JSON.stringify(errorWitness, null, 2));
    }
}
