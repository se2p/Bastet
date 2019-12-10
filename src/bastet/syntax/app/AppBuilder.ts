/*
 *
 *    Copyright 2019 University of Passau
 *
 *    Project maintained by Andreas Stahlbauer (firstname @ lastname . net)
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import {
    ActorDefinitionContext,
    BooleanTypeContext,
    DeclarationStmtListContext,
    DeclareVariableContext,
    EnumTypeContext,
    EventContext,
    InCoreEventContext,
    ListTypeContext,
    MapTypeContext,
    MethodDefinitionListContext,
    MethodResultDeclarationContext,
    NeverEventContext,
    NumerTypeContext,
    ParameterContext,
    ParameterListContext,
    ProgramContext,
    ResourceListContext,
    ScriptListContext,
    SetStmtListContext,
    StartupEventContext,
    StringTypeContext,
    TypeContext
} from "../parser/grammar/ScratchParser";
import {Actor, ActorMap} from "./Actor";
import {App} from "./App";
import {AppResource, AppResourceMap, AppResourceType} from "./AppResource";
import {MethodDefinition, MethodDefinitionMap} from "./MethodDefinition";
import {Script} from "./controlflow/Script";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import DataLocation, {DataLocationMap} from "./controlflow/DataLocation";
import {BooleanType, ListType, MapType, NumberType, ScratchType, StringEnumType, StringType} from "../ast/ScratchType";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";
import {RelationBuildingVisitor} from "./controlflow/RelationBuildingVisitor";
import {AppEvent, AppEvents, NeverEvent, StartupEvent} from "./AppEvent";
import {TransitionRelations} from "./controlflow/TransitionRelation";
import {TransitionRelationToDot} from "./controlflow/TransitionRelationToDot";

export class AppBuilder {

    public static buildControlFlowsFromSyntaxTree(programOrigin: string, programAST: ProgramContext, actorNamePrefix: string): App {
        // Phase 1: Build the actors WITHOUT taking the INHERITANCE of actors into account.
        const flatActors: ActorMap = AppBuilder.buildActorsFlat(programAST, actorNamePrefix);

        // Phase 2: Rebuild the actors AND TAKE INHERITANCE into account.
        const appActors: ActorMap = AppBuilder.rebuildWithActorInheritance(flatActors);

        return new App(programOrigin, programAST.Ident().text, appActors);
    }

    private static rebuildWithActorInheritance(flatActors: ActorMap): ActorMap {
        throw new ImplementMeException();
    }

    private static buildActorsFlat(programAST: ProgramContext, actorNamePrefix: string): ActorMap {
        let result: ActorMap = {};
        const actorDefinitions : ActorDefinitionContext[] = programAST.actorDefinitionList().actorDefinition();

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

    private static buildActorFlat(actorDefinition: ActorDefinitionContext, actorNamePrefix: string) {
        const actorIdent = actorNamePrefix + "_" + actorDefinition.Ident().toString();
        const acd = actorDefinition.actorComponentsDefinition();

        const resources = AppBuilder.buildResources(acd.resourceList());
        const datalocs = AppBuilder.buildDatalocs(acd.resourceList(), acd.declarationStmtList());
        const initScript = AppBuilder.buildInitScript(acd.resourceList(), acd.declarationStmtList(), acd.setStmtList());
        const methodDefs = AppBuilder.buildMethodDefs(acd.methodDefinitionList());
        const scripts = AppBuilder.buildScripts(acd.scriptList());

        return new Actor(actorDefinition, actorIdent, null, resources, datalocs, initScript, methodDefs, scripts);
    }

    private static buildScripts(scriptListContext: ScriptListContext): Script[] {
        let result: Script[] = [];
        for (let scriptContext of scriptListContext.script()) {
            const event = AppBuilder.buildEvent(scriptContext.event());
            const visitor = new RelationBuildingVisitor();
            const transRelation = scriptContext.stmtList().accept(visitor);
            result.push(new Script(event, transRelation));
        }
        return result;
    }

    private static buildEvent(eventContext: EventContext): AppEvent {
        if (eventContext instanceof InCoreEventContext) {
            eventContext = (eventContext as InCoreEventContext).coreEvent();
        }

        if (eventContext instanceof NeverEventContext) {
            return NeverEvent.instance();
        } else if (eventContext instanceof StartupEventContext) {
            return StartupEvent.instance();
        }

        throw new ImplementMeException();
    }

    private static buildMethodDefs(methodDefinitionListContext: MethodDefinitionListContext): MethodDefinitionMap {
        let result: MethodDefinitionMap = {};
        for (let methodDef of methodDefinitionListContext.methodDefinition()) {
            const methodName = methodDef.Ident().toString();
            const paramDecls = AppBuilder.buildParameterDeclarations(methodDef.parameterList());
            const resultDecl = AppBuilder.buildMethodResultDef(methodDef.methodResultDeclaration());
            result[methodName] = new MethodDefinition(methodDef, methodName, paramDecls, resultDecl);
        }
        return result;
    }

    private static buildMethodResultDef(methodResultDeclarationContext: MethodResultDeclarationContext): DataLocation {
        if (methodResultDeclarationContext.Ident()) {
            const id: string = methodResultDeclarationContext.Ident().text;
            const t: ScratchType = this.buildType(methodResultDeclarationContext.type());
            return new DataLocation(methodResultDeclarationContext, id, t);
        } else {
            return DataLocation.void();
        }
    }

    private static buildParameterDeclarations(parameterListContext: ParameterListContext): DataLocationMap {
        let result: DataLocationMap = {};
        const params: ParameterContext[] = parameterListContext.parameterListPlain().parameter();
        for (let p of params) {
            const id: string = p.Ident().text;
            const t: ScratchType = this.buildType(p.type());
            result[id] = new DataLocation(p, id, t);
        }
        return result;
    }

    private static buildInitScript(resourceListContext: ResourceListContext, declarationStmtListContext: DeclarationStmtListContext, stmtList: SetStmtListContext): Script {
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

    private static buildType(typeContext: TypeContext) {
        if (typeContext instanceof BooleanTypeContext) {
            return new BooleanType();
        } else if (typeContext instanceof NumerTypeContext) {
            return new NumberType();
        } else if (typeContext instanceof StringTypeContext) {
            return new StringType();
        } else if (typeContext instanceof ListTypeContext) {
            return new ListType();
        } else if (typeContext instanceof MapTypeContext) {
            return new MapType();
        } else if (typeContext instanceof EnumTypeContext) {
            return new StringEnumType();
        } else {
            throw new IllegalArgumentException("Type not supported: " + typeContext.constructor.name);
        }
    }

}
