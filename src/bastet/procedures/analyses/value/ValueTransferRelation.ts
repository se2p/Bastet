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

import {LabeledTransferRelation} from "../TransferRelation";
import {ValueAbstractDomain, ValueAbstractState} from "./ValueAbstractDomain";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {
    AssumeOperation,
    ProgramOperation,
    ProgramOperationInContext
} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {TransformerTheories} from "../../domains/MemoryTransformer";
import {Preconditions} from "../../../utils/Preconditions";
import {AstNode} from "../../../syntax/ast/AstNode";
import {StrengtheningAssumeStatement} from "../../../syntax/ast/core/statements/AssumeStatement";
import {Concern} from "../../../syntax/Concern";
import {
    ConcreteBoolean,
    ConcreteFloat,
    ConcreteInteger,
    ConcreteMemory,
    ConcreteString, ConcreteStringList
} from "../../domains/ConcreteElements";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export class ValueTransferRelation implements LabeledTransferRelation<ValueAbstractState> {

    private readonly _abstDomain: ValueAbstractDomain;

    private readonly _theories: TransformerTheories<ConcreteMemory, ConcreteBoolean, ConcreteInteger, ConcreteFloat, ConcreteFloat, ConcreteString, ConcreteStringList>;

    constructor(abstDomain: ValueAbstractDomain) {
        this._abstDomain = Preconditions.checkNotUndefined(abstDomain);
    }

    public abstractSucc(fromState: ValueAbstractState): Iterable<ValueAbstractState> {
        throw new IllegalStateException("Only the labelled transfer is supported by this transfer relation");
    }

    public abstractSuccFor(fromState: ValueAbstractState, opic: ProgramOperationInContext, co: Concern): Iterable<ValueAbstractState> {
        let ast: AstNode;
        if (opic.op instanceof AssumeOperation) {
            const assume = opic.op as AssumeOperation;
            ast = new StrengtheningAssumeStatement(assume.expression);
        } else {
            ast = opic.op.ast;
        }

        return this.abstractSuccForAst(fromState, ast);
    }

    private abstractSuccForAst(fromState: ValueAbstractState, ast: AstNode): Iterable<ValueAbstractState> {
        // const visitor = new ValueTransformerVisitor(fromState, this._abstDomain.lattice, this._theories);
        // return [ast.accept(visitor)];
        throw new ImplementMeException();
    }

}
