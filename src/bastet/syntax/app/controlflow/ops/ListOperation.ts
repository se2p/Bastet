import {IdentExpression} from "../expressions/IdentExpression";
import {NumberExpression} from "../expressions/NumberExpression";
import {StringExpression} from "../expressions/StringExpression";

export class ListOperation {

}

export class DeleteAllOfOp extends ListOperation {

    private readonly _variable: IdentExpression;

}

export class DeleteElementOfOp extends ListOperation {

    private readonly _index: NumberExpression;
    private readonly _variable: IdentExpression;

}

export class AddElementToOp extends ListOperation {

    private readonly _element: StringExpression;
    private readonly _variable: IdentExpression;

}

export class InsertElementAtOfOp extends ListOperation {

    private readonly _index: NumberExpression;
    private readonly _element: StringExpression;
    private readonly _variable: IdentExpression;

}

export class ReplaceElementOfByOp extends ListOperation {

    private readonly _index: NumberExpression;
    private readonly _element: StringExpression;
    private readonly _variable: IdentExpression;

}
