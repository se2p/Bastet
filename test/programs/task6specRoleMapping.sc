program Task6Spec

/**
 * ## Task 6 „Catch the Monkey“
 *
 * Task: The `circus director` should `run` to the `monkey` `automatically`.
 *
 * Rewrite as bounded safety property:
 *      The circus director must always run to the monkey.
 *
 * Precondition: There exists two actors, one with the role of
 *      the monkey and one in the role of the circus director.
 *
 * Interpretations and considerations:
 *  - Also the monkey could move on its own, in arbitrary
 *    directions, at arbitrary speeds.
 *  - The director could start is movement
 *    eventually, at any point in finite time.
 *  - After the monkey was reached, the director could stop moving.
 *  - The role of the different sprites is hard to identify.
 *
 * Rewrite without explicit actor names:
 *    Given two actors, at least one of them always moves
 *    towards the other, until it has reached it.
 *
 *   EXISTS a in _RUNTIME_getAllActors():
 *     EXISTS b in _RUNTIME_getAllActors(), with b != a:
 *       FORALL trace in PROGRMA_TRACES:
 *         moves_towards(a, b)
 *
 *   EXISTS a in _RUNTIME_getAllActors():
 *     EXISTS b in _RUNTIME_getAllActors(), with b != a:
 *       FORALL trace in PROGRMA_TRACES:
 *         abs_x_move_towards(a, b) >= 0 || abs_y_move_towards(a, b) >= 0
 */

actor Observer is RuntimeEntity begin

    define assert (condition: boolean) begin
        if not condition then begin
            _RUNTIME_signalFailure()
        end
    end

end

actor DirectorObserver is Observer begin

    declare observer_state as enum ["INIT", "STARTUP_FINISHED", "ROLE_MAPPING_FINISHED"]

    declare monkey_candidates as list of string
    declare director_candidates as list of string

    declare last_state_actor_1 as map
    declare last_state_actor_2 as map

    declare actor_1_id as string
    declare actor_1_last_y as number
    declare actor_1_last_x as number

    declare actor_2_id as string
    declare actor_2_last_y as number
    declare actor_2_last_x as number

    define checkBehaviorSatisfied () begin
        store false to result

        // Move of Actor 1 towards Actor 2?

        // Move of Actor 2 towards Actor 1?
    end returns result: boolean

    define storeRelevantStateInfosForNext () begin
        // Actor 1
        store attribute "x" of actor_1_id to actor_1_last_x
        store attribute "y" of actor_1_id to actor_1_last_y

        // Actor 2
        store attribute "x" of actor_2_id to actor_2_last_x
        store attribute "y" of actor_2_id to actor_2_last_y
    end

    /**
     * Identify the pair of actors that moves closer (positions)
     * to another from one program state to another program state.
     */
    define identifyActorRolesStep () begin
        declare actor_a_id as string
        declare actor_b_id as string

        until a < actor_count repeat begin
            store item a of actors to actor_a_id
            until b < actor_count repeat begin
                store item b of actors to actor_b_id
                store b+1 to b
            end
            store a+1 to a
        end

        // As soon relevant actors have been identified:
        //   (1) Restart the verification of the program
        //      (the obsering actors keep their state, all other
        //      get reset to their initial states).
        //   (2) Change the observer state.
        if ... then begin
            store "ROLE_MAPPING_FINISHED" to observer_state
            _RUNTIME_restart()
        end
    end

    scrip on startup do begin

    end

    script on startup finished do begin
        if observer_state = "INIT" then begin
        end else begin
            if observer_state = "ROLE_MAPPING_FINISHED" then begin
                // First specification check (base condition)
                assert(checkBehaviorSatisfied())
            end
        end

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

    script on statement finished do begin
        if observer_state = "INIT" then begin
            // Identify the roles of the actors
            identifyActorRolesStep()
        end else begin
            if observer_state = "ROLE_MAPPING_FINISHED" then begin
                // The actual specification check
                assert(checkBehaviorSatisfied())
            end
        end

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

end

