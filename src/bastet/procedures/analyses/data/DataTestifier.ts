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

import {TestificationOperator} from "../ProgramAnalysis";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {AccessibilityRelation, AccessibilityRelations} from "../Accessibility";
import {ConcreteElement, ConcreteMemory} from "../../domains/ConcreteElements";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {AssumeOperation, ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {BooleanFormula, FirstOrderFormula} from "../../../utils/ConjunctiveNormalForm";
import {
    BranchingAssumeStatement,
    StrengtheningAssumeStatement
} from "../../../syntax/ast/core/statements/AssumeStatement";
import {Set as ImmSet} from "immutable";
import {Preconditions} from "../../../utils/Preconditions";
import {AbstractStates, DelegatingStateVisitor} from "../AbstractStates";
import {
    AbstractBoolean,
    AbstractFloat,
    AbstractInteger,
    AbstractList,
    AbstractReal,
    AbstractString,
    TransformerTheories
} from "../../domains/MemoryTransformer";
import {VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {TypedDataLocation} from "../../../syntax/app/controlflow/DataLocation";
import {BooleanType} from "../../../syntax/ast/core/ScratchType";
import {DataAbstractDomain, DataAbstractState} from "./DataAbstractDomain";
import {getAtMostOneElement, getTheOnlyElement} from "../../../utils/Collections";
import {DataTransformerVisitor} from "./DataTransformerVisitor";
import {AbstractionState} from "../abstraction/AbstractionAbstractDomain";
import {AbstractionStateStates} from "../abstraction/AbstractionStates";
import {DataAbstractStates} from "./DataAbstractStates";
import {SSAAbstractStates} from "../ssa/SSAAbstractStates";
import {ThreadState} from "../control/ConcreteProgramState";

class BranchingAlternative {

    public readonly work: AbstractState;
    public readonly branchStart: AbstractState;
    public readonly branchName : string;
    public readonly branchCondition: BooleanFormula;
    public readonly branchPredicate: BooleanFormula;
    public readonly branchPredicateEquiv: BooleanFormula;

    constructor(work: AbstractState, branchStart: AbstractState, branchName: string,
                branchCondition: BooleanFormula, branchPredicate: BooleanFormula, branchPredicateEquiv: BooleanFormula) {
        this.work = work;
        this.branchStart = branchStart;
        this.branchName = branchName;
        this.branchCondition = branchCondition;
        this.branchPredicate = branchPredicate;
        this.branchPredicateEquiv = branchPredicateEquiv;
    }

}

class BranchingAlternatives {

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

class ConditionalBranch {

    public readonly splitState: AbstractState;

    public readonly branchStart: AbstractState;

    public readonly branchEnd: AbstractState;

    public readonly branchAssumes: StrengtheningAssumeStatement[];

    constructor(splitState: AbstractState, branchStart: AbstractState, branchEnd: AbstractState, branchAssumes: StrengtheningAssumeStatement[]) {
        this.splitState = splitState;
        this.branchStart = branchStart;
        this.branchEnd = branchEnd;
        this.branchAssumes = branchAssumes;
    }

}

class StateFormulaVisitor extends DelegatingStateVisitor<BooleanFormula> {

    protected defaultResultFor(element: AbstractElement): BooleanFormula {
        return null;
    }

    visitDataAbstractState(state: DataAbstractState): BooleanFormula {
        return state.blockFormula;
    }

}

export class DataTestifier implements TestificationOperator<AbstractState, AbstractState, ConcreteMemory> {

    protected readonly _theories: TransformerTheories<AbstractBoolean, AbstractBoolean, AbstractInteger,
        AbstractReal, AbstractFloat, AbstractString, AbstractList>;
    private readonly _domain: DataAbstractDomain;

    constructor(theories: TransformerTheories<AbstractBoolean, AbstractBoolean, AbstractInteger, AbstractReal, AbstractFloat, AbstractString, AbstractList>,
                abstractDomain: DataAbstractDomain) {
        this._theories = Preconditions.checkNotUndefined(theories);
        this._domain = Preconditions.checkNotUndefined(abstractDomain);
    }

    testify(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): AccessibilityRelation<AbstractState> {
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
    private testifyOneIncludeConcrete(accessibility: AccessibilityRelation<AbstractState>,
                                     targetState: AbstractState): [AccessibilityRelation<AbstractState>, Iterable<[AbstractState, ConcreteMemory][]>] {
        const alternatives = this.determineBranchingAlternatives(accessibility, targetState);

        // Create the branching formula
        let branchingFormula: BooleanFormula = this._theories.boolTheory.trueBool();
        for (const a of alternatives.elements) {
            branchingFormula = this._theories.boolTheory.and(branchingFormula, a.branchPredicateEquiv);
        }
        Object.freeze(branchingFormula);

        // Extract the trace formula
        const traceFormula: BooleanFormula = this.recoverTraceFormula(accessibility, targetState);

        // Build the path-choice query
        const choiceQuery = this._theories.boolTheory.and(traceFormula, branchingFormula);

        // Get one satisfying assignment (model of the choiceQuery formula)
        const satAssignement: ConcreteMemory = this._domain.folDomain.concretizeOne(choiceQuery);
        Preconditions.checkNotUndefined(satAssignement);

        // Testify the accessibility relation based on the model for the `choiceQuery` formula
        // - make sure to return the empty accessibility relation in case the formula is infeasible
        const result: AccessibilityRelation<AbstractState> = this.strenghtenRelation(
            accessibility, alternatives, satAssignement, targetState);

        const concreteSeq: Iterable<[AbstractState, ConcreteMemory][]> = [this.buildConcreteStateSeq(result, satAssignement)];

        // return the result (strengthened accessibility relation)
        return [result, concreteSeq];
    }

    public testifyOne(accessibility: AccessibilityRelation<AbstractState>, targetState: AbstractState): AccessibilityRelation<AbstractState> {
        return this.testifyOneIncludeConcrete(accessibility, targetState)[0];
    }

    private determineBranchingAlternatives(accessibility: AccessibilityRelation<AbstractState>, targetState: AbstractState): BranchingAlternatives {
        const initialState: AbstractState = getTheOnlyElement(accessibility.initial());
        const worklist: AbstractState[] = [initialState];
        const result: BranchingAlternatives = new BranchingAlternatives();
        const visited: ImmSet<AbstractState> = ImmSet<AbstractState>().asMutable();

        while (worklist.length > 0) {
            const work = worklist.pop();

            if (!visited.has(work)) {
                for (const condBranch of this.getBranchingTo(accessibility, work)) {
                    const branchName: string = this.createBranchName(condBranch.splitState, condBranch.branchStart);
                    const branchCondition: BooleanFormula = this.createBranchCondition(condBranch.branchAssumes);
                    const branchPredicate: BooleanFormula = this.createBranchPredicate(branchName);
                    const branchPredicateEquiv: BooleanFormula = this.createBranchEquivPredicate(branchPredicate, branchCondition);
                    if (condBranch.branchAssumes.length > 0) {
                        result.push(new BranchingAlternative(work, condBranch.branchStart, branchName, branchCondition, branchPredicate, branchPredicateEquiv));
                        worklist.push(condBranch.branchEnd);
                    }
                }
            }

            visited.add(work);
        }

        return result;
    }

    private getBranchingTo(ar: AccessibilityRelation<AbstractState>, from: AbstractState): ConditionalBranch[] {
        const nextSplit = this.getNextSplitState(ar, from);
        if (!nextSplit) {
            return [];
        }

        const worklist: ConditionalBranch[] = [];
        const result: ConditionalBranch[] = [];

        for (const start of ar.successorsOf(nextSplit)) {
            // TODO: Refactor. Redundant compared to the loop below
            const transAssumes = this.filterAssumes(this.getTransitionLabels(ar, nextSplit, start).map(([ts, op]) => op));
            worklist.push(new ConditionalBranch(nextSplit, start, start, transAssumes));
        }

        while(worklist.length > 0) {
            const work: ConditionalBranch = worklist.pop();
            const succs = ar.successorsOf(work.branchEnd);
            if (succs.length == 0 || succs.length > 1) {
                result.push(work);
            } else {
                for (const succ of succs) {
                    const transAssumes = this.filterAssumes(this.getTransitionLabels(ar, work.branchEnd, succ).map(([ts, op]) => op));
                    worklist.push(new ConditionalBranch(nextSplit, work.branchStart, succ, work.branchAssumes.concat(transAssumes)));
                }
            }
        }

        return result;
    }

    private getNextSplitState(ar: AccessibilityRelation<AbstractState>, from: AbstractState): AbstractState | null {
       const worklist: AbstractState[] = [];
       worklist.push(from);
       while (worklist.length > 0) {
           const work = worklist.pop();
           const succs = ar.successorsOf(work);
           if (succs.length > 1) {
               return work;
           }
           if (succs.length != 0) {
               worklist.push(getTheOnlyElement(succs));
           }
       }

       return null;
    }

    private filterAssumes(ops: ProgramOperation[]): BranchingAssumeStatement[] {
        const result: BranchingAssumeStatement[] = [];

        // We might transform some of the ops to AssumeOperation here
        for (const op of ops) {
            if (op instanceof AssumeOperation) {
                result.push(new BranchingAssumeStatement((op as AssumeOperation).expression));
            } else if (op.ast instanceof BranchingAssumeStatement) {
                result.push(op.ast);
            }
        }

        return result;
    }

    testifyConcrete(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): Iterable<[AbstractState, ConcreteMemory][]> {
        throw new ImplementMeException();
    }

    testifyConcreteOne(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): Iterable<[AbstractState, ConcreteMemory][]> {
        return this.testifyOneIncludeConcrete(accessibility, state)[1];
    }

    /**
     * Get the program operations with SCOPES and SSA indices.
     */
    private getTransitionLabels(ar: AccessibilityRelation<AbstractState>, from: AbstractState, to: AbstractState): [ThreadState, ProgramOperation][] {
        return ar.labeler().getTransitionLabel(from, to);
    }

    private createBranchName(state: AbstractState, branchStartState: AbstractState): string {
        const stateId = AbstractStates.extractStateId(state);

        // Extract the id of the state immediately after `work` the branch starts with
        const branchStartStateId = AbstractStates.extractStateId(branchStartState);

        return `_BRANCH_${stateId}_${branchStartStateId}`;
    }

    private createBranchCondition(assumes: StrengtheningAssumeStatement[]): BooleanFormula {
        let result: BooleanFormula = this._theories.boolTheory.trueBool();

        // TODO: SSA indicies have to be present in the assumes!
        for (const stmt of assumes) {
            const visitor = new DataTransformerVisitor(result, this._theories);
            result = stmt.accept(visitor);
        }

        return result;
    }

    private createBranchPredicate(branchName: string): BooleanFormula {
        return this._theories.boolTheory.abstractBooleanValue(
            new VariableWithDataLocation(new TypedDataLocation(branchName, BooleanType.instance().typeId)));
    }

    private createBranchEquivPredicate(branchPredicate: BooleanFormula, branchCondition: BooleanFormula): BooleanFormula {
        return this._theories.boolTheory.equal(branchCondition, branchPredicate);
    }

    private recoverTraceFormula(accessibility: AccessibilityRelation<AbstractState>, targetState: AbstractState): BooleanFormula {
        const wideningStates: AbstractState[] = AccessibilityRelations.getWidenedSequence(accessibility, targetState);
        const unalignedFormulas: FirstOrderFormula[] = wideningStates
            .map(e => getTheOnlyElement(DataAbstractStates.extractFrom(e)).blockFormula);

        if (unalignedFormulas.length == 1) {
            return getTheOnlyElement(unalignedFormulas);
        } else {
            const alignedBlockFormulas: FirstOrderFormula[] = this.alignSsaIndices(wideningStates, unalignedFormulas);
            return alignedBlockFormulas.reduce((f, r) => this._theories.boolTheory.and(f, r),
                this._theories.boolTheory.trueBool());
        }
    }

    private alignSsaIndices(wideningStateSeq: AbstractState[], blockFormulas: FirstOrderFormula[]): FirstOrderFormula[] {
        Preconditions.checkArgument(wideningStateSeq.length == blockFormulas.length);
        const ssaMaps = wideningStateSeq.map((e) => new Map(getTheOnlyElement(SSAAbstractStates.extractFrom(e)).getSSA()));
        return this._theories.alignSsaIndices(blockFormulas, ssaMaps);
    }

    private strenghtenRelation(accessibility: AccessibilityRelation<AbstractState>,
                               alternatives: BranchingAlternatives, satAssignement: ConcreteMemory,
                               targetState: AbstractState): AccessibilityRelation<AbstractState> {
        const result = AccessibilityRelations.filterForwards(accessibility, (s1, s2) => {
            const branchName = this.createBranchName(s1, s2);
            const assignement = satAssignement.booleans.get(branchName);
            if (assignement !== undefined) {
                if (assignement.value) {
                    return true;
                } else {
                    return false;
                }
            }

            return true;
        });

        Preconditions.checkState(result.isReachable(targetState), "The target state must be reachable in the strengthened relation!");
        return result;
    }

    private buildConcreteStateSeq(result: AccessibilityRelation<AbstractState>, satAssignement: ConcreteMemory): [AbstractState, ConcreteMemory][] {
        return AccessibilityRelations.toSequence(result).map(e => [e, satAssignement]);
    }
}
