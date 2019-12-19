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
import {AppResource, AppResourceMap, AppResourceType} from "./AppResource";
import {MethodDefinition, MethodDefinitionMap} from "./MethodDefinition";
import {Script} from "./controlflow/Script";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import DataLocation, {DataLocationMap} from "./controlflow/DataLocation";
import {
    BooleanType,
    ListType,
    MapType,
    NumberType,
    ScratchType,
    StringEnumType,
    StringType,
    VoidType
} from "../ast/core/ScratchType";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";
import {RelationBuildingVisitor} from "./controlflow/RelationBuildingVisitor";
import {AppEvent, AppEvents, NeverEvent, StartupEvent} from "./AppEvent";
import {TransitionRelations} from "./controlflow/TransitionRelation";
import {TransitionRelationToDot} from "./controlflow/TransitionRelationToDot";
import {AstNode} from "../ast/AstNode";
import {Preconditions} from "../../utils/Preconditions";
import {ProgramDefinition} from "../ast/core/ModuleDefinition";
import {ActorDefinition} from "../ast/core/ActorDefinition";
import {CoreEvent} from "../ast/core/CoreEvent";
import {ScriptDefinitionList} from "../ast/core/ScriptDefinition";
import {MethodDefinitionList, ResultDeclaration} from "../ast/core/MethodDefinition";
import {ParameterDeclaration, ParameterDeclarationList} from "../ast/core/ParameterDeclaration";
import {ResourceDefinitionList} from "../ast/core/ResourceDefinition";

export class AppBuilder {

    public static buildControlFlowsFromSyntaxTree(programOrigin: string, ast: AstNode, actorNamePrefix: string): App {
        Preconditions.checkArgument(ast instanceof ProgramDefinition);
        const programNode: ProgramDefinition = ast as ProgramDefinition;

        // Phase 1: Build the actors WITHOUT taking the INHERITANCE of actors into account.
        const flatActors: ActorMap = AppBuilder.buildActorsFlat(programNode, actorNamePrefix);

        // Phase 2: Rebuild the actors AND TAKE INHERITANCE into account.
        const appActors: ActorMap = AppBuilder.rebuildWithActorInheritance(flatActors);

        return new App(programOrigin, programNode.ident.text, appActors);
    }

    private static rebuildWithActorInheritance(flatActors: ActorMap): ActorMap {
        throw new ImplementMeException();
    }

    private static buildActorsFlat(programAST: ProgramDefinition, actorNamePrefix: string): ActorMap {
        let result: ActorMap = {};
        const actorDefinitions : ActorDefinition[] = programAST.actors.elements;

        for (let actorDefinition of actorDefinitions) {
            const actor: Actor = AppBuilder.buildActorFlat(actorDefinition, actorNamePrefix);
            result[actor.ident] = actor;

            this.exportScriptsToDoT(actor);
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
        const actorIdent = actorNamePrefix + "_" + actorDefinition.ident.text;
        const acd = actorDefinition;

        const resources = AppBuilder.buildResources(acd.resourceDefs);
        const datalocs = AppBuilder.buildDatalocs(acd.resourceDefs, acd.declarationStmts);
        const initScript = AppBuilder.buildInitScript(acd.resourceDefs, acd.declarationStmts, acd.initStmts);
        const methodDefs = AppBuilder.buildMethodDefs(acd.methodDefs);
        const scripts = AppBuilder.buildScripts(acd.scriptList);

        return new Actor(actorDefinition, acd.ident.text, null, resources, datalocs, initScript, methodDefs, scripts);
    }

    private static buildScripts(scriptList: ScriptDefinitionList): Script[] {
        let result: Script[] = [];
        for (let script of scriptList) {
            const event = AppBuilder.buildEvent(script.event);
            const visitor = new RelationBuildingVisitor();
            const transRelation = TransitionRelations.eliminateEpsilons(
                script.stmtList.accept(visitor));

            result.push(new Script(event, transRelation));
        }
        return result;
    }

    private static buildEvent(eventContext: CoreEvent): AppEvent {
        if (eventContext instanceof NeverEvent) {
            return NeverEvent.instance();
        } else if (eventContext instanceof StartupEvent) {
            return StartupEvent.instance();
        }

        throw new ImplementMeException();
    }

    private static buildMethodDefs(methodDefinitionListContext: MethodDefinitionList): MethodDefinitionMap {
        let result: MethodDefinitionMap = {};
        for (let methodDef of methodDefinitionListContext) {
            const methodName = methodDef.ident.text;
            const paramDecls = AppBuilder.buildParameterDeclarations(methodDef.params);
            const resultDecl = AppBuilder.buildMethodResultDef(methodDef.returns);
            result[methodName] = new MethodDefinition(methodDef, methodName, paramDecls, resultDecl);
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

    private static buildInitScript(resourceListContext: ResourceDefinitionList, declarationStmtListContext: DeclarationStmtListContext, stmtList: SetStmtListContext): Script {
        const visitor = new RelationBuildingVisitor();
        const transrelRes = resourceListContext.accept(visitor);
        const transrelLocs = declarationStmtListContext.accept(visitor);
        const transrelSet = stmtList.accept(visitor);
        const compundTransRel = TransitionRelations.concat(transrelRes,
            TransitionRelations.concat(transrelLocs, transrelSet));
        return new Script(AppEvents.never(), compundTransRel);
    }
ß
    private static buildResources(resourceListContext: ResourceListContext): AppResourceMap {
        let result: AppResourceMap = {};
        for (let rc of resourceListContext.resource()) {
            const id: string = rc.Ident().text;
            const rt: AppResourceType = AppResource.typeFromString(rc.resourceType().text);
            const uri: string = rc.resourceLocator().text;
            result[id] = new AppResource(rc, id, rt, uri);
        }
        return result;
    }

    private static buildDatalocs(resourceListContext: ResourceListContext, declarationStmtListContext: DeclarationStmtListContext): DataLocationMap {
        let result: DataLocationMap = {};

        // Data locations based on the declaration statements
        for (let stmt of declarationStmtListContext.declarationStmt()) {
            if (stmt instanceof DeclareVariableContext) {
                const declStmt: DeclareVariableContext = stmt as DeclareVariableContext;
                const id: string = declStmt.Ident().text;
                const type: ScratchType = AppBuilder.buildType(declStmt.type());
                result[id] = new DataLocation(declStmt, id, type);
            } else {
                throw new ImplementMeException();
            }
        }

        // Data locations based on the resources
        console.warn("Resource declarations ignored");
        return result;
    }

}
