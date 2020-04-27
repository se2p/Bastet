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

import {
    MergeIntoOperator,
    ProgramAnalysis,
    StopOperator,
    TransitionLabelProvider,
    WrappingProgramAnalysis
} from "../ProgramAnalysis";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {
    GraphAbstractDomain,
    GraphAbstractState,
    GraphAbstractStateFactory,
    GraphConcreteState
} from "./GraphAbstractDomain";
import {App} from "../../../syntax/app/App";
import {GraphTransferRelation} from "./GraphTransferRelation";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {
    CHOOSE_EITHER,
    CHOOSE_FIRST, CHOOSE_SECOND,
    DefaultFrontierSet,
    FrontierSet,
    PartitionKey, PriorityFrontierSet,
    ReachedSet,
    StatePartitionOperator,
    StateSet
} from "../../algorithms/StateSet";
import {Preconditions} from "../../../utils/Preconditions";
import {GraphToDot} from "./GraphToDot";
import {Refiner, Unwrapper, WrappingRefiner} from "../Refiner";
import {Property} from "../../../syntax/Property";
import {GraphReachedSetWrapper} from "./GraphStatesSetWrapper";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {NoMergeIntoOperator, NoStopOperator, StandardMergeIntoOperator} from "../Operators";
import {BastetConfiguration} from "../../../utils/BastetConfiguration";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {Set as ImmSet} from "immutable"
import {GraphContextToDot} from "./GraphContextToDot";
import {GraphCoverCheckStopOperator} from "./GraphCoverCheckStopOperator";
import {DummyHandler, WitnessHandler} from "../WitnessHandlers";
import {WitnessExporter} from "./witnesses/WitnessExporter";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {LexiKey} from "../../../utils/Lexicographic";

export class GraphAnalysisConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ['GraphAnalysis']);
    }

    get mergeIntoOperator(): string {
        return this.getStringProperty('mergeIntoOperator', 'NoMergeIntoOperator');
    }

    get stopOperator(): string {
        return this.getStringProperty('stopOperator', 'CheckCoverage');
    }

    get witnessHandler(): string {
        return this.getStringProperty('witnessHandler', 'DoNothing');
    }

    get graphConstructionOrder(): string {
        return this.getStringProperty('graphConstructionOrder', 'WaitAtMeet');
    }

}

export class GraphAnalysis implements WrappingProgramAnalysis<GraphConcreteState, GraphAbstractState, GraphAbstractState>,
    Unwrapper<GraphAbstractState, AbstractElement>, StatePartitionOperator<GraphAbstractState>,
    TransitionLabelProvider<GraphAbstractState> {

    private readonly _abstractDomain: AbstractDomain<GraphConcreteState, GraphAbstractState>;

    private readonly _wrappedAnalysis: ProgramAnalysis<any, any, any>;

    private readonly _transferRelation: GraphTransferRelation;

    private readonly _refiner: Refiner<GraphAbstractState>;

    private readonly _task: App;

    private readonly _statistics: AnalysisStatistics;

    private readonly _mergeIntoOp: MergeIntoOperator<GraphAbstractState, GraphAbstractState>;

    private readonly _stopOp: StopOperator<GraphAbstractState, GraphAbstractState>;

    private readonly _witnessHandler: WitnessHandler<GraphAbstractState>;

    private readonly _config: GraphAnalysisConfig;

    constructor(config: {}, task: App, wrappedAnalysis: ProgramAnalysis<any, any, any>, statistics: AnalysisStatistics) {
        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(this.constructor.name);

        this._config = new GraphAnalysisConfig(config);
        this._task = Preconditions.checkNotUndefined(task);
        this._wrappedAnalysis = Preconditions.checkNotUndefined(wrappedAnalysis);
        this._abstractDomain = new GraphAbstractDomain(wrappedAnalysis.abstractDomain);
        this._transferRelation = new GraphTransferRelation(this._wrappedAnalysis, this._wrappedAnalysis);
        this._refiner = new WrappingRefiner(this._wrappedAnalysis.refiner, this);

        if (this._config.mergeIntoOperator == 'NoMergeIntoOperator') {
            this._mergeIntoOp = new NoMergeIntoOperator<GraphAbstractState, GraphAbstractState>();
        } else if (this._config.mergeIntoOperator == 'StandardMergeIntoOperator') {
            this._mergeIntoOp = new StandardMergeIntoOperator(this, this, this);
        } else {
            throw new IllegalArgumentException("Illegal merge operator configuration");
        }

        if (this._config.stopOperator == 'CheckCoverage') {
            this._stopOp = new GraphCoverCheckStopOperator(this.wrappedAnalysis, (e) => {return this.unwrap(e)});
        } else if (this._config.stopOperator == 'NoStop') {
            this._stopOp = new NoStopOperator();
        } else {
            throw new IllegalArgumentException("Illegal stop operator configuration");
        }

        if (this._config.witnessHandler == 'DoNothing') {
            this._witnessHandler = DummyHandler.create();
        } else if (this._config.witnessHandler == 'ExportWitness') {
            this._witnessHandler = new WitnessExporter(this);
        } else {
            throw new IllegalArgumentException("Illegal witness handler configuration");
        }
    }

    abstractSucc(fromState: GraphAbstractState): Iterable<GraphAbstractState> {
        return this._transferRelation.abstractSucc(fromState);
    }

    join(state1: GraphAbstractState, state2: GraphAbstractState): GraphAbstractState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    shouldMerge(state1: GraphAbstractState, state2: GraphAbstractState): boolean {
        return this._wrappedAnalysis.shouldMerge(state1.getWrappedState(), state2.getWrappedState());
    }

    merge(state1: GraphAbstractState, state2: GraphAbstractState): GraphAbstractState {
        return GraphAbstractStateFactory.withFreshID(
            state1.getPredecessors().union(state2.getPredecessors()),
            state1.getMergeOf().union(state2.getMergeOf()),
            this._wrappedAnalysis.merge(state1.getWrappedState(), state2.getWrappedState()),
            state1.getPartitionKeys());
    }

    mergeInto(state: GraphAbstractState, frontier: FrontierSet<GraphAbstractState>, reached: ReachedSet<GraphAbstractState>, unwrapper: (AbstractElement) => GraphAbstractState, wrapper: (E) => AbstractElement): [FrontierSet<GraphAbstractState>, ReachedSet<GraphAbstractState>] {
        return this._mergeIntoOp.mergeInto(state, frontier, reached, unwrapper, wrapper);
    }

    stop(state: GraphAbstractState, reached: Iterable<GraphAbstractState>, unwrapper: (GraphAbstractState) => GraphAbstractState): boolean {
        return this._stopOp.stop(state, reached, unwrapper);
    }

    target(state: GraphAbstractState): Property[] {
        return this._wrappedAnalysis.target(state.wrappedState);
    }

    widen(state: GraphAbstractState): GraphAbstractState {
        // TODO: Implement the widening (delegate to wrapped analyses)
        return state;
    }

    initialStatesFor(task: App): GraphAbstractState[] {
        Preconditions.checkArgument(task === this._task);
        return this._wrappedAnalysis.initialStatesFor(task).map((w) => {
            const partitionKeys = this._wrappedAnalysis.getPartitionKeys(w);
            return GraphAbstractStateFactory.withFreshID([],[],  w, partitionKeys);
        } );
    }

    exportAnalysisResult(reachedPrime: StateSet<AbstractState>, frontierPrime: StateSet<AbstractState>) {
        const exporter = new GraphToDot(this._task, this, this,
            reachedPrime as StateSet<GraphAbstractState>,
            frontierPrime as StateSet<GraphAbstractState>);

        exporter.writeToFile(`output/reachability-graph.dot`);
    }

    unwrap(e: GraphAbstractState): AbstractElement {
        return e.getWrappedState();
    }

    get refiner(): Refiner<GraphAbstractState> {
        return this._refiner;
    }

    get abstractDomain(): AbstractDomain<GraphConcreteState, GraphAbstractState> {
        return this._abstractDomain;
    }

    get wrappedAnalysis(): ProgramAnalysis<any, any, GraphAbstractState> {
        return this._wrappedAnalysis;
    }

    private onStateError(reached: GraphReachedSetWrapper<GraphAbstractState>, e: GraphAbstractState): void {
        const toDot = new GraphContextToDot(this._task, this, reached);
        toDot.writeContextToFile(`output/state-${e.getId()}-context.dot`, e.getId());
    }

    createStateSets(): [FrontierSet<GraphAbstractState>, ReachedSet<GraphAbstractState>] {
        let frontierSet;
        if (this._config.graphConstructionOrder == "DepthFirst") {
            frontierSet = new DefaultFrontierSet();
        } else if (this._config.graphConstructionOrder == "WaitAtMeet") {
            frontierSet = new PriorityFrontierSet<GraphAbstractState>(this);
        } else {
            throw new IllegalArgumentException("Invalid custruction order: " + this._config.graphConstructionOrder);
        }

        const reachedSet = new GraphReachedSetWrapper(frontierSet, this, (r, e) => {this.onStateError(r,e)});
        return [frontierSet, reachedSet];
    }

    getTransitionLabel(from: GraphAbstractState, to: GraphAbstractState): ProgramOperation[] {
        return this.wrappedAnalysis['getTransitionLabel'](from.getWrappedState(), to.getWrappedState());
    }

    partitionOf(ofState: GraphAbstractState, reached: ReachedSet<GraphAbstractState>): Iterable<GraphAbstractState> {
        return reached.getStateSet(ofState);
    }

    getPartitionKeys(element: GraphAbstractState): ImmSet<PartitionKey> {
        return element.getPartitionKeys();
    }

    handleViolatingState(reached: ReachedSet<GraphAbstractState>, violating: GraphAbstractState) {
        return this._witnessHandler.handleViolatingState(reached, violating);
    }

    compareStateOrder(a: GraphAbstractState, b: GraphAbstractState): number {
        if (!a || !b) {
            return CHOOSE_EITHER;
        }

        const wrappedResult = this.wrappedAnalysis.compareStateOrder(a.getWrappedState(), b.getWrappedState());
        if (wrappedResult == CHOOSE_EITHER) {
            if (a.getId() < b.getId()) {
                return CHOOSE_FIRST;
            } else {
                return CHOOSE_SECOND;
            }
        } else {
            return wrappedResult;
        }
    }

    getLexiOrderKey(ofState: GraphAbstractState): LexiKey {
        return this.wrappedAnalysis.getLexiOrderKey(ofState.getWrappedState());
    }

    finalizeResults(frontier: FrontierSet<GraphAbstractState>, reached: ReachedSet<GraphAbstractState>) {
        this.wrappedAnalysis.finalizeResults(frontier, reached);
    }


}
