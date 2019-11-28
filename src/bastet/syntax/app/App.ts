import {Actor} from './Actor'
import {Maps} from "../../utils/Maps";

export class App {

    private readonly _basename: string;

    private readonly _ident: string;

    /** Set of actors */
    private readonly _actors: { [id: string] : Actor; };

    constructor(basename: string, ident: string, actors: Actor[]) {
        this._basename = basename;
        this._ident = ident;
        this._actors = Maps.createMap(actors);
    }

    get basename() {
        return this._basename;
    }

    get ident() {
        return this._ident;
    }

    get actors() {
        return this.actors;
    }

}
