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

import {AbstractElement, Lattice, Lattices} from "../lattices/Lattice";
import {List as ImmList, Record as ImmRec, Set as ImmSet} from "immutable";
import {FirstOrderFormula} from "../utils/ConjunctiveNormalForm";
import {FirstOrderLattice} from "./domains/FirstOrderDomain";
import {Preconditions} from "../utils/Preconditions";
import {IllegalStateException} from "../core/exceptions/IllegalStateException";

export interface AbstractionPrecision extends AbstractElement {

}

export interface AbstractionPrecisionLattice<P extends AbstractionPrecision> extends Lattice<P> {

    /**
     * Defines that no information should be maintained.
     * Each concrete state (FOR ALL) is mapped to
     * the set of all possible concrete states.
     *
     * Neutral element regarding the JOIN.
     */
    bottom(): P;

    /**
     * Defines that all information should be maintained.
     * Each concrete state (FOR ALL) is mapped to itself.
     *
     * Neutral element regarding the MEET.
     */
    top(): P;

}

export enum PrecisionRole {
    TOP_MAINTAIN_ALL, BOTTOM_MAINTAIN_NOTHING, INTERMEDIATE
}

export interface PredicatePrecisionAttributes {

    role: PrecisionRole,
    predicates: ImmSet<FirstOrderFormula>;

}

const PredicatePrecisionRecord = ImmRec({

    role: PrecisionRole.TOP_MAINTAIN_ALL,
    predicates: ImmSet<FirstOrderFormula>()

});

export class PredicatePrecision extends PredicatePrecisionRecord implements AbstractionPrecision, PredicatePrecisionAttributes {

    constructor(predicates: Iterable<FirstOrderFormula>, role: PrecisionRole) {
        super({'predicates': ImmSet(predicates), 'role': role });
    }

    public withRole(role: PrecisionRole): this {
        const result = this.set('role', role);
        if (role == PrecisionRole.TOP_MAINTAIN_ALL || role == PrecisionRole.BOTTOM_MAINTAIN_NOTHING) {
            return result.withPredicates(ImmSet());
        } else {
            return result;
        }
    }

    public withPredicates(preds: ImmSet<FirstOrderFormula>): this {
        if (this.role == PrecisionRole.TOP_MAINTAIN_ALL) {
            return this;
        }

        return this.set('predicates', preds).withRole(PrecisionRole.INTERMEDIATE);
    }

    public withPredicateAdded(pred: FirstOrderFormula): this {
        if (this.role == PrecisionRole.TOP_MAINTAIN_ALL) {
            return this;
        }

        return this.set('predicates', this.predicates.add(pred)).withRole(PrecisionRole.INTERMEDIATE);
    }

    public isTop() {
        return this.role == PrecisionRole.TOP_MAINTAIN_ALL;
    }

    public isBottom() {
        return this.role == PrecisionRole.BOTTOM_MAINTAIN_NOTHING;
    }

}

export interface PredicatePrecisionStackAttributes {

    stack: ImmList<PredicatePrecision>;

}

const PredicatePrecisionStackRecord = ImmRec({

    stack: ImmList()

});

export class PredicatePrecisionStack extends PredicatePrecisionStackRecord implements PredicatePrecisionStackAttributes {

    constructor(stack: ImmList<PredicatePrecision>) {
        super({'stack': stack});
    }

    public push(element: PredicatePrecision): this {
        return this.set('stack', this.stack.push(element));
    }

    public pop(): this {
        return this.set('stack', this.stack.pop());
    }

}

export class PredicatePrecisionStackLattice implements Lattice<PredicatePrecisionStack> {

    private readonly _bottom: PredicatePrecisionStack;
    private readonly _lattice: PredicatePrecisionLattice<FirstOrderFormula>;
    private readonly _top: PredicatePrecisionStack;

    constructor(predicatePrecLattice: PredicatePrecisionLattice<FirstOrderFormula>) {
        this._lattice = Preconditions.checkNotUndefined(predicatePrecLattice);
        this._bottom = new PredicatePrecisionStack(ImmList());
        this._top = new PredicatePrecisionStack(ImmList([this._lattice.top(), this._lattice.top()]));
    }

    bottom(): PredicatePrecisionStack {
        return this._bottom;
    }

    isIncluded(element1: PredicatePrecisionStack, element2: PredicatePrecisionStack): boolean {
        return element1.equals(element2);
    }

    join(element1: PredicatePrecisionStack, element2: PredicatePrecisionStack): PredicatePrecisionStack {
        if (element1.equals(element2)) {
            return element1;
        } else {
            return this.top();
        }
    }

    meet(element1: PredicatePrecisionStack, element2: PredicatePrecisionStack): PredicatePrecisionStack {
        if (element1.equals(element2)) {
            return element1;
        } else {
            return this.bottom();
        }
    }

    top(): PredicatePrecisionStack {
        return this._top;
    }

    get lattice(): PredicatePrecisionLattice<FirstOrderFormula> {
        return this._lattice;
    }
}

/**
 * Precision lattice for Boolean predicate abstraction.
 */
export class PredicatePrecisionLattice<F extends FirstOrderFormula> implements AbstractionPrecisionLattice<PredicatePrecision> {
    
    private readonly _folLattice: FirstOrderLattice<F>
    private readonly _bottom: PredicatePrecision;
    private readonly _top: PredicatePrecision;

    constructor(folLattice: FirstOrderLattice<F>) {
        this._folLattice = Preconditions.checkNotUndefined(folLattice);
        this._bottom = new PredicatePrecision(ImmSet([this._folLattice.top()]), PrecisionRole.BOTTOM_MAINTAIN_NOTHING);
        this._top = new PredicatePrecision(ImmSet([]), PrecisionRole.TOP_MAINTAIN_ALL);
    }

    isIncluded(element1: PredicatePrecision, element2: PredicatePrecision): boolean {
        if (element2.isTop()) {
            return true;
        }

        if (element1.isBottom()) {
            return true;
        }

        if (element1.predicates.isSubset(element2.predicates)) {
            return true;
        } else {
            throw new IllegalStateException("Inclusion check would require a SAT solver call");
        }
    }

    join(element1: PredicatePrecision, element2: PredicatePrecision): PredicatePrecision {
        if (element1.isTop()) {
            return element1;
        } else if (element2.isTop()) {
            return element2;
        }

        return element1.withPredicates(element2.predicates);
    }

    meet(element1: PredicatePrecision, element2: PredicatePrecision): PredicatePrecision {
        if (element1.isBottom()) {
            return element1;
        } else if (element2.isBottom()) {
            return element2;
        }

        const result = new PredicatePrecision(element1.predicates.intersect(element2.predicates), PrecisionRole.INTERMEDIATE);
        if (result.predicates.isEmpty()) {
            return this.bottom();
        } else {
            return result;
        }
    }

    bottom(): PredicatePrecision {
        return this._bottom;
    }

    top(): PredicatePrecision {
        return this._top;
    }

    get folLattice(): FirstOrderLattice<F> {
        return this._folLattice;
    }

}
