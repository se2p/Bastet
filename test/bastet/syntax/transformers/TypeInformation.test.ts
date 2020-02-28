import {ActorTypeInformation} from "../../../../src/bastet/syntax/transformers/ToIntermediateTransformer";
import {Identifier} from "../../../../src/bastet/syntax/ast/core/Identifier";
import {DataLocations} from "../../../../src/bastet/syntax/app/controlflow/DataLocation";
import {NumberType} from "../../../../src/bastet/syntax/ast/core/ScratchType";
import {VariableWithDataLocation} from "../../../../src/bastet/syntax/ast/core/Variable";

describe('ActorTypeInformation', function() {

    test('not scoped', function() {
        const ti = new ActorTypeInformation(Identifier.of("actor1"));

        ti.putVariable(new VariableWithDataLocation(DataLocations.createTypedLocation(
            Identifier.of("test"), NumberType.instance())));

        expect(ti.getTypeOf(Identifier.of("test"))).toEqual(NumberType.instance());
    })

    test('scoped', function() {
        const ti = new ActorTypeInformation(Identifier.of("actor1"));

        ti.beginScope("level1");
        ti.beginScope("level2");

        ti.putVariable(new VariableWithDataLocation(DataLocations.createTypedLocation(
            Identifier.of("test"), NumberType.instance())));

        expect(ti.getTypeOf(Identifier.of("test"))).toEqual(NumberType.instance());
    })

    test('scoped push pop', function() {
        const ti = new ActorTypeInformation(Identifier.of("actor1"));

        ti.beginScope("level1");
        ti.beginScope("level2");
        ti.endScope();

        ti.putVariable(new VariableWithDataLocation(DataLocations.createTypedLocation(
            Identifier.of("test"), NumberType.instance())));

        expect(ti.getTypeOf(Identifier.of("test"))).toEqual(NumberType.instance());
    })
});
