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

import {AccessibilityRelation} from "../procedures/analyses/Accessibility";

export interface DirectedGraph<V> {

    initial(): Iterable<V>;

    /**
     *
     * @param state
     * @throws Exception if `node` is not in the graph relation.
     */
    successorsOf(node: V): V[];

    /**
     * Important: Only the initial vertice has the empty set of predecessor vertices.
     * An exception is throw for all other vertices that are not in the
     * graph relation.
     *
     * @param state
     */
    predecessorsOf(node: V): V[];

    /**
     * Is the given vertice `node` reachable on in this
     * graph relation? (overapproximation!)
     */
    isReachable(node: V): boolean;

}

export class DirectedGraphs {

    public static dumpToString<V>(graph: DirectedGraph<V>,
                                  nodeLabeling: (v: V) => string, transLabeling: (v1: V, v2: V) => string) {
        const result: string[] = [];
        const worklist = [];
        const visited: Set<any> = new Set();
        Array.from(graph.initial()).forEach((e) => worklist.push(e));

        while (worklist.length > 0) {
            const work = worklist.pop();
            if (!visited.has(work)) {
                for (const succ of graph.successorsOf(work)) {
                    result.push(`${nodeLabeling(work)}\t${transLabeling(work, succ)}\t${nodeLabeling(succ)}`);
                    worklist.push(succ);
                }
                visited.add(work);
            }
        }

        return result.join("\n");
    }

}
