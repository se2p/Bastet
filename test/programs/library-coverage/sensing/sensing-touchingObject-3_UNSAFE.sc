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
        define x as 1
        define y as 1
        changeActiveGraphicTo("Elefant")
    end

    script on startup do begin
        declare o as actor
        define o as locate actor "ActorA"
        goToSprite(o)

        if touchingObject(o) then begin
            _RUNTIME_signalFailure()
         end
    end
end


