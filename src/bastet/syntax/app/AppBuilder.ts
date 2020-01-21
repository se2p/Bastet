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
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import DataLocation, {DataLocationMap} from "./controlflow/DataLocation";
import {ScratchType, VoidType} from "../ast/core/ScratchType";
import {RelationBuildingVisitor} from "./controlflow/RelationBuildingVisitor";
import {TransitionRelations} from "./controlflow/TransitionRelation";
import {TransitionRelationToDot} from "./controlflow/TransitionRelationToDot";
import {AstNode} from "../ast/AstNode";
import {Preconditions} from "../../utils/Preconditions";
import {ProgramDefinition} from "../ast/core/ModuleDefinition";
import {ActorDefinition} from "../ast/core/ActorDefinition";
import {
    AfterStartupMonitoringEvent, AfterStatementMonitoringEvent,
    CoreEvent,
    NeverEvent,
    RenderedMonitoringEvent,
    StartupEvent
} from "../ast/core/CoreEvent";
import {ScriptDefinitionList} from "../ast/core/ScriptDefinition";
import {
    MethodDefinition,
    MethodDefinitionList,
    MethodDefinitionMap,
    ResultDeclaration
} from "../ast/core/MethodDefinition";
import {ParameterDeclarationList} from "../ast/core/ParameterDeclaration";
import {ResourceDefinitionList} from "../ast/core/ResourceDefinition";
import {StatementList} from "../ast/core/statements/Statement";
import {Scripts} from "./controlflow/Scripts";
import {
    AfterStartupMonitoringEventContext,
    AfterStatementMonitoringEventContext,
    RenderedMonitoringEventContext
} from "../parser/grammar/ScratchParser";

export class AppBuilder {

    public static buildControlFlowsFromSyntaxTree(programOrigin: string, ast: AstNode,
                                                  libraryModule: App, actorNamePrefix: string): App {

        Preconditions.checkArgument(ast instanceof ProgramDefinition);
        const programNode: ProgramDefinition = ast as ProgramDefinition;
        const actorMap: ActorMap = AppBuilder.buildActors(programNode, actorNamePrefix);

        return new App(programOrigin, programNode.ident.text, actorMap);
    }

    private static buildActors(programAST: ProgramDefinition, actorNamePrefix: string): ActorMap {
        let result: ActorMap = {};
        const actorDefinitions : ActorDefinition[] = programAST.actors.elements;

        for (let actorDefinition of actorDefinitions) {
            // Flat actor
            const flatActor: Actor = AppBuilder.buildActorFlat(actorDefinition, actorNamePrefix);

            // Add as result
            result[flatActor.ident] = flatActor;

            // Dot file export
            this.exportScriptsToDoT(flatActor);
        }

        return result;
    }

    private static exportScriptsToDoT(actor: Actor): void {
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

    private static buildActorFlat(actorDefinition: ActorDefinition, actorNamePrefix: string) {
        let actorName: string = actorDefinition.ident.text;
        if (actorNamePrefix) {
            actorName = actorNamePrefix + "_" + actorName;
        }
        const acd = actorDefinition;

        const resources = AppBuilder.buildResources(acd.resourceDefs);
        const datalocs = AppBuilder.buildDatalocs(acd.resourceDefs, acd.declarationStmts);
        const initScript = AppBuilder.buildInitScript(acd.resourceDefs, acd.declarationStmts, acd.initStmts);
        const methodDefs = AppBuilder.buildMethodDefs(acd.methodDefs);
        const scripts = AppBuilder.buildScripts(acd.scriptList);

        return new Actor(actorDefinition, actorName, null, resources, datalocs, initScript, methodDefs, scripts);
    }

    private static buildScripts(scriptList: ScriptDefinitionList): Script[] {
        let result: Script[] = [];
        for (let script of scriptList) {
            const event = AppBuilder.buildEvent(script.event);
            const visitor = new RelationBuildingVisitor();
            const transRelation = TransitionRelations.eliminateEpsilons(
                script.stmtList.accept(visitor));

            result.push(new Script(Scripts.freshScriptId(), event, transRelation));
        }
        return result;
    }

    private static buildEvent(eventContext: CoreEvent): CoreEvent {
        return eventContext;
    }

    private static buildMethodDefs(methodDefs: MethodDefinitionList): MethodDefinitionMap {
        let result: MethodDefinitionMap = {};
        for (let methodDef of methodDefs) {
            const methodName = methodDef.ident.text;
            result[methodName] = methodDef;
        }
        return result;
    }

    private static buildMethodResultDef(resultDecl: ResultDeclaration): DataLocation {
        if (resultDecl.type == VoidType.instance()) {
            return DataLocation.void();
        } else {
            const id: string = resultDecl.ident.text;
            const t: ScratchType = resultDecl.type;
            return new DataLocation(resultDecl, id, t);
        }
    }

    private static buildParameterDeclarations(parameterListContext: ParameterDeclarationList): DataLocationMap {
        let result: DataLocationMap = {};
        for (let p of parameterListContext.elements) {
            const id: string = p.ident.text;
            const t: ScratchType = p.type;
            result[id] = new DataLocation(p, id, t);
        }
        return result;
    }

    private static buildInitScript(resourceListContext: ResourceDefinitionList, declarationStmtList: StatementList,
                                   stmtList: StatementList): Script {
        const visitor = new RelationBuildingVisitor();
        const transrelRes = resourceListContext.accept(visitor);
        const transrelLocs = declarationStmtList.accept(visitor);
        const transrelSet = stmtList.accept(visitor);
        const compundTransRel = TransitionRelations.concat(transrelRes,
            TransitionRelations.concat(transrelLocs, transrelSet));
        return new Script(Scripts.freshScriptId(), NeverEvent.instance(), compundTransRel);
    }

    private static buildResources(resourceListContext: ResourceDefinitionList): AppResourceMap {
        let result: AppResourceMap = {};
        for (let rc of resourceListContext) {
            const id: string = rc.ident.text
            result[id] = new AppResource(rc, id, rc.resourceType, rc.resourceLocator.uri);
        }

        return result;
    }

    private static buildDatalocs(resourceListContext: ResourceDefinitionList,
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

    static dissolveInheritance(taskModel: App): App {
        console.log("FIXME: Implement this procedure, for dissolving the inheritance relation.")
        return taskModel;
    }
}
