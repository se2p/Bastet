/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2020 by University of Passau (uni-passau.de)
 *
 *   See the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Please make sure to CITE this work in your publications if you
 *   build on this work. Some of our maintainers or contributors might
 *   be interested in actively CONTRIBUTING to your research project.
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

import {Record as ImmRec, Set as ImmSet} from "immutable";
import {ExpressionList} from "./ast/core/expressions/ExpressionList";
import {Preconditions} from "../utils/Preconditions";
import {StringLiteral} from "./ast/core/expressions/StringExpression";

export interface PropertyAttributes {

    text: string;

}

const PropertyRecord = ImmRec({

    text: ""

});

export class Property extends PropertyRecord implements PropertyAttributes {

    constructor(text: string) {
        Preconditions.checkNotUndefined(text);
        Preconditions.checkArgument(text.length > 0);
        super({text: text});
    }

    public getText(): string {
        return this.get("text");
    }

    public withText(text: string): Property {
        return this.set("text", text);
    }

}

export interface SpecificationAttributes {

    properties: ImmSet<Property>;

}

const SpecificationRecord = ImmRec({

    properties: ImmSet<Property>()

});

export class Specification extends SpecificationRecord {

    constructor(properties: ImmSet<Property>) {
        super({properties: properties});
    }

    public getProperties(): ImmSet<Property> {
        return this.get("properties");
    }

    public withProperties(props: ImmSet<Property>): Specification {
        return this.set("properties", props);
    }

    public withProperty(prop: Property): Specification {
        return this.set("properties", this.getProperties().add(prop));
    }
}

export class Properties {

    public static from(str: string): Property {
        return new Property(str);
    }

    public static fromArguments(args: ExpressionList): ImmSet<Property> {
        let result: ImmSet<Property> = ImmSet();
        for (const a of args) {
            Preconditions.checkArgument(a instanceof StringLiteral);
            const s: StringLiteral = a as StringLiteral;
            result = result.add(new Property(s.text));
        }

        if (result.isEmpty()) {
            result = result.add(new Property("Violating program location must NOT be reachable!"));
        }

        return result;
    }


}


