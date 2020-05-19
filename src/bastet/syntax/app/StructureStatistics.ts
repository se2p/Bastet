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


import {AnalysisStatistics} from "../../procedures/analyses/AnalysisStatistics";
import {App} from "./App";
import {Preconditions} from "../../utils/Preconditions";
import {BootstrapEvent, NeverEvent, TerminationEvent} from "../ast/core/CoreEvent";
import {Concern, Concerns} from "../Concern";

export class StructureStatistics {

    private computeStatisticsForConcern(task: App, concern: Concern, addTo: AnalysisStatistics) {
        let nonEmptyScripts = 0;
        let maxActorScriptCount = 0;
        let maxUserScriptTransitions = 0;
        let actorCount = 0;
        let allMethods = new Set<string>();

        Preconditions.checkNotUndefined(task);
        for (const actor of task.actors) {
            if (actor.concern != concern) {
                continue
            }

            let nonEmptyActorScripts = 0;
            for (const script of actor.scripts) {
                if (script.transitions.transitions.size > 0) {
                    if (script.event != NeverEvent.instance()) {
                        if (script.event != BootstrapEvent.instance()) {
                            if (script.event != TerminationEvent.instance()) {
                                nonEmptyScripts++;
                                nonEmptyActorScripts++;
                                maxUserScriptTransitions = Math.max(maxUserScriptTransitions, script.transitions.transitions.size);
                            }
                        }
                    }
                }
            }

            actorCount++;
            maxActorScriptCount = Math.max(maxActorScriptCount, nonEmptyActorScripts);
            actor.methods.createMutable()
                .filter((m) => !m.signature.isExtern)
                .forEach((m) => allMethods.add(m.ident.text));
        }

        addTo.put("actorCount", actorCount);
        addTo.put("maxActorUserScriptCount", maxActorScriptCount);
        addTo.put("nonEmptyUserScriptCount", nonEmptyScripts);
        addTo.put("maxUserScriptTransitionCount", maxUserScriptTransitions);
        addTo.put("methodCount", allMethods.size);
    }

    public computeStatisitcs(task: App, addTo: AnalysisStatistics) {
        const programStats = addTo.withContext("Program");
        const specStats = addTo.withContext("Specification");

        this.computeStatisticsForConcern(task, Concerns.defaultProgramConcern(), programStats);
        this.computeStatisticsForConcern(task, Concerns.defaultSpecificationConcern(), specStats);
    }

}