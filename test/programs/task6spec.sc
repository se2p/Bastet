program Task6Spec

/**
 * ## Task 6 „Catch the Monkey“
 *
 * Task: The `circus director` should `run` to the `monkey` `automatically`.
 *
 * Rewrite as bounded safety property:
 *      The circus director must always run to the monkey.
 *
 * Precondition:
 *      There exists two actors, one with the role of
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
 */

actor DirectorObserver is Observer begin

    declare observer_state as enum ["INIT", "BOOTSTRAP_FINISHED"]

    declare actor_1_id as string
    declare actor_1_last_y as number
    declare actor_1_last_x as number

    declare actor_2_id as string
    declare actor_2_last_y as number
    declare actor_2_last_x as number

    declare actor_1_moving_towards_2 as boolean
    declare actor_2_moving_towards_1 as boolean

    define actor_1_moving_towards_2 as true
    define actor_2_moving_towards_1 as true

    // TODO: Store attributes as 'normal' variables of the actor?
    // TODO: Is the map datatype really needed?

    define atomic checkBehaviorSatisfied () begin
        define result as false

        // (a) Attributes of the first actor
        declare actor_1_x as number
        declare actor_1_y as number
        define actor_1_x as attribute "x" of actor_1_id
        define actor_1_y as attribute "y" of actor_1_id

        // (b) Attributes of the second actor
        declare actor_2_x as number
        declare actor_2_y as number
        define actor_2_x as attribute "x" of actor_2_id
        define actor_2_y as attribute "y" of actor_2_id

        // TODO: Parameterize the code / move to a method.
        //      Map data type needed for this.

        // Is actor 1 moving monotonously to actor 2?
        if actor_1_moving_towards_2 then begin
            // If actor 2 is left of actor 1:
            //   actor1.x' <= actor1.x (left move)
            // If actor 2 is right of actor 1:
            //   actor1.x' >= actor1.x (right move)
            declare actor_1_x_move_towards_2 as boolean
            define actor_1_x_move_towards_2 as (actor_1_last_x = actor_2_last_x)
            if actor_2_last_x < actor_1_last_x then begin
               define actor_1_x_move_towards_2 as (actor1_x < actor_1_last_x) or (actor1_x = actor_1_last_x)
            end
            if actor_2_last_x > actor_1_last_x then begin
               define actor_1_x_move_towards_2 as (actor1_x > actor_1_last_x) or (actor1_x = actor_1_last_x)
            end

            declare actor_1_y_move_towards_2 as boolean
            define actor_1_y_move_towards_2 as (actor_1_last_y = actor_2_last_y)
            if actor_2_last_y < actor_1_last_y then begin
               define actor_1_y_move_towards_2  as (actor1_y < actor_1_last_y) or (actor1_y = actor_1_last_y)
            end
            if actor_2_last_y > actor_1_last_y then begin
               define actor_1_y_move_towards_2  as (actor1_y > actor_1_last_y) or (actor1_y = actor_1_last_y)
            end

            define actor_1_moving_towards_2 as actor_1_x_move_towards_2 or actor_1_y_move_towards_2
        end

        // Is actor 2 moving monotonously to actor 1?
        if actor_2_moving_towards_1 then begin
            // If actor 1 is left of actor 2:
            //   actor2.x' <= actor2.x (left move)
            // If actor 1 is right of actor 2:
            //   actor2.x' >= actor2.x (right move)
            declare actor_2_x_move_towards_1 as boolean
            define actor_2_x_move_towards_1 as (actor_2_last_x = actor_1_last_x)
            if actor_1_last_x < actor_2_last_x then begin
               define actor_2_x_move_towards_1  as (actor2_x < actor_2_last_x) or (actor2_x = actor_2_last_x)
            end
            if actor_1_last_x > actor_2_last_x then begin
               define actor_2_x_move_towards_1 as (actor2_x > actor_2_last_x) or (actor2_x = actor_2_last_x)
            end

            declare actor_2_y_move_towards_1 as boolean
            define actor_2_y_move_towards_1 as (actor_2_last_y = actor_1_last_y)
            if actor_1_last_y < actor_2_last_y then begin
               define actor_2_y_move_towards_1 as (actor2_y < actor_2_last_y) or (actor2_y = actor_2_last_y)
            end
            if actor_1_last_y > actor_2_last_y then begin
               define actor_2_y_move_towards_1 as (actor2_y > actor_2_last_y) or (actor2_y = actor_2_last_y)
            end

            define actor_2_moving_towards_1 as actor_2_x_move_towards_1 or actor_2_y_move_towards_1
        end

        // The actual invariant check
        assert (actor_1_moving_towards_2 or actor_2_moving_towards_1)
    end returns result: boolean

    define atomic storeRelevantStateInfosForNext () begin
        // Actor 1
        define actor_1_last_x as attribute "x" of actor_1_id
        define actor_1_last_y as attribute "y" of actor_1_id

        // Actor 2
        define actor_2_last_x as attribute "x" of actor_2_id
        define actor_2_last_y as attribute "y" of actor_2_id
    end

    script on bootstrap do begin
        define observer_state as "INIT"
    end

    script on bootstrap finished do begin
        define observer_state as "BOOTSTRAP_FINISHED"

        // First specification check (base condition)
        assert(checkBehaviorSatisfied())

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

    script on statement finished do begin
        if observer_state = "BOOTSTRAP_FINISHED" then begin
            // The actual specification check
            assert(checkBehaviorSatisfied())
        end

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

end

