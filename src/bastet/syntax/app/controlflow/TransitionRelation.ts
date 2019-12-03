import {ProgramOperation} from "./ops/ProgramOperation";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ControlLocation, LocationID} from "./ControlLocation";
import {ImmutableMap} from "../../../utils/ImmutableMap";
import {ImmutableSet} from "../../../utils/ImmutableSet";

export class TransitionRelationBuilder {

    private readonly _transitions: Map<LocationID, Map<LocationID, Set<ProgramOperation>>>;

    private readonly _locations: Map<LocationID, ControlLocation>;

    private _initialLocation: ControlLocation|null;

    public constructor() {
        this._initialLocation = null;
        this._transitions = new Map();
        this._locations = new Map();
    }

    public setInitialLocation(loc: ControlLocation): TransitionRelationBuilder {
        this._initialLocation = loc;
        return this;
    }

    private addLocation(loc: ControlLocation) {
        this._locations.set(loc.ident, loc);
    }

    public addTransition(from: ControlLocation, to: ControlLocation, op: ProgramOperation): TransitionRelationBuilder {
        // Add the transition
        let fromMap: Map<LocationID, Set<ProgramOperation>> = this._transitions.get(from.ident);
        if (!fromMap) {
            fromMap = new Map();
            this._transitions.set(from.ident, fromMap);
        }

        let opsToLocSet: Set<ProgramOperation> = fromMap.get(to.ident);
        if (!opsToLocSet) {
            opsToLocSet = new Set();
            fromMap.set(to.ident, opsToLocSet);
        }

        opsToLocSet.add(op);

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

export class TransitionRelation {

    private readonly _transitions: ImmutableMap<LocationID, ImmutableMap<LocationID, ImmutableSet<ProgramOperation>>>;

    private readonly _locations: ImmutableMap<number, ControlLocation>;

    private readonly _entryLocations: ImmutableSet<ControlLocation>;

    private readonly _exitLocations: ImmutableSet<ControlLocation>;

    constructor(transitions: Map<LocationID, Map<LocationID, Set<ProgramOperation>>>,
                locations: Map<LocationID, ControlLocation>,
                entryLocs: Set<ControlLocation>,
                exitLocs: Set<ControlLocation>) {
        this._transitions = this.makeImmutable(transitions);
        this._locations = ImmutableMap.copyOf(locations);
        this._entryLocations = ImmutableSet.copyOf(entryLocs);
        this._exitLocations = ImmutableSet.copyOf(exitLocs);
    }

    private makeImmutable(input: Map<LocationID, Map<LocationID, Set<ProgramOperation>>>):
        ImmutableMap<LocationID, ImmutableMap<LocationID, ImmutableSet<ProgramOperation>>> {
        throw new ImplementMeException();
    }

}

export class TransitionRelations {

    static concat(result: TransitionRelation, stmtTR: TransitionRelation): TransitionRelation {
        throw new ImplementMeException();
    }

    static epsilon(): TransitionRelation {
        throw new ImplementMeException();
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

    static singleton(loopHead: ControlLocation): TransitionRelation {
        throw new ImplementMeException();
    }

    static continueFrom(loopHead: ControlLocation, transitionRelation: TransitionRelation) {
        throw new ImplementMeException();
    }

}
