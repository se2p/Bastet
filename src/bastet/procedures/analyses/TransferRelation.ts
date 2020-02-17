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

import {AbstractElement} from "../../lattices/Lattice";
import {ProgramOperation} from "../../syntax/app/controlflow/ops/ProgramOperation";

export interface TransferRelation<E extends AbstractElement> {

    abstractSucc(fromState: E): Iterable<E>;

}

export interface LabeledTransferRelation<E extends AbstractElement> extends TransferRelation<E>{

    abstractSuccFor(fromState: E, op: ProgramOperation): Iterable<E>;

}

export class LabeledTransferRelationImpl<E extends AbstractElement> implements LabeledTransferRelation<any> {

    private readonly _abstractSucc: (fromState: E) => Iterable<E>;

    private readonly _abstractSuccFor: (fromState: E, op: ProgramOperation) => Iterable<E>;

    constructor(abstractSucc: (fromState: E) => Iterable<E>, abstractSuccFor: (fromState: E, op: ProgramOperation) => Iterable<E>) {
        this._abstractSucc = abstractSucc;
        this._abstractSuccFor = abstractSuccFor;
    }

    abstractSucc(fromState: E): Iterable<E> {
        return this._abstractSucc(fromState);
    }

    abstractSuccFor(fromState: E, op: ProgramOperation): Iterable<E> {
        return this._abstractSuccFor(fromState, op);
    }

    public static from<E extends AbstractElement>(tr: LabeledTransferRelation<E>) {
        return new LabeledTransferRelationImpl<E>((e) => tr.abstractSucc(e),
            (e, op) => tr.abstractSuccFor(e, op));

    }

}
