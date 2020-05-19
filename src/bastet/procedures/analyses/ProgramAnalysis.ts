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
import {Concern} from "../../syntax/Concern";
import {LabeledTransferRelation} from "./TransferRelation";
import {WitnessHandler} from "./WitnessHandlers";
import {LexiKey} from "../../utils/Lexicographic";
import {AccessibilityRelation} from "./Accessibility";
import {NotSupportedException} from "../../core/exceptions/NotSupportedException";

export interface ProgramAnalysis<C extends ConcreteElement, E extends AbstractElement, F extends AbstractState>
   extends AbstractSuccOperator<E>,
       JoinOperator<E>, TargetOperator<E>, MergeIntoOperator<E, F>,
       MergeOperator<E>, StopOperator<E, F>, WidenOperator<E>, PartitionOperator<E, F>,
       WitnessHandler<F>, TraversalOrderOperator<E, F>, ResultFinalization<F>,
       TestificationOperator<E, F> {

    abstractDomain: AbstractDomain<C, E>;

    refiner: Refiner<E>;

    initialStatesFor(task: App): E[];

    createStateSets(): [FrontierSet<F>, ReachedSet<F>];

}

export interface ProgramAnalysisWithLabels<C extends ConcreteElement, E extends AbstractElement, F extends AbstractState>
    extends ProgramAnalysis<C, E, F>, LabeledTransferRelation<E>,
        TransitionLabelProvider<E> {

}

export interface WrappingProgramAnalysis<C extends ConcreteElement, E extends AbstractElement, F extends AbstractState>
    extends ProgramAnalysis<C, E, F> {

    wrappedAnalysis: ProgramAnalysis<any, any, F>;

}

export interface TestificationOperator<E extends AbstractElement, F extends AbstractState> {

    testify(accessibility: AccessibilityRelation<E, F>, state: F): AccessibilityRelation<E, F>;

    /**
     * Guarantees to return at most one abstract path.
     *
     * @param accessibility
     * @param state
     */
    testifyOne(accessibility: AccessibilityRelation<E, F>, state: F): AccessibilityRelation<E, F>;

    testifyConcrete(accessibility: AccessibilityRelation<E, F>, state: F): Iterable<ConcreteElement[]>;

    /**
     * Guaratnees to return at most one concrete path.
     *
     * @param accessibility
     * @param state
     */
    testifyConcreteOne(accessibility: AccessibilityRelation<E, F>, state: F): Iterable<ConcreteElement[]>;

}

export interface ResultFinalization<F extends AbstractState> {

    finalizeResults(frontier: FrontierSet<F>, reached: ReachedSet<F>);

}

export interface PartitionOperator<E extends AbstractElement, F extends AbstractState>
   extends StatePartitionOperator<E> {

    partitionOf(ofState: E, reached: ReachedSet<F>): Iterable<F>;

}

export interface TraversalOrderOperator<E extends AbstractElement, F extends AbstractState>
    extends StateOrderComparator<E> {

    getLexiOrderKey(ofState: E): LexiKey;

}

export interface AbstractSuccOperator<E extends AbstractElement> {

    abstractSucc(fromState: E): Iterable<E>;

}

export interface JoinOperator<E extends AbstractElement> {

    join(state1: E, state2: E): E;

}

export interface TargetOperator<E extends AbstractElement> {

    target(state: E): Property[];

}

export interface MergeIntoOperator<E extends AbstractElement, F extends AbstractState> {

    mergeInto(state: E, frontier: FrontierSet<F>, reached: ReachedSet<F>, unwrapper: (AbstractElement) => E, wrapper: (E) => AbstractElement): [FrontierSet<F>, ReachedSet<F>];

}

export interface MergeOperator<E extends AbstractElement> {

    shouldMerge(state1: E, state2: E): boolean;

    merge(state1: E, state2: E): E;

}

export interface StopOperator<E extends AbstractElement, F extends AbstractState> {

    stop(state: E, reached: Iterable<F>, unwrapper: (F) => E): boolean;

}

export interface WidenOperator<E extends AbstractElement> {

    widen(state: E): E;

}

export interface TransitionLabelProvider<E extends AbstractElement> {

    getTransitionLabel(from: E, to: E): ProgramOperation[];

}

export class UnavailableTransitionLabelProvider<E extends AbstractState> implements TransitionLabelProvider<E> {

    getTransitionLabel(from: E, to: E): ProgramOperation[] {
        throw new NotSupportedException();
    }

}

