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

export class BastetConfiguration {

    private readonly dict: {};

    constructor(dict: {}) {
        this.dict = Preconditions.checkNotUndefined(dict);
    }

    public static loadFromFile(filename: string): BastetConfiguration {
        throw new ImplementMeException();
    }

    public getProperty(name: string, def?: any): any {
        return this.dict[name] || def;
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
