program CloneCreationSafeProgram

actor MiniActor is RuntimeEntity begin
    script on startup do begin
        create clone of "MiniActor"
        if false then begin
            _RUNTIME_signalFailure()
        end
    end
end
