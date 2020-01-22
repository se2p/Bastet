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

import {Actor, ActorMap} from "./Actor";
import {App} from "./App";
import {AppResource, AppResourceMap} from "./AppResource";
import {Script} from "./controlflow/Script";
import DataLocation, {DataLocationMap} from "./controlflow/DataLocation";
import {ScratchType, VoidType} from "../ast/core/ScratchType";
import {RelationBuildingVisitor} from "./controlflow/RelationBuildingVisitor";
import {TransitionRelations} from "./controlflow/TransitionRelation";
import {TransitionRelationToDot} from "./controlflow/TransitionRelationToDot";
import {AstNode} from "../ast/AstNode";
import {Preconditions} from "../../utils/Preconditions";
import {ProgramDefinition} from "../ast/core/ModuleDefinition";
import {ActorDefinition, ConcreteActorMode} from "../ast/core/ActorDefinition";
import {NeverEvent} from "../ast/core/CoreEvent";
import {ScriptDefinitionList} from "../ast/core/ScriptDefinition";
import {MethodDefinitionList, MethodDefinitionMap, ResultDeclaration} from "../ast/core/MethodDefinition";
import {ParameterDeclarationList} from "../ast/core/ParameterDeclaration";
import {ResourceDefinitionList} from "../ast/core/ResourceDefinition";
import {StatementList} from "../ast/core/statements/Statement";
import {Scripts} from "./controlflow/Scripts";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {IllegalStateException} from "../../core/exceptions/IllegalStateException";
import {Maps} from "../../utils/Maps";
import {Lists} from "../../utils/Lists";

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

    public buildControlFlowsFromSyntaxTree(programOrigin: string, ast: AstNode,
                                           actorNamePrefix: string): App {

        Preconditions.checkArgument(ast instanceof ProgramDefinition);
        const programNode: ProgramDefinition = ast as ProgramDefinition;
        const actorMap: ActorMap = this.buildActors(programNode, actorNamePrefix);

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

            // Dot file export
            this.exportScriptsToDoT(flatActor);
        }

        return result;
    }

    private exportScriptsToDoT(actor: Actor): void {
        const toDotWriter = new TransitionRelationToDot();
        let i: number = 1;
        for (let s of actor.scripts) {
            const target: string = `output/actor_${actor.ident}_script_${i}.dot`;
            toDotWriter.export(s.transitions, target);
            i++;
        }
        const target: string = `output/actor_${actor.ident}_script_init.dot`;
        toDotWriter.export(actor.initScript.transitions, target);
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
        const scripts = this.buildScripts(acd.scriptList);

        let inheritsFromActors: Actor[] = [];
        for (let aid of actorDefinition.inheritsFrom.elements) {
            const a: Actor = this._knownActors[aid.text];
            Preconditions.checkNotUndefined(a);
            inheritsFromActors.push(a);
        }

        return new Actor(actorDefinition, actorDefinition.mode, actorName,
            inheritsFromActors, resources, datalocs, initScript, methodDefs, scripts);
    }

    private buildScripts(scriptList: ScriptDefinitionList): Script[] {
        let result: Script[] = [];
        for (let script of scriptList) {
            const event = script.event;
            const visitor = new RelationBuildingVisitor();
            const transRelation = TransitionRelations.eliminateEpsilons(
                script.stmtList.accept(visitor));

            result.push(new Script(Scripts.freshScriptId(), event, transRelation));
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

    private buildMethodResultDef(resultDecl: ResultDeclaration): DataLocation {
        if (resultDecl.type == VoidType.instance()) {
            return DataLocation.void();
        } else {
            const id: string = resultDecl.ident.text;
            const t: ScratchType = resultDecl.type;
            return new DataLocation(resultDecl, id, t);
        }
    }

    private buildParameterDeclarations(parameterListContext: ParameterDeclarationList): DataLocationMap {
        let result: DataLocationMap = {};
        for (let p of parameterListContext.elements) {
            const id: string = p.ident.text;
            const t: ScratchType = p.type;
            result[id] = new DataLocation(p, id, t);
        }
        return result;
    }

    private buildInitScript(resourceListContext: ResourceDefinitionList, declarationStmtList: StatementList,
                                   stmtList: StatementList): Script {
        const visitor = new RelationBuildingVisitor();
        const transrelRes = resourceListContext.accept(visitor);
        const transrelLocs = declarationStmtList.accept(visitor);
        const transrelSet = stmtList.accept(visitor);
        const compundTransRel = TransitionRelations.concat(transrelRes,
            TransitionRelations.concat(transrelLocs, transrelSet));
        return new Script(Scripts.freshScriptId(), NeverEvent.instance(), compundTransRel);
    }

    private buildResources(resourceListContext: ResourceDefinitionList): AppResourceMap {
        let result: AppResourceMap = {};
        for (let rc of resourceListContext) {
            const id: string = rc.ident.text;
            result[id] = new AppResource(rc, id, rc.resourceType, rc.resourceLocator.uri);
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
        console.warn("Declarations ignored");
        return result;
    }

    public dissolveActorInheritance(app: App, actor: Actor): Actor {
        Preconditions.checkNotUndefined(actor);
        Preconditions.checkNotUndefined(app);

        let result: Actor = actor;

        let worklist: Actor[] = [];
        let handled: Set<String> = new Set();

        while (worklist.length > 0) {
            const work = worklist.pop();
            for (let f of work.inheritsFrom) {
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
        let resources = Maps.mergeImmutableMaps(main.resourceMap, secondary.resourceMap);
        let initScript = Scripts.concat(secondary.initScript, main.initScript);
        let methodDefinitions = Maps.mergeImmutableMaps(main.methodMap, secondary.methodMap);
        let datalocs = Maps.mergeImmutableMaps(main.datalocMap, secondary.datalocMap);
        let scripts = Lists.concatImmutableLists(main.scripts, secondary.scripts);

        return new Actor(main.astnode, main.actorMode, main.ident, [],
            resources.createMutable(), datalocs.createMutable(),
            initScript, methodDefinitions.createMutable(), scripts.createMutable());
    }

    public static dissolveInheritance(taskModel: App): App {
        const ab = new AppBuilder(App.empty());

        const concreteActors: Actor[] = taskModel.actors
            .filter((a) => a.actorMode == ConcreteActorMode.instance());

        let flatActors: ActorMap = {};
        for (let a of concreteActors) {
            const d: Actor = ab.dissolveActorInheritance(taskModel, a);
            flatActors[d.ident] = d;
        }

        return new App(taskModel.origin, taskModel.ident, flatActors);
    }
}
