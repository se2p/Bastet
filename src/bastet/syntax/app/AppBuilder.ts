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

import {Actor, ActorMap, Actors} from "./Actor";
import {App} from "./App";
import {AppResource, AppResourceMap} from "./AppResource";
import {Script} from "./controlflow/Script";
import {DataLocationMap, DataLocations} from "./controlflow/DataLocation";
import {ScratchType} from "../ast/core/ScratchType";
import {RelationBuildingVisitor} from "./controlflow/RelationBuildingVisitor";
import {TransitionRelation, TransitionRelations} from "./controlflow/TransitionRelation";
import {AstNode, OptionalAstNode} from "../ast/AstNode";
import {Preconditions} from "../../utils/Preconditions";
import {ProgramDefinition} from "../ast/core/ModuleDefinition";
import {ActorDefinition, ConcreteActorMode} from "../ast/core/ActorDefinition";
import {
    AfterBootstrapMonitoringEvent,
    AfterStatementMonitoringEvent,
    BootstrapEvent,
    CoreEvent
} from "../ast/core/CoreEvent";
import {ScriptDefinition, ScriptDefinitionList} from "../ast/core/ScriptDefinition";
import {
    MethodDefinition,
    MethodDefinitionList,
    MethodDefinitionMap,
    MethodSignatureList,
    MethodSignatureMap
} from "../ast/core/MethodDefinition";
import {ResourceDefinitionList} from "../ast/core/ResourceDefinition";
import {StatementList} from "../ast/core/statements/Statement";
import {Scripts} from "./controlflow/Scripts";
import {IllegalStateException} from "../../core/exceptions/IllegalStateException";
import {Maps} from "../../utils/Maps";
import {Lists} from "../../utils/Lists";
import {Method} from "./controlflow/Method";
import {DeclareStackVariableStatement} from "../ast/core/statements/DeclarationStatement";
import {Identifier} from "../ast/core/Identifier";
import {VariableWithDataLocation} from "../ast/core/Variable";
import {Logger} from "../../utils/Logger";
import {ReturnStatement} from "../ast/core/statements/ControlStatement";
import {TypeInformationStorage} from "../DeclarationScopes";
import {Concern, Concerns} from "../Concern";
import {ProgramOperation} from "./controlflow/ops/ProgramOperation";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";
import {ImmutableMap} from "../../utils/ImmutableMap";
import {ImmutableList} from "../../utils/ImmutableList";
import {CallStatement} from "../ast/core/statements/CallStatement";

export class AppBuilder {

    private readonly _library: App;
    private _knownActors: ActorMap;

    constructor(libraryModule: App) {
        this._library = Preconditions.checkNotUndefined(libraryModule);
        this._knownActors = {};
        for (let a of libraryModule.actors) {
            this._knownActors[a.ident] = a;
        }
    }

    /**
     * Build the control flow structure, ... from the program's
     * abstract syntax tree.
     *
     * @param programOrigin: An informal information for the user on the origin of the program.
     * @param ast: The syntax tree.
     * @param actorNamePrefix: A prefix to add to the name of all actors.
     */
    public buildFromSyntaxTree(programOrigin: string, ast: AstNode,
                               typeStorage: TypeInformationStorage): App {

        Preconditions.checkArgument(ast instanceof ProgramDefinition);
        const programNode: ProgramDefinition = ast as ProgramDefinition;
        const actorMap: ActorMap = this.buildActors(programNode);

        // TODO/FIXME: Check if adding the prefix to actor names works correctly.
        //      Also references to the actor must be updated.

        return new App(programOrigin, programNode.ident.text, actorMap, typeStorage);
    }

    private buildActors(programAST: ProgramDefinition): ActorMap {
        let result: ActorMap = {};
        const actorDefinitions : ActorDefinition[] = programAST.actors.elements;

        for (let actorDefinition of actorDefinitions) {
            const actor: Actor = this.buildActor(actorDefinition);

            // Add as result
            this._knownActors[actor.ident] = actor;
            result[actor.ident] = actor;
        }

        // Add the actor that can bootstrap the application
        const boostrapper = Actors.defaultBoostraper();
        result[boostrapper.ident] = boostrapper;

        return result;
    }

    private buildActor(actorDefinition: ActorDefinition) {
        const actorName: string = actorDefinition.ident.text;
        const acd = actorDefinition;

        const resources = this.buildResources(acd.resourceDefs);
        const datalocs = this.buildDatalocs(acd.resourceDefs, acd.declarationStmts);
        const initScript = this.buildInitScript(acd.resourceDefs, acd.declarationStmts, acd.initStmts);
        const methodDefs = this.buildMethodDefs(acd.methodDefs);
        const externalMethodSigs = this.buildExternalMethodSigs(acd.externalMethodDecls);
        const scripts = this.buildScripts(acd.scriptList).concat([initScript]);
        const methods = this.buildMethods(acd.methodDefs);
        const concern = this.determineConcern(actorDefinition);

        let inheritsFromActors: Actor[] = [];
        for (let aid of actorDefinition.inheritsFrom.elements) {
            const a: Actor = this._knownActors[aid.text];
            if (!a) {
                throw new IllegalStateException(`The actor "${aid.text}" is not known. Correct library specified?`);
            }
            inheritsFromActors.push(a);
        }

        return new Actor(actorDefinition.mode, actorName, inheritsFromActors, [],
            concern, resources, datalocs, initScript, methodDefs, externalMethodSigs, scripts, methods);
    }

    private determineConcern(actorDef: ActorDefinition): Concern {
        Preconditions.checkNotUndefined(actorDef);

        const isSpecificationActor = actorDef.scriptList.elements.find((sd) => sd.event instanceof AfterStatementMonitoringEvent
            || sd.event instanceof AfterBootstrapMonitoringEvent) != null;

        if (isSpecificationActor) {
            return Concerns.defaultSpecificationConcern();
        }

        return Concerns.defaultProgramConcern();
    }

    private buildMethods(methodDefs: MethodDefinitionList): Method[] {
        let result: Method[] = [];
        for (let m of methodDefs) {
            const visitor = new RelationBuildingVisitor();
            let methodTr: TransitionRelation = TransitionRelations.epsilon();

            // ATTENTION: Parameter declarations get added in a different step,
            // when calling the method with actual arguments.

            // 1. Declare the result variable
            let resultVariable: OptionalAstNode<VariableWithDataLocation> = OptionalAstNode.absent();
            if (!ScratchType.isVoid(m.returns.type)) {
                const resultVarIdent: Identifier = m.returns.ident;
                const resultVarType: ScratchType = m.returns.type;
                const resultVar: VariableWithDataLocation = new VariableWithDataLocation(
                    DataLocations.createTypedLocation(resultVarIdent, resultVarType));
                const declarationStmt = new DeclareStackVariableStatement(resultVar);
                const dclStmtList = StatementList.from([declarationStmt]);
                resultVariable = OptionalAstNode.with(resultVar);

                methodTr = TransitionRelations.concat(methodTr, dclStmtList.accept(visitor));
            }

            // 2. Concat the body
            methodTr = TransitionRelations.concat(methodTr, m.statements.accept(visitor));

            // 3. Add a transition with a return statement.
            //    This statement does only signal that the method
            //    returns to the caller.
            const returnStmt = new ReturnStatement(resultVariable);
            const returnStmtInList = StatementList.from([returnStmt]);
            methodTr = TransitionRelations.concat(methodTr, returnStmtInList.accept(visitor));

            // 4. Eliminate epsilon transitions
            methodTr = TransitionRelations.establishAnalysisInvariants(methodTr);

            // 5. Assign a name to the transition relation
            methodTr = TransitionRelations.named(methodTr, m.ident.text);

            result.push(new Method(m, methodTr));
        }

        return result;
    }

    private shouldRestartOnEvent(script: ScriptDefinition, event: CoreEvent) {
        return script.isRestart;
    }

    private buildScripts(scriptList: ScriptDefinitionList): Script[] {
        let result: Script[] = [];
        for (let script of scriptList) {
            const scriptId: Identifier = script.ident;
            const event = script.event;
            const visitor = new RelationBuildingVisitor();
            const transRelation = TransitionRelations.named(
                TransitionRelations.establishAnalysisInvariants(
                    script.stmtList.accept(visitor)), scriptId.text);

            result.push(new Script(scriptId, event,
                this.shouldRestartOnEvent(script, event), transRelation));
        }

        return result;
    }

    private buildMethodDefs(methodDefs: MethodDefinitionList): MethodDefinitionMap {
        let result: MethodDefinitionMap = {};
        for (let methodDef of methodDefs) {
            const methodName = methodDef.ident.text;
            result[methodName] = methodDef;
        }

        return result;
    }

    private buildExternalMethodSigs(methodSigs: MethodSignatureList): MethodSignatureMap {
        let result: MethodSignatureMap = {};
        for (let methodDef of methodSigs) {
            const methodName = methodDef.ident.text;
            result[methodName] = methodDef;
        }

        return result;
    }

    private buildInitScript(resourceListContext: ResourceDefinitionList, declarationStmtList: StatementList,
                                   stmtList: StatementList): Script {
        const visitor = new RelationBuildingVisitor();

        let transrelRes: TransitionRelation;
        //if (resourceListContext.elements.length > 0) {
        //    // transrelRes: TransitionRelation = resourceListContext.accept(visitor);
        //    throw new ImplementMeException(); // TODO: Ressources not yet supported. Implement this feature!
        //} else {
        //    transrelRes = TransitionRelations.epsilon();
        //}

        transrelRes = TransitionRelations.epsilon();

        const transrelLocs: TransitionRelation = declarationStmtList.accept(visitor);
        const transrelSet: TransitionRelation = stmtList.accept(visitor);
        const compundTransRel = TransitionRelations.establishAnalysisInvariants(
            TransitionRelations.concat(transrelRes,
                TransitionRelations.concat(transrelLocs, transrelSet)));

        const scriptId = Identifier.freshWithPrefix("init");
        return new Script(scriptId, BootstrapEvent.instance(), false, compundTransRel);
    }

    private buildResources(resourceListContext: ResourceDefinitionList): AppResourceMap {
        let result: AppResourceMap = {};
        for (let rc of resourceListContext) {
            const id: string = rc.ident.text;
            result[id] = new AppResource(id, rc.resourceType, rc.resourceLocator.uri);
        }

        return result;
    }

    private buildDatalocs(resourceListContext: ResourceDefinitionList,
                                 declarationStmtList: StatementList): DataLocationMap {
        let result: DataLocationMap = {};

        // Data locations based on the declaration statements
        // for (let stmt of declarationStmtList) {
        //     if (stmt instanceof DeclareVariableStatement) {
        //         const declStmt: DeclareVariableStatement = stmt as DeclareVariableStatement;
        //         const id: string = declStmt.ident.text;
        //         result[id] = new DataLocation(declStmt, id, declStmt.type);
        //     } else {
        //         throw new ImplementMeException();
        //     }
        // }

        // Data locations based on the resources
        Logger.potentialIncomplete("Add data locations for resources?");
        return result;
    }

    public dissolveActorInheritance(app: App, actor: Actor): Actor {
        Preconditions.checkNotUndefined(actor);
        Preconditions.checkNotUndefined(app);

        let result: Actor = actor;

        const worklist: Actor[] = [];
        const handled: Set<String> = new Set();

        if (actor.inheritFrom.length > 0) {
            worklist.push(actor);
        }

        while (worklist.length > 0) {
            const work = worklist.pop();
            for (const copyFrom of work.inheritFrom) {
                if (handled.has(copyFrom.ident)) {
                    throw new IllegalStateException("Cycle in the inheritance relation?");
                }
                result = this.concatActors(result, copyFrom);
                handled.add(copyFrom.ident);
                worklist.push(copyFrom);
            }
        }

        return result;
    }

    private concatActors(main: Actor, secondary: Actor): Actor {
        // TODO: Handle re-definitions of resources or methods with the same identifier
        //      Rename the basic versions so that they can be referenced by the
        //      inheriting actors?
        const resources = Maps.mergeImmutableMaps(main.resourceMap, secondary.resourceMap);
        const initScript = Scripts.concat(secondary.initScript, main.initScript);
        // The init script must not use stack variables (only global or actor scoped).
        this.ensureNoStackVariables(initScript);


        const methodDefMap: Map<string, MethodDefinition> = new Map()
        main.methodMap.forEach((v,k) => {
           methodDefMap.set(k, v)
        });
        secondary.methodMap.forEach((v,k) => {
            if (!methodDefMap.has(k)) {
                methodDefMap.set(k, v)
            }
        });
        const methodDefinitions: ImmutableMap<string, MethodDefinition> = new ImmutableMap<string, MethodDefinition>(methodDefMap.entries())

        let methodMap: Map<string, Method> = new Map<string, Method>();
        for (let method of main.methods) {
            methodMap.set(method.ident.text, method)
        }
        for (let method of secondary.methods) {
            if (!methodMap.has(method.ident.text)) {
                methodMap.set(method.ident.text,method)
            }
        }
        const methods = new ImmutableList(Array.from(methodMap.values()))

        const externalMethods = Maps.mergeImmutableMaps(main.externalMethodMap, secondary.externalMethodMap);
        const datalocs = Maps.mergeImmutableMaps(main.datalocMap, secondary.datalocMap);
        const scripts = Lists.concatImmutableLists(main.scripts, secondary.scripts);

        // TODO: The way we dedetermine the concern of an actor is somehow hacky.
        //  We could take advantage of the inheritance relation
        let concern: Concern = main.concern;
        if (secondary.concern == Concerns.defaultSpecificationConcern()) {
            concern = Concerns.defaultSpecificationConcern();
        }

        return new Actor(main.actorMode, main.ident, [], [secondary].concat(Array.from(secondary.dissolvedFrom)),
            concern, resources.createMutable(), datalocs.createMutable(),
            initScript, methodDefinitions.createMutable(), externalMethods.createMutable(),
            scripts.createMutable(), methods.createMutable());
    }

    public static dissolveInheritance(taskModel: App): App {
        const ab = new AppBuilder(App.empty());

        const concreteActors: Actor[] = taskModel
            .actors.filter((a) => a.actorMode == ConcreteActorMode.instance());

        const flatActors: ActorMap = {};
        for (const a of concreteActors) {
            const d: Actor = ab.dissolveActorInheritance(taskModel, a);
            flatActors[d.ident] = d;
        }

        return new App(taskModel.origin, taskModel.ident, flatActors, taskModel.typeStorage);
    }

    /**
     * Remove all method definitions for that no call exists
     * from the task model.
     *
     * @param taskModel
     */
    public static removeIrrelevantMethods(taskModel: App): App {
        Preconditions.checkNotUndefined(taskModel);

        const actorMap: ActorMap = {};

        for (const actor of taskModel.actors) {
            // Collect all called methods
            const calledMethods = new Set<string>();

            const collectFromTransitions = (tr: TransitionRelation) => {
                for (const [from, opId, to] of tr.transitions) {
                    const op = ProgramOperation.for(opId);
                    if (op.ast instanceof CallStatement) {
                        const call = op.ast as CallStatement;
                        const calledMethod = actor.findMethod(call.calledMethod.text);
                        if (calledMethod != null) {
                            if (!calledMethods.has(call.calledMethod.text)) {
                                calledMethods.add(call.calledMethod.text);
                                collectFromTransitions(calledMethod.transitions);
                            }
                        }
                    }
                }
            };

            // Add all externally called methods (does not harm and some of them
            // are called from within BASTET).
            for (const ext of actor.externalMethodMap.keys()) {
                calledMethods.add(ext);
            }

            Preconditions.checkNotUndefined(actor.inheritFrom.length == 0, "Please dissolve the inheritance relation before!");
            for (const script of actor.scripts) {
                collectFromTransitions(script.transitions);
            }

            const methodDefsPrime: MethodDefinitionMap = {};
            for (const [mid, m] of actor.methodMap.entries()) {
                if (calledMethods.has(mid)) {
                    methodDefsPrime[mid] = m;
                }
            }

            // `methodsPrime` must include both internal and external methods
            const methodsPrime: Method[] = [];
            for (const m of actor.methods) {
                if (calledMethods.has(m.ident.text)) {
                    methodsPrime.push(m);
                }
            }

            const actorPrime = new Actor(actor.actorMode, actor.ident, actor.inheritFrom.createMutable(),
                actor.dissolvedFrom.createMutable(), actor.concern, actor.resourceMap.createMutable(),
                actor.datalocMap.createMutable(), actor.initScript,
                methodDefsPrime, actor.externalMethodMap.createMutable(), actor.scripts.createMutable(), methodsPrime);

            actorMap[actorPrime.ident] = actorPrime;
        }

        return new App(taskModel.origin, taskModel.ident, actorMap, taskModel.typeStorage);
    }

    private ensureNoStackVariables(initScript: Script) {
        for (const [f, o, t] of initScript.transitions.transitions) {
            const op = ProgramOperation.for(o);
            if (op instanceof DeclareStackVariableStatement) {
                throw new IllegalArgumentException();
            }
        }
    }
}
