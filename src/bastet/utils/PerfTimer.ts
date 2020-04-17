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

import {Preconditions} from "./Preconditions";

const { performance } = require('perf_hooks');

/**
 * Time is measured in milliseconds.
 */
export class PerfTimer {

    private _lastIntervalDuration: number;

    private _totalDuartion: number;

    private _startTime: number;

    private _stopTime: number;

    private readonly _onStopCallback: (timer: PerfTimer) => void;

    constructor(onStopCallback: (timer: PerfTimer) => void) {
        this._onStopCallback = onStopCallback;
        this._totalDuartion = 0;
        this._lastIntervalDuration = 0;
    }

    public start() {
        this._startTime = performance.now();
        this._stopTime = 0;
    }

    public stop(): number {
        this._stopTime = performance.now();
        const result = this.stopWith(this._stopTime);
        this._startTime = 0;
        return result;
    }

    public stopWith(commonTimeMsec: number): number {
        this._stopTime = commonTimeMsec;

        this._lastIntervalDuration = this._stopTime - this._startTime;
        this._totalDuartion = this._totalDuartion + this._lastIntervalDuration;

        if (this._onStopCallback) {
            this._onStopCallback(this);
        }
        return this.totalDuration;
    }

    get activeIntervalDuration(): number {
        Preconditions.checkState(this._startTime > 0);
        Preconditions.checkState(this._stopTime == 0);
        return performance.now() - this._startTime;
    }

    get lastIntervalDuration(): number {
        return this._lastIntervalDuration;
    }

    get totalDuration() : number {
        return this._totalDuartion;
    }
}