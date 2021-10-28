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


import {DefaultAnalysisStateSet, FrontierSet, ReachedSet, StatePartitionOperator} from "../../algorithms/StateSet";
import {GraphAbstractState, GraphStateId} from "./GraphAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";
import {Set as ImmSet} from "immutable";
import {AccessibilityRelation} from "../Accessibility";
import {TransitionLabelProvider} from "../ProgramAnalysis";
import {Concretizer, UnavailableConcretizer} from "../../domains/AbstractDomain";
import {ConcreteElement} from "../../domains/ConcreteElements";

export class GraphReachedSetWrapper<E extends GraphAbstractState> extends DefaultAnalysisStateSet<GraphAbstractState>
    implements ReachedSet<GraphAbstractState>, AccessibilityRelation<E> {

    private readonly _frontierSet: FrontierSet<E>;

    private readonly _children: Map<GraphStateId, GraphStateId[]>;

    private readonly _idToStateMap: Map<GraphStateId, E>;

    private readonly _onStateToInspect: (r: GraphReachedSetWrapper<E>, e: E) => void;

    private readonly _labeler: TransitionLabelProvider<E>;

    constructor(frontierSet: FrontierSet<E>, partitionOp: StatePartitionOperator<E>, 
                onStateToInspect: (r: GraphReachedSetWrapper<E>, e: E) => void, labeler: TransitionLabelProvider<E>) {
        super(partitionOp);
        this._frontierSet = Preconditions.checkNotUndefined(frontierSet);
        this._children = new Map<GraphStateId, GraphStateId[]>();
        this._idToStateMap = new Map<GraphStateId, E>();
        this._onStateToInspect = Preconditions.checkNotUndefined(onStateToInspect);
        this._labeler = Preconditions.checkNotUndefined(labeler);
    }

    public add(element: E): any {
        // A `GraphAbstractState` has only references to the parents.
        // This wrapper has to keep track of the children, too.
        for (const parentId of element.getPredecessors()) {
            Preconditions.checkState(this._idToStateMap.has(parentId), `Parent state ${parentId} must exist for ${element.getId()}!`);
            // Above precondition check might fail, for example,
            // in case of some form of recursion that caused
            // the removal of already reached states (into that a merge was conducted).

            const parentChilds = this._children.get(parentId) || [];
            parentChilds.push(element.getId());
            this._children.set(parentId, parentChilds);
        }

        // Track the mapping between state ids and the corresponding state objects
        this._idToStateMap.set(element.getId(), element);

        return super.add(element);
    }

    public getChildrenOf(of: GraphStateId): Set<GraphStateId> {
        const childIDs: GraphStateId[] = this._children.get(of) || [];
        return new Set(childIDs);
    }

    public getChildStatesOf(of: GraphStateId): E[] {
        const childIDs: GraphStateId[] = this._children.get(of) || [];
        return childIDs.map((id) => this._idToStateMap.get(id));
    }

    /**
     * Remove the element `element` from the set of reached states.
     * In case `element` was a frontier state, the parents of
     * `element` become frontier states.
     *
     * @param element
     */
    public remove(element: E) {
        this.removeState(element, true);
    }

    public removeState(element: E, reAddToWaitlist: boolean) {
        Preconditions.checkNotUndefined(element);

        // 1. Determine the childs to remove
        const toRemove: ImmSet<E> = ImmSet<E>().asMutable();
        toRemove.add(element);

        let hasFrontierChilds = false;

        const visited: ImmSet<E> = ImmSet<E>().asMutable();
        const worklist: E[] = [element];
        while (worklist.length > 0) {
            const p = worklist.pop();
            const childs: GraphStateId[] = this._children.get(p.getId()) || [];

            for (const childId of childs) {
                const c = this._idToStateMap.get(childId);
                if (!visited.contains(c)) {
                    visited.add(c);

                    // Schedule for removal
                    toRemove.add(c);

                    if (this._frontierSet.has(c)) {
                        hasFrontierChilds = true;
                    }

                    // ATTENTION: The graph does NOT have cycles!
                    worklist.push(c);
                }
            }
        }

        // 2. Make all parent states that will not get removed frontier states
        const removeChildsOf: ImmSet<E> = ImmSet<E>().asMutable();

        // - Only if they had childs that were in the set of frontier states
        //      (it must be possible to remove infeasible parts of the ARG without causing a re-computation)
        if (reAddToWaitlist && hasFrontierChilds) {
            for (const e of toRemove) {
                if (e != element) {
                    // Only if not the state to remove (operators like 'merge' will re-add a
                    // state that overapproximates 'element')
                    for (const p of e.getPredecessors().map((id) => this._idToStateMap.get(id))) {
                        if (toRemove.has(p)) {
                            // Also the parent will be removed --> Do not add this parent to the frontier set
                        } else {
                            this._frontierSet.add(p);

                            // Also remove the childs of all nodes that get re-added to the wait-list (LATER)
                            const frontierChildsIds: GraphStateId[] = this._children.get(p.getId()) || [];
                            frontierChildsIds.map((id) => this._idToStateMap.get(id)).forEach((e) => removeChildsOf.add(e));
                        }
                    }
                }
            }
        }

        // 3. Actually remove the states
        for (const e of toRemove) {
            // Remove the reference to the element from its parent
            for (const parent of e.getPredecessors()) {
                const newParentChilds: GraphStateId[] = [];
                for (const c of this._children.get(parent) || []) {
                    if (c != e.getId()) {
                        newParentChilds.push(c);
                    }
                }
                this._children.set(parent, newParentChilds);
            }

            // Remove the state itself
            this._idToStateMap.delete(e.getId());
            super.remove(e);

            // Also remove it from the set of frontier states
            this._frontierSet.remove(e);
        }

        // 4. Actually remove all childs of the new frontier states
        for (const e of removeChildsOf) {
            const childs: GraphStateId[] = this._children.get(e.getId()) || [];
            childs.map((id) => this._idToStateMap.get(id)).forEach((e) => this.removeState(e, false));
        }
    }

    initial(): Iterable<E> {
        return this.getRootStates() as Iterable<E>;
    }

    successorsOf(state: E): E[] {
        return Array.from(this.getChildrenOf(state.id)).map(id => this._idToStateMap.get(id));
    }

    predecessorsOf(state: E): E[] {
        return Array.from(state.predecessors.map((id) => this._idToStateMap.get(id)));
    }

    isReachable(state: E): boolean {
        return true;
    }

    labeler(): TransitionLabelProvider<E> {
        return this._labeler;
    }

    concretizer(): Concretizer<ConcreteElement, E> {
        return new UnavailableConcretizer();
    }

}


