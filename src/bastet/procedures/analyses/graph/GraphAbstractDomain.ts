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

import {AbstractDomain, AbstractionPrecision} from "../../domains/AbstractDomain";
import {AbstractElement, Lattice} from "../../../lattices/Lattice";
import {ImplementMeException} from "../../../core/exceptions/ImplementMeException";
import {Record as ImmRec, Set as ImmSet} from "immutable"
import {SingletonStateWrapper} from "../AbstractStates";
import {ConcreteDomain, ConcreteElement} from "../../domains/ConcreteElements";

export type GraphStateId = number;

export interface GraphConcreteState extends ConcreteElement {

}

export interface GraphAbstractStateAttribs extends AbstractElement, SingletonStateWrapper {

    id: GraphStateId;

    predecessors: ImmSet<GraphStateId>;

    wrappedState: ImmRec<any>;

}

const GraphAbstractStateRecord = ImmRec({
    id: 0,
    predecessors: ImmSet<GraphStateId>([]),
    wrappedState: null
});

export class GraphAbstractState extends GraphAbstractStateRecord implements GraphAbstractStateAttribs {

    constructor(id: GraphStateId, preds: ImmSet<GraphStateId>, wrapped: ImmRec<any>) {
        super({id: id, predecessors: preds, wrappedState: wrapped});
    }

    public getId(): number {
        return this.get('id');
    }

    public getPredecessors(): ImmSet<GraphStateId> {
        return this.get('predecessors');
    }

    public getWrappedState(): ImmRec<any> {
        return this.get('wrappedState');
    }
}

export class GraphAbstractStateFactory {

    private static STATE_ID_SEQ: number;

    public static withFreshID(preds: Iterable<GraphStateId>, wrapped: ImmRec<any>): GraphAbstractState {
        if (!GraphAbstractStateFactory.STATE_ID_SEQ) {
            GraphAbstractStateFactory.STATE_ID_SEQ = 0;
        }
        const freshId = GraphAbstractStateFactory.STATE_ID_SEQ++;
        return new GraphAbstractState(freshId, ImmSet(preds), wrapped);
    }

}

export class GraphAbstractStateBuilder {

    private _id: GraphStateId;
    private _predecessors: GraphStateId[];
    private _wrappedState: ImmRec<any>;

    constructor() {
        this._predecessors = [];
    }

    public setId(id: GraphStateId): GraphAbstractStateBuilder {
        this._id = id;
        return this;
    }

    public addPredecessors(id: GraphStateId): GraphAbstractStateBuilder {
        this._predecessors.push(id);
        return this;
    }

    public setWrappedState(state: ImmRec<any>) : GraphAbstractStateBuilder {
        this._wrappedState = state;
        return this;
    }

    public build(): GraphAbstractStateAttribs {
        return new GraphAbstractState(this._id, ImmSet(this._predecessors), this._wrappedState);
    }
}

export class GraphAbstractStateLattice implements Lattice<GraphAbstractStateAttribs> {

    bottom(): GraphAbstractStateAttribs {
        throw new ImplementMeException();
    }

    isIncluded(element1: GraphAbstractStateAttribs, element2: GraphAbstractStateAttribs): boolean {
        throw new ImplementMeException();
    }

    join(element1: GraphAbstractStateAttribs, element2: GraphAbstractStateAttribs): GraphAbstractStateAttribs {
        throw new ImplementMeException();
    }

    meet(element1: GraphAbstractStateAttribs, element2: GraphAbstractStateAttribs): GraphAbstractStateAttribs {
        throw new ImplementMeException();
    }

    top(): GraphAbstractStateAttribs {
        throw new ImplementMeException();
    }
}

export class GraphAbstractDomain implements AbstractDomain<GraphConcreteState, GraphAbstractStateAttribs> {

    private readonly _lattice: GraphAbstractStateLattice;

    get lattice(): Lattice<GraphAbstractStateAttribs> {
        return this._lattice;
    }

    abstract(elements: Iterable<GraphConcreteState>): GraphAbstractStateAttribs {
        throw new ImplementMeException();
    }

    concretize(element: GraphAbstractStateAttribs): Iterable<GraphConcreteState> {
        throw new ImplementMeException();
    }

    widen(element: GraphAbstractStateAttribs, precision: AbstractionPrecision): GraphAbstractStateAttribs {
        throw new ImplementMeException();
    }

    get concreteDomain(): ConcreteDomain<GraphConcreteState> {
        throw new ImplementMeException();
    }
}
