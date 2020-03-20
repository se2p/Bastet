/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net),
 *   see the file CONTRIBUTORS.md for the list of contributors.
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

import {VariableDeclaration} from "./ast/core/statements/DeclarationStatement";
import {Identifier} from "./ast/core/Identifier";
import {ScratchType} from "./ast/core/ScratchType";
import {IllegalArgumentException} from "../core/exceptions/IllegalArgumentException";
import {Preconditions} from "../utils/Preconditions";
import {MethodSignature} from "./ast/core/MethodDefinition";
import {VariableWithDataLocation} from "./ast/core/Variable";
import {DataLocation, DataLocations, VAR_SCOPING_SPLITTER} from "./app/controlflow/DataLocation";
import {List as ImmList} from "immutable";
import {ImplementMeException} from "../core/exceptions/ImplementMeException";
import {IllegalStateException} from "../core/exceptions/IllegalStateException";

export enum DeclarationScopeType {
    UNDECLARED,
    SYSTEM,
    ACTOR,
    METHOD
}

export interface TypeInformationProvider {

    getDeclarationScope(usageScope: ImmList<string>, dataLocation: DataLocation): DeclarationScopeType;

    reduceToDeclarationScope(usageScope: ImmList<string>, dataLocation: DataLocation): ImmList<string>;

}

export abstract class ScopeTreeNode<T extends ScopeTreeNode<any>> {

    private readonly _parentScope: T;

    private readonly _scopeLevelName: string;

    private readonly _scopeType: DeclarationScopeType;

    private readonly _childs: {[id: string]: T};

    constructor(parentScope: T, scopeLevelName: string, scopeType: DeclarationScopeType) {
        this._parentScope = parentScope;
        this._scopeLevelName = scopeLevelName;
        this._scopeType = scopeType;
        this._childs = {};
    }

    public findChild(scopeName: string): T {
        if (this._childs.hasOwnProperty(scopeName)) {
            return this._childs[scopeName];
        } else {
            return null;
        }
    }

    protected putChild(name: string, scope: T) {
        this._childs[name] = scope;
    }

    public abstract beginScope(scopeName: string, scopeType: DeclarationScopeType): T;

    public endScope(): T {
        return this._parentScope;
    }

    get parentScope(): T {
        return this._parentScope;
    }

    get scopeLevelName(): string {
        return this._scopeLevelName;
    }

    get scopeType(): DeclarationScopeType {
        return this._scopeType;
    }

    get childs(): { [p: string]: T } {
        return this._childs;
    }

    public getChildScopes(): string[] {
        return Object.keys(this._childs);
    }

    public hasParent(): boolean {
        return this._parentScope != null;
    }
}

export class ScopeTypeInformation extends ScopeTreeNode<ScopeTypeInformation> {

    private readonly _variables: {[id: string]: VariableDeclaration};

    private readonly _methods: {[id: string]: MethodSignature};

    constructor(parent: ScopeTypeInformation, scopeLevelName: string, scopeType: DeclarationScopeType) {
        super(parent, scopeLevelName, scopeType);
        this._methods = {};
        this._variables = {};
    }

    public putVariable(v: VariableDeclaration) {
        this._variables[v.identifier.text] = v;
    }

    get variables(): {[id: string]: VariableDeclaration} {
        return this._variables;
    }

    public putMethod(signature: MethodSignature) {
        this._methods[signature.ident.text] = signature;
    }

    public getMethodResultType(ident: Identifier): ScratchType {
        return this.getMethodSignature(ident).returns.type;
    }

    public getMethodSignature(ident: Identifier): MethodSignature {
        let result: MethodSignature = this._methods[ident.text];
        if (!result) {
            if (this.hasParent()) {
                return this.parentScope.getMethodSignature(ident);
            } else {
                throw new IllegalArgumentException("No method signature for the given identifier: " + ident.text);
            }
        }
        return result;
    }

    public beginMethodScope(ident: string): ScopeTypeInformation {
        return this.beginScope(ident, DeclarationScopeType.METHOD);
    }

    get methods(): {[id: string]: MethodSignature} {
        return this._methods;
    }

    public findTypeOf(ident: Identifier): ScratchType {
        const varDecl = this._variables[ident.text];
        if (varDecl) {
            return varDecl.variableType;
        } else {
            return null;
        }
    }

    public getTypeOf(ident: Identifier): ScratchType {
        const result = this.findTypeOf(ident);
        if (!result) {
            if (this.hasParent()) {
                return this.parentScope.getTypeOf(ident);
            } else {
                throw new IllegalArgumentException(`Variable "${ident.text}" and it's type are unknown. Declaration missing?`);
            }
        }

        return result;
    }

    public getChildScope(id: string, scopeType: DeclarationScopeType): ScopeTypeInformation {
        let result = this.findChild(id);
        if (!result) {
            result = new ScopeTypeInformation(this, id, scopeType);
            this.putChild(id, result);
        }

        return result;
    }

    public addAllFrom(from: ScopeTypeInformation) {
        Preconditions.checkNotUndefined(from);

        for (const v of Object.values(from._variables)) {
            this.putVariable(v);
        }

        for (const m of Object.values(from._methods)) {
            this.putMethod(m);
        }

        for (const scopeName of from.getChildScopes()) {
            const fromChildScope: ScopeTypeInformation = from.findChild(scopeName);
            const toChildScope: ScopeTypeInformation = this.getChildScope(scopeName, fromChildScope.scopeType);
            toChildScope.addAllFrom(fromChildScope);
        }
    }

    public putTypeInformation(ident: Identifier, type: ScratchType) {
        const varDecl = new VariableWithDataLocation(DataLocations.createTypedLocation(ident, type));
        this.putVariable(varDecl);
    }

    beginScope(scopeName: string, scopeType: DeclarationScopeType): ScopeTypeInformation {
        let result: ScopeTypeInformation = this.findChild(scopeName);
        if (!result) {
            result = new ScopeTypeInformation(this, scopeName, scopeType);
            this.putChild(scopeName, result);
        }

        return result;
    }

    dump() {
        for (const m of Object.keys(this.methods)) {
            console.log(m);
        }
        for (const v of Object.keys(this.variables)) {
            console.log(v);
        }
        for (const c of Object.keys(this.childs)) {
            console.log(`------ ${c} ----`);
            this.findChild(c).dump();
        }
    }

}

export class TypeInformationStorage implements TypeInformationProvider {

    private readonly _systemScope: ScopeTypeInformation;

    constructor() {
        this._systemScope =  new ScopeTypeInformation(null, "system", DeclarationScopeType.SYSTEM);
    }

    public addAllFrom(infos: TypeInformationStorage) {
        throw new ImplementMeException();
    }

    public getSystemScope(): ScopeTypeInformation {
        return this._systemScope;
    }

    public beginActorScope(id: string): ScopeTypeInformation {
        return this._systemScope.beginScope(id, DeclarationScopeType.ACTOR);
    }

    public getActorScopes(): Iterable<ScopeTypeInformation> {
        return this._systemScope.getChildScopes().map((sn) => this._systemScope.findChild(sn));
    }

    public addAll(fromStorage: TypeInformationStorage): void {
        this._systemScope.addAllFrom(fromStorage.getSystemScope());
    }

    public static union(storage1: TypeInformationStorage, storage2: TypeInformationStorage): TypeInformationStorage {
        const result = new TypeInformationStorage();
        result.addAll(storage1);
        result.addAll(storage2);
        return result;
    }

    getDeclarationScope(usageScope: ImmList<string>, dataLocation: DataLocation): DeclarationScopeType {
        throw new ImplementMeException();
    }

    reduceToDeclarationScope(usageScope: ImmList<string>, dataLocation: DataLocation): ImmList<string> {
        Preconditions.checkArgument(usageScope.size > 0, "At least the ACTOR must be given");
        Preconditions.checkArgument(usageScope.size < 3, "The active scope most consist at most of ACTOR+METHOD");

        let systemScopeType: ScratchType;
        let actorScopeType: ScratchType;
        let methodScopeType: ScratchType;

        const ident = Identifier.of(dataLocation.ident);
        systemScopeType = this._systemScope.findTypeOf(ident);

        if (usageScope.size > 0) {
            const actorScope = this._systemScope.findChild(usageScope.get(0));
            Preconditions.checkNotUndefined(actorScope, `No scope information for ${usageScope.get(0)}`);
            actorScopeType = actorScope.findTypeOf(ident);

            if (usageScope.size > 1) {
                const methodScope = actorScope.getChildScope(usageScope.get(1), DeclarationScopeType.METHOD);
                Preconditions.checkNotUndefined(methodScope, `No scope information for ${usageScope.get(1)}`);
                methodScopeType = methodScope.findTypeOf(ident);
            }
        }

        if (methodScopeType) {
            return usageScope.slice(0, 2);

        } else if (actorScopeType) {
            return usageScope.slice(0, 1);

        } else if (systemScopeType) {
            return usageScope.slice(0, 0);

        } else {
            throw new IllegalArgumentException(`Type of entity ${ident.text} is not declared`);
        }
    }

    getTypedLocation(key: string): DataLocation {
        const type = this.lookupTyped(key);
        return DataLocations.createTypedLocation(Identifier.of(key), type);
    }

    lookupTyped(key: string): ScratchType {
        const splitted = key.split(VAR_SCOPING_SPLITTER).reverse();
        const varId = Identifier.of(splitted[0]);
        const scopeOf = this.getScopeOf(key);
        return scopeOf.getTypeOf(varId);
    }

    getScopeOf(key: string): ScopeTypeInformation {
        // Example for `key`: var1@Actor1
        const splitted = key.split(VAR_SCOPING_SPLITTER).reverse();

        if (splitted.length == 1) {
            // var1
            return this._systemScope;

        } else if (splitted.length == 2) {
            // var1@Actor1
            const actorId = splitted[1];
            return this._systemScope.getChildScope(actorId, DeclarationScopeType.ACTOR);

        } else if (splitted.length == 3) {
            // var1@method1@Actor1
            const methodId = splitted[1];
            const actorId = splitted[2];
            const actorScope = this._systemScope.getChildScope(actorId, DeclarationScopeType.ACTOR);
            return actorScope.getChildScope(methodId, DeclarationScopeType.METHOD);

        } else {
            throw new IllegalStateException();
        }
    }

    dump(): void {
        this._systemScope.dump();
    }
}
