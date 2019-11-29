import {IllegalArgumentException} from "../core/exceptions/IllegalArgumentException";
import {IllegalStateException} from "../core/exceptions/IllegalStateException";

export class Preconditions {

    public static checkArgument(condition: boolean, message?: string) {
        if (!condition) {
            if (message) {
                throw new IllegalArgumentException(message);
            } else {
                throw new IllegalArgumentException("Illegal argument!");
            }
        }
    }

    public static checkState(condition: boolean, message?: string) {
        if (!condition) {
            if (message) {
                throw new IllegalStateException(message);
            } else {
                throw new IllegalStateException("Illegal state!");
            }
        }
    }

    public static checkNotEmpty(text: string, message?: string) {
        if (!text || text.length == 0) {
            if (message) {
                throw new IllegalArgumentException(message);
            } else {
                throw new IllegalArgumentException("String must not be empty");
            }
        }
        return text;
    }

}
