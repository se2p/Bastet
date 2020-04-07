program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as int
        declare y as int
        declare z as int

        declare a as int
        declare b as int
        declare c as int

        if (x > y) then begin
            define a as 1
            define b as 2
        end else begin
            define b as 3
        end

        if ((x < y) and (b = 2)) then begin
            // Unreachable
            _RUNTIME_signalFailure()
        end
    end

end

