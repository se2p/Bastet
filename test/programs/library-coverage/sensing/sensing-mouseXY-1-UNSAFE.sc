program TestProgram

actor Ball1 is ScratchSprite begin

    script on startup do begin
        goTo(0-50,0)
        declare mx1 as int
        define mx1 as mouseX()
        declare mx2 as int
        define mx2 as mouseX()
        if mx1 = mx2 then begin
            _RUNTIME_signalFailure("The mouse position must be volatile")
        end
    end

end
