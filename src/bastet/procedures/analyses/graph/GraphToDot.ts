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

import {StateSet} from "../../algorithms/StateSet";
import {GraphAbstractState} from "./GraphAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";
import {TransitionLabelProvider} from "../ProgramAnalysis";

export class GraphToDot  {

    private _headerdot: any[];
    private _dot: string[];
    private _idseq: number;
    private _reached: StateSet<GraphAbstractState>;
    private _frontier: StateSet<GraphAbstractState>;
    private _transLabProvider: TransitionLabelProvider<GraphAbstractState>;

    constructor(transLabProvider: TransitionLabelProvider<GraphAbstractState>,
                reached: StateSet<GraphAbstractState>,
                frontier: StateSet<GraphAbstractState>) {
        this._transLabProvider = Preconditions.checkNotUndefined(transLabProvider);
        this._reached = Preconditions.checkNotUndefined(reached);
        this._frontier = Preconditions.checkNotUndefined(frontier);
        this._headerdot = [];
        this._dot = [];
        this._idseq = 0;
    }

    private writeState(e: GraphAbstractState) {
        const stateLabel = "";
        this._dot.push(`    ${e.getId()} [label="${stateLabel}"];`);
    }

    private writeTransition(from: GraphAbstractState, to: GraphAbstractState) {
        const transLabels = this._transLabProvider.getTransitionLabel(from, to);
        this._dot.push(`    ${from.getId()} -> ${to.getId()} [label="${transLabels}"];`);
    }

    private export() {
        this._headerdot.push(`    node [shape=box, style=filled];`);

        const idToStateMap = new Map<number, GraphAbstractState>();

        for (const e of this._reached) {
            idToStateMap.set(e.getId(), e);
            this.writeState(e);
        }

        for (const e of this._reached) {
            for (const ePredId of e.getPredecessors()) {
                const ePred = idToStateMap.get(ePredId);
                Preconditions.checkNotUndefined(ePred);
                this.writeTransition(ePred, e);
            }
        }
    }

    public writeToFile(filepath: string): void {
        this.export();
        let fs = require('fs');
        fs.writeFileSync(filepath, `digraph ReachabilityGraph {\n`
            + this._headerdot.join("\n")
            + this._dot.join("\n")
            + `\n}\n`);
    }

    private static escpace(text: string): string {
        const search = "\"";
        const replacement = "\\\"";
        return text.replace(new RegExp(search, 'g'), replacement);
    }

}

