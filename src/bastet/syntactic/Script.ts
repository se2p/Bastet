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

    constructor (pInitialLocation: ControlLocation, pTransitions: ControlTransition[], pLocations?: ControlLocation[]) { 
        this._initialLocation = pInitialLocation;
        this._transitions = pTransitions;
        if (pLocations) {
            this._locations = pLocations;
        } else {
            this._locations = this.extractLocations(pTransitions);
        }
    }    

    private extractLocations(pTransitions: ControlTransition[]) {
       return []; 
    }

    get initialLocationi() {
        return this._initialLocation;
    }

    get transitions() {
        return this._transitions;
    }

    get locatios() {
        return this._locations;
    }

}