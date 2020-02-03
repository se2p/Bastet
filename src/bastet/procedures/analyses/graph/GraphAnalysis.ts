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

import {ProgramAnalysis, WrappingProgramAnalysis} from "../ProgramAnalysis";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {StateSet} from "../../algorithms/StateSet";
import {GraphConcreteState, GraphAbstractDomain, GraphAbstractStateAttribs} from "./GraphAbstractDomain";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {App} from "../../../syntax/app/App";

export class GraphAnalysis implements WrappingProgramAnalysis<GraphConcreteState, GraphAbstractStateAttribs> {

    private _abstractDomain: AbstractDomain<GraphConcreteState, GraphAbstractStateAttribs>;

    private _wrappedAnalysis: ProgramAnalysis<any, any>;

    constructor(wrappedAnalysis: ProgramAnalysis<any, any>) {
        this._wrappedAnalysis = wrappedAnalysis;
        this._abstractDomain = new GraphAbstractDomain();
    }

    abstractSucc(fromState: GraphAbstractStateAttribs): Iterable<GraphAbstractStateAttribs> {
        throw new ImplementMeException();
    }

    join(state1: GraphAbstractStateAttribs, state2: GraphAbstractStateAttribs): GraphAbstractStateAttribs {
        throw new ImplementMeException();
    }

    merge(state1: GraphAbstractStateAttribs, state2: GraphAbstractStateAttribs): boolean {
        throw new ImplementMeException();
    }

    stop(state: GraphAbstractStateAttribs, reached: StateSet<GraphAbstractStateAttribs>): GraphAbstractStateAttribs {
        throw new ImplementMeException();
    }

    target(state: GraphAbstractStateAttribs): boolean {
        return this._wrappedAnalysis.target(state.wrappedState);
    }

    widen(state: GraphAbstractStateAttribs): GraphAbstractStateAttribs {
        throw new ImplementMeException();
    }

    get abstractDomain(): AbstractDomain<GraphConcreteState, GraphAbstractStateAttribs> {
        return this._abstractDomain;
    }

    get wrappedAnalysis(): ProgramAnalysis<any, any> {
        return this._wrappedAnalysis;
    }

    initialStatesFor(task: App): GraphAbstractStateAttribs[] {
        const wrappedInitialStates = this._wrappedAnalysis.initialStatesFor(task);
        throw new ImplementMeException();
    }

}
