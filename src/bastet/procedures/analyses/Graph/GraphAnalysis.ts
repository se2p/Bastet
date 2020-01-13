/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net)
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

import {ProgramAnalysis} from "../ProgramAnalysis";
import {AbstractDomain} from "../AbstractDomain";
import {ReachedSet} from "../../algorithms/ReachedSet";
import {GraphAbstractState} from "./GraphAbstractDomain";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export class GraphAnalysis implements ProgramAnalysis<GraphAbstractState> {

    abstractDomain: AbstractDomain<GraphAbstractState>;

    abstractSucc(fromState: GraphAbstractState): Iterable<GraphAbstractState> {
        throw new ImplementMeException();
    }

    join(state1: GraphAbstractState, state2: GraphAbstractState): GraphAbstractState {
        throw new ImplementMeException();
    }

    merge(state1: GraphAbstractState, state2: GraphAbstractState): boolean {
        throw new ImplementMeException();
    }

    stop(state: GraphAbstractState, reached: ReachedSet<GraphAbstractState>): GraphAbstractState {
        throw new ImplementMeException();
    }

    target(state: GraphAbstractState): boolean {
        throw new ImplementMeException();
    }

    widen(state: GraphAbstractState): GraphAbstractState {
        throw new ImplementMeException();
    }

}
