import {ProgramOperation} from "./ProgramOperation";
import {NumberExpression} from "../expressions/NumberExpression";
import {BooleanExpression} from "../expressions/BooleanExpression";
import {StringExpression} from "../expressions/StringExpression";
import {IdentExpression} from "../expressions/IdentExpression";
import {Expression} from "../expressions/Expression";

export class WaitForTimeOp extends ProgramOperation {

    private readonly _timeSecs: NumberExpression;

}

export class WaitUntilConditionOp extends ProgramOperation {

    private readonly _condition: BooleanExpression;

}

export class StopOtherScriptsInActorOp extends ProgramOperation {

}

export class CreateCloneOfOp extends ProgramOperation {

    private readonly _of: StringExpression;

}

export class BroadcastMessageOp extends ProgramOperation {

    private readonly _msg: StringExpression;

}

export class BroadcastMessageAndWaitOp extends ProgramOperation {

    private readonly _msg: StringExpression;

}

export class ResetTimerOp extends ProgramOperation {


}

export class ChangeVarBy extends ProgramOperation {

    private readonly _variable: IdentExpression;
    private readonly _changeBy: Expression;

}

export class ChangeAttributeBy {

    private readonly _attribute: StringExpression;
    private readonly _changeBy: Expression;

}


