program TestProgram

actor TimeActor is RuntimeEntity begin

    script on startup do begin
        repeat forever begin
            if _RUNTIME_millis() > 1000 then begin
                _RUNTIME_signalFailure()
            end
        end
    end

end

