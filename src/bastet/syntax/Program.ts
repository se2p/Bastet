import {Actor} from './Actor'

export default class Program {

    private readonly _basename: string;

    private readonly _filepath: string;

    private readonly _ident: string;

    private readonly _actors: Actor[];

    constructor(basename: string, filepath: string, ident: string, actors: Actor[]) {
        this._basename = basename;
        this._filepath = filepath;
        this._ident = ident;
        this._actors = actors;
    }

    get basename() {
        return this._basename;
    }

    get filepath() {
        return this._filepath;
    }

    get ident() {
        return this._ident;
    }

    get actors() {
        return this.actors;
    }

}
