import {Script} from "./Script";
import {TransitionRelations} from "./TransitionRelation";
import {Preconditions} from "../../../utils/Preconditions";

export class Scripts {

    /**
     * Sequential composition of the control flows that are
     * described by the two given scripts.
     *
     * @param script1
     * @param script2
     */
    public static concat(script1: Script, script2: Script) : Script {
        Preconditions.checkArgument(script1.event === script2.event);
        const newTR = TransitionRelations.concat(script1.transitions, script2.transitions);
        return new Script(script1.event, newTR);
    }

}
