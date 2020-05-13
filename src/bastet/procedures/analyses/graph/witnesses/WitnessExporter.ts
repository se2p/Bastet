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

            targetStates.forEach((state, targetName) => {
                const target = Target.fromConcretePrimitives(targetName, state);
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
    scratchAttributes: {[key: string]: string | boolean | number} = {};
    userDefinedAttributes: {[key: string]: string | boolean | number} = {};

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


class ErrorWitnessStep {
    action: string;
    targets: Target[] = [];

    isEmpty(): boolean {
        return !this.action || this.targets.length === 0;
    }
}

class ErrorWitness {
    programName: string;
    violations: string[];
    steps: ErrorWitnessStep[] = [];
}
