program TestProgram

actor TimeActor is RuntimeEntity begin

    declare last_change as int

    script on startup do begin
        define last_change as _RUNTIME_micros()

        if _RUNTIME_micros() - last_change > 10000 then begin
            _RUNTIME_signalFailure()
        end
    end

end

