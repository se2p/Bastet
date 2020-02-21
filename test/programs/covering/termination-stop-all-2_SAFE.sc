program Mini1Program

actor MiniActor1 is RuntimeEntity begin

    script on startup do begin
        stop all
    end

end

actor MiniActor2 is RuntimeEntity begin

    script on startup do begin
        wait 1 seconds
        _RUNTIME_signalFailure()
    end

end

