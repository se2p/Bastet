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

import {PerfTimer} from "./PerfTimer";
import {Preconditions} from "./Preconditions";

export interface Budget {

    isExhausted(): boolean;

    beginBudget();

    raiseIfExhausted();

}

export class BudgetExhaustedException extends Error {

    private readonly _budget: Budget;

    constructor(message: string, budget: Budget) {
        super(message);
        this._budget = budget;
    }

    get budget(): Budget {
        return this._budget;
    }

}

export class InfiniteBudget implements Budget {

    public isExhausted(): boolean {
        return false;
    }

    public beginBudget() {
    }

    public raiseIfExhausted() {
    }
}

export class WallTimeDurationBudget implements Budget {

    private readonly _durationMSecs: number;

    private readonly _consumed: PerfTimer;

    constructor(durationMSecs: number) {
        this._consumed = new PerfTimer(null);
        this._durationMSecs = durationMSecs;
    }

    public beginBudget() {
        this._consumed.start();
    }

    public isExhausted(): boolean {
        return this._consumed.activeIntervalDuration > this._durationMSecs;
    }

    public raiseIfExhausted() {
        if (this.isExhausted()) {
            throw new BudgetExhaustedException("The time budget has been exhausted!", this);
        }
    }

}

var budgetStack: Budget[] = [];

export function getActiveBudget(): Budget {
    return budgetStack[budgetStack.length-1];
}

export function pushActiveBudget(budget: Budget) {
    Preconditions.checkNotUndefined(budget);
    budgetStack.push(budget);
}

export function popActiveBudget(budget: Budget) {
    Preconditions.checkState(getActiveBudget() == budget);
    budgetStack.pop();
}
