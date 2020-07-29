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

import {LabeledTransferRelation, TransferRelation, Transfers} from "../TransferRelation";
import {
    ControlAbstractState,
    IndexedThread,
    MethodCall,
    RelationLocation,
    ThreadComputationState,
    ThreadId,
    ThreadState,
    ThreadStateFactory
} from "./ControlAbstractDomain";
import {AbstractElement, Lattices} from "../../../lattices/Lattice";
import {ControlAnalysisConfig} from "./ControlAnalysis";
import {App} from "../../../syntax/app/App";
import {Preconditions} from "../../../utils/Preconditions";
import {ImplementMeException, ImplementMeForException} from "../../../core/exceptions/ImplementMeException";
import {
    TransitionLoop,
    TransitionRelation,
    TransitionRelations,
    TransitionTo
} from "../../../syntax/app/controlflow/TransitionRelation";
import {Actor, ActorId} from "../../../syntax/app/Actor";
import {
    OperationId,
    ProgramOperation,
    ProgramOperationFactory,
    ProgramOperations,
    RawOperation
} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {List as ImmList, Map as ImmMap, Set as ImmSet} from "immutable";
import {ScopeTransformerVisitor} from "./DataLocationScoping";
import {mapExpand} from "../../../utils/Functional";
import {CallStatement} from "../../../syntax/ast/core/statements/CallStatement";
import {MethodIdentifiers} from "../../../syntax/app/controlflow/MethodIdentifiers";
import {Properties, Property} from "../../../syntax/Property";
import {Method} from "../../../syntax/app/controlflow/Method";
import {
    BeginAtomicStatement,
    EndAtomicStatement,
    ReturnStatement
} from "../../../syntax/ast/core/statements/ControlStatement";
import {BroadcastMessageStatement} from "../../../syntax/ast/core/statements/BroadcastMessageStatement";
import {BroadcastAndWaitStatement} from "../../../syntax/ast/core/statements/BroadcastAndWaitStatement";
import {WaitUntilStatement} from "../../../syntax/ast/core/statements/WaitUntilStatement";
import {WaitSecsStatement} from "../../../syntax/ast/core/statements/WaitSecsStatement";
import {Logger} from "../../../utils/Logger";
import {ExpressionList} from "../../../syntax/ast/core/expressions/ExpressionList";
import {Statement, StatementList} from "../../../syntax/ast/core/statements/Statement";
import {ParameterDeclaration} from "../../../syntax/ast/core/ParameterDeclaration";
import {Expression} from "../../../syntax/ast/core/expressions/Expression";
import {VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {DataLocation, DataLocations} from "../../../syntax/app/controlflow/DataLocation";
import {DeclareStackVariableStatement} from "../../../syntax/ast/core/statements/DeclarationStatement";
import {StoreEvalResultToVariableStatement} from "../../../syntax/ast/core/statements/SetStatement";
import {
    extractStringLiteral,
    StringExpression,
    StringLiteral
} from "../../../syntax/ast/core/expressions/StringExpression";
import {
    AfterStatementMonitoringEvent, MessageNamespace,
    MessageReceivedEvent, QualifiedMessageNamespace,
    TerminationEvent, UnqualifiedMessageNamespace
} from "../../../syntax/ast/core/CoreEvent";
import {Concern, Concerns} from "../../../syntax/Concern";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {Script, ScriptId} from "../../../syntax/app/controlflow/Script";
import {getTheNextElement, getTheOnlyElement} from "../../../utils/Collections";
import {LocationId} from "../../../syntax/app/controlflow/ControlLocation";
import {
    ActorDestination,
    BOOTSTRAP_FINISHED_MESSAGE,
    isBootstrapFinishedMessage, NamedDestination,
    SystemMessage
} from "../../../syntax/ast/core/Message";
import {ActorType} from "../../../syntax/ast/core/ScratchType";
import {
    ActorSelfExpression,
    LocateActorExpression,
    StartCloneActorExpression,
    UsherActorExpression
} from "../../../syntax/ast/core/expressions/ActorExpression";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {
    BooleanExpression,
    BooleanLiteral,
    NumGreaterEqualExpression
} from "../../../syntax/ast/core/expressions/BooleanExpression";
import {Identifier} from "../../../syntax/ast/core/Identifier";
import {OptionalAstNode} from "../../../syntax/ast/AstNode";
import {
    SignalTargetReachedStatement,
    TerminateProgramStatement
} from "../../../syntax/ast/core/statements/InternalStatement";
import {AbstractDomain} from "../../domains/AbstractDomain";
import {ConcreteElement} from "../../domains/ConcreteElements";
import {
    IntegerLiteral,
    MultiplyExpression,
    NumberExpression,
    NumberVariableExpression,
    PlusExpression
} from "../../../syntax/ast/core/expressions/NumberExpression";
import {freshId} from "../../../utils/Seq";
import {RelationBuildingVisitor} from "../../../syntax/app/controlflow/RelationBuildingVisitor";
import {AnalysisStatistics} from "../AnalysisStatistics";
import {incBigStep} from "../label/LabelAnalysis";

/**
 * Mimics the green-threading of the Scratch VM.
 * Adds special scheduling of some (types of) threads.
 */
export class ControlTransferRelation implements TransferRelation<ControlAbstractState> {

    private readonly _wrappedDomain: AbstractDomain<ConcreteElement, AbstractElement>;

    private readonly _wrappedTransferRelation: LabeledTransferRelation<AbstractElement>;

    private readonly _config: ControlAnalysisConfig;

    private readonly _task: App;

    private readonly _accelInfoMap: Map<ScriptId, AccelInfo>;

    // Statistics
    private readonly _stats: AnalysisStatistics;
    private readonly _resolveOpsStats: AnalysisStatistics;
    private readonly _chooseStats: AnalysisStatistics;
    private readonly _interpreteStats: AnalysisStatistics;
    private readonly _checkCondStats: AnalysisStatistics;
    private readonly _scheduleStats: AnalysisStatistics;
    private readonly _wrappedTransferStats: AnalysisStatistics;

    constructor(config: ControlAnalysisConfig, task: App, wrappedTransferRelation: LabeledTransferRelation<AbstractElement>,
                wrappedDomain: AbstractDomain<ConcreteElement, AbstractElement>,
                statistics: AnalysisStatistics) {
        this._task = Preconditions.checkNotUndefined(task);
        this._config = Preconditions.checkNotUndefined(config);
        this._wrappedTransferRelation = Preconditions.checkNotUndefined(wrappedTransferRelation);
        this._wrappedDomain = Preconditions.checkNotUndefined(wrappedDomain);
        this._accelInfoMap = new Map();

        // Initialize some statistic counters
        this._stats = Preconditions.checkNotUndefined(statistics).withContext("Transfer");
        this._resolveOpsStats = this._stats.withContext("ResolveLeavingOps");
        this._chooseStats = this._stats.withContext("Choose");
        this._interpreteStats = this._stats.withContext("Interprete");
        this._checkCondStats = this._stats.withContext("CheckCond");
        this._scheduleStats = this._stats.withContext("Schedule");
        this._wrappedTransferStats = this._stats.withContext("WrappedTransfer");
    }

    /**
     * @inheritDoc
     */
    public abstractSucc(fromState: ControlAbstractState): Iterable<ControlAbstractState> {
        Preconditions.checkNotUndefined(fromState);
        Preconditions.checkNotUndefined(fromState.wrappedState);

        if (fromState.getIsTargetFor().size > 0) {
            // No successor states after target states
            // (the state space should split in case a target state is reached)
            return [];
        }

        if (this._config.aggregateAtomicTransitions) {
            // Do not provide intermediate abstract states for atomic operations?
            // This might cause problems if interpolation procedures are applied.
            // It would be better tu just use a projection of the ARG in case
            // details of atomic code blocks should be hidden (to the user).
            throw new IllegalStateException("We always produce intermediate states of atomic code blocks for given reasons.");
        } else {
            return this.abstractSuccSingleStep(fromState);
        }
    }

    /**
     * Compute the set of abstract successor states based on the control transition
     * system of the active threads; step one thread only. Several successor
     * states might get produced, for example, in case the control flow branches.
     *
     * We assume that the scheduler behaves deterministically and do not produce
     * several successor states based on different schedules.
     *
     * @param fromState
     */
    abstractSuccSingleStep(fromState: ControlAbstractState): Iterable<ControlAbstractState> {
        let result: ControlAbstractState[] = [];

        // Choose threads to step.
        // - Typically all those threads that have been previously scheduled to run.
        // - Running specification (observer) threads become executed first
        const threadsToStep: IndexedThread[] = this.chooseThreadsToStep(fromState);
        Preconditions.checkState(threadsToStep.length <= 1,
            "For now, we assume that only one thread is executed concurrently");

        for (const threadToStep of threadsToStep) {
            Preconditions.checkState(threadToStep.threadStatus.getComputationState() === ThreadComputationState.THREAD_STATE_RUNNING);

            // Determine the operations to execute on for the given thread
            const leavingOps: StepInformation[] = this.resolveLeavingOps(fromState, threadToStep);
            Preconditions.checkState(leavingOps.length > 0,
                "A thread with no leaving ops must NOT be in state THREAD_STATE_RUNNING");

            for (const op of leavingOps) { // Multiple leaving ops in case of branchings
                incBigStep(); // FIXME: <--- this is a hack to get the labeling right

                // Interpret the operation `op` for thread `threadToStep` in state `fromState`
                this._interpreteStats.startTimer();
                const succStates0: ControlAbstractState[] = this.interprete(fromState, threadToStep, op);
                this._interpreteStats.stopTimer();

                // Wake up threads (set status YIELD) that have been waiting for a condition to be reached
                this._checkCondStats.startTimer();
                const succStates1: ControlAbstractState[] = mapExpand(succStates0, (e) => this.awaikConditionCheckThreads(e));
                this._checkCondStats.stopTimer();

                // Schedule the threads to run in the next iterations
                this._scheduleStats.startTimer();
                for (const succState of succStates1) {
                    result = result.concat(this.schedule(fromState, succState, threadToStep.threadIndex));
                }
                this._scheduleStats.stopTimer();
            }
        }

        return this.trackSteppedThreads(result);
    }

    /**
     * Keep track of the last threads that were stepped by concern (program or observer/spec).
     */
    private trackSteppedThreads(states: Iterable<ControlAbstractState>): Iterable<ControlAbstractState> {
        const result: ControlAbstractState[] = [];

        for (const state of states) {
            const nonobservers: Set<number> = new Set();
            const observers: Set<number> = new Set();

            // Determine the types of the stepped threads
            for (const ix of state.getSteppedFor()) {
                const t: ThreadState = state.getThreadStates().get(ix);
                if (this.isObserverThread(t)) {
                    observers.add(ix);
                } else {
                    nonobservers.add(ix);
                }
            }

            // Conduct the tracking
            // (if one observer thread is stepped, we assume that all stepped threads are observers).
            if (observers.size == 0) {
                Preconditions.checkState(nonobservers.size >= 0);
                result.push(state.withLastSteppedNonObserverThreadIndices(nonobservers));
            } else {
                // Observers where stepped
                Preconditions.checkState(nonobservers.size == 0);
                result.push(state)
            }
        }

        return result;
    }

    /**
     * Get the list of indices of threads in the list of threads
     * that should make a step.
     *
     * @param fromState
     */
    private chooseThreadsToStep(fromState: ControlAbstractState): IndexedThread[] {
        Preconditions.checkNotUndefined(fromState);
        Preconditions.checkArgument(fromState.getThreadStates().size > 0);

        const result: IndexedThread[] = [];
        let index = 0;
        for (const t of fromState.getThreadStates()) {
            if (t.getComputationState() == ThreadComputationState.THREAD_STATE_RUNNING) {
                result.push(new IndexedThread(t, index));
            }
            index++;
        }

        return result;
    }

    private buildScopeStack(actorName: string, relationName: string): ImmList<string> {
        return ImmList([actorName, relationName]);
    }

    /**
     * Returns either a singleton-list or the empty list.
     */
    private resolveLeavingOps(fromState: ControlAbstractState, thread: IndexedThread): StepInformation[] {
        this._resolveOpsStats.startTimer();
        const threadState = thread.threadStatus;
        const fromLocation: RelationLocation = threadState.getRelationLocation();
        const fromRelation: TransitionRelation = this._task.getTransitionRelationById(fromLocation.getRelationId());
        const threadActor: Actor = this._task.getActorByName(threadState.getActorId());

        let result: StepInformation[] = [];
        for (const t of fromRelation.transitionsFrom(fromLocation.getLocationId())) {
            const isAtomic = false;
            const op: ProgramOperation = ProgramOperations.withID(t.opId);
            const statementTarget = new RelationLocation(threadActor.ident, fromRelation.ident, t.target);
            Preconditions.checkNotUndefined(op);

            const scopeStack: ImmList<string> = this.buildScopeStack(threadActor.ident, fromRelation.name);

            result.push(new StepInformation(thread, statementTarget, isAtomic,
                this.scopeOperations([op], fromState.getActorScopes(), scopeStack, scopeStack),
                    threadState.getCallStack(), scopeStack));
        }

        this._resolveOpsStats.stopTimer();
        return result;
    }

    private scopeOperations(ops: ProgramOperation[], actorScopes: ImmMap<DataLocation, string>, readFromScope: ImmList<string>,
                            writeToScope: ImmList<string>): ProgramOperation[] {
        const scoper = new ScopeTransformerVisitor(this._task, actorScopes, readFromScope, writeToScope);
        return ops.map((o) => ProgramOperationFactory.createFor(o.ast.accept(scoper)));
    }

    private interprete(fromState: ControlAbstractState, threadToStep: IndexedThread,
                       step: StepInformation): ControlAbstractState[] {
        const result: ControlAbstractState[] = [];

        // Interpretation by this analysis
        const withControlResults: [ControlAbstractState, boolean][] = this.interpreteLocal(fromState, threadToStep, step);

        for (const [r, considerInterpretationFinished] of withControlResults){
            // Interpret the wrapped state by the wrapped analysis
            const threadToStepPrime = r.getIndexedThreadState(threadToStep.threadIndex);
            const ops = threadToStepPrime.threadStatus.getOperations().map((oid) => ProgramOperation.for(oid));
            const opsConcern = this._task.getActorByName(threadToStepPrime.threadStatus.getActorId()).concern;

            this._wrappedTransferStats.startTimer();
            const wrappedAnalysisResults: Iterable<AbstractElement> = considerInterpretationFinished
                ? [r.getWrappedState()]
                : Transfers.withIntermediateOps(this._wrappedTransferRelation, r.wrappedState, ops, opsConcern);
            this._wrappedTransferStats.stopTimer();

            // Combine the result
            Preconditions.checkNotUndefined(r);
            for (const w of wrappedAnalysisResults) {
                Preconditions.checkNotUndefined(w);
                const properties = this.extractFailedForProperties(r.getThreadStates());
                result.push(r.withWrappedState(w)
                    .withSteppedFor([step.steppedThread.threadIndex])
                    .withThreadStateUpdate(step.steppedThread.threadIndex, (ts) => ts.withOperations(ImmList()))
                    .withIsTargetFor(properties));
            }
        }

        // Set states do DONE if on the last location and RUNNING
        return result.map((cs) => this.switchToTerminated(cs));
    }

    private switchToTerminated(cs: ControlAbstractState) {
        let result: ControlAbstractState = cs;

        for (const [ti, ts] of result.threadStates.entries()) {
            if (ts.getComputationState() != ThreadComputationState.THREAD_STATE_FAILURE) {
                if (ts.getWaitingForThreads().size == 0) { // might wight for a condition check thread, which might conduct acceleration
                    const leaving = this.resolveLeavingOps(cs, new IndexedThread(ts, ti));
                    if (leaving.length == 0) {
                        result = result.withThreadStateUpdate(ti, (ts) => ts.withComputationState(ThreadComputationState.THREAD_STATE_DONE));
                    }
                }
            }
        }

        return result;
    }

    private extractFailedForProperties(sched: ImmList<ThreadState>): ImmSet<Property> {
        const properties = [];
        for (const t of sched) {
            for (const p of t.getFailedFor()) {
                properties.push(p);
            }
        }
        return ImmSet(properties);
    }

    private interpreteLocal(fromState: ControlAbstractState, threadToStep: IndexedThread,
                            step: StepInformation): [ControlAbstractState, boolean][] {
       const result0: [ControlAbstractState, boolean][] = this.interpreteLocal0(fromState, threadToStep, step);

       const resultPrime: [ControlAbstractState, boolean][] = [];
       for (const [cs, handled] of result0) {
          if (handled) {
              resultPrime.push([cs, handled]);
          } else {
              const threadToStepPrime = cs.getIndexedThreadState(threadToStep.threadIndex).threadStatus;
              const stepOps = threadToStepPrime.getOperations().map((oid) => ProgramOperation.for(oid));

              let unhandledOps: ImmList<OperationId> = ImmList();
              let csPrime = cs;
              for (const stepOp of stepOps) {
                  if (stepOp.ast instanceof StoreEvalResultToVariableStatement) {
                      // TODO: Check if some of this code can be moved to the
                      //      Scratch library to allow for a symbolic encoding.
                      if (stepOp.ast.variable.variableType == ActorType.instance()) {
                          const variableToSet = stepOp.ast.variable;
                          let setTo: ActorId = null;

                          if (stepOp.ast.toValue instanceof VariableWithDataLocation) {
                              const actorIdentifier: ActorId = fromState.getActorScopes().get(stepOp.ast.toValue.dataloc);
                              setTo = Preconditions.checkNotUndefined(actorIdentifier, `Actor not identified!: ${stepOp.ast.toTreeString()}`);

                          } else if (stepOp.ast.toValue instanceof LocateActorExpression) {
                              const expr = stepOp.ast.toValue as LocateActorExpression;
                              const searchFor = extractStringLiteral(expr.actorName);

                              // This loop only ensures that an actor with the given name exists.
                              for (const [actorVar, id] of fromState.getActorScopes().entries()) {
                                  if (id == searchFor) {
                                      setTo = id;
                                  }
                              }

                          } else if (stepOp.ast.toValue instanceof StartCloneActorExpression) {
                              throw new ImplementMeException();

                          } else if (stepOp.ast.toValue instanceof UsherActorExpression) {
                              throw new ImplementMeException();

                          } else {
                              throw new ImplementMeException();
                          }

                          if (!setTo) {
                              throw new IllegalArgumentException("Actor expression did not evaluate to a valid result for: "
                                  + stepOp.ast.toTreeString());
                          }
                          const actorScopesPrime = csPrime.getActorScopes().set(variableToSet.dataloc, setTo);
                          csPrime = csPrime.withActorScopes(actorScopesPrime);

                      } else {
                          unhandledOps = unhandledOps.push(stepOp.ident);
                      }
                  } else {
                      unhandledOps = unhandledOps.push(stepOp.ident);
                  }
              }

              csPrime = csPrime.withThreadStateUpdate(threadToStep.threadIndex,
                  (ts) => ts.withOperations(unhandledOps));

              resultPrime.push([csPrime, unhandledOps.size == 0])
          }
       }

       return resultPrime;
    }

    private createConditionCheckThread(actorId: ActorId, condition: BooleanExpression): ThreadState {
        const threadId = ThreadStateFactory.freshId();
        const actor: Actor = this._task.getActorByName(actorId);
        const script: Script = this._task.getConditionCheckScript(actor, condition);
        const entryLocation: RelationLocation = new RelationLocation(actor.ident, script.transitions.ident, getTheOnlyElement(script.transitions.entryLocationSet));

        return new ThreadState(threadId, actorId, script.id, ImmList(), entryLocation, ThreadComputationState.THREAD_STATE_YIELD,
            ImmSet(), ImmSet(), ImmList(), ImmList(), ImmMap(), 1);
    }

    private getLoopAction(predLoopStack: ImmList<RelationLocation>, predRelLoc: RelationLocation, succRelLoc: RelationLocation): LoopAction {
        const predRel = this._task.getTransitionRelationById(predRelLoc.getRelationId());
        const succRel = this._task.getTransitionRelationById(succRelLoc.getRelationId());

        if (predRel.isLoopHead(predRelLoc.location)) {
            const predIsLoopHeadOf: TransitionLoop = predRel.getIsLoopHeadOf(predRelLoc.getLocationId());
            const succIsLoopHeadOf: TransitionLoop = succRel.getIsLoopHeadOf(succRelLoc.getLocationId());
            const predInBodyOf: TransitionLoop = predRel.getIsInLoopBodyOf(predRelLoc.getLocationId());
            const succInBodyOf: TransitionLoop = succRel.getIsInLoopBodyOf(succRelLoc.getLocationId());

            if (succInBodyOf) {
                if (predIsLoopHeadOf == succInBodyOf ) {
                    // case 1: succ is in the same loop --> entering or re-entering the loop
                    return new LoopAction(LoopActionType.ENTERING, succInBodyOf, succRelLoc.withLocationId(succInBodyOf.loopHead));
                }
            } else if (predIsLoopHeadOf == succIsLoopHeadOf) {
                // Self-Loop the the loop header
                return new LoopAction(LoopActionType.ENTERING, succIsLoopHeadOf, succRelLoc.withLocationId(succIsLoopHeadOf.loopHead));
            }

            if (predIsLoopHeadOf != succInBodyOf) {
                if (!predLoopStack.isEmpty()) {
                    const topElement: RelationLocation = predLoopStack.get(predLoopStack.size-1);
                    // case 2: succ is not the same loop --> leaving the loop
                    if (topElement.equals(predRelLoc)) {
                        return new LoopAction(LoopActionType.LEAVING, predIsLoopHeadOf, predRelLoc.withLocationId(predIsLoopHeadOf.loopHead));
                    }
                }
            }
        }

        return new LoopAction(LoopActionType.NONE, null, null);
    }

    private interpreteLocal0(fromState: ControlAbstractState, threadToStep: IndexedThread,
                       step: StepInformation): [ControlAbstractState, boolean][] {
        Preconditions.checkNotUndefined(fromState);
        Preconditions.checkNotUndefined(threadToStep);
        Preconditions.checkNotUndefined(step);

        Preconditions.checkArgument(step.ops.length === 1);
        const stepOp = step.ops[0];
        const steppedActor = this._task.getActorByName(step.steppedThread.threadStatus.getActorId());
        const fromLocation = step.steppedThread.threadStatus.getRelationLocation();
        const fromRelation = this._task.getTransitionRelationById(fromLocation.getRelationId());

        // Set the new control location
        let result: ControlAbstractState = fromState.withThreadStateUpdate(threadToStep.threadIndex,
            (ts) =>
                ts.withLocation(step.succLoc)
                .withOperations(ImmList(step.ops.map(o => o.ident)))
                .withCallStack(step.succCallStack));

        // A new loop iteration? Or a loop iteration ended?
        const predRelLoc = step.steppedThread.threadStatus.getRelationLocation();
        const succRelLoc = step.succLoc;
        const predLoopStack = step.steppedThread.threadStatus.getLoopStack();

        const loopAction = this.getLoopAction(predLoopStack, predRelLoc, succRelLoc);
        switch (loopAction.type) {
            case LoopActionType.ENTERING: {
                const newLoopStack: ImmList<RelationLocation> = predLoopStack.push(loopAction.loopHead);
                result = result.withThreadStateUpdate(threadToStep.threadIndex,
                    (ts) =>
                        ts.withLoopStack(newLoopStack));
                break;
            }
            case LoopActionType.LEAVING: {
                const newLoopStack = this.popLoop(predLoopStack, loopAction.loopHead);
                result = result.withThreadStateUpdate(threadToStep.threadIndex,
                    (ts) =>
                        ts.withLoopStack(newLoopStack));
                break;
            }
        }

        // TODO: Where and how to handle the `clone` statement?

        //
        // Handle different statements that start other threads and wait for them
        //
        if (stepOp.ast instanceof SignalTargetReachedStatement) {
            const properties: ImmSet<Property> = Properties.fromArguments(stepOp.ast.targetCharacteristics);
            return [[result.withThreadStateUpdate(threadToStep.threadIndex, (ts) =>
                ts.withComputationState(ThreadComputationState.THREAD_STATE_FAILURE)
                    .withFailedFor(properties)), true]];

        } else if (stepOp.ast instanceof BeginAtomicStatement) {
            return [[this.incrementAtomic(result, threadToStep), false]];

        } else if (stepOp.ast instanceof EndAtomicStatement) {
            return [[this.decrementAtomic(result, threadToStep), false]];

        } else if (stepOp.ast instanceof TerminateProgramStatement) {
            return [[result.withThreadStateUpdate(threadToStep.threadIndex, (ts) =>
                ts.withOperations(ImmList([stepOp.ident,
                ProgramOperations.constructOp(new StoreEvalResultToVariableStatement(
                    this._task.systemVariables.programTerminatedVariable,
                    BooleanLiteral.true()
                ))]))), false]];

        } else if (stepOp.ast instanceof CallStatement) {
            // The following lines realize the inter-procedural analysis.
            const calledMethodName = stepOp.ast.calledMethod.text;

            if (steppedActor.isExternalMethod(calledMethodName)) {
                // Separate handling of calls to 'external' methods
                const call = stepOp.ast as CallStatement;
                if (call.calledMethod.text == MethodIdentifiers._RUNTIME_signalFailure) {
                    throw new IllegalArgumentException("Call should have been transformed to a SignalTargetReachedStatement");

                } else if (call.calledMethod.text == MethodIdentifiers._RUNTIME_waitSeconds) {
                    // const timeCond: BooleanExpression = this.createTimeCond(stmt.secs);
                    // const waitfor: ThreadState = this.createTemporaryCheckThreadFor(timeCond);
                    Preconditions.checkArgument(call.args.elements.length == 1);
                    const secondsExpression = call.args.getIth(0);

                    const ops: ProgramOperation[] = [stepOp.ast, // also include the original statement
                        new CallStatement(Identifier.of(MethodIdentifiers._RUNTIME_micros),
                            new ExpressionList([]), OptionalAstNode.with(this._task.systemVariables.threadWaitUntilMicrosVariable)),
                        new StoreEvalResultToVariableStatement(this._task.systemVariables.threadWaitUntilMicrosVariable,
                            new PlusExpression(this._task.systemVariables.threadWaitUntilMicrosVariable,
                                new MultiplyExpression(secondsExpression, IntegerLiteral.of(1000000))))
                    ].map((ast) => ProgramOperationFactory.createFor(ast));

                    const waitUntilCond = new NumGreaterEqualExpression(this._task.systemVariables.globalTimeMicrosVariable,
                        this._task.systemVariables.threadWaitUntilMicrosVariable);
                    const accelInfo = new AccelInfo(threadToStep.threadStatus.getActorId(),
                        waitUntilCond, new NumberVariableExpression(this._task.systemVariables.globalTimeMicrosVariable),
                        new PlusExpression(this._task.systemVariables.threadWaitUntilMicrosVariable, IntegerLiteral.of(1)));

                    const checkThread: ThreadState = this.createConditionCheckThread(steppedActor.ident, waitUntilCond);
                    this._accelInfoMap.set(checkThread.getScriptId(), accelInfo);

                    const currentScopeStack = this.buildScopeStack(steppedActor.ident, fromRelation.name);
                    return [[result.withAddedConditionState(checkThread)
                        .withThreadStateUpdate(threadToStep.threadIndex, (ts) =>
                        ts.withComputationState(ThreadComputationState.THREAD_STATE_WAIT)
                          .withAddedWaitingFor(checkThread)
                          .withOperations(ImmList(this.scopeOperations(ops, fromState.getActorScopes(),
                            currentScopeStack, currentScopeStack).map(op => op.ident)))), false]];
                }

            } else {
                const steppedThread = threadToStep.threadStatus;
                const calledMethod: Method = steppedActor.getMethod(calledMethodName);

                // ( we also add the original call statement since it is helpful for some analyses)
                const interProcOps: ProgramOperation[] = [stepOp].concat(this.createPassArgumentsOps(calledMethod, stepOp.ast.args));

                const succCallStack = steppedThread.getCallStack()
                    .push(new MethodCall(fromLocation, step.succLoc));

                const resultList: [ControlAbstractState, boolean][] = [];

                for (const entryLocId of calledMethod.transitions.entryLocationSet) {
                    const callToRelationLoc: RelationLocation = new RelationLocation(
                        steppedActor.ident, calledMethod.transitions.ident, entryLocId);
                    const currentScopeStack = this.buildScopeStack(steppedActor.ident, fromRelation.name);
                    const succRelation = this._task.getTransitionRelationById(callToRelationLoc.getRelationId());
                    const succScopeStack = this.buildScopeStack(steppedActor.ident, succRelation.name);

                    resultList.push([result.withThreadStateUpdate(threadToStep.threadIndex, (ts) =>
                        ts.withOperations(ImmList(this.scopeOperations(interProcOps, fromState.getActorScopes(), currentScopeStack, succScopeStack).map(op => op.ident)))
                            .withLocation(callToRelationLoc)
                            .withCallStack(succCallStack)), false]);
                }

                if (calledMethod.isAtomic) {
                    return resultList.map(([cs, d]) => [this.incrementAtomic(cs, threadToStep), d]);
                } else {
                    return resultList;
                }
            }

        } else if (stepOp.ast instanceof ReturnStatement) {
            const steppedThread = threadToStep.threadStatus;
            const callInformation: MethodCall = steppedThread.getCallStack().get(steppedThread.getCallStack().size-1);
            const succReturnCallsTo: ImmList<MethodCall> = steppedThread.getCallStack().pop();
            const succRelation = this._task.getTransitionRelationById(callInformation.getReturnTo().getRelationId());
            const predScopeStack = this.buildScopeStack(steppedActor.ident, fromRelation.name);
            const succScopeStack = this.buildScopeStack(steppedActor.ident, succRelation.name);

            // Assign the result to the variable that was referenced in the `CallStatement`
            // (we also add the original call statement since this is helpful for some analyses)
            const interProcOps: ProgramOperation[] = [stepOp].concat(this.createStoreCallResultOps(steppedThread, callInformation, stepOp.ast as ReturnStatement));

            const resultList: [ControlAbstractState, boolean][] = [[result.withThreadStateUpdate(threadToStep.threadIndex, (ts) =>
                ts.withOperations(ImmList(this.scopeOperations(interProcOps, fromState.actorScopes, predScopeStack, succScopeStack).map(o => o.ident)))
                    .withLocation(callInformation.getReturnTo())
                    .withCallStack(succReturnCallsTo)), false]];

            const returnFrom: Method = steppedActor.getMethod(fromRelation.name);

            if (returnFrom.isAtomic) {
                return resultList.map(([cs, d]) => [this.decrementAtomic(cs, threadToStep), d]);
            } else {
                return resultList;
            }

        } else if (stepOp.ast instanceof BroadcastMessageStatement) {
            const stmt: BroadcastMessageStatement = stepOp.ast as BroadcastMessageStatement;
            const waitFor: IndexedThread[] = this.getAllMessageReceiverThreadsFrom(threadToStep.threadStatus.getActorId(), result, stmt.msg);

            // Prepare the waiting threads for running
            for (const waitForThread of waitFor) {
                result = this.restartThread(result, waitForThread.threadIndex);
            }

            return [[result, true]]

        } else if (stepOp.ast instanceof BroadcastAndWaitStatement) {
            const steppedThread = threadToStep.threadStatus;
            const stmt: BroadcastAndWaitStatement = stepOp.ast as BroadcastAndWaitStatement;
            const waitFor: IndexedThread[] = this.getAllMessageReceiverThreadsFrom(threadToStep.threadStatus.getActorId(), result, stmt.msg);

            // Prepare the waiting threads for running
            for (const waitForThread of waitFor) {
                result = this.restartThread(result, waitForThread.threadIndex);
            }

            if (waitFor.length > 0) {
                result = result.withThreadStateUpdate(threadToStep.threadIndex, (ts) =>
                    ts.withComputationState(ThreadComputationState.THREAD_STATE_WAIT));
            }

            if (isBootstrapFinishedMessage(stepOp.ast.msg)) {
                result = this.activateAfterStepMonitoring(result);
            }

            // Wait for all triggered threads to finish
            return [[result.withThreadStateUpdate(threadToStep.threadIndex, (ts) =>
                ts.withWaitingForThreads(
                        steppedThread
                            .getWaitingForThreads()
                            .union(waitFor.map((t) => t.threadStatus.getThreadId())))), true]];

        } else if (stepOp.ast instanceof WaitUntilStatement) {
            const stmt: WaitUntilStatement = stepOp.ast as WaitUntilStatement;

        } else if (stepOp.ast instanceof WaitSecsStatement) {
            throw new ImplementMeException();

            // TODO:
            //   Since (1) the `WaitSecsStatement` can be parameterized with
            //   a number expression, and (2) the condition is relative to the
            //   time the statement was invoked, a more elaborated logic is needed here.
            Logger.potentialUnsound("wait N seconds might have to be considered in the scheduling.")

        } else if (stepOp.ast instanceof WaitUntilStatement) {
            throw new ImplementMeException();

        } else if (stepOp.ast instanceof WaitSecsStatement) {
            throw new ImplementMeException();
        }

        // TODO: Hats to activate:
        //  - StartedAsClone

        // TODO: Mouse inputs, keyboard inputs, microphone inputs, others?

        // TODO: Produce a state with THREAD_STATE_RUNNING_ATOMIC if isInnerAtomic

        return [[result, false]];
    }

    private incrementAtomic(state: ControlAbstractState, thread: IndexedThread): ControlAbstractState {
        return state.withThreadStateUpdate(thread.threadIndex,
            (ts) => ts
                .withIncrementedAtomic()
                .withOperations(ts.getOperations().concat([ProgramOperations.constructOp(new BeginAtomicStatement())])));
    }

    private decrementAtomic(state: ControlAbstractState, thread: IndexedThread): ControlAbstractState {
        return state.withThreadStateUpdate(thread.threadIndex,
            (ts) => ts
                .withDecrementedAtomic()
                .withOperations(ts.getOperations().concat([ProgramOperations.constructOp(new EndAtomicStatement())])));
    }

    private getCallingStatement(callInformation: MethodCall): CallStatement {
        const callFromRelation = this._task.getTransitionRelationById(callInformation.getCallFrom().getRelationId());
        const returnToRelation = this._task.getTransitionRelationById(callInformation.getReturnTo().getRelationId());
        Preconditions.checkArgument(callFromRelation === returnToRelation);

        const fromTransitions: Array<TransitionTo> = callFromRelation.transitionsFrom(callInformation.getCallFrom().getLocationId());
        Preconditions.checkArgument(fromTransitions.length == 1);

        return ProgramOperations.withID(fromTransitions[0].opId).ast as CallStatement;
    }

    private createStoreCallResultOps(thread: ThreadState, callInformation: MethodCall, ast: ReturnStatement): ProgramOperation[] {
        const result: Statement[] = [];

        // Store the result in the caller scope's target variable
        if (ast.resultVariable.isPresent()) {
            const callStmt: CallStatement = this.getCallingStatement(callInformation);
            if (callStmt.assignResultTo.isPresent()) {
                const variableWithReturnValue: VariableWithDataLocation = ast.resultVariable.value();
                const storeResultTo: VariableWithDataLocation = callStmt.assignResultTo.value();

                result.push(new StoreEvalResultToVariableStatement(storeResultTo, variableWithReturnValue));
            }
        } else {
            // Nothing to do
        }

        return result.map((s) => new RawOperation(s));
    }

    private createPassArgumentsOps(calledMethod: Method, args: ExpressionList): ProgramOperation[] {
        Preconditions.checkArgument(calledMethod.parameters.elements.length == args.elements.length);
        const result: Statement[] = [];

        let index = 0;
        while (index < calledMethod.parameters.elements.length) {
            const p: ParameterDeclaration = calledMethod.parameters.getIth(index);
            const a: Expression = args.getIth(index);

            // 1. Add declarations of the parameter variables (callee scope)
            const variable = new VariableWithDataLocation(DataLocations.createTypedLocation(p.ident, p.type));
            result.push(new DeclareStackVariableStatement(variable));

            // 2. Assign the arguments (caller scope) to the parameters (callee scope)
            result.push(new StoreEvalResultToVariableStatement(variable, a));

            index++;
        }

        return result.map((s) => new RawOperation(s));
    }

    private isProgramConcern(concern: Concern) {
        return concern == Concerns.defaultProgramConcern();
    }

    private getStepConcern(toState: ControlAbstractState): Concern {
        let result: Concern = null;
        for (const threadIndex of toState.getSteppedFor()) {
            const threadState = toState.getThreadStates().get(threadIndex);
            const actorConcern = this._task.getActorByName(threadState.getActorId()).concern;
            if (result == null) {
                result = actorConcern;
            } else {
                Preconditions.checkState(result == actorConcern);
            }
        }

        return result;
    }

    private awaikConditionCheckThreads(inState: ControlAbstractState): ControlAbstractState[] {
        let result: ControlAbstractState = inState;

        const concern = this.getStepConcern(inState);

        //  1. Activate the specification check thread (`after statement finished`)
        //  (if the stepped thread is a program thread)
        if (this.isProgramConcern(concern)) {
            for (const [threadIndex, threadState] of inState.getThreadStates().entries()) {
                const actor: Actor = this._task.getActorByName(threadState.getActorId());
                const isSpecificationThread = actor.isObserver;
                const script = actor.getScript(threadState.getScriptId());

                if (script.event instanceof AfterStatementMonitoringEvent) {
                    if (threadState.getComputationState() != ThreadComputationState.THREAD_STATE_DISABLED) {
                        result = this.restartThread(inState, threadIndex);
                    }
                }
            }
        }

        // 2. Wake-up threads if all threads they have been waiting for are finished now
        // TODO: What if 'wait for 0 seconds' is used?
        for (const [threadIndex, threadState] of inState.getThreadStates().entries()) {
            let stillWaitingFor = threadState.getWaitingForThreads();
            if (stillWaitingFor.size > 0) {
                for (const waitingForThreadId of threadState.getWaitingForThreads()) {
                    const waitingFor = inState.findThreadWithId(waitingForThreadId);
                    if (waitingFor) { // <-- can be NULL, condition-check-threads are in a different list of threads
                        if (waitingFor.threadStatus.computationState == ThreadComputationState.THREAD_STATE_DONE) {
                            stillWaitingFor = stillWaitingFor.remove(waitingForThreadId);
                        }
                    }
                }

                result = result.withThreadStateUpdate(threadIndex, (ts) => ts.withWaitingForThreads(stillWaitingFor));
                if (stillWaitingFor.size == 0) {
//                    if (this.resolveLeavingOps(result, result.getIndexedThreadState(threadIndex)).length == 0) {
//                        result = result.withThreadStateUpdate(threadIndex, (ts) => ts.withComputationState(ThreadComputationState.THREAD_STATE_DONE));
//                    } else {
                        result = result.withThreadStateUpdate(threadIndex, (ts) => ts.withComputationState(ThreadComputationState.THREAD_STATE_YIELD));
//                    }
                }
            }
        }

        // 3. Check if threads that wait for certain conditions can continue to run
        //    (assume certain conditions to hold if this accelerates the analysis without being unsound)
        return this.runStateCheckThreads(result);
    }

    private hasNonWaitingRunnable(threads: ImmList<ThreadState>, withConcern: Concern): boolean {
        const nonWaitingRunnable = threads.filter((ts) =>
            this._task.getActorByName(ts.getActorId()).concern == withConcern
                && (ts.getComputationState() == ThreadComputationState.THREAD_STATE_YIELD
                    || ts.getComputationState() == ThreadComputationState.THREAD_STATE_RUNNING));
        return nonWaitingRunnable.size > 0;
    }

    private runStateCheckThreads(state: ControlAbstractState): ControlAbstractState[] {
        if (state.getConditionStates().size == 0) {
            return [state];
        } else {
            if (this.hasNonWaitingRunnable(state.getThreadStates(), Concerns.defaultProgramConcern())) {
                return this.checkConditionAndWakeUpIfSatisfied(state);

            } else {
                // Acceleration applicable (no runnable program thread)

                // Group the conditions by the variant variable (which should be accelerated)
                // (assuming that there is no dependency between the variables to accelerate)
                const acceleratable: AccelInfo[] = this.filterAcceleratableConditionThreads(state.getConditionStates());

                // For now, we only consider an acceleration based on the time variable
                const timeAccel = acceleratable.filter((ac) => ac.variantVariable.variable == this._task.systemVariables.globalTimeMicrosVariable);
                if (timeAccel.length == 1) {
                    // We can immediately accelerate in this case
                    const accelInfo = timeAccel[0];
                    return this.checkConditionAndWakeUpIfSatisfied(getTheOnlyElement(this.accelerateTo(state, accelInfo)));
                }

                throw new ImplementMeException();
            }
        }
    }

    private checkConditionAndWakeUpIfSatisfied(state: ControlAbstractState): ControlAbstractState[] {
        // No acceleration applicable
        const conditionCheckThreadIDs = new Set<ThreadId>();
        const condThreadIdToIndex = new Map<number, number>();
        const condThreadIdToState = new Map<number, ThreadState>();
        for (const [index, ts] of state.getConditionStates().entries()) {
            conditionCheckThreadIDs.add(ts.getThreadId());
            condThreadIdToState.set(ts.getThreadId(), ts);
            condThreadIdToIndex.set(ts.getThreadId(), index);
        }

        let threadSuccStates: ImmMap<number, ImmList<ThreadState>> = ImmMap();

        // For all waiting threads: Check if they are waiting for a condition thread
        for (const [threadIndex, threadState] of state.getThreadStates().entries()) {
            Preconditions.checkNotUndefined(threadState);
            if (threadState.getComputationState() == ThreadComputationState.THREAD_STATE_WAIT) {
                const waitingForCondThreadIDs = threadState.getWaitingForThreads().intersect(conditionCheckThreadIDs);
                Preconditions.checkState(waitingForCondThreadIDs.size <= 1);
                if (waitingForCondThreadIDs.size > 0) {
                    const waitingForCondThreadID: ThreadId = getTheOnlyElement(waitingForCondThreadIDs);

                    // Check condition
                    const condThread: ThreadState = condThreadIdToState.get(waitingForCondThreadID);
                    const wrappedCondStates: [AbstractElement, boolean][] = this.runConditionThread(state, condThread);
                    //

                    let succStates: ImmList<ThreadState> = ImmList();
                    for (const [condCheckedState, checkResult] of wrappedCondStates) {
                        if (checkResult) {
                            succStates = succStates.push(threadState
                                .withRemovedWaitingFor(waitingForCondThreadID)
                                .withComputationState(ThreadComputationState.THREAD_STATE_YIELD))
                        } else {
                            succStates = succStates.push(threadState);
                        }
                    }
                    threadSuccStates = threadSuccStates.set(threadIndex, succStates);
                }
            }
        }

        const updatedThreadLists: ImmList<ThreadState>[] = this.expandToUpdatedThreadLists(state, threadSuccStates);

        // Create the list of successor states
        let result: ControlAbstractState[] = [];
        for (const threadList of updatedThreadLists) {
            result.push(state.withThreadStates(threadList));
        }

        // Remove the cond threads no main thread is waiting for
        return result.map((cs) => this.removeIrrelevantCondThreads(cs));
    }

    private accelerateTo(state: ControlAbstractState, accelInfo: AccelInfo): ControlAbstractState[] {
        Preconditions.checkNotUndefined(state);
        Preconditions.checkNotUndefined(accelInfo);

        const accelStmts = new StatementList([
            new StoreEvalResultToVariableStatement(accelInfo.variantVariable.variable, accelInfo.accelerateTo)]);
        const accelTr: TransitionRelation = TransitionRelations.eliminateEpsilons(accelStmts.accept(new RelationBuildingVisitor()));
        this._task.registerTrasitionRelation(accelTr);

        const conditionScopeStack = this.buildScopeStack(accelInfo.actorId, accelTr.name);

        const wrappedResult: [AbstractElement, boolean][] = Transfers.transferAlongTransitionSystem(this._wrappedTransferRelation,
            state.getWrappedState(), accelTr, getTheOnlyElement(accelTr.entryLocationSet), Concerns.highestPriorityConcern(),
            (op) => {return this.scopeOperations([op], state.getActorScopes(),
                conditionScopeStack, conditionScopeStack)[0]});

        return wrappedResult.map(([w,t]) => state.withWrappedState(w));
    }

    private filterAcceleratableConditionThreads(conditionStates: ImmList<ThreadState>): AccelInfo[] {
        return Array.from(conditionStates
            .filter((ts) => this._accelInfoMap.has(ts.getScriptId()))
            .map((ts) => this._accelInfoMap.get(ts.getScriptId())));
    }

    private removeIrrelevantCondThreads(cs: ControlAbstractState): ControlAbstractState {
        const stillWaitingFor: ImmSet<ThreadId> = cs.getThreadStates().map((ts) => ts.getWaitingForThreads())
            .reduce((acc, value) => value.union(acc), ImmSet<ThreadId>());

        return cs.withConditionStates(cs.getConditionStates()
            .filter((cts) => stillWaitingFor.contains(cts.threadId)));
    }

    private expandToUpdatedThreadLists(state: ControlAbstractState, threadSuccStates: ImmMap<number, ImmList<ThreadState>>): ImmList<ThreadState>[] {
        const worklist: [ImmList<ThreadState>, ImmMap<number, ImmList<ThreadState>>][] = [];
        worklist.push([state.getThreadStates(), threadSuccStates]);

        const result: ImmList<ThreadState>[] = [];
        while (worklist.length > 0) {
            const [workBaseList, workListUpdates]: [ImmList<ThreadState>, ImmMap<number, ImmList<ThreadState>>] = worklist.pop();
            if (workListUpdates.size == 0) {
                Preconditions.checkState(workBaseList.size == state.getThreadStates().size);
                result.push(workBaseList);
            } else {
                const indexToUpdate: number = getTheNextElement(workListUpdates.keys());
                const alternatives: ImmList<ThreadState> = workListUpdates.get(indexToUpdate);
                const workListUpdatesPrime: ImmMap<number, ImmList<ThreadState>> = workListUpdates.delete(indexToUpdate);
                for (const alt of alternatives) {
                    Preconditions.checkNotUndefined(alt);
                    worklist.push([workBaseList.set(indexToUpdate, alt), workListUpdatesPrime]);
                }
            }
        }

        return result;
    }

    private runConditionThread(state: ControlAbstractState, condThreadState: ThreadState): [AbstractElement, boolean][] {
        Preconditions.checkNotUndefined(state);
        Preconditions.checkNotUndefined(condThreadState);

        const script: TransitionRelation = this._task.getTransitionRelationById(
            condThreadState.getRelationLocation().getRelationId());
        Preconditions.checkArgument(script != null, "Condition script must have been registered!");
        const conditionScopeStack = this.buildScopeStack(condThreadState.actorId, script.name);

        const checkResult: [AbstractElement, boolean][] = Transfers.transferAlongTransitionSystem(this._wrappedTransferRelation,
            state.getWrappedState(), script, getTheOnlyElement(script.entryLocationSet), Concerns.highestPriorityConcern(),
            (op) => {return this.scopeOperations([op], state.getActorScopes(),
                conditionScopeStack, conditionScopeStack)[0]});

        return checkResult.filter((([e, t]) => Lattices.isFeasible(e, this._wrappedDomain.lattice, "Condition Check")));
    }

    private restartThread(baseState: ControlAbstractState, threadIndex: number): ControlAbstractState {
        const threadState: ThreadState = baseState.getThreadStates().get(threadIndex);
        const script: Script = this._task.getActorByName(threadState.getActorId()).getScript(threadState.getScriptId());
        const startLocation: LocationId = getTheOnlyElement(script.transitions.entryLocationSet);

        return baseState.withThreadStateUpdate(threadIndex,
            (ts) => ts.withComputationState(ThreadComputationState.THREAD_STATE_YIELD)
                .withLocation(ts.getRelationLocation().withLocationId(startLocation)));
    }

    private schedule(predState: ControlAbstractState, succState: ControlAbstractState,
                     steppedThreadIndex: number): ControlAbstractState[] {
        let result: ControlAbstractState = succState;

        const steppedThread: IndexedThread = succState.getIndexedThreadState(steppedThreadIndex);
        const nextOps = this.resolveLeavingOps(succState, steppedThread); // Use 'succState' to solve issues with new 'actorScopes' information

        // Finish the atomic operations without interruptions by another thread
        if (nextOps.length > 0
            && steppedThread.threadStatus.getInAtomicMode() > 0
            && steppedThread.threadStatus.getWaitingForThreads().size == 0) {
            return [result.withThreadStateUpdate(steppedThread.threadIndex, (ts) =>
                ts.withComputationState(ThreadComputationState.THREAD_STATE_RUNNING))];
        }

        if (nextOps.length == 0) {
            // Set to THREAD_STATE_DONE if on a terminating location
            result = result.withThreadStateUpdate(steppedThread.threadIndex, (ts) =>
                ts.withComputationState(ThreadComputationState.THREAD_STATE_DONE));

        } else {
            // YIELD the current thread if it is not yet on a terminating control location of the script.
            if (steppedThread.threadStatus.getComputationState() == ThreadComputationState.THREAD_STATE_RUNNING) {
                result = result.withThreadStateUpdate(steppedThread.threadIndex, (ts) =>
                    ts.withComputationState(ThreadComputationState.THREAD_STATE_YIELD));
            }
        }

        // Determine and set the next thread to step
        const continueWithNextThreadAt: number = this.determineNextThreadToStep(result, steppedThread.threadIndex);
        if (continueWithNextThreadAt > -1) {
            result = result.withThreadStateUpdate(continueWithNextThreadAt, (ts) =>
                ts.withComputationState(ThreadComputationState.THREAD_STATE_RUNNING));
        } else {
            // Activate the termination thread
            result = result.withThreadStates(result.getThreadStates().map((ts => {
                const actor: Actor = this._task.getActorByName(ts.actorId);
                const script = actor.getScript(ts.getScriptId());
                if (script.event == TerminationEvent.instance()) {
                    if (ts.getComputationState() == ThreadComputationState.THREAD_STATE_DISABLED) {
                        ts = ts.withComputationState(ThreadComputationState.THREAD_STATE_RUNNING);
                    }
                }

                return ts;
            })));
        }

        this.checkSchedule(result);
        return [result];
    }

    private getNextYieldThreadFrom(startIndex: number, threads: ImmList<ThreadState>, filter: (t: ThreadState) => boolean): number {
        let indexToCheck = (startIndex + 1) % threads.size;
        let checked = 0;
        while (checked <= threads.size) {
            indexToCheck = (indexToCheck + 1) % threads.size;
            const threadAtIndex = threads.get(indexToCheck);
            if (filter(threadAtIndex)) {
                if (threadAtIndex.getComputationState() === ThreadComputationState.THREAD_STATE_YIELD) {
                    return indexToCheck;
                }
            }
            checked++;
        }

        return -1;
    }

    /**
     * Choose the set of threads to step next from the threads that are in the state YIELD.
     */
    private determineNextThreadToStep(resultBase: ControlAbstractState, steppedThreadIdx: number): number {
        const threads = resultBase.getThreadStates();

        let programThreadToRun: number = -1;

        const wasObserverStepped: boolean = this.isObserverThread(resultBase.getIndexedThreadState(steppedThreadIdx).threadStatus);
        const hasObserverInYieldAt: number = this.getNextYieldThreadFrom(steppedThreadIdx, threads, (t) => this.isObserverThread(t));

        if (wasObserverStepped && hasObserverInYieldAt == -1) {
            // Continue to schedule threads starting from the last stepped non-observer thread
            const lastSteppedNonObserver = getTheOnlyElement(resultBase.getLastSteppedNonObserverThreadIndices());
            programThreadToRun = this.getNextYieldThreadFrom(lastSteppedNonObserver, threads, (t) => true);

        } else if (hasObserverInYieldAt > -1) {
            return hasObserverInYieldAt;

        } else {
            programThreadToRun = this.getNextYieldThreadFrom(steppedThreadIdx, threads, (t) => true);
        }

        if (programThreadToRun > -1) {
            return programThreadToRun;
        }

        // Continue to execute the previously stepped thread if no other
        // is ready to be stepped.
        const stepped = threads.get(steppedThreadIdx);
        if (this.isSteppable(stepped)) {
            return steppedThreadIdx;
        } else {
            return -1;
        }
    }

    private isSteppable(thread: ThreadState): boolean {
        return thread.getComputationState() == ThreadComputationState.THREAD_STATE_RUNNING
            || thread.getComputationState() == ThreadComputationState.THREAD_STATE_YIELD;
    }

    private isObserverThread(thread: ThreadState) {
        const actor = this._task.getActorByName(thread.getActorId());
        return actor.isObserver;
    }

    private checkSchedule(schedOf: ControlAbstractState) {
        let threadIndex = 0;
        let running = 0;
        for (const ts of schedOf.getThreadStates()) {
            const ops = this.resolveLeavingOps(schedOf, new IndexedThread(ts, threadIndex));
            if (ts.getComputationState() == ThreadComputationState.THREAD_STATE_RUNNING) {
                running++;
                if (ops.length == 0) {
                   throw new IllegalStateException(`Thread for actor ${ts.getActorId()}, script ${ts.getScriptId()}, on location ${ts.getRelationLocation().getLocationId()} does not have leaving ops.`);
                }
            }
            threadIndex++;
        }
        Preconditions.checkState(running <= 1);
    }

    private getAllMessageReceiverThreadsFrom(sendingActor: ActorId, abstractState: ControlAbstractState, msg: SystemMessage): IndexedThread[] {
        const result: IndexedThread[] = [];
        let index = 0;
        for (const t of abstractState.getThreadStates()) {
            const script = this._task.getActorByName(t.getActorId()).getScript(t.getScriptId());
            if (!script) {
                continue;
            }

            if (script.event instanceof MessageReceivedEvent) {
                const ev: MessageReceivedEvent = script.event as MessageReceivedEvent;

                // Check if the message matches
                const handlingActor = t.getActorId();
                if (this.isHandlerFor(ev, handlingActor, sendingActor, msg)) {
                    result.push(new IndexedThread(t, index));
                }
            }
            index++;
        }
        return result;
    }

    private isHandlerFor(ev: MessageReceivedEvent, handlingActor: ActorId, sendingActor: ActorId, msg: SystemMessage) {
        const receivedMessageId = this.evaluateToConcreteMessage(msg.messageid);
        const handlingMessageId = this.evaluateToConcreteMessage(ev.message);
        const handlingMessageNamespace = ev.namespace;

        if (receivedMessageId != handlingMessageId) {
            return false;
        }

        if (handlingMessageNamespace instanceof UnqualifiedMessageNamespace) {
            if (msg.destination instanceof ActorDestination) {
                if (msg.destination.actor instanceof ActorSelfExpression) {
                    if (handlingActor == sendingActor) {
                        return true;
                    }
                }
            } else {
                throw new IllegalArgumentException();
            }
        } else if (handlingMessageNamespace instanceof QualifiedMessageNamespace) {
            const recevedInNamespaceId = this.evaluateToConcreteMessage(handlingMessageNamespace.namespaceName);
            if (msg.destination instanceof NamedDestination) {
                const receivedForNamespaceId = this.evaluateToConcreteMessage(msg.destination.namespace);
                if (recevedInNamespaceId == receivedForNamespaceId) {
                    return true;
                }
            } else {
                throw new IllegalArgumentException();
            }
        } else {
            throw new ImplementMeForException(handlingMessageNamespace.constructor.name);
        }

        return false;
    }

    private evaluateToConcreteMessage(msg: StringExpression): string {
        if (msg instanceof StringLiteral) {
            const lit = msg as StringLiteral;
            return lit.text;
        }
        throw new ImplementMeException();
    }

    /**
     * Threads that observe state transitions must become active after the boostrapping
     * process has been finished and not prior to it.
     *
     * This function awakes the observing threads and is typically called
     * after bootstrapping has been finished.
     *
     * @param state
     */
    private activateAfterStepMonitoring(state: ControlAbstractState) {
        let result: ControlAbstractState = state;

        for (const [ti, ts] of state.getThreadStates().entries()) {
            if (ts.getComputationState() == ThreadComputationState.THREAD_STATE_DISABLED) {
                const threadActor = this._task.getActorByName(ts.getActorId());
                const threadScript = threadActor.getScript(ts.getScriptId());
                if (threadScript.event instanceof AfterStatementMonitoringEvent) {
                    result = result.withThreadStateUpdate(ti,
                        (t) => t.withComputationState(
                            ThreadComputationState.THREAD_STATE_DONE));
                }
            }
        }

        return result;
    }

    private popLoop(predLoopStack: ImmList<RelationLocation>, loopHead: RelationLocation): ImmList<RelationLocation> {
        if (predLoopStack.isEmpty()) {
            return ImmList();
        }

        let i = predLoopStack.size-1;
        const topElement = predLoopStack.get(i);
        Preconditions.checkState(topElement.equals(loopHead));

        let toSkip = 0;
        while (i > 0) {
            if (!predLoopStack.get(i).equals(topElement)) {
                break;
            }
            toSkip++;
            i--;
        }
        return predLoopStack.skipLast(toSkip);
    }

}

class StepInformation {

    private readonly _steppedThread: IndexedThread;

    private readonly _isInnerAtomic: boolean;

    private readonly _ops: ProgramOperation[];

    private readonly _succLoc: RelationLocation;

    private readonly _succCallStack: ImmList<MethodCall>;

    private readonly _succScopeStack: ImmList<string>;

    constructor(steppedThread: IndexedThread, succLoc: RelationLocation, isInnerAtomic: boolean, ops: ProgramOperation[],
                succReturnCallTo: ImmList<MethodCall>, succScopeStack: ImmList<string>) {
        this._steppedThread = steppedThread;
        this._succLoc = succLoc;
        this._isInnerAtomic = isInnerAtomic;
        this._ops = Preconditions.checkNotUndefined(ops);
        this._succCallStack = Preconditions.checkNotUndefined(succReturnCallTo);
        this._succScopeStack = Preconditions.checkNotUndefined(succScopeStack);
    }

    get steppedThread(): IndexedThread {
        return this._steppedThread;
    }

    get succLoc(): RelationLocation {
        return this._succLoc;
    }

    get isInnerAtomic(): boolean {
        return this._isInnerAtomic;
    }

    get ops(): ProgramOperation[] {
        return this._ops;
    }

    get succCallStack(): ImmList<MethodCall> {
        return this._succCallStack;
    }

    get succScopeStack(): ImmList<string> {
        return this._succScopeStack;
    }
}

class AccelInfo {

    private readonly _id: number;

    private readonly _actorId: ActorId;

    private readonly _condition: BooleanExpression;

    private readonly _variantVariable: NumberVariableExpression;

    private readonly _accelerateTo: NumberExpression;

    constructor(actor: ActorId, condition: BooleanExpression, variantVariable: NumberVariableExpression, accelerateTo: NumberExpression) {
        this._actorId = actor;
        this._condition = Preconditions.checkNotUndefined(condition);
        this._variantVariable = Preconditions.checkNotUndefined(variantVariable);
        this._accelerateTo = Preconditions.checkNotUndefined(accelerateTo);
        this._id = freshId();
    }

    get id(): number {
        return this._id;
    }

    get actorId(): ActorId {
        return this._actorId;
    }

    get condition(): BooleanExpression {
        return this._condition;
    }

    get variantVariable(): NumberVariableExpression {
        return this._variantVariable;
    }

    get accelerateTo(): NumberExpression {
        return this._accelerateTo;
    }
}

enum LoopActionType {
    NONE,
    ENTERING,
    LEAVING
}

class LoopAction {

    private readonly _type: LoopActionType;

    private readonly _loop: TransitionLoop;

    private readonly _loopHead: RelationLocation;

    constructor(type: LoopActionType, loop: TransitionLoop, loopHead: RelationLocation) {
        this._type = type;
        this._loop = loop;
        this._loopHead = loopHead;
    }

    get loopHead(): RelationLocation {
        return this._loopHead;
    }

    get type(): LoopActionType {
        return this._type;
    }

    get loop(): TransitionLoop {
        return this._loop;
    }

    toString(): string {
        return `${this._type.toString()} ${this._loop.toString()} ${this._loopHead.toString()}`;
    }
}
