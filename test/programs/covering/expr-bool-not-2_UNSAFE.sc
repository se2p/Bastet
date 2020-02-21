program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        if not false then begin
            _RUNTIME_signalFailure()
        end
    end

end

