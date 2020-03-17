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

import {WithIdent} from "../../../utils/WithIdent";

export type LocationId = number;

export class ControlLocation implements WithIdent {

    private readonly _id: LocationId

    private constructor(id: LocationId) {
        this._id = id
    }

    get ident() {
        return this._id
    }

    private static locations: Map<LocationId, ControlLocation> = new Map();
    private static compounds: Map<LocationId, Map<LocationId, ControlLocation>> = new Map();
    private static locationSequence: number = 0;

    private static newLocationID(): LocationId {
        if (isNaN(ControlLocation.locationSequence)) {
            ControlLocation.locationSequence = 0;
        }
        ControlLocation.locationSequence++;
        return ControlLocation.locationSequence;
    }

    public static compound(majorLoc: ControlLocation, minorLoc: ControlLocation): ControlLocation {
        let compoundOnMajor: Map<LocationId, ControlLocation> = this.compounds.get(majorLoc.ident);
        if (!compoundOnMajor) {
            compoundOnMajor = new Map();
            this.compounds.set(majorLoc.ident, compoundOnMajor);
        }

        let result: ControlLocation = compoundOnMajor.get(minorLoc.ident);
        if (!result) {
            // Create a new compound location
            let compLocId: LocationId = this.newLocationID();
            result = new ControlLocation(compLocId);

            // Store the pairing that resulted in the compound location
            compoundOnMajor.set(minorLoc.ident, result);

            // Also add the mapping of location id to location object
            this.locations.set(compLocId, result);
        }

        return result;
    }

    public static for(id: LocationId): ControlLocation {
        let result: ControlLocation = this.locations.get(id);
        if (!result) {
            result = new ControlLocation(id);
            this.locations.set(id, result);
        }
        return result;
    }

    public static fresh(): ControlLocation {
        return this.for(this.newLocationID());
    }

    /**
     * Used in tests if location ids do not get generated based on ControlLocation.fresh()
     *
     * @param offset
     */
    public static setFreshLocationIdOffset(offset: LocationId): void {
        ControlLocation.locationSequence = Math.max(offset, ControlLocation.locationSequence);
    }

}
