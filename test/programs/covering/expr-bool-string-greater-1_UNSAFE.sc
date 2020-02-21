program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        if "Kund" > "Hund" then begin
            _RUNTIME_signalFailure()
        end
    end

end

