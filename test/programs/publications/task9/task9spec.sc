program Task9Spec

/**
 * ## Task 9 "
 *
 * Task: The `Horse` should turn and change color.
 *
 * Rewrite as bounded safety property:
 *      The horse must switch color at least every 1 seconds or turn around if the mouse touches the horse.
 *
 * Precondition:
 *      There exists one actor with the id "Pferd".
 *
 * Interpretations and considerations:
 *
 * Rewrite without explicit actor names:
 *    Given at one actor with the id "Pferd" it always changes its color after 1 second or is turning if the mouse touches the sprite
 *
 *   EXISTS a in _RUNTIME_getAllActors():
 *     FORALL trace in PROGRAM_TRACES:
 *       EXISTS b in _RUNTIME_getAllActors(),
 *         IF time_elapsed > 2000 and not touchingMouse():
 *             changed_color(b) == TRUE
 *         ELSE IF touchingMouse():
 *             turnedAround(b) == TRUE
 *
 */

actor HorseObserver is Observer begin

    declare actor_1_id as actor
    declare mouseTouched as boolean

    declare actor_1_color as number
    declare actor_1_prev_color as number

    declare actor_1_direction as number
    declare actor_1_prev_direction as number

    declare last_change as number

    define atomic isBehaviorSatisfied () begin
        // (a) Attributes of the first actor

        define actor_1_color as cast (attribute "color_effect_value" of actor_1_id) to number
        define actor_1_direction as cast (attribute "direction" of actor_1_id) to number

        // The actual invariant check
        if not actor_1_color = actor_1_prev_color then begin
           define mouseTouched as true
        end

        if touchingMousePointer(actor_1_id) then begin
            if not actor_1_direction = actor_1_prev_direction then begin
                define mouseTouched as true
                define last_change as _RUNTIME_millis()
            end
        end else begin
            // Only turn if we are touching the mouse, if we turn and do not touch the mouse, this is wrong
            if not actor_1_direction = actor_1_prev_direction then begin
                define mouseTouched as false
            end
        end

       if last_change - _RUNTIME_micros() < 10000000 and mouseTouched then begin
           define result as false
       end
    end returns result: boolean

    define atomic storeRelevantStateInfosForNext () begin
        define actor_1_prev_color as actor_1_color
        define actor_1_prev_direction as actor_1_direction
    end

    script on startup do begin

    end

    script on bootstrap finished do begin
        define actor_1_id as locate actor "Pferd"
        define last_change as _RUNTIME_millis()

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

