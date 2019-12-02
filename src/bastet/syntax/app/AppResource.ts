import {FromParseTree} from "../FromParseTree";
import {RuleNode} from "antlr4ts/tree";
import {WithIdent} from "../../utils/WithIdent";
import {Actor} from "./Actor";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";

export type AppResourceMap = { [id:string]: AppResource } ;

export enum AppResourceType {
    IMAGE = "image",
    SOUND = "sound"
}

export class AppResource extends FromParseTree implements WithIdent {

    private readonly _ident : string;
    private readonly _type : AppResourceType;
    private readonly _uri : string;

    constructor(node: RuleNode, ident: string, type: AppResourceType, uri: string) {
        super(node);
        this._ident = ident;
        this._type = type;
    }

    get ident(): string {
        return this._ident;
    }

    get type(): AppResourceType {
        return this._type;
    }

    get uri(): string {
        return this._uri;
    }

    public static typeFromString(text: string):AppResourceType {
        switch(text) {
            case "image":
                return AppResourceType.IMAGE;
            case "sound":
                return AppResourceType.SOUND;
            default:
                throw new IllegalArgumentException("Unsupported type of resource");
        }
    }
}
