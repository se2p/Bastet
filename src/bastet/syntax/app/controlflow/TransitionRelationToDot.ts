import {TransitionRelation} from "./TransitionRelation";
import {LocationID} from "./ControlLocation";
import {OperationID, ProgramOperations} from "./ops/ProgramOperation";

export class TransitionRelationToDot {

    public export(tr: TransitionRelation, filepath: string) {
        let output: string[] = [];
        let fs = require('fs');

        let worklist: Array<LocationID> = new Array();
        tr.entryLocationSet.forEach((e) => worklist.push(e));

        output.push(`graph relation {`);

        while (worklist.length > 0) {
            let fromlocid: LocationID = worklist.pop();
            let fromWork: [OperationID, LocationID][] = tr.transitionsFrom(fromlocid);
            for (let [opid, tolocid] of fromWork) {
                let op = ProgramOperations.withID(opid);
                output.push(`${fromlocid} -> ${tolocid} [label="${escape(op.toString())}"];`);
            }
        }

        output.push(`}`);

        fs.writeFileSync(filepath, output.join("\n"));
    }

    private escpape(text: string): string {
        return text;
    }

}
