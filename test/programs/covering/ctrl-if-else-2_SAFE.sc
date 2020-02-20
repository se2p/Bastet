program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as number
        define x as 42
        if (x = 0) then begin
            _RUNTIME_signalFailure()
        end else begin
            if not (x = 42) then begin
                _RUNTIME_signalFailure()
            end
        end
    end

end

