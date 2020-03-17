program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        waitMicros(1000)
        if _RUNTIME_micros() < 500 then begin
            _RUNTIME_signalFailure()
        end
    end

end

