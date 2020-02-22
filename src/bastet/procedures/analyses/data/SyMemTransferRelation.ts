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
import {SyMemTransformerVisitor} from "./SyMemTransformerVisitor";
import {AbstractMemoryTheory} from "../../domains/MemoryTransformer";
import {Preconditions} from "../../../utils/Preconditions";
import {
    BooleanFormula,
    FirstOrderFormula,
    ListFormula,
    NumberFormula,
    StringFormula
} from "../../../utils/ConjunctiveNormalForm";
import {AstNode} from "../../../syntax/ast/AstNode";
import {AssumeStatement} from "../../../syntax/ast/core/statements/AssumeStatement";
import {Concern} from "../../../syntax/Concern";

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

    public abstractSuccFor(fromState: SymMemAbstractState, op: ProgramOperation, co: Concern): Iterable<SymMemAbstractState> {
        Preconditions.checkNotUndefined(fromState);
        Preconditions.checkNotUndefined(op);

        let ast: AstNode;
        if (op instanceof AssumeOperation) {
            const assume = op as AssumeOperation;
            ast = new AssumeStatement(op.expression);
        } else {
            ast = op.ast;
        }

        return this.abstractSuccForAst(fromState, ast);
    }

    private abstractSuccForAst(fromState: SymMemAbstractState, ast: AstNode): Iterable<SymMemAbstractState> {
        const visitor = new SyMemTransformerVisitor(fromState.blockFormula, this._theories);

        const blockFormulaPrime: FirstOrderFormula = ast.accept(visitor);

        return [new SymMemAbstractState(blockFormulaPrime, fromState.summaryFormula)];
    }

}
