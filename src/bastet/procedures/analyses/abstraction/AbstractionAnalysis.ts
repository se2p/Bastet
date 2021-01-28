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

import {MergeOperator, ProgramAnalysisWithLabels, StopOperator} from "../ProgramAnalysis";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {App} from "../../../syntax/app/App";
import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {Preconditions} from "../../../utils/Preconditions";
import {ConcreteElement} from "../../domains/ConcreteElements";
import {LabeledTransferRelation} from "../TransferRelation";
import {ProgramOperation} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {Refiner, Unwrapper} from "../Refiner";
import {Property} from "../../../syntax/Property";
import {FrontierSet, PartitionKey, ReachedSet, StateSet} from "../../algorithms/StateSet";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {Concern} from "../../../syntax/Concern";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {BastetConfiguration} from "../../../utils/BastetConfiguration";
import {Set as ImmSet} from "immutable";
import {LexiKey} from "../../../utils/Lexicographic";
import {AccessibilityRelation} from "../Accessibility";
import {AbstractionAbstractDomain, AbstractionState} from "./AbstractionAbstractDomain";
import {AbstractionTransferRelation} from "./AbstractionTransferRelation";
import {AbstractionMergeOperator} from "./AbstractionMergeOperator";
import {FirstOrderLattice, FirstOrderSolver} from "../../domains/FirstOrderDomain";
import {
    BooleanFormula,
    FirstOrderFormula,
    FloatFormula,
    IntegerFormula,
    ListFormula,
    RealFormula,
    StringFormula
} from "../../../utils/ConjunctiveNormalForm";
import {AbstractionRefiner} from "./AbstractionRefiner";
import {BooleanPredicateAbstraction, PredicateAbstraction} from "./AbstractionComputation";
import {TransformerTheories} from "../../domains/MemoryTransformer";
import {SSAAnalysis} from "../ssa/SSAAnalysis";
import {PredicatePrecisionLattice} from "../../AbstractionPrecision";
import {Optional} from "../../../utils/Optional";
import {AbstractionStopOperator} from "./AbstractionStopOperator";


export class AbstractionAnalysisConfig extends BastetConfiguration {

    constructor(dict: {}) {
        super(dict, ['AbstractionAnalysis']);
    }

    get abstractionType(): string {
        return this.getStringProperty('abstraction-type', "boolean").toLowerCase();
    }
}

export class AbstractionAnalysis implements ProgramAnalysisWithLabels<ConcreteElement, AbstractionState, AbstractState>,
    LabeledTransferRelation<AbstractionState>,
    Unwrapper<AbstractionState, AbstractElement> {

    private readonly _abstractDomain: AbstractionAbstractDomain;

    private readonly _wrappedAnalysis: ProgramAnalysisWithLabels<any, AbstractState, AbstractState>;

    private readonly _transferRelation: AbstractionTransferRelation;

    private readonly _refiner: AbstractionRefiner;

    private readonly _task: App;

    private readonly _statistics: AnalysisStatistics;

    private readonly _mergeOp: MergeOperator<AbstractionState>;

    private readonly _stopOp: StopOperator<AbstractionState, AbstractState>;

    private readonly _config: AbstractionAnalysisConfig;

    private readonly _solver: FirstOrderSolver<FirstOrderFormula>;

    constructor(config: {}, task: App, summaryLattice: FirstOrderLattice<FirstOrderFormula>,
                theories: TransformerTheories<FirstOrderFormula, BooleanFormula, IntegerFormula, RealFormula, FloatFormula, StringFormula, ListFormula>,
                wrappedAnalysis: SSAAnalysis,
                statistics: AnalysisStatistics) {
        this._config = new AbstractionAnalysisConfig(config);
        this._task = Preconditions.checkNotUndefined(task);
        this._wrappedAnalysis = Preconditions.checkNotUndefined(wrappedAnalysis);

        let abstractionComp: PredicateAbstraction;
        if (this._config.abstractionType == "boolean") {
            abstractionComp = new BooleanPredicateAbstraction(theories, summaryLattice.prover,
                new PredicatePrecisionLattice<FirstOrderFormula>(summaryLattice), wrappedAnalysis.abstractDomain.lattice);
        } else if (this._config.abstractionType == "cartesian") {
            throw new ImplementMeException();
        } else {
            throw new ImplementMeException();
        }

        this._abstractDomain = new AbstractionAbstractDomain(wrappedAnalysis.abstractDomain, summaryLattice, abstractionComp);
        this._transferRelation = new AbstractionTransferRelation(wrappedAnalysis, this._abstractDomain, theories);
        this._refiner = new AbstractionRefiner(config, this, this._abstractDomain.lattice, theories,
            this._abstractDomain.lattice.precStacLattice.lattice, summaryLattice.prover);

        this._statistics = Preconditions.checkNotUndefined(statistics).withContext(this.constructor.name);
        this._mergeOp = new AbstractionMergeOperator(this._task, this.wrappedAnalysis, this._abstractDomain.lattice);
        this._stopOp = new AbstractionStopOperator(this._abstractDomain, this._wrappedAnalysis);

        this._solver = summaryLattice.prover;
    }

    getTransitionLabel(from: AbstractionState, to: AbstractionState): ProgramOperation[] {
        return this._wrappedAnalysis.getTransitionLabel(from.getWrappedState(), to.getWrappedState());
    }

    abstractSucc(fromState: AbstractionState): Iterable<AbstractionState> {
        return this._transferRelation.abstractSucc(fromState);
    }

    abstractSuccFor(fromState: AbstractionState, op: ProgramOperation, co: Concern): Iterable<AbstractionState> {
        return this._transferRelation.abstractSuccFor(fromState, op, co);
    }

    join(state1: AbstractionState, state2: AbstractionState): AbstractionState {
        return this._abstractDomain.lattice.join(state1, state2);
    }

    shouldMerge(state1: AbstractionState, state2: AbstractionState): boolean {
        return this._mergeOp.shouldMerge(state1, state2);
    }

    merge(state1: AbstractionState, state2: AbstractionState): AbstractionState {
        return this._mergeOp.merge(state1, state2);
    }

    stop(state: AbstractionState, reached: Iterable<AbstractState>, unwrapper: (AbstractState) => AbstractionState): boolean {
        return this._stopOp.stop(state, reached, unwrapper);
    }

    target(state: AbstractionState): Property[] {
        return this._wrappedAnalysis.target(state.wrappedState);
    }

    widen(state: AbstractionState, reached: Iterable<AbstractState>): AbstractionState {
        return this._abstractDomain.widen(state, this._refiner.precisionFor(state));
    }

    isWideningState(state: AbstractionState): boolean {
        return true; // This analysis would always compute a widening
    }

    unwrap(e: AbstractionState): AbstractElement {
        return e.getWrappedState();
    }

    get refiner(): Refiner<AbstractState> {
        return this._refiner;
    }

    get abstractDomain(): AbstractDomain<ConcreteElement, AbstractionState> {
        return this._abstractDomain;
    }

    get wrappedAnalysis(): ProgramAnalysisWithLabels<any, any, AbstractState> {
        return this._wrappedAnalysis;
    }

    initialStatesFor(task: App): AbstractionState[] {
        Preconditions.checkArgument(task === this._task);
        return this._wrappedAnalysis.initialStatesFor(task).map((w) => {
            return new AbstractionState(0, this._abstractDomain.lattice.folLattice.top(), w, this._abstractDomain.lattice.precStacLattice.bottom(), Optional.absent())
                .withFreshBlockId();
        } );
    }

    createStateSets(): [FrontierSet<AbstractState>, ReachedSet<AbstractState>] {
        return this.wrappedAnalysis.createStateSets();
    }

    mergeInto(state: AbstractionState, frontier: StateSet<AbstractState>, reached: ReachedSet<AbstractState>, unwrapper: (AbstractState) => AbstractionState, wrapper: (E) => AbstractState): [FrontierSet<AbstractState>, ReachedSet<AbstractState>] {
        throw new ImplementMeException();
    }

    widenPartitionOf(ofState: AbstractionState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    stopPartitionOf(ofState: AbstractionState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    mergePartitionOf(ofState: AbstractionState, reached: ReachedSet<AbstractState>): Iterable<AbstractState> {
        throw new ImplementMeException();
    }

    getPartitionKeys(element: AbstractionState): ImmSet<PartitionKey> {
        return this._wrappedAnalysis.getPartitionKeys(element.getWrappedState());
    }

    handleViolatingState(reached: ReachedSet<AbstractState>, violating: AbstractState) {
        throw new ImplementMeException();
    }

    compareStateOrder(a: AbstractionState, b: AbstractionState): number {
        throw new ImplementMeException();
    }

    getLexiOrderKey(ofState: AbstractionState): LexiKey {
        return this._wrappedAnalysis.getLexiOrderKey(ofState.getWrappedState());
    }

    getLexiDiffKey(ofState: AbstractionState): LexiKey {
        return this._wrappedAnalysis.getLexiDiffKey(ofState.getWrappedState());
    }

    finalizeResults(frontier: FrontierSet<AbstractState>, reached: ReachedSet<AbstractState>) {
        return this._wrappedAnalysis.finalizeResults(frontier, reached);
    }

    testify(accessibility: AccessibilityRelation< AbstractState>, state: AbstractState): AccessibilityRelation< AbstractState> {
        return this._wrappedAnalysis.testify(accessibility, state);
    }

    testifyOne(accessibility: AccessibilityRelation< AbstractState>, state: AbstractState): AccessibilityRelation< AbstractState> {
        return this._wrappedAnalysis.testifyOne(accessibility, state);
    }

    testifyConcrete(accessibility: AccessibilityRelation< AbstractState>, state: AbstractState): Iterable<[AbstractState, ConcreteElement][]> {
        throw new ImplementMeException();
    }

    testifyConcreteOne(accessibility: AccessibilityRelation<AbstractState>, state: AbstractState): Iterable<[AbstractState, ConcreteElement][]> {
        return this._wrappedAnalysis.testifyConcreteOne(accessibility, state);
    }

    incRef(state: AbstractionState) {
        this._wrappedAnalysis.incRef(state.getWrappedState());
        this._solver.incRef(state.getEnteringSummary());
    }

    decRef(state: AbstractionState) {
        this.wrappedAnalysis.decRef(state.getWrappedState());
        this._solver.decRef(state.getEnteringSummary());
    }

    accessibility(reached: ReachedSet<AbstractState>, state: AbstractState): AccessibilityRelation< AbstractState> {
        throw new ImplementMeException();
    }

}
