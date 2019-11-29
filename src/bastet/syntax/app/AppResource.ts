import {FromParseTree} from "../FromParseTree";
import {RuleNode} from "antlr4ts/tree";
import {WithIdent} from "../../utils/WithIdent";
import {Actor} from "./Actor";

export type AppResourceMap = { [id:string]: AppResource } ;

export class AppResource extends FromParseTree implements WithIdent {

    private readonly _ident : string;

    constructor(node: RuleNode, ident: string) {
        super(node);
        this._ident = ident;
    }

    get ident(): string {
        return this._ident;
    }

}
