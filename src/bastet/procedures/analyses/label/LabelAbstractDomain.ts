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

import {AbstractElement, AbstractElementVisitor, AbstractState, Lattice} from "../../../lattices/Lattice";
import {OperationId, ProgramOperation, ProgramOperations} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {List as ImmList, Record as ImmRec} from "immutable";
import {AbstractDomain, AbstractionPrecision} from "../../domains/AbstractDomain";
import {ConcreteDomain, ConcreteElement} from "../../domains/ConcreteElements";
import {Preconditions} from "../../../utils/Preconditions";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export interface LabeledTransferAttributes {

    from: AbstractElement,

    op: OperationId

}

const LabeledTransferRecord = ImmRec({

    from: null,

    op: ProgramOperations.epsilon().ident

});

export class LabeledTransfer extends LabeledTransferRecord implements LabeledTransferAttributes {

    constructor(from: AbstractElement, op: ProgramOperation) {
        super({from: from, op: op.ident});
    }

    public getFrom(): AbstractElement {
        return this.get('from');
    }

    public getOp(): ProgramOperation {
        return ProgramOperation.for(this.get('op'));
    }

}

export interface LabelStateAttributes {

    transfers: ImmList<LabeledTransfer>;

    wrappedState: AbstractElement;

}

const LabelStateRecord = ImmRec({

    transfers: ImmList(),
    wrappedState: null,
})

export class LabelState extends LabelStateRecord implements LabelStateAttributes, AbstractState {

    constructor(transfers: ImmList<LabeledTransfer>, wrappedState: AbstractElement) {
        super({transfers: transfers, wrappedState: wrappedState});
    }

    public getTransfers(): ImmList<LabeledTransfer> {
        return this.get('transfers');
    }

    public withTransfers(value: ImmList<LabeledTransfer>): LabelState {
        return this.set('transfers', value);
    }

    public getWrappedState(): AbstractState {
        return this.get("wrappedState");
    }

    public withWrappedState(wrapped: AbstractElement): LabelState {
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

export class LabelStateLattice implements Lattice<LabelState> {

    private readonly _wrappedStateLattice: Lattice<AbstractElement>;

    private readonly _bottom: LabelState;

    private readonly _top: LabelState;

    constructor(wrappedStateLattice: Lattice<AbstractElement>) {
        this._wrappedStateLattice = Preconditions.checkNotUndefined(wrappedStateLattice);
        this._bottom = new LabelState(ImmList([]), wrappedStateLattice.bottom());
        this._top = new LabelState(ImmList([]), wrappedStateLattice.top());
    }

    bottom(): LabelState {
        return this._bottom;
    }

    isIncluded(element1: LabelState, element2: LabelState): boolean {
        return this._wrappedStateLattice.isIncluded(element1.getWrappedState(), element2.getWrappedState());
    }

    join(element1: LabelState, element2: LabelState): LabelState {
        return element1
            .withTransfers(element1.getTransfers().concat(element2.getTransfers()))
            .withWrappedState(this._wrappedStateLattice.join(element1.getWrappedState(), element2.getWrappedState()));
    }

    meet(element1: LabelState, element2: LabelState): LabelState {
        throw new ImplementMeException();
    }

    top(): LabelState {
        return this._top;
    }
}

export class LabelAbstractDomain implements AbstractDomain<ConcreteElement, LabelState> {

    private readonly _lattice: LabelStateLattice;
    private readonly _wrapped: AbstractDomain<ConcreteElement, AbstractElement>;

    constructor(wrapped: AbstractDomain<ConcreteElement, AbstractElement>) {
        Preconditions.checkNotUndefined(wrapped);
        this._lattice = new LabelStateLattice(wrapped.lattice);
        this._wrapped = wrapped;
    }

    get lattice(): Lattice<LabelState> {
        return this._lattice;
    }

    abstract(elements: Iterable<ConcreteElement>): LabelState {
        throw new ImplementMeException();
    }

    concretize(element: LabelState): Iterable<ConcreteElement> {
        throw new ImplementMeException();
    }

    concretizeOne(element: LabelState): ConcreteElement {
        return this._wrapped.concretizeOne(element);
    }

    widen(element: LabelState, precision: AbstractionPrecision): LabelState {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<ConcreteElement> {
        throw new ImplementMeException();
    }
}
