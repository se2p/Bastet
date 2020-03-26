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

import {AbstractElement} from "../../lattices/Lattice";
import {ProgramOperation, ProgramOperationFactory} from "../../syntax/app/controlflow/ops/ProgramOperation";
import {Concern} from "../../syntax/Concern";
import {IllegalStateException} from "../../core/exceptions/IllegalStateException";
import {Preconditions} from "../../utils/Preconditions";
import {Statement} from "../../syntax/ast/core/statements/Statement";
import {TransitionRelation} from "../../syntax/app/controlflow/TransitionRelation";
import {LocationId} from "../../syntax/app/controlflow/ControlLocation";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {Record as ImmRec, Set as ImmSet} from "immutable";
import {SignalTargetReachedStatement} from "../../syntax/ast/core/statements/InternalStatement";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";

export interface TransferRelation<E extends AbstractElement> {

    abstractSucc(fromState: E): Iterable<E>;

}

export interface LabeledTransferRelation<E extends AbstractElement> extends TransferRelation<E>{

    abstractSuccFor(fromState: E, op: ProgramOperation, co: Concern): Iterable<E>;

}

export class Transfers {

    public static withIntermediateTransfersBefore<W extends AbstractElement>(
        transferRealtion: LabeledTransferRelation<W>, fromState: W,
        intermediateStmts: Statement[], ops: ProgramOperation[], co: Concern): W[] {

        let toRun: ProgramOperation[] = [];
        for (const stmt of intermediateStmts) {
            const timeOp: ProgramOperation = ProgramOperationFactory.createFor(stmt);
            toRun.push(timeOp);
        }
        toRun = toRun.concat(ops);

        return Transfers.withIntermediateOps(transferRealtion, fromState, toRun, co);
    }

    public static withIntermediateOps<W extends AbstractElement>(
        transferRealtion: LabeledTransferRelation<W>, fromState: W, ops: Iterable<ProgramOperation>, co: Concern): W[] {

        let result: W[] = [fromState];
        for (const toExecute of ops) {
            let statelistPrime: W[] = [];
            for (const w of result) {
                for (const succ of transferRealtion.abstractSuccFor(w, toExecute, co)) {
                    statelistPrime.push(succ);
                }
            }
            result = statelistPrime;
        }

        return result;
    }

    /**
     * ATTENTION: We assume that the given transition relation `tr` does not have loops!
     */
    public static transferAlongTransitionSystem<W extends AbstractElement>(
        abstractSucc: LabeledTransferRelation<W>, fromState: W, tr: TransitionRelation,
        fromLocation: LocationId, co: Concern, opMapper?: (op: ProgramOperation) => ProgramOperation): [W, boolean][] {

        let frontier: [LocationId, ImmSet<LocationId>, W, boolean][] = [[fromLocation, ImmSet([fromLocation]), fromState, false]];

        let hasRemainingSteps: boolean;
        do {
            hasRemainingSteps = false;
            let frontierPrime: [LocationId, ImmSet<LocationId>, W, boolean][] = [];
            for (const [loc, visited, e, targetReached] of frontier) {
                const transitions = tr.transitionsFrom(loc);
                if (transitions.length == 0) {
                    frontierPrime.push([loc, visited, e, targetReached]);
                } else {
                    hasRemainingSteps = true;
                    for (const t of transitions) {
                        if (visited.contains(t.target)) {
                            throw new IllegalArgumentException("Loops not allowed for this style of transfers!");
                        }

                        let op = ProgramOperation.for(t.opId);
                        if (opMapper) {
                            op = opMapper(op);
                        }
                        const succs = Array.from(abstractSucc.abstractSuccFor(e, op, co));
                        frontierPrime = frontierPrime.concat(succs.map((s) =>
                            [t.target, visited.union([t.target]), s,
                                targetReached || op instanceof SignalTargetReachedStatement]));
                    }
                }
            }

            frontier = frontierPrime;
        } while (hasRemainingSteps);

        return frontier.map(([l,v, w, t]) => [w, t]);
    }

}

export class LabeledTransferRelationImpl<E extends AbstractElement> implements LabeledTransferRelation<any> {

    private readonly _abstractSucc: (fromState: E) => Iterable<E>;

    private readonly _abstractSuccFor: (fromState: E, op: ProgramOperation, co: Concern) => Iterable<E>;

    constructor(abstractSucc: (fromState: E) => Iterable<E>, abstractSuccFor: (fromState: E, op: ProgramOperation, co: Concern) => Iterable<E>) {
        this._abstractSuccFor = Preconditions.checkNotUndefined(abstractSuccFor);
        this._abstractSucc = abstractSucc;
    }

    abstractSucc(fromState: E): Iterable<E> {
        if (!this._abstractSucc) {
            throw new IllegalStateException("This transfer is intended to be used with labels only!");
        }
        return this._abstractSucc(fromState);
    }

    abstractSuccFor(fromState: E, op: ProgramOperation, co: Concern): Iterable<E> {
        return this._abstractSuccFor(fromState, op, co);
    }

    public static from<E extends AbstractElement>(tr: LabeledTransferRelation<E>) {
        return new LabeledTransferRelationImpl<E>((e) => tr.abstractSucc(e),
            (e, op, co) => tr.abstractSuccFor(e, op, co));

    }

}
