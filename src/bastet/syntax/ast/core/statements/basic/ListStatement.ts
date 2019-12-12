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

import {Identifier} from "../../Identifier";
import {Statement} from "../Statement";
import {NumberExpression} from "../../expressions/NumberExpression";
import {StringExpression} from "../../expressions/StringExpression";

export interface ListStatement {

}

export class DeleteAllFromStatement extends Statement implements ListStatement {
    constructor(listVariable: Identifier) {
        super([listVariable]);
        this._listVariable = listVariable;
    }

    private readonly _listVariable: Identifier;

}

export class DeleteIthFromStatement extends Statement implements ListStatement {

    private readonly _listVariable: Identifier;
    private readonly _index: NumberExpression;

    constructor(listVariable: Identifier, index: NumberExpression) {
        super([listVariable, index]);
        this._listVariable = listVariable;
        this._index = index;
    }

}

export class AddElementToStatement extends Statement implements ListStatement {

    private readonly _listVariable: Identifier;
    private readonly _element: StringExpression;

    constructor(listVariable: Identifier, element: StringExpression) {
        super([listVariable, element]);
        this._listVariable = listVariable;
        this._element = element;
    }

}

export class InsertAtStatement extends Statement implements ListStatement {

    private readonly _listVariable: Identifier;
    private readonly _index: NumberExpression;
    private readonly _element: StringExpression;

    constructor(listVariable: Identifier, index: NumberExpression, element: StringExpression) {
        super([listVariable, index, element]);
        this._listVariable = listVariable;
        this._index = index;
        this._element = element;
    }

}

export class ReplaceElementAtStatement extends Statement implements ListStatement {

    private readonly _listVariable: Identifier;
    private readonly _index: NumberExpression;
    private readonly _element: StringExpression;

    constructor(listVariable: Identifier, index: NumberExpression, element: StringExpression) {
        super([listVariable, index, element]);
        this._listVariable = listVariable;
        this._index = index;
        this._element = element;
    }

}

