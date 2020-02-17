/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net)
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

import {ScratchType, ScratchTypeID, VoidType} from "../../ast/core/ScratchType";
import {Record as ImmRec} from "immutable";
import {Identifier} from "../../ast/core/Identifier";

export type DataLocationID = string;

export type DataLocationMap = { [id:string]: TypedDataLocation } ;

export interface DataLocation {

    type: ScratchTypeID;

    ident: string;

}

export interface TypedDataLocationAttributes {

    type: ScratchTypeID;

    ident: string;

}

export interface StaticDataLocationAttributes extends TypedDataLocationAttributes {

    version: number;

}

const TypedDataLocationRecord = ImmRec({

    type: 0,

    ident: ""

});

const StaticDataLocationRecord = ImmRec({

    type: 0,

    ident: "",

    version: 0

});

export class TypedDataLocation extends TypedDataLocationRecord implements TypedDataLocationAttributes {

    constructor(ident: string, type: ScratchTypeID) {
        super({ident: ident, type: type});
    }

    public getIdent(): string {
        return this.get("ident");
    }

    public getType(): ScratchTypeID {
        return this.get("type");
    }

    private static VOID_LOCATION;

    static void(): DataLocation {
        if (!TypedDataLocation.VOID_LOCATION) {
            TypedDataLocation.VOID_LOCATION = new TypedDataLocation("void", VoidType.instance().typeId);
        }
        return this.VOID_LOCATION;
    }

}

export class VersionedDataLocation extends StaticDataLocationRecord implements StaticDataLocationAttributes {

    constructor(ident: string, type: ScratchTypeID, version: number) {
        super({ident: ident, type: type, version: version});
    }

    public getIdent(): string {
        return this.get("ident");
    }

    public getType(): ScratchTypeID {
        return this.get("type");
    }

    public getVersion(): number {
        return this.get("version");
    }

}

/**
 * Might add actor-specific prefixes.
 */
export interface DataLocationMapper {

    mapDataLocation(loc: DataLocation): DataLocation;

}

export class DummyDataLocationMapper implements DataLocationMapper {

    mapDataLocation(loc: DataLocation): DataLocation {
        return loc;
    }

}

export class DataLocations {

    public static createTypedLocation(id: Identifier, type: ScratchType) {
        return new TypedDataLocation(id.text, type.typeId);
    }

}
