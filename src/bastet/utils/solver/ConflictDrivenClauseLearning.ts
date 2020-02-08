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

import {CNFFormula} from "../ConjunctiveNormalForm";
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {List as ImmList, Record as ImmRec, Set as ImmSet} from "immutable";


export interface BoolVariableAttributes {
    name: string;
}

const BoolVariableRecord = ImmRec({
    name: ""
});

export class BoolVariable extends BoolVariableRecord {

   constructor(name: string) {
       super({name: name});
   }

   public getName(): string {
       return this.get("name");
   }

}

export interface DecisionStateAttributes {
    trueVariables: ImmSet<BoolVariable>;
    falseVariables: ImmSet<BoolVariable>;
}

const DecisionStateRecord = ImmRec({
    trueVariables: ImmSet<BoolVariable>(),
    falseVariables: ImmSet<BoolVariable>()
});

export class DecisionState extends DecisionStateRecord {

    constructor(trueVars: ImmSet<BoolVariable>, falseVars: ImmSet<BoolVariable>) {
        super({trueVariables: trueVars, falseVariables: falseVars});
    }

    public getTrueVariables(): ImmSet<BoolVariable> {
        return this.get('trueVariables');
    }

    public getFalseVariables(): ImmSet<BoolVariable> {
        return this.get('falseVariables');
    }

}

export class CDCL {

    public solve(f: CNFFormula): boolean {
        const assignable: Set<BoolVariable> = new Set<BoolVariable>();
        while (assignable.size > 0) {
            // Select a variable (to assign `True` or `False`)

            // Apply the Unit Clause Rule (Unit Propagation)

            // Build the Implication Graph

            // Check for any conflict and backtrack if needed
            let hasConflict: boolean;
            if (hasConflict) {
                // Find the cut in the implication graph
                // that lead to the conflict

                // Derive a new clause (negate the assignments that led to the conflict)

                // Non-chronocal backtracking to the point where
                // the first-assigned variable in the conflict was assigned
            }
        }

        throw new ImplementMeException();
    }

}