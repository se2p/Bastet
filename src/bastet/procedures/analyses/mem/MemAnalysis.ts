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

import {ProgramAnalysis} from "../ProgramAnalysis";
import {MemAbstractState} from "./MemAbstractDomain";
import {AbstractDomain} from "../AbstractDomain";
import {StateSet} from "../../algorithms/StateSet";
import {App} from "../../../syntax/app/App";
import {LabeledTransferRelation} from "../TransferRelation";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {MemTransferRelation} from "./MemTransferRelation";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export class MemAnalysis implements ProgramAnalysis<MemAbstractState>, LabeledTransferRelation<MemAbstractState> {

    private readonly _abstractDomain: AbstractDomain<MemAbstractState>;
    private readonly _transferRelation: MemTransferRelation;

    abstractSucc(fromState: MemAbstractState): Iterable<MemAbstractState> {
        return this._transferRelation.abstractSucc(fromState);
    }

    join(state1: MemAbstractState, state2: MemAbstractState): MemAbstractState {
        throw new ImplementMeException();
    }

    merge(state1: MemAbstractState, state2: MemAbstractState): boolean {
        throw new ImplementMeException();
    }

    stop(state: MemAbstractState, reached: StateSet<MemAbstractState>): MemAbstractState {
        throw new ImplementMeException();
    }

    target(state: MemAbstractState): boolean {
        throw new ImplementMeException();
    }

    widen(state: MemAbstractState): MemAbstractState {
        throw new ImplementMeException();
    }

    initialStatesFor(task: App): MemAbstractState[] {
        throw new ImplementMeException();
    }

    abstractSuccFor(fromState: MemAbstractState, op: ProgramOperation): Iterable<MemAbstractState> {
        return this._transferRelation.abstractSuccFor(fromState, op);
    }

    get abstractDomain(): AbstractDomain<MemAbstractState> {
        return this._abstractDomain;
    }
}
