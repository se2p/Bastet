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

export interface ProgramAnalysis<C extends ConcreteElement, E extends AbstractElement> {

    abstractDomain: AbstractDomain<C, E>;

    abstractSucc(fromState: E): Iterable<E>;

    merge(state1: E, state2: E): boolean;

    /** Delegates to `join` of the abstract domain */
    join(state1: E, state2: E): E;

    stop(state: E, reached: Iterable<E>): boolean;

    widen(state: E): E;

    target(state: E): boolean;

    initialStatesFor(task: App): E[];
}

export interface ProgramAnalysisWithLabels<C extends ConcreteElement, E extends AbstractElement> extends ProgramAnalysis<C, E> {

    abstractSuccFor(fromState: E, op: ProgramOperation): Iterable<E>;

}

export interface TransitionLabelProvider {

    getTransitionLabel(from: AbstractElement, to: AbstractElement): ProgramOperation;

}

export interface ProgramAnalysisWithLabelProducer<C extends ConcreteElement, E extends AbstractElement>
    extends ProgramAnalysis<C, E>, TransitionLabelProvider {

    getTransitionLabel(from: E, to: E): ProgramOperation;

}

export interface WrappingProgramAnalysis<C extends ConcreteElement, E extends AbstractElement>
    extends ProgramAnalysis<C, E> {

    wrappedAnalysis: ProgramAnalysis<any, any>;

}
