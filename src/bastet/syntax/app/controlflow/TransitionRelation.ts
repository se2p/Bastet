/*
 *
 *    Copyright 2019 University of Passau
 *
 *    Project maintained by Andreas Stahlbauer (firstname @ lastname . net)
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import {OperationID, ProgramOperation, ProgramOperations} from "./ops/ProgramOperation";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ControlLocation, LocationID} from "./ControlLocation";
import {Map as ImmMap, Set as ImmSet} from "immutable"
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";

export class TransitionRelationBuilder {

    private readonly _transitions: Map<LocationID, Map<LocationID, Set<OperationID>>>;

    private readonly _locations: Map<LocationID, ControlLocation>;

    private readonly _entryLocations: Set<LocationID>;

    private readonly _exitLocations: Set<LocationID>;

    public constructor() {
        this._entryLocations = new Set();
        this._exitLocations = new Set();
        this._transitions = new Map();
        this._locations = new Map();
    }

    public addEntryLocation(loc: ControlLocation): TransitionRelationBuilder {
        this._entryLocations.add(loc.ident);
        this.addLocation(loc);
        return this;
    }

    public addExitLocation(loc: ControlLocation): TransitionRelationBuilder {
        this._exitLocations.add(loc.ident);
        this.addLocation(loc);
        return this;
    }

    private addLocation(loc: ControlLocation) {
        this._locations.set(loc.ident, loc);
    }

    public addTransition(from: ControlLocation, to: ControlLocation, op: ProgramOperation): TransitionRelationBuilder {
        // Add the transition
        let fromMap: Map<LocationID, Set<OperationID>> = this._transitions.get(from.ident);
        if (!fromMap) {
            fromMap = new Map();
            this._transitions.set(from.ident, fromMap);
        }

        let opsToLocSet: Set<OperationID> = fromMap.get(to.ident);
        if (!opsToLocSet) {
            opsToLocSet = new Set();
            fromMap.set(to.ident, opsToLocSet);
        }

        opsToLocSet.add(op.ident);

        // Add the control locations
        this.addLocation(from);
        this.addLocation(to);

        return this;
    }

    public build(): TransitionRelation {
        throw new ImplementMeException();
        // return new Script(this._initialLocation, transitions, locations);
    }

}

export type TransitionTable = ImmMap<LocationID, ImmMap<LocationID, ImmSet<OperationID>>>;

export class TransitionRelation {

    private readonly _transitions: TransitionTable;

    private readonly _locations: ImmSet<LocationID>;

    private readonly _entryLocations: ImmSet<LocationID>;

    private readonly _exitLocations: ImmSet<LocationID>;

    constructor(transitions: TransitionTable, locations: ImmSet<LocationID>,
                entryLocs: ImmSet<LocationID>, exitLocs: ImmSet<LocationID>) {
        this._transitions = transitions;
        this._locations = locations;
        this._entryLocations = entryLocs;
        this._exitLocations = exitLocs;
    }

    get transitionTable(): TransitionTable {
        return this._transitions;
    }

    get locations(): IterableIterator<ControlLocation> {
        throw new ImplementMeException();
    }

    get locationSet(): ImmSet<LocationID> {
        return this._locations;
    }

    get entryLocations(): IterableIterator<ControlLocation> {
        throw new ImplementMeException();
    }

    get entryLocationSet(): ImmSet<LocationID> {
        return this._entryLocations;
    }

    get exitLocations(): IterableIterator<ControlLocation> {
        throw new ImplementMeException();
    }

    get exitLocationSet(): ImmSet<LocationID> {
        return this._exitLocations;
    }

    public transitionsFrom(from: LocationID): [OperationID, LocationID][] {
        let transitionsTo: ImmMap<LocationID, ImmSet<OperationID>> = this.transitionTable.get(from) || ImmMap();

        let result: [OperationID, LocationID][] = [];
        for (let [to, ops] of transitionsTo.entries()) {
            for (let o of ops) {
                result.push([o, to]);
            }
        }

        return result;
    }

}

export class TransitionRelations {

    /**
     * ATTENTION: The transition relation `tr2` is not re-labeled by this method.
     *
     * @param tr1
     * @param tr2
     */
    static concat(tr1: TransitionRelation, tr2: TransitionRelation): TransitionRelation {
        // Exit locations of TR1 with the entry locations of TR2

        let locs: ImmSet<LocationID> = tr1.locationSet.merge(tr2.locationSet);
        let entryLocs: ImmSet<LocationID> = tr1.entryLocationSet;
        let exitLocs: ImmSet<LocationID> = tr2.exitLocationSet;
        let tx: TransitionTable = tr1.transitionTable.merge(tr2.transitionTable);

        for (let exloc of tr1.exitLocationSet) {
            for (let entloc of tr2.entryLocationSet) {
                this.addTransition(tx, exloc, entloc, ProgramOperations.epsilon());
            }
        }

        return new TransitionRelation(tx, locs, entryLocs, exitLocs);
    }

    private static addTransition(tx: TransitionTable, from: LocationID, to: LocationID, op: ProgramOperation): TransitionTable {
        const oldTargets: ImmMap<LocationID, ImmSet<OperationID>> = tx.get(from) || ImmMap();
        const oldReachingOps: ImmSet<OperationID> = oldTargets.get(to) || ImmSet();
        const newReachingOps: ImmSet<OperationID> = oldReachingOps.add(ProgramOperations.epsilon().ident);
        const newTargets: ImmMap<LocationID, ImmSet<OperationID>> = oldTargets.set(to, newReachingOps);
        return tx.set(from, newTargets);
    }

    /**
     * Re-label the transition relation with fresh control locations.
     *
     * @param The transition relation to relabel.
     * @returns the relabeled transition relation.
     */
    static relabel(tr: TransitionRelation): TransitionRelation {
        throw new ImplementMeException();
    }

    static epsilon(): TransitionRelation {
        const f = ControlLocation.fresh();
        return this.singleton(f);
    }

    static forOpSeq(...ops: ProgramOperation[]): TransitionRelation {
        let result: TransitionRelation = this.epsilon();
        for (let op of ops) {
            let succLoc: ControlLocation = ControlLocation.fresh();
            result = this.concatTrOpGoto(result, op, succLoc);
        }
        return result;
    }

    static branching(thenCaseGuarded: TransitionRelation, elseCaseGuarded: TransitionRelation, exitLocation: ControlLocation): TransitionRelation {
        throw new ImplementMeException();
    }

    static concatTrOpGoto(tr: TransitionRelation, op: ProgramOperation, goto: ControlLocation): TransitionRelation {
        if (tr.locationSet.has(goto.ident)) {
            throw new IllegalArgumentException("Circular references not yet supported! Implement me");
        }
        if (tr.entryLocationSet.has(goto.ident)) {
            throw new IllegalArgumentException("Circular references not yet supported! Implement me");
        }

        let locs = tr.locationSet.add(goto.ident);

        let tx: TransitionTable = tr.transitionTable;
        let entryLocs: ImmSet<LocationID> = tr.entryLocationSet;
        let exitLocs: ImmSet<LocationID> = tr.exitLocationSet;

        let fromLocs: ImmSet<LocationID> = tr.exitLocationSet;
        for (let from of fromLocs) {
            tx = this.addTransition(tr.transitionTable, from, goto.ident, op);
            exitLocs = exitLocs.remove(from);
        }

        return new TransitionRelation(tx, locs, entryLocs, exitLocs);
    }

    static concatOpTr(loc: ControlLocation, op: ProgramOperation, tr: TransitionRelation): TransitionRelation {
        if (tr.locationSet.has(loc.ident)) {
            throw new IllegalArgumentException("Circular references not yet supported! Implement me");
        }
        if (tr.entryLocationSet.has(loc.ident)) {
            throw new IllegalArgumentException("Circular references not yet supported! Implement me");
        }

        let locs = tr.locationSet.add(loc.ident);

        let tx: TransitionTable = tr.transitionTable;
        let entryLocs: ImmSet<LocationID> = tr.entryLocationSet;
        let exitLocs: ImmSet<LocationID> = tr.exitLocationSet;

        let toLocs: ImmSet<LocationID> = tr.entryLocationSet;
        for (let to of toLocs) {
            tx = this.addTransition(tr.transitionTable, loc.ident, to, op);
            entryLocs = entryLocs.remove(to);
        }

        return new TransitionRelation(tx, locs, entryLocs, exitLocs);
    }

    static concatAndGoto(headRelation: TransitionRelation, loopBody: TransitionRelation, loopHead: ControlLocation): TransitionRelation {
        throw new ImplementMeException();
    }

    static singleTransition(from: ControlLocation, to: ControlLocation, op: ProgramOperation): TransitionRelation {
        const trans: TransitionTable = ImmMap([[from.ident, ImmMap([[to.ident, ImmSet([op.ident])]])]]);
        const locs: ImmSet<LocationID> = ImmSet([from.ident, to.ident]);
        const entry: ImmSet<LocationID> = ImmSet([from.ident]);
        const exit: ImmSet<LocationID> = ImmSet([to.ident]);
        return new TransitionRelation(trans, locs, entry, exit);
    }

    static singleton(controlLocation: ControlLocation): TransitionRelation {
        const loc: LocationID = controlLocation.ident;
        const epsilonOp: OperationID = ProgramOperations.epsilon().ident;
        const trans: TransitionTable = ImmMap([[loc, ImmMap([[loc, ImmSet([epsilonOp])]])]]);
        const locs: ImmSet<LocationID> = ImmSet([loc]);
        const entry: ImmSet<LocationID> = ImmSet([loc]);
        const exit: ImmSet<LocationID> = ImmSet([loc]);
        return new TransitionRelation(trans, locs, entry, exit);
    }

    static continueFrom(loopHead: ControlLocation, transitionRelation: TransitionRelation) {
        throw new ImplementMeException();
    }


}
