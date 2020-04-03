program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as float
        declare b as float
        define a as 3.0
        define b as 0.5
        if a * b = 1.5 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

