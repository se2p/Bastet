program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as float
        declare b as float

        define a as 4.0
        define b as mathSqrt(a)

        if not (b = 2.0) then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

