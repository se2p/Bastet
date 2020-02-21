program Mini1Program

actor MiniActor1 is RuntimeEntity begin

    script on startup do begin
        stop this script
        _RUNTIME_signalFailure()
    end

end


