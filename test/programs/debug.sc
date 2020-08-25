program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        ifOnEdgeBounce()
        _RUNTIME_signalFailure()
    end

end
