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
import {List as ImmList, Map as ImmMap} from "immutable";
import {DataLocation, TypedDataLocation} from "../../../syntax/app/controlflow/DataLocation";
import {Statement} from "../../../syntax/ast/core/statements/Statement";
import {Preconditions} from "../../../utils/Preconditions";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {extractStringLiteral, StringAttributeOfExpression} from "../../../syntax/ast/core/expressions/StringExpression";
import {AstNode} from "../../../syntax/ast/AstNode";
import {App} from "../../../syntax/app/App";
import {Identifier} from "../../../syntax/ast/core/Identifier";
import {StringType} from "../../../syntax/ast/core/ScratchType";
import {CastExpression} from "../../../syntax/ast/core/expressions/CastExpression";
import {VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {ActorExpression, ActorVariableExpression} from "../../../syntax/ast/core/expressions/ActorExpression";
import {ActorId} from "../../../syntax/app/Actor";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";

export const SCOPE_SEPARATOR = "@";

export class DataLocationScoper implements DataLocationRenamer {

    private readonly _readFromScope: string;

    private readonly _writeToScope: string;

    constructor(readFromScope: ImmList<string>, writeToScope: ImmList<string>) {
        this._readFromScope = readFromScope.join(SCOPE_SEPARATOR);
        this._writeToScope = writeToScope.join(SCOPE_SEPARATOR);
    }

    private static isScoped(dataLoc: DataLocation): boolean {
        return dataLoc.ident.indexOf("@") > -1;
    }

    renameUsage(dataLoc: DataLocation, usageMode: DataLocationMode, inContextOf: Statement): DataLocation {
        return DataLocationScoper.staticRenameUsage(dataLoc, usageMode, inContextOf, this._writeToScope, this._readFromScope);
    }

    public static staticRenameUsage(dataLoc: DataLocation, usageMode: DataLocationMode, inContextOf: Statement,
                              writeToScope: string, readFromScope: string): DataLocation {
        Preconditions.checkNotUndefined(usageMode);

        if (DataLocationScoper.isScoped(dataLoc)) {
            return dataLoc;
        }

        if (usageMode == DataLocationMode.ASSINGED_TO) {
            const newIdent: string = dataLoc.ident + SCOPE_SEPARATOR + writeToScope;
            return new TypedDataLocation(newIdent, dataLoc.type);

        } else if (usageMode == DataLocationMode.READ_FROM) {
            const newIdent: string = dataLoc.ident + SCOPE_SEPARATOR + readFromScope;
            return new TypedDataLocation(newIdent, dataLoc.type);
        }

        throw new ImplementMeException();
    }

}

export class ScopeTransformerVisitor extends RenamingTransformerVisitor {

    private readonly _task: App;
    private readonly _scoper: DataLocationScoper;
    private readonly _actorScopes: ImmMap<VariableWithDataLocation, ActorId>;

    constructor(task: App, actorScopes: ImmMap<VariableWithDataLocation, ActorId>, readFromScope: ImmList<string>,
                writeToScope: ImmList<string>) {
        const scoper = new DataLocationScoper(readFromScope, writeToScope);
        super(scoper);
        this._scoper = scoper;
        this._actorScopes = Preconditions.checkNotUndefined(actorScopes);
        this._task = Preconditions.checkNotUndefined(task);
    }

    visitStringAttributeOfExpression(node: StringAttributeOfExpression): AstNode {
        const actorExpr: ActorExpression = node.ofEntity;

        // TODO: The ControlAnalysis must evaluate the `ActorExpression`

        if (node.ofEntity instanceof VariableWithDataLocation) {
            const actorVar = node.ofEntity as VariableWithDataLocation;
            const actorScopeName = this._actorScopes.get(actorVar);
            if (!actorScopeName) {
                throw new IllegalStateException(`Cannot lookup actor scope for actor variable ${actorVar.toTreeString()}`);
            }
            const actorScope = Identifier.of(actorScopeName);

            const attributeName: string = extractStringLiteral(node.attribute);
            const attributeType = this._task.typeStorage
                .getActorInfos(actorScope).getTypeOf(Identifier.of(attributeName));

            let readAttribute: DataLocation = new TypedDataLocation(attributeName, attributeType.typeId);
            readAttribute = this._scoper.renameUsage(readAttribute, DataLocationMode.READ_FROM, this._activeStatement);
            const readVariable = new VariableWithDataLocation(readAttribute);

            if (readVariable.variableType == StringType.instance()) {
                return readVariable;
            } else {
                return new CastExpression(readVariable, StringType.instance());
            }
        } else {
            throw new IllegalArgumentException("Attributes can only be read from variables of type actor!");
        }
    }

}
