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
import {
    GraphAbstractDomain,
    GraphAbstractState,
    GraphAbstractStateFactory,
    GraphConcreteState
} from "./GraphAbstractDomain";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {App} from "../../../syntax/app/App";
import {GraphTransferRelation} from "./GraphTransferRelation";
import {AbstractElement} from "../../../lattices/Lattice";

export class GraphAnalysis implements WrappingProgramAnalysis<GraphConcreteState, GraphAbstractState> {

    private readonly _abstractDomain: AbstractDomain<GraphConcreteState, GraphAbstractState>;

    private readonly _wrappedAnalysis: ProgramAnalysis<any, any>;

    private readonly _transferRelation: GraphTransferRelation;

    constructor(wrappedAnalysis: ProgramAnalysis<any, any>) {
        this._wrappedAnalysis = wrappedAnalysis;
        this._abstractDomain = new GraphAbstractDomain();
        this._transferRelation = new GraphTransferRelation((e) => this._wrappedAnalysis.abstractSucc(e));
    }

    abstractSucc(fromState: GraphAbstractState): Iterable<GraphAbstractState> {
        return this._transferRelation.abstractSucc(fromState);
    }

    join(state1: GraphAbstractState, state2: GraphAbstractState): GraphAbstractState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    merge(state1: GraphAbstractState, state2: GraphAbstractState): boolean {
        // MERGE-SEP
        return false;
    }

    stop(state: GraphAbstractState, reached: Iterable<GraphAbstractState>): boolean {
        for (const r of reached) {
            const w: AbstractElement = state.getWrappedState();
            if (this._wrappedAnalysis.stop(w, [r.getWrappedState()])) {
                return true;
            }
        }
        return false;
    }

    target(state: GraphAbstractState): boolean {
        return this._wrappedAnalysis.target(state.wrappedState);
    }

    widen(state: GraphAbstractState): GraphAbstractState {
        // TODO: Implement the widening (delegate to wrapped analyses)
        return state;
    }

    get abstractDomain(): AbstractDomain<GraphConcreteState, GraphAbstractState> {
        return this._abstractDomain;
    }

    get wrappedAnalysis(): ProgramAnalysis<any, any> {
        return this._wrappedAnalysis;
    }

    initialStatesFor(task: App): GraphAbstractState[] {
        return this._wrappedAnalysis.initialStatesFor(task).map((w) => {
            return GraphAbstractStateFactory.withFreshID([], w);
        } );
    }

}
