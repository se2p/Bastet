program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        stop other scripts in actor
        _RUNTIME_signalFailure()
    end

    script on startup do begin
        wait 1 seconds
    end

end

