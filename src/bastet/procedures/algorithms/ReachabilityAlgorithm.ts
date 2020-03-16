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

import {AbstractElement} from "../../lattices/Lattice";
import {ProgramAnalysis} from "../analyses/ProgramAnalysis";
import {ChooseOperator, StateSet} from "./StateSet";
import {Preconditions} from "../../utils/Preconditions";
import {ConcreteElement} from "../domains/ConcreteElements";
import {AnalysisStatistics} from "../analyses/AnalysisStatistics";
import {BastetConfiguration} from "../../utils/BastetConfiguration";
import {ExportFunction, resolveResultExportFunction} from "../analyses/Analyses";
import {AnalysisAlgorithm} from "./Algorithm";
import {StatsAnalysis} from "../analyses/stats/StatsAnalysis";

const { performance } = require('perf_hooks');

export const STAT_KEY_REACH_ITERATIONS = "iterations";
export const STAT_KEY_REACH_REACHED = "reached states";
export const STAT_KEY_REACH_FRONTIER = "frontier states";

export class ReachabilityAlgorithmConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ['ReachabilityAlgorithm']);
    }

    get dumpGraphAfterIteration(): boolean {
        return this.getBoolProperty('dump-graph-after-iteration', true);
    }

}

/**
 * The implementation of this algorithm is inspired by the
 * reachability algorithm that can be found in the CPA framework;
 * nevertheless, our implementation has important differences.
 */
export class ReachabilityAlgorithm<C extends ConcreteElement, E extends AbstractElement> implements AnalysisAlgorithm<C, E> {

    private readonly _analysis: ProgramAnalysis<C, E>;
    private readonly _chooseOp: ChooseOperator<E>;
    private readonly _statistics: AnalysisStatistics;
    private readonly _config: ReachabilityAlgorithmConfig;

    private _exportFunction: ExportFunction;

    private _lastOutputTime: number;
    private _lastTimeForMerge: number;
    private _lastTimeForStop: number;
    private _lastTimeForSucc: number;
    private _lastTimeForWiden: number;

    constructor(config: {}, analysis: ProgramAnalysis<C, E>, chooseOp: ChooseOperator<E>, statistics: AnalysisStatistics) {
        this._config = new ReachabilityAlgorithmConfig(config);
        this._analysis = Preconditions.checkNotUndefined(analysis);
        this._chooseOp = Preconditions.checkNotUndefined(chooseOp);
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(this.constructor.name);
        this._exportFunction = resolveResultExportFunction(this._analysis);

        this._lastOutputTime = performance.now();
        this._lastTimeForMerge = 0;
        this._lastTimeForStop = 0;
        this._lastTimeForSucc = 0;
        this._lastTimeForWiden = 0;
    }

    get analysis(): ProgramAnalysis<C, E> {
        return this._analysis;
    }

    public run(frontier: StateSet<E>, reached: StateSet<E>): [StateSet<E>, StateSet<E>] {
        while (!frontier.isEmpty()) {
            this._statistics.increment(STAT_KEY_REACH_ITERATIONS);

            // CHOOSE: Choose the next state to compute successors for.
            //      This step determines the state-space traversal strategy.
            const e: E = this._chooseOp.choose();
            frontier.remove(e);

            // SUCC: Compute the set of successor states
            for (const ePrime of this._analysis.abstractSucc(e)) {
                // WIDEN: Apply the widening operator.
                //    ATTENTION: We assume that the abstraction
                //      precision to use for widening is determined by an
                //      inner analysis component from the given abstract state `ePrime`.
                // TODO: Adjust the widening such that it can return a set of states?
                const ePrimePrime: E = this._analysis.widen(ePrime);

                // MERGE: If desired, merge certain states
                const removeFromReached: Set<E> = new Set<E>();
                const addToReached: Set<E> = new Set<E>();
                const relevantReached: StateSet<E> = reached.getStateSet(ePrimePrime);
                for (let r of relevantReached) {
                    if (this._analysis.merge(ePrimePrime, r)) {
                        const ePrimePrimePrime = this._analysis.join(ePrimePrime, r);
                        removeFromReached.add(r);
                        addToReached.add(ePrimePrimePrime);
                    }
                }
                reached.removeAll(removeFromReached);
                reached.addAll(addToReached);


                // STOP: Check for coverage (fixed point iteration)
                const checkStopFor: E = ePrimePrime; // TODO: How does this interact with the 'merge' above
                if (!this._analysis.stop(checkStopFor, reached)) {
                    frontier.add(checkStopFor);
                    reached.add(checkStopFor);

                    // TARGET: Has a target state been signaled?
                    if (this._analysis.target(checkStopFor).length > 0) {
                        return this.takeNoteOfResult(frontier, reached);
                    }
                }

                this.algorithmMonitoringHook(frontier, reached);
            }
        }

        Preconditions.checkState(frontier.isEmpty());
        this.algorithmMonitoringHook(frontier, reached);
        return this.takeNoteOfResult(frontier, reached);
    }

    private takeNoteOfResult(frontier: StateSet<E>, reached: StateSet<E>): [StateSet<E>, StateSet<E>] {
        this._statistics.put(STAT_KEY_REACH_REACHED, reached.getSize());
        this._statistics.put(STAT_KEY_REACH_FRONTIER, frontier.getSize());

        const statAnalysis: StatsAnalysis<any, any> = this._analysis as StatsAnalysis<any, any>;

        const elapsed = performance.now() - this._lastOutputTime;
        if (elapsed > 10000) {
            const timeForWiden = statAnalysis.widenStats.contextTimer.totalDuration;
            const timeForStop = statAnalysis.stopStats.contextTimer.totalDuration;
            const timeForSucc = statAnalysis.succStats.contextTimer.totalDuration;
            const timeForMerge = statAnalysis.mergeStats.contextTimer.totalDuration;

            console.log(`Reached ${reached.getSize()} states, ${frontier.getSize()} in frontier, succ ${timeForSucc - this._lastTimeForSucc}, merge ${timeForMerge - this._lastTimeForMerge}, stop ${timeForStop - this._lastTimeForStop}, widen ${timeForWiden - this._lastTimeForWiden}`);

            this._lastOutputTime = performance.now();
            this._lastTimeForWiden = timeForWiden;
            this._lastTimeForStop = timeForStop;
            this._lastTimeForSucc = timeForSucc;
            this._lastTimeForMerge = timeForMerge;
        }

        return [frontier, reached];
    }

    private algorithmMonitoringHook(frontier: StateSet<E>, reached: StateSet<E>) {
        if (this._config.dumpGraphAfterIteration) {
            if (this._exportFunction) {
                this._exportFunction(reached, frontier);
            }
        }
    }
}
