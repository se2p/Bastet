program Task7Spec

/**
 * ## Task 9 "
 *
 * Task: The `Horse` should turn and change color.
 *
 * Rewrite as bounded safety property:
 *      The horse must switch color at least every 1 seconds or turn around if the mouse touches the horse.
 *
 * Precondition:
 *      There exists one actor with the role of the horse.
 *
 * Interpretations and considerations:
 *
 * Rewrite without explicit actor names:
 *    Given at max one actor it always changes its color after 1 second or is turning if the mouse touches the sprite
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

actor DirectorObserver is Observer begin

    declare observer_state as enum ["INIT", "STARTUP_FINISHED"]

    declare actor_1_id as string
    declare result as boolean

    declare actor_1_color as string
    declare actor_1_prev_color as string

    declare actor_1_direction as number
    declare actor_1_prev_direction as number


    declare timestamp as number
    define timestamp as _RUMTIME_millis()

    define atomic checkBehaviorSatisfied () begin
        // (a) Attributes of the first actor
        define actor_1_color as attribute "currentColor" of actor_1_id
        define actor_1_direction as attribute "direction" of actor_1_id
        define result as false

        // The actual invariant check
        if not actor_1_color = actor_1_prev_color then begin
           define result as true
        end

        if touchingMouse() then begin
            if not actor_1_direction = actor_1_prev_direction then begin
                define result as true
            end
        end else begin
            // Only turn if we are touching the mouse, if we turn and do not touch the mouse, this is wrong
            if not actor_1_direction = actor_1_prev_direction then begin
                define result as false
            end
        end

        // TODO: Check if changed within the last 1000 msec
       if timestamp - _RUMTIME_millis > 1000
            assert (result)
            define timestamp as _RUMTIME_millis()
       end
    end returns result: boolean

    define atomic touchingMouse() begin
        define actor_1_graphics as attribute "active_graphic_pixels" of actor_1_id
        declare result as boolean
        define result as true
        if item (_RUNTIME_getMouseX () * _RUNTIME_getMouseX () ) of actor_1_graphics = 0 begin //todo is 0 the default value
            define result as false
        end

    end returns result: boolean

    define atomic storeRelevantStateInfosForNext () begin
        define actor_1_prev_color as actor_1_color
        define actor_1_prev_direction as actor_1_direction
    end

    script on startup do begin

    end

    script on startup finished do begin
        if observer_state = "INIT" then begin
        end else begin
            // First specification check (base condition)
            assert(checkBehaviorSatisfied())
        end

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

    script on statement finished do begin
        if observer_state = "INIT" then begin
        end else begin
            // The actual specification check
            assert(checkBehaviorSatisfied())
        end

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

end

