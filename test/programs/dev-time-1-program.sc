program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        waitMicros(100)
        if microseconds() < 2 then begin
            _RUNTIME_signalFailure()
        end
    end

end


