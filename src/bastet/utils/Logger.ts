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

export enum LogLevel {

    ALWAYS = 0,
    TEACHING = 1,
    DEBUG = 2
}

export interface AnalysisLogger {

    setLogLevel(level: LogLevel);

    potentialUnsound(str: string);

    potentialIncomplete(str: string);

    log(...data: any);

}

export class ConsoleLogger implements AnalysisLogger {

    private _logLevel: LogLevel;

    constructor(logLevel: LogLevel) {
        this._logLevel = logLevel;
    }

    potentialIncomplete(str: string) {
        console.warn("INCOMPLETE: " + str);
    }

    potentialUnsound(str: string) {
        console.warn("UNSOUND: " + str);
    }

    log(...data: any) {
        console.log(...data);
    }

    setLogLevel(level: LogLevel) {
        this._logLevel = level;
    }

}

export class Logger {

    private static LOGGER: AnalysisLogger;

    public static defaultLogger(): AnalysisLogger {
        if (!Logger.LOGGER) {
            Logger.LOGGER = new ConsoleLogger(LogLevel.ALWAYS);
        }
        return Logger.LOGGER;
    }

    public static potentialUnsound(str: string) {
        Logger.defaultLogger().potentialUnsound(str);
    }

    public static potentialIncomplete(str: string) {
        Logger.defaultLogger().potentialIncomplete(str);
    }

}

