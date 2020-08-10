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

import {OperationId, ProgramOperation, ProgramOperations} from "./ops/ProgramOperation";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ControlLocation, LocationId} from "./ControlLocation";
import {List as ImmList, Map as ImmMap, Set as ImmSet} from "immutable"
import {Preconditions} from "../../../utils/Preconditions";
import {ControlDominance, DominanceMode} from "./Dominators";
import {CorePrintVisitor} from "../../ast/CorePrintVisitor";
import {ReturnStatement} from "../../ast/core/statements/ControlStatement";
import {EpsilonStatement} from "../../ast/core/statements/EpsilonStatement";

const toposort = require('toposort');

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

    private readonly _loopHeads: Set<LocationId>;

    private _hasNoLoop: boolean;

    private _name : string;

    public constructor() {
        this._entryLocations = new Set();
        this._exitLocations = new Set();
        this._loopHeads = new Set();
        this._transitions = new Map();
        this._locations = new Map();
        this._hasNoLoop = false;
        this._name = null;
    }

    public setName(name: string): this {
        this._name = name;
        return this;
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

    public removeEntryLocation(loc: ControlLocation): this {
        this._entryLocations.delete(loc.ident);
        return this;
    }

    public removeExitLocation(loc: ControlLocation): this {
        this._exitLocations.delete(loc.ident);
        return this;
    }

    public addExitLocation(loc: ControlLocation): this {
        this._exitLocations.add(loc.ident);
        this.addLocation(loc);
        return this;
    }

    public signalHasNoLoop(): this {
        this._hasNoLoop = true;
        return this;
    }

    public addLoopHead(loc: ControlLocation): this {
        this._loopHeads.add(loc.ident);
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

    public removeTransition(from: LocationId, to: LocationId, op: OperationId): this {
        const transitionsFrom = new Map(this._transitions.get(from));
        const transitionOps = new Set(transitionsFrom.get(to));
        transitionOps.delete(op);
        if (transitionOps.size > 0) {
            transitionsFrom.set(to, transitionOps);
        } else {
            transitionsFrom.delete(to);
        }
        this._transitions.set(from, transitionsFrom);
        return this;
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
        Preconditions.checkNotUndefined(input);

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

        let loopHeads: ImmSet<LocationId> = null;
        if (this._hasNoLoop) {
            Preconditions.checkState(this._loopHeads.size == 0);
            loopHeads = ImmSet();
        } else {
            if (this._loopHeads.size > 0) {
                loopHeads = ImmSet(this._loopHeads);
            } else {
                loopHeads = null;
            }
        }

        let transitions: TransitionTable = ImmMap();
        for(let [fromID, fwdTargetMap] of this._transitions.entries()) {
            let fromMap: ImmMap<LocationId, ImmSet<OperationId>> = ImmMap();
            for (let [targetID, fwdTransOps] of fwdTargetMap.entries()) {
                const ops = ImmSet(fwdTransOps.values());
                fromMap = fromMap.set(targetID, ops);
            }
            transitions = transitions.set(fromID, fromMap);
        }

        return new TransitionRelation(transitions, locations, entryLocs, exitLocs, loopHeads, this._name);
    }

    connectLocations(fromLocations: Iterable<LocationId>, toLocations: Iterable<LocationId>): this {
        for (const fromLoc of fromLocations) {
            for (const toLoc of toLocations) {
                this.addTransitionByIDs(fromLoc, toLoc, ProgramOperations.epsilon());
            }
        }
        return this;
    }

    addRelation(tr: TransitionRelation): this {
        this.addAllTransitionsOf(tr);
        for (const l of tr.entryLocations) {
            this.addEntryLocation(l);
        }
        for (const l of tr.exitLocations) {
            this.addExitLocation(l);
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

export class Transition extends TransitionTo {

    private readonly _source: LocationId;

    constructor(from: LocationId, op: OperationId, to: LocationId) {
        super(op, to);
        this._source = from;
    }

    get source(): number {
        return this._source;
    }
}

export type TransRelId = number;

export class TransitionLoop {

    private readonly _loopHead: LocationId;

    private readonly _bodyNodes: ImmSet<LocationId>;

    private readonly _nestedLoops: ImmList<TransitionLoop>;

    constructor(loopHead: LocationId, loopNodes: Iterable<LocationId>, nestedLoops: Iterable<TransitionLoop>) {
        this._loopHead = loopHead;
        this._bodyNodes = ImmSet(loopNodes);
        this._nestedLoops = ImmList(nestedLoops);
        // ATTENTION: The loop head must NOT be element of `loopNodes`!
        Preconditions.checkArgument(!this._bodyNodes.has(loopHead));
    }

    get loopHead(): number {
        return this._loopHead;
    }

    get bodyNodes(): ImmSet<LocationId> {
        return this._bodyNodes;
    }

    get nestedLoops(): Iterable<TransitionLoop> {
        return this._nestedLoops;
    }

    public toString(): string {
        return `${this.loopHead} ${this.bodyNodes}, ${this.nestedLoops}`;
    }
}

export class TransitionRelation {

    private readonly _ident: TransRelId;

    private readonly _name: string;

    private readonly _transitions: TransitionTable;

    private readonly _locations: ImmSet<LocationId>;

    private readonly _entryLocations: ImmSet<LocationId>;

    private readonly _exitLocations: ImmSet<LocationId>;

    private _loopHeads: ImmSet<LocationId>;

    private _loops: ImmList<TransitionLoop>;

    private _inBodyOfLoop: ImmMap<LocationId, TransitionLoop>;

    private _dom: ControlDominance;

    private _backwards: TransitionRelation = null;

    private _backEdges: ImmList<Transition>;

    private _flatTransitions: ImmList<[LocationId, OperationId, LocationId]>;

    private readonly _closureTerminators: Map<LocationId, ImmSet<LocationId>>;

    private _dfsNums: Map<LocationId, number>;

    private _wamNums: Map<LocationId, number>;

    private _transFromCache: Map<LocationId, Array<TransitionTo>>;

    constructor(transitions: TransitionTable, locations: ImmSet<LocationId>,
                entryLocs: ImmSet<LocationId>, exitLocs: ImmSet<LocationId>,
                loopHeads?: ImmSet<LocationId>, name?: string) {
        TransitionRelation.TRANS_REL_ID_SEQ = (TransitionRelation.TRANS_REL_ID_SEQ || 0) + 1;
        this._ident = TransitionRelation.TRANS_REL_ID_SEQ;

        if (name) {
            this._name = name;
        } else {
            this._name = this._ident.toString();
        }

        this._transitions = Preconditions.checkNotUndefined(transitions);
        this._locations = Preconditions.checkNotUndefined(locations);
        this._entryLocations = Preconditions.checkNotUndefined(entryLocs);
        this._exitLocations = Preconditions.checkNotUndefined(exitLocs);

        this._transFromCache = new Map();

        this._loopHeads = loopHeads;

        entryLocs.forEach((l) => Preconditions.checkArgument(this._locations.contains(l)));
        this._closureTerminators = new Map();
    }

    private static TRANS_REL_ID_SEQ: TransRelId;

    public toString() {
        let lines: string[] = [];
        for (let fromId of this._locations) {
            for (let t of this.transitionsFrom(fromId)) {
                lines.push(`(${fromId}) ${ProgramOperations.withID(t.opId).ast.accept(new CorePrintVisitor())} (${t.target})`);
            }
        }
        return lines.join("\n");
    }

    get name(): string {
        return this._name;
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

    get transitions(): ImmList<[LocationId, OperationId, LocationId]> {
        if (!this._flatTransitions) {
            const flatTransitions = [];
            for (const from of this._transitions.keys()) {
                for (const tr of this.transitionsFrom(from)) {
                    flatTransitions.push([from, tr.opId, tr.target]);
                }
            }
            this._flatTransitions = ImmList(flatTransitions);
        }
        return this._flatTransitions;
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

    get dominance(): ControlDominance {
        if (!this._dom) {
            this._dom = new ControlDominance(this, DominanceMode.FORWARDS);
            this._dom.computeDominators();
        }

        return this._dom;
    }

    public getIsLoopHeadOf(loc: LocationId): TransitionLoop {
        if (this.isLoopHead(loc)) {
            for (const l of this.getLoops()) {
                if (l.loopHead == loc) {
                    return l;
                }
            }
        }
        return null;
    }

    public getIsInLoopBodyOf(loc: LocationId): TransitionLoop {
        Preconditions.checkNotUndefined(this.getLoops());
        Preconditions.checkNotUndefined(this._inBodyOfLoop);
        return this._inBodyOfLoop.get(loc);
    }

    public getLoops(): ImmList<TransitionLoop> {
        if (!this._loops) {
            const result: TransitionLoop[] = [];
            const inLoopBodyOf: Map<LocationId, TransitionLoop> = new Map();
            const loopDominates: [LocationId, LocationId][] = [];
            for (const l of this.loopHeads) {
                loopDominates.push([l, null]);
                for (const m of this.loopHeads) {
                    if (this.dominance.isDominatedBy(l, m)) {
                        if (l != m) {
                            loopDominates.push([m, l]);
                        }
                    }
                }
            }

            // Inner loops first
            const sorted = toposort(loopDominates).reverse().filter(l => {return l != null} );
            for (const loopHead of sorted) {
                const bodyNodes: Set<LocationId> = new Set();
                const nestedIn: Set<TransitionLoop> = new Set();
                for (const t of this.getBackEdges()) {
                    if (t.target == loopHead) {
                        const toAdd = this.collectNodesBackwardsFromReaching(t.source, t.target);
                        toAdd.forEach((l) => bodyNodes.add(l));
                        for (const l of toAdd) {
                            const nestedBody = inLoopBodyOf.get(l);
                            if (nestedBody) {
                                nestedIn.add(nestedBody);
                            }
                        }
                    }
                }

                const loop = new TransitionLoop(loopHead, bodyNodes, nestedIn);
                result.push(loop);

                for (const l of loop.bodyNodes) {
                    // Map the location to the inner loop it belongs to
                    if (!inLoopBodyOf.get(l)) {
                        inLoopBodyOf.set(l, loop);
                    }
                }
            }

            this._loops = ImmList(result);
            this._inBodyOfLoop = ImmMap(inLoopBodyOf);
        }

        return this._loops;
    }

    private collectNodesBackwardsFromReaching(source: LocationId, target: LocationId): Set<LocationId> {
        const result: Set<LocationId> = new Set();

        const worklist: Array<LocationId> = new Array<LocationId>();
        worklist.push(source);

        while (worklist.length > 0) {
            const work = worklist.pop();
            if (!result.has(work)) {
                if (target != work) {
                    result.add(work);
                    const tset = this.transitionsTo(work);
                    for (const t of tset) {
                        worklist.push(t.target);
                    }
                }
            }
        }

        return result;
    }

    get loopHeads(): ImmSet<LocationId> {
        if (!this._loopHeads) {
            this._loopHeads = this.computeNaturalLoopHeads();
        }
        return this._loopHeads;
    }

    public isLoopHead(loc: LocationId): boolean {
        return this.loopHeads.contains(loc);
    }

    get locationSet(): ImmSet<LocationId> {
        return this._locations;
    }

    get entryLocations(): Iterable<ControlLocation> {
        return this._entryLocations.map((lid) => ControlLocation.for(lid));
    }

    get entryLocationSet(): ImmSet<LocationId> {
        return this._entryLocations;
    }

    get exitLocations(): Iterable<ControlLocation> {
        return this._exitLocations.map((lid) => ControlLocation.for(lid));
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
        let result: Array<TransitionTo> = this._transFromCache.get(from);
        if (result) {
            return result;
        } else {
            let transitionsTo: ImmMap<LocationId, ImmSet<OperationId>> = this.transitionTable.get(from) || ImmMap();
            result = new Array<TransitionTo>();
            for (let [to, ops] of transitionsTo.entries()) {
                for (let o of ops) {
                    result.push(new TransitionTo(o, to));
                }
            }
            this._transFromCache.set(from, result);
            return result;
        }
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

    private getBackEdges(): ImmList<Transition> {
        if (!this._backEdges) {
            const result: Transition[] = [];

            for (const [from, op, to] of this.transitions) {
                const isBackEdge = this.dominance.getDfsNumber(from) >= this.dominance.getDfsNumber(to);
                if (isBackEdge) {
                    result.push(new Transition(from, op, to));
                }
            }

            this._backEdges = ImmList(result);
        }

        return this._backEdges;
    }

    /**
     * A loop head is the successor node v of a back-edge (u->v)
     * and dominates the predecessor node (u).
     */
    private computeNaturalLoopHeads(): ImmSet<LocationId> {
        const result = new Set<LocationId>();

        this.getBackEdges().forEach(t => {
            if (this.dominance.isDominatedBy(t.source, t.target)) {
                result.add(t.target);
            }
        });

        return ImmSet<LocationId>(result);
    }

    private maxAssignedDfsNum: number;

    private computeDfsNumbering() {
        this._dfsNums = new Map();

        let time = 0;
        const colors: Map<LocationId, number> = new Map();
        const WHITE: number = 0;
        const BLACK: number = 1;
        const GRAY: number = 2;

        const dfsVisit = (u: LocationId) => {
            time = time + 1;
            colors.set(u, GRAY);
            for (const trans of this.transitionsFrom(u)) {
                if ((colors.get(trans.target) || WHITE) == WHITE) {
                    dfsVisit(trans.target);
                }
            }
            colors.set(u, BLACK);
            time = time + 1;
            this._dfsNums.set(u, time);
        };

        for (const u of this.locationSet) {
            if ((colors.get(u) || WHITE) == WHITE) {
                dfsVisit(u);
            }
        }

        // Needed to assign other, non-conflicting numberings
        this.maxAssignedDfsNum = time;
    }

    getDfsNumberOf(loc: LocationId) {
        if (!this._dfsNums) {
            this.computeDfsNumbering();
        }

        return this._dfsNums.get(loc);
    }

    getPostOrderOf(loc: LocationId) {
        return this.getDfsNumberOf(loc);
    }

    getReversePostOrderOf(loc: LocationId) {
        return this.backwards.getPostOrderOf(loc);
    }

    getWaitAtMeetOrderOf(loc: LocationId) {
        if (!this._wamNums) {
            this.computeWaitAtMeetNumbering();
        }

        return this._wamNums.get(loc);
    }

    private computeWaitAtMeetNumbering() {
        // The reverse post ordering is the foundation
        // for this wait-at-meet ordering.
        if (!this.backwards._dfsNums) {
            this.backwards.computeDfsNumbering();
        }
        this._wamNums = new Map<LocationId, number>(this.backwards._dfsNums);

        // Order all loop heads by the max. reverse-post order
        // from that they are entered.
        const sortedHeads = this.loopHeads.sort((headA, headB) => {
            const enteringAmax = this.transitionsTo(headA)
                .map((v) => this.getReversePostOrderOf(v.target))
                .reduce((prev, curr) => {return Math.max(prev, curr)}, 0);
            const enteringBmax = this.transitionsTo(headB)
                .map((v) => this.getReversePostOrderOf(v.target))
                .reduce((prev, curr) => {return Math.max(prev, curr)}, 0);

            if (enteringAmax > enteringBmax) {
                return +1;
            } else if (enteringBmax > enteringAmax) {
                return -1;
            } else {
                return 0;
            }
        });

        let maxWamNumber = this.backwards.maxAssignedDfsNum;
        for (const l of sortedHeads) {
            maxWamNumber = maxWamNumber + 1;
            this._wamNums.set(l, maxWamNumber);
        }
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

    static named(tr: TransitionRelation, name: string): TransitionRelation {
        Preconditions.checkNotUndefined(tr);
        Preconditions.checkNotEmpty(name);
        return new TransitionRelation(tr.transitionTable, tr.locationSet, tr.entryLocationSet, tr.exitLocationSet, tr.loopHeads, name);
    }

    /**
     * ATTENTION: The transition relation `tr2` is not re-labeled by this method.
     *
     * @param tr1
     * @param tr2
     */
    static concat(tr1: TransitionRelation, tr2: TransitionRelation): TransitionRelation {
        // Exit locations of TR1 with the entry locations of TR2

        if (tr1.exitLocationSet.isEmpty()) {
            return tr1;
        }

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

        if (tr.exitLocationSet.isEmpty()) {
            return tr;
        }

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

    /**
     * Add dummy transitions to nodes on that the control flow merges
     * if a branch consists of one transition only. This step establishes an important
     * invariant on that other analyses, for example, the graph analysis, rely on.
     *
     * @param tr
     */
    public static introduceEpsilonToMergeTransitions(tr: TransitionRelation): TransitionRelation {
        const builder = TransitionRelation.builder();
        builder.addRelation(tr);

        // For all nodes that are entered by more than one transition
        for (const loc of tr.locationSet) {
            // If `loc` is a merge location
            const transTo = tr.transitionsTo(loc);
            if (transTo.length > 1) {
                for (const trans of transTo) {
                    // If the predecessor is a fork
                    const predLoc: LocationId = trans.target;
                    if (tr.transitionsFrom(predLoc).length > 1 || tr.transitionsTo(predLoc).length > 1) {
                        // Add a dummy transition between `predLoc` and `loc`
                        // - Introduce an intermediate location and add a corresponding transition
                        const intermediateLoc = ControlLocation.fresh();
                        builder.addTransitionByIDs(intermediateLoc.ident, loc, ProgramOperations.irreducibleEpsilon());
                        // - Remove the original transition
                        builder.removeTransition(predLoc, loc, trans.opId);
                        // - Re-add a transition with the originals operation (semantics)
                        builder.addTransitionByIDs(predLoc, intermediateLoc.ident, ProgramOperation.for(trans.opId));
                    }
                }
            }
        }

        return builder.build();
    }

    /**
     * Add an initial epsilon transition.
     *
     * Helps, for example, in cases where the initial location could also have been a loop head (a control
     * location thus takes fewer roles and algorithms might not fail for this case).
     *
     * @param tr
     */
    public static introduceEntryExitEpsilonTransition(tr: TransitionRelation): TransitionRelation {
        const builder = TransitionRelation.builder();
        builder.addRelation(tr);

        // Entry location
        for (const loc of tr.entryLocations) {
            builder.removeEntryLocation(loc);
        }

        const newEntry = ControlLocation.fresh();
        builder.addEntryLocation(newEntry);
        for (const loc of tr.entryLocations) {
            builder.addTransitionByIDs(newEntry.ident, loc.ident, ProgramOperations.irreducibleEpsilon());
        }

        // Exit location
        for (const loc of tr.exitLocations) {
            const entering = tr.transitionsTo(loc.ident).filter((t) =>
                (!(ProgramOperation.for(t.opId).ast instanceof EpsilonStatement)
                && !(ProgramOperation.for(t.opId).ast instanceof ReturnStatement)));
            if (entering.length > 0) {
                builder.removeExitLocation(loc);
                const newExit = ControlLocation.fresh();
                builder.addExitLocation(newExit);
                builder.addTransitionByIDs(loc.ident, newExit.ident, ProgramOperations.irreducibleEpsilon());
            }
        }

        return builder.build();
    }

    /**
     * Ensure that a control location is either a merge location or
     * a branching location but not both. Add an epsilon transition to fix such scenarios.
     *
     * @param tr
     */
    public static introduceEpsilonBetweenMergeAndBranchLocs(tr: TransitionRelation): TransitionRelation {
        const builder = TransitionRelation.builder();
        builder.addRelation(tr);

        for (const loc of tr.locationSet) {
            const transTo = tr.transitionsTo(loc);
            const transFrom = tr.transitionsFrom(loc);
            if (transTo.length > 1 && transFrom.length > 1) {
                const intermediateLoc = ControlLocation.fresh();
                for (const trans of transFrom) {
                    builder.removeTransition(loc, trans.target, trans.opId);
                    builder.addTransitionByIDs(loc, intermediateLoc.ident, ProgramOperations.irreducibleEpsilon());
                    builder.addTransitionByIDs(intermediateLoc.ident, trans.target, ProgramOperation.for(trans.opId));
                }
            }
        }

        return builder.build();
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

    static establishAnalysisInvariants(tr: TransitionRelation): TransitionRelation {
        return TransitionRelations.introduceEpsilonBetweenMergeAndBranchLocs(
                TransitionRelations.introduceEpsilonToMergeTransitions(
                    TransitionRelations.introduceEntryExitEpsilonTransition(
                      TransitionRelations.eliminateEpsilons(tr))));
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
