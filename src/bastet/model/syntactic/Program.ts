import ScriptGroup from './ScriptGroup'

export default class Program {
    private readonly _basename: string

    private readonly _filepath: string

    private readonly _groups: ScriptGroup[]

    constructor(basename: string, filepath: string, scriptGroups: ScriptGroup[]) {
        this._basename = basename
        this._filepath = filepath
        this._groups = scriptGroups
    }

    get basename() {
        return this._basename
    }

    get filepath() {
        return this._filepath
    }

    get scriptGroups() {
        return this._groups
    }
}
