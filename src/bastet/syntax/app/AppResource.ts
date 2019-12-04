/*
 *
 *    Copyright 2019 University of Passau
 *
 *    Project maintained by Andreas Stahlbauer (firstname @ lastname . net)
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import {FromParseTree} from "../FromParseTree";
import {RuleNode} from "antlr4ts/tree";
import {WithIdent} from "../../utils/WithIdent";
import {IllegalArgumentException} from "../../core/exceptions/IllegalArgumentException";

export type AppResourceMap = { [id:string]: AppResource } ;

export enum AppResourceType {
    IMAGE = "image",
    SOUND = "sound"
}

export class AppResource extends FromParseTree implements WithIdent {

    private readonly _ident : string;
    private readonly _type : AppResourceType;
    private readonly _uri : string;

    constructor(node: RuleNode, ident: string, type: AppResourceType, uri: string) {
        super(node);
        this._ident = ident;
        this._type = type;
    }

    get ident(): string {
        return this._ident;
    }

    get type(): AppResourceType {
        return this._type;
    }

    get uri(): string {
        return this._uri;
    }

    public static typeFromString(text: string):AppResourceType {
        switch(text) {
            case "image":
                return AppResourceType.IMAGE;
            case "sound":
                return AppResourceType.SOUND;
            default:
                throw new IllegalArgumentException("Unsupported type of resource");
        }
    }
}
