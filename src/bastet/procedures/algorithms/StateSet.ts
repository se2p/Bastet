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

export class ChooseOpConfig {

}

export interface ChooseOperator<E extends AbstractElement> {

    choose(): E;

}

export class ChooseLastOperator<E extends AbstractElement> implements ChooseOperator<E> {

    choose(): E {
        return undefined;
    }

}

export abstract class StateSet<E extends AbstractElement> {

    abstract isEmpty(): boolean;

    abstract getStateSet(inPartitionOf: E): StateSet<E>;

    abstract [Symbol.iterator](): IterableIterator<E>;

    abstract remove(element: E);

    removeAll(elements: Iterable<E>) {
        for (let e of elements){
            this.remove(e);
        }
    }

    addAll(elements: Iterable<E>) {
        for (let e of elements){
            this.add(e);
        }
    }

    abstract add(element: E);

    abstract createChooseOp(config: ChooseOpConfig);
}

/**
 * Ordered by insertion time.
 */
export class OrderedStateSet<E extends AbstractElement> extends StateSet<E> {

    private _states: Set<E>;

    constructor() {
        super();
        this._states = new Set();
    }

    [Symbol.iterator](): IterableIterator<E> {
        return this._states[Symbol.iterator]();
    }

    add(element: E) {
        this._states.add(element);
    }

    getStateSet(inPartitionOf: E): StateSet<E> {
        return this;
    }

    isEmpty(): boolean {
        return this._states.size == 0;
    }

    remove(element: E) {
        this._states.delete(element);
    }

    public createChooseOp(config: ChooseOpConfig): ChooseOperator<E> {
        const outer = this;
        return new class implements ChooseOperator<E> {
            choose(): E {
                return outer._states.values().next().value as E;
            }
        }
    }
}

export class StateSetFactory {

    public static createStateSet<E>(): StateSet<E> {
        return new OrderedStateSet();
    }

}
