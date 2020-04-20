program Mini1Program

actor ActorA begin

    extern _RUNTIME_signalFailure ()

    script on startup do begin
        declare dx as int
        declare alpha as int
        define alpha as 30

        if (alpha < 36) then begin
            assume dx > 0
        end else if (alpha < 72) then begin
            assume dx > 0-1
        end else if (alpha < 108) then begin
            assume dx > 0-1
        end

        epsilon

        if not (dx = 10000000) then begin
            _RUNTIME_signalFailure("moveSteps Test")
        end
    end

end