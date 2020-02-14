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
import {SyMemAbstractDomain, SymMemAbstractState} from "./SyMemAbstractDomain";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {AssumeOperation, ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {SyMemBoolExpressionVisitor, SyMemTransformerVisitor} from "./SyMemTransformerVisitor";
import {AbstractBoolean, AbstractMemoryTheory, MemoryTransformer} from "../../domains/MemoryTransformer";
import {Preconditions} from "../../../utils/Preconditions";
import {
    BooleanFormula,
    FirstOrderFormula,
    ListFormula,
    NumberFormula,
    StringFormula
} from "../../../utils/ConjunctiveNormalForm";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export class SyMemTransferRelation implements LabeledTransferRelation<SymMemAbstractState> {

    private readonly _abstDomain: SyMemAbstractDomain;

    private readonly _theories: AbstractMemoryTheory<FirstOrderFormula, BooleanFormula, NumberFormula, StringFormula, ListFormula>;

    constructor(abstDomain: SyMemAbstractDomain, theories: AbstractMemoryTheory<FirstOrderFormula, BooleanFormula, NumberFormula, StringFormula, ListFormula>) {
        this._abstDomain = Preconditions.checkNotUndefined(abstDomain);
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    public abstractSucc(fromState: SymMemAbstractState): Iterable<SymMemAbstractState> {
        throw new IllegalStateException("Only the labelled transfer is supported by this transfer relation");
    }

    public abstractSuccFor(fromState: SymMemAbstractState, op: ProgramOperation): Iterable<SymMemAbstractState> {
        Preconditions.checkNotUndefined(fromState);
        Preconditions.checkNotUndefined(op);

        const transformer = this.memoryTransformerFor(fromState);
        if (op instanceof AssumeOperation) {
            const visitor = new SyMemBoolExpressionVisitor(this._theories, fromState);
            const assume: AssumeOperation = op as AssumeOperation;
            const assumeValue: AbstractBoolean = assume.expression.accept(visitor);
            Preconditions.checkNotUndefined(assumeValue);
            // TODO: Add a shortcut in case the bool evaluates to FALSE

            return [new SymMemAbstractState(transformer.assumeTruth(assumeValue), fromState.summaryFormula)];
        } else {
            const visitor = new SyMemTransformerVisitor(fromState, this._theories);
            const blockFormulaPrime: FirstOrderFormula = op.ast.accept(visitor);

            return [new SymMemAbstractState(blockFormulaPrime, fromState.summaryFormula)];
        }
    }

    private memoryTransformerFor(state: SymMemAbstractState): MemoryTransformer<SymMemAbstractState> {
        throw new ImplementMeException();
    }

}
