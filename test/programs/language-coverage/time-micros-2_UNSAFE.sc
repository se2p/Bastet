program TestProgram

actor TimeActor is RuntimeEntity begin

    script on startup do begin
        repeat forever begin
            if _RUNTIME_micros() > 2000 then begin
                _RUNTIME_signalFailure()
            end
        end
    end

end

