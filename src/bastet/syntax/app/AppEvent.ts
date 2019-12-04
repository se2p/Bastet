/*
 *
 *    Copyright 2019 University of Passau
 *
 *    Project maintained by Andreas Stahlbauer (firstname @ lastname . net)
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

export abstract class AppEvent {

}

export class NeverEvent extends AppEvent {

    private static readonly INSTANCE = new NeverEvent();

    static instance(): NeverEvent {
        return this.INSTANCE;
    }
}

export class StartupEvent extends AppEvent {

    private static readonly INSTANCE = new StartupEvent();

    static instance(): StartupEvent {
        return this.INSTANCE;
    }

}

export class CloneStartEvent extends AppEvent {

}

export class MessageReceivedEvent extends AppEvent {

}

export class ConditionReachedEvent extends AppEvent {

}

export class AppEvents {

    static never(): NeverEvent {
        return NeverEvent.instance();
    }
}

