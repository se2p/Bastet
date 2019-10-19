import Program from "./Program";

export abstract class AnalysisTask {

    private readonly _program: Program;

    constructor(program: Program) {
        this._program = program;
    }

    get program() {
        return this._program;
    }

}

export class VerificationTask extends AnalysisTask {

    private readonly _spec: Program;

    constructor(program: Program, specification: Program) {
        super(program);
        this._spec = specification;
    }

    get specification() {
        return this._spec;
    }

}
