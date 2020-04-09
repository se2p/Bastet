import {AbstractElement, AbstractState} from "../../../lattices/Lattice";
import {StopOperator} from "../ProgramAnalysis";
import {GraphAbstractState} from "./GraphAbstractDomain";
import {Preconditions} from "../../../utils/Preconditions";

export class GraphCoverCheckStopOperator<F extends AbstractState> implements StopOperator<GraphAbstractState, GraphAbstractState> {

    private readonly _wrappedStopOp: StopOperator<any, any>;
    private readonly _unwrapper: (GraphAbstractState) => AbstractElement;

    constructor(wrappedStopOp: StopOperator<any, any>, unwrapper: (GraphAbstractState) => AbstractElement) {
        this._wrappedStopOp = Preconditions.checkNotUndefined(wrappedStopOp);
        this._unwrapper = Preconditions.checkNotUndefined(unwrapper);
    }

    stop(state: GraphAbstractState, reached: Iterable<GraphAbstractState>, unwrapper: (GraphAbstractState) => GraphAbstractState): boolean {
        for (const r of reached) {
            if (r.getMergeOf().contains(state.getId())) {
                return true;
            }
        }

        return this._wrappedStopOp.stop(state.getWrappedState(), reached, this._unwrapper);
    }

}