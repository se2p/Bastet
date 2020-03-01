/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net),
 *   see the file CONTRIBUTORS.md for the list of contributors.
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

import {
    DataLocationMode,
    DataLocationRenamer,
    RenamingTransformerVisitor
} from "../../../syntax/transformers/RenamingTransformerVisitor";
import {List as ImmList} from "immutable";
import {DataLocation, TypedDataLocation} from "../../../syntax/app/controlflow/DataLocation";
import {Statement} from "../../../syntax/ast/core/statements/Statement";
import {Preconditions} from "../../../utils/Preconditions";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";

export const SCOPE_SEPARATOR = "@";

export class DataLocationScoper implements DataLocationRenamer {

    private readonly _readFromScope: string;

    private readonly _writeToScope: string;

    constructor(readFromScope: ImmList<string>, writeToScope: ImmList<string>) {
        this._readFromScope = readFromScope.join(SCOPE_SEPARATOR);
        this._writeToScope = writeToScope.join(SCOPE_SEPARATOR);
    }

    private isScoped(dataLoc: DataLocation): boolean {
        return dataLoc.ident.indexOf("@") > -1;
    }

    renameUsage(dataLoc: DataLocation, usageMode: DataLocationMode, inContextOf: Statement): DataLocation {
        Preconditions.checkNotUndefined(usageMode);

        if (this.isScoped(dataLoc)) {
            return dataLoc;
        }

        if (usageMode == DataLocationMode.ASSINGED_TO) {
            const newIdent: string = dataLoc.ident + SCOPE_SEPARATOR + this._writeToScope;
            return new TypedDataLocation(newIdent, dataLoc.type);

        } else if (usageMode == DataLocationMode.READ_FROM) {
            const newIdent: string = dataLoc.ident + SCOPE_SEPARATOR + this._readFromScope;
            return new TypedDataLocation(newIdent, dataLoc.type);
        }

        throw new ImplementMeException();
    }

}

export class ScopeTransformerVisitor extends RenamingTransformerVisitor {

    constructor(readFromScope: ImmList<string>, writeToScope: ImmList<string>) {
        super(new DataLocationScoper(readFromScope, writeToScope));
    }

}