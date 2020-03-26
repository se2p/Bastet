program Mini1Program

actor MiniActor is RuntimeEntity begin

    image Elefant2 "0.png"
    image Elefant1 "1.svg"

    script on startup do begin
        if getGraphicIndexById("1.svg") = 1 then begin
            _RUNTIME_signalFailure()
        end
    end

end

