program TestProgram

actor TestActor is ScratchSprite begin

    script on startup do begin
        goTo(0, 0)
        sayText("A")
        wait 1 seconds
        if keyPressedByCode(KEY_DOWN) then begin
            moveSteps(10)
        end
        sayText("B")
        wait 1 seconds
        if keyPressedByCode(KEY_DOWN) then begin
            moveSteps(10)
        end

        if x = 20 then begin
            _RUNTIME_signalFailure()
        end
    end

end
