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
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {ExpressionList} from "./expressions/ExpressionList";

export abstract class ScratchType extends AbstractNode {

    protected constructor(childs) {
        super([]);
    }

    public static registerType(typeIdent: string, type: ScratchType) {

    }

}

export class VoidType extends ScratchType {

    private static INSTANCE: VoidType;

    constructor() {
        super([]);
    }

    static instance(): VoidType {
        if (this.INSTANCE == null) {
            this.INSTANCE = new VoidType();
        }
        return this.INSTANCE;
    }

}

export class NumberType extends ScratchType {

    private static INSTANCE: NumberType;

    constructor() {
        super([]);
    }

    static instance(): VoidType {
        if (this.INSTANCE == null) {
            this.INSTANCE = new NumberType();
        }
        return this.INSTANCE;
    }

}

export class BooleanType extends ScratchType {

    private static INSTANCE: BooleanType;

    constructor() {
        super([]);
    }

    static instance(): VoidType {
        if (this.INSTANCE == null) {
            this.INSTANCE = new BooleanType();
        }
        return this.INSTANCE;
    }

}

export class StringType extends ScratchType {

    private static INSTANCE: StringType;

    constructor() {
        super([]);
    }

    static instance(): VoidType {
        if (this.INSTANCE == null) {
            this.INSTANCE = new StringType();
        }
        return this.INSTANCE;
    }

}

export class StringEnumType extends ScratchType {

    private readonly _values: ExpressionList;

    constructor(values: ExpressionList) {
        super([values]);
        this._values = values;
    }

    get values(): ExpressionList {
        return this._values;
    }

    public static withValues(values: ExpressionList): StringEnumType {
        return new StringEnumType(values);
    }

}

export class ListType extends ScratchType {

    private static TYPE_INSTANCES: {[id:string]: ListType};

    private readonly _elementType: ScratchType;

    constructor(elementType: ScratchType) {
        super([elementType]);
        this._elementType = elementType;
    }

    public static withElementType(elementType: ScratchType): ScratchType {
        if (this.TYPE_INSTANCES == null) {
            this.TYPE_INSTANCES = {};
        }

        const elementTypeName: string = elementType.constructor.name;
        let result: ScratchType = this.TYPE_INSTANCES[elementTypeName];
        if (!result) {
            result = new ListType(elementType);
            this.TYPE_INSTANCES[elementTypeName]
        }

        return result;
    }

}

export class MapType extends ScratchType {

    static withIndexType(indexType: ScratchType): ScratchType {
        throw new ImplementMeException();
    }

}

