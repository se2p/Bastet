/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of Passau (uni-passau.de)
 *
 *   See the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Please make sure to CITE this work in your publications if you
 *   build on this work. Some of our maintainers or contributors might
 *   be interested in actively CONTRIBUTING to your research project.
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
import {StatementList} from "./statements/Statement";
import {
    BOOTSTRAP_FINISHED_MESSAGE,
    BOOTSTRAP_MESSAGE,
    GREENFLAG_MESSAGE,
    SYSTEM_NAMESPACE_NAME
} from "./Message";
import {ParameterDeclarationList} from "./ParameterDeclaration";


export abstract class CoreEvent extends AbstractNode {

}

export abstract class MessageNamespace extends AbstractNode {

}

export class QualifiedMessageNamespace extends MessageNamespace {

    private readonly _namespaceName : StringExpression;

    constructor(namespaceName: StringExpression) {
        super([namespaceName]);
        this._namespaceName = namespaceName;
    }

    get namespaceName(): StringExpression {
        return this._namespaceName;
    }
}

const SYS_NS = new QualifiedMessageNamespace(SYSTEM_NAMESPACE_NAME);

export class UnqualifiedMessageNamespace extends MessageNamespace {

    constructor() {
        super([]);
    }
}

export class MessageReceivedEvent extends CoreEvent {

    private readonly _namespace: MessageNamespace;
    private readonly _message: StringExpression;
    private readonly _acceptedPayload: ParameterDeclarationList;

    constructor(namespace: MessageNamespace, message: StringExpression, acceptedPayload: ParameterDeclarationList) {
        super([namespace, message, acceptedPayload]);
        this._namespace = namespace;
        this._message = message;
        this._acceptedPayload = acceptedPayload;
    }

    get acceptedPayload(): ParameterDeclarationList {
        return this._acceptedPayload;
    }

    get namespace(): MessageNamespace {
        return this._namespace;
    }

    get message(): StringExpression {
        return this._message;
    }
}

export class BootstrapEvent extends MessageReceivedEvent {

    private constructor() {
        super(new QualifiedMessageNamespace(SYSTEM_NAMESPACE_NAME), BOOTSTRAP_MESSAGE.messageid, ParameterDeclarationList.empty());
    }

    private static INSTANCE: BootstrapEvent;

    public static instance(): BootstrapEvent {
        if (!this.INSTANCE) {
            this.INSTANCE = new BootstrapEvent();
        }
        return this.INSTANCE;
    }

}

export class StartupEvent extends MessageReceivedEvent {

    private constructor() {
        super(SYS_NS, GREENFLAG_MESSAGE.messageid, ParameterDeclarationList.empty());
    }

    private static INSTANCE: StartupEvent;

    public static instance(): StartupEvent {
        if (!this.INSTANCE) {
            this.INSTANCE = new StartupEvent();
        }
        return this.INSTANCE;
    }

}

export class NeverEvent extends CoreEvent {

    private constructor() {
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

/**
 * The Big Bang.
 */
export class SingularityEvent extends CoreEvent {

    private constructor() {
        super([]);
    }

    private static INSTANCE: SingularityEvent;

    public static instance(): SingularityEvent {
        if (!this.INSTANCE) {
            this.INSTANCE = new SingularityEvent();
        }
        return this.INSTANCE;
    }

}

export class TerminationEvent extends CoreEvent {

    private constructor() {
        super([]);
    }

    private static INSTANCE: TerminationEvent;

    public static instance(): TerminationEvent {
        if (!this.INSTANCE) {
            this.INSTANCE = new TerminationEvent();
        }
        return this.INSTANCE;
    }

}

export class RenderedMonitoringEvent extends CoreEvent {

    private constructor() {
        super([]);
    }

    private static INSTANCE: RenderedMonitoringEvent;

    public static instance(): RenderedMonitoringEvent {
        if (!this.INSTANCE) {
            this.INSTANCE = new RenderedMonitoringEvent();
        }
        return this.INSTANCE;
    }

}

export class AfterBootstrapMonitoringEvent extends MessageReceivedEvent {

    private constructor() {
        super(SYS_NS, BOOTSTRAP_FINISHED_MESSAGE.messageid, ParameterDeclarationList.empty());
    }

    private static INSTANCE: AfterBootstrapMonitoringEvent;

    public static instance(): AfterBootstrapMonitoringEvent {
        if (!this.INSTANCE) {
            this.INSTANCE = new AfterBootstrapMonitoringEvent();
        }
        return this.INSTANCE;
    }

}

export class AfterStatementMonitoringEvent extends CoreEvent {

    private constructor() {
        super([]);
    }

    private static INSTANCE: AfterStatementMonitoringEvent;

    public static instance(): AfterStatementMonitoringEvent {
        if (!AfterStatementMonitoringEvent.INSTANCE) {
            AfterStatementMonitoringEvent.INSTANCE = new AfterStatementMonitoringEvent();
        }
        return AfterStatementMonitoringEvent.INSTANCE;
    }

}

export class UserInputDispatchEvent extends CoreEvent {

    private constructor() {
        super([]);
    }

    private static INSTANCE: UserInputDispatchEvent;

    public static instance(): UserInputDispatchEvent {
        if (!this.INSTANCE) {
            this.INSTANCE = new UserInputDispatchEvent();
        }
        return this.INSTANCE;
    }

}

export class CloneStartEvent extends CoreEvent {

    private constructor() {
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



