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

import {LabeledTransferRelation} from "../TransferRelation";
import {AbstractMemory, MemAbstractDomain, MemAbstractState, Theories} from "./MemAbstractDomain";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {AssumeOperation, ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {MemBoolExpressionVisitor, MemTransformerVisitor} from "./MemTransformerVisitor";
import {AbstractBoolean, MemoryTransformer} from "../../domains/MemoryTransformer";
import {Preconditions} from "../../../utils/Preconditions";
import {AbstMemTransformer} from "./MemTransformer";

export class MemTransferRelation implements LabeledTransferRelation<MemAbstractState> {

    private readonly _abstDomain: MemAbstractDomain;

    private readonly _theories: Theories;

    constructor(abstDomain: MemAbstractDomain, theories: Theories) {
        this._abstDomain = Preconditions.checkNotUndefined(abstDomain);
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    public abstractSucc(fromState: MemAbstractState): Iterable<MemAbstractState> {
        throw new IllegalStateException("Only the labelled transfer is supported by this transfer relation");
    }

    public abstractSuccFor(fromState: MemAbstractState, op: ProgramOperation): Iterable<MemAbstractState> {
        Preconditions.checkNotUndefined(fromState);
        Preconditions.checkNotUndefined(op);

        const transformer = this.memoryTransformerFor(fromState);
        if (op instanceof AssumeOperation) {
            const visitor = new MemBoolExpressionVisitor(this._abstDomain, this._theories, fromState);
            const assume: AssumeOperation = op as AssumeOperation;
            const assumeValue: AbstractBoolean = assume.expression.accept(visitor);
            return [transformer.assumeTruth(assumeValue)];
        } else {
            const visitor = new MemTransformerVisitor(this._abstDomain, transformer, fromState);
            const succ: AbstractMemory = op.ast.accept(visitor);
            return [succ];
        }
    }

    private memoryTransformerFor(state: MemAbstractState): MemoryTransformer<MemAbstractState> {
        return new AbstMemTransformer(state);
    }

}
