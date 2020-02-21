program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare s as string
        define s as "Apple"
        if s contains "Otto" then begin
            _RUNTIME_signalFailure()
        end
    end

end

