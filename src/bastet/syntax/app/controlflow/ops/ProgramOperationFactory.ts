/*
 *   BASTET Program Analysis Framework
 *
 *   Copyright 2019 by University of Passau
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

import {RuleNode} from "antlr4ts/tree";
import {RawOperation} from "./RawOperation";
import {NoopProgramOperation, ProgramOperation, ProgramOperations} from "./ProgramOperation";
import {BoolExprContext, NegatedBoolExpressionContext} from "../../../parser/grammar/ScratchParser";
import {ImplementMeException} from "../../../../core/exceptions/ImplementMeException";
import {AssumeOperation} from "./AssumeOperation";

export class ProgramOperationFactory {

    public static createFor(ast: RuleNode): ProgramOperation {
        return new RawOperation(ast);
    }

    static assumeOpFrom(boolExprContext: BoolExprContext): AssumeOperation {
        return new AssumeOperation(boolExprContext);
    }

    static negatedAssumeOpFrom(boolExprContext: BoolExprContext): AssumeOperation {
        const negation = new NegatedBoolExpressionContext(boolExprContext.coreBoolExpr());
        return new AssumeOperation(negation);
    }

    static epsilon(): NoopProgramOperation {
        return ProgramOperations.epsilon();
    }

}
