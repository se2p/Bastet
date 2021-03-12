program Mini1Program

actor ActorA is ScratchSprite begin
    image Elefant "1.svg"

    script on bootstrap finished do begin
        define x as 0
        define y as 0
        define size as 100
        changeActiveGraphicTo("Elefant")
    end

end

actor ActorB is ScratchSprite begin
    image Elefant "1.svg"

    script on bootstrap finished do begin

    end

    script on startup do begin
       define x as 1
       define y as 1
       define size as 100
       changeActiveGraphicTo("Elefant")


       declare actorA as actor
       define actorA as locate actor "ActorA"

       if not touchingObject(actorA) then begin
            _RUNTIME_signalFailure("Touching Object Test")
        end
    end

end
