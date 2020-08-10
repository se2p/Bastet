program Mini1Program

actor ActorB is ScratchSprite begin
    image Elefant "1.svg"

    script on bootstrap do begin
        define x as 0
        define y as 0
        changeActiveGraphicTo("Elefant")
    end

    script on startup do begin
        if touchingMousePointer() then begin
            _RUNTIME_signalFailure()
        end
    end

end
