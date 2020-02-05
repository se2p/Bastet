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

import {LabeledTransferRelation, TransferRelation} from "../TransferRelation";
import {
    ScheduleAbstractState,
    THREAD_STATE_DONE,
    THREAD_STATE_RUNNING,
    THREAD_STATE_RUNNING_ATOMIC,
    ThreadState
} from "./ScheduleAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {LocationID} from "../../../syntax/app/controlflow/ControlLocation";
import {AbstractElement} from "../../../lattices/Lattice";
import {App} from "../../../syntax/app/App";
import {ScheduleAnalysisConfig} from "./ScheduleAnalysis";

/**
 * Mimics the green-threading of the Scratch VM.
 * Adds special scheduling of some (types of) threads.
 */
export class ScheduleTransferRelation implements TransferRelation<ScheduleAbstractState> {

    private readonly _wrappedTransferRelation: LabeledTransferRelation<AbstractElement>;
    private readonly _config: ScheduleAnalysisConfig;
    private readonly _task: App;

    constructor(config: ScheduleAnalysisConfig, task: App, wrappedTransferRelation: LabeledTransferRelation<AbstractElement>) {
        this._task = Preconditions.checkNotUndefined(task);
        this._config = Preconditions.checkNotUndefined(config);
        this._wrappedTransferRelation = Preconditions.checkNotUndefined(wrappedTransferRelation);
    }

    abstractSucc(fromState: ScheduleAbstractState): Iterable<ScheduleAbstractState> {
        if (this._config.aggregateAtomicTransitions) {
            throw new ImplementMeException();
        } else {
            return this.abstractSuccSingleStep(fromState);
        }
    }

    /**
     * See the function `stepThreads()` of `sequencer.js` in the Scratch VM.
     *
     * @param fromState
     */
    abstractSuccSingleStep(fromState: ScheduleAbstractState): Iterable<ScheduleAbstractState> {
        if (this.hasObserverThreadToProcess(fromState)) {
            // If there is a thread state of the specification in the
            // state RUNNING, or WAITING, step it until no more of those are left.
            return this.specificationStep(fromState);
        } else {
            return this.programStep(fromState).map(
                (succ) =>
                    this.startAfterProgramStatementHandlerThreads(succ) );
        }
    }

    programStep(fromState: ScheduleAbstractState): ScheduleAbstractState[] {
        Preconditions.checkState(fromState.threadStates.size <= 1, "More than one thread not yet supported");

        // ATTENTION!!
        //
        // PROBLEM:
        //    The scheduling does not implement all details of the Scratch VM. In general,
        //    the Scratch VM implements a round-robin scheduling which would lead
        //    to a deterministic execution order. Nevertheless, there is a WORK_TIME timeout;
        //    reaching this timeout makes executions non-deterministic, because
        //    the the scheduling starts from the first thread in the list if this timout is reached.
        //
        // APPROACH:
        //    To make only sound propositions about Scratch programs, we throw
        //    an exception if the WORK_TIME timeout would have been reached before
        //    all threads in the list were stepped.

        if (fromState.threadStates.size == 0) {
            return [];
        } else if (fromState.threadStates.size == 1) {
            const t: ThreadState = fromState.threadStates.get(0);
            Preconditions.checkNotUndefined(t);
            if (t.getComputationState() === THREAD_STATE_DONE) {
                return [fromState];
            } else if (t.getComputationState() === THREAD_STATE_RUNNING || t.getComputationState() === THREAD_STATE_RUNNING_ATOMIC) {
                // Determine the (sequences of) control-flow transition(s) to execute in this step
                // ATTENTION: We assume that each sequence corresponds to an atomic
                //      statement in the input programming language (Scratch)
                const opSeq: [ProgramOperation, LocationID, boolean][] = this.resolveStepOp(t);

                // Compute a successor state for each sequence and call the wrapped analysis to do so
                for (const [op, succLoc, isInnerAtomic] of opSeq) {
                    const wrappedSuccState = this._wrappedTransferRelation.abstractSuccFor(fromState.wrappedState, op);
                    // TODO: Produce a state with THREAD_STATE_RUNNING_ATOMIC if isInnerAtomic
                }
                throw new ImplementMeException();
            } else {
                throw new IllegalStateException("Yet unsupported thread state!");
            }
        } else {
            throw new IllegalStateException("More than one thread not yet supported.");
        }
    }


    private startAfterProgramStatementHandlerThreads(onState: ScheduleAbstractState): ScheduleAbstractState {
        throw new ImplementMeException();
    }

    /**
     * Returns either a singleton-list or the empty list.
     */
    private resolveStepOp(t: ThreadState): [ProgramOperation, LocationID, boolean][] {
        throw new ImplementMeException();
    }

    private restartThread(state: ScheduleAbstractState): ScheduleAbstractState {
        throw new ImplementMeException();
    }

    private stopThisScript(state: ScheduleAbstractState): ScheduleAbstractState {
        throw new ImplementMeException();
    }

    private hasObserverThreadToProcess(fromState: ScheduleAbstractState): boolean {
        throw new ImplementMeException();
    }

    private specificationStep(fromState: ScheduleAbstractState): Iterable<ScheduleAbstractState> {
        throw new ImplementMeException();
    }
}
