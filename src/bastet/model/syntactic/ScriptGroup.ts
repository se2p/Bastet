import Script from "./Script";
import DataLocation from "./DataLocation";

export enum ScriptGroupType { GENERIC, SPRITE, STAGE }

/**
 * A set of script.
 */
export default class ScriptGroup {

    private readonly _groupType: ScriptGroupType;
    
    private readonly _groupIdentifier: string;

    private readonly _scripts: Script[];

    private readonly _groupDataLocations: DataLocation[];

    constructor (groupType: ScriptGroupType, groupIdentifier: string, groupScripts: Script[], groupDataLocations: DataLocation[]) { 
        this._groupType = groupType;
        this._groupIdentifier = groupIdentifier;
        this._scripts = groupScripts;
        this._groupDataLocations = groupDataLocations;
    }    

    get groupType() {
        return this._groupType;
    }

    get groupDataLocations() {
        return this._groupDataLocations;
    }

    get groupIdentifier() {
        return this._groupIdentifier;
    }

    get scripts() {
        return this._scripts;
    }

}