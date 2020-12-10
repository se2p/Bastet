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
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {Record as ImmRec} from "immutable"
import {SingletonStateWrapper} from "../AbstractStates";
import {ConcreteDomain, ConcreteElement} from "../../domains/ConcreteElements";
import {Preconditions} from "../../../utils/Preconditions";
import {FirstOrderFormula} from "../../../utils/ConjunctiveNormalForm";
import {FirstOrderLattice} from "../../domains/FirstOrderDomain";
import {
    AbstractionPrecision,
    PredicatePrecisionLattice,
    PredicatePrecisionStack,
    PredicatePrecisionStackLattice
} from "../../AbstractionPrecision";
import {AbstractionComputation} from "./AbstractionComputation";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {BlockSummary, BlockSummaryLattice} from "./BlockSummary";


export interface AbstractionStateAttribs extends AbstractElement, SingletonStateWrapper {

    summary: BlockSummary;

    precision: PredicatePrecisionStack;

    wrappedState: AbstractState;

}

const AbstractionStateRecord = ImmRec({

    summary: null,

    precision: null,

    wrappedState: null

});

export class AbstractionState extends AbstractionStateRecord implements AbstractionStateAttribs, AbstractState {

    constructor(summary: BlockSummary, precision: PredicatePrecisionStack, wrapped: AbstractElement) {
        super({summary: summary, precision: precision, wrappedState: wrapped});
    }

    public getSummary(): BlockSummary {
        return this.get("summary");
    }

    public getPrecision(): PredicatePrecisionStack {
        return this.get("precision");
    }

    public getWrappedState(): AbstractState {
        return this.get("wrappedState");
    }

    public withSummary(summary: BlockSummary): AbstractionState {
        return this.set("summary", summary);
    }

    public withWrappedState(wrapped: AbstractElement): AbstractionState {
        return this.set("wrappedState", wrapped);
    }

    public withPrecision(prec: PredicatePrecisionStack): AbstractionState {
        return this.set("precision", prec);
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

export class AbstractionStateLattice implements Lattice<AbstractionState> {

    private readonly _wrappedStateLattice: Lattice<AbstractElement>;

    private readonly _summaryLattice: BlockSummaryLattice;

    private readonly _bottom: AbstractionState;

    private readonly _top: AbstractionState;

    private readonly _precStacLattice: PredicatePrecisionStackLattice;

    constructor(summaryLattice: FirstOrderLattice<FirstOrderFormula>, wrappedStateLattice: Lattice<AbstractElement>) {
        this._wrappedStateLattice = Preconditions.checkNotUndefined(wrappedStateLattice);
        this._summaryLattice = new BlockSummaryLattice(summaryLattice);
        this._precStacLattice = new PredicatePrecisionStackLattice(new PredicatePrecisionLattice(summaryLattice));
        this._bottom = new AbstractionState(this._summaryLattice.bottom(), this._precStacLattice.bottom(), wrappedStateLattice.bottom());
        this._top = new AbstractionState(this._summaryLattice.top(), this._precStacLattice.top(), wrappedStateLattice.top());
    }

    bottom(): AbstractionState {
        return this._bottom;
    }

    isIncluded(element1: AbstractionState, element2: AbstractionState): boolean {
        // TODO: use "summary.summaryFormula" instead of "summary.summary" -> need to create a getter for summaryFormula
        return this.summaryLattice.folLattice.isIncluded(element1.summary.summary, element2.summary.summary);
    }

    join(element1: AbstractionState, element2: AbstractionState): AbstractionState {
        return element1
            .withSummary(this._summaryLattice.join(element1.summary, element2.summary))
            .withWrappedState(this._wrappedStateLattice.join(element1.getWrappedState(), element2.getWrappedState()));
    }

    meet(element1: AbstractionState, element2: AbstractionState): AbstractionState {
        return element1
            .withSummary(this._summaryLattice.meet(element1.summary, element2.summary))
            .withWrappedState(this._wrappedStateLattice.meet(element1.getWrappedState(), element2.getWrappedState()));

    }

    top(): AbstractionState {
        return this._top;
    }

    get wrappedStateLattice(): Lattice<AbstractElement> {
        return this._wrappedStateLattice;
    }

    get summaryLattice(): BlockSummaryLattice {
        return this._summaryLattice;
    }

    get precStacLattice(): PredicatePrecisionStackLattice {
        return this._precStacLattice;
    }
}

export class AbstractionAbstractDomain implements AbstractDomain<ConcreteElement, AbstractionState> {

    private readonly _lattice: AbstractionStateLattice;

    private readonly _wrapped: AbstractDomain<ConcreteElement, AbstractElement>;

    private readonly _abstractionFunction: AbstractionComputation<AbstractionState, AbstractionPrecision>;

    constructor(wrapped: AbstractDomain<ConcreteElement, AbstractElement>, summaryLattice: FirstOrderLattice<FirstOrderFormula>,
                abstractionFunction: AbstractionComputation<AbstractionState, AbstractionPrecision>) {
        Preconditions.checkNotUndefined(wrapped);
        this._lattice = new AbstractionStateLattice(summaryLattice, wrapped.lattice);
        this._wrapped = Preconditions.checkNotUndefined(wrapped);
        this._abstractionFunction = Preconditions.checkNotUndefined(abstractionFunction);
    }

    get lattice(): AbstractionStateLattice {
        return this._lattice;
    }

    abstract(elements: Iterable<ConcreteElement>): AbstractionState {
        throw new ImplementMeException();
    }

    concretize(element: AbstractionState): Iterable<ConcreteElement> {
        throw new ImplementMeException();
    }

    concretizeOne(element: AbstractionState): ConcreteElement {
        return this._wrapped.concretizeOne(element.getWrappedState());
    }

    widen(element: AbstractionState, precision: AbstractionPrecision): AbstractionState {
        return this._abstractionFunction.computeAbstraction(element, precision);
    }

    get concreteDomain(): ConcreteDomain<ConcreteElement> {
        throw new ImplementMeException();
    }

}
