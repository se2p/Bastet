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


import {AbstractStateVisitor, DelegatingStateVisitor} from "./AbstractStates";
import {AbstractElement} from "../../lattices/Lattice";
import {ControlAbstractState, RelationLocation, ThreadState} from "./control/ControlAbstractDomain";
import {DataAbstractState} from "./data/DataAbstractDomain";
import {GraphAbstractState} from "./graph/GraphAbstractDomain";
import {SSAState} from "./ssa/SSAAbstractDomain";
import {App} from "../../syntax/app/App";
import {Preconditions} from "../../utils/Preconditions";
import {CorePrintVisitor} from "../../syntax/ast/CorePrintVisitor";
import {TimeState} from "./time/TimeAbstractDomain";
import {ControlLocationExtractor} from "./control/ControlUtils";
import {ImplementMeForException} from "../../core/exceptions/ImplementMeException";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";
import {DebugState} from "./debug/DebugAbstractDomain";
import {getTheOnlyElement} from "../../utils/Collections";
import {AbstractionState} from "./abstraction/AbstractionAbstractDomain";
import {ProgramAnalysis} from "./ProgramAnalysis";
import {ConcreteElement} from "../domains/ConcreteElements";

const colormap = require('colormap')

export class PaperLabelVisitor extends DelegatingStateVisitor<string> {

    private readonly _task: App;

    constructor(task: App) {
        super();
        this._task = Preconditions.checkNotUndefined(task);
    }

    protected defaultResultFor(element: AbstractElement): string {
        return "";
    }

    visitGraphAbstractState(element: GraphAbstractState): string {
        const wrappedLabel: string = element.getWrappedState().accept(this);
        return `e${element.getId()} ${wrappedLabel}`;
    }

    visitControlAbstractState(element: ControlAbstractState): string {
        const v = new ControlLocationExtractor(this._task);
        const relName = (rl: RelationLocation) => this._task.getTransitionRelationById(rl.getRelationId()).name;
        return "@ " + element.accept(v).map( rl => `${rl.getActorId()}:${relName(rl)}:${rl.getLocationId()}`).toArray().toString();
    }

}

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
        return `${wasStepped(threadIndex) ? "*" : ""}[${t.getThreadId()} a${t.getInAtomicMode()} ${t.getActorId()} ${t.getScriptId()} ${script.event.accept(astVisitor)} ${t.getRelationLocation().getLocationId()} ${t.getComputationState()} ${t.getWaitingForThreads().join("+")}]`;
    }

    private formatConditionThreadDetails(cs: ControlAbstractState, t: ThreadState, threadIndex: number): string {
        const steppedForIndices = cs.getSteppedFor();
        const wasStepped = (i) => { return steppedForIndices.contains(i) };
        return `COND ${wasStepped(threadIndex) ? "*" : ""}[${t.getThreadId()} ${t.getActorId()} ${t.getRelationLocation().getLocationId()} ${t.getComputationState()} ${t.getWaitingForThreads().join("+")}]`;
    }


    visit(element: AbstractElement): string {
        return "";
    }

    visitAbstractionState(element: AbstractionState): string {
        return `${element.getAbstraction().toString()} ${element.getWrappedState().accept(this)}\n`;
    }

    visitDebugState(element: DebugState): string {
       return `${element.getWrappedState().accept(this)} ${element.getDebugInfos().toString()}`;
    }

    visitControlAbstractState(element: ControlAbstractState): string {
        const steppedForIndices = element.getSteppedFor();
        const wasStepped = (i) => { return steppedForIndices.contains(i) };

        const wrappedLabel: string = element.getWrappedState().accept(this);
        const controlLabel1: string = element.getThreadStates()
            .map((t, i) => this.formatActorScriptThreadDetails(element, t, i))
            .join("\n");
        const controlLabel2: string = element.getConditionStates()
            .map((t, i) => this.formatConditionThreadDetails(element, t, i))
            .join("\n");
        return `${controlLabel1}\n${controlLabel2}\n${wrappedLabel}`;
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
        // return `${element.getSSA().toString()} ${wrappedLabel}`;
    }

    visitTimeState(element: TimeState): string {
        return element.getWrappedState().accept(this);
    }

}

export class StateColorVisitor extends DelegatingStateVisitor<string> {

    protected defaultResultFor(element: AbstractElement): string {
        return "white";
    }

    visitControlAbstractState(element: ControlAbstractState): string {
        if (element.getIsTargetFor().size > 0) {
            return "crimson";
        } else {
            return "white";
        }
    }

}

export class ColorByActorVisitor extends StateColorVisitor {

    private readonly _task: App;
    private readonly _colors: any;
    private readonly _actorToColor: {};

    constructor(task: App) {
        super();
        this._task = Preconditions.checkNotUndefined(task);
        this._colors = colormap({
            colormap: 'hsv',
            nshades: Math.max(this._task.actors.length, 16),
            format: 'hex',
            alpha: 1
        });

        this._actorToColor = {};
        var idx = 0;
        for (const a of this._task.actors) {
            this._actorToColor[a.ident] = this._colors[idx];
            idx++;
        }
    }

    visitControlAbstractState(element: ControlAbstractState): string {
        const steppedForIndices = element.getSteppedFor();
        const indexedThreads = steppedForIndices.map((i) => element.getIndexedThreadState(i));
        const steppedActors = indexedThreads.map((it) => it.threadStatus.getActorId()).toSet();
        if (steppedActors.size == 1) {
            const actor = getTheOnlyElement(steppedActors);
            return this._actorToColor[actor];
        } else {
            return "white";
        }
    }

}

export class PenSizeVisitor extends DelegatingStateVisitor<number> {

    private readonly _analysis: ProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>;

    constructor(analysis: ProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>) {
        super();
        this._analysis = Preconditions.checkNotUndefined(analysis);
    }

    public visitGraphAbstractState(state: GraphAbstractState): number {
        if (this._analysis.target(state).length > 0) {
            return 4;
        } else {
            return this.defaultResultFor(state);
        }
    }

    protected defaultResultFor(element: AbstractElement): number {
        return 1;
    }

}

export class SSAStateVisitor implements AbstractStateVisitor<SSAState> {

    visit(element: AbstractElement): SSAState {
        throw new ImplementMeForException(element.constructor.name);
    }

    visitControlAbstractState(element: ControlAbstractState): SSAState {
        return element.wrappedState.accept(this);
    }

    visitDataAbstractState(element: DataAbstractState): SSAState {
        throw new IllegalArgumentException("Abstract state didnt contain SSAState");
    }

    visitGraphAbstractState(element: GraphAbstractState): SSAState {
        return element.wrappedState.accept(this);
    }

    visitSSAState(element: SSAState): SSAState {
        return element;
    }

    visitTimeState(element: TimeState): SSAState {
        return element.wrappedState.accept(this);
    }

}
