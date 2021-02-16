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

import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {RelationLocation} from "./ConcreteProgramState";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {DelegatingStateVisitor} from "../AbstractStates";
import {ControlAbstractState} from "./ControlAbstractDomain";
import {getTheOnlyElement} from "../../../utils/Collections";

export class ControlAbstractStateCollector extends DelegatingStateVisitor<ControlAbstractState[]> {

    constructor() {
        super();
    }

    public visitControlAbstractState(state: ControlAbstractState): ControlAbstractState[] {
        return [state];
    }

    protected defaultResultFor(element: AbstractElement): ControlAbstractState[] {
        return [];
    }

}

export class ControlAbstractStates {

    public static extractControlTransitions(from: AbstractState, to: AbstractState): [RelationLocation, RelationLocation][] {
        const fromState = getTheOnlyElement(this.extractFrom(from));
        const toState = getTheOnlyElement(this.extractFrom(from));
        throw new ImplementMeException();
    }

    public static extractFrom(fromState: AbstractState): ControlAbstractState[] {
        const visitor = new ControlAbstractStateCollector();
        return fromState.accept(visitor);
    }

}