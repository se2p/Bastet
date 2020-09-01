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
 *      the monkey (id is "monkey") and one in the role of the circus director (id is "Zirkusdirektor").
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

    declare director as actor
    declare director_last_y as int
    declare director_last_x as int

    declare monkey as actor
    declare monkey_last_y as int
    declare monkey_last_x as int

    declare last_move_towards as int

    define atomic checkBehaviorSatisfied () begin
        // (a) Attributes of the first actor
        declare director_x as int
        declare director_y as int
        define director_x as cast attribute "x" of director to int
        define director_y as cast attribute "y" of director to int

        // (b) Attributes of the second actor
        declare monkey_x as int
        declare monkey_y as int
        define monkey_x as cast attribute "x" of monkey to int
        define monkey_y as cast attribute "y" of monkey to int

        // If actor 2 is left of actor 1:
        //   actor1.x' < actor1.x (left move)
        // If actor 2 is right of actor 1:
        //   actor1.x' > actor1.x (right move)
        declare director_x_towards_monkey as boolean
        define director_x_towards_monkey as false
        if monkey_last_x < director_last_x then begin
           define director_x_towards_monkey as (director_x < director_last_x)
        end
        if monkey_last_x > director_last_x then begin
           define director_x_towards_monkey as (director_x > director_last_x)
        end

        declare director_y_towards_monkey as boolean
        define director_y_towards_monkey as false
        if monkey_last_y < director_last_y then begin
           define director_y_towards_monkey  as (director_y < director_last_y)
        end
        if monkey_last_y > director_last_y then begin
           define director_y_towards_monkey  as (director_y > director_last_y)
        end

        declare director_towards_monkey as boolean
        define director_towards_monkey as director_x_towards_monkey or director_y_towards_monkey

        declare director_at_monkey as boolean
        define director_at_monkey as touchingObjects(director, monkey)

        if director_towards_monkey or director_at_monkey then begin
           define last_move_towards as _RUNTIME_micros()
        end

        // The actual invariant check
        if _RUNTIME_micros() - last_move_towards > 100000 then begin
           _RUNTIME_signalFailure("The director must move towards the monkey.")
        end

        // Store information for the next step
        define director_last_x as director_x
        define director_last_y as director_y

        define monkey_last_x as monkey_x
        define monkey_last_y as monkey_y
    end

    script on bootstrap finished do begin
        define director as locate actor "Zirkusdirektor-rennend"
        define monkey as locate actor "Affe"
        define last_move_towards as _RUNTIME_micros()

        checkBehaviorSatisfied()
    end

    script on statement finished do begin
        checkBehaviorSatisfied()
    end

end

