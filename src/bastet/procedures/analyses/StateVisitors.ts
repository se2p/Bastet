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



import {AbstractStateVisitor} from "./AbstractStates";
import {AbstractElement} from "../../lattices/Lattice";
import {ControlAbstractState} from "./control/ControlAbstractDomain";
import {DataAbstractState} from "./data/DataAbstractDomain";
import {GraphAbstractState} from "./graph/GraphAbstractDomain";
import {SSAState} from "./ssa/SSAAbstractDomain";

export class StateLabelVisitor implements AbstractStateVisitor<string> {

    visit(element: AbstractElement): string {
        return "";
    }

    visitControlAbstractState(element: ControlAbstractState): string {
        const steppedForIndices = element.getSteppedFor();
        const stepped = (i) => { return steppedForIndices.contains(i) };

        const wrappedLabel: string = element.getWrappedState().accept(this);
        const controlLabel: string = element.getThreadStates()
            .map((t, i) => `${stepped(i) ? "*" : ""}[${t.getThreadId()} ${t.getActorId()} ${t.getScriptId()} ${t.getRelationLocation().getLocationId()} ${t.getComputationState()}]`)
            .join("\n");
        return `${controlLabel}\n${wrappedLabel}`;
    }

    visitDataAbstractState(element: DataAbstractState): string {
        return undefined;
    }

    visitGraphAbstractState(element: GraphAbstractState): string {
        const wrappedLabel: string = element.getWrappedState().accept(this);
        return `${element.getId()} ${wrappedLabel}`;
    }

    visitSSAState(element: SSAState): string {
        const wrappedLabel = element.getWrappedState().accept(this);
        return wrappedLabel;
    }

}
