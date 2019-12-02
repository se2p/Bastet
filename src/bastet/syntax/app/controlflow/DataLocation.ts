import {ScratchType} from "../../ast/ScratchType";
import {DeclarationStmtContext} from "../../parser/grammar/ScratchParser";

export type DataLocationMap = { [id:string]: DataLocation } ;

export default class DataLocation {

    constructor(stmt: DeclarationStmtContext, id: string, type: ScratchType) {

    }
}
