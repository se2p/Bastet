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

import {AbstractNode} from "../AstNode";
import {AstNodeList} from "../AstNodeList";
import {Identifier} from "./Identifier";
import {ResourceLocation} from "./ResourceLocation";

export abstract class ResourceType extends AbstractNode {

}

export class SoundResourceType extends ResourceType {

    constructor() {
        super([]);
    }

    private static readonly INSTANCE = new SoundResourceType();

    public static instance(): SoundResourceType {
        return this.INSTANCE;
    }
}

export class ImageResourceType extends ResourceType {

    constructor() {
        super([]);
    }

    private static readonly INSTANCE = new ImageResourceType();

    public static instance(): ImageResourceType {
        return this.INSTANCE;
    }

}

export class ResourceDefinition extends AbstractNode {

    private readonly _resourceType: ResourceType;
    private readonly _ident: Identifier;
    private readonly _resourceLocator: ResourceLocation;

    constructor(resType: ResourceType, ident: Identifier, locator: ResourceLocation) {
        super([resType, ident, locator]);
        this._resourceType = resType;
        this._ident = ident;
        this._resourceLocator = locator;
    }

}

export class ResourceDefinitionList extends AstNodeList<ResourceDefinition> {

    constructor(elements: ResourceDefinition[]) {
        super(elements);
    }

}
