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

import {TransitionRelation, TransitionTo} from "./TransitionRelation";
import {LocationId} from "./ControlLocation";
import {ProgramOperations} from "./ops/ProgramOperation";
import {CorePrintVisitor} from "../../ast/CorePrintVisitor";

export class TransitionRelationToDot {

    public export(tr: TransitionRelation, filepath: string) {
        let output: string[] = [];
        let fs = require('fs');

        let visited: Set<LocationId> = new Set<LocationId>();
        let worklist: Array<LocationId> = new Array();
        tr.entryLocationSet.forEach((e) => worklist.push(e));

        output.push(`digraph relation {`);
        output.push(`    node [shape=circle, style=filled];`);

        for (const loc of tr.locationSet) {
            let penwidth = 1;
            let shape = "circle";
            if (tr.exitLocationSet.contains(loc)) {
                shape = "doublecircle";
            } else if (tr.entryLocationSet.contains(loc)) {
                shape = "invtriangle";
            } else if (tr.loopHeads.contains(loc)) {
                shape = "egg";
            }

            if (tr.loopHeads.contains(loc)) {
                penwidth = 3;
            }

            const dfsNumber: number = tr.getDfsNumberOf(loc);
            const label: string = this.escapeLabel(`${loc}\nd${dfsNumber}\nw${tr.getWaitAtMeetOrderOf(loc)}`);
            output.push(`    ${loc} [label="${label}" shape=${shape} penwidth=${penwidth}]`);
        }

        while (worklist.length > 0) {
            let fromlocid: LocationId = worklist.pop();
            if (!visited.has(fromlocid)) {
                visited.add(fromlocid);
                let fromWork: Array<TransitionTo> = tr.transitionsFrom(fromlocid);
                for (const t of fromWork) {
                    let op: string = ProgramOperations.withID(t.opId).ast.accept(new CorePrintVisitor());
                    output.push(`    ${fromlocid} -> ${t.target} [label="${this.escapeLabel(op)}"];`);
                    worklist.push(t.target);
                }
            }
        }

        output.push(`}`);
        output.push("");

        fs.writeFileSync(filepath, output.join("\n"));
    }

    private escapeLabel(text: string): string {
        return text.replace(/"/g, "\\\"");
    }

}
