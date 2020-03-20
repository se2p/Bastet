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
import {ControlAbstractState, ThreadState} from "./control/ControlAbstractDomain";
import {DataAbstractState} from "./data/DataAbstractDomain";
import {GraphAbstractState} from "./graph/GraphAbstractDomain";
import {SSAState} from "./ssa/SSAAbstractDomain";
import {Actor} from "../../syntax/app/Actor";
import {Script} from "../../syntax/app/controlflow/Script";
import {App} from "../../syntax/app/App";
import {Preconditions} from "../../utils/Preconditions";
import {CorePrintVisitor} from "../../syntax/ast/CorePrintVisitor";

export class StateLabelVisitor implements AbstractStateVisitor<string> {

    private readonly _task: App;

    constructor(task: App) {
        this._task = Preconditions.checkNotUndefined(task);
    }

    private formatActorScriptThreadDetails(cs: ControlAbstractState, t: ThreadState, threadIndex: number): string {
        const steppedForIndices = cs.getSteppedFor();
        const wasStepped = (i) => { return steppedForIndices.contains(i) };

        const actor = this._task.getActorByName(t.getActorId());
        const script = actor.getScript(t.getScriptId());

        const astVisitor = new CorePrintVisitor();
        return `${wasStepped(threadIndex) ? "*" : ""}[${t.getThreadId()} ${t.getActorId()} ${t.getScriptId()} ${script.event.accept(astVisitor)} ${t.getRelationLocation().getLocationId()} ${t.getComputationState()} ${t.getWaitingForThreads().join("+")}]`;
    }

    visit(element: AbstractElement): string {
        return "";
    }

    visitControlAbstractState(element: ControlAbstractState): string {
        const steppedForIndices = element.getSteppedFor();
        const wasStepped = (i) => { return steppedForIndices.contains(i) };

        const wrappedLabel: string = element.getWrappedState().accept(this);
        const controlLabel: string = element.getThreadStates()
            .map((t, i) => this.formatActorScriptThreadDetails(element, t, i))
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

export class StateColorVisitor implements AbstractStateVisitor<string> {

    visit(element: AbstractElement): string {
        return "white";
    }

    visitControlAbstractState(element: ControlAbstractState): string {
        if (element.getIsTargetFor().size > 0) {
            return "crimson";
        } else {
            return "white";
        }
    }

    visitDataAbstractState(element: DataAbstractState): string {
        return undefined;
    }

    visitGraphAbstractState(element: GraphAbstractState): string {
        return element.getWrappedState().accept(this);
    }

    visitSSAState(element: SSAState): string {
        return element.getWrappedState().accept(this);
    }

}

export class PenSizeVisitor implements AbstractStateVisitor<number> {

    visit(element: AbstractElement): number {
        return 1;
    }

    visitControlAbstractState(element: ControlAbstractState): number {
        return element.getWrappedState().accept(this);
    }

    visitGraphAbstractState(element: GraphAbstractState): number {
        return element.getWrappedState().accept(this);
    }

    visitDataAbstractState(element: DataAbstractState): number {
        return 1;
    }

    visitSSAState(element: SSAState): number {
        return element.getWrappedState().accept(this);
    }

}


