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

import {StopOperator} from "../ProgramAnalysis";
import {AbstractionAbstractDomain, AbstractionState} from "./AbstractionAbstractDomain";
import {AbstractState} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";

export class AbstractionStopOperator implements StopOperator<AbstractionState, AbstractState> {

    private readonly _wrapped: StopOperator<AbstractState, AbstractState>;
    private readonly _domain: AbstractionAbstractDomain;

    constructor(domain: AbstractionAbstractDomain, wrapped: StopOperator<AbstractState, AbstractState>) {
        this._domain = Preconditions.checkNotUndefined(domain);
        this._wrapped = Preconditions.checkNotUndefined(wrapped);
    }

    stop(state1: AbstractionState, reached: Iterable<AbstractState>, unwrapper: (F) => AbstractionState): boolean {
        for (let r of reached) {
            const state2: AbstractionState = unwrapper(r);
            if (state1.getWideningOf().isPresent() && state2.getWideningOf().isPresent()) {
                if (this._domain.lattice.folLattice.isIncluded(state1.getEnteringSummary(), state2.getEnteringSummary())) {
                    return true;
                }
            }
        }

        return false;
    }

}