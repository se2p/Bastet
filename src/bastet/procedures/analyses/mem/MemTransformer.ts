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

import {
    AbstractBoolean, AbstractList, AbstractMap,
    AbstractNumber, AbstractString,
    BooleanVariable, ListVariable, MapVariable,
    MemoryTransformer,
    NumberVariable, StringVariable
} from "../../domains/MemoryTransformer";
import {MemAbstractDomain, MemAbstractState, Theories} from "./MemAbstractDomain";
import {Identifier} from "../../../syntax/ast/core/Identifier";
import {ScratchType} from "../../../syntax/ast/core/ScratchType";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {Preconditions} from "../../../utils/Preconditions";

export class AbstMemTransformer extends MemoryTransformer<MemAbstractState> {

    private readonly _dom: MemAbstractDomain;
    private readonly _theories: Theories;

    constructor(dom: MemAbstractDomain, theories: Theories, state: MemAbstractState) {
        super(state as MemAbstractState);
        this._dom = Preconditions.checkNotUndefined(dom);
        this._theories = Preconditions.checkNotUndefined(theories);
    }

    assignString(assignTo: StringVariable, b: AbstractString): MemAbstractState {
        return this._state.withString(assignTo.name, b);
    }

    assignNumber(assignTo: NumberVariable, b: AbstractNumber): MemAbstractState {
        return this._state.withNum(assignTo.name, b);
    }

    assignAnd(assignTo: BooleanVariable, b1: AbstractBoolean, b2: AbstractBoolean): MemAbstractState {
        throw new ImplementMeException();
    }

    assignBoolean(assignTo: BooleanVariable, b: AbstractBoolean): MemAbstractState {
        throw new ImplementMeException();
    }

    assignDivide(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): MemAbstractState {
        throw new ImplementMeException();
    }

    assignIsNumberEqualTo(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): MemAbstractState {
        throw new ImplementMeException();
    }

    assignIsNumberLessThan(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): MemAbstractState {
        throw new ImplementMeException();
    }

    assignIsStringContained(assignTo: BooleanVariable, s: AbstractString, containedIn: AbstractString): MemAbstractState {
        throw new ImplementMeException();
    }

    assignIsStringEqualTo(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): MemAbstractState {
        throw new ImplementMeException();
    }

    assignIsStringLessThan(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): MemAbstractState {
        throw new ImplementMeException();
    }

    assignIthLetterOf(assignTo: StringVariable, index: AbstractNumber, str: AbstractString): MemAbstractState {
        throw new ImplementMeException();
    }

    assignJoinedStrings(assignTo: StringVariable, s1: AbstractString, s2: AbstractString): MemAbstractState {
        throw new ImplementMeException();
    }

    assignMinus(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): MemAbstractState {
        throw new ImplementMeException();
    }

    assignModulo(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): MemAbstractState {
        throw new ImplementMeException();
    }

    assignMultiply(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): MemAbstractState {
        throw new ImplementMeException();
    }

    assignNot(assignTo: BooleanVariable, b1: AbstractBoolean): MemAbstractState {
        throw new ImplementMeException();
    }

    assignNumberGreaterThan(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): MemAbstractState {
        throw new ImplementMeException();
    }

    assignOr(assignTo: BooleanVariable, b1: AbstractBoolean, b2: AbstractBoolean): MemAbstractState {
        throw new ImplementMeException();
    }

    assignPlus(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): MemAbstractState {
        throw new ImplementMeException();
    }

    assignStringGreaterThan(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): MemAbstractState {
        throw new ImplementMeException();
    }

    assumeFalse(boolVar: BooleanVariable): MemAbstractState {
        throw new ImplementMeException();
    }

    assumeTrue(boolVar: BooleanVariable): MemAbstractState {
        throw new ImplementMeException();
    }

    assumeTruth(boolVal: AbstractBoolean): MemAbstractState {
        if (boolVal === this._theories.boolTheory.falseBool()
         || boolVal === this._theories.boolTheory.bottomBoolean()) {
            return this._dom.lattice.bottom();
        }
        return this._state;
    }

    declareVariable(id: Identifier, type: ScratchType): MemAbstractState {
        throw new ImplementMeException();
    }

    freeVariable(id: Identifier): MemAbstractState {
        throw new ImplementMeException();
    }

    getBooleanVariable(id: Identifier): BooleanVariable {
        throw new ImplementMeException();
    }

    getListVariable(id: Identifier): ListVariable {
        throw new ImplementMeException();
    }

    getMapVariable(id: Identifier): MapVariable {
        throw new ImplementMeException();
    }

    getNumberVariable(id: Identifier): NumberVariable {
        throw new ImplementMeException();
    }

    getStringVariable(id: Identifier): StringVariable {
        throw new ImplementMeException();
    }

    queryAbstractBoolean(id: BooleanVariable): AbstractBoolean {
        throw new ImplementMeException();
    }

    queryAbstractList(id: ListVariable): AbstractList {
        throw new ImplementMeException();
    }

    queryAbstractMap(id: MapVariable): AbstractMap {
        throw new ImplementMeException();
    }

    queryAbstractNumber(id: NumberVariable): AbstractNumber {
        throw new ImplementMeException();
    }

    queryAbstractString(id: StringVariable): AbstractString {
        throw new ImplementMeException();
    }


}
