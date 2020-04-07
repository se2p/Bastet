program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as int
        define x as 42

        if (x = 0) then begin
            _RUNTIME_signalFailure()

        end else if (x = 1) then begin
            _RUNTIME_signalFailure()

        end else if (x = 42) then begin
            _RUNTIME_signalFailure()

        end
    end

end

