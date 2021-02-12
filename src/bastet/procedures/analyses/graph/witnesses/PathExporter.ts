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


import {WitnessHandler} from "../../WitnessHandlers";
import {GraphAbstractState} from "../GraphAbstractDomain";
import {ReachedSet} from "../../../algorithms/StateSet";
import {Preconditions} from "../../../../utils/Preconditions";
import {GraphReachedSetWrapper} from "../GraphStatesSetWrapper";
import {TransitionLabelProvider, WrappingProgramAnalysis} from "../../ProgramAnalysis";
import {
    ConcreteBoolean,
    ConcreteElement,
    ConcreteNumber,
    ConcreteString,
    ConcreteUnifiedMemory
} from "../../../domains/ConcreteElements";
import {AccessibilityRelation} from "../../Accessibility";
import {ProgramOperation} from "../../../../syntax/app/controlflow/ops/ProgramOperation";
import {CorePrintVisitor} from "../../../../syntax/ast/CorePrintVisitor";
import {getTheOnlyElement} from "../../../../utils/Collections";
import {IllegalStateException} from "../../../../core/exceptions/IllegalStateException";
import {ImplementMeException} from "../../../../core/exceptions/ImplementMeException";

export class PathExporter implements WitnessHandler<GraphAbstractState> {

    private readonly _analysis: WrappingProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>;
    private readonly _tlp: TransitionLabelProvider<GraphAbstractState>;

    constructor(analysis: WrappingProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>,
                tlp: TransitionLabelProvider<GraphAbstractState>) {
        this._analysis = Preconditions.checkNotUndefined(analysis);
        this._tlp = Preconditions.checkNotUndefined(tlp);
    }

    public handleViolatingState(reached: ReachedSet<GraphAbstractState>, violating: GraphAbstractState) {
        Preconditions.checkArgument(reached instanceof GraphReachedSetWrapper);
        const ar: GraphReachedSetWrapper<GraphAbstractState> = reached as GraphReachedSetWrapper<GraphAbstractState>;
        const testifiedSeq: [GraphAbstractState, ConcreteElement][] = getTheOnlyElement(this._analysis.testifyConcreteOne(ar, violating));

        this.exportPath(ar, testifiedSeq, violating);
        this.exportConcretePath(ar, testifiedSeq, violating);
        this.exportTargetState(ar, testifiedSeq, violating);
    }

    private exportPath(ar: AccessibilityRelation<GraphAbstractState>, testifiedSeq: [GraphAbstractState, ConcreteElement][], violating: GraphAbstractState) {
        let fs = require('fs');
        const filepath = `output/cex_path_${violating.getId()}.txt`;
        const pathElements: string[] = [];

        for (let i=0; i<testifiedSeq.length-1; i++) {
            const [work, workC] = testifiedSeq[i];
            const [succ, succC] = testifiedSeq[i+1];

            const ops: ProgramOperation[] = this.getTransitionLabels(work, succ);
            ops.forEach((o) => pathElements.push(`${work.getId()} -- ${o.ast.accept(new CorePrintVisitor())} --> ${succ.getId()}`));
        }

        fs.writeFileSync(filepath, pathElements.join("\n"));
    }

    private getTransitionLabels(work: GraphAbstractState, succ: GraphAbstractState) {
        return this._tlp.getTransitionLabel(work, succ);
    }

    private exportTargetState(ar: AccessibilityRelation<GraphAbstractState>, testifiedSeq: [GraphAbstractState, ConcreteElement][], violating: GraphAbstractState) {
        const [violatingAbstract, violatingConcreteElement] = testifiedSeq[testifiedSeq.length-1];
        Preconditions.checkArgument(violatingConcreteElement instanceof ConcreteUnifiedMemory);
        const errorState: ConcreteUnifiedMemory = violatingConcreteElement as ConcreteUnifiedMemory;

        const filepath = `output/cex_target_${violating.getId()}.json`;
        const targetJson: {} = {'boolean': {}, 'number': {}, 'string': {}};
        for (const k of errorState.variables()) {
            const v = errorState.get(k);
            if (v instanceof ConcreteString) {
                targetJson['string'][k] = v.value;
            } else if (v instanceof ConcreteNumber) {
                targetJson['number'][k] = v.value;
            } else if (v instanceof ConcreteBoolean) {
                targetJson['boolean'][k] = v.value;
            } else {
                throw new ImplementMeException();
            }
        }

        let fs = require('fs');
        fs.writeFileSync(filepath, JSON.stringify(targetJson, null, 4));
    }

    private exportConcretePath(ar: AccessibilityRelation<GraphAbstractState>, testifiedSeq: [GraphAbstractState, ConcreteElement][], violating: GraphAbstractState) {
        const pathElements = [];

        for (const [e, c] of testifiedSeq) {
            if (c instanceof ConcreteUnifiedMemory) {
                const elementJson = {};
                 for (const k of c.variables()) {
                    if (k.indexOf("__op_time_") == 0) {
                        continue;
                 }
                    elementJson[k] = c.get(k).value;
                 }
                pathElements.push({'id': e.getId(), 'mem': elementJson});
            } else {
                throw new IllegalStateException("Not supported");
            }
        }

        let fs = require('fs');
        const filepath = `output/cex_concrete_path_${violating.getId()}.json`;
        fs.writeFileSync(filepath, JSON.stringify(pathElements, null, 4));
    }

}
