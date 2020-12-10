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

import {AbstractElement, Lattice} from "../../../lattices/Lattice";
import {FirstOrderFormula} from "../../../utils/ConjunctiveNormalForm";
import {Record as ImmRec} from "immutable";
import {FirstOrderLattice} from "../../domains/FirstOrderDomain";
import {Preconditions} from "../../../utils/Preconditions";

export interface BlockSummaryAttribs extends AbstractElement {

    /**
     * The formula that is overapproximated by `summaryFormula`.
     */
    blockFormula: FirstOrderFormula;

    /**
     * The `summary` formula overapproximates the formula in `blockFormula`,
     * that is, `blockFormula` implies `summary`.
     *
     * ATTENTION: We assume that the `summaryFormula` formula is either stored
     * without SSA indicies or with SSA index 0. To compute
     * the implication between `summaryFormula` and `blockFormula`, the
     * `summaryFormula` formula has to be re-instantiated with SSA indices
     * that match to those of the `blockFormula`.
     */
    summaryFormula: FirstOrderFormula;
}

const BlockSummaryRecord = ImmRec({

    blockFormula: null,

    summaryFormula: null, // TODO: getter erstellen

});

export class BlockSummary extends BlockSummaryRecord implements BlockSummaryAttribs, AbstractElement {

    constructor(blockFormula: FirstOrderFormula, summary: FirstOrderFormula) {
        super({summaryFormula: summary, blockFormula: blockFormula});
    }

    public withBlockFormula(blockFormula: FirstOrderFormula): this {
        return this.set("blockFormula", blockFormula);
    }

    public withSummary(summaryFormula: FirstOrderFormula): this {
        return this.set("summaryFormula", summaryFormula);
    }

}

export class BlockSummaryLattice implements Lattice<BlockSummary> {

    private readonly _folLattice: FirstOrderLattice<FirstOrderFormula>;

    private readonly _bottom: BlockSummary;

    private readonly _top: BlockSummary;

    constructor(folLattice: FirstOrderLattice<FirstOrderFormula>) {
        this._folLattice = Preconditions.checkNotUndefined(folLattice);
        this._bottom = new BlockSummary(this._folLattice.bottom(), this._folLattice.bottom());
        this._top = new BlockSummary(this._folLattice.top(), this._folLattice.top());
    }

    bottom(): BlockSummary {
        return this._bottom;
    }

    isIncluded(element1: BlockSummary, element2: BlockSummary): boolean {
        if (element1.blockFormula.equals(element2.blockFormula)) {
            return this._folLattice.isIncluded(element1.summaryFormula, element2.summaryFormula);
        } else {
            return false;
        }
    }

    join(element1: BlockSummary, element2: BlockSummary): BlockSummary {
        if (element1.blockFormula.equals(element2.blockFormula)) {
            return element1.withSummary(this._folLattice.join(element1.summaryFormula, element2.summaryFormula));
        } else {
            return this.top();
        }
    }

    meet(element1: BlockSummary, element2: BlockSummary): BlockSummary {
        if (element1.blockFormula.equals(element2.blockFormula)) {
            return element1.withSummary(this._folLattice.meet(element1.summaryFormula, element2.summaryFormula));
        } else {
            return this.bottom();
        }
    }

    top(): BlockSummary {
        return this._top;
    }

    get folLattice(): FirstOrderLattice<FirstOrderFormula> {
        return this._folLattice;
    }

}