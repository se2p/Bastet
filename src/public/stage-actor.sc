module StageModule;

import Entity from "entity-actor.sc"

actor Stage is Entity {

    define (switch backdrop to <string as id>) as {
        change image to (id);
    }

    define (switch backdrop to <string as id>) and wait) as {

    }

    define (next backdrop) as {

    }

}

