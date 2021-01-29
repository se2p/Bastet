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

import {
    MergeIntoOperator,
    ProgramAnalysis,
    StopOperator,
    TransitionLabelProvider,
    WrappingProgramAnalysis,
} from "../ProgramAnalysis";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {GraphAbstractDomain, GraphAbstractState, GraphAbstractStateFactory} from "./GraphAbstractDomain";
import {App} from "../../../syntax/app/App";
import {GraphTransferRelation} from "./GraphTransferRelation";
import {AbstractElement, AbstractState, Lattices} from "../../../lattices/Lattice";
import {
    CHOOSE_EITHER,
    CHOOSE_FIRST,
    CHOOSE_SECOND,
    DefaultFrontierSet, DifferencingFrontierSet,
    FrontierSet,
    PartitionKey,
    ReachedSet,
    StatePartitionOperator,
    StateSet,
} from "../../algorithms/StateSet";
import {Preconditions} from "../../../utils/Preconditions";
import {GraphToDot} from "./GraphToDot";
import {Refiner, Unwrapper, WrappingRefiner} from "../Refiner";
import {Property} from "../../../syntax/Property";
import {GraphReachedSetWrapper} from "./GraphStatesSetWrapper";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {NewMergeIntoOperator, NoMergeIntoOperator, NoStopOperator, StandardMergeIntoOperator} from "../Operators";
import {BastetConfiguration} from "../../../utils/BastetConfiguration";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {Set as ImmSet} from "immutable";
import {GraphContextToDot} from "./GraphContextToDot";
import {GraphCoverCheckStopOperator} from "./GraphCoverCheckStopOperator";
import {DummyHandler, WitnessHandler} from "../WitnessHandlers";
import {WitnessExporter} from "./witnesses/WitnessExporter";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {LexiKey} from "../../../utils/Lexicographic";
import {AccessibilityRelation, AccessibilityRelations} from "../Accessibility";
import {ConcreteElement} from "../../domains/ConcreteElements";
import {PathExporter} from "./witnesses/PathExporter";
import {IfMergedStopOperator} from "./IfMergedStopOperator";
import {Optional} from "../../../utils/Optional";

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

    get checkTargetFeasibility(): boolean {
        return this.getBoolProperty('checkTargetFeasibility', false);
    }


    get graphConstructionOrder(): string {
        return this.getStringProperty('graphConstructionOrder', 'WaitAtMeet');
    }

}

export class GraphAnalysis implements WrappingProgramAnalysis<ConcreteElement, GraphAbstractState, GraphAbstractState>,
    Unwrapper<GraphAbstractState, AbstractElement>, StatePartitionOperator<GraphAbstractState>,
    TransitionLabelProvider<GraphAbstractState> {

    private readonly _abstractDomain: AbstractDomain<ConcreteElement, GraphAbstractState>;

    private readonly _wrappedAnalysis: ProgramAnalysis<any, any, any>;

    private readonly _transferRelation: GraphTransferRelation;

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
        this._transferRelation = new GraphTransferRelation(this._wrappedAnalysis, this._wrappedAnalysis, this._wrappedAnalysis, this._statistics);

        if (this._config.mergeIntoOperator == 'NoMergeIntoOperator') {
            this._mergeIntoOp = new NoMergeIntoOperator<GraphAbstractState, GraphAbstractState>();
        } else if (this._config.mergeIntoOperator == 'NewMergeIntoOperator') {
            this._mergeIntoOp = new NewMergeIntoOperator(this, this, this._statistics);
        } else if (this._config.mergeIntoOperator == 'StandardMergeIntoOperator') {
            this._mergeIntoOp = new StandardMergeIntoOperator(this, this, this._statistics);
        } else {
            throw new IllegalArgumentException("Illegal merge operator configuration");
        }

        if (this._config.stopOperator == 'CheckCoverage') {
            this._stopOp = new GraphCoverCheckStopOperator(this.wrappedAnalysis, (e) => {
                return this.unwrap(e)
            });
        } else if (this._config.stopOperator == 'NoStop') {
            this._stopOp = new NoStopOperator();
        } else if (this._config.stopOperator == 'IfMerged') {
            this._stopOp = new IfMergedStopOperator();
        } else {
            throw new IllegalArgumentException("Illegal stop operator configuration");
        }

        if (this._config.witnessHandler == 'DoNothing') {
            this._witnessHandler = DummyHandler.create();
        } else if (this._config.witnessHandler == 'ExportWitness') {
            this._witnessHandler = new WitnessExporter(this, this, this._task);
        } else if (this._config.witnessHandler == 'ExportPath') {
            this._witnessHandler = new PathExporter(this, this);
        } else {
            throw new IllegalArgumentException("Illegal witness handler configuration");
        }
    }

    chooseFinitePathAlong(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): AbstractState[] {
        throw new ImplementMeException();
    }

    abstractSucc(fromState: GraphAbstractState): Iterable<GraphAbstractState> {
        const result: GraphAbstractState[] = [];
        for (const succ of this._transferRelation.abstractSucc(fromState)) {
            if (this.target(succ).length > 0) {
                // Only add feasible states (avoids to check the feasibility of the full trace, if done in the refiner)
                if (this._config.checkTargetFeasibility) {
                    if (!Lattices.isFeasible(succ, this._abstractDomain.lattice, "Block Target Feasibility")) {
                        continue;
                    }
                }
            }
            result.push(succ);
        }

        return result;
    }

    join(state1: GraphAbstractState, state2: GraphAbstractState): GraphAbstractState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    shouldMerge(state1: GraphAbstractState, state2: GraphAbstractState): boolean {
        return this._wrappedAnalysis.shouldMerge(state1.getWrappedState(), state2.getWrappedState());
    }

    merge(state1: GraphAbstractState, state2: GraphAbstractState): GraphAbstractState {
        Preconditions.checkArgument(state1.getMergeOf().size > 0);
        Preconditions.checkArgument(state2.getMergeOf().size > 0);
        Preconditions.checkArgument(state2.getWideningOf().isAbsent());

        return GraphAbstractStateFactory.withFreshID(
                state1.getPredecessors().union(state2.getPredecessors()),
                state1.getMergeOf().union(state2.getMergeOf()),
                this._wrappedAnalysis.merge(state1.getWrappedState(), state2.getWrappedState()),
                state1.getPartitionKeys(), state1.orderKey, state1.getWideningOf())
            .withOrderKey(state1.orderKey);
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

    isWideningState(state: GraphAbstractState): boolean {
        return this.wrappedAnalysis.isWideningState(state.getWrappedState());
    }

    widen(state: GraphAbstractState, reached: Iterable<GraphAbstractState>): GraphAbstractState {
        const wrappedResult = this._wrappedAnalysis.widen(state.getWrappedState(), reached);
        if (wrappedResult != state.getWrappedState()) {
            return state.withWrappedState(wrappedResult)
                .withWideningOf(Optional.of(state));
        } else {
            return state;
        }
    }

    initialStatesFor(task: App): GraphAbstractState[] {
        Preconditions.checkArgument(task === this._task);
        return this._wrappedAnalysis.initialStatesFor(task).map((w) => {
            const partitionKeys = this._wrappedAnalysis.getPartitionKeys(w);
            return GraphAbstractStateFactory.withFreshID([],[],  w, partitionKeys, new LexiKey([]),
                Optional.absent<GraphAbstractState>());
        } );
    }

    exportAnalysisResult(reachedPrime: StateSet<AbstractState>, frontierPrime: StateSet<AbstractState>) {
        const exporter = new GraphToDot(this._task, this, this, this,
            reachedPrime as StateSet<GraphAbstractState>,
            frontierPrime as StateSet<GraphAbstractState>);

        exporter.writeToFile(`output/reachability-graph.dot`);
    }

    unwrap(e: GraphAbstractState): AbstractElement {
        return e.getWrappedState();
    }

    get refiner(): Refiner<GraphAbstractState> {
        return new WrappingRefiner(this._wrappedAnalysis.refiner);
    }

    get abstractDomain(): AbstractDomain<ConcreteElement, GraphAbstractState> {
        return this._abstractDomain;
    }

    get wrappedAnalysis(): ProgramAnalysis<any, any, GraphAbstractState> {
        return this._wrappedAnalysis;
    }

    private onStateError(reached: GraphReachedSetWrapper<GraphAbstractState>, e: GraphAbstractState): void {
        const toDot = new GraphContextToDot(this._task, this, this, reached);
        toDot.writeContextToFile(`output/state-${e.getId()}-context.dot`, e.getId());
    }

    createStateSets(): [FrontierSet<GraphAbstractState>, ReachedSet<GraphAbstractState>] {
        let frontierSet;
        if (this._config.graphConstructionOrder == "DepthFirst") {
            frontierSet = new DefaultFrontierSet();
        } else if (this._config.graphConstructionOrder == "WaitAtMeet") {
            frontierSet = new DifferencingFrontierSet<GraphAbstractState>((e) => this.getLexiDiffKey(e), (e, f) => this.compareStateOrder(e, f), this);
        } else {
            throw new IllegalArgumentException("Invalid custruction order: " + this._config.graphConstructionOrder);
        }

        const reachedSet = new GraphReachedSetWrapper(frontierSet, this, (r, e) => {this.onStateError(r,e)}, this);
        return [frontierSet, reachedSet];
    }

    getTransitionLabel(from: GraphAbstractState, to: GraphAbstractState): ProgramOperation[] {
        return this.wrappedAnalysis['getTransitionLabel'](from.getWrappedState(), to.getWrappedState());
    }

    stopPartitionOf(ofState: GraphAbstractState, reached: ReachedSet<GraphAbstractState>): Iterable<GraphAbstractState> {
        return reached.getStateSet(ofState);
    }

    widenPartitionOf(ofState: GraphAbstractState, reached: ReachedSet<GraphAbstractState>): Iterable<GraphAbstractState> {
        return reached.getStateSet(ofState);
    }

    mergePartitionOf(ofState: GraphAbstractState, reached: ReachedSet<GraphAbstractState>): Iterable<GraphAbstractState> {
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
        return ofState.orderKey;
    }

    getLexiDiffKey(ofState: GraphAbstractState): LexiKey {
        return this.wrappedAnalysis.getLexiDiffKey(ofState.getWrappedState());
    }

    finalizeResults(frontier: FrontierSet<GraphAbstractState>, reached: ReachedSet<GraphAbstractState>) {
        this.wrappedAnalysis.finalizeResults(frontier, reached);
    }

    testify(accessibility: AccessibilityRelation<GraphAbstractState>, state: GraphAbstractState): AccessibilityRelation<GraphAbstractState> {
        return this.wrappedAnalysis.testify(accessibility, state);
    }

    testifyOne(accessibility: AccessibilityRelation<GraphAbstractState>, state: GraphAbstractState): AccessibilityRelation<GraphAbstractState> {
        const reaching = AccessibilityRelations.backwardsAccessible(accessibility, state, this, this.abstractDomain);
        return this.wrappedAnalysis.testifyOne(reaching, state);
    }

    testifyConcrete(accessibility: AccessibilityRelation<GraphAbstractState>, state: GraphAbstractState): Iterable<[GraphAbstractState, ConcreteElement][]> {
        return this.wrappedAnalysis.testifyConcrete(accessibility, state);
    }

    testifyConcreteOne(accessibility: AccessibilityRelation<GraphAbstractState>, state: GraphAbstractState): Iterable<[GraphAbstractState, ConcreteElement][]> {
        const reaching = AccessibilityRelations.backwardsAccessible(accessibility, state, this, this.abstractDomain);
        return this.wrappedAnalysis.testifyConcreteOne(reaching, state);
    }

    accessibility(reached: ReachedSet<GraphAbstractState>, state: GraphAbstractState): AccessibilityRelation<GraphAbstractState> {
        return reached as GraphReachedSetWrapper<GraphAbstractState>;
    }

    incRef(state: GraphAbstractState) {
        this.wrappedAnalysis.incRef(state.getWrappedState());
    }

    decRef(state: GraphAbstractState) {
        this.wrappedAnalysis.decRef(state.getWrappedState());
    }

}
