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
import {BootstrapEvent, CoreEvent, NeverEvent} from "../ast/core/CoreEvent";
import {ScriptDefinition, ScriptDefinitionList} from "../ast/core/ScriptDefinition";
import {
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
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";

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
                               actorNamePrefix: string): App {

        Preconditions.checkArgument(ast instanceof ProgramDefinition);
        const programNode: ProgramDefinition = ast as ProgramDefinition;
        const actorMap: ActorMap = this.buildActors(programNode, actorNamePrefix);

        // TODO/FIXME: Check if adding the prefix to actor names works correctly.
        //      Also references to the actor must be updated.

        return new App(programOrigin, programNode.ident.text, actorMap);
    }

    private buildActors(programAST: ProgramDefinition, actorNamePrefix: string): ActorMap {
        let result: ActorMap = {};
        const actorDefinitions : ActorDefinition[] = programAST.actors.elements;

        for (let actorDefinition of actorDefinitions) {
            // Flat actor
            const flatActor: Actor = this.buildActorFlat(actorDefinition, actorNamePrefix);

            this._knownActors[flatActor.ident] = flatActor;

            // Add as result
            result[flatActor.ident] = flatActor;
        }

        const boostrapper = Actors.defaultBoostraper();
        result[boostrapper.ident] = boostrapper;

        return result;
    }

    private buildActorFlat(actorDefinition: ActorDefinition, actorNamePrefix: string) {
        let actorName: string = actorDefinition.ident.text;
        if (actorNamePrefix) {
            actorName = actorNamePrefix + "_" + actorName;
        }
        const acd = actorDefinition;

        const resources = this.buildResources(acd.resourceDefs);
        const datalocs = this.buildDatalocs(acd.resourceDefs, acd.declarationStmts);
        const initScript = this.buildInitScript(acd.resourceDefs, acd.declarationStmts, acd.initStmts);
        const methodDefs = this.buildMethodDefs(acd.methodDefs);
        const externalMethodSigs = this.buildExternalMethodSigs(acd.externalMethodDecls);
        const scripts = this.buildScripts(acd.scriptList).concat([initScript]);
        const methods = this.buildMethods(acd.methodDefs);

        let inheritsFromActors: Actor[] = [];
        for (let aid of actorDefinition.inheritsFrom.elements) {
            const a: Actor = this._knownActors[aid.text];
            Preconditions.checkNotUndefined(a);
            inheritsFromActors.push(a);
        }

        return new Actor(actorDefinition.mode, actorName, inheritsFromActors, [],
            resources, datalocs, initScript, methodDefs, externalMethodSigs, scripts, methods);
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
            methodTr = TransitionRelations.eliminateEpsilons(methodTr);

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
            const event = script.event;
            const visitor = new RelationBuildingVisitor();
            const transRelation = TransitionRelations.eliminateEpsilons(
                script.stmtList.accept(visitor));

            result.push(new Script(Scripts.freshScriptId(), event,
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
        if (resourceListContext.elements.length > 0) {
            // transrelRes: TransitionRelation = resourceListContext.accept(visitor);
            throw new ImplementMeException(); // TODO: Ressources not yet supported. Implement this feature!
        } else {
            transrelRes = TransitionRelations.epsilon();
        }

        const transrelLocs: TransitionRelation = declarationStmtList.accept(visitor);
        const transrelSet: TransitionRelation = stmtList.accept(visitor);
        const compundTransRel = TransitionRelations.concat(transrelRes,
            TransitionRelations.concat(transrelLocs, transrelSet));
        return new Script(Scripts.freshScriptId(), BootstrapEvent.instance(), false, compundTransRel);
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
            for (const f of work.inheritFrom) {
                if (handled.has(f.ident)) {
                    throw new IllegalStateException("Cycle in the inheritance relation?");
                }
                result = this.concatActors(result, f);
                handled.add(f.ident);
                worklist.push(f);
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
        const methodDefinitions = Maps.mergeImmutableMaps(main.methodMap, secondary.methodMap);
        const externalMethods = Maps.mergeImmutableMaps(main.externalMethodMap, secondary.externalMethodMap);
        const datalocs = Maps.mergeImmutableMaps(main.datalocMap, secondary.datalocMap);
        const scripts = Lists.concatImmutableLists(main.scripts, secondary.scripts);
        const methods = Lists.concatImmutableLists(main.methods, secondary.methods);

        return new Actor(main.actorMode, main.ident, [], [secondary].concat(Array.from(secondary.dissolvedFrom)),
            resources.createMutable(), datalocs.createMutable(),
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

        return new App(taskModel.origin, taskModel.ident, flatActors);
    }

}
