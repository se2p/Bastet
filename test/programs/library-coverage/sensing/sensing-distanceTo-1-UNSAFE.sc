program TestProgram

actor Ball1 is ScratchSprite begin

    script on startup do begin
        goTo(0-50, 0)
        if distanceTo(0, 0) = 50 then begin
            _RUNTIME_signalFailure("Point distance must be correct")
        end
    end

end

