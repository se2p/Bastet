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

import {IllegalArgumentException} from "../core/exceptions/IllegalArgumentException";
import {IllegalStateException} from "../core/exceptions/IllegalStateException";

export class Preconditions {

    public static checkArgument(condition: boolean, message?: string) {
        if (!condition) {
            if (message) {
                throw new IllegalArgumentException(message);
            } else {
                throw new IllegalArgumentException("Illegal argument!");
            }
        }
    }

    /**
     * We cannot always trust TypeScript's type system. Thus we have
     * some preconditions on types, for example, this one which checks
     * if a given entity is an dictionary.
     *
     * @param obj
     */
    public static checkIsDic<E>(v: E): E {
        const isDict: boolean = typeof v==='object'
            && v!==null
            && !(v instanceof Array)
            && !(v instanceof Date);

        if (!isDict) {
            throw new IllegalArgumentException("The given object is not a dictionary!");
        }

        return v;
    }

    public static checkState(condition: boolean, message?: string) {
        if (!condition) {
            if (message) {
                throw new IllegalStateException(message);
            } else {
                throw new IllegalStateException("Illegal state!");
            }
        }
    }

    public static checkNotEmpty(text: string, message?: string) {
        if (!text || text.length == 0) {
            if (message) {
                throw new IllegalArgumentException(message);
            } else {
                throw new IllegalArgumentException("String must not be empty");
            }
        }

        return text;
    }

    static checkNotUndefined<E>(obj: E, message?: string): E {
        if (typeof obj === 'string' || obj instanceof String) {
            // To deal with the case that obj === ""
            return obj;
        }

        if (!obj) {
           if (message) {
               throw new IllegalArgumentException(message);
           } else {
               throw new IllegalArgumentException("Reference must not be undefined.");
           }
       }

       return obj;
    }
}
