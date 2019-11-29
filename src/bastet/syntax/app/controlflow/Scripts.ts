import {Script} from "./Script";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export class Scripts {

    /**
     * Sequential composition of the control flows that are
     * described by the two given scripts.
     *
     * @param script1
     * @param script2
     */
    public static concat(script1: Script, script2: Script) : Script {
        throw new ImplementMeException();
    }

}
