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
import {ConcreteElement, ConcreteMemory} from "../../../domains/ConcreteElements";
import {AccessibilityRelation} from "../../Accessibility";
import {ProgramOperation} from "../../../../syntax/app/controlflow/ops/ProgramOperation";
import {CorePrintVisitor} from "../../../../syntax/ast/CorePrintVisitor";
import {SSAStateVisitor} from "../../StateVisitors";
import {SSAState} from "../../ssa/SSAAbstractDomain";

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
        const testified = this._analysis.testifyOne(ar, violating);
        this.exportPath(testified, violating);
        this.exportConcretePath(testified, violating);
        this.exportTargetState(testified, violating);
    }

    private exportPath(pathAr: AccessibilityRelation<GraphAbstractState>, violating: GraphAbstractState) {
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
                ops.forEach((o) => pathElements.push(`${work.getId()} -- ${o.ast.accept(new CorePrintVisitor())} --> ${succ.getId()}`));
                worklist.push(succ);
            }
        }

        fs.writeFileSync(filepath, pathElements.join("\n"));
    }

    private getTransitionLabels(work: GraphAbstractState, succ: GraphAbstractState) {
        return this._tlp.getTransitionLabel(work, succ);
    }

    private exportTargetState(ar: AccessibilityRelation<GraphAbstractState>, violating: GraphAbstractState) {
        const violatingConcreteElement: ConcreteElement = ar.concretizer().concretizeOne(violating);
        Preconditions.checkArgument(violatingConcreteElement instanceof ConcreteMemory);
        const errorState: ConcreteMemory = violatingConcreteElement as ConcreteMemory;

        const filepath = `output/cex_target_${violating.getId()}.json`;
        const targetJson: {} = {'boolean': {}, 'number': {}, 'string': {}};
        for (const [k, v] of errorState.numberMem.entries()) {
            targetJson['number'][k] = v.value;
        }
        for (const [k, v] of errorState.stringMem.entries()) {
            targetJson['string'][k] = v.value;
        }
        for (const [k, v] of errorState.booleanMem.entries()) {
            targetJson['boolean'][k] = v.value;
        }

        let fs = require('fs');
        fs.writeFileSync(filepath, JSON.stringify(targetJson, null, 4));
    }

    private exportConcretePath(pathAr: AccessibilityRelation<GraphAbstractState>, violating: GraphAbstractState) {
        const pathElements = [];

        const concrete: ConcreteElement = pathAr.concretizer().concretizeOne(violating);
        Preconditions.checkArgument(concrete instanceof ConcreteMemory);
        const concreteMem: ConcreteMemory = concrete as ConcreteMemory;

        const worklist: GraphAbstractState[] = [];
        Array.from(pathAr.initial()).forEach((e) => worklist.push(e));

        while (worklist.length > 0) {
            const work = worklist.pop();

            const elementJson = {};
            const ssaState: SSAState = work.accept(new SSAStateVisitor());
            for (const [k, v] of ssaState.getPrimitiveAttributes(concreteMem)) {
                if (k.indexOf("__op_time_") == 0) {
                    continue;
                }
                elementJson[k] = v.value;
            }
            pathElements.push({'id': work.getId(), 'mem': elementJson});

            const succs = pathAr.successorsOf(work);
            Preconditions.checkArgument(succs.length <= 1, "The path to export most not contain branchings!");
            for (const succ of succs) {
                worklist.push(succ);
            }
        }

        let fs = require('fs');
        const filepath = `output/cex_concrete_path_${violating.getId()}.json`;
        fs.writeFileSync(filepath, JSON.stringify(pathElements, null, 4));
    }

}
