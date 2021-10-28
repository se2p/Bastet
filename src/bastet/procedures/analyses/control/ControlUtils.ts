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

import {DelegatingStateVisitor} from "../AbstractStates";
import {Set as ImmSet} from "immutable";
import {ControlAbstractState} from "./ControlAbstractDomain";
import {App} from "../../../syntax/app/App";
import {Preconditions} from "../../../utils/Preconditions";
import {AbstractElement} from "../../../lattices/Lattice";
import {RelationLocation} from "./ConcreteProgramState";

/**
 * Extracts the set of control locations to that the abstract
 * state made a step to.
 */
export class ControlLocationExtractor extends DelegatingStateVisitor<ImmSet<RelationLocation>> {

    private readonly _task: App;

    constructor(task: App) {
        super();
        this._task = Preconditions.checkNotUndefined(task);
    }

    protected defaultResultFor(element: AbstractElement): ImmSet<RelationLocation> {
        return ImmSet<RelationLocation>();
    }

    public visitControlAbstractState(element: ControlAbstractState): ImmSet<RelationLocation> {
        const steppedThreads = element.getSteppedFor().map((i) => element.getIndexedThreadState(i));

        let result = ImmSet<RelationLocation>();

        for (const steppedThread of steppedThreads) {
            const relLoc: RelationLocation = steppedThread.threadStatus.getRelationLocation();
            result = result.add(relLoc);
        }

        return result;
    }

}