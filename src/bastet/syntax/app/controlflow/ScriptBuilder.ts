import AppEvent from "../AppEvent";
import {ControlLocation, LocationID} from "./ControlLocation";
import {ProgramOperation} from "./ops/ProgramOperation";
import {Script} from "./Script";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export class ScriptBuilder {

    private _event: AppEvent|null;

    private readonly _transitions: Map<LocationID, Map<LocationID, Set<ProgramOperation>>>;

    private readonly _locations: Map<LocationID, ControlLocation>;

    private _initialLocation: ControlLocation|null;

    private constructor() {
        this._event = null;
        this._initialLocation = null;
        this._transitions = new Map();
        this._locations = new Map();
    }

    public setInitialLocation(loc: ControlLocation): ScriptBuilder {
        this._initialLocation = loc;
        return this;
    }

    private addLocation(loc: ControlLocation) {
        this._locations.set(loc.ident, loc);
    }

    public addTransition(from: ControlLocation, to: ControlLocation, op: ProgramOperation): ScriptBuilder {
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

    public setEvent(event: AppEvent): ScriptBuilder {
        this._event = event;
        return this;
    }

    public build(): Script {
        throw new ImplementMeException();
        // return new Script(this._initialLocation, transitions, locations);
    }

}
