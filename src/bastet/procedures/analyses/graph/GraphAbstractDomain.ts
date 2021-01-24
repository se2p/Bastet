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

import {AbstractElement, AbstractElementVisitor, AbstractState, Lattice} from "../../../lattices/Lattice";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {Record as ImmRec, Set as ImmSet} from "immutable"
import {SingletonStateWrapper} from "../AbstractStates";
import {ConcreteDomain, ConcreteElement} from "../../domains/ConcreteElements";
import {Preconditions} from "../../../utils/Preconditions";
import {PartitionKey} from "../../algorithms/StateSet";
import {LexiKey} from "../../../utils/Lexicographic";
import {AbstractionPrecision} from "../../AbstractionPrecision";
import {AbstractDomain} from "../../domains/AbstractDomain";

export type GraphStateId = number;

export interface GraphAbstractStateAttribs extends AbstractElement, SingletonStateWrapper {

    id: GraphStateId;

    predecessors: ImmSet<GraphStateId>;

    mergeOf: ImmSet<GraphStateId>;

    wrappedState: ImmRec<any>;

    partitionKeys: ImmSet<PartitionKey>;

    orderKey: LexiKey;

}

const GraphAbstractStateRecord = ImmRec({
    id: 0,
    predecessors: ImmSet<GraphStateId>([]),
    wrappedState: null,
    mergeOf: ImmSet<GraphStateId>([]),
    partitionKeys: ImmSet(),
    orderKey: new LexiKey([])
});

let STATE_ID_SEQ: number = 0;

export class GraphAbstractState extends GraphAbstractStateRecord implements GraphAbstractStateAttribs, AbstractState {

    constructor(id: GraphStateId, preds: ImmSet<GraphStateId>, mergeOf: ImmSet<GraphStateId>, wrapped: ImmRec<any>,
                partitionKey: ImmSet<PartitionKey>, orderKey: LexiKey) {
        super({id: id, predecessors: preds, wrappedState: wrapped, mergeOf: mergeOf, partitionKeys: partitionKey, orderKey: orderKey});
    }

    public getId(): number {
        return this.get('id');
    }

    public getPredecessors(): ImmSet<GraphStateId> {
        return this.get('predecessors');
    }

    public getMergeOf(): ImmSet<GraphStateId> {
        return this.get('mergeOf');
    }

    public getWrappedState(): AbstractState {
        return this.get('wrappedState');
    }

    public withPartitionKeys(keys: ImmSet<PartitionKey>): GraphAbstractState {
        return this.set('partitionKeys', keys);
    }

    public withOrderKey(orderKey: LexiKey): GraphAbstractState {
        return this.set('orderKey', orderKey);
    }

    public withMergeOf(of: ImmSet<GraphStateId>) {
        return this.set('mergeOf', of);
    }

    public withPredecessors(preds: ImmSet<GraphStateId>): GraphAbstractState {
        return this.set('predecessors', preds);
    }

    public withWrappedState(wrapped: AbstractState): GraphAbstractState {
        return this.set('wrappedState', wrapped);
    }

    public withFreshId(): GraphAbstractState {
        if (!STATE_ID_SEQ) {
            STATE_ID_SEQ = 0;
        }
        const freshId = STATE_ID_SEQ++;

        return this.set('id', freshId);
    }

    public getPartitionKeys(): ImmSet<PartitionKey> {
        return this.get('partitionKeys');
    }

    public getOrderKey(): LexiKey {
        return this.get('orderKey');
    }

    public accept<R>(visitor: AbstractElementVisitor<R>): R {
        const visitMethod: string = `visit${this.constructor.name}`;
        if (visitor[visitMethod]) {
            return visitor[visitMethod](this);
        } else {
            return visitor.visit(this);
        }
    }
}


export class GraphAbstractStateFactory {

    public static withFreshID(preds: Iterable<GraphStateId>, mergeOf: Iterable<GraphStateId>, wrapped: ImmRec<any>,
                              wrappedKeys: ImmSet<PartitionKey>, orderKey: LexiKey): GraphAbstractState {
        const freshId = this.freshStateID();
        return this.withID(freshId, preds, mergeOf, wrapped, wrappedKeys, orderKey);
    }

    public static withID(id: number, preds: Iterable<GraphStateId>, mergeOf: Iterable<GraphStateId>, wrapped: ImmRec<any>,
                              wrappedKeys: ImmSet<PartitionKey>, orderKey: LexiKey): GraphAbstractState {
        return new GraphAbstractState(id, ImmSet(preds), ImmSet(mergeOf)
            .union([id]), wrapped, wrappedKeys, orderKey);
    }

    public static freshStateID(): number {
        if (!STATE_ID_SEQ) {
            STATE_ID_SEQ = 0;
        }
        return STATE_ID_SEQ++;
    }
}

export class GraphAbstractStateLattice implements Lattice<GraphAbstractState> {

    private readonly _wrappedLattice: Lattice<AbstractElement>;

    private readonly _bottom: GraphAbstractState;

    constructor(wrappedLattice: Lattice<AbstractElement>) {
        this._wrappedLattice = Preconditions.checkNotUndefined(wrappedLattice);
        this._bottom = GraphAbstractStateFactory.withID(-1, [], [],
            this._wrappedLattice.bottom(), ImmSet(), new LexiKey([]));
    }

    bottom(): GraphAbstractState {
        return this._bottom;
    }

    isIncluded(element1: GraphAbstractState, element2: GraphAbstractState): boolean {
        return this._wrappedLattice.isIncluded(element1.getWrappedState(), element2.getWrappedState());
    }

    join(element1: GraphAbstractState, element2: GraphAbstractState): GraphAbstractState {
        return GraphAbstractStateFactory.withFreshID(
            element1.getPredecessors().union(element2.getPredecessors()),
            element1.getMergeOf().union(element2.getMergeOf()),
            this._wrappedLattice.join(element1.getWrappedState(), element2.getWrappedState()),
            element1.getPartitionKeys(), element1.getOrderKey());
    }

    meet(element1: GraphAbstractState, element2: GraphAbstractState): GraphAbstractState {
        throw new ImplementMeException();
    }

    top(): GraphAbstractState {
        throw new ImplementMeException();
    }
}

export class GraphAbstractDomain implements AbstractDomain<ConcreteElement, GraphAbstractState> {

    private readonly _lattice: GraphAbstractStateLattice;
    private readonly _wrapped: AbstractDomain<ConcreteElement, AbstractElement>;

    constructor(wrapped: AbstractDomain<ConcreteElement, AbstractElement>) {
        this._wrapped = Preconditions.checkNotUndefined(wrapped);
        this._lattice = new GraphAbstractStateLattice(wrapped.lattice);
    }

    get lattice(): Lattice<GraphAbstractState> {
        return this._lattice;
    }

    abstract(elements: Iterable<ConcreteElement>): GraphAbstractState {
        throw new ImplementMeException();
    }

    concretize(element: GraphAbstractState): Iterable<ConcreteElement> {
        throw new ImplementMeException();
    }

    concretizeOne(element: GraphAbstractState): ConcreteElement {
        return this._wrapped.concretizeOne(element.getWrappedState());
    }

    widen(element: GraphAbstractState, precision: AbstractionPrecision): GraphAbstractState {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<ConcreteElement> {
        throw new ImplementMeException();
    }

    composeSeq(e1: GraphAbstractState, e2: GraphAbstractState): GraphAbstractState {
        throw new ImplementMeException();
    }
}
