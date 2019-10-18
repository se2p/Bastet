import ControlLocation from "./ControlLocation";
import ControlTransition  from "./ControlTransition";

/**
 * A single script, which represents the control flow 
 * of a program or a fraction of a program.
 */
export default class Script {

    private readonly _transitions: ControlTransition[];

    private readonly _locations: ControlLocation[];

    private readonly _initialLocation: ControlLocation;

    constructor (initialLocation: ControlLocation, transitions: ControlTransition[], locations?: ControlLocation[]) { 
        this._initialLocation = initialLocation;
        this._transitions = transitions;
        if (locations) {
            this._locations = locations;
        } else {
            this._locations = this.extractLocations(transitions);
        }
    }    

    private extractLocations(pTransitions: ControlTransition[]) {
       return [];
    }

    public getTransitionsFrom(from: ControlLocation) {
        throw new Error("Implement me");
    }

    public getTransitionsTo(to: ControlLocation) {
        throw new Error("Implement me");
    }

    get initialLocation() {
        return this._initialLocation;
    }

    get transitions() {
        return this._transitions;
    }

    get locatios() {
        return this._locations;
    }

}