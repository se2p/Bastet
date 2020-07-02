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

import {AbstractElement, AbstractState} from "../../lattices/Lattice";
import {ConcreteElement} from "../domains/ConcreteElements";
import {TransitionLabelProvider} from "./ProgramAnalysis";
import {Concretizer} from "../domains/AbstractDomain";
import {Map as ImmMap, Set as ImmSet} from "immutable";
import {Preconditions} from "../../utils/Preconditions";
import {DirectedGraph, DirectedGraphs} from "../../utils/DirectedGraph";
import {getTheOnlyElement} from "../../utils/Collections";


/**
 * The accessibility relation of an abstract reachability graph
 * (or Kripke structure, which is a specialization of an ARG).
 *
 * Please note that an accessibility relation can be refined.
 * In the coarsest relation, each state is reachable
 * directly from each other state.
 */
export interface AccessibilityRelation<E extends AbstractElement, F extends AbstractState>
    extends DirectedGraph<F> {

    /**
     * Initial states.
     */
    initial(): Iterable<F>;

    /**
     *
     * @param state
     * @throws Exception if `state` is not in the accessibility relation.
     */
    successorsOf(state: F): F[];

    /**
     * Important: Only the initial state has the empty set of predecessor states.
     * An exception is throw for all other states that are not in the
     * accessibility relation.
     *
     * @param state
     */
    predecessorsOf(state: F): F[];

    /**
     * Is the given abstract state `state` reachable on in this
     * accessibility relation? (overapproximation!)
     */
    isReachable(state: F): boolean;

    labeler(): TransitionLabelProvider<F>;

    concretizer(): Concretizer<ConcreteElement, F>;

}

export class DefaultAccessRelation<F extends AbstractState> implements AccessibilityRelation<F, F> {

    private readonly _labeler: TransitionLabelProvider<F>;

    private readonly _concretizer: Concretizer<ConcreteElement, F>;

    private readonly _initial: ImmSet<F>;

    private readonly _preds: ImmMap<F, ImmSet<F>>;

    private readonly _sucss: ImmMap<F, ImmSet<F>>;

    constructor(labeler: TransitionLabelProvider<F>, concretizer: Concretizer<ConcreteElement, F>,
                initial: ImmSet<F>, preds: ImmMap<F, ImmSet<F>>, succs: ImmMap<F, ImmSet<F>>) {
        this._labeler = Preconditions.checkNotUndefined(labeler);
        this._concretizer = Preconditions.checkNotUndefined(concretizer);
        this._initial = Preconditions.checkNotUndefined(initial);
        this._preds = Preconditions.checkNotUndefined(preds);
        this._sucss = Preconditions.checkNotUndefined(succs);
    }

    initial(): Iterable<F> {
        return this._initial;
    }

    isReachable(state: F): boolean {
        if (this._initial.has(state)) {
            return true;
        }

        const preds = this._preds.get(state) || ImmSet();
        if (preds.size > 0) {
            return true;
        }

        return false;
    }

    predecessorsOf(state: F): F[] {
        return Array.from(this._preds.get(state) || ImmSet());
    }

    successorsOf(state: F): F[] {
        return Array.from(this._sucss.get(state) || ImmSet());
    }

    toString(): string {
        return DirectedGraphs.dumpToString(this, (v) => v.toString(),
            (v1, v2) => ``);
    }

    concretizer(): Concretizer<ConcreteElement, F> {
        return this._concretizer;
    }

    labeler(): TransitionLabelProvider<F> {
        return this._labeler;
    }

}

export class AccessRelationBuilder<F extends AbstractState> {

    private readonly _initial: Set<F>;

    private readonly _successorsOf: Map<F, ImmSet<F>>;

    private readonly _predecessorsOf: Map<F, ImmSet<F>>;

    private _lbl: TransitionLabelProvider<F>;

    private _ctc: Concretizer<ConcreteElement, F>;

    constructor() {
        this._initial = new Set();
        this._successorsOf = new Map();
        this._predecessorsOf = new Map();
    }

    public setLabeler(lbl: TransitionLabelProvider<F>): this {
        this._lbl = lbl;
        return this;
    }

    public setConcretizer(ctc: Concretizer<ConcreteElement, F>): this {
        this._ctc = ctc;
        return this;
    }

    public addInitial(e: F): this {
        this._initial.add(e);
        return this;
    }

    public addTransition(from: F, to: F): this {
        let preds = this._predecessorsOf.get(to) || ImmSet();
        preds = preds.add(from);
        this._predecessorsOf.set(to, preds);

        let succs = this._successorsOf.get(from) || ImmSet();
        succs = succs.add(to);
        this._successorsOf.set(from, succs);

        Preconditions.checkState(this._predecessorsOf.get(to).size > 0);
        Preconditions.checkState(this._successorsOf.get(from).size > 0);

        return this;
    }

    public build(): AccessibilityRelation<F , F> {
        return new DefaultAccessRelation(this._lbl, this._ctc,
            ImmSet(this._initial),
            ImmMap(this._predecessorsOf.entries()),
            ImmMap(this._successorsOf.entries()));
    }

}

export class AccessibilityRelations {

    public static backwardsAccessible<F extends AbstractState>(
        ar: AccessibilityRelation<F, F>, state: F,
        labeler?: TransitionLabelProvider<F>,
        concretizer?: Concretizer<ConcreteElement, F>): AccessibilityRelation<F, F> {

        const builder = new AccessRelationBuilder<F>()
            .setLabeler(ar.labeler()).setConcretizer(ar.concretizer());

        if (labeler) {
            builder.setLabeler(labeler);
        }

        if (concretizer) {
            builder.setConcretizer(concretizer);
        }

        const worklist: F[] = [];
        worklist.push(state);
        const visited: Set<F> = new Set();

        while (worklist.length > 0) {
            const work = worklist.pop();
            visited.add(work);
            const preds = ar.predecessorsOf(work)
            if (preds.length == 0) {
                builder.addInitial(work);
            } else {
                for (const pred of preds) {
                    builder.addTransition(pred, work);
                    if (!visited.has(pred)) {
                        worklist.push(pred);
                    }
                }
            }
        }

        return builder.build();
    }

    public static filterForwards<F extends AbstractState>(
        ar: AccessibilityRelation<F, F>, filter: (s1: F, s2: F) => boolean) {
        const builder = new AccessRelationBuilder()
            .setConcretizer(ar.concretizer())
            .setLabeler(ar.labeler());

        const worklist: F[] = [];
        Array.from(ar.initial()).forEach((e) => {worklist.push(e); builder.addInitial(e)});
        const visited: Set<F> = new Set();

        while (worklist.length > 0) {
            const work = worklist.pop();
            visited.add(work);
            const succs = ar.successorsOf(work)
            for (const succ of succs) {
                if (filter(work, succ)) {
                    builder.addTransition(work, succ);
                    if (!visited.has(succ)) {
                        worklist.push(succ);
                    }
                }
            }
        }

        return builder.build();
    }

    public static mapToArray<F extends AbstractState>(ar: AccessibilityRelation<F, F>): F[] {
        const array: F[] = [];
        let state: F = getTheOnlyElement(ar.initial());

        while (state != undefined) {
            array.push(state);

            state = getTheOnlyElement(ar.successorsOf(state));
        }

        return array;
    }
}
