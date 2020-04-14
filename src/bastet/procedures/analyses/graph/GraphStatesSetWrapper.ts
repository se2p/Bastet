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


import {DefaultAnalysisStateSet, FrontierSet, StatePartitionOperator} from "../../algorithms/StateSet";
import {GraphAbstractState, GraphStateId} from "./GraphAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";
import {GraphPath, GraphPathSet} from "./GraphPath";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export class GraphReachedSetWrapper<E extends GraphAbstractState> extends DefaultAnalysisStateSet<GraphAbstractState> {

    private readonly _frontierSet: FrontierSet<E>;

    private readonly _children: Map<GraphStateId, GraphStateId[]>;

    private readonly _idToStateMap: Map<GraphStateId, E>;

    private readonly _onStateToInspect: (r: GraphReachedSetWrapper<E>, e: E) => void;

    constructor(frontierSet: FrontierSet<E>, partitionOp: StatePartitionOperator<E>, onStateToInspect: (r: GraphReachedSetWrapper<E>, e: E) => void) {
        super(partitionOp);
        this._frontierSet = Preconditions.checkNotUndefined(frontierSet);
        this._children = new Map<GraphStateId, GraphStateId[]>();
        this._idToStateMap = new Map<GraphStateId, E>();
        this._onStateToInspect = Preconditions.checkNotUndefined(onStateToInspect);
    }

    public add(element: E): any {
        // A `GraphAbstractState` has only references to the parents.
        // This wrapper has to keep track of the children, too.
        for (const parentId of element.getPredecessors()) {
            Preconditions.checkState(this._idToStateMap.has(parentId), `Parent state with id ${parentId} must exit!`);

            const parentChilds = this._children.get(parentId) || [];
            parentChilds.push(element.getId());
            this._children.set(parentId, parentChilds);
        }

        // Track the mapping between state ids and the corresponding state objects
        this._idToStateMap.set(element.getId(), element);

        return super.add(element);
    }

    private removeChildrenOf(parent: E) {
        // ATTENTION: The graph does NOT have cycles!
        Preconditions.checkNotUndefined(parent);
        // TODO: Rewrite to a non-recursive algorithm (rewrite to a worklist alg)

        // Set the list of children to the empty list before recurring. Avoids an infinite loop.
        const toRemove: GraphStateId[] = this._children.get(parent.getId()) || [];
        this._children.set(parent.getId(), []);

        // Remove the children recursively
        for (const childId of toRemove) {
            const childState = this._idToStateMap.get(childId);
            Preconditions.checkNotUndefined(childState);
            this.remove(childState);

            // GOAL: Never loose frontier states to ensure that we
            //  cover the full state space!
            //
            // Re-add all parents of the child
            // to the set of frontier states if they are not
            // equal to the state `parent` (from which the childs
            // must be deleted) if the child is in the set of frontier states
            if (this._frontierSet.has(childState)) {
                for (const childParentId of childState.getPredecessors()) {
                    const childParent = this._idToStateMap.get(childParentId);
                    if (childParent != parent) {
                        this._frontierSet.add(childParent);
                    }
                }

                // Remove the child from the set of frontier states
                this._frontierSet.remove(childState);
            }
        }
    }

    public getChildrenOf(of: GraphStateId): Set<GraphStateId> {
        const childIDs: GraphStateId[] = this._children.get(of) || [];
        return new Set(childIDs);
    }

    public getChildStatesOf(of: GraphStateId): E[] {
        const childIDs: GraphStateId[] = this._children.get(of) || [];
        return childIDs.map((id) => this._idToStateMap.get(id));
    }

    public remove(element: E): any {
        // Remove all children
        this.removeChildrenOf(element);

        // Remove child from parent
        for (const parent of element.getPredecessors()) {
            const newParentChilds: GraphStateId[] = [];
            for (const c of this._children.get(parent) || []) {
                if (c != element.getId()) {
                    newParentChilds.push(c);
                }
            }
            this._children.set(parent, newParentChilds);
        }

        // Remove the state itself
        this._idToStateMap.delete(element.getId());
        return super.remove(element);
    }

    public chooseRandomPathTo(element: E): GraphPath {
        throw new ImplementMeException();
    }

    public queryAllPathsTo(element: E): GraphPathSet {
        throw new ImplementMeException();
    }

}


