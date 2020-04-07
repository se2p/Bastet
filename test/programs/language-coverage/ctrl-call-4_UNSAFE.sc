program Mini1Program

actor MiniActor is RuntimeEntity begin

    define atomic inc (n: int) begin
        define result as n + 1
    end returns result: int

    define atomic dec (n: int) begin
        define result as n - 1
    end returns result: int

    define atomic foo (n: int) begin
        define result as n
        define result as inc(result)
        define result as inc(result)
        define result as inc(result)

        define result as dec(result)
        define result as dec(result)
    end returns result: int

    script on startup do begin
        declare y as int
        define y as 0

        define y as inc(y)
        define y as inc(y)
        define y as inc(y)
        define y as inc(y)

        define y as dec(y)
        define y as dec(y)
        define y as dec(y)
        define y as dec(y)

        define y as foo(y)
        define y as foo(y)
        define y as foo(y)
        define y as foo(y)

        if (y = 4) then begin
            _RUNTIME_signalFailure("This must not happen!")
        end
    end


end

