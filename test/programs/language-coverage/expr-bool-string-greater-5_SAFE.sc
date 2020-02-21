program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        if "Ab" > "ab" then begin
            // The comparison is case-insensitive
            _RUNTIME_signalFailure()
        end
    end

end

