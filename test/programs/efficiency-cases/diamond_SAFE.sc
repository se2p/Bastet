program Mini1Program

actor MiniActor is RuntimeEntity begin

    define inc (n: int) begin
        define result as n + 1
    end returns result: int

    define dec (n: int) begin
        define result as n - 1
    end returns result: int

    script on startup do begin
        declare x as int
        declare y as int
        declare z as int

        declare a as int
        declare b as int
        declare c as int

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

