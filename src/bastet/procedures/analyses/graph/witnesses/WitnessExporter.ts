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
import {GraphPath} from "../GraphPath";
import {GraphSafetyCounterexample} from "./GraphCounterexample";
import {ProgramAnalysis} from "../../ProgramAnalysis";
import {DataAnalysis} from "../../data/DataAnalysis";
import {DataAbstractState} from "../../data/DataAbstractDomain";
import {ConcreteMemory} from "../../../domains/ConcreteElements";
import {IllegalArgumentException} from "../../../../core/exceptions/IllegalArgumentException";
import {SSAStateVisitor} from "../../StateVisitors";
import {Map as ImmMap, Set as ImmSet} from "immutable";
import {GraphAnalysis} from "../GraphAnalysis";
import {MouseReadEvent, MouseReadEventVisitor} from "../../../../syntax/ast/MouseReadEventVisitor";
import {App} from "../../../../syntax/app/App";
import {ControlAbstractState, RelationLocation} from "../../control/ControlAbstractDomain";
import {ControlLocationExtractor} from "../../control/ControlUtils";
import {ImplementMeForException} from "../../../../core/exceptions/ImplementMeException";
import {Action, ErrorWitnessActionVisitor} from "../../../../syntax/ast/ErrorWitnessActionVisitor";
import {CorePrintVisitor} from "../../../../syntax/ast/CorePrintVisitor";
import {ErrorWitness, ErrorWitnessStep, MousePosition, Target} from "./ErrorWitness";

export class WitnessExporter implements WitnessHandler<GraphAbstractState> {

    private static readonly IRRELEVANT_TARGETS = ['IOActor'];
    private static readonly IRRELEVANT_USER_DEFINED_ATTRIBUTES = ['PI', 'TWO_PI', 'PI_HALF', 'PI_SQR_TIMES_FIVE',
        'KEY_ENTER', 'KEY_SPACE', 'KEY_ANY', 'KEY_LEFT', 'KEY_UP', 'KEY_DOWN', 'KEY_LEFT', 'KEY_RIGHT'];

    private readonly _analysis: GraphAnalysis;
    private readonly _task: App;

    constructor(analysis: GraphAnalysis, task: App) {
        this._analysis = analysis;
        this._task = task;
    }

    handleViolatingState(reached: ReachedSet<GraphAbstractState>, violating: GraphAbstractState) {
        const counterExample = this.extractCounterExample(reached, violating);

        const errorState: ConcreteMemory = this.mapGraphAbstractStateToDataConcreteState(violating);
        const errorWitness = new ErrorWitness();
        errorWitness.violations = counterExample.violatedProperties
            .toArray()
            .map(property => property.getText);

        let previousState: GraphAbstractState = undefined;
        let mousePosition: MousePosition = new MousePosition(0, 0);
        const errorWitnessActionVisitor = new ErrorWitnessActionVisitor();
        const labelPrintVisitor = new CorePrintVisitor();
        const mouseReadEventVisitor = new MouseReadEventVisitor();
        const ssaStateVisitor = new SSAStateVisitor();
        const controlLocationExtractor = new ControlLocationExtractor(this._task);

        for (const currentState of counterExample.path.states) {
            const step = new ErrorWitnessStep();
            step.actionTargetName = WitnessExporter.getActionTargetName(currentState, controlLocationExtractor);
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
                const actionWithArgs = this._analysis.getTransitionLabel(previousState, currentState)
                    .map(o => o.ast.accept(errorWitnessActionVisitor))[0];

                step.action = actionWithArgs.action;
                step.actionArgs = actionWithArgs.args;

                step.actionLabel = this._analysis.getTransitionLabel(previousState, currentState)
                    .map(o => o.ast.accept(labelPrintVisitor))[0];
                const mouseEvent: MouseReadEvent = this._analysis.getTransitionLabel(previousState, currentState)
                    .map(o => o.ast.accept(mouseReadEventVisitor))[0];

                if (mouseEvent) {
                    const mouseX = mouseEvent.readXFrom;
                    const mouseY = mouseEvent.readYFrom;

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
        errorWitness.steps = errorWitness.steps.filter(step => step.action !== Action.DECLARE);
        errorWitness.steps = WitnessExporter.buildInitialStep(errorWitness.steps);
        errorWitness.steps = errorWitness.steps.filter(step => step.action !== Action.DEFINE && step.action !== Action.EPSILON);

        this.exportErrorWitness(errorWitness);
    }

    private mapGraphAbstractStateToDataConcreteState(graphAbstractState: GraphAbstractState): ConcreteMemory {
        // TODO get GraphConcreteState and implement ConcreteStateVisitor in order to get DataConcreteState(?)
        let analysis: ProgramAnalysis<any, any, any> = this._analysis;
        while (!(analysis instanceof DataAnalysis)) {
            analysis = analysis['_wrappedAnalysis'];
        }
        const dataAnalysis = analysis as DataAnalysis;

        let abstractState = graphAbstractState;
        while (!(abstractState instanceof DataAbstractState)) {
            abstractState = abstractState.wrappedState;
        }
        const dataAbstractState = abstractState as DataAbstractState;

        return dataAnalysis.abstractDomain.concretizeOne(dataAbstractState);
    }

    private static mapGraphAbstractStateToControlAbstractState(graphAbstractState: GraphAbstractState): ControlAbstractState {
        let abstractState: any = graphAbstractState;
        while (abstractState && !(abstractState instanceof ControlAbstractState)) {
            abstractState = abstractState.getWrappedState();
        }

        return abstractState as ControlAbstractState;
    }

    private static getActionTargetName(graphAbstractState: GraphAbstractState, controlLocationExtractor: ControlLocationExtractor): string {
        const controlAbstractState = this.mapGraphAbstractStateToControlAbstractState(graphAbstractState);
        const controlLocations: ImmSet<RelationLocation> = controlLocationExtractor.visitControlAbstractState(controlAbstractState);

        if (controlLocations.size === 0) {
            return undefined;
        } else if (controlLocations.size === 1) {
            return controlLocations.toArray()[0].getActorId();
        } else {
            throw new ImplementMeForException("when a control abstract state has multiple control locations");
        }
    }

    private static groupByTargets<T>(map: ImmMap<string, T>): Map<string, Map<string, T>> {
        const targets = new Map<string, Map<string, T>>();

        map.forEach((value, attributeWithTarget) => {
            if (this.isTargetAttribute(attributeWithTarget)) {
                const {attribute, target} = WitnessExporter.mapToTargetName(attributeWithTarget);

                if (!this.IRRELEVANT_TARGETS.includes(target)) {
                    let targetMap = targets.get(target);
                    if (!targetMap) {
                        targetMap = new Map<string, T>();
                    }

                    targetMap.set(attribute, value);
                    targets.set(target, targetMap);
                }
            } else {
                // TODO figure out what to do with other attributes (__op_time_129, ...)
            }
        })

        return targets;
    }

    private static mapToTargetName(attributeWithTargetName: string): {attribute: string, target: string} {
        const indexFirstAt = attributeWithTargetName.indexOf("@");
        const indexLastAt = attributeWithTargetName.lastIndexOf("@");

        if (indexFirstAt < 0 || indexLastAt < 0) {
            throw new IllegalArgumentException("Attribute name didnt contain target name");
        }

        const target = attributeWithTargetName.substring(0, indexFirstAt);
        const attribute = attributeWithTargetName.substring(indexLastAt + 1);
        return {attribute, target};
    }

    private static isTargetAttribute(attribute: string): boolean {
        return attribute.includes("@");
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

    public extractCounterExample(reached: ReachedSet<GraphAbstractState>, violating: GraphAbstractState): GraphSafetyCounterexample {
        Preconditions.checkArgument(reached instanceof GraphReachedSetWrapper);
        const reachedSetWrapper = reached as GraphReachedSetWrapper<GraphAbstractState>;

        const errorWitness: GraphPath = reachedSetWrapper.chooseRandomPathTo(violating);

        const violatedProperties = this._analysis.target(violating);
        return new GraphSafetyCounterexample(errorWitness, violatedProperties);
    }

    private exportErrorWitness(errorWitness: ErrorWitness) {
        let fs = require('fs');
        fs.writeFileSync("output/error-witness.json", JSON.stringify(errorWitness, null, 2));
    }
}
