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

import {TestificationOperator, TransitionLabelProvider} from "../ProgramAnalysis";
import {AbstractState} from "../../../lattices/Lattice";
import {AccessibilityRelation} from "../Accessibility";
import {ConcreteElement} from "../../domains/ConcreteElements";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {AssumeOperation, ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {BooleanFormula} from "../../../utils/ConjunctiveNormalForm";
import {AssumeStatement} from "../../../syntax/ast/core/statements/AssumeStatement";
import {BooleanExpression} from "../../../syntax/ast/core/expressions/BooleanExpression";
import {Preconditions} from "../../../utils/Preconditions";
import {AbstractStates} from "../AbstractStates";

export type StateId = number;

export class DataTestifier implements TestificationOperator<AbstractState, AbstractState> {

    testify(accessibility: AccessibilityRelation<AbstractState, AbstractState>, state: AbstractState): AccessibilityRelation<AbstractState, AbstractState> {
        throw new ImplementMeException();
    }

    /**
     * We assume that the accessibility relation has already been restricted by one of the outer
     * analyses (for example, the `GraphAnalysis`).
     * That is, we can conduct a forwards traversal on the given relation `accessibility` and
     * will reach the state `targetState` on each path in the relation.
     *
     * @param accessibility
     * @param targetState
     */
    testifyOne(accessibility: AccessibilityRelation<AbstractState, AbstractState>, targetState: AbstractState): AccessibilityRelation<AbstractState, AbstractState> {
        const initialState: AbstractState = this.getInitialState(accessibility);
        const worklist : AbstractState[] = [ initialState ];
        const branchings: [string, BooleanFormula][] = [];

        while (worklist.length > 0) {
            const work = worklist.pop();

            for (const [branchStartState, assumes, succ] of this.getBranchingTo(accessibility, work)) {
                Preconditions.checkArgument(assumes.length > 0);

                const branchName: string = this.createBranchName(work, branchStartState);
                const branchCondition: BooleanFormula = this.createBranchCondition(assumes);

                worklist.push(succ);
            }
        }

        throw new ImplementMeException();
    }

    private getBranchingTo(ar: AccessibilityRelation<AbstractState, AbstractState>, from: AbstractState): [AbstractState, AssumeOperation[], AbstractState][] {
        throw new ImplementMeException();
    }

    private filterAssumes(ops: ProgramOperation[]): AssumeOperation[] {
        // We might transform some of the ops to AssumeOperation here
        throw new ImplementMeException();
    }

    testifyConcrete(accessibility: AccessibilityRelation<AbstractState, AbstractState>, state: AbstractState): Iterable<ConcreteElement[]> {
        throw new ImplementMeException();
    }

    testifyConcreteOne(accessibility: AccessibilityRelation<AbstractState, AbstractState>, state: AbstractState): Iterable<ConcreteElement[]> {
        throw new ImplementMeException();
    }

    /**
     * Get the program operations with SCOPES and SSA indices.
     */
    private getTransitionLabels(ar: AccessibilityRelation<AbstractState, AbstractState>, from: AbstractState, to: AbstractState): ProgramOperation[] {
        throw new ImplementMeException();
    }

    private getInitialState(accessibility: AccessibilityRelation<AbstractState, AbstractState>): AbstractState {
        throw new ImplementMeException();

    }

    private createBranchName(state: AbstractState, branchStartState: AbstractState) {
        const stateId = AbstractStates.extractStateId(state);

        // Extract the id of the state immediately after `work` the branch starts with
        const branchStartStateId = AbstractStates.extractStateId(branchStartState);

        return `_BRANCH_${stateId}_${branchStartStateId}`;
    }
}
