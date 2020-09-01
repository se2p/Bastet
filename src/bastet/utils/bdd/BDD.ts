/*
 *   BDD Library.
 *
 *   Copyright 2020 by Andreas Stahlbauer
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

import {List as ImmList, Record as ImmRec} from "immutable"
import {ImplementMeException} from "../../core/exceptions/ImplementMeException";
import {Preconditions} from "../Preconditions";
import {AbstractElement, LatticeWithComplements} from "../../lattices/Lattice";

export interface PropositionalFormula extends AbstractElement {

}

export class BDDLibraryFactory {

    public static async createBDDLib(): Promise<BDDLibrary> {
        return new BDDLibrary();
    }
}

export class BDDLattice implements LatticeWithComplements<BDD> {

    private readonly _bottom: BDD;
    private readonly _top: BDD;

    constructor() {
        this._bottom = new BDD(ImmList([new BDDEdge(ReductionRule.X, BDDNodes.falseNode())]));
        this._top = new BDD(ImmList([new BDDEdge(ReductionRule.X, BDDNodes.trueNode())]));
    }

    bottom(): BDD {
        return this._bottom;
    }

    isIncluded(element1: BDD, element2: BDD): boolean {
        if (element1 === this._bottom || element2 === this._top) {
            return true;
        }
        if (element1 === element2) {
            return true;
        }
        if (element2 === this._bottom) {
            return element1 === this._bottom;
        }
        throw new ImplementMeException();
    }

    join(element1: BDD, element2: BDD): BDD {
        if (element1 === this._top || element2 === this._top) {
            return this._top;
        }

        throw new ImplementMeException();
    }

    meet(element1: BDD, element2: BDD): BDD {
        throw new ImplementMeException();
    }

    top(): BDD {
        return this._top;
    }

    complement(element: BDD): BDD {
        if (element === this._bottom) {
            return this._top;
        }

        if (element === this._top) {
            return this._bottom;
        }

        throw new ImplementMeException();
    }

}

export class BDDLibrary {

    private readonly _lattice: LatticeWithComplements<PropositionalFormula>;

    constructor() {
        this._lattice = new BDDLattice();
    }

    get lattice(): LatticeWithComplements<PropositionalFormula> {
       return this._lattice;
    }

}

export interface BDDAttributes {

    /**
     * The BDD can have multiple rood notes (each
     * without incoming edges). One root node is formalized as p*.
     * To each root points a dangling edge with a reduction rule k*.
     */
    _roots: ImmList<BDDEdge>;
}

const BDDRecord = ImmRec({

    _roots: ImmList([])

});

/**
 * The paper "Binary Decision Diagrams with Edge-Specified Reductions" by
 * Babar et al. (2019) presented a now generalized form of BDDs.
 *
 * This is our implementation of their approach.
 */
export class BDD extends BDDRecord implements BDDAttributes {

    constructor(roots: ImmList<BDDEdge>) {
        super({_roots: roots});
    }

    /**
     * Returns the set of all BDD nodes that are reachable on forwards
     * edges from the given node.
     *
     * @param node
     */
    public nodesReachableFrom(node: BDDNode): Iterable<BDDNode> {
        throw new ImplementMeException();
    }

    get roots(): ImmList<BDDEdge> {
        return this.get('_roots');
    }

    get rootNodes(): BDDNode[] {
        return [ ...this.roots.map((e) => { return e.targetNode; }) ];
    }

    get zeroNode(): BDDNode {
        throw new ImplementMeException();
    }

    get trueNode(): BDDNode {
        throw new ImplementMeException();
    }
}

/**
 * Reduction rule in
 *  [
 *      S,      // short edge
 *      L_0,    // zero-suppressed
 *      H_0,    // one-suppressed
 *      X       // fully-reduced
 *  ].
 * Specifies the meaning when skipping edges.
 */
export enum ReductionRule {
    UNDEFINED = 0,
    S = 1,
    L0 = 2,
    H0 = 3,
    X = 4
}

export interface BDDEdgeAttributes {

    /** Reduction rule */
    _rule: ReductionRule;

    /** Node to which the edge points to */
    _targetNode: BDDNode;

    /** It is a short edge if no levels are skipped */
    isShortEdge(): boolean;

    /** It is a long edge if levels are skipped */
    isLongeEdge(): boolean;

}

const BDDEdgeRecord = ImmRec({

    _rule: ReductionRule.UNDEFINED,

    _targetNode: null

});

export class BDDEdge extends BDDEdgeRecord implements BDDEdgeAttributes {

    constructor(rule: ReductionRule, targetNode: BDDNode) {
        super({_rule: rule, _targetNode: targetNode});
    }

    get rule(): ReductionRule {
        return this.get('_rule');
    }

    get targetNode(): BDDNode {
        return this.get('_targetNode');
    }

    isLongeEdge(): boolean {
        throw new ImplementMeException();
    }

    isShortEdge(): boolean {
        throw new ImplementMeException();
    }
}

export interface BDDNodeAttributes {

    _level: number;

    _nodeRole: NodeRole;

    _falseEdge: BDDEdge;

    _trueEdge: BDDEdge;

    leavingEdges(): Iterable<BDDEdge>;

    isFalseTerminalNode(): boolean;

    isTrueTerminalNode(): boolean;

    getTrueEdge(): BDDEdge;

    getFalseEdge(): BDDEdge;

}

export enum NodeRole {
    INTERMEDIATE = 0,
    TRUE = 1,
    FALSE = 2
}


const BDDNodeRecord = ImmRec({

    _level: -1,
    _nodeRole: 0,
    _falseEdge: null,
    _trueEdge: null

});

export class BDDNode extends BDDNodeRecord implements BDDNodeAttributes {

    constructor(level: ReductionRule, trueEdge: BDDEdge, falseEdge: BDDEdge, nodeRole: NodeRole) {
        super({_level: level, _trueEdge: trueEdge, _falseEdge: falseEdge, _nodeRole: nodeRole});
    }

    get level(): number {
        return this.get('_level');
    }

    getFalseEdge(): BDDEdge {
        return this.get('_falseEdge');
    }

    getTrueEdge(): BDDEdge {
        return this.get('_trueEdge');
    }

    isFalseTerminalNode(): boolean {
        throw new ImplementMeException();
    }

    isTrueTerminalNode(): boolean {
        throw new ImplementMeException();
    }

    leavingEdges(): Iterable<BDDEdge> {
        return [this.getFalseEdge(), this.getTrueEdge()];
    }

}

export class BDDNodes {

    private static TRUE_NODE: BDDNode;
    private static FALSE_NODE: BDDNode;

    public static trueNode(): BDDNode {
        if (!BDDNodes.TRUE_NODE) {
            BDDNodes.TRUE_NODE = new BDDNode(0, null, null, NodeRole.TRUE);
        }
        return this.TRUE_NODE;
    }

    public static falseNode(): BDDNode {
        if (!BDDNodes.FALSE_NODE) {
            BDDNodes.FALSE_NODE = new BDDNode(0, null, null, NodeRole.FALSE);
        }
        return this.FALSE_NODE;
    }

}

export function isDuplicat(node: BDDNode, ofNode: BDDNode) : boolean {
    throw new ImplementMeException();
}

export function isRedundant(node: BDDNode) : boolean {
    throw new ImplementMeException();
}

export function isHighZero(node: BDDNode) : boolean {
    throw new ImplementMeException();
}

export function isLowZero(node: BDDNode) : boolean {
    throw new ImplementMeException();
}

export function isReduced(bdd: BDD) : boolean {
    throw new ImplementMeException();
}

export class BDDReducer {

    private _bdd: BDD;
    private _zeroNode: BDDNode;
    private _trueNode: BDDNode;

    constructor(initial: BDD) {
        this._bdd = Preconditions.checkNotUndefined(initial);
        this._zeroNode = this._bdd.zeroNode;
        this._trueNode = this._bdd.trueNode;
    }

    private getAllReducibleNodes(): BDDNode[] {
        // `_bdd` nodes with a high-zero, low-zero, redundant, or duplicate node
        throw new ImplementMeException();
    }

    private reduceFrom(p: BDDNode) {
        const worklist: Set<BDDNode> = new Set<BDDNode>();
        for (const r of this._bdd.rootNodes) {
            worklist.add(r);
        }
        this.reduceFalseTerminal();

        function hasEdge(rule: ReductionRule, q: BDDNode): boolean {
            throw new ImplementMeException();
        }

        while (true) {
            const reducible = this.getAllReducibleNodes();
            if (reducible.length > 0) {
                const q: BDDNode = reducible[0];
                if (isDuplicat(q, p)) {
                    // Replace all <k,q> edges with <k,p>
                    this.redirectAllEdges(q, p);
                } else {
                    let kP: ReductionRule = null;
                    let dP: BDDNode = null;
                    if (isRedundant(q)) {
                        kP = ReductionRule.X;
                        dP = q.getTrueEdge().targetNode;
                    } else if (isHighZero(q)) {
                        kP = ReductionRule.H0;
                        dP = q.getFalseEdge().targetNode;
                    } else if (isLowZero(q)) {
                        kP = ReductionRule.L0;
                        dP = q.getTrueEdge().targetNode;
                    }

                    if (dP.isFalseTerminalNode()) {
                        // Replace all <k,q> edges with <X,FalseNode>
                        throw new ImplementMeException();
                        this.replaceAllEdgesTargeting(q, ReductionRule.X, this._zeroNode);
                    } else {
                        // Replace all <S,q> edges with <k', d'>
                        this.replaceEdgesWithBy(ReductionRule.X, q, kP, dP);

                        // Replace all <k',q> edges with <k', d'>
                        this.replaceEdgesWithBy(kP, q, kP, dP);

                        const checkRules: Set<ReductionRule> = new Set([ReductionRule.L0, ReductionRule.H0, ReductionRule.X, ReductionRule.S]);
                        checkRules.delete(kP);
                        for (const rule of checkRules) {
                            if (hasEdge(rule, q)) {
                                let trueEdge: BDDEdge;
                                let falseEdge: BDDEdge;
                                if (rule === ReductionRule.X) {
                                    falseEdge = new BDDEdge(kP, dP);
                                    trueEdge = new BDDEdge(kP, dP);
                                } else if (rule === ReductionRule.H0) {
                                    falseEdge = new BDDEdge(kP, dP);
                                    trueEdge = new BDDEdge(ReductionRule.X, this._zeroNode);
                                } else if (rule === ReductionRule.L0) {
                                    falseEdge = new BDDEdge(ReductionRule.X, this._zeroNode);
                                    trueEdge = new BDDEdge(kP, dP);
                                }
                                const qP = this.addNewNode(trueEdge, falseEdge);

                                // Replace all <k,q> edges with <k,q'> or <S,q'>
                                this.replaceLongEdgesWithBy(rule, q, rule, qP);
                                this.replaceShortEdgesWithBy(rule, q, ReductionRule.S, qP);
                            }
                        }

                    }
                }
                worklist.delete(q);
            }
        }
    }

    private replaceShortEdgesWithBy(rule: ReductionRule, q: BDDNode, S: ReductionRule, qP: any) {
        throw new ImplementMeException();
    }

    private replaceEdgesWithBy(X: ReductionRule, A: BDDNode, kP: ReductionRule, dP: BDDNode) {
        throw new ImplementMeException();
    }

    private replaceAllEdgesTargeting(q: BDDNode, X: ReductionRule, _zeroNode: BDDNode) {
        throw new ImplementMeException();
    }

    private redirectAllEdges(q: BDDNode, p: BDDNode) {
        throw new ImplementMeException();
    }

    public reduce(): BDD {
        for (const r of this._bdd.rootNodes) {
            this.reduceFrom(r);
        }
        return this._bdd;
    }

    private reduceFalseTerminal() {
        throw new ImplementMeException();
    }

    private addNewNode(trueEdge: BDDEdge, falseEdge: BDDEdge) {
        throw new ImplementMeException();
    }

    private replaceLongEdgesWithBy(rule: ReductionRule, q: BDDNode, rule2: ReductionRule, qP: void) {
        throw new ImplementMeException();
    }

}
