import {ProgramOperation} from "./ops/ProgramOperation";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export class TransitionRelation {

    static concat(result: TransitionRelation, stmtTR: TransitionRelation): TransitionRelation {
        throw new ImplementMeException();
    }

    static epsilon(): TransitionRelation {
        throw new ImplementMeException();
    }

    static forOpSeq(op: ProgramOperation): TransitionRelation {
        throw new ImplementMeException();
    }
}
