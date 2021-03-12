/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of PaAbstractionu (uni-paAbstractionu.de)
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

import {LabeledTransferRelation} from "../TransferRelation";
import {ProgramOperation, ProgramOperationInContext} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {AbstractElement} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {Concern} from "../../../syntax/Concern";
import {AbstractionAbstractDomain, AbstractionState} from "./AbstractionAbstractDomain";
import {PrecisionPushStatement} from "../../../syntax/ast/core/Precisions";
import {BooleanExpression} from "../../../syntax/ast/core/expressions/BooleanExpression";
import {DataBoolExpressionVisitor} from "../data/DataTransformerVisitor";
import {TransformerTheories} from "../../domains/MemoryTransformer";
import {
    BooleanFormula,
    FirstOrderFormula,
    FloatFormula,
    IntegerFormula,
    ListFormula,
    RealFormula,
    StringFormula
} from "../../../utils/ConjunctiveNormalForm";
import {PrecisionRole, PredicatePrecision} from "../../AbstractionPrecision";

export class AbstractionTransferRelation implements LabeledTransferRelation<AbstractionState> {

    private readonly _wrapped: LabeledTransferRelation<AbstractElement>;
    private readonly _theories: any;
    private readonly _domain: AbstractionAbstractDomain;

    constructor(wrappedTr: LabeledTransferRelation<AbstractElement>, abstractDomain: AbstractionAbstractDomain,
                theories: TransformerTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>) {
        this._wrapped = Preconditions.checkNotUndefined(wrappedTr);
        this._domain = Preconditions.checkNotUndefined(abstractDomain);
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    abstractSucc(fromState: AbstractionState): Iterable<AbstractionState> {
        throw new IllegalStateException("This TR is only applicable to labeled transitions");
    }

    abstractSuccFor(fromState: AbstractionState, opic: ProgramOperationInContext, co: Concern): Iterable<AbstractionState> {
        const op = opic.op;
        const result: AbstractionState[] = [];
        for (const w of this._wrapped.abstractSuccFor(fromState.wrappedState, opic, co)) {
            const e = fromState.withWrappedState(w).withoutWideningOf();

            if (op.ast instanceof PrecisionPushStatement) {
                const predicate = this.parseToPredicatePrecision(op.ast.predicate);
                result.push(e.withPrecision(e.getPrecision().push(predicate)));
            } else if (op.ast instanceof PrecisionPushStatement) {
                result.push(e.withPrecision(e.getPrecision().pop()));
            } else {
                result.push(e);
            }
        }

        return result;
    }

    private parseToPredicatePrecision(predicate: BooleanExpression): PredicatePrecision {
        const visitor = new DataBoolExpressionVisitor(this._theories);
        const predicateFormula = predicate.accept(visitor);
        return new PredicatePrecision([predicateFormula], PrecisionRole.INTERMEDIATE);
    }
}
