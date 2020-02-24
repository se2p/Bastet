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

import {App} from "../syntax/app/App";
import {Set as ImmSet} from "immutable";
import {Property} from "../syntax/Property";
import {Preconditions} from "../utils/Preconditions";
import {AnalysisStatistics} from "./analyses/AnalysisStatistics";

export interface AnalysisProcedure {

    run(task: App) : Promise<AnalysisResult>;

}

export interface AnalysisResult {

    statistics: AnalysisStatistics;

}

export class NullAnalysisResult implements AnalysisResult {

    private _statistics: AnalysisStatistics;

    constructor(stats: AnalysisStatistics) {
        this._statistics = Preconditions.checkNotUndefined(stats);
    }

    get statistics(): AnalysisStatistics {
        return this._statistics;
    }
}

export class MultiPropertyAnalysisResult {

    private readonly _satisfied: ImmSet<Property>;

    private readonly _violated: ImmSet<Property>;

    private readonly _unknown: ImmSet<Property>;

    private readonly _statistics: AnalysisStatistics;

    constructor(satisfied: ImmSet<Property>, violated: ImmSet<Property>, unknown: ImmSet<Property>, statistics: AnalysisStatistics) {
        this._satisfied = Preconditions.checkNotUndefined(satisfied);
        this._violated = Preconditions.checkNotUndefined(violated);
        this._unknown = Preconditions.checkNotUndefined(unknown);
        this._statistics = Preconditions.checkNotUndefined(statistics);
    }

    get satisfied(): ImmSet<Property> {
        return this._satisfied;
    }

    get violated(): ImmSet<Property> {
        return this._violated;
    }

    get unknown(): ImmSet<Property> {
        return this._unknown;
    }

    get statistics(): AnalysisStatistics {
        return this._statistics;
    }
}
