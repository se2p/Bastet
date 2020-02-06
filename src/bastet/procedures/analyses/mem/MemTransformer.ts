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
import {MemAbstractState} from "./MemAbstractDomain";
import {Identifier} from "../../../syntax/ast/core/Identifier";
import {ScratchType} from "../../../syntax/ast/core/ScratchType";

export class AbstMemTransformer extends MemoryTransformer<MemAbstractState> {

    constructor(state: MemAbstractState) {
        super(state as MemAbstractState);
    }

    assignString(assignTo: StringVariable, b: AbstractString): MemAbstractState {
        return this._state.withString(assignTo.name, b);
    }

    assignNumber(assignTo: NumberVariable, b: AbstractNumber): MemAbstractState {
        return this._state.withNum(assignTo.name, b);
    }

    assignAnd(assignTo: BooleanVariable, b1: AbstractBoolean, b2: AbstractBoolean): MemAbstractState {
        return undefined;
    }

    assignBoolean(assignTo: BooleanVariable, b: AbstractBoolean): MemAbstractState {
        return undefined;
    }

    assignDivide(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): MemAbstractState {
        return undefined;
    }

    assignIsNumberEqualTo(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): MemAbstractState {
        return undefined;
    }

    assignIsNumberLessThan(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): MemAbstractState {
        return undefined;
    }

    assignIsStringContained(assignTo: BooleanVariable, s: AbstractString, containedIn: AbstractString): MemAbstractState {
        return undefined;
    }

    assignIsStringEqualTo(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): MemAbstractState {
        return undefined;
    }

    assignIsStringLessThan(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): MemAbstractState {
        return undefined;
    }

    assignIthLetterOf(assignTo: StringVariable, index: AbstractNumber, str: AbstractString): MemAbstractState {
        return undefined;
    }

    assignJoinedStrings(assignTo: StringVariable, s1: AbstractString, s2: AbstractString): MemAbstractState {
        return undefined;
    }

    assignMinus(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): MemAbstractState {
        return undefined;
    }

    assignModulo(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): MemAbstractState {
        return undefined;
    }

    assignMultiply(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): MemAbstractState {
        return undefined;
    }

    assignNot(assignTo: BooleanVariable, b1: AbstractBoolean): MemAbstractState {
        return undefined;
    }

    assignNumberGreaterThan(assignTo: BooleanVariable, s1: AbstractNumber, s2: AbstractNumber): MemAbstractState {
        return undefined;
    }

    assignOr(assignTo: BooleanVariable, b1: AbstractBoolean, b2: AbstractBoolean): MemAbstractState {
        return undefined;
    }

    assignPlus(assignTo: NumberVariable, op1: AbstractNumber, op2: AbstractNumber): MemAbstractState {
        return undefined;
    }

    assignStringGreaterThan(assignTo: BooleanVariable, s1: AbstractString, s2: AbstractString): MemAbstractState {
        return undefined;
    }

    assumeFalse(boolVar: BooleanVariable): MemAbstractState {
        return undefined;
    }

    assumeTrue(boolVar: BooleanVariable): MemAbstractState {
        return undefined;
    }

    assumeTruth(boolVal: AbstractBoolean): MemAbstractState {
        return undefined;
    }

    declareVariable(id: Identifier, type: ScratchType): MemAbstractState {
        return undefined;
    }

    freeVariable(id: Identifier): MemAbstractState {
        return undefined;
    }

    getBooleanVariable(id: Identifier): BooleanVariable {
        return undefined;
    }

    getListVariable(id: Identifier): ListVariable {
        return undefined;
    }

    getMapVariable(id: Identifier): MapVariable {
        return undefined;
    }

    getNumberVariable(id: Identifier): NumberVariable {
        return undefined;
    }

    getStringVariable(id: Identifier): StringVariable {
        return undefined;
    }

    queryAbstractBoolean(id: BooleanVariable): AbstractBoolean {
        return undefined;
    }

    queryAbstractList(id: ListVariable): AbstractList {
        return undefined;
    }

    queryAbstractMap(id: MapVariable): AbstractMap {
        return undefined;
    }

    queryAbstractNumber(id: NumberVariable): AbstractNumber {
        return undefined;
    }

    queryAbstractString(id: StringVariable): AbstractString {
        return undefined;
    }


}
