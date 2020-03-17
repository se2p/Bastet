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

import {Map as ImmMap, Record as ImmRec, Set as ImmSet} from "immutable";
import {Preconditions} from "../utils/Preconditions";

export interface ConcernAttributes {

    text: string;

}

const ConcernRecord = ImmRec({

    text: ""

});

export class Concern extends ConcernRecord implements ConcernAttributes {

    constructor(text: string) {
        Preconditions.checkNotUndefined(text);
        Preconditions.checkArgument(text.length > 0);
        super({text: text});
    }

    get getText(): string {
        return this.get("text");
    }

    public withText(text: string): Concern {
        return this.set("text", text);
    }

}

/**
 * See the authors PhD thesis.
 */
export class Concerns {

    private static LOW_CONCERN: Concern;

    public static lowestPriorityConcern(): Concern {
        if (!Concerns.LOW_CONCERN) {
            // Aka TOP concern
            Concerns.LOW_CONCERN = new Concern("__TOP");
        }
        return Concerns.LOW_CONCERN;
    }

    private static HIGH_CONCERN: Concern;

    public static highestPriorityConcern(): Concern {
        if (!Concerns.HIGH_CONCERN) {
            // Aka BOTTOM concern
            Concerns.HIGH_CONCERN = new Concern("__BOTTOM");
        }
        return Concerns.HIGH_CONCERN;
    }

    private static DEF_SPEC_CONCERN: Concern;

    public static defaultSpecificationConcern(): Concern {
        if (!Concerns.DEF_SPEC_CONCERN) {
            Concerns.DEF_SPEC_CONCERN = new Concern("__SPEC");
        }
        return Concerns.DEF_SPEC_CONCERN;
    }

    private static DEF_PROGRAM_CONCERN: Concern;

    public static defaultProgramConcern(): Concern {
        if (!Concerns.DEF_PROGRAM_CONCERN) {
            Concerns.DEF_PROGRAM_CONCERN = new Concern("__PROG");
        }
        return Concerns.DEF_PROGRAM_CONCERN;
    }

    private static defaultConcern(): Concern {
        return this.lowestPriorityConcern();
    }

}

export interface ConcernDependencyGraphAttributes {

    concerns: ImmSet<Concern>;

    dependencyRelation: ImmMap<Concern, ImmSet<Concern>>;

    topConcern: Concern;

    bottomConcern: Concern;

}

const ConcernDependencyGraphRecord = ImmRec({

    concerns: ImmSet<Concern>(),

    dependencyRelation: ImmMap<Concern, ImmSet<Concern>>(),

    topConcern: Concerns.lowestPriorityConcern(),

    bottomConcern: Concerns.highestPriorityConcern()

});

/**
 * See the authors PhD thesis.
 */
export class ConcernDependencyGraph extends ConcernDependencyGraphRecord implements ConcernDependencyGraphAttributes {

    constructor(concerns: ImmSet<Concern>, dependencies: ImmMap<Concern, ImmSet<Concern>>) {
        super({concerns: Preconditions.checkNotUndefined(concerns),
            dependencyRelation: Preconditions.checkNotUndefined(dependencies),
            topConcern: Concerns.lowestPriorityConcern(),
            bottomConcern: Concerns.highestPriorityConcern()});
    }

    public withConcerns(concerns: ImmSet<Concern>): ConcernDependencyGraph {
        return this.set('concerns', concerns);
    }

    public withDependencies(dependencies: ImmMap<Concern, ImmSet<Concern>>): ConcernDependencyGraph {
        return this.set('dependencyRelation', dependencies);
    }

    public getTop(): Concern {
        return this.get("topConcern");
    }

    public getBottom(): Concern {
        return this.get("bottomConcern");
    }

}
