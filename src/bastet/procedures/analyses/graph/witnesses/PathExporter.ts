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
import {GraphAbstractState} from "../GraphAbstractDomain";
import {ReachedSet} from "../../../algorithms/StateSet";
import {Preconditions} from "../../../../utils/Preconditions";
import {GraphReachedSetWrapper} from "../GraphStatesSetWrapper";
import {ImplementMeException} from "../../../../core/exceptions/ImplementMeException";
import {ProgramAnalysis, TransitionLabelProvider, WrappingProgramAnalysis} from "../../ProgramAnalysis";
import {ConcreteElement} from "../../../domains/ConcreteElements";
import {AccessibilityRelation} from "../../Accessibility";
import {AbstractState} from "../../../../lattices/Lattice";
import {ProgramOperation} from "../../../../syntax/app/controlflow/ops/ProgramOperation";
import {CorePrintVisitor} from "../../../../syntax/ast/CorePrintVisitor";

export class PathExporter implements WitnessHandler<GraphAbstractState> {

    private readonly _analysis: WrappingProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>;
    private readonly _tlp: TransitionLabelProvider<GraphAbstractState>;

    constructor(analysis: WrappingProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>,
                tlp: TransitionLabelProvider<GraphAbstractState>) {
        this._analysis = Preconditions.checkNotUndefined(analysis);
        this._tlp = Preconditions.checkNotUndefined(tlp);
    }

    handleViolatingState(reached: ReachedSet<GraphAbstractState>, violating: GraphAbstractState) {
        Preconditions.checkArgument(reached instanceof GraphReachedSetWrapper);
        const ar: GraphReachedSetWrapper<GraphAbstractState> = reached as GraphReachedSetWrapper<GraphAbstractState>;
        const testified = this._analysis.testifyOne(ar, violating);
        this.exportPath(testified, violating);
    }

    private exportPath(pathAr: AccessibilityRelation<GraphAbstractState, GraphAbstractState>, violating: GraphAbstractState) {
        let fs = require('fs');
        const filepath = `output/cex_path_${violating.getId()}.txt`;
        const pathElements: string[] = [];

        const worklist: GraphAbstractState[] = [];
        Array.from(pathAr.initial()).forEach((e) => worklist.push(e));

        while (worklist.length > 0) {
            const work = worklist.pop();
            const succs = pathAr.successorsOf(work);
            Preconditions.checkArgument(succs.length <= 1, "The path to export most not contain branchings!");
            for (const succ of succs) {
                const ops: ProgramOperation[] = this.getTransitionLabels(work, succ);
                ops.forEach((o) => pathElements.push(o.ast.accept(new CorePrintVisitor())));
                worklist.push(succ);
            }
        }

        fs.writeFileSync(filepath, pathElements.join("\n"));
    }

    private getTransitionLabels(work: GraphAbstractState, succ: GraphAbstractState) {
        return this._tlp.getTransitionLabel(work, succ);
    }
}