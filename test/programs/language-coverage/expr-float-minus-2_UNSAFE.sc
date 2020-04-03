program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as float
        declare b as float
        declare c as float

        define a as 1.1
        define b as 2.2
        define c as 3.3

        if c - b - a < 0.1 then begin
            _RUNTIME_signalFailure()
        end
    end

end

