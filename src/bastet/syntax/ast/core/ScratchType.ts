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

// type :
//     'number'
//     | 'boolean'
//     | 'string'
//     | 'enum' '[' expressionListPlain ']'
// | 'list' type
// | 'map' indexType ;


import {AbstractNode} from "../AstNode";

export abstract class ScratchType extends AbstractNode {

    protected constructor() {
        super([]);
    }

    public static registerType(typeIdent: string, type: ScratchType) {

    }

}

export class VoidType extends ScratchType {

    private static readonly INSTANCE = new VoidType();

    static instance(): VoidType {
        return this.INSTANCE;
    }

}

export class NumberType extends ScratchType {

    private static readonly INSTANCE = new NumberType();

    static instance() : StringType {
        return this.INSTANCE;
    }

}

export class BooleanType extends ScratchType {

    private static readonly INSTANCE = new BooleanType();

    static instance() : StringType {
        return this.INSTANCE;
    }

}

export class StringType extends ScratchType {

    private static readonly INSTANCE = new StringType();

    static instance() : StringType {
        return this.INSTANCE;
    }

}

export class StringEnumType extends ScratchType {


}

export class ListType extends ScratchType {


}

export class MapType extends ScratchType {


}

