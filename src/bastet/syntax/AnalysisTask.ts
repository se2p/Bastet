import {App} from './app/App'

export abstract class AnalysisTask {
    private readonly _program: App

    constructor(program: App) {
        this._program = program
    }

    get program() {
        return this._program
    }
}

export class VerificationTask extends AnalysisTask {
    private readonly _spec: App

    constructor(program: App, specification: App) {
        super(program)
        this._spec = specification
    }

    get specification() {
        return this._spec
    }
}
