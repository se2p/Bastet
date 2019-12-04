import {OperationID, ProgramOperation, ProgramOperations} from "./ops/ProgramOperation";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ControlLocation, LocationID} from "./ControlLocation";
import { Record as ImmRecord, Map as ImmMap, Set as ImmSet } from "immutable"

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

}

export class TransitionRelations {

    static concat(tr1: TransitionRelation, tr2: TransitionRelation): TransitionRelation {
        throw new ImplementMeException();
    }

    static epsilon(): TransitionRelation {
        const f = ControlLocation.fresh();
        return this.singleton(f);
    }

    static forOpSeq(op: ProgramOperation): TransitionRelation {
        throw new ImplementMeException();
    }

    static branching(thenCaseGuarded: TransitionRelation, elseCaseGuarded: TransitionRelation, exitLocation: ControlLocation): TransitionRelation {
        throw new ImplementMeException();
    }

    static concatAndGoto(headRelation: any, loopBody: TransitionRelation, loopHead: ControlLocation): TransitionRelation {
        throw new ImplementMeException();
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
