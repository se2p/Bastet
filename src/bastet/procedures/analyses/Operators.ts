/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of Passau (uni-passau.de)
 *
 *   See the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Please make sure to CITE this work in your publications if you
 *   build on this work. Some of our maintainers or contributors might
 *   be interested in actively CONTRIBUTING to your research project.
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

import {JoinOperator, MergeIntoOperator, MergeOperator, PartitionOperator, StopOperator} from "./ProgramAnalysis";
import {FrontierSet, ReachedSet} from "../algorithms/StateSet";
import {AbstractElement, AbstractState} from "../../lattices/Lattice";
import {Preconditions} from "../../utils/Preconditions";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";
import {Unwrapper} from "./Refiner";
import {AbstractDomain} from "../domains/AbstractDomain";
import {ConcreteElement} from "../domains/ConcreteElements";

export class NoStopOperator<E extends AbstractElement, F extends AbstractState> implements StopOperator<E, F> {

    stop(state: E, reached: Iterable<F>, unwrapper: (F) => E): boolean {
        return false;
    }

}

export class NoMergeIntoOperator<E extends AbstractState, F extends AbstractState> implements MergeIntoOperator<E, F> {

    mergeInto(state: E, frontier: FrontierSet<F>, reached: ReachedSet<F>, unwrapper: (AbstractElement) => E, wrapper: (E) => AbstractElement): [FrontierSet<F>, ReachedSet<F>] {
        return [frontier, reached];
    }

}

export class MergeJoinOperator<E extends AbstractElement> implements MergeOperator<E> {

    private readonly _domain: AbstractDomain<ConcreteElement, E>;

    constructor(domain: AbstractDomain<ConcreteElement, E>) {
        this._domain = domain;
    }

    shouldMerge(state1: E, state2: E): boolean {
        return true;
    }

    merge(state1: E, state2: E): E {
        return this._domain.lattice.join(state1, state2);
    }

}

export class MergeSepOperator<E extends AbstractElement> implements MergeOperator<E> {

    shouldMerge(state1: E, state2: E): boolean {
        return false;
    }

    merge(state1: E, state2: E): E {
        return state2;
    }

}

export class StandardMergeOperatorFactory {

    public static create<E extends AbstractElement>(operatorName: string, domain: AbstractDomain<any, E>): MergeOperator<E> {
        Preconditions.checkNotUndefined(operatorName);

        if (operatorName.toUpperCase() == "SEP") {
            return new MergeSepOperator();
        } else if (operatorName.toUpperCase() == "JOIN") {
            return new MergeJoinOperator(domain);
        } else {
            throw new IllegalArgumentException("No valid configuration value for the merge operator");
        }
    }

    static createDelegator<E extends AbstractElement, W extends AbstractElement>(
        wrappedMergeOp: MergeOperator<W>, unwrapper: Unwrapper<E, W>): MergeOperator<E> {
        return undefined;
    }
}

export class StandardMergeIntoOperator<E extends AbstractElement, F extends AbstractState> implements MergeIntoOperator<E, F> {

    private readonly _mergeOp: MergeOperator<E>;

    private readonly _joinOp: JoinOperator<E>;

    private readonly _partOp: PartitionOperator<E, F>;

    constructor(partitionOp: PartitionOperator<E, F>, mergeOp: MergeOperator<E>, joinOp: JoinOperator<E>) {
        this._mergeOp = Preconditions.checkNotUndefined(mergeOp);
        this._joinOp = Preconditions.checkNotUndefined(joinOp);
        this._partOp = Preconditions.checkNotUndefined(partitionOp);
    }

    public mergeInto(state: E, frontier: FrontierSet<F>, reached: ReachedSet<F>, unwrapper: (F) => E, wrapper: (E) => F): [FrontierSet<F>, ReachedSet<F>] {
        const removeFromReached: Set<F> = new Set<F>();
        const addToReached: Set<F> = new Set<F>();
        const relevantReached: Iterable<F> = this._partOp.partitionOf(state, reached);

        for (let r of relevantReached) {
            if (this._mergeOp.shouldMerge(state, unwrapper(r))) {
                const ePrimePrimePrime: F = wrapper(this._mergeOp.merge(state, unwrapper(r)));
                removeFromReached.add(r);
                addToReached.add(ePrimePrimePrime);
            }
        }

        frontier.addAll(addToReached);
        frontier.removeAll(removeFromReached);

        reached.addAll(addToReached);
        reached.removeAll(removeFromReached);

        return [frontier, reached];
    }

}
