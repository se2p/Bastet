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

}
