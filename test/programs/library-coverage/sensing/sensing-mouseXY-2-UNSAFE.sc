program TestProgram

actor Ball1 is ScratchSprite begin

    script on startup do begin
        goTo(0-50,0)
        declare my1 as int
        define my1 as mouseY()
        declare my2 as int
        define my2 as mouseY()
        if my1 = my2 then begin
            _RUNTIME_signalFailure("The mouse position must be volatile")
        end
    end

end
