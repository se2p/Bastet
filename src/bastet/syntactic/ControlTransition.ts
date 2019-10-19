import { Record } from 'immutable';

import {ControlLocation, bottomControlLocation} from "./ControlLocation";
import {ProgramOperation, noopProgramOperation} from "./ops/ProgramOperation";

export interface ControlTransitionAttributes {
    readonly from: ControlLocation;
    readonly to: ControlLocation;
    readonly op: ProgramOperation;
}

const nullControlTransitionAttributes: ControlTransitionAttributes = {
    from: bottomControlLocation,
    to: bottomControlLocation,
    op: noopProgramOperation
}

export default class ControlTransition extends Record(nullControlTransitionAttributes) implements ControlTransitionAttributes {

    get from() {
        return this.get('from');
    }

    get to() {
        return this.get('to');
    }

    get op() {
        return this.get('op');
    }

}
