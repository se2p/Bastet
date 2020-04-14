program Mini1Program

actor ActorA is ScratchSprite begin

    script on startup do begin
        define x as 0
        define y as 0
        define direction as 90
        moveSteps(10)

        if (x = 10) then begin
            _RUNTIME_signalFailure("moveSteps Test")
        end
    end

end
