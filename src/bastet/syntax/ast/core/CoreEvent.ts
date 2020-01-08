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

import {AbstractNode} from "../AstNode";
import {StringExpression} from "./expressions/StringExpression";
import {BooleanExpression} from "./expressions/BooleanExpression";
import {StatementList, StatementLists} from "./statements/Statement";

export abstract class CoreEvent extends AbstractNode {

}

export class NeverEvent extends CoreEvent {

    constructor() {
        super([]);
    }

    private static INSTANCE: NeverEvent;

    public static instance(): NeverEvent {
        if (!this.INSTANCE) {
            this.INSTANCE = new NeverEvent();
        }
        return this.INSTANCE;
    }

}

export class StartupEvent extends CoreEvent {

    constructor() {
        super([]);
    }

    private static INSTANCE: StartupEvent;

    public static instance(): StartupEvent {
        if (!this.INSTANCE) {
            this.INSTANCE = new StartupEvent();
        }
        return this.INSTANCE;
    }

}

export class CloneStartEvent extends CoreEvent {

    constructor() {
        super([]);
    }

    private static INSTANCE: CloneStartEvent;

    public static instance(): CloneStartEvent {
        if (!this.INSTANCE) {
            this.INSTANCE = new CloneStartEvent();
        }
        return this.INSTANCE;
    }

}

export class MessageReceivedEvent extends CoreEvent {

    private readonly _namespace: StringExpression;
    private readonly _message: StringExpression;

    constructor(namespace: StringExpression, message: StringExpression) {
        super([namespace, message]);
        this._namespace = namespace;
        this._message = message;
    }

}

export class ConditionReachedEvent extends CoreEvent {

    /**
     * A sequence of statements that are used to compute
     * the boolean expression.
     *
     * Background: The translation of a complex boolean expression
     *  into the intermediate language might break down a given
     *  expression into several statements, which might, for example,
     *  reflect the evaluation order of the different operands.
     */
    private readonly _condCalculations: StatementList;

    /**
     * The actual boolean expression. Please note that `_condCalculations`
     * mist be conducted before this expression can be evaluated!
     */
    private readonly _cond: BooleanExpression;

    constructor(condCalcs: StatementList, cond: BooleanExpression) {
        super([condCalcs, cond]);
        this._condCalculations = condCalcs;
        this._cond = cond;
    }

    get condCalculations(): StatementList {
        return this._condCalculations;
    }

    get cond(): BooleanExpression {
        return this._cond;
    }
}



