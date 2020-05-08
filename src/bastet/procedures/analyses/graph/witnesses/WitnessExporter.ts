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
import {SSAMapVisitor} from "../../StateVisitors";
import {Map as ImmMap} from "immutable";
import {GraphAnalysis} from "../GraphAnalysis";
import {CorePrintVisitor} from "../../../../syntax/ast/CorePrintVisitor";

export class WitnessExporter implements WitnessHandler<GraphAbstractState> {

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
        const visitor = new CorePrintVisitor();

        for (const graphAbstractState of counterExample.path.states) {
            const step = new ErrorWitnessStep();
            const ssaMap = WitnessExporter.mapToSSAMap(graphAbstractState);
            const memoryInStep = WitnessExporter.filterBySSAMap(errorState, ssaMap);
            const targetStates = WitnessExporter.groupByTargets(memoryInStep);

            targetStates.forEach((state, targetName) => {
                const target = WitnessExporter.mapToTarget(targetName, state);
                step.targets.push(target);
            })

            if (previousState) {
                step.action = this._analysis.getTransitionLabel(previousState, graphAbstractState)
                    .map(o => o.ast.accept(visitor)).join(";");
            }

            errorWitness.steps.push(step);
            previousState = graphAbstractState;
        }

        WitnessExporter.removeSteps(errorWitness.steps, [WitnessExporter.isStepDuplicate, WitnessExporter.isStepEmpty])

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

    private static mapToTarget(name: string, attributes: Map<string, ConcretePrimitive<any>>): Target {
        const targetObj = new Target();
        targetObj.name = name;

        attributes.forEach((value, name) => {
            targetObj[name] = value.value;
        })

        return targetObj;
    }

    private static groupByTargets<T>(map: Map<string, T>): Map<string, Map<string, T>> {
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

    private static filterBySSAMap(memory: ConcreteMemory, ssaMap: ImmMap<string, number>): Map<string, ConcretePrimitive<any>> {
        const attributes = new Map<string, ConcretePrimitive<any>>();

        ssaMap.forEach((ssaIndex, attributeName) => {
            const attributeWithIndex = `${attributeName}@${ssaIndex}`;

            const attribute = memory.getPrimitiveAttributeByName(attributeWithIndex);

            if (!attribute) {
                // TODO why are attributes in SSAMap but not in memory?
                // console.log(`${attributeWithIndex} was undefined`);
            } else {
                attributes.set(attributeName, attribute);
            }
        })

        return attributes;
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

    private static mapToSSAMap(graphAbstractState: GraphAbstractState): ImmMap<string, number> {
        return graphAbstractState.accept(new SSAMapVisitor());
    }

    private static isStepEmpty(errorWitness: ErrorWitnessStep): boolean {
        return errorWitness.targets.length === 0 && !errorWitness.action;
    }

    private static isStepDuplicate(errorWitness: ErrorWitnessStep, other: ErrorWitnessStep): boolean {
        return !WitnessExporter.xor(!errorWitness, !other) && JSON.stringify(errorWitness.targets) === JSON.stringify(other.targets);
    }

    private static xor(a: boolean, b: boolean): boolean {
        return (a && !b) || (!a && b);
    }

    private static removeSteps(steps: ErrorWitnessStep[], predicates: ((errorWitness: ErrorWitnessStep, prev: ErrorWitnessStep) => boolean)[]): void {
        const stepsToRemove = [];

        let previousStep;
        for (const step of steps) {
            if (predicates.some((predicate) => predicate(step, previousStep))) {
                stepsToRemove.push(step);
            }

            previousStep = step;
        }

        for (const stepToRemove of stepsToRemove) {
            const index = steps.indexOf(stepToRemove);
            steps.splice(index, 1);
        }
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
    name: string;
}

class ErrorWitnessStep {
    action: string;
    targets: Target[] = [];
}

class ErrorWitness {
    programName: string;
    violations: string[];
    steps: ErrorWitnessStep[] = [];
}
