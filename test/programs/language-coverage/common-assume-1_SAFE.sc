program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        assume false
        _RUNTIME_signalFailure()
    end

end

