import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { ExpressionListExpression } from '../../../../src/bastet/syntax/ast/core/expressions/ListExpression';
import { ExpressionList } from '../../../../src/bastet/syntax/ast/core/expressions/ExpressionList';
import { StringLiteral } from '../../../../src/bastet/syntax/ast/core/expressions/StringExpression';
import { ListType, StringType } from '../../../../src/bastet/syntax/ast/core/ScratchType';

describe('ExpressionListExpression', () => {
    test('retains its elements and canonical list type', () => {
        const elements = new ExpressionList([new StringLiteral('item')]);
        const expression = new ExpressionListExpression(StringType.instance(), elements);

        assert.strictEqual(expression.elements, elements);
        assert.strictEqual(expression.expressionType, ListType.withElementType(StringType.instance()));
    });
});
