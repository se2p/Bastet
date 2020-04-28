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

import {AbstractDomain, AbstractionPrecision} from "../../domains/AbstractDomain";
import {AbstractElement, AbstractElementVisitor, AbstractState, Lattice} from "../../../lattices/Lattice";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {Map as ImmMap, List as ImmList, Record as ImmRec} from "immutable"
import {SingletonStateWrapper} from "../AbstractStates";
import {ConcreteDomain, ConcreteElement} from "../../domains/ConcreteElements";
import {Preconditions} from "../../../utils/Preconditions";
import {BlockId} from "../../../syntax/ast/core/statements/ControlStatement";


export interface TimeStateAttribs extends AbstractElement, SingletonStateWrapper {

    timedBlockStack: ImmList<BlockId>;

    wrappedState: AbstractState;

}

const TimeStateRecord = ImmRec({

    timedBlockStack: ImmList<BlockId>(),

    wrappedState: null

});

export class TimeState extends TimeStateRecord implements TimeStateAttribs, AbstractState {

    constructor(timedBlockStack: ImmList<BlockId>, wrapped: AbstractElement) {
        super({timedBlockStack: timedBlockStack, wrappedState: wrapped});
    }

    public getTimedBlockStack(): ImmList<BlockId> {
        return this.get("timedBlockStack");
    }

    public withTimedBlockStack(value: ImmList<BlockId>): TimeState {
        return this.set("timedBlockStack", value);
    }

    public getWrappedState(): AbstractState {
        return this.get("wrappedState");
    }

    public withWrappedState(wrapped: AbstractElement): TimeState {
        return this.set("wrappedState", wrapped);
    }

    withPushedBlock(block: BlockId) {
        return this.withTimedBlockStack(this.getTimedBlockStack().push(block));
    }

    withPopBlock() {
        return this.withTimedBlockStack(this.getTimedBlockStack().pop());
    }

    public accept<R>(visitor: AbstractElementVisitor<R>): R {
        const visitMethod: string = `visit${this.constructor.name}`;
        if (visitor[visitMethod]) {
            return visitor[visitMethod](this);
        } else {
            return visitor.visit(this);
        }
    }

}

export class TimeStateLattice implements Lattice<TimeState> {

    private readonly _wrappedStateLattice: Lattice<AbstractElement>;

    private readonly _bottom: TimeState;

    private readonly _top: TimeState;

    constructor(wrappedStateLattice: Lattice<AbstractElement>) {
        this._wrappedStateLattice = Preconditions.checkNotUndefined(wrappedStateLattice);
        this._bottom = new TimeState(ImmList([]), wrappedStateLattice.bottom());
        this._top = new TimeState(ImmList([]), wrappedStateLattice.top());
    }

    bottom(): TimeState {
        return this._bottom;
    }

    isIncluded(element1: TimeState, element2: TimeState): boolean {
        return this._wrappedStateLattice.isIncluded(element1.getWrappedState(), element2.getWrappedState());
    }

    join(element1: TimeState, element2: TimeState): TimeState {
        if (!element1.getTimedBlockStack().equals(element2.getTimedBlockStack())) {
            return this.top();
        }

        return element1.withWrappedState(
            this._wrappedStateLattice.join(element1.getWrappedState(), element2.getWrappedState()));
    }

    meet(element1: TimeState, element2: TimeState): TimeState {
        throw new ImplementMeException();
    }

    top(): TimeState {
        return this._top;
    }
}

export class TimeAbstractDomain implements AbstractDomain<ConcreteElement, TimeState> {

    private readonly _lattice: TimeStateLattice;
    private readonly _wrapped: AbstractDomain<ConcreteElement, AbstractElement>;

    constructor(wrapped: AbstractDomain<ConcreteElement, AbstractElement>) {
        Preconditions.checkNotUndefined(wrapped);
        this._lattice = new TimeStateLattice(wrapped.lattice);
        this._wrapped = wrapped;
    }

    get lattice(): Lattice<TimeState> {
        return this._lattice;
    }

    abstract(elements: Iterable<ConcreteElement>): TimeState {
        throw new ImplementMeException();
    }

    concretize(element: TimeState): Iterable<ConcreteElement> {
        throw new ImplementMeException();
    }

    concretizeOne(element: TimeState): ConcreteElement {
        return this._wrapped.concretizeOne(element);
    }

    widen(element: TimeState, precision: AbstractionPrecision): TimeState {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<ConcreteElement> {
        throw new ImplementMeException();
    }
}
