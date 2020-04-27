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


import {WitnessHandler} from "../../WitnessHandlers";
import {GraphAbstractState, GraphConcreteState} from "../GraphAbstractDomain";
import {ReachedSet} from "../../../algorithms/StateSet";
import {Preconditions} from "../../../../utils/Preconditions";
import {GraphReachedSetWrapper} from "../GraphStatesSetWrapper";
import {GraphPath} from "../GraphPath";
import {GraphSafetyCounterexample} from "./GraphCounterexample";
import {ProgramAnalysis} from "../../ProgramAnalysis";
import {ImplementMeException} from "../../../../core/exceptions/ImplementMeException";

export class WitnessExporter implements WitnessHandler<GraphAbstractState> {

    private readonly _analysis: ProgramAnalysis<GraphConcreteState, GraphAbstractState, GraphAbstractState>;

    constructor(analysis: ProgramAnalysis<GraphConcreteState, GraphAbstractState, GraphAbstractState>) {
        this._analysis = analysis;
    }

    handleViolatingState(reached: ReachedSet<GraphAbstractState>, violating: GraphAbstractState) {
        const counterExample = this.extractCounterExample(reached, violating);
        throw new ImplementMeException();
    }

    public extractCounterExample(reached: ReachedSet<GraphAbstractState>, violating: GraphAbstractState): GraphSafetyCounterexample {
        Preconditions.checkArgument(reached instanceof GraphReachedSetWrapper);
        const reachedSetWrapper = reached as GraphReachedSetWrapper<GraphAbstractState>;

        const errorWitness: GraphPath = reachedSetWrapper.chooseRandomPathTo(violating);

        const violatedProperties = this._analysis.target(violating);
        return new GraphSafetyCounterexample(errorWitness, violatedProperties);
    }
}