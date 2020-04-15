program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as float
        declare b as float
        define a as 100.0 + 101.0
        define b as 0.5 * mathSqrt(a)

        if not (b > 0.0) then begin
           _RUNTIME_signalFailure()
        end
    end

end

