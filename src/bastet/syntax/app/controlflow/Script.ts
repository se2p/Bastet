import ControlLocation from './ControlLocation'
import ControlTransition from './ControlTransition'
import AppEvent from '../AppEvent'

/**
 * A single script, which represents the control flow
 * of a program or a fraction of a program.
 */
export class Script {

    /** This script is triggered by the following event */
    private readonly _event: AppEvent;

    /** List of control transitions of the script */
    private readonly _transitions: ControlTransition[];

    /** The list of control location  */
    private readonly _locations: ControlLocation[];

    private readonly _initialLocation: ControlLocation;

    constructor(initialLocation: ControlLocation, transitions: ControlTransition[], locations?: ControlLocation[]) {
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
        throw new Error('Implement me');
    }

    public getTransitionsTo(to: ControlLocation) {
        throw new Error('Implement me');
    }

    get initialLocation() {
        return this._initialLocation;
    }

    get transitions() {
        return this._transitions;
    }

    get locations() {
        return this._locations;
    }

}
