program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as float
        declare b as float
        declare c as float

        assume a > b
        assume b > c
        assume a > 3.0
        assume c > 9.0

        if not (b / 2.0 > 3.0) then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

