import {FromParseTree} from "../FromParseTree";
import {RuleNode} from "antlr4ts/tree";
import {AppResource, AppResourceMap} from "./AppResource";
import {Script} from "./controlflow/Script";
import {Statement} from "../ast/statements/Statement";
import {MethodDefinition, MethodDefinitionMap} from "./MethodDefinition";
import {Maps} from "../../utils/Maps";
import {Lists} from "../../utils/Lists";
import {ImmutableList} from "../../utils/ImmutableList";
import {ImmutableMap} from "../../utils/ImmutableMap";
import ProgramOperation from "./controlflow/ops/ProgramOperation";
import {Scripts} from "./controlflow/Scripts";
import DataLocation, {DataLocationMap} from "./controlflow/DataLocation";

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
    private readonly _resources: ImmutableMap<string, AppResource>;

    /** Set of the actor's data locations (variables) */
    private readonly _datalocs: ImmutableMap<string, DataLocation>;

    /** List of initialization statements. Includes declarations and initializations. */
    private readonly _initScript: Script;

    /** Set of the actor's methods */
    private readonly _methodDefinitions: ImmutableMap<string, MethodDefinition>;

    /** List of scripts that define the behavior of the actor. */
    private readonly _scripts: ImmutableList<Script>;

    constructor(node: RuleNode, ident: string, inheritFrom: Actor|null,
                resources: AppResourceMap, datalocs: DataLocationMap,
                initScript: Script, methods: MethodDefinitionMap, scripts: Script[]) {
        super(node);
        this._ident = ident;
        this._inheritsFrom = inheritFrom;
        this._initScript = initScript;
        this._resources = Maps.immutableCopyOf(resources);
        this._datalocs = Maps.immutableCopyOf(datalocs);
        this._methodDefinitions = Maps.immutableCopyOf(methods);
        this._scripts = Lists.immutableCopyOf(scripts);

        if (inheritFrom) {
            // TODO: Handle re-definitions of resources or methods with the same identifier
            //      Rename the basic versions so that they can be referenced by the
            //      inheriting actors?
            this._resources = Maps.mergeMaps(this.resourceMap, inheritFrom.resourceMap);
            this._initScript = Scripts.concat(inheritFrom._initScript, this._initScript);
            this._methodDefinitions = Maps.mergeMaps(this.methodMap, inheritFrom.methodMap);
            this._datalocs = Maps.mergeMaps(this.datalocMap, inheritFrom.datalocMap);
            this._scripts = this._scripts.concat(inheritFrom.scripts);
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

    get initScript(): Script {
        return this._initScript;
    }

    get methods(): MethodDefinition[] {
        return Maps.values(this._methodDefinitions);
    }

    get methodMap(): { [id: string]: MethodDefinition } {
        return this._methodDefinitions;
    }

    get scripts(): ImmutableList<Script> {
        return this._scripts;
    }

}


