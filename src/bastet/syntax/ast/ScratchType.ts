/*
 *
 *    Copyright 2019 University of Passau
 *
 *    Project maintained by Andreas Stahlbauer (firstname @ lastname . net)
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

// type :
//     'number'
//     | 'boolean'
//     | 'string'
//     | 'enum' '[' expressionListPlain ']'
// | 'list' type
// | 'map' indexType ;


export abstract class ScratchType {

    public static registerType(typeIdent: string, type: ScratchType) {

    }

}

export class VoidType extends ScratchType {

    constructor() {
        super();
    }

    private static readonly VOID_TYPE = new VoidType();

    static instance() {
        return this.VOID_TYPE;
    }

}

export class NumberType extends ScratchType {

    constructor() {
        super();
    }

}

export class BooleanType extends ScratchType {

    constructor() {
        super();
    }

}

export class StringType extends ScratchType {

    constructor() {
        super();
    }

}

export class StringEnumType extends ScratchType {

    constructor() {
        super();
    }

}

export class ListType extends ScratchType {

    constructor() {
        super();
    }

}

export class MapType extends ScratchType {

    constructor() {
        super();
    }

}

