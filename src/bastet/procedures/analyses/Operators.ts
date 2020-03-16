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

import {JoinOperator, MergeIntoOperator, MergeOperator} from "./ProgramAnalysis";
import {StateSet} from "../algorithms/StateSet";
import {AbstractElement} from "../../lattices/Lattice";
import {Preconditions} from "../../utils/Preconditions";

export class NoMergeIntoOperator<E extends AbstractElement> implements MergeIntoOperator<E> {

    mergeInto(state: E, reached: StateSet<E>, unwrapper: (AbstractElement) => E, wrapper: (E) => AbstractElement): StateSet<E> {
        return reached;
    }

}

export class StandardMergeIntoOperator<E extends AbstractElement> implements MergeIntoOperator<E> {

    private readonly _mergeOp: MergeOperator<E>;

    private readonly _joinOp: JoinOperator<E>;

    constructor(mergeOp: MergeOperator<E>, joinOp: JoinOperator<E>) {
        this._mergeOp = Preconditions.checkNotUndefined(mergeOp);
        this._joinOp = Preconditions.checkNotUndefined(joinOp);
    }

    public mergeInto(state: E, reached: StateSet<E>, unwrapper: (AbstractElement) => E, wrapper: (E) => AbstractElement): StateSet<E> {
        const removeFromReached: Set<E> = new Set<E>();
        const addToReached: Set<E> = new Set<E>();
        const relevantReached: StateSet<E> = reached.getStateSet(state);

        for (let r of relevantReached) {
            if (this._mergeOp.merge(state, r)) {
                const ePrimePrimePrime = this._joinOp.join(state, r);
                removeFromReached.add(r);
                addToReached.add(ePrimePrimePrime);
            }
        }
        reached.removeAll(removeFromReached);
        reached.addAll(addToReached);

        return reached;
    }

}
