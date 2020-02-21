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


import {AbstractElement} from "../../lattices/Lattice";
import {ConcreteElement} from "../domains/ConcreteElements";
import {Property} from "../../syntax/Property";
import {App} from "../../syntax/app/App";
import {Record as ImmRec, Set as ImmSet} from "immutable";
import {ProgramAnalysis} from "../analyses/ProgramAnalysis";
import {AnalysisAlgorithm} from "./Algorithm";
import {Preconditions} from "../../utils/Preconditions";
import {StateSet} from "./StateSet";
import {AnalysisStatistics} from "../analyses/AnalysisStatistics";

export type ResultCallback = (violated: ImmSet<Property>, satisfied: ImmSet<Property>, unknown: ImmSet<Property>, stats: AnalysisStatistics) => void;

export const STAT_KEY_MPA_ITERATIONS = "iterations";

export class MultiPropertyAlgorithm<C extends ConcreteElement, E extends AbstractElement> implements AnalysisAlgorithm<C, E>{

    private readonly _task: App;

    private readonly _properties: ImmSet<Property>;

    private readonly _wrappedAlgorithm: AnalysisAlgorithm<C, E>;

    private readonly _analysis: ProgramAnalysis<C, E>;

    private readonly _resultCallback: ResultCallback;

    private readonly _statistics: AnalysisStatistics;

    constructor(task: App, algorithm: AnalysisAlgorithm<C, E>, analysis: ProgramAnalysis<C, E>, stats: AnalysisStatistics, resultCallback: ResultCallback) {
        this._task = Preconditions.checkNotUndefined(task);
        this._wrappedAlgorithm = Preconditions.checkNotUndefined(algorithm);
        this._analysis = Preconditions.checkNotUndefined(analysis);
        this._resultCallback = Preconditions.checkNotUndefined(resultCallback);
        this._statistics = Preconditions.checkNotUndefined(stats).withContext(this.constructor.name);
        this._properties = this._task.getProperties();
    }

    run(frontier: StateSet<E>, reached: StateSet<E>): [StateSet<E>, StateSet<E>] {
        let violated: ImmSet<Property> = ImmSet();
        let satisfied: ImmSet<Property> = ImmSet();
        let unknown: ImmSet<Property> = ImmSet();

        this._statistics.contextTimer.start();
        try {
            do {
                this._statistics.increment(STAT_KEY_MPA_ITERATIONS);
                [frontier, reached] = this._wrappedAlgorithm.run(frontier, reached);

                if (reached.getAddedLast().length > 0) {
                    Preconditions.checkState(reached.getAddedLast().length > 0);
                    const lastState = reached.getAddedLast()[0];
                    const targetProperties = ImmSet<Property>(this._analysis.target(lastState));
                    violated = violated.union(targetProperties);
                }
            } while (!frontier.isEmpty());
        } finally {
            this._statistics.contextTimer.stop();
        }

        this._resultCallback(violated, satisfied, unknown, this._statistics);

        return [frontier, reached];
    }

}
