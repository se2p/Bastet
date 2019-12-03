import {WithIdent} from "../../../utils/WithIdent";

export type LocationID = number;

export class ControlLocation implements WithIdent {

    private readonly _id: LocationID

    private constructor(id: LocationID) {
        this._id = id
    }

    get ident() {
        return this._id
    }

    private static locations: Map<LocationID, ControlLocation> = new Map();
    private static compounds: Map<LocationID, Map<LocationID, ControlLocation>> = new Map();
    private static locationSequence: number = 0;

    private static newLocationID(): LocationID {
        this.locationSequence++;
        return this.locationSequence;
    }

    public static compound(majorLoc: ControlLocation, minorLoc: ControlLocation): ControlLocation {
        let compoundOnMajor: Map<LocationID, ControlLocation> = this.compounds.get(majorLoc.ident);
        if (!compoundOnMajor) {
            compoundOnMajor = new Map();
            this.compounds.set(majorLoc.ident, compoundOnMajor);
        }

        let result: ControlLocation = compoundOnMajor.get(minorLoc.ident);
        if (!result) {
            // Create a new compound location
            let compLocId: LocationID = this.newLocationID();
            result = new ControlLocation(compLocId);

            // Store the pairing that resulted in the compound location
            compoundOnMajor.set(minorLoc.ident, result);

            // Also add the mapping of location id to location object
            this.locations.set(compLocId, result);
        }

        return result;
    }

    public static for(id: LocationID): ControlLocation {
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

}
