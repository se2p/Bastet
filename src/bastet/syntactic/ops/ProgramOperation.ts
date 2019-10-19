import { Record } from 'immutable';

export interface ProgramOperation {
    readonly rawstr: string;
}

export const noopProgramOperationAttributes: ProgramOperation = {
    rawstr: "noop"
}

export class NoopProgramOperation extends Record(noopProgramOperationAttributes) implements ProgramOperation {

    get rawstr() {
        return this.get('rawstr');
    }

}

export const noopProgramOperation: ProgramOperation = new NoopProgramOperation();