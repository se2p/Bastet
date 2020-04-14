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

import {Statement} from "./Statement";
import {NumberExpression} from "../expressions/NumberExpression";
import {StringExpression} from "../expressions/StringExpression";
import {VariableWithDataLocation} from "../Variable";

export interface ListStatement {

}

export class DeleteAllFromStatement extends Statement implements ListStatement {

    private readonly _listVariable: VariableWithDataLocation;

    constructor(listVariable: VariableWithDataLocation) {
        super([listVariable.identifier]);
        this._listVariable = listVariable;
    }

    get listVariable(): VariableWithDataLocation {
        return this._listVariable;
    }
}

export class DeleteIthFromStatement extends Statement implements ListStatement {

    private readonly _listVariable: VariableWithDataLocation;
    private readonly _index: NumberExpression;

    constructor(listVariable: VariableWithDataLocation, index: NumberExpression) {
        super([listVariable.identifier, index]);
        this._listVariable = listVariable;
        this._index = index;
    }

    get listVariable(): VariableWithDataLocation {
        return this._listVariable;
    }

    get index(): NumberExpression {
        return this._index;
    }
}

export class AddElementToStatement extends Statement implements ListStatement {

    private readonly _listVariable: VariableWithDataLocation;
    private readonly _element: StringExpression;

    constructor(listVariable: VariableWithDataLocation, element: StringExpression) {
        super([listVariable.identifier, element]);
        this._listVariable = listVariable;
        this._element = element;
    }

    get listVariable(): VariableWithDataLocation {
        return this._listVariable;
    }

    get element(): StringExpression {
        return this._element;
    }
}

export class InsertAtStatement extends Statement implements ListStatement {

    private readonly _listVariable: VariableWithDataLocation;
    private readonly _index: NumberExpression;
    private readonly _element: StringExpression;

    constructor(listVariable: VariableWithDataLocation, index: NumberExpression, element: StringExpression) {
        super([listVariable.identifier, index, element]);
        this._listVariable = listVariable;
        this._index = index;
        this._element = element;
    }

    get listVariable(): VariableWithDataLocation {
        return this._listVariable;
    }

    get index(): NumberExpression {
        return this._index;
    }

    get element(): StringExpression {
        return this._element;
    }
}

export class ReplaceElementAtStatement extends Statement implements ListStatement {

    private readonly _listVariable: VariableWithDataLocation;
    private readonly _index: NumberExpression;
    private readonly _element: StringExpression;

    constructor(listVariable: VariableWithDataLocation, index: NumberExpression, element: StringExpression) {
        super([listVariable.identifier, index, element]);
        this._listVariable = listVariable;
        this._index = index;
        this._element = element;
    }

    get listVariable(): VariableWithDataLocation {
        return this._listVariable;
    }

    get index(): NumberExpression {
        return this._index;
    }

    get element(): StringExpression {
        return this._element;
    }
}

