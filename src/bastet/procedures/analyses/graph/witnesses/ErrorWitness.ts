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

import {Action} from "../../../../syntax/ast/ErrorWitnessActionVisitor";
import {Preconditions} from "../../../../utils/Preconditions";
import {ConcreteUnifiedMemory} from "../../../domains/ConcreteElements";
import {DataLocationScoper} from "../../control/DataLocationScoping";

export class ErrorWitnessActor {

    name: string;

    variables: { [key: string]: string | boolean | number } = {}; //TODO add default scratch attributes

    /**
     * Variables that were declared inside a method
     */
    methodVariables: { [key: string]: string | boolean | number } = {};

    removeVariables(variableNames: string[]) {
        Object.keys(this.variables).forEach(variable => {
            if (variableNames.includes(variable)) {
                delete this.variables[variable];
            }
        })
    }

    static fromConcreteActorState(actorName: string, actorMemory: ConcreteUnifiedMemory): ErrorWitnessActor {
        const target = new ErrorWitnessActor();
        target.name = actorName;

        for (const v of actorMemory.variables()) {
            target.variables[v] = actorMemory.get(v).value;
        }

        return target;
    }

    isActorVariable(scopedVariableName: string): boolean {
        const scopedVariableNameName = DataLocationScoper.rightUnwrapScope(scopedVariableName);
        const actorName = scopedVariableNameName.prefix;

        return actorName === this.name;
    }

    clone(): ErrorWitnessActor {
        const data = JSON.parse(JSON.stringify(this));
        return Object.assign(new ErrorWitnessActor(), data);
    }
}

export interface MousePosition {
    x: number;
    y: number;
}

export class ErrorWitnessStep {
    timestamp: number;
    action: Action;
    epsilonType: Action;
    waitMicros?: number;
    keyPressed?: number;
    answer?: string;
    actionLabel: string;
    actionTargetName: string;
    mousePosition: MousePosition;
    actors: ErrorWitnessActor[] = [];

    constructor(public id: number) {
    }

    getVariableValue(targetName: string, attribute: string): any {
        const target = this.actors.find(t => t.name === targetName);
        Preconditions.checkNotUndefined(target);
        console.log(target.variables)
        return target.variables[attribute];
    }

    clone(): ErrorWitnessStep {
        const data = JSON.parse(JSON.stringify(this));
        const clone: ErrorWitnessStep = Object.assign(new ErrorWitnessStep(this.id), data);
        clone.actors = this.actors.map(actor => actor.clone());

        return clone;
    }
}

export class ErrorWitness {
    programName: string;
    violations: string[];
    steps: ErrorWitnessStep[] = [];
}
