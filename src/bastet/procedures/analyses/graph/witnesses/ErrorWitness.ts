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
import {ConcretePrimitive} from "../../../domains/ConcreteElements";

export class Target {
    private static readonly SCRATCH_TARGET_ATTRIBUTES = ["x", "y", "direction", "draggable", "rotationStyle", "visible", "size"];
    name: string;
    scratchAttributes: { [key: string]: string | boolean | number } = {}; //TODO add default scratch attributes
    userDefinedAttributes: { [key: string]: string | boolean | number } = {};

    removeUserDefinedAttributes(attributeToRemove: string[]) {
        for (const attribute of attributeToRemove) {
            if (this.userDefinedAttributes[attribute] != undefined) {
                delete this.userDefinedAttributes[attribute];
            }
        }
    }

    removeAttributesStartingWith(attributes: string[]) {
        const attributesToRemove = Object.keys(this.userDefinedAttributes).filter(attribute => attributes.some(prefix => attribute.startsWith(prefix)));
        this.removeUserDefinedAttributes(attributesToRemove);
    }

    static fromConcretePrimitives(name: string, attributes: Map<string, ConcretePrimitive<any>>): Target {
        const target = new Target();
        target.name = name;

        attributes.forEach((value, attribute) => {
            if (this.isScratchAttribute(attribute)) {
                target.scratchAttributes[attribute] = value.value;
            } else {
                target.userDefinedAttributes[attribute] = value.value;
            }
        });

        return target;
    }

    static isScratchAttribute(name: string): boolean {
        return this.SCRATCH_TARGET_ATTRIBUTES.includes(name);
    }
}

export class MousePosition {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class ErrorWitnessStep {
    timestamp: number;
    action: Action;
    waitMicros: number;
    actionLabel: string;
    actionTargetName: string;
    mousePosition: MousePosition;
    targets: Target[] = [];

    isEmpty(): boolean {
        return !this.action || this.targets.length === 0;
    }

    relevantTransition(prev: ErrorWitnessStep) {
        this.targets = this.targets.sort((t1, t2) => t1.name.localeCompare(t2.name));
        return !prev
            || this.timestamp - prev.timestamp > 1000
            || JSON.stringify(this.targets) !== JSON.stringify(prev.targets);
    }

    getUserDefinedAttributeValue(targetName: string, attribute: string): any {
        const target = this.targets.find(t => t.name === targetName);
        Preconditions.checkNotUndefined(target);
        return target.userDefinedAttributes[attribute];
    }
}

export class ErrorWitness {
    programName: string;
    violations: string[];
    steps: ErrorWitnessStep[] = [];
}