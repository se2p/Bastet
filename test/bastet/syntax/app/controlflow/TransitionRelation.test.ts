/*
 *
 *    Copyright 2019 University of Passau
 *
 *    Project maintained by Andreas Stahlbauer (firstname @ lastname . net)
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import {Map as ImmMap, Set as ImmSet} from "immutable"
import {
    TransitionRelation,
    TransitionRelationBuilder,
    TransitionRelations
} from "../../../../../src/bastet/syntax/app/controlflow/TransitionRelation";
import {ControlLocation} from "../../../../../src/bastet/syntax/app/controlflow/ControlLocation";
import {ProgramOperations, RawOperation} from "../../../../../src/bastet/syntax/app/controlflow/ops/ProgramOperation";
import {StopAllStatement} from "../../../../../src/bastet/syntax/ast/core/statements/TerminationStatement";

describe("TransitionRelation", () => {

    describe("constructor", () => {

        describe("case: all arguments empty", () => {

            it("creates an empty transition relation", () => {
                const tr = new TransitionRelation(ImmMap(), ImmSet(), ImmSet(), ImmSet());

                expect(tr.transitionTable.size).toEqual(0);
                expect(tr.transitionsFrom(0).length).toEqual(0);
            });

        });

    });

});

describe("TransitionRelationBuilder", () => {

    describe("build()", () => {

        describe("case: empty relation", () => {
            let builder = new TransitionRelationBuilder();
            let result = builder.build();
            expect(result.transitionTable.size).toEqual(0);
        });

        describe("case: epsilon", () => {
            const builder = new TransitionRelationBuilder();
            const l0 = ControlLocation.for(0);
            builder.addTransition(l0, l0, ProgramOperations.epsilon());

            const result = builder.build();
            expect(result.transitionTable.size).toEqual(1);

            const fromL0 = result.transitionsFrom(l0.ident);
            expect(fromL0[0].opId).toEqual(ProgramOperations.epsilon().ident);
            expect(fromL0[0].target).toEqual(l0.ident);
        });


        describe("case: sequence", () => {

            it("results in connected transitions", () => {
                const l0 = ControlLocation.for(0);
                const l1 = ControlLocation.for(1);
                const l2 = ControlLocation.for(2);
                const l3 = ControlLocation.for(3);

                const tr: TransitionRelation = TransitionRelation.builder()
                    .addTransition(l0, l1, ProgramOperations.epsilon())
                    .addTransition(l1, l2, ProgramOperations.epsilon())
                    .addTransition(l2, l3, ProgramOperations.epsilon())
                    .build();

                expect(tr.transitionsFrom(l0.ident).length).toEqual(1);
                expect(tr.transitionsFrom(l1.ident).length).toEqual(1);
                expect(tr.transitionsFrom(l2.ident).length).toEqual(1);
                expect(tr.transitionsFrom(l3.ident).length).toEqual(0);
            });

        });

    });

});

describe("TransitionRelations", () => {

    describe("concat()", () => {

        describe("case: both single entry and exit point", () => {
            const tr1 = TransitionRelations.forOpSeq(ProgramOperations.epsilon());
            const tr2 = TransitionRelations.forOpSeq(ProgramOperations.epsilon());
            const trc = TransitionRelations.concat(tr1, tr2);

            it("also the result should have one exit and one entry loc", () => {
                expect(trc.entryLocationSet.size).toEqual(1);
                expect(trc.exitLocationSet.size).toEqual(1);
            });
        });

    });

    describe("concatTrOpGoto()", () => {

        describe("case:", () => {
            const tr1 = TransitionRelations.forOpSeq(ProgramOperations.epsilon());

            const l7: ControlLocation = ControlLocation.for(7);
            const tr = TransitionRelations.concatTrOpGoto(tr1, ProgramOperations.epsilon(), l7);

            it("the exit location must be l7", () => {
                expect(tr.exitLocationSet.size).toEqual(1);
                expect(tr.exitLocationSet).toContain(l7.ident);
            });
        });

    });

    describe("eliminateEpsilons()", () => {

        describe("case: no epsilon moves", () => {

            const op = new RawOperation(new StopAllStatement());

            const tr = TransitionRelation.builder()
                .addTransitionByIDs(0, 1, op)
                .addTransitionByIDs(1, 2, op)
                .addEntryLocationWithID(0)
                .addExitLocationWithID(2)
                .build();

            const te = TransitionRelations.eliminateEpsilons(tr);

            it("leaves the transition relation unmodified", () => {
                expect(tr.entryLocationSet.equals(te.entryLocationSet)).toBeTruthy();
                expect(tr.exitLocationSet.equals(te.exitLocationSet)).toBeTruthy();
                expect(tr.transitionTable.equals(te.transitionTable)).toBeTruthy();
            });

        });

        describe("case: with epsilon moves", () => {
            const op = new RawOperation(new StopAllStatement());

            const tr = TransitionRelation.builder()
                .addTransitionByIDs(1, 7, ProgramOperations.epsilon())
                .addTransitionByIDs(7, 6, op)
                .addTransitionByIDs(6, 7, ProgramOperations.epsilon())
                .addEntryLocationWithID(1)
                .addExitLocationWithID(7)
                .build();

            const te = TransitionRelations.eliminateEpsilons(tr);

            it("does not lead to an empty transition relation", () => {
               expect(te.entryLocationSet.isEmpty()).not.toBeTruthy();
               expect(te.exitLocationSet.isEmpty()).not.toBeTruthy();
               expect(te.locationSet.isEmpty()).not.toBeTruthy();

               for (const e of te.entryLocationSet) {
                   expect(te.transitionsFrom(e).length).toBeGreaterThan(0);
               }
            });
        });

    });

});
