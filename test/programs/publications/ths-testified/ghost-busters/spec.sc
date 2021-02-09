program Spec

actor Spec is Observer begin

    declare stage as actor
    declare ghost as actor
    declare bat1 as actor
    declare io as actor

    declare anyHitHappened as boolean
    declare expectedScore as integer

    declare initialBackdropIndex as integer

    declare stateGhost as integer
    declare stateStage as integer
    declare stateBat1 as integer

    declare lastActorHit as integer

    declare stateGhostEntered as integer
    declare stateBat1Entered as integer

    define atomic check () begin
        if stateGhost = 0 then begin // Visible, not hit, not hiding
            declare clicked as boolean
            define clicked as cast attribute "mouseClicked" of io to boolean
            declare hit as boolean
            define hit as touchingMousePointer(ghost) and clicked

            if hit then begin
                define anyHitHappened as true
                define stateGhost as 1
                define stateGhostEntered as _RUNTIME_micros()
                define lastActorHit as stateGhostEntered
                define expectedScore as expectedScore + 1
            end
        end else if stateGhost = 1 then begin // Hiding
            declare hidden as boolean
            define hidden as not (cast attribute "visible" of ghost to boolean)

            if hidden then begin
                define stateGhost as 0
                define stateGhostEntered as _RUNTIME_micros()
            end else if _RUNTIME_micros() - stateGhostEntered > 1000000 then begin
                _RUNTIME_signalFailure("The ghost must DISAPPEAR within 1 sec after it has been hit.")
            end
        end

        if stateBat1 = 0 then begin // Visible, not hit, not hiding
            declare clicked as boolean
            define clicked as cast attribute "mouseClicked" of io to boolean
            declare hit as boolean
            define hit as touchingMousePointer(bat1) and clicked

            if hit then begin
                define anyHitHappened as true
                define stateBat1 as 1
                define stateBat1Entered as _RUNTIME_micros()
                define lastActorHit as stateBat1Entered
                define expectedScore as expectedScore - 2
            end
        end else if stateBat1 = 1 then begin // Hiding
            define hidden as not (cast attribute "visible" of ghost to boolean)

            if hidden then begin
                define stateBat1 as 0
                define stateBat1Entered as _RUNTIME_micros()
            end else if _RUNTIME_micros() - stateBat1Entered > 1000000 then begin
                _RUNTIME_signalFailure("The bat must DISAPPEAR within 1 sec after it has been hit.")
            end
        end

        if anyHitHappened then begin
            if _RUNTIME_micros() - lastActorHit > 100000 then begin
                declare score as integer
                define score as cast attribute "score" of stage to integer
                if not score = expectedScore then begin
                    _RUNTIME_signalFailure("The score must INCREASE by 1 if a GHOST was hit or DECREASE by 2 if a BAT was hit, each within 100msec.")
                end

                declare currentBackdropIndex as integer
                define currentBackdropIndex as cast attribute "currentIdx" of stage to integer
                if score <= 0 then begin
                    if initialBackdropIndex = currentBackdropIndex then begin
                        _RUNTIME_signalFailure("The game must TERMINATE if the score would turn negative by showing a YOU LOST stage backdrop within 100msec.")
                    end
                end else if score >= 10 then begin
                    if initialBackdropIndex = currentBackdropIndex then begin
                        _RUNTIME_signalFailure("The game must TERMINATE if the score reaches 10 points by showing a YOU WON stage backdrop within 100msec.")
                    end
                end
            end
        end
    end

    script on bootstrap finished do begin
        define stage as locate "Stage"
        define ghost as locate "Ghost"
        define bat1 as locate "Bat1"
        define io as locate "IOActor"

        define anyHitHappened as false
        define expectedScore as 0
        define initialBackdropIndex as cast attribute "currentIdx" of stage to integer

        define stateGhost as 0
        define stateStage as 0
        define stateBat1 as 0
        define stateGhostEntered as _RUNTIME_micros()
        define stateBat1Entered as _RUNTIME_micros()

        check() // First specification check (base condition)
    end

    script on statement finished do begin
        check() // The actual specification check
    end

end