program Mini1Program

actor MiniActor is RuntimeEntity begin

    define atomic inc (n: int) begin
        define result as n + 1
    end returns result: int

    script on startup do begin
        declare x as int
        define x as 42
        declare n as int
        declare m as int
        declare b as boolean

        if b then begin
            define x as x
        end

        if n = 0 then begin
            define x as x + 1
        end else begin
            define x as x + 0
        end

        if m = 0 then begin
            define x as x + 1
        end else begin
            define x as x + 0
        end


        if (x = 42) then begin
            _RUNTIME_signalFailure("This must not happen!")
        end
    end

end

