program Task6Spec

/**
 * ## Task 6 „Catch the Monkey“
 *
 * Task: The `circus director` should `run` to the `monkey` `automatically`.
 *
 * Rewrite as bounded safety property:
 *      The circus director must move towards the monkey at least once every second.
 *
 * Precondition:
 *      There exists two actors, one with the role of
 *      the monkey (id is "Affe") and one in the role of the circus director (id is "Zirkusdirektor").
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

    declare actor_1_id as string
    declare actor_1_last_y as number
    declare actor_1_last_x as number

    declare actor_2_id as string
    declare actor_2_last_y as number
    declare actor_2_last_x as number

    declare actor_1_moving_towards_2 as boolean
    declare actor_2_moving_towards_1 as boolean

    declare last_change as number

    define last_change as _RUNTIME_millis()
    define actor_1_moving_towards_2 as true
    define actor_1_id as "Zirkusdirektor-rennend"
    define actor_2_id as "Affe"

    // TODO: Store attributes as 'normal' variables of the actor?
    // TODO: Is the map datatype really needed?

    define atomic isBehaviorSatisfied () begin
        define result as true

        // (a) Attributes of the first actor
        declare actor_1_x as number
        declare actor_1_y as number
        define actor_1_x as cast attribute "x" of actor_1_id to number
        define actor_1_y as cast attribute "y" of actor_1_id to number

        // (b) Attributes of the second actor
        declare actor_2_x as number
        declare actor_2_y as number
        define actor_2_x as cast attribute "x" of actor_2_id to number
        define actor_2_y as cast attribute "y" of actor_2_id to number

        // TODO: Parameterize the code / move to a method.
        //      Map data type needed for this.

        // If actor 2 is left of actor 1:
        //   actor1.x' <= actor1.x (left move)
        // If actor 2 is right of actor 1:
        //   actor1.x' >= actor1.x (right move)
        declare actor_1_x_move_towards_2 as boolean
        define actor_1_x_move_towards_2 as (actor_1_last_x = actor_2_last_x)
        if actor_2_last_x < actor_1_last_x then begin
           define actor_1_x_move_towards_2 as (actor_1_x < actor_1_last_x) or (actor_1_x = actor_1_last_x)
        end
        if actor_2_last_x > actor_1_last_x then begin
           define actor_1_x_move_towards_2 as (actor_1_x > actor_1_last_x) or (actor_1_x = actor_1_last_x)
        end

        declare actor_1_y_move_towards_2 as boolean
        define actor_1_y_move_towards_2 as (actor_1_last_y = actor_2_last_y)
        if actor_2_last_y < actor_1_last_y then begin
           define actor_1_y_move_towards_2  as (actor_1_y < actor_1_last_y) or (actor_1_y = actor_1_last_y)
        end
        if actor_2_last_y > actor_1_last_y then begin
           define actor_1_y_move_towards_2  as (actor_1_y > actor_1_last_y) or (actor_1_y = actor_1_last_y)
        end

        define actor_1_moving_towards_2 as actor_1_x_move_towards_2 or actor_1_y_move_towards_2

        if actor_1_moving_towards_2 then begin
           define last_change as _RUNTIME_millis()
        end

        // The actual invariant check
        if _RUNTIME_millis() - last_change > 1000 then begin
            define result as false
        end
    end returns result: boolean

    define atomic storeRelevantStateInfosForNext () begin
        // Actor 1
        define actor_1_last_x as cast attribute "x" of actor_1_id to number
        define actor_1_last_y as cast attribute "y" of actor_1_id to number

        // Actor 2
        define actor_2_last_x as cast attribute "x" of actor_2_id to number
        define actor_2_last_y as cast attribute "y" of actor_2_id to number
    end

    script on bootstrap do begin
    end

    script on bootstrap finished do begin
        // First specification check (base condition)
        assert(isBehaviorSatisfied())

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

    script on statement finished do begin
        // The actual specification check
        assert(isBehaviorSatisfied())

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

end

