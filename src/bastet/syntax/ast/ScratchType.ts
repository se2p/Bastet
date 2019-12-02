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

