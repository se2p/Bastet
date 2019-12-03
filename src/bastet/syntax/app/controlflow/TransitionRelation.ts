import {ProgramOperation} from "./ops/ProgramOperation";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ControlLocation} from "./ControlLocation";

export class TransitionRelationBuilder {

}

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

    static branching(thenCaseGuarded: TransitionRelation, elseCaseGuarded: TransitionRelation, exitLocation: ControlLocation): TransitionRelation {
        throw new ImplementMeException();
    }

    static concatAndGoto(headRelation: any, loopBody: TransitionRelation, loopHead: ControlLocation): TransitionRelation {
        throw new ImplementMeException();
    }

    static singleton(loopHead: ControlLocation): TransitionRelation {
        throw new ImplementMeException();
    }

    static builder(): TransitionRelationBuilder {
        throw new ImplementMeException();
    }

    static continueFrom(loopHead: ControlLocation, transitionRelation: TransitionRelation) {

    }
}
