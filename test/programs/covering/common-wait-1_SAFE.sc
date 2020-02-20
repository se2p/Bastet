program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        wait 1 seconds
        if timer < 1 then begin
            _RUNTIME_signalFailure()
        end
    end

end

