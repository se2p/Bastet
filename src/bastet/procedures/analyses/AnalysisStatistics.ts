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

import {Preconditions} from "../../utils/Preconditions";
import {PerfTimer} from "../../utils/PerfTimer";

export class AnalysisStatistics {

    private readonly _name: string;

    private readonly _statisticsTree : {};

    private readonly _contextTimer: PerfTimer;

    constructor(name: string, context: {}) {
        this._statisticsTree = Preconditions.checkNotUndefined(context);
        this._name = Preconditions.checkNotEmpty(name);
        this._contextTimer = new PerfTimer((t) => {
            this._statisticsTree['duration'] = t.totalDuration;
        });
    }

    get contextTimer(): PerfTimer {
        return this._contextTimer;
    }

    public startTimer() {
        this.contextTimer.start();
    }

    public stopTimer() {
        this.contextTimer.stop();
    }

    public runWithTimer<R>(command: () => R): R {
        this.startTimer();
        try {
            return command();
        } finally {
            this.stopTimer();
        }
    }

    public withContext(name: string): AnalysisStatistics {
        let newContextRoot = this._statisticsTree[name];
        if (!newContextRoot) {
            newContextRoot = this._statisticsTree[name] = {};
        }
        return new AnalysisStatistics(name, newContextRoot);
    }

    public increment(key: string) {
        this.incrementBy(key, 1);
    }

    public incrementBy(key: string, by: number) {
        const currentValue = this._statisticsTree[key] || 0;
        this._statisticsTree[key] = currentValue + by;
    }

    public put(key: string, value: any) {
        Preconditions.checkNotEmpty(key);
        this._statisticsTree[key] = value;
    }

    public stringifyToJSON(): string {
        return JSON.stringify(this._statisticsTree, null, "    ");
    }

}
