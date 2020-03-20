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

import {AbstractDomain} from "../domains/AbstractDomain";
import {AbstractElement, AbstractState} from "../../lattices/Lattice";
import {App} from "../../syntax/app/App";
import {ConcreteElement} from "../domains/ConcreteElements";
import {ProgramOperation} from "../../syntax/app/controlflow/ops/ProgramOperation";
import {Refiner} from "./Refiner";
import {Property} from "../../syntax/Property";
import {StateSet} from "../algorithms/StateSet";
import {Concern} from "../../syntax/Concern";
import {LabeledTransition} from "./graph/GraphPath";
import {LabeledTransferRelation} from "./TransferRelation";

export interface ProgramAnalysis<C extends ConcreteElement, E extends AbstractElement, F extends AbstractState>
   extends AbstractSuccOperator<E>,
       JoinOperator<E>, TargetOperator<E>, MergeIntoOperator<E, F>,
       MergeOperator<E>, StopOperator<E, F>, WidenOperator<E>, PartitionOperator<E, F> {

    abstractDomain: AbstractDomain<C, E>;

    refiner: Refiner<E>;

    initialStatesFor(task: App): E[];

    createStateSets(): [StateSet<F>, StateSet<F>];

}

export interface PartitionOperator<E extends AbstractElement, F extends AbstractState> {

    partitionOf(ofState: E, reached: StateSet<F>): Iterable<F>;

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

    mergeInto(state: E, frontier: StateSet<F>, reached: StateSet<F>, unwrapper: (AbstractElement) => E, wrapper: (E) => AbstractElement): [StateSet<F>, StateSet<F>];

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

export interface ProgramAnalysisWithLabels<C extends ConcreteElement, E extends AbstractElement, F extends AbstractState>
    extends ProgramAnalysis<C, E, F>, LabeledTransferRelation<E> {

    abstractSuccFor(fromState: E, op: ProgramOperation, co: Concern): Iterable<E>;

}

export interface TransitionLabelProvider<E extends AbstractElement> {

    getTransitionLabel(from: E, to: E): ProgramOperation[];

}

export interface ProgramAnalysisWithLabelProducer<C extends ConcreteElement, E extends AbstractElement, F extends AbstractState>
    extends ProgramAnalysis<C, E, F>, TransitionLabelProvider<E> {

    getTransitionLabel(from: E, to: E): ProgramOperation[];

}

export interface WrappingProgramAnalysis<C extends ConcreteElement, E extends AbstractElement, F extends AbstractState>
    extends ProgramAnalysis<C, E, F> {

    wrappedAnalysis: ProgramAnalysis<any, any, F>;

}

