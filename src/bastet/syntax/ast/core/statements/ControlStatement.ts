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

import {AbstractNode, OptionalAstNode} from "../../AstNode";
import {Statement, StatementList} from "./Statement";
import {BooleanExpression} from "../expressions/BooleanExpression";
import {NumberExpression} from "../expressions/NumberExpression";
import {VariableWithDataLocation} from "../Variable";
import {Preconditions} from "../../../../utils/Preconditions";

export interface ControlStatement extends AbstractNode {

}

export class IfStatement extends Statement implements ControlStatement {

    private readonly _cond: BooleanExpression;
    private readonly _thenStmts: StatementList;
    private readonly _elseStmts: StatementList;

    constructor(cond: BooleanExpression, thenStmts: StatementList, elseStmts: StatementList) {
        super([cond, thenStmts, elseStmts]);
        this._cond = cond;
        this._thenStmts = thenStmts;
        this._elseStmts = elseStmts;
    }

    get cond(): BooleanExpression {
        return this._cond;
    }

    get thenStmts(): StatementList {
        return this._thenStmts;
    }

    get elseStmts(): StatementList {
        return this._elseStmts;
    }
}

export class UntilStatement extends Statement implements ControlStatement {

    private readonly _cond: BooleanExpression;
    private readonly _body: StatementList;


    constructor(cond: BooleanExpression, body: StatementList) {
        super([cond, body]);
        this._cond = cond;
        this._body = body;
    }

    get cond(): BooleanExpression {
        return this._cond;
    }

    get body(): StatementList {
        return this._body;
    }
}

export class UntilQueriedConditionStatement extends Statement implements ControlStatement {

    private readonly _untilCondition: BooleanExpression;
    private readonly _conditionQueryStatements: StatementList;
    private readonly _body: StatementList;

    constructor(condition: BooleanExpression, conditionQueryStatements: StatementList, body: StatementList) {
        super([conditionQueryStatements, condition, body]);
        this._untilCondition = condition;
        this._conditionQueryStatements = conditionQueryStatements;
        this._body = body;
    }

    get untilCondition(): BooleanExpression {
        return this._untilCondition;
    }

    get conditionQueryStatements(): StatementList {
        return this._conditionQueryStatements;
    }

    get body(): StatementList {
        return this._body;
    }
}


export class RepeatTimesStatement extends Statement implements ControlStatement {

    private readonly _times: NumberExpression;
    private readonly _body: StatementList;

    constructor(times: NumberExpression, body: StatementList) {
        super([times, body]);
        this._times = times;
        this._body = body;
    }

    get times(): NumberExpression {
        return this._times;
    }

    get body(): StatementList {
        return this._body;
    }
}

export class RepeatForeverStatement extends Statement implements ControlStatement {

    private readonly _body: StatementList;

    constructor(body: StatementList) {
        super([body]);
        this._body = body;
    }

    get body(): StatementList {
        return this._body;
    }
}

export class ReturnStatement extends Statement implements ControlStatement {

    private readonly _resultVariable: OptionalAstNode<VariableWithDataLocation>;

    constructor(resultVariable: OptionalAstNode<VariableWithDataLocation>) {
        super([Preconditions.checkNotUndefined(resultVariable)]);
        this._resultVariable = resultVariable;
    }

    get resultVariable(): OptionalAstNode<VariableWithDataLocation> {
        return this._resultVariable;
    }

}

export class BeginAtomicStatement extends Statement {

    private readonly _atomicIncrement: number;

    constructor() {
        super([]);
        this._atomicIncrement = 1;
    }

    get atomicIncrement(): number {
        return this._atomicIncrement;
    }
}

export class EndAtomicStatement extends Statement {

    private readonly _atomicIncrement: number;

    constructor() {
        super([]);
        this._atomicIncrement = -1;
    }

    get atomicIncrement(): number {
        return this._atomicIncrement;
    }
}

