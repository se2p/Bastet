program Task8Spec

/**
 * ## Task 8 „Cat touching Ball“
 *
 * Task: The `cat` should `say` "Hab ich dich!" when it touches a ball.
 *
 * Rewrite as bounded safety property:
 *      The cat must always say "Hab ich dich!" whenever it touches the ball.
 *
 * Precondition:
 *      There exists two actors, one with the id "Katze"
 *      and one with the id "Ball"
 *
 * Interpretations and considerations:
 *   - Neither ball nor cat have to be able to move
 *
 * Rewrite without explicit actor names:
 *    Given two actors, at least one of them always says "Hab ich dich!" when
 *    actors touch
 *
 *   EXISTS a in _RUNTIME_getAllActors():
 *     EXISTS b in _RUNTIME_getAllActors(), with b != a:
 *       FORALL trace in PROGRMA_TRACES:
 *         if touching(a,b)
 *           issaying(a, "Hab ich dich!") or issaying(b, "Hab ich dich")
 *
 */

actor CatObserver is Observer begin

    declare cat_id as actor
    declare ball_id as actor

    declare state as int
    declare state_enter_time as int

    define atomic checkBehaviorSatisfied () begin
        if state = 0 then begin
            declare touch as boolean
            define touch as touchingObjects(cat_id, ball_id)

            if touch then begin
                define state as 1
                define state_enter_time as _RUNTIME_micros()
            end
        end else if state = 1 then begin
            declare msg as boolean
            define msg as length of (attribute "bubbleText" of cat_id) > 0

            if msg then begin
                define state as 0
                define state_enter_time as _RUNTIME_micros()
            end else begin
                if _RUNTIME_micros() - state_enter_time > 1200000 then begin
                    _RUNTIME_signalFailure("There should be a message if the ball is touched by the cat.")
                end
            end
        end
    end

    script on bootstrap finished do begin
        define cat_id as locate actor "Katze"
        define ball_id as locate actor "Ball"

        define state as 0
        define state_enter_time as _RUNTIME_micros()

        checkBehaviorSatisfied()
    end

    script on statement finished do begin
        checkBehaviorSatisfied()
    end

end

