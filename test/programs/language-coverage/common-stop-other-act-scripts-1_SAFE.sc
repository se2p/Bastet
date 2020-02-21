program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        stop other scripts in actor
    end

    script on startup do begin
        wait 1 seconds
        _RUNTIME_signalFailure()
    end

end

