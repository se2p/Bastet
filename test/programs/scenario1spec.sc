program Scenario1Spec

/**
 * EXISTS a in _RUNTIME_getAllActors():
 *   EXISTS b in _RUNTIME_getAllActors():
 *       abs_x_move_towards(a, b) >= 0 || abs_y_move_towards(a, b) >= 0
 */

actor Observer is RuntimeEntity begin

end

actor DirectorObserver is Observer begin

    declare attribute "state" as enum ["INIT", "STARTUP_FINISHED"]

    declare attribute "actor_1_id" as string
    declare attribute "actor_1_last_y" as number
    declare attribute "actor_1_last_x" as number

    declare attribute "actor_2_id" as string
    declare attribute "actor_2_last_y" as number
    declare attribute "actor_2_last_x" as number

    define identifyDirectorSprite () begin
        //
    end returns result: string

    scrip on startup do begin

    end

    script on startup finished do begin
        // Identify the pair of sprites that are
        // supposed to interact with another.

        declare actors as list of string
        declare relevant_actors as number
        store 0 to relevant_actors
        store _RUNTIME_getAllActors() to actors

    end

    script on statement finished do begin

    end

end

