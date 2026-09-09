program CloneCreationUnsafeProgram

actor MiniActor is RuntimeEntity begin
    script on startup do begin
        create clone of "MiniActor"
        _RUNTIME_signalFailure()
    end
end
