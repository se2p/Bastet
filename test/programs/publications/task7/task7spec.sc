program Task7Spec

/**
 * ## Task 7 "Elephant“
 *
 * Task: The `elephant` should `dance`.
 *
 * Rewrite as bounded safety property:
 *      The elephant must switch costumes at least every 2 seconds.
 *
 * Precondition:
 *      There exists one actors with the role of
 *      the elephant with a the name "Elefant1".
 *
 * Interpretations and considerations:
 *
 * Rewrite without explicit actor names:
 *    Given at max one actor it always changes its costume after a repaint (?)
 *
 *   EXISTS a in _RUNTIME_getAllActors():
 *     FORALL trace in PROGRAM_TRACES:
 *       IF time_elapsed > 2000:
 *           changed_costume(b) == TRUE
 *
 */

actor ElephantObserver is Observer begin

    declare actor_1_id as actor
    declare actor_1_costume as string
    declare actor_1_prev_costume as string
    declare last_change as int

    define atomic checkBehaviorSatisfied () begin
        // (a) Attributes of the first actor
        define actor_1_costume as attribute "active_graphic_name" of actor_1_id

        if not (actor_1_costume = actor_1_prev_costume) then begin
           define last_change as _RUNTIME_micros()
        end

       if _RUNTIME_micros() > 10000000 then begin
           _RUNTIME_signalFailure("10s")
       end

       // The actual invariant check
       if _RUNTIME_micros() - last_change > 1200000 then begin
           _RUNTIME_signalFailure("The costume must change within 1.2s")
       end

        define actor_1_prev_costume as actor_1_costume
    end

    script on bootstrap finished do begin
        define last_change as _RUNTIME_micros()
        define actor_1_id as locate actor "Elefant1"

        // First specification check (base condition)
        checkBehaviorSatisfied()
    end

    script on statement finished do begin
        // The actual specification check
        checkBehaviorSatisfied()
    end

end

