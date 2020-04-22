program Mini1Program

actor MiniActor is ScratchSprite begin

    image Elefant1 "1.svg"
    image Elefant2 "0.png"

    script on startup do begin
        if getImageHeight("Elefant1") = 480 then begin
            _RUNTIME_signalFailure("Wrong Image Height")
        end
    end

end

