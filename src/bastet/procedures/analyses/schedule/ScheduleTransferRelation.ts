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
import {ScheduleAbstractState, THREAD_STATE_DONE, THREAD_STATE_RUNNING, ThreadState} from "./ScheduleAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {LocationID} from "../../../syntax/app/controlflow/ControlLocation";
import {AbstractElement} from "../../../lattices/Lattice";

export class ScheduleTransferRelation implements TransferRelation<ScheduleAbstractState> {

    private readonly _wrappedTransferRelation: LabeledTransferRelation<AbstractElement>;

    constructor(wrappedTransferRelation: LabeledTransferRelation<AbstractElement>) {
        this._wrappedTransferRelation = wrappedTransferRelation;
    }

    /**
     * See the function `stepThreads()` of `sequencer.js` in the Scratch VM.
     *
     * @param fromState
     */
    abstractSucc(fromState: ScheduleAbstractState): Iterable<ScheduleAbstractState> {
        Preconditions.checkState(fromState.threadStates.size <= 1, "More than one thread not yet supported");

        if (fromState.threadStates.size == 0) {
            return [fromState];
        } else if (fromState.threadStates.size == 1) {
            const t: ThreadState = fromState.threadStates.get(0);
            Preconditions.checkNotUndefined(t);
            if (t.getComputationState() === THREAD_STATE_DONE) {
                return [fromState];
            } else if (t.getComputationState() === THREAD_STATE_RUNNING) {
                // Determine the (sequences of) control-flow transition(s) to execute in this step
                // ATTENTION: We assume that each sequence corresponds to an atomic
                //      statement in the input programming language (Scratch)
                const opSeqs: [ProgramOperation[], LocationID][] = this.resolveStepOpSeqs(t);

                // Compute a successor state for each sequence and call the wrapped analysis to do so
                for (const [opSeq, succLoc] of opSeqs) {
                    const wrappedSuccState = this.computeWrappedSuccState(fromState.wrappedState, opSeq);
                }
                throw new ImplementMeException();
            } else {
                throw new IllegalStateException("Yet unsupported thread state!");
            }
        } else {
            throw new IllegalStateException("More than one thread not yet supported.");
        }
    }

    private computeWrappedSuccState(wrappedState: any, opSeq: ProgramOperation[]): AbstractElement {
        let result: AbstractElement = wrappedState;

        for (let op of opSeq) {
            result = this._wrappedTransferRelation.abstractSuccFor(result, op);
        }

        return result;
    }

    private resolveStepOpSeqs(t: ThreadState): [ProgramOperation[], LocationID][] {
        throw new ImplementMeException();
    }

    private reastartThread(state: ScheduleAbstractState): ScheduleAbstractState {
        throw new ImplementMeException();
    }

    private stopThisScript(state: ScheduleAbstractState): ScheduleAbstractState {
        throw new ImplementMeException();
    }

}
