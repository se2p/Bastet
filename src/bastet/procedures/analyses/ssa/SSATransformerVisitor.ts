/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of Passau (uni-passau.de)
 *
 *   See the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Please make sure to CITE this work in your publications if you
 *   build on this work. Some of our maintainers or contributors might
 *   be interested in actively CONTRIBUTING to your research project.
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

import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {Preconditions} from "../../../utils/Preconditions";
import {SSAState} from "./SSAAbstractDomain";
import {DataLocation, VersionedDataLocation} from "../../../syntax/app/controlflow/DataLocation";
import {VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {
    DataLocationMode,
    DataLocationRenamer,
    RenamingTransformerVisitor
} from "../../../syntax/transformers/RenamingTransformerVisitor";
import {Statement} from "../../../syntax/ast/core/statements/Statement";

export class SSAssigner {

    private _ssa: SSAState;

    constructor(ssa: SSAState) {
        this._ssa = Preconditions.checkNotUndefined(ssa);
    }

    getCurrentVersionOf(id: string) {
        return this._ssa.getIndex(id);
    }

   currentVersionOf(assignedDataLoc: DataLocation): VersionedDataLocation {
       const id = assignedDataLoc.ident;
       const currentVersion = this.getCurrentVersionOf(id);
       return new VersionedDataLocation(assignedDataLoc.ident, assignedDataLoc.type, currentVersion);
   }

    newVersionOf(assignedDataLoc: DataLocation): VersionedDataLocation {
        const id = assignedDataLoc.ident;
        const currentVersion = this.getCurrentVersionOf(id);

        // Update the internal ssa map
        const newVersion = currentVersion + 1;
        this._ssa = this._ssa.withIndex(id, newVersion);

        // New versioned data allocation
        return new VersionedDataLocation(assignedDataLoc.ident, assignedDataLoc.type, newVersion);
    }

    newVariableFrom(assignedDataLoc: DataLocation): VariableWithDataLocation {
        return new VariableWithDataLocation(this.newVersionOf(assignedDataLoc));
    }

    get ssa(): SSAState {
        return this._ssa;
    }
}

export class SSARenamer implements DataLocationRenamer {

    private readonly _ssa: SSAssigner;

    constructor(ssa: SSAssigner) {
        this._ssa = ssa;
    }

    renameUsage(dataLoc: DataLocation, usageMode: DataLocationMode, inContextOf: Statement): DataLocation {
        if (usageMode == DataLocationMode.READ_FROM) {
            return this._ssa.currentVersionOf(dataLoc);

        } else if (usageMode == DataLocationMode.ASSINGED_TO) {
            return this._ssa.newVersionOf(dataLoc);
        }

        throw new ImplementMeException();
    }

}

export class SSATransformerVisitor extends RenamingTransformerVisitor {

    constructor(ssa: SSAssigner) {
        super(new SSARenamer(ssa));
    }

}


