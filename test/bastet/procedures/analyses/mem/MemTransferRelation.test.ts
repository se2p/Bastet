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


import {MemTransferRelation} from "../../../../../src/bastet/procedures/analyses/mem/MemTransferRelation";
import {
    MemAbstractState,
    MemAbstractStates
} from "../../../../../src/bastet/procedures/analyses/mem/MemAbstractDomain";
import {
    ProgramOperation, ProgramOperationFactory
} from "../../../../../src/bastet/syntax/app/controlflow/ops/ProgramOperation";
import {AstNode} from "../../../../../src/bastet/syntax/ast/AstNode";
import {
    BooleanExpression,
    NumLessThanExpression
} from "../../../../../src/bastet/syntax/ast/core/expressions/BooleanExpression";
import {
    NumberVariableExpression,
    PlusExpression
} from "../../../../../src/bastet/syntax/ast/core/expressions/NumberExpression";
import {Identifier} from "../../../../../src/bastet/syntax/ast/core/Identifier";

describe("MemTransferRelation", () => {

    const tr = new MemTransferRelation();

    describe("abstractSuccFor", () => {

        describe ("Within one background theory", () => {

            describe("c < a + b", () => {

                const e: MemAbstractState = MemAbstractStates.empty();
                const opAst: BooleanExpression = new NumLessThanExpression(
                    new NumberVariableExpression(Identifier.of("c")),
                    new PlusExpression(
                        new NumberVariableExpression(Identifier.of("a")),
                        new NumberVariableExpression(Identifier.of("b"))));
                const op: ProgramOperation = ProgramOperationFactory.createAssumeOpFrom(opAst);
                const result = tr.abstractSuccFor(e, op);

                it("TODO", () => {

                });

            });

            describe("define c as 41", () => {});

            describe("define c as c + 1", () => {});

        });

        describe ("Among different background theories", () => {

            const code: string = `
            program Test
            
            actor A begin
                define test () begin
                    declare a as number
                    declare b as number
                    declare c as number
                    declare d as number
                    declare e as boolean
                    declare s as string
                   
                    @ Label ("case1")
                    define a as length of "teststring"
                    
                    @ Label ("case2")
                    define b as cast "123" as number
                    
                    @ Label ("case3")
                    define c as cast true to number 
                    
                    @ Label ("case4")
                    define e as a < b
                    
                    @ Label ("case5")
                    define d as cast s to number
                end
            end
            `;

            describe("define c as length of \"teststring\"", () => {
                // The abstract domain that is responsible for handling
                // strings is asked for the length of the given string.
                //
                // APPROACH 1:
                // The string domain is parameterized with a number domain
                // for producing abstract number representations.
                //
                // APPROACH 2:
                // Store the information on string lengths in
                // the number domain (with special variables).

            });

            describe("define c as cast \"123\" to number", () => {
                // APPROACH 1:
                // The string domain has a reference to the number domain.
                // The string domain produces abstract number elements
                // for a given string.
                //
                // APPROACH 2:
                // Store the information on the number-value of a string
                // in the number domain when creating the string (with a special variable).
            });

            describe("define c as cast true to number", () => {

            });

            describe("define c as a < b, where c is a bool, a and b are numbers", () => {
                // APPROACH 1:
                // The number domain has to interpret the expression and provide
                // an abstract boolean element based on the corresponding boolean domain.

            });

            describe("define c as cast myVar to number, with myVar of type string and in [\"1\", \"2\"]", () => {

            });

            describe("", () => {

            });

            describe("", () => {

            });

        });

    });

});
