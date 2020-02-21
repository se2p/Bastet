program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as number
        declare y as number
        declare z as number

        declare a as number
        declare b as number
        declare c as number

        if (x > y) then begin
            define a as 1
            define b as 2
        end else begin
            define b as 3
        end

        if ((x < y) and (a = 1)) then begin
            // Unreachable
            _RUNTIME_signalFailure()
        end
    end

end

