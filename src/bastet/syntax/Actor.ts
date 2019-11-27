import {FromParseTree} from "./FromParseTree";
import {RuleNode} from "antlr4ts/tree";
import {AppResource} from "./AppResource";
import {Script} from "./Script";
import {Statement} from "./statements/Statement";
import {MethodDefinition} from "./MethodDefinition";

export class Actor extends FromParseTree {

    private readonly _inheritsFrom: Actor|null;
    private readonly _ident: string;
    private readonly _resources: AppResource[];
    private readonly _initStatements: Statement[];
    private readonly _methodDefinitions: MethodDefinition[];
    private readonly _scripts: Script[];

    constructor(node: RuleNode, ident: string, inheritFrom: Actor|null,
                resources: AppResource[], initStatements: Statement[],
                methods: MethodDefinition[], scripts: Script[]) {
        super(node);
        this._ident = ident;
        this._inheritsFrom = inheritFrom;
        this._resources = resources;
        this._initStatements = initStatements;
        this._methodDefinitions = methods;
        this._scripts = scripts;

        if (inheritFrom) {
            // TODO: Handle re-definitions of resources or methods with the same identifier
            //      Rename the basic versions so that they can be referenced by the
            //      inheriting actors?
            this._resources = this._resources.concat(inheritFrom.resources)
            this._initStatements = this._initStatements.concat(inheritFrom.initStatements)
            this._methodDefinitions = this._methodDefinitions.concat(inheritFrom.methods)
            this._scripts = this._scripts.concat(inheritFrom.script)
        }
    }

    get ident(): string {
        return this._ident;
    }

    get inheritsFrom(): Actor|null {
        return this._inheritsFrom;
    }

    get resources(): AppResource[] {
        return this._resources
    }

    get initStatements(): Statement[] {
        return this._initStatements;
    }

    get methods(): MethodDefinition[] {
        return this._methodDefinitions;
    }

    get script(): Script[] {
        return this._scripts;
    }

}


