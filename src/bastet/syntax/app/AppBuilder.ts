import {
    ActorDefinitionContext, DeclarationStmtListContext, MethodDefinitionListContext,
    ProgramContext, ResourceListContext, ScriptListContext, SetStmtListContext
} from "../parser/grammar/ScratchParser";
import {Actor, ActorMap} from "./Actor";
import {App} from "./App";
import {AppResourceMap} from "./AppResource";
import {MethodDefinitionMap} from "./MethodDefinition";
import {NotSupportedException} from "../../core/exceptions/NotSupportedException";
import {Script} from "./controlflow/Script";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {DataLocationMap} from "./controlflow/DataLocation";

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
        throw new NotSupportedException("Implement me");
    }

    private static buildMethodDefs(methodDefinitionListContext: MethodDefinitionListContext): MethodDefinitionMap {
        throw new NotSupportedException("Implement me");
    }

    private static buildInitScript(resourceListContext: ResourceListContext, declarationStmtListContext: DeclarationStmtListContext, stmtList: SetStmtListContext): Script {
        throw new NotSupportedException("Implement me");
    }

    private static buildResources(resourceListContext: ResourceListContext): AppResourceMap {
        throw new NotSupportedException("Implement me");
    }

    private static buildDatalocs(resourceListContext: ResourceListContext, declarationStmtListContext: DeclarationStmtListContext): DataLocationMap {
        throw new NotSupportedException("Implement me");
    }
}
