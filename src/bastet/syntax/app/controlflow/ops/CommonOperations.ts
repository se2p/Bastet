/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net)
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

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


