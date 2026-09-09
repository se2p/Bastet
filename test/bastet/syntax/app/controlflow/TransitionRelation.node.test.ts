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

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { Map as ImmMap, Set as ImmSet } from 'immutable';
import {
    TransitionRelation,
    TransitionRelationBuilder,
    TransitionRelations,
} from '../../../../../src/bastet/syntax/app/controlflow/TransitionRelation';
import { ControlLocation } from '../../../../../src/bastet/syntax/app/controlflow/ControlLocation';
import { ProgramOperations, RawOperation } from '../../../../../src/bastet/syntax/app/controlflow/ops/ProgramOperation';
import { StopAllStatement } from '../../../../../src/bastet/syntax/ast/core/statements/TerminationStatement';

test('case: minimal loop', () => {
    const op = new RawOperation(new StopAllStatement());

    const tr = TransitionRelation.builder()
        .addTransitionByIDs(1, 1, op)
        .addEntryLocationWithID(1)
        .addExitLocationWithID(1)
        .build();

    assert.deepStrictEqual(tr.loopHeads.size, 1);
});

describe('TransitionRelation', () => {
    describe('constructor', () => {
        describe('case: all arguments empty', () => {
            test('creates an empty transition relation', () => {
                const tr = new TransitionRelation(ImmMap(), ImmSet(), ImmSet(), ImmSet());

                assert.deepStrictEqual(tr.transitionTable.size, 0);
                assert.deepStrictEqual(tr.transitionsFrom(0).length, 0);
            });
        });
    });
});

describe('TransitionRelationBuilder', () => {
    describe('build()', () => {
        describe('case: empty relation', () => {
            let builder = new TransitionRelationBuilder();
            let result = builder.build();
            assert.deepStrictEqual(result.transitionTable.size, 0);
        });

        describe('case: epsilon', () => {
            const builder = new TransitionRelationBuilder();
            const l0 = ControlLocation.for(0);
            builder.addTransition(l0, l0, ProgramOperations.epsilon());

            const result = builder.build();
            assert.deepStrictEqual(result.transitionTable.size, 1);

            const fromL0 = result.transitionsFrom(l0.ident);
            assert.deepStrictEqual(fromL0[0].opId, ProgramOperations.epsilon().ident);
            assert.deepStrictEqual(fromL0[0].target, l0.ident);
        });

        describe('case: sequence', () => {
            test('results in connected transitions', () => {
                const l0 = ControlLocation.for(0);
                const l1 = ControlLocation.for(1);
                const l2 = ControlLocation.for(2);
                const l3 = ControlLocation.for(3);

                const tr: TransitionRelation = TransitionRelation.builder()
                    .addTransition(l0, l1, ProgramOperations.epsilon())
                    .addTransition(l1, l2, ProgramOperations.epsilon())
                    .addTransition(l2, l3, ProgramOperations.epsilon())
                    .build();

                assert.deepStrictEqual(tr.transitionsFrom(l0.ident).length, 1);
                assert.deepStrictEqual(tr.transitionsFrom(l1.ident).length, 1);
                assert.deepStrictEqual(tr.transitionsFrom(l2.ident).length, 1);
                assert.deepStrictEqual(tr.transitionsFrom(l3.ident).length, 0);
            });
        });
    });
});

describe('TransitionRelations', () => {
    describe('concat()', () => {
        describe('case: both single entry and exit point', () => {
            const tr1 = TransitionRelations.forOpSeq(ProgramOperations.epsilon());
            const tr2 = TransitionRelations.forOpSeq(ProgramOperations.epsilon());
            const trc = TransitionRelations.concat(tr1, tr2);

            test('also the result should have one exit and one entry loc', () => {
                assert.deepStrictEqual(trc.entryLocationSet.size, 1);
                assert.deepStrictEqual(trc.exitLocationSet.size, 1);
            });
        });
    });

    describe('fork-merge-invariant', () => {
        const op = new RawOperation(new StopAllStatement());
        const tr = TransitionRelation.builder()
            .addTransitionByIDs(11, 61, op)
            .addTransitionByIDs(61, 10, op)
            .addTransitionByIDs(11, 10, op)
            .addEntryLocationWithID(11)
            .addExitLocationWithID(10)
            .build();

        const trPrime = TransitionRelations.introduceEpsilonToMergeTransitions(tr);
        test('added intermediate transitions', () => {
            assert.deepStrictEqual(trPrime.transitions.size, 4);
            const irrTrans = trPrime
                .transitionsTo(10)
                .filter((t) => t.opId == ProgramOperations.irreducibleEpsilon().ident);
            assert.deepStrictEqual(irrTrans.length, 1);
        });
    });

    describe('loop-structure-invariant', () => {
        const op = new RawOperation(new StopAllStatement());
        const tr = TransitionRelation.builder().addTransitionByIDs(1, 1, op).addEntryLocationWithID(1).build();

        const trPrime = TransitionRelations.establishAnalysisInvariants(tr);
        test('added intermediate transitions', () => {
            assert.ok(trPrime.transitions.size > 1);
        });
    });

    describe('loops', () => {
        describe('case: minimal loop', () => {
            const op = new RawOperation(new StopAllStatement());

            const tr = TransitionRelation.builder()
                .addTransitionByIDs(1, 1, op)
                .addEntryLocationWithID(1)
                .addExitLocationWithID(1)
                .build();

            test('loop head identified', () => {
                assert.deepStrictEqual(tr.loopHeads.size, 1);
            });
        });

        describe('case: no loop', () => {
            const op = new RawOperation(new StopAllStatement());

            const tr = TransitionRelation.builder()
                .addTransitionByIDs(0, 1, op)
                .addTransitionByIDs(1, 2, op)
                .addEntryLocationWithID(0)
                .addExitLocationWithID(2)
                .build();

            test('no loop head identified', () => {
                assert.deepStrictEqual(tr.loopHeads.size, 0);
            });
        });

        describe('case: with one loop', () => {
            const op = new RawOperation(new StopAllStatement());

            const tr = TransitionRelation.builder()
                .addTransitionByIDs(0, 1, op)
                .addTransitionByIDs(1, 2, op)
                .addTransitionByIDs(2, 3, op)
                .addTransitionByIDs(2, 1, op)
                .addEntryLocationWithID(0)
                .addExitLocationWithID(3)
                .build();

            test('one loop head identified', () => {
                assert.deepStrictEqual(tr.loopHeads.size, 1);
                assert.strictEqual(tr.loopHeads.contains(1), true);
            });
        });

        describe('case: forever 1', () => {
            const op = new RawOperation(new StopAllStatement());

            const tr = TransitionRelation.builder()
                .addTransitionByIDs(0, 1, op)
                .addTransitionByIDs(1, 6, op)
                .addTransitionByIDs(6, 3, op)
                .addTransitionByIDs(3, 6, op)
                .addTransitionByIDs(3, 4, op)
                .addTransitionByIDs(4, 6, op)
                .addEntryLocationWithID(0)
                .build();

            test('one loop head identified', () => {
                assert.deepStrictEqual(tr.loopHeads.size, 1);
                assert.strictEqual(tr.loopHeads.contains(6), true);
                assert.deepStrictEqual(tr.getIsInLoopBodyOf(3).loopHead, 6);

                console.log(tr.getLoops().map((l) => l.toString()));
            });
        });

        describe('case: nested', () => {
            const op = new RawOperation(new StopAllStatement());

            const tr = TransitionRelation.builder()
                .addTransitionByIDs(0, 1, op)
                .addTransitionByIDs(1, 2, op)
                .addTransitionByIDs(2, 3, op)
                .addTransitionByIDs(3, 4, op)
                .addTransitionByIDs(4, 2, op)
                .addTransitionByIDs(2, 5, op)
                .addTransitionByIDs(5, 6, op)
                .addTransitionByIDs(6, 1, op)
                .addTransitionByIDs(1, 7, op)
                .addEntryLocationWithID(0)
                .addExitLocationWithID(7)
                .build();

            test('two loop heads identified', () => {
                assert.deepStrictEqual(tr.loopHeads.size, 2);
                assert.strictEqual(tr.loopHeads.contains(1), true);
                assert.strictEqual(tr.loopHeads.contains(2), true);

                console.log(tr.getLoops().map((l) => l.toString()));
            });
        });

        describe('case: nested 2', () => {
            const op = new RawOperation(new StopAllStatement());

            const tr = TransitionRelation.builder()
                .addTransitionByIDs(3, 4, op)
                .addTransitionByIDs(4, 6, op)
                .addTransitionByIDs(6, 1, op)
                .addTransitionByIDs(1, 7, op)
                .addTransitionByIDs(7, 6, op)
                .addTransitionByIDs(7, 8, op)
                .addTransitionByIDs(8, 6, op)
                .addTransitionByIDs(6, 3, op)
                .addEntryLocationWithID(3)
                .build();

            test('two loop heads identified', () => {
                assert.deepStrictEqual(tr.loopHeads.size, 2);
                assert.strictEqual(tr.loopHeads.contains(3), true);
                assert.strictEqual(tr.loopHeads.contains(6), true);

                assert.strictEqual(tr.isLoopHead(3), true);
                assert.strictEqual(tr.isLoopHead(6), true);

                const loopAt3 = tr.getIsLoopHeadOf(3);
                assert.notStrictEqual(loopAt3, undefined);
                const loopAt6 = tr.getIsLoopHeadOf(6);
                assert.notStrictEqual(loopAt6, undefined);

                assert.notDeepStrictEqual(loopAt3, loopAt6);

                const body = tr.getIsInLoopBodyOf(1);
                assert.deepStrictEqual(body, tr.getIsLoopHeadOf(6));

                console.log(tr.getLoops().map((l) => l.toString()));
            });
        });
    });

    describe('concatTrOpGoto()', () => {
        describe('case:', () => {
            const tr1 = TransitionRelations.forOpSeq(ProgramOperations.epsilon());

            const l7: ControlLocation = ControlLocation.for(7);
            const tr = TransitionRelations.concatTrOpGoto(tr1, ProgramOperations.epsilon(), l7);

            test('the exit location must be l7', () => {
                assert.deepStrictEqual(tr.exitLocationSet.size, 1);
                assert.ok([...tr.exitLocationSet].includes(l7.ident));
            });
        });
    });

    describe('eliminateEpsilons()', () => {
        describe('case: no epsilon moves', () => {
            const op = new RawOperation(new StopAllStatement());

            const tr = TransitionRelation.builder()
                .addTransitionByIDs(0, 1, op)
                .addTransitionByIDs(1, 2, op)
                .addEntryLocationWithID(0)
                .addExitLocationWithID(2)
                .build();

            const te = TransitionRelations.eliminateEpsilons(tr);

            test('leaves the transition relation unmodified', () => {
                assert.ok(tr.entryLocationSet.equals(te.entryLocationSet));
                assert.ok(tr.exitLocationSet.equals(te.exitLocationSet));
                assert.ok(tr.transitionTable.equals(te.transitionTable));
            });
        });

        describe('case: with epsilon moves', () => {
            const op = new RawOperation(new StopAllStatement());

            const tr = TransitionRelation.builder()
                .addTransitionByIDs(1, 7, ProgramOperations.epsilon())
                .addTransitionByIDs(7, 6, op)
                .addTransitionByIDs(6, 7, ProgramOperations.epsilon())
                .addEntryLocationWithID(1)
                .addExitLocationWithID(7)
                .build();

            const te = TransitionRelations.eliminateEpsilons(tr);

            test('does not lead to an empty transition relation', () => {
                assert.ok(!te.entryLocationSet.isEmpty());
                assert.ok(!te.exitLocationSet.isEmpty());
                assert.ok(!te.locationSet.isEmpty());

                for (const e of te.entryLocationSet) {
                    assert.ok(te.transitionsFrom(e).length > 0);
                }
            });
        });
    });
});
