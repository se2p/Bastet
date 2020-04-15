program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as float
        declare b as float
        declare c as float
        declare r as float

        define a as 1.1
        define b as 2.2
        define c as 3.3

        define r as c - b - a

        if r > 0.1 or r < 0.0 then begin
            _RUNTIME_signalFailure()
        end
    end

end

