import {FromParseTree} from "../FromParseTree";
import {RuleNode} from "antlr4ts/tree";
import {AppResource} from "./AppResource";
import {Script} from "./controlflow/Script";
import {Statement} from "../ast/statements/Statement";
import {MethodDefinition} from "./MethodDefinition";
import {Maps} from "../../utils/Maps";

export type ActorMap = { [id:string]: Actor } ;

/**
 * Represents an actor.
 */
export class Actor extends FromParseTree {

    /** An actor can inherit methods or members from another actor. */
    private readonly _inheritsFrom: Actor|null;

    /** Unique identifier of the actor */
    private readonly _ident: string;

    /** Set of the actor's resources */
    private readonly _resources: { [id: string] : AppResource; };

    /** List of initialization statements. Includes declarations and initializations. */
    private readonly _initStatements: Statement[];

    /** Set of the actor's methods */
    private readonly _methodDefinitions: { [id: string] : MethodDefinition; };

    /** List of scripts that define the behavior of the actor. */
    private readonly _scripts: Script[];

    constructor(node: RuleNode, ident: string, inheritFrom: Actor|null,
                resources: AppResource[], initStatements: Statement[],
                methods: MethodDefinition[], scripts: Script[]) {
        super(node);
        this._ident = ident;
        this._inheritsFrom = inheritFrom;
        this._resources = Maps.createMap(resources);
        this._initStatements = initStatements;
        this._methodDefinitions = Maps.createMap(methods);
        this._scripts = scripts;

        if (inheritFrom) {
            // TODO: Handle re-definitions of resources or methods with the same identifier
            //      Rename the basic versions so that they can be referenced by the
            //      inheriting actors?
            this._resources = Maps.mergeMaps(this.resourceMap, inheritFrom.resourceMap);
            this._initStatements = this._initStatements.concat(inheritFrom.initStatements);
            this._methodDefinitions = Maps.mergeMaps(this.methodMap, inheritFrom.methodMap);
            this._scripts = this._scripts.concat(inheritFrom.script);
        }
    }

    get ident(): string {
        return this._ident;
    }

    get inheritsFrom(): Actor|null {
        return this._inheritsFrom;
    }

    get resources(): AppResource[] {
        return Maps.values(this._resources);
    }

    get resourceMap(): { [id: string]: AppResource } {
        return this._resources;
    }

    get initStatements(): Statement[] {
        return this._initStatements;
    }

    get methods(): MethodDefinition[] {
        return Maps.values(this._methodDefinitions);
    }

    get methodMap(): { [id: string]: MethodDefinition } {
        return this._methodDefinitions;
    }

    get script(): Script[] {
        return this._scripts;
    }

}


