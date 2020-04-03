import {Identifier} from "../../../../src/bastet/syntax/ast/core/Identifier";
import {DataLocations} from "../../../../src/bastet/syntax/app/controlflow/DataLocation";
import {VariableWithDataLocation} from "../../../../src/bastet/syntax/ast/core/Variable";
import {DeclarationScopeType, ScopeTypeInformation} from "../../../../src/bastet/syntax/DeclarationScopes";
import {IntegerType} from "../../../../src/bastet/syntax/ast/core/ScratchType";

describe('ScopeTypeInformation', function() {

    test('not scoped', function() {
        const ti = new ScopeTypeInformation(null, "actor1", DeclarationScopeType.ACTOR);

        ti.putVariable(new VariableWithDataLocation(DataLocations.createTypedLocation(
            Identifier.of("test"), IntegerType.instance())));

        expect(ti.getTypeOf(Identifier.of("test"))).toEqual(IntegerType.instance());
    });

    test('scoped', function() {
        const ti = new ScopeTypeInformation(null, "actor1", DeclarationScopeType.ACTOR);

        ti.beginScope("level1", DeclarationScopeType.METHOD);
        ti.beginScope("level2", DeclarationScopeType.METHOD);

        ti.putVariable(new VariableWithDataLocation(DataLocations.createTypedLocation(
            Identifier.of("test"), IntegerType.instance())));

        expect(ti.getTypeOf(Identifier.of("test"))).toEqual(IntegerType.instance());
    });

    test('scoped push pop', function() {
        const ti = new ScopeTypeInformation(null, "actor1", DeclarationScopeType.ACTOR);

        ti.beginScope("level1", DeclarationScopeType.METHOD);
        ti.beginScope("level2", DeclarationScopeType.METHOD);
        ti.endScope();

        ti.putVariable(new VariableWithDataLocation(DataLocations.createTypedLocation(
            Identifier.of("test"), IntegerType.instance())));

        expect(ti.getTypeOf(Identifier.of("test"))).toEqual(IntegerType.instance());
    });
});
