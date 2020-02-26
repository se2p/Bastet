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

import {TransitionRelation, TransitionTo} from "./TransitionRelation";
import {LocationId} from "./ControlLocation";
import {OperationID, ProgramOperations} from "./ops/ProgramOperation";

export class TransitionRelationToDot {

    public export(tr: TransitionRelation, filepath: string) {
        let output: string[] = [];
        let fs = require('fs');

        let visited: Set<LocationId> = new Set<LocationId>();
        let worklist: Array<LocationId> = new Array();
        tr.entryLocationSet.forEach((e) => worklist.push(e));

        output.push(`digraph relation {`);
        output.push(`    node [shape=circle, style=filled];`);

        while (worklist.length > 0) {
            let fromlocid: LocationId = worklist.pop();
            if (!visited.has(fromlocid)) {
                visited.add(fromlocid);
                let fromWork: Array<TransitionTo> = tr.transitionsFrom(fromlocid);
                for (const t of fromWork) {
                    let op = ProgramOperations.withID(t.opId);
                    output.push(`    ${fromlocid} -> ${t.target} [label="${this.escapeLabel(op.toString())}"];`);
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
