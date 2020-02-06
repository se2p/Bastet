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
    THREAD_STATE_RUNNING_ATOMIC, THREAD_STATE_YIELD,
    ThreadState
} from "./ScheduleAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {LocationID} from "../../../syntax/app/controlflow/ControlLocation";
import {AbstractElement} from "../../../lattices/Lattice";
import {App} from "../../../syntax/app/App";
import {ScheduleAnalysisConfig} from "./ScheduleAnalysis";
import {List as ImmList} from "immutable";
import {BroadcastAndWaitStatement} from "../../../syntax/ast/core/statements/BroadcastAndWaitStatement";
import {WaitSecsStatement} from "../../../syntax/ast/core/statements/WaitSecsStatement";
import {WaitUntilStatement} from "../../../syntax/ast/core/statements/WaitUntilStatement";
import {BooleanExpression} from "../../../syntax/ast/core/expressions/BooleanExpression";

export type Schedule = ImmList<ThreadState>;

class StepInformation {

    private readonly _threadIndex: number;
    private readonly _succLoc: LocationID;
    private readonly _isInnerAtomic: boolean;
    private readonly _ops: ProgramOperation[];

    constructor(threadIndex: number, succLoc: number, isInnerAtomic: boolean, ops: ProgramOperation[]) {
        this._threadIndex = threadIndex;
        this._succLoc = succLoc;
        this._isInnerAtomic = isInnerAtomic;
        this._ops = ops;
    }

    get threadIndex(): number {
        return this._threadIndex;
    }

    get succLoc(): number {
        return this._succLoc;
    }

    get isInnerAtomic(): boolean {
        return this._isInnerAtomic;
    }

    get ops(): ProgramOperation[] {
        return this._ops;
    }
}

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
        //    to a deterministic execution order. Nevertheless, there is a WORK_TIME timeout:
        //    reaching this timeout makes executions non-deterministic, because
        //    the the scheduling starts from the first thread in the list if this timout is reached.
        //
        // APPROACH:
        //    To make only sound propositions about Scratch programs, we throw
        //    an exception if the WORK_TIME timeout would have been reached before
        //    all threads in the list were stepped.

        const threadsToStep: number[] = this.chooseThreadToStep(fromState);
        if (threadsToStep.length === 0) {
            return [];
        }
        Preconditions.checkState(threadsToStep.length === 1);

        const threadIndexToStep: number = threadsToStep[0];
        const threadToStep: ThreadState = fromState.getThreadStates()[threadIndexToStep];
        Preconditions.checkState(threadToStep.getComputationState() === THREAD_STATE_RUNNING || threadToStep.getComputationState() === THREAD_STATE_RUNNING_ATOMIC);

        // Determine the (sequences of) control-flow transition(s) to execute in this step
        // ATTENTION: We assume that each sequence corresponds to an atomic
        //      statement in the input programming language (Scratch)
        const opSeq: [ProgramOperation, LocationID, boolean][] = this.resolveStepOp(threadToStep);
        Preconditions.checkState(opSeq.length === 1);
        const [stepOp, succLoc, isInnerAtomic] = opSeq[0];

        const stepToTake: StepInformation = new StepInformation(threadIndexToStep, succLoc, isInnerAtomic, [stepOp]);

        const result: ScheduleAbstractState[] = [];

        // Determine the new schedule (the next thread to execute)
        //   TODO: Take triggered events into account
        //   TODO: Determine sets of threads to wait for
        const nextSchedules: Schedule[] = this.computeNextSchedules(fromState.getThreadStates(), stepToTake);

        for (const newThreadStates of nextSchedules) {
            // Compute a successor state for each sequence and call the wrapped analysis to do so
            let wrappedSuccStates: Iterable<AbstractElement> = this._wrappedTransferRelation.abstractSuccFor(fromState.wrappedState, stepOp);

            for (const w of wrappedSuccStates) {
                const e = new ScheduleAbstractState(newThreadStates, w);
                result.push(e);
            }
        }

        return result;
    }

    /**
     * Get the list of indices of threads in the list of threads
     * that should make a step.
     *
     * @param fromState
     */
    private chooseThreadToStep(fromState: ScheduleAbstractState): number[] {
        throw new ImplementMeException();
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

    private computeNextSchedules(threadStates: Schedule, takenStep: StepInformation): Schedule[] {
        Preconditions.checkNotUndefined(threadStates);
        Preconditions.checkNotUndefined(takenStep);
        Preconditions.checkArgument(takenStep.ops.length === 1);

        let resultBase: Schedule = threadStates;

        const idx = takenStep.threadIndex;
        const op = takenStep.ops[0];
        const steppedThread = threadStates.get(idx);

        // TODO: Where and how to handle the `clone` statement?

        //
        // Handle different statements that start other threads and wait for them
        //
        if (op.ast instanceof BroadcastAndWaitStatement) {
            const stmt: BroadcastAndWaitStatement = op.ast as BroadcastAndWaitStatement;
            const waitForIndices: number[] = this.getAllMessageReceiverThreadsFrom(threadStates);
            const waitFor: ThreadState[] = waitForIndices.map((idx) => threadStates.get(idx));

            // Prepare the waiting threads for running
            for (const waitForThreadIdx of waitForIndices) {
                resultBase.set(waitForThreadIdx,
                    resultBase.get(waitForThreadIdx)
                        .withComputationState(THREAD_STATE_YIELD));
            }

            // Wait for all triggered threads to finish
            resultBase.set(idx, steppedThread.withWaitingForThreads(
                    steppedThread
                        .getWaitingForThreads()
                        .union(waitFor.map((t) => t.getThreadId()))));

        } else if (op.ast instanceof WaitUntilStatement) {
            const stmt: WaitUntilStatement = op.ast as WaitUntilStatement;

            // ASSUMPTION:
            //   For each WaitUntilStatement exists a special script that is triggered
            //   whenever the condition is met. The body of this script is empty.

            // const waitfor: ThreadState = this.getConditionCheckThreadFrom(threadStates, stmt.cond);
            // Preconditions.checkState(waitfor !== null, "There must be one condition check thread");

            // TODO:
            //   We might have to introduce an EXIT code of threads that signals
            //   whether or not a specific control location has been reached while
            //   processing the body.
            throw new ImplementMeException();

        } else if (op.ast instanceof WaitSecsStatement) {
            const stmt: WaitSecsStatement = op.ast as WaitSecsStatement;
            // const timeCond: BooleanExpression = this.createTimeCond(stmt.secs);
            // const waitfor: ThreadState = this.createTemporaryCheckThreadFor(timeCond);

            // TODO:
            //   Since (1) the `WaitSecsStatement` can be parameterized with
            //   a number expression, and (2) the condition is relative to the
            //   time the statement was invoked, a more elaborated logic is needed here.
            throw new ImplementMeException();
        }

        let succCompState: number = THREAD_STATE_YIELD;
        if (takenStep.isInnerAtomic) {
            succCompState = THREAD_STATE_RUNNING_ATOMIC;
        }

        // TODO: Different schedules that were triggered by different events

        // TODO: WaitUntilStatement (should trigger a corresponding hat with ConditionReachedEvent and waits for it)
        // TODO: WaitSecsStatement (also triggers a hat with ConditionReachedEvent and waits for it)
        // TODO: BroadcastAndWaitStatement (triggeres all registered hats and waits for them)

        // TODO: Hats to activate:
        //  - BootStrap
        //  - AfterBootstrap
        //  - Startup
        //  - StartedAsClone
        //  - ReceivedMessage (after a Broadcast op)
        //  - ReachedCondition (after each user-visible state)

        // TODO: Mouse inputs, keyboard inputs, microphone inputs, others?


        // TODO: Produce a state with THREAD_STATE_RUNNING_ATOMIC if isInnerAtomic
        throw new ImplementMeException();
    }

    private getAllMessageReceiverThreadsFrom(threadStates: Schedule): number[] {
        throw new ImplementMeException();
    }
}
