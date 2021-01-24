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

import {AbstractElement, AbstractElementVisitor, AbstractState, Lattice} from "../../../lattices/Lattice";
import {List as ImmList, Record as ImmRec} from "immutable";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {ConcreteDomain, ConcreteElement} from "../../domains/ConcreteElements";
import {Preconditions} from "../../../utils/Preconditions";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {AbstractionPrecision} from "../../AbstractionPrecision";


export interface DebugStateAttributes {

    debugInfos: ImmList<string>;

    wrappedState: AbstractElement;

}

const DebugStateRecord = ImmRec({
    debugInfos: ImmList(),
    wrappedState: null,
})

export class DebugState extends DebugStateRecord implements DebugStateAttributes, AbstractState {

    constructor(debugInfos: ImmList<string>, wrappedState: AbstractElement) {
        super({debugInfos: debugInfos, wrappedState: wrappedState});
    }

    public getDebugInfos(): ImmList<string> {
        return this.get('debugInfos');
    }

    public withDebugInfos(value: ImmList<string>): this {
        return this.set('debugInfos', value);
    }

    public getWrappedState(): AbstractState {
        return this.get("wrappedState");
    }

    public withWrappedState(wrapped: AbstractElement): this {
        return this.set("wrappedState", wrapped);
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

export class DebugStateLattice implements Lattice<DebugState> {

    private readonly _wrappedStateLattice: Lattice<AbstractElement>;

    private readonly _bottom: DebugState;

    private readonly _top: DebugState;

    constructor(wrappedStateLattice: Lattice<AbstractElement>) {
        this._wrappedStateLattice = Preconditions.checkNotUndefined(wrappedStateLattice);
        // this._bottom = new DebugState(ImmList([]), wrappedStateLattice.bottom());
        // this._top = new DebugState(ImmList([]), wrappedStateLattice.top());
    }

    bottom(): DebugState {
        throw new ImplementMeException();
    }

    top(): DebugState {
        throw new ImplementMeException();
    }

    isIncluded(element1: DebugState, element2: DebugState): boolean {
        return this._wrappedStateLattice.isIncluded(element1.getWrappedState(), element2.getWrappedState());
    }

    join(element1: DebugState, element2: DebugState): DebugState {
        return element1
            .withDebugInfos(element1.getDebugInfos().concat(element2.getDebugInfos()))
            .withWrappedState(this._wrappedStateLattice.join(element1.getWrappedState(), element2.getWrappedState()));
    }

    meet(element1: DebugState, element2: DebugState): DebugState {
        throw new ImplementMeException();
    }
}

export class DebugAbstractDomain implements AbstractDomain<ConcreteElement, DebugState> {

    private readonly _lattice: DebugStateLattice;
    private readonly _wrapped: AbstractDomain<ConcreteElement, AbstractElement>;

    constructor(wrapped: AbstractDomain<ConcreteElement, AbstractElement>) {
        Preconditions.checkNotUndefined(wrapped);
        this._lattice = new DebugStateLattice(wrapped.lattice);
        this._wrapped = wrapped;
    }

    get lattice(): Lattice<DebugState> {
        return this._lattice;
    }

    abstract(elements: Iterable<ConcreteElement>): DebugState {
        throw new ImplementMeException();
    }

    concretize(element: DebugState): Iterable<ConcreteElement> {
        throw new ImplementMeException();
    }

    concretizeOne(element: DebugState): ConcreteElement {
        return this._wrapped.concretizeOne(element.getWrappedState());
    }

    widen(element: DebugState, precision: AbstractionPrecision): DebugState {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<ConcreteElement> {
        throw new ImplementMeException();
    }

    composeSeq(e1: DebugState, e2: DebugState): DebugState {
        throw new ImplementMeException();
    }
}
