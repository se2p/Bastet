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


import {ReachedSet} from "../../../algorithms/StateSet";
import {AbstractState} from "../../../../lattices/Lattice";
import {App} from "../../../../syntax/app/App";
import {Map as ImmMap, Set as ImmSet} from "immutable";
import {Preconditions} from "../../../../utils/Preconditions";
import {TransitionRelation} from "../../../../syntax/app/controlflow/TransitionRelation";
import {ActorId} from "../../../../syntax/app/Actor";
import {ControlLocationExtractor} from "../ControlUtils";
import {RelationLocation} from "../ConcreteProgramState";

export class ControlCoverageReport {

    private readonly _absUncoveredLocations: number;

    private readonly _absCoveredLocations: number;

    private readonly _totalTaskLocations: number;

    private readonly _numberOfUncoveredPerRelation: ImmMap<any, any>;

    constructor(absUncoveredLocations: number, absCoveredLocations: number, totalTaskLocations: number,
                numberOfUncoveredPerRelation: {}) {
        Preconditions.checkArgument(totalTaskLocations > 0);
        this._absUncoveredLocations = absUncoveredLocations;
        this._absCoveredLocations = absCoveredLocations;
        this._totalTaskLocations = totalTaskLocations;
        this._numberOfUncoveredPerRelation = ImmMap(numberOfUncoveredPerRelation);
    }

    get uncoveredControlLocationsAbs(): number {
        return this._absUncoveredLocations;
    }

    get coveredControlLocationsAbs(): number {
        return this._absCoveredLocations;
    }

    get controlCoveragePercent(): number {
        return Math.floor((this._absCoveredLocations / this._totalTaskLocations) * 10000) / 10000;
    }

    get numberOfUncoveredPerRelation(): ImmMap<any, any> {
        return this._numberOfUncoveredPerRelation;
    }
}

export class ControlCoverageExaminer {

    public determineCoverageOf(task: App, reached: ReachedSet<AbstractState>): ControlCoverageReport {
        // 1. Extract the set of reached control locations from the set `reached`
        const reachedLocs = this.collectReachedLocs(task, reached);

        // 2. Collect the set of control locations of the task
        const taskLocsAll = this.collectTaskLocs(task);
        const taskLocs = taskLocsAll.filter((l) => {
            // Filter out some locations for this calculation
           const relation = task.getTransitionRelationById(l.getRelationId());
           return !(relation.entryLocationSet.contains(l.getLocationId())
                || relation.exitLocationSet.contains(l.getLocationId()));
        });

        // 3. Build the coverage report
        const uncoveredLocs = taskLocs.subtract(reachedLocs);
        const coveredLocs = taskLocs.subtract(uncoveredLocs);

        const rwu = {};
        for (const ucrl of uncoveredLocs) {
            const relation = task.getTransitionRelationById(ucrl.getRelationId());
            rwu[relation.name] = (rwu[relation.name] || 0) + 1;
        }

        // ATTENTION: Dead code (unreachable code/locations are not considered by this calculation!)
        return new ControlCoverageReport(uncoveredLocs.size, coveredLocs.size, taskLocs.size, rwu);
    }

    private collectReachedLocs(task: App, reached: ReachedSet<AbstractState>): ImmSet<RelationLocation> {
        const result = ImmSet<RelationLocation>().asMutable();
        const visitor = new ControlLocationExtractor(task);
        for (const e of reached) {
            e.accept(visitor).map((rl) => result.add(rl));
        }
        return result.asImmutable();
    }

    private collectTaskLocs(task: App): ImmSet<RelationLocation> {
        const result: ImmSet<RelationLocation> = ImmSet<RelationLocation>().asMutable();

        const collectLocsFromRelation = (actor: ActorId, rel: TransitionRelation) => {
            for (const lid of rel.locationSet) {
                result.add(new RelationLocation(actor, rel.ident, lid));
            }
        };

        for (const actor of task.actors) {
            for (const script of actor.scripts) {
                collectLocsFromRelation(actor.ident, script.transitions);
            }
            for (const method of actor.methods) {
                collectLocsFromRelation(actor.ident, method.transitions);
            }
        }

        return result.asImmutable();
    }

}