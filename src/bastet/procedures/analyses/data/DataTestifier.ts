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
import {ConcreteElement, ConcreteMemory} from "../../domains/ConcreteElements";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {AssumeOperation, ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {BooleanFormula} from "../../../utils/ConjunctiveNormalForm";
import {AssumeStatement} from "../../../syntax/ast/core/statements/AssumeStatement";
import {BooleanExpression} from "../../../syntax/ast/core/expressions/BooleanExpression";
import {Preconditions} from "../../../utils/Preconditions";
import {AbstractStates} from "../AbstractStates";
import {
    AbstractBoolean,
    AbstractFloat,
    AbstractInteger, AbstractList,
    AbstractReal, AbstractString,
    TransformerTheories
} from "../../domains/MemoryTransformer";
import {VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {TypedDataLocation} from "../../../syntax/app/controlflow/DataLocation";
import {BooleanType} from "../../../syntax/ast/core/ScratchType";
import {DataAbstractDomain} from "./DataAbstractDomain";

export class BranchingAlternative {

    private readonly _work: AbstractState;
    private readonly _branchStart: AbstractState;
    private readonly _branchName : string;
    private readonly _branchCondition: BooleanFormula;
    private readonly _branchPredicate: BooleanFormula;
    private readonly _branchPredicateEquiv: BooleanFormula;

    constructor(work: AbstractState, branchStart: AbstractState, branchName: string,
                branchCondition: BooleanFormula, branchPredicate: BooleanFormula, branchPredicateEquiv: BooleanFormula) {
        this._work = work;
        this._branchStart = branchStart;
        this._branchName = branchName;
        this._branchCondition = branchCondition;
        this._branchPredicate = branchPredicate;
        this._branchPredicateEquiv = branchPredicateEquiv;
    }

    get startState(): AbstractState {
        return this._work;
    }

    get branchStart(): AbstractState {
        return this._branchStart;
    }

    get branchName(): string {
        return this._branchName;
    }

    get branchCondition(): BooleanFormula {
        return this._branchCondition;
    }

    get branchPredicate(): BooleanFormula {
        return this._branchPredicate;
    }

    get branchPredicateEquiv(): BooleanFormula {
        return this._branchPredicateEquiv;
    }
}

export class BranchingAlternatives {

    private readonly _alternatives: BranchingAlternative[];

    constructor() {
        this._alternatives = [];
    }

    push(alternative: BranchingAlternative) {
        this._alternatives.push(alternative);
    }

    get elements(): BranchingAlternative[] {
        return this._alternatives.slice();
    }
}

export class DataTestifier implements TestificationOperator<AbstractState, AbstractState> {

    protected readonly _theories: TransformerTheories<AbstractBoolean, AbstractBoolean, AbstractInteger,
        AbstractReal, AbstractFloat, AbstractString, AbstractList>;
    private readonly _domain: DataAbstractDomain;

    constructor(theories: TransformerTheories<AbstractBoolean, AbstractBoolean, AbstractInteger, AbstractReal, AbstractFloat, AbstractString, AbstractList>,
                abstractDomain: DataAbstractDomain) {
        this._theories = Preconditions.checkNotUndefined(theories);
        this._domain = Preconditions.checkNotUndefined(abstractDomain);
    }

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
        const alternatives = this.determineBranchingAlternatives(accessibility, targetState);

        // Create the branching formula
        let branchingFormula: BooleanFormula = this._theories.boolTheory.trueBool();
        for (const a of alternatives.elements) {
            branchingFormula = this._theories.boolTheory.and(branchingFormula, a.branchCondition);
        }
        Object.freeze(branchingFormula);

        // Extract the trace formula
        const traceFormula: BooleanFormula = this.recoverTraceFormula(accessibility, targetState);

        // Build the path-choice query
        const choiceQuery = this._theories.boolTheory.and(traceFormula, branchingFormula);

        // Get one satisfying assignment (model of the choiceQuery formula)
        const satAssignement: ConcreteMemory = this._domain.folDomain.concretizeOne(choiceQuery);

        // Testify the accessibility relation based on the model for the `choiceQuery` formula
        // - make sure to return the empty accessibility relation in case the formula is infeasible
        const result: AccessibilityRelation<AbstractState, AbstractState> = this.strenghtenRelation(accessibility, alternatives, satAssignement);

        // return the result (strengthened accessibility relation)
        return result;
    }

    private determineBranchingAlternatives(accessibility: AccessibilityRelation<AbstractState, AbstractState>, targetState: AbstractState): BranchingAlternatives {
        const initialState: AbstractState = this.getInitialState(accessibility);
        const worklist: AbstractState[] = [initialState];
        const result: BranchingAlternatives = new BranchingAlternatives();

        while (worklist.length > 0) {
            const work = worklist.pop();

            for (const [branchStartState, assumes, succ] of this.getBranchingTo(accessibility, work)) {
                Preconditions.checkArgument(assumes.length > 0);

                const branchName: string = this.createBranchName(work, branchStartState);
                const branchCondition: BooleanFormula = this.createBranchCondition(assumes);
                const branchPredicate: BooleanFormula = this.createBranchPredicate(branchName);
                const branchPredicateEquiv: BooleanFormula = this.createBranchEquivPredicate(branchPredicate, branchCondition);
                result.push(new BranchingAlternative(work, branchStartState, branchName, branchCondition, branchPredicate, branchPredicateEquiv));

                worklist.push(succ);
            }
        }

        return result;
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

    private createBranchCondition(assumes: AssumeOperation[]): BooleanFormula {
        throw new ImplementMeException();
    }

    private createBranchPredicate(branchName: string): BooleanFormula {
        return this._theories.boolTheory.abstractBooleanValue(
            new VariableWithDataLocation(new TypedDataLocation(branchName, BooleanType.instance().typeId)));
    }

    private createBranchEquivPredicate(branchPredicate: BooleanFormula, branchCondition: BooleanFormula): BooleanFormula {
        return this._theories.boolTheory.equal(branchCondition, branchPredicate);
    }

    private recoverTraceFormula(accessibility: AccessibilityRelation<AbstractState, AbstractState>, targetState: AbstractState): BooleanFormula {
        throw new ImplementMeException();
    }

    private strenghtenRelation(accessibility: AccessibilityRelation<AbstractState, AbstractState>,
                               alternatives: BranchingAlternatives, satAssignement: ConcreteMemory): AccessibilityRelation<AbstractState, AbstractState> {
        throw new ImplementMeException();
    }
}
