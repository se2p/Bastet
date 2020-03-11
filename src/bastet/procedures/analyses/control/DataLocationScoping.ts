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
import {extractStringLiteral, StringAttributeOfExpression} from "../../../syntax/ast/core/expressions/StringExpression";
import {AstNode} from "../../../syntax/ast/AstNode";
import {App} from "../../../syntax/app/App";
import {Identifier} from "../../../syntax/ast/core/Identifier";
import {StringType} from "../../../syntax/ast/core/ScratchType";
import {CastExpression} from "../../../syntax/ast/core/expressions/CastExpression";
import {VariableWithDataLocation} from "../../../syntax/ast/core/Variable";
import {ActorExpression} from "../../../syntax/ast/core/expressions/ActorExpression";
import {ActorId} from "../../../syntax/app/Actor";
import {IllegalArgumentException} from "../../../core/exceptions/IllegalArgumentException";
import {IllegalStateException} from "../../../core/exceptions/IllegalStateException";
import {TypeInformationStorage} from "../../../syntax/DeclarationScopes";

export const SCOPE_SEPARATOR = "@";

export class DataLocationScoper implements DataLocationRenamer {

    private readonly _readFromScope: ImmList<string>;

    private readonly _writeToScope: ImmList<string>;

    private readonly _typeStorage: TypeInformationStorage;

    constructor(typeInformationStorage: TypeInformationStorage, readFromScope: ImmList<string>, writeToScope: ImmList<string>) {
        this._typeStorage = Preconditions.checkNotUndefined(typeInformationStorage);
        this._readFromScope = Preconditions.checkNotUndefined(readFromScope);
        this._writeToScope = Preconditions.checkNotUndefined(writeToScope);

        Preconditions.checkArgument(readFromScope.size > 0, "At least the actor must be in the scope");
        Preconditions.checkArgument(writeToScope.size > 0, "At least the actor must be in the scope");
    }

    private static isScoped(dataLoc: DataLocation): boolean {
        return dataLoc.ident.indexOf("@") > -1;
    }

    public renameUsage(dataLoc: DataLocation, usageMode: DataLocationMode, inContextOf: Statement): DataLocation {
        // Supported scopes: SYSTEM -> ACTOR -> METHOD
        if (usageMode == DataLocationMode.READ_FROM) {
            return this.renameRead0(dataLoc, inContextOf);

        } else if (usageMode == DataLocationMode.ASSINGED_TO) {
            return this.renameWrite(dataLoc, inContextOf);
        }

        throw new IllegalStateException("Unsupported DataLocationMode");
    }

    private renameRead0(dataLoc: DataLocation, inContextOf: Statement): DataLocation {
        return this.renameRead(dataLoc, inContextOf, this._readFromScope);
    }

    public renameRead(dataLoc: DataLocation, inContextOf: Statement, readScope: ImmList<string>): DataLocation {
        if (DataLocationScoper.isScoped(dataLoc)) {
            return dataLoc;
        }

        const readFromScope = this._typeStorage
            .reduceToDeclarationScope(readScope, dataLoc)
            .join(SCOPE_SEPARATOR);

        const newIdent: string = dataLoc.ident + SCOPE_SEPARATOR + readFromScope;
        return new TypedDataLocation(newIdent, dataLoc.type);
    }

    private renameWrite(dataLoc: DataLocation, inContextOf: Statement): DataLocation {
        if (DataLocationScoper.isScoped(dataLoc)) {
            return dataLoc;
        }

        const writeToScope = this._typeStorage.reduceToDeclarationScope(this._writeToScope, dataLoc)
            .join(SCOPE_SEPARATOR);

        const newIdent: string = dataLoc.ident + SCOPE_SEPARATOR + writeToScope;
        return new TypedDataLocation(newIdent, dataLoc.type);
    }

}

export class ScopeTransformerVisitor extends RenamingTransformerVisitor {

    private readonly _task: App;
    private readonly _scoper: DataLocationScoper;
    private readonly _actorScopes: ImmMap<DataLocation, ActorId>;

    constructor(task: App, actorScopes: ImmMap<DataLocation, ActorId>, readFromScope: ImmList<string>,
                writeToScope: ImmList<string>) {
        const scoper = new DataLocationScoper(task.typeStorage, readFromScope, writeToScope);
        super(scoper);
        this._scoper = scoper;
        this._actorScopes = Preconditions.checkNotUndefined(actorScopes);
        this._task = Preconditions.checkNotUndefined(task);
    }

    visitStringAttributeOfExpression(node: StringAttributeOfExpression): AstNode {
        const actorExpr: ActorExpression = node.ofEntity;

        // TODO: The ControlAnalysis must evaluate the `ActorExpression`

        if (node.ofEntity instanceof VariableWithDataLocation) {
            const actorVar = node.ofEntity.accept(this) as VariableWithDataLocation;
            const actorScopeName: ActorId = this._actorScopes.get(actorVar.dataloc);
            if (!actorScopeName) {
                throw new IllegalStateException(`Cannot lookup the actor-scope identifier that is assigned to ${actorVar.toTreeString()}`);
            }
            const attributeName: string = extractStringLiteral(node.attribute);
            const attributeType = this._task.typeStorage.getSystemScope()
                .findChild(actorScopeName)
                .getTypeOf(Identifier.of(attributeName));

            const readAttributeScope: ImmList<string> = ImmList([actorScopeName]);
            let readAttribute: DataLocation = new TypedDataLocation(attributeName, attributeType.typeId);
            readAttribute = this._scoper.renameRead(readAttribute, this._activeStatement, readAttributeScope);
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
