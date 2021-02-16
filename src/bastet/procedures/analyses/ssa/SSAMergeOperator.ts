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

import {MergeOperator} from "../ProgramAnalysis";
import {SSAState} from "./SSAAbstractDomain";
import {AbstractState} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {StoreEvalResultToVariableStatement} from "../../../syntax/ast/core/statements/SetStatement";
import {Map as ImmMap, Set as ImmSet} from "immutable";
import {App} from "../../../syntax/app/App";
import {DataLocation, VersionedDataLocation} from "../../../syntax/app/controlflow/DataLocation";
import {VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {Concerns} from "../../../syntax/Concern";
import {LabeledTransferRelation, Transfers} from "../TransferRelation";
import {AstNode} from "../../../syntax/ast/AstNode";
import {ProgramOperationFactory} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {ActorType} from "../../../syntax/ast/core/ScratchType";
import {ThreadStateFactory} from "../control/ConcreteProgramState";

export class SSAMergeOperator implements MergeOperator<SSAState> {

    private readonly _task: App;

    private readonly _wrappedMergeOp: MergeOperator<AbstractState>;

    private readonly _wrappedAbstractSuccOp: LabeledTransferRelation<any>;

    constructor(task: App, wrappedMergeOp: MergeOperator<AbstractState>, wrappedAbstractSuccOp: LabeledTransferRelation<any>) {
        this._task = Preconditions.checkNotUndefined(task);
        this._wrappedMergeOp = Preconditions.checkNotUndefined(wrappedMergeOp);
        this._wrappedAbstractSuccOp = Preconditions.checkNotUndefined(wrappedAbstractSuccOp);
    }

    merge(state1: SSAState, state2: SSAState): SSAState {
        // Sync the SSA maps
        const state1SyncOps: AstNode[] = [];
        const state2SyncOps: AstNode[] = [];

        const keys: ImmSet<string> = ImmSet(state1.getSSA().keys()).union(state2.getSSA().keys());
        let state1SSA = ImmMap<string, number>();
        let state2SSA = ImmMap<string, number>();
        for (const k of keys) {
            // 'mergeWith' only works as expected if there are values for all keys
            // in both maps.
            state1SSA = state1SSA.set(k, state1.ssa.get(k) || 0);
            state2SSA = state2SSA.set(k, state2.ssa.get(k) || 0);
        }

        const syncedSSA = state1SSA.mergeWith(
            (state1Version, state2Version, key) => {
                const assignedDataLoc: DataLocation = this._task.typeStorage.getTypedLocation(key);
                const mergedVersion = Math.max(state1Version, state2Version);

                if (assignedDataLoc.type == ActorType.instance().typeId) {
                    return state1Version;
                }

                if (state1Version > state2Version) {
                    const oldVersion = state2Version;
                    const oldVariable = new VersionedDataLocation(assignedDataLoc.ident, assignedDataLoc.type, oldVersion);
                    const newVariable = new VersionedDataLocation(assignedDataLoc.ident, assignedDataLoc.type, mergedVersion);
                    state2SyncOps.push(new StoreEvalResultToVariableStatement(
                        new VariableWithDataLocation(newVariable),
                        new VariableWithDataLocation(oldVariable)));

                } else if (state2Version > state1Version) {
                    const oldVersion = state1Version;
                    const oldVariable = new VersionedDataLocation(assignedDataLoc.ident, assignedDataLoc.type, oldVersion);
                    const newVariable = new VersionedDataLocation(assignedDataLoc.ident, assignedDataLoc.type, mergedVersion);
                    state1SyncOps.push(new StoreEvalResultToVariableStatement(
                        new VariableWithDataLocation(newVariable),
                        new VariableWithDataLocation(oldVariable)));
                }

                return Math.max(state1Version, state2Version);
            }, state2SSA);

        const state1Synced = Transfers.withIntermediateOps(this._wrappedAbstractSuccOp, state1.getWrappedState(), ThreadStateFactory.dummy(),
            state1SyncOps.map(ast => ProgramOperationFactory.createFor(ast)), Concerns.highestPriorityConcern());
        const state2Synced = Transfers.withIntermediateOps(this._wrappedAbstractSuccOp, state2.getWrappedState(), ThreadStateFactory.dummy(),
            state2SyncOps.map(ast => ProgramOperationFactory.createFor(ast)), Concerns.highestPriorityConcern());

        Preconditions.checkArgument(state1Synced.length == 1);
        Preconditions.checkArgument(state2Synced.length == 1);

        const wrappedMergedAndSynced: AbstractState = this._wrappedMergeOp.merge(state1Synced[0], state2Synced[0]);

        return state1.withWrappedState(wrappedMergedAndSynced).withSSA(syncedSSA);
    }

    shouldMerge(state1: SSAState, state2: SSAState): boolean {
        return this._wrappedMergeOp.shouldMerge(state1.getWrappedState(), state2.getWrappedState());
    }

}
