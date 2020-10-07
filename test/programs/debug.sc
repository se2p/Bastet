program Mini1Program

actor ActorA is ScratchSprite begin
    image Elefant "1.svg"

    script on bootstrap do begin
        define x as 0
        define y as 0
        changeActiveGraphicTo("Elefant")
    end

    script on message "SPRITE_CLICK" () do begin
        _RUNTIME_signalFailure()
    end

end


