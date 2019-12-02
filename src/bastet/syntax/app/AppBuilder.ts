import {
    ActorDefinitionContext,
    BooleanTypeContext,
    DeclarationStmtListContext, DeclareVariableContext, EnumTypeContext, ListTypeContext, MapTypeContext,
    MethodDefinitionListContext,
    NumerTypeContext,
    ProgramContext,
    ResourceContext,
    ResourceListContext,
    ScriptListContext,
    SetStmtListContext,
    TypeContext
} from "../parser/grammar/ScratchParser";
import {Actor, ActorMap} from "./Actor";
import {App} from "./App";
import {AppResource, AppResourceMap, AppResourceType} from "./AppResource";
import {MethodDefinitionMap} from "./MethodDefinition";
import {Script} from "./controlflow/Script";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import DataLocation, {DataLocationMap} from "./controlflow/DataLocation";
import {BooleanType, ListType, MapType, NumberType, ScratchType, StringEnumType} from "../ast/ScratchType";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";

export class AppBuilder {

    public static buildControlFlowsFromSyntaxTree(programOrigin: string, programAST: ProgramContext, actorNamePrefix: string): App {
        // Phase 1: Build the actors WITHOUT taking the INHERITANCE of actors into account.
        let flatActors: ActorMap = AppBuilder.buildActorsFlat(programAST, actorNamePrefix);

        // Phase 2: Rebuild the actors AND TAKE INHERITANCE into account.
        let appActors: ActorMap = AppBuilder.rebuildWithActorInheritance(flatActors);

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
        }

        return result;
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
        throw new ImplementMeException();
    }

    private static buildMethodDefs(methodDefinitionListContext: MethodDefinitionListContext): MethodDefinitionMap {
        throw new ImplementMeException();
    }

    private static buildInitScript(resourceListContext: ResourceListContext, declarationStmtListContext: DeclarationStmtListContext, stmtList: SetStmtListContext): Script {
        throw new ImplementMeException();
    }

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
                let declStmt: DeclareVariableContext = stmt as DeclareVariableContext;
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
        } else if (typeContext instanceof ListTypeContext) {
            return new ListType();
        } else if (typeContext instanceof MapTypeContext) {
            return new MapType();
        } else if (typeContext instanceof EnumTypeContext) {
            return new StringEnumType();
        } else {
            throw new IllegalArgumentException("Type not supported");
        }
    }
}
