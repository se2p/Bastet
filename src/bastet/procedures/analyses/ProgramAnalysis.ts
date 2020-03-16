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
import {AbstractElement} from "../../lattices/Lattice";
import {App} from "../../syntax/app/App";
import {ConcreteElement} from "../domains/ConcreteElements";
import {ProgramOperation} from "../../syntax/app/controlflow/ops/ProgramOperation";
import {Refiner} from "./Refiner";
import {Property} from "../../syntax/Property";
import {StateSet} from "../algorithms/StateSet";
import {Concern} from "../../syntax/Concern";

export interface ProgramAnalysis<C extends ConcreteElement, E extends AbstractElement> {

    abstractDomain: AbstractDomain<C, E>;

    refiner: Refiner<E>;

    abstractSucc(fromState: E): Iterable<E>;

    merge(state1: E, state2: E): boolean;

    /**
     * Determine candidates to add (and possibly remove) from the sets `reached` and `frontier`
     * @param state
     * @param reached
     */
    // mergeIntoSets(state: E, reached: StateSet<E>): [Iterable<E>, Iterable<E>];

    /** Delegates to `join` of the abstract domain */
    join(state1: E, state2: E): E;

    stop(state: E, reached: Iterable<AbstractElement>, unwrapper: (AbstractElement) => E): boolean;

    widen(state: E): E;

    target(state: E): Property[];

    initialStatesFor(task: App): E[];

    wrapStateSets(frontier: StateSet<E>, reached: StateSet<E>): [StateSet<E>, StateSet<E>];

}

export interface ProgramAnalysisWithLabels<C extends ConcreteElement, E extends AbstractElement> extends ProgramAnalysis<C, E> {

    abstractSuccFor(fromState: E, op: ProgramOperation, co: Concern): Iterable<E>;

}

export interface TransitionLabelProvider<E extends AbstractElement> {

    getTransitionLabel(from: E, to: E): ProgramOperation[];

}

export interface ProgramAnalysisWithLabelProducer<C extends ConcreteElement, E extends AbstractElement>
    extends ProgramAnalysis<C, E>, TransitionLabelProvider<E> {

    getTransitionLabel(from: E, to: E): ProgramOperation[];

}

export interface WrappingProgramAnalysis<C extends ConcreteElement, E extends AbstractElement>
    extends ProgramAnalysis<C, E> {

    wrappedAnalysis: ProgramAnalysis<any, any>;

}

