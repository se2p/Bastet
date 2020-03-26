program Mini1Program

actor MiniActor is RuntimeEntity begin

    image Elefant1 "1.svg"
    image Elefant2 "0.png"

    script on startup do begin
        if getGraphicsIdxById("1.svg") = 0 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

