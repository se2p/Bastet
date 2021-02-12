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

import {StateSet} from "../../algorithms/StateSet";
import {GraphAbstractState} from "./GraphAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";
import {
    ProgramAnalysis,
    ProgramAnalysisWithLabels,
    TransitionLabelProvider,
    TraversalOrderOperator
} from "../ProgramAnalysis";
import {
    ColorByActorVisitor,
    PaperLabelVisitor,
    PenSizeVisitor,
    StateColorVisitor,
} from "../StateVisitors";
import {CorePrintVisitor} from "../../../syntax/ast/CorePrintVisitor";
import {App} from "../../../syntax/app/App";
import {AssumeOperation, ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {ConcreteElement} from "../../domains/ConcreteElements";

export class GraphToDot  {

    private readonly _task: App;
    private readonly _analysis: ProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>;

    private _headerdot: any[];
    private _dot: string[];
    private _idseq: number;
    private _reached: StateSet<GraphAbstractState>;
    private _frontier: StateSet<GraphAbstractState>;
    private _transLabProvider: TransitionLabelProvider<GraphAbstractState>;
    private _traversalKeyProvider: TraversalOrderOperator<GraphAbstractState, GraphAbstractState>;

    private _frontierIndicatorSeq: number

    constructor(task: App,
                analysis: ProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>,
                transLabProvider: TransitionLabelProvider<GraphAbstractState>,
                traversalKeyProvider: TraversalOrderOperator<GraphAbstractState, GraphAbstractState>,
                reached: StateSet<GraphAbstractState>,
                frontier: StateSet<GraphAbstractState>) {
        this._task = Preconditions.checkNotUndefined(task);
        this._analysis = Preconditions.checkNotUndefined(analysis);
        this._transLabProvider = Preconditions.checkNotUndefined(transLabProvider);
        this._traversalKeyProvider = Preconditions.checkNotUndefined(traversalKeyProvider);
        this._reached = Preconditions.checkNotUndefined(reached);
        this._frontier = Preconditions.checkNotUndefined(frontier);
        this._headerdot = [];
        this._dot = [];
        this._idseq = 0;
        this._frontierIndicatorSeq = 0;
    }

    private writeState(e: GraphAbstractState) {
        const stateLabel = GraphToDot.escapeForDot(e.accept(new PaperLabelVisitor(this._task))
            + this._traversalKeyProvider.getLexiOrderKey(e).toString());
        const stateColor = e.accept(new ColorByActorVisitor(this._task));
        const pensize = e.accept(new PenSizeVisitor(this._analysis));
        const shape = this._analysis.target(e).length > 0? "doubleoctagon" : "box";
        this._dot.push(`    ${e.getId()} [label="${stateLabel}" shape="${shape}" penwidth=${pensize} color="black" fillcolor="${stateColor}"];`);
    }

    private opLabel(op: ProgramOperation): string {
        const visitor = new CorePrintVisitor();
        if (op instanceof AssumeOperation) {
            return `[ ${op.ast.accept(visitor)} ]`
        }
        return op.ast.accept(visitor);
    }

    private writeTransition(from: GraphAbstractState, to: GraphAbstractState) {
        const transLabels = GraphToDot.escapeForDot(this._transLabProvider.getTransitionLabel(from, to)
            .map(o => this.opLabel(o)).join("\n"));
        this._dot.push(`    ${from.getId()} -> ${to.getId()} [label="${transLabels}"];`);
    }

    private export() {
        this._headerdot.push(`    node [shape=box, style=filled];`);

        const idToStateMap = new Map<number, GraphAbstractState>();

        for (const e of this._reached) {
            idToStateMap.set(e.getId(), e);
            this.writeState(e);
            if (this._frontier.has(e)) {
                this._frontierIndicatorSeq++;
                const indicatorId = `f${this._frontierIndicatorSeq}`;
                this._dot.push(`    ${indicatorId} [shape=plaintext, label="frontier"];`);
                this._dot.push(`    ${e.getId()} -> ${indicatorId} [label=" "];`);
            }
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

    private static escapeForDot(text: string): string {
        const search = "\"";
        const replacement = "\\\"";
        return text.replace(new RegExp(search, 'g'), replacement);
    }

}

