import {ScratchType, VoidType} from "../../ast/ScratchType";
import {RuleNode} from "antlr4ts/tree";

export type DataLocationID = string;

export type DataLocationMap = { [id:string]: DataLocation } ;

export default class DataLocation {

    constructor(stmt: RuleNode|null, id: string, type: ScratchType) {

    }

    private static readonly VOID_LOCATION = new DataLocation(null, "void", VoidType.instance());

    static void(): DataLocation {
        return this.VOID_LOCATION;
    }

}
