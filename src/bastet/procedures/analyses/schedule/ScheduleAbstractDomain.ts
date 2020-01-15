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

import {SingletonStateWrapper} from "../AbstractStates";
import {AbstractDomain, AbstractionPrecision, ConcreteElement} from "../AbstractDomain";
import {Lattice} from "../../../lattices/Lattice";

export interface ScheduleAbstractState extends SingletonStateWrapper {

}

export class ScheduleAbstractDomain implements AbstractDomain<ScheduleAbstractState> {

    lattice: Lattice<ScheduleAbstractState>;

    abstract(elements: Iterable<ConcreteElement>): ScheduleAbstractState {
        return undefined;
    }

    concretize(element: ScheduleAbstractState): Iterable<ConcreteElement> {
        return undefined;
    }

    widen(element: ScheduleAbstractState, precision: AbstractionPrecision): ScheduleAbstractState {
        return undefined;
    }

}
