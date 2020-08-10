program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        broadcast "foo"
    end

    script on message "bar" () do begin
        _RUNTIME_signalFailure()
    end

end

