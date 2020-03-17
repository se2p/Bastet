program Mini1Program

actor MiniActor is RuntimeEntity begin

    define inc (n: number) begin
        define result as n + 1
    end returns result: number

    define dec (n: number) begin
        define result as n - 1
    end returns result: number

    script on startup do begin
        declare x as number
        declare y as number
        declare z as number

        declare a as number
        declare b as number
        declare c as number

        assume a > 0
        assume b > 0
        assume c > 0

        if (a > b) then begin
            define x as a - b
        end else begin
            define x as 0
            if (c > b) then begin
                define y as c - b
            end else begin
                define z as a - b
            end
        end

        if (a > b) and not (x > 0) then begin
            _RUNTIME_signalFailure("This must not happen!")
        end
    end

end

