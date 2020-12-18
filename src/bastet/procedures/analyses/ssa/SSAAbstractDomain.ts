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

import {AbstractDomain} from "../../domains/AbstractDomain";
import {AbstractElement, AbstractElementVisitor, AbstractState, Lattice} from "../../../lattices/Lattice";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {Map as ImmMap, Record as ImmRec} from "immutable"
import {SingletonStateWrapper} from "../AbstractStates";
import {ConcreteDomain, ConcreteElement, ConcreteMemory, ConcretePrimitive} from "../../domains/ConcreteElements";
import {Preconditions} from "../../../utils/Preconditions";
import {AbstractionPrecision} from "../../AbstractionPrecision";


export interface SSAStateAttribs extends AbstractElement, SingletonStateWrapper {

    ssa: ImmMap<string, number>;

    wrappedState: AbstractState;

}

export type SSAMap = ImmMap<string, number>;

const SSAStateRecord = ImmRec({

    ssa: ImmMap<string, number>(),

    wrappedState: null

});

export const NOT_DECLARED_INDEX = 0;
export const INITIALLY_DECLARED_INDEX = NOT_DECLARED_INDEX + 1;

export class SSAState extends SSAStateRecord implements SSAStateAttribs, AbstractState {

    constructor(ssa: ImmMap<string, number>, wrapped: AbstractElement) {
        super({ssa: ssa, wrappedState: wrapped});
    }

    public getSSA(): ImmMap<string, number> {
        return this.get("ssa");
    }

    public getWrappedState(): AbstractState {
        return this.get("wrappedState");
    }

    public getIndex(ofDataLocation: string): number {
        return this.getSSA().get(ofDataLocation, NOT_DECLARED_INDEX);
    }

    public withIndex(ofDataLocation: string, index: number): SSAState {
        const newSSA = this.getSSA().set(ofDataLocation, index);
        return this.withSSA(newSSA);
    }

    public withSSA(ssa: ImmMap<string, number>): SSAState {
        return this.set("ssa", ssa);
    }

    public withWrappedState(wrapped: AbstractElement): SSAState {
        return this.set("wrappedState", wrapped);
    }

    public withAssignment(assignementTo: string): [SSAState, number] {
        const newIndex = this.getIndex(assignementTo) + 1;
        const result = this.withIndex(assignementTo, newIndex);
        return [result, newIndex];
    }

    public getPrimitiveAttributes(memory: ConcreteMemory): ImmMap<string, ConcretePrimitive<any>> {
        const attributes = new Map<string, ConcretePrimitive<any>>();

        this.ssa.forEach((ssaIndex, attributeName) => {
            const attributeWithIndex = `${attributeName}@${ssaIndex}`;

            const attribute = memory.getPrimitiveAttributeByName(attributeWithIndex);

            if (!attribute) {
                // TODO why are attributes in SSAMap but not in memory?
                // console.log(`${attributeWithIndex} was undefined`);
            } else {
                attributes.set(attributeName, attribute);
            }
        })

        return ImmMap<string, ConcretePrimitive<any>>(attributes);
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

export class SSAStateLattice implements Lattice<SSAState> {

    private readonly _wrappedStateLattice: Lattice<AbstractElement>;

    private readonly _bottom: SSAState;

    private readonly _top: SSAState;

    constructor(wrappedStateLattice: Lattice<AbstractElement>) {
        this._wrappedStateLattice = Preconditions.checkNotUndefined(wrappedStateLattice);
        this._bottom = new SSAState(ImmMap({}), wrappedStateLattice.bottom());
        this._top = new SSAState(ImmMap({}), wrappedStateLattice.top());
    }

    bottom(): SSAState {
        return this._bottom;
    }

    isIncluded(element1: SSAState, element2: SSAState): boolean {
        return this._wrappedStateLattice.isIncluded(element1.getWrappedState(), element2.getWrappedState());
    }

    join(element1: SSAState, element2: SSAState): SSAState {
        if (!element1.getSSA().equals(element2.getSSA())) {
            return this.top();
        }

        return element1.withWrappedState(
            this._wrappedStateLattice.join(element1.getWrappedState(), element2.getWrappedState()));
    }

    meet(element1: SSAState, element2: SSAState): SSAState {
        throw new ImplementMeException();
    }

    top(): SSAState {
        return this._top;
    }
}

export class SSAAbstractDomain implements AbstractDomain<ConcreteElement, SSAState> {

    private readonly _lattice: SSAStateLattice;
    private readonly _wrapped: AbstractDomain<ConcreteElement, AbstractElement>;

    constructor(wrapped: AbstractDomain<ConcreteElement, AbstractElement>) {
        Preconditions.checkNotUndefined(wrapped);
        this._lattice = new SSAStateLattice(wrapped.lattice);
        this._wrapped = wrapped;
    }

    get lattice(): Lattice<SSAState> {
        return this._lattice;
    }

    abstract(elements: Iterable<ConcreteElement>): SSAState {
        throw new ImplementMeException();
    }

    concretize(element: SSAState): Iterable<ConcreteElement> {
        throw new ImplementMeException();
    }

    concretizeOne(element: SSAState): ConcreteElement {
        return this._wrapped.concretizeOne(element.getWrappedState());
    }

    widen(element: SSAState, precision: AbstractionPrecision): SSAState {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<ConcreteElement> {
        throw new ImplementMeException();
    }
}
