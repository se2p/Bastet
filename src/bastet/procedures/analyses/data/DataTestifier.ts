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

export class DataTestifier implements TestificationOperator<AbstractState, AbstractState> {

    testify(accessibility: AccessibilityRelation<AbstractState, AbstractState>, state: AbstractState): AccessibilityRelation<AbstractState, AbstractState> {
        throw new ImplementMeException();
    }

    testifyOne(accessibility: AccessibilityRelation<AbstractState, AbstractState>, state: AbstractState): AccessibilityRelation<AbstractState, AbstractState> {
        throw new ImplementMeException();
    }

    testifyConcrete(accessibility: AccessibilityRelation<AbstractState, AbstractState>, state: AbstractState): Iterable<ConcreteElement[]> {
        throw new ImplementMeException();
    }

    testifyConcreteOne(accessibility: AccessibilityRelation<AbstractState, AbstractState>, state: AbstractState): Iterable<ConcreteElement[]> {
        throw new ImplementMeException();
    }

}
