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
import {ErrorWitness, ErrorWitnessActor, ErrorWitnessStep} from "./ErrorWitness";
import {AccessibilityRelation, AccessibilityRelations} from "../../Accessibility";
import {Property} from "../../../../syntax/Property";
import {getTheOnlyElement} from "../../../../utils/Collections";
import {VAR_SCOPING_SPLITTER} from "../../../../syntax/app/controlflow/DataLocation";
import {DataLocationScoper} from "../../control/DataLocationScoping";
import {ProgramOperation} from "../../../../syntax/app/controlflow/ops/ProgramOperation";
import {
    ActionExtractor,
    AnswerActionExtractor,
    KeyPressedActionExtractor,
    MouseDownActionExtractor,
    MouseXActionExtractor,
    MouseYActionExtractor,
} from "./ActionExtractor";

export interface WitnessExporterConfig {
    export: 'ALL' | 'ONLY_ACTIONS';
    collapseAtomicBlocks: boolean;
    removeEpsilonType: boolean;
    removeMethodVariables: boolean;
    removeVariables: string[];
    removeActors: string[];
    removeStepsBeforeBootstrap: boolean;
    minWaitTime: number;
    keepDebuggingAttributes: boolean;
}

export const DEFAULT_WITNESS_EXPORTER_CONFIG: WitnessExporterConfig = {
    export: 'ONLY_ACTIONS',
    collapseAtomicBlocks: true,
    removeEpsilonType: true,
    removeMethodVariables: true,
    removeVariables: ['PI', 'TWO_PI', 'PI_HALF', 'PI_SQR_TIMES_FIVE',
        'KEY_ENTER', 'KEY_SPACE', 'KEY_ANY', 'KEY_LEFT', 'KEY_UP', 'KEY_DOWN', 'KEY_LEFT', 'KEY_RIGHT'],
    removeActors: ['IOActor', '.*Observer'],
    removeStepsBeforeBootstrap: true,
    minWaitTime: 0,
    keepDebuggingAttributes: false
}

export class WitnessExporter implements WitnessHandler<GraphAbstractState> {

    private readonly _analysis: WrappingProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>;
    private readonly _tlp: TransitionLabelProvider<GraphAbstractState>;
    private readonly _task: App;
    private readonly _controlLocationExtractor: ControlLocationExtractor;
    private readonly _config: WitnessExporterConfig;
    private readonly _labelPrintVisitor: CorePrintVisitor;

    constructor(analysis: WrappingProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>,
                tlp: TransitionLabelProvider<GraphAbstractState>, task: App, config: WitnessExporterConfig = DEFAULT_WITNESS_EXPORTER_CONFIG) {
        this._analysis = analysis;
        this._tlp = tlp;
        this._task = task;
        this._controlLocationExtractor = new ControlLocationExtractor(task);
        this._config = config;
        this._labelPrintVisitor = new CorePrintVisitor();
    }

    handleViolatingState(reached: ReachedSet<GraphAbstractState>, violating: GraphAbstractState) {
        Preconditions.checkArgument(reached instanceof GraphReachedSetWrapper);
        const ar: GraphReachedSetWrapper<GraphAbstractState> = reached as GraphReachedSetWrapper<GraphAbstractState>;
        const testified = this._analysis.testifyOne(ar, violating);
        this.exportPath(testified, violating);
    }

    private exportPath(pathAr: AccessibilityRelation<GraphAbstractState, GraphAbstractState>, violating: GraphAbstractState) {
        const errorWitness: ErrorWitness = this.extractErrorWitness(pathAr, violating);

        if (this._config.export === "ONLY_ACTIONS") {
            errorWitness.steps = WitnessExporter.collapseEpsilonsToWait(errorWitness.steps);
        }

        WitnessExporter.addWaitTimes(errorWitness.steps);
        errorWitness.steps = WitnessExporter.removeStepsWithLowWaitTime(errorWitness.steps, this._config.minWaitTime);

        errorWitness.steps.forEach(step => {
            step.actors = step.actors.filter(actor => {
               return !this._config.removeActors.some(actorToRemove => {
                   const regex = new RegExp(actorToRemove);
                   return regex.test(actor.name);
               })
            });

            if (!this._config.keepDebuggingAttributes) {
                step.timestamp = undefined;
                step.actionTargetName = undefined;
                step.actionLabel = undefined;
                step.id = undefined;
            }

            step.actors.forEach(target => {
                target.removeActorPrefix();

                target.removeVariables(this._config.removeVariables);

                if (this._config.removeMethodVariables) {
                    delete target.methodVariables;
                }
            })

            if (this._config.removeEpsilonType) {
                delete step.epsilonType;
            }
        })

        errorWitness.steps[0].action = Action.INITIAL_STATE;
        errorWitness.steps[errorWitness.steps.length - 1].action = Action.REACHED_VIOLATION;

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
        const actionExtractors: ActionExtractor[] = [
            new MouseXActionExtractor(),
            new MouseYActionExtractor(),
            new MouseDownActionExtractor(),
            new AnswerActionExtractor(),
            new KeyPressedActionExtractor()
        ];

        const ssaStateVisitor = new SSAStateVisitor();

        let index = 0;
        for (const currentState of path) {
            const step = new ErrorWitnessStep(index);
            const relationLocation = this.getRelationLocationForState(currentState);
            step.actionTargetName = relationLocation ? relationLocation.getActorId() : undefined;

            const ssaState = currentState.accept(ssaStateVisitor);
            const memoryInStep = ssaState.getPrimitiveAttributes(errorState);
            const targetStates = WitnessExporter.groupByTargets(memoryInStep);
            const globalTime = memoryInStep.get("__global_time_micros");
            step.timestamp = globalTime ? globalTime.value : 0;

            targetStates.forEach((state, targetName) => {
                const target = ErrorWitnessActor.fromConcretePrimitives(targetName, state);
                step.actors.push(target);
            })

            if (previousState) {
                // Set step action and action label
                const transitionLabel = this._tlp.getTransitionLabel(previousState, currentState);

                step.actionLabel = transitionLabel
                    .map(o => o.ast.accept(this._labelPrintVisitor))
                    .join("; ");

                for (const actionExtractor of actionExtractors) {
                    actionExtractor.processOperations(transitionLabel, step);
                }

                step.epsilonType = this.getDefaultAction(transitionLabel);
            }

            errorWitness.steps.push(step);
            previousState = currentState;
            index++;
        }

        if (this._config.removeStepsBeforeBootstrap) {
            errorWitness.steps = WitnessExporter.removeAllBeforeAction(errorWitness.steps, Action.INITIAL_STATE);
        }

        let alteredSteps = [];
        const steps = errorWitness.steps;
        while (steps.length > 0) {
            const step = steps.shift();
            for (const actionExtractor of actionExtractors) {
                actionExtractor.setActionForStep(step, steps);
            }

            alteredSteps.push(step);
        }

        errorWitness.steps = alteredSteps;

        if (this._config.collapseAtomicBlocks) {
            errorWitness.steps = WitnessExporter.collapseAtomics(errorWitness.steps);
        }

        return errorWitness;
    }

    private getDefaultAction(transitionLabel: ProgramOperation[]) {
        return transitionLabel
            .map(o => o.ast.accept(new ErrorWitnessActionVisitor()))
            .reduce((prev, cur) => {
                if (prev.weight > cur.weight) {
                    return prev;
                } else {
                    return cur;
                }
            }).action;
    }

    /**
     * Collapses steps between actions into one wait step
     *
     * @param errorWitnessSteps The steps to reduce to only actions and waits
     */
    private static collapseEpsilonsToWait(errorWitnessSteps: ErrorWitnessStep[]): ErrorWitnessStep[] {
        const filteredArray = [];

        let prevStep: ErrorWitnessStep;

        for (const step of errorWitnessSteps) {
            if (step.action !== undefined || step.epsilonType === Action.INITIAL_STATE || step.epsilonType === Action.REACHED_VIOLATION) {
                if (prevStep) {
                    prevStep.action = Action.WAIT;
                    filteredArray.push(prevStep);
                    prevStep = undefined;
                }

                filteredArray.push(step);
            } else {
                if (prevStep) {
                    step.actionLabel = `${prevStep.actionLabel}; ${step.actionLabel}`;
                }

                prevStep = step;
            }
        }

        if (prevStep) {
            filteredArray.push(prevStep);
        }

        return filteredArray;
    }

    private static removeAllBeforeAction(steps: ErrorWitnessStep[], action: Action): ErrorWitnessStep[] {
        let index = steps.findIndex(step => step.epsilonType === action);

        Preconditions.checkState(index >= 0);

        return steps.slice(index, steps.length);
    }

    private static removeStepsWithLowWaitTime(steps: ErrorWitnessStep[], timeThreshold: number): ErrorWitnessStep[] {
        const filteredArray = [];

        let prevStep: ErrorWitnessStep = undefined;

        for (const step of steps) {
            if (step.action === Action.WAIT && step.waitMicros < timeThreshold && prevStep) {
                prevStep.actors = step.actors;
                prevStep.timestamp = step.timestamp;
                prevStep.actionLabel = `${prevStep.actionLabel}; ${step.actionLabel}`;

                filteredArray.push(prevStep);
                prevStep = undefined;
            } else {
                if (prevStep) {
                    filteredArray.push(prevStep);
                }
                prevStep = step;
            }
        }

        if (prevStep) {
            filteredArray.push(prevStep);
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
            if (attributeWithTarget.includes(VAR_SCOPING_SPLITTER)) {
                const {target} = WitnessExporter.splitTargetPrefixFromAttribute(attributeWithTarget);

                let targetMap = targets.get(target);
                if (!targetMap) {
                    targetMap = new Map<string, T>();
                }

                targetMap.set(attributeWithTarget, value);
                targets.set(target, targetMap);
            }
        })

        return targets;
    }

    public static splitTargetPrefixFromAttribute(attributeWithTargetName: string): {attribute: string, target: string} {
        const target = DataLocationScoper.leftUnwrapScope(attributeWithTargetName).prefix;
        const attribute = DataLocationScoper.rightUnwrapScope(attributeWithTargetName).suffix;
        return {attribute, target};
    }

    private static collapseAtomics(steps: ErrorWitnessStep[]): ErrorWitnessStep[] {
        const filteredArray = [];

        let openAtomicBrackets = 0;
        let atomicBlock: ErrorWitnessStep[] = [];

        for (const step of steps) {
            if (step.epsilonType === Action.LEAVE_ATOMIC
                    || step.epsilonType === Action.REACHED_VIOLATION && openAtomicBrackets > 0) {
                atomicBlock.push(step);
                openAtomicBrackets--;

                Preconditions.checkArgument(openAtomicBrackets >= 0, "Missing opening atomic bracket")

                if (openAtomicBrackets === 0) {
                    this.collapseOneAtomicBlock(atomicBlock).forEach(step => {
                        filteredArray.push(step);
                    });
                    atomicBlock = [];
                }
            } else if (step.epsilonType === Action.ENTER_ATOMIC) {
                openAtomicBrackets++;
                atomicBlock.push(step);
            } else if (openAtomicBrackets > 0) {
                atomicBlock.push(step);
            } else {
                filteredArray.push(step);
            }
        }

        Preconditions.checkArgument(openAtomicBrackets === 0, `Missing ${openAtomicBrackets} closing atomic bracket(s)`);

        return filteredArray;
    }

    private static collapseOneAtomicBlock(atomicBlock: ErrorWitnessStep[]): ErrorWitnessStep[] {
        const lastStep = atomicBlock[atomicBlock.length - 1];

        let collapsedAtomicBlock: ErrorWitnessStep[] = [];
        let collapsedActionLabel: string = undefined;

        for (const step of atomicBlock) {
            const isRelevant = step.action !== undefined || step === lastStep;

            if (isRelevant) {
                step.actors = lastStep.actors;
                if (collapsedActionLabel) {
                    step.actionLabel = `${collapsedActionLabel}; ${step.actionLabel}`;
                    collapsedActionLabel = undefined;
                }

                collapsedAtomicBlock.push(step);
            } else {
                collapsedActionLabel = collapsedActionLabel ? `${collapsedActionLabel}; ${step.actionLabel}` : step.actionLabel;
            }
        }

        return collapsedAtomicBlock;
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
