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

    declare horse_id as actor

    declare horse_color as float
    declare horse_prev_color as float

    declare horse_direction as int
    declare horse_prev_direction as int

    declare mouse_touched as boolean
    declare prev_mouse_touched as boolean

    declare last_direction_change as int
    declare last_color_change as int
    declare last_touching_change as int

    define atomic checkBehaviorSatisfied () begin
        define horse_color as cast (attribute "color_effect_value" of horse_id) to float
        define horse_direction as cast (attribute "direction" of horse_id) to int
        define mouse_touched as touchingMousePointer(horse_id)

        declare now as int
        define now as _RUNTIME_micros()

        if not (mouse_touched and prev_mouse_touched) then begin
            define last_touching_change as now
            define last_direction_change as now
            define last_color_change as now
        end

        if not horse_color = horse_prev_color then begin
            define last_color_change as now
        end

        if not horse_direction = horse_prev_direction then begin
            define last_direction_change as now
        end

        if mouse_touched then begin
            if now - last_direction_change > 1100000 then begin
                _RUNTIME_signalFailure("If the mouse is NOT touched, the color must change within every second")
            end
        end else begin
            if now - last_color_change > 1100000 then begin
                _RUNTIME_signalFailure("If the mouse IS touched, either the direction must change within every second")
            end
        end
    end

    define atomic storeRelevantStateInfosForNext () begin
        define horse_prev_color as horse_color
        define horse_prev_direction as horse_direction
        define prev_mouse_touched as mouse_touched
    end

    script on startup do begin

    end

    script on bootstrap finished do begin
        define horse_id as locate actor "Pferd"
        define prev_mouse_touched as false

        // First specification check (base condition)
        checkBehaviorSatisfied()

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

    script on statement finished do begin
        // The actual specification check
        checkBehaviorSatisfied()

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

end

