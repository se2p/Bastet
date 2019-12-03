import {FromParseTree} from "../FromParseTree";
import {RuleNode} from "antlr4ts/tree";
import {WithIdent} from "../../utils/WithIdent";
import {AppResource} from "./AppResource";
import DataLocation, {DataLocationID, DataLocationMap} from "./controlflow/DataLocation";
import {DataLocationDeclaration} from "./controlflow/DataLocationDeclaration";

export type MethodDefinitionMap = { [id:string]: MethodDefinition } ;

export class MethodDefinition extends FromParseTree implements WithIdent {

    private readonly _ident : string;

    constructor(node: RuleNode, ident: string, paramDecls: DataLocationDeclaration, resultDecl: DataLocation) {
        super(node);
        this._ident = ident;
    }

    get ident(): string {
        return this._ident;
    }

}
