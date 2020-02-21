program Mini1Program

actor MiniActor1 is RuntimeEntity begin

    script on startup do begin
        stop this script
    end

    script on startup do begin
        _RUNTIME_signalFailure()
    end

end

