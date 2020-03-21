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


import {DefaultAnalysisStateSet, StateSet, StatePartitionOperator} from "../../algorithms/StateSet";
import {GraphAbstractState, GraphStateId} from "./GraphAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";
import {GraphPath, GraphPathSet} from "./GraphPath";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export class GraphReachedSetWrapper<E extends GraphAbstractState> extends DefaultAnalysisStateSet<GraphAbstractState> {

    private readonly _frontierSet: StateSet<E>;

    private readonly _children: Map<GraphStateId, GraphStateId[]>;

    private readonly _idToStateMap: Map<GraphStateId, E>;

    constructor(frontierSet: StateSet<E>, partitionOp: StatePartitionOperator<E>) {
        super(partitionOp);
        this._frontierSet = Preconditions.checkNotUndefined(frontierSet);
        this._children = new Map<GraphStateId, GraphStateId[]>();
        this._idToStateMap = new Map<GraphStateId, E>();
    }

    public add(element: E): any {
        // A `GraphAbstractState` has only references to the parents.
        // This wrapper has to keep track of the children, too.
        for (const parentId of element.getPredecessors()) {
            Preconditions.checkState(this._idToStateMap.has(parentId));

            const parentChilds = this._children.get(parentId) || [];
            parentChilds.push(element.getId());
            this._children.set(parentId, parentChilds);
        }

        // Track the mapping between state ids and the corresponding state objects
        this._idToStateMap.set(element.getId(), element);

        return super.add(element);
    }

    private removeChildren(element: E) {
        Preconditions.checkNotUndefined(element);

        // Set the list of children to the empty list before recurring. Avoids an infinite loop.
        const toRemove: GraphStateId[] = this._children.get(element.getId()) || [];
        this._children.set(element.getId(), []);

        // Remove the children recursively
        for (const childId of toRemove) {
            const childState = this._idToStateMap.get(childId);
            Preconditions.checkNotUndefined(childState);
            this.remove(childState);

            // Also remove the child from the set of frontier states
            this._frontierSet.remove(childState);
        }
    }

    public remove(element: E): any {
        // Remove all children
        this.removeChildren(element);

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


