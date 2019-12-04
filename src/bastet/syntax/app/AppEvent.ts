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

