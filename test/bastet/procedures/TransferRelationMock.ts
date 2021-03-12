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

import {Map as ImmMap, Record as ImmRec} from "immutable"
import {LabeledTransferRelation} from "../../../src/bastet/procedures/analyses/TransferRelation";
import {AbstractElement} from "../../../src/bastet/lattices/Lattice";
import {
    ProgramOperation,
    ProgramOperationInContext
} from "../../../src/bastet/syntax/app/controlflow/ops/ProgramOperation";
import {Concern} from "../../../src/bastet/syntax/Concern";
import {Preconditions} from "../../../src/bastet/utils/Preconditions";

export interface AbstractMockElementAttributes {

    stateId: number;

    predecessorId: number;

}

const AbstractMockElementRecord = ImmRec({

    stateId: -1,

    predecessorId: -1

});

let STATE_ID_SEQ: number = 0;

export class AbstractMockElement extends AbstractMockElementRecord implements AbstractMockElementAttributes, AbstractElement {

    constructor(predecessorId: number) {
        super({stateId: STATE_ID_SEQ++, predecessorId: predecessorId});
    }

}

export class TransferRelationMock implements LabeledTransferRelation<AbstractMockElement> {

    private readonly _abstractSuccForCalls: Array<[AbstractMockElement, ProgramOperation, Concern]>;

    constructor() {
        this._abstractSuccForCalls = new Array<[AbstractMockElement, ProgramOperation, Concern]>();
    }

    abstractSucc(fromState: AbstractMockElement): Iterable<AbstractMockElement> {
        return [new AbstractMockElement(fromState.stateId)];
    }

    abstractSuccFor(fromState: AbstractMockElement, op: ProgramOperationInContext, co: Concern): Iterable<AbstractMockElement> {
        this._abstractSuccForCalls.push([fromState, op.op, co]);
        return [new AbstractMockElement(fromState.stateId)];
    }

    get abstractSuccForCalls(): Array<[AbstractMockElement, ProgramOperation, Concern]> {
        return this._abstractSuccForCalls;
    }

    public getOneExpectedCall(): [AbstractMockElement, ProgramOperation, Concern] {
        Preconditions.checkState(this._abstractSuccForCalls.length == 1);
        return this._abstractSuccForCalls[0];
    }
}
