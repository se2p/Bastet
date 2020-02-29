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

import {OperationId, ProgramOperation, ProgramOperations} from "./ops/ProgramOperation";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ControlLocation, LocationId} from "./ControlLocation";
import {Map as ImmMap, Set as ImmSet} from "immutable"
import {Preconditions} from "../../../utils/Preconditions";

export type TargetId = LocationId;
export type SourceId = LocationId;

export interface WithTransitionRelation {

    transitions: TransitionRelation;

}

export class TransitionRelationBuilder {

    private readonly _transitions: Map<LocationId, Map<LocationId, Set<OperationId>>>;

    private readonly _locations: Map<LocationId, ControlLocation>;

    private readonly _entryLocations: Set<LocationId>;

    private readonly _exitLocations: Set<LocationId>;

    public constructor() {
        this._entryLocations = new Set();
        this._exitLocations = new Set();
        this._transitions = new Map();
        this._locations = new Map();
    }

    public addEntryLocationWithID(id: LocationId): this {
        return this.addEntryLocation(ControlLocation.for(id));
    }

    public addEntryLocation(loc: ControlLocation): this {
        Preconditions.checkNotUndefined(loc);
        this._entryLocations.add(loc.ident);
        this.addLocation(loc);
        return this;
    }

    public addExitLocationWithID(id: LocationId): this {
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

    public addTransitionByIDs(from: LocationId, to: LocationId, op: ProgramOperation): this {
        return this.addTransition(ControlLocation.for(from), ControlLocation.for(to), op);
    }

    public addTransition(from: ControlLocation, to: ControlLocation, op: ProgramOperation): this {
        // Add the transition
        let fromMap: Map<LocationId, Set<OperationId>> = this._transitions.get(from.ident);
        if (!fromMap) {
            fromMap = new Map();
            this._transitions.set(from.ident, fromMap);
        }

        let opsToLocSet: Set<OperationId> = fromMap.get(to.ident);
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
            for (const t of input.transitionsFrom(from)) {
                this.addTransition(ControlLocation.for(from), ControlLocation.for(t.target), ProgramOperation.for(t.opId));
            }
        }

        return this;
    }

    public build(): TransitionRelation {
        let locations: ImmSet<LocationId> = ImmSet(this._locations.keys());
        let entryLocs: ImmSet<LocationId> = ImmSet(this._entryLocations);
        let exitLocs: ImmSet<LocationId> = ImmSet(this._exitLocations);

        let transitions: TransitionTable = ImmMap();
        for(let [fromID, fwdTargetMap] of this._transitions.entries()) {
            let fromMap: ImmMap<LocationId, ImmSet<OperationId>> = ImmMap();
            for (let [targetID, fwdTransOps] of fwdTargetMap.entries()) {
                const ops = ImmSet(fwdTransOps.values());
                fromMap = fromMap.set(targetID, ops);
            }
            transitions = transitions.set(fromID, fromMap);
        }

        return new TransitionRelation(transitions, locations, entryLocs, exitLocs);
    }

    connectLocations(fromLocations: Iterable<LocationId>, toLocations: Iterable<LocationId>): this {
        for (const fromLoc of fromLocations) {
            for (const toLoc of toLocations) {
                this.addTransitionByIDs(fromLoc, toLoc, ProgramOperations.epsilon());
            }
        }
        return this;
    }

}

export type TransitionTable = ImmMap<LocationId, ImmMap<LocationId, ImmSet<OperationId>>>;

export class TransitionTo {

    private readonly _opId: OperationId;

    private readonly _target: LocationId;

    constructor(opId: number, toLocId: number) {
        this._opId = opId;
        this._target = toLocId;
    }

    get opId(): number {
        return this._opId;
    }

    get target(): number {
        return this._target;
    }
}

export type TransRelId = number;

export class TransitionRelation {

    private readonly _ident: TransRelId;

    private readonly _transitions: TransitionTable;

    private readonly _locations: ImmSet<LocationId>;

    private readonly _entryLocations: ImmSet<LocationId>;

    private readonly _exitLocations: ImmSet<LocationId>;

    private _backwards: TransitionRelation = null;

    private readonly _closureTerminators: Map<LocationId, ImmSet<LocationId>>;

    constructor(transitions: TransitionTable, locations: ImmSet<LocationId>,
                entryLocs: ImmSet<LocationId>, exitLocs: ImmSet<LocationId>) {
        TransitionRelation.TRANS_REL_ID_SEQ = (TransitionRelation.TRANS_REL_ID_SEQ || 0) + 1;
        this._ident = TransitionRelation.TRANS_REL_ID_SEQ;
        this._transitions = transitions;
        this._locations = locations;
        this._entryLocations = entryLocs;
        this._exitLocations = exitLocs;
        entryLocs.forEach((l) => Preconditions.checkArgument(this._locations.contains(l)));
        this._closureTerminators = new Map();
    }

    private static TRANS_REL_ID_SEQ: TransRelId;

    public toString() {
        let lines: string[] = [];
        for (let fromId of this._locations) {
            for (let t of this.transitionsFrom(fromId)) {
                lines.push(`(${fromId}) ${t.opId} (${t.target})`);
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

    get locationSet(): ImmSet<LocationId> {
        return this._locations;
    }

    get entryLocations(): IterableIterator<ControlLocation> {
        throw new ImplementMeException();
    }

    get entryLocationSet(): ImmSet<LocationId> {
        return this._entryLocations;
    }

    get exitLocations(): IterableIterator<ControlLocation> {
        throw new ImplementMeException();
    }

    get exitLocationSet(): ImmSet<LocationId> {
        return this._exitLocations;
    }

    private computeClosureTerminationStates(of: LocationId): Set<LocationId> {
        const result: Set<LocationId> = new Set();

        const visited: Set<LocationId> = new Set();
        const worklist: Array<LocationId>  = new Array<LocationId>();

        worklist.push(of);
        while (worklist.length > 0) {
            const work: LocationId = worklist.pop();
            if (!visited.has(work)) {
                visited.add(work);
                let isTerminationState = this.transitionsFrom(work).length == 0;
                for (let t of this.transitionsFrom(work)) {
                    if (t.opId == ProgramOperations.epsilon().ident) {
                        worklist.push(t.target);
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

    public closureTerminationStates(of: LocationId): ImmSet<LocationId> {
        let result: ImmSet<LocationId> = this._closureTerminators.get(of);
        if (!result) {
            let termstates: Set<LocationId> = this.computeClosureTerminationStates(of);
            result = ImmSet(termstates);
            this._closureTerminators.set(of, result);
        }

        return result;
    }

    public transitionsFrom(from: LocationId): Array<TransitionTo> {
        let transitionsTo: ImmMap<LocationId, ImmSet<OperationId>> = this.transitionTable.get(from) || ImmMap();

        let result: Array<TransitionTo> = new Array<TransitionTo>();
        for (let [to, ops] of transitionsTo.entries()) {
            for (let o of ops) {
                result.push(new TransitionTo(o, to));
            }
        }

        return result;
    }

    public transitionBetween(from: LocationId, to: LocationId): ProgramOperation {
        for (const t of this.transitionsFrom(from)) {
            if (t.target == to) {
                return ProgramOperation.for(t.opId);
            }
        }
        return null;
    }

    public transitionsTo(to: LocationId): Array<TransitionTo> {
        return this.backwards.transitionsFrom(to);
    }

    public static builder(): TransitionRelationBuilder {
        return new TransitionRelationBuilder();
    }

    get ident(): TransRelId {
        return this._ident;
    }
}

export class LocationEquivalence {

    private _classid: LocationId;
    private readonly _equivalent: Set<LocationId>;

    constructor(equivalent: Set<LocationId>) {
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

        let locs: ImmSet<LocationId> = tr1.locationSet.merge(tr2.locationSet);
        let entryLocs: ImmSet<LocationId> = tr1.entryLocationSet;
        let exitLocs: ImmSet<LocationId> = tr2.exitLocationSet;
        let tx: TransitionTable = tr1.transitionTable.merge(tr2.transitionTable);

        for (let exloc of tr1.exitLocationSet) {
            for (let entloc of tr2.entryLocationSet) {
                tx = this.addTransition(tx, exloc, entloc, ProgramOperations.epsilon());
            }
        }

        return new TransitionRelation(tx, locs, entryLocs, exitLocs);
    }

    private static addTransition(tx: TransitionTable, from: LocationId, to: LocationId, op: ProgramOperation): TransitionTable {
        Preconditions.checkNotUndefined(tx);
        Preconditions.checkNotUndefined(from);
        Preconditions.checkNotUndefined(to);
        Preconditions.checkNotUndefined(op);

        const oldTargets: ImmMap<LocationId, ImmSet<OperationId>> = tx.get(from) || ImmMap();
        const oldReachingOps: ImmSet<OperationId> = oldTargets.get(to) || ImmSet();
        const newReachingOps: ImmSet<OperationId> = oldReachingOps.add(op.ident);
        const newTargets: ImmMap<LocationId, ImmSet<OperationId>> = oldTargets.set(to, newReachingOps);
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

    static forkTransitions(caseOneGuarded: TransitionRelation, caseTwoGuarded: TransitionRelation): TransitionRelation {
        let builder = TransitionRelation.builder()
            .addAllTransitionsOf(caseOneGuarded)
            .addAllTransitionsOf(caseTwoGuarded);

        const casesEntryLocs = caseOneGuarded.entryLocationSet.union(caseTwoGuarded.entryLocationSet);

        const resultEntryLoc: ControlLocation = ControlLocation.fresh();
        for (let centry of casesEntryLocs) {
            builder.addTransition(resultEntryLoc, ControlLocation.for(centry), ProgramOperations.epsilon());
        }

        caseOneGuarded.exitLocationSet.forEach((l) => builder.addExitLocationWithID(l));
        caseTwoGuarded.exitLocationSet.forEach((l) => builder.addExitLocationWithID(l));

        return builder.addEntryLocation(resultEntryLoc).build();
    }

    static concatTrOpGoto(tr: TransitionRelation, op: ProgramOperation, goto: ControlLocation): TransitionRelation {
        Preconditions.checkNotUndefined(tr);
        Preconditions.checkNotUndefined(op);
        Preconditions.checkNotUndefined(goto);
        // TODO: Add tests regarding circular references

        let locs = tr.locationSet.add(goto.ident);

        let tx: TransitionTable = tr.transitionTable;
        let entryLocs: ImmSet<LocationId> = tr.entryLocationSet;
        let exitLocs: ImmSet<LocationId> = tr.exitLocationSet;

        let fromLocs: ImmSet<LocationId> = tr.exitLocationSet;
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
        let entryLocs: ImmSet<LocationId> = tr.entryLocationSet;
        let exitLocs: ImmSet<LocationId> = tr.exitLocationSet;

        let toLocs: ImmSet<LocationId> = tr.entryLocationSet;
        for (let to of toLocs) {
            tx = this.addTransition(tx, loc.ident, to, op);
            entryLocs = entryLocs.remove(to);
        }

        entryLocs = entryLocs.add(loc.ident);

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

    private static buildEquivalenceClasses(tr: TransitionRelation): Map<LocationId, LocationEquivalence> {
        const result: Map<LocationId, LocationEquivalence> = new Map();

        // 1. Each location is in its own equivalence class
        tr.locationSet.forEach((l) => result.set(l, new LocationEquivalence(new Set([l]))));

        const todo: Set<LocationId> = new Set();
        tr.locationSet.forEach((l) => todo.add(l));

        while (todo.size > 0) {
            const l: LocationId = todo.values().next().value;
            todo.delete(l);

            const closure: Set<LocationId> = TransitionRelations.getBiDirClosure(tr, l);
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

    private static getDirClosure(l: LocationId,
                                 nextOp: (l) => Array<TransitionTo>): Set<LocationId> {
        const result: Set<LocationId> = new Set();

        // Forwards reachable
        const forwardsDone: Set<LocationId> = new Set<LocationId>();
        const worklist: LocationId[] = [l];

        while (worklist.length > 0) {
            const work: LocationId = worklist.pop();
            result.add(work);
            forwardsDone.add(work);
            nextOp(work).forEach((t) => {
                if (ProgramOperations.epsilon().ident == t.opId) {
                    if (!forwardsDone.has(t.target)) {
                        worklist.push(t.target);
                    }
                }
            });
        }

        return result;
    }

    private static getBiDirClosure(tr: TransitionRelation, l: LocationId): Set<LocationId> {
        const result: Set<LocationId> = new Set();

        // Forwards reachable
        const forwardsClosure: Set<LocationId> = this.getDirClosure(l, (l) => tr.transitionsFrom(l));
        Preconditions.checkState(forwardsClosure.size > 0);

        // Backwards reachable
        const backwardsClosure: Set<LocationId> = this.getDirClosure(l, (l) => tr.transitionsTo(l));
        Preconditions.checkState(backwardsClosure.size > 0);

        return new Set([...forwardsClosure, ...backwardsClosure]);
    }

    static eliminateEpsilons(tr: TransitionRelation): TransitionRelation {
        // 1. Build equivalence classes
        const equivMap: Map<LocationId, LocationEquivalence> = this.buildEquivalenceClasses(tr);

        const inverseEquiv: Map<LocationId, LocationId> = new Map<LocationId, LocationId>();
        for (const key of equivMap.keys()) {
            const value: LocationEquivalence = equivMap.get(key);
            inverseEquiv.set(key, value.classid);
        }

        Preconditions.checkState(inverseEquiv.size == tr.locationSet.size);

        // 3. Rebuild the transition relation
        const builder = TransitionRelation.builder();
        // - Transitions
        tr.transitionTable.forEach((targets: ImmMap<LocationId, ImmSet<OperationId>>, from: LocationId) => {
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
        tr.entryLocationSet.forEach((l: LocationId) => {
            builder.addEntryLocationWithID(inverseEquiv.get(l));
        });
        // - Exit locations
        tr.exitLocationSet.forEach((l: LocationId) => {
            builder.addExitLocationWithID(inverseEquiv.get(l));
        });

        return builder.build();
    }

}
