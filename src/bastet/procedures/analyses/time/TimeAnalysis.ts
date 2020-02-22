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

import {ProgramAnalysis, ProgramAnalysisWithLabels, WrappingProgramAnalysis} from "../ProgramAnalysis";
import {AbstractElement} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {ConcreteElement} from "../../domains/ConcreteElements";
import {Property} from "../../../syntax/Property";
import {StateSet} from "../../algorithms/StateSet";
import {App} from "../../../syntax/app/App";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {Refiner} from "../Refiner";
import {ProgramTimeProfile} from "../../../utils/TimeProfile";
import {TimeTransferRelation} from "./TimeTransferRelation";
import {LabeledTransferRelationImpl} from "../TransferRelation";

export class TimeAnalysis<C extends ConcreteElement, E extends AbstractElement> implements WrappingProgramAnalysis<C, E> {

    private readonly _wrappedAnalysis: ProgramAnalysis<any, any>;

    private readonly _statistics: AnalysisStatistics;

    private readonly _timeProfile: ProgramTimeProfile;

    private readonly _transfer: TimeTransferRelation<any>;

    constructor(wrappedAnalysis: ProgramAnalysisWithLabels<any, any>, statistics: AnalysisStatistics,
                timeProfile: ProgramTimeProfile) {
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(wrappedAnalysis.constructor.name);
        this._wrappedAnalysis = Preconditions.checkNotUndefined(wrappedAnalysis);
        this._timeProfile = Preconditions.checkNotUndefined(timeProfile);
        this._transfer = new TimeTransferRelation(timeProfile,
            new LabeledTransferRelationImpl(null,
            (from, op, co) => wrappedAnalysis.abstractSuccFor(from, op, co)));
    }

    abstractSucc(fromState: E): Iterable<E> {
        return this._wrappedAnalysis.abstractSucc(fromState);
    }

    initialStatesFor(task: App): E[] {
        return this._wrappedAnalysis.initialStatesFor(task);
    }

    join(state1: E, state2: E): E {
        return this._wrappedAnalysis.join(state1, state2);
    }

    merge(state1: E, state2: E): boolean {
        return this._wrappedAnalysis.merge(state1, state2);
    }

    stop(state: E, reached: Iterable<E>): boolean {
        return this._wrappedAnalysis.stop(state, reached);
    }

    target(state: E): Property[] {
        return this._wrappedAnalysis.target(state);
    }

    widen(state: E): E {
        return this._wrappedAnalysis.widen(state);
    }

    wrapStateSets(frontier: StateSet<E>, reached: StateSet<E>): [StateSet<E>, StateSet<E>] {
        return this._wrappedAnalysis.wrapStateSets(frontier, reached);
    }

    get abstractDomain(): AbstractDomain<C, E> {
        return this._wrappedAnalysis.abstractDomain;
    }

    get refiner(): Refiner<E> {
        return this._wrappedAnalysis.refiner;
    }

    get wrappedAnalysis(): ProgramAnalysis<any, any> {
        return this._wrappedAnalysis;
    }

}
