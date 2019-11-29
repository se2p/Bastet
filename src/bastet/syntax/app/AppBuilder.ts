import {RuleNode} from "antlr4ts/tree";
import {ActorMap} from "./Actor";
import {App} from "./App";
import {ProgramContext} from "../parser/grammar/ScratchParser";

export class AppBuilder {

    public static buildControlFlowsFromSyntaxTree(programOrigin: string, programAST: ProgramContext, actorNamePrefix: string): App {
        // Phase 1: Build the app WITHOUT taking the INHERITANCE of actors into account.
        let flatActors: ActorMap = AppBuilder.buildActorsFlat(programAST, actorNamePrefix);

        // Phase 2: Rebuild the apps AND TAKE INHERITANCE into account.
        let appActors: ActorMap = AppBuilder.rebuildWithActorInheritance(flatActors);

        return new App(programOrigin, programAST.Ident().text, appActors);
    }

    private static rebuildWithActorInheritance(flatActors: ActorMap): ActorMap {
        return flatActors;
    }

    private static buildActorsFlat(programAST: RuleNode, actorNamePrefix: string): ActorMap {
        return {};
    }

}
