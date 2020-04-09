/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net),
 *   see the file CONTRIBUTORS.md for the list of contributors.
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

import {Expression} from "./Expression";
import {VariableWithDataLocation} from "../Variable";
import {AbstractExpression} from "./AbstractExpression";
import {AstNode} from "../../AstNode";
import {ActorType} from "../ScratchType";
import {Preconditions} from "../../../../utils/Preconditions";
import {StringExpression} from "./StringExpression";
import {Identifier} from "../Identifier";

export interface ActorExpression extends Expression {

}

export class AbstractActorExpression extends AbstractExpression {

    constructor(childs: AstNode[]) {
        super(ActorType.instance(), childs);
    }

}

export class ActorVariableExpression extends AbstractActorExpression implements ActorExpression {

    private readonly _variable: VariableWithDataLocation;

    constructor(variable: VariableWithDataLocation) {
        super([variable]);
        this._variable = Preconditions.checkNotUndefined(variable);
    }

    get variable(): VariableWithDataLocation {
        return this._variable;
    }

}

export class LocateActorExpression extends AbstractActorExpression {

    private readonly _actorName: StringExpression;

    constructor(name: StringExpression) {
        super([Preconditions.checkNotUndefined(name)]);
        this._actorName = name;
    }

    get actorName(): StringExpression {
        return this._actorName;
    }
}

export class StartCloneActorExpression extends AbstractActorExpression {

    private readonly _ofActor: ActorExpression;

    constructor(ofActor: ActorExpression) {
        super([Preconditions.checkNotUndefined(ofActor)]);
        this._ofActor = Preconditions.checkNotUndefined(ofActor);
    }

    get ofActor(): ActorExpression {
        return this._ofActor;
    }
}

export class UsherActorExpression extends AbstractActorExpression {

    private readonly _actorName : StringExpression;

    private readonly _role: Identifier;

    constructor(actorName: StringExpression, role: Identifier) {
        super([actorName, role]);
        this._actorName = Preconditions.checkNotUndefined(actorName);
        this._role = Preconditions.checkNotUndefined(role);
    }

    get actorName(): StringExpression {
        return this._actorName;
    }

    get role(): Identifier {
        return this._role;
    }
}
