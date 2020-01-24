/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net)
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

import {OperationID, ProgramOperation, ProgramOperations} from "./ops/ProgramOperation";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ControlLocation, LocationID} from "./ControlLocation";
import {Map as ImmMap, Set as ImmSet} from "immutable"
import {Preconditions} from "../../../utils/Preconditions";

export type TargetId = LocationID;
export type SourceId = LocationID;

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

    public addEntryLocationWithID(id: LocationID): this {
        return this.addEntryLocation(ControlLocation.for(id));
    }

    public addEntryLocation(loc: ControlLocation): this {
        Preconditions.checkNotUndefined(loc);
        this._entryLocations.add(loc.ident);
        this.addLocation(loc);
        return this;
    }

    public addExitLocationWithID(id: LocationID): this {
        return this.addExitLocation(ControlLocation.for(id));
    }

    public addExitLocation(loc: ControlLocation): this {
        this._exitLocations.add(loc.ident);
        this.addLocation(loc);
        return this;
    }

    private addLocation(loc: ControlLocation): this {
        ControlLocation.setFreshLocationIdOffset(loc.ident);
        this._locations.set(loc.ident, loc);
        return this;
    }

    public addTransitionByIDs(from: LocationID, to: LocationID, op: ProgramOperation): this {
        return this.addTransition(ControlLocation.for(from), ControlLocation.for(to), op);
    }

    public addTransition(from: ControlLocation, to: ControlLocation, op: ProgramOperation): this {
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

    public addAllTransitionsOf(input: TransitionRelation): this {
        // Check disjointness of the locations
        const locIntersection = input.locationSet.intersect(this._locations.keys());
        Preconditions.checkArgument(locIntersection.isEmpty(), "The set of locations must be disjoint");

        // Add all transitions
        for (let from of input.locationSet) {
            for (let [op, to] of input.transitionsFrom(from)) {
                this.addTransition(ControlLocation.for(from), ControlLocation.for(to), ProgramOperation.for(op));
            }
        }

        return this;
    }

    public build(): TransitionRelation {
        let locations: ImmSet<LocationID> = ImmSet(this._locations.keys());
        let entryLocs: ImmSet<LocationID> = ImmSet(this._entryLocations);
        let exitLocs: ImmSet<LocationID> = ImmSet(this._exitLocations);

        let transitions: TransitionTable = ImmMap();
        for(let [fromID, fwdTargetMap] of this._transitions.entries()) {
            let fromMap: ImmMap<LocationID, ImmSet<OperationID>> = ImmMap();
            for (let [targetID, fwdTransOps] of fwdTargetMap.entries()) {
                const ops = ImmSet(fwdTransOps.values());
                fromMap = fromMap.set(targetID, ops);
            }
            transitions = transitions.set(fromID, fromMap);
        }

        return new TransitionRelation(transitions, locations, entryLocs, exitLocs);
    }

}

export type TransitionTable = ImmMap<LocationID, ImmMap<LocationID, ImmSet<OperationID>>>;

export class TransitionRelation {

    private readonly _transitions: TransitionTable;

    private readonly _locations: ImmSet<LocationID>;

    private readonly _entryLocations: ImmSet<LocationID>;

    private readonly _exitLocations: ImmSet<LocationID>;

    private _backwards: TransitionRelation = null;

    private readonly _closureTerminators: Map<LocationID, ImmSet<LocationID>>;

    constructor(transitions: TransitionTable, locations: ImmSet<LocationID>,
                entryLocs: ImmSet<LocationID>, exitLocs: ImmSet<LocationID>) {
        this._transitions = transitions;
        this._locations = locations;
        this._entryLocations = entryLocs;
        this._exitLocations = exitLocs;
        this._closureTerminators = new Map();
    }

    public toString() {
        let lines: string[] = [];
        for (let fromId of this._locations) {
            for (let [op, toId] of this.transitionsFrom(fromId)) {
                lines.push(`(${fromId}) ${op} (${toId})`);
            }
        }
        return lines.join("\n");
    }

    private buildBackwardsTransitions(): void {
        if (this._backwards) {
            return;
        }

        let builder = new TransitionRelationBuilder();

        for(let [fromID, fwdTargetMap] of this._transitions.entries()) {
            for (let [targetID, fwdTransOps] of fwdTargetMap.entries()) {
                for (let opID of fwdTransOps) {
                    let fromLocation = ControlLocation.for(fromID);
                    let toLocation = ControlLocation.for(targetID);
                    let op = ProgramOperations.withID(opID);
                    builder.addTransition(toLocation, fromLocation, op);
                }
            }
        }

        this._backwards = builder.build();
    }

    get backwards(): TransitionRelation {
        this.buildBackwardsTransitions();
        return this._backwards;
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

    private computeClosureTerminationStates(of: LocationID): Set<LocationID> {
        const result: Set<LocationID> = new Set();

        const visited: Set<LocationID> = new Set();
        const worklist: Array<LocationID>  = new Array<LocationID>();

        worklist.push(of);
        while (worklist.length > 0) {
            const work: LocationID = worklist.pop();
            if (!visited.has(work)) {
                visited.add(work);
                let isTerminationState = this.transitionsFrom(work).length == 0;
                for (let [op, target] of this.transitionsFrom(work)) {
                    if (op == ProgramOperations.epsilon().ident) {
                        worklist.push(target);
                    } else {
                        isTerminationState = true;
                    }
                }
                if (isTerminationState) {
                    result.add(work);
                }
            }
        }

        return result;
    }

    public closureTerminationStates(of: LocationID): ImmSet<LocationID> {
        let result: ImmSet<LocationID> = this._closureTerminators.get(of);
        if (!result) {
            let termstates: Set<LocationID> = this.computeClosureTerminationStates(of);
            result = ImmSet(termstates);
            this._closureTerminators.set(of, result);
        }

        return result;
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

    public transitionsTo(to: LocationID): [OperationID, LocationID][] {
        return this.backwards.transitionsFrom(to);
    }

    public static builder(): TransitionRelationBuilder {
        return new TransitionRelationBuilder();
    }

}

export class LocationEquivalence {

    private _classid: LocationID;
    private readonly _equivalent: Set<LocationID>;

    constructor(equivalent: Set<LocationID>) {
        this._equivalent = Preconditions.checkNotUndefined(equivalent);

        if (equivalent.size > 1) {
            this._classid = ControlLocation.fresh().ident;
        } else {
            Preconditions.checkArgument(equivalent.size == 1);
            this._classid = equivalent.values().next().value;
        }
    }

    public addAllFrom(eq: LocationEquivalence) {
        const sizeBefore: number = this._equivalent.size;
        for (const l of eq._equivalent) {
            this._equivalent.add(l);
        }

        if (this._equivalent.size > sizeBefore && sizeBefore == 1) {
            this._classid = ControlLocation.fresh().ident;
        }
    }

    get classid(): number {
        return this._classid;
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
                tx = this.addTransition(tx, exloc, entloc, ProgramOperations.epsilon());
            }
        }

        return new TransitionRelation(tx, locs, entryLocs, exitLocs);
    }

    private static addTransition(tx: TransitionTable, from: LocationID, to: LocationID, op: ProgramOperation): TransitionTable {
        Preconditions.checkNotUndefined(tx);
        Preconditions.checkNotUndefined(from);
        Preconditions.checkNotUndefined(to);
        Preconditions.checkNotUndefined(op);

        const oldTargets: ImmMap<LocationID, ImmSet<OperationID>> = tx.get(from) || ImmMap();
        const oldReachingOps: ImmSet<OperationID> = oldTargets.get(to) || ImmSet();
        const newReachingOps: ImmSet<OperationID> = oldReachingOps.add(op.ident);
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
            Preconditions.checkArgument(op != null);
            let succLoc: ControlLocation = ControlLocation.fresh();
            result = this.concatTrOpGoto(result, op, succLoc);
        }
        return result;
    }

    static branching(thenCaseGuarded: TransitionRelation, elseCaseGuarded: TransitionRelation, resultExitLoc: ControlLocation): TransitionRelation {
        let builder = TransitionRelation.builder()
            .addAllTransitionsOf(thenCaseGuarded)
            .addAllTransitionsOf(elseCaseGuarded);

        const resultEntryLoc: ControlLocation = ControlLocation.fresh();
        const casesEntryLocs = thenCaseGuarded.entryLocationSet.union(elseCaseGuarded.entryLocationSet);
        const casesExitLocs = thenCaseGuarded.exitLocationSet.union(elseCaseGuarded.exitLocationSet);

        for (let centry of casesEntryLocs) {
            builder.addTransition(resultEntryLoc, ControlLocation.for(centry), ProgramOperations.epsilon());
        }

        for (let cexit of casesExitLocs) {
            builder.addTransition(ControlLocation.for(cexit), resultExitLoc, ProgramOperations.epsilon());
        }

        return builder.addExitLocation(resultExitLoc)
            .addEntryLocation(resultEntryLoc)
            .build();
    }

    static concatTrOpGoto(tr: TransitionRelation, op: ProgramOperation, goto: ControlLocation): TransitionRelation {
        Preconditions.checkNotUndefined(tr);
        Preconditions.checkNotUndefined(op);
        Preconditions.checkNotUndefined(goto);
        // TODO: Add tests regarding circular references

        let locs = tr.locationSet.add(goto.ident);

        let tx: TransitionTable = tr.transitionTable;
        let entryLocs: ImmSet<LocationID> = tr.entryLocationSet;
        let exitLocs: ImmSet<LocationID> = tr.exitLocationSet;

        let fromLocs: ImmSet<LocationID> = tr.exitLocationSet;
        for (let from of fromLocs) {
            tx = this.addTransition(tx, from, goto.ident, op);
            exitLocs = exitLocs
                .remove(from)
                .add(goto.ident);
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
            tx = this.addTransition(tx, loc.ident, to, op);
            entryLocs = entryLocs.remove(to);
        }

        return new TransitionRelation(tx, locs, entryLocs, exitLocs);
    }

    static concatAndGoto(headRelation: TransitionRelation, loopBody: TransitionRelation, loopHead: ControlLocation): TransitionRelation {
        return this.concatTrOpGoto(
            this.concat(headRelation, loopBody),
            ProgramOperations.epsilon(),
            loopHead);
    }

    static singleTransition(from: ControlLocation, to: ControlLocation, op: ProgramOperation): TransitionRelation {
        return TransitionRelation.builder()
            .addEntryLocation(from)
            .addExitLocation(to)
            .addTransition(from, to, op)
            .build();
    }

    static singleton(controlLocation: ControlLocation): TransitionRelation {
        return TransitionRelation.builder()
            .addEntryLocation(controlLocation)
            .addExitLocation(controlLocation)
            .addTransition(controlLocation, controlLocation, ProgramOperations.epsilon())
            .build();
    }

    static continueFrom(loopHead: ControlLocation, transitionRelation: TransitionRelation) {
        throw new ImplementMeException();
    }

    private static buildEquivalenceClasses(tr: TransitionRelation): Map<LocationID, LocationEquivalence> {
        const result: Map<LocationID, LocationEquivalence> = new Map();

        // 1. Each location is in its own equivalence class
        tr.locationSet.forEach((l) => result.set(l, new LocationEquivalence(new Set([l]))));

        const todo: Set<LocationID> = new Set();
        tr.locationSet.forEach((l) => todo.add(l));

        while (todo.size > 0) {
            const l: LocationID = todo.values().next().value;
            todo.delete(l);

            const closure: Set<LocationID> = TransitionRelations.getBiDirClosure(tr, l);
            closure.forEach((l) => todo.delete(l));

            const newClass = new LocationEquivalence(closure);
            for (const l of closure) {
                const locEquiv: LocationEquivalence = result.get(l);
                Preconditions.checkNotUndefined(locEquiv);
                newClass.addAllFrom(locEquiv);
                result.set(l, newClass);
            }

            for (const c of closure) {
                todo.delete(c);
            }
        }

        return result;
    }

    private static getDirClosure(l: LocationID,
                                 nextOp: (l) => [OperationID, LocationID][]): Set<LocationID> {
        const result: Set<LocationID> = new Set();

        // Forwards reachable
        const forwardsDone: Set<LocationID> = new Set<LocationID>();
        const worklist: LocationID[] = [l];

        while (worklist.length > 0) {
            const work: LocationID = worklist.pop();
            result.add(work);
            forwardsDone.add(work);
            nextOp(work).forEach(([op, target]) => {
                if (ProgramOperations.epsilon().ident == op) {
                    if (!forwardsDone.has(target)) {
                        worklist.push(target);
                    }
                }
            });
        }

        return result;
    }

    private static getBiDirClosure(tr: TransitionRelation, l: LocationID): Set<LocationID> {
        const result: Set<LocationID> = new Set();

        // Forwards reachable
        const forwardsClosure: Set<LocationID> = this.getDirClosure(l, (l) => tr.transitionsFrom(l));
        Preconditions.checkState(forwardsClosure.size > 0);

        // Backwards reachable
        const backwardsClosure: Set<LocationID> = this.getDirClosure(l, (l) => tr.transitionsTo(l));
        Preconditions.checkState(backwardsClosure.size > 0);

        return new Set([...forwardsClosure, ...backwardsClosure]);
    }

    static eliminateEpsilons(tr: TransitionRelation): TransitionRelation {
        // 1. Build equivalence classes
        const equivMap: Map<LocationID, LocationEquivalence> = this.buildEquivalenceClasses(tr);

        const inverseEquiv: Map<LocationID, LocationID> = new Map<LocationID, LocationID>();
        for (const key of equivMap.keys()) {
            const value: LocationEquivalence = equivMap.get(key);
            inverseEquiv.set(key, value.classid);
        }

        Preconditions.checkState(inverseEquiv.size == tr.locationSet.size);

        // 3. Rebuild the transition relation
        const builder = TransitionRelation.builder();
        // - Transitions
        tr.transitionTable.forEach((targets: ImmMap<LocationID, ImmSet<OperationID>>, from: LocationID) => {
            for (const to of targets.keys()) {
                for (const op of targets.get(to)) {
                    if (op === ProgramOperations.epsilon().ident) {
                        // Epsilon transitions can now be skipped
                        continue;
                    }
                    builder.addTransitionByIDs(inverseEquiv.get(from), inverseEquiv.get(to), ProgramOperation.for(op));
                }
            }
        });
        // - Entry locations
        tr.entryLocationSet.forEach((l: LocationID) => {
            builder.addEntryLocationWithID(inverseEquiv.get(l));
        });
        // - Exit locations
        tr.exitLocationSet.forEach((l: LocationID) => {
            builder.addExitLocationWithID(inverseEquiv.get(l));
        });

        return builder.build();
    }

}
