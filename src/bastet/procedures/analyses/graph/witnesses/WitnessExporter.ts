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
import {ConcreteMemory, ConcretePrimitive} from "../../../domains/ConcreteElements";
import {IllegalArgumentException} from "../../../../core/exceptions/IllegalArgumentException";
import {SSAStateVisitor} from "../../StateVisitors";
import {Map as ImmMap} from "immutable";
import {GraphAnalysis} from "../GraphAnalysis";
import {CorePrintVisitor} from "../../../../syntax/ast/CorePrintVisitor";

export class WitnessExporter implements WitnessHandler<GraphAbstractState> {

    private static readonly IRRELEVANT_TARGETS = ['IOActor'];
    private readonly _analysis: GraphAnalysis;

    constructor(analysis: GraphAnalysis) {
        this._analysis = analysis;
    }

    handleViolatingState(reached: ReachedSet<GraphAbstractState>, violating: GraphAbstractState) {
        const counterExample = this.extractCounterExample(reached, violating);

        const errorState: ConcreteMemory = this.mapGraphAbstractStateToDataConcreteState(violating);
        const errorWitness = new ErrorWitness();
        errorWitness.violations = counterExample.violatedProperties
            .toArray()
            .map(property => property.getText);

        let previousState;
        const labelPrintVisitor = new CorePrintVisitor();
        const ssaStateVisitor = new SSAStateVisitor();

        for (const graphAbstractState of counterExample.path.states) {
            const step = new ErrorWitnessStep();
            const ssaState = graphAbstractState.accept(ssaStateVisitor);
            const memoryInStep = ssaState.getPrimitiveAttributes(errorState);
            const targetStates = WitnessExporter.groupByTargets(memoryInStep);
            const globalTime = memoryInStep.get("__global_time_micros")
            step.timestamp = globalTime ? globalTime.value : 0;

            targetStates.forEach((state, targetName) => {
                const target = Target.fromConcretePrimitives(targetName, state);
                target.removeUserDefinedAttributes(['PI', 'TWO_PI', 'PI_HALF', 'PI_SQR_TIMES_FIVE', 'KEY_ENTER', 'KEY_SPACE', 'KEY_ANY', 'KEY_LEFT', 'KEY_UP', 'KEY_DOWN', 'KEY_LEFT', 'KEY_RIGHT'])
                step.targets.push(target);
            })

            if (previousState) {
                step.action = this._analysis.getTransitionLabel(previousState, graphAbstractState)
                    .map(o => o.ast.accept(labelPrintVisitor)).join(";");
            }

            errorWitness.steps.push(step);
            previousState = graphAbstractState;
        }

        errorWitness.steps = errorWitness.steps.filter(witness => !witness.isEmpty());
        errorWitness.steps = WitnessExporter.combineMouseCallSteps(errorWitness.steps);
        // errorWitness.steps = WitnessExporter.removeIrrelevantTransitions(errorWitness.steps);

        // errorWitness.steps[0].action = "Initial state";
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

    private static combineMouseCallSteps(steps: ErrorWitnessStep[]): ErrorWitnessStep[] {
        const filteredArray = [];
        const mouseXTmpVariableMatcher = /^define (__tmp_[0-9]+) as mouseX\(\)$/;

        let current = steps[0];
        let index = 0;
        let mouseXTmpVariableName = undefined;
        let mouseXTmpVariableAssignmentToRegex: RegExp = undefined;
        let mousePosition: MousePosition = new MousePosition(0, 0);
        while (current != undefined) {
            if (!mouseXTmpVariableName) {
                const regexMatches = mouseXTmpVariableMatcher.exec(current.action);
                if (regexMatches && regexMatches.length > 1) {
                    mouseXTmpVariableName = regexMatches[1];
                    mouseXTmpVariableAssignmentToRegex = new RegExp(`^define ([a-z]+) as ${mouseXTmpVariableName}$`);
                }

                filteredArray.push(current);
            } else {
                Preconditions.checkNotUndefined(mouseXTmpVariableAssignmentToRegex);
                const regexMatches = mouseXTmpVariableAssignmentToRegex.exec(current.action);
                if (regexMatches && regexMatches.length > 1) {
                    const mouseXVariable = regexMatches[1];

                    current.action = "Mouse input"
                    mouseXTmpVariableName = undefined;
                    filteredArray.push(current);

                    mousePosition = new MousePosition(current.targets[0].userDefinedAttributes[mouseXVariable] as number, mousePosition.y);
                }
            }
            current.mousePosition = mousePosition;

            index++;
            current = steps[index];
        }

        return filteredArray;
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

class Target {
    private static readonly SCRATCH_TARGET_ATTRIBUTES = ['x', 'y', 'direction', 'draggable', 'rotationStyle', 'visible', 'size'];
    name: string;
    scratchAttributes: {[key: string]: string | boolean | number} = {}; //TODO add default scratch attributes
    userDefinedAttributes: {[key: string]: string | boolean | number} = {};

    removeUserDefinedAttributes(attributeToRemove: string[]) {
        for (const attribute of attributeToRemove) {
            if (this.userDefinedAttributes[attribute] != undefined) {
                delete this.userDefinedAttributes[attribute];
            }
        }
    }

    static fromConcretePrimitives(name: string, attributes: Map<string, ConcretePrimitive<any>>) : Target {
        const target = new Target();
        target.name = name;

        attributes.forEach((value, attribute) => {
            if (this.isScratchAttribute(attribute)) {
                target.scratchAttributes[attribute] = value.value;
            } else {
                target.userDefinedAttributes[attribute] = value.value;
            }
        })

        return target;
    }

    static isScratchAttribute(name: string): boolean {
        return this.SCRATCH_TARGET_ATTRIBUTES.includes(name);
    }
}

class Wait {
    millis: number;
}

class MousePosition {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        Preconditions.checkArgument(x !== undefined && y !== undefined);
        this.x = x;
        this.y = y;
    }
}

class ErrorWitnessStep {
    timestamp: number;
    action: string;
    mousePosition: MousePosition;
    wait: Wait;
    targets: Target[] = [];

    isEmpty(): boolean {
        return !this.action || this.targets.length === 0;
    }

    relevantTransition(prev: ErrorWitnessStep) {
        this.targets = this.targets.sort((t1, t2) => t1.name.localeCompare(t2.name));
        return !prev
            || prev.mousePosition !== this.mousePosition
            || this.timestamp - prev.timestamp > 1000;
    }
}

class ErrorWitness {
    programName: string;
    violations: string[];
    steps: ErrorWitnessStep[] = [];
}
