import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { Identifier } from '../../../../src/bastet/syntax/ast/core/Identifier';
import { DataLocations } from '../../../../src/bastet/syntax/app/controlflow/DataLocation';
import { VariableWithDataLocation } from '../../../../src/bastet/syntax/ast/core/Variable';
import {
    DeclarationScopeType,
    ScopeTypeInformation,
    TypeInformationStorage,
} from '../../../../src/bastet/syntax/DeclarationScopes';
import { BooleanType, IntegerType, ListType, StringType } from '../../../../src/bastet/syntax/ast/core/ScratchType';
import { IllegalArgumentException } from '../../../../src/bastet/core/exceptions/IllegalArgumentException';

describe('ScopeTypeInformation', function () {
    test('finds a variable in the current scope', function () {
        const actor = new ScopeTypeInformation(null, 'actor1', DeclarationScopeType.ACTOR);

        actor.putVariable(
            new VariableWithDataLocation(
                DataLocations.createTypedLocation(Identifier.of('test'), IntegerType.instance())
            )
        );

        assert.strictEqual(actor.getTypeOf(Identifier.of('test')), IntegerType.instance());
    });

    test('inherits variables from parent scopes', function () {
        const actor = new ScopeTypeInformation(null, 'actor1', DeclarationScopeType.ACTOR);
        actor.putTypeInformation(Identifier.of('value'), IntegerType.instance());

        const method = actor.beginMethodScope('method1');

        assert.strictEqual(method.getTypeOf(Identifier.of('value')), IntegerType.instance());
        assert.strictEqual(method.endScope(), actor);
    });

    test('a child declaration shadows its parent', function () {
        const actor = new ScopeTypeInformation(null, 'actor1', DeclarationScopeType.ACTOR);
        actor.putTypeInformation(Identifier.of('value'), IntegerType.instance());
        const method = actor.beginMethodScope('method1');
        method.putTypeInformation(Identifier.of('value'), BooleanType.instance());

        assert.strictEqual(method.getTypeOf(Identifier.of('value')), BooleanType.instance());
        assert.strictEqual(actor.getTypeOf(Identifier.of('value')), IntegerType.instance());
    });

    test('reuses a named child scope', function () {
        const actor = new ScopeTypeInformation(null, 'actor1', DeclarationScopeType.ACTOR);

        const first = actor.beginMethodScope('method1');
        const second = actor.beginMethodScope('method1');

        assert.strictEqual(second, first);
        assert.deepStrictEqual(actor.getChildScopes(), ['method1']);
    });

    test('reports unknown variables with their identifier', function () {
        const actor = new ScopeTypeInformation(null, 'actor1', DeclarationScopeType.ACTOR);

        assert.throws(
            () => actor.getTypeOf(Identifier.of('missing')),
            new IllegalArgumentException('Variable "missing" and it\'s type are unknown. Declaration missing?')
        );
    });

    test('unions system and actor type information', function () {
        const left = new TypeInformationStorage();
        left.getSystemScope().putTypeInformation(Identifier.of('global'), IntegerType.instance());
        const right = new TypeInformationStorage();
        right.beginActorScope('actor1').putTypeInformation(Identifier.of('local'), BooleanType.instance());

        const union = TypeInformationStorage.union(left, right);

        assert.strictEqual(union.lookupTyped('global'), IntegerType.instance());
        assert.strictEqual(union.lookupTyped('actor1@local'), BooleanType.instance());
    });

    test('reuses list types for the same element type', function () {
        assert.strictEqual(
            ListType.withElementType(StringType.instance()),
            ListType.withElementType(StringType.instance())
        );
        assert.notStrictEqual(
            ListType.withElementType(StringType.instance()),
            ListType.withElementType(IntegerType.instance())
        );
    });
});
