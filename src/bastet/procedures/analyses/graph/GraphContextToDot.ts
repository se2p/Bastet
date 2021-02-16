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

import {GraphAbstractState, GraphStateId} from "./GraphAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";
import {ProgramAnalysis, TransitionLabelProvider} from "../ProgramAnalysis";
import {PenSizeVisitor, StateColorVisitor, StateLabelVisitor} from "../StateVisitors";
import {CorePrintVisitor} from "../../../syntax/ast/CorePrintVisitor";
import {App} from "../../../syntax/app/App";
import {GraphReachedSetWrapper} from "./GraphStatesSetWrapper";
import {ConcreteElement} from "../../domains/ConcreteElements";

export class GraphContextToDot  {

    private readonly _task: App;
    private readonly _analysis: ProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>;
    private readonly _reached: GraphReachedSetWrapper<GraphAbstractState>;
    private readonly _transLabProvider: TransitionLabelProvider<GraphAbstractState>;

    private _headerdot: any[];
    private _dot: string[];

    constructor(task: App,
                analysis: ProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>,
                transLabProvider: TransitionLabelProvider<GraphAbstractState>,
                reached: GraphReachedSetWrapper<GraphAbstractState>) {
        this._task = Preconditions.checkNotUndefined(task);
        this._analysis = Preconditions.checkNotUndefined(analysis);
        this._transLabProvider = Preconditions.checkNotUndefined(transLabProvider);
        this._reached = Preconditions.checkNotUndefined(reached);
        this._headerdot = [];
        this._dot = [];
    }

    private writeState(e: GraphAbstractState) {
        const stateLabel = GraphContextToDot.escapeForDot(e.accept(new StateLabelVisitor(this._task)));
        const stateColor = e.accept(new StateColorVisitor());
        const pensize = e.accept(new PenSizeVisitor(this._analysis));
        this._dot.push(`    ${e.getId()} [label="${stateLabel}" penwidth=${pensize} color="black" fillcolor="${stateColor}"];`);
    }

    private writeTransition(from: GraphAbstractState, to: GraphAbstractState) {
        const visitor = new CorePrintVisitor();
        const transLabels = GraphContextToDot.escapeForDot(this._transLabProvider.getTransitionLabel(from, to)
            .map(([ts, o]) => o.ast.accept(visitor)).join(";"));
        this._dot.push(`    ${from.getId()} -> ${to.getId()} [label="${transLabels}"];`);
    }

    private export(contextOf: GraphStateId) {
        this._headerdot.push(`    node [shape=box, style=filled];`);

        const idToStateMap = new Map<number, GraphAbstractState>();
        const contextStateIDs: Set<GraphStateId> = new Set<GraphStateId>();

        for (const e of this._reached) {
            const inContext: boolean = e.getId() == contextOf
                || e.getPredecessors().contains(contextOf)
                || this._reached.getChildrenOf(contextOf).has(contextOf);
            idToStateMap.set(e.getId(), e);
            if (inContext) {
                contextStateIDs.add(e.getId());
                this.writeState(e);
            }
        }

        for (const e of this._reached) {
            for (const ePredId of e.getPredecessors()) {
                if (contextStateIDs.has(ePredId)) {
                    const ePred = idToStateMap.get(ePredId);
                    Preconditions.checkNotUndefined(ePred);
                    this.writeTransition(ePred, e);
                }
            }
        }
    }

    public writeContextToFile(filepath: string, contextOf: GraphStateId): void {
        this.export(contextOf);
        let fs = require('fs');
        fs.writeFileSync(filepath, `digraph ReachabilityGraph {\n`
            + this._headerdot.join("\n")
            + this._dot.join("\n")
            + `\n}\n`);
    }

    private static escapeForDot(text: string): string {
        const search = "\"";
        const replacement = "\\\"";
        return text.replace(new RegExp(search, 'g'), replacement);
    }

}

