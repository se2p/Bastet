program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        wait 1 seconds
        if timer > 0 then begin
            _RUNTIME_signalFailure()
        end
    end

end

