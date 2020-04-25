program Mini1Program

actor MiniActor is ScratchSprite begin

    image Elefant1 "1.svg"
    image Elefant2 "0.png"

    script on startup do begin
        if getImageWidth("Elefant1") = 480 then begin
        end else begin
            _RUNTIME_signalFailure("Wrong Image Width")
        end
    end

end

