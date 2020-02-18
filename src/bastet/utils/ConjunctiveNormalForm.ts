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

import {List as ImmList, Record as ImmRec} from "immutable";
import {AbstractElement} from "../lattices/Lattice";
import {BooleanLiteral} from "../syntax/ast/core/expressions/BooleanExpression";
import {AbstractBoolean, AbstractList, AbstractNumber, AbstractString} from "../procedures/domains/MemoryTransformer";

export type ExpressionId = number;

export interface FirstOrderFormula extends AbstractElement {

}

export interface BooleanFormula extends AbstractBoolean, FirstOrderFormula {

}

export interface StringFormula extends AbstractString {

}

export interface NumberFormula extends AbstractNumber {

}

export interface ListFormula extends AbstractList {

}

const LiteralRecord = ImmRec({

    expressionId: -1,

});

export class Literal extends LiteralRecord {

    expressionId: ExpressionId;

    constructor(literalExpressionId: ExpressionId) {
        super({expressionId: literalExpressionId});
    }
}

const ClauseRecord = ImmRec({

    literals: ImmList([])

});

/**
 * Disjunctions (OR) of a list of literals.
 */
export class Clause extends ClauseRecord {

    constructor(literals: ImmList<Literal>) {
        super({literals: literals});
    }

}

export interface CNFFormulaAttributes extends FirstOrderFormula {

    clauses: ImmList<Clause>;

}

const CNFFormulaRecord = ImmRec({

    clauses: ImmList([])

});

/**
 * Conjunction (AND) of a list of clauses.
 */
export class CNFFormula extends CNFFormulaRecord implements CNFFormulaAttributes {

    constructor(clauses: ImmList<Clause>) {
        super({clauses: clauses});
    }

}

export const FALSE_FORMULA: CNFFormula = new CNFFormula(
    ImmList([
        new Clause(ImmList([
            new Literal(BooleanLiteral.false().getRefId())]))]));

export const TRUE_FORMULA: CNFFormula = new CNFFormula(
    ImmList([
        new Clause(ImmList([
            new Literal(BooleanLiteral.true().getRefId())]))]));

