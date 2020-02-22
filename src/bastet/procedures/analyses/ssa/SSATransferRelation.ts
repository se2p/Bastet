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

import {LabeledTransferRelation} from "../TransferRelation";
import {SSAState} from "./SSAAbstractDomain";
import {AssumeOperation, ProgramOperation, RawOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {AbstractElement} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {SSAssigner, SSATransformerVisitor} from "./SSATransformerVisitor";
import {BooleanExpression} from "../../../syntax/ast/core/expressions/BooleanExpression";
import {DummyDataLocationMapper} from "../../../syntax/app/controlflow/DataLocation";
import {Concern} from "../../../syntax/Concern";

export class SSATransferRelation implements LabeledTransferRelation<SSAState> {

    private readonly _wrapped: LabeledTransferRelation<AbstractElement>;
    private readonly _mapper: DummyDataLocationMapper;

    constructor(wrappedTr: LabeledTransferRelation<AbstractElement>) {
        this._wrapped = Preconditions.checkNotUndefined(wrappedTr);
        this._mapper = new DummyDataLocationMapper();
    }

    abstractSucc(fromState: SSAState): Iterable<SSAState> {
        throw new IllegalStateException("This TR is only applicable to labeled transitions");
    }

    abstractSuccFor(fromState: SSAState, op: ProgramOperation, co: Concern): Iterable<SSAState> {
        const ssasigner = new SSAssigner(fromState);
        const visitor = new SSATransformerVisitor(ssasigner, this._mapper);

        let opPrime: ProgramOperation;
        if (op instanceof AssumeOperation) {
            opPrime = new AssumeOperation(op.ast.accept(visitor) as BooleanExpression);
        } else {
            opPrime = new RawOperation(op.ast.accept(visitor));
        }

        const result: SSAState[] = [];
        for (const w of this._wrapped.abstractSuccFor(fromState.wrappedState, opPrime, co)) {
            result.push(ssasigner.ssa.withWrappedState(w));
        }

        return result;
    }

}
