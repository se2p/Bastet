program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        create clone of "MiniActor"
    end

    script on started as clone do begin
        _RUNTIME_signalFailure()
        delete this clone
    end

end

