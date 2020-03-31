program Mini1Program

actor ActorA is ScratchSprite begin
    image Elefant "1.svg"

    script on bootstrap do begin
        define x as 0
        define y as 0
        changeActiveGraphicTo("Elefant")
    end

end

actor ActorB is ScratchSprite begin
    image Elefant "1.svg"

    script on bootstrap do begin
        define x as 0
        define y as 0
        changeActiveGraphicTo("Elefant")
    end

    script on startup do begin
        declare actorA as actor
        define actorA as locate actor "ActorA"

        if touchingObject(actorA) then begin
            _RUNTIME_signalFailure()
        end
    end

end
