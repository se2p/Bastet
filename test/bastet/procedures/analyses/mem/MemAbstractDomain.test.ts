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

import {MemAbstractStateImpl} from "../../../../../src/bastet/procedures/analyses/mem/MemAbstractDomain";
import {
    NumIntervalValue,
    NumIntervalValueDomain
} from "../../../../../src/bastet/procedures/domains/NumIntervalValueDomain";
import {ConcreteNumberDomain} from "../../../../../src/bastet/procedures/domains/ConcreteElements";
import {NumberType, ScratchType} from "../../../../../src/bastet/syntax/ast/core/ScratchType";

describe("MemAbstractStateImpl", () => {

    describe("Number declaration and assignment", () => {
        const numConcDom = new ConcreteNumberDomain();
        const numAbstDom = new NumIntervalValueDomain(numConcDom);
        const e = numAbstDom.abstract([numAbstDom.concreteDomain.createElement({value: 5}),
            numAbstDom.concreteDomain.createElement({value: 3})]);

        const m0: MemAbstractStateImpl = new MemAbstractStateImpl();
        const m1 = m0.withDeclaration("a", NumberType.instance());
        const m2 = m1.withNum("a", e);

        it("Resulting element has 4 in the interval, and not 7", () => {
            const intervalWithOnly4 = numAbstDom.abstract([numAbstDom.concreteDomain.createElement({value: 4}) ]);
            const intervalWithOnly7 = numAbstDom.abstract([numAbstDom.concreteDomain.createElement({value: 7}) ]);
            const stored = m2.getNum("a") as NumIntervalValue;

            expect(numAbstDom.lattice.isIncluded(intervalWithOnly4, stored)).toBeTruthy();
            expect(numAbstDom.lattice.isIncluded(intervalWithOnly7, stored)).not.toBeTruthy();
        });
    });

});

describe("MemAbstractStateBuilder", () => {

    describe("dissolveInheritance", () => {

        it("", () => {

        });

    });

});
