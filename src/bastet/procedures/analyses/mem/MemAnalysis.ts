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

import {ProgramAnalysis, ProgramAnalysisWithLabels} from "../ProgramAnalysis";
import {AbstractMemory, MemAbstractDomain, MemAbstractState, MemAbstractStates, Theories} from "./MemAbstractDomain";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {StateSet} from "../../algorithms/StateSet";
import {App} from "../../../syntax/app/App";
import {LabeledTransferRelation} from "../TransferRelation";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {MemTransferRelation} from "./MemTransferRelation";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {
    ConcreteBooleanDomain,
    ConcreteBoundedStringDomain, ConcreteBoundedStringListDomain,
    ConcreteMemory,
    ConcreteNumberDomain
} from "../../domains/ConcreteElements";
import {NumIntervalTheory, NumIntervalValueDomain} from "../../domains/NumIntervalValueDomain";
import {FlatBooleanValueDomain, FlatBooleanValueTheory} from "../../domains/FlatBooleanValueDomain";
import {OurStringListTheory, StringListAbstractDomain} from "../../domains/StringListAbstractDomain";
import {OurStringTheory, StringAbstractDomain} from "../../domains/StringAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";

export class MemAnalysis implements ProgramAnalysisWithLabels<ConcreteMemory, AbstractMemory>, LabeledTransferRelation<MemAbstractState> {

    private readonly _theories: Theories;
    private readonly _abstractDomain: MemAbstractDomain;
    private readonly _transferRelation: MemTransferRelation;

    constructor() {
        const numDomain = new NumIntervalValueDomain(new ConcreteNumberDomain());
        const boolDomain = new FlatBooleanValueDomain(new ConcreteBooleanDomain());
        const stringDomain = new StringAbstractDomain(new ConcreteBoundedStringDomain(42));
        const stringListDomain = new StringListAbstractDomain(new ConcreteBoundedStringListDomain(23));

        const boolTheory = new FlatBooleanValueTheory(boolDomain);
        const numTheory = new NumIntervalTheory(numDomain, boolTheory);
        const stringTheory = new OurStringTheory(stringDomain, boolTheory, numTheory);
        const listTheory = new OurStringListTheory(stringListDomain);

        this._theories = new Theories(boolTheory, numTheory, stringTheory, listTheory);
        this._abstractDomain = new MemAbstractDomain(numDomain, boolDomain, stringDomain, stringListDomain);

        this._transferRelation = new MemTransferRelation(this._abstractDomain, this._theories);
    }

    abstractSucc(fromState: MemAbstractState): Iterable<MemAbstractState> {
        return this._transferRelation.abstractSucc(fromState);
    }

    join(state1: MemAbstractState, state2: MemAbstractState): MemAbstractState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    merge(state1: MemAbstractState, state2: MemAbstractState): boolean {
        // MERGE-SEP
        return false;
    }

    stop(state: MemAbstractState, reached: Iterable<MemAbstractState>): boolean {
        for (const r of reached) {
            if (r.equals(state)) {
                return true;
            }
        }
        return false;
    }

    target(state: MemAbstractState): boolean {
        return false;
    }

    widen(state: MemAbstractState): MemAbstractState {
        return state;
    }

    initialStatesFor(task: App): MemAbstractState[] {
        return [MemAbstractStates.empty()];
    }

    abstractSuccFor(fromState: MemAbstractState, op: ProgramOperation): Iterable<MemAbstractState> {
        Preconditions.checkNotUndefined(fromState);
        Preconditions.checkNotUndefined(op);
        return this._transferRelation.abstractSuccFor(fromState, op);
    }

    get abstractDomain(): AbstractDomain<ConcreteMemory, AbstractMemory> {
        return this._abstractDomain;
    }
}
