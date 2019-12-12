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
import {Identifier} from "../Identifier";
import {ExpressionList} from "../expressions/ExpressionList";
import {OptionalAstNode} from "../../AstNode";

export class CallStatement extends Statement {

    private readonly _calledMethod: Identifier;
    private readonly _args: ExpressionList;
    private readonly _assignResultTo: OptionalAstNode<Identifier>;

    constructor(calledMethod: Identifier, args: ExpressionList, assignResultTo: Identifier) {
        super([calledMethod, args, assignResultTo]);
        this._calledMethod = calledMethod;
        this._args = args;
        this._assignResultTo = assignResultTo;
    }

}
