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

import {ImplementMeException} from "../core/exceptions/ImplementMeException";
import {Preconditions} from "./Preconditions";

import {NodeSystemLayer} from "./SystemLayer";
import * as _ from "lodash";

export function mergeConfigFilesToJson(files: string[]): {} {
    let result: {} = {};
    for (const f of files) {
        const sl = new NodeSystemLayer();
        const j: {} = sl.readFileAsJson(f);
        result = _.merge(result, j);
    }
    return result;
}

export class BastetConfiguration {

    private readonly dict: {};

    private readonly scope: string[];

    constructor(dict: {}, scope: string[]) {
        this.dict = Preconditions.checkNotUndefined(dict);
        this.scope = Preconditions.checkNotUndefined(scope);
    }

    public static loadFromFile(filename: string): BastetConfiguration {
        throw new ImplementMeException();
    }

    public getProperty(name: string, def?: any): any {
        let scopeConfig = this.dict;
        for (const s of this.scope) {
            scopeConfig = scopeConfig[s];
            if (!scopeConfig) {
                return def;
            }
        }

        if (scopeConfig[name] === undefined) {
            return def;
        } else {
            return scopeConfig[name];
        }
    }

    public getNumberProperty(name: string, def?: number): number {
        return this.getProperty(name, def) as number;
    }

    public getBoolProperty(name: string, def?: boolean): boolean {
        return this.getProperty(name, def) as boolean;
    }

    public getStringProperty(name: string, def?: string): string {
        return this.getProperty(name, def) as string;
    }

    public getStringListProperty(name: string, def?: string[]): string[] {
        return this.getProperty(name, def) as string[];
    }

    public getNumberListProperty(name: string, def?: number[]): number[] {
        return this.getProperty(name, def) as number[];
    }

}
