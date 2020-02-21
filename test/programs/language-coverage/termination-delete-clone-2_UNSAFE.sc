program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        delete this clone
        _RUNTIME_signalFailure()
    end

end

