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

import {AbstractDomain} from "../domains/AbstractDomain";
import {AbstractElement, AbstractState} from "../../lattices/Lattice";
import {App} from "../../syntax/app/App";
import {ConcreteElement} from "../domains/ConcreteElements";
import {ProgramOperation} from "../../syntax/app/controlflow/ops/ProgramOperation";
import {Refiner} from "./Refiner";
import {Property} from "../../syntax/Property";
import {FrontierSet, ReachedSet, StateOrderComparator, StatePartitionOperator} from "../algorithms/StateSet";
import {LabeledTransferRelation} from "./TransferRelation";
import {WitnessHandler} from "./WitnessHandlers";
import {LexiKey} from "../../utils/Lexicographic";
import {AccessibilityRelation} from "./Accessibility";
import {NotSupportedException} from "../../core/exceptions/NotSupportedException";

/**
 * Central program analysis component---sometimes called `state interpreter`.
 *
 * See the following papers:
 *  - "Verified from Scratch: Program Analysis for Learners’ Programs"
 *  - "Configurable software verification: Concretizing the convergence of model checking and program analysis"
 */
export interface ProgramAnalysis<C extends ConcreteElement, E extends AbstractElement, F extends AbstractState>
   extends InitOperator<E, F>, AbstractSuccOperator<E>,
       TargetOperator<E>, MergeIntoOperator<E, F>,
       MergeOperator<E>, StopOperator<E, F>, WidenOperator<E, F>, PartitionOperator<E, F>,
       WitnessHandler<F>, TraversalOrderOperator<E, F>, ResultFinalization<F>,
       TestificationOperator<E, F>, AccessibilityOperator<E, F> {

    /**
     * The abstract domain the analysis works with.
     * Defines the mapping between sets of concrete program states and abstract states.
     */
    abstractDomain: AbstractDomain<C, E>;

    /**
     * A refiner component for abstraction precision refinement.
     */
    refiner: Refiner<F>;

}

export interface AccessibilityOperator<E extends AbstractElement, F extends AbstractState> {

    accessibility(reached: ReachedSet<F>, state: F): AccessibilityRelation<F>;

}

/**
 * A program analysis (state interpreter) that is aware of labels on control
 * transitions (a labelled transition system is constructed).
 */
export interface ProgramAnalysisWithLabels<C extends ConcreteElement, E extends AbstractElement, F extends AbstractState>
    extends ProgramAnalysis<C, E, F>, LabeledTransferRelation<E>, TransitionLabelProvider<E> {

}

/**
 * A program analysis (state interpreter) that wraps another state interpreter,
 * typically resulting in wrapped (nested) abstract states.
 */
export interface WrappingProgramAnalysis<C extends ConcreteElement, E extends AbstractElement, F extends AbstractState>
    extends ProgramAnalysis<C, E, F> {

    /**
     * The wrapped program analysis (state interpreter)
     */
    wrappedAnalysis: ProgramAnalysis<any, any, F>;

}

/**
 * State set initialization operator.
 */
export interface InitOperator<E extends AbstractElement, F extends AbstractState> {

    /**
     * Define the initial abstract states for the given analysis task.
     *
     * @param task
     */
    initialStatesFor(task: App): E[];

    /**
     * Create the instances of the sets `frontier` and `reached`.
     * Different analyses might prefer different set data structures.
     */
    createStateSets(): [FrontierSet<F>, ReachedSet<F>];

}

/**
 * Testification operator. The testification concept is described in the paper
 *  "Witness validation and stepwise testification across software verifiers".
 */
export interface TestificationOperator<E extends AbstractElement, F extends AbstractState> {

    /**
     * Refine the given accessibility relation `accessibility` such that the given
     * target state `target` (still) can be reached.
     *
     * The resulting accessibility relation might be empty in case the
     * state `state` is infeasible.
     *
     * @param accessibility
     * @param state
     */
    testify(accessibility: AccessibilityRelation<F>, state: F): AccessibilityRelation<F>;

    /**
     * Guarantees to return at most one abstract path.
     *
     * @param accessibility
     * @param state
     */
    testifyOne(accessibility: AccessibilityRelation<F>, state: F): AccessibilityRelation<F>;

    testifyConcrete(accessibility: AccessibilityRelation<F>, state: F): Iterable<ConcreteElement[]>;

    /**
     * Guaratnees to return at most one concrete path.
     *
     * @param accessibility
     * @param state
     */
    testifyConcreteOne(accessibility: AccessibilityRelation<F>, state: F): Iterable<ConcreteElement[]>;

}

export interface ResultFinalization<F extends AbstractState> {

    /**
     * The operator to call after the actual analysis finished.
     * To summarize results and produce them as output.
     *
     * @param frontier
     * @param reached
     */
    finalizeResults(frontier: FrontierSet<F>, reached: ReachedSet<F>);

}

/**
 * Collection of state-set partitioning operators for efficient algorithms.
 */
export interface PartitionOperator<E extends AbstractElement, F extends AbstractState>
   extends StatePartitionOperator<E> {

    /**
     * Determines the partition of states to consider for widening a given state.
     *
     * @param ofState
     * @param reached
     */
    widenPartitionOf(ofState: E, reached: ReachedSet<F>): Iterable<F>;

    /**
     * Determines the partition of states to consider for checking for coverage.
     *
     * @param ofState
     * @param reached
     */
    stopPartitionOf(ofState: E, reached: ReachedSet<F>): Iterable<F>;

    /**
     * Determine the partitions of states to consider for merging the abstract state space.
     *
     * @param ofState
     * @param reached
     */
    mergePartitionOf(ofState: E, reached: ReachedSet<F>): Iterable<F>;

}

export interface TraversalOrderOperator<E extends AbstractElement, F extends AbstractState>
    extends StateOrderComparator<E> {

    /**
     * Get a lexicographic key for ordering the set of frontier stats.
     * Determines the traversal strategy of the analysis.
     *
     * @param ofState
     */
    getLexiOrderKey(ofState: E): LexiKey;

    /**
     * Determines a key for ensuring progress of the analysis
     * by conduct a round-robin-strategy between the different partitions.
     *
     * @param ofState
     */
    getLexiDiffKey(ofState: E): LexiKey;

}

export interface AbstractSuccOperator<E extends AbstractElement> {

    /**
     * Compute a collection of abstract successor states for a given abstract state.
     *
     * @param fromState
     */
    abstractSucc(fromState: E): Iterable<E>;

}

export interface TargetOperator<E extends AbstractElement> {

    /**
     * Determine the possibly empty set of properties that are considered
     * reached (violated) for the given abstract state.
     *
     * @param state
     */
    target(state: E): Property[];

}

export interface MergeIntoOperator<E extends AbstractElement, F extends AbstractState> {

    /**
     * Merge (or not) a given abstract state into the set of already reached states,
     * possibly also modifying the set of frontier states.
     *
     * Typically, a wrapper around an operator of type `MergeOperator`.
     *
     * @param state
     * @param frontier
     * @param reached
     * @param unwrapper
     * @param wrapper
     */
    mergeInto(state: E, frontier: FrontierSet<F>, reached: ReachedSet<F>,
              unwrapper: (AbstractElement) => E, wrapper: (E) => AbstractElement): [FrontierSet<F>, ReachedSet<F>];

}

export interface MergeOperator<E extends AbstractElement> {

    /**
     * Should the given pair of abstract states be merged?
     *
     * @param state1: The newly discovered abstract state.
     * @param state2: The state that has already been reached.
     */
    shouldMerge(state1: E, state2: E): boolean;

    /**
     * Merge two abstact states into a new one that subsumes both of them.
     *
     * @param state1
     * @param state2
     */
    merge(state1: E, state2: E): E;

}

export interface StopOperator<E extends AbstractElement, F extends AbstractState> {

    /**
     * Determine if the state-space exploration should be stopped for
     * the given abstract state (not added to the set of frontier states---the worklist---anymore).
     *
     * @param state
     * @param reached
     * @param unwrapper
     */
    stop(state: E, reached: Iterable<F>, unwrapper: (F) => E): boolean;

}

export interface WidenOperator<E extends AbstractElement, F extends AbstractState> {

    /**
     * Perform a widening of the given abstract state.
     * The abstraction precision to use is determined by the operator itself,
     * possibly based on information from the abstract state `state`.
     *
     * @param state
     * @param reached
     */
    widen(state: E, reached: Iterable<F>): E;

    /**
     * Determine if a widening should be or was computed for a given
     * abstract state---note that the widening might have been computed but
     * no information might have been lost.
     */
    isWideningState(state: E): boolean;

}

export interface TransitionLabelProvider<E extends AbstractElement> {

    /**
     * Determine the labeling between two abstract states.
     *
     * @param from
     * @param to
     */
    getTransitionLabel(from: E, to: E): ProgramOperation[];

}

export class UnavailableTransitionLabelProvider<E extends AbstractState> implements TransitionLabelProvider<E> {

    getTransitionLabel(from: E, to: E): ProgramOperation[] {
        throw new NotSupportedException();
    }

}

