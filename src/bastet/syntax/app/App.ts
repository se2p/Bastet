import {Actor, ActorMap} from './Actor'
import {Maps} from "../../utils/Maps";

export class App {

    private readonly _origin: string;

    private readonly _ident: string;

    private readonly _actors: ActorMap;

    constructor(origin: string, ident: string, actors: ActorMap) {
        this._origin = origin;
        this._ident = ident;
        this._actors = actors;
    }

    get origin() {
        return this._origin;
    }

    get ident() {
        return this._ident;
    }

    get actorMap() {
        return this.actors;
    }

    get actors() {
        return Maps.values(this._actors);
    }

}
