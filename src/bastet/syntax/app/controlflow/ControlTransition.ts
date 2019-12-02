import ControlLocation from './ControlLocation'
import ProgramOperation from './ops/ProgramOperation'

export default class ControlTransition {

    private readonly _fromLocation: ControlLocation;

    private readonly _toLocation: ControlLocation;

    private readonly _operation: ProgramOperation;

    constructor(from: ControlLocation, to: ControlLocation, op: ProgramOperation) {
        this._fromLocation = from;
        this._toLocation = to;
        this._operation = op;
    }

    get from() {
        return this._fromLocation
    }

    get to() {
        return this._toLocation
    }

    get op() {
        return this._operation
    }

}
