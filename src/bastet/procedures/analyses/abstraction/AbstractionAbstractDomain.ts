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
import {Optional} from "../../../utils/Optional";
import {DataAbstractStates} from "../data/DataAbstractStates";
import {getTheOnlyElement} from "../../../utils/Collections";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";


export interface AbstractionStateAttribs extends AbstractElement, SingletonStateWrapper {

    blockId: number;

    enteringSummary: FirstOrderFormula;

    wrappedState: AbstractState;

    precision: PredicatePrecisionStack;

    wideningOf: Optional<AbstractionState>

}

const AbstractionStateRecord = ImmRec({

    blockId: 0,

    enteringSummary: null,

    wrappedState: null,

    precision: null,

    wideningOf: null

});

export class AbstractionState extends AbstractionStateRecord implements AbstractionStateAttribs, AbstractState {

    constructor(blockId: number, enteringSummary: FirstOrderFormula, wrappedState: AbstractElement, precision: PredicatePrecisionStack, wideningOf: Optional<AbstractionState>) {
        super({blockId: blockId, enteringSummary: enteringSummary, precision: precision, wrappedState: wrappedState, wideningOf: wideningOf});
    }

    public getBlockId(): number {
        return this.blockId;
    }

    public withFreshBlockId(): AbstractionState {
        return this.set('blockId', BLOCK_SEQ_NO++);
    }

    public getEnteringSummary(): FirstOrderFormula {
        return this.get("enteringSummary");
    }

    public getPrecision(): PredicatePrecisionStack {
        return this.get("precision");
    }

    public getWrappedState(): AbstractState {
        return this.get("wrappedState");
    }

    public withEnteringSummary(summary: FirstOrderFormula): AbstractionState {
        return this.set("enteringSummary", Preconditions.checkNotUndefined(summary));
    }

    public withWrappedState(wrapped: AbstractElement): AbstractionState {
        return this.set("wrappedState", Preconditions.checkNotUndefined(wrapped));
    }

    public withPrecision(prec: PredicatePrecisionStack): AbstractionState {
        return this.set("precision", prec);
    }

    public withoutWideningOf(): AbstractionState {
        return this.withWideningOf(null);
    }

    public withWideningOf(wideningOf: AbstractionState): AbstractionState {
        return this.set('wideningOf', Optional.of(wideningOf));
    }

    public getWideningOf(): Optional<AbstractionState> {
        return this.get('wideningOf');
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

    private readonly _folLattice: FirstOrderLattice<FirstOrderFormula>;

    private readonly _bottom: AbstractionState;

    private readonly _top: AbstractionState;

    private readonly _precStacLattice: PredicatePrecisionStackLattice;

    constructor(summaryLattice: FirstOrderLattice<FirstOrderFormula>, wrappedStateLattice: Lattice<AbstractElement>) {
        this._wrappedStateLattice = Preconditions.checkNotUndefined(wrappedStateLattice);
        this._folLattice = Preconditions.checkNotUndefined(summaryLattice);
        this._precStacLattice = new PredicatePrecisionStackLattice(new PredicatePrecisionLattice(summaryLattice));
        this._bottom = new AbstractionState(-3, this._folLattice.bottom(), wrappedStateLattice.bottom(), this._precStacLattice.bottom(), Optional.absent());
        this._top = new AbstractionState(-2, this._folLattice.top(), wrappedStateLattice.top(), this._precStacLattice.top(), Optional.absent());
    }

    bottom(): AbstractionState {
        return this._bottom;
    }

    isIncluded(element1: AbstractionState, element2: AbstractionState): boolean {
        if (element2 === this._top) {
            return true;
        } else if (element2 === this._bottom) {
            if (element1 === this._bottom) {
                return true;
            }
        }

        // ATTENTION: "Stop", and with it "isIncluded", should work across blocks!
        // To make this mathematically cleaner, a separate lattice is needed:
        // one for the blocks only (with block id and a wrapped state), and one for the actual summary

        if (element1.getWideningOf().isPresent() !== element2.getWideningOf().isPresent()) {
            return false;
        } else if (element1.getWideningOf().isPresent()) {
            return this._folLattice.isIncluded(element1.getEnteringSummary(), element2.getEnteringSummary());
        } else {
            const blockFormula1 = getTheOnlyElement(DataAbstractStates.extractFrom(element1)).blockFormula;
            const blockFormula2 = getTheOnlyElement(DataAbstractStates.extractFrom(element2)).blockFormula;
            return this._folLattice.isIncluded(this._folLattice.meet(element1.getEnteringSummary(), blockFormula1),
                this._folLattice.meet(element2.getEnteringSummary(), blockFormula2));
        }
    }

    join(element1: AbstractionState, element2: AbstractionState): AbstractionState {
        if (element1 === this._top || element2 === this._top) {
            return this._top;
        } else if (element1 === this._bottom || element2 === this._bottom) {
            throw new ImplementMeException();
        }

        if (element1.blockId != element2.blockId) {
            throw new IllegalArgumentException("Join across blocks not expected.");
        }

        if (element1.getWideningOf().isPresent() !== element2.getWideningOf().isPresent()) {
            return this.top();
        } else if (element1.getWideningOf().isPresent()) {
            throw new ImplementMeException();
        } else {
            return element1
                .withEnteringSummary(this._folLattice.join(element1.enteringSummary, element2.enteringSummary))
                .withWrappedState(this._wrappedStateLattice.join(element1.getWrappedState(), element2.getWrappedState()));
        }
    }

    meet(element1: AbstractionState, element2: AbstractionState): AbstractionState {
        throw new ImplementMeException();
    }

    top(): AbstractionState {
        return this._top;
    }

    get wrappedStateLattice(): Lattice<AbstractElement> {
        return this._wrappedStateLattice;
    }

    get folLattice(): FirstOrderLattice<FirstOrderFormula> {
        return this._folLattice;
    }

    get precStacLattice(): PredicatePrecisionStackLattice {
        return this._precStacLattice;
    }
}

var BLOCK_SEQ_NO = 0;

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

    enrich(element: ConcreteElement): ConcreteElement {
        return element;
    }

    widen(element: AbstractionState, precision: AbstractionPrecision): AbstractionState {
        return this._abstractionFunction
            .computeAbstraction(element, precision)
            .withWideningOf(element)
            .withFreshBlockId();
    }

    get concreteDomain(): ConcreteDomain<ConcreteElement> {
        throw new ImplementMeException();
    }

    /**
     * Sequential composition of two abstraction states.
     *
     * @param e1
     * @param e2
     */
    composeSeq(e1: AbstractionState, e2: AbstractionState): AbstractionState {
        // Case 1:
        //      e1: a_0 > 5 and i_0 < 3
        //      e2: a_0 > 10 and i_0 = 0
        // Case 2:
        //      e3: a_0 > 5 and i_0 < 3
        //      e4: a_1 = 4
        // Case 3:
        //      e5: a_1 = 1 and b_1 = 2
        //      e6: a_1 = a_0 + 1

        // Not commutative:
        //      e5 * e6 == a_1 = 1 and b_1 = 2 and a_2 = a_1 + 1
        //      e6 * e5 == a_1 = a_0 + 1 and a_2 = 1 and b_1 = 2

        // Workflow:
        // (1) We somehow need to concretize the abstraction states
        // (2) We somehow need to turn these into FirstOrderFormulas or Z3Formulas
        // (3) This allows is to perform the SSA alignment
        // (4) Finally we can conjunct the aligned formulae and return the result

        const c1: ConcreteElement = this.concretizeOne(e1);
        const c2: ConcreteElement = this.concretizeOne(e2);

        throw new ImplementMeException();
    }

}
