program Mini1Program

actor MiniActor is ScratchSprite begin

    image Elefant2 "0.png"
    image Elefant1 "1.svg"

    script on startup do begin
        changeCostumeTo("Elefant1")

        if activeGraphicName = "Elefant1" then begin
            _RUNTIME_signalFailure()
        end
    end

end

