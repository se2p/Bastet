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

import {LabeledTransferRelation, TransferRelation, Transfers} from "../TransferRelation";
import {
    ControlAbstractState, IndexedThread, MethodCall, RelationLocation,
    THREAD_STATE_DONE, THREAD_STATE_FAILURE,
    THREAD_STATE_RUNNING, THREAD_STATE_YIELD,
    ThreadState
} from "./ControlAbstractDomain";
import {AbstractElement} from "../../../lattices/Lattice";
import {ScheduleAnalysisConfig} from "./ControlAnalysis";
import {App} from "../../../syntax/app/App";
import {Preconditions} from "../../../utils/Preconditions";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {TransitionRelation, TransitionTo} from "../../../syntax/app/controlflow/TransitionRelation";
import {Actor} from "../../../syntax/app/Actor";
import {
    ProgramOperation,
    ProgramOperationFactory,
    ProgramOperations, RawOperation
} from "../../../syntax/app/controlflow/ops/ProgramOperation";
import {List as ImmList, Set as ImmSet} from "immutable";
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
import {Statement} from "../../../syntax/ast/core/statements/Statement";
import {ParameterDeclaration} from "../../../syntax/ast/core/ParameterDeclaration";
import {Expression} from "../../../syntax/ast/core/expressions/Expression";
import {VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {DataLocations} from "../../../syntax/app/controlflow/DataLocation";
import {DeclareStackVariableStatement} from "../../../syntax/ast/core/statements/DeclarationStatement";
import {StoreEvalResultToVariableStatement} from "../../../syntax/ast/core/statements/SetStatement";
import {StringExpression, StringLiteral} from "../../../syntax/ast/core/expressions/StringExpression";
import {MessageReceivedEvent} from "../../../syntax/ast/core/CoreEvent";
import {Concerns} from "../../../syntax/Concern";

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

/**
 * Mimics the green-threading of the Scratch VM.
 * Adds special scheduling of some (types of) threads.
 */
export class ControlTransferRelation implements TransferRelation<ControlAbstractState> {

    private readonly _wrappedTransferRelation: LabeledTransferRelation<AbstractElement>;

    private readonly _config: ScheduleAnalysisConfig;

    private readonly _task: App;

    constructor(config: ScheduleAnalysisConfig, task: App, wrappedTransferRelation: LabeledTransferRelation<AbstractElement>) {
        this._task = Preconditions.checkNotUndefined(task);
        this._config = Preconditions.checkNotUndefined(config);
        this._wrappedTransferRelation = Preconditions.checkNotUndefined(wrappedTransferRelation);
    }

    abstractSucc(fromState: ControlAbstractState): Iterable<ControlAbstractState> {
        Preconditions.checkNotUndefined(fromState);
        Preconditions.checkNotUndefined(fromState.wrappedState);

        if (this._config.aggregateAtomicTransitions) {
            throw new ImplementMeException();
        } else {
            return this.abstractSuccSingleStep(fromState);
        }
    }

    abstractSuccSingleStep(fromState: ControlAbstractState): Iterable<ControlAbstractState> {
        let result: ControlAbstractState[] = [];

        // Choose threads to step.
        // - Typically all those threads that have been previously scheduled to run.
        // - Running specification (observer) threads become executed first
        const threadsToStep: IndexedThread[] = this.chooseThreadsToStep(fromState);
        Preconditions.checkState(threadsToStep.length <= 1,
            "For now, we assume that only one thread is executed concurrently");

        for (const threadToStep of threadsToStep) {
            Preconditions.checkState(threadToStep.threadStatus.getComputationState() === THREAD_STATE_RUNNING);

            // Determine the operations to execute on for the given thread
            const leavingOps: StepInformation[] = this.resolveLeavingOps(threadToStep);
            Preconditions.checkState(leavingOps.length > 0,
                "A thread with no leaving ops must NOT be in state THREAD_STATE_RUNNING");

            for (const op of leavingOps) {
                // Interpret the operation `op` for thread `threadToStep` in state `fromState`
                const succStates0: ControlAbstractState[] = this.interprete(fromState, threadToStep, op);

                // Wake up threads (set status YIELD) that have been waiting for a condition to be reached
                const succStates1: ControlAbstractState[] = mapExpand(succStates0, this.awaikConditionCheckThreads);

                // Schedule the threads to run in the next iterations
                for (const succState of succStates1) {
                    result = result.concat(this.schedule(fromState, succState, threadToStep.threadIndex));
                }
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
            if (t.getComputationState() == THREAD_STATE_RUNNING) {
                result.push(new IndexedThread(t, index));
            }
            index++;
        }

        return result;
    }

    /**
     * Returns either a singleton-list or the empty list.
     */
    private resolveLeavingOps(thread: IndexedThread): StepInformation[] {
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

            result.push(new StepInformation(thread, statementTarget, isAtomic,
                this.scopeOperations([op], threadState.getScopeStack(), threadState.getScopeStack()),
                    threadState.getCallStack(), threadState.getScopeStack()));
        }

        return result;
    }

    private scopeOperations(ops: ProgramOperation[], readFromScope: ImmList<string>,
                            writeToScope: ImmList<string>): ProgramOperation[] {
        const scoper = new ScopeTransformerVisitor(readFromScope, writeToScope);
        return ops.map((o) => ProgramOperationFactory.createFor(o.ast.accept(scoper)));
    }

    private awaikConditionCheckThreads(inState: ControlAbstractState): ControlAbstractState[] {
        // TODO: Implement this
        //  1. Activate the specification check thread (`after statement finished`)
        //  2. Check if threads that wait for certain conditions can continue to run
        //     (assume certain conditions to hold if this accelerates the analysis without being unsound)
        //
        return [inState];
    }

    private interprete(fromState: ControlAbstractState, threadToStep: IndexedThread,
                       step: StepInformation): ControlAbstractState[] {
        const result: ControlAbstractState[] = [];

        // Interpretation by this analysis
        const withControlResults: ControlAbstractState[] = this.interpreteLocal(fromState, threadToStep, step);

        // Interpret the wrapped state by the wrapped analysis
        const wrappedAnalysisResults: Iterable<AbstractElement> = Transfers.withIntermediateOps(
            this._wrappedTransferRelation, fromState.wrappedState, step.ops, Concerns.defaultProgramConcern());

        // Combine the result
        for (const r of withControlResults){
            Preconditions.checkNotUndefined(r);
            for (const w of wrappedAnalysisResults) {
                Preconditions.checkNotUndefined(w);
                const properties = this.extractFailedForProperties(r.getThreadStates());

                result.push(r.withWrappedState(w)
                    .withSteppedFor([step.steppedThread.threadIndex])
                    .withIsTargetFor(properties));
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
                       step: StepInformation): ControlAbstractState[] {
        Preconditions.checkNotUndefined(fromState);
        Preconditions.checkNotUndefined(threadToStep);
        Preconditions.checkNotUndefined(step);

        Preconditions.checkArgument(step.ops.length === 1);
        const stepOp = step.ops[0];
        const steppedActor = this._task.getActorByName(step.steppedThread.threadStatus.getActorId());
        const fromLocation = step.steppedThread.threadStatus.getRelationLocation();

        // Set the new control location
        let result: ControlAbstractState = fromState.withThreadStateUpdate(threadToStep.threadIndex,
            (ts) =>
                ts.withLocation(step.succLoc)
                .withOperations(ImmList(step.ops.map(o => o.ident)))
                .withCallStack(step.succCallStack)
                .withScopeStack(step.succScopeStack));

        // TODO: Where and how to handle the `clone` statement?

        //
        // Handle different statements that start other threads and wait for them
        //
        if (stepOp.ast instanceof BeginAtomicStatement) {
            result = result.withThreadStateUpdate(threadToStep.threadIndex,
                (ts) => ts.withIncrementedAtomic());

        } else if (stepOp.ast instanceof EndAtomicStatement) {
            result = result.withThreadStateUpdate(threadToStep.threadIndex,
                (ts) => ts.withDecrementedAtomic());

        } else if (stepOp.ast instanceof CallStatement) {
            // The following lines realize the inter-procedural analysis.
            const calledMethodName = stepOp.ast.calledMethod.text;

            if (steppedActor.isExternalMethod(calledMethodName)) {
                const call = stepOp.ast as CallStatement;
                if (call.calledMethod.text == MethodIdentifiers._RUNTIME_signalFailure) {
                    const properties: ImmSet<Property> = Properties.fromArguments(call.args);
                    result = result.withThreadStateUpdate(threadToStep.threadIndex, (ts) =>
                        ts.withComputationState(THREAD_STATE_FAILURE)
                            .withFailedFor(properties));
                }

            } else {
                const steppedThread = threadToStep.threadStatus;
                const calledMethod: Method = steppedActor.getMethod(calledMethodName);
                const interProcOps: ProgramOperation[] = this.createPassArgumentsOps(calledMethod, stepOp.ast.args);
                const succCallStack = steppedThread.getCallStack()
                    .push(new MethodCall(fromLocation, step.succLoc));
                const succScopeStack = steppedThread.getScopeStack().push(calledMethodName);

                for (const entryLocId of calledMethod.transitions.entryLocationSet) {
                    const callToRelationLoc: RelationLocation = new RelationLocation(
                        steppedActor.ident, calledMethod.transitions.ident, entryLocId);
                    const currentScopeStack = steppedThread.getScopeStack();

                    result = result.withThreadStateUpdate(threadToStep.threadIndex, (ts) =>
                        ts.withOperations(ImmList(this.scopeOperations(interProcOps, currentScopeStack, succScopeStack).map(op => op.ident)))
                            .withLocation(callToRelationLoc)
                            .withCallStack(succCallStack)
                            .withScopeStack(succScopeStack));
                }
            }

        } else if (stepOp.ast instanceof ReturnStatement) {
            const steppedThread = threadToStep.threadStatus;
            const callInformation: MethodCall = steppedThread.getCallStack().get(steppedThread.getCallStack().size-1);
            const succReturnCallsTo: ImmList<MethodCall> = steppedThread.getCallStack().pop();
            const succScopeStack: ImmList<string> = steppedThread.getScopeStack().pop();

            // Assign the result to the variable that was referenced in the `CallStatement`
            const interProcOps: ProgramOperation[] = this.createStoreCallResultOps(steppedThread, callInformation, stepOp.ast as ReturnStatement);

            result = result.withThreadStateUpdate(threadToStep.threadIndex, (ts) =>
                ts.withOperations(ImmList(this.scopeOperations(interProcOps, steppedThread.getScopeStack(), succScopeStack).map(o => o.ident)))
                    .withLocation(callInformation.getReturnTo())
                    .withCallStack(succReturnCallsTo)
                    .withScopeStack(succScopeStack));

        } else if (stepOp.ast instanceof BroadcastMessageStatement) {
            const stmt: BroadcastMessageStatement = stepOp.ast as BroadcastMessageStatement;
            const msg: string = this.evaluateToConcreteMessage(stmt.msg);
            const waitFor: IndexedThread[] = this.getAllMessageReceiverThreadsFrom(result, msg);

            // Prepare the waiting threads for running
            for (const waitForThread of waitFor) {
                result = result.withThreadStateUpdate(waitForThread.threadIndex, (ts) =>
                    ts.withComputationState(THREAD_STATE_YIELD));
            }

        } else if (stepOp.ast instanceof BroadcastAndWaitStatement) {
            const steppedThread = threadToStep.threadStatus;
            const stmt: BroadcastAndWaitStatement = stepOp.ast as BroadcastAndWaitStatement;
            const msg: string = this.evaluateToConcreteMessage(stmt.msg);
            const waitFor: IndexedThread[] = this.getAllMessageReceiverThreadsFrom(result, msg);

            // Prepare the waiting threads for running
            for (const waitForThread of waitFor) {
                result = result.withThreadStateUpdate(waitForThread.threadIndex, (ts) =>
                    ts.withComputationState(THREAD_STATE_YIELD));
            }

            // Wait for all triggered threads to finish
            result = result.withThreadStateUpdate(threadToStep.threadIndex, (ts) =>
                ts.withWaitingForThreads(
                        steppedThread
                            .getWaitingForThreads()
                            .union(waitFor.map((t) => t.threadStatus.getThreadId()))));

        } else if (stepOp.ast instanceof WaitUntilStatement) {
            const stmt: WaitUntilStatement = stepOp.ast as WaitUntilStatement;

            // ASSUMPTION:
            //   For each WaitUntilStatement exists a special script that is triggered
            //   whenever the condition is met. The body of this script is empty.

            // const waitfor: ThreadState = this.getConditionCheckThreadFrom(threadStates, stmt.cond);
            // Preconditions.checkState(waitfor !== null, "There must be one condition check thread");

            // TODO:
            //   We might have to introduce an EXIT code of threads that signals
            //   whether or not a specific control location has been reached while
            //   processing the body.
            throw new ImplementMeException();

        } else if (stepOp.ast instanceof WaitSecsStatement) {
            const stmt: WaitSecsStatement = stepOp.ast as WaitSecsStatement;
            // const timeCond: BooleanExpression = this.createTimeCond(stmt.secs);
            // const waitfor: ThreadState = this.createTemporaryCheckThreadFor(timeCond);

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
        //  - BootStrap
        //  - AfterBootstrap
        //  - Startup
        //  - StartedAsClone
        //  - ReceivedMessage (after a Broadcast op)
        //  - ReachedCondition (after each user-visible state)

        // TODO: Mouse inputs, keyboard inputs, microphone inputs, others?

        // TODO: Produce a state with THREAD_STATE_RUNNING_ATOMIC if isInnerAtomic

        return [result];
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

    private schedule(predState: ControlAbstractState, succState: ControlAbstractState,
                     steppedThreadIndex: number): ControlAbstractState[] {
        let result: ControlAbstractState = succState;
        const steppedThread: IndexedThread = succState.getIndexedThreadState(steppedThreadIndex);

        const nextOps = this.resolveLeavingOps(steppedThread);
        if (nextOps.length > 0 && steppedThread.threadStatus.getInAtomicMode() > 0) {
            // Finish the atomic operations without interruptions by another thread
            return [result.withThreadStateUpdate(steppedThread.threadIndex, (ts) =>
                ts.withComputationState(THREAD_STATE_RUNNING))];
        }

        if (nextOps.length == 0) {
            // Set to THREAD_STATE_DONE if on a terminating location
            result = result.withThreadStateUpdate(steppedThread.threadIndex, (ts) =>
                ts.withComputationState(THREAD_STATE_DONE));

        } else {
            // YIELD the current state if it is not yet on a terminating control location of the script.
            result = result.withThreadStateUpdate(steppedThread.threadIndex, (ts) =>
                ts.withComputationState(THREAD_STATE_YIELD));
        }

        // Determine and set the next thread to step
        const continueWithNextThreadAt: number = this.determineNextThreadToStep(result, steppedThread.threadIndex);
        if (continueWithNextThreadAt > -1) {
            result = result.withThreadStateUpdate(continueWithNextThreadAt, (ts) =>
                ts.withComputationState(THREAD_STATE_RUNNING));
        }

        this.checkSchedule(result);
        return [result];
    }

    private determineNextThreadToStep(resultBase: ControlAbstractState, steppedThreadIdx: number): number {
        const threads = resultBase.getThreadStates();

        // TODO: Specification scheduling (also these checks should be done outside the atomic transitions)

        let indexToCheck = (steppedThreadIdx + 1) % threads.size;
        let checked = 0;
        while (checked <= threads.size) {
            indexToCheck = (indexToCheck + 1) % threads.size;
            const threadAtIndex = threads.get(indexToCheck);
            if (this.isNonObserverThread(threadAtIndex)) {
                if (threadAtIndex.getComputationState() === THREAD_STATE_YIELD) {
                    return indexToCheck;
                }
            }
            checked++;
        }

        // Continue to execute the previously stepped thread of no other
        // is ready to be stepped.
        const stepped = threads.get(steppedThreadIdx);
        if (this.isSteppable(stepped)) {
            return steppedThreadIdx;
        } else {
            return -1;
        }
    }

    private isSteppable(thread: ThreadState): boolean {
        return thread.getComputationState() == THREAD_STATE_RUNNING
            || thread.getComputationState() == THREAD_STATE_YIELD;
    }

    private isNonObserverThread(thread: ThreadState) {
        const actor = this._task.getActorByName(thread.getActorId());
        return !actor.isObserver;
    }

    private checkSchedule(schedOf: ControlAbstractState) {
        let threadIndex = 0;
        let running = 0;
        for (const ts of schedOf.getThreadStates()) {
            const ops = this.resolveLeavingOps(new IndexedThread(ts, threadIndex));
            if (ts.getComputationState() == THREAD_STATE_RUNNING) {
                running++;
                Preconditions.checkState(ops.length > 0);
            }
            threadIndex++;
        }
        Preconditions.checkState(running <= 1);
    }

    private getAllMessageReceiverThreadsFrom(abstractState: ControlAbstractState, msg: string): IndexedThread[] {
        const result: IndexedThread[] = [];
        let index = 0;
        for (const t of abstractState.getThreadStates()) {
            const script = this._task.getActorByName(t.getActorId()).getScript(t.getScriptId());
            if (!script) {
                continue;
            }

            if (script.event instanceof MessageReceivedEvent) {
                const ev: MessageReceivedEvent = script.event as MessageReceivedEvent;
                const handled = this.evaluateToConcreteMessage(ev.message);
                if (msg == handled) {
                    result.push(new IndexedThread(t, index));
                }
            }
            index++;
        }
        return result;
    }

    private evaluateToConcreteMessage(msg: StringExpression) {
        if (msg instanceof StringLiteral) {
            const lit = msg as StringLiteral;
            return lit.text;
        }
        throw new ImplementMeException();
    }
}
