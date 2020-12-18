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

import {
    AbstractNumber,
    AbstractTheories,
    BooleanTheory, FloatTheory, IntegerTheory, ListTheory, NumberTheory,
    RealTheory, StringTheory,
    TransformerTheories
} from "../../domains/MemoryTransformer";
import {
    BooleanFormula,
    FirstOrderFormula,
    FloatFormula,
    IntegerFormula, ListFormula,
    RealFormula, StringFormula
} from "../../../utils/ConjunctiveNormalForm";
import {Preconditions} from "../../../utils/Preconditions";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {FloatType, IntegerType, ScratchType} from "../../../syntax/ast/core/ScratchType";

export class Theories implements TransformerTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula> {

    private readonly _wrapped: AbstractTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>;

    private readonly _encodeFloatsAs: RealTheory<AbstractNumber, IntegerFormula, RealFormula, FloatFormula, BooleanFormula, StringFormula>;

    constructor(encodeFloatsAs: string, wrapped: AbstractTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>) {
        this._wrapped = Preconditions.checkNotUndefined(wrapped);
        if (encodeFloatsAs.toUpperCase() == "REALS") {
            this._encodeFloatsAs = this._wrapped.realTheory;
        } else if (encodeFloatsAs.toUpperCase() == "FLOATS") {
            this._encodeFloatsAs = this._wrapped.floatTheory;
        } else {
            throw new IllegalArgumentException();
        }
    }

    get boolTheory(): BooleanTheory<BooleanFormula> {
        return this._wrapped.boolTheory;
    }

    get floatTheory(): FloatTheory<FloatFormula, IntegerFormula, RealFormula, FloatFormula, BooleanFormula, StringFormula> {
        return this._wrapped.floatTheory;
    }

    get intTheory(): IntegerTheory<IntegerFormula, IntegerFormula, RealFormula, FloatFormula, BooleanFormula, StringFormula> {
        return this._wrapped.intTheory;
    }

    get listTheory(): ListTheory<ListFormula> {
        return this._wrapped.listTheory;
    }

    get realTheory(): RealTheory<RealFormula, IntegerFormula, RealFormula, FloatFormula, BooleanFormula, StringFormula> {
        return this._wrapped.realTheory;
    }

    get stringTheory(): StringTheory<StringFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula> {
        return this._wrapped.stringTheory;
    }

    getNumberTheoryFor(t: ScratchType): NumberTheory<AbstractNumber, IntegerFormula, RealFormula, FloatFormula, BooleanFormula, StringFormula> {
        if (t == IntegerType.instance()) {
            return this.intTheory;
        } else if (t == FloatType.instance()) {
            return this._encodeFloatsAs;
        }

        throw new IllegalArgumentException("Unknown number type to map theory to");
    }

    getNumberTheoryOf(e: AbstractNumber): NumberTheory<AbstractNumber, IntegerFormula, RealFormula, FloatFormula, BooleanFormula, StringFormula> {
        return this._wrapped.getNumberTheoryOf(e);
    }

    simplify(element: FirstOrderFormula): FirstOrderFormula {
        return this._wrapped.simplify(element);
    }

    stringRepresentation(element: FirstOrderFormula): string {
        return this._wrapped.stringRepresentation(element);
    }

    instantiate(formula: FirstOrderFormula, indexFn: (name: string, oldIndex: number) => number): FirstOrderFormula {
        return this._wrapped.instantiate(formula, indexFn);
    }

    alignSsaIndices(blockFormulas: FirstOrderFormula[], ssaOffset: Map<string, number>[]): FirstOrderFormula[] {
        return this._wrapped.alignSsaIndices(blockFormulas, ssaOffset);
    }

    uninstantiate(formula: FirstOrderFormula): FirstOrderFormula {
        return this._wrapped.uninstantiate(formula);
    }

}
