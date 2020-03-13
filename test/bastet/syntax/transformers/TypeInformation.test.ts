import {Identifier} from "../../../../src/bastet/syntax/ast/core/Identifier";
import {DataLocations} from "../../../../src/bastet/syntax/app/controlflow/DataLocation";
import {NumberType} from "../../../../src/bastet/syntax/ast/core/ScratchType";
import {VariableWithDataLocation} from "../../../../src/bastet/syntax/ast/core/Variable";
import {DeclarationScopeType, ScopeTypeInformation} from "../../../../src/bastet/syntax/DeclarationScopes";

describe('ScopeTypeInformation', function() {

    test('not scoped', function() {
        const ti = new ScopeTypeInformation(null, "actor1", DeclarationScopeType.ACTOR);

        ti.putVariable(new VariableWithDataLocation(DataLocations.createTypedLocation(
            Identifier.of("test"), NumberType.instance())));

        expect(ti.getTypeOf(Identifier.of("test"))).toEqual(NumberType.instance());
    });

    test('scoped', function() {
        const ti = new ScopeTypeInformation(null, "actor1", DeclarationScopeType.ACTOR);

        ti.beginScope("level1", DeclarationScopeType.METHOD);
        ti.beginScope("level2", DeclarationScopeType.METHOD);

        ti.putVariable(new VariableWithDataLocation(DataLocations.createTypedLocation(
            Identifier.of("test"), NumberType.instance())));

        expect(ti.getTypeOf(Identifier.of("test"))).toEqual(NumberType.instance());
    });

    test('scoped push pop', function() {
        const ti = new ScopeTypeInformation(null, "actor1", DeclarationScopeType.ACTOR);

        ti.beginScope("level1", DeclarationScopeType.METHOD);
        ti.beginScope("level2", DeclarationScopeType.METHOD);
        ti.endScope();

        ti.putVariable(new VariableWithDataLocation(DataLocations.createTypedLocation(
            Identifier.of("test"), NumberType.instance())));

        expect(ti.getTypeOf(Identifier.of("test"))).toEqual(NumberType.instance());
    });
});
