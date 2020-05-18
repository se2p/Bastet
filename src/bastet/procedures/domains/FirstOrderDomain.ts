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


import {AbstractDomain, AbstractionPrecision} from "./AbstractDomain";
import {
    ConcreteBoolean,
    ConcreteDomain,
    ConcreteElement,
    ConcreteList, ConcreteMemory,
    ConcreteNumber,
    ConcreteString
} from "./ConcreteElements";
import {FirstOrderFormula} from "../../utils/ConjunctiveNormalForm";
import {LatticeWithComplements} from "../../lattices/Lattice";
import {ImplementMeException, ImplementMeForException} from "../../core/exceptions/ImplementMeException";
import {Preconditions} from "../../utils/Preconditions";
import {Z3Model} from "../../utils/smt/z3/Z3SMT";
import {BooleanTheory} from "./MemoryTransformer";

export interface FirstOrderLattice<F extends FirstOrderFormula> extends LatticeWithComplements<F> {
    prover: FirstOrderSolver<F>;
}

export class FirstOrderDomain<F extends FirstOrderFormula>
    implements AbstractDomain<ConcreteMemory, F> {

    private readonly _lattice: FirstOrderLattice<F>;

    constructor(lattice: FirstOrderLattice<F>) {
        this._lattice = Preconditions.checkNotUndefined(lattice);
    }

    get solver(): FirstOrderSolver<F> {
        return this._lattice.prover;
    }

    abstract(elements: Iterable<ConcreteMemory>): F {
        throw new ImplementMeException();
    }

    concretize(element: F): Iterable<ConcreteMemory> {
        throw new ImplementMeException();
    }

    concretizeOne(element: F): ConcreteMemory {
        this.solver.push();
        this.solver.assert(element);

        // TODO: Use a generic FirstOrderModel type instead of Z3Model
        const model = this.solver.getModel();

        const numbers = new Map<string, ConcreteNumber>();
        const strings = new Map<string, ConcreteString>();
        const booleans = new Map<string, ConcreteBoolean>();
        const lists = new Map<string, ConcreteList<ConcreteString>>();

        model.getConstValues().forEach(constObj => {
            const value = constObj.getValue();
            const name = constObj.getName();

            switch (typeof value) {
                case 'boolean':
                    booleans.set(name, new ConcreteBoolean(value));
                    break;
                case 'number':
                    numbers.set(name, new ConcreteNumber(value));
                    break;
                case 'string':
                    strings.set(name, new ConcreteString(value));
                    break;
                default:
                    throw new ImplementMeForException("attributes of type " + typeof value);
            }
        });

        this.solver.pop();

        return new ConcreteMemory(numbers, strings, booleans, lists);
    }

    widen(element: F, precision: AbstractionPrecision): F {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<ConcreteMemory> {
        throw new ImplementMeException();
    }

    get lattice(): FirstOrderLattice<F> {
        return this._lattice;
    }

}

export abstract class FirstOrderSolver<F extends FirstOrderFormula> {

    /**
     * Create a backtracking point.
     */
    public abstract push();

    /**
     * Backtrack one backtracking point.
     */
    public abstract pop();

    /**
     * Check whether the assertions in a given solver are consistent or not.
     */
    public abstract isUnsat(): boolean;

    /**
     * Assert a constraint `f` into the solver.
     *
     * @param f
     */
    public abstract assert(f: F);

    /**
     * Remove all assertions from the solver.
     */
    public abstract reset();

    public abstract release();

    public abstract getModel(): Z3Model;
}

export abstract class SMTFirstOrderLattice<F extends FirstOrderFormula>
    implements FirstOrderLattice<F> {

    private readonly _boolTheory: BooleanTheory<F>;
    private readonly _prover: FirstOrderSolver<F>;

    constructor(theory: BooleanTheory<F>, prover: FirstOrderSolver<F>) {
        this._boolTheory = Preconditions.checkNotUndefined(theory);
        this._prover = Preconditions.checkNotUndefined(prover);
    }

    bottom(): F {
        return this._boolTheory.falseBool();
    }

    isIncluded(element1: F, element2: F): boolean {
        this._prover.push();
        try {
            // UNSAT a  <=>  a lessOrEqual ⊥
            // NOT true OR false  <=>  false OR false
            const implication = this.complement(this.join(
                this.complement(element1), element2));
            this._prover.assert(implication);
            return this._prover.isUnsat();
        } finally {
            this._prover.pop();
        }
    }

    join(element1: F, element2: F): F {
        return this._boolTheory.or(element1, element2);
    }

    meet(element1: F, element2: F): F {
        return this._boolTheory.and(element1, element2);
    }

    top(): F {
        return this._boolTheory.trueBool();
    }

    complement(element: F): F {
        return this._boolTheory.not(element);
    }

    get boolTheory(): BooleanTheory<F> {
        return this._boolTheory;
    }

    get prover(): FirstOrderSolver<F> {
        return this._prover;
    }

}
