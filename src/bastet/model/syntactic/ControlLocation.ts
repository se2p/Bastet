import { Record } from 'immutable';

export interface ControlLocationAttributes {
    readonly locid: number;
}

export const bottomControlLocationAttributes: ControlLocationAttributes = {
    locid: -1
}

export class ControlLocation extends Record(bottomControlLocationAttributes) implements ControlLocationAttributes {

    get locid() {
        return this.get('locid');
    }

}

export const bottomControlLocation = new ControlLocation();
