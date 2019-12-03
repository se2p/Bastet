import AppEvent from '../AppEvent'
import {TransitionRelation} from "./TransitionRelation";
import {ScriptBuilder} from "./ScriptBuilder";

/**
 * A single script, which represents the control flow
 * of a program or a fraction of a program.
 */
export class Script {

    /** This script is triggered by the following event */
    private readonly _event: AppEvent;

    /** The transition relation of the script */
    private readonly _transitions: TransitionRelation;

    constructor(event: AppEvent, transitions: TransitionRelation) {
        this._event = event;
        this._transitions = transitions;
    }

    get transitions(): TransitionRelation {
        return this._transitions;
    }

    get event(): AppEvent {
        return this._event;
    }

    public static builder(): ScriptBuilder {
        return new ScriptBuilder();
    }

}
